import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("homepage blue theme palette", () => {
  it("replaces the immersive green accent system with a lighter blue palette", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(stylesheet).toContain("--hero-accent-blue: #9fd2ff;");
    expect(stylesheet).toContain("--hero-accent-blue-strong: #79baf3;");
    expect(stylesheet).toContain("--hero-accent-blue-glow: rgba(121, 186, 243, 0.24);");
    expect(stylesheet).toContain("--hero-surface-blue: #0f1c2a;");
    expect(stylesheet).toContain("background: linear-gradient(135deg, var(--hero-accent-blue), var(--hero-accent-blue-strong));");
    expect(stylesheet).not.toContain("background: linear-gradient(135deg, #bff9a9 0%, #9cf07b 100%);");
    expect(stylesheet).not.toContain("background: linear-gradient(135deg, #d7ffbf 0%, #baf59f 100%);");
    expect(stylesheet).not.toContain("background: #101a12;");
  });
});
