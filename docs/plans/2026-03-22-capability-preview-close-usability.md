# Capability Preview Close Usability Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the capability preview close control more usable by replacing the floating icon-only control with a clearer toolbar button.

**Architecture:** Keep the existing preview open/close script intact and only refine the preview markup and CSS. Introduce a top toolbar in `Capabilities.astro` with preview meta on the left and a larger close button with icon plus text on the right, then style it in `global.css`.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a failing regression test for the close control usability fix

**Files:**
- Create: `tests/unit/capability-preview-close-usability.test.ts`

**Step 1: Write the failing test**

Assert that:

- `src/components/home/Capabilities.astro` contains `capability-preview__toolbar`
- `src/components/home/Capabilities.astro` contains `capability-preview__close-label`
- `src/components/home/Capabilities.astro` contains `关闭`
- `src/styles/global.css` contains `.capability-preview__toolbar {`
- `src/styles/global.css` contains `.capability-preview__close-label {`
- `src/styles/global.css` contains `.capability-preview__close-icon {`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capability-preview-close-usability.test.ts`

Expected: FAIL because the preview still uses the older icon-only close control.

### Task 2: Update the preview markup

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Add a preview toolbar**

Place the preview meta and the close button into a top toolbar.

**Step 2: Add a text label to the close button**

Keep the close icon but add a visible “关闭” label.

### Task 3: Update the preview styles

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Style the new toolbar**

Create a balanced top bar that fits the existing blue editorial direction.

**Step 2: Style the larger close control**

Increase click target, contrast, and hover/focus clarity without becoming flashy.

### Task 4: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capability-preview-close-usability.test.ts tests/unit/capability-preview-lightbox.test.ts tests/unit/capability-rechuli-preview-polish.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
