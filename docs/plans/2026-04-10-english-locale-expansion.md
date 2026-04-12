# English Locale Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the current Chinese and Japanese corporate site into a complete Chinese, Japanese, and English site with launch-ready English content, English news pages, and matching CMS field support.

**Architecture:** The implementation keeps Chinese at the root path, adds English under `/en/`, generalizes the shared locale helpers and content API to support a third locale, and extends both fallback content and PocketBase schema so English content is available immediately while remaining CMS-manageable. Existing Chinese and Japanese behavior should remain stable by reusing the current localized-content architecture rather than introducing a second content system.

**Tech Stack:** Astro, TypeScript, Vitest, PocketBase schema JSON, PocketBase seed JSON

---

### Task 1: Lock tri-locale routing into tests

**Files:**
- Modify: `tests/unit/language-switch.test.ts`
- Modify: `tests/unit/news-routing.test.ts`

**Step 1: Write the failing test**

Add assertions that:

- `getLocaleUrl("/", "en")` returns `/en/`
- `getLocaleUrl("/ja/news/demo", "en")` returns `/en/news/demo`
- `getLocaleUrl("/en/news/demo", "zh")` returns `/news/demo`
- `getNewsUrl("expo-2026", "en")` returns `/en/news/expo-2026`
- `LanguageSwitch.astro` contains an English tab and English URL wiring

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts`
Expected: FAIL because the locale helpers and switcher only support Chinese and Japanese.

**Step 3: Write minimal implementation**

Do not implement yet. This task ends after confirming the red state.

**Step 4: Run test to verify it fails for the expected reason**

Re-run the same command and confirm the failures point to missing English locale behavior.

**Step 5: Commit**

```bash
git add tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts
git commit -m "test: cover english locale routing"
```

### Task 2: Add shared English locale support

**Files:**
- Modify: `src/lib/i18n.ts`
- Modify: `src/components/site/LanguageSwitch.astro`
- Modify: `src/content/site-copy.ts`

**Step 1: Write the failing test**

Use the red tests from Task 1.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts`
Expected: FAIL because English URLs and labels do not exist yet.

**Step 3: Write minimal implementation**

