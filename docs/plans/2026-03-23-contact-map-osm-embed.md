# Contact Map OSM Embed Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the unstable embedded AMap webpage with an embeddable OpenStreetMap iframe while preserving AMap and Baidu external map actions for the factory address.

**Architecture:** Keep the current contact section structure and toolbar, but swap the embedded URL generation to OSM's `export/embed.html` format using an approximate marker and bounding box around the factory area. Maintain external AMap/Baidu links for address-based opening, and cover the behavior with regression tests before implementation.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Add regression coverage for the OSM embedded map behavior

**Files:**
- Modify: `tests/unit/contact-map-gaode-default.test.ts`
- Modify: `tests/unit/contact-map-embed.test.ts`

**Step 1: Write the failing test**

Update assertions so they verify:
- the component contains `openstreetmap.org/export/embed.html`
- the component contains `bbox=`
- the component contains `marker=`
- the component still contains `www.amap.com/search?query=`
- the component still contains `map.baidu.com/search/`
- the component no longer embeds `www.amap.com/search` as the map source

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: FAIL because the component still uses the AMap search page as the embedded map.

**Step 3: Write minimal implementation**

Update `src/components/home/ContactSection.astro` to:
- build an OSM embed URL from an approximate `bbox` and `marker`
- keep the AMap external action as an address search URL
- keep the Baidu external action unchanged

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 5: Commit**

Git commit is skipped because the workspace is not currently a git repository.

### Task 2: Verify the contact map block still builds correctly

**Files:**
- Reuse: `src/components/home/ContactSection.astro`

**Step 1: Run production build**

Run: `npm run build`

Expected: successful Astro build with no new errors from the map embed change.

**Step 2: Commit**

Git commit is skipped because the workspace is not currently a git repository.
