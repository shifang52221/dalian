# Footer Full Width Reference Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the site footer from a centered dark card into a full-width reference-inspired footer band that matches the target site's layout logic.

**Architecture:** Remove the card-like footer shell and let the `footer` element itself own the full-width background treatment. Keep the internal content container and CMS-fed footer content, but update the Astro structure and CSS so the footer reads like a continuous site-ending section instead of an isolated panel.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Lock the full-width footer expectations in tests

**Files:**
- Modify: `f:\www\www13dalian\tests\unit\site-shell-design.test.ts`
- Create or Modify: `f:\www\www13dalian\tests\unit\footer-reference-layout.test.ts`

**Step 1: Write the failing test**

- Assert the footer markup no longer depends on `site-footer__panel`.
- Assert the footer keeps the inner content container and bottom legal row.
- Assert the stylesheet encodes a full-width footer background and the new reference-style structure.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/site-shell-design.test.ts tests/unit/footer-reference-layout.test.ts`

Expected: FAIL because the current footer still renders as a panel-like card.

**Step 3: Keep the assertions minimal**

- Only lock:
  - full-width footer structure exists
  - old panel shell is gone
  - inner container remains
  - footer bottom row remains

**Step 4: Run test to verify it still fails for the intended reason**

Run: `npx vitest run tests/unit/site-shell-design.test.ts tests/unit/footer-reference-layout.test.ts`

Expected: FAIL with missing new wrapper/class expectations or lingering old panel expectations.

### Task 2: Simplify Footer markup into full-width band structure

**Files:**
- Modify: `f:\www\www13dalian\src\components\site\Footer.astro`

**Step 1: Write the failing test**

- Extend the footer reference test if a new wrapper such as a backdrop layer or intro row is required.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: FAIL if the new footer shell markup is not present yet.

**Step 3: Write minimal implementation**

- Remove the card-specific wrapper.
- Keep the current data-driven content.
- Introduce only the minimal structural wrappers needed for:
  - full-width background ownership
  - interior max-width layout
  - top-to-bottom footer rhythm

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: PASS.

### Task 3: Replace centered card styling with full-width footer styling

**Files:**
- Modify: `f:\www\www13dalian\src\styles\global.css`
- Test: `f:\www\www13dalian\tests\unit\footer-reference-layout.test.ts`

**Step 1: Write the failing test**

- Assert the stylesheet now contains:
  - full-width footer background rules
  - no card-like footer panel shell
  - updated footer inner spacing and transition treatment

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts`

Expected: FAIL because the new rules are not in place yet.

**Step 3: Write minimal implementation**

- Let `.site-footer` own the dark full-width background.
- Remove the heavy rounded-card treatment from the footer shell.
- Keep the footer grid readable and spacious.
- Tune the top transition so the footer feels attached to the page rather than floating.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts tests/unit/site-shell-design.test.ts`

Expected: PASS.

### Task 4: Verify homepage stability and build output

**Files:**
- Test: `f:\www\www13dalian\tests\unit\site-shell-content.test.ts`
- Test: `f:\www\www13dalian\tests\unit\home-layout-system.test.ts`

**Step 1: Run related tests**

Run: `npx vitest run tests/unit/footer-reference-layout.test.ts tests/unit/site-shell-design.test.ts tests/unit/site-shell-content.test.ts tests/unit/home-layout-system.test.ts`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: Build succeeds.

**Step 3: Visual review**

- Confirm the footer reads as:
  - full-width ending band
  - no centered black card
  - content aligned inside a stable container
  - closer to the target site's ending rhythm

**Step 4: Commit**

If a git repo is available:

```bash
git add docs/plans/2026-03-22-footer-full-width-reference-design.md docs/plans/2026-03-22-footer-full-width-reference.md src/components/site/Footer.astro src/styles/global.css tests/unit/site-shell-design.test.ts tests/unit/footer-reference-layout.test.ts
git commit -m "feat: refactor footer into full-width reference layout"
```

If no git repo is available, skip commit and report that constraint explicitly.
