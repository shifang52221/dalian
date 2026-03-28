# Favicon And Logo Tuning Design

**Goal:** Reuse the uploaded logo as the browser favicon and slightly tighten the header logo footprint.

**Scope**
- Add favicon links in the base layout using the existing `public/logo.png`.
- Reduce only the header logo container size.
- Keep the footer logo unchanged.

**Approach**
- Reference `/logo.png` from the document head as the favicon.
- Slightly shrink the header logo shell and inner max-height to reduce brand block bulk in the navbar.

**Risks**
- A non-square favicon source may render with padding in some browsers, but using the existing asset keeps implementation simple.
