# Contact Map Embed Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the contact-section map placeholder with an embedded address map and add external map actions.

**Architecture:** Derive the address from the existing contact details in `ContactSection.astro`, build one embedded map URL plus external map links, then render a map toolbar and iframe inside the existing `map-shell`. Add matching styles in `global.css` for the toolbar, actions, and embedded map frame.

**Tech Stack:** Astro, global CSS, Vitest

---

### Task 1: Add a failing regression test for the embedded map

**Files:**
- Create: `tests/unit/contact-map-embed.test.ts`

**Step 1: Write the failing test**

Assert that:

- `src/components/home/ContactSection.astro` contains `map-embed`
- `src/components/home/ContactSection.astro` contains `iframe`
- `src/components/home/ContactSection.astro` contains `uri.amap.com`
- `src/components/home/ContactSection.astro` contains `map.baidu.com`
- `src/styles/global.css` contains `.map-shell__toolbar {`
- `src/styles/global.css` contains `.map-embed {`
- `src/styles/global.css` contains `.map-shell__actions {`

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-map-embed.test.ts`

Expected: FAIL because the contact section still uses a placeholder block.

### Task 2: Replace the placeholder with the embedded map

**Files:**
- Modify: `src/components/home/ContactSection.astro`

**Step 1: Build map URLs from the existing address**

Read the address from the existing `content.details`.

**Step 2: Render the toolbar and embedded map**

Add:

- company-location heading
- address line
- AMap and Baidu action links
- embedded map iframe

### Task 3: Add the map styles

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Style the map toolbar**

Keep the top information strip compact and aligned with the current site language.

**Step 2: Style the embedded map**

Ensure the iframe fills the card and preserves the current rounded visual shell.

### Task 4: Verify the change

**Files:**
- Verify existing files only

**Step 1: Run targeted tests**

Run: `npx vitest run tests/unit/contact-map-embed.test.ts`

Expected: PASS

**Step 2: Build**

Run: `npm run build`

Expected: Astro build succeeds.
