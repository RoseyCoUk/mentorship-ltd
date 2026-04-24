# Feature Landscape — Second Mentor (Lachlan MacDonald)

**Domain:** Dual-mentor personal brand / coaching site (single-page Astro)
**Milestone:** Adding Lachlan MacDonald as secondary mentor below primary (Allan Chan)
**Researched:** 2026-04-23
**Scope:** New mentor section within existing single-page site — not a rebuild

---

## Context Anchors (from existing site)

The existing Allan section already establishes these reusable blocks in `src/pages/index.astro`:

| Existing Pattern | Location | Reusable For Lachlan? |
|------------------|----------|------------------------|
| Hero with background image + eyebrow + stagger-words H1 + body + CTA | `~L35-92` | **No** — Allan keeps the hero. Lachlan gets a scaled-down intro block. |
| Authority metrics bar (4 stats, divided columns) | `~L95-106` | **Yes** — Lachlan can have his own 3-4 stat strip (different metric dimensions). |
| About/Story split grid (`lg:col-span-5` copy / `lg:col-span-7` image with parallax) | `~L109-153` | **Yes — primary reuse candidate.** Same block, image flipped to opposite side for visual rhythm. |
| "Companies I've Built" 4-card logo grid | `~L156-215` | **Partial** — Boltloop already lives in Allan's portfolio. Don't duplicate; surface as Lachlan's role chip. |
| Bento grid of services (6 icon cards with image bg) | `~L218-260` | **Yes** — Lachlan gets 3-6 focus cards with distinct angle (scaled solo agencies / co-founder ops / performance & discipline). |
| Results/outcomes cards | `~L263-289` | **Yes, optional** — only if Lachlan has verifiable client numbers. Do NOT fabricate. |
| "Why Work With Me" guarantee block + CTA | `~L292-329` | **Yes** — mirror structure with Lachlan's voice. |
| FAQ accordion | `~L332-357` | **Shared** — extend existing FAQ with 1-2 Lachlan entries. Do NOT create a second FAQ. |
| Email signup (Resend) | `~L360-390` | **Shared** — one list, not split. |

Design tokens to preserve: warm charcoal `#101010`, gold `#C9A132` accent, glassmorphism, `data-motion="blur-reveal"`, `data-motion="stagger-words"`, `slow-zoom` keyframe, parallax via `data-parallax`.

Assets available: `public/Lachlan Pictures/Portrait.JPG`, `public/Lachlan Pictures/Picture_with_War_Room_members.JPG`.

---

## Table Stakes (Must-Have)

Missing any of these makes the second mentor feel tacked-on or confusing.

| Feature | Why Expected | Complexity | Dependencies | Notes |
|---------|--------------|------------|--------------|-------|
| **Lachlan profile section with portrait + name + role** | Basic identity — visitors need a face and a one-line "who is this person" within 2 seconds | Low | Reuses About split-grid pattern (L109-153). Uses `Portrait.JPG` | Lives on the single page (anchor: `#lachlan`). Position: AFTER Allan's Why/Guarantee section, BEFORE FAQ. |
| **Clear differentiator headline** | Visitor must instantly know WHY Lachlan exists alongside Allan. "Two mentors doing the same thing" is the #1 dual-coach anti-pattern. | Low | Copy only | Recommended: lead with scaled solo agencies / co-founder angle. E.g., "Scale Your Agency Without Burning Out." |
| **Short narrative bio (2-3 paragraphs)** | About content is typically the 2nd-most-read section. Story beats resume for building trust. | Low | Copy + 1 image | Mirror Allan's structure: origin moment → approach → italic pull-quote. Keep shorter than Allan's (he is primary). |
| **Explicit positioning vs Allan** | Dual-mentor sites fail when visitors can't tell who to book. Must answer "who do I talk to?" | Low | Copy in bio or FAQ | Either inline callout ("Work with Allan if X. Work with Lachlan if Y.") OR a dedicated FAQ entry. **Pick one, not both.** |
| **Lachlan-specific CTA / booking link** | Each mentor needs their own conversion path. A shared CTA forces a disambiguation step that kills conversion. | Low | Requires Lachlan's Calendly URL (hard blocker) | Button style identical to Allan's. Href differs. Opens in new tab per existing pattern. |
| **Lachlan's focus areas / what he helps with** | Answers "what does he actually do" — equivalent to Allan's Bento grid but scoped to his angles | Medium | 3-6 service items + icons | Reuse existing icons (`/images/icons/*.webp`) where they map; add new icons only if angle is unique (e.g., martial arts/discipline). Card count <= Allan's 6 so he doesn't visually outweigh primary. |
| **Visual hierarchy that signals "secondary"** | Allan must stay dominant. Research on primary/secondary hierarchy: visual weight must be clearly differentiated. | Medium | CSS only | Smaller section height, no full-viewport hero, intro strip rather than hero, smaller H2 scale. Do NOT give Lachlan a 95vh hero. |
| **Section divider / transition between mentors** | Without a clear break, visitors read two bios as one. Dual-founder sites use explicit "Meet [Name]" intro strips. | Low | CSS + 1 copy line | Recommended: gold horizontal rule + eyebrow ("The Second Mentor" / "Also Working With You") + H2 "Meet Lachlan". Matches existing eyebrow pattern (`text-gold font-bold text-xs tracking-[0.2em] uppercase`). |
| **Anchor navigation (stable IDs)** | Single-page sites with multiple profiles need anchors so people can share/link directly to each mentor. | Low | Add `id` attributes to sections | Add `id="allan"` on Allan's about section and `id="lachlan"` on Lachlan's. No top-nav change required in v1 — just stable anchors. |

