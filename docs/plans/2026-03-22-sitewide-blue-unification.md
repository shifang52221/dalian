# Sitewide Blue Unification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify the entire site under one foggy-tech blue accent system so homepage, inner pages, buttons, forms, and status states all share the same brand palette.

**Architecture:** Move the homepage blue palette into the global token layer and repoint shared UI primitives and global CTA styles at those tokens. Keep neutral surfaces and typography intact while removing warm-gold and green from brand-significant interactive states.

**Tech Stack:** Astro, TypeScript, global CSS, Vitest

---

### Task 1: Lock the sitewide blue palette in tests

**Files:**
- Create: `tests/unit/sitewide-blue-unification.test.ts`
- Test: `tests/unit/sitewide-blue-unification.test.ts`

**Step 1: Write the failing test**

Create a regression test that checks:

- `:root` contains updated blue brand tokens
- `--accent-warm` and `--accent-warm-strong` resolve to blue values
- `--accent` and `--success` no longer point at orange/green brand colors
- `src/components/ui/button.tsx` no longer uses the warm gradient shadow
- `src/components/ui/input.tsx` and `src/components/ui/textarea.tsx` no longer ring with `var(--accent-warm-strong)`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/sitewide-blue-unification.test.ts`

Expected: FAIL because the global tokens and shared UI primitives still use the previous blue-gold mix.

### Task 2: Move the global brand token layer to blue

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Update root tokens**

Change the shared color tokens so brand-significant accents come from the new blue family:

- `--primary`
- `--primary-dark`
- `--accent`
- `--accent-warm`
- `--accent-warm-strong`
- `--success`

Keep text, neutral surfaces, and layout tokens stable.

**Step 2: Repoint global CTA and interactive styles**

Update the main button, form status, contact CTA, scroll-to-top button, and any remaining global accent surfaces to use the new blue tokens instead of gold/green.

**Step 3: Run targeted test**

Run: `npx vitest run tests/unit/sitewide-blue-unification.test.ts`

Expected: PASS

### Task 3: Align shared UI primitives with the new brand system

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`

**Step 1: Update Button primary variant**

Replace the warm gradient and warm shadow with the shared blue token pair.

**Step 2: Update input and textarea focus rings**

Use the blue accent token for focus-visible ring styling so forms match the rest of the site.

**Step 3: Run broader regression tests**

Run: `npx vitest run tests/unit/sitewide-blue-unification.test.ts tests/unit/home-blue-theme.test.ts tests/unit/hero-cta-animation.test.ts tests/unit/contact-ui-primitives.test.ts tests/unit/site-shell-design.test.ts`

Expected: PASS

### Task 4: Final verification

**Files:**
- Verify existing files only

**Step 1: Build the project**

Run: `npm run build`

Expected: Astro build succeeds. Existing non-blocking Vite externalization warnings may still appear.
