# CMS Homepage Image Fields Design

**Date:** 2026-03-29

## Goal

Make the CMS feel complete for homepage editing by moving the highest-value homepage images into PocketBase, while keeping the current frontend image fallbacks intact so the site does not break when editors have not uploaded replacement media yet.

## Approved Scope

This design follows the approved `A` path: we will not try to make every visual asset editable in one pass. We will only cover the homepage image slots that an editor is most likely to expect in the backend:

1. `home_hero`: hero main visual
2. `home_about`: company profile image
3. `capabilities`: per-card preview image used inside the hover/preview interaction
4. `product_cases`: project/category gallery image

## Why This Scope

The current backend already supports content editing for many homepage sections, but most visual assets still live in static frontend files. That creates a mismatch: editors can change text in the CMS but cannot update the matching images. The approved scope fixes the most visible gap first without turning this release into a full asset-management rewrite.

## Current State

- News already supports CMS media through `cover_image`.
- Homepage visuals are mainly read from static frontend assets in `src/content/image-manifest.ts`.
- `Hero.astro`, `About.astro`, `Projects.astro`, and `Capabilities.astro` already accept or derive image data, but the content API does not yet populate those image values from PocketBase for homepage records.
- `Capabilities.astro` currently depends on title/group-based hardcoded image logic, which is fragile for editors and not friendly to bilingual content changes.

## Design

### 1. Schema Changes

Add single-file image fields to the following collections:

- `home_hero.hero_image`
- `home_about.image`
- `capabilities.preview_image`
- `product_cases.image`

Keep existing localized text and alt fields. The frontend will use uploaded images when present, otherwise it will continue using the static manifest fallback.

### 2. Data Mapping

Extend the PocketBase-to-frontend mapping in `src/lib/content-api.ts` so homepage view models can expose CMS image URLs using the existing `/api/media/...` proxy approach.

Rules:

- Use uploaded CMS image when the file field has a value.
- Preserve the current static image when the CMS field is empty.
- Reuse existing localized alt text where available.
- Avoid breaking current cards or layouts if editors only upload some images and not others.

### 3. Frontend Behavior

- Hero section: use CMS hero image when uploaded.
- About section: use CMS company-intro image when uploaded.
- Capabilities section: use each card's `preview_image` instead of relying only on hardcoded title mappings.
- Projects section: use each product-case image when uploaded, with current static image gallery as fallback.

### 4. Editorial Experience

After this change, editors will see image-upload fields in the backend for the homepage areas that are most visibly missing today. This is the smallest useful improvement that makes the CMS feel materially more complete without expanding every homepage decorative asset into structured data.

## Error Handling And Fallbacks

- Missing CMS image: keep current static asset.
- CMS offline or slow: keep existing fallback homepage content.
- Partial uploads: allow a mix of CMS-managed and static images on the same page.

## Testing Strategy

Use test-first implementation:

1. Add tests that prove the schema contains the new file fields.
2. Add tests that prove `getHomePageContent()` maps CMS image fields into the homepage view model.
3. Add tests that prove capabilities no longer depend solely on hardcoded title-based preview media.
4. Keep fallback behavior covered so existing production visuals remain safe.

## Out Of Scope

- Converting every homepage decorative graphic into CMS-managed media
- Reworking the PocketBase admin UI layout
- Replacing the existing news image workflow
- Bulk media migration for old static assets
