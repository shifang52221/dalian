import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const trackedKeys = [
  "PUBLIC_POCKETBASE_URL",
  "PB_ADMIN_EMAIL",
  "PB_ADMIN_PASSWORD",
];

describe("loadLocalEnv", () => {
  afterEach(() => {
    for (const key of trackedKeys) {
      delete process.env[key];
    }
  });

  it("loads cms env values from a local .env file", async () => {
    const dir = await mkdtemp(join(tmpdir(), "www13dalian-env-"));

    try {
      await writeFile(
        join(dir, ".env"),
        [
          "PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090",
          "PB_ADMIN_EMAIL=admin@example.com",
          "PB_ADMIN_PASSWORD=change-me",
        ].join("\n"),
        "utf8",
      );

      const { loadLocalEnv } = await import("../../scripts/load-env.mjs");
      await loadLocalEnv(dir);

      expect(process.env.PUBLIC_POCKETBASE_URL).toBe("http://127.0.0.1:8090");
      expect(process.env.PB_ADMIN_EMAIL).toBe("admin@example.com");
      expect(process.env.PB_ADMIN_PASSWORD).toBe("change-me");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("does not override already-defined process env values", async () => {
    const dir = await mkdtemp(join(tmpdir(), "www13dalian-env-"));

    try {
      process.env.PB_ADMIN_EMAIL = "shell@example.com";
      await writeFile(
        join(dir, ".env"),
        "PB_ADMIN_EMAIL=file@example.com\n",
        "utf8",
      );

      const { loadLocalEnv } = await import("../../scripts/load-env.mjs");
      await loadLocalEnv(dir);

      expect(process.env.PB_ADMIN_EMAIL).toBe("shell@example.com");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
