# Capability Card Hover Image Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an in-card hover image reveal for the “埋弧堆焊” capability card while preserving the existing solid blue hover system and orderly three-column layout.

**Architecture:** Keep the current capabilities grid and card structure intact, then inject a media layer only for the submerged-arc welding card in `Capabilities.astro`. Add scoped CSS in `global.css` for hidden-by-default media, solid-blue overlay, restrained fade/scale on hover, and reduced-motion fallback.

**Tech Stack:** Astro, TypeScript, global CSS, Vitest

---

### Task 1: Add a failing regression test for the hover image

**Files:**
- Create: `tests/unit/capabilities-hover-image.test.ts`

**Step 1: Write the failing test**

Assert that:

- `Capabilities.astro` contains `/images/capabilities/maihu.jpg`
- `Capabilities.astro` contains `capability-card__media`
- `Capabilities.astro` contains `capability-card--with-media`
- `global.css` contains `.capability-card__media {`
- `global.css` contains `.service-card--capability:hover .capability-card__media`
- `global.css` contains `.capability-card__media-overlay {`
- `global.css` contains `@media (prefers-reduced-motion: reduce)`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capabilities-hover-image.test.ts`

Expected: FAIL because the component and styles do not yet contain the hover media layer.

### Task 2: Add the card media markup

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Detect the target card**

Treat `埋弧堆焊` and `埋弧肉盛` as the media-enabled card titles.

**Step 2: Inject the hover media layer**

Add the image and solid-blue overlay inside the card so the preview stays within the card bounds.

### Task 3: Implement restrained hover image styles

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add base media styles**

Hide the media layer by default and keep it clipped to the card radius.

**Step 2: Add hover reveal**

Fade the media layer in with a slight scale change while preserving the existing solid theme-blue hover behavior.

**Step 3: Add reduced-motion fallback**

Disable transform/transition for the new media layer under `prefers-reduced-motion`.

### Task 4: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capabilities-hover-image.test.ts tests/unit/capabilities-reference-cards.test.ts tests/unit/capabilities-motion-refinement.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
