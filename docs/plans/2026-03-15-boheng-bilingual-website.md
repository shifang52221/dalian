# Boheng Bilingual Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Chinese/Japanese corporate website for Dalian Boheng with Astro on the frontend and PocketBase as the lightweight CMS for news, page content, media, and messages.

**Architecture:** Use Astro SSR as the public-facing web app and PocketBase as the admin/data layer. Keep bilingual content in explicit Chinese and Japanese fields, render public pages by locale route, and submit contact messages through server-side handlers into PocketBase.

**Tech Stack:** Astro, TypeScript, PocketBase, Node.js, Playwright, Vitest, ESLint, Prettier

---

### Task 1: Scaffold Astro frontend

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `src/pages/ja/index.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`
- Create: `.gitignore`
- Test: `npm run build`

**Step 1: Write the failing test**

There is no test yet. Define success as the build failing before the Astro app exists.

**Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: command fails because `package.json` and Astro files do not exist

**Step 3: Write minimal implementation**

- Initialize Astro project files manually
- Configure SSR output
- Add a minimal `BaseLayout`
- Add placeholder Chinese and Japanese home pages
- Add global stylesheet import

**Step 4: Run test to verify it passes**

Run: `npm install`
Run: `npm run build`
Expected: Astro project builds successfully

**Step 5: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro src/pages/ja/index.astro src/layouts/BaseLayout.astro src/styles/global.css .gitignore
git commit -m "feat: scaffold astro bilingual website"
```

### Task 2: Add PocketBase integration and environment config

**Files:**
- Create: `.env.example`
- Create: `src/lib/pocketbase.ts`
- Create: `src/lib/content-api.ts`
- Modify: `astro.config.mjs`
- Test: `tests/unit/content-api.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { mapLocaleRecord } from "../../src/lib/content-api";

