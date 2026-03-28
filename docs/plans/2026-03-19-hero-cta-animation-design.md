# Hero CTA Animation Design

**Goal:** Improve the first-screen "Contact Us" button so it attracts attention with a more polished, intentional motion style.

**Scope**
- Refine only the hero CTA button motion treatment.
- Preserve the existing button layout, copy, and overall color direction.
- Reduce visual competition from the secondary hero button.

**Approach**
- Replace the current continuous vertical floating effect with a short, periodic sweep-light effect on the primary hero CTA.
- Keep the secondary hero CTA static by default and limit its motion to hover/focus feedback.
- Add a reduced-motion fallback so persistent animation is disabled when the user requests less motion.

**Interaction Design**
- Primary CTA: strong base shadow, subtle ambient glow, and an infrequent diagonal sweep across the button surface.
- Secondary CTA: no idle animation, only a restrained hover/focus background and border shift.
- Shared hover/focus: keep the current micro-lift but let the primary CTA feel more precise and premium instead of buoyant.

**Risks**
- Overly bright sweep effects can feel decorative and reduce legibility, so the effect should stay soft and brief.
- Reduced-motion handling must disable both the sweep and any idle glow loops.
