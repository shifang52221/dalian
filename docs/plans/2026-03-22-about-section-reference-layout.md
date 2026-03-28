# About Section Reference Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the homepage About section into a reference-inspired left-image/right-content layout without overlapping cards.

**Architecture:** Keep the current Astro component boundaries, but simplify the About section layout contract so the image card and content card live side-by-side in normal flow. The refactor will be mostly CSS-driven, with minimal structural cleanup in the Astro markup and test updates that lock in the non-overlapping reference layout.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Lock the new About layout expectations in tests

**Files:**
- Modify: `f:\www\www13dalian\tests\unit\home-layout-system.test.ts`
- Create or Modify: `f:\www\www13dalian\tests\unit\about-reference-layout.test.ts`

**Step 1: Write the failing test**

- Add assertions that the About section still uses the existing semantic shells, but no longer depends on overlapping-card styling.
- Assert the stylesheet does not include the old `margin-left: -72px;` overlap rule for the About content card.
- Assert the stylesheet no longer uses the large downward offset that causes the content card to drift into the image card.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/home-layout-system.test.ts tests/unit/about-reference-layout.test.ts`

Expected: FAIL because the current About CSS still encodes overlap behavior.

**Step 3: Keep the new assertions minimal**

- Only assert structural and styling guarantees that matter:
  - left image / right content still exist
  - no negative overlap margin
  - no large stagger offset
  - stats and points remain in the content panel

**Step 4: Run test to verify it still fails for the intended reason**

Run: `npx vitest run tests/unit/home-layout-system.test.ts tests/unit/about-reference-layout.test.ts`

Expected: FAIL with missing or unexpected stylesheet strings tied to the old overlap design.

### Task 2: Simplify the About markup for a clean left-right layout

**Files:**
- Modify: `f:\www\www13dalian\src\components\home\About.astro`

**Step 1: Write the failing test**

- If needed, extend the About layout test to assert any new wrapper class names needed for a clean content structure.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts`

Expected: FAIL if new wrapper classes are required but not yet present.

**Step 3: Write minimal implementation**

- Keep the current content order.
- Only introduce wrapper classes if they help:
  - separate the mini stats block from the points block
  - make the right panel easier to style without overlap hacks
- Do not add new content or decorative-only markup.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts`

Expected: PASS for the markup expectations.

### Task 3: Replace overlap styling with reference-inspired two-column layout

**Files:**
- Modify: `f:\www\www13dalian\src\styles\global.css`
- Test: `f:\www\www13dalian\tests\unit\about-reference-layout.test.ts`

**Step 1: Write the failing test**

- Assert the stylesheet contains the new directional choices:
  - balanced two-column spacing
  - no negative content-card margin
  - no heavy vertical drift
  - cleaner card padding and restrained shadows

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts`

Expected: FAIL because the new layout rules do not exist yet.

**Step 3: Write minimal implementation**

- Remove the overlap rule from `.about-content-card`.
- Remove or sharply reduce the downward offset from `.about-content-card--reference`.
- Bring `.about-image-card--reference` back into normal alignment.
- Tune `.about-grid` and related wrappers to create a clean left/right composition.
- Refine the mini stats and list spacing so the right panel reads as a calm editorial block.
- Keep responsive fallbacks intact.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/home-layout-system.test.ts`

Expected: PASS.

### Task 4: Verify homepage stability

**Files:**
- Test: `f:\www\www13dalian\tests\unit\site-shell-design.test.ts`
- Test: `f:\www\www13dalian\tests\unit\site-shell-content.test.ts`
- Test: `f:\www\www13dalian\tests\unit\home-content-map.test.ts`
- Test: `f:\www\www13dalian\tests\unit\home-polish-copy.test.ts`

**Step 1: Run homepage-related tests**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/home-layout-system.test.ts tests/unit/site-shell-design.test.ts tests/unit/site-shell-content.test.ts tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: Build succeeds. Existing Astro/Vite warnings may remain if they are unrelated and pre-existing.

**Step 3: Review visually**

- Confirm the section reads as:
  - left image
  - right content
  - no card collision
  - cleaner enterprise rhythm

**Step 4: Commit**

If a git repo is available:

```bash
git add docs/plans/2026-03-22-about-section-reference-layout-design.md docs/plans/2026-03-22-about-section-reference-layout.md src/components/home/About.astro src/styles/global.css tests/unit/home-layout-system.test.ts tests/unit/about-reference-layout.test.ts
git commit -m "feat: align about section to reference layout"
```

If no git repo is available, skip commit and report that constraint explicitly.
