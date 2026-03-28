import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("contact map gaode default", () => {
  it("uses a Baidu static map while keeping address-based external actions", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/ContactSection.astro"),
      "utf8",
    );

    expect(component).toContain("api.map.baidu.com/staticimage/v2");
    expect(component).toContain("map-embed__media");
    expect(component).toContain("map-embed__pin");
    expect(component).toContain("https://www.amap.com/search?query=");
    expect(component).toContain("map.baidu.com/search/");
    expect(component).not.toContain("maps.google.com");
    expect(component).not.toContain("openstreetmap.org/export/embed.html");
    expect(component).not.toContain("api.map.baidu.com/api?type=webgl&v=1.0&ak=");
    expect(component).not.toContain("window.BMapGL");
  });
});
