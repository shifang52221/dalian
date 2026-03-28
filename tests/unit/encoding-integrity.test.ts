import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const filesToCheck = [
  "src/content/site-copy.ts",
  "src/content/fallback/site-content.ts",
  "src/content/fallback/news.ts",
  "src/components/news/NewsDetail.astro",
  "pocketbase/seed/site-settings.json",
  "pocketbase/seed/home-sections.json",
  "pocketbase/seed/news.json",
  "pocketbase/seed/capabilities.json",
  "pocketbase/seed/product-cases.json",
];

describe("encoding integrity", () => {
  it("keeps core content and seed files free of replacement characters", () => {
    for (const file of filesToCheck) {
      const content = readFileSync(resolve(`f:/www/www13dalian/${file}`), "utf8");

      for (const char of content) {
        expect(char.codePointAt(0)).not.toBe(0xfffd);
      }
    }
  });
});
