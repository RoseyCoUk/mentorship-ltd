# Phase 3: About Page - Research

**Researched:** 2026-02-12
**Domain:** Founder story arc, philosophy section, and email signup for authority business coaching site built on Astro 5.x + Tailwind CSS 4.x
**Confidence:** HIGH

## Summary

Phase 3 transforms the existing placeholder `about.astro` into a complete about page with three requirements: a founder story arc (ABOUT-01), a philosophy/differentiation section (ABOUT-02), and an email signup form (ABOUT-03). Research covered four domains: founder narrative structure for coaching/authority sites, about page section architecture, email form reuse patterns in Astro, and pre-existing codebase issues that should be resolved in this phase.

The existing `about.astro` already has a basic structure (hero, founder section with photo placeholder + bio, philosophy section) but it does not follow the required story arc pattern ("I was where you are" -> "I figured out X" -> "Now I help others do the same") and lacks an email signup form. The page needs restructuring, not rebuilding from scratch. All required components already exist in the codebase (SectionWrapper, Button, Card, FormInput) -- no new components are needed. The email signup form can reuse the exact same pattern from `index.astro` (same IDs are fine since each page is a separate HTML document in static Astro).

The narrative structure should follow a three-beat founder story arc derived from the StoryBrand "Guide" pattern and the origin story framework: (1) empathy -- showing the founder experienced the same struggles as the audience, (2) transformation -- what the founder discovered or built to solve the problem, (3) mission -- how the founder now helps others achieve the same results. This maps directly to the Phase 3 success criteria. The philosophy section differentiates Elevateo from generic business coaching by naming specific levers (scalable offers, lead generation systems, non-founder-dependent sales, operational frameworks) rather than vague motivational language.

**Primary recommendation:** Restructure the existing about.astro to follow the three-beat story arc (empathy -> transformation -> mission), keep the philosophy section with sharper differentiation copy, add the email signup form using the exact pattern from index.astro, and fix the pre-existing `astro check` errors in FormInput.astro and about.astro as part of this phase.

## Standard Stack

### Core (already installed -- no changes)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.1 | Static site framework | Already installed, all components exist |
| Tailwind CSS | 4.1.18 | Utility-first styling | Already installed, tokens defined |
| @fontsource-variable/inter | 5.2.8 | Typography | Already installed |

### No New Dependencies

This phase requires zero new npm packages. The about page is a content page using existing components. No new interactivity beyond the email form (which reuses the pattern from Phase 2).

**Installation:** None required.

## Architecture Patterns

### Recommended Page Structure (about.astro)

```
about.astro
  |-- Hero Section (SectionWrapper, narrow)
  |     |-- H1 headline "Meet the Founder" (text-h1, centered)
  |     |-- Subheadline establishing Elevateo's mission (text-body-lg, text-text-secondary)
  |
  |-- Founder Story Section (SectionWrapper, wide)
  |     |-- Two-column grid: photo placeholder (left) + story narrative (right)
  |     |-- Photo: Card component with placeholder text (reuse existing pattern)
  |     |-- Story: Three narrative beats as paragraphs
  |     |     |-- Beat 1 (Empathy): "I was where you are" -- Alan experienced the same ceiling
  |     |     |-- Beat 2 (Transformation): "I figured out X" -- what Alan discovered/built
  |     |     |-- Beat 3 (Mission): "Now I help others do the same" -- Elevateo's purpose
  |
  |-- Philosophy Section (SectionWrapper, narrow, bg-navy-950)
  |     |-- H2 "What Makes Us Different"
  |     |-- 2-3 paragraphs naming specific levers:
  |     |     |-- Built for established owners, not beginners
  |     |     |-- Specific scaling levers ($500K-$5M range)
  |     |     |-- No fluff, no generic advice -- proven systems
  |
  |-- Email Signup Section (section bg-navy-800)
  |     |-- SectionWrapper narrow, id="signup", text-center
  |     |-- H2 + value prop paragraph
  |     |-- Inline form: FormInput (email) + Button (submit)
  |     |-- Success/error message area
  |     |-- Privacy/trust line
  |     |-- Script (same setupEmailForm pattern as index.astro)
```

### Pattern 1: Three-Beat Founder Story Arc

