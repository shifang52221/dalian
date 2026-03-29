import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("PocketBase script env wiring", () => {
  it("loads local .env values before reading cms credentials", () => {
    const checkScript = readFileSync(
      resolve("f:/www/www13dalian/scripts/pocketbase-check.mjs"),
      "utf8",
    );
    const setupScript = readFileSync(
      resolve("f:/www/www13dalian/scripts/pocketbase-setup.mjs"),
      "utf8",
    );
    const seedScript = readFileSync(
      resolve("f:/www/www13dalian/scripts/pocketbase-seed.mjs"),
      "utf8",
    );
    const migrateHomeImagesScript = readFileSync(
      resolve("f:/www/www13dalian/scripts/pocketbase-migrate-home-images.mjs"),
      "utf8",
    );

    expect(checkScript).toContain('./load-env.mjs');
    expect(setupScript).toContain('./load-env.mjs');
    expect(seedScript).toContain('./load-env.mjs');
    expect(migrateHomeImagesScript).toContain('./load-env.mjs');
    expect(checkScript).toContain("await loadLocalEnv();");
    expect(setupScript).toContain("await loadLocalEnv();");
    expect(seedScript).toContain("await loadLocalEnv();");
    expect(migrateHomeImagesScript).toContain("await loadLocalEnv();");
  });
});
