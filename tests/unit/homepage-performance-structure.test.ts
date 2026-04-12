import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("homepage performance structure", () => {
  it("passes preloaded site settings into the shared layout on both homepages", () => {
    const zhPage = readFileSync(resolve("f:/www/www13dalian/src/pages/index.astro"), "utf8");
    const jaPage = readFileSync(resolve("f:/www/www13dalian/src/pages/ja/index.astro"), "utf8");
    const enPage = readFileSync(resolve("f:/www/www13dalian/src/pages/en/index.astro"), "utf8");

    expect(zhPage).toContain("siteSettings={content.siteSettings}");
    expect(jaPage).toContain("siteSettings={content.siteSettings}");
    expect(enPage).toContain("siteSettings={content.siteSettings}");
  });

  it("marks non-hero homepage images as lazy-loaded", () => {
    const about = readFileSync(resolve("f:/www/www13dalian/src/components/home/About.astro"), "utf8");
    const projects = readFileSync(resolve("f:/www/www13dalian/src/components/home/Projects.astro"), "utf8");

    expect(about).toContain('loading="lazy"');
    expect(projects).toContain('loading="lazy"');
    expect(projects).toContain('decoding="async"');
  });
});
