import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities hover image", () => {
  it("adds an in-card hover image for the submerged arc welding card", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("/images/capabilities/maihu.jpg");
    expect(component).toContain("capability-card__media");
    expect(component).toContain("capability-card--with-media");
    expect(stylesheet).toContain(".capability-card__media {");
    expect(stylesheet).toContain(".service-card--capability:hover .capability-card__media");
    expect(stylesheet).toContain(".capability-card__media-overlay {");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
