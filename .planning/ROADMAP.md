# Roadmap: Elevateo / Mentorship Ltd

## Overview

Elevateo launched as Alan Chan's personal brand site, pivoted to Mentorship Ltd as a single-page cinematic site — dark charcoal/gold aesthetics, Motion One scroll animations, and Resend email integration. v1.0 (Phases 1-5) is complete.

**Milestone v1.1 — Add Lachlan MacDonald:** Expand the single-page site to feature Lachlan MacDonald as a second mentor positioned below Allan. Two phases: image pipeline + component scaffolding, then full section integration + nav anchors.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design system, project scaffolding, navigation, and responsive framework
- [x] **Phase 2: Home Page** - Bold hero, problem/solution, FAQ, and first email form
- [x] **Phase 3: About Page + Brand Refresh** - Founder story, philosophy, email capture, and full visual + content overhaul
- [x] **Phase 4: Courses + Email Integration** - Resend API integration and form states across all pages (completed outside GSD, 0560d37)
- [x] **Phase 5: Animation + Polish** - Motion One scroll animations, Lenis smooth scroll, kinetic typography (completed outside GSD, 6babaf6)
- [x] **Phase 6: Lachlan Image Pipeline + MentorIntro Component** - Move raw JPGs out of public/, extend optimize-images.mjs for Lachlan, build reusable MentorIntro component (completed 2026-04-24)
- [ ] **Phase 7: Lachlan Section Integration + Navigation Anchors** - Insert full Lachlan section into index.astro between Allan and Companies, add Allan/Lachlan/FAQ anchor links to header

## Phase Details

### Phase 1: Foundation
**Goal**: The site has a complete visual identity system, responsive navigation shell, and reusable component library -- all pages can be built on top of this without rework
**Depends on**: Nothing (first phase)
**Requirements**: DESIGN-01, DESIGN-02, DESIGN-03, NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. Visitor sees a dark, bold site with consistent colors, typography, and spacing across all page shells (not pure black -- dark navy/gray base with proper contrast)
  2. Visitor can navigate between Home, About, and Courses pages using the site header navigation
  3. On mobile, visitor can open a hamburger menu and navigate between all pages
  4. Site layout adapts correctly from mobile (375px) through tablet (768px) to desktop (1400px+) with no broken layouts
  5. Shared components (header, footer, buttons, cards, form inputs) exist and render consistently across all page shells
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Astro project scaffolding with Tailwind CSS 4.x and design token system
- [x] 01-02-PLAN.md -- Shared component library (Header, Footer, Button, Card, SectionWrapper, FormInput) with responsive navigation
- [x] 01-03-PLAN.md -- Three page shells with layout integration and responsive verification

### Phase 2: Home Page
**Goal**: A visitor landing on the home page immediately understands what Elevateo Co offers, sees credibility signals, gets objections addressed, and has a clear path to sign up
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04
**Success Criteria** (what must be TRUE):
  1. Visitor sees a bold hero section with a specific headline addressing scaling past $1M, a subheadline, and a prominent CTA button
  2. Visitor scrolls to a problem/solution section that names specific business scaling bottlenecks and positions Elevateo as the answer
  3. Visitor can read an FAQ section that addresses common objections about business coaching and education
  4. Visitor can enter their email in a signup form on the home page (form submits and provides feedback)
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md -- AccordionItem component, hero section, problem/solution sections (top half of page)
- [x] 02-02-PLAN.md -- FAQ accordion section, email signup form with client-side feedback (bottom half of page)

### Phase 3: About Page + Brand Refresh
**Goal**: A visitor navigating to the About page learns Alan Chan's story, understands what makes his approach different, and can sign up for updates. Additionally, all pages updated with new brand assets, warm charcoal palette, and personal voice.
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03
**Success Criteria** (what must be TRUE):
  1. Visitor reads a founder story arc that follows the pattern: "I was where you are" -> "I figured out X" -> "Now I help others do the same"
  2. Visitor reads a philosophy section that explains what makes Alan's approach different
  3. Visitor can enter their email in a signup form on the about page
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md -- FormInput type fix, founder story restructured to three-beat arc (empathy, transformation, mission)
- [x] 03-02-PLAN.md -- Philosophy section bg-navy-950 background, email signup form (superseded by brand refresh)

### Phase 4: Courses + Email Integration
**Goal**: All email forms across the site submit to Kit with proper success/error handling and the subscriber appears in Kit
**Depends on**: Phase 3
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03
**Note**: Course grid layout (COURSE-01, COURSE-02) completed during Phase 3 brand refresh — 6 digital marketing courses with icons, "How It Works" section, and banner.
**Success Criteria** (what must be TRUE):
  1. All email signup forms across the site (home, about, courses) submit to Kit (ConvertKit) and the subscriber appears in Kit
  2. Visitor sees a clear success message after submitting their email, or a clear error message if submission fails
  3. Email forms use a single email field with no page redirect -- submission happens inline via Kit API
