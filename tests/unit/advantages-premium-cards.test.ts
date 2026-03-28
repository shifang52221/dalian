import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("advantages premium cards", () => {
  it("uses a single number treatment and obvious shutter-style hover color change for the four-card section", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Advantages.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("advantages-card__surface");
    expect(component).toContain("advantages-card__blinds");
    expect(component).toContain("advantages-card__sheen");
    expect(component).toContain("advantages-card__line");
    expect(component).toContain("advantages-card__content");
    expect(component).not.toContain("advantages-card__index");

    expect(stylesheet).toContain(".advantages-card__surface {");
    expect(stylesheet).toContain(".advantages-card__blinds {");
    expect(stylesheet).toContain(".advantages-card__sheen {");
    expect(stylesheet).toContain(".advantages-card__line {");
    expect(stylesheet).toContain(".feature-item--premium:hover .advantages-card__blinds");
    expect(stylesheet).toContain(".feature-item--premium:hover .advantages-card__line");
    expect(stylesheet).toContain(".feature-item--premium:hover .advantages-card__sheen");
    expect(stylesheet).toContain(".feature-item--premium .card-icon");
    expect(stylesheet).toContain(".feature-item--premium[data-reveal] {");
    expect(stylesheet).toContain("opacity: 0;");
    expect(stylesheet).toContain("transform: translateY(28px) scale(0.975);");
    expect(stylesheet).toContain("transition: transform 0.52s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.52s ease;");
    expect(stylesheet).toContain("[data-reveal].is-visible.feature-item--premium,");
    expect(stylesheet).toContain("opacity: 1;");
    expect(stylesheet).toContain(".advantages-card__blinds {");
    expect(stylesheet).toContain("repeating-linear-gradient(");
    expect(stylesheet).toContain(".feature-item--premium:hover h3 {");
    expect(stylesheet).toContain("color: #ffffff;");
    expect(stylesheet).toContain(".feature-item--premium:hover p {");
    expect(stylesheet).toContain(".feature-item--premium:hover .advantages-card__surface {");
    expect(stylesheet).toContain("background: rgba(44, 110, 163, 0.96);");
    expect(stylesheet).toContain(".feature-item--premium:hover .card-icon {");
    expect(stylesheet).toContain("transform: translateY(-2px);");
  });
});
