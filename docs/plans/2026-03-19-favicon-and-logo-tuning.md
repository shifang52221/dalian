# Favicon And Logo Tuning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a favicon from the uploaded logo and make the header brand mark slightly more compact.

**Architecture:** Keep the change localized to the base layout head and the header brand CSS. Use the existing public asset directly to avoid adding image-processing steps.

**Tech Stack:** Astro, CSS, Vitest

---

### Task 1: Add A Failing Regression Test

**Files:**
- Modify: `tests/unit/logo-usage.test.ts`

**Step 1: Write the failing test**

Verify:
- `BaseLayout.astro` references `/logo.png` as a favicon
- the header stylesheet reflects the smaller logo shell sizing

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/logo-usage.test.ts`
Expected: FAIL because favicon and refined sizing are not present yet.

### Task 2: Implement The Favicon And Header Size Tuning

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

**Step 1: Write minimal implementation**

Add favicon tags to the page head and reduce the header logo shell footprint slightly.

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/logo-usage.test.ts`
Expected: PASS

### Task 3: Full Verification

**Files:**
- Verify: `tests/unit/logo-usage.test.ts`
- Verify: project test/build output

**Step 1: Run full tests**

Run: `npm test`

**Step 2: Run build**

Run: `npm run build`
