import fs from "node:fs/promises";
import path from "node:path";
import PocketBase from "pocketbase";
import { loadLocalEnv } from "./load-env.mjs";

const capabilityImageByGroup = {
  maihu: "public/images/capabilities/maihu.jpg",
  minghu: "public/images/capabilities/minghu.jpg",
  denglizi: "public/images/capabilities/denglizi.jpg",
  huoyan: "public/images/capabilities/huoyan.jpg",
  rechuli: "public/images/capabilities/rechuli.jpg",
  zhijian: "public/images/capabilities/zhijian.jpg",
};

const productCaseImageByCategory = {
  "连铸设备": "public/images/boheng-crops/gallery-workshop.png",
  "連鋳設備": "public/images/boheng-crops/gallery-workshop.png",
  "连轧设备": "public/images/boheng-crops/gallery-machine.png",
  "圧延設備": "public/images/boheng-crops/gallery-machine.png",
  "其他产品": "public/images/boheng-crops/gallery-fire-spray.png",
  "その他製品": "public/images/boheng-crops/gallery-fire-spray.png",
};

function buildImagePart(fileBuffer, filename) {
  return new File([fileBuffer], filename, {
    type: "application/octet-stream",
  });
}

function resolveFromBaseDir(baseDir, relativePath) {
  return path.resolve(baseDir, relativePath);
}

function buildHomepageImageMigrationPlan(baseDir, records) {
  const plan = [];

  if (records.heroRecord?.id) {
    plan.push({
      collection: "home_hero",
      recordId: records.heroRecord.id,
      field: "hero_image",
      filePath: resolveFromBaseDir(baseDir, "public/images/horl.webp"),
    });
  }

  if (records.aboutRecord?.id) {
    plan.push({
      collection: "home_about",
      recordId: records.aboutRecord.id,
      field: "image",
      filePath: resolveFromBaseDir(baseDir, "public/images/dalian-coast-card.webp"),
    });
  }

  for (const record of records.capabilities ?? []) {
    const relativePath = capabilityImageByGroup[String(record.preview_group ?? "").trim()];
    if (!relativePath || !record.id) {
      continue;
    }

    plan.push({
      collection: "capabilities",
      recordId: record.id,
      field: "preview_image",
      filePath: resolveFromBaseDir(baseDir, relativePath),
    });
  }

  for (const record of records.productCases ?? []) {
    const relativePath =
      productCaseImageByCategory[String(record.category_zh ?? "").trim()] ??
      productCaseImageByCategory[String(record.category_ja ?? "").trim()];

    if (!relativePath || !record.id) {
      continue;
    }

    plan.push({
      collection: "product_cases",
      recordId: record.id,
      field: "image",
      filePath: resolveFromBaseDir(baseDir, relativePath),
    });
  }

  return plan;
}

await loadLocalEnv();

const cwd = process.cwd();
const pbUrl = process.env.PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090";
const adminEmail = process.env.PB_ADMIN_EMAIL;
const adminPassword = process.env.PB_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error("PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD are required.");
  process.exit(1);
}

const pb = new PocketBase(pbUrl);
await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

const heroRecords = await pb.collection("home_hero").getFullList();
const aboutRecords = await pb.collection("home_about").getFullList();
const capabilities = await pb.collection("capabilities").getFullList();
const productCases = await pb.collection("product_cases").getFullList();

const plan = buildHomepageImageMigrationPlan(cwd, {
  heroRecord: heroRecords[0],
  aboutRecord: aboutRecords[0],
  capabilities,
  productCases,
});

for (const item of plan) {
  try {
    const fileBuffer = await fs.readFile(item.filePath);
    const formData = new FormData();
    formData.set(item.field, buildImagePart(fileBuffer, path.basename(item.filePath)));

    await pb.collection(item.collection).update(item.recordId, formData);
    console.log(`Uploaded ${item.collection}.${item.field} for ${item.recordId}`);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      console.warn(`Skipping missing file: ${item.filePath}`);
      continue;
    }

    throw error;
  }
}

console.log("Homepage image migration finished.");
