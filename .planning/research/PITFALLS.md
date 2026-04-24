# Domain Pitfalls: Adding Lachlan MacDonald as Second Mentor

**Domain:** Expanding a single-founder personal brand site to a two-mentor authority site
**Researched:** 2026-04-23
**Milestone:** v1.1 — Add Lachlan MacDonald
**Overall Confidence:** MEDIUM-HIGH (synthesized from web research + direct inspection of existing site + prior milestone research baseline)

**Context:** Mentorship Ltd — existing Astro 5 single-page site built around Allan Chan. Adding Lachlan MacDonald (CEO of boltloop.co, AI/automation specialist, solo agency scaler, fighter) as secondary mentor. Per milestone brief, Allan must remain primary authority at the top; Lachlan is positioned below as secondary.

> **Note:** This PITFALLS.md supersedes the prior (greenfield) milestone pitfalls for the scope of v1.1. The original critical pitfalls (Empty Authority Paradox, Dark Design Readability, Over-Engineering) are considered resolved/stable and do not need to be re-addressed in this milestone. The pitfalls below are specific to the "adding a second mentor" scope.

---

## Summary Table

| # | Pitfall | Category | Risk | Phase Target |
|---|---------|----------|------|--------------|
| 1 | The Identity Crisis | Brand Dilution | **HIGH** | Requirements |
| 2 | Authority Split / Primary Mentor Lost | Visual Hierarchy | **HIGH** | Phase 1 (Design) |
| 3 | Specialty Confusion (Scaling vs AI) | Positioning | **HIGH** | Requirements |
| 4 | Photo Quality Mismatch | Image / Visual | **HIGH** | Phase 0 (Content Prep) |
| 5 | Bolted-On Section Feel | Visual Design | **HIGH** | Phase 2 (Implementation) |
| 6 | Hero Says One Name, Page Has Two | Copy / Messaging | **HIGH** | Phase 1 |
| 7 | Navigation Becomes Team Directory | UX / Navigation | MEDIUM | Phase 2 |
| 8 | Dueling CTAs (Two Calendly Links) | Conversion | MEDIUM | Phase 2 |
| 9 | Copy Inconsistency Between Bios | Copy / Messaging | MEDIUM | Phase 2 |
| 10 | Lachlan Outshining Allan (Age/Energy Trap) | Visual Hierarchy | MEDIUM | Phase 1 |
| 11 | Mystery Meat Scroll Anchor | UX / Navigation | MEDIUM | Phase 2 |
| 12 | Metrics Bar Doesn't Account for Two Mentors | Authority / Copy | MEDIUM | Phase 1 |
| 13 | "Fighter" Angle Lowering Professional Tone | Copy / Messaging | MEDIUM | Phase 2 |
| 14 | Companies Section Redundancy (Boltloop card) | IA / Layout | LOW | Phase 2 |
| 15 | Testimonials Don't Name Which Mentor | Social Proof | LOW | Phase 3 |
| 16 | OG / Meta Tags Still Singular | SEO / Meta | LOW | Phase 3 |
| 17 | Two "Hey, I'm ___" H2s Break Hierarchy | Accessibility | LOW | Phase 2 |

---

## CRITICAL PITFALLS (Project-level risk to the milestone)

### Pitfall 1: The Identity Crisis — Is It a Personal Brand or an Agency?

**Category:** Brand Dilution
**Risk Level:** HIGH

**What goes wrong:**
The site currently reads as "Allan Chan's personal brand." Adding a second mentor without strategic positioning turns it into neither a personal brand (two people) nor a proper agency/firm (still positioned as individuals). Visitors hit the hero ("I Help Business Owners Scale") and then scroll to find a completely different person with a different specialty. The mental model breaks: "Who am I hiring — Allan, Lachlan, or Mentorship Ltd?"

**Why it happens:**
Founders add team members to a personal-brand site without first re-defining what the brand IS. When you go from one face to two, the brand-identity question ("what are we") must be answered BEFORE the design question ("where does the section go"). Skipping this step creates a brand that looks like a personal brand but behaves like an agency — a "jack of all trades" positioning problem that confuses sophisticated buyers.

**Consequences:**
- Trust collapse for $500K–$1M+ audience (already flagged in prior research as discerning and unforgiving)
- Sophisticated visitors pattern-match "this site has an identity crisis" and bounce
- Every subsequent decision (copy voice, CTA targeting, metrics) becomes ambiguous
- Competing with both solo mentors AND agencies, losing to both

**Prevention:**
Before any design work, the product owner must answer ONE question and encode the answer in REQUIREMENTS.md: **"Is Mentorship Ltd (a) Allan's brand with Lachlan as a featured specialist partner, (b) a two-mentor practice with Allan primary, or (c) a mentorship firm with two principals?"**

