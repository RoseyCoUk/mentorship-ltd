# Domain Pitfalls

**Project:** Elevateo Co -- Business Education Authority Website
**Domain:** Business education / personal brand authority site targeting established business owners
**Researched:** 2026-02-11
**Overall Confidence:** MEDIUM-HIGH (synthesis of multiple verified sources, domain-specific reasoning)

---

## Critical Pitfalls

Mistakes that undermine the entire project's credibility or require significant rework. Any one of these can make the difference between a site that converts and one that repels the target audience.

---

### CRITICAL 1: The Empty Authority Paradox

**What goes wrong:** The site claims "we teach business owners how to scale" but has no courses, no blog, no case studies, no free content, and no proof of results. The visitor sees a well-designed shell with nothing inside. For a sophisticated audience of established business owners already generating $500K-$1M+, this immediately triggers "all sizzle, no steak" pattern recognition. These people evaluate dozens of coaches and consultants. An authority site without demonstrated authority is worse than no site at all -- it actively signals incompetence.

**Why it happens:** The project is greenfield. Courses do not exist yet. The founder may not have public track record artifacts (published content, speaking clips, podcast appearances, case studies). The team builds the "container" first and plans to fill it later, but the container alone creates a credibility gap.

**Consequences:**
- Sophisticated visitors bounce immediately, perceiving the site as a wannabe operation
- Email signup rates collapse because there is no demonstrated value to anticipate
- The site becomes a liability rather than an asset -- it actively damages brand perception
- Once a visitor forms a negative first impression, they rarely return

**Warning signs:**
- The courses page is entirely "Coming Soon" placeholders with no substance
- The about page has generic claims without specific, verifiable accomplishments
- No free value exists anywhere on the site (no insights, no frameworks, no proof of thinking)
- The CTA asks visitors to "stay updated" without showing what they would be updated about

**Prevention strategy:**
1. **Do NOT launch a courses page that is just empty cards saying "Coming Soon."** Instead, reframe the courses page as a "curriculum roadmap" or "what we teach" page that describes the frameworks and topics with enough depth to demonstrate expertise, even before video content exists. Show the thinking, not just the packaging.
2. **Build credibility proof into Phase 1.** Alan Chan's about page must include specific, verifiable credentials: revenue numbers, businesses built, years of experience, specific outcomes achieved. Vague claims like "serial entrepreneur" mean nothing to this audience.
3. **Include at least one piece of substantive free content at launch.** Even a single well-written framework page ("The 5 Levers of Business Scale") demonstrates more authority than a polished empty site. This is not a blog -- it is a proof-of-competence artifact.
4. **Use the email signup to promise specific value.** Not "Sign up for updates" but "Get our weekly scaling insight" or "Be first to access [specific course name]." Specificity signals substance.

**Which phase should address it:** Phase 1 (Foundation). This is not a "nice to have" -- it is structurally required for the site to function as intended. The site architecture must be designed around this constraint from day one.

**Confidence:** HIGH -- Multiple sources confirm that authority sites without demonstrated content create credibility gaps. Research from Search Engine Land, NN/g, and others consistently shows that E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) requires demonstrated knowledge, not just claimed knowledge. The FTC specifically flags coaching sites with claims but no substance as a consumer warning signal.

---

### CRITICAL 2: Dark Design That Kills Readability

**What goes wrong:** The team builds a dark, bold aesthetic inspired by acquisition.com but gets the execution wrong. Text becomes hard to read. Eye strain sets in. The site feels oppressive rather than authoritative. Visitors leave not because the content is bad, but because the experience of consuming it is physically uncomfortable.

