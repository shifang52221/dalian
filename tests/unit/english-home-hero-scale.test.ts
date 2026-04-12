import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("english homepage hero scale", () => {
  it("adds a homepage-only English typography override for the hero title", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(stylesheet).toContain('html[lang="en"] .page--home .hero__title-stack {');
    expect(stylesheet).toContain('html[lang="en"] .page--home .hero__content h1 {');
    expect(stylesheet).toContain("font-size: clamp(2rem, 2.7vw, 3rem);");
    expect(stylesheet).toContain("line-height: 1.14;");
    expect(stylesheet).toContain("max-width: 15.8ch;");
    expect(stylesheet).toContain(
      'html[lang="en"] .page--home .hero__title-stack .hero__title-display {',
    );
    expect(stylesheet).toContain("max-width: min(100%, 18.5ch);");
  });
});
