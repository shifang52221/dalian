import { beforeEach, describe, expect, it, vi } from "vitest";

describe("contact api error handling", () => {
  function createValidFormData(locale: "zh" | "ja" = "zh") {
    const formData = new FormData();
    formData.set("name", "张三");
    formData.set("company", "测试公司");
    formData.set("email", "test@example.com");
    formData.set("phone", "13591839861");
    formData.set("locale", locale);
    formData.set("message", "需要帮助");
    return formData;
  }

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.doMock("../../src/actions/contact", () => ({
      submitContactMessage: vi.fn(async () => ({ id: "msg_1" })),
    }));
    vi.doMock("../../src/lib/pocketbase", () => ({
      pb: {},
    }));
  });

  it("returns utf-8 json headers for validation errors", async () => {
    const { POST } = await import("../../src/pages/api/contact");
    const formData = new FormData();
    formData.set("name", "");
    formData.set("company", "test company");
    formData.set("email", "bad");
    formData.set("phone", "13591839861");
    formData.set("locale", "zh");
    formData.set("message", "");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: formData,
      }),
    } as never);

    expect(response.status).toBe(400);
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
  });

  it("returns a server error when message persistence fails after validation", async () => {
    vi.doMock("../../src/actions/contact", () => ({
      submitContactMessage: vi.fn(async () => {
        throw new Error("PocketBase offline");
      }),
    }));
    vi.doMock("../../src/lib/pocketbase", () => ({
      pb: {},
    }));

    const { POST } = await import("../../src/pages/api/contact");
    const formData = new FormData();
    formData.set("name", "张三");
    formData.set("company", "测试公司");
    formData.set("email", "test@example.com");
    formData.set("phone", "13591839861");
    formData.set("locale", "ja");
    formData.set("message", "需要帮助");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: formData,
      }),
    } as never);

    expect(response.status).toBe(500);
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");

    const body = await response.json();
    expect(body.ok).toBe(false);
  });

  it("accepts json submissions for the public contact endpoint", async () => {
    const { POST } = await import("../../src/pages/api/contact");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://example.com",
        },
        body: JSON.stringify({
          name: "张三",
          company: "测试公司",
          email: "test@example.com",
          phone: "13591839861",
          locale: "zh",
          message: "需要帮助",
          website: "",
        }),
      }),
    } as never);

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  it("accepts same-origin contact submissions", async () => {
    const { POST } = await import("../../src/pages/api/contact");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: createValidFormData(),
        headers: {
          origin: "http://example.com",
          "x-real-ip": "203.0.113.20",
        },
      }),
    } as never);

    expect(response.status).toBe(200);
  });

  it("rejects cross-origin contact submissions", async () => {
    const { submitContactMessage } = await import("../../src/actions/contact");
    const { POST } = await import("../../src/pages/api/contact");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: createValidFormData(),
        headers: {
          origin: "https://evil.example.com",
          "x-real-ip": "203.0.113.21",
        },
      }),
    } as never);

    expect(response.status).toBe(403);
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it("accepts requests with a same-origin referer when origin is absent", async () => {
    const { POST } = await import("../../src/pages/api/contact");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: createValidFormData(),
        headers: {
          referer: "http://example.com/contact",
          "x-real-ip": "203.0.113.22",
        },
      }),
    } as never);

    expect(response.status).toBe(200);
  });

  it("rejects honeypot submissions before persistence", async () => {
    const { submitContactMessage } = await import("../../src/actions/contact");
    const { POST } = await import("../../src/pages/api/contact");
    const formData = createValidFormData();
    formData.set("website", "https://spam.example.com");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: formData,
        headers: {
          origin: "http://example.com",
          "x-real-ip": "203.0.113.10",
        },
      }),
    } as never);

    expect(response.status).toBe(400);
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from the same ip", async () => {
    const { POST } = await import("../../src/pages/api/contact");

    const makeRequest = async () => {
      return POST({
        request: new Request("http://example.com/api/contact", {
          method: "POST",
          body: createValidFormData(),
          headers: {
            origin: "http://example.com",
            "x-real-ip": "203.0.113.11",
          },
        }),
      } as never);
    };

    expect((await makeRequest()).status).toBe(200);
    expect((await makeRequest()).status).toBe(200);
    expect((await makeRequest()).status).toBe(200);
    expect((await makeRequest()).status).toBe(429);
  });

  it("uses x-real-ip ahead of spoofed forwarded chains for rate limiting", async () => {
    const { POST } = await import("../../src/pages/api/contact");

    const makeRequest = async (spoofedIp: string) =>
      POST({
        request: new Request("http://example.com/api/contact", {
          method: "POST",
          body: createValidFormData(),
          headers: {
            origin: "http://example.com",
            "x-real-ip": "203.0.113.30",
            "x-forwarded-for": `${spoofedIp}, 203.0.113.30`,
          },
        }),
      } as never);

    expect((await makeRequest("198.51.100.1")).status).toBe(200);
    expect((await makeRequest("198.51.100.2")).status).toBe(200);
    expect((await makeRequest("198.51.100.3")).status).toBe(200);
    expect((await makeRequest("198.51.100.4")).status).toBe(429);
  });
});
