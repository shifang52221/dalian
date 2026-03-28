# News Cover And R&D Article Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add cover-image support to CMS news and publish a "技术研发" article using an extracted source image from the provided company document.

**Architecture:** PocketBase remains the source of truth for published news. The `news` collection gains an optional image field, the Astro content layer maps that field into a frontend-friendly shape, and the news list/detail components render the image when present. Once the feature is in place, the extracted article content and selected image are inserted into PocketBase.

**Tech Stack:** Astro, TypeScript, PocketBase, Vitest, Python

---

### Task 1: Add failing tests for image-capable news content

**Files:**
- Modify: `tests/unit/schema-fields.test.ts`
- Modify: `tests/unit/content-api.test.ts`
- Modify: `tests/unit/news-editorial-layout.test.ts`

**Step 1: Write the failing tests**

Verify:
- the `news` schema exposes an optional cover image field
- the content API maps a CMS image to the news view model
- the news components expect and render image-capable content

**Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/schema-fields.test.ts tests/unit/content-api.test.ts tests/unit/news-editorial-layout.test.ts`
Expected: FAIL

### Task 2: Implement image support in schema, mapping, and UI

**Files:**
- Modify: `pocketbase/schema/collections.json`
- Modify: `src/lib/content-api.ts`
- Modify: `src/content/fallback/news.ts`
- Modify: `src/components/news/NewsCard.astro`
- Modify: `src/components/news/NewsDetail.astro`

**Step 1: Write minimal implementation**

Add an optional image field to the model, map PocketBase file URLs into news items, and render the visual in the news card/detail layout only when present.

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/schema-fields.test.ts tests/unit/content-api.test.ts tests/unit/news-editorial-layout.test.ts`
Expected: PASS

### Task 3: Extract and publish the requested article

**Files:**
- Read: `C:\Users\Administrator\Desktop\大连博恒新技术有限公司20240419.doc`
- Create: temporary extracted images in `.tmp/doc_extract/`
- Publish: PocketBase `news` record

**Step 1: Extract chapter text and choose the chapter image**

Parse the `.doc`, isolate the “技术研发” section, and select the original extracted image that best represents the chapter.

**Step 2: Publish the CMS record**

Create a bilingual news entry with slug, title, summary, content, publish date, published flag, and uploaded cover image.

**Step 3: Verify on the running site**

Open the news list and detail route and confirm the new article and image render correctly.

### Task 4: Run final verification

**Files:**
- Verify: `npm test`
- Verify: `npm run build`

**Step 1: Run the full test suite**

Run: `npm test`

**Step 2: Run the production build**

Run: `npm run build`
