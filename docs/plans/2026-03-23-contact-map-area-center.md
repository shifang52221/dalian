# Contact Map Area Center Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the embedded contact map open directly over the Sanjianpu area instead of relying on fuzzy village-level search results.

**Architecture:** Keep the current `ContactSection.astro` structure and external map actions, but swap the default iframe URL to a coordinate-centered AMap page. Verify the behavior with a targeted regression test before implementation, then run the existing related tests and a full production build.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Add regression coverage for area-centered embed behavior

**Files:**
- Modify: `tests/unit/contact-map-gaode-default.test.ts`

**Step 1: Write the failing test**

Add assertions that:
- the component contains a coordinate-centered AMap URL such as `m.amap.com`
- the embed includes the agreed Sanjianpu-area coordinates
- the component no longer uses `www.amap.com/search`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts`

Expected: FAIL because the component still points to the old search URL.

**Step 3: Write minimal implementation**

Update `src/components/home/ContactSection.astro` so the iframe uses the area-centered AMap URL while preserving existing address text and external actions.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts`

Expected: PASS

**Step 5: Commit**

Git commit is skipped here because the workspace is not currently a git repository.

### Task 2: Verify no regression in contact map block

**Files:**
- Modify: `src/components/home/ContactSection.astro`
- Reuse: `tests/unit/contact-map-embed.test.ts`

**Step 1: Run the broader contact-map tests**

Run: `npx vitest run tests/unit/contact-map-gaode-default.test.ts tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 2: Run production build**

Run: `npm run build`

Expected: successful Astro build with no new errors introduced by the map change.

**Step 3: Commit**

Git commit is skipped here because the workspace is not currently a git repository.
