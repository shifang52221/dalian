# Handoff Checklist

## Current Health

- Frontend stack: Astro SSR with `@astrojs/node`
- Backend/CMS: PocketBase
- Local verification status:
  - `npm test` passes
  - `npm run build` passes
  - Missing news detail pages return `404`
  - HTML responses include `charset=utf-8`
  - Contact API returns JSON with `charset=utf-8`

## Before Deployment

1. Install dependencies with `npm install`
2. Create a local `.env` from `.env.example`
3. Fill these environment variables in `.env` or the deployment environment:
   - `PUBLIC_POCKETBASE_URL`
   - `PB_ADMIN_EMAIL`
   - `PB_ADMIN_PASSWORD`
4. Start PocketBase on a long-running host
5. Build the frontend with `npm run build`
6. Start the SSR server with `node dist/server/entry.mjs`

## PocketBase Initialization

1. Confirm the PocketBase admin account exists
2. Run `npm run cms:setup`
3. Run `npm run cms:check`
4. Run `npm run cms:seed` for first-time content import
5. Use `npm run cms:seed:reset` only when you explicitly want to wipe and re-import seeded collections

## Release Verification

Run these checks after environment variables are configured:

1. `npm test`
2. `npm run build`
3. `npm run cms:check`
4. Open these routes in a browser:
   - `/`
   - `/ja/`
   - `/news`
   - `/ja/news`
   - `/news/__missing__`
   - `/ja/news/__missing__`
5. Submit the contact form from the site itself to verify same-origin POST behavior

## CMS Expectations

- Homepage and news pages prefer PocketBase content and fall back to local content if PocketBase is unavailable
- Header company name, footer contact info, and homepage contact details now consume `site_settings`
- `home_hero` controls the hero eyebrow, title, description, CTA labels, highlights, and stat rows
- `home_about` controls the company introduction title, body, points, badge, and stat rows
- `advantages`, `capabilities`, `product_cases`, and `cooperation_highlights` are rendered by `sort_order`
- News and homepage section visibility follow `is_published`
- `news` supports the `cover_image` file field after production schema sync

## CMS Collections To Verify

After running `npm run cms:setup`, verify these collections exist in PocketBase:

- `site_settings`
- `home_sections`
- `home_hero`
- `home_about`
- `advantages`
- `capabilities`
- `product_cases`
- `cooperation_highlights`
- `news`
- `messages`

## Known Operational Notes

- `npm run cms:check` cannot pass until the required environment variables are present
- `npm run cms:check`, `npm run cms:setup`, and `npm run cms:seed` automatically read the project-root `.env` file before falling back to shell-provided environment variables
- Astro blocks cross-site form submissions by default, so API verification should be done from the site itself or with a matching same-origin request setup
- This workspace currently does not expose a `.git` repository, so git-based history and branch checks are unavailable here

## Recommended Next Steps

1. Fill real production PocketBase credentials into the deployment environment
2. Run `npm run cms:setup` on production after every schema-related deployment
3. Verify seeded CMS content and publication flags in PocketBase admin
4. Test the contact flow from the real deployed domain
