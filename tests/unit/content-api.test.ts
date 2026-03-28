import { describe, expect, it } from "vitest";
import { getNewsList, mapLocaleRecord } from "../../src/lib/content-api";

describe("mapLocaleRecord", () => {
  it("returns the matching locale fields", () => {
    const result = mapLocaleRecord(
      {
        title_zh: "中文标题",
        title_ja: "日本語タイトル",
      },
      "ja",
    );

    expect(result.title).toBe("日本語タイトル");
  });

  it("maps optional news cover images from cms records", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                slug: "rd-update",
                published_at: "2026-03-26",
                is_published: true,
                title_zh: "技术研发协同推进",
                title_ja: "技術開発の連携推進",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh: "第一段\n第二段",
                content_ja: "第一段\n第二段",
                cover_image: "rd-cover.jpg",
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("zh", client as never);

    expect(items[0]?.image?.src).toBe("/api/media/news/rd-update/rd-cover.jpg");
    expect(items[0]?.image?.alt).toContain("技术研发协同推进");
  });
});
