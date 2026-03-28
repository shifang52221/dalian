# Blue Theme Shift Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage's bright green accent system with a lighter foggy-tech blue while preserving the current layout, motion, and gold supporting accents.

**Architecture:** Centralize the immersive homepage accent colors into a small set of CSS variables, then point the navigation, hero CTA, hero highlights, floating badges, and dark hero surfaces at those variables. Add a string-based regression test first so the palette shift is locked before implementation.

**Tech Stack:** Astro, TypeScript, global CSS, Vitest

---

### Task 1: Add a regression test for the new blue accent palette

**Files:**
- Create: `tests/unit/home-blue-theme.test.ts`
- Test: `tests/unit/home-blue-theme.test.ts`

**Step 1: Write the failing test**

Create a stylesheet regression test that checks for:

- a new immersive blue variable block such as `--hero-accent-blue`
- blue gradient values like `#9fd2ff` and `#79baf3`
- blue glow values like `rgba(121, 186, 243, 0.24)`
- removal of the old hero green CTA gradient `#bff9a9 0%, #9cf07b 100%`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/home-blue-theme.test.ts`

Expected: FAIL because the new blue variables and updated gradients do not exist yet.

**Step 3: Commit**

This repo is not using git in the current workspace, so skip commit and continue.

### Task 2: Replace the immersive green palette with reusable blue tokens

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add the new blue accent variables**

Define a compact immersive palette near the premium homepage section, for example:

- `--hero-accent-blue`
- `--hero-accent-blue-strong`
- `--hero-accent-blue-soft`
- `--hero-accent-blue-glow`
- `--hero-ink-blue`
- `--hero-surface-blue`

**Step 2: Update the navigation and hero surfaces**

Replace the current green-tinted literals in:

- navbar brand shell
- navbar active link
- navbar underline
- language switch active chip
- hero background radial accents
- hero ambient orbs
- hero eyebrow dot
- hero highlight border and dot
- hero figure frame
- hero spotlight overlay
- hero floating badge

**Step 3: Update CTA and badge contrast**

Ensure the primary CTA and floating badges use:

- blue gradient backgrounds
- blue glow shadows
- dark blue ink for readable label text and icon strokes

**Step 4: Run targeted tests**

Run: `npx vitest run tests/unit/home-blue-theme.test.ts tests/unit/hero-cta-animation.test.ts`

Expected: PASS

### Task 3: Verify broader homepage stability

**Files:**
- Modify: `src/components/ui/button.tsx` if focus ring or shared button tokens need alignment
- Test: `tests/unit/hero-cta-animation.test.ts`
- Test: `tests/unit/site-shell-design.test.ts`

**Step 1: Make the minimal shared button adjustment**

Only if necessary, update shared button focus or gradient references so the homepage CTA does not conflict visually with the new blue accent family.

**Step 2: Run broader regression tests**

Run: `npx vitest run tests/unit/home-blue-theme.test.ts tests/unit/hero-cta-animation.test.ts tests/unit/site-shell-design.test.ts`

Expected: PASS

**Step 3: Build the site**

Run: `npm run build`

Expected: Astro build succeeds. Existing non-blocking Vite externalization warnings may still appear.
