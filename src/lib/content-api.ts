import type {
  AdvantageRecord,
  CooperationHighlightRecord,
  HomeAboutRecord,
  HomeHeroRecord,
  HomeSectionRecord,
  HomeSectionsView,
  SiteSettingsRecord,
  SiteSettingsView,
} from "../types/content";
import { getFallbackNews, type NewsItem } from "../content/fallback/news";
import {
  getFallbackHomeContent,
  type HomeContent,
} from "../content/fallback/site-content";
import { getSiteCopy } from "../content/site-copy";
import { pb } from "./pocketbase";

type Locale = "zh" | "ja";

type LocaleFieldRecord = Record<string, unknown>;

interface CollectionClient {
  getFullList(options?: Record<string, unknown>): Promise<Record<string, unknown>[]>;
}

interface ContentClient {
  collection(name: string): CollectionClient;
}

const CMS_REQUEST_TIMEOUT_MS = 1200;
const CMS_CACHE_TTL_MS = 30_000;

interface CachedContentValue<T> {
  expiresAt: number;
  promise: Promise<T>;
}

const contentCache = new WeakMap<
  ContentClient,
  Map<string, CachedContentValue<unknown>>
>();

function isPublished(record: Record<string, unknown>) {
  return record.is_published !== false;
}

function getSortOrder(record: Record<string, unknown>) {
  const value = Number(record.sort_order);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

function sortBySortOrder<T extends Record<string, unknown>>(records: T[]) {
  return [...records].sort((left, right) => getSortOrder(left) - getSortOrder(right));
}

function getFirstPublishedRecord<T extends Record<string, unknown>>(records: T[]) {
  return records.find(isPublished);
}

function formatPublishedDate(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }

  const match = raw.match(/^(\d{4}-\d{2}-\d{2})/u);
  return match ? match[1] : raw;
}

function hasRichHtmlContent(value: string) {
  return /<\/?(p|div|table|thead|tbody|tr|td|th|h1|h2|h3|h4|h5|h6|ul|ol|li|strong|em|br)\b/i.test(
    value,
  );
}

function decodeHtmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    ldquo: "“",
    rdquo: "”",
    lsquo: "‘",
    rsquo: "’",
    mdash: "—",
    ndash: "–",
    hellip: "…",
    middot: "·",
    phi: "φ",
    Phi: "Φ",
  };

  let result = value;

  for (let i = 0; i < 3; i += 1) {
    const decoded = result.replace(
      /&(#x?[0-9a-f]+|[a-z]+);/giu,
      (match, entity: string) => {
        if (entity.startsWith("#x") || entity.startsWith("#X")) {
          const codePoint = Number.parseInt(entity.slice(2), 16);
          return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
        }

        if (entity.startsWith("#")) {
          const codePoint = Number.parseInt(entity.slice(1), 10);
          return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
        }

        return namedEntities[entity] ?? match;
      },
    );

    if (decoded === result) {
      break;
    }

    result = decoded;
  }

  return result;
}

function normalizeRichHtmlContent(value: string) {
  const decoded = decodeHtmlEntities(value).trim();
  const singleListMatch = decoded.match(
    /^\s*<(ul|ol)\b[^>]*>\s*<li\b[^>]*>([\s\S]*?)<\/li>\s*<\/\1>\s*$/iu,
  );

  if (!singleListMatch) {
    return decoded;
  }

  const innerHtml = singleListMatch[2]?.trim() ?? "";
  if (!innerHtml) {
    return decoded;
  }

  if (/<\/?(ul|ol|li|table|thead|tbody|tr|td|th)\b/i.test(innerHtml)) {
    return decoded;
  }

  return `<p>${innerHtml}</p>`;
}

function normalizeSummaryText(value: unknown) {
  const decoded = decodeHtmlEntities(String(value ?? "")).trim();

  if (!decoded) {
    return "";
  }

  return decoded
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<\/p>\s*<p[^>]*>/giu, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseJsonValue<T>(value: unknown): T | undefined {
  if (value == null || value === "") {
    return undefined;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return undefined;
    }
  }

  return value as T;
}

