# PocketBase Rules And Setup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Allow the site to read published CMS content publicly, allow anonymous message creation, and make CMS setup reusable.

**Architecture:** Store access rules directly in the simplified schema JSON and extend the import builder to merge those rules into scaffolded collections. When an existing collection with the same name is present, preserve its id so PocketBase updates instead of trying to recreate it.

**Tech Stack:** PocketBase, Node.js, TypeScript, Vitest

---

### Task 1: Add Failing Tests

**Files:**
- Modify: `tests/unit/pocketbase-schema-import.test.ts`
- Modify: `tests/unit/schema-fields.test.ts`

**Step 1: Write the failing tests**

Verify:
- the schema file defines public read rules and anonymous message create access
- `buildImportCollections()` preserves an existing collection id and collection-level rules

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/pocketbase-schema-import.test.ts tests/unit/schema-fields.test.ts`
Expected: FAIL

### Task 2: Implement Rules And Import Merging

**Files:**
- Modify: `pocketbase/schema/collections.json`
- Modify: `src/lib/pocketbase-schema.ts`
- Modify: `scripts/pocketbase-setup.mjs`

**Step 1: Write minimal implementation**

Add rule fields to the schema and teach the import builder to use existing ids where available.

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/pocketbase-schema-import.test.ts tests/unit/schema-fields.test.ts`
Expected: PASS

### Task 3: Run Full Verification

**Files:**
- Verify: `npm test`
- Verify: `npm run build`

**Step 1: Run full test suite**

Run: `npm test`

**Step 2: Run build**

Run: `npm run build`
