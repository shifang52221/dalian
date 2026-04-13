import fs from "node:fs/promises";
import path from "node:path";

const cmsAdminKeys = new Set(["PB_ADMIN_EMAIL", "PB_ADMIN_PASSWORD"]);

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const normalized = trimmed.startsWith("export ")
    ? trimmed.slice("export ".length).trim()
    : trimmed;
  const separatorIndex = normalized.indexOf("=");
  if (separatorIndex <= 0) {
    return null;
  }

  const key = normalized.slice(0, separatorIndex).trim();
  if (!key) {
    return null;
  }

  let value = normalized.slice(separatorIndex + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  } else {
    const commentIndex = value.search(/\s#/);
    if (commentIndex >= 0) {
      value = value.slice(0, commentIndex).trimEnd();
    }
  }

  return [key, value];
}

function isProductionLikeBaseDir(baseDir) {
  return String(baseDir).replace(/\\/g, "/").startsWith("/www/wwwroot/");
}

function isProductionLikeEnv(baseDir) {
  const envMarkers = [process.env.CMS_ENV, process.env.NODE_ENV]
    .map((value) => String(value ?? "").trim().toLowerCase())
    .filter(Boolean);

  return envMarkers.includes("production") || isProductionLikeBaseDir(baseDir);
}

export async function loadLocalEnv(baseDir = process.cwd()) {
  const envPath = path.join(baseDir, ".env");
  const allowLocalAdminEnv = String(process.env.CMS_ALLOW_LOCAL_ADMIN_ENV ?? "").trim()
    .toLowerCase() === "true";
  const shouldLoadSensitiveCmsAdminKeys = allowLocalAdminEnv || !isProductionLikeEnv(baseDir);

  let fileContents;
  try {
    fileContents = await fs.readFile(envPath, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }

  for (const line of fileContents.replace(/^\uFEFF/, "").split(/\r?\n/u)) {
    const parsed = parseEnvLine(line);
    if (!parsed) {
      continue;
    }

    const [key, value] = parsed;
    if (cmsAdminKeys.has(key) && !shouldLoadSensitiveCmsAdminKeys) {
      continue;
    }

    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = value;
    }
  }

  return true;
}
