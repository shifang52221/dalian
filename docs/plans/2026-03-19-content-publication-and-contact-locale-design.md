# Content Publication And Contact Locale Design

**Goal:** Prevent unpublished CMS content from leaking to the public site, and return contact form error messages in the user's selected locale.

**Scope**
- Filter homepage sections and news records so unpublished items are not rendered.
- Preserve current fallback behavior when PocketBase is unavailable.
- Keep the contact API response localized for both validation failures and submission failures.

**Approach**
- Apply a minimal server-side filter in `src/lib/content-api.ts` so records with `is_published === false` are ignored before mapping.
- Read the posted `locale` value before schema validation in `src/pages/api/contact.ts`, then use that locale in the error response whenever it is valid.
- Add regression tests covering both behaviors before implementation.

**Risks**
- Existing tests use lightweight fake clients, so filtering must work with in-memory arrays instead of relying on PocketBase query syntax.
- The contact API must avoid trusting arbitrary locale strings; only `zh` and `ja` should be accepted.
