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

## Recommended Baota / Nginx Performance Settings

For the current enterprise site, the safest production tuning is:

- enable `gzip` for text assets
- cache static assets aggressively
- keep HTML uncached or short-lived

### Recommended Nginx Snippet

Add the following inside the site configuration in Baota:

```nginx
gzip on;
gzip_comp_level 5;
gzip_min_length 1k;
gzip_vary on;
gzip_proxied any;
gzip_types
  text/plain
  text/css
  text/xml
  text/javascript
  application/javascript
  application/json
  application/xml
  application/rss+xml
  image/svg+xml;

location ~* \.(css|js|mjs|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
}

location ~* \.(html)$ {
    expires -1;
    add_header Cache-Control "no-cache";
}
```

### Baota Operation Steps

1. Open the target site in Baota.
2. Enter `网站` -> `设置` -> `配置文件`.
3. Paste the snippet into the server block in the appropriate place.
4. Save the config.
5. Click reload for Nginx.
6. Re-open the website and verify CSS, JS, images, and page refresh behavior are normal.

### Notes

- If Baota already enables `gzip` globally, do not duplicate conflicting settings.
- Static asset caching is best for versioned build assets such as `/_astro/*`.
- If you later place uploaded files behind a separate path or CDN, use the same cache strategy there.