The research recommends **option (a)** given the existing site's first-person voice ("I help...") and the explicit milestone requirement that Allan must remain primary. Document the choice explicitly so every downstream decision reinforces it. Pitfalls 2, 6, 8, 10, 12 all depend on this being resolved.

**Detection:**
Read the full page draft aloud. If the voice switches from "I" to "we" to "Allan and Lachlan" in different sections without deliberate speaker transitions, the identity is unresolved.

---

### Pitfall 2: Authority Split — Primary Mentor Becomes Co-Equal

**Category:** Visual Hierarchy
**Risk Level:** HIGH

**What goes wrong:**
Even when the stated intent is "Allan primary, Lachlan secondary," visual parity creates narrative parity. Two mentor sections with identical card layouts, identical photo sizes, and identical heading weights read as "co-founders" regardless of scroll order. The milestone brief specifically requires Allan to retain primary authority — visual equality silently destroys that.

**Why it happens:**
Developers default to "symmetry = fairness" and reuse the existing About section component for Lachlan. Duplicating the `lg:col-span-5 / lg:col-span-7` grid, the `text-h2` heading, the same aspect ratio image, and the same spacing produces visual co-equality regardless of the order on the page.

**Consequences:**
- Allan's 8+ years / $1M+ / 10+ businesses authority is diluted by Lachlan (newer, different specialty)
- The existing metrics bar ("$1M+ Revenue Generated") becomes ambiguous — whose revenue?
- Hero promise ("I Help Business Owners Scale") is undercut when a second equal-weighted person appears mid-page with a different promise

**Prevention:**
Enforce DELIBERATE visual de-escalation for Lachlan's section:
- **Heading scale:** Allan uses `text-h2`, Lachlan uses `text-h3` or a smaller variant
- **Image treatment:** Allan gets the larger editorial image (current `col-span-7`); Lachlan gets a smaller portrait (e.g., `col-span-4` or a framed inset)
- **Eyebrow label:** Allan = "The Mentor"; Lachlan = "The Partner" / "Specialist Partner" — semantically subordinate, not "Co-Founder" or "Mentor 2"
- **Vertical space:** Allan section fills roughly 100vh of feel; Lachlan section noticeably more compact (60–70vh)
- **Copy length:** Allan gets 3 paragraphs, Lachlan gets 1–2 max
- **Section divider:** Include a transitional framing element ("Specialist Support" / "Beyond Strategy") between Allan and Lachlan so Lachlan is framed as an addition, not a replacement

**Detection:**
Squint test: blur the page and scroll. If you can tell which mentor is primary from the blurred layout alone, hierarchy works. If both sections look identically heavy, it doesn't.

---

### Pitfall 3: Specialty Confusion — Scaling vs AI Automation

**Category:** Positioning
**Risk Level:** HIGH

**What goes wrong:**
Allan's positioning is "scale past your current ceiling" — broad business mentorship (offers, sales, operations, team). Lachlan's positioning is AI/automation via boltloop.co — a specific tactical domain, and a DIFFERENT specialization. If both are presented as "mentors" without an explicit through-line, visitors cannot tell what they're buying. The site appears to offer both "business mentorship" AND "AI implementation" with no clear relationship between them.

This is the classic multi-specialty positioning problem: "The confusion from having multiple specialties is real, and it's costing you clients. The question isn't whether multi-niche coaching works; it's how you position it so clients understand what you offer without getting confused. Your positioning needs to create a through-line that connects your niches." (herincomeedit.com)

**Why it happens:**
The temptation is to let each mentor speak to their own specialty independently. This produces two disconnected value propositions on one page. The more compelling each individual pitch, the MORE confusing the combined message becomes.

**Consequences:**
- "Do I book Allan or Lachlan?" — decision paralysis kills conversion
- Visitors self-select wrong (book Allan for AI problems, book Lachlan for scaling problems)
- Implies "you need AI too, which Allan doesn't do," undermining Allan's authority
- Dilutes Lachlan by making AI specialty sound like a side-gig instead of a real capability

**Prevention:**
Define the **through-line** in REQUIREMENTS.md before writing any Lachlan copy. Three viable narratives in order of recommendation:

1. **Complementary tiers (RECOMMENDED):** "Allan mentors the business strategy, Lachlan implements the AI systems that execute it." Matches reality — boltloop is an Elevateo division.
2. **Sequential journey:** "Allan scales your business, then Lachlan helps you automate the bottlenecks as you grow."
3. **Audience split:** "Allan works with established owners ($500K+); Lachlan works with solo agency founders specifically." Uses Lachlan's solo-agency angle but narrows his market considerably.

