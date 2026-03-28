import { describe, expect, it } from "vitest";
import { createSeedPlan, getSeedFilename } from "../../src/lib/pocketbase-seed";

describe("pocketbase seed helpers", () => {
  it("builds a seed plan in schema order", () => {
    const plan = createSeedPlan(
      [{ name: "site_settings" }, { name: "news" }, { name: "messages" }],
      ["news.json", "site-settings.json"],
    );

    expect(plan).toEqual([
      { collection: "site_settings", seedFile: "site-settings.json" },
      { collection: "news", seedFile: "news.json" },
    ]);
  });

  it("converts collection names to seed filenames", () => {
    expect(getSeedFilename("site_settings")).toBe("site-settings.json");
  });
});
