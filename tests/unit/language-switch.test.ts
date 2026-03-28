import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getLocaleUrl } from "../../src/lib/i18n";

describe("getLocaleUrl", () => {
  it("maps the Chinese home page to the Japanese home page", () => {
    expect(getLocaleUrl("/", "ja")).toBe("/ja/");
  });

  it("renders a valid Japanese language switch anchor", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/LanguageSwitch.astro"),
      "utf8",
    );

    expect(component).toContain('href={jaUrl}>');
    expect(component).toContain("</a>");
    expect(component).toContain("日本語");
  });

  it("keeps the language switch above surrounding layout and prevents it from shrinking away", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(stylesheet).toContain("justify-content: flex-end;");
    expect(stylesheet).toContain("flex: 1 1 auto;");
    expect(stylesheet).toContain("min-width: 0;");
    expect(stylesheet).toContain(".language-switch {\n  position: relative;");
    expect(stylesheet).toContain("flex-shrink: 0;");
    expect(stylesheet).toContain(".language-switch a {\n  position: relative;");
    expect(stylesheet).toContain("z-index: 1;");
  });
});
