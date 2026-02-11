---
phase: 02-home-page
plan: 01
subsystem: ui
tags: [astro, tailwind, accordion, hero, PAS-framework, home-page]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: SectionWrapper, Button, Card, FormInput components and design token system
provides:
  - AccordionItem.astro reusable FAQ accordion component with JS toggle and aria-expanded
  - Home page hero section with "Scale Past $1M" headline and single CTA
  - Problem section with 3 numbered cards on navy-950 background
  - Solution section with checkmark pattern and CTA
affects: [02-02 FAQ and email signup, 03-about-page, 05-animation-polish]

# Tech tracking
tech-stack:
  added: [@astrojs/check, typescript (dev dependencies for type checking)]
  patterns: [button-based accordion with aria-expanded, PAS section structure, alternating bg colors for section separation, class-based querySelectorAll for Astro script dedup]

key-files:
  created: [src/components/AccordionItem.astro]
  modified: [src/pages/index.astro]

key-decisions:
  - "Single CTA per section (hero has one button, not two like Phase 1)"
  - "Problem section uses bg-navy-950 for visual separation from navy-900 body"
  - "Solution section uses checkmark pattern (not cards) for visual contrast with problem section"
  - "AccordionItem uses button elements and class-based querySelectorAll (not IDs) for Astro script dedup"
  - "Trust line uses placeholder number (2,000+) until Alan provides real metrics"

patterns-established:
  - "PAS framework: hero (promise) -> problem (pain) -> solution (answer) section flow"
  - "Section background alternation: navy-900 (default) -> navy-950 (contrast) -> navy-900"
  - "Accordion pattern: button trigger + aria-expanded + max-height JS animation + astro:after-swap listener"

# Metrics
duration: 2min
completed: 2026-02-11
---

# Phase 2 Plan 01: Home Page Top Sections Summary

**AccordionItem component with aria-expanded toggle, and home page hero/problem/solution sections using PAS framework with alternating navy backgrounds**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-11T20:39:43Z
- **Completed:** 2026-02-11T20:42:05Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created reusable AccordionItem.astro with button-based trigger, aria-expanded, max-height animation, and SVG chevron rotation
- Rewrote index.astro hero with bold "Scale Past $1M" headline, single gold CTA, and trust line
- Added problem section with 3 numbered cards naming specific bottlenecks on navy-950 background
- Added solution section with 3 accent checkmark items and "Get the Framework" CTA
- Pre-imported AccordionItem and FormInput for Plan 02 merge readiness

## Task Commits

Each task was committed atomically:

1. **Task 1: Create AccordionItem.astro component** - `88986d8` (feat)
2. **Task 2: Rewrite index.astro with Hero, Problem, and Solution sections** - `f11e479` (feat)

## Files Created/Modified
- `src/components/AccordionItem.astro` - Reusable FAQ accordion with JS toggle, aria-expanded, and class-based querySelectorAll
- `src/pages/index.astro` - Hero, Problem, and Solution sections replacing Phase 1 placeholder content

## Decisions Made
- Single CTA per section -- Phase 1 hero had two buttons; reduced to one per research recommendation
- Problem section wrapped in `<section class="bg-navy-950">` for visual separation from default navy-900 body
- Solution section uses checkmark SVGs (not cards) to create visual contrast with the card-based problem section
- AccordionItem uses `querySelectorAll('.accordion-trigger')` not IDs, because Astro deduplicates script tags across component instances
- Trust line number (2,000+) is a placeholder until Alan provides verifiable metrics

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed @astrojs/check and typescript**
- **Found during:** Task 1 verification (astro check)
- **Issue:** `npx astro check` requires @astrojs/check and typescript packages which were not installed
- **Fix:** Ran `pnpm add @astrojs/check typescript`
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** `npx astro check` runs successfully
- **Committed in:** Not staged (dev dependency, will be picked up in metadata commit or next task)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Dev dependency install needed for type checking. No scope creep.

## Issues Encountered
- Pre-existing `astro check` errors in FormInput.astro (type string not assignable to HTMLInputTypeAttribute) and unused import in about.astro -- both are Phase 1 artifacts, not introduced by this plan. Did not fix to avoid scope creep.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- AccordionItem component ready for FAQ section in Plan 02
- FormInput already imported in index.astro, ready for email signup form in Plan 02
- Comment placeholders mark exact insertion points for FAQ and Email Signup sections
- Build passes cleanly with all 3 pages generating

---
*Phase: 02-home-page*
*Completed: 2026-02-11*
