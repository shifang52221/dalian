import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("BaseLayout script asset", () => {
  it("references a browser-friendly JavaScript asset instead of a TypeScript URL", () => {
    const layout = readFileSync(
      resolve("f:/www/www13dalian/src/layouts/BaseLayout.astro"),
      "utf8",
    );

    expect(layout).toContain('../scripts/site-effects.js?url');
    expect(layout).not.toContain('../scripts/site-effects.ts?url');
  });
});
