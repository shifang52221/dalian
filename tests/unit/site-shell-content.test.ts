import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("site shell cms wiring", () => {
  it("feeds dynamic site settings into header and footer instead of only static copy", () => {
    const layout = readFileSync(
      resolve("f:/www/www13dalian/src/layouts/BaseLayout.astro"),
      "utf8",
    );
    const header = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Header.astro"),
      "utf8",
    );
    const footer = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Footer.astro"),
      "utf8",
    );

    expect(layout).toContain("siteSettings");
    expect(header).toContain("siteSettings.companyName");
    expect(footer).toContain("siteSettings.address");
    expect(footer).toContain("siteSettings.phone");
    expect(footer).toContain("siteSettings.email");
  });
});
