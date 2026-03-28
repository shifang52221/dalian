import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capability rechuli preview polish", () => {
  it("adds heat-treatment media and a more polished preview shell", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("/images/capabilities/rechuli.jpg");
    expect(component).toContain("capability-preview__eyebrow");
    expect(stylesheet).toContain(".capability-preview__meta {");
    expect(stylesheet).toContain(".capability-preview__eyebrow {");
    expect(stylesheet).toContain(".capability-preview__dialog::before");
    expect(stylesheet).toContain(".capability-preview__frame::after");
  });
});
