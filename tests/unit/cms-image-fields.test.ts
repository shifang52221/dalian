import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

interface SchemaCollection {
  name: string;
  fields?: Array<{
    name?: string;
    type?: string;
    maxSelect?: number;
  }>;
}

function getCollectionField(
  collections: SchemaCollection[],
  collectionName: string,
  fieldName: string,
) {
  return collections
    .find((collection) => collection.name === collectionName)
    ?.fields?.find((field) => field.name === fieldName);
}

describe("cms homepage image fields", () => {
  it("adds file upload fields for the main homepage image slots", () => {
    const collections = JSON.parse(
      readFileSync(
        resolve("f:/www/www13dalian/pocketbase/schema/collections.json"),
        "utf8",
      ),
    ) as SchemaCollection[];

    expect(getCollectionField(collections, "home_hero", "hero_image")).toMatchObject({
      type: "file",
      maxSelect: 1,
    });
    expect(getCollectionField(collections, "home_about", "image")).toMatchObject({
      type: "file",
      maxSelect: 1,
    });
    expect(
      getCollectionField(collections, "capabilities", "preview_image"),
    ).toMatchObject({
      type: "file",
      maxSelect: 1,
    });
    expect(getCollectionField(collections, "product_cases", "image")).toMatchObject({
      type: "file",
      maxSelect: 1,
    });
  });
});
