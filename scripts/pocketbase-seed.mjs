import fs from "node:fs/promises";
import path from "node:path";
import PocketBase from "pocketbase";
import { loadLocalEnv } from "./load-env.mjs";

function getSeedFilename(collection) {
  return `${collection.replaceAll("_", "-")}.json`;
}

function createSeedPlan(schema, seedFiles) {
  const available = new Set(seedFiles);

  return schema
    .map((collection) => ({
      collection: collection.name,
      seedFile: getSeedFilename(collection.name),
    }))
    .filter((item) => available.has(item.seedFile));
}

await loadLocalEnv();

const cwd = process.cwd();
const schemaPath = path.join(cwd, "pocketbase", "schema", "collections.json");
const seedDir = path.join(cwd, "pocketbase", "seed");
const pbUrl = process.env.PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090";
const adminEmail = process.env.PB_ADMIN_EMAIL;
const adminPassword = process.env.PB_ADMIN_PASSWORD;
const shouldReset = process.argv.includes("--reset");

if (!adminEmail || !adminPassword) {
  console.error("PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD are required.");
  process.exit(1);
}

const schema = JSON.parse(await fs.readFile(schemaPath, "utf8"));
const seedFiles = await fs.readdir(seedDir);
const plan = createSeedPlan(schema, seedFiles);

const pb = new PocketBase(pbUrl);
await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

for (const item of plan) {
  const records = JSON.parse(
    await fs.readFile(path.join(seedDir, item.seedFile), "utf8"),
  );

  const collectionApi = pb.collection(item.collection);

  if (shouldReset) {
    const existing = await collectionApi.getFullList();
    for (const record of existing) {
      await collectionApi.delete(record.id);
    }
  }

  const existingAfterReset = await collectionApi.getFullList();
  if (existingAfterReset.length > 0 && !shouldReset) {
    console.log(`Skipping ${item.collection}: existing records found.`);
    continue;
  }

  for (const record of records) {
    await collectionApi.create(record);
  }

  console.log(`Seeded ${item.collection} from ${item.seedFile}`);
}
