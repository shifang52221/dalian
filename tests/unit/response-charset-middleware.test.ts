import { describe, expect, it, vi } from "vitest";

vi.mock("astro:middleware", () => ({
  defineMiddleware: (handler: unknown) => handler,
}));

describe("response charset middleware", () => {
  it("adds utf-8 charset to html responses", async () => {
    const { onRequest } = await import("../../src/middleware");
    const response = await onRequest({} as never, async () => {
      return new Response("<html></html>", {
        headers: {
          "content-type": "text/html",
        },
      });
    });

    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
  });

  it("adds utf-8 charset to json responses", async () => {
    const { onRequest } = await import("../../src/middleware");
    const response = await onRequest({} as never, async () => {
      return new Response('{"ok":true}', {
        headers: {
          "content-type": "application/json",
        },
      });
    });

    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
  });

  it("adds baseline security headers to responses", async () => {
    const { onRequest } = await import("../../src/middleware");
    const response = await onRequest({} as never, async () => {
      return new Response("<html></html>", {
        headers: {
          "content-type": "text/html",
        },
      });
    });

    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("permissions-policy")).toContain("geolocation=()");
    expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
  });
});