**Plans**: TBD

Plans:
- [x] 04-01: Resend API integration with custom fetch, success/error states — completed outside GSD (0560d37)
- [x] 04-02: End-to-end email capture verified — single index.astro with /api/subscribe route

### Phase 5: Animation + Polish
**Goal**: The site feels premium with smooth scroll-driven animations, loads fast, and is ready for real traffic
**Depends on**: Phase 4
**Requirements**: DESIGN-04
**Success Criteria** (what must be TRUE):
  1. Sections across all pages fade in or animate on scroll using GSAP ScrollTrigger -- the site feels dynamic, not static
  2. Animations are smooth (no jank) and do not trigger on mobile if they hurt performance
  3. All pages load in under 3 seconds on a standard connection and score 90+ on Lighthouse performance
**Plans**: TBD

Plans:
- [x] 05-01: Motion One scroll animations + Lenis smooth scroll + SplitType kinetic typography — completed outside GSD (235cf58, 6babaf6)
- [x] 05-02: Performance via sharp image optimization (78-91KB per page payload) — completed outside GSD

### Phase 6: Lachlan Image Pipeline + MentorIntro Component
**Goal**: Lachlan's raw photos are moved out of the deploy bundle and optimized to WebP, and a reusable MentorIntro component exists ready to be slotted into the page — unblocking Phase 7 integration without any layout or content work yet
**Depends on**: Phase 5
**Requirements**: MENTOR-08
**Success Criteria** (what must be TRUE):
  1. Raw Lachlan JPGs no longer ship in `public/` — they live in `_zip_temp/Lachlan/` (kept out of the Astro build output)
  2. `scripts/optimize-images.mjs` has a `processLachlan()` step that produces an optimized WebP of Lachlan's portrait sized between ~150-300 KB at the site's existing quality bar
  3. The optimized Lachlan WebP exists on disk in the site's image output directory and renders without distortion in a standalone test (dimensions, aspect ratio, colour fidelity match source)
  4. A new `src/components/MentorIntro.astro` exists — props-driven (name, credentials, image, CTA target, flip direction), reusing `SectionWrapper` and the site's data-attribute animation system — and can be rendered in isolation without breaking the page
**Plans**: TBD
**UI hint**: yes

### Phase 7: Lachlan Section Integration + Navigation Anchors
**Goal**: A visitor to the live site sees Allan at the top as the primary mentor, scrolls to a clearly-separated Lachlan section (flipped split-grid, credentials, specialty cards, "who he works with", CTA), and can jump directly to Allan / Lachlan / FAQ via anchor links in the site header
**Depends on**: Phase 6
**Requirements**: MENTOR-01, MENTOR-02, MENTOR-03, MENTOR-04, MENTOR-05, MENTOR-06, MENTOR-07, NAV-04
**Success Criteria** (what must be TRUE):
  1. Visitor scrolling past Allan's About section sees a clear visual section divider / transition, then lands on Lachlan's bio in a split-grid layout with the photo on the LEFT and text on the RIGHT (flipped from Allan's layout)
  2. Visitor reads Lachlan's bio and learns his specific credentials (co-founder of Bellum Advisors, CEO of boltloop.co, scaled solo agencies) along with a subtle reference to his fighting / physical discipline background — no heavy-handed gym-bro framing
  3. Visitor sees three specialty cards covering solo agency scaling, co-founder work, and AI/automation, plus a "Who Lachlan works with" block that lets them self-identify as a fit (or not)
  4. Visitor can click a CTA button on Lachlan's section and is routed to Allan's Calendly link (documented placeholder until Lachlan's own booking link is provided)
  5. Visitor using the site header can click "Allan", "Lachlan", or "FAQ" and the page smoothly scrolls to the corresponding section via `#allan`, `#lachlan`, `#faq` anchors — on both desktop and mobile nav
**Plans**: 2 plans
**UI hint**: yes

Plans:
- [x] 07-01-PLAN.md — Enable Lenis anchor navigation, add Allan/Lachlan/FAQ header nav links, add id="allan" + id="faq" section anchors (NAV-04)
- [ ] 07-02-PLAN.md — Insert Lachlan MentorIntro section with locked-copy bio + 3 specialty cards + audience block + Calendly CTA + hair-line divider (MENTOR-01..07)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-02-11 |
| 2. Home Page | 2/2 | Complete | 2026-02-11 |
| 3. About Page + Brand Refresh | 2/2 | Complete | 2026-02-12 |
| 4. Courses + Email Integration | 2/2 | Complete | 2026-04-23 (backfilled) |
| 5. Animation + Polish | 2/2 | Complete | 2026-04-23 (backfilled) |
| 6. Lachlan Image Pipeline + MentorIntro Component | 2/2 | Complete | 2026-04-24 |
| 7. Lachlan Section Integration + Navigation Anchors | 1/2 | In progress | - |
