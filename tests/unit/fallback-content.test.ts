import { describe, expect, it } from "vitest";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";

describe("getFallbackHomeContent", () => {
  it("returns Japanese hero content for the ja locale", () => {
    expect(getFallbackHomeContent("ja").hero.title).toContain("表面");
  });

  it("returns localized hero highlight chips", () => {
    expect(getFallbackHomeContent("ja").hero.highlights[0]).toBe("連鋳設備");
  });

  it("returns updated Chinese hero title, highlights, and floating badges", () => {
    const zh = getFallbackHomeContent("zh").hero;

    expect(zh.titleLines).toEqual([
      "面向连铸连轧场景的制造",
      "与表面强化解决方案",
    ]);
    expect(zh.highlights).toEqual([
      "连铸设备",
      "连轧设备",
      "冷轧设备",
      "表面强化",
    ]);
    expect(zh.stats).toEqual([
      { value: "15吨", label: "埋弧堆焊设备" },
      { value: "3吨", label: "明弧堆焊设备" },
      { value: "3吨", label: "埋弧堆焊设备" },
    ]);
  });

  it("returns complete English homepage content for launch", () => {
    const en = getFallbackHomeContent("en");

    expect(en.hero.title).toContain("Continuous Casting");
    expect(en.hero.titleLines).toEqual([
      "Manufacturing for continuous casting",
      "and rolling applications",
      "with surface engineering solutions",
    ]);
    expect(en.hero.highlights).toEqual([
      "Continuous Casting Equipment",
      "Continuous Rolling Equipment",
      "Cold Rolling Equipment",
      "Surface Engineering",
    ]);
    expect(en.about.title).toContain("Dalian");
    expect(en.capabilities.items).toHaveLength(6);
    expect(en.news.items[0]?.title).toBeTruthy();
    expect(en.contact.formLabels.submit).toBe("Submit Inquiry");
  });
});
