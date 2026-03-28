import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities ja preview mapping", () => {
  it("maps Japanese capability titles to preview media assets", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );

    expect(component).toContain("サブマージアーク肉盛");
    expect(component).toContain("オープンアーク肉盛");
    expect(component).toContain("プラズマ肉盛");
    expect(component).toContain("火炎溶射");
    expect(component).toContain("品質管理");
    expect(component).toContain("/images/capabilities/maihu.jpg");
    expect(component).toContain("/images/capabilities/minghu.jpg");
    expect(component).toContain("/images/capabilities/denglizi.jpg");
    expect(component).toContain("/images/capabilities/huoyan.jpg");
    expect(component).toContain("/images/capabilities/zhijian.jpg");
  });
});
