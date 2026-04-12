export type Locale = "zh" | "ja" | "en";

const localePrefixes: Record<Exclude<Locale, "zh">, string> = {
  ja: "/ja",
  en: "/en",
};

export function getLocaleUrl(pathname: string, locale: Locale) {
  const normalizedPath = normalizePath(pathname);
  const pathWithoutLocale = stripLocalePrefix(normalizedPath);

  if (locale === "zh") {
    return pathWithoutLocale;
  }

  const localePrefix = localePrefixes[locale];

  if (pathWithoutLocale === "/") {
    return `${localePrefix}/`;
  }

  return `${localePrefix}${pathWithoutLocale}`;
}

export function getNewsUrl(slug: string, locale: Locale) {
  if (locale === "zh") {
    return `/news/${slug}`;
  }

  return `${localePrefixes[locale]}/news/${slug}`;
}

function normalizePath(pathname: string) {
  if (!pathname) {
    return "/";
  }

  let normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || "/";
}

function stripLocalePrefix(pathname: string) {
  for (const prefix of Object.values(localePrefixes)) {
    if (pathname === prefix) {
      return "/";
    }

    if (pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || "/";
    }
  }

  return pathname;
}
