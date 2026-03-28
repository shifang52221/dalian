# Capabilities Motion Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the homepage capabilities section with restrained staged entrance motion for the lead copy and the six capability cards.

**Architecture:** Add dedicated motion classes to the capabilities lead copy in the Astro component, then layer section-specific CSS on top of the existing reveal system. Keep the card hover interaction unchanged in spirit while making the reveal sequence feel more intentional.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a regression test for capabilities motion

**Files:**
- Create: `tests/unit/capabilities-motion-refinement.test.ts`

**Step 1: Write the failing test**

Assert that:

- `Capabilities.astro` contains `capabilities-motion-block`
- `Capabilities.astro` contains `capabilities-motion-line`
- `global.css` contains `.capabilities-motion-block {`
- `global.css` contains `.capabilities-motion-line {`
- `global.css` contains `.capabilities-lead.is-visible .capabilities-motion-line`
- `global.css` contains `.service-card--capability[data-reveal]`
- `global.css` contains `transform: translateY(20px) scale(0.985);`
- `global.css` contains `.service-card--capability[data-delay="300"]`
- `global.css` contains `@media (prefers-reduced-motion: reduce)`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capabilities-motion-refinement.test.ts`

Expected: FAIL because the section-specific motion rules do not exist yet.

### Task 2: Add lead motion hooks in the component

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Add motion classes to lead copy**

Add staged motion classes to the eyebrow, title, and subtitle elements.

**Step 2: Keep card reveal structure intact**

Do not change the existing per-card `data-delay` sequence. Reuse it as the card stagger backbone.

### Task 3: Implement restrained motion styles

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add lead motion styles**

Create dedicated rules for:

- `.capabilities-motion-block`
- `.capabilities-motion-line`
- visible-state selectors scoped to `.capabilities-lead`

**Step 2: Refine card reveal for this section**

Add a lighter initial transform to `.service-card--capability[data-reveal]` and preserve the stagger sequence through the existing `data-delay` values.

**Step 3: Add reduced-motion fallback**

Disable transforms/transitions for this section under `prefers-reduced-motion`.

### Task 4: Verify section stability

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/capabilities-motion-refinement.test.ts tests/unit/capabilities-reference-cards.test.ts tests/unit/home-layout-system.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
