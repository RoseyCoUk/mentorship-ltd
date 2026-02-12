# Roadmap: Elevateo

## Overview

Elevateo launches as Alan Chan's personal brand site for digital marketing education — 3 pages (Home, About, Courses) with dark charcoal/gold aesthetics and email lead capture. A brand refresh in Phase 3 overhauled all visuals with new assets (logos, icons, heroes, banners), shifted the color palette from cold navy to warm charcoal, and rewrote all content in Alan's personal voice. Remaining work: Kit email integration and scroll animations.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design system, project scaffolding, navigation, and responsive framework
- [x] **Phase 2: Home Page** - Bold hero, problem/solution, FAQ, and first email form
- [x] **Phase 3: About Page + Brand Refresh** - Founder story, philosophy, email capture, and full visual + content overhaul
- [ ] **Phase 4: Courses + Email Integration** - Kit API integration and form states across all pages
- [ ] **Phase 5: Animation + Polish** - GSAP scroll animations, performance tuning, and final QA

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
- [ ] 04-01: Kit API integration with custom fetch, success/error states across all pages
- [ ] 04-02: End-to-end email capture testing and cross-page verification

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
- [ ] 05-01: GSAP ScrollTrigger animations across all pages
- [ ] 05-02: Performance audit and optimization pass

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-02-11 |
| 2. Home Page | 2/2 | Complete | 2026-02-11 |
| 3. About Page + Brand Refresh | 2/2 | Complete | 2026-02-12 |
| 4. Courses + Email Integration | 0/2 | Not started | - |
| 5. Animation + Polish | 0/2 | Not started | - |
