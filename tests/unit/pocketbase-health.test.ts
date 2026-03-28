import { describe, expect, it } from "vitest";
import {
  buildCmsCheckSummary,
  validateCmsEnv,
} from "../../src/lib/pocketbase-health";

describe("pocketbase health helpers", () => {
  it("reports missing cms environment variables", () => {
    const result = validateCmsEnv({
      PUBLIC_POCKETBASE_URL: "",
      PB_ADMIN_EMAIL: "admin@example.com",
      PB_ADMIN_PASSWORD: "",
    });

    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(["PUBLIC_POCKETBASE_URL", "PB_ADMIN_PASSWORD"]);
  });

  it("builds a readable summary for a healthy check", () => {
    const summary = buildCmsCheckSummary({
      envOk: true,
      authOk: true,
      collections: [
        { name: "site_settings", ok: true, count: 1 },
        { name: "news", ok: true, count: 3 },
      ],
    });

    expect(summary).toContain("Environment: OK");
    expect(summary).toContain("news: OK (3)");
  });
});
