# Logo Replacement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate the uploaded `logo.png` into both header and footer branding.

**Architecture:** Keep the logo as a public static asset referenced directly from Astro components. Update only the header, footer, and shared CSS brand styles so the change stays localized and easy to verify.

**Tech Stack:** Astro, CSS, Vitest

---

### Task 1: Add A Failing Branding Test

**Files:**
- Modify: `tests/unit/layout-script-path.test.ts`
- Or create: `tests/unit/logo-usage.test.ts`

**Step 1: Write the failing test**

Add a test that verifies:
- the header uses `/logo.png`
- the footer uses `/logo.png`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/logo-usage.test.ts`
Expected: FAIL because the current components still use the old text badge only.

### Task 2: Replace Brand Markup

**Files:**
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/Footer.astro`

**Step 1: Write minimal implementation**

Render the uploaded logo image in both components with descriptive `alt` text and keep the surrounding text content intact.

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/logo-usage.test.ts`
Expected: PASS

### Task 3: Style The New Logo Lockups

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add minimal styling**

Add sizing, alignment, and footer contrast rules for the new logo blocks without disturbing existing responsive behavior.

**Step 2: Run full verification**

Run: `npm test`
Run: `npm run build`

**Step 3: Report results**

Summarize where the logo was integrated and note any remaining visual follow-up.
