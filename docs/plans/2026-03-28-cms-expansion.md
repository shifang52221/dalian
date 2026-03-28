# Homepage And CMS Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the PocketBase schema and frontend content mapping so the homepage, news, contact details, advantages, product cases, and cooperation cards become structurally editable from the CMS while preserving fallback-safe rendering.

**Architecture:** Keep Astro SSR and PocketBase as they are, but add new collections and fields to the repo-defined PocketBase schema, seed those collections with the current approved website content, and extend the frontend content API so it prefers CMS data for each homepage module while still falling back when records are missing or unpublished. The migration must be non-destructive to existing production data and should reuse the current PocketBase import script.

**Tech Stack:** Astro SSR, PocketBase, Vitest, TypeScript, JSON seed data

---

### Task 1: Lock the schema contract with failing tests

**Files:**
- Modify: `tests/unit/schema-fields.test.ts`
- Create: `tests/unit/cms-homepage-seed-shape.test.ts`

**Step 1: Write the failing schema assertions**

Add assertions that require:

- `site_settings` to include the new footer/global fields
- `home_hero` to exist
- `home_about` to exist
- `advantages` to include `is_published`
- `capabilities` to include `icon_key`, `preview_group`, `is_published`
- `product_cases` to include `is_published`
- `cooperation_highlights` to exist
- `news` to include `cover_image`

**Step 2: Run the targeted tests to verify failure**

Run: `npm test -- tests/unit/schema-fields.test.ts`

Expected: FAIL because the current repo schema does not yet define the new collections and fields.

**Step 3: Write a failing seed-shape test**

Create a test that reads the new homepage-related seed files and asserts:

- `home_hero` seed exists and contains bilingual CTA labels plus array fields
- `home_about` seed exists and contains points and stats arrays
- `advantages` seed has at least 4 records
- `cooperation_highlights` seed has at least 3 records

**Step 4: Run the seed-shape test to verify failure**

Run: `npm test -- tests/unit/cms-homepage-seed-shape.test.ts`

Expected: FAIL because the new seed files do not exist yet.

**Step 5: Commit**

```bash
git add tests/unit/schema-fields.test.ts tests/unit/cms-homepage-seed-shape.test.ts
git commit -m "test: define cms expansion schema contract"
```

### Task 2: Expand PocketBase schema and seed data

**Files:**
- Modify: `pocketbase/schema/collections.json`
- Modify: `pocketbase/seed/site-settings.json`
- Create: `pocketbase/seed/home-hero.json`
- Create: `pocketbase/seed/home-about.json`
- Create: `pocketbase/seed/advantages.json`
- Modify: `pocketbase/seed/capabilities.json`
- Modify: `pocketbase/seed/product-cases.json`
- Create: `pocketbase/seed/cooperation-highlights.json`
- Modify: `pocketbase/seed/news.json`

**Step 1: Add the minimal schema changes**

Update `collections.json` so it defines:

- expanded `site_settings`
- new `home_hero`
- new `home_about`
- expanded `advantages`
- expanded `capabilities`
- expanded `product_cases`
- new `cooperation_highlights`
- verified `news.cover_image`

Use the same simple field-object style already used in the repo schema file.

**Step 2: Seed the new collections with current approved copy**

Move the current approved homepage content into seed files:

- hero eyebrow/title/description/CTAs/highlights/stats
- about eyebrow/title/description/points/badge/stats
- four advantage cards
- current capabilities, now with publish/icon metadata
- current product cases, now with publish metadata
- current cooperation/testimonial cards
- existing news starter content, preserving `cover_image` compatibility

**Step 3: Run the schema and seed tests**

Run: `npm test -- tests/unit/schema-fields.test.ts tests/unit/cms-homepage-seed-shape.test.ts`

Expected: PASS

**Step 4: Commit**

```bash
git add pocketbase/schema/collections.json pocketbase/seed/site-settings.json pocketbase/seed/home-hero.json pocketbase/seed/home-about.json pocketbase/seed/advantages.json pocketbase/seed/capabilities.json pocketbase/seed/product-cases.json pocketbase/seed/cooperation-highlights.json pocketbase/seed/news.json tests/unit/schema-fields.test.ts tests/unit/cms-homepage-seed-shape.test.ts
git commit -m "feat: expand pocketbase homepage schema and seeds"
```

### Task 3: Add content-mapping tests for the new CMS collections

**Files:**
- Modify: `tests/unit/content-api.test.ts`

**Step 1: Write failing tests for CMS-first homepage mapping**

Add test coverage that verifies:

- `getHomePageContent()` consumes `home_hero` into hero title, description, CTA labels, highlights, and stats
- `getHomePageContent()` consumes `home_about` into about description, points, badge, and stats
- `getHomePageContent()` consumes `advantages` and `cooperation_highlights`
- unpublished repeatable records are filtered out
- missing new collections still fall back safely

