# News Editorial Service Design

**Goal:** Rebuild the Chinese and Japanese news list/detail pages into a premium industrial editorial system that feels closer to a service-details page than a simple blog list.

**Why:** The current `/news` and `/news/[slug]` experience is too thin for the rest of the site. The user wants the same steady, large-scale, industrial visual language used elsewhere, with a stronger sense of hierarchy and a proper inner-page destination when a news item is clicked.

## Visual Direction

- Keep the existing blue industrial palette and clean premium spacing.
- Use a full inner-page hero instead of a plain centered title block.
- Treat news details like a hybrid of article detail and service detail.
- Favor clear structural layers over decorative effects:
  - hero band
  - breadcrumb row
  - featured article lead
  - editorial card grid
  - detail body with sidebar

## List Page

### Structure

- Add a full-width inner hero with eyebrow, title, subtitle, and breadcrumb.
- Promote the first news item into a larger editorial lead card.
- Place a right-hand utility rail next to the lead area:
  - section intro card
  - contact / CTA card
- Render the rest of the news items in a refined responsive grid below.

### Card Behavior

- Make the cards feel clickable as whole units, not just button cards.
- Keep hover feedback clear and solid-theme, not gradient-heavy.
- Preserve existing route generation via `getNewsUrl()`.

## Detail Page

### Structure

- Add inner-page hero with breadcrumb, date, title, and summary.
- Use a two-column article layout on desktop:
  - left: feature media shell + article body
  - right: sidebar meta cards, quick contact card, related news links
- Add a bottom section for more news to avoid dead-end detail pages.

### Content Presentation

- Turn paragraph arrays into a proper readable editorial flow.
- Add section dividers, strong typographic rhythm, and a framed intro panel.
- Use generated visual shells for the media area because the CMS currently does not provide per-article images.

## Data / Backend

- Continue to source list/detail data from the existing `news` PocketBase collection.
- Do not introduce new CMS fields in this pass.
- Use existing `getNewsList()` and `getNewsItem()` flow, with detail pages additionally receiving the list for related links.

## Scope

- Chinese news list page
- Chinese news detail page
- Japanese news list page
- Japanese news detail page
- Supporting components and CSS
- Regression tests for the new layout structure
