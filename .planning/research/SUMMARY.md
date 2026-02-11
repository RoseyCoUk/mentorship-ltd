# Research Summary: Elevateo Co Website

**Project:** Business education authority website (Elevateo Co)
**Target Audience:** Established business owners ($500K-$1M+ revenue)
**Synthesized:** 2026-02-11
**Overall Confidence:** HIGH

---

## Executive Summary

Elevateo Co is a business education authority website targeting sophisticated, established business owners. Based on comprehensive research across technology stack, feature landscape, architecture patterns, and domain pitfalls, this is fundamentally a **credibility-first marketing site** where the primary goal is establishing authority and capturing email leads. The recommended approach is deliberately minimal: a static site with bold dark aesthetics, professional photography, specific founder credentials, and strategic email capture — but critically, with enough substantive content to demonstrate expertise before asking for trust.

The research reveals a consistent meta-pattern: **the target audience (established business owners making $500K-$1M+) is exceptionally discerning**. They evaluate coaches and consultants constantly, can detect empty authority claims instantly, and have zero patience for "guru" patterns (slick design without substance). This means every technical and content decision must prioritize substance over style, specificity over scale, and proof over polish. A simpler site with genuine insights will outperform a pixel-perfect site with hollow promises.

The recommended stack (Astro 5.x + Tailwind CSS 4.x + GSAP + Kit email marketing) optimizes for speed, zero-JS-by-default performance, and rapid iteration. The architecture is intentionally simple: three static pages with shared components, no framework overhead, no premature infrastructure. The critical success factor is not technical sophistication — it's **launching with enough credible authority content to justify the ask**, even before video courses exist. Without this, the site becomes a liability rather than an asset.

---

## Key Findings by Research Dimension

### Stack Recommendation (from STACK.md)

**Core Framework: Astro 5.17.x (stable)**
- Zero JavaScript by default, outputs pure HTML/CSS for maximum performance
- Islands architecture allows selective interactivity only where needed
- 95% less JavaScript than Next.js for static sites → sub-second page loads
- Cloudflare recently acquired Astro's parent company, making Cloudflare Pages the natural deployment target
- **Why not Next.js/Nuxt/React:** Massively over-engineered for a 3-page marketing site with no dynamic data, no user state, no server-side rendering needs

**Styling: Tailwind CSS 4.1.x**
- 5x faster builds in v4, zero-config integration with Astro 5.2+
- Perfect for custom dark-and-bold aesthetic without fighting opinionated component libraries
- Built on modern CSS features (cascade layers, color-mix, @property)

**Animation: GSAP 3.14.x**
- Industry standard for high-end marketing site animations
- ScrollTrigger plugin enables acquisition.com-style scroll-driven reveals
- Now 100% free (including all premium plugins) after Webflow acquisition
- Works with vanilla DOM, no framework dependency

