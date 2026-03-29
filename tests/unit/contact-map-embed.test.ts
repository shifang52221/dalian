import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("contact map embed", () => {
  it("renders a realistic static location map card and external map actions", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/ContactSection.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("map-embed");
    expect(component).toContain("map-embed__media");
    expect(component).toContain("api.map.baidu.com/staticimage/v2");
    expect(component).toContain("map-embed__pin");
    expect(component).toContain("https://www.amap.com/search?query=");
    expect(component).toContain("map.baidu.com");
    expect(component).not.toContain("<iframe");
    expect(stylesheet).toContain(".map-shell__toolbar {");
    expect(stylesheet).toContain(".map-embed {");
    expect(stylesheet).toContain(".map-embed__media {");
    expect(stylesheet).toContain(".map-embed__pin {");
    expect(stylesheet).toContain(".map-shell__actions {");
  });
});
