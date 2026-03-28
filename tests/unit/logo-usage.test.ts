import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("logo usage", () => {
  it("uses the uploaded logo in both header and footer", () => {
    const header = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Header.astro"),
      "utf8",
    );
    const footer = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Footer.astro"),
      "utf8",
    );

    expect(header).toContain('/logo.png');
    expect(footer).toContain('/logo.png');
  });

  it("uses the uploaded logo as favicon and keeps the header logo compact", () => {
    const layout = readFileSync(
      resolve("f:/www/www13dalian/src/layouts/BaseLayout.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(layout).toContain('rel="icon"');
    expect(layout).toContain('/logo.png');
    expect(stylesheet).toContain("width: 64px;");
    expect(stylesheet).toContain("height: 40px;");
    expect(stylesheet).toContain("max-height: 28px;");
  });
});