**Email Capture: Kit (formerly ConvertKit)**
- Built specifically for creators and educators (not e-commerce like Mailchimp)
- Higher deliverability (87% vs Mailchimp's 85%)
- Native integrations with Teachable, Kajabi, and other course platforms for future expansion
- API supports custom form styling to match dark theme
- $0-29/month depending on subscriber count

**Hosting: Cloudflare Pages**
- Unlimited bandwidth on free tier, 300+ global edge locations
- First-class Astro support (Cloudflare-Astro merger alignment)
- Zero cost to start, scales infinitely
- Free SSL, DDoS protection, 500 builds/month

**What NOT to use:**
- WordPress (slow, security-prone, fights custom design)
- Page builders like Webflow/Framer (lock-in, limited customization, poor performance)
- React/Vue/Svelte as primary framework (content site, not web app)
- Bootstrap/Material UI (imposes visual opinions that fight custom aesthetic)
- Mailchimp (e-commerce focused, lower deliverability)

**Cost at launch: $9-29/month total** (Plausible analytics $9 + Kit $0-29 depending on features)

---

### Table Stakes Features (from FEATURES.md)

**Critical must-haves for credibility:**

1. **Bold hero with specific promise** — Must speak to visitor's desired outcome ("Scale past $1M") not describe what Elevateo is ("We teach business")
2. **Founder authority section with specific metrics** — At minimum 2-3 verifiable metrics (revenue generated, businesses helped, years experience). Vague claims like "serial entrepreneur" mean nothing to this audience.
3. **Single, clear primary CTA per section** — For v1 with no courses, every CTA points to email signup. One action, repeated.
4. **Email capture form (hero + footer minimum)** — The only monetizable action at launch. Single field (email only) — name field reduces conversion 10-15%.
5. **Social proof section** — 92% of consumers read testimonials before purchasing. Use client results, media logos, or specific result metrics. Empty testimonial sections worse than no section.
6. **Professional founder photography** — Stock photos or amateur selfies instantly undercut authority. Content dependency that blocks launch.
7. **Mobile-responsive design** — 60%+ of traffic is mobile. Dark themes need extra attention: contrast ratios, touch targets (44x44px min), readable text sizes.
8. **Dark, bold visual identity** — WCAG requires 4.5:1 contrast ratio minimum. Pure black (#000) causes eye strain — use dark grays (#0a0a0a to #1a1a1a).
9. **Clear navigation (5 items max)** — Home, About, Courses, CTA button. No "coming soon" pages in nav.
10. **About page with founder story arc** — Pattern: "I was where you are" → "I figured out X" → "Now I help others do the same"
11. **Fast page load (<3 seconds)** — Target Lighthouse score 90+. Dark sites with large hero images prone to bloat.
12. **Footer with legal essentials** — Copyright, privacy policy, earnings disclaimer ("Results not typical"), contact info.

**High-impact differentiators:**

1. **Lead magnet instead of bare email signup** — Data shows lead magnets double/triple conversion rates (3.8% → 7.7% on mobile). Even a simple 3-5 page PDF dramatically increases signups. **This is the single highest-ROI feature upgrade possible.**
2. **Problem/solution framework section** — Name 3-4 specific scaling bottlenecks the $500k+ audience faces. Makes visitor feel understood.
3. **Specific result metrics displayed prominently** — Design as "numbers bar" with 3-4 metrics in large typography on dark background.
4. **Course placeholder grid with anticipation** — Show course cards with titles, brief descriptions, topic icons, "Notify Me" CTAs. NOT empty "Coming Soon" badges.
5. **FAQ section with objection handling** — 5-7 questions addressing actual objections: "I've seen lots of coaches — what's different?" "Is this for my industry?"

**Anti-features (explicitly avoid):**

- Blog/content hub (empty blog worse than no blog)
- Live chat/chatbot (unanswered chats worse than no chat)
- User accounts/login (nothing to log into yet)
- E-commerce/payments (nothing to sell yet)
- Popup modals for email capture (business owners hate popups)
- Social media feed embeds (slow page load, show stale content, pull visitors OFF site)
- Countdown timers/artificial scarcity (sophisticated audience sees through fake urgency)

---

### Architecture Approach (from ARCHITECTURE.md)

**Recommended: Astro static site with component islands**

The research initially considered plain HTML/CSS/JS but the final stack recommendation converges on **Astro 5.x** as the optimal balance:

**Why Astro wins:**
- Eliminates the "header/footer duplication" problem without custom JS loaders
- Zero JavaScript by default (ships pure HTML/CSS)
- Component reuse without framework overhead
- Island architecture allows selective interactivity (mobile nav toggle, email form)
- First-class image optimization built-in (astro:assets)
- Trivial to scale from 3 pages to 10+ pages or add blog later
- Natural migration path to headless CMS if needed (Astro Content Layer API)

**Architecture principles:**

1. **Design token system (CSS custom properties)** — Single source of truth for colors, typography, spacing. Changing accent color is one-line change.
2. **Mobile-first responsive** — Write base styles for mobile, add complexity for larger screens. Breakpoints: 768px (tablet), 1024px (desktop), 1400px (wide).
3. **Component boundaries:**
   - Shared: Header/nav, Footer, Email signup block
   - Home page: Hero, Social proof, Problem/solution, How it works, About preview, Courses preview, FAQ, Final CTA
   - About page: Hero, Origin story, Credentials, Philosophy, CTA
   - Courses page: Hero, Course grid, Why these topics, Notify CTA
4. **Email capture flow:** Custom fetch() to Kit API (Option C) — no page redirect, custom success/error messaging, stays on current page, no Kit-branded UI
5. **Performance budget:** Total page weight <2MB, LCP <2.5s, JavaScript <20KB, CSS <30KB, total requests <15

**Critical architectural decisions:**

- **No framework over-engineering:** This is a marketing site, not a SaaS app. No state management, no API routes, no database, no auth scaffolding.
- **No CSS framework:** Custom design tokens system. Tailwind fights against the custom dark aesthetic — total custom CSS will be under 30KB.
- **Static-first:** Separate HTML pages, not SPA routing. SEO-friendly, browser-native behavior.
- **File organization:** Flat page structure at root, CSS split by concern (variables/base/components/pages), assets organized by type

**Performance strategy:**
- Modern image formats (WebP/AVIF) with lazy loading below-fold
- Font preloading, max 2 font families
- CSS-only animations (GPU-accelerated) over JavaScript
- Analytics loaded async
- Target: First Contentful Paint <1.0s, Largest Contentful Paint <2.0s

**Scalability path:** If site grows beyond ~10 pages or adds blog, the Astro architecture handles this natively. The CSS token system, component structures, and content patterns transfer directly. This is a reorganization, not a rewrite.

---

### Top Pitfalls to Watch For (from PITFALLS.md)

**CRITICAL (project-killing mistakes):**

1. **The Empty Authority Paradox** — Site claims expertise but has no courses, no blog, no case studies, no proof. Sophisticated audience sees "all sizzle, no steak" and bounces. **Prevention:** Do NOT launch courses page as empty "Coming Soon" cards. Reframe as "curriculum roadmap" with substantive topic descriptions that demonstrate expertise. Build credibility proof into Phase 1.

2. **Dark Design That Kills Readability** — Pure black backgrounds (#000) cause eye strain and halation (text bleeds/blurs for 33% of users with astigmatism). Saturated colors vibrate on dark backgrounds. Thin fonts disappear. **Prevention:** Use dark grays (#0a0a0a to #1a1a1a), off-white text (#e0e0e0), increase font-weight to 400-500, test contrast ratios (4.5:1 minimum), test in bright lighting on actual devices.

3. **Over-Engineering a Marketing Site** — Using React component libraries, state management, API layers, database schemas for what is fundamentally a 3-page brochure. **Prevention:** Match architecture to requirements. Static site or simple framework with static export. No backend needed (email form hits Kit API directly). Set complexity budget: if any decision takes >2 hours for a 3-page site, it's over-engineered.

**SERIOUS (significant wasted effort or missed conversions):**

4. **Email Capture Without a Reason to Subscribe** — "Subscribe for updates" converts at 1.8-3.8%. Lead magnets convert at 4.7-7.7%. **Prevention:** Even a single PDF guide ("3 Mistakes Scaling Past $1M") takes 2-4 hours and doubles conversion. At minimum, name the newsletter and describe specific value.

5. **Copying acquisition.com's Aesthetic Without Its Substance** — Replicating the dark, bold style without the $250M portfolio, 12M+ audience, bestselling books, $46M exit backing it up. Creates "trying too hard" perception. **Prevention:** Extract principles (dark backgrounds, bold typography, restraint), not pixels. Distinct color palette, typography, layout. Scale credibility signals to what's real.

6. **Mobile Experience Afterthought** — Desktop-first design squished into mobile. Dark theme readability problems amplified on small screens, outdoor lighting. 60%+ of traffic is mobile. **Prevention:** Design mobile-first. Mobile-specific typography scales. Responsive images (srcset). Test dark design on actual phones in bright light. Performance budget for mobile: LCP <2.5s on 4G.

7. **The "Under Construction" Perception** — Courses page with "Coming Soon" signals "not ready yet" or "might never launch." **Prevention:** Reframe to "What We Teach" with curriculum depth. Add timelines only if you can commit. Use page to drive topic-specific email signups.

**MODERATE (delays, reduced effectiveness, technical debt):**

8. **Performance Death by Visual Boldness** — 5MB hero images, background videos, custom fonts, parallax JavaScript. Site looks stunning on fast connection, takes 8 seconds on mobile. **Prevention:** Performance budget (total <2MB, LCP <2.5s), modern image formats, limit fonts, CSS animations only.

9. **Speaking Down to the Audience** — Copy uses beginner language ("Do you want to grow your business?") that insults $500K+ business owners. **Prevention:** Acknowledge where audience is ("You've built a successful business. Now scale past the ceiling."). Use advanced terminology appropriate for experienced operators. Have an actual business owner review copy.

10. **Navigation Complexity for Simple Site** — Dropdowns, mega-nav, sub-pages for 3 pages. **Prevention:** Three pages = three nav items + CTA button. No dropdowns. No nav items for pages that don't exist yet.

11. **Analytics/Conversion Tracking Gaps** — Launch without knowing visit count, sources, signup rates, drop-off points. **Prevention:** Install GA4 or Plausible before launch. Track email signup events, scroll depth, UTM parameters. Takes 1-2 hours, enables all future decisions.

12. **Ignoring SEO** — No meta tags, no semantic HTML, no sitemap. Invisible to search. **Prevention:** Unique title/description per page, semantic HTML hierarchy, sitemap.xml, structured data, Google Search Console. Takes 2-3 hours, compounds over time.

**Key insight:** The "sophistication mismatch" meta-pitfall — building a site that looks premium but feels hollow to established business owners who evaluate dozens of coaches. Solution: **substance before style, proof before polish, specificity before scale.**

---

## Implications for Roadmap

### Suggested Phase Structure

Based on dependency analysis and risk mitigation:

**Phase 1: Foundation + Content Strategy (MUST COME FIRST)**
- **Why first:** Everything depends on the visual system AND the content strategy. Building pages before design tokens exist means hard-coded values that require refactor. Building before content strategy is defined means "Empty Authority Paradox."
- **Delivers:**
  - Complete design token system (CSS custom properties for dark theme with verified contrast ratios)
  - Astro project scaffolding with Tailwind CSS 4.x + GSAP
  - Base typography, responsive system, component architecture
  - **Content requirements definition:** Alan provides professional photography, 2-3 verifiable metrics, founder story narrative, specific pain points of target audience
  - Three page shells with shared header/footer
  - Kit (ConvertKit) account setup
- **Avoids:** Critical Pitfall 1 (Empty Authority), Critical Pitfall 2 (Dark Design Readability), Critical Pitfall 3 (Over-Engineering), Serious Pitfall 5 (Aesthetic Without Substance)
- **Risk:** High content dependency. Alan must provide photography, metrics, and narrative BEFORE pages can be built. Block build if content not ready.
- **Research flag:** Skip — design systems and static site patterns are well-documented

**Phase 2: Home Page (Content-Heavy)**
- **Why second:** Most complex page, establishes all component patterns (hero, cards, CTAs, FAQ) that other pages reuse. Stress-tests design system early.
- **Delivers:**
  - Hero section with bold headline, specific promise, professional founder photo, primary CTA
  - Authority section with Alan's specific metrics (designed as visual callouts, not buried in text)
  - Problem/solution framework (3-4 scaling bottlenecks named specifically)
  - Social proof section (real testimonials if available, OR media logos if available, OR result metrics — never empty)
  - FAQ accordion (5-7 objection-handling questions)
  - Email capture integration (custom fetch to Kit API, success/error states)
  - Final CTA section
  - All components built responsive and performance-optimized
- **Avoids:** Serious Pitfall 4 (Email Without Reason — via specific FAQ and problem framing), Moderate Pitfall 2 (Speaking Down — copy reviewed by actual business owner), Moderate Pitfall 8 (Performance — image optimization, <2MB budget)
- **Risk:** Content dependency (copy, photography, metrics). High conversion expectation.
- **Research flag:** Skip — homepage patterns for authority sites well-established from FEATURES.md research

**Phase 3: About Page (Narrative Focus)**
- **Why third:** Simpler than home, mostly reuses components. Focuses on founder story arc.
- **Delivers:**
  - Hero with Alan's positioning statement and larger portrait photo
  - Origin story section (founder journey, relatable challenges → discovery → mission)
  - Credentials section (expanded metrics, timeline, experience)
  - Philosophy/approach differentiation
  - CTA to email signup
- **Avoids:** Moderate Pitfall 2 (Speaking Down — story must resonate with experienced operators)
- **Risk:** Story authenticity. If it reads like a template, sophisticated audience will detect.
- **Research flag:** Skip — about page patterns standard

**Phase 4: Courses Page (Reframed as Curriculum)**
- **Why fourth:** Most challenging from a content perspective — must demonstrate expertise without video courses existing yet.
- **Delivers:**
  - Reframed as "What We Teach" or "Curriculum Roadmap"
  - Course topic cards with substantive descriptions (2-3 paragraphs each: problem solved, who it's for, outcome)
  - Topic icons or imagery
  - "Get Early Access" CTAs tied to topic-specific email segments
  - Why These Topics section (demonstrates curriculum thinking)
  - NO "Coming Soon" badges — forward-looking, authoritative framing
- **Avoids:** Critical Pitfall 1 (Empty Authority), Serious Pitfall 7 (Under Construction Perception)
- **Risk:** Alan must define course topics with enough depth to demonstrate expertise. If topics are vague or generic, credibility suffers.
- **Research flag:** **NEEDS RESEARCH** — This is the highest-risk page. Recommend `/gsd:research-phase` on "Pre-launch course page strategies for authority sites" to identify best-practice patterns beyond generic "coming soon" approaches.

**Phase 5: Polish, Optimization, Launch Prep**
- **Why last:** Polish happens after all content exists. Optimizing images that might change is wasted effort.
- **Delivers:**
  - Image optimization (WebP conversion, compression, responsive srcset)
  - SEO meta tags on all pages (unique title/description, Open Graph, Twitter Card, structured data)
  - Google Analytics 4 or Plausible setup with email conversion tracking
  - Accessibility audit (contrast verification, alt text, keyboard nav, ARIA)
  - Cross-browser/device testing (Chrome, Firefox, Safari, Edge, iOS, Android)
  - Lighthouse audit and performance fixes (target 90+ all categories)
  - Legal pages (Privacy Policy, Terms if needed, Earnings Disclaimer in footer)
  - Favicon and social sharing image
  - Final dark theme state audit (all interaction states styled)
- **Avoids:** Moderate Pitfall 11 (Analytics Gaps), Moderate Pitfall 12 (SEO Ignored), Minor Pitfall 3 (Inconsistent Dark States), Minor Pitfall 4 (Missing Favicon/OG)
- **Risk:** Low — this is cleanup and validation, not net-new content
- **Research flag:** Skip — optimization checklists are standard

**Optional Phase 2.5: Lead Magnet Creation (RECOMMENDED)**
- **Why recommended:** Lead magnets double/triple email conversion rates (3.8% → 7.7%). Single highest-ROI feature upgrade. Can be created in parallel with Phase 3/4 development.
- **Delivers:**
  - Single PDF guide (3-5 pages): "The 3 Bottlenecks Killing Your Growth Past $1M" or similar
  - Landing page variant with lead magnet offer
  - Kit automation: deliver PDF on signup, add to nurture sequence
  - Update all email CTAs to reference lead magnet
- **Avoids:** Serious Pitfall 4 (Email Without Reason)
- **Risk:** Content creation time (2-4 hours of Alan's time for substantive PDF)
- **Research flag:** Skip — lead magnet best practices covered in FEATURES.md

---

### Research Flags for Each Phase

| Phase | Needs `/gsd:research-phase`? | Rationale |
|-------|------------------------------|-----------|
| Phase 1: Foundation | **NO** | Design systems, Astro setup, static site architecture are well-documented. STACK.md and ARCHITECTURE.md provide complete guidance. |
| Phase 2: Home Page | **NO** | Homepage patterns for authority sites thoroughly researched in FEATURES.md. Component patterns established. |
| Phase 3: About Page | **NO** | About page structure is standard. Founder story arc pattern is clear. |
| Phase 4: Courses Page | **YES** | Highest risk. "Pre-launch course page without content" is unique challenge. Research needed on: pre-launch education site strategies, curriculum preview best practices, anti-"coming soon" patterns that maintain authority. |
| Phase 5: Polish | **NO** | Optimization checklists and accessibility audits are standard processes. |
| Lead Magnet | **NO** | FEATURES.md already covers lead magnet types, conversion data, and best practices. |

**Phase 4 research query suggestion:**
`/gsd:research-phase "Pre-launch course page strategies for business education sites — how to preview curriculum without existing video content while maintaining authority with sophisticated audiences"`

---

## Confidence Assessment

| Research Area | Confidence | Basis | Gaps |
|---------------|------------|-------|------|
| **Stack** | HIGH | Astro, Tailwind CSS 4, GSAP, Kit (ConvertKit), Cloudflare Pages — all current versions verified via npm registry, GitHub releases, and official docs as of 2026-02-11. Alternatives considered and rejected with clear rationale. | None significant. Stack decisions are solid. |
| **Features** | MEDIUM-HIGH | Table stakes features derived from direct analysis of acquisition.com, grantcardone.com, tonyrobbins.com, russellbrunson.com. Differentiators backed by conversion rate data from GetResponse, Encharge, Getsitecontrol studies. Anti-features identified from coaching site mistake research. | **Gap:** Courses page content strategy is least defined. FEATURES.md identifies the problem (empty "coming soon" is bad) but doesn't fully solve "what to show instead." Phase 4 research needed. |
| **Architecture** | HIGH | Astro static site architecture is well-established. Component boundaries clear. Email capture flow to Kit API documented. Performance budgets defined. Design token system standard practice. | None. Architecture is appropriate for scope and well-understood. |
| **Pitfalls** | MEDIUM-HIGH | Critical pitfalls (Empty Authority, Dark Design Readability, Over-Engineering) backed by NN/g research, WCAG specs, acquisition.com color analysis. Serious pitfalls backed by conversion data, FTC guidance, mobile-first research. Moderate/minor pitfalls identified from standard web development best practices. | **Gap:** "Sophistication mismatch" meta-pitfall is reasoned but not directly data-backed — it's synthesis across multiple sources rather than a single study. However, FTC business coaching guidance and consumer trust research support the pattern. |

**Overall confidence: HIGH** for technical execution (stack, architecture, performance). **MEDIUM-HIGH** for content strategy (features, messaging, courses page approach).

**Key gaps to address during planning:**

1. **Courses page content strategy** — Needs deeper research (Phase 4 flag)
2. **Alan's content deliverables timeline** — Professional photography, metrics, story narrative, course topic definitions are critical path blockers
3. **Lead magnet scope decision** — Should be addressed in Phase 1 planning: launch with or without? If without, commit to adding in Phase 2.5 based on conversion data.

---

## Open Questions Requiring Answers Before Building

These cannot be resolved by research — they require client decisions:

1. **Content availability:** Does Alan have professional photography ready? If not, what is the timeline to obtain it? (Blocks Phase 2)

2. **Metrics definition:** What are Alan's 2-3 verifiable authority metrics? (Revenue generated, businesses helped, years experience, specific outcomes, etc.) These must be real and specific. (Blocks Phase 2)

3. **Course topic definition:** What are the actual course topics Alan plans to teach? Vague placeholders ("Leadership," "Scaling") are not sufficient — need specific frameworks or outcomes. (Blocks Phase 4)

4. **Lead magnet decision:** Launch with or without? If with, what is the topic and who creates the PDF? If without, commit to adding based on conversion data threshold. (Decision needed in Phase 1)

5. **Timeline expectations:** Is there a hard launch deadline, or is this quality-gated? If deadline-driven, what gets cut from scope? (Affects all phases)

6. **Social proof availability:** Does Alan have client testimonials, media mentions, or third-party endorsements available now? If not, what alternative social proof will be used? (Affects Phase 2 — do NOT build empty testimonial sections)

7. **Brand identity finalization:** Dark + bold is established, but what is the specific accent color? What typography? These must be defined before Phase 1 design token system. (Blocks Phase 1)

8. **Analytics choice:** Google Analytics 4 (free, feature-rich, requires cookie consent) or Plausible ($9/month, privacy-first, no consent needed)? (Decision needed in Phase 1)

---

## Sources (Aggregated)

### Stack Research
- [Astro 6 Beta Announcement](https://astro.build/blog/astro-6-beta/)
- [Astro 5.0 Release](https://astro.build/blog/astro-5/)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Kit vs Mailchimp Comparison 2026](https://moosend.com/blog/convertkit-vs-mailchimp/)
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Astro vs Next.js vs Remix Comparison 2026](https://octahedroid.com/blog/astro-vs-nextjs-vs-remix-react-router-static-site-generators-comparison-2026)

### Features Research
- acquisition.com homepage analysis (direct fetch, 2026-02-11)
- grantcardone.com homepage analysis (direct fetch, 2026-02-11)
- tonyrobbins.com homepage analysis (direct fetch, 2026-02-11)
- russellbrunson.com homepage analysis (direct fetch, 2026-02-11)
- [Top 10 Best Coaching Websites 2026](https://www.gregfaxon.com/blog/coaching-websites)
- [Lead Magnet Statistics](https://mycodelesswebsite.com/lead-magnet-statistics/)
- [Landing Page Best Practices 2026](https://www.involve.me/blog/landing-page-best-practices)
- [WCAG Contrast Requirements](https://webaim.org/articles/contrast/)

### Architecture Research
- [Kit Form Embedding Basics](https://help.kit.com/en/articles/4009572-form-embedding-basics)
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/)
- [Dark Mode CSS Comprehensive Guide 2026](https://618media.com/en/blog/dark-mode-with-css-a-comprehensive-guide/)
- [freeCodeCamp: Reusable HTML Components](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/)

### Pitfalls Research
- [NN/g: Dark Mode Users and Issues](https://www.nngroup.com/articles/dark-mode-users-issues/)
- [Smashing Magazine: Inclusive Dark Mode Design](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [W3C WCAG 2.2: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [BOIA: Dark Mode and Text Readability](https://www.boia.org/blog/dark-mode-can-improve-text-readability-but-not-for-everyone)
- [Google web.dev: Top Core Web Vitals](https://web.dev/articles/top-cwv)
- [Boldist: Over-Engineering vs Simplified Website Design](https://boldist.co/web-design/overengineering-vs-simplified-website-design/)
- [GetResponse: Best Lead Magnets Study](https://www.getresponse.com/blog/best-lead-magnets-study)
- [FTC: Business Coaching Scams](https://consumer.ftc.gov/articles/when-business-offer-or-coaching-program-scam)
- [Shopify: Coming Soon Page Examples](https://www.shopify.com/blog/coming-soon-page)

---

## Ready for Roadmap Planning

This research synthesis provides:
- Clear technology stack with rationale
- Prioritized feature list (table stakes, differentiators, anti-features)
- Architecture approach optimized for simplicity and performance
- Critical pitfalls identified with prevention strategies
- Suggested 5-phase roadmap structure with dependency logic
- Research flag for Phase 4 (Courses page strategy)
- Open questions requiring client decisions before build

**Recommended next step:** Use this summary to create detailed roadmap with Phase 1 starting point (Foundation + Content Strategy), ensuring Alan's content deliverables (photography, metrics, story, course topics) are secured before technical build begins.
