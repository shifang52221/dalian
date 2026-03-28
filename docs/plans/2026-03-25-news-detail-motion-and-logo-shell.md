# News Detail Motion And Logo Shell Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a restrained premium motion treatment to the news detail hero card and restyle the header logo shell so it feels unified with the site's blue palette.

**Architecture:** Keep the current Astro structure intact and deliver both refinements through CSS-only changes. Reuse the existing `data-reveal` visibility system for the news detail card, and adjust the shared header logo shell styles so the `BH` mark sits on a misted blue-gray plate instead of a hard white block.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Lock the visual intent with tests

**Files:**
- Modify: `tests/unit/news-editorial-layout.test.ts`
- Modify: `tests/unit/site-shell-design.test.ts`

**Step 1: Write the failing test**

Add assertions that check for a dedicated `news-detail__hero::before` motion layer and the visible-state selector that triggers it. Add assertions that check for the new softened logo-shell gradient treatment instead of relying on the old stark white plate.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts tests/unit/site-shell-design.test.ts`
Expected: FAIL until the new CSS is added.

### Task 2: Implement the premium motion layer on the news detail hero

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Write minimal implementation**

Add a subtle pseudo-element to `.news-detail__hero` that starts transparent and offset, then resolves into place when the element becomes visible through the existing `data-reveal` flow. Keep it low-contrast and one-time so the page still feels calm and readable.

**Step 2: Run test to verify it passes**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts`
Expected: PASS

### Task 3: Restyle the shared header logo shell

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Write minimal implementation**

Replace the hard white logo background with a softened blue-gray mist gradient, add a gentle inner highlight, and keep the shell compact so it still reads as part of the navigation rather than a separate badge.

**Step 2: Run test to verify it passes**

Run: `npx vitest run tests/unit/site-shell-design.test.ts`
Expected: PASS

### Task 4: Verify the integrated result

**Files:**
- Modify: `src/styles/global.css`
- Test: `tests/unit/news-editorial-layout.test.ts`
- Test: `tests/unit/site-shell-design.test.ts`

**Step 1: Run focused verification**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts tests/unit/site-shell-design.test.ts`
Expected: PASS

**Step 2: Run build verification**

Run: `npm run build`
Expected: PASS
