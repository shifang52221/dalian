import { describe, expect, it } from "vitest";
import { buildImportCollections } from "../../src/lib/pocketbase-schema";

describe("pocketbase schema import", () => {
  it("merges simplified schema into scaffolded base collections", () => {
    const scaffolds = {
      base: {
        id: "",
        type: "base",
        name: "",
        system: false,
        listRule: null,
        viewRule: null,
        createRule: null,
        updateRule: null,
        deleteRule: null,
        fields: [],
        indexes: [],
      },
    };

    const collections = buildImportCollections(
      [
        {
          name: "news",
          fields: [
            { name: "title_zh", type: "text" },
            { name: "title_ja", type: "text" },
          ],
        },
      ],
      scaffolds,
    );

    expect(collections[0]?.name).toBe("news");
    expect(collections[0]?.type).toBe("base");
    expect(collections[0]?.fields[0]?.name).toBe("title_zh");
    expect(collections[0]?.fields[0]?.system).toBe(false);
  });

  it("preserves field-specific config such as select values", () => {
    const scaffolds = {
      base: {
        id: "",
        type: "base",
        name: "",
        system: false,
        listRule: null,
        viewRule: null,
        createRule: null,
        updateRule: null,
        deleteRule: null,
        fields: [],
        indexes: [],
      },
    };

    const collections = buildImportCollections(
      [
        {
          name: "messages",
          fields: [
            { name: "locale", type: "select", values: ["zh", "ja"] },
          ],
        },
      ],
      scaffolds,
    );

    expect(collections[0]?.fields[0]?.values).toEqual(["zh", "ja"]);
  });

  it("preserves existing collection ids and collection-level rules", () => {
    const scaffolds = {
      base: {
        id: "",
        type: "base",
        name: "",
        system: false,
        listRule: null,
        viewRule: null,
        createRule: null,
        updateRule: null,
        deleteRule: null,
        fields: [],
        indexes: [],
      },
    };

    const collections = buildImportCollections(
      [
        {
          name: "news",
          listRule: "is_published = true",
          viewRule: "is_published = true",
          fields: [{ name: "title_zh", type: "text" }],
        },
      ],
      scaffolds,
      [
        {
          id: "existing_news_id",
          name: "news",
        },
      ],
    );

    expect(collections[0]?.id).toBe("existing_news_id");
    expect(collections[0]?.listRule).toBe("is_published = true");
    expect(collections[0]?.viewRule).toBe("is_published = true");
  });
});
