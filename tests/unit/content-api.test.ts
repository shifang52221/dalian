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

  it("returns english locale fields when available", () => {
    const result = mapLocaleRecord(
      {
        title_zh: "中文标题",
        title_ja: "日本語タイトル",
        title_en: "English Title",
        summary_en: "English Summary",
      },
      "en",
    );

    expect(result.title).toBe("English Title");
    expect(result.summary).toBe("English Summary");
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

  it("prefers english cms news fields for english news lists", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                slug: "english-rd-update",
                published_at: "2026-04-10",
                is_published: true,
                title_zh: "中文新闻",
                title_ja: "日本語ニュース",
                title_en: "English R&D Update",
                summary_zh: "中文摘要",
                summary_ja: "日本語概要",
                summary_en: "English summary",
                content_zh: "中文正文",
                content_ja: "日本語本文",
                content_en: "English body",
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("en", client as never);

    expect(items[0]?.title).toBe("English R&D Update");
    expect(items[0]?.summary).toBe("English summary");
    expect(items[0]?.content).toEqual(["English body"]);
  });

  it("falls back to available news content when english news fields are blank", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                slug: "fallback-news-entry",
                published_at: "2026-04-10",
                is_published: true,
                title_zh: "中文新闻标题",
                title_ja: "日本語ニュースタイトル",
                title_en: "",
                summary_zh: "中文摘要",
                summary_ja: "日本語概要",
                summary_en: "",
                content_zh: "中文正文第一段\n中文正文第二段",
                content_ja: "日本語本文",
                content_en: "",
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("en", client as never);

    expect(items[0]?.title).toBe("中文新闻标题");
    expect(items[0]?.summary).toBe("中文摘要");
    expect(items[0]?.content).toEqual(["中文正文第一段", "中文正文第二段"]);
  });

  it("sanitizes malicious html from cms news content", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                id: "news-record",
                slug: "sanitized-entry",
                published_at: "2026-03-29",
                is_published: true,
                title_zh: "安全新闻",
                title_ja: "セキュリティニュース",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh:
                  '<p onclick="alert(1)">Safe</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
                content_ja:
                  '<p onclick="alert(1)">Safe</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("zh", client as never);
    const html = items[0]?.contentHtml ?? "";

    expect(html).toContain("<p>Safe</p>");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onclick=");
    expect(html).not.toContain("javascript:");
  });

  it("preserves safe article formatting tags in cms news content", async () => {
    const client = {
      collection() {
        return {
          async getFullList() {
            return [
              {
                id: "formatted-record",
                slug: "formatted-entry",
                published_at: "2026-03-29",
                is_published: true,
                title_zh: "格式新闻",
                title_ja: "書式ニュース",
                summary_zh: "摘要",
                summary_ja: "概要",
                content_zh:
                  "<h2>Title</h2><p><strong>Lead</strong></p><table><tbody><tr><td>Cell</td></tr></tbody></table>",
                content_ja:
                  "<h2>Title</h2><p><strong>Lead</strong></p><table><tbody><tr><td>Cell</td></tr></tbody></table>",
              },
            ];
          },
        };
      },
    };

    const items = await getNewsList("zh", client as never);
    const html = items[0]?.contentHtml ?? "";

    expect(html).toContain("<h2>Title</h2>");
    expect(html).toContain("<strong>Lead</strong>");
    expect(html).toContain("<table>");
    expect(html).toContain("<td>Cell</td>");
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
      {
        title: "连轧设备",
        description: "上下夹送辊、助卷辊、导辊、层流辊等产品服务于多条轧线。",
        tags: ["Cr8-Mo-W-Co", "Ni-Cr-B-Si", "stellite 合金"],
      },
      {
        title: "其他产品",
        description: "包括料斗、法兰、轴套、阀门、转子、汽缸修复等定制化业务。",
        tags: ["耐磨层", "修复", "特殊工况"],
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

  it("prefers english cms homepage content for the english locale", async () => {
    const collections: Record<string, Array<Record<string, unknown>>> = {
      site_settings: [
        {
          company_name_zh: "大连博恒新技术有限公司",
          company_name_ja: "大連博恒新技術有限公司",
          company_name_en: "Dalian Boheng New Technology Co., Ltd.",
          phone: "86-13591839861",
          email: "710877810@sina.com",
          address_zh: "中文地址",
          address_ja: "日本語住所",
          address_en: "English address",
        },
      ],
      home_sections: [],
      home_hero: [
        {
          eyebrow_zh: "中文眉题",
          eyebrow_ja: "日本語アイブロー",
          eyebrow_en: "English eyebrow",
          title_zh: "中文标题",
          title_ja: "日本語タイトル",
          title_en: "English hero title",
          description_zh: "中文描述",
          description_ja: "日本語説明",
          description_en: "English hero description",
          primary_cta_label_zh: "中文按钮",
          primary_cta_label_ja: "日本語ボタン",
          primary_cta_label_en: "English primary CTA",
          secondary_cta_label_zh: "中文次按钮",
          secondary_cta_label_ja: "日本語第二ボタン",
          secondary_cta_label_en: "English secondary CTA",
          highlights_zh: ["中文亮点"],
          highlights_ja: ["日本語ハイライト"],
          highlights_en: ["English highlight"],
          stats_zh: [{ value: "1", label: "中文" }],
          stats_ja: [{ value: "1", label: "日本語" }],
          stats_en: [{ value: "1", label: "English stat" }],
          is_published: true,
        },
      ],
      home_about: [
        {
          eyebrow_zh: "中文简介",
          eyebrow_ja: "日本語紹介",
          eyebrow_en: "English about eyebrow",
          title_zh: "中文企业简介",
          title_ja: "日本語企業紹介",
          title_en: "English about title",
          description_zh: "中文简介正文",
          description_ja: "日本語紹介本文",
          description_en: "English about description",
          points_zh: ["中文要点"],
          points_ja: ["日本語ポイント"],
          points_en: ["English point"],
          badge_value: "DALIAN",
          badge_label_zh: "中文徽标",
          badge_label_ja: "日本語バッジ",
          badge_label_en: "English badge",
          stats_zh: [{ value: "1", label: "中文统计" }],
          stats_ja: [{ value: "1", label: "日本語統計" }],
          stats_en: [{ value: "1", label: "English about stat" }],
          is_published: true,
        },
      ],
      capabilities: [],
      advantages: [],
      product_cases: [],
      cooperation_highlights: [],
      news: [],
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

    const result = await getHomePageContent("en", client as never);

    expect(result.siteSettings.companyName).toBe("Dalian Boheng New Technology Co., Ltd.");
    expect(result.siteSettings.address).toBe("English address");
    expect(result.hero.eyebrow).toBe("English eyebrow");
    expect(result.hero.title).toBe("English hero title");
    expect(result.hero.description).toBe("English hero description");
    expect(result.hero.primaryCta).toBe("English primary CTA");
    expect(result.hero.secondaryCta).toBe("English secondary CTA");
    expect(result.hero.highlights).toEqual(["English highlight"]);
    expect(result.hero.stats).toEqual([{ value: "1", label: "English stat" }]);
    expect(result.about.title).toBe("English about title");
    expect(result.about.description).toBe("English about description");
    expect(result.about.points).toEqual(["English point"]);
    expect(result.about.badge).toEqual({ value: "DALIAN", label: "English badge" });
    expect(result.about.stats).toEqual([{ value: "1", label: "English about stat" }]);
  });

  it("keeps fallback english homepage copy when cms english fields are blank", async () => {
    const collections: Record<string, Array<Record<string, unknown>>> = {
      site_settings: [
        {
          company_name_zh: "大连博恒新技术有限公司",
          company_name_ja: "大連博恒新技術有限公司",
          company_name_en: "",
          phone: "86-13591839861",
          email: "710877810@sina.com",
          address_zh: "中文地址",
          address_ja: "日本語住所",
          address_en: "",
        },
      ],
      home_sections: [],
      home_hero: [
        {
          eyebrow_zh: "中文眉题",
          eyebrow_ja: "日本語アイブロー",
          eyebrow_en: "",
          title_zh: "中文标题",
          title_ja: "日本語タイトル",
          title_en: "",
          description_zh: "中文描述",
          description_ja: "日本語説明",
          description_en: "",
          primary_cta_label_zh: "中文按钮",
          primary_cta_label_ja: "日本語ボタン",
          primary_cta_label_en: "",
          secondary_cta_label_zh: "中文次按钮",
          secondary_cta_label_ja: "日本語第二ボタン",
          secondary_cta_label_en: "",
          highlights_zh: ["中文亮点"],
          highlights_ja: ["日本語ハイライト"],
          highlights_en: [],
          stats_zh: [{ value: "1", label: "中文" }],
          stats_ja: [{ value: "1", label: "日本語" }],
          stats_en: [],
          is_published: true,
        },
      ],
      home_about: [
        {
          eyebrow_zh: "中文简介",
          eyebrow_ja: "日本語紹介",
          eyebrow_en: "",
          title_zh: "中文企业简介",
          title_ja: "日本語企業紹介",
          title_en: "",
          description_zh: "中文简介正文",
          description_ja: "日本語紹介本文",
          description_en: "",
          points_zh: ["中文要点"],
          points_ja: ["日本語ポイント"],
          points_en: [],
          badge_value: "DALIAN",
          badge_label_zh: "中文徽标",
          badge_label_ja: "日本語バッジ",
          badge_label_en: "",
          stats_zh: [{ value: "1", label: "中文统计" }],
          stats_ja: [{ value: "1", label: "日本語統計" }],
          stats_en: [],
          is_published: true,
        },
      ],
      capabilities: [
        {
          title_zh: "埋弧堆焊",
          title_ja: "サブマージアーク肉盛",
          title_en: "",
          description_zh: "中文能力一",
          description_ja: "日本語能力一",
          description_en: "",
          sort_order: 1,
          is_published: true,
        },
      ],
      advantages: [
        {
          title_zh: "工艺经验",
          title_ja: "工法経験",
          title_en: "",
          description_zh: "中文优势一",
          description_ja: "日本語強み一",
          description_en: "",
          sort_order: 1,
          is_published: true,
        },
      ],
      product_cases: [
        {
          category_zh: "连铸设备",
          category_ja: "連鋳設備",
          category_en: "",
          description_zh: "中文案例一",
          description_ja: "日本語事例一",
          description_en: "",
          tags_zh: ["中文标签"],
          tags_ja: ["日本語タグ"],
          tags_en: [],
          sort_order: 1,
          is_published: true,
        },
      ],
      cooperation_highlights: [
        {
          name_zh: "材料与工艺匹配",
          name_ja: "材料と工法の選定",
          name_en: "",
          role_zh: "中文角色",
          role_ja: "日本語役割",
          role_en: "",
          quote_zh: "中文反馈",
          quote_ja: "日本語フィードバック",
          quote_en: "",
          sort_order: 1,
          is_published: true,
        },
      ],
      news: [],
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

    const result = await getHomePageContent("en", client as never);

    expect(result.siteSettings.companyName).toBe("Dalian Boheng New Technology Co., Ltd.");
    expect(result.siteSettings.address).toBe(
      "Hanjia Village, Sanjianpu Subdistrict, Lushunkou District, Dalian, Liaoning, China",
    );
    expect(result.hero.title).toBe(
      "Manufacturing and Surface Engineering Solutions for Continuous Casting and Rolling Applications",
    );
    expect(result.hero.primaryCta).toBe("Contact Us");
    expect(result.about.eyebrow).toBe("Company Profile");
    expect(result.about.title).toBe(
      "A specialized manufacturing plant in Dalian for steel equipment and surface engineering",
    );
    expect(result.capabilities.items[0]).toMatchObject({
      title: "Submerged-Arc Cladding",
      description:
        "Suitable for new production and repair of key roller components, with high load capacity and stable process control.",
    });
    expect(result.advantages.items[0]).toMatchObject({
      title: "Process Experience",
      description:
        "Extensive experience in materials and process applications across continuous casting, continuous rolling, and cold rolling conditions.",
    });
    expect(result.projects.categories[0]).toMatchObject({
      title: "Continuous Casting Equipment",
      description:
        "Products such as straightening rolls, caster rolls, foot rolls, and sleeves cover a wide range of operating scenarios.",
    });
    expect(result.projects.categories[2]).toMatchObject({
      title: "Other Products",
    });
    expect(result.testimonials.items[0]).toMatchObject({
      name: "Material and process matching",
      role: "Selection based on real operating conditions",
    });
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
