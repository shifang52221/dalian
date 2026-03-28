export interface SchemaCollection {
  name: string;
}

export interface SeedPlanItem {
  collection: string;
  seedFile: string;
}

export function getSeedFilename(collection: string) {
  return `${collection.replaceAll("_", "-")}.json`;
}

export function createSeedPlan(
  schema: SchemaCollection[],
  seedFiles: string[],
): SeedPlanItem[] {
  const available = new Set(seedFiles);

  return schema
    .map((collection) => ({
      collection: collection.name,
      seedFile: getSeedFilename(collection.name),
    }))
    .filter((item) => available.has(item.seedFile));
}
