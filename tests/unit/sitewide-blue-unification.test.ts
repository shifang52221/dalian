import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("sitewide blue unification", () => {
  it("uses one blue brand system across global tokens and shared ui primitives", () => {
    const globalCss = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const button = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/button.tsx"),
      "utf8",
    );
    const input = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/input.tsx"),
      "utf8",
    );
    const textarea = readFileSync(
      resolve("f:/www/www13dalian/src/components/ui/textarea.tsx"),
      "utf8",
    );

    expect(globalCss).toContain("--primary: #2c6ea3;");
    expect(globalCss).toContain("--primary-dark: #163a59;");
    expect(globalCss).toContain("--accent: #79baf3;");
    expect(globalCss).toContain("--accent-warm: #9fd2ff;");
    expect(globalCss).toContain("--accent-warm-strong: #79baf3;");
    expect(globalCss).toContain("--success: #5caeea;");
    expect(globalCss).not.toContain("--accent: #ff9f1a;");
    expect(globalCss).not.toContain("--success: #22c55e;");

    expect(button).toContain("ui-button");
    expect(button).toContain("ui-button--primary");
    expect(button).not.toContain("rgba(212,164,92,0.28)");

    expect(input).toContain("ui-input");
    expect(textarea).toContain("ui-input ui-textarea");
    expect(globalCss).toContain(".ui-button--primary");
    expect(globalCss).toContain("background: linear-gradient(135deg, var(--accent-warm), var(--accent-warm-strong));");
    expect(globalCss).toContain("box-shadow: 0 18px 38px rgba(121, 186, 243, 0.24);");
    expect(globalCss).toContain(".ui-input:focus-visible,");
  });
});
