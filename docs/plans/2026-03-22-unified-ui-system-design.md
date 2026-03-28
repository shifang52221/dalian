# Boheng Unified UI System Design

**Date:** 2026-03-22

**Status:** Approved for planning

## Goal

Upgrade the existing bilingual Astro corporate site into a unified premium visual system that feels:

- beautiful and spacious
- stable and trustworthy
- clearly industrial and international
- visibly polished with strong motion and material quality

The redesign must keep the current content architecture, bilingual routing, PocketBase integration, and contact/news behavior intact.

## Current Project Context

The current site already has a solid content and route foundation:

- Homepage composition in [src/pages/index.astro](/f:/www/www13dalian/src/pages/index.astro)
- Japanese homepage in [src/pages/ja/index.astro](/f:/www/www13dalian/src/pages/ja/index.astro)
- Shared shell in [src/layouts/BaseLayout.astro](/f:/www/www13dalian/src/layouts/BaseLayout.astro)
- Global styling in [src/styles/global.css](/f:/www/www13dalian/src/styles/global.css)
- Existing shell components in [src/components/site/Header.astro](/f:/www/www13dalian/src/components/site/Header.astro) and [src/components/site/Footer.astro](/f:/www/www13dalian/src/components/site/Footer.astro)
- Homepage sections in [src/components/home](/f:/www/www13dalian/src/components/home)
- News list/detail views in [src/components/news](/f:/www/www13dalian/src/components/news)

This means the work should be a presentation-system upgrade, not a rewrite of content loading or CMS behavior.

## Design Decision

Use this stack direction:

- Astro remains the page shell and routing layer
- Tailwind CSS becomes the new design-token and layout system
- React islands are introduced only where richer interaction or component composition is needed
- `shadcn/ui` provides the stable component foundation
- `Magic UI` provides selective premium motion and showcase effects
- `Aceternity UI` is treated as inspiration only, not a core dependency

## Why This Direction

### Option 1: Stay on pure Astro + existing CSS only

Pros:

- lowest migration cost
- smallest dependency footprint
- minimal risk to current structure

Cons:

- difficult to achieve the desired premium motion and material quality consistently
- harder to maintain a scalable design system
- easier to drift into another "improved but still ordinary" corporate site

### Option 2: Astro + Tailwind + React islands + shadcn/ui + selective Magic UI

Pros:

- best balance of consistency, elegance, and implementation control
- supports a unified visual language across homepage and inner pages
- enables stronger motion without forcing the whole site into a React app
- gives us stable primitives for forms, navigation, drawers, overlays, and UI states

Cons:

- requires a controlled migration path
- introduces Tailwind and limited React complexity

### Option 3: Lean heavily on Aceternity-style effects

Pros:

- strong first-screen impact
- visually striking showcase patterns

Cons:

- too easy to become overly flashy for a serious industrial company site
- harder to keep list/detail/content-heavy pages feeling calm and premium
- weaker fit as a long-term system foundation

### Recommendation

Choose Option 2.

It is the only option that can realistically satisfy all four constraints at once:

- unified across the entire site
- premium and visually strong
- stable and business-credible
- maintainable for future bilingual content growth

## Visual Direction

### Brand Tone

The visual tone should be:

- premium industrial technology
- calm, global, and confident
- modern but not startup-generic
- luxurious in finish, not loud in color

This site should feel closer to a high-end manufacturing group or advanced engineering supplier than to a commodity factory catalog.

### Color System

The palette should shift away from generic website blue into a more controlled premium system:

- primary base: deep navy
- secondary base: graphite / charcoal
- light surfaces: soft mineral white, cool gray
- accent: restrained amber or warm metallic gold

Usage rules:

- dark brand backgrounds establish authority
- light content surfaces preserve readability
- warm accent appears only at moments of emphasis
- gradients remain subtle and atmospheric, never neon-heavy

### Typography

Typography is a major part of the upgrade.

Principles:

- headings feel branded and architectural
- body text remains highly readable in Chinese and Japanese
- numbers, labels, and English support text can carry more technical precision
- hierarchy must be consistent across homepage, list pages, detail pages, and form blocks

The result should feel editorial and premium, not template-like.

### Material Language

The UI should use restrained material cues:

- soft glass or misted panels
- controlled edge highlights
- thin metallic borders
- layered backgrounds with subtle atmosphere
- medium radius, not overly rounded consumer-app styling

The goal is "quiet quality", not decoration for its own sake.

