# Content Publication And Contact Locale Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Hide unpublished CMS records from the public site and preserve localized contact form error messages.

**Architecture:** Keep the fix narrow. Filter publication state inside the content mapping layer so both homepage and news pages share the behavior, and derive the contact API error locale from submitted form data before validation runs.

**Tech Stack:** Astro, TypeScript, Vitest, Zod

---

### Task 1: Protect Published Content

**Files:**
- Modify: `src/lib/content-api.ts`
- Test: `tests/unit/content-fetch.test.ts`

**Step 1: Write the failing test**

Add tests proving `getNewsList()` ignores records with `is_published: false` and homepage section overrides ignore unpublished section records.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/content-fetch.test.ts`
Expected: FAIL because unpublished records are still mapped.

**Step 3: Write minimal implementation**

Filter `news` and `home_sections` records before they are mapped. Treat missing `is_published` as publishable for backward compatibility.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/content-fetch.test.ts`
Expected: PASS

### Task 2: Preserve Localized API Errors

**Files:**
- Modify: `src/pages/api/contact.ts`
- Test: `tests/unit/contact-api.test.ts`

**Step 1: Write the failing test**

Add a focused unit test showing invalid Japanese form submissions receive the Japanese error message.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-api.test.ts`
Expected: FAIL because the handler currently falls back to Chinese.

**Step 3: Write minimal implementation**

Parse `locale` from `FormData` before validation and use it in the error response when it matches `zh` or `ja`.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-api.test.ts`
Expected: PASS

### Task 3: Verify End To End

**Files:**
- Verify: `tests/unit/content-fetch.test.ts`
- Verify: `tests/unit/contact-api.test.ts`
- Verify: project build/test scripts

**Step 1: Run focused regression tests**

Run: `npx vitest run tests/unit/content-fetch.test.ts tests/unit/contact-api.test.ts`

**Step 2: Run full project verification**

Run: `npm test`
Run: `npm run build`

**Step 3: Report results**

Summarize the behavior changes, test evidence, and any remaining risks.
