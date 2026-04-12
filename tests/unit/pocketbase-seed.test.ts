import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createSeedPlan, getSeedFilename } from "../../src/lib/pocketbase-seed";

describe("pocketbase seed helpers", () => {
  it("builds a seed plan in schema order", () => {
    const plan = createSeedPlan(
      [
        { name: "site_settings" },
        { name: "home_hero" },
        { name: "home_about" },
        { name: "advantages" },
        { name: "cooperation_highlights" },
        { name: "news" },
        { name: "messages" },
      ],
      [
        "news.json",
        "site-settings.json",
        "home-hero.json",
        "home-about.json",
        "advantages.json",
        "cooperation-highlights.json",
      ],
    );

    expect(plan).toEqual([
      { collection: "site_settings", seedFile: "site-settings.json" },
      { collection: "home_hero", seedFile: "home-hero.json" },
      { collection: "home_about", seedFile: "home-about.json" },
      { collection: "advantages", seedFile: "advantages.json" },
      {
        collection: "cooperation_highlights",
        seedFile: "cooperation-highlights.json",
      },
      { collection: "news", seedFile: "news.json" },
    ]);
  });

  it("converts collection names to seed filenames", () => {
    expect(getSeedFilename("site_settings")).toBe("site-settings.json");
  });

  it("includes english values in localized seed fixtures", () => {
    const siteSettings = JSON.parse(
      readFileSync(resolve("f:/www/www13dalian/pocketbase/seed/site-settings.json"), "utf8"),
    );
    const homeHero = JSON.parse(
      readFileSync(resolve("f:/www/www13dalian/pocketbase/seed/home-hero.json"), "utf8"),
    );
    const news = JSON.parse(
      readFileSync(resolve("f:/www/www13dalian/pocketbase/seed/news.json"), "utf8"),
    );

    expect(siteSettings[0]?.company_name_en).toBeTruthy();
    expect(siteSettings[0]?.address_en).toBeTruthy();
    expect(homeHero[0]?.title_en).toBeTruthy();
    expect(homeHero[0]?.description_en).toBeTruthy();
    expect(homeHero[0]?.highlights_en?.length).toBeGreaterThan(0);
    expect(news[0]?.title_en).toBeTruthy();
    expect(news[0]?.summary_en).toBeTruthy();
    expect(news[0]?.content_en).toBeTruthy();
  });
});
