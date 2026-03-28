# Capability Rechuli Preview Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `rechuli.jpg` for the heat-treatment capability card and refine the in-page preview shell so it feels more polished.

**Architecture:** Extend the capability media map in `Capabilities.astro` for the heat-treatment card, then add a small preview metadata block inside the shared preview shell. Refine the preview presentation in `global.css` with a more premium frame, subtle dialog accent treatment, and a clearer caption hierarchy.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a failing regression test for the new mapping and preview polish

**Files:**
- Create: `tests/unit/capability-rechuli-preview-polish.test.ts`

**Step 1: Write the failing test**

Assert that:

- `src/components/home/Capabilities.astro` contains `/images/capabilities/rechuli.jpg`
- `src/components/home/Capabilities.astro` contains `capability-preview__eyebrow`
- `src/styles/global.css` contains `.capability-preview__meta {`
- `src/styles/global.css` contains `.capability-preview__eyebrow {`
- `src/styles/global.css` contains `.capability-preview__dialog::before`
- `src/styles/global.css` contains `.capability-preview__frame::after`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capability-rechuli-preview-polish.test.ts`

Expected: FAIL because the heat-treatment image and polish classes do not exist yet.

### Task 2: Add the heat-treatment image mapping and preview metadata

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Add the heat-treatment media entry**

Wire `热处理与装配` to `/images/capabilities/rechuli.jpg`.

**Step 2: Add a small preview metadata block**

Add an eyebrow label above the preview title without changing the close behavior or image structure.

### Task 3: Refine the preview shell styling

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add refined preview metadata styles**

Style the new eyebrow/title cluster with restrained spacing and blue editorial emphasis.

**Step 2: Add subtle premium shell details**

Enhance the dialog and image frame with restrained inner borders and layered surfaces.

### Task 4: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capability-rechuli-preview-polish.test.ts tests/unit/capabilities-media-expansion.test.ts tests/unit/capability-preview-lightbox.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
