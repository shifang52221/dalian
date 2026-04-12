import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("news detail missing-state handling", () => {
  it("returns a 404 state instead of throwing when an article is missing", () => {
    const zhPage = readFileSync(
      resolve("f:/www/www13dalian/src/pages/news/[slug].astro"),
      "utf8",
    );
    const jaPage = readFileSync(
      resolve("f:/www/www13dalian/src/pages/ja/news/[slug].astro"),
      "utf8",
    );
    const enPage = readFileSync(
      resolve("f:/www/www13dalian/src/pages/en/news/[slug].astro"),
      "utf8",
    );

    expect(zhPage).toContain("Astro.response.status = 404");
    expect(jaPage).toContain("Astro.response.status = 404");
    expect(enPage).toContain("Astro.response.status = 404");
    expect(zhPage).not.toContain("getNewsItem(");
    expect(jaPage).not.toContain("getNewsItem(");
    expect(enPage).not.toContain("getNewsItem(");
    expect(zhPage).toContain("const item = allItems.find((entry) => entry.slug === slug);");
    expect(jaPage).toContain("const item = allItems.find((entry) => entry.slug === slug);");
    expect(enPage).toContain("const item = allItems.find((entry) => entry.slug === slug);");
    expect(zhPage).not.toContain("throw new Error(`News article not found:");
    expect(jaPage).not.toContain("throw new Error(`News article not found:");
    expect(enPage).not.toContain("throw new Error(`News article not found:");
  });
});
