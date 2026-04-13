# Dependency Audit Remediation Design

## Summary

Reduce the current production dependency audit findings by first upgrading the Astro ecosystem to
the latest compatible patch versions, then re-running the dependency tree and audit report to see
which vulnerabilities remain. Only add `overrides` if the patch-level ecosystem upgrade leaves
residual vulnerable transitive packages.

## Current Risk Snapshot

`npm audit --omit=dev --json` currently reports:

- `vite@7.3.1` high severity findings
- `picomatch@4.0.3` high severity findings
- `h3@1.15.6` moderate severity findings
- `defu@6.1.4` high severity findings

`npm ls` shows these come through the Astro and unstorage dependency chain rather than the
application code directly.

## Goal

- Lower or remove the current dependency audit findings.
- Keep the deployed Astro SSR site stable.
- Avoid forcing fragile transitive overrides unless necessary.

## Recommended Approach

Use a two-stage remediation strategy.

### Stage 1: Ecosystem Patch Upgrade

Upgrade the directly managed ecosystem packages first:

- `astro` from `^6.1.1` to `^6.1.5`
- `@astrojs/react` from `^5.0.2` to `^5.0.3`
- keep `@astrojs/node` at `^10.0.4` if it is already current

Then reinstall dependencies and re-run:

- `npm ls defu h3 picomatch vite --all`
- `npm audit --omit=dev --json`
- key tests
- production build

### Stage 2: Targeted Overrides If Needed

If vulnerable versions still remain after the patch upgrade, add narrow `overrides` entries for
the remaining packages, limited to the exact residual transitive packages still in the tree.

This keeps the first change as natural as possible and only forces transitive versions when the
ecosystem patch release does not resolve the issue by itself.

## Alternatives Considered

### Option A: Overrides Only

Pros:

- smallest diff in `package.json`
- can be very fast

Cons:

- more fragile against upstream expectations
- harder to reason about after future dependency refreshes
- greater chance of hidden compatibility issues

### Option B: Major Ecosystem Upgrade

Pros:

- likely resolves more security debt at once

Cons:

- much larger compatibility surface
- unnecessary risk for the current online project

## Why The Recommended Approach Wins

Patch-level Astro ecosystem upgrades are a good fit here because the affected packages are already
coming from that ecosystem. A patch upgrade stays close to the currently deployed behavior. If a
patch release is insufficient, a small set of overrides can handle the remaining residual risk.

## Files To Update

- `package.json`
- `package-lock.json`
- optionally `docs/plans/2026-04-13-dependency-audit-remediation.md`

## Validation Plan

- Capture the failing baseline with the current audit output.
- Upgrade direct ecosystem packages.
- Reinstall with `npm install`.
- Re-run `npm ls defu h3 picomatch vite --all`.
- Re-run `npm audit --omit=dev --json`.
- Run targeted tests that cover the contact path and CMS env behavior.
- Run `npm run build`.

## Success Criteria

- The dependency tree is on newer patch versions where available.
- The audit report is reduced or cleared compared with the current baseline.
- The production build still succeeds.
- The tested request paths and script behaviors remain intact.