---

## Differentiators (Nice-to-Have, Boost Perceived Quality)

These separate a polished dual-mentor site from a tacked-on second bio.

| Feature | Value Proposition | Complexity | Dependencies | Notes |
|---------|-------------------|------------|--------------|-------|
| **"Who should you work with?" decision block** | Removes the #1 friction in dual-coach sites — visitor paralysis. A 2-column "Work with Allan if… / Work with Lachlan if…" converts better than inline paragraphs. | Low-Medium | Copy + layout; sits between the two mentor sections OR inside FAQ | Highest-ROI differentiator. Surfaces repeatedly in dual-coach conversion research. |
| **Lachlan's distinct personality hook** | Agency-bio research: lean into personality. Here: martial arts/fighting, physical health, AI operator energy. Avoids "two men in suits" interchangeability. | Low | Copy + `Picture_with_War_Room_members.JPG` as secondary image | Unapologetic angle: e.g., "Most mentors talk discipline. Lachlan spars at 6am." Pairs physical edge with operator credibility. |
| **Complementary stats strip** | If Lachlan gets his own 3-4 stat bar, parallel structure is preserved without cloning numbers | Low | Reuses metrics bar CSS (L95-106) | Metrics MUST be different dimensions from Allan's (e.g., "Solo-to-scaled agencies mentored", "Co-founder teams backed", "AI systems deployed"). |
| **Cross-link / handoff callouts** | "Need deep AI automation or operator-level systems? Lachlan runs point." inside Allan's section, and reverse. Signals partnership, not competition. | Low | Copy only | One line, one direction each. 2 total cross-mentions max site-wide — more than that is clutter. |
| **Distinct photography treatment** | Allan uses networking event photo (warm, social). Lachlan's "War Room" photo leans leadership/intensity. Different emotional register = differentiated brand. | Low | Use `Portrait.JPG` for primary Lachlan image, `War_Room_members.JPG` for secondary. Apply same `rounded-2xl` + gradient overlay as Allan's (L139-148) for cohesion. Consider grayscale/luminosity blend (like Why section L294-299) for mood contrast. | |
| **Role/title chip** | Small "CEO, Boltloop" chip under Lachlan's name establishes authority without a long bio. Creates a credibility bridge to Allan's portfolio (Boltloop already listed there). | Low | Copy + a small `Card`/chip variant | Reinforces Lachlan has his own company; implicitly ties back to Allan's empire. |
| **Shared testimonial treatment (if any name Lachlan)** | If a testimonial mentions Lachlan specifically, tag it. Keeps social proof honest. | Low | Content-dependent | Skip if no real testimonials name him. Do not invent. |
| **Cohesive scroll rhythm / page reorder** | Current order: Allan hero → Allan metrics → Allan about → portfolio → services → results → why → FAQ → signup. Lachlan insertion requires: … Allan why → **Lachlan intro → Lachlan story → Lachlan services → (optional) Lachlan why** → FAQ → signup. | Medium | Page reorder in `index.astro` | Biggest architectural change. Requires careful scroll-rhythm review so the site doesn't feel like two sites stapled together. |
| **Joint unified CTA at end** | After separate mentor sections, a "Not sure who to book? Start here." block can route via Calendly Routing or a simple form. | Medium | Calendly Routing config OR a `<select>` → link | Only worth building if analytics show bounce at the two-CTA point. Skip for v1. |
| **Mobile collapse / prioritization** | On mobile, a long Lachlan section can push FAQ off-screen, hurting drop-off. A "Meet Lachlan ↓" expandable summary can help. | Medium | JS toggle + CSS | Only if drop-off is proven. Not MVP. |

