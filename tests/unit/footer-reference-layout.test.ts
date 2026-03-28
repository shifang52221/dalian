import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("footer reference layout", () => {
  it("uses a full-width footer band instead of a centered dark card", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const footer = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Footer.astro"),
      "utf8",
    );

    expect(footer).toContain("site-footer__backdrop");
    expect(footer).toContain("site-footer__inner");
    expect(footer).toContain("site-footer__grid");
    expect(footer).toContain("site-footer__bottom");
    expect(footer).not.toContain("site-footer__panel");

    expect(stylesheet).toContain(".site-footer {");
    expect(stylesheet).toContain("width: 100%;");
    expect(stylesheet).toContain("background:");
    expect(stylesheet).toContain(".site-footer__backdrop {");
    expect(stylesheet).toContain(".site-footer__inner {");
    expect(stylesheet).toContain(".site-footer__bottom {");
    expect(stylesheet).toContain("linear-gradient(180deg, #eef3f8 0%, #d6e0ea 6%, rgba(28, 52, 76, 0.4) 18%, #071321 100%)");
    expect(stylesheet).toContain("linear-gradient(180deg, rgba(214, 224, 234, 0.22) 0%, rgba(20, 39, 58, 0.2) 14%, rgba(7, 19, 33, 0.78) 34%, rgba(5, 14, 25, 0.98) 100%)");
    expect(stylesheet).not.toContain("rgba(255, 255, 255, 0) 0%");
    expect(stylesheet).not.toContain(".site-footer__panel {");
  });
});
