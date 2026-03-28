import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("news editorial layout", () => {
  it("uses a premium editorial list and a standard single-column article detail in both locales", () => {
    const zhListPage = readFileSync(resolve("f:/www/www13dalian/src/pages/news/index.astro"), "utf8");
    const jaListPage = readFileSync(resolve("f:/www/www13dalian/src/pages/ja/news/index.astro"), "utf8");
    const newsCard = readFileSync(resolve("f:/www/www13dalian/src/components/news/NewsCard.astro"), "utf8");
    const newsDetail = readFileSync(resolve("f:/www/www13dalian/src/components/news/NewsDetail.astro"), "utf8");
    const stylesheet = readFileSync(resolve("f:/www/www13dalian/src/styles/global.css"), "utf8");

    expect(zhListPage).toContain("news-editorial-hero");
    expect(jaListPage).toContain("news-editorial-hero");
    expect(zhListPage).toContain("news-featured-layout");
    expect(jaListPage).toContain("news-featured-layout");

    expect(newsCard).toContain("news-card__shell");
    expect(newsCard).toContain("news-card__media");
    expect(newsCard).toContain("news-card__action");
    expect(newsCard).toContain("item.image");

    expect(newsDetail).toContain("news-detail__header");
    expect(newsDetail).toContain("news-detail__meta");
    expect(newsDetail).toContain("news-detail__content");
    expect(newsDetail).toContain("news-related");
    expect(newsDetail).toContain("news-detail__article-visual");
    expect(newsDetail).toContain('set:html={item.contentHtml}');
    expect(newsDetail).not.toContain("news-detail__sidebar");
    expect(newsDetail).not.toContain("news-detail__panel");
    expect(newsDetail).not.toContain("SERVICE ARTICLE");
    expect(newsDetail).not.toContain("ARTICLE OVERVIEW");

    expect(stylesheet).toContain(".news-editorial-hero {");
    expect(stylesheet).toContain(".news-featured-layout {");
    expect(stylesheet).toContain(".news-card__shell {");
    expect(stylesheet).toContain(".news-detail__header {");
    expect(stylesheet).toContain(".news-detail__meta {");
    expect(stylesheet).toContain(".news-detail__content {");
    expect(stylesheet).toContain(".news-detail__richtext table {");
    expect(stylesheet).toContain(".news-related {");
    expect(stylesheet).toContain(".news-detail__article-visual {");
  });
});
