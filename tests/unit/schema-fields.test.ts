import { describe, expect, it } from "vitest";
import schema from "../../pocketbase/schema/collections.json";

describe("PocketBase schema", () => {
  it("includes bilingual fields for news", () => {
    const news = schema.find((collection) => collection.name === "news");
    const fieldNames = news?.fields.map((field) => field.name) ?? [];

    expect(fieldNames).toContain("title_zh");
    expect(fieldNames).toContain("title_ja");
    expect(fieldNames).toContain("cover_image");
  });

  it("defines public content rules and keeps messages private", () => {
    const news = schema.find((collection) => collection.name === "news");
    const homeSections = schema.find((collection) => collection.name === "home_sections");
    const messages = schema.find((collection) => collection.name === "messages");

    expect(news?.listRule).toBe("is_published = true");
    expect(news?.viewRule).toBe("is_published = true");
    expect(homeSections?.listRule).toBe("is_published = true");
    expect(homeSections?.viewRule).toBe("is_published = true");
    expect(messages?.createRule).toBeNull();
    expect(messages?.listRule).toBeNull();
    expect(messages?.viewRule).toBeNull();
  });
});
