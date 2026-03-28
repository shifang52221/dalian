# Boheng Target-Site Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Boheng frontend so its layout and animation closely match the reference site while keeping the existing Astro + PocketBase bilingual and CMS functionality.

**Architecture:** Keep Astro SSR, PocketBase integration, bilingual routes, and contact/news flows intact. Replace the current custom industrial landing layout with a reference-aligned presentation layer that mirrors the target site's section order, spacing, animation timing, and interaction patterns.

**Tech Stack:** Astro, TypeScript, CSS, lightweight client-side animation hooks, PocketBase, Vitest

---

### Task 1: Centralize clean site copy and remove corrupted text

**Files:**
- Create: `src/content/site-copy.ts`
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/Footer.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Test: `tests/unit/site-copy.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getSiteCopy } from "../../src/content/site-copy";

describe("site copy", () => {
  it("returns clean Japanese navigation labels", () => {
    const copy = getSiteCopy("ja");
    expect(copy.nav[0]?.label).toBe("ホーム");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/site-copy.test.ts`
Expected: FAIL because `site-copy` does not exist

**Step 3: Write minimal implementation**

- Add clean Chinese/Japanese site copy
- Replace corrupted literals in header/footer and page metadata
- Pass action labels into homepage components

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/site-copy.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/content/site-copy.ts src/components/site/Header.astro src/components/site/Footer.astro src/pages/index.astro src/pages/ja/index.astro tests/unit/site-copy.test.ts
git commit -m "fix: centralize clean bilingual site copy"
```

### Task 2: Rebuild the global layout shell to match the reference site

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/site/Header.astro`
- Create: `src/components/site/Preloader.astro`
- Create: `src/components/site/ScrollTopButton.astro`
- Test: `npm run build`

**Step 1: Write the failing test**

Use the build as the contract. The redesign is incomplete until the new shell compiles.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL once shell changes reference missing components/classes

**Step 3: Write minimal implementation**

- Add transparent fixed header behavior
- Add reference-style page shell spacing
- Add preloader markup and scroll-top button component
- Replace current bespoke landing shell styles with reference-aligned base styles

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css src/components/site/Header.astro src/components/site/Preloader.astro src/components/site/ScrollTopButton.astro
git commit -m "feat: rebuild global shell to match target site"
```

### Task 3: Rebuild Hero and About sections to match target-site structure

**Files:**
- Modify: `src/components/home/Hero.astro`
- Modify: `src/components/home/About.astro`
- Modify: `src/content/fallback/site-content.ts`
- Modify: `src/styles/global.css`
- Test: `tests/unit/fallback-content.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";

