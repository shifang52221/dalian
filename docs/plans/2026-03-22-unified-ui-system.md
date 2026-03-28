# Unified UI System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the bilingual Boheng Astro site into a unified premium UI system using a stable component foundation and selective high-end motion effects.

**Architecture:** Keep Astro SSR, PocketBase integration, bilingual routes, and the existing content contracts intact. Introduce Tailwind CSS and limited React islands as a presentation-system layer, use `shadcn/ui` for shared UI primitives, and apply `Magic UI` only to carefully chosen showcase moments.

**Tech Stack:** Astro, TypeScript, CSS, Tailwind CSS, React islands, shadcn/ui, Magic UI, PocketBase, Vitest

---

### Task 1: Add the new UI foundation without breaking the existing site

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.mjs`
- Create: `postcss.config.cjs`
- Create: `src/lib/utils.ts`
- Modify: `astro.config.mjs`
- Modify: `src/styles/global.css`
- Test: `tests/unit/layout-script-path.test.ts`

**Step 1: Write the failing test**

Use the current build or layout contract to prove the new styling foundation is wired correctly without removing the existing app shell.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL once Tailwind or config references are introduced but not fully wired

**Step 3: Write minimal implementation**

- Add Tailwind and its Astro integration
- Add the minimal utility helper needed for `shadcn/ui`
- Preserve the current site rendering while introducing the new foundation
- Keep the current CSS variables available during migration

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

**Step 5: Checkpoint**

No `.git` repository is currently available in this workspace. If git is restored, commit with:

```bash
git add package.json tailwind.config.mjs postcss.config.cjs src/lib/utils.ts astro.config.mjs src/styles/global.css
git commit -m "chore: add premium ui foundation"
```

### Task 2: Introduce shared premium design tokens and shell structure

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/Footer.astro`
- Test: `tests/unit/site-shell-content.test.ts`
- Test: `tests/unit/response-charset-middleware.test.ts`

**Step 1: Write the failing test**

Add or extend a shell-level test that proves the header/footer continue to render required site settings while the shell is restyled.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/site-shell-content.test.ts`
Expected: FAIL after shell markup changes if required content hooks are missing

**Step 3: Write minimal implementation**

- Introduce the final color, spacing, radius, and surface token system
- Rebuild header and footer styling into the new premium shell
- Keep locale switching and site settings rendering intact
- Preserve SSR-safe shell behavior

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/site-shell-content.test.ts tests/unit/response-charset-middleware.test.ts`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css src/components/site/Header.astro src/components/site/Footer.astro tests/unit/site-shell-content.test.ts tests/unit/response-charset-middleware.test.ts
git commit -m "feat: rebuild global shell with premium design tokens"
```

### Task 3: Add shadcn/ui-ready primitives for buttons, cards, and form controls

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/label.tsx`
- Modify: `src/components/home/ContactSection.astro`
- Test: `tests/unit/contact-validation.test.ts`
- Test: `tests/unit/contact-submit.test.ts`

**Step 1: Write the failing test**

Use the contact tests as the behavior contract while replacing the presentational form shell.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts`
Expected: FAIL if the UI migration breaks form wiring or names

**Step 3: Write minimal implementation**

- Add the minimum shared form/button primitives needed for the contact area
- Replace only the presentation shell first
- Keep current field names, submission target, and validation behavior intact

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add src/components/ui/button.tsx src/components/ui/card.tsx src/components/ui/input.tsx src/components/ui/textarea.tsx src/components/ui/label.tsx src/components/home/ContactSection.astro tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts
git commit -m "feat: add shared ui primitives and premium contact form shell"
```

### Task 4: Rebuild the homepage sections in the new visual language

**Files:**
- Modify: `src/components/home/Hero.astro`
- Modify: `src/components/home/About.astro`
- Modify: `src/components/home/Capabilities.astro`
- Modify: `src/components/home/Advantages.astro`
- Modify: `src/components/home/Projects.astro`
- Modify: `src/components/home/Testimonials.astro`
- Modify: `src/components/home/NewsPreview.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/home-content-map.test.ts`
- Test: `tests/unit/home-polish-copy.test.ts`

**Step 1: Write the failing test**