---

## Anti-Features (Explicitly Do NOT Build)

From dual-coach-site failure research and the existing design system's constraints.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|---------------------|
| **Separate `/lachlan` page** | Breaks the single-page Astro pattern. Fragments SEO (the domain's primary page is Allan). Extra route, extra layout, harder to keep design cohesion. Research favors single-page anchors for personal brands. | Keep Lachlan as an on-page section with `#lachlan` anchor. |
| **Equal-weight dual hero (50/50 split-screen at top)** | Confuses positioning — brief explicitly says Allan stays primary. Split hero signals co-equal partnership and breaks the narrative. Also kills Allan's existing strong hero. | Keep Allan's full hero unchanged. Introduce Lachlan mid-page with a scaled-down intro. |
| **Generic "Meet the Team" grid of 2** | Two-person grids feel thin and corporate. The site tone is cinematic editorial, not SaaS team page. | Editorial dual-bio sections with distinct imagery per mentor. |
| **Duplicate FAQ for Lachlan** | Doubles maintenance. Confuses visitors. "Cluttered sections" is the #1 flagged coaching-site mistake in research. | Extend existing FAQ with 1-2 shared entries (who to book, do they work together). |
| **Duplicate email signup / second list** | Splits the audience. Resend infrastructure is already shared. One list. | Single signup; mention both mentors in the list description if relevant. |
| **Duplicate "Companies I've Built" block for Lachlan** | Boltloop is already in Allan's portfolio. Relisting it under Lachlan reads as padding and weakens per-mention credibility. | Reference Boltloop inline in Lachlan's role chip ("CEO, Boltloop — AI automation division of Elevateo"). |
| **Symmetric stat strips with identical metrics** | "$1M+ Revenue / 10+ Businesses" for both = reads as fabricated parallelism. | Different metric dimensions for Lachlan; OR skip stats if none are verifiable. |
| **Calendly Round Robin across both mentors** | Research surfaces this as a common dual-coach pattern, but the brief says each mentor has a distinct angle. Round Robin sends prospects to whoever is free, defeating specialization. | Two separate direct Calendly links, each on its own mentor's CTA. |
| **Quote-heavy bio (famous historical quotes)** | Research anti-pattern: "Using famous quotes throughout your website positions someone else as the expert on your own site." | Pull-quotes from Lachlan himself, matching Allan's italic `font-heading` pattern (L131). |
| **Top-nav link to Lachlan before structure is validated** | Adding a "Meet Lachlan" nav item on a currently-nav-less Header is scope creep. | Rely on anchors first. Add a minimal nav (Allan / Lachlan / Book) only if the section proves hard to find. |
| **Third-mentor placeholder / "more coming soon"** | Scope creep. Weakens the current two-mentor proposition. | Build for two now. Architect section so an array-driven mentor component COULD extend later, but ship exactly two. |
| **Full-bleed Lachlan hero competing with Allan's** | Breaks hierarchy. Allan = primary. | Lachlan gets a secondary-tier intro (no `95vh`, no scroll indicator, no stagger-words H1). |
| **Cute labels like "The Dynamic Duo" / "The Mentors Squad"** | Cheapens the cinematic premium tone. | Factual eyebrow language: "The Second Mentor", "Also Working With You", "Meet Lachlan". |
| **Fabricated testimonials or stats for Lachlan** | Asymmetric credibility vs Allan's real numbers damages trust if scrutinized. | Ship without results/testimonials for Lachlan in v1. Add in v2/v3 as real data arrives. |

---

## Feature Dependencies

```
Lachlan portrait + name + role
  └─► Lachlan narrative bio
       └─► Lachlan focus areas (services)
            └─► Lachlan CTA  [needs Calendly URL from client]

Section divider ("Meet Lachlan" eyebrow + H2)
  └─► Anchor IDs (#allan, #lachlan)
       └─► (optional) Top-nav additions

"Who to work with?" decision block
  ├─► Depends on: clear differentiator headlines for BOTH mentors
  └─► Depends on: Lachlan CTA live

Cross-link / handoff callouts
  └─► Depends on: both mentor sections in place

Joint end-of-page routing CTA
  └─► Depends on: Calendly Routing setup OR equivalent UX
```

**Hard blockers (cannot ship without):**
1. Lachlan's Calendly URL (or explicit fallback — e.g., "email [address]")
2. Final positioning copy that distinguishes his angle from Allan's
3. Role/title confirmation (presumed "CEO, Boltloop" — verify with client)

**Soft blockers (can ship with placeholders):**
- Additional photography beyond the 2 existing files (if Why/Results variants are wanted)
- Lachlan-specific stats (can launch without a stats bar)
- Testimonials (skip unless real data exists)

---

## MVP Recommendation

Ship v1 before attempting any differentiator.

### v1 — Minimum Coherent Dual-Mentor (Table Stakes Only)
1. Section divider with eyebrow + H2 "Meet Lachlan" immediately after Allan's Why block
2. Lachlan bio split-grid (portrait + 2-3 paragraph narrative + italic pull-quote) — reuses About pattern
3. Differentiator headline scoped to scaled-solo-agency / co-founder / performance angle — **client to confirm final copy**
4. Focus areas — 3 cards (Scaled Solo Agencies / Co-Founder Operations / Performance & Discipline)
5. Role chip: "CEO, Boltloop"
6. Lachlan-specific CTA with his Calendly link
7. Anchor IDs: `id="allan"` on Allan's about section, `id="lachlan"` on Lachlan's intro

### v2 — Positioning Polish (1-2 differentiators)
8. "Who should you work with?" 2-column decision block between the two mentor sections
9. Extend FAQ with 2 new entries (who to book, how Allan and Lachlan work together)
10. One cross-link callout in each mentor's section

### v3 — Optional Authority Depth (only if content exists)
11. Lachlan stats strip (only with verifiable numbers)
12. Lachlan "Why Work With Me" block (only with distinct angle from Allan's)
13. Distinct secondary photography treatment (War Room photo, grayscale luminosity à la Why section)

### Defer / Skip Unless Proven Need
- Joint routing CTA
- Top nav restructure
- Mobile-specific collapse
- Lachlan testimonials / results cards (skip unless real data)

---

## Downstream Notes for Requirements Agent

- **Every feature above is labeled:** category (Table Stakes / Differentiator / Anti-Feature), complexity (Low / Medium / High), dependencies.
- **Existing pattern reuse is explicit** — most Lachlan features are structural clones of Allan's blocks, not new components. Low technical risk.
- **Hard blockers list** surfaces what client input is required before build can start.
- **MVP sequencing** (v1 → v2 → v3) lets requirements break this into phases if the roadmap prefers incremental delivery.
- **Content gaps** flagged as inputs needed: Lachlan's Calendly URL, exact title, verifiable stats, any testimonials.
- **No new dependencies** — no new libraries, no new page routes, no Supabase/auth work. Pure content + existing-component composition in `src/pages/index.astro`.

---

## Sources

- [12 Inspiring Coaching Websites to Model in 2026 — Elementor](https://elementor.com/blog/inspiring-coaching-websites-to-model/)
- [23 Best Coaching Websites 2026 — EntrepreneursHQ](https://entrepreneurshq.com/coaching-websites/)
- [Coaches Websites: 30+ Inspiring Examples (2026) — Sitebuilder Report](https://www.sitebuilderreport.com/inspiration/coaching-websites)
- [Top 10 Coaching Website Mistakes to Avoid — Coaching Sites That Work](https://coachingsitesthatwork.com/10-coaching-website-mistakes/)
- [11 Website Mistakes Coaches Make — The Fully Booked Coach](https://thefullybookedcoach.com/website-mistakes-coaches-make/)
- [30 Best Meet the Team Pages Examples — Amasty](https://amasty.com/blog/30-best-meet-the-team-pages-examples-and-trends/)
- [The 15 best "Meet the Team" pages — HubSpot](https://blog.hubspot.com/marketing/creative-agency-team-pages)
- [13 Most Creative Agency Meet the Team Pages — Medium](https://medium.com/@gaspfourdigital/13-of-the-most-creative-agency-meet-the-team-pages-we-ve-ever-seen-97d193a3195b)
- [Primary vs. Secondary Navigation — LogRocket](https://blog.logrocket.com/ux-design/secondary-navigation-best-practices/)
- [Using One Calendly Link for Multiple Coaches — Calendly Community](https://community.calendly.com/how-do-i-40/using-one-calendly-link-for-multiple-coaches-availability-4675)
- [Best practices for sharing your Calendly link — Calendly](https://calendly.com/blog/share-scheduling-link)
- [Building a Strong Coaching Brand — ICF](https://coachingfederation.org/blog/building-a-strong-coaching-brand-6-essential-elements-for-success/)

**Confidence:** MEDIUM-HIGH. Dual-mentor positioning patterns are well-established in design/coaching literature and reinforced by HubSpot, Smashing Magazine, and ICF guidance. Main uncertainty is Lachlan-specific content (exact title, Calendly URL, verifiable stats) — flagged as hard blockers for build, not for research conclusions.
