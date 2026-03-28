import { describe, expect, it } from "vitest";
import { getHomePageContent, getNewsList } from "../../src/lib/content-api";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";

describe("public content filtering", () => {
  it("filters unpublished news records from public lists", async () => {
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name !== "news") {
              return [];
            }

            return [
              {
                slug: "draft-item",
                published_at: "2026-03-17",
                is_published: false,
                title_zh: "draft zh",
                title_ja: "draft ja",
                summary_zh: "draft summary",
                summary_ja: "draft summary",
                content_zh: "draft body",
                content_ja: "draft body",
              },
              {
                slug: "public-item",
                published_at: "2026-03-16",
                is_published: true,
                title_zh: "public zh",
                title_ja: "public ja",
                summary_zh: "public summary",
                summary_ja: "public summary",
                content_zh: "public body",
                content_ja: "public body",
              },
            ];
          },
        };
      },
    };

    const result = await getNewsList("zh", client);

    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("public-item");
  });

  it("ignores unpublished homepage section overrides", async () => {
    const fallback = getFallbackHomeContent("zh");
    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            if (name === "site_settings") return [];
            if (name === "capabilities") return [];
            if (name === "product_cases") return [];
            if (name === "news") return [];
            if (name === "home_sections") {
              return [
                {
                  key: "hero",
                  is_published: false,
                  title_zh: "draft hero title",
                  title_ja: "draft hero title ja",
                  summary_zh: "draft hero summary",
                  summary_ja: "draft hero summary ja",
                },
              ];
            }

            return [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client);

    expect(result.hero.title).toBe(fallback.hero.title);
    expect(result.hero.description).toBe(fallback.hero.description);
  });
});
