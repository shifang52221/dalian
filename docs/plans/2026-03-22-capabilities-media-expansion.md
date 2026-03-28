# Capabilities Media Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend capability-card media support so four additional cards use the same hover image and in-page preview system.

**Architecture:** Keep the existing hover-image and lightbox implementation untouched and only expand the capability-media map in `Capabilities.astro`. Add a regression test that asserts the new media assets are wired into the component.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a failing regression test for the expanded image map

**Files:**
- Create: `tests/unit/capabilities-media-expansion.test.ts`

**Step 1: Write the failing test**

Assert that `Capabilities.astro` contains:

- `/images/capabilities/minghu.jpg`
- `/images/capabilities/denglizi.jpg`
- `/images/capabilities/huoyan.jpg`
- `/images/capabilities/zhijian.jpg`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capabilities-media-expansion.test.ts`

Expected: FAIL because only the submerged-arc card is currently mapped.

### Task 2: Expand the capability media map

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Add the remaining four card mappings**

Wire the provided filenames to:

- `明弧堆焊`
- `等离子堆焊`
- `火焰喷焊`
- `质量检测`

**Step 2: Keep the shared preview logic untouched**

Do not alter the hover/preview mechanics beyond enabling them for the newly mapped cards.

### Task 3: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capabilities-media-expansion.test.ts tests/unit/capabilities-hover-image.test.ts tests/unit/capability-preview-lightbox.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
