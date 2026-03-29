import { describe, expect, it } from "vitest";
import {
  buildHomepageImageMigrationPlan,
  getProductCaseImagePath,
} from "../../src/lib/pocketbase-homepage-image-migration";

function normalizePath(value: string) {
  return value.replaceAll("\\", "/");
}

describe("pocketbase homepage image migration", () => {
  it("builds the full migration plan for homepage static images", () => {
    const plan = buildHomepageImageMigrationPlan({
      baseDir: "f:/www/www13dalian",
      heroRecord: { id: "hero-1" },
      aboutRecord: { id: "about-1" },
      capabilities: [
        { id: "cap-1", preview_group: "maihu" },
        { id: "cap-2", preview_group: "minghu" },
        { id: "cap-3", preview_group: "denglizi" },
        { id: "cap-4", preview_group: "huoyan" },
        { id: "cap-5", preview_group: "rechuli" },
        { id: "cap-6", preview_group: "zhijian" },
      ],
      productCases: [
        { id: "prod-1", category_zh: "连铸设备" },
        { id: "prod-2", category_zh: "连轧设备" },
        { id: "prod-3", category_zh: "其他产品" },
      ],
    });

    expect(plan).toHaveLength(11);
    expect(plan[0]).toMatchObject({
      collection: "home_hero",
      recordId: "hero-1",
      field: "hero_image",
    });
    expect(normalizePath(plan[0]!.filePath)).toContain("/public/images/horl.webp");

    expect(plan[1]).toMatchObject({
      collection: "home_about",
      recordId: "about-1",
      field: "image",
    });
    expect(normalizePath(plan[1]!.filePath)).toContain("/public/images/dalian-coast-card.webp");

    expect(
      plan
        .filter((item) => item.collection === "capabilities")
        .map((item) => normalizePath(item.filePath)),
    ).toEqual([
      "f:/www/www13dalian/public/images/capabilities/maihu.jpg",
      "f:/www/www13dalian/public/images/capabilities/minghu.jpg",
      "f:/www/www13dalian/public/images/capabilities/denglizi.jpg",
      "f:/www/www13dalian/public/images/capabilities/huoyan.jpg",
      "f:/www/www13dalian/public/images/capabilities/rechuli.jpg",
      "f:/www/www13dalian/public/images/capabilities/zhijian.jpg",
    ]);

    expect(
      plan
        .filter((item) => item.collection === "product_cases")
        .map((item) => normalizePath(item.filePath)),
    ).toEqual([
      "f:/www/www13dalian/public/images/boheng-crops/gallery-workshop.png",
      "f:/www/www13dalian/public/images/boheng-crops/gallery-machine.png",
      "f:/www/www13dalian/public/images/boheng-crops/gallery-fire-spray.png",
    ]);
  });

  it("maps product case images from either chinese or japanese category names", () => {
    expect(
      normalizePath(getProductCaseImagePath("f:/www/www13dalian", "连铸设备") ?? ""),
    ).toContain("/public/images/boheng-crops/gallery-workshop.png");
    expect(
      normalizePath(getProductCaseImagePath("f:/www/www13dalian", "圧延設備") ?? ""),
    ).toContain("/public/images/boheng-crops/gallery-machine.png");
    expect(
      normalizePath(getProductCaseImagePath("f:/www/www13dalian", "その他製品") ?? ""),
    ).toContain("/public/images/boheng-crops/gallery-fire-spray.png");
  });
});
