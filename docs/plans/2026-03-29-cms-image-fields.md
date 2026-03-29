# CMS Homepage Image Fields Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add CMS-managed image uploads for the homepage hero, about section, capability cards, and product-case cards while preserving the current static fallback images.

**Architecture:** PocketBase schema gains four single-file fields, the content API maps those fields into the homepage view model through the existing `/api/media/...` proxy pattern, and homepage components continue rendering safely by falling back to the static image manifest when CMS files are missing. The capabilities hover media path is simplified so editors can control preview images from the backend instead of depending only on hardcoded title/group rules.

**Tech Stack:** Astro, TypeScript, Vitest, PocketBase schema JSON

---

### Task 1: Lock the desired CMS image scope into tests

**Files:**
- Create: `tests/unit/cms-image-fields.test.ts`
- Modify: `tests/unit/content-api.test.ts`

**Step 1: Write the failing test**

Add a schema-level test that reads `pocketbase/schema/collections.json` and asserts:

- `home_hero` contains a `hero_image` file field with `maxSelect: 1`
- `home_about` contains an `image` file field with `maxSelect: 1`
- `capabilities` contains a `preview_image` file field with `maxSelect: 1`
- `product_cases` contains an `image` file field with `maxSelect: 1`

Add a content mapping test in `tests/unit/content-api.test.ts` that creates mock PocketBase records with those file fields and expects homepage content to expose CMS image URLs.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/cms-image-fields.test.ts tests/unit/content-api.test.ts`

Expected: FAIL because the schema and homepage mapping do not yet expose the new image fields.

**Step 3: Write minimal implementation**

Do not implement yet. This task ends after capturing the red state.

**Step 4: Run test to verify it fails for the expected reason**

Re-run the same command and confirm the failure is specifically about missing file fields and missing mapped image URLs.

**Step 5: Commit**

```bash
git add tests/unit/cms-image-fields.test.ts tests/unit/content-api.test.ts
git commit -m "test: cover cms homepage image fields"
```

### Task 2: Add PocketBase schema support for homepage images

**Files:**
- Modify: `pocketbase/schema/collections.json`

**Step 1: Write the failing test**

Use the red test from Task 1. Do not add a second schema test unless needed.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/cms-image-fields.test.ts`

Expected: FAIL because one or more file fields are missing.

**Step 3: Write minimal implementation**

Add the new PocketBase file fields:

- `home_hero.hero_image`
- `home_about.image`
- `capabilities.preview_image`
- `product_cases.image`

Each field should be `"type": "file"` with `"maxSelect": 1`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/cms-image-fields.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add pocketbase/schema/collections.json tests/unit/cms-image-fields.test.ts
git commit -m "feat: add cms image fields for homepage collections"
```

### Task 3: Expose CMS image fields through typed records and homepage mapping

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/lib/content-api.ts`
- Modify: `tests/unit/content-api.test.ts`

**Step 1: Write the failing test**

Extend the homepage mapping test so it expects:

- `result.hero.image.src` to point to `/api/media/home_hero/<id>/<filename>`
- `result.about.image.src` to point to `/api/media/home_about/<id>/<filename>`
- `result.capabilities.items[0].image.src` to point to `/api/media/capabilities/<id>/<filename>`
- `result.projects.categories[0].image.src` to point to `/api/media/product_cases/<id>/<filename>`

Also expect localized alt text where available, and leave existing fields unchanged.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/content-api.test.ts`

Expected: FAIL because the types and mapping do not yet include homepage CMS images.

**Step 3: Write minimal implementation**

- Add optional file-field properties to the relevant record types.
- In `src/lib/content-api.ts`, build media proxy URLs for the new fields.
- Populate the homepage view model only when CMS file values exist.
- Preserve current fallback behavior when no CMS image is uploaded.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/content-api.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/types/content.ts src/lib/content-api.ts tests/unit/content-api.test.ts
git commit -m "feat: map cms homepage images into content api"
```

### Task 4: Remove fragile hardcoded capability-image dependence

**Files:**
- Modify: `src/components/home/Capabilities.astro`
- Modify: `tests/unit/capabilities-hover-image.test.ts`

**Step 1: Write the failing test**

Update the capabilities test so it no longer requires a specific hardcoded image path by title. Instead, assert that the component renders capability preview media from item data and keeps the in-card preview structure/styling hooks in place.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/capabilities-hover-image.test.ts`

Expected: FAIL because the component still depends on hardcoded media rules.

**Step 3: Write minimal implementation**

- Read the capability image from the `items` prop.
- Keep current hover media container, overlay, and motion classes.
- Preserve static fallback behavior if the item has no CMS image.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/capabilities-hover-image.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home/Capabilities.astro tests/unit/capabilities-hover-image.test.ts
git commit -m "refactor: drive capability preview media from content data"
```

### Task 5: Verify homepage image fallbacks still protect production

**Files:**
- Modify: `tests/unit/content-fetch.test.ts`
- Modify: `src/content/fallback/site-content.ts` (only if required)
- Modify: `src/content/image-manifest.ts` (only if required)

**Step 1: Write the failing test**

Add or extend a fallback test that proves homepage content still renders usable hero/about/capability/project images when the CMS is offline or image fields are empty.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/content-fetch.test.ts`

Expected: FAIL if any image fallback path was lost during the refactor.

**Step 3: Write minimal implementation**

Restore any missing fallback image assignment so production visuals remain intact when CMS media is unavailable.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/content-fetch.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add tests/unit/content-fetch.test.ts src/content/fallback/site-content.ts src/content/image-manifest.ts
git commit -m "test: preserve homepage image fallbacks"
```

### Task 6: Run full verification

**Files:**
- Modify: none unless failures require fixes
- Test: `tests/unit/cms-image-fields.test.ts`
- Test: `tests/unit/content-api.test.ts`
- Test: `tests/unit/content-fetch.test.ts`
- Test: `tests/unit/capabilities-hover-image.test.ts`

**Step 1: Write the failing test**

No new test. This is the verification pass.

**Step 2: Run test to verify current status**

Run: `npm test -- tests/unit/cms-image-fields.test.ts tests/unit/content-api.test.ts tests/unit/content-fetch.test.ts tests/unit/capabilities-hover-image.test.ts`

Expected: PASS

Run: `npm run build`

Expected: PASS

**Step 3: Write minimal implementation**

Only if verification reveals regressions.

**Step 4: Run test to verify it passes**

Re-run the exact failing command after any fix until both targeted tests and the build pass.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: expand cms homepage image management"
```