function parseStringArray(value: unknown) {
  const parsed = parseJsonValue<unknown>(value);
  if (!Array.isArray(parsed)) {
    return undefined;
  }

  const items = parsed
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

function parseStatArray(value: unknown) {
  const parsed = parseJsonValue<Array<Record<string, unknown>>>(value);
  if (!Array.isArray(parsed)) {
    return undefined;
  }

  const items = parsed
    .map((item) => ({
      value: String(item?.value ?? "").trim(),
      label: String(item?.label ?? "").trim(),
    }))
    .filter((item) => item.value && item.label);

  return items.length > 0 ? items : undefined;
}

function parseNewsContent(value: unknown) {
  const raw = String(value ?? "").trim();
  const decoded = decodeHtmlEntities(raw).trim();

  if (!decoded) {
    return {
      content: [],
      contentHtml: undefined as string | undefined,
    };
  }

  if (hasRichHtmlContent(decoded)) {
    return {
      content: [],
      contentHtml: normalizeRichHtmlContent(decoded),
    };
  }

  return {
    content: decoded
      .split("\n")
      .map((part) => part.trim())
      .filter(Boolean),
    contentHtml: undefined as string | undefined,
  };
}

function buildMediaProxyUrl(
  collectionName: string,
  recordId: unknown,
  filename: unknown,
) {
  const resolvedRecordId = String(recordId ?? "").trim();
  const resolvedFilename = String(filename ?? "").trim();

  if (!resolvedRecordId || !resolvedFilename) {
    return undefined;
  }

  return `/api/media/${encodeURIComponent(collectionName)}/${encodeURIComponent(resolvedRecordId)}/${encodeURIComponent(resolvedFilename)}`;
}

function withCmsTimeout<T>(promise: Promise<T>, timeoutMs = CMS_REQUEST_TIMEOUT_MS) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error("CMS request timed out"));
      }, timeoutMs);
    }),
  ]);
}

function getCachedContent<T>(
  client: ContentClient,
  key: string,
  loader: () => Promise<T>,
  ttlMs = CMS_CACHE_TTL_MS,
) {
  const now = Date.now();
  let clientCache = contentCache.get(client);

  if (!clientCache) {
    clientCache = new Map<string, CachedContentValue<unknown>>();
    contentCache.set(client, clientCache);
  }

  const cached = clientCache.get(key) as CachedContentValue<T> | undefined;
  if (cached && cached.expiresAt > now) {
    return cached.promise;
  }

  const promise = loader().catch((error) => {
    const current = clientCache.get(key);
    if (current?.promise === promise) {
      clientCache.delete(key);
    }
    throw error;
  });

  clientCache.set(key, {
    expiresAt: now + ttlMs,
    promise,
  });

  return promise;
}

async function getCollectionList(
  client: ContentClient,
  name: string,
  options?: Record<string, unknown>,
) {
  return withCmsTimeout(client.collection(name).getFullList(options));
}

function buildSiteSettings(
  locale: Locale,
  settings?: SiteSettingsRecord,
): SiteSettingsView {
  const fallbackCopy = getSiteCopy(locale);
  const fallback = {
    companyName: fallbackCopy.companyName,
    address: fallbackCopy.footer.address,
    phone: fallbackCopy.footer.phone,
    email: fallbackCopy.footer.email,
  };

  if (!settings) {
    return fallback;
  }

  const localizedSettings = mapLocaleRecord(settings, locale) as Record<string, unknown>;

  return {
    companyName: String(localizedSettings.company_name ?? fallback.companyName),
    address: String(localizedSettings.address ?? fallback.address),
    phone: String(settings.phone ?? fallback.phone),
    email: String(settings.email ?? fallback.email),
  };
}

export function mapLocaleRecord<T extends LocaleFieldRecord>(
  record: T,
  locale: Locale,
) {
  const suffix = locale === "ja" ? "_ja" : "_zh";
  const mapped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    if (!key.endsWith(suffix)) {
      continue;
    }

    const baseKey = key.slice(0, -suffix.length);
    mapped[baseKey] = value;
  }

  return mapped;
}

export function mapHomeSections(
  siteSettings: SiteSettingsRecord,
  sections: HomeSectionRecord[],
  locale: Locale,
): HomeSectionsView {
  const localizedSettings = mapLocaleRecord(siteSettings, locale) as Record<
    string,
    unknown
  >;

  return {
    companyName: String(localizedSettings.company_name ?? ""),
    locale,
    sections: sections.map((section) => ({
      key: section.key,
      ...mapLocaleRecord(section, locale),
    })),
  };
}

