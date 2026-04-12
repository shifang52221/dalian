# English Locale Expansion Design

**Date:** 2026-04-10

## Goal

Expand the existing Chinese and Japanese corporate site into a complete Chinese, Japanese, and English experience so the English site can launch immediately with usable translated content instead of placeholder structure.

## Approved Scope

This design follows the approved `A` path:

1. Add full `en` locale support across shared routing and language switching
2. Add English homepage and news routes
3. Extend frontend fallback content so English pages render fully even before CMS data is backfilled
4. Extend PocketBase schema and seed data from `_zh/_ja` to `_zh/_ja/_en` where the frontend already expects localized content
5. Translate the current Chinese source content into launch-ready English copy for homepage and news content

## Why This Scope

The user wants the English version to be immediately usable on launch, not just visually present. A route-only change would create empty or duplicated content, and a frontend-only English layer would leave the CMS incomplete for future editing. The approved scope keeps the current framework, extends the bilingual architecture into a durable tri-locale system, and reduces future manual maintenance.

## Current State

- `src/lib/i18n.ts` only supports `zh` and `ja`
- `src/components/site/LanguageSwitch.astro` only renders Chinese and Japanese tabs
- `src/content/site-copy.ts` and fallback content only define `zh` and `ja`
- `src/lib/content-api.ts` maps only `_zh` and `_ja` fields
- PocketBase schema only includes localized fields for Chinese and Japanese
- Home and news routes exist only for `/`, `/news`, `/ja/`, and `/ja/news/*`

## Design

### 1. Locale Model And Routing

Expand the locale type from `zh | ja` to `zh | ja | en`.

Routing rules:

- Chinese remains the default locale at `/`
- Japanese remains under `/ja/`
- English is added under `/en/`
- News detail routes become:
  - `/news/[slug]`
  - `/ja/news/[slug]`
  - `/en/news/[slug]`

Shared helpers in `src/lib/i18n.ts` should become locale-aware instead of branching only on Japanese.

### 2. Language Switch And Shared Site Copy

The language switch should render:

- `中文`
- `日本語`
- `EN`

Shared site copy in `src/content/site-copy.ts` should add English labels for:

- company name
- navigation
- footer
- shared CTA text

The English tone should stay industrial, restrained, and ready for launch, not marketing-heavy.

### 3. Frontend Content Strategy

The homepage and news views already rely on a mixed strategy:

- localized static fallback content
- localized CMS content from PocketBase

That strategy should remain, but every existing localized content structure should gain English support.

This includes:

- `src/content/fallback/site-content.ts`
- `src/content/fallback/news.ts`
- content API locale mapping
- any locale-based labels used by shared components

This ensures English pages still render fully if CMS English data is incomplete during rollout.

### 4. CMS Schema Expansion

Extend localized fields in PocketBase collections from `_zh/_ja` to `_zh/_ja/_en` where applicable:

- `site_settings`
- `home_sections`
- `home_hero`
- `home_about`
- `advantages`
- `capabilities`
- `product_cases`
- `cooperation_highlights`
- `news`

Also expand `messages.locale` allowed values to include `en`.

This keeps frontend rendering and backend editing aligned.

### 5. Translation Strategy

Use current Chinese content as the source of truth for English launch content.

Translation guidance:

- Keep terminology consistent for steel-industry manufacturing and surface engineering
- Prefer technical clarity over decorative phrasing
- Keep navigation and CTA labels concise
- Keep company-introduction copy natural enough for direct external use

Japanese content remains untouched in this pass except where shared tri-locale helpers need to be generalized.

### 6. Compatibility And Fallback Rules

- If CMS English data exists, prefer it
- If CMS English data is missing, use English fallback content
- Chinese and Japanese behavior must remain unchanged
- Existing Chinese root-path SEO and access patterns must remain unchanged

### 7. Testing Strategy

Use test-first changes for the new tri-locale behavior:

1. Add locale helper tests for English URLs
2. Add language-switch tests for the third locale option
3. Add content mapping tests proving `_en` fields are read
4. Add schema tests proving English fields exist
5. Add route and fallback tests for English homepage and news pages
6. Run build verification after implementation

## Rollout Notes

Code can ship before CMS editors finish refining English text because fallback English content will keep the site complete. After deployment, PocketBase schema and seed synchronization will be needed so the backend can expose English editing fields.

## Out Of Scope

- Rewriting the current Japanese translation set
- Reworking visual design or homepage layout
- Adding a fourth language
- Full CMS editorial UX redesign