**What:** A narrative structure for the founder bio that follows three emotional beats, each building on the previous one. This maps directly to the StoryBrand "Guide" positioning (empathy + authority) and the Phase 3 success criteria.

**The three beats:**

| Beat | Emotional Arc | What It Does | Example Opening |
|------|--------------|--------------|-----------------|
| 1. Empathy | "I was where you are" | Establishes shared experience with the audience. The founder felt the same frustration, hit the same ceiling | "After spending years building and scaling businesses, Alan hit the same wall most owners face..." |
| 2. Transformation | "I figured out X" | Shows what changed -- the frameworks, systems, or insights the founder developed through real-world experience | "Through years of testing, failing, and refining, he built the operational frameworks..." |
| 3. Mission | "Now I help others" | Connects the personal journey to the current business mission. Positions the founder as a guide, not a hero | "Today, Elevateo gives established owners the exact systems..." |

**Why this structure works:** The StoryBrand framework positions the customer as the hero and the brand as the guide. The guide earns trust by demonstrating two things: (1) empathy (I understand your problem because I lived it) and (2) authority (I solved it and can help you too). The three-beat arc naturally delivers both.

**Example implementation:**
```astro
<!-- Founder Story -->
<div>
  <h2 class="text-h2 mb-6">Alan Chan</h2>

  <!-- Beat 1: Empathy -->
  <p class="text-text-secondary mb-4">
    After spending years building and scaling businesses across multiple
    industries, Alan Chan hit the same wall that most established owners
    face: a revenue ceiling with no clear way through. He had the
    drive, the product, and the customers -- but the business could not
    grow past his personal capacity.
  </p>

  <!-- Beat 2: Transformation -->
  <p class="text-text-secondary mb-4">
    Through years of testing, failing, and refining, he built the
    operational frameworks that finally broke through that ceiling.
    Not theory from a textbook -- real systems forged in the trenches
    of actual business operations, from lead generation to team
    building to scalable offer creation.
  </p>

  <!-- Beat 3: Mission -->
  <p class="text-text-secondary">
    That experience became the foundation of Elevateo Co. Today, Alan
    is focused on giving established owners the exact tools, frameworks,
    and systems they need to break through plateaus, build
    high-performing teams, and create businesses that scale without
    burning out.
  </p>
</div>
```

**Source:** Structure derived from StoryBrand "Guide" framework (Donald Miller) combined with origin story framework (empathy -> transformation -> mission) from coaching site best practices.

### Pattern 2: Philosophy Section with Specific Differentiators

**What:** A section that explains what makes Elevateo different, using specific claims rather than generic coaching language. Each paragraph addresses a concrete differentiator.

**Differentiation strategy:**

| Generic (Bad) | Specific (Good) |
|--------------|-----------------|
| "We help you grow" | "We focus on the specific levers between $500K and $5M" |
| "Expert coaching" | "Scalable offer design, repeatable lead generation, non-founder sales" |
| "Customized for you" | "Built for owners who already have revenue, customers, and product-market fit" |
| "Motivational content" | "No fluff, no generic motivation, no one-size-fits-all playbooks" |

**Why specificity matters:** Generic coaching language ("unlock your potential," "breakthrough results") causes visitor bounce because it signals the service is the same as every other coaching site. Naming exact revenue ranges ($500K-$5M), specific operational levers, and explicitly calling out what Elevateo is NOT (not for beginners, not motivational, not generic) creates differentiation through specificity.

### Pattern 3: Email Signup Form Reuse

**What:** The about page email signup form uses the exact same pattern as the home page (index.astro). Since Astro generates each page as a separate HTML document, there are no ID collisions. The `#email-signup` form ID and `#form-message` message ID are unique within each page's DOM.

**Implementation notes:**
- Same HTML structure as index.astro email section
- Same `<script>` tag with `setupEmailForm()` function
- Same `astro:after-swap` listener for View Transitions compatibility
- Same placeholder success logic (Phase 4 replaces with Kit API call)
- Can use same or different heading/copy to match the about page context

**Why not extract to a component:** The email form has page-specific copy (heading, subheadline, trust line), an inline script, and wrapping sections with background colors. Extracting this into a reusable component would require passing 4+ props for text customization and managing script deduplication across pages. For a 3-page site, inline repetition is simpler and more maintainable than premature abstraction. Phase 4 will refactor all forms to use Kit API anyway.

