# Advantages Cards Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the four homepage advantages cards into premium, asymmetrical, softly animated information cards that match the site's unified industrial blue design language.

**Architecture:** Keep the existing `Advantages.astro` content structure and enrich it with a few extra presentational wrappers and class hooks. Drive the premium appearance entirely through targeted CSS additions in `global.css`, keeping motion aligned with the site's existing reveal system and preserving current content/data flow.

**Tech Stack:** Astro, TypeScript-friendly `.astro` components, global CSS, Vitest

---

### Task 1: Add regression coverage for the premium card structure

**Files:**
- Modify: `tests/unit/footer-reference-layout.test.ts` (no)
- Create: `tests/unit/advantages-premium-cards.test.ts`
- Modify: `src/components/home/Advantages.astro`
- Modify: `src/styles/global.css`

**Step 1: Write the failing test**

Create `tests/unit/advantages-premium-cards.test.ts` to assert that:

- `Advantages.astro` includes a premium surface wrapper such as `advantages-card__surface`
- `Advantages.astro` includes a structural accent element such as `advantages-card__line`
- `Advantages.astro` includes a hover sheen hook such as `advantages-card__sheen`
- `global.css` includes selectors for the premium surface, sheen, and structural line

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: FAIL because the premium hooks do not exist yet.

**Step 3: Implement minimal structure**

Update `src/components/home/Advantages.astro` so each card contains the new presentational elements without changing the content source.

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: PASS

**Step 5: Checkpoint**

Record that the premium DOM hooks exist before styling begins.

### Task 2: Apply premium card styling and motion

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Write the failing style assertions**

Extend `tests/unit/advantages-premium-cards.test.ts` with expectations for:

- asymmetrical border radius or premium corner treatment
- `::before` or `::after` backing/sheen layers
- hover state selectors for lift, line reveal, and tint
- reduced-motion-safe behavior if needed

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: FAIL on missing style rules.

**Step 3: Implement minimal styling**

In `src/styles/global.css`:

- create a premium surface and backing layer
- restyle the numeric badge and top-right index
- adjust spacing for heading and body copy
- add restrained hover elevation and tint
- add a one-time-looking sheen treatment triggered by hover
- add the faint bottom structural line

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: PASS

**Step 5: Checkpoint**

Confirm the cards now have the approved premium visual system in code.

### Task 3: Preserve reveal rhythm and responsiveness

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/unit/advantages-premium-cards.test.ts`

**Step 1: Add failing expectations for motion/responsive hooks**

Add expectations that:

- reveal timing hooks still exist or are enhanced for the advantages cards
- mobile media-query adjustments exist for the premium card layout

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: FAIL on missing responsive/motion-specific rules.

**Step 3: Implement minimal responsive and motion polish**

Update `src/styles/global.css` to:

- keep stagger-friendly reveal behavior
- reduce padding and preserve balance on smaller viewports
- prevent decorative layers from crowding narrow cards

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: PASS

**Step 5: Checkpoint**

Confirm the section keeps its premium feel across desktop and mobile.

### Task 4: Full verification

**Files:**
- Modify: `src/components/home/Advantages.astro`
- Modify: `src/styles/global.css`
- Create/Modify: `tests/unit/advantages-premium-cards.test.ts`

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/advantages-premium-cards.test.ts`

Expected: PASS

**Step 2: Run related regression tests**

Run: `npx vitest run tests/unit/home-layout-system.test.ts tests/unit/sitewide-blue-unification.test.ts`

Expected: PASS

**Step 3: Run production build**

Run: `npm run build`

Expected: build succeeds, allowing for the repo's pre-existing Astro/Vite externalization warnings.

**Step 4: Run preview and capture the section**

Run preview and capture the advantages section to visually confirm:

- cleaner hierarchy
- calmer but richer hover language
- no cramped text or broken layout

**Step 5: Checkpoint**

Summarize the visual upgrade, test results, and any remaining polish ideas.
