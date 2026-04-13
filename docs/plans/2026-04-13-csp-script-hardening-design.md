# CSP Script Hardening Design

## Summary

Remove `script-src 'unsafe-inline'` from the site CSP by moving the homepage contact form logic
out of its inline Astro script block and into the existing external site script bundle.

## Current State

The current CSP in `src/middleware.ts` allows:

- `script-src 'self' 'unsafe-inline'`
- `style-src 'self' 'unsafe-inline'`

The main remaining inline script usage is the contact form logic embedded at the end of
`src/components/home/ContactSection.astro`.

## Goal

- Remove `script-src 'unsafe-inline'`
- Keep `style-src 'unsafe-inline'` for now
- Preserve contact form behavior
- Avoid broad refactors or nonce infrastructure in this pass

## Recommended Approach

Move the contact form submit handler into `src/scripts/site-effects.js`, which is already loaded
as an external script from the base layout. Keep the DOM contract stable by reusing the existing
`data-contact-form` and `data-contact-status` hooks.

Then tighten the CSP:

- `script-src 'self'`
- `style-src 'self' 'unsafe-inline'`

## Why This Approach

- Minimal surface area
- Reuses the site’s existing script delivery path
- Avoids nonce management and per-request HTML mutation
- Leaves visual rendering untouched while removing the most risky inline script allowance

## Files To Update

- `src/components/home/ContactSection.astro`
- `src/scripts/site-effects.js`
- `src/middleware.ts`
- `tests/unit/contact-ui-primitives.test.ts`
- `tests/unit/layout-script-path.test.ts` only if needed
- add a focused test for the removed inline contact script and external initialization behavior

## Testing Strategy

- Add a failing test proving the contact section no longer contains an inline script block
- Add a failing test proving `src/scripts/site-effects.js` initializes the contact form behavior
- Run targeted tests for contact behavior and layout script loading
- Run production build

## Deferred Work

- Removing `style-src 'unsafe-inline'`
- Introducing CSP nonces or hashes
- Refactoring inline style attributes like the hero background style
