import { describe, expect, it } from "vitest";
import { getNewsUrl } from "../../src/lib/i18n";

describe("getNewsUrl", () => {
  it("builds Japanese news detail URLs", () => {
    expect(getNewsUrl("expo-2026", "ja")).toBe("/ja/news/expo-2026");
  });
});
