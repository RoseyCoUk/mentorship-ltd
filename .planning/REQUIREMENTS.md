# Requirements: Elevateo Co

**Defined:** 2026-02-11
**Core Value:** Established business owners land on the site, immediately see Elevateo Co as a credible authority on scaling, and sign up to stay connected.

## v1 Requirements

### Home Page

- [ ] **HOME-01**: Bold hero section with large headline, subheadline, and primary CTA button
- [ ] **HOME-02**: Problem/Solution section addressing business owner pain points and positioning Elevateo as the solution
- [ ] **HOME-03**: FAQ section addressing common objections and building trust
- [ ] **HOME-04**: Email signup form integrated into the home page

### About Page

- [ ] **ABOUT-01**: Founder story arc -- Alan Chan's origin, transformation, and mission narrative
- [ ] **ABOUT-02**: Philosophy section explaining what makes Elevateo's approach different
- [ ] **ABOUT-03**: Email signup form on the about page

### Courses Page

- [ ] **COURSE-01**: Grid layout of course card placeholders with titles and "Coming Soon" badges
- [ ] **COURSE-02**: Email signup for course launch notifications

### Email Capture

- [ ] **EMAIL-01**: Newsletter-style email signup form ("Get notified when courses launch")
- [ ] **EMAIL-02**: Email capture integrated with Kit (ConvertKit) for subscriber management
- [ ] **EMAIL-03**: Success/error states for form submission

### Design System

- [ ] **DESIGN-01**: Dark bold color palette with design tokens (dark navy base, not pure black)
- [ ] **DESIGN-02**: Typography scale with bold, authoritative font choices
- [ ] **DESIGN-03**: Reusable component library (header, footer, buttons, cards, forms)
- [ ] **DESIGN-04**: GSAP scroll animations (fade-ins, parallax effects)

### Responsive & Navigation

- [ ] **NAV-01**: Site-wide navigation between Home, About, and Courses pages
- [ ] **NAV-02**: Mobile-responsive layout across all devices
- [ ] **NAV-03**: Mobile hamburger menu navigation

## v2 Requirements

### Authority & Social Proof

- **AUTH-01**: Authority metrics displayed as large visual callouts (revenue, results numbers)
- **AUTH-02**: Credentials timeline of achievements and verifiable metrics
- **AUTH-03**: Media/social proof bar with logos of mentions, podcast appearances

### Lead Generation

- **LEAD-01**: Lead magnet PDF guide/checklist for higher email conversion
- **LEAD-02**: Dedicated lead magnet landing page

### SEO & Analytics

- **SEO-01**: SEO meta tags and Open Graph images for all pages
- **SEO-02**: Analytics tracking (GA4 or Plausible)
- **SEO-03**: Sitemap and robots.txt

## Out of Scope

| Feature | Reason |
|---------|--------|
| Video course content / hosting | Content doesn't exist yet, structure only |
| E-commerce / payments | No paid products at launch |
| User accounts / login | Not needed until courses are live |
| Blog / content marketing | Not part of v1, adds maintenance burden |
| Live workshop / events page | Deferred, not in initial scope |
| CRM / email automation | Just capture emails, automation handled externally |
| Chatbot / live chat | Premature for a site with no traffic yet |
| Social media feed integration | Adds third-party dependencies and clutter |

## v1.1 Requirements (Milestone: Add Lachlan MacDonald)

### Lachlan Mentor Section

- [ ] **MENTOR-01**: Visitor sees a clear visual break between Allan's content and Lachlan's section (section divider or design transition element)
- [ ] **MENTOR-02**: Visitor reads Lachlan's bio in a split-grid layout — photo left, text right (layout flipped from Allan's About section)
- [ ] **MENTOR-03**: Visitor learns Lachlan's credentials: co-founder of Bellum Advisors, CEO of boltloop.co, background scaling solo agencies
- [ ] **MENTOR-04**: Bio includes a subtle reference to Lachlan's physical discipline and fighting background as part of his character
- [ ] **MENTOR-05**: Visitor sees three specialty/focus cards highlighting Lachlan's core angles (solo agency scaling, co-founder work, AI/automation)
- [ ] **MENTOR-06**: Visitor can identify if Lachlan is the right mentor for them via a "Who Lachlan works with" block
- [ ] **MENTOR-07**: Visitor can book a call via a CTA button on Lachlan's section (routes to Allan's Calendly link as placeholder)
- [ ] **MENTOR-08**: Lachlan's portrait is processed to WebP (~150–300 KB) and renders consistently with the site's existing image quality

### Navigation

- [ ] **NAV-04**: Visitor can navigate directly to Allan's section, Lachlan's section, or the FAQ via anchor links in the site header

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DESIGN-01 | Phase 1: Foundation | Complete |
| DESIGN-02 | Phase 1: Foundation | Complete |
| DESIGN-03 | Phase 1: Foundation | Complete |
| NAV-01 | Phase 1: Foundation | Complete |
| NAV-02 | Phase 1: Foundation | Complete |
| NAV-03 | Phase 1: Foundation | Complete |
| HOME-01 | Phase 2: Home Page | Complete |
| HOME-02 | Phase 2: Home Page | Complete |
| HOME-03 | Phase 2: Home Page | Complete |
| HOME-04 | Phase 2: Home Page | Complete |
| ABOUT-01 | Phase 3: About Page | Complete |
| ABOUT-02 | Phase 3: About Page | Complete |
| ABOUT-03 | Phase 3: About Page | Complete |
| COURSE-01 | Phase 3: Brand Refresh | Complete |
| COURSE-02 | Phase 3: Brand Refresh | Complete |
| EMAIL-01 | Phase 4: Courses + Email Integration | Complete |
| EMAIL-02 | Phase 4: Courses + Email Integration | Complete |
| EMAIL-03 | Phase 4: Courses + Email Integration | Complete |
| DESIGN-04 | Phase 5: Animation + Polish | Complete |
| MENTOR-01 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-02 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-03 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-04 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-05 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-06 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-07 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |
| MENTOR-08 | Phase 6: Lachlan Image Pipeline + MentorIntro Component | Pending |
| NAV-04 | Phase 7: Lachlan Section Integration + Navigation Anchors | Pending |

**Coverage:**
- v1 requirements: 19 total — all Complete
- v1.1 requirements: 9 total — all mapped (MENTOR-08 → Phase 6; MENTOR-01..07 + NAV-04 → Phase 7)
- Mapped to phases: 9 / 9
- Unmapped: 0

---
*Requirements defined: 2026-02-11*
*Last updated: 2026-04-23 — v1.1 milestone requirements mapped to Phases 6 & 7*
