---
phase: 07-lachlan-section-integration-navigation-anchors
plan: "01"
subsystem: navigation
tags: [lenis, anchor-nav, header, smooth-scroll]
dependency_graph:
  requires: [06-02-MentorIntro-component-shell]
  provides: [NAV-04-partial, anchor-targets-allan-faq]
  affects: [src/layouts/Base.astro, src/components/Header.astro, src/pages/index.astro]
tech_stack:
  added: []
  patterns: [lenis-anchors-offset, bare-hash-hrefs, section-id-attributes]
key_files:
  created: []
  modified:
    - src/layouts/Base.astro
    - src/components/Header.astro
    - src/pages/index.astro
decisions:
  - "Lenis offset value: -72 (negative) — compensates for fixed 4.5rem (72px) header so scroll target is visible below header, not hidden behind it"
  - "Bare hash anchors (#allan not /#allan) in Header navLinks — prevents Astro router from triggering full-page reload on hash click"
  - "Home link removed from navLinks — single-page site, logo link already covers /"
  - "id=lachlan NOT added in this plan — intentionally deferred to Plan 02 which inserts MentorIntro with id=lachlan"
metrics:
  duration: "4 min"
  completed: "2026-04-24"
  tasks_completed: 3
  files_modified: 3
---

# Phase 7 Plan 01: Lenis Anchor Navigation + Section IDs Summary

Wire up smooth-scroll anchor navigation for #allan, #lachlan, #faq header links using Lenis `anchors: { offset: -72 }` and section ID attributes on About and FAQ sections.

## What Was Built

Three targeted edits across three files to enable hash-anchor navigation on the single-page site:

1. **`src/layouts/Base.astro`** — Added `anchors: { offset: -72 }` to the Lenis init. The -72 offset compensates for the fixed 4.5rem (72px) header so that when a visitor clicks a nav anchor, the target section's top edge appears just below the header, not hidden behind it. All three pre-existing options (lerp, wheelMultiplier, smoothWheel) preserved verbatim.

2. **`src/components/Header.astro`** — Replaced the single `{ label: "Home", href: "/" }` entry in `navLinks` with three bare hash anchors: `{ label: "Allan", href: "#allan" }`, `{ label: "Lachlan", href: "#lachlan" }`, `{ label: "FAQ", href: "#faq" }`. Both the desktop nav and mobile menu panel automatically pick up the new entries since they both iterate the same `navLinks` source. The `Book a Call` CTA (Calendly) and the logo `href="/"` were untouched.

3. **`src/pages/index.astro`** — Added `id="allan"` to the About `<section>` (as first attribute, before class) and `id="faq"` to the FAQ `<SectionWrapper>` (between width and class props). Existing `id="signup"` on the email section was preserved. HTML comments were preserved.

## Lenis Offset Value

The final offset value used is **-72** (negative). This is correct per Lenis v1.3.17 behavior: a negative offset shifts the scroll destination upward relative to the viewport, meaning the scroll stops 72px sooner so the section top lands below the header. The comment in Base.astro documents this explicitly.

## Confirmation: Header Anchor Links

Header.astro contains exactly 3 anchor links:
- `{ label: "Allan", href: "#allan" }` — 1 declaration
- `{ label: "Lachlan", href: "#lachlan" }` — 1 declaration  
- `{ label: "FAQ", href: "#faq" }` — 1 declaration

No `Home` link remains. No `/#` leading-slash anchors present.

## Confirmation: Section IDs in index.astro

- `id="allan"` on About `<section>` (line 109) — 1 occurrence
- `id="faq"` on FAQ `<SectionWrapper>` (line 332) — 1 occurrence
- `id="lachlan"` — NOT added here; delivered by Plan 02 via `<MentorIntro id="lachlan">` prop

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

**#lachlan target** — The `Lachlan` header nav link has no scroll target until Plan 02 ships the MentorIntro component into index.astro. This is an intentional mid-wave state, not a defect. Plan 02 inserts `<MentorIntro id="lachlan" ...>` which lands the ID on the component's outer `<section>`. The header link will resolve after Plan 02 merges.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: Lenis anchors config | dae2cea | feat(07-01): enable Lenis anchor navigation with -72px header offset |
| Task 2: Header navLinks | 92b675b | feat(07-01): replace Header navLinks with #allan / #lachlan / #faq anchors |
| Task 3: Section IDs | 700e797 | feat(07-01): add id=allan to About section and id=faq to FAQ SectionWrapper |

## Self-Check: PASSED

- [x] `src/layouts/Base.astro` modified — anchors: { offset: -72 } present
- [x] `src/components/Header.astro` modified — 3 anchor links, no Home, no /#
- [x] `src/pages/index.astro` modified — id="allan" and id="faq" in exact positions
- [x] `npx astro check` exits 0 (0 errors, 0 warnings)
- [x] `npx astro build` exits 0 (Complete in ~13s)
- [x] All 3 commits exist on worktree branch
