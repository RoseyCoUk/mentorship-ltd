---
phase: 07-lachlan-section-integration-navigation-anchors
plan: "02"
subsystem: ui
tags: [lachlan, mentorintro, anchor-nav, split-grid, specialty-cards, calendly]
dependency_graph:
  requires:
    - phase: 06-02-MentorIntro-component-shell
      provides: MentorIntro.astro props-driven component shell
    - phase: 07-01-anchor-navigation
      provides: Header #lachlan anchor link + Lenis offset verified at -72
  provides:
    - Lachlan section wired into index.astro (id=lachlan, flip=true, 3 specialty cards, audience block, Calendly CTA)
    - Hair-line divider between Allan About section and Lachlan section
    - All MENTOR-01..07 requirements resolved end-to-end
    - NAV-04 fully resolved (combined with Plan 01)
  affects:
    - src/pages/index.astro
tech-stack:
  added: []
  patterns:
    - "MentorIntro invocation pattern: three locked-copy const blocks (credentials/specialties/audience) in frontmatter, props pass-through to component"
    - "Hair-line divider: bare sibling <div class='border-t border-white/5'></div> between About section close and MentorIntro — no wrapper, no padding utilities"
key-files:
  created: []
  modified:
    - src/pages/index.astro
key-decisions:
  - "Lenis offset remains -72 (negative) — empirically verified in Task 3: Lachlan eyebrow fully visible below 72px fixed header on smooth-scroll"
  - "Lachlan CTA routes to Allan's Calendly URL (https://calendly.com/allan-chan-roseyco/one-on-one) as documented placeholder per MENTOR-07 — tracked in STATE.md pending todos for future swap when Lachlan's own booking link is provided"
  - "boltloop.co framed as 'a division of Elevateo Co' (not 'I own boltloop') — resolves Pitfall 5 double-claim against Companies section"
  - "lachlan-warroom.webp (149.8 KB) remains unused on disk — not deleted, left for potential future 'behind the scenes' use case per RESEARCH Open Question 4"
  - "Fighting/discipline reference uses only: discipline, non-negotiable, consistent, precise, reps — passes Pitfall 4 banned-words check (no beast/warrior/grind/alpha/savage/crush it/dominate/kill it)"
  - "em dash removed from all three credential paragraphs and specialty card desc fields per human reviewer request in Task 3 checkpoint"
  - "Companies section eyebrow changed from 'The Portfolio' to 'Allan Chan' to clarify the Allan/Lachlan transition — human reviewer request applied in fix commit e01b4da"

patterns-established:
  - "Locked-copy pattern: content data blocks defined as typed consts in Astro frontmatter, passed as props to component — keeps template body clean and content diffs readable"

requirements-completed: [MENTOR-01, MENTOR-02, MENTOR-03, MENTOR-04, MENTOR-05, MENTOR-06, MENTOR-07]

duration: "approx 30 min (including human checkpoint review)"
completed: "2026-04-24"
---

# Phase 7 Plan 02: Lachlan Section Integration Summary

**Lachlan MacDonald's full mentor section (bio split-grid, 3 specialty cards, audience block, Calendly CTA) wired into index.astro via MentorIntro component with locked copy, hair-line divider, and id=lachlan anchor — all 7 MENTOR requirements and NAV-04 now resolved end-to-end.**

## Performance

- **Duration:** approx 30 min (including human checkpoint review)
- **Started:** 2026-04-24
- **Completed:** 2026-04-24
- **Tasks:** 3 (Task 1: frontmatter import + data blocks; Task 2: divider + MentorIntro invocation; Task 3: human verification checkpoint)
- **Files modified:** 1 (src/pages/index.astro)

## Accomplishments

- MentorIntro import and three locked-copy const blocks (`lachlanCredentials`, `lachlanSpecialties`, `lachlanAudience`) added to index.astro frontmatter — satisfies MENTOR-03, MENTOR-04, MENTOR-05, MENTOR-06
- Hair-line divider (1px, rgba(255,255,255,0.05)) inserted between Allan's About section and Lachlan's section — satisfies MENTOR-01 visual break
- `<MentorIntro id="lachlan" flip={true} .../>` invoked with all 11 props — image LEFT / text RIGHT at lg+ (MENTOR-02), Calendly CTA placeholder (MENTOR-07), resolves the `#lachlan` anchor delivered by Plan 01 (NAV-04 complete)
- Human reviewer approved copy tone, layout, anchor scroll, CTA routing, and mobile responsiveness — three post-checkpoint fixes applied (em dashes removed, credentials simplified, Companies section eyebrow updated to "Allan Chan")

## Task Commits

1. **Task 1: Add MentorIntro import and Lachlan content data blocks** - `ac74af4` (feat)
2. **Task 2: Insert Lachlan section and hair-line divider into index.astro** - `2386a8b` (feat)
3. **Task 3 (human-verify post-checkpoint):** - `e01b4da` (fix) — clean up Lachlan copy per reviewer feedback

## Files Created/Modified

- `src/pages/index.astro` — MentorIntro import added to frontmatter; three `const` data blocks (`lachlanCredentials`, `lachlanSpecialties`, `lachlanAudience`) added; hair-line divider `<div class="border-t border-white/5"></div>` inserted at line 154; `<MentorIntro>` invocation inserted between Allan's About section and Companies section

## Deviations from Plan

### Auto-fixed Issues

None — plan executed as written. Post-checkpoint adjustments were driven by human reviewer feedback (not deviations from plan logic):

1. **[Human Checkpoint Fix] Removed em dashes from credentials and specialty card desc fields** — reviewer requested no em dashes; replaced all em dashes with commas or restructured phrasing. Applied in `e01b4da`.
2. **[Human Checkpoint Fix] Simplified credential language (less cheesy)** — credential paragraphs tightened for directness. Applied in `e01b4da`.
3. **[Human Checkpoint Fix] Companies section eyebrow changed to "Allan Chan"** — eyebrow was "The Portfolio"; reviewer asked for clearer Allan/Lachlan transition. Applied in `e01b4da`.

## Known Stubs

- **Lachlan's Calendly URL** (`src/pages/index.astro`, MentorIntro `cta.href` prop): Currently routes to Allan's Calendly link (`https://calendly.com/allan-chan-roseyco/one-on-one`). This is an intentional documented placeholder per MENTOR-07. Will be swapped when Lachlan provides his own booking link. Tracked in STATE.md pending todos.

## Build Notes

- `npx astro check` exits 0 — no TypeScript errors
- `npx astro build` exits 0 — all assets resolved, no broken imports
- `lachlan-warroom.webp` (149.8 KB) remains on disk unused — not deleted per RESEARCH Open Question 4, available for future "behind the scenes" section

## Self-Check: PASSED

- Commits ac74af4, 2386a8b, e01b4da verified in git log
- src/pages/index.astro modified (confirmed via commits)
- All MENTOR-01..07 + NAV-04 requirements documented as resolved
