# Contact Map Gaode Default Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make AMap the default embedded contact map and improve location visibility by constraining the initial search area around Sanjianbao, Dalian.

**Architecture:** Replace the current generic embed URL in `ContactSection.astro` with an AMap search URL using the existing address, Dalian city code, a bounded `geoobj`, and a tighter zoom. Keep the existing map shell and external action links.

**Tech Stack:** Astro, Vitest

---

### Task 1: Add a failing regression test for AMap default embed

**Files:**
- Create: `tests/unit/contact-map-gaode-default.test.ts`

**Step 1: Write the failing test**

Assert that:

- `src/components/home/ContactSection.astro` contains `www.amap.com/search`
- `src/components/home/ContactSection.astro` contains `geoobj=`
- `src/components/home/ContactSection.astro` contains `city=210200`
- `src/components/home/ContactSection.astro` does not contain `maps.google.com`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts`

Expected: FAIL because the component still uses the generic embed URL.

### Task 2: Switch the embed URL to AMap

**Files:**
- Modify: `src/components/home/ContactSection.astro`

**Step 1: Build the AMap default URL**

Use:

- full address query
- Dalian city code `210200`
- `geoobj=121.2190244|38.9027021|121.2582175|38.9235801`
- zoom near street-level

**Step 2: Keep external map links intact**

Do not remove the AMap/Baidu action links.

### Task 3: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
