import fs from "node:fs/promises";
import path from "node:path";
import PocketBase from "pocketbase";
import { loadLocalEnv } from "./load-env.mjs";

function buildImagePart(fileBuffer, filename) {
  return new File([fileBuffer], filename, {
    type: "image/jpeg",
  });
}

function appendRecordFields(formData, record) {
  formData.set("slug", record.slug);
  formData.set("title_zh", record.title_zh);
  formData.set("title_ja", record.title_ja);
  formData.set("summary_zh", record.summary_zh);
  formData.set("summary_ja", record.summary_ja);
  formData.set("content_zh", record.content_zh);
  formData.set("content_ja", record.content_ja);
  formData.set("published_at", record.published_at);
  formData.set("is_published", String(record.is_published));
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

const recoveryJsonPath = path.join(cwd, "pocketbase", "recovery", "recovered-news.json");
const imageDir = path.join(cwd, "pocketbase", "recovery", "news-assets");
const records = JSON.parse(await fs.readFile(recoveryJsonPath, "utf8"));

const pb = new PocketBase(pbUrl);
await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

for (const record of records) {
  const imagePath = path.join(imageDir, record.cover_image_source);
  const imageBuffer = await fs.readFile(imagePath);
  const formData = new FormData();

  appendRecordFields(formData, record);
  formData.set(
    "cover_image",
    buildImagePart(imageBuffer, record.cover_image_source),
  );

  let existingRecord = null;
  try {
    existingRecord = await pb.collection("news").getFirstListItem(
      `slug="${record.slug}"`,
    );
  } catch {
    existingRecord = null;
  }

  if (existingRecord) {
    await pb.collection("news").update(existingRecord.id, formData);
    console.log(`Updated recovered news: ${record.slug}`);
  } else {
    await pb.collection("news").create(formData);
    console.log(`Created recovered news: ${record.slug}`);
  }
}

console.log("Recovered news restore finished.");
