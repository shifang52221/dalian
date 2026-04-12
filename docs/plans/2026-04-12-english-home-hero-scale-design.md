# English Home Hero Scale Design

**Goal:** Reduce the visual weight of the English homepage hero heading so the first screen feels more balanced and premium without changing the Chinese or Japanese pages.

## Scope

- Only affect the English homepage at `/en/`
- Only adjust the first-screen hero typography and spacing
- Do not change English news pages
- Do not change Chinese or Japanese typography

## Problem

The English homepage hero uses the same structural typography system as the Chinese and Japanese versions, but the English headline is much longer. With the current font size and width, the heading appears oversized and crowded compared with the surrounding image and badges.

## Recommended Approach

Use a CSS-only override targeted to `html[lang="en"] .page--home`:

- reduce the hero heading font size
- slightly relax line height
- widen the allowed heading measure so the two-line English copy breathes better
- slightly tighten the title stack spacing to keep the lead paragraph visually connected

This is the safest option because it preserves the existing layout architecture, avoids copy changes, and keeps the adjustment limited to the one page that needs it.

## Acceptance

- The English homepage headline is visibly smaller than before
- The two English title lines feel less cramped
- Chinese and Japanese homepages remain unchanged
- English news pages remain unchanged
