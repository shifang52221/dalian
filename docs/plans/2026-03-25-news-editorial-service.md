# News Editorial Service Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the news list/detail system into a premium editorial service-style experience across Chinese and Japanese pages while preserving the current PocketBase-backed routes.

**Architecture:** Keep the data layer simple by reusing `getNewsList()` and `getNewsItem()` and expanding only the page/component composition. The list pages will gain a hero and editorial featured layout, while detail pages will gain a service-detail-like content shell, sidebar, and related content section.

**Tech Stack:** Astro, TypeScript, global CSS, Vitest, PocketBase-backed content

---

### Task 1: Add regression tests for the new list/detail structure

**Files:**
- Create: `tests/unit/news-editorial-layout.test.ts`

**Step 1: Write the failing test**

Assert that:
- `src/pages/news/index.astro` and `src/pages/ja/news/index.astro` contain a premium hero and featured layout hook
- `src/components/news/NewsCard.astro` renders a full-card link treatment
- `src/components/news/NewsDetail.astro` contains hero, article body, sidebar, and related-news structure

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts`
Expected: FAIL because the current news pages only render simple headings/cards.

### Task 2: Rebuild the news card and detail component structure

**Files:**
- Modify: `src/components/news/NewsCard.astro`
- Modify: `src/components/news/NewsDetail.astro`

**Step 1: Write the minimal implementation**

- Turn the list card into a premium editorial card with full-card clickable shell
- Add meta, title, summary, action row, and decorative media shell
- Expand the detail component to support hero, body, sidebar, and related-news sections

**Step 2: Run the focused test**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts`
Expected: still FAIL until pages and CSS are updated.

### Task 3: Update list/detail pages to use the new editorial composition

**Files:**
- Modify: `src/pages/news/index.astro`
- Modify: `src/pages/ja/news/index.astro`
- Modify: `src/pages/news/[slug].astro`
- Modify: `src/pages/ja/news/[slug].astro`

**Step 1: Write the minimal implementation**

- Add hero/breadcrumb shells to both locale list pages
- Promote the first item to a featured lead and render the remainder in a grid
- Pass related list data into `NewsDetail.astro`
- Keep the existing 404 fallback behavior intact

**Step 2: Run the focused test**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts tests/unit/news-detail-not-found.test.ts tests/unit/news-routing.test.ts`
Expected: PASS

### Task 4: Add the supporting CSS system

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Write the minimal implementation**

- Add styles for:
  - news editorial hero
  - featured lead layout
  - premium news cards
  - detail article shell
  - sidebar cards
  - related-news section
- Preserve responsiveness and reduced-motion support

**Step 2: Run the focused tests**

Run: `npx vitest run tests/unit/news-editorial-layout.test.ts`
Expected: PASS

### Task 5: Run full verification

**Files:**
- No additional file changes required

**Step 1: Run the test suite**

Run: `npm test`

**Step 2: Run the build**

Run: `npm run build`

**Step 3: Verify the rendered pages**

Run the dev server and confirm:
- `/news`
- `/news/[slug]`
- `/ja/news`
- `/ja/news/[slug]`

Expected: pages render with the new premium editorial/service-detail layout and route correctly.
