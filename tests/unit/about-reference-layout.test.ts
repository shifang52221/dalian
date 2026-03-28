import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("about section reference layout", () => {
  it("uses a non-overlapping left-image right-content enterprise layout", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const about = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/About.astro"),
      "utf8",
    );

    expect(about).toContain("about-grid about-grid--reference");
    expect(about).toContain("about-image-card--dalian");
    expect(about).toContain("about-enterprise-copy");
    expect(about).toContain("about-enterprise-points");
    expect(about).not.toContain("about-content-card__stats");

    expect(stylesheet).toContain(".about-grid--reference {");
    expect(stylesheet).toContain("align-items: stretch;");
    expect(stylesheet).toContain("gap: clamp(26px, 3.6vw, 48px);");
    expect(stylesheet).toContain(".about-image-card--dalian {");
    expect(stylesheet).toContain(".about-enterprise-copy {");
    expect(stylesheet).toContain(".about-enterprise-points {");
    expect(stylesheet).toContain("margin-left: 0;");
    expect(stylesheet).toContain("transform: none;");
    expect(stylesheet).not.toContain("margin-left: -72px;");
  });
});