**Step 2: Write failing tests for expanded site settings mapping**

Add assertions that verify:

- `site_settings` still controls header/footer contact values
- new footer/global fields are ignored safely when not present

**Step 3: Run the targeted test to verify failure**

Run: `npm test -- tests/unit/content-api.test.ts`

Expected: FAIL because the current content API does not read the new collections.

**Step 4: Commit**

```bash
git add tests/unit/content-api.test.ts
git commit -m "test: add cms expansion content mapping coverage"
```

### Task 4: Extend the frontend content API with fallback-safe mapping

**Files:**
- Modify: `src/lib/content-api.ts`
- Modify: `src/types/content.ts`
- Modify: `src/content/fallback/site-content.ts` only if type alignment requires it

**Step 1: Add the minimal new record/view types**

Extend `src/types/content.ts` with interfaces for:

- `HomeHeroRecord`
- `HomeAboutRecord`
- `AdvantageRecord`
- `CooperationHighlightRecord`

Keep the types simple and aligned with the schema shape.

**Step 2: Implement hero/about/advantages/cooperation mapping**

In `content-api.ts`:

- fetch the new collections alongside the existing ones
- map bilingual text using the existing locale helpers
- parse JSON arrays safely for highlights, stats, points, and tags
- honor `is_published`
- preserve fallback values whenever CMS data is absent or invalid

**Step 3: Preserve existing capabilities/product-cases/news behavior**

Update existing mapping only where needed:

- support the new `is_published` checks
- preserve current sorting
- preserve news image behavior

**Step 4: Run the targeted mapping tests**

Run: `npm test -- tests/unit/content-api.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/content-api.ts src/types/content.ts src/content/fallback/site-content.ts tests/unit/content-api.test.ts
git commit -m "feat: map expanded cms collections into homepage content"
```

### Task 5: Make the PocketBase seed/import flow aware of the new seed files

**Files:**
- Modify: `tests/unit/pocketbase-seed.test.ts`
- Modify: `src/lib/pocketbase-seed.ts` only if needed

**Step 1: Add failing tests for the new seed plan**

Update the seed-plan test so it expects:

- `home_hero`
- `home_about`
- `advantages`
- `cooperation_highlights`

to be discoverable in the ordered seed plan.

**Step 2: Run the test to verify failure**

Run: `npm test -- tests/unit/pocketbase-seed.test.ts`

Expected: FAIL if the helper or assumptions do not yet include the new collections cleanly.

**Step 3: Implement the minimal helper changes**

Adjust `src/lib/pocketbase-seed.ts` only if the helper logic needs normalization or ordering updates for the new collections.

**Step 4: Re-run the test**

Run: `npm test -- tests/unit/pocketbase-seed.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add tests/unit/pocketbase-seed.test.ts src/lib/pocketbase-seed.ts
git commit -m "feat: include expanded homepage collections in seed plan"
```

### Task 6: Verify the public site still renders with the new CMS contract

**Files:**
- Modify: `tests/unit/home-content-map.test.ts` if needed
- Modify: `tests/unit/home-polish-copy.test.ts` if needed

**Step 1: Add or update homepage assertions**

Cover at least:

- homepage mapping still produces the expected hero/about/capabilities structures
- no required homepage module becomes empty when CMS content is absent

**Step 2: Run the targeted tests**

Run: `npm test -- tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts`

Expected: PASS

**Step 3: Commit**

```bash
git add tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts
git commit -m "test: verify homepage stability during cms expansion"
```

### Task 7: Full verification

**Files:**
- No additional file changes required

**Step 1: Run the focused CMS and content tests**

Run: `npm test -- tests/unit/schema-fields.test.ts tests/unit/cms-homepage-seed-shape.test.ts tests/unit/content-api.test.ts tests/unit/pocketbase-seed.test.ts`

Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 3: Run the production build**

Run: `npm run build`

Expected: PASS

**Step 4: Commit if verification exposed any required follow-up changes**

```bash
git add .
git commit -m "chore: finalize cms expansion verification"
```

### Task 8: Production rollout checklist

**Files:**
- Modify: `docs/deployment.md`
- Modify: `docs/handoff-checklist.md`

**Step 1: Document the production schema sync**

Add explicit instructions to:

- pull latest code
- run `npm install`
- ensure production `.env` points at the real PocketBase
- run `npm run cms:setup`
- run `npm run cms:check`
- seed only when appropriate

**Step 2: Document the new editable collections**

List the new collections so the admin operator knows where to edit:

- `home_hero`
- `home_about`
- `advantages`
- `capabilities`
- `product_cases`
- `cooperation_highlights`
- `news`
- `site_settings`

**Step 3: Run a final build sanity check**

Run: `npm run build`

Expected: PASS

**Step 4: Commit**

```bash
git add docs/deployment.md docs/handoff-checklist.md
git commit -m "docs: add cms expansion rollout guidance"
```
