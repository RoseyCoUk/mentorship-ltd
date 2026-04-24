---
phase: 06-lachlan-image-pipeline-mentorintro-component
plan: "02"
subsystem: components
tags: [astro, component, mentor, reusable, props-driven]
requires:
  - src/components/SectionWrapper.astro
  - src/components/Button.astro
  - src/components/Card.astro
provides:
  - src/components/MentorIntro.astro
affects:
  - Phase 7 (imports component and passes Lachlan's content props)
tech-stack:
  added: []
  patterns:
    - Props-driven Astro component with typed interface (Specialty, AudienceItem, Props)
    - DOM-ordered flip pattern for grid layout (no flex-row-reverse)
    - data-motion attribute contract for Motion One observer integration
    - data-parallax attribute for scroll parallax effects
key-files:
  created:
    - src/components/MentorIntro.astro
  modified: []
decisions:
  - D-07: Full component shell created in Phase 6 as a props-driven reusable component
  - D-08: Structured typed props (not slots) for bio, specialties, and audience content
  - D-09: flip boolean prop swaps DOM order for image-left/image-right at lg+ via two conditional blocks
  - D-10: Each sub-section wrapped in SectionWrapper (bio=wide, specialty=wide py-20, audience=narrow py-20)
  - D-11: All animated elements carry data-motion attributes — no new script block or Motion observer logic
  - D-12: CTA uses href prop with target=_blank and rel=noopener noreferrer
metrics:
  duration: "8 min"
  completed: "2026-04-24T18:28:00Z"
  tasks: 2
  files: 1
---

# Phase 6 Plan 02: MentorIntro Component Shell Summary

Props-driven `MentorIntro.astro` with bio split-grid (flip), specialty cards, and audience list — ready for Phase 7 content integration.

## What Was Built

Created `src/components/MentorIntro.astro` — a 185-line reusable Astro component that renders the full mentor section shell:

1. **Bio split-grid** — `lg:grid-cols-12` 5/7 split with `flip` boolean prop that uses DOM ordering (two conditional blocks) to place the image column before or after the text column without `flex-row-reverse`
2. **Specialty cards block** — 3-column grid using `Card.astro` with icon WebP, H3 title, and description
3. **"Who he works with" list** — gold border-left rows with bold lead phrase + em-dash description

## Component Stats

| Property | Value |
|----------|-------|
| File | `src/components/MentorIntro.astro` |
| Line count | 185 lines |
| Props interface fields | 11 (id, eyebrow, name, headline, credentials, image, flip, cta, specialties, audienceHeading, audienceItems) |
| Sub-interfaces | 3 (Specialty, AudienceItem, Props) |
| data-motion values used | blur-reveal (6x), stagger-words (1x), fade-up (1x), skew-up (1x) |
| data-parallax values | -60 on portrait (2 branches), -20/-40 alternating on specialty cards |
| External components | SectionWrapper, Button, Card |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript implicit any on map callbacks**
- **Found during:** Task 1 verification (astro check)
- **Issue:** TypeScript strict mode requires explicit parameter types on `.map()` callbacks. `credentials.map((para, i)`, `specialties.map((s, i)`, and `audienceItems.map((item, i)` all produced `ts(7006): Parameter 'X' implicitly has an 'any' type` errors.
- **Fix:** Added explicit TypeScript types: `(para: string, i: number)`, `(s: Specialty, i: number)`, `(item: AudienceItem, i: number)`
- **Files modified:** `src/components/MentorIntro.astro`
- **Result:** `astro check` exits 0 with 0 errors, 0 warnings (1 hint about `Props` declared but never used — this is standard Astro behavior; the `Props` interface IS the Astro prop contract)

### Build Note

`npx astro build` produced a Vercel adapter EPERM symlink error on Windows (`operation not permitted, symlink ... sharp`). This is a pre-existing Windows OS limitation with the `@astrojs/vercel` adapter — not caused by MentorIntro.astro. The Astro page rendering stage completed successfully (index.html built). The component is not imported anywhere so it contributed zero markup to the build output.

## Phase 7 Handoff

The component is ready for Phase 7 to:

1. Import into `src/pages/index.astro`
2. Pass Lachlan's content props: `eyebrow`, `name`, `headline`, `credentials[]`, `image.src`, `image.alt`, `cta.label`, `cta.href`, `specialties[]`, `audienceHeading`, `audienceItems[]`
3. Set `flip={true}` for image-left layout (Lachlan's portrait on left, text on right)
4. Pick 3 icons from `public/images/icons/` for specialty cards

## Image Pipeline Note

`lachlan-portrait.webp` referenced in Phase 7 will land at `/images/lachlan/lachlan-portrait.webp` as produced by Plan 01 in this same phase. `MentorIntro.astro` accepts `image.src` as a prop — Phase 7 passes `"/images/lachlan/lachlan-portrait.webp"` to wire the portrait.

## Known Stubs

None — the component is fully props-driven with no hardcoded content strings (except the `/images/icons/` path prefix and the em-dash separator, both per the 06-UI-SPEC.md copywriting contract). All user-visible copy flows through props supplied by Phase 7.

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Create MentorIntro.astro with typed Props interface and full shell | 4df460e |
| 2 | Full build + isolation verification (no source modifications) | (verification only) |

## Self-Check: PASSED

- `src/components/MentorIntro.astro` exists: FOUND
- Commit 4df460e exists: FOUND
- astro check exits 0: VERIFIED
- MentorIntro not imported in src/pages/ or src/layouts/: VERIFIED (0 matches)
- MentorIntro not in dist/client/index.html: VERIFIED (0 matches)
- No modifications to src/pages/ or src/layouts/: VERIFIED (git status clean)
