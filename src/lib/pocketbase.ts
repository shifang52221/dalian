import PocketBase from "pocketbase";

const pocketbaseUrl =
  import.meta.env.PUBLIC_POCKETBASE_URL ?? "http://127.0.0.1:8090";
const adminEmail = import.meta.env.PB_ADMIN_EMAIL;
const adminPassword = import.meta.env.PB_ADMIN_PASSWORD;

export const pb = new PocketBase(pocketbaseUrl);

export function getPocketBaseUrl() {
  return pocketbaseUrl;
}

export async function getPocketBaseMessageWriter() {
  if (!adminEmail || !adminPassword) {
    throw new Error("PocketBase admin credentials are not configured.");
  }

  const client = new PocketBase(pocketbaseUrl);
  await client.collection("_superusers").authWithPassword(adminEmail, adminPassword);
  return client;
}
