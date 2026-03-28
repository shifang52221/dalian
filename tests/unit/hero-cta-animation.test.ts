import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("hero cta animation styles", () => {
  it("uses sweep-based primary motion and disables idle motion when reduced motion is requested", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );

    expect(stylesheet).not.toContain("animation: heroButtonPulse");
    expect(stylesheet).not.toContain("animation: heroButtonFloat");
    expect(stylesheet).toContain(".button--primary::before");
    expect(stylesheet).toContain("@keyframes heroButtonSweep");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