### Pattern 4: Section Background Alternation

**What:** The about page follows the established pattern of alternating backgrounds to create visual separation between content sections.

**Recommended sequence for about.astro:**

| Section | Background | Reason |
|---------|-----------|--------|
| Hero | navy-900 (body default) | Clean entry, matches other pages |
| Founder Story | navy-900 (body default) | Primary content section, no extra visual weight |
| Philosophy | navy-950 (darker) | Visual break between story and philosophy, matches home page problem section pattern |
| Email Signup | navy-800 | Matches home page email section pattern, creates visual call-to-action zone |

This follows the same alternation pattern established in Phase 2 (index.astro): default -> contrast -> default -> accent.

### Anti-Patterns to Avoid

- **Generic founder bio:** "Alan is a passionate entrepreneur who loves helping people." This is every coaching site. The story must follow the three-beat arc with specific details about what ceiling Alan hit and what systems he built.
- **Wall of text in founder section:** The existing about.astro has 3 paragraphs of moderate length. Keep this ratio -- do not expand to 5+ paragraphs. The photo placeholder provides visual balance in the two-column layout.
- **Philosophy section that just repeats the home page:** The philosophy section should add NEW information, not rephrase the problem/solution from the home page. Focus on the "how" and "why different" rather than restating the problem.
- **Different email form pattern:** Do not create a new form pattern for the about page. Reuse the exact same structure from index.astro to maintain consistency and simplify Phase 4's Kit API integration (one pattern to replace, multiple pages).
- **Premature component extraction for email form:** Do not extract the email form into a shared component yet. Phase 4 will refactor all forms to use Kit API, which is the right time to DRY up the form code.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Founder photo display | Custom image component with cropping/filters | Card component as placeholder container | Photography not provided yet; Card already handles dark-themed container styling |
| Email form on about page | New form component or different form pattern | Copy the exact form pattern from index.astro | Consistency across pages; Phase 4 will refactor all forms at once |
| Section spacing | Manual padding per section | Existing SectionWrapper component | Already handles fluid clamp() spacing |
| Background alternation | New CSS classes or custom sections | Wrap SectionWrapper in `<section class="bg-navy-950">` | Established pattern from Phase 2 |
| Form validation | Custom regex or validation library | HTML5 `type="email"` + `required` + basic JS check | Same approach as home page, browser-native validation |

**Key insight:** Phase 3 requires zero new components. Everything is built with existing parts (SectionWrapper, Card, Button, FormInput) plus restructured content in about.astro. The only "new" code is the email signup section and its script tag, both of which are direct copies from index.astro with adjusted copy.

## Common Pitfalls

### Pitfall 1: Story Arc That Doesn't Follow the Three-Beat Pattern

**What goes wrong:** The founder bio reads as a flat resume ("Alan did X, then Y, then Z") instead of following the emotional arc ("I struggled with this" -> "I discovered this" -> "Now I help others").
**Why it happens:** Writing biographical content defaults to chronological resume format rather than narrative storytelling.
**How to avoid:** Each paragraph in the founder section maps to exactly one beat. Beat 1 must explicitly acknowledge the audience's pain ("hit the same wall most owners face"). Beat 2 must describe specific discovery or method. Beat 3 must pivot to present-day mission.
**Warning signs:** The founder section could describe any entrepreneur. It does not reference the specific audience's struggle (revenue ceiling, bottleneck, scaling challenges).

### Pitfall 2: Philosophy Section Is Vague

**What goes wrong:** The "What Makes Us Different" section uses generic differentiators that every coaching business claims ("expert guidance," "proven methods," "personalized approach").
**Why it happens:** Differentiation is hard. It is easier to write safe, generic copy than to make specific, falsifiable claims.
**How to avoid:** Every differentiation claim must name a specific lever, audience segment, or anti-pattern. "We focus on the levers between $500K and $5M" is specific. "We help businesses grow" is not. The section should explicitly state what Elevateo is NOT (not for beginners, not motivational, not one-size-fits-all).
**Warning signs:** Remove the company name from the philosophy section -- could this text appear on any other coaching site? If yes, it is too generic.

### Pitfall 3: Email Form ID Collision (Non-Issue but Worth Noting)