Whichever narrative is chosen, the Lachlan section copy must explicitly state the relationship to Allan's work. The through-line should appear in the section eyebrow AND the opening paragraph. Do NOT let visitors infer the relationship.

**Detection:**
Show the draft to 3 people cold. Ask: "If you wanted help scaling your business, who would you book?" If any answer is "I'm not sure" or "I'd book Lachlan for some things and Allan for others without knowing which," positioning has failed.

**Sources:**
- [Positioning Your Coaching Business When You're A Jack Of All Trades (herincomeedit)](https://www.herincomeedit.com/post/positioning-your-coaching-business-when-you-re-a-jack-of-all-trades) — MEDIUM confidence, directly applicable

---

### Pitfall 4: Photo Quality Mismatch — Event Snapshots vs Editorial Hero

**Category:** Image / Visual Quality
**Risk Level:** HIGH

**What goes wrong:**
Allan's existing imagery (`hero-bg.webp`, `alan-networking-2x.webp`, `IMG_1081.webp`) is cinematic, color-graded, professionally staged. Lachlan's available assets (`public/Lachlan Pictures/Portrait.JPG`, `Picture_with_War_Room_members.JPG`) are event photography — warm ambient lighting, unstaged composition, social/party context. Direct inspection confirms: the Portrait shows Lachlan in a teal suit at what appears to be a gala/event with chandelier lighting; the group photo is with War Room members against an event backdrop. Neither matches the editorial style of Allan's assets.

Dropping Lachlan's raw event photos next to Allan's editorial shots produces jarring inconsistency that cheapens the entire site.

Research directly confirms the cost: "Inconsistent team headshots are one of the most common and expensive brand mistakes, with mismatched photos signaling a lack of attention to detail. Brands with inconsistent presentation need **1.75x more media spend** to achieve the same results." (m2mpics)

**Why it happens:**
The pictures already exist, they're "good enough," and there's pressure to ship the milestone without scheduling a photoshoot. The existing photos have the right person, wardrobe is acceptable (blue double-breasted suit), and warm gold tones technically align with the site's gold accent palette. So teams rationalize using them as-is.

**Consequences:**
- Visual amateur-hour signal to a sophisticated audience (the exact cohort prior research flagged as unforgiving)
- "This was an afterthought" perception — undermines the care signal the cinematic design currently sends
- The site's premium feel collapses to the weakest image's level
- Allan's imagery retroactively feels like overcompensation

**Prevention:**
Three options, in priority order:

1. **(PREFERRED) New Lachlan photoshoot** — Match Allan's shoot: editorial lighting, moody/dark background, deliberate pose, same photographer if possible. Budget 1–2 weeks turnaround. Gate the design phase on availability.
2. **Heavy post-production on existing Portrait.JPG** — Aggressive color grading to match site palette (navy-900 backgrounds, gold highlights, crushed blacks). Crop tightly to eliminate party-context backgrounds. Degraded outcome but viable if photoshoot is impossible.
3. **Avoid large hero-sized Lachlan imagery entirely** — If photos cannot match quality, use a smaller portrait treatment (e.g., 400×500 cropped tight with heavy vignette) that doesn't invite direct comparison to Allan's editorial shots. This ALSO supports Pitfall 2 (visual de-escalation).

**Explicitly forbidden:**
- Using `Picture_with_War_Room_members.JPG` as-is at any size — the group composition and casual party context cannot be salvaged for a mentor bio section, AND it associates Lachlan with an impressive cohort he doesn't own (stolen social proof)
- Using `Portrait.JPG` at hero/feature size without color regrading

**Detection:**
Place Allan's image and Lachlan's image side-by-side at target display sizes. If the images "feel" like they came from two different websites, prevention has failed.

**Sources:**
- [Why Inconsistent Team Photos Are Costing Your Business Clients (m2mpics)](https://www.m2mpics.com/post/why-inconsistent-team-photos-are-costing-your-alpharetta-business-clients-and-how-to-fix-it) — HIGH confidence, directly applicable
- [How to Get Matching Headshots for Your Entire Remote Team (headshotphoto.io)](https://www.headshotphoto.io/blogs/matching-team-headshots-remote-team) — MEDIUM confidence

---

### Pitfall 5: Bolted-On Section Feel — Cinematic Design Breaks at the Lachlan Boundary

**Category:** Visual Design / Integration
**Risk Level:** HIGH

**What goes wrong:**
The existing site uses a deliberate cinematic rhythm: slow-zoom hero, blur-reveal animations, parallax on editorial images, alternating dark/accent backgrounds, gold eyebrow labels with horizontal-line dividers, consistent GSAP motion timing. A new section that reuses these patterns naively produces redundancy ("another gold eyebrow, another blur-reveal, another parallax image"), but a section that ignores them produces a "bolted-on" break where design cohesion visibly fractures.

**Why it happens:**
The Phase 2 developer grabs the existing About section as a template, duplicates it with Lachlan content, and ships. The result is either:
- Exact duplicate = "groundhog day" effect, site feels repetitive
- Partial duplicate = visual jarring where some elements match and others don't
- Full redesign = breaks the design language entirely

**Consequences:**
- Cinematic identity (the current differentiator per the recent design overhaul) compromised
- Site reads as "Allan's site with Lachlan tacked on" — the exact perception to avoid
- User momentum through the page (currently strong with scroll-driven animations) breaks at the Lachlan section

**Prevention:**
Establish Lachlan's section as a **visual variation within the established design language**, not a separate pattern:
- **Reuse design tokens:** Same gold accent, same navy backgrounds, same typography scale, same motion timing — do not introduce new colors, new type scales, or new animation curves
- **Invert the composition:** If Allan's About section is text-left/image-right (`col-span-5` text + `col-span-7` image), Lachlan's should be text-right/image-left OR stacked-center. Different composition, same system.
- **Subordinate motion:** Allan's section uses `stagger-words` on the heading; Lachlan's section uses a simpler `blur-reveal` for deliberate de-escalation
- **Transitional framing:** Add a small divider section (an eyebrow callout like "Specialist Support" or a single italic line like "There's one more person you should know") between Allan and Lachlan that sets up the new mentor as an extension of the existing narrative rather than a parallel entity

**Detection:**
Scroll through the full page at 2× speed. If the pacing breaks or your eye "trips" at the Lachlan section, integration has failed. The scroll experience should feel like one continuous film reel, not a slideshow with a slide-swap.

---

### Pitfall 6: Hero Says "I Help Business Owners" But Page Has Two People

**Category:** Copy / Messaging Integrity
**Risk Level:** HIGH

**What goes wrong:**
The current hero copy is singular first-person: "**I** Help Business Owners Scale Past Their Current Ceiling." The hero eyebrow is "Allan Chan." Below, the metrics bar claims "$1M+ Revenue Generated" (implicitly Allan's). The About section opens "Hey, I'm Allan." Adding Lachlan below creates a glaring voice inconsistency: the hero promises one person, the page delivers two. A visitor who reads "I help you scale" and then scrolls to find a second mentor experiences bait-and-switch.

**Why it happens:**
The hero was written for a solo brand. During the milestone, nobody edits the hero because "the hero is about Allan, and Allan is still primary." But the hero is the PAGE's hero, not Allan's personal hero; it sets expectations for the entire page.

**Consequences:**
- Distrust signal: "The site told me one thing and shows me another"
- Undermines the decision to position Allan as primary — visitor feels Allan oversold
- Worse than having two mentors from the start — implies dishonesty about what the site is

**Prevention:**
Choose ONE of these voice strategies and apply consistently (depends on Pitfall 1 resolution):

1. **Keep hero solo (RECOMMENDED for "Allan's brand with specialist partner" positioning):**
   - Hero remains "I Help Business Owners Scale" (Allan's voice)
   - Allan's About section reinforces "I"
   - Lachlan's section uses third-person framing ("Allan works with a specialist partner, Lachlan MacDonald...") OR explicitly marked first-person speaker transition ("— Lachlan, speaking —")
   - Metrics bar stays Allan's with explicit attribution (see Pitfall 12)

2. **Shift to "we" (only if positioning is truly co-equal — contradicts milestone intent):**
   - Hero becomes "We Help Business Owners Scale"
   - All sections use "we"
   - Metrics combined

3. **Shift to brand voice:**
   - Hero becomes "Mentorship Ltd Helps Business Owners Scale Past Their Current Ceiling"
   - Each mentor section uses their own "I" voice, clearly delineated
   - Metrics attributed to the brand

**Forbidden:** Mixing voices mid-page without explicit speaker markers. Do NOT let "I" from Allan's section bleed into Lachlan's section or vice-versa.

**Detection:**
Read the full page top-to-bottom. Count pronoun shifts. If "I" refers to two different people in different sections without a clear speaker transition, copy has failed.

---

## SERIOUS PITFALLS (Significant degradation)

### Pitfall 7: Navigation Becomes a Team Directory

**Category:** UX / Navigation
**Risk Level:** MEDIUM

**What goes wrong:**
Adding nav items like "Meet Allan" + "Meet Lachlan" or a dropdown "Mentors > Allan / Lachlan" converts a clean single-page scroll site into what feels like a team directory. This fights the site's current single-page simplicity and subordinates the brand to the people.

**Why it happens:**
The single-page architecture (confirmed correct for this scope in prior research) means the only way to "link to Lachlan" is an anchor like `#lachlan`. Someone proposes a nav restructure to accommodate.

**Consequences:**
- Nav bloat contradicting the "5 items max" principle established in prior research
- Implies the mentors are the product, when the product is the mentorship outcomes
- Moves the site closer to "agency team page" positioning instead of "authority brand"

**Prevention:**
Do NOT add per-mentor nav items. If a deep-link to Lachlan is genuinely needed (e.g., referral traffic from boltloop.co), add a single "Mentors" or keep "About" anchor that scrolls to a combined section containing both. Keep nav at the existing item count — no person names in nav.

**Detection:**
Look at the nav. If a first-time visitor can tell the site has two founders from the nav alone, it's gone too far.

**Sources:**
- [Five Best Practices for Single-Page UX Design (Designmodo)](https://designmodo.com/ux-single-page-websites/) — MEDIUM confidence

---

### Pitfall 8: Dueling CTAs — Two Calendly Links Create Decision Paralysis

**Category:** Conversion
**Risk Level:** MEDIUM

**What goes wrong:**
Current hero CTA points to `https://calendly.com/allan-chan-roseyco/one-on-one`. Adding a parallel "Book with Lachlan" CTA in his section means the page now has TWO primary CTAs competing for clicks. Decision paralysis is a documented conversion killer, especially for $500K+ audiences who resent wasted time.

**Why it happens:**
"Fair representation" reasoning: if Allan has a CTA, Lachlan should too. This treats the page as a team directory (see Pitfall 7) instead of a conversion funnel.

**Consequences:**
- Hero's "Book a Free Call" becomes ambiguous ("which call?")
- Visitor punts on the decision ("I'll figure out who to book later" → never returns)
- Split attribution makes it impossible to measure which mentor drives bookings

**Prevention:**
One of these patterns (pick based on Pitfall 1 / Pitfall 3 resolution):

1. **(RECOMMENDED) Single unified CTA:** Keep "Book a Free Call" → routes to Allan's calendly OR to an intake form that does routing
2. **Primary + secondary hierarchy:** Hero CTA goes to Allan's calendly (unchanged). Lachlan's section has a visually subordinate link ("Learn more about Boltloop" or "Email Lachlan directly" as a text link, NOT a button)
3. **Topic-based CTAs:** "Book a scaling call" (Allan) vs "Book an AI strategy call" (Lachlan) — only works if Pitfall 3 through-line is resolved cleanly AND the visitor can self-diagnose which topic applies

**Never:** two equally-weighted "Book a Call" buttons on the same page.

**Detection:**
Count button-level CTAs on the page. Should be 1–2 max, and if 2, visually differentiated (not parallel twins).

---

### Pitfall 9: Copy Inconsistency Between Mentor Bios

**Category:** Copy / Messaging
**Risk Level:** MEDIUM

**What goes wrong:**
Allan's existing bio uses a narrative arc: "A few years ago I hit a wall..." → "So I went deep..." → italicized pull-quote. If Lachlan's bio switches to a different structure (listicle, credentials-first, LinkedIn-style), the two sections feel like they belong on different websites.

Research confirms: "Bios for each team member were completely inconsistent — some were much longer than others, some shared personal information and some didn't. It wasn't a good look." Inconsistency looks confusing and diminishes the trust you're trying to build. (Interior Design Community)

**Why it happens:**
Each bio gets written separately (or at different times). Without a structural template, voices and structures diverge.

**Consequences:**
- Tonal whiplash between sections
- Signals the site lacks editorial oversight
- Makes one mentor feel more "real" or more "considered" than the other

**Prevention:**
Define a bio template in REQUIREMENTS.md and enforce for both mentors:
- Eyebrow label (The Mentor / The Partner)
- H-level greeting ("Hey, I'm [Name]") — but see Pitfall 17 for heading-level rules
- 2–3 paragraph story arc (origin challenge → what they figured out → what they do now)
- One italicized pull-quote
- Same spacing, same motion timing

Lachlan's version should be STRUCTURALLY identical but CONTENT-different. Example arc: "I scaled agencies the hard way — manual, hours for everything. Then AI changed what solo founders could do. Now I help agency founders build the automation layer that lets them scale without 80-hour weeks."

**Detection:**
Diff the two bios structurally (not content). If structural outlines don't match, fix before shipping.

**Sources:**
- [Interior Design Team Recognition: Bios, Tags, and Credit](https://interiordesigncommunity.com/recognition-credit-team/) — MEDIUM confidence
- [Meet the Team Pages Best Practices (Smashing Magazine)](https://www.smashingmagazine.com/2010/06/meet-the-team-pages-examples-and-trends/) — MEDIUM confidence

---

### Pitfall 10: Lachlan Outshining Allan (The Age/Energy Trap)

**Category:** Visual Hierarchy
**Risk Level:** MEDIUM

**What goes wrong:**
Lachlan's portrait photo (directly inspected) shows him young, well-dressed in a striking teal suit, against glamorous event lighting — visually compelling. If presented at large size, his image risks being MORE visually arresting than Allan's, inverting the intended hierarchy. Combined with "AI/automation" (trending topic) vs "business mentorship" (less novel), Lachlan can inadvertently become the page's visual and conceptual anchor.

**Why it happens:**
Designers gravitate toward striking imagery. Trending topics attract attention. Both forces push Lachlan upward in perceived importance without anyone explicitly deciding it.

**Consequences:**
- Allan's primary-authority positioning undermined despite stated intent
- Milestone goal ("Allan remains primary") silently fails
- Visitors remember Lachlan, book Lachlan, undermining Allan's core book of business

**Prevention:**
Explicitly test for this:
- Size Lachlan's image **smaller** than Allan's, not just equal
- Place Lachlan's section BELOW a strong Allan reinforcement (results, testimonials, or companies section)
- Crop Lachlan's portrait to reduce the "striking outfit" impact — tighter crop, more muted color grading
- Do NOT use the War Room group photo (borrowed social proof, visually compelling, wrong signal)

**Detection:**
Ask 5 first-time visitors: "Who is the main mentor on this site?" If more than 1 says Lachlan, hierarchy has failed.

---

### Pitfall 11: Mystery Meat Scroll Anchor

**Category:** UX / Navigation
**Risk Level:** MEDIUM

**What goes wrong:**
If the site adds a "Mentors" anchor or any deep-link to Lachlan's section, anchor-landing UX matters. If the target heading lands too close to the top of the viewport, users overlook it; if a sticky nav covers the heading, users get disoriented.

"When users click an in-page link, the associated content should be scrolled close to the top of the screen, but show a little bit of the preceding text or a small amount of white space at the very top of the screen to help users orient themselves." (NN/g)

**Why it happens:**
Anchor scroll-target offset is frequently forgotten during implementation. The existing site should be audited for sticky-nav behavior that might occlude scroll-targets.

**Consequences:**
- Referral visitors from boltloop.co or partner links land on a broken-looking anchor
- Bounce rate on anchor-landed sessions significantly higher than top-landed

**Prevention:**
If implementing a deep-link to Lachlan's section:
- Add `scroll-margin-top` equal to sticky nav height + 16px breathing room
- Test with direct URL entry (`site.com/#lachlan`) not just in-page clicks — browser behavior differs
- Keep a small preceding element (eyebrow label or divider) visible so the user sees orientation context, not a heading slammed against the top edge

**Detection:**
Open `site.com/#lachlan` in a fresh tab. Does the Lachlan section land with breathing room at the top, with the eyebrow/divider visible above the heading? If not, fix the scroll offset.

**Sources:**
- [Anchors OK? Re-Assessing In-Page Links (NN/g)](https://www.nngroup.com/articles/in-page-links/) — HIGH confidence

---

### Pitfall 12: Metrics Bar Doesn't Account for Two Mentors

**Category:** Authority / Copy Integrity
**Risk Level:** MEDIUM

**What goes wrong:**
Current metrics bar: $1M+ Revenue Generated, 10+ Businesses Mentored, 8+ Years Experience, 100% Client Retention. These are presented as the site's authority proof — implicitly Allan's (based on hero positioning and About section). Once Lachlan appears below, the metrics become ambiguous: are these Allan's? Combined? Whose 8+ years? If Lachlan is newer (which his visible age suggests), silent combined-attribution inflates his numbers via Allan's track record.

**Why it happens:**
The metrics bar is "done" from the previous milestone and feels untouchable. Nobody asks whether it still means the same thing with a second mentor present.

**Consequences:**
- Implicit authority-padding — reads as slightly dishonest to discerning visitors who pattern-match
- When Lachlan's section reveals he's newer, the "8+ years" number retroactively feels like it was reaching
- Vulnerable to direct contradiction if Lachlan's actual experience is stated explicitly elsewhere

**Prevention:**
Three options:
1. **Attribute explicitly (RECOMMENDED):** Add small eyebrow above the metrics bar — "Allan's Track Record" or "Since 2017"
2. **Combine honestly:** Rewrite metrics as combined aggregate numbers with explicit "Across our mentors" labels — only if combined numbers are legitimately bigger AND stated honestly
3. **Split:** Allan's metrics in the main bar; Lachlan's smaller metrics (e.g., "Solo agencies scaled to $X") within his section

**Forbidden:** Leaving the metrics bar unchanged while silently implying it represents "both mentors."

**Detection:**
Ask any reviewer: "Whose numbers are these?" If answers differ, attribution has failed.

---

### Pitfall 13: "Fighter" Angle Lowering Professional Tone

**Category:** Copy / Messaging
**Risk Level:** MEDIUM

**What goes wrong:**
Lachlan's context includes "maintains great physical health and fights." In a dark, cinematic, authority-focused business mentorship site targeting $500K+ owners, the fighting/martial-arts angle is double-edged: done well, it reinforces discipline and intensity; done badly, it reads as "bro marketing" or personal vanity — both of which alienate sophisticated buyers.

Research confirms: "Be aware of how humorous or campy information can come across to professionals from different industries. What might be acceptable for a creative site might not go over so well in the finance or legal industries." (Interior Design Community)

**Why it happens:**
Personal-brand instinct says "add personality." The fighting angle is a genuine differentiator for Lachlan. But at the site level, the audience is buying business outcomes, not personality.

**Consequences:**
- Tonal mismatch with Allan's restrained, strategy-focused voice
- "Trying too hard" perception (echoes prior research's warning about aesthetic over substance)
- Filter that eliminates the most sophisticated prospects (finance/legal/older operators who over-index on restraint)

**Prevention:**
- **(RECOMMENDED) Option A:** Keep the fighter angle OUT of the primary site. If Lachlan wants to showcase it, add to his dedicated LinkedIn, personal site, or a potential future `/lachlan` subpage — not the main landing page.
- **Option B:** Reference it obliquely as a discipline signal ("Lachlan brings the same intensity to his clients as he does to training") — one sentence max, never a section
- **Forbidden:** Dedicated "fighter" imagery, fight-branded copy, gym photos, or any "warrior/grind" tonal shift in the Lachlan section

**Detection:**
Read the Lachlan section to someone in finance or law. If their reaction is "oh, one of those" or a raised eyebrow, cut it.

---

## MODERATE PITFALLS (Polish / refinement)

### Pitfall 14: Companies Section Redundancy (Boltloop Card)

**Category:** Information Architecture
**Risk Level:** LOW

**What goes wrong:**
The current "Companies I've Built" section features Boltloop as one of four cards under Allan's implicit ownership ("I don't just advise — I build. These are the businesses I own and operate."). If Lachlan's new section explicitly frames him as "CEO of boltloop.co," the Boltloop card becomes contradictory: is it Allan's company or Lachlan's?

**Prevention:**
Reframe the companies section. Options:
- Change the header copy to "The Portfolio" / "Our Companies" and remove the first-person framing
- Keep section as Allan's portfolio but add a visible indicator on Boltloop card ("Led by Lachlan MacDonald")
- Move Boltloop out of this section and into Lachlan's section as HIS company

Do not leave the ambiguity unresolved — it implies Allan took credit for Lachlan's company.

---

### Pitfall 15: Testimonials Don't Name Which Mentor Helped

**Category:** Social Proof
**Risk Level:** LOW

**What goes wrong:**
Results section has "3.2x Revenue Growth," "$1.2M Added Annual Revenue," "25 hrs/week Freed Up." Currently these implicitly belong to Allan. Once Lachlan is on the page, visitors may assume one of these was Lachlan's result, inflating his track record.

**Prevention:**
If Lachlan has zero real testimonials for this milestone, explicitly attribute existing results to Allan (e.g., subsection header "Allan's Client Results"). If Lachlan has real testimonials, add them in a visually differentiated way — do not blend them into Allan's results.

---

### Pitfall 16: OG / Meta Tags Still Singular

**Category:** SEO / Social Meta
**Risk Level:** LOW

**What goes wrong:**
Current `<Base>` description: "Mentorship Ltd — Allan Chan helps business owners scale with mentorship, strategy, and hands-on guidance to grow past your current ceiling." Still names only Allan. When shared on LinkedIn/Twitter post-launch, the preview card contradicts the actual page contents.

**Prevention:**
- Update meta description, OG description, and Twitter card to reflect the new positioning from Pitfall 1
- Ensure OG image (hero share image) doesn't feature only Allan if positioning shifts
- If JSON-LD Person schema is present, handle two people correctly OR switch to Organization schema

---

### Pitfall 17: Two "Hey, I'm ___" H2s Break Heading Hierarchy

**Category:** Accessibility / Semantic HTML
**Risk Level:** LOW

**What goes wrong:**
Allan's About section currently uses `text-h2` ("Hey, I'm Allan" — confirmed at line 120 of `index.astro`). If Lachlan's section copies the pattern ("Hey, I'm Lachlan") with the same H2 level, screen readers announce TWO top-level mentor sections, fighting the intended hierarchy where Allan is primary.

**Prevention:**
- If Lachlan is subordinate (per Pitfall 2): use H3 for Lachlan's greeting, not H2
- Alternatively: wrap both mentors under a single H2 container ("The Team Behind Mentorship Ltd" or "Meet Your Mentors"), with H3 for each individual
- Add `aria-labelledby` on each section pointing to its heading
- Run axe-core or Lighthouse accessibility check after implementation

---

## Phase-Specific Guidance

| Phase Topic | Primary Pitfalls to Address | Mitigation Approach |
|-------------|------------------------------|---------------------|
| Requirements | 1 (Identity Crisis), 3 (Specialty Confusion), 13 (Fighter Tone) | Resolve positioning questions and tone boundaries in writing BEFORE roadmap finalization |
| Phase 0 / Content Prep | 4 (Photo Mismatch) | Schedule Lachlan photoshoot as gating content dependency; this blocks design work |
| Phase 1 (Design / Hierarchy) | 2 (Authority Split), 6 (Hero Voice), 10 (Outshining), 12 (Metrics Attribution) | Establish hierarchy and voice rules as design tokens / style-guide entries, not per-section decisions |
| Phase 2 (Implementation) | 5 (Bolted-On), 7 (Nav), 8 (CTAs), 9 (Bio Consistency), 11 (Anchor Offset), 14 (Companies Section), 17 (H-levels) | Component-level discipline — reuse patterns with deliberate variation; treat every Lachlan decision as "deliberate de-escalation check" |
| Phase 3 (Polish / QA) | 13 (Fighter), 15 (Testimonial Attribution), 16 (Meta/OG) | Content audit + meta pass + 5-person cold-read test before launch |

---

## Meta-Pitfall: "The Silent Promotion"

The most dangerous pattern across all pitfalls above is **unintended co-equality** — the milestone explicitly states Allan remains primary, but default developer and designer instincts (symmetry, fairness, treating the second person "professionally") produce visual and narrative parity. Every design decision must be actively tested against the question: **"Does this reinforce Allan as primary, or does it silently equalize?"**

If there's no explicit hierarchy rule, symmetry wins by default. Hierarchy must be deliberate.

A second meta-lens: **the milestone is a brand identity question masquerading as a design task.** Treating it as "add a section" produces all the pitfalls above. Treating it as "redefine what Mentorship Ltd is, then express that visually" avoids them. Pitfalls 1, 3, and 6 are root causes; everything else is downstream.

---

## Sources (Aggregated)

### Primary Research Sources (external)
- [Why Inconsistent Team Photos Are Costing Your Business Clients (m2mpics)](https://www.m2mpics.com/post/why-inconsistent-team-photos-are-costing-your-alpharetta-business-clients-and-how-to-fix-it) — HIGH confidence
- [How to Get Matching Headshots for Your Entire Remote Team (headshotphoto.io)](https://www.headshotphoto.io/blogs/matching-team-headshots-remote-team) — MEDIUM confidence
- [Positioning Your Coaching Business When You're A Jack Of All Trades (herincomeedit)](https://www.herincomeedit.com/post/positioning-your-coaching-business-when-you-re-a-jack-of-all-trades) — MEDIUM confidence
- [Anchors OK? Re-Assessing In-Page Links (NN/g)](https://www.nngroup.com/articles/in-page-links/) — HIGH confidence
- [How to Avoid Brand Dilution in Multi-Brand Organizations (Claromentis)](https://www.claromentis.com/blog/how-to-avoid-brand-dilution-in-multi-brand-organizations) — MEDIUM confidence
- [Brand Dilution: What It Is and How to Avoid It (Website Builder Expert)](https://www.websitebuilderexpert.com/brand/brand-dilution/) — MEDIUM confidence
- [Interior Design Team Recognition: Bios, Tags, and Credit](https://interiordesigncommunity.com/recognition-credit-team/) — MEDIUM confidence
- [Meet the Team Pages Best Practices (Smashing Magazine)](https://www.smashingmagazine.com/2010/06/meet-the-team-pages-examples-and-trends/) — MEDIUM confidence
- [Five Best Practices for Single-Page UX Design (Designmodo)](https://designmodo.com/ux-single-page-websites/) — MEDIUM confidence
- [7 Tips to Transition into a Personal Brand Website (Jammy Digital)](https://jammydigital.com/transitioning-personal-brand/) — MEDIUM confidence

### Internal Sources
- `.planning/research/SUMMARY.md` (prior milestone — audience characteristics baseline) — HIGH confidence on audience profile
- `.planning/PROJECT.md` (milestone brief defining Allan-primary constraint) — HIGH confidence
- Direct inspection of `src/pages/index.astro` (current site structure, voice, metrics, CTAs) — HIGH confidence
- Direct inspection of `public/Lachlan Pictures/Portrait.JPG` and `Picture_with_War_Room_members.JPG` (actual available photos) — HIGH confidence
