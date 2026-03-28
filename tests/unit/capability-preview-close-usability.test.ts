import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capability preview close usability", () => {
  it("uses a clearer toolbar close control in the preview dialog", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("capability-preview__toolbar");
    expect(component).toContain("capability-preview__close-label");
    expect(component).toContain("关闭");
    expect(stylesheet).toContain(".capability-preview__toolbar {");
    expect(stylesheet).toContain(".capability-preview__close-label {");
    expect(stylesheet).toContain(".capability-preview__close-icon {");
  });
});