**What goes wrong:** Developer worries about `#email-signup` and `#form-message` IDs being duplicated across pages.
**Why it happens:** In single-page applications, duplicate IDs cause real problems. But Astro generates separate HTML documents for each page.
**How to avoid:** This is not actually a problem in static Astro. Each page is a separate HTML document. The same IDs on different pages never coexist in the same DOM. Use the same IDs as index.astro for consistency.
**Warning signs:** Developer starts using data attributes or unique ID generation for the about page form -- this is unnecessary complexity.

### Pitfall 4: Pre-Existing TypeScript Errors Not Addressed

**What goes wrong:** `npx astro check` continues to report errors that were introduced in Phase 1 and carried through Phase 2:
1. `FormInput.astro` line 22: `type` prop typed as `string` but Astro expects `HTMLInputTypeAttribute`
2. `about.astro` line 4: `Button` imported but never used

**Why it happens:** Phase 1 and Phase 2 deferred these fixes to avoid scope creep.
**How to avoid:** Phase 3 is the natural place to fix both:
- The `Button` import warning resolves automatically when the email signup form is added (it uses Button)
- The `FormInput.astro` type error should be fixed by narrowing the `type` prop to `astroHTML.JSX.HTMLInputTypeAttribute` or a union of known input types
**Warning signs:** `npx astro check` reports errors after Phase 3 completion.

### Pitfall 5: Inconsistent Header CTA Link Target

**What goes wrong:** The header's "Get Started" button links to `#signup`. On the home page, this scrolls to the email form. On the about page, if no `#signup` ID exists, clicking "Get Started" does nothing (or scrolls to top).
**Why it happens:** The header CTA was designed for the home page's email section.
**How to avoid:** Add `id="signup"` to the about page's email signup SectionWrapper, matching the home page pattern. The header CTA will then work correctly on all pages.
**Warning signs:** Clicking "Get Started" in the header while on the about page does not scroll to any section.

## Code Examples

### Complete About Page Structure (Recommended)

