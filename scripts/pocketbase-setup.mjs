import fs from "node:fs/promises";
import path from "node:path";
import PocketBase from "pocketbase";
import { loadLocalEnv } from "./load-env.mjs";

function buildImportCollections(collections, scaffolds, existingCollections = []) {
  return collections.map((collection) => ({
    ...structuredClone(scaffolds.base),
    id: existingCollections.find((item) => item.name === collection.name)?.id ?? "",
    name: collection.name,
    listRule: collection.listRule ?? scaffolds.base.listRule,
    viewRule: collection.viewRule ?? scaffolds.base.viewRule,
    createRule: collection.createRule ?? scaffolds.base.createRule,
    updateRule: collection.updateRule ?? scaffolds.base.updateRule,
    deleteRule: collection.deleteRule ?? scaffolds.base.deleteRule,
    indexes: collection.indexes ?? structuredClone(scaffolds.base.indexes),
    fields: collection.fields.map((field, index) => ({
      ...field,
      id: `${collection.name}_${field.name}_${index}`,
      system: false,
      hidden: false,
      presentable: true,
    })),
  }));
}

await loadLocalEnv();

const pbUrl = process.env.PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090";
const adminEmail = process.env.PB_ADMIN_EMAIL;
const adminPassword = process.env.PB_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error("PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD are required.");
  process.exit(1);
}

const schemaPath = path.join(process.cwd(), "pocketbase", "schema", "collections.json");
const schema = JSON.parse(await fs.readFile(schemaPath, "utf8"));

const pb = new PocketBase(pbUrl);
await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

const scaffolds = await pb.collections.getScaffolds();
const existingCollections = await pb.collections.getFullList();
const collections = buildImportCollections(schema, scaffolds, existingCollections);

await pb.collections.import(collections, false);
console.log(`Imported ${collections.length} collections into PocketBase.`);
