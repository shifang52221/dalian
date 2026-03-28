import { describe, expect, it } from "vitest";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("home polish copy", () => {
  it("uses delivery-assurance content instead of testimonial placeholders", () => {
    const zh = getFallbackHomeContent("zh");
    const ja = getFallbackHomeContent("ja");

    expect(zh.testimonials.title).not.toContain("占位");
    expect(zh.testimonials.items[0]?.name).not.toContain("占位");
    expect(zh.testimonials.items[0]?.quote).not.toContain("后续");

    expect(ja.testimonials.title).not.toContain("仮");
    expect(ja.testimonials.items[0]?.name).not.toContain("仮");
    expect(ja.testimonials.items[0]?.quote).not.toContain("今後");
  });

  it("avoids CMS-internal wording in public news page intros", () => {
    const zhPage = readFileSync(
      resolve("f:/www/www13dalian/src/pages/news/index.astro"),
      "utf8",
    );
    const jaPage = readFileSync(
      resolve("f:/www/www13dalian/src/pages/ja/news/index.astro"),
      "utf8",
    );

    expect(zhPage).not.toContain("后续将由后台统一发布和维护新闻内容");
    expect(zhPage).not.toContain("双语结构预留");
    expect(jaPage).not.toContain("今後は CMS から直接公開できる想定");
    expect(jaPage).not.toContain("二言語構造");
  });
});
