# Logo Replacement Design

**Goal:** Replace the temporary text badge branding with the new uploaded logo while preserving the site's existing brand text hierarchy.

**Scope**
- Use `public/logo.png` in the header and footer.
- Keep the current brand wording next to the logo in the header.
- Keep the current descriptive footer copy below a footer logo lockup.

**Approach**
- Update the header brand block to render the uploaded logo image instead of the `BH` badge.
- Add a footer logo row above the existing first-column content.
- Add constrained logo sizing rules so the image scales proportionally and remains legible on desktop and mobile.

**Risks**
- The uploaded logo may have transparency or color choices that need a subtle footer backdrop for contrast.
- The layout should preserve brand text wrapping behavior in the header on narrower screens.
