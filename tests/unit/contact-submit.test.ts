import { describe, expect, it } from "vitest";
import { submitContactMessage } from "../../src/actions/contact";

describe("submitContactMessage", () => {
  it("writes a normalized message payload", async () => {
    const calls: Array<{ collection: string; payload: Record<string, unknown> }> = [];
    const client = {
      collection(name: string) {
        return {
          async create(payload: Record<string, unknown>) {
            calls.push({ collection: name, payload });
            return { id: "msg_1", ...payload };
          },
        };
      },
    };

    await submitContactMessage(client, {
      name: "张三",
      company: "测试公司",
      email: "test@example.com",
      phone: "13591839861",
      locale: "zh",
      message: "需要了解辊子修复方案",
    });

    expect(calls[0]?.collection).toBe("messages");
    expect(calls[0]?.payload.is_processed).toBe(false);
    expect(calls[0]?.payload.locale).toBe("zh");
  });
});
