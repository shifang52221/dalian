# Contact Map Address Search Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the embedded map and the external AMap action both open to Boheng's approximate factory address area using the same address-search-based URL strategy.

**Architecture:** Keep the existing contact section structure intact, but replace the coordinate-based H5 map link with a unified AMap search URL built from the full address and Dalian-area constraints. Cover the behavior with regression tests before implementation, then verify with the related map tests and a production build.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Add regression coverage for unified AMap address search behavior

**Files:**
- Modify: `tests/unit/contact-map-gaode-default.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- the component contains `https://www.amap.com/search?query=`
- the component contains the factory address query text `韩家村`
- the component contains `city=210200`
- the component contains `geoobj=`
- the component does not contain `https://m.amap.com/?q=`
- the component does not contain `uri.amap.com`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts`

Expected: FAIL because the component still points to the coordinate-based H5 URL and uses the old AMap external search entry.

**Step 3: Write minimal implementation**

Update `src/components/home/ContactSection.astro` so both `mapEmbedUrl` and `amapUrl` use the same `www.amap.com/search` address-search pattern with the Dalian-area constraints.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts`

Expected: PASS

**Step 5: Commit**

Git commit is skipped because the workspace is not currently a git repository.

### Task 2: Verify the contact map block still renders correctly

**Files:**
- Modify: `tests/unit/contact-map-embed.test.ts`
- Reuse: `src/components/home/ContactSection.astro`

**Step 1: Update the broader map embed assertions**

Ensure the test checks for:
- `map-embed`
- `iframe`
- `www.amap.com/search`
- `map.baidu.com`

**Step 2: Run the related tests**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 3: Run production build**

Run: `npm run build`

Expected: successful Astro build with no new errors from the map change.

**Step 4: Commit**

Git commit is skipped because the workspace is not currently a git repository.
