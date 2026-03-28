import { describe, expect, it } from "vitest";
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
});
