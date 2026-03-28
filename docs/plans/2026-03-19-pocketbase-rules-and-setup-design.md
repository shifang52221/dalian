# PocketBase Rules And Setup Design

**Goal:** Make PocketBase usable for the public site by defining the required collection access rules and making schema setup safe against existing collections.

**Scope**
- Add explicit access rules to the simplified PocketBase schema file.
- Update collection import building so existing collection ids are preserved during re-import.
- Keep frontend fallback behavior unchanged.

**Approach**
- Public content collections will expose list/view access, with `news` and `home_sections` restricted to published records only.
- `messages` will allow anonymous create access and remain unreadable publicly.
- Schema import will map simplified collections to existing collection ids before calling the PocketBase import API.

**Risks**
- PocketBase treats `null` and empty string rules differently, so the schema must encode public access intentionally.
- Existing collections must be matched by name reliably to avoid accidental duplicates.
