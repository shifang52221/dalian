import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("about section motion styles", () => {
  it("keeps reveal motion restrained while adding staged text and image polish", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const about = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/About.astro"),
      "utf8",
    );

    expect(stylesheet).toContain(".about-grid--reference");
    expect(stylesheet).toContain(".about-image-card--reference");
    expect(stylesheet).toContain(".about-content-card--reference");
    expect(stylesheet).toContain("transform: translateY(18px) scale(1.03);");
    expect(stylesheet).toContain(".about-image-card--dalian img {");
    expect(stylesheet).toContain("transform: scale(1.08);");
    expect(stylesheet).toContain("@keyframes aboutDalianSweep");
    expect(stylesheet).toContain(".about-motion-block {");
    expect(stylesheet).toContain(".about-motion-line {");
    expect(stylesheet).toContain(".about-enterprise-copy__paragraph:nth-child(2)");
    expect(stylesheet).toContain(".feature-line--about:nth-child(3)");
    expect(about).toContain("about-motion-block");
    expect(about).toContain("about-motion-line");
    expect(stylesheet).not.toContain("transform: translateY(42px);");
    expect(stylesheet).not.toContain("transform: translateY(68px);");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
