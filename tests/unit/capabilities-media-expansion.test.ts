import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities media expansion", () => {
  it("maps the additional capability cards to their image assets", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );

    expect(component).toContain("/images/capabilities/minghu.jpg");
    expect(component).toContain("/images/capabilities/denglizi.jpg");
    expect(component).toContain("/images/capabilities/huoyan.jpg");
    expect(component).toContain("/images/capabilities/zhijian.jpg");
  });
});