export async function getSiteSettings(
  locale: Locale,
  client: ContentClient = pb,
): Promise<SiteSettingsView> {
  return getCachedContent(client, `site-settings:${locale}`, async () => {
    try {
      const siteSettings = await getCollectionList(client, "site_settings");
      return buildSiteSettings(locale, siteSettings[0] as SiteSettingsRecord | undefined);
    } catch {
      return buildSiteSettings(locale);
    }
  });
}

export async function getHomePageContent(
  locale: Locale,
  client: ContentClient = pb,
): Promise<HomeContent> {
  return getCachedContent(client, `home:${locale}`, async () => {
    const fallback = getFallbackHomeContent(locale);

    try {
      const [
        siteSettings,
        sections,
        heroRecords,
        aboutRecords,
        capabilities,
        advantages,
        productCases,
        cooperationHighlights,
      ] = await Promise.all([
        getCollectionList(client, "site_settings"),
        getCollectionList(client, "home_sections"),
        getCollectionList(client, "home_hero"),
        getCollectionList(client, "home_about"),
        getCollectionList(client, "capabilities"),
        getCollectionList(client, "advantages"),
        getCollectionList(client, "product_cases"),
        getCollectionList(client, "cooperation_highlights"),
      ]);

      const result: HomeContent = structuredClone(fallback);
      const sectionMap = new Map(
        sections.filter(isPublished).map((section) => [
          String(section.key ?? ""),
          mapLocaleRecord(section, locale) as Record<string, unknown>,
        ]),
      );

      const heroSection = sectionMap.get("hero");
      if (heroSection?.title) {
        result.hero.title = String(heroSection.title);
      }
      if (heroSection?.summary) {
        result.hero.description = String(heroSection.summary);
      }

      const heroRecord = getFirstPublishedRecord(heroRecords) as
        | HomeHeroRecord
        | undefined;
      if (heroRecord) {
        const localizedHero = mapLocaleRecord(heroRecord, locale) as Record<string, unknown>;
        const highlights = parseStringArray(locale === "ja" ? heroRecord.highlights_ja : heroRecord.highlights_zh);
        const stats = parseStatArray(locale === "ja" ? heroRecord.stats_ja : heroRecord.stats_zh);

        if (localizedHero.eyebrow) {
          result.hero.eyebrow = String(localizedHero.eyebrow);
        }
        if (localizedHero.title) {
          result.hero.title = String(localizedHero.title);
        }
        if (localizedHero.description) {
          result.hero.description = String(localizedHero.description);
        }
        if (locale === "ja" ? heroRecord.primary_cta_label_ja : heroRecord.primary_cta_label_zh) {
          result.hero.primaryCta = String(
            locale === "ja" ? heroRecord.primary_cta_label_ja : heroRecord.primary_cta_label_zh,
          );
        }
        if (locale === "ja" ? heroRecord.secondary_cta_label_ja : heroRecord.secondary_cta_label_zh) {
          result.hero.secondaryCta = String(
            locale === "ja" ? heroRecord.secondary_cta_label_ja : heroRecord.secondary_cta_label_zh,
          );
        }
        if (highlights) {
          result.hero.highlights = highlights;
        }
        if (stats) {
          result.hero.stats = stats;
        }
      }

      const aboutSection = sectionMap.get("about");
      if (aboutSection?.title) {
        result.about.title = String(aboutSection.title);
      }
      if (aboutSection?.summary) {
        result.about.description = String(aboutSection.summary);
      }

      const aboutRecord = getFirstPublishedRecord(aboutRecords) as
        | HomeAboutRecord
        | undefined;
      if (aboutRecord) {
        const localizedAbout = mapLocaleRecord(aboutRecord, locale) as Record<string, unknown>;
        const points = parseStringArray(locale === "ja" ? aboutRecord.points_ja : aboutRecord.points_zh);
        const stats = parseStatArray(locale === "ja" ? aboutRecord.stats_ja : aboutRecord.stats_zh);

        if (localizedAbout.eyebrow) {
          result.about.eyebrow = String(localizedAbout.eyebrow);
        }
        if (localizedAbout.title) {
          result.about.title = String(localizedAbout.title);
        }
        if (localizedAbout.description) {
          result.about.description = String(localizedAbout.description);
        }
        if (points) {
          result.about.points = points;
        }
        if (aboutRecord.badge_value || localizedAbout.badge_label) {
          result.about.badge = {
            value: String(aboutRecord.badge_value ?? result.about.badge.value),
            label: String(localizedAbout.badge_label ?? result.about.badge.label),
          };
        }
        if (stats) {
          result.about.stats = stats;
        }
      }

      if (capabilities.length > 0) {
        result.capabilities.items = sortBySortOrder(capabilities.filter(isPublished)).map((item) => {
          const localized = mapLocaleRecord(item, locale) as Record<string, unknown>;
          return {
            title: String(localized.title ?? ""),
            description: String(localized.description ?? ""),
          };
        });
      }

      if (advantages.length > 0) {
        result.advantages.items = sortBySortOrder(advantages.filter(isPublished)).map((item) => {
          const localized = mapLocaleRecord(item as AdvantageRecord, locale) as Record<
            string,
            unknown
          >;
          return {
            title: String(localized.title ?? ""),
            description: String(localized.description ?? ""),
          };
        });
      }

      if (productCases.length > 0) {
        result.projects.categories = sortBySortOrder(productCases.filter(isPublished)).map((item) => {
          const localized = mapLocaleRecord(item, locale) as Record<string, unknown>;
          const tags = locale === "ja" ? item.tags_ja : item.tags_zh;
          return {
            title: String(localized.category ?? ""),
            description: String(localized.description ?? ""),
            tags: Array.isArray(tags) ? tags.map((tag) => String(tag)) : [],
          };
        });
      }

      if (cooperationHighlights.length > 0) {
        result.testimonials.items = sortBySortOrder(
          cooperationHighlights.filter(isPublished),
        ).map((item) => {
          const localized = mapLocaleRecord(
            item as CooperationHighlightRecord,
            locale,
          ) as Record<string, unknown>;
          return {
            name: String(localized.name ?? ""),
            role: String(localized.role ?? ""),
            quote: String(localized.quote ?? ""),
          };
        });
      }

      const settings = siteSettings[0] as SiteSettingsRecord | undefined;
      const siteSettingsView = buildSiteSettings(locale, settings);
      result.siteSettings = siteSettingsView;

      result.contact.details = [
        {
          label: result.contact.details[0]?.label ?? "",
          value: siteSettingsView.address,
        },
        {
          label: result.contact.details[1]?.label ?? "",
          value: siteSettingsView.phone,
        },
        {
          label: result.contact.details[2]?.label ?? "",
          value: siteSettingsView.email,
        },
      ];

      const newsItems = await getNewsList(locale, client);
      if (newsItems.length > 0) {
        result.news.items = newsItems.slice(0, 3).map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          meta: item.date,
        }));
      }

      return result;
    } catch {
      return fallback;
    }
  });
}