describe("getFallbackHomeContent", () => {
  it("returns the Boheng hero CTA copy", () => {
    expect(getFallbackHomeContent("zh").hero.primaryCta).toBe("联系我们");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/fallback-content.test.ts`
Expected: FAIL if the reshaped content contract is not implemented

**Step 3: Write minimal implementation**

- Make Hero visually mirror the target site
- Make About use image-left / content-card-right structure
- Keep content sourced from Boheng business copy

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/fallback-content.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home/Hero.astro src/components/home/About.astro src/content/fallback/site-content.ts src/styles/global.css tests/unit/fallback-content.test.ts
git commit -m "feat: rebuild hero and about sections"
```

### Task 4: Rebuild the Services and Why-Choose-Us sections in reference style

**Files:**
- Modify: `src/components/home/Capabilities.astro`
- Create: `src/components/home/Advantages.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Modify: `src/styles/global.css`
- Test: `npm run build`

**Step 1: Write the failing test**

Use the build as the contract because the page will reference the new `Advantages` component.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL because `Advantages.astro` is not yet implemented

**Step 3: Write minimal implementation**

- Keep six-card capability grid aligned to target-site services layout
- Add four-card advantages section aligned to target-site why-choose-us section
- Replace only content, not section rhythm

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home/Capabilities.astro src/components/home/Advantages.astro src/pages/index.astro src/pages/ja/index.astro src/styles/global.css
git commit -m "feat: rebuild capability and advantages sections"
```

### Task 5: Rebuild gallery and testimonial sections with target-site interactions

**Files:**
- Modify: `src/components/home/Projects.astro`
- Create: `src/components/home/Testimonials.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Modify: `src/styles/global.css`
- Test: `npm run build`

**Step 1: Write the failing test**

Use the build as the contract because the page will reference a new testimonial component.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL because `Testimonials.astro` is missing

**Step 3: Write minimal implementation**

- Convert projects to gallery tiles with overlay interaction
- Add placeholder testimonial carousel structure in target-site rhythm
- Keep content suitable for industrial B2B context

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home/Projects.astro src/components/home/Testimonials.astro src/pages/index.astro src/pages/ja/index.astro src/styles/global.css
git commit -m "feat: rebuild gallery and testimonial sections"
```

### Task 6: Rebuild contact section, map placeholder, and footer alignment

**Files:**
- Modify: `src/components/home/ContactSection.astro`
- Modify: `src/components/site/Footer.astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/contact-validation.test.ts`
- Test: `tests/unit/contact-submit.test.ts`

**Step 1: Write the failing test**

Keep the existing contact tests as the behavior contract while the markup changes.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts`
Expected: FAIL if the contact rebuild breaks existing submission behavior

**Step 3: Write minimal implementation**

- Align the contact block to the reference site structure
- Keep the working API submission path
- Add map placeholder area below the form/info split

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home/ContactSection.astro src/components/site/Footer.astro src/styles/global.css tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts
git commit -m "feat: rebuild contact section and footer layout"
```

### Task 7: Add target-site interaction layer and animation hooks

**Files:**
- Create: `src/scripts/site-effects.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Test: `npm run build`

**Step 1: Write the failing test**

Use the build as the contract because the layout will import a new client-side effects module.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL because the new interaction module is missing

**Step 3: Write minimal implementation**

- Add preloader dismissal
- Add scroll-top behavior
- Add navbar state on scroll
- Add intersection-based reveal animations approximating the target site

**Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/scripts/site-effects.ts src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "feat: add target-site interactions and animation hooks"
```

### Task 8: Align news list/detail pages to the redesigned visual language

**Files:**
- Modify: `src/components/news/NewsCard.astro`
- Modify: `src/components/news/NewsDetail.astro`
- Modify: `src/pages/news/index.astro`
- Modify: `src/pages/news/[slug].astro`
- Modify: `src/pages/ja/news/index.astro`
- Modify: `src/pages/ja/news/[slug].astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/news-routing.test.ts`

**Step 1: Write the failing test**

Use the existing news routing test as the contract while the visual structure changes.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/news-routing.test.ts`
Expected: FAIL if redesign changes break bilingual news routing

**Step 3: Write minimal implementation**

- Restyle news list cards to fit the target-site aesthetic
- Restyle news detail hero/content areas to match the redesigned shell
- Preserve route behavior and localized links

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/news-routing.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/news/NewsCard.astro src/components/news/NewsDetail.astro src/pages/news/index.astro src/pages/news/[slug].astro src/pages/ja/news/index.astro src/pages/ja/news/[slug].astro src/styles/global.css tests/unit/news-routing.test.ts
git commit -m "feat: align news pages with redesigned frontend"
```

### Task 9: Re-verify PocketBase-backed content wiring after redesign

**Files:**
- Modify: `src/lib/content-api.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Test: `tests/unit/content-fetch.test.ts`

**Step 1: Write the failing test**

Use the existing content fetch test as the contract for homepage/news preview data wiring.

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/content-fetch.test.ts`
Expected: FAIL if the new section structure no longer consumes CMS-backed data correctly

**Step 3: Write minimal implementation**

- Ensure redesigned homepage sections still consume PocketBase data
- Keep fallback behavior intact
- Keep homepage news preview linked to latest CMS news

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/content-fetch.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/content-api.ts src/pages/index.astro src/pages/ja/index.astro tests/unit/content-fetch.test.ts
git commit -m "fix: preserve cms content wiring after redesign"
```

### Task 10: Final verification of redesigned frontend

**Files:**
- Modify: `README.md`
- Modify: `docs/deployment.md`
- Test: `npm run test`
- Test: `npm run build`
- Test: local browser verification for `/`, `/ja/`, `/news`, `/ja/news`

**Step 1: Write the failing test**

There is no separate failing documentation test. Define success as missing mention of the redesign workflow and verification steps.

**Step 2: Run test to verify it fails**

Run: `npm run test`
Run: `npm run build`
Expected: any breakage or outdated notes must be fixed before completion

**Step 3: Write minimal implementation**

- Update docs to mention redesigned frontend shell and PocketBase setup flow
- Verify bilingual frontend renders with the new target-site-aligned layout

**Step 4: Run test to verify it passes**

Run: `npm run test`
Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add README.md docs/deployment.md
git commit -m "docs: update redesign verification notes"
```

## Notes

- Current workspace is not a git repository, so commit steps remain informational only.
- The earlier frontend implementation stays as a functional baseline, but this plan supersedes it for presentation-layer work.
- Preserve the existing PocketBase setup, check, and seed scripts while rebuilding the frontend.
