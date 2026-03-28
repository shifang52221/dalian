# Enterprise Intro Dalian Landscape Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the homepage About section into a document-backed enterprise introduction with a reference-inspired text panel and a Dalian landscape-shaped media card.

**Architecture:** Keep the existing Astro homepage section boundaries, but update the About content contract so the right side renders editorial enterprise-intro copy instead of stat-heavy feature cards. Use CSS to reshape the left media block into an asymmetric card that borrows the homepage button language, and keep the motion restrained so the section stays aligned with the target site.

**Tech Stack:** Astro, TypeScript, Vitest, global CSS

---

### Task 1: Lock the new enterprise-intro structure in tests

**Files:**
- Modify: `f:\www\www13dalian\tests\unit\about-reference-layout.test.ts`
- Create or Modify: `f:\www\www13dalian\tests\unit\about-enterprise-intro.test.ts`

**Step 1: Write the failing test**

- Assert `About.astro` includes enterprise-intro-specific structure instead of the old stats-first body.
- Assert the section contains a prose wrapper and an intro feature list wrapper.
- Assert the left card includes a dedicated landscape/media shell class for the asymmetric shape treatment.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/about-enterprise-intro.test.ts`

Expected: FAIL because the new enterprise-intro classes and structure do not exist yet.

**Step 3: Keep the assertions minimal**

- Only lock the core structure:
  - editorial intro text block exists
  - enterprise intro feature list exists
  - shaped Dalian media card shell exists

**Step 4: Run test to verify it still fails for the intended reason**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/about-enterprise-intro.test.ts`

Expected: FAIL with missing wrapper/class assertions.

### Task 2: Replace the About content contract with document-backed enterprise intro copy

**Files:**
- Modify: `f:\www\www13dalian\src\content\fallback\site-content.ts`
- Modify: `f:\www\www13dalian\src\components\home\About.astro`

**Step 1: Write the failing test**

- Add assertions that the Chinese fallback About copy now uses:
  - `企业简介` eyebrow
  - a Dalian-grounded enterprise title
  - a formal prose paragraph based on the company document
  - three concise enterprise capability lines

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-enterprise-intro.test.ts`

Expected: FAIL because the fallback content still reflects the older summary structure.

**Step 3: Write minimal implementation**

- Update the About fallback copy to reflect the document-backed enterprise intro.
- Keep the copy compact enough for homepage readability.
- Preserve compatibility with the existing page data pipeline.
- Adjust `About.astro` to render:
  - the formal intro paragraph
  - the short enterprise capability lines
  - the lighter corner badge on the image card

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/about-enterprise-intro.test.ts`

Expected: PASS.

### Task 3: Build the asymmetric Dalian landscape card and reference-style text layout

**Files:**
- Modify: `f:\www\www13dalian\src\styles\global.css`
- Modify: `f:\www\www13dalian\src\content\image-manifest.ts`
- Test: `f:\www\www13dalian\tests\unit\about-enterprise-intro.test.ts`

**Step 1: Write the failing test**

- Assert the stylesheet contains new enterprise-intro layout rules for:
  - shaped media shell treatment
  - editorial prose spacing
  - clean feature-line rhythm for the right-side capability lines
  - restrained badge styling

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-enterprise-intro.test.ts`

Expected: FAIL because the new CSS rules do not exist yet.

**Step 3: Write minimal implementation**

- Convert the left image card into an asymmetric shape using border radius, clipping, or layered pseudo-elements that echo the homepage button language.
- Add a Dalian-focused alt text in `image-manifest.ts`.
- Refine the right panel into a cleaner editorial layout:
  - tighter headline stack
  - readable paragraph width
  - evenly spaced capability lines
- Keep the overall motion restrained and consistent with the reference site.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/about-enterprise-intro.test.ts tests/unit/about-reference-layout.test.ts`

Expected: PASS.

### Task 4: Verify homepage stability and build output

**Files:**
- Test: `f:\www\www13dalian\tests\unit\about-section-motion.test.ts`
- Test: `f:\www\www13dalian\tests\unit\home-content-map.test.ts`
- Test: `f:\www\www13dalian\tests\unit\home-polish-copy.test.ts`
- Test: `f:\www\www13dalian\tests\unit\site-shell-design.test.ts`
- Test: `f:\www\www13dalian\tests\unit\site-shell-content.test.ts`

**Step 1: Run homepage-related tests**

Run: `npx vitest run tests/unit/about-reference-layout.test.ts tests/unit/about-enterprise-intro.test.ts tests/unit/about-section-motion.test.ts tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts tests/unit/site-shell-design.test.ts tests/unit/site-shell-content.test.ts`

Expected: PASS.

**Step 2: Run build verification**

Run: `npm run build`

Expected: Build succeeds.

**Step 3: Review visually**

- Confirm the section reads as:
  - left asymmetric Dalian landscape card
  - right enterprise intro panel
  - tidy prose and capability rhythm
  - restrained motion with a stable enterprise feel

**Step 4: Commit**

If a git repo is available:

```bash
git add docs/plans/2026-03-22-enterprise-intro-dalian-landscape-design.md docs/plans/2026-03-22-enterprise-intro-dalian-landscape.md src/components/home/About.astro src/content/fallback/site-content.ts src/content/image-manifest.ts src/styles/global.css tests/unit/about-reference-layout.test.ts tests/unit/about-enterprise-intro.test.ts
git commit -m "feat: redesign about section as enterprise intro"
```

If no git repo is available, skip commit and report that constraint explicitly.
