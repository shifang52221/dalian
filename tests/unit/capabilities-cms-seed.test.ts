import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities cms seed", () => {
  it("defines the six homepage capability cards in PocketBase seed data", () => {
    const seed = JSON.parse(
      readFileSync(resolve("f:/www/www13dalian/pocketbase/seed/capabilities.json"), "utf8"),
    ) as Array<{ sort_order?: number }>;

    expect(seed).toHaveLength(6);
    expect(seed.map((item) => item.sort_order)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
