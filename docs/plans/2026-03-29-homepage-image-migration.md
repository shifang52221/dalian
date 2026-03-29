# Homepage Static Image To CMS Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a one-time migration command that uploads the homepage images currently used by the frontend static manifest into their matching PocketBase records.

**Architecture:** Keep the existing `cms:setup` and `cms:seed` responsibilities unchanged. Add a dedicated migration helper that defines the file-to-record mapping, then call it from a new script that authenticates with PocketBase and updates the matching records with uploaded files.

**Tech Stack:** Node.js, PocketBase, TypeScript, Vitest

---

### Task 1: Lock the migration mapping into tests

**Files:**
- Create: `src/lib/pocketbase-homepage-image-migration.ts`
- Create: `tests/unit/pocketbase-homepage-image-migration.test.ts`
- Modify: `tests/unit/pocketbase-script-env-wiring.test.ts`

**Step 1: Write the failing test**

Add tests that assert:

- the migration helper maps hero and about images to the correct static file paths and fields
- capability records map by `preview_group`
- product case records map by category name
- the new migration script loads local `.env` before reading credentials

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts`

Expected: FAIL because the helper and migration script do not exist yet.

**Step 3: Write minimal implementation**

Do not implement yet. Capture the red state first.

**Step 4: Run test to verify it fails for the expected reason**

Re-run the same command and confirm the failure is about missing helper/script wiring.

**Step 5: Commit**

```bash
git add tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts
git commit -m "test: define homepage image migration mapping"
```

### Task 2: Implement the migration helper and script

**Files:**
- Create: `src/lib/pocketbase-homepage-image-migration.ts`
- Create: `scripts/pocketbase-migrate-home-images.mjs`
- Modify: `package.json`

**Step 1: Use the failing tests from Task 1**

Run: `npm test -- tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts`

Expected: FAIL

**Step 2: Write minimal implementation**

- Add a helper that returns the migration plan for:
  - `home_hero.hero_image`
  - `home_about.image`
  - `capabilities.preview_image`
  - `product_cases.image`
- Add a script that:
  - loads `.env`
  - authenticates to PocketBase
  - finds existing records
  - uploads the mapped local files into the right file field
- Add an npm command:
  - `cms:migrate-home-images`

**Step 3: Run test to verify it passes**

Run: `npm test -- tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts`

Expected: PASS

**Step 4: Commit**

```bash
git add src/lib/pocketbase-homepage-image-migration.ts scripts/pocketbase-migrate-home-images.mjs package.json tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts
git commit -m "feat: add cms homepage image migration command"
```

### Task 3: Verify the rest of the repo still passes

**Files:**
- Modify: none unless verification reveals regressions

**Step 1: Run targeted tests**

Run: `npm test -- tests/unit/pocketbase-homepage-image-migration.test.ts tests/unit/pocketbase-script-env-wiring.test.ts tests/unit/pocketbase-seed.test.ts`

Expected: PASS

**Step 2: Run full verification**

Run: `npm test`

Expected: PASS

Run: `npm run build`

Expected: PASS

**Step 3: Commit**

```bash
git add .
git commit -m "test: verify homepage image migration integration"
```
