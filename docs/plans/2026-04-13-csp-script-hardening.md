# CSP Script Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove `script-src 'unsafe-inline'` by moving the homepage contact form logic into the external site script bundle.

**Architecture:** Reuse the existing `src/scripts/site-effects.js` entry point so the contact form submit handler becomes part of the current external script pipeline. After the inline script is removed, tighten CSP in middleware to allow only external same-origin scripts.

**Tech Stack:** Astro, external client-side script bundle, middleware security headers, Vitest

---

### Task 1: Lock In The Desired CSP Behavior

**Files:**
- Create or Modify: `tests/unit/contact-script-hardening.test.ts`

**Step 1: Write the failing test**

- Assert `src/components/home/ContactSection.astro` does not include `<script is:inline>`
- Assert `src/scripts/site-effects.js` includes the contact form DOM hooks and submission logic

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/contact-script-hardening.test.ts`

Expected: FAIL because the contact form logic still lives inline today.

**Step 3: Commit**

```bash
git add tests/unit/contact-script-hardening.test.ts
git commit -m "test: cover external contact form script hardening"
```

### Task 2: Move Contact Form Logic Into The Shared Script

**Files:**
- Modify: `src/components/home/ContactSection.astro`
- Modify: `src/scripts/site-effects.js`

**Step 1: Implement the minimal move**

- Remove the inline contact script from `ContactSection.astro`
- Add a guarded initializer in `src/scripts/site-effects.js` that:
  - finds the form and status element
  - submits JSON to `/api/contact`
  - shows the returned message
  - resets the form on success while preserving the locale hidden input default

**Step 2: Run targeted tests**

Run: `npm test -- tests/unit/contact-script-hardening.test.ts tests/unit/contact-api-error-handling.test.ts tests/unit/layout-script-path.test.ts`

Expected: PASS

**Step 3: Commit**

```bash
git add src/components/home/ContactSection.astro src/scripts/site-effects.js tests/unit/contact-script-hardening.test.ts
git commit -m "refactor: externalize contact form client script"
```

### Task 3: Tighten CSP

**Files:**
- Modify: `src/middleware.ts`

**Step 1: Update CSP**

- Change `script-src 'self' 'unsafe-inline'` to `script-src 'self'`
- Leave `style-src 'self' 'unsafe-inline'` unchanged in this pass

**Step 2: Run verification**

Run: `npm test -- tests/unit/contact-script-hardening.test.ts tests/unit/contact-api-error-handling.test.ts tests/unit/script-env.test.ts`

Expected: PASS

**Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "fix(security): remove inline script allowance from csp"
```

### Task 4: Final Verification

**Files:**
- Test: `tests/unit/contact-script-hardening.test.ts`
- Test: `tests/unit/contact-api-error-handling.test.ts`
- Test: `tests/unit/layout-script-path.test.ts`

**Step 1: Run final targeted tests**

Run: `npm test -- tests/unit/contact-script-hardening.test.ts tests/unit/contact-api-error-handling.test.ts tests/unit/layout-script-path.test.ts`

Expected: PASS

**Step 2: Run production build**

Run: `npm run build`

Expected: PASS

**Step 3: Commit**

```bash
git add .
git commit -m "chore: finalize csp script hardening"
```
