import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";
import { getImageManifest } from "../../src/content/image-manifest";

describe("about enterprise intro", () => {
  it("uses document-backed enterprise intro copy for the Chinese homepage", () => {
    const about = getFallbackHomeContent("zh").about;

    expect(about.eyebrow).toBe("公司简介");
    expect(about.title).toContain("大连");
    expect(about.description).toContain("中国辽东半岛最南端海滨城市");
    expect(about.description).toContain("连铸、连轧、冷轧等成套辊道设备");
    expect(about.description).toContain("堆焊、喷焊、热处理、喷丸、装配");
    expect(about.description).toContain("\n\n");
    expect(about.points).toHaveLength(3);
    expect(about.points[0]).toBe("以质求生、以严求精、以诚求信是我公司的宗旨。");
    expect(about.points[1]).toBe("高效率、低成本，为用户提供高质量的产品及服务是我公司的目标。");
    expect(about.points[2]).toBe("用户的改进需求是我公司技术研发、创新的方向。");
  });

  it("points the about image slot at the local dalian coast webp asset", () => {
    const manifest = getImageManifest();

    expect(manifest.about.src).toContain("dalian-coast-card.webp");
    expect(manifest.about.alt).toContain("大连");
  });

  it("renders the shaped media card and editorial copy as multiple paragraphs", () => {
    const stylesheet = readFileSync(
      resolve("f:/www/www13dalian/src/styles/global.css"),
      "utf8",
    );
    const about = readFileSync(
      resolve("f:/www/www13dalian/src/components/home/About.astro"),
      "utf8",
    );

    expect(about).not.toContain("about-image-card__badge--minimal");
    expect(about).not.toContain("content.badge.value");
    expect(about).toContain('content.description.split("\\n\\n")');
    expect(about).toContain("about-shell__headline--inside about-motion-block");
    expect(about).toContain("about-enterprise-copy__paragraph");
    expect(about).toContain("about-enterprise-copy__paragraph about-motion-line");
    expect(about).toContain("feature-line feature-line--about about-motion-line");
    expect(stylesheet).toContain(".about-image-card--dalian {");
    expect(stylesheet).toContain("clip-path: polygon(");
    expect(stylesheet).toContain(".about-enterprise-copy {");
    expect(stylesheet).toContain(".about-enterprise-copy__paragraph {");
    expect(stylesheet).toContain(".about-enterprise-points {");
    expect(stylesheet).toContain("gap: 18px;");
  });
});
