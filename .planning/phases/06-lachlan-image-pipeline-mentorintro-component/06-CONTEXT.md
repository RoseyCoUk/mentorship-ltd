# Phase 6: Lachlan Image Pipeline + MentorIntro Component - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Move raw Lachlan JPGs out of the deploy bundle, run them through the optimize-images pipeline to produce optimized WebPs, and build a reusable `MentorIntro.astro` component with the full structural shell Phase 7 needs. No layout integration or content insertion into index.astro yet — that is Phase 7.

</domain>

<decisions>
## Implementation Decisions

### Image Pipeline

- **D-01:** `Portrait.JPG` is the primary portrait — optimize to `lachlan-portrait.webp` for use in the bio split-grid
- **D-02:** `Picture_with_War_Room_members.JPG` should also be processed to WebP in Phase 6 (so it is available when Phase 7 decides where to place it) — placement deferred, not part of Phase 6 scope
- **D-03:** Both source files move from `public/Lachlan Pictures/` to `_zip_temp/Lachlan/` — neither should remain in the deploy bundle
- **D-04:** Image sizing: resize to a target width using sharp, let CSS handle aspect ratio and crop — no pre-crop during optimization
- **D-05:** Output target: 150–300 KB per MENTOR-08; follow the existing quality settings in optimize-images.mjs (quality 80–85)
- **D-06:** Output destination: `public/images/lachlan/` — consistent with existing `public/images/{category}/` pattern

### MentorIntro Component

- **D-07:** Build the **full shell** — component includes bio section + specialty cards area + "who he works with" block; Phase 7 just passes content in via props
- **D-08:** Content delivered via **structured props** (typed arrays/objects), not Astro slots — enforces structure and matches the roadmap's "props-driven" intent
- **D-09:** Flip direction is a prop (`flip?: boolean`) — `false` (default) = text-left/image-right (Allan's layout); `true` = image-left/text-right (Lachlan's layout)
- **D-10:** Component wraps its sections in `SectionWrapper` — inherits existing padding, max-width, and responsive behaviour with no extra wrapper logic
- **D-11:** Elements tagged with `data-motion` attributes (blur-reveal, fade-up, stagger-words) — animations inherit automatically from the existing Motion One system, no new JS needed
- **D-12:** CTA button prop accepts an `href` — Phase 7 will pass Allan's Calendly link as the documented placeholder

### Claude's Discretion

- Props vs slots choice: props (structured data arrays) selected as the cleaner pattern for a reusable, explicitly typed component
- Exact prop interface shape (field names, TypeScript types) — Claude designs this to match existing component conventions in the codebase
- Whether to add a parallax `data-parallax` attribute to the portrait image — follow the same pattern used on Allan's portrait in index.astro
- Output filenames for the processed WebPs — follow kebab-case convention (e.g., `lachlan-portrait.webp`, `lachlan-warroom.webp`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §MENTOR-08 — image optimization spec (150–300 KB WebP target)

### Existing implementation to extend
- `scripts/optimize-images.mjs` — add `processLachlan()` following the existing `processLogos()` / `processHeroes()` pattern
- `src/components/SectionWrapper.astro` — MentorIntro wraps with this; read props interface
- `src/pages/index.astro` lines 113–155 — Allan's split-grid layout is the reference pattern; Lachlan's layout mirrors it with the flip

### Animation system
- `src/pages/index.astro` and `src/layouts/Base.astro` — data-motion attribute system (`blur-reveal`, `fade-up`, `stagger-words`, `data-motion-delay`, `data-parallax`)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper.astro`: props `id`, `width` (`"narrow" | "wide"`), `class` — MentorIntro uses this as its outer wrapper
- `Button.astro`: existing button component for the CTA
- `optimize-images.mjs`: `toWebp()` and `ensureDir()` helpers already exist — `processLachlan()` calls them directly

### Established Patterns
- Image optimization: `processX()` async function, reads from `_zip_temp/{Category}/`, writes to `public/images/{category}/`, calls `logResult()` per file
- Animations: elements get `data-motion="blur-reveal|fade-up|stagger-words"` and `data-motion-delay="0.N"` attributes; the animation observer in Base.astro picks them up automatically
- Portrait display: `aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4]` container, `object-cover object-center`, extended height (`h-[120%]`) + negative top offset for parallax room, gradient overlay `from-navy-900/80`

### Integration Points
- `scripts/optimize-images.mjs` `main()` function — add `await processLachlan()` call
- Source photos move from `public/Lachlan Pictures/` → `_zip_temp/Lachlan/` before the script runs
- `MentorIntro.astro` lands in `src/components/` alongside existing components — Phase 7 imports it into index.astro

</code_context>

<specifics>
## Specific Ideas

- Lachlan's portrait uses a flipped split-grid (image LEFT, text RIGHT) — opposite of Allan's current layout
- The group photo (War Room members) is a nice-to-have for somewhere on the site; Phase 7 decides placement
- MentorIntro should be renderable in isolation (standalone test) without breaking the page — Phase 6 success criterion

</specifics>

<deferred>
## Deferred Ideas

- Placement of `lachlan-warroom.webp` (group photo) on the site — noted for Phase 7 to decide
- Lachlan's own Calendly link — currently placeholder to Allan's; swap when provided (tracked in STATE.md)

</deferred>

---

*Phase: 06-lachlan-image-pipeline-mentorintro-component*
*Context gathered: 2026-04-23*
