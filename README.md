# Dalian Boheng Website

Astro + PocketBase bilingual corporate website for Dalian Boheng.

## Stack

- Astro SSR frontend
- PocketBase CMS backend
- Chinese and Japanese content routes

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run cms:check`
- `npm run cms:setup`
- `npm run cms:seed`
- `npm run cms:seed:reset`

## PocketBase

Required environment variables:

- `PUBLIC_POCKETBASE_URL`
- `PB_ADMIN_EMAIL`
- `PB_ADMIN_PASSWORD`

The `cms:*` scripts automatically load values from the project root `.env` file before reading `process.env`. Existing shell environment variables still take precedence.

Seed data is stored in [`pocketbase/seed`](./pocketbase/seed) and schema metadata in [`pocketbase/schema/collections.json`](./pocketbase/schema/collections.json).

## Current Scope

- Bilingual homepage
- Bilingual news list/detail pages
- Contact form submission to PocketBase
- PocketBase schema and seed import script

## Handoff

- Deployment notes: [`docs/deployment.md`](./docs/deployment.md)
- Delivery checklist: [`docs/handoff-checklist.md`](./docs/handoff-checklist.md)
