# Capabilities CMS Restoration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore the homepage capabilities section to six cards and keep it fully managed by PocketBase CMS.

**Architecture:** Keep the frontend rendering path unchanged so the homepage still reads capabilities from `content-api.ts` and `Capabilities.astro`. Fix the missing cards by restoring the six capability records in the CMS seed source and syncing the live PocketBase `capabilities` collection to match that source of truth.

**Tech Stack:** Astro, TypeScript, Vitest, PocketBase

---

### Task 1: Lock the expected CMS data shape with a failing test

**Files:**
- Create: `tests/unit/capabilities-cms-seed.test.ts`

**Step 1: Write the failing test**

Add a test that reads `pocketbase/seed/capabilities.json`, parses the records, and asserts:
- there are exactly 6 records
- `sort_order` values cover 1 through 6

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capabilities-cms-seed.test.ts`
Expected: FAIL because the current seed file only has 2 records.

### Task 2: Restore the six capability records in the CMS seed source

**Files:**
- Modify: `pocketbase/seed/capabilities.json`

**Step 1: Write the minimal implementation**

Replace the seed file contents so it contains the six capability cards already defined in the fallback homepage content:
- 埋弧堆焊
- 明弧堆焊
- 等离子堆焊
- 火焰喷焊
- 热处理与装配
- 质量检测

Each record should include both `title_zh` and `title_ja`, both descriptions, and a stable `sort_order` from 1 to 6.

**Step 2: Run the test again**

Run: `npx vitest run tests/unit/capabilities-cms-seed.test.ts`
Expected: PASS

### Task 3: Sync the live PocketBase collection to the restored seed

**Files:**
- No repo file changes required

**Step 1: Reset only the live `capabilities` records**

Use an authenticated admin script or one-off command to:
- delete existing `capabilities` records
- recreate them from `pocketbase/seed/capabilities.json`

**Step 2: Verify the live CMS state**

Run: `npm run cms:check`
Expected: `capabilities: OK (6)`

### Task 4: Verify the homepage path end-to-end

**Files:**
- No repo file changes required

**Step 1: Run focused verification**

Run:
- `npx vitest run tests/unit/capabilities-cms-seed.test.ts`
- `npm test`

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Verify rendered output through dev server**

Start dev server and confirm the homepage capabilities section renders six cards from CMS-backed content.
