# Deployment Notes

## Frontend

The Astro app is configured for SSR using `@astrojs/node`.

Typical flow:

1. Install dependencies with `npm install`
2. Build with `npm run build`
3. Run the generated standalone server from `dist/server/entry.mjs`

## PocketBase

1. Start PocketBase on a long-running host
2. Create an admin account
3. Create a project-root `.env` from `.env.example`, or set these variables in the shell or deployment environment:
   - `PUBLIC_POCKETBASE_URL`
   - `PB_ADMIN_EMAIL`
   - `PB_ADMIN_PASSWORD`
4. Run `npm run cms:setup` to create or update the required collections
5. Run `npm run cms:check` to verify admin auth and collection visibility
6. Run `npm run cms:seed` for initial import
7. Run `npm run cms:seed:reset` only when you explicitly want to wipe and re-import seeded collections

### Production Schema Sync

When the repo schema changes, production PocketBase does not update automatically. Use this order on the server:

1. `git pull origin main`
2. `npm install`
3. Ensure production `.env` points to the real PocketBase URL and production admin credentials
4. `npm run cms:setup`
5. `npm run cms:check`
6. `npm run build`
7. Restart the SSR service

### Current Editable Collections

The production CMS is expected to contain these collections after sync:

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

## Notes

- The current frontend falls back to local content when PocketBase content cannot be loaded.
- Contact form submissions require PocketBase to be online and reachable from the Astro server.
- The `cms:*` scripts automatically load the local `.env` file from the project root. If the same key already exists in the shell or deployment environment, that existing value wins.