## Motion Direction

Motion is required, but it must feel mature.

### Motion Principles

- slower and more deliberate than ecommerce or app onboarding motion
- reveal-based, not springy
- rich enough to be noticed
- restrained enough to preserve credibility

### Motion Vocabulary

- page intro fades
- section reveal on scroll
- slight lift and highlight on cards
- refined navbar transition on scroll
- subtle button and form feedback
- image and media masking or reveal sequences

### Motion Boundaries

- no noisy looping effects across the whole page
- no overuse of glow trails, bouncing, or aggressive parallax
- no heavy animation on long-form article reading blocks
- mobile motion remains lighter than desktop

## System-Wide Unification Rules

This redesign must not create a "fancy homepage / ordinary inner page" split.

The following must be unified across all pages:

- color tokens
- spacing rhythm
- radius and border language
- card treatments
- interaction timing
- section headings
- content width rules
- form field styling
- button hierarchy

## Page-Level Design

### 1. Global Shell

The shell must establish the brand before the content begins.

Key behavior:

- a more premium top navigation with stronger material treatment
- sticky header that tightens gracefully on scroll
- more intentional language switch presentation
- footer redesigned as a brand credibility block, not just a link dump

### 2. Homepage

The homepage should be the strongest visual expression, but still aligned with inner pages.

Desired qualities:

- powerful hero with strong composition and restrained atmosphere
- section transitions that feel choreographed
- capability and project blocks that feel engineered, not generic
- testimonial/social proof areas that feel curated
- contact block that feels business-grade and trustworthy

### 3. News List

The news list should look like part of the same premium system.

Desired qualities:

- editorial-style layout rhythm
- more refined cards
- cleaner metadata hierarchy
- stronger image and card presence without becoming blog-like

### 4. News Detail

The detail page should maintain the same level of polish as the homepage.

Desired qualities:

- premium article hero
- improved typography rhythm
- cleaner reading width and paragraph spacing
- integrated content panel styling aligned with the rest of the system

### 5. Contact Experience

The contact area must communicate seriousness and reliability.

Desired qualities:

- form styling that feels premium but efficient
- clear field hierarchy and focus states
- stronger visual separation between contact data and submission form
- consistent validation and submission feedback

## Component Responsibility

### shadcn/ui should own

- buttons
- inputs
- textarea
- field states
- dialogs and drawers if needed
- tabs or accordion patterns if introduced later
- reusable card shell patterns

### Magic UI should own

- hero atmosphere helpers
- selective showcase effects
- tasteful reveal and presentation patterns
- premium visual separators or spotlight-style accents

### Existing Astro components should continue to own

- page composition
- content mapping
- locale handling
- CMS/fallback data rendering

## Data and Behavior Constraints

The redesign must preserve these behaviors:

- bilingual homepage routes
- bilingual news routes
- PocketBase-first content loading with fallback behavior
- news detail `404` handling
- contact form API behavior
- current charset and response middleware behavior

This is a UI system redesign, not a content platform redesign.

## Accessibility and Performance Requirements

- maintain readable contrast in all locales
- preserve keyboard and focus usability in navigation and forms
- respect `prefers-reduced-motion`
- keep animation lightweight and composited where possible
- avoid shipping effect-heavy code to sections that do not benefit from it

## Risks and Mitigations

### Risk 1: Style inconsistency during migration

Mitigation:

- establish tokens and shell first
- migrate shared card/button/form language before section-level flourish

### Risk 2: Homepage becomes too flashy for business content

Mitigation:

- reserve stronger effects for hero and selected showcase blocks
- keep list/detail/contact pages calmer

### Risk 3: React and Tailwind introduce unnecessary complexity

Mitigation:

- keep Astro as the primary composition layer
- use React islands only for components that truly benefit
- avoid converting content sections to React by default

### Risk 4: Chinese/Japanese pages diverge visually

Mitigation:

- share the same tokens and component primitives
- treat locale differences as copy differences, not styling forks

## Success Criteria

The redesign is successful when:

- homepage, news list, news detail, and contact areas clearly belong to one visual system
- the site feels premium, spacious, and credible
- motion is visible and impressive without becoming noisy
- mobile and desktop both feel deliberate
- bilingual pages maintain equal visual quality

## Execution Note

The workspace currently does not expose a `.git` repository, so this design can be saved but not committed from the current environment. If the repository is reattached, this document should be committed before implementation starts.
