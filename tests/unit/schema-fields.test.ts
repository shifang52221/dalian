import { describe, expect, it } from "vitest";
import schema from "../../pocketbase/schema/collections.json";

describe("PocketBase schema", () => {
  it("includes bilingual fields for news", () => {
    const news = schema.find((collection) => collection.name === "news");
    const fieldNames = news?.fields.map((field) => field.name) ?? [];

    expect(fieldNames).toContain("title_zh");
    expect(fieldNames).toContain("title_ja");
    expect(fieldNames).toContain("title_en");
    expect(fieldNames).toContain("cover_image");
  });

  it("includes expanded homepage collections and fields", () => {
    const siteSettings = schema.find((collection) => collection.name === "site_settings");
    const homeHero = schema.find((collection) => collection.name === "home_hero");
    const homeAbout = schema.find((collection) => collection.name === "home_about");
    const advantages = schema.find((collection) => collection.name === "advantages");
    const capabilities = schema.find((collection) => collection.name === "capabilities");
    const productCases = schema.find((collection) => collection.name === "product_cases");
    const cooperationHighlights = schema.find(
      (collection) => collection.name === "cooperation_highlights",
    );

    const siteSettingsFields = siteSettings?.fields.map((field) => field.name) ?? [];
    const heroFields = homeHero?.fields.map((field) => field.name) ?? [];
    const aboutFields = homeAbout?.fields.map((field) => field.name) ?? [];
    const advantagesFields = advantages?.fields.map((field) => field.name) ?? [];
    const capabilitiesFields = capabilities?.fields.map((field) => field.name) ?? [];
    const productCaseFields = productCases?.fields.map((field) => field.name) ?? [];
    const cooperationFields =
      cooperationHighlights?.fields.map((field) => field.name) ?? [];

    expect(siteSettingsFields).toContain("copyright_zh");
    expect(siteSettingsFields).toContain("copyright_ja");
    expect(siteSettingsFields).toContain("company_name_en");
    expect(siteSettingsFields).toContain("address_en");
    expect(siteSettingsFields).toContain("copyright_en");
    expect(siteSettingsFields).toContain("icp");
    expect(siteSettingsFields).toContain("map_url");

    expect(homeHero).toBeDefined();
    expect(heroFields).toContain("eyebrow_zh");
    expect(heroFields).toContain("eyebrow_ja");
    expect(heroFields).toContain("eyebrow_en");
    expect(heroFields).toContain("primary_cta_label_zh");
    expect(heroFields).toContain("primary_cta_label_en");
    expect(heroFields).toContain("secondary_cta_href");
    expect(heroFields).toContain("highlights_zh");
    expect(heroFields).toContain("highlights_en");
    expect(heroFields).toContain("stats_ja");
    expect(heroFields).toContain("stats_en");
    expect(heroFields).toContain("is_published");

    expect(homeAbout).toBeDefined();
    expect(aboutFields).toContain("eyebrow_zh");
    expect(aboutFields).toContain("eyebrow_en");
    expect(aboutFields).toContain("points_zh");
    expect(aboutFields).toContain("points_ja");
    expect(aboutFields).toContain("points_en");
    expect(aboutFields).toContain("badge_value");
    expect(aboutFields).toContain("badge_label_ja");
    expect(aboutFields).toContain("badge_label_en");
    expect(aboutFields).toContain("stats_zh");
    expect(aboutFields).toContain("stats_en");
    expect(aboutFields).toContain("image_alt_zh");
    expect(aboutFields).toContain("image_alt_en");
    expect(aboutFields).toContain("is_published");

    expect(advantagesFields).toContain("title_en");
    expect(advantagesFields).toContain("description_en");
    expect(advantagesFields).toContain("is_published");

    expect(capabilitiesFields).toContain("title_en");
    expect(capabilitiesFields).toContain("description_en");
    expect(capabilitiesFields).toContain("icon_key");
    expect(capabilitiesFields).toContain("preview_group");
    expect(capabilitiesFields).toContain("is_published");

    expect(productCaseFields).toContain("category_en");
    expect(productCaseFields).toContain("description_en");
    expect(productCaseFields).toContain("tags_en");
    expect(productCaseFields).toContain("is_published");

    expect(cooperationHighlights).toBeDefined();
    expect(cooperationFields).toContain("name_zh");
    expect(cooperationFields).toContain("role_ja");
    expect(cooperationFields).toContain("name_en");
    expect(cooperationFields).toContain("role_en");
    expect(cooperationFields).toContain("quote_zh");
    expect(cooperationFields).toContain("quote_en");
    expect(cooperationFields).toContain("sort_order");
    expect(cooperationFields).toContain("is_published");
  });

  it("defines public content rules and keeps messages private", () => {
    const news = schema.find((collection) => collection.name === "news");
    const homeSections = schema.find((collection) => collection.name === "home_sections");
    const homeHero = schema.find((collection) => collection.name === "home_hero");
    const homeAbout = schema.find((collection) => collection.name === "home_about");
    const advantages = schema.find((collection) => collection.name === "advantages");
    const productCases = schema.find((collection) => collection.name === "product_cases");
    const cooperationHighlights = schema.find(
      (collection) => collection.name === "cooperation_highlights",
    );
    const messages = schema.find((collection) => collection.name === "messages");

    expect(news?.listRule).toBe("is_published = true");
    expect(news?.viewRule).toBe("is_published = true");
    expect(homeSections?.listRule).toBe("is_published = true");
    expect(homeSections?.viewRule).toBe("is_published = true");
    expect(homeHero?.listRule).toBe("is_published = true");
    expect(homeHero?.viewRule).toBe("is_published = true");
    expect(homeAbout?.listRule).toBe("is_published = true");
    expect(homeAbout?.viewRule).toBe("is_published = true");
    expect(advantages?.listRule).toBe("is_published = true");
    expect(advantages?.viewRule).toBe("is_published = true");
    expect(productCases?.listRule).toBe("is_published = true");
    expect(productCases?.viewRule).toBe("is_published = true");
    expect(cooperationHighlights?.listRule).toBe("is_published = true");
    expect(cooperationHighlights?.viewRule).toBe("is_published = true");
    expect(messages?.createRule).toBe("");
    expect(messages?.listRule).toBeNull();
    expect(messages?.viewRule).toBeNull();
    expect(messages?.fields.find((field) => field.name === "locale")?.values).toContain("en");
  });
});
