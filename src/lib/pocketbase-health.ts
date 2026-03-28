export interface CmsEnvInput {
  PUBLIC_POCKETBASE_URL?: string;
  PB_ADMIN_EMAIL?: string;
  PB_ADMIN_PASSWORD?: string;
}

export interface CmsEnvValidation {
  ok: boolean;
  missing: string[];
}

export interface CmsCollectionStatus {
  name: string;
  ok: boolean;
  count?: number;
  error?: string;
}

export interface CmsCheckResult {
  envOk: boolean;
  authOk: boolean;
  collections: CmsCollectionStatus[];
}

const requiredKeys = [
  "PUBLIC_POCKETBASE_URL",
  "PB_ADMIN_EMAIL",
  "PB_ADMIN_PASSWORD",
] as const;

export function validateCmsEnv(input: CmsEnvInput): CmsEnvValidation {
  const missing = requiredKeys.filter((key) => !String(input[key] ?? "").trim());
  return {
    ok: missing.length === 0,
    missing: [...missing],
  };
}

export function buildCmsCheckSummary(result: CmsCheckResult) {
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