export async function getNewsList(
  locale: Locale,
  client: ContentClient = pb,
): Promise<NewsItem[]> {
  return getCachedContent(client, `news:${locale}`, async () => {
    const fallback = getFallbackNews(locale);

    try {
      const records = (
        await getCollectionList(client, "news", {
          sort: "-published_at",
        })
      ).filter(isPublished);

      if (records.length === 0) {
        return fallback;
      }

      return records.map((record) => {
        const localized = mapLocaleRecord(record, locale) as Record<string, unknown>;
        const imageSrc = buildMediaProxyUrl(
          "news",
          record.id ?? record.slug,
          record.cover_image,
        );
        const parsedContent = parseNewsContent(localized.content);

        return {
          slug: String(record.slug ?? ""),
          date: formatPublishedDate(record.published_at),
          title: String(localized.title ?? ""),
          summary: normalizeSummaryText(localized.summary),
          content: parsedContent.content,
          contentHtml: parsedContent.contentHtml,
          image: imageSrc
            ? {
                src: imageSrc,
                alt: `${String(localized.title ?? "")} cover image`,
              }
            : undefined,
        };
      });
    } catch {
      return fallback;
    }
  });
}

export async function getNewsItem(
  slug: string,
  locale: Locale,
  client: ContentClient = pb,
) {
  const items = await getNewsList(locale, client);
  return items.find((item) => item.slug === slug);
}