```astro
---
import Base from "../layouts/Base.astro";
import SectionWrapper from "../components/SectionWrapper.astro";
import Button from "../components/Button.astro";
import Card from "../components/Card.astro";
import FormInput from "../components/FormInput.astro";
---

<Base title="About" description="Learn about Alan Chan and the Elevateo Co mission to help business owners scale.">

  <!-- Hero Section -->
  <SectionWrapper class="pt-16 sm:pt-20 pb-8 sm:pb-12">
    <h1 class="text-h1 text-center mb-4">Meet the Founder</h1>
    <p class="text-body-lg text-text-secondary text-center max-w-2xl mx-auto">
      Elevateo Co was built on one belief: every established business owner
      deserves a clear path to scale, not guesswork and generic advice.
    </p>
  </SectionWrapper>

  <!-- Founder Story Section (three-beat arc) -->
  <SectionWrapper width="wide">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Photo Placeholder -->
      <Card class="flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
        <div class="text-center">
          <p class="text-text-tertiary text-sm uppercase tracking-wide font-bold mb-2">Photo Coming Soon</p>
          <p class="text-text-secondary text-sm">Alan Chan, Founder</p>
        </div>
      </Card>

      <!-- Founder Story (three beats) -->
      <div>
        <h2 class="text-h2 mb-6">Alan Chan</h2>

        <!-- Beat 1: Empathy - "I was where you are" -->
        <p class="text-text-secondary mb-4">
          After spending years building and scaling businesses across multiple
          industries, Alan Chan hit the same wall that most established owners
          face: a revenue ceiling with no clear way through. He had the drive,
          the product, and the customers -- but the business could not grow
          past his personal capacity.
        </p>

        <!-- Beat 2: Transformation - "I figured out X" -->
        <p class="text-text-secondary mb-4">
          Through years of testing, failing, and refining, he built the
          operational frameworks that finally broke through that ceiling. Not
          theory from a textbook -- real systems forged in the trenches of
          actual business operations, from lead generation to team building
          to scalable offer creation.
        </p>

        <!-- Beat 3: Mission - "Now I help others do the same" -->
        <p class="text-text-secondary">
          That experience became the foundation of Elevateo Co. Today, Alan
          is focused on giving established owners the exact tools, frameworks,
          and systems they need to break through plateaus, build
          high-performing teams, and create businesses that scale without
          burning out.
        </p>
      </div>
    </div>
  </SectionWrapper>

  <!-- Philosophy Section -->
  <section class="bg-navy-950">
    <SectionWrapper width="narrow">
      <h2 class="text-h2 mb-6">What Makes Us Different</h2>
      <p class="text-text-secondary mb-4">
        Most business education is built for people just getting started.
        Elevateo is built for owners who already have revenue, already have
        customers, and already know the basics. The challenge at your stage
        is not learning how to start. It is learning how to scale.
      </p>
      <p class="text-text-secondary mb-4">
        We focus on the specific levers that matter between $500K and $5M:
        scalable offer design, repeatable lead generation systems, sales
        processes that do not depend on the founder, and operational
        frameworks that free you from day-to-day execution.
      </p>
      <p class="text-text-secondary">
        No fluff, no generic motivation, no one-size-fits-all playbooks.
        Just proven systems tailored to established business owners who
        are ready to grow.
      </p>
    </SectionWrapper>
  </section>

  <!-- Email Signup Section -->
  <section class="bg-navy-800">
    <SectionWrapper width="narrow" id="signup" class="text-center">
      <h2 class="text-h2 mb-4">Join the Journey</h2>
      <p class="text-body-lg text-text-secondary mb-8 max-w-xl mx-auto">
        Get scaling insights from someone who has been in your shoes.
        No spam, no fluff -- just frameworks that work.
      </p>
      <form id="email-signup" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <FormInput
          type="email"
          name="email"
          placeholder="Enter your email"
          required={true}
          class="flex-1"
        />
        <Button variant="primary" size="md">Stay Updated</Button>
      </form>
      <p id="form-message" class="text-sm mt-3 hidden"></p>
      <p class="text-xs text-text-tertiary mt-4">
        No spam. Unsubscribe anytime. We respect your inbox.
      </p>
    </SectionWrapper>
  </section>

  <script>
    function setupEmailForm() {
      const form = document.getElementById('email-signup') as HTMLFormElement;
      const message = document.getElementById('form-message') as HTMLElement;

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = new FormData(form).get('email') as string;

        if (!email || !email.includes('@')) {
          message.textContent = 'Please enter a valid email address.';
          message.className = 'text-sm mt-3 text-error';
          message.classList.remove('hidden');
          return;
        }

        // Phase 4 will replace this with Kit API call
        message.textContent = "You're on the list! We'll be in touch.";
        message.className = 'text-sm mt-3 text-success';
        message.classList.remove('hidden');
        form.reset();
      });
    }

    setupEmailForm();
    document.addEventListener('astro:after-swap', setupEmailForm);
  </script>

</Base>
```

### FormInput.astro Type Fix

```astro
---
// src/components/FormInput.astro

interface Props {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  name: string;
  placeholder?: string;
  required?: boolean;
  class?: string;
}

const {
  type = "text",
  name,
  placeholder,
  required = false,
  class: className,
} = Astro.props;
---

<input
  type={type}
  name={name}
  placeholder={placeholder}
  required={required}
  class:list={[
    "w-full bg-navy-800 border border-navy-600 text-white placeholder-text-tertiary",
    "rounded-lg px-4 py-3 text-body",
    "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
    "transition-colors duration-200",
    className,
  ]}
/>
```

**Why a union type instead of `astroHTML.JSX.HTMLInputTypeAttribute`:** The union type is explicit about which input types the component supports. This prevents someone from using `type="file"` or `type="range"` with this component (which would look broken with the current styling). If more types are needed later, they can be added to the union.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flat resume-style founder bio | Three-beat narrative arc (empathy -> transformation -> mission) | StoryBrand popularized ~2017, now standard | Higher trust and conversion on about pages |
| Generic "about us" copy | Specific differentiators naming exact levers, revenue ranges, and anti-patterns | Ongoing trend toward specificity | Visitors can immediately tell if they are the right fit |
| Separate email form component | Inline form with page-specific copy | Project decision (Phase 2) | Simpler for 3-page site; Phase 4 will refactor |

**Not applicable to this phase:**
- GSAP animations (deferred to Phase 5)
- Kit API integration (deferred to Phase 4)
- View Transitions (not configured)
- Professional founder photography (awaiting Alan)

