# About Motion Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add restrained staged reveal motion to the About section text and a subtle image entrance effect to the Dalian landscape card.

**Architecture:** Keep the existing `data-reveal` observer on the two About columns, and layer additional CSS-only staged motion inside the content card and media card. The implementation will add a small set of semantic motion classes in `About.astro` and scoped motion rules in `global.css`, with reduced-motion fallbacks preserved.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Lock the new About motion expectations in tests

**Files:**
- Modify: `f:\www\www13dalian\tests\unit\about-section-motion.test.ts`
- Modify: `f:\www\www13dalian\tests\unit\about-enterprise-intro.test.ts`

**Step 1: Write the failing test**

- Assert the About markup includes motion helper classes for staged text reveals.
- Assert the stylesheet includes:
  - restrained image entrance transform
  - image zoom settle
  - staged paragraph and point transitions
  - a dedicated keyframe for the image sweep

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-section-motion.test.ts tests/unit/about-enterprise-intro.test.ts`

Expected: FAIL because the new motion classes and styles do not exist yet.

### Task 2: Add motion helper structure to About markup

**Files:**
- Modify: `f:\www\www13dalian\src\components\home\About.astro`

**Step 1: Write minimal implementation**

- Add semantic motion classes to:
  - headline block
  - each intro paragraph
  - each enterprise point row
- Keep content structure unchanged beyond the new class hooks.

**Step 2: Run tests**

Run: `npx vitest run tests/unit/about-enterprise-intro.test.ts`

Expected: PASS for markup expectations once hooks exist.

### Task 3: Add restrained staged motion styles

**Files:**
- Modify: `f:\www\www13dalian\src\styles\global.css`

**Step 1: Write minimal implementation**

- Update the Dalian image card to:
  - start slightly scaled
  - settle on reveal
  - play a subtle sweep highlight
- Add staged text reveal rules for:
  - headline
  - intro paragraphs
  - point rows
- Keep reduced-motion fallbacks intact.

**Step 2: Run tests**

Run: `npx vitest run tests/unit/about-section-motion.test.ts tests/unit/about-enterprise-intro.test.ts`

Expected: PASS.

### Task 4: Verify build stability

**Files:**
- Test: `f:\www\www13dalian\tests\unit\about-reference-layout.test.ts`

**Step 1: Run related tests**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/about-enterprise-intro.test.ts tests/unit/about-section-motion.test.ts`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: Build succeeds.
