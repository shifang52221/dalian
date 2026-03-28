# Contact Map Baidu SDK Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current embedded map iframe with a real Baidu Maps WebGL instance while preserving external map-opening actions.

**Architecture:** Keep the existing contact section layout and map toolbar, but change the map body from an iframe URL to a div-based Baidu map container. Load the Baidu JS API on demand, initialize a map with a fallback point, then geocode the company address for a better marker location. Verify the new structure with source-based regression tests before implementation.

**Tech Stack:** Astro, browser JavaScript, Baidu Maps JavaScript API GL, Vitest, global CSS

---

### Task 1: Add regression coverage for the Baidu map container

**Files:**
- Modify: `tests/unit/contact-map-gaode-default.test.ts`
- Modify: `tests/unit/contact-map-embed.test.ts`

**Step 1: Write the failing test**

Update assertions so they verify:
- the component contains `api.map.baidu.com/api?type=webgl&v=1.0&ak=`
- the component contains `data-baidu-map`
- the component contains `data-baidu-address`
- the component contains the external AMap URL
- the component contains the external Baidu URL
- the component does not contain `openstreetmap.org/export/embed.html`
- the component does not contain an embedded map `iframe`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: FAIL because the component still uses the old OSM iframe embed.

**Step 3: Write minimal implementation**

Update `src/components/home/ContactSection.astro` to:
- render a map div instead of an iframe
- include Baidu map config via `data-*` attributes
- dynamically load the Baidu WebGL API script
- initialize the map, marker, and address lookup

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 5: Commit**

Git commit is skipped because the workspace is not currently a git repository.

### Task 2: Verify the page still builds

**Files:**
- Reuse: `src/components/home/ContactSection.astro`

**Step 1: Run production build**

Run: `npm run build`

Expected: successful Astro build with no new errors from the Baidu map integration.

**Step 2: Commit**

Git commit is skipped because the workspace is not currently a git repository.
