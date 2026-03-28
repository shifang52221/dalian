# Footer Transition Soften Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Soften the footer top transition so it blends from the light contact section into the dark footer without a bright dividing band.

**Architecture:** Keep the existing full-width footer structure, but tighten the gradient contract in `global.css` so the footer starts in the same cool color family as the section above. The work is CSS-only plus a small test update that locks out the white-looking top edge.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Lock the softer footer transition in tests

**Files:**
- Modify: `f:\www\www13dalian\tests\unit\footer-reference-layout.test.ts`

**Step 1: Write the failing test**

- Assert the footer stylesheet uses a cool dark-family transition at the top.
- Assert the footer backdrop no longer starts with `rgba(255, 255, 255, 0)`.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: FAIL because the current footer transition still includes the bright-looking transparent white start.

**Step 3: Keep assertions minimal**

- Only lock:
  - dark-family gradient start exists
  - white transparent top edge is gone

**Step 4: Run test to verify it still fails for the intended reason**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: FAIL with missing softened transition strings.

### Task 2: Adjust footer gradient and backdrop

**Files:**
- Modify: `f:\www\www13dalian\src\styles\global.css`
- Test: `f:\www\www13dalian\tests\unit\footer-reference-layout.test.ts`

**Step 1: Write minimal implementation**

- Update `.site-footer` gradient so the top begins in a cool light-slate family rather than transparent.
- Update `.site-footer__backdrop` to remove the transparent white start and keep only subdued dark-family overlays.
- Preserve the rest of the footer layout untouched.

**Step 2: Run test to verify it passes**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: PASS.

### Task 3: Verify stability

**Files:**
- Test: `f:\www\www13dalian\tests\unit\site-shell-design.test.ts`

**Step 1: Run related tests**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts tests/unit/site-shell-design.test.ts`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: Build succeeds.
