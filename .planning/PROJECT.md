# Elevateo Co / Mentorship Ltd

## What This Is

A single-page cinematic site for Mentorship Ltd, positioning Allan Chan and Lachlan MacDonald as dual business mentors. Dark charcoal/gold aesthetics, Motion One scroll animations, Lenis smooth scroll, and Resend email integration. Visitors scroll through Allan's section (primary mentor) then Lachlan's section (co-mentor), with anchor nav links in the header for direct jumps. Site captures leads via email signup and routes visitors to book calls via Calendly.

## Core Value

Established business owners land on the site, immediately see Mentorship Ltd as a credible authority on scaling, and sign up to stay connected — or book a call directly.

## Requirements

### Validated

- ✓ Dark bold design system (charcoal palette, gold accent, Inter Variable, design tokens) — v1.0
- ✓ Reusable component library (Header, Footer, Button, Card, SectionWrapper, FormInput) — v1.0
- ✓ Responsive navigation — desktop + mobile hamburger menu — v1.0
- ✓ Home page — bold hero, problem/solution, FAQ, email signup — v1.0
- ✓ About page — Alan Chan founder story, philosophy section, email signup — v1.0
- ✓ Courses page — 6 digital marketing courses grid with "Coming Soon" badges, email signup — v1.0
- ✓ Email capture via Resend API — inline success/error states, no page redirect — v1.0
- ✓ Motion One scroll animations + Lenis smooth scroll + SplitType kinetic typography — v1.0
- ✓ Sharp image optimization — per-page payload 78-91 KB — v1.0
- ✓ Lachlan image pipeline — EXIF auto-rotate in shared toWebp(), optimized WebPs (portrait 160.2 KB) — v1.1
- ✓ MentorIntro.astro component — props-driven, split-grid bio, specialty cards, audience list, Motion One integration — v1.1
- ✓ Lachlan section live — bio, 3 specialty cards, "Who he works with" block, Calendly CTA — v1.1
- ✓ Anchor navigation — header links #allan / #lachlan / #faq with Lenis -72px offset for fixed header — v1.1

### Active

(None — site is fully shipped as of v1.1. Next milestone requirements to be defined via `/gsd:new-milestone`.)

### Out of Scope

- Video course content / hosting — content doesn't exist yet, structure only
- E-commerce / payments — no paid products at launch
- User accounts / login — not needed until courses are live
- Blog / content marketing — not part of v1, adds maintenance burden
- Live workshop / events page — deferred, not in initial scope
- CRM / email automation — just capture emails, automation handled externally
- Chatbot / live chat — premature for a site with no traffic yet
- Social media feed integration — adds third-party dependencies and clutter

## Context

- **Stack:** Astro 5.x + Tailwind CSS 4.x (CSS-first, no tailwind.config.js) + Motion One + Lenis + SplitType + Resend + Cloudflare Pages
- **Design:** Warm charcoal (#101010) base, gold accent (#C9A132), Inter Variable, warm gray text palette
- **Site shape:** Single-page (`index.astro`) — Allan section → Lachlan section → Companies → FAQ → Email signup
- **Images:** Sharp pipeline produces WebPs per-person in `public/images/{person}/`; source assets in gitignored `_zip_temp/`
- **Email:** Resend API via `/api/subscribe` Astro endpoint; subscribers go to Resend list
- **Target audience:** Established business owners generating revenue, looking to scale past $500k-$1M+
- **Known stub:** Lachlan's Calendly URL is a placeholder (currently Allan's link) — swap when Lachlan provides his booking link

## Constraints

- **Content:** No video courses exist yet — course page needs placeholder structure that looks intentional, not empty
- **Design:** Must match dark & bold aesthetic similar to acquisition.com — this is non-negotiable for brand positioning
- **Single page:** Site pivoted from multi-page to single-page cinematic layout — all content in `index.astro`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark & bold design over clean/minimal | Matches authority positioning and acquisition.com inspiration | ✓ Good |
| Hybrid brand (company + founder) | Elevateo Co as entity, Alan Chan as the face — balances personal trust with company scale | ✓ Good |
| Full structure at launch (not just landing page) | Site needs to look established and ready even before courses drop | ✓ Good |
| Email signup over lead magnet | Simpler to launch, captures interest without needing to create a free resource first | ✓ Good |
| CSS-first Tailwind v4 with @theme directive | No tailwind.config.js — all design tokens in CSS | ✓ Good |
| Single-page layout (pivoted from multi-page) | Cinematic scroll experience suits the mentor-authority positioning | ✓ Good |
| Props-driven MentorIntro.astro (not slots) | Typed props make content diffs readable and component reusable for any future mentor | ✓ Good |
| DOM-ordered flip pattern (not flex-row-reverse) | Avoids screen-reader reorder issues; two conditional blocks are explicit | ✓ Good |
| Lenis anchors: { offset: -72 } (negative) | Compensates for 72px fixed header — section top lands below header on smooth-scroll | ✓ Good |
| Lachlan CTA → Allan's Calendly as placeholder | Unblocks launch; tracked in STATE.md pending todos for swap when Lachlan provides link | — Pending swap |
| boltloop.co framed as "a division of Elevateo Co" | Resolves double-claim conflict against Companies section | ✓ Good |
| EXIF fix in shared toWebp() (not processLachlan only) | All future iPhone-sourced photos auto-orient — backward-compatible no-op on PNGs | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-26 after v1.1 milestone*
