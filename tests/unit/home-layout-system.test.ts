import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("home layout system", () => {
  it("uses expanded reference-inspired structures across key homepage sections", () => {
    const hero = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Hero.astro"),
      "utf8",
    );
    const fallbackContent = readFileSync(
      resolve("f:/www/www13dalian/src/content/fallback/site-content.ts"),
      "utf8",
    );
    const about = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/About.astro"),
      "utf8",
    );
    const capabilities = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Capabilities.astro"),
      "utf8",
    );
    const advantages = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Advantages.astro"),
      "utf8",
    );
    const projects = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Projects.astro"),
      "utf8",
    );
    const testimonials = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/Testimonials.astro"),
      "utf8",
    );
    const newsPreview = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/NewsPreview.astro"),
      "utf8",
    );

    expect(hero).toContain("hero__aside");
    expect(hero).toContain("hero-spotlight");
    expect(hero).toContain("hero__intro");
    expect(hero).toContain("hero__content-stack");
    expect(hero).toContain("hero__title-stack");
    expect(hero).toContain("hero__title-display");
    expect(hero).toContain("content.titleLines");
    expect(hero).toContain("hero__eyebrow-band");
    expect(hero).toContain("hero__eyebrow-dot");
    expect(hero).toContain("hero__lead-shell");
    expect(hero).toContain("hero__title-line");
    expect(hero).toContain("hero__action-row");
    expect(hero).toContain("hero__action-block");
    expect(hero).toContain("hero__partner-row");
    expect(hero).toContain("hero__sector-panel");
    expect(hero).toContain("hero__sector-grid");
    expect(hero).toContain("hero-figure");
    expect(hero).toContain("hero-floating-badge");
    expect(hero).toContain("hero-floating-badge__icon");
    expect(hero).toContain("hero-floating-badge__text");
    expect(hero).toContain("hero-highlight--minimal");
    expect(hero).toContain("content.stats.map");
    expect(hero).toContain("content.highlights.map");
    expect(hero).not.toContain("splitHeroTitle");
    expect(hero).not.toContain("hero__action-caption");
    expect(hero).not.toContain("hero__sector-head");
    expect(hero).not.toContain("hero__sector-title");
    expect(hero).not.toContain("hero-side-note");
    expect(hero).not.toContain("hero-spotlight__panel");
    expect(hero).not.toContain("ENGINEERING FOCUS");
    expect(hero).not.toContain("Integrated fabrication, repair, and surface engineering support for steel equipment programs.");
    expect(hero).not.toContain("Delivery Rhythm");
    expect(hero).not.toContain("Core Sectors");
    expect(hero).not.toContain("Built for fabrication, shutdown support, and long-cycle asset care.");

    expect(fallbackContent).toContain('titleLines: ["面向连铸连轧场景的制造", "与表面强化解决方案"]');
    expect(fallbackContent).toContain('highlights: ["连铸设备", "连轧设备", "冷轧设备", "表面强化"]');
    expect(fallbackContent).toContain('{ value: "15吨", label: "埋弧堆焊设备" }');
    expect(fallbackContent).toContain('{ value: "3吨", label: "明弧堆焊设备" }');
    expect(fallbackContent).toContain('{ value: "3吨", label: "埋弧堆焊设备" }');

    expect(about).toContain("about-shell");
    expect(about).toContain("about-copy-flow");
    expect(about).toContain("about-points-grid");

    expect(capabilities).toContain("capabilities-layout");
    expect(capabilities).toContain("capabilities-lead");
    expect(capabilities).toContain("capabilities-grid");

    expect(advantages).toContain("advantages-shell");
    expect(advantages).toContain("advantages-layout");
    expect(advantages).toContain("advantages-grid--expanded");

    expect(projects).toContain("projects-shell");
    expect(projects).toContain("projects-feature");
    expect(projects).toContain("projects-mosaic");

    expect(testimonials).toContain("testimonial-shell");
    expect(testimonials).toContain("testimonial-layout");
    expect(testimonials).toContain("testimonial-grid");
    expect(testimonials).toContain("testimonial-card--editorial");

    expect(newsPreview).toContain("news-preview-shell");
    expect(newsPreview).toContain("news-preview-lead");
  });
});
