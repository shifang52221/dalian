import { describe, expect, it, vi } from "vitest";
import {
  getHomePageContent,
  getNewsList,
  getSiteSettings,
} from "../../src/lib/content-api";
import { getSiteCopy } from "../../src/content/site-copy";

describe("content-api fetchers", () => {
  it("maps PocketBase news records to the requested locale", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "expo-2026",
                published_at: "2026-03-16",
                title_zh: "中文新闻",
                title_ja: "日本語ニュース",
                summary_zh: "中文摘要",
                summary_ja: "日本語概要",
                content_zh: "第一段\n第二段",
                content_ja: "第一段落\n第二段落",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("ja", client);

    expect(result[0]?.title).toBe("日本語ニュース");
    expect(result[0]?.content).toEqual(["第一段落", "第二段落"]);
  });

  it("normalizes backend published_at timestamps to date-only strings", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "timestamp-news",
                published_at: "2026-03-16 00:00:00.000Z",
                title_zh: "时间格式测试",
                title_ja: "日付形式テスト",
                summary_zh: "摘要",
                summary_ja: "要約",
                content_zh: "正文",
                content_ja: "本文",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.date).toBe("2026-03-16");
  });

  it("preserves rich html news content for table-style articles", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "rich-table-news",
                published_at: "2026-03-26",
                title_zh: "表格新闻",
                title_ja: "表ニュース",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh: "<p>导语</p><h2>业绩表</h2><table><tr><th>用户</th></tr><tr><td>JFE</td></tr></table>",
                content_ja: "<p>導入</p><table><tr><th>顧客</th></tr><tr><td>JFE</td></tr></table>",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.content).toEqual([]);
    expect(result[0]?.contentHtml).toContain("<table>");
    expect(result[0]?.contentHtml).toContain("<h2>业绩表</h2>");
  });

  it("normalizes a single rich-text list item into a paragraph", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "single-list-news",
                published_at: "2026-03-26",
                title_zh: "单条列表",
                title_ja: "単一リスト",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh:
                  "<ul><li>我公司是钢铁行业连铸、连轧、冷轧等成套辊道设备及备品备件制造的专业化工厂。</li></ul>",
                content_ja:
                  "<ul><li>当社は鉄鋼業向けロール設備および部品の専門メーカーです。</li></ul>",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.contentHtml).toBe(
      "<p>我公司是钢铁行业连铸、连轧、冷轧等成套辊道设备及备品备件制造的专业化工厂。</p>",
    );
  });

  it("preserves actual multi-item lists as rich html", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "multi-list-news",
                published_at: "2026-03-26",
                title_zh: "多条列表",
                title_ja: "複数リスト",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh: "<ul><li>第一项</li><li>第二项</li></ul>",
                content_ja: "<ul><li>一つ目</li><li>二つ目</li></ul>",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.contentHtml).toBe("<ul><li>第一项</li><li>第二项</li></ul>");
  });

  it("decodes escaped html tags and named entities in rich content", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "escaped-rich-news",
                published_at: "2026-03-26",
                title_zh: "转义富文本",
                title_ja: "エスケープ富文本",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh:
                  "&lt;p&gt;&Phi;1200mm 辊面尺寸 &amp;ldquo;示例&amp;rdquo;&lt;/p&gt;",
                content_ja:
                  "&lt;p&gt;&Phi;1200mm ロール寸法 &amp;ldquo;サンプル&amp;rdquo;&lt;/p&gt;",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.contentHtml).toBe("<p>Φ1200mm 辊面尺寸 “示例”</p>");
  });

  it("normalizes summary fields that contain html tags and entities", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "escaped-summary-news",
                published_at: "2026-03-26",
                title_zh: "摘要清洗",
                title_ja: "概要正規化",
                summary_zh:
                  "<p>埋弧堆焊最大承重15吨，可堆焊最大外径&Phi;1200mm。</p>",
                summary_ja:
                  "<p>サブマージアーク肉盛の最大荷重は15トン、最大外径は&Phi;1200mmです。</p>",
                content_zh: "正文",
                content_ja: "本文",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result[0]?.summary).toBe(
      "埋弧堆焊最大承重15吨，可堆焊最大外径Φ1200mm。",
    );
  });

  it("falls back to local homepage content when the backend is unavailable", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            throw new Error("offline");
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.hero.title).toContain("连铸连轧");
  });

  it("uses backend news records for homepage previews when available", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name === "site_settings") return [];
            if (name === "home_sections") return [];
            if (name === "capabilities") return [];
            if (name === "product_cases") return [];
            if (name === "news") {
              return [
                {
                  slug: "n1",
                  published_at: "2026-03-16",
                  title_zh: "新闻一",
                  title_ja: "ニュース一",
                  summary_zh: "摘要一",
                  summary_ja: "要約一",
                  content_zh: "内容一",
                  content_ja: "内容一",
                },
                {
                  slug: "n2",
                  published_at: "2026-03-15",
                  title_zh: "新闻二",
                  title_ja: "ニュース二",
                  summary_zh: "摘要二",
                  summary_ja: "要約二",
                  content_zh: "内容二",
                  content_ja: "内容二",
                },
              ];
            }

            return [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.news.items[0]?.slug).toBe("n1");
    expect(result.news.items[1]?.title).toBe("新闻二");
  });

  it("maps site settings contact fields from PocketBase into homepage content", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name === "site_settings") {
              return [
                {
                  company_name_zh: "CMS 公司",
                  company_name_ja: "CMS 会社",
                  phone: "400-800-1234",
                  email: "cms@example.com",
                  address_zh: "大连市测试地址",
                  address_ja: "大連市テスト住所",
                },
              ];
            }
            if (name === "home_sections") return [];
            if (name === "capabilities") return [];
            if (name === "product_cases") return [];
            if (name === "news") return [];

            return [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.contact.details).toEqual([
      { label: "地址", value: "大连市测试地址" },
      { label: "手机", value: "400-800-1234" },
      { label: "邮箱", value: "cms@example.com" },
    ]);
    expect(result.siteSettings).toEqual({
      companyName: "CMS 公司",
      address: "大连市测试地址",
      phone: "400-800-1234",
      email: "cms@example.com",
    });
  });

  it("sorts capabilities and product cases by sort_order", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name === "site_settings") return [];
            if (name === "home_sections") return [];
            if (name === "news") return [];
            if (name === "capabilities") {
              return [
                {
                  title_zh: "第二项",
                  title_ja: "2",
                  description_zh: "B",
                  description_ja: "B",
                  sort_order: 2,
                },
                {
                  title_zh: "第一项",
                  title_ja: "1",
                  description_zh: "A",
                  description_ja: "A",
                  sort_order: 1,
                },
              ];
            }
            if (name === "product_cases") {
              return [
                {
                  category_zh: "第二分类",
                  category_ja: "2",
                  description_zh: "B",
                  description_ja: "B",
                  tags_zh: [],
                  tags_ja: [],
                  sort_order: 20,
                },
                {
                  category_zh: "第一分类",
                  category_ja: "1",
                  description_zh: "A",
                  description_ja: "A",
                  tags_zh: [],
                  tags_ja: [],
                  sort_order: 10,
                },
              ];
            }

            return [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.capabilities.items.map((item) => item.title)).toEqual([
      "第一项",
      "第二项",
    ]);
    expect(result.projects.categories.map((item) => item.title)).toEqual([
      "第一分类",
      "第二分类",
    ]);
  });

  it("keeps fallback product case categories when the cms returns only a partial list", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name === "site_settings") return [];
            if (name === "home_sections") return [];
            if (name === "home_hero") return [];
            if (name === "home_about") return [];
            if (name === "capabilities") return [];
            if (name === "advantages") return [];
            if (name === "news") return [];
            if (name === "cooperation_highlights") return [];
            if (name === "product_cases") {
              return [
                {
                  category_zh: "连铸设备",
                  category_ja: "連鋳設備",
                  category_en: "Continuous Casting Equipment",
                  description_zh: "后台连铸设备",
                  description_ja: "CMS連鋳設備",
                  description_en: "CMS continuous casting equipment",
                  tags_zh: ["后台标签一"],
                  tags_ja: ["CMSタグ1"],
                  tags_en: ["CMS tag 1"],
                  sort_order: 1,
                  is_published: true,
                },
                {
                  category_zh: "连轧设备",
                  category_ja: "圧延設備",
                  category_en: "Continuous Rolling Equipment",
                  description_zh: "后台连轧设备",
                  description_ja: "CMS圧延設備",
                  description_en: "CMS continuous rolling equipment",
                  tags_zh: ["后台标签二"],
                  tags_ja: ["CMSタグ2"],
                  tags_en: ["CMS tag 2"],
                  sort_order: 2,
                  is_published: true,
                },
              ];
            }

            return [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.projects.categories.map((item) => item.title)).toEqual([
      "连铸设备",
      "连轧设备",
      "其他产品",
    ]);
    expect(result.projects.categories[0]).toMatchObject({
      title: "连铸设备",
      description: "后台连铸设备",
      tags: ["后台标签一"],
    });
    expect(result.projects.categories[2]).toMatchObject({
      title: "其他产品",
      description: "包括料斗、法兰、轴套、阀门、转子、汽缸修复等定制化业务。",
      tags: ["耐磨层", "修复", "特殊工况"],
    });
  });

  it("builds shell site settings from PocketBase fields", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "site_settings") {
              return [];
            }

            return [
              {
                company_name_zh: "CMS 公司",
                company_name_ja: "CMS 会社",
                phone: "400-800-1234",
                email: "cms@example.com",
                address_zh: "大连市测试地址",
                address_ja: "大連市テスト住所",
              },
            ];
          },
        };
      },
    };

    const result = await getSiteSettings("zh", client);

    expect(result.companyName).toBe("CMS 公司");
    expect(result.address).toBe("大连市测试地址");
    expect(result.phone).toBe("400-800-1234");
    expect(result.email).toBe("cms@example.com");
  });

  it("falls back quickly when site settings requests hang", async () => {
    vi.useFakeTimers();

    const fallbackCopy = getSiteCopy("zh");
    const client = {
      collection() {
        return {
          getFullList() {
            return new Promise(() => {});
          },
        };
      },
    };

    const resultPromise = getSiteSettings("zh", client);

    await vi.advanceTimersByTimeAsync(1500);

    await expect(resultPromise).resolves.toEqual({
      companyName: fallbackCopy.companyName,
      address: fallbackCopy.footer.address,
      phone: fallbackCopy.footer.phone,
      email: fallbackCopy.footer.email,
    });

    vi.useRealTimers();
  });

  it("falls back quickly when homepage content requests hang", async () => {
    vi.useFakeTimers();

    const client = {
      collection() {
        return {
          getFullList() {
            return new Promise(() => {});
          },
        };
      },
    };

    const resultPromise = getHomePageContent("zh", client);

    await vi.advanceTimersByTimeAsync(1500);

    await expect(resultPromise).resolves.toMatchObject({
      hero: expect.objectContaining({
        title: expect.stringContaining("连铸"),
      }),
    });

    vi.useRealTimers();
  });

  it("reuses cached homepage content within the cache window for the same client and locale", async () => {
    const counts: Record<string, number> = {};
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            counts[name] = (counts[name] ?? 0) + 1;

            if (name === "news") {
              return [
                {
                  slug: "cached-news",
                  published_at: "2026-03-16",
                  title_zh: "缓存新闻",
                  title_ja: "キャッシュニュース",
                  summary_zh: "摘要",
                  summary_ja: "概要",
                  content_zh: "正文",
                  content_ja: "本文",
                },
              ];
            }

            return [];
          },
        };
      },
    };

    await getHomePageContent("zh", client);
    await getHomePageContent("zh", client);

    expect(counts.site_settings).toBe(1);
    expect(counts.home_sections).toBe(1);
    expect(counts.home_hero).toBe(1);
    expect(counts.home_about).toBe(1);
    expect(counts.capabilities).toBe(1);
    expect(counts.advantages).toBe(1);
    expect(counts.product_cases).toBe(1);
    expect(counts.cooperation_highlights).toBe(1);
    expect(counts.news).toBe(1);
  });
});