describe("mapLocaleRecord", () => {
  it("returns the matching locale fields", () => {
    const result = mapLocaleRecord(
      {
        title_zh: "中文标题",
        title_ja: "日本語タイトル",
      },
      "ja",
    );

    expect(result.title).toBe("日本語タイトル");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/content-api.test.ts`
Expected: FAIL because PocketBase helpers do not exist

**Step 3: Write minimal implementation**

- Create PocketBase client wrapper
- Add environment variable reading
- Implement locale mapping helpers
- Keep API wrappers thin and framework-agnostic

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/content-api.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add .env.example astro.config.mjs src/lib/pocketbase.ts src/lib/content-api.ts tests/unit/content-api.test.ts
git commit -m "feat: add pocketbase content integration"
```

### Task 3: Create design system, layout shell, and navigation with language switch

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/components/site/Header.astro`
- Create: `src/components/site/Footer.astro`
- Create: `src/components/site/LanguageSwitch.astro`
- Create: `src/components/site/SeoHead.astro`
- Modify: `src/styles/global.css`
- Test: `tests/unit/language-switch.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getLocaleUrl } from "../../src/lib/i18n";

describe("getLocaleUrl", () => {
  it("maps the Chinese home page to Japanese home page", () => {
    expect(getLocaleUrl("/", "ja")).toBe("/ja/");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/language-switch.test.ts`
Expected: FAIL because locale helpers and switch logic do not exist

**Step 3: Write minimal implementation**

- Build a shared shell with header and footer
- Add right-aligned language switch
- Implement locale URL helper
- Apply industrial visual tokens and responsive navigation styles

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/language-switch.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/site/Header.astro src/components/site/Footer.astro src/components/site/LanguageSwitch.astro src/components/site/SeoHead.astro src/styles/global.css src/lib/i18n.ts tests/unit/language-switch.test.ts
git commit -m "feat: add bilingual site shell and navigation"
```

### Task 4: Build homepage sections with static fallback content

**Files:**
- Create: `src/components/home/Hero.astro`
- Create: `src/components/home/About.astro`
- Create: `src/components/home/Capabilities.astro`
- Create: `src/components/home/Projects.astro`
- Create: `src/components/home/RnD.astro`
- Create: `src/components/home/NewsPreview.astro`
- Create: `src/components/home/ContactSection.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Create: `src/content/fallback/site-content.ts`
- Test: `tests/unit/fallback-content.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getFallbackHomeContent } from "../../src/content/fallback/site-content";

describe("getFallbackHomeContent", () => {
  it("returns Japanese hero content for the ja locale", () => {
    expect(getFallbackHomeContent("ja").hero.title).toContain("表面");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/fallback-content.test.ts`
Expected: FAIL because fallback content does not exist

**Step 3: Write minimal implementation**

- Create locale-aware fallback content from approved design
- Implement homepage sections using that content
- Match the reference page rhythm while using industrial language and imagery slots

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/fallback-content.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/home src/pages/index.astro src/pages/ja/index.astro src/content/fallback/site-content.ts tests/unit/fallback-content.test.ts
git commit -m "feat: build bilingual homepage sections"
```

### Task 5: Replace fallback data with PocketBase-driven homepage content

**Files:**
- Modify: `src/lib/content-api.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ja/index.astro`
- Create: `src/types/content.ts`
- Test: `tests/unit/home-content-map.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { mapHomeSections } from "../../src/lib/content-api";

describe("mapHomeSections", () => {
  it("maps site settings and sections into homepage view data", () => {
    const result = mapHomeSections(
      { company_name_zh: "大连博恒新技术有限公司" },
      [{ key: "hero", title_zh: "标题", title_ja: "タイトル" }],
      "zh",
    );

    expect(result.companyName).toBe("大连博恒新技术有限公司");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/home-content-map.test.ts`
Expected: FAIL because homepage mapping is not implemented

**Step 3: Write minimal implementation**

- Add typed content mappers
- Read `site_settings`, `home_sections`, `capabilities`, and `product_cases`
- Fall back to local content when PocketBase is unavailable

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/home-content-map.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/content-api.ts src/pages/index.astro src/pages/ja/index.astro src/types/content.ts tests/unit/home-content-map.test.ts
git commit -m "feat: load homepage content from pocketbase"
```

### Task 6: Build bilingual news listing and detail pages

**Files:**
- Create: `src/pages/news/index.astro`
- Create: `src/pages/news/[slug].astro`
- Create: `src/pages/ja/news/index.astro`
- Create: `src/pages/ja/news/[slug].astro`
- Create: `src/components/news/NewsCard.astro`
- Create: `src/components/news/NewsDetail.astro`
- Modify: `src/lib/content-api.ts`
- Test: `tests/unit/news-routing.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { getNewsUrl } from "../../src/lib/i18n";

describe("getNewsUrl", () => {
  it("builds Japanese news detail URLs", () => {
    expect(getNewsUrl("expo-2026", "ja")).toBe("/ja/news/expo-2026");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/news-routing.test.ts`
Expected: FAIL because localized news routes are not supported

**Step 3: Write minimal implementation**

- Implement bilingual list and detail pages
- Filter published news only
- Hide records missing required locale content
- Add locale-specific SEO data

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/news-routing.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/news src/pages/ja/news src/components/news src/lib/content-api.ts src/lib/i18n.ts tests/unit/news-routing.test.ts
git commit -m "feat: add bilingual news pages"
```

### Task 7: Build contact form submission and message persistence

**Files:**
- Create: `src/actions/contact.ts`
- Create: `src/pages/api/contact.ts`
- Modify: `src/components/home/ContactSection.astro`
- Create: `src/lib/validation/contact.ts`
- Test: `tests/unit/contact-validation.test.ts`
- Test: `tests/unit/contact-submit.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { contactSchema } from "../../src/lib/validation/contact";

describe("contactSchema", () => {
  it("rejects empty messages", () => {
    const result = contactSchema.safeParse({
      name: "张三",
      email: "test@example.com",
      phone: "13591839861",
      company: "测试公司",
      message: "",
    });

    expect(result.success).toBe(false);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/contact-validation.test.ts`
Expected: FAIL because validation does not exist

**Step 3: Write minimal implementation**

- Add schema validation
- Submit valid payloads to PocketBase `messages`
- Return localized success and error messages
- Preserve safe form state on failure

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/contact-validation.test.ts`
Run: `npx vitest run tests/unit/contact-submit.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/actions/contact.ts src/pages/api/contact.ts src/components/home/ContactSection.astro src/lib/validation/contact.ts tests/unit/contact-validation.test.ts tests/unit/contact-submit.test.ts
git commit -m "feat: add contact form message handling"
```

### Task 8: Define PocketBase collections and seed data

**Files:**
- Create: `pocketbase/README.md`
- Create: `pocketbase/schema/collections.json`
- Create: `pocketbase/seed/site-settings.json`
- Create: `pocketbase/seed/home-sections.json`
- Create: `pocketbase/seed/capabilities.json`
- Create: `pocketbase/seed/product-cases.json`
- Create: `pocketbase/seed/news.json`
- Test: `tests/unit/schema-fields.test.ts`

**Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import schema from "../../pocketbase/schema/collections.json";

describe("PocketBase schema", () => {
  it("includes bilingual fields for news", () => {
    const news = schema.find((collection) => collection.name === "news");
    const fieldNames = news.fields.map((field) => field.name);

    expect(fieldNames).toContain("title_zh");
    expect(fieldNames).toContain("title_ja");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/schema-fields.test.ts`
Expected: FAIL because the PocketBase schema file does not exist

**Step 3: Write minimal implementation**

- Define collections for settings, homepage sections, capabilities, product cases, news, and messages
- Add bilingual field conventions
- Add initial seed content from the approved design and company profile

**Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/schema-fields.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add pocketbase/README.md pocketbase/schema/collections.json pocketbase/seed tests/unit/schema-fields.test.ts
git commit -m "feat: add pocketbase schema and seed content"
```

### Task 9: Add end-to-end coverage for locale switching and contact flow

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/home-locale.spec.ts`
- Create: `tests/e2e/contact-form.spec.ts`
- Modify: `package.json`
- Test: `npx playwright test`

**Step 1: Write the failing test**

```ts
import { test, expect } from "@playwright/test";

test("switches from Chinese home page to Japanese home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "日本語" }).click();
  await expect(page).toHaveURL("/ja/");
});
```

**Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/home-locale.spec.ts`
Expected: FAIL because the locale switch flow is not fully wired

**Step 3: Write minimal implementation**

- Add Playwright config
- Start the Astro app in test mode
- Cover locale switching and contact submission success state

**Step 4: Run test to verify it passes**

Run: `npx playwright test`
Expected: PASS

**Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e package.json
git commit -m "test: add e2e coverage for locale switching and contact form"
```

### Task 10: Add docs, deployment instructions, and final verification

**Files:**
- Create: `README.md`
- Create: `docs/deployment.md`
- Modify: `package.json`
- Test: `npm run lint`
- Test: `npm run test`
- Test: `npm run build`

**Step 1: Write the failing test**

There is no failing automated test for documentation. Define success as missing runbook and incomplete scripts.

**Step 2: Run test to verify it fails**

Run: `npm run lint`
Expected: FAIL or script missing before final tooling is in place

**Step 3: Write minimal implementation**

- Document setup for Astro and PocketBase
- Document environment variables and run commands
- Add lint, unit test, e2e test, and build scripts
- Document deployment expectations for SSR and PocketBase process management

**Step 4: Run test to verify it passes**

Run: `npm run lint`
Run: `npm run test`
Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add README.md docs/deployment.md package.json
git commit -m "docs: add setup and deployment guide"
```

## Notes

- Current workspace is not a git repository, so the commit steps cannot be executed until the project is initialized in git.
- The temporary extracted files in the workspace should be removed or ignored once implementation starts.
- If deployment will target Windows, document PocketBase service startup separately from the Astro app process.
