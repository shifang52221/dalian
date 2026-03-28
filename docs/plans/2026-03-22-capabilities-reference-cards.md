# Capabilities Reference Cards Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the homepage capabilities cards to match the reference card format with centered icons, centered text, and a solid theme-blue hover state.

**Architecture:** Add a capabilities-specific card modifier and icon shell structure in the Astro component, then override the generic service-card rules with a focused CSS variant. Keep the hover interaction solid-color only and avoid changing other card systems.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a regression test for the reference card format

**Files:**
- Create: `tests/unit/capabilities-reference-cards.test.ts`

**Step 1: Write the failing test**

Assert that:

- `Capabilities.astro` includes `service-card--capability`
- `Capabilities.astro` includes `capability-card__icon-shell`
- `Capabilities.astro` includes `capability-card__body`
- `global.css` contains `.service-card--capability`
- `global.css` contains `justify-items: center;`
- `global.css` contains `text-align: center;`
- `global.css` contains `.service-card--capability:hover {`
- `global.css` contains `background: var(--primary);`
- `global.css` does not contain `.service-card--capability::before`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/capabilities-reference-cards.test.ts`

Expected: FAIL because the capability card variant does not exist yet.

### Task 2: Update the capabilities component structure

**Files:**
- Modify: `src/components/home/Capabilities.astro`

**Step 1: Add capability card modifier classes**

Change the capability cards to use a dedicated modifier such as `service-card service-card--capability`.

**Step 2: Replace the number block with a centered icon shell**

Render a centered icon shell element and keep each icon consistent with the site theme.

**Step 3: Wrap the copy in a content block**

Use a dedicated wrapper like `capability-card__body` so the CSS can center the title and description cleanly.

### Task 3: Implement the reference card styling

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Add capability-specific card rules**

Create:

- `.service-card--capability`
- `.capability-card__icon-shell`
- `.capability-card__icon`
- `.capability-card__body`

**Step 2: Implement solid-color hover**

Set hover background to a solid theme blue and switch text/icon contrast accordingly. Do not use hover gradients.

**Step 3: Run targeted tests**

Run: `npx vitest run tests/unit/capabilities-reference-cards.test.ts`

Expected: PASS

### Task 4: Verify wider homepage stability

**Files:**
- Verify existing files only

**Step 1: Run relevant regressions**

Run: `npx vitest run tests/unit/capabilities-reference-cards.test.ts tests/unit/home-layout-system.test.ts tests/unit/sitewide-blue-unification.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
