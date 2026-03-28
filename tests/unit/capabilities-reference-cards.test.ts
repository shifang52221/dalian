import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("capabilities reference cards", () => {
  it("uses centered icon cards with a solid theme-color hover state", () => {
    const component = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(component).toContain("service-card service-card--capability");
    expect(component).toContain("capability-card__icon-shell");
    expect(component).toContain("capability-card__body");
    expect(stylesheet).toContain(".service-card--capability {");
    expect(stylesheet).toContain("justify-items: center;");
    expect(stylesheet).toContain("text-align: center;");
    expect(stylesheet).toContain(".service-card--capability:hover {");
    expect(stylesheet).toContain("background: var(--primary);");
    expect(stylesheet).not.toContain(".service-card--capability::before");
  });
});
