import { describe, expect, it } from "vitest";
import { mapHomeSections } from "../../src/lib/content-api";

describe("mapHomeSections", () => {
  it("maps site settings and sections into homepage view data", () => {
    const result = mapHomeSections(
      { company_name_zh: "大连博恒新技术有限公司" },
      [{ key: "hero", title_zh: "标题", title_ja: "タイトル" }],
      "zh",
    );

    expect(result.companyName).toBe("大连博恒新技术有限公司");
  });

  it("maps english site settings and sections into homepage view data", () => {
    const result = mapHomeSections(
      { company_name_en: "Dalian Boheng New Technology Co., Ltd." },
      [{ key: "hero", title_zh: "标题", title_ja: "タイトル", title_en: "Hero title" }],
      "en",
    );

    expect(result.companyName).toBe("Dalian Boheng New Technology Co., Ltd.");
    expect(result.sections[0]?.title).toBe("Hero title");
  });
});
