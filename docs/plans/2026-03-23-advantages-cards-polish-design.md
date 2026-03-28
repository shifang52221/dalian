# Advantages Cards Polish Design

**Goal**

Refine the four advantages cards into a more premium, orderly, and visually confident section that matches the site's unified blue-and-white industrial identity.

**Context**

The current cards are structurally correct but visually flat. They read as standard white information tiles rather than a featured section. The user wants this area to feel more advanced, more intentional, and more consistent with the rest of the homepage without becoming flashy or unstable.

**Design Direction**

Use a restrained premium card language:

- warm white card faces instead of stark white
- subtle asymmetrical corner shaping to echo the site's existing custom button/card language
- soft blue-gray shadow layering to create controlled depth
- a more deliberate number system with a frosted badge at top left and a faint sequence marker at top right
- clearer vertical rhythm between badge, title, and paragraph
- motion that feels calm, precise, and high-end rather than playful

This section should feel like a high-grade engineering presentation module, not a startup dashboard or a template feature grid.

**Visual System**

Each card keeps the existing two-column grid and core information hierarchy, but the visual treatment becomes more editorial:

- the main card surface uses a slightly warm white panel with a low-contrast inner border
- a secondary pseudo-layer underneath gives the impression of a structural backing plate
- the top-left numeric badge becomes a soft frosted square with stronger numeral weight
- the top-right `01` to `04` marker remains but becomes lighter and more decorative
- the title shifts slightly upward and gains a cleaner, more authoritative size/weight balance
- paragraph text becomes more even and legible through tighter width control and calmer spacing

**Animation Direction**

Use three restrained animation layers:

1. Section reveal
   Each card enters with a staggered fade and upward settle, preserving the existing reveal language while making the section feel more curated.

2. Hover elevation
   On hover, the card lifts slightly, shadow depth increases, and the border gains a faint blue tint. This must stay subtle and avoid the feeling of scale-jumping.

3. Surface light sweep
   A very soft diagonal highlight passes across the card surface once on hover. It should be low-opacity, non-repeating, and only visible enough to make the card feel refined.

**Structural Accent**

Add a very thin bottom structural line near the lower edge of the card:

- nearly invisible at rest
- lightly expands and brightens on hover
- functions as a finishing detail, not a decorative bar

This line reinforces the premium engineering tone and helps separate the cards from generic white panels.

**Interaction Rules**

- no card flip
- no strong gradient hover takeover
- no infinite floating animation
- no dramatic scaling
- no purple bias or neon treatment

The effect should communicate confidence and quality through restraint.

**Responsive Behavior**

On tablet and mobile:

- keep the same visual language, but reduce card padding slightly
- keep the badge, title, and sequence marker aligned and breathable
- preserve the hover appearance for pointer devices while ensuring the static card still feels finished on touch devices
- ensure the bottom structural line and highlight treatment do not create layout clutter at narrow widths

**Implementation Scope**

Files expected to change:

- `src/components/home/Advantages.astro`
- `src/styles/global.css`
- targeted unit tests covering the premium card structure and motion hooks

**Success Criteria**

- the four cards feel more premium and section-worthy at first glance
- the styling remains aligned with the site's blue industrial visual system
- the cards become more readable and visually separated without looking busy
- hover and reveal motion feel refined and steady
- the section remains clean and responsive on desktop and mobile