- Expand locale type to `zh | ja | en`
- Generalize locale prefix stripping and locale URL creation
- Add English handling to `getNewsUrl`
- Render the `EN` option in the language switch
- Add English navigation and footer copy to `src/content/site-copy.ts`

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/i18n.ts src/components/site/LanguageSwitch.astro src/content/site-copy.ts tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts
git commit -m "feat: add shared english locale support"
```

### Task 3: Add English fallback content and English routes

**Files:**
- Modify: `src/content/fallback/site-content.ts`
- Modify: `src/content/fallback/news.ts`
- Create: `src/pages/en/index.astro`
- Create: `src/pages/en/news/index.astro`
- Create: `src/pages/en/news/[slug].astro`
- Modify: `tests/unit/fallback-content.test.ts`
- Modify: `tests/unit/site-copy.test.ts`

**Step 1: Write the failing test**

Add assertions that:

- English site copy exists and returns English navigation labels
- English fallback homepage content exists for hero, about, capabilities, news, and contact sections
- English fallback news exists and produces at least one launch-ready article

If route-level tests already cover locale paths elsewhere, extend them to include `/en/` and `/en/news/*`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/fallback-content.test.ts tests/unit/site-copy.test.ts`
Expected: FAIL because English fallback content does not exist yet.

**Step 3: Write minimal implementation**

- Add English content to site copy
- Translate homepage fallback content from current Chinese source
- Translate fallback news items from current Chinese source
- Create English homepage and English news pages by mirroring the Japanese route structure with English locale wiring

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/fallback-content.test.ts tests/unit/site-copy.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/content/fallback/site-content.ts src/content/fallback/news.ts src/pages/en/index.astro src/pages/en/news/index.astro src/pages/en/news/[slug].astro tests/unit/fallback-content.test.ts tests/unit/site-copy.test.ts
git commit -m "feat: add english fallback content and pages"
```

### Task 4: Extend typed CMS records and content mapping for English

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/lib/content-api.ts`
- Modify: `tests/unit/content-api.test.ts`
- Modify: `tests/unit/home-content-map.test.ts`
- Modify: `tests/unit/content-publication.test.ts`

**Step 1: Write the failing test**

Add content API tests proving:

- `mapLocaleRecord()` reads `_en` fields
- `getHomePageContent("en", client)` reads English CMS values when present
- `getNewsList("en", client)` reads English news title, summary, and content
- Existing Chinese and Japanese mappings still behave the same

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/content-api.test.ts tests/unit/home-content-map.test.ts tests/unit/content-publication.test.ts`
Expected: FAIL because the content API only maps `_zh` and `_ja`.

**Step 3: Write minimal implementation**

- Add English properties to localized record types
- Generalize locale-specific field selection in `src/lib/content-api.ts`
- Read `_en` arrays and text fields where present
- Keep fallback behavior unchanged when CMS English content is missing

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/content-api.test.ts tests/unit/home-content-map.test.ts tests/unit/content-publication.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/types/content.ts src/lib/content-api.ts tests/unit/content-api.test.ts tests/unit/home-content-map.test.ts tests/unit/content-publication.test.ts
git commit -m "feat: map english cms content"
```

### Task 5: Expand PocketBase schema and seed data for English

**Files:**
- Modify: `pocketbase/schema/collections.json`
- Modify: `pocketbase/seed/site-settings.json`
- Modify: `pocketbase/seed/home-sections.json`
- Modify: `pocketbase/seed/home-hero.json`
- Modify: `pocketbase/seed/home-about.json`
- Modify: `pocketbase/seed/advantages.json`
- Modify: `pocketbase/seed/capabilities.json`
- Modify: `pocketbase/seed/product-cases.json`
- Modify: `pocketbase/seed/cooperation-highlights.json`
- Modify: `pocketbase/seed/news.json`
- Modify: `tests/unit/schema-fields.test.ts`
- Modify: `tests/unit/pocketbase-seed.test.ts`

**Step 1: Write the failing test**

Add schema and seed assertions that:

- Each localized collection now includes matching `_en` fields
- `messages.locale` allows `en`
- Seed fixtures include English values for the localized collections used by the homepage and news features

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/schema-fields.test.ts tests/unit/pocketbase-seed.test.ts`
Expected: FAIL because schema and seed fixtures still only support Chinese and Japanese.

**Step 3: Write minimal implementation**

- Add English fields to PocketBase schema collections
- Add English values to the current seed fixtures using translated Chinese source content
- Include `en` in the messages locale select values

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/schema-fields.test.ts tests/unit/pocketbase-seed.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add pocketbase/schema/collections.json pocketbase/seed/site-settings.json pocketbase/seed/home-sections.json pocketbase/seed/home-hero.json pocketbase/seed/home-about.json pocketbase/seed/advantages.json pocketbase/seed/capabilities.json pocketbase/seed/product-cases.json pocketbase/seed/cooperation-highlights.json pocketbase/seed/news.json tests/unit/schema-fields.test.ts tests/unit/pocketbase-seed.test.ts
git commit -m "feat: expand pocketbase content schema for english"
```

### Task 6: Verify end-to-end tri-locale behavior

**Files:**
- Modify: none unless regressions require fixes
- Test: `tests/unit/language-switch.test.ts`
- Test: `tests/unit/news-routing.test.ts`
- Test: `tests/unit/fallback-content.test.ts`
- Test: `tests/unit/site-copy.test.ts`
- Test: `tests/unit/content-api.test.ts`
- Test: `tests/unit/home-content-map.test.ts`
- Test: `tests/unit/content-publication.test.ts`
- Test: `tests/unit/schema-fields.test.ts`
- Test: `tests/unit/pocketbase-seed.test.ts`

**Step 1: Write the failing test**

No new test. This is the verification pass.

**Step 2: Run test to verify current status**

Run: `npm test -- tests/unit/language-switch.test.ts tests/unit/news-routing.test.ts tests/unit/fallback-content.test.ts tests/unit/site-copy.test.ts tests/unit/content-api.test.ts tests/unit/home-content-map.test.ts tests/unit/content-publication.test.ts tests/unit/schema-fields.test.ts tests/unit/pocketbase-seed.test.ts`
Expected: PASS

Run: `npm run build`
Expected: PASS

**Step 3: Write minimal implementation**

Only if the verification commands reveal regressions.

**Step 4: Run test to verify it passes**

Re-run the exact failing command after any fix until both the targeted tests and the build pass.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: launch english locale support"
```
