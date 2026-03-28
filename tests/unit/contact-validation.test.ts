import { describe, expect, it } from "vitest";
import { contactSchema } from "../../src/lib/validation/contact";

describe("contactSchema", () => {
  it("rejects empty messages", () => {
    const result = contactSchema.safeParse({
      name: "张三",
      email: "test@example.com",
      phone: "13591839861",
      company: "测试公司",
      locale: "zh",
      message: "",
    });

    expect(result.success).toBe(false);
  });
});
