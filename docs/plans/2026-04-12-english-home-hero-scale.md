# English Home Hero Scale Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a targeted English-homepage hero typography override so the first-screen headline looks smaller and less crowded.

**Architecture:** Keep the existing homepage hero component and localized copy unchanged. Add a regression test that checks for an English-homepage-only CSS block, then implement the smallest possible override in the global stylesheet.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Add regression coverage for the English homepage hero override

**Files:**
- Create: `tests/unit/english-home-hero-scale.test.ts`

**Step 1: Write the failing test**

Add a file-content test that expects `src/styles/global.css` to contain:

- `html[lang="en"] .page--home .hero__content h1`
- `html[lang="en"] .page--home .hero__title-stack .hero__title-display`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/english-home-hero-scale.test.ts`

Expected: FAIL because the English-homepage CSS override does not exist yet.

### Task 2: Implement the targeted CSS override

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add the smallest English-homepage-only CSS block**

Add a targeted override under the existing hero typography rules:

- reduce the English homepage hero heading size
- slightly relax line height
- widen the title display max width
- slightly reduce title-stack gap

**Step 2: Run the targeted test**

Run: `npm test -- tests/unit/english-home-hero-scale.test.ts`

Expected: PASS

### Task 3: Re-verify the build

**Files:**
- Modify: none

**Step 1: Run production build**

Run: `npm run build`

Expected: PASS
