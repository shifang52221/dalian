import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("home header scroll appearance", () => {
  it("marks the homepage shell and wires the sticky header reveal behavior", () => {
    const layout = readFileSync(resolve("f:/www/www13dalian/src/layouts/BaseLayout.astro"), "utf8");
    const header = readFileSync(resolve("f:/www/www13dalian/src/components/site/Header.astro"), "utf8");
    const script = readFileSync(resolve("f:/www/www13dalian/src/scripts/site-effects.js"), "utf8");
    const stylesheet = readFileSync(resolve("f:/www/www13dalian/src/styles/global.css"), "utf8");

    expect(layout).toContain("isHomePage");
    expect(layout).toContain("page--home");
    expect(header).toContain("site-header--home");
    expect(script).toContain("document.body.classList.contains(\"page--home\")");
    expect(script).toContain("headerElement?.classList.toggle(\"is-visible\"");
    expect(stylesheet).toContain(".site-header--home {");
    expect(stylesheet).toContain(".site-header--home.is-visible {");
    expect(stylesheet).toContain(".site-header--home .navbar__surface {");
    expect(stylesheet).toContain("background: transparent;");
    expect(stylesheet).toContain("opacity: 0;");
    expect(stylesheet).toContain("transform: translateY(-18px);");
    expect(stylesheet).toContain("opacity: 1;");
  });

  it("does not block homepage scrolling behind a forced preloader delay", () => {
    const script = readFileSync(resolve("f:/www/www13dalian/src/scripts/site-effects.js"), "utf8");

    expect(script).not.toContain('document.body.style.overflow = "hidden";');
    expect(script).not.toContain('}, reduceMotion ? 100 : 900);');
    expect(script).not.toContain('document.body.style.overflow = "visible";');
  });
});
