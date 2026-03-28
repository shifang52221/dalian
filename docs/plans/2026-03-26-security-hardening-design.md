# Security Hardening Design

**Goal:** Reduce public attack surface before deployment by tightening CMS permissions, hardening the public contact path, and adding baseline browser security controls.

**Scope**
- Remove anonymous direct-write exposure from the `messages` collection.
- Keep the public contact form working through the site API while adding lightweight anti-abuse checks.
- Add sitewide security headers without changing the current visual design or page layout.

**Approach**
- Treat PocketBase as a backend-only write target for messages by changing the schema rule from anonymous create to no public create.
- Gate `/api/contact` with low-friction protections that fit this brochure site: per-IP throttling, a hidden honeypot field, and stricter response handling.
- Add baseline headers in Astro middleware, including a CSP that permits the current local scripts and required external map/image origins.

**Risks**
- An over-strict CSP could break current inline or module script loading, so the policy should be tailored to the existing asset pattern.
- A very aggressive rate limit could block legitimate submissions from shared office networks, so the first pass should be conservative.
- Tightening the PocketBase schema requires the deployment environment to re-apply or sync the schema change.
