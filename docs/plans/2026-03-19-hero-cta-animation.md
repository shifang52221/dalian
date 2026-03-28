# Hero CTA Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the hero CTA's floating animation with a stronger, cleaner sweep-light interaction.

**Architecture:** Keep the change inside `src/styles/global.css` so the hero markup stays untouched. Use a pseudo-element on the primary hero CTA for the sweep effect, remove idle animation from the ghost CTA, and gate persistent motion behind `prefers-reduced-motion`.

**Tech Stack:** Astro, CSS, Vitest

---

### Task 1: Lock In The Motion Rules With Tests

**Files:**
- Create: `tests/unit/hero-cta-animation.test.ts`
- Modify: `src/styles/global.css`

**Step 1: Write the failing test**

Add a regression test that verifies:
- `.button--primary` no longer uses `heroButtonPulse`
- `.button--ghost` no longer uses `heroButtonFloat`
- the stylesheet includes a new sweep-style keyframe and a `prefers-reduced-motion` rule for hero CTA motion

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/hero-cta-animation.test.ts`
Expected: FAIL because the old pulse/float animations still exist.

### Task 2: Implement The Refined CTA Motion

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Write minimal implementation**

Update the hero button styles to:
- give the primary CTA a pseudo-element sweep effect
- remove idle animation from the ghost CTA
- keep hover/focus feedback compact and responsive
- disable persistent CTA motion under `prefers-reduced-motion`

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/hero-cta-animation.test.ts`
Expected: PASS

### Task 3: Full Verification

**Files:**
- Verify: `tests/unit/hero-cta-animation.test.ts`
- Verify: `src/styles/global.css`

**Step 1: Run full tests**

Run: `npm test`

**Step 2: Run build**

Run: `npm run build`

**Step 3: Report results**

Summarize the refined motion treatment, the new safeguards, and verification output.
