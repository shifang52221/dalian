import { describe, expect, it } from "vitest";
import {
  getHomePageContent,
  getNewsList,
  mapLocaleRecord,
} from "../../src/lib/content-api";

describe("mapLocaleRecord", () => {
  it("returns the matching locale fields", () => {
    const result = mapLocaleRecord(
      {
        title_zh: "中文标题",
        title_ja: "日本語タイトル",
      },
      "ja",
    );

    expect(result.title).toBe("日本語タイトル");
  });

  it("maps optional news cover images from cms records", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                slug: "rd-update",
                published_at: "2026-03-26",
                is_published: true,
                title_zh: "技术研发协同推进",
                title_ja: "技術開発の連携推進",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh: "第一段\n第二段",
                content_ja: "第一段\n第二段",
                cover_image: "rd-cover.jpg",
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("zh", client as never);

    expect(items[0]?.image?.src).toBe("/api/media/news/rd-update/rd-cover.jpg");
    expect(items[0]?.image?.alt).toContain("技术研发协同推进");
  });

  it("maps expanded cms homepage collections into the homepage view model", async () => {
    const collections: Record<string, Array<Record<string, unknown>>> = {
      site_settings: [
        {
          company_name_zh: "大连博恒新技术有限公司",
          company_name_ja: "大連博恒新技術有限公司",
          phone: "86-13591839861",
          email: "710877810@sina.com",
          address_zh: "辽宁省大连市旅顺口区三涧堡街道韩家村",
          address_ja: "中国遼寧省大連市旅順口区三澗堡街道韓家村",
        },
      ],
      home_sections: [],
      home_hero: [
        {
          id: "hero-record",
          eyebrow_zh: "钢铁行业辊道设备与表面工程",
          eyebrow_ja: "鉄鋼向けロール設備・表面技術",
          title_zh: "结构化首页主标题",
          title_ja: "構造化トップタイトル",
          description_zh: "结构化首页描述",
          description_ja: "構造化トップ説明",
          primary_cta_label_zh: "立即联系",
          primary_cta_label_ja: "お問い合わせ",
          primary_cta_href: "#contact",
          secondary_cta_label_zh: "查看案例",
          secondary_cta_label_ja: "事例を見る",
          secondary_cta_href: "#projects",
          highlights_zh: ["连铸设备", "连轧设备"],
          highlights_ja: ["連鋳設備", "圧延設備"],
          stats_zh: [
            { value: "15吨", label: "埋弧堆焊设备" },
            { value: "3吨", label: "明弧堆焊设备" },
          ],
          stats_ja: [
            { value: "15トン", label: "埋弧肉盛設備" },
            { value: "3トン", label: "明弧肉盛設備" },
          ],
          hero_image: "hero-main.webp",
          is_published: true,
        },
      ],
      home_about: [
        {
          id: "about-record",
          eyebrow_zh: "公司简介",
          eyebrow_ja: "企業紹介",
          title_zh: "结构化企业简介标题",
          title_ja: "構造化企業紹介タイトル",
          description_zh: "结构化企业简介正文",
          description_ja: "構造化企業紹介本文",
          points_zh: ["第一条", "第二条", "第三条"],
          points_ja: ["第一項", "第二項", "第三項"],
          badge_value: "DALIAN",
          badge_label_zh: "制造基地",
          badge_label_ja: "製造拠点",
          stats_zh: [{ value: "4000-5000", label: "年堆焊能力" }],
          stats_ja: [{ value: "4000-5000", label: "年間肉盛能力" }],
          image: "about-card.webp",
          image_alt_zh: "企业简介大连风景图",
          image_alt_ja: "企業紹介の大連風景画像",
          is_published: true,
        },
      ],
      capabilities: [
        {
          id: "capability-record",
          title_zh: "埋弧堆焊",
          title_ja: "サブマージアーク肉盛",
          description_zh: "能力一",
          description_ja: "能力一",
          preview_image: "maihu.jpg",
          sort_order: 1,
          is_published: true,
        },
      ],
      advantages: [
        {
          title_zh: "工艺经验",
          title_ja: "工法経験",
          description_zh: "优势一",
          description_ja: "強み一",
          sort_order: 1,
          is_published: true,
        },
        {
          title_zh: "未发布卡片",
          title_ja: "未公開カード",
          description_zh: "不应展示",
          description_ja: "表示しない",
          sort_order: 2,
          is_published: false,
        },
      ],
      product_cases: [
        {
          id: "product-record",
          category_zh: "连铸设备",
          category_ja: "連鋳設備",
          description_zh: "案例一",
          description_ja: "事例一",
          tags_zh: ["Cr13 系列", "新制与修复"],
          tags_ja: ["Cr13 系", "新作・補修"],
          image: "gallery-case.webp",
          sort_order: 1,
          is_published: true,
        },
      ],
      cooperation_highlights: [
        {
          name_zh: "材料与工艺匹配",
          name_ja: "材料と工法の選定",
          role_zh: "实际工况选型",
          role_ja: "実際の使用条件",
          quote_zh: "合作亮点一",
          quote_ja: "協力ハイライト一",
          sort_order: 1,
          is_published: true,
        },
      ],
      news: [
        {
          slug: "rd-update",
          published_at: "2026-03-26",
          is_published: true,
          title_zh: "技术研发协同推进",
          title_ja: "技術開発の連携推進",
          summary_zh: "摘要",
          summary_ja: "概要",
          content_zh: "第一段\n第二段",
          content_ja: "第一段\n第二段",
        },
      ],
    };

    const client = {
      collection(name: string) {
        return {
          async getFullList() {
            return collections[name] ?? [];
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client as never);

    expect(result.hero.title).toBe("结构化首页主标题");
    expect(result.hero.description).toBe("结构化首页描述");
    expect(result.hero.primaryCta).toBe("立即联系");
    expect(result.hero.secondaryCta).toBe("查看案例");
    expect(result.hero.highlights).toEqual(["连铸设备", "连轧设备"]);
    expect(result.hero.stats).toEqual([
      { value: "15吨", label: "埋弧堆焊设备" },
      { value: "3吨", label: "明弧堆焊设备" },
    ]);
    expect(result.hero.image).toEqual({
      src: "/api/media/home_hero/hero-record/hero-main.webp",
      alt: "结构化首页主标题",
    });

    expect(result.about.title).toBe("结构化企业简介标题");
    expect(result.about.description).toBe("结构化企业简介正文");
    expect(result.about.points).toEqual(["第一条", "第二条", "第三条"]);
    expect(result.about.badge).toEqual({ value: "DALIAN", label: "制造基地" });
    expect(result.about.stats).toEqual([{ value: "4000-5000", label: "年堆焊能力" }]);
    expect(result.about.image).toEqual({
      src: "/api/media/home_about/about-record/about-card.webp",
      alt: "企业简介大连风景图",
    });

    expect(result.advantages.items).toEqual([
      { title: "工艺经验", description: "优势一" },
    ]);
    expect(result.capabilities.items).toEqual([
      {
        title: "埋弧堆焊",
        description: "能力一",
        image: {
          src: "/api/media/capabilities/capability-record/maihu.jpg",
          alt: "埋弧堆焊",
        },
      },
    ]);
    expect(result.projects.categories).toEqual([
      {
        title: "连铸设备",
        description: "案例一",
        tags: ["Cr13 系列", "新制与修复"],
        image: {
          src: "/api/media/product_cases/product-record/gallery-case.webp",
          alt: "连铸设备",
        },
      },
    ]);
    expect(result.testimonials.items).toEqual([
      {
        name: "材料与工艺匹配",
        role: "实际工况选型",
        quote: "合作亮点一",
      },
    ]);
  });

  it("keeps homepage fallback content when new cms collections are unavailable", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            throw new Error("CMS offline");
          },
        };
      },
    };

    const result = await getHomePageContent("zh", client as never);

    expect(result.hero.title).toContain("面向连铸连轧场景");
    expect(result.about.title).toContain("立足大连");
    expect(result.advantages.items.length).toBeGreaterThan(0);
    expect(result.testimonials.items.length).toBeGreaterThan(0);
  });
});