## Open Questions

1. **Founder story content is placeholder**
   - What we know: Alan must provide his actual founder narrative, photography, and verifiable metrics. This was flagged as a blocker in STATE.md.
   - What's unclear: When Alan will provide this content. The placeholder copy follows the correct three-beat structure so it can be directly swapped when real content arrives.
   - Recommendation: Build with placeholder copy that follows the three-beat arc. Structure the HTML so content can be replaced without changing the layout. Add HTML comments marking each beat ("Beat 1: Empathy", "Beat 2: Transformation", "Beat 3: Mission") so Alan or a copywriter knows what each paragraph should accomplish.

2. **Philosophy section overlap with home page problem/solution**
   - What we know: The home page already names scaling bottlenecks (bottlenecked by you, revenue plateaus, no clear roadmap). The about page philosophy section should add differentiation, not repeat the same points.
   - What's unclear: How much overlap is acceptable. Some repetition is natural since visitors may land on either page first.
   - Recommendation: The philosophy section should focus on HOW Elevateo is different (specific levers, what they are NOT) rather than restating the problem. The existing copy in about.astro already does this well. Keep the focus on "built for established owners, not beginners" + "specific scaling levers" + "no fluff" as the three differentiation pillars.

3. **Email form button text differentiation**
   - What we know: Home page uses "Get Notified." The about page could use the same or differentiate.
   - What's unclear: Whether different button text helps or confuses.
   - Recommendation: Use slightly different copy that matches the about page context. "Stay Updated" or "Join the Journey" fits the about page's personal tone better than the transactional "Get Notified" on the home page. This is purely cosmetic -- the form behavior is identical.

4. **Philosophy section background**
   - What we know: The existing about.astro uses the default navy-900 body background for the philosophy section. The home page uses navy-950 for the problem section to create visual separation.
   - What's unclear: Whether the about page needs the same background alternation.
   - Recommendation: Wrap the philosophy section in `<section class="bg-navy-950">` to create visual separation between the founder story and the philosophy, matching the established pattern from the home page. This prevents the "wall of same" effect noted in Phase 2 research.

## Sources

### Primary (HIGH confidence)
- Existing codebase (about.astro, index.astro, all components) -- read and analyzed directly
- Phase 1 research (01-RESEARCH.md) -- Astro patterns, Tailwind tokens, component architecture
- Phase 2 research (02-RESEARCH.md) -- Email form pattern, section backgrounds, script patterns
- Astro 5.17.1 script deduplication behavior -- confirmed in Phase 1/2 research and official docs
- `npx astro check` output -- confirmed pre-existing errors (FormInput type, about.astro unused import)

### Secondary (MEDIUM confidence)
- StoryBrand framework (Donald Miller) -- "Guide" positioning with empathy + authority, well-established marketing framework
- [Shopify: About Us Page Examples (2026)](https://www.shopify.com/blog/how-to-write-an-about-us-page) -- About page structure and copywriting patterns
- [Creatro: Epic Origin Stories](https://creatro.com/epic-origin-stories/) -- Origin story framework: foundation, conflict, transformation, vulnerability, emotional connection
- [Lovely Impact: Coaching About Page](https://lovelyimpact.com/how-to-write-a-life-coaching-about-page/) -- Four sections: who, what, why, CTA
- Acquisition.com about page structure -- hero, meet founder, mission, training offerings, footer

### Tertiary (LOW confidence)
- "I was where you are" three-beat arc -- widely referenced in coaching/marketing circles but no single authoritative source. The structure is a synthesis of StoryBrand "Guide" positioning, origin story frameworks, and coaching site best practices. The pattern is well-established enough to use with confidence.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all components verified in codebase
- Architecture: HIGH -- page structure follows established patterns from Phase 1/2, email form is a direct reuse
- Content structure: MEDIUM -- three-beat story arc is well-established in marketing but specific copy is placeholder awaiting Alan's real narrative
- Pitfalls: HIGH -- pre-existing errors verified with `npx astro check`, ID collision non-issue confirmed by Astro's static output model
- FormInput fix: HIGH -- type narrowing is straightforward TypeScript, verified the error exists

**Research date:** 2026-02-12
**Valid until:** 2026-03-12 (stable -- no fast-moving dependencies, content-focused phase)
