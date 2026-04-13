# CMS Admin Env Hardening Design

## Summary

Harden the PocketBase maintenance scripts so production usage no longer defaults to loading
`PB_ADMIN_EMAIL` and `PB_ADMIN_PASSWORD` from the project-root `.env` file. Public runtime
behavior stays unchanged. The change only affects maintenance scripts such as `cms:check`,
`cms:setup`, `cms:seed`, and related migration helpers.

## Problem

The public site no longer depends on PocketBase superuser credentials, but the operational
scripts still call `loadLocalEnv()` and silently load admin credentials from the repository
root `.env`. That means a production deployment can keep real administrator credentials in a
project file alongside application code, backups, and routine operator access.

## Goal

- Keep local development practical.
- Make production script execution prefer system-managed environment variables.
- Prevent production scripts from silently inheriting admin credentials from `.env`.
- Preserve the existing script entry points and operator workflow as much as possible.

## Recommended Approach

Introduce production-aware filtering into `scripts/load-env.mjs`.

- Continue loading non-sensitive keys from `.env`, including `PUBLIC_POCKETBASE_URL`.
- Treat `PB_ADMIN_EMAIL` and `PB_ADMIN_PASSWORD` as sensitive CMS admin keys.
- In local or temporary directories, allow `.env` to populate those sensitive keys as it does
  today.
- In production-like contexts, skip those sensitive keys unless an explicit override is set.

## Production Detection

Use a pragmatic production-like check instead of requiring a full deployment framework:

- `NODE_ENV=production` counts as production-like.
- `CMS_ENV=production` counts as production-like.
- A working directory under `/www/wwwroot/` counts as production-like for this deployment
  model.

Also support an explicit override:

- `CMS_ALLOW_LOCAL_ADMIN_ENV=true` allows loading admin credentials from `.env` even in a
  production-like context.

This keeps the default safe on the current server while still allowing emergency local file
  fallback if an operator intentionally enables it.

## Behavior Changes

- `PUBLIC_POCKETBASE_URL` can still come from `.env` in every environment.
- `PB_ADMIN_EMAIL` and `PB_ADMIN_PASSWORD` load from `.env` only when the loader allows
  sensitive file-based admin credentials.
- Existing shell or system environment variables always win over `.env`.

## Files To Update

- `scripts/load-env.mjs`
- `scripts/pocketbase-check.mjs`
- `scripts/pocketbase-setup.mjs`
- `scripts/pocketbase-seed.mjs`
- `scripts/pocketbase-migrate-home-images.mjs`
- `scripts/pocketbase-restore-recovered-news.mjs`
- `tests/unit/script-env.test.ts`
- `tests/unit/pocketbase-script-env-wiring.test.ts`
- `.env.example`
- `docs/deployment.md`
- `docs/handoff-checklist.md`

## Testing Strategy

- Add a failing unit test proving that local temporary directories still load admin credentials
  from `.env`.
- Add a failing unit test proving that a production-like directory does not load
  `PB_ADMIN_EMAIL` and `PB_ADMIN_PASSWORD` from `.env`.
- Add a failing unit test proving that safe values such as `PUBLIC_POCKETBASE_URL` still load
  in production-like mode.
- Update wiring tests so they assert script usage against the new loader call pattern without
  freezing the old exact string.
- Run targeted tests and a production build before claiming completion.

## Operational Outcome

After this change:

- local developers can keep using file-based CMS admin credentials during development
- production scripts should be run with system environment variables
- leaving real PocketBase admin credentials in project-root `.env` on the server is no longer
  the default path
