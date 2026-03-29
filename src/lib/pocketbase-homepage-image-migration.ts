import path from "node:path";

export interface HomepageImageMigrationRecord {
  id: string;
  preview_group?: string;
  category_zh?: string;
  category_ja?: string;
}

export interface HomepageImageMigrationPlanItem {
  collection: "home_hero" | "home_about" | "capabilities" | "product_cases";
  recordId: string;
  field: "hero_image" | "image" | "preview_image";
  filePath: string;
}

interface BuildHomepageImageMigrationPlanInput {
  baseDir?: string;
  heroRecord?: Pick<HomepageImageMigrationRecord, "id"> | null;
  aboutRecord?: Pick<HomepageImageMigrationRecord, "id"> | null;
  capabilities?: HomepageImageMigrationRecord[];
  productCases?: HomepageImageMigrationRecord[];
}

const capabilityImageByGroup = {
  maihu: "public/images/capabilities/maihu.jpg",
  minghu: "public/images/capabilities/minghu.jpg",
  denglizi: "public/images/capabilities/denglizi.jpg",
  huoyan: "public/images/capabilities/huoyan.jpg",
  rechuli: "public/images/capabilities/rechuli.jpg",
  zhijian: "public/images/capabilities/zhijian.jpg",
} as const;

const productCaseImageByCategory = {
  "连铸设备": "public/images/boheng-crops/gallery-workshop.png",
  "連鋳設備": "public/images/boheng-crops/gallery-workshop.png",
  "连轧设备": "public/images/boheng-crops/gallery-machine.png",
  "圧延設備": "public/images/boheng-crops/gallery-machine.png",
  "其他产品": "public/images/boheng-crops/gallery-fire-spray.png",
  "その他製品": "public/images/boheng-crops/gallery-fire-spray.png",
} as const;

function resolveFromBaseDir(baseDir: string, relativePath: string) {
  return path.resolve(baseDir, relativePath);
}

export function getCapabilityImagePath(baseDir: string, previewGroup?: string) {
  const key = String(previewGroup ?? "").trim() as keyof typeof capabilityImageByGroup;
  const relativePath = capabilityImageByGroup[key];
  return relativePath ? resolveFromBaseDir(baseDir, relativePath) : undefined;
}

export function getProductCaseImagePath(baseDir: string, category?: string) {
  const key = String(category ?? "").trim() as keyof typeof productCaseImageByCategory;
  const relativePath = productCaseImageByCategory[key];
  return relativePath ? resolveFromBaseDir(baseDir, relativePath) : undefined;
}

export function buildHomepageImageMigrationPlan(
  input: BuildHomepageImageMigrationPlanInput = {},
) {
  const baseDir = input.baseDir ? path.resolve(input.baseDir) : process.cwd();
  const plan: HomepageImageMigrationPlanItem[] = [];

  if (input.heroRecord?.id) {
    plan.push({
      collection: "home_hero",
      recordId: input.heroRecord.id,
      field: "hero_image",
      filePath: resolveFromBaseDir(baseDir, "public/images/horl.webp"),
    });
  }

  if (input.aboutRecord?.id) {
    plan.push({
      collection: "home_about",
      recordId: input.aboutRecord.id,
      field: "image",
      filePath: resolveFromBaseDir(baseDir, "public/images/dalian-coast-card.webp"),
    });
  }

  for (const record of input.capabilities ?? []) {
    const filePath = getCapabilityImagePath(baseDir, record.preview_group);
    if (!record.id || !filePath) {
      continue;
    }

    plan.push({
      collection: "capabilities",
      recordId: record.id,
      field: "preview_image",
      filePath,
    });
  }

  for (const record of input.productCases ?? []) {
    const filePath =
      getProductCaseImagePath(baseDir, record.category_zh) ??
      getProductCaseImagePath(baseDir, record.category_ja);

    if (!record.id || !filePath) {
      continue;
    }

    plan.push({
      collection: "product_cases",
      recordId: record.id,
      field: "image",
      filePath,
    });
  }

  return plan;
}
