# Feature Landscape

**Domain:** Business education authority website (founder-led, scaling focus)
**Project:** Elevateo Co
**Researched:** 2026-02-11
**Overall confidence:** MEDIUM-HIGH

---

## Table Stakes

Features users expect. Missing any of these and the site looks amateur or untrustworthy to established business owners. These are non-negotiable for a credibility-first business education site targeting $500k-$1M+ owners.

| # | Feature | Why Expected | Complexity | Confidence | Notes |
|---|---------|-------------|------------|------------|-------|
| T1 | **Bold hero with specific promise** | Every reference site (acquisition.com, grantcardone.com, tonyrobbins.com) leads with a clear, outcome-oriented headline. "Do You Want to Scale Your Business?" (Hormozi). Visitors decide in 3-5 seconds whether to stay. | Low | HIGH | Must speak to the visitor's desired outcome, not describe what Elevateo is. "Scale past $1M" not "We teach business." |
| T2 | **Founder authority section with specific metrics** | Hormozi: "$250M+ portfolio revenue." Cardone: "$4.7B assets under management." Robbins: "50M+ people reached." Established business owners evaluate credibility through concrete numbers, not vague claims. Without metrics, the founder looks like another unproven coach. | Low | HIGH | Alan needs at minimum 2-3 verifiable metrics: revenue generated, businesses helped, years of experience, or similar. If metrics are modest, frame them honestly -- "helped 50+ businesses scale past $500k" beats vague "expert in scaling." |
| T3 | **Single, clear primary CTA per section** | acquisition.com: one "LEARN TO SCALE" button in hero. Every high-converting authority site has ONE action per viewport. Multiple competing CTAs dilute conversions. The user's own research confirms this pattern. | Low | HIGH | For v1 with no courses, every CTA points to email signup. "Get Scaling Insights" or "Join the Waitlist" -- one action, repeated. |
| T4 | **Email capture form (hero + footer minimum)** | The primary conversion mechanism for a pre-course site. Bare newsletter signups convert at ~2% of visitors. This is the only monetizable action at launch. Must be present in hero and repeated at page bottom. | Low | HIGH | Single field (email only). Name field reduces conversion 10-15%. Keep it minimal. |
| T5 | **Social proof section** | 92% of consumers read reviews/testimonials before purchasing. For business education, this means client results, testimonials with names and specifics, or media logos. Every reference site has at least one dedicated proof section. | Medium | HIGH | For v1, if client testimonials don't exist yet, use "as featured in" media logos (even podcast appearances count), specific result metrics, or partner logos. Empty testimonial sections are worse than no section at all. |
| T6 | **Professional founder photography** | Every reference site uses professional, high-quality founder imagery. Cardone: studio shots with premium lighting. Hormozi: professional portraits. Robbins: stage photography. Stock photos or amateur selfies immediately undercut authority positioning with a $500k+ audience. | Low (site-side) | HIGH | This is a content dependency, not a code dependency. Alan needs professional headshots and at least one "in-action" shot before launch. The site design should be built around professional image slots. |
| T7 | **Mobile-responsive design** | 60%+ of web traffic is mobile. acquisition.com, grantcardone.com, and tonyrobbins.com all have fully responsive layouts with mobile-specific breakpoints. A broken mobile experience is an instant credibility kill. | Medium | HIGH | Dark themes on mobile need extra attention -- contrast ratios, touch targets (44x44px minimum), readable text sizes. Test on actual devices. |
| T8 | **Dark, bold visual identity** | Non-negotiable per project brief. acquisition.com: black + purple. russellbrunson.com: black + gold. grantcardone.com: dark + green accents. This is the design language of the "premium authority" space. | Medium | HIGH | WCAG requires 4.5:1 contrast ratio minimum for text. Pure black (#000) causes eye strain and halation -- use dark grays (#0a0a0a to #1a1a1a) with off-white text (#f0f0f0 to #fafafa). Accent color needs to pass contrast on dark backgrounds. |
| T9 | **Clear navigation (5 items max)** | Research shows coaching sites should limit top-level nav to 5-7 items. "Coming soon" pages in nav are explicitly called out as an anti-pattern. For 3 pages (Home, About, Courses) plus CTA button, this is naturally clean. | Low | HIGH | Nav items: Home, About, Courses, CTA button. No dropdowns needed for v1. |
| T10 | **About page with founder story arc** | Every authority site has a compelling origin story. The pattern: "I was where you are" -> "I figured out X" -> "Now I help others do the same." This creates relatability and demonstrates expertise simultaneously. | Low-Medium | HIGH | Structure: Origin/struggle -> Discovery/transformation -> Current mission. Include timeline with concrete milestones. |
| T11 | **Fast page load (<3 seconds)** | Research confirms visitors abandon sites that take >3 seconds to load. Dark-themed sites with large hero images are particularly prone to bloat. Authority is undermined by poor performance. | Medium | HIGH | Optimize images (WebP format), minimize JavaScript, lazy-load below-fold content. Target Lighthouse score 90+. |
| T12 | **Footer with legal essentials** | acquisition.com includes: DMCA policy, disclaimers about results, copyright notice. Business education sites need earnings disclaimers ("Results not typical"). Absence looks legally naive to sophisticated business owners. | Low | HIGH | Include: copyright, privacy policy link, earnings disclaimer, contact info. |

---

## Differentiators

Features that set Elevateo Co apart. Not expected at launch, but create competitive advantage when present. Prioritized by impact relative to effort.

| # | Feature | Value Proposition | Complexity | Confidence | Notes |
|---|---------|-------------------|------------|------------|-------|
| D1 | **Free resource / lead magnet instead of bare email signup** | Data shows lead magnets double or triple email conversion rates vs. bare signup (3.83% to 7.73% on mobile). A PDF guide like "5 Scaling Bottlenecks Killing Your Growth" gives visitors immediate value and positions Alan as generous with knowledge (the Hormozi model). | Medium | HIGH | This is the single highest-impact differentiator for v1. Even a simple 3-5 page PDF dramatically increases signup rates. Project currently says "email signup" -- upgrading to lead magnet is the most impactful scope change possible. |
| D2 | **Problem/solution framework section** | acquisition.com and consulting.com both structure their homepages around the visitor's problem, not the company's features. "You're stuck at $500k because of X, Y, Z" then "Here's how we fix each one." This speaks directly to the target audience's pain. | Low-Medium | HIGH | Homepage section that names 3-4 specific scaling bottlenecks the audience faces. Makes the visitor feel understood. Far more effective than listing what Elevateo offers. |
| D3 | **Specific result metrics displayed prominently** | Hormozi: "$250M+ in annual revenue." Displayed as large, bold numbers. Cardone: "$4.7B in assets." These aren't hidden in paragraphs -- they're designed as visual callouts. Standalone metric displays create instant authority. | Low | HIGH | Design as a "numbers bar" or "stats strip" -- 3-4 metrics in large typography on dark background. E.g., "X+ businesses scaled | $XM+ revenue generated | X years experience | X industries." |
| D4 | **Course placeholder grid that builds anticipation** | Pre-launch course pages that tease content generate waitlist signups. The pattern: show course cards with titles, brief descriptions, and "Coming Soon -- Get Early Access" CTAs. This is explicitly better than empty pages or "under construction." | Medium | MEDIUM | Each card: course title, one-line description, topic icon or image, "Notify Me" CTA tied to email capture. 4-6 cards is the sweet spot -- enough to show breadth, few enough to feel curated. |
| D5 | **"How it works" process section** | Coaching sites that explain their methodology in 3-4 clear steps convert higher. "Step 1: Diagnose your bottleneck. Step 2: Get the playbook. Step 3: Execute with support." Makes the abstract tangible. | Low | MEDIUM | 3 steps with icons. Keep it simple. This bridges the gap between "I'm interested" and "I trust this enough to sign up." |
| D6 | **FAQ section with objection handling** | acquisition.com has an FAQ accordion on the homepage. FAQs that address "Is this for me?" and "Why should I trust you?" objections reduce bounce and support conversion. | Low | HIGH | 5-7 questions. Focus on the actual objections a $500k+ business owner has: "I've seen lots of coaches -- what's different?" "Is this for my industry?" "What if I don't have time?" |
| D7 | **Video embed (founder intro)** | russellbrunson.com has a sticky video player. tonyrobbins.com embeds video previews. A 60-90 second founder intro video creates "instant rapport" that text cannot. Coaching site research calls this "powerful" for trust building. | Medium | MEDIUM | Content dependency: Alan needs to record a video. Technically simple (embed YouTube/Vimeo). But only include if the video is high-quality -- a bad video is worse than no video. |
| D8 | **Animated scroll interactions** | grantcardone.com uses hover zoom effects, animated underlines, and scale transforms. Subtle scroll-triggered animations (fade-in, slide-up) make dark-themed sites feel premium rather than static. | Medium | MEDIUM | Use sparingly. The goal is "polished and alive," not "distracting." Fade-in on scroll for sections, subtle hover states on buttons and cards. |
| D9 | **"As featured in" media logo bar** | russellbrunson.com shows grayscale logos of Forbes, Entrepreneur, etc. Even podcast appearances or industry publications count. This is a visual shortcut for credibility that costs nothing to implement but requires real media presence. | Low | HIGH | Grayscale logos on dark background, 4-6 logos. If Alan has any media appearances, podcast features, or publication mentions, include them. If not, defer -- fake or irrelevant logos destroy credibility with sophisticated audiences. |
| D10 | **Cookie consent / GDPR compliance** | acquisition.com uses Cookiebot. Any site collecting emails needs consent management. For an audience of business owners, they notice and judge this. | Low | MEDIUM | Simple consent banner. Required for compliance, signals professionalism. |

---

## Anti-Features

Features to explicitly NOT build for v1. Common mistakes in business education sites that waste time, add complexity, or actively hurt conversion and credibility.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|-------------|-----------|-------------------|
| A1 | **Blog / content hub** | Project brief explicitly excludes this. More importantly, a blog with 2-3 posts looks worse than no blog. Authority content takes months to build. An empty blog section screams "abandoned side project" to a $500k+ business owner. | Defer entirely. When content strategy is ready, launch with 10+ posts or don't launch at all. |
| A2 | **Live chat / chatbot** | tonyrobbins.com has OpenWidget chatbot, but they have a support team. For a v1 authority site with no team, chat implies availability that doesn't exist. Unanswered chats are worse than no chat. | Contact form or email link in footer. Set expectations: "We respond within 24 hours." |
| A3 | **User accounts / login system** | No courses exist yet, so there's nothing to log into. Building auth infrastructure for an empty system wastes weeks. Every reference site only has accounts tied to actual purchasable products. | Build accounts when courses go live. The email list IS the user database for now. |
| A4 | **E-commerce / payment integration** | Cardone has Shopify integration, but he sells dozens of products. With zero products to sell, payment infrastructure is pure overhead. | Defer until there's something to sell. Email capture IS the conversion goal. |
| A5 | **Complex multi-level navigation / mega menus** | With 3 pages, adding dropdowns or mega menus is overengineering. Cardone's complex nav serves dozens of products. Elevateo has 3 pages. Complex nav on a small site signals "trying too hard." | Flat navigation: Home, About, Courses, CTA button. Clean, direct, no dropdowns. |
| A6 | **Popup modals for email capture** | Popup fatigue is real, especially with sophisticated audiences. Business owners hate popups. For v1, inline forms perform nearly as well without the annoyance factor. | Inline email capture in hero section and before footer. Less aggressive, same conversion path. |
| A7 | **Social media feed embeds** | grantcardone.com embeds Instagram feeds. These slow page load, require maintenance, and if posting is inconsistent, show stale content. They also pull visitors OFF the site to social platforms. | Social media icon links in footer only. Keep visitors on the site, not leaving to Instagram. |
| A8 | **Automated email sequences / CRM** | Project brief correctly scopes this out. Email automation is valuable but separate from the website build. Mixing website development with email marketing setup doubles the project scope. | Capture emails to a simple list (Mailchimp free tier, ConvertKit, etc.). Build automation later. |
| A9 | **Countdown timers / artificial scarcity** | Fake countdown timers are common on low-end coaching sites. Sophisticated $500k+ business owners see through this immediately. Hormozi notably avoids these -- his credibility comes from substance, not pressure tactics. | If there's a real deadline (course launch date), mention it in copy. No fake urgency. |
| A10 | **Excessive animations / parallax effects** | Dark themes with too many animations feel like a nightclub, not a business authority site. acquisition.com is actually quite restrained -- bold typography and contrast do the heavy lifting, not motion. | Subtle fade-ins on scroll, smooth hover states. The design should feel confident and still, not busy. |
| A11 | **"Coming soon" labels in navigation** | Explicitly called out as an anti-pattern in coaching website research. Empty pages linked from nav communicate "this site isn't finished." | The Courses page should exist and be functional -- it just shows upcoming course cards with "Get Early Access" CTAs rather than "Coming Soon" labels. |
| A12 | **Testimonial section without real testimonials** | Placeholder testimonials ("John D., CEO") or AI-generated quotes are instantly detectable by the target audience. An empty testimonial carousel is even worse. | If testimonials don't exist yet, use metric-based social proof (stats bar), media mentions, or skip the section entirely. Add real testimonials as they come in. |

---

## Feature Dependencies

Understanding what requires what, so the build order is correct.

```
CONTENT DEPENDENCIES (Alan must provide):
  Professional photography ──> Hero section, About page, all imagery
  Founder metrics/numbers ──> Stats bar, authority section
  Founder story narrative ──> About page content
  Lead magnet PDF (if D1) ──> Email capture upgrade
  Video recording (if D7) ──> Video embed section

TECHNICAL DEPENDENCIES:
  Dark design system (T8) ──> Every component inherits from this
  Email capture service setup ──> Email forms (T4), course notify CTAs (D4)
  Responsive framework (T7) ──> All page layouts

BUILD ORDER (features that must come first):
  T8 (design system) ──> T1, T2, T3, T9 (all visual components)
  T4 (email service) ──> D1 (lead magnet), D4 (course notifications)
  T6 (photography) ──> T1 (hero), T2 (authority), T10 (about page)

FEATURE GROUPS (build together):
  Homepage hero: T1 + T3 + T4 + T6
  Credibility strip: T2 + T5 + D3 + D9
  Homepage conversion: D2 + D5 + D6 + T3
  Course page: D4 + T4 (shared email capture)
  About page: T10 + T6 + T2 (shared metrics)
```

---

## MVP Recommendation

For Elevateo Co's v1, prioritize features that establish authority and capture emails. Everything else is premature.

**Must ship (Table Stakes):**
1. T1: Bold hero with specific promise
2. T2: Founder authority section with metrics
3. T3: Single CTA per section (all pointing to email)
4. T4: Email capture (hero + footer)
5. T6: Professional photography (content dependency)
6. T7: Mobile-responsive
7. T8: Dark, bold design system
8. T9: Clean navigation
9. T10: About page with story arc
10. T11: Fast loading
11. T12: Footer with legal essentials

**Should ship (high-impact differentiators):**
1. D1: Lead magnet (doubles email conversion -- highest ROI feature)
2. D2: Problem/solution framework on homepage
3. D3: Metrics displayed as visual callouts
4. D4: Course placeholder grid with "Get Early Access" CTAs
5. D6: FAQ section with objection handling

**Nice to have (defer if timeline is tight):**
1. D5: "How it works" process section
2. D8: Subtle scroll animations
3. D9: Media logo bar (only if Alan has real mentions)
4. D10: Cookie consent

**Defer to post-v1:**
- D7 (video) -- content dependency, only if high-quality video exists
- A1 through A12 -- all anti-features remain deferred

---

## Content Gaps That Block Features

These are not code decisions but content decisions that Alan must resolve before certain features can ship.

| Content Needed | Blocks Feature | Priority | Notes |
|---------------|----------------|----------|-------|
| Professional headshots + action photos | T1, T6, T10 | CRITICAL | Cannot launch without. Book photographer immediately. |
| 2-3 verifiable authority metrics | T2, D3 | CRITICAL | Revenue, businesses helped, years, or similar. Must be real. |
| Founder story narrative (500-800 words) | T10 | HIGH | Origin -> transformation -> mission arc. |
| 3-4 pain points of target audience | D2 | HIGH | Specific scaling bottlenecks the $500k+ audience faces. |
| 5-7 FAQ questions and answers | D6 | MEDIUM | Address real objections. |
| Lead magnet content (if D1) | D1 | MEDIUM | 3-5 page PDF on a specific scaling topic. |
| Course topic names and descriptions | D4 | MEDIUM | Even placeholder titles need to be credible topic names. |
| Client testimonials (if available) | T5 | MEDIUM | Real names, specific outcomes. If none exist, use alternative proof. |
| Media mentions / logos (if available) | D9 | LOW | Only include if real. Skip if fabricated. |

---

## Sources

### Primary (HIGH confidence)
- acquisition.com homepage analysis via direct fetch -- confirmed features: hero with revenue metrics, free course cards, FAQ accordion, founder bio with audience metrics, announcement banner, footer disclaimers
- grantcardone.com homepage analysis via direct fetch -- confirmed features: multiple lead capture forms, Instagram embeds, Shopify integration, animated interactions, social proof badges
- tonyrobbins.com homepage analysis via direct fetch -- confirmed features: event-focused homepage, video previews, HubSpot forms, Calendly integration, Next.js framework, chatbot widget
- russellbrunson.com homepage analysis via direct fetch -- confirmed features: dark + gold design, sticky video player, grayscale logo bar, Montserrat typography, premium CTA styling

### Secondary (MEDIUM confidence)
- [Top 10 Best Coaching Websites of 2026](https://www.gregfaxon.com/blog/coaching-websites) -- coaching website must-have elements
- [Top 10 Coaching Website Mistakes to Avoid](https://coachingsitesthatwork.com/10-coaching-website-mistakes/) -- anti-patterns for coaching sites
- [Lead Magnet Statistics](https://mycodelesswebsite.com/lead-magnet-statistics/) -- conversion rate data for lead magnets vs. bare signups
- [Landing Page Best Practices 2026](https://www.involve.me/blog/landing-page-best-practices) -- current conversion optimization patterns
- [Dark Mode Accessibility](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements) -- WCAG contrast requirements for dark themes
- [WCAG Contrast Requirements](https://webaim.org/articles/contrast/) -- 4.5:1 ratio requirements

### Tertiary (LOW confidence -- for context only)
- [20 Best Business Coaching Websites 2026](https://www.cyberoptik.net/blog/20-best-business-coaching-websites/) -- general coaching site trends
- [Social Proof Examples](https://socialproofexamples.com/) -- social proof pattern catalog
- [Pre-launching Your Online Course](https://www.podia.com/articles/pre-launching-online-course) -- course placeholder strategies