**Why it happens:** Dark design is deceptively difficult. acquisition.com uses deep purple (#6F00FF) with dark navy (#131628) plus strategic white space and neutral whites -- it is NOT a pure black background with white text. Most dark design attempts fail because they:
- Use pure black (#000000) instead of dark grays/navies (causes eye strain and "halation" effect)
- Get contrast ratios wrong (either too low for readability or too high for comfort)
- Use thin/light font weights that disappear on dark backgrounds
- Apply saturated colors that vibrate against dark backgrounds
- Forget that images, icons, and UI elements all need dark-specific treatment

**Consequences:**
- Users with astigmatism (roughly 33% of the population) experience halation -- white text appears to bleed into dark backgrounds, making text fuzzy
- Extended reading becomes fatiguing, which is death for a content/education site
- Accessibility violations (WCAG 2.1 AA requires 4.5:1 contrast for normal text, 3:1 for large text)
- The site feels "edgy startup" rather than "established authority" -- exactly the wrong signal for the target audience

**Warning signs:**
- Body text uses font-weight 300 or 400 on dark backgrounds
- Background color is #000000 or very close to pure black
- Accent colors are highly saturated (pure red, pure blue) on dark backgrounds
- No testing has been done in bright ambient lighting conditions
- Text sections feel tiring to read after 30 seconds

**Prevention strategy:**
1. **Use dark gray or dark navy, never pure black.** acquisition.com uses #131628 (dark navy). Good alternatives: #121212, #1A1A2E, #0D1117. The slight warmth or color prevents the harsh contrast that causes halation.
2. **Use off-white for body text, not pure white.** #E0E0E0 or #F5F5F5 on dark backgrounds is more comfortable than #FFFFFF. Reserve pure white for headings only.
3. **Increase font weight on dark backgrounds.** Body text should be font-weight 400 minimum, with 500 preferred for paragraphs. Thin weights (300) that look elegant on white backgrounds become illegible on dark.
4. **Use desaturated accent colors.** Instead of pure red (#FF0000), use a muted variant. acquisition.com uses #F1283A -- slightly desaturated. Test every color pairing with WebAIM's contrast checker.
5. **Test in multiple lighting conditions.** Dark design looks different in a dim room vs. a bright office vs. outdoor mobile use. Test all three.
6. **Apply generous line-height and letter-spacing.** Dark backgrounds require more breathing room in typography. Line-height 1.6-1.8 for body text (vs. 1.4-1.5 on light backgrounds).
7. **Handle images deliberately.** Every image needs dark-mode-appropriate treatment. Transparent PNGs may need background adjustments. Photos may need slight opacity or overlay treatment to integrate.

**Which phase should address it:** Phase 1 (Foundation) -- establish the design system with correct dark palette, typography scales, and contrast ratios before any pages are built. Create a "dark design tokens" system that enforces correct values.

**Confidence:** HIGH -- NN/g research, Smashing Magazine, WCAG specifications, and BOIA all provide detailed technical guidance on dark mode failures. The halation problem is well-documented in vision science. acquisition.com's actual color values were extracted via WebFetch.

---

### CRITICAL 3: Over-Engineering a Marketing Site

**What goes wrong:** A developer builds a 3-page marketing site with the architecture of a SaaS application. React component libraries, state management, API layers, authentication scaffolding, database schemas -- all for what is fundamentally a brochure site with an email form. The result: a site that takes weeks to build instead of days, is fragile and hard to update, performs poorly because of JavaScript bundle size, and creates technical debt before there is any technical value.

**Why it happens:** Developers (and AI assistants) default to their comfort zone: building applications. But this project has three static pages, one email capture form, and no user accounts, no payments, no dynamic content, and no database reads. The "just in case we need it later" mentality introduces complexity that slows everything down.

**Consequences:**
- Build time expands from 1-2 weeks to 4-8 weeks
- JavaScript bundle bloat kills Core Web Vitals (LCP, INP) -- Google penalizes this
- Non-technical founder cannot update content without developer involvement
- Hosting becomes unnecessarily complex and expensive
- The site is optimized for developer comfort, not business outcomes

**Warning signs:**
- State management library (Redux, Zustand) in a site with no interactive state
- API routes for a site that only talks to a third-party email service
- Database setup for a site with no user-generated data
- Component library with 50+ components for 3 pages
- Build process takes more than 30 seconds
- "We might need this later" justifying any technical decision

**Prevention strategy:**
1. **Match architecture to actual requirements.** Three static pages + email capture = static site or simple framework with static export. Not a full-stack application.
2. **Use the simplest technology that solves the problem.** HTML/CSS/JS with a build tool, or Next.js with static export, or Astro. The email form hits a third-party API (Mailchimp, ConvertKit, etc.) directly. No backend needed.
3. **Define "not yet" boundaries explicitly.** User accounts, payments, course hosting, CMS -- these are all future concerns. Do not scaffold for them. When they are needed, the architecture should be flexible enough to add them, but not pre-built.
4. **Set a complexity budget.** If any single technical decision takes more than 2 hours to implement for a 3-page site, it is over-engineered. Apply this test rigorously.
5. **Prioritize content editability over developer ergonomics.** If the founder cannot change text on the site without a code deployment, the architecture is wrong for this stage.

**Which phase should address it:** Phase 1 (Foundation) and every phase thereafter. The technology choice in Phase 1 sets the ceiling for complexity. Choose wrong and every subsequent phase inherits the overhead.

**Confidence:** HIGH -- Standard software engineering principle. Boldist's research on over-engineered websites specifically addresses marketing sites. Google's Core Web Vitals data shows JavaScript-heavy sites consistently underperform static sites.

---

## Serious Pitfalls

Mistakes that cause significant wasted effort, missed conversions, or require substantial rework.

---

### SERIOUS 1: Email Capture Without a Reason to Subscribe

**What goes wrong:** The site has an email form that says "Subscribe for updates" or "Join our newsletter." Conversion rates hover at 1-2% because there is no compelling reason for a busy, successful business owner to give up their email. These people are already drowning in email. "Updates" from an unknown brand is not a value proposition.

**Why it happens:** The project explicitly decided against a lead magnet ("Email signup over lead magnet -- simpler to launch, captures interest without needing to create a free resource first"). This is understandable for launch speed, but the data is clear: lead magnets produce 2-4x higher conversion rates than generic newsletter signups. Without a lead magnet, the email form without a lead magnet converts at roughly 1.8-3.8%, while with a lead magnet it converts at 4.7-7.7%.

**Consequences:**
- Email list grows slowly (hundreds of visits yield single-digit signups)
- Cost per lead from any paid traffic becomes unsustainable
- The site's primary conversion goal (email capture) underperforms
- Months pass before the list is large enough to launch courses to

**Warning signs:**
- CTA copy is generic ("Subscribe," "Sign Up," "Stay Updated")
- No description of what the subscriber will receive
- No frequency promise (weekly? monthly? when courses launch?)
- No value preview (what kind of insights? what topics?)

**Prevention strategy:**
1. **If no lead magnet, make the newsletter itself the product.** Give it a name. Describe what subscribers get. "The Scale Letter: One actionable scaling insight every Tuesday" is 10x better than "Subscribe for updates." Acquisition.com does not use a generic "newsletter" -- they offer specific tools like "Get My Custom Scaling Roadmap."
2. **Consider a minimal lead magnet even for v1.** A single PDF ("The 3 Mistakes Business Owners Make When Trying to Scale Past $1M") takes 2-4 hours to create and can double conversion rates. This is not a course -- it is a one-page insight document.
3. **Use specificity to create urgency.** "Be the first to access our scaling frameworks when they launch" with a specific course name or topic is better than vague future promises.
4. **Add social proof to the signup form.** Even at launch: "Join 47 business owners already on the list" (real number, even if small) or "From the team building [specific thing]."

**Which phase should address it:** Phase 1 (Foundation) for the form design and copy. Should be revisited in Phase 2 with conversion data to decide whether a lead magnet is needed.

**Confidence:** HIGH -- Conversion rate data from GetResponse study, Encharge research, and Getsitecontrol A/B tests all show 2-4x improvement with lead magnets. Klipfolio benchmarks confirm 2%+ ECR as "healthy."

---

### SERIOUS 2: Copying acquisition.com's Aesthetic Without Its Substance

**What goes wrong:** The team replicates the dark, bold visual style of acquisition.com but misses what actually makes that site work. acquisition.com is not successful because of its dark color scheme -- it is successful because it backs its design with: $250M+ portfolio revenue, 12M+ audience, two bestselling books, $46.2M exit, and selective "minimum entry requirements." The design amplifies credibility that already exists. Without that substance, the same design signals "trying too hard."

**Why it happens:** Inspiration becomes imitation. The visual surface is easy to copy; the underlying authority is not. A new brand with no track record using the same visual language as a $250M portfolio company creates a dissonance that sophisticated visitors detect immediately.

**Consequences:**
- The site looks like a knockoff rather than an original
- Visitors who know acquisition.com (likely, given the target audience) see the imitation and lose trust
- The "premium" design without premium proof creates cognitive dissonance
- The brand starts life as a derivative rather than a distinct entity

**Warning signs:**
- Layout, color scheme, and typography are nearly identical to acquisition.com
- Using "portfolio" language without a portfolio
- Revenue claims or numbers that cannot be verified
- Design sophistication far exceeds content sophistication

**Prevention strategy:**
1. **Extract principles, not pixels.** From acquisition.com, take: dark backgrounds, bold typography, generous whitespace, clean hierarchy, restraint over excess. Do NOT take: their exact color palette, their layout structure, their specific UI patterns.
2. **Develop a distinct visual identity within the dark/bold category.** Different primary accent color (not purple). Different typography (not Poppins). Different layout patterns. The aesthetic category can be shared; the execution must be original.
3. **Scale credibility signals to what is real.** If Alan Chan has built 3 businesses, say that -- do not imply a $250M portfolio. If the audience is small, do not fake scale. Authenticity resonates more with sophisticated audiences than inflated claims.
4. **Let the content earn the design.** A slightly less polished site with genuine insights feels more credible to established business owners than a pixel-perfect site with nothing behind it.

**Which phase should address it:** Phase 1 (Foundation) design system. The design should be inspired-by, not copied-from. This decision must be made before any pages are built.

**Confidence:** MEDIUM-HIGH -- Based on analysis of acquisition.com's actual design tokens (fetched via WebFetch), branding research, and FTC warnings about business coaching credibility. The "copying without substance" pattern is well-documented in brand strategy literature.

---

### SERIOUS 3: Mobile Experience Afterthought on a Visually Heavy Site

**What goes wrong:** The desktop experience is designed first with large hero images, bold typography, dramatic spacing, and visual flourishes. Then mobile "adaptation" squishes everything into a narrow viewport. Hero images lose their impact. Typography that looked commanding at 66px becomes either too large (taking up multiple screens) or too small (losing its authority). Dark backgrounds with insufficient contrast become even harder to read on mobile screens in varying lighting conditions.

**Why it happens:** Bold, dark, visually-driven design is inherently desktop-first in its aesthetic instincts. Designers and developers optimize for the impressive wide-screen view and treat mobile as a compromise. But 60%+ of web traffic is mobile, and business owners often browse on their phones between meetings.

**Consequences:**
- More than half of visitors see a degraded experience
- Mobile Core Web Vitals fail (large images not optimized for mobile, layout shifts)
- Dark theme readability problems are amplified on smaller screens and outdoor lighting
- The site that looks "bold and authoritative" on desktop looks "cramped and hard to read" on mobile
- Google's mobile-first indexing penalizes sites with poor mobile experience

**Warning signs:**
- Hero section requires scrolling past 2+ full mobile screens before reaching content
- Body text is smaller than 16px on mobile
- Images are served at desktop resolution to mobile devices
- Touch targets (buttons, links) are smaller than 44x44px
- No testing done on actual mobile devices in bright light

**Prevention strategy:**
1. **Design mobile-first, then scale up to desktop.** This is counterintuitive for a "bold" design, but ensures the core experience works everywhere. Desktop becomes the enhancement, not the default.
2. **Create mobile-specific typography scales.** Desktop h1 at 48-66px might need to be 28-36px on mobile. Body text minimum 16px on mobile (prevents iOS zoom issues). Test readability on an actual phone held at arm's length.
3. **Serve responsive images.** Use srcset and sizes attributes. A 2000px hero image served to a 375px phone is a performance disaster. Serve appropriately sized images for each breakpoint.
4. **Test dark design on mobile specifically.** Dark backgrounds on OLED vs LCD screens look very different. Test on both iPhone (OLED) and budget Android (LCD) in bright outdoor conditions.
5. **Set performance budgets for mobile.** Target: LCP under 2.5s on 4G connection, Total page weight under 1.5MB on mobile, no layout shifts after initial render.

**Which phase should address it:** Phase 1 (Foundation) -- responsive design is not a "later" concern. Every component must be built responsive from the start. Retrofitting responsive design is 3-5x more expensive than building it in.

**Confidence:** HIGH -- Google Web Vitals documentation, mobile traffic statistics, and dark mode accessibility research all support these findings. WCAG 2.1 mobile accessibility guidelines are well-established.

---

### SERIOUS 4: The "Under Construction" Perception

**What goes wrong:** Despite having a fully structured site (Home, About, Courses), the courses page communicates "we are not ready yet" rather than "something valuable is coming." Sophisticated business owners interpret "coming soon" as "this person has not done the work yet" or "this might never launch." The site feels like a construction zone rather than a deliberate pre-launch.

**Why it happens:** The courses page exists because the site "needs" one for navigation completeness, but there is no course content to show. Placeholder cards with "Coming Soon" badges are the path of least resistance. The problem is that this pattern is associated with abandoned projects, vaporware, and amateur operations.

**Consequences:**
- Visitors question whether the brand is legitimate
- The "coming soon" page becomes a reason NOT to sign up (why give my email to something that might not happen?)
- The page adds zero value to the visitor's experience
- It becomes the weakest link in an otherwise polished site

**Warning signs:**
- Course cards are visually identical empty shells with only titles and "Coming Soon"
- No timeline, no content preview, no curriculum detail
- The page could be removed and the site would not lose any value
- Visitors have no reason to return to this page

**Prevention strategy:**
1. **Reframe from "coming soon" to "what we teach."** Instead of empty course cards, create a curriculum overview page that describes the topics, frameworks, and outcomes. "What You Will Learn" is forward-looking and authoritative. "Coming Soon" is passive and uncertain.
2. **Add depth to each topic area.** For each planned course, write 2-3 paragraphs about the problem it solves, who it is for, and what the outcome will be. This demonstrates expertise even without the video content.
3. **Include a timeline only if you can commit to it.** "Q2 2026" is better than "Coming Soon" but only if it is real. A missed timeline is worse than no timeline.
4. **Use the page to drive email signups.** "Get early access to [Course Name] when it launches" with topic-specific signup is more compelling than a generic newsletter form.
5. **Consider launching with only Home + About if courses are not close to ready.** A focused two-page site that does two things well is better than a three-page site where one page undermines credibility.

**Which phase should address it:** Phase 1 (Foundation) -- the courses page architecture and content strategy must be resolved before build, not during.

**Confidence:** HIGH -- Shopify and LaunchBoom research on pre-launch pages, combined with FTC consumer guidance on evaluating business coaching sites, confirm that empty "coming soon" patterns damage credibility with sophisticated audiences.

---

## Moderate Pitfalls

Mistakes that cause delays, reduce effectiveness, or create avoidable technical debt.

---

### MODERATE 1: Performance Death by Visual Boldness

**What goes wrong:** The bold design aesthetic leads to large hero images, background videos, custom fonts, animations, and visual effects that tank page load performance. A 5MB hero image. Three custom font files. Parallax scrolling JavaScript. The site looks stunning on the developer's fast connection and takes 8 seconds to load on a visitor's mobile connection.

**Prevention:**
- Set hard performance budget: total page weight under 2MB, LCP under 2.5s, no render-blocking resources
- Use modern image formats (WebP, AVIF) with lazy loading for below-fold content
- Limit custom fonts to 2 families maximum, use font-display: swap
- Replace JavaScript animations with CSS transforms and opacity transitions (GPU-accelerated, do not trigger layout)
- Use responsive images (srcset) to serve appropriate sizes per device
- Test on throttled connections (Chrome DevTools "Slow 3G" profile)
- Core Web Vitals are a Google ranking factor -- failing them means less organic traffic

**Which phase should address it:** Phase 1 (Foundation) for the performance budget and image pipeline. Phase 2 for monitoring and optimization.

---

### MODERATE 2: Speaking Down to the Audience

**What goes wrong:** The site copy uses beginner-level language and concepts that insult the intelligence of established business owners. "Do you want to grow your business?" is patronizing to someone already running a $500K+ operation. "Learn the basics of sales" repels someone with a decade of sales experience. The copy signals that this education is for beginners, not for the sophisticated target audience.

**Prevention:**
- Write copy that acknowledges where the audience already is: "You have built a successful business. Now you need to scale it past the ceiling you have hit."
- Use specific, advanced terminology appropriate for experienced operators: "unit economics," "customer acquisition cost," "operational leverage" -- not "how to find customers"
- Reference problems specific to the $500K-$1M+ stage: hiring challenges, systems breaking at scale, founder bottleneck, margin compression
- Have an actual established business owner read the copy before launch. If they feel talked down to, rewrite.
- Study acquisition.com's language: they speak as peers to business owners, not as teachers to students

**Which phase should address it:** Phase 1 (Foundation) -- copy is a Phase 1 deliverable and must be validated against the target audience.

---

### MODERATE 3: Navigation Complexity for a Simple Site

**What goes wrong:** A three-page site gets a complex navigation structure: dropdown menus, mega-nav, sub-pages, footer navigation maps. This communicates "we are trying to look bigger than we are" -- exactly the wrong signal for a new brand targeting perceptive business owners. Alternatively, including navigation items for sections that do not exist yet (Resources, Blog, Community, Events) creates broken links or stub pages.

**Prevention:**
- Three pages = three nav items. Home, About, Courses (or whatever the reframed courses page becomes). Plus one prominent CTA button.
- No dropdown menus. No sub-navigation. No footer sitemap.
- Do NOT add nav items for pages that do not exist yet. A navigation with "Blog (Coming Soon)" and "Resources (Coming Soon)" screams amateur.
- Look at acquisition.com: clean, minimal navigation despite being a much larger site. The navigation matches the actual content.
- Add nav items only when the pages behind them have real, substantial content.

**Which phase should address it:** Phase 1 (Foundation) -- navigation is part of the site shell.

---

### MODERATE 4: Analytics and Conversion Tracking Gaps

**What goes wrong:** The site launches without proper analytics, and the team cannot answer basic questions: How many people visit? Where do they come from? How many sign up for email? Where do they drop off? Which page converts best? Without data, every future decision is a guess.

**Prevention:**
- Install analytics before launch (Google Analytics 4 or privacy-focused alternative like Plausible/Fathom)
- Set up conversion tracking for the email signup form (event tracking, not just pageviews)
- Track scroll depth on key pages (do visitors read the about page or bounce from the hero?)
- Set up UTM parameter tracking for any traffic sources
- Create a simple dashboard with key metrics: visits, email signups, conversion rate by page, device split
- This takes 1-2 hours to set up. Not doing it wastes weeks of visitor data.

**Which phase should address it:** Phase 1 (Foundation) -- must be in place at launch, not added after.

---

### MODERATE 5: Ignoring SEO Because "It is Just a Marketing Site"

**What goes wrong:** The team assumes SEO does not matter for a three-page marketing site. No meta titles, no descriptions, no structured data, no sitemap, no semantic HTML. The site is invisible to search engines. When potential visitors search "business scaling education" or "how to scale past $1M," Elevateo does not appear.

**Prevention:**
- Every page needs a unique, keyword-informed title tag and meta description
- Use semantic HTML (h1, h2, h3 hierarchy, not styled divs)
- Create and submit a sitemap.xml
- Add structured data (Organization, Person for Alan Chan, potentially Course schema for the curriculum page)
- Ensure proper heading hierarchy (one h1 per page, logical h2/h3 nesting)
- Set up Google Search Console at launch
- Even for a small site, basic SEO takes 2-3 hours and compounds over time

**Which phase should address it:** Phase 1 (Foundation) -- SEO foundations are built into the HTML structure, not bolted on later.

---

## Minor Pitfalls

Mistakes that cause friction or missed opportunities but are straightforward to fix.

---

### MINOR 1: Social Proof Chicken-and-Egg Problem

**What goes wrong:** The site has no testimonials, no client logos, no case study numbers because it is a new brand. Sections reserved for social proof sit empty or are filled with generic stock quotes.

**Prevention:**
- Do not include empty testimonial sections. A "Testimonials" section with no testimonials is worse than no section at all.
- Use what exists: Alan Chan's personal track record, businesses built, specific results achieved
- If there are no third-party endorsements yet, lead with credentials and specific claims that can be verified ("Built 3 businesses to $X revenue" rather than a testimonial from a client)
- Plan to add real testimonials as soon as they exist (Phase 2+)
- Consider LinkedIn recommendations or professional endorsements as interim social proof

---

### MINOR 2: Form Friction in the Email Signup

**What goes wrong:** The email signup form asks for too much information (first name, last name, company, revenue, phone number) when all that is needed is an email address. Every additional field reduces conversion rates by approximately 11%.

**Prevention:**
- v1 form: email only. One field. One button.
- If segmentation is needed later, use progressive profiling (ask for more info after signup, in follow-up emails)
- Button text should be specific and action-oriented ("Get Early Access" or "Join the Scale Letter") not generic ("Submit" or "Sign Up")
- Place the form above the fold on the home page and at the bottom of every page

---

### MINOR 3: Inconsistent Dark Design Across All States

**What goes wrong:** The main pages look great in dark mode, but error states, loading states, form interactions, success messages, and tooltips revert to light-mode styling. A white flash when a form submits, a light-background toast notification, or a default browser-styled input field breaks the immersion.

**Prevention:**
- Audit every interaction state: form focus, form error, form success, button hover, button active, link hover, scroll indicators, loading spinners
- Style all browser defaults (input focus rings, selection highlight, scrollbar)
- Ensure third-party embeds (email form widgets) match the dark theme, or use API-based integrations that can be styled
- Create a checklist of every interactive state and verify dark styling for each

---

### MINOR 4: Missing Favicon and Open Graph Metadata

**What goes wrong:** The site looks professional on-page but shows a blank icon in browser tabs and generic previews when shared on LinkedIn or in text messages. For a brand targeting business owners who network digitally, every shared link is a branding opportunity.

**Prevention:**
- Create a favicon set (16x16, 32x32, apple-touch-icon) in dark-compatible format
- Set up Open Graph tags (og:title, og:description, og:image) for every page
- Create a branded social sharing image (1200x630px) that looks good on dark and light social media feeds
- Test link previews in LinkedIn, Twitter/X, and iMessage before launch

---

## Phase-Specific Warning Matrix

| Phase Topic | Likely Pitfall | Severity | Mitigation |
|---|---|---|---|
| Foundation: Design System | Dark palette that kills readability | CRITICAL | Establish color tokens with verified contrast ratios before building any pages |
| Foundation: Site Architecture | Over-engineering (SaaS patterns for a brochure site) | CRITICAL | Choose static-first architecture, enforce complexity budget |
| Foundation: Courses Page | Empty "Coming Soon" page that damages credibility | SERIOUS | Reframe as curriculum/topic overview with substantive content |
| Foundation: Copy | Generic language that insults sophisticated audience | SERIOUS | Write for $500K+ business owners, not beginners. Peer tone, not teacher tone |
| Foundation: Email Capture | "Subscribe for updates" with no compelling reason | SERIOUS | Name the newsletter, describe specific value, consider minimal lead magnet |
| Foundation: Mobile | Desktop-first dark design that breaks on mobile | SERIOUS | Mobile-first responsive approach, test dark theme on actual devices |
| Foundation: Performance | Heavy visuals that tank load times | MODERATE | Performance budget, modern image formats, CSS-only animations |
| Foundation: Analytics | Launching without conversion tracking | MODERATE | GA4 or equivalent + form submission tracking before launch |
| Foundation: SEO | No meta tags, no semantic HTML, no sitemap | MODERATE | Basic SEO checklist as part of launch requirements |
| Post-Launch: Identity | Looking like an acquisition.com clone | SERIOUS | Distinct color palette, typography, and layout within dark/bold category |

---

## Key Insight: The "Sophistication Mismatch" Meta-Pitfall

The single most dangerous pattern across all these pitfalls is the **sophistication mismatch**: building a site that looks premium but feels hollow to the exact audience it targets.

Established business owners making $500K-$1M+ are the most discerning audience in the business education space. They have:
- Evaluated dozens of coaches, courses, and consultants
- Built real businesses and can distinguish substance from performance
- Limited time and zero patience for empty promises
- High pattern-recognition for "guru" red flags (big claims, no proof, slick design, no substance)

Every pitfall above is a manifestation of this meta-pitfall. The solution is consistent: **substance before style, proof before polish, specificity before scale.**

The site does not need to be perfect. It needs to be honest about where it is, specific about what it offers, and genuinely useful to the visitor -- even before courses exist.

---

## Sources

### Verified (HIGH confidence)
- [NN/g: Dark Mode Users and Issues](https://www.nngroup.com/articles/dark-mode-users-issues/) -- Dark mode usability research
- [Smashing Magazine: Inclusive Dark Mode Design](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) -- Technical dark mode implementation
- [W3C WCAG 2.2: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) -- Accessibility contrast requirements
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/) -- WCAG contrast guidance
- [BOIA: Dark Mode and Text Readability](https://www.boia.org/blog/dark-mode-can-improve-text-readability-but-not-for-everyone) -- Accessibility research on dark mode
- [Google web.dev: Top Core Web Vitals](https://web.dev/articles/top-cwv) -- Performance optimization
- [MDN: Color Contrast Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast) -- Technical contrast guidance
- acquisition.com design analysis via direct WebFetch -- Color palette, typography, design patterns

### Verified (MEDIUM confidence)
- [Boldist: Over-Engineering vs Simplified Website Design](https://boldist.co/web-design/overengineering-vs-simplified-website-design/) -- Over-engineering marketing sites
- [Vareweb: The Dark Side of Dark Mode](https://vareweb.com/blog/the-dark-side-of-dark-mode-in-web-design/) -- Dark mode pitfalls
- [GetResponse: Best Lead Magnets Study](https://www.getresponse.com/blog/best-lead-magnets-study) -- Lead magnet conversion data
- [Encharge: Lead Magnet Data](https://encharge.io/lead-magnet-examples/) -- Email conversion rate benchmarks
- [Getsitecontrol: Email Popup Signup Rates](https://getsitecontrol.com/blog/email-popup-signup-rates-test/) -- A/B test data on signup forms
- [Search Engine Land: Thought Leadership Content](https://searchengineland.com/guide/thought-leadership-content) -- E-E-A-T and authority content
- [FTC: Business Coaching Scams](https://consumer.ftc.gov/articles/when-business-offer-or-coaching-program-scam) -- Consumer trust signals for coaching sites
- [Shopify: Coming Soon Page Examples](https://www.shopify.com/blog/coming-soon-page) -- Pre-launch page best practices
- [LaunchBoom: Pre-launch Landing Pages](https://www.launchboom.com/crowdfunding-tips/best-pre-launch-landing-page-examples) -- Pre-launch conversion strategies

### Informing Context (LOW confidence -- used for pattern identification, not specific claims)
- Various WebSearch results on personal branding, authority building, and high-ticket sales patterns
- Community discussions on over-engineering marketing sites
