# Dependency Audit Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce the current `npm audit --omit=dev` findings without destabilizing the deployed Astro SSR site.

**Architecture:** Upgrade directly managed Astro ecosystem packages to the latest compatible patch versions first, then inspect the resulting transitive tree. Add narrow `overrides` only if the patch upgrade still leaves vulnerable `vite`, `picomatch`, `h3`, or `defu` versions in place.

**Tech Stack:** Astro, @astrojs/node, @astrojs/react, npm audit, Vitest

---

### Task 1: Capture The Remediation Baseline

**Files:**
- Reference: `package.json`

**Step 1: Record the current dependency state**

Run:

```bash
npm ls defu h3 picomatch vite --all
npm audit --omit=dev --json
```

Expected: vulnerable `vite@7.3.1`, `picomatch@4.0.3`, `h3@1.15.6`, and `defu@6.1.4` appear in the tree.

**Step 2: Commit**

No commit for this observation-only step.

### Task 2: Upgrade The Managed Astro Packages

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Update package versions**

- bump `astro` to `^6.1.5`
- bump `@astrojs/react` to `^5.0.3`
- keep `@astrojs/node` at `^10.0.4` unless npm resolves a newer compatible patch during install

**Step 2: Install and refresh lockfile**

Run:

```bash
npm install
```

Expected: `package-lock.json` updates and the dependency tree refreshes.

**Step 3: Re-check the vulnerable packages**

Run:

```bash
npm ls defu h3 picomatch vite --all
npm audit --omit=dev --json
```

Expected: fewer findings or at least newer transitive versions than the baseline.

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: upgrade astro patch dependencies"
```

### Task 3: Add Narrow Overrides Only If Residual Findings Remain

**Files:**
- Modify: `package.json` only if needed
- Modify: `package-lock.json` only if needed

**Step 1: Inspect remaining audit findings**

- If the audit is cleared or sufficiently reduced with no remaining vulnerable tree for the
  targeted packages, skip this task.
- If residual vulnerable packages remain, add minimal `overrides` entries for the exact package
  names still unresolved.

**Step 2: Refresh dependencies**

Run:

```bash
npm install
npm ls defu h3 picomatch vite --all
npm audit --omit=dev --json
```

Expected: the targeted vulnerable packages move to safe versions.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: pin safe transitive audit dependencies"
```

### Task 4: Regression Verification

**Files:**
- Test: `tests/unit/contact-api-error-handling.test.ts`
- Test: `tests/unit/script-env.test.ts`
- Test: `tests/unit/pocketbase-health.test.ts`

**Step 1: Run targeted regression tests**

Run:

```bash
npm test -- tests/unit/contact-api-error-handling.test.ts tests/unit/script-env.test.ts tests/unit/pocketbase-health.test.ts
```

Expected: PASS

**Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: PASS

**Step 3: Commit**

```bash
git add .
git commit -m "chore: finalize dependency audit remediation"
```
