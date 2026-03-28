# Local Map And Webserver Tuning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the external static map image with a local asset and document Baota/Nginx compression plus cache settings for production.

**Architecture:** The contact section will keep its current layout and external map action buttons, but the displayed map art will become a repo-owned SVG asset served from `/public`. Deployment guidance will gain a focused section for `gzip` and static cache headers so operators can improve delivery speed without changing application code.

**Tech Stack:** Astro, Vitest, SVG static asset, Markdown deployment docs

---

### Task 1: Lock the contact map contract with a failing test

**Files:**
- Modify: `tests/unit/contact-map-embed.test.ts`

**Step 1: Write the failing test**

Assert that the contact component references a local map asset and no longer references the Baidu static map image API.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-embed.test.ts`

Expected: FAIL because the component still contains the external static map URL.

### Task 2: Replace the external static map with a local asset

**Files:**
- Create: `public/images/factory-location-map.svg`
- Modify: `src/components/home/ContactSection.astro`

**Step 1: Add the local static asset**

Create a lightweight SVG with an industrial, map-card style and a location pin treatment that fits the existing blue site theme.

**Step 2: Switch the component to the local asset**

Replace the external Baidu static map image constant with the new local SVG path while preserving:

- contact address display
- Amap and Baidu external action links
- lazy-loading behavior
- current map shell structure

**Step 3: Run the test to verify it passes**

Run: `npx vitest run tests/unit/contact-map-embed.test.ts`

Expected: PASS

### Task 3: Document Baota/Nginx performance tuning

**Files:**
- Modify: `docs/deployment.md`

**Step 1: Add a production webserver tuning section**

Document:

- recommended `gzip` types
- static asset cache duration
- HTML cache policy
- how to reload Nginx in Baota after edits

**Step 2: Keep instructions operator-friendly**

Use concise copy and ready-to-paste config snippets suitable for the current deployment style.

### Task 4: Final verification

**Files:**
- Verify only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 2: Run the full suite**

Run: `npm test`

Expected: PASS

**Step 3: Run production build**

Run: `npm run build`

Expected: PASS

