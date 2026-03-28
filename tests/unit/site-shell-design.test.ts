import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("premium shell design", () => {
  it("adds premium tokens and upgraded shell structure for header/footer", () => {
    const globalCss = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const header = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Header.astro"),
      "utf8",
    );
    const footer = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/Footer.astro"),
      "utf8",
    );
    const languageSwitch = readFileSync(
      resolve("f:/www/www13dalian/src/components/site/LanguageSwitch.astro"),
      "utf8",
    );

    expect(globalCss).toContain("--bg-canvas:");
    expect(globalCss).toContain("--surface-glass:");
    expect(globalCss).toContain("--accent-warm:");
    expect(globalCss).toContain("--shell-blur:");
    expect(globalCss).toContain(".navbar.scrolled {");
    expect(globalCss).toContain("background: transparent;");
    expect(globalCss).toContain("box-shadow: none;");
    expect(globalCss).toContain(".navbar__surface {");
    expect(globalCss).toContain(".navbar__actions {");
    expect(globalCss).toContain(".navbar-brand {");
    expect(globalCss).toContain("padding: 12px 0;");
    expect(globalCss).toContain("border-radius: 0;");
    expect(globalCss).toContain(".hero--immersive {");
    expect(globalCss).toContain(".site-header {");
    expect(globalCss).toContain("position: fixed;");
    expect(globalCss).toContain(".site-header--home {");
    expect(globalCss).toContain(".site-header--home.is-visible {");
    expect(globalCss).toContain("--content-width: min(1440px, calc(100% - 48px));");
    expect(globalCss).toContain(".hero__wrap {");
    expect(globalCss).toContain("width: var(--content-width);");
    expect(globalCss).toContain("max-width: 11.8ch;");
    expect(globalCss).toContain("font-size: clamp(2.9rem, 4.1vw, 4.2rem);");
    expect(globalCss).toContain("line-height: 1.14;");
    expect(globalCss).toContain("font-size: 0.96rem;");
    expect(globalCss).toContain("white-space: nowrap;");
    expect(globalCss).toContain("flex-wrap: nowrap;");
    expect(globalCss).toContain("gap: 14px;");
    expect(globalCss).toContain("border-radius: 24px 14px 22px 12px;");
    expect(globalCss).not.toContain(".hero-highlight:nth-child(2) {");
    expect(globalCss).not.toContain(".hero-highlight:nth-child(3) {");
    expect(globalCss).not.toContain("margin-left: 34px;");
    expect(globalCss).not.toContain("border-top: 1px solid rgba(255, 255, 255, 0.12);");
    expect(globalCss).toContain("min-width: 172px;");
    expect(globalCss).toContain(".hero-floating-badge__icon {");
    expect(globalCss).toContain(".hero-floating-badge__text {");
    expect(globalCss).toContain("animation: heroBadgeFloat");
    expect(globalCss).toContain("--hero-accent-blue: #9fd2ff;");
    expect(globalCss).toContain("background: rgba(22, 58, 89, 0.84);");
    expect(globalCss).toContain("backdrop-filter: blur(12px);");
    expect(globalCss).toContain("radial-gradient(circle at 50% 50%, rgba(25, 50, 78, 0.98), rgba(11, 23, 37, 0.98));");
    expect(globalCss).toContain(".site-footer__brand-shell {");
    expect(globalCss).toContain("linear-gradient(180deg, rgba(246, 250, 255, 0.94), rgba(217, 229, 241, 0.86));");
    expect(globalCss).toContain("0 -8px 18px rgba(93, 140, 184, 0.12) inset;");
    expect(globalCss).toContain(".section__inner {");
    expect(globalCss).toContain(".container-shell {");

    expect(header).toContain("navbar__surface");
    expect(header).toContain("navbar__actions");
    expect(header).toContain("navbar-brand__statement");
    expect(header).not.toContain("navbar-contact");
    expect(footer).toContain("site-footer__backdrop");
    expect(footer).not.toContain("site-footer__panel");
    expect(footer).toContain("site-footer__bottom");
    expect(languageSwitch).toContain("language-switch__label");
    expect(languageSwitch).toContain("language-switch__track");
  });
});
