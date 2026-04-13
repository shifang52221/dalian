# CMS Admin Env Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stop production CMS maintenance scripts from defaulting to project-root `.env` admin credentials while keeping local development workable.

**Architecture:** Add production-aware filtering to the shared env loader so maintenance scripts continue using the same entry point but only load sensitive admin keys from `.env` in explicitly allowed contexts. Keep non-sensitive values like `PUBLIC_POCKETBASE_URL` available from `.env` in every environment. Update tests first, then implement the minimal loader and documentation changes.

**Tech Stack:** Node.js scripts, Astro project tooling, Vitest, PocketBase maintenance scripts

---

### Task 1: Lock In Desired Loader Behavior

**Files:**
- Modify: `tests/unit/script-env.test.ts`
- Modify: `tests/unit/pocketbase-script-env-wiring.test.ts`

**Step 1: Write the failing tests**

- Add a test proving a local temporary directory still loads `PB_ADMIN_EMAIL` and
  `PB_ADMIN_PASSWORD` from `.env`.
- Add a test proving a production-like directory such as `/www/wwwroot/boheng-tec-app` skips
  those two sensitive keys from `.env`.
- Add a test proving `PUBLIC_POCKETBASE_URL` still loads in that production-like case.
- Relax the wiring test so it verifies `loadLocalEnv` usage without depending on the old exact
  `await loadLocalEnv();` string.

**Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/script-env.test.ts tests/unit/pocketbase-script-env-wiring.test.ts`

Expected: At least one new production-like loader assertion fails against the current loader.

**Step 3: Commit**

```bash
git add tests/unit/script-env.test.ts tests/unit/pocketbase-script-env-wiring.test.ts
git commit -m "test: cover production-safe cms env loading"
```

### Task 2: Implement Production-Safe Env Loading

**Files:**
- Modify: `scripts/load-env.mjs`
- Modify: `scripts/pocketbase-check.mjs`
- Modify: `scripts/pocketbase-setup.mjs`
- Modify: `scripts/pocketbase-seed.mjs`
- Modify: `scripts/pocketbase-migrate-home-images.mjs`
- Modify: `scripts/pocketbase-restore-recovered-news.mjs`

**Step 1: Write the minimal implementation**

- Add sensitive-key filtering for `PB_ADMIN_EMAIL` and `PB_ADMIN_PASSWORD`.
- Detect production-like execution using `NODE_ENV`, `CMS_ENV`, and `/www/wwwroot/`.
- Allow an escape hatch with `CMS_ALLOW_LOCAL_ADMIN_ENV=true`.
- Keep existing shell environment precedence intact.
- Update scripts only as needed so the new loader behavior is explicit and readable.

**Step 2: Run targeted tests**

Run: `npm test -- tests/unit/script-env.test.ts tests/unit/pocketbase-script-env-wiring.test.ts`

Expected: PASS

**Step 3: Commit**

```bash
git add scripts/load-env.mjs scripts/pocketbase-check.mjs scripts/pocketbase-setup.mjs scripts/pocketbase-seed.mjs scripts/pocketbase-migrate-home-images.mjs scripts/pocketbase-restore-recovered-news.mjs
git commit -m "fix(security): harden cms admin env loading"
```

### Task 3: Document The New Operator Workflow

**Files:**
- Modify: `.env.example`
- Modify: `docs/deployment.md`
- Modify: `docs/handoff-checklist.md`

**Step 1: Update docs**

- Mark `.env.example` as local-development oriented for admin credentials.
- State clearly that production CMS scripts should use system environment variables.
- Document `CMS_ALLOW_LOCAL_ADMIN_ENV=true` as a deliberate emergency override, not the default.

**Step 2: Verify docs reflect runtime behavior**

Run: `rg -n "CMS_ALLOW_LOCAL_ADMIN_ENV|PB_ADMIN_PASSWORD|system environment|local development" .env.example docs`

Expected: The new workflow appears in the sample env and deployment docs.

**Step 3: Commit**

```bash
git add .env.example docs/deployment.md docs/handoff-checklist.md
git commit -m "docs: describe hardened cms admin env workflow"
```

### Task 4: Final Verification

**Files:**
- Test: `tests/unit/script-env.test.ts`
- Test: `tests/unit/pocketbase-script-env-wiring.test.ts`
- Test: `tests/unit/pocketbase-health.test.ts`
- Test: `tests/unit/contact-api-error-handling.test.ts`

**Step 1: Run final verification**

Run: `npm test -- tests/unit/script-env.test.ts tests/unit/pocketbase-script-env-wiring.test.ts tests/unit/pocketbase-health.test.ts tests/unit/contact-api-error-handling.test.ts`

Expected: PASS

**Step 2: Run production build**

Run: `npm run build`

Expected: PASS

**Step 3: Commit**

```bash
git add .
git commit -m "chore: finalize cms admin env hardening"
```
