# Homepage And CMS Expansion Design

**Goal:** Expand the current PocketBase-backed CMS so the homepage, news, contact details, product cases, advantages, and cooperation content can be edited structurally from the admin UI instead of remaining partially hardcoded in frontend fallback files.

## Problem Summary

The current site uses PocketBase for a subset of content, but the editable model is incomplete:

- `news` should support cover-image uploads, but the live CMS appears out of sync with the repo schema.
- `home_sections` only exposes a narrow title-and-summary model, while the real homepage contains many more structured content areas.
- A large share of homepage content still lives in frontend fallback files, which makes the CMS feel inconsistent and leaves the admin missing important fields.
- The local and production PocketBase instances are not guaranteed to be the same running binary, database, or schema state, so the repo must define the intended structure explicitly and the production instance must be synchronized against it.

The result is that the public site can render correctly, but the admin experience is incomplete and confusing.

## Product Direction

The CMS should be:

- **Structured-first:** separate fields for separate pieces of content rather than large freeform editor blobs.
- **Bilingual by default:** every public-facing editable text field should have Chinese and Japanese variants where appropriate.
- **Stable for the frontend:** the site should keep rendering even if the new CMS collections are not fully populated yet.
- **Incrementally deployable:** schema changes should be importable into an existing PocketBase instance without destructive resets.

## Recommended Approach

Use a **modular structured collection model** rather than expanding one giant collection or moving everything into rich text.

### Why this approach

- The admin becomes easier to understand because each module owns its own content.
- The frontend mapping remains explicit and predictable.
- Future maintenance is safer because layout-sensitive strings remain constrained to their intended slots.
- It avoids turning the homepage into a giant mixed-content JSON/editor blob that would be hard to validate and easy to break.

### Rejected alternatives

1. **Single oversized homepage collection**
   This would be fast initially but would become difficult to edit, validate, and reason about.

2. **Rich-text-driven CMS**
   This would maximize freedom but would make the homepage visually inconsistent and too easy to break.

## Target Content Model

### `site_settings`

Keep the existing collection and expand it so it acts as the global company-profile source of truth.

Recommended fields:

- `company_name_zh`
- `company_name_ja`
- `phone`
- `email`
- `address_zh`
- `address_ja`
- `copyright_zh`
- `copyright_ja`
- `icp`
- `map_url`

### `home_hero`

A dedicated single-record collection for the homepage hero.

Recommended fields:

- `eyebrow_zh`
- `eyebrow_ja`
- `title_zh`
- `title_ja`
- `description_zh`
- `description_ja`
- `primary_cta_label_zh`
- `primary_cta_label_ja`
- `primary_cta_href`
- `secondary_cta_label_zh`
- `secondary_cta_label_ja`
- `secondary_cta_href`
- `highlights_zh` as JSON array
- `highlights_ja` as JSON array
- `stats_zh` as JSON array of `{ value, label }`
- `stats_ja` as JSON array of `{ value, label }`
- `is_published`

### `home_about`

A dedicated single-record collection for the company-introduction block.

Recommended fields:

- `eyebrow_zh`
- `eyebrow_ja`
- `title_zh`
- `title_ja`
- `description_zh`
- `description_ja`
- `points_zh` as JSON array
- `points_ja` as JSON array
- `badge_value`
- `badge_label_zh`
- `badge_label_ja`
- `stats_zh` as JSON array of `{ value, label }`
- `stats_ja` as JSON array of `{ value, label }`
- `image_alt_zh`
- `image_alt_ja`
- `is_published`

### `advantages`

A multi-record collection for the four homepage value cards.

Recommended fields:

- `title_zh`
- `title_ja`
- `description_zh`
- `description_ja`
- `sort_order`
- `is_published`

### `capabilities`

Keep the existing collection and expand it so the admin has clearer control over icon/media intent.

Recommended additional fields:

- `icon_key`
- `preview_group`
- `is_published`

Existing fields to preserve:

- `title_zh`
- `title_ja`
- `description_zh`
- `description_ja`
- `sort_order`

### `product_cases`

Keep the existing collection as the product-performance source but make it explicitly publishable and sortable.

Recommended fields:

- `category_zh`
- `category_ja`
- `description_zh`
- `description_ja`
- `tags_zh`
- `tags_ja`
- `sort_order`
- `is_published`

### `cooperation_highlights`

A new multi-record collection for the current collaboration/delivery/testimonial cards.

Recommended fields:

- `name_zh`
- `name_ja`
- `role_zh`
- `role_ja`
- `quote_zh`
- `quote_ja`
- `sort_order`
- `is_published`

### `news`

Keep the existing collection but make sure the intended fields are part of the authoritative schema.

Required fields:

- `slug`
- `title_zh`
- `title_ja`
- `summary_zh`
- `summary_ja`
- `content_zh`
- `content_ja`
- `cover_image`
- `published_at`
- `is_published`

Optional future-friendly field:

- `gallery_images`

## Frontend Integration Strategy

The frontend should adopt a **CMS-first with fallback-safe rendering** model:

- Read the new collections first.
- Map them into the existing `HomeContent` shape used by the components.
- If a collection is missing, empty, unpublished, or unavailable, continue to use the existing fallback content.

This preserves current rendering while letting the CMS gradually take over.

### Why keep fallback

- It prevents broken layouts during staged rollout.
- It allows schema deployment and content entry to happen separately.
- It protects production if PocketBase is temporarily unavailable.

## Admin Usability Principles

The expanded admin should optimize for non-technical editing:

- one record for single-module content such as hero/about
- one row per card for repeatable groups such as advantages and cooperation highlights
- structured arrays for tags/highlights/stats instead of manually formatted paragraphs
- bilingual fields grouped consistently across every collection
- `sort_order` for all repeatable homepage modules
- `is_published` for all public-facing repeatable content

## Migration Strategy

The change should be deployed in this order:

1. Expand repo schema definitions and seed files.
2. Extend frontend content mapping to understand the new collections.
3. Keep fallback logic intact.
4. Synchronize the production PocketBase schema using the existing import script.
5. Seed or manually populate the new collections with the current approved site copy.

No destructive reset should be required for production.

## Risks And Controls

### Risk: Production PocketBase schema drift

The live CMS may be missing fields or entire collections.

**Control:** use the existing schema import flow to update the production instance from repo-defined schema.

### Risk: Homepage blanks when CMS data is incomplete

New collections may be empty during rollout.

**Control:** keep the existing fallback content path and only override module-by-module when CMS data is valid.

### Risk: Over-modeling the admin

Too many fields can make the CMS feel heavy.

**Control:** restrict structural modeling to content that directly affects homepage and news fidelity; avoid speculative fields that are not used by the current UI.

## Testing Strategy

The implementation should add or update tests for:

- schema fields for new collections and new fields on existing collections
- seed coverage for the new collections
- content mapping from PocketBase records into frontend view models
- news image support
- homepage mapping behavior when CMS data is present
- fallback behavior when CMS data is missing

It should also finish with:

- targeted `vitest` runs for schema and content mapping
- full `npm test`
- full `npm run build`

## Expected Outcome

After implementation:

- the CMS will expose complete structured fields for the homepage and news content that the user expects to edit
- the live site will remain visually stable during migration
- production PocketBase can be synchronized to the repo-defined schema
- content maintenance will move out of hardcoded fallback files and into the admin where appropriate