Add or extend homepage rendering tests that prove the homepage still maps the same business content into the redesigned sections.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts`
Expected: FAIL after section contract changes if content hooks are dropped

**Step 3: Write minimal implementation**

- Give hero the strongest atmosphere and premium composition
- Restyle about, capabilities, projects, testimonials, and news preview into one unified system
- Keep all current data contracts and locale-dependent copy intact
- Migrate section by section instead of all at once

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add src/components/home/Hero.astro src/components/home/About.astro src/components/home/Capabilities.astro src/components/home/Advantages.astro src/components/home/Projects.astro src/components/home/Testimonials.astro src/components/home/NewsPreview.astro src/pages/index.astro src/pages/ja/index.astro src/styles/global.css tests/unit/home-content-map.test.ts tests/unit/home-polish-copy.test.ts
git commit -m "feat: redesign homepage into unified premium system"
```

### Task 5: Add selective Magic UI-style motion and reveal behavior

**Files:**
- Modify: `src/scripts/site-effects.js`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/about-section-motion.test.ts`
- Test: `tests/unit/hero-cta-animation.test.ts`

**Step 1: Write the failing test**

Add or extend tests that assert the required reveal hooks, animation classes, or data attributes remain present.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/about-section-motion.test.ts tests/unit/hero-cta-animation.test.ts`
Expected: FAIL if the motion hook contract is missing

**Step 3: Write minimal implementation**

- Add premium reveal timing and scroll behavior
- Strengthen hero and CTA motion in a restrained way
- Respect `prefers-reduced-motion`
- Avoid global over-animation

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/about-section-motion.test.ts tests/unit/hero-cta-animation.test.ts`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add src/scripts/site-effects.js src/layouts/BaseLayout.astro src/styles/global.css tests/unit/about-section-motion.test.ts tests/unit/hero-cta-animation.test.ts
git commit -m "feat: add premium motion system"
```

### Task 6: Bring news list and news detail into the same design system

**Files:**
- Modify: `src/components/news/NewsCard.astro`
- Modify: `src/components/news/NewsDetail.astro`
- Modify: `src/pages/news/index.astro`
- Modify: `src/pages/news/[slug].astro`
- Modify: `src/pages/ja/news/index.astro`
- Modify: `src/pages/ja/news/[slug].astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/news-routing.test.ts`
- Test: `tests/unit/news-detail-not-found.test.ts`

**Step 1: Write the failing test**

Use the existing news route tests as the behavior contract before changing page structure and styling.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/news-routing.test.ts tests/unit/news-detail-not-found.test.ts`
Expected: FAIL if route or not-found handling regresses during the redesign

**Step 3: Write minimal implementation**

- Restyle the list page into a premium editorial grid
- Restyle the detail page into a refined reading experience
- Keep locale-specific routing and 404 handling intact
- Reuse the same token system as the homepage

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/news-routing.test.ts tests/unit/news-detail-not-found.test.ts`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add src/components/news/NewsCard.astro src/components/news/NewsDetail.astro src/pages/news/index.astro src/pages/news/[slug].astro src/pages/ja/news/index.astro src/pages/ja/news/[slug].astro src/styles/global.css tests/unit/news-routing.test.ts tests/unit/news-detail-not-found.test.ts
git commit -m "feat: align news pages with premium ui system"
```

### Task 7: Final consistency pass for bilingual quality, performance, and verification

**Files:**
- Modify: `README.md`
- Modify: `docs/handoff-checklist.md`
- Modify: `docs/deployment.md`
- Test: `npm test`
- Test: `npm run build`

**Step 1: Write the failing test**

Treat full verification as the contract for completion.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: Any regression caused by the UI system migration is surfaced here

**Step 3: Write minimal implementation**

- Clean up remaining inconsistent tokens or shell patterns
- Update docs to mention the new UI stack and any setup implications
- Validate both Chinese and Japanese page quality during manual review

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS

**Step 5: Checkpoint**

If git is restored:

```bash
git add README.md docs/handoff-checklist.md docs/deployment.md
git commit -m "docs: capture unified premium ui system rollout"
```

## Execution Notes

- Follow TDD strictly for each task
- Keep Astro as the composition default and avoid unnecessary React conversion
- Only introduce `Magic UI` effects where they strengthen the premium feel
- Preserve all current API behavior, route behavior, and PocketBase integration
- This workspace currently has no `.git` directory, so checkpoint commands are documented but cannot be executed here
