# Capability Preview Lightbox Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an in-page enlarged image preview for the submerged arc welding capability card without navigating away from the homepage.

**Architecture:** Extend the media-enabled capability card in `Capabilities.astro` with preview trigger data attributes and a single shared preview layer rendered in the same component. Wire the interaction in `site-effects.js` so click, keyboard activation, close button, backdrop click, and `Escape` all work consistently, then style the preview shell in `global.css` to match the restrained blue site language.

**Tech Stack:** Astro, TypeScript-flavored Astro templates, vanilla JavaScript, global CSS, Vitest

---

### Task 1: Add a failing regression test for the preview layer

**Files:**
- Create: `tests/unit/capability-preview-lightbox.test.ts`

**Step 1: Write the failing test**

Assert that:

- `src/components/home/Capabilities.astro` contains `data-capability-preview-trigger`
- `src/components/home/Capabilities.astro` contains `data-capability-preview`
- `src/components/home/Capabilities.astro` contains `data-capability-preview-close`
- `src/components/home/Capabilities.astro` contains `data-capability-preview-image`
- `src/scripts/site-effects.js` contains `setupCapabilityPreview`
- `src/scripts/site-effects.js` contains `Escape`
- `src/styles/global.css` contains `.capability-preview {`
- `src/styles/global.css` contains `.capability-preview.is-open`
- `src/styles/global.css` contains `.page-body.has-capability-preview-open`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capability-preview-lightbox.test.ts`

Expected: FAIL because the preview trigger, script, and styles do not yet exist.

### Task 2: Add the preview trigger and shared preview markup

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Mark the media-enabled capability card as interactive**

Add preview trigger attributes, accessibility metadata, and preview image source/title data for the submerged-arc card only.

**Step 2: Render one shared preview layer**

Place a single preview shell after the capabilities grid with image, caption, and close button.

### Task 3: Implement preview behavior

**Files:**
- Modify: `src/scripts/site-effects.js`

**Step 1: Add preview setup function**

Wire click and keyboard activation from the interactive card to the shared preview shell.

**Step 2: Add close behavior**

Support close button, backdrop click, and `Escape`, while restoring focus to the trigger on close.

### Task 4: Style the preview shell

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add body scroll lock**

Prevent background scrolling while the preview is open.

**Step 2: Add preview shell styles**

Create restrained overlay, panel, image frame, caption, and close button styles aligned with the existing blue site palette.

**Step 3: Add reduced-motion fallback**

Keep transitions minimal or disabled for reduced-motion users.

### Task 5: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capability-preview-lightbox.test.ts tests/unit/capabilities-hover-image.test.ts tests/unit/capabilities-reference-cards.test.ts tests/unit/capabilities-motion-refinement.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
