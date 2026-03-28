# Security Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Lock down public message writes, add anti-abuse protection to the public contact endpoint, and ship baseline frontend security headers.

**Architecture:** Security checks stay server-side. The contact form continues to POST to the Astro API route, which performs honeypot and rate-limit checks before writing to PocketBase. Astro middleware adds headers for every response, while the simplified PocketBase schema removes anonymous `messages` writes.

**Tech Stack:** Astro, TypeScript, PocketBase, Vitest

---

### Task 1: Add failing tests for the new security behaviors

**Files:**
- Modify: `tests/unit/contact-api-error-handling.test.ts`
- Modify: `tests/unit/response-charset-middleware.test.ts`
- Modify: `tests/unit/schema-fields.test.ts`

**Step 1: Write the failing tests**

Verify:
- the contact API rejects honeypot submissions and repeated rapid submissions from the same IP
- middleware adds the expected security headers alongside the existing UTF-8 normalization
- the PocketBase schema no longer leaves `messages` anonymously writable

**Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/contact-api-error-handling.test.ts tests/unit/response-charset-middleware.test.ts tests/unit/schema-fields.test.ts`
Expected: FAIL

### Task 2: Implement the minimal security changes

**Files:**
- Modify: `src/pages/api/contact.ts`
- Modify: `src/components/home/ContactSection.astro`
- Modify: `src/middleware.ts`
- Modify: `pocketbase/schema/collections.json`

**Step 1: Write minimal implementation**

Add:
- a hidden honeypot field in the public form
- an in-memory per-IP rate limiter in the contact API route
- baseline security headers in middleware
- tightened `messages` rules in the PocketBase schema

**Step 2: Run focused verification**

Run: `npx vitest run tests/unit/contact-api-error-handling.test.ts tests/unit/response-charset-middleware.test.ts tests/unit/schema-fields.test.ts`
Expected: PASS

### Task 3: Run full verification

**Files:**
- Verify: `npm test`
- Verify: `npm run build`

**Step 1: Run the full test suite**

Run: `npm test`

**Step 2: Run the production build**

Run: `npm run build`
