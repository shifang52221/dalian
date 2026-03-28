import { describe, expect, it } from "vitest";
import { POST } from "../../src/pages/api/contact";

describe("contact api locale handling", () => {
  it("returns a Japanese error message for invalid Japanese submissions", async () => {
    const formData = new FormData();
    formData.set("name", "");
    formData.set("company", "test company");
    formData.set("email", "bad");
    formData.set("phone", "13591839861");
    formData.set("locale", "ja");
    formData.set("message", "");

    const response = await POST({
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        body: formData,
      }),
    } as never);

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.message).toBe(
      "送信に失敗しました。しばらくしてから再度お試しください。",
    );
  });
});
