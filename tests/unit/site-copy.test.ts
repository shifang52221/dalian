import { describe, expect, it } from "vitest";
import { getSiteCopy } from "../../src/content/site-copy";

describe("site copy", () => {
  it("returns clean Japanese navigation labels", () => {
    const copy = getSiteCopy("ja");

    expect(copy.nav[0]?.label).toBe("ホーム");
    expect(copy.footer.contactTitle).toBe("連絡先");
  });

  it("returns clean Chinese navigation labels", () => {
    const copy = getSiteCopy("zh");

    expect(copy.nav[0]?.label).toBe("首页");
    expect(copy.footer.contactTitle).toBe("联系信息");
  });
});
