# Local Map And Webserver Tuning Design

**Goal:** Remove the homepage contact section's dependency on an external static map image service and document practical production webserver tuning for Baota/Nginx so the site feels faster and more stable.

## Context

The contact section currently renders a static image from the Baidu Maps image API. Even though the image is lazy-loaded, it still depends on an external network request and can make the lower section feel unstable or slow. The homepage already includes external map-opening actions, so the visual map itself does not need to come from a live provider.

Separately, the project deployment notes currently cover app and CMS setup but do not yet document webserver-level compression and static cache settings. For a content-heavy enterprise site, these settings are a direct and low-risk performance win.

## Recommended Approach

Use a local static map illustration asset inside the repo and keep the existing "open in Amap / open in Baidu" links for real navigation.

This keeps the UI intact while removing the external image dependency. A local SVG is preferred because it stays lightweight, scales well, and is easy to adjust later without quality loss.

Then extend deployment documentation with a Baota/Nginx section that covers:

- `gzip` for text assets
- long-lived cache headers for immutable static assets
- shorter cache for HTML
- a safe reload flow after config changes

## Alternatives Considered

### 1. Keep the external Baidu static map

Pros:

- no UI redesign
- true provider-rendered map image

Cons:

- still depends on third-party availability and latency
- can feel slow or inconsistent in Mainland network conditions

### 2. Embed an iframe map

Pros:

- interactive map inside the page

Cons:

- heavier than a static card
- more likely to affect page responsiveness
- worse fit for a calm B2B homepage

## Scope

In scope:

- replace external static map URL with local static asset
- preserve the two map action links
- keep the current card layout and overlay styling
- add deployment notes for Baota/Nginx compression and cache headers

Out of scope:

- live interactive map embeds
- geocoding changes
- server-side image processing

## Testing Strategy

- update the contact map unit test so it asserts the component points to the local map asset rather than the external Baidu image API
- run targeted unit tests for the contact map structure
- run the full test suite and build to ensure no regression

