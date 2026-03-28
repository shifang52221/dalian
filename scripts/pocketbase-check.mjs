import PocketBase from "pocketbase";
import { loadLocalEnv } from "./load-env.mjs";

function validateCmsEnv(input) {
  const requiredKeys = [
    "PUBLIC_POCKETBASE_URL",
    "PB_ADMIN_EMAIL",
    "PB_ADMIN_PASSWORD",
  ];
  const missing = requiredKeys.filter((key) => !String(input[key] ?? "").trim());
  return { ok: missing.length === 0, missing };
}

function buildCmsCheckSummary(result) {
  const lines = [
    `Environment: ${result.envOk ? "OK" : "FAIL"}`,
    `Auth: ${result.authOk ? "OK" : "FAIL"}`,
  ];

  for (const collection of result.collections) {
    const suffix = collection.ok
      ? `OK (${collection.count ?? 0})`
      : `FAIL${collection.error ? ` - ${collection.error}` : ""}`;
    lines.push(`${collection.name}: ${suffix}`);
  }

  return lines.join("\n");
}

await loadLocalEnv();

const env = {
  PUBLIC_POCKETBASE_URL: process.env.PUBLIC_POCKETBASE_URL,
  PB_ADMIN_EMAIL: process.env.PB_ADMIN_EMAIL,
  PB_ADMIN_PASSWORD: process.env.PB_ADMIN_PASSWORD,
};

const validation = validateCmsEnv(env);
if (!validation.ok) {
  console.error(`Missing env vars: ${validation.missing.join(", ")}`);
  process.exit(1);
}

const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);
const collectionsToCheck = [
  "site_settings",
  "home_sections",
  "capabilities",
  "product_cases",
  "news",
  "messages",
];

const result = {
  envOk: true,
  authOk: false,
  collections: [],
};

try {
  await pb.collection("_superusers").authWithPassword(
    env.PB_ADMIN_EMAIL,
    env.PB_ADMIN_PASSWORD,
  );
  result.authOk = true;
} catch (error) {
  console.error("PocketBase auth failed.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

for (const name of collectionsToCheck) {
  try {
    const records = await pb.collection(name).getFullList({ perPage: 1 });
    result.collections.push({
      name,
      ok: true,
      count: records.length,
    });
  } catch (error) {
    result.collections.push({
      name,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

console.log(buildCmsCheckSummary(result));
