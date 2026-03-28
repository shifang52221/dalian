import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capability preview lightbox", () => {
  it("adds an in-page enlarged image preview for the submerged arc welding card", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const script = readFileSync(
      resolve("f:/www/www13dalian/src/scripts/site-effects.js"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("data-capability-preview-trigger");
    expect(component).toContain("data-capability-preview");
    expect(component).toContain("data-capability-preview-close");
    expect(component).toContain("data-capability-preview-image");
    expect(script).toContain("setupCapabilityPreview");
    expect(script).toContain("Escape");
    expect(stylesheet).toContain(".capability-preview {");
    expect(stylesheet).toContain(".capability-preview.is-open");
    expect(stylesheet).toContain(".page-body.has-capability-preview-open");
  });
});
