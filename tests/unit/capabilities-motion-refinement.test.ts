import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities motion refinement", () => {
  it("adds restrained staged motion to the capabilities lead and cards", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("capabilities-motion-block");
    expect(component).toContain("capabilities-motion-line");
    expect(stylesheet).toContain(".capabilities-motion-block {");
    expect(stylesheet).toContain(".capabilities-motion-line {");
    expect(stylesheet).toContain(".capabilities-lead.is-visible .capabilities-motion-line");
    expect(stylesheet).toContain(".service-card--capability[data-reveal]");
    expect(stylesheet).toContain("transform: translateY(20px) scale(0.985);");
    expect(stylesheet).toContain('.service-card--capability[data-delay=\"300\"]');
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).not.toContain("transform: translateY(48px);");
  });
});
