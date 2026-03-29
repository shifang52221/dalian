# PocketBase Setup

This project uses PocketBase as the lightweight CMS and admin backend.

## Collections

- `site_settings`: company-level metadata and contact info
- `home_hero`: homepage hero copy and main visual
- `home_about`: company intro copy and intro image
- `home_sections`: editable homepage section content
- `capabilities`: manufacturing and process capability cards
- `product_cases`: product and application categories
- `news`: bilingual news articles
- `messages`: contact form submissions

## Seed Files

The `seed/` directory contains starter content derived from the approved website design and company materials.

## Notes

- All public-facing content uses paired Chinese and Japanese fields.
- News and sections should not be published unless both language variants are ready.
- After running `npm run cms:setup`, the homepage image upload fields are:
  - `home_hero.hero_image`
  - `home_about.image`
  - `capabilities.preview_image`
  - `product_cases.image`
