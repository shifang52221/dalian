interface SimpleField {
  [key: string]: unknown;
  name: string;
  type: string;
}

interface SimpleCollection {
  name: string;
  fields: SimpleField[];
  listRule?: string | null;
  viewRule?: string | null;
  createRule?: string | null;
  updateRule?: string | null;
  deleteRule?: string | null;
  indexes?: unknown[];
}

interface BaseScaffold {
  id: string;
  type: string;
  name: string;
  system: boolean;
  listRule: string | null;
  viewRule: string | null;
  createRule: string | null;
  updateRule: string | null;
  deleteRule: string | null;
  fields: Array<Record<string, unknown>>;
  indexes: unknown[];
}

interface ScaffoldMap {
  base: BaseScaffold;
}

interface ExistingCollectionRef {
  id: string;
  name: string;
}

export function buildImportCollections(
  collections: SimpleCollection[],
  scaffolds: ScaffoldMap,
  existingCollections: ExistingCollectionRef[] = [],
) {
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
