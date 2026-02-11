# Phase 2: Home Page - Research

**Researched:** 2026-02-11
**Domain:** High-converting authority site home page (hero, problem/solution, FAQ, email capture) built on Astro 5.x + Tailwind CSS 4.x
**Confidence:** HIGH

## Summary

This phase transforms the Phase 1 placeholder index.astro into a complete, high-converting home page for a business education authority site targeting established business owners scaling past $500K-$1M. Research covered four domains: hero section conversion patterns, problem/solution copywriting frameworks, FAQ accordion implementation in Astro, and inline email signup forms for dark-themed static sites.

The existing Phase 1 foundation provides all the building blocks needed. The SectionWrapper, Button, Card, and FormInput components can be reused directly. The primary new component required is an FAQ accordion -- a custom Astro component using `<button>` elements with `aria-expanded` attributes and minimal JavaScript for toggle behavior (not HTML `<details>/<summary>` due to animation limitations in non-Chromium browsers). The email form will use client-side JavaScript to capture submissions and store state locally until Kit integration in Phase 4.

The home page follows a proven authority site structure derived from acquisition.com and similar high-converting business education sites: bold hero with specific outcome headline, problem agitation section using cards, solution positioning, FAQ addressing objections, and email capture with a single field. All copy is placeholder but follows PAS (Problem-Agitation-Solution) framework structure so it can be swapped with real content when Alan provides his metrics and story.

**Primary recommendation:** Build four distinct page sections (hero, problem/solution, FAQ accordion, email signup) using existing components where possible, one new AccordionItem component with JS-powered toggle, and a client-side form handler that provides visual feedback without backend integration.

## Standard Stack

### Core (already installed from Phase 1)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.1 | Static site framework | Already installed, generates zero-JS pages by default |
| Tailwind CSS | 4.1.18 | Utility-first styling | Already installed, CSS-first with @theme tokens |
| @fontsource-variable/inter | 5.2.8 | Typography | Already installed, single variable font |

### Supporting (no new installs needed)
| Library | Purpose | Notes |
|---------|---------|-------|
| Native `<script>` tags | FAQ accordion toggle, form submission handling | Astro processes, bundles, and deduplicates script tags automatically |

### No New Dependencies

This phase requires zero new npm packages. All interactivity (FAQ toggle, form submission feedback) is handled with vanilla JavaScript in Astro `<script>` tags. The site remains static -- no SSR adapter needed.

**Installation:** None required.

## Architecture Patterns

### Recommended Page Structure (index.astro)

```
index.astro
  |-- Hero Section (SectionWrapper, narrow)
  |     |-- H1 headline (text-hero, benefit-focused)
  |     |-- Subheadline (text-body-lg, text-text-secondary)
  |     |-- CTA button (Button primary lg)
  |     |-- Trust indicator line (text-sm, text-text-tertiary)
  |
  |-- Problem Section (SectionWrapper, wide)
  |     |-- Section headline (text-h2)
  |     |-- 3x Card components (existing)
  |     |-- Each card: icon/emoji + h3 + descriptive paragraph
  |
  |-- Solution Section (SectionWrapper, narrow)
  |     |-- Section headline (text-h2)
  |     |-- Solution description paragraph
  |     |-- 3 solution points (checkmark + text)
  |     |-- CTA button (Button primary md)
  |
  |-- FAQ Section (SectionWrapper, narrow)
  |     |-- Section headline (text-h2)
  |     |-- 5-6x AccordionItem components (NEW)
  |     |-- Each: question button + collapsible answer
  |
  |-- Email Signup Section (SectionWrapper, narrow)
  |     |-- Section headline (text-h2)
  |     |-- Value prop line
  |     |-- Inline form: FormInput (email) + Button (submit)
  |     |-- Privacy/trust line (text-xs)
  |     |-- Success/error message area
```

### New Component: AccordionItem.astro

```
src/components/AccordionItem.astro
```

### Pattern 1: AccordionItem with JS Toggle

**What:** A reusable FAQ accordion item that expands/collapses with smooth animation using `max-height` transition and `aria-expanded` for accessibility.

**Why not `<details>/<summary>`:** The `::details-content` pseudo-element and `interpolate-size` CSS property needed for smooth animations are Chromium-only as of February 2026. Firefox and Safari show instant show/hide with no animation. A button-based approach provides consistent smooth animation across all browsers.

**When to use:** Any expandable content section (FAQ, feature details, etc.)

**Example:**
```astro
---
// src/components/AccordionItem.astro
interface Props {
  question: string;
  class?: string;
}

const { question, class: className } = Astro.props;
---

<div class:list={["accordion-item border-b border-navy-700/50", className]}>
  <button
    class="accordion-trigger flex w-full items-center justify-between py-5 text-left text-body-lg font-medium text-white hover:text-accent transition-colors duration-200"
    type="button"
    aria-expanded="false"
  >
    <span>{question}</span>
    <svg
      class="accordion-icon h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-300"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div class="accordion-content overflow-hidden max-h-0 transition-all duration-300 ease-in-out">
    <div class="pb-5 text-text-secondary">
      <slot />
    </div>
  </div>
</div>

<script>
  function setupAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const content = item?.querySelector('.accordion-content') as HTMLElement;
        const icon = item?.querySelector('.accordion-icon');
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        if (!isOpen) {
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
          icon?.classList.add('rotate-180');
        } else {
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
          icon?.classList.remove('rotate-180');
        }
      });
    });
  }

  setupAccordions();
  document.addEventListener('astro:after-swap', setupAccordions);
</script>
```

**Source:** Pattern derived from Accessible Astro Components approach (webreaper.dev/posts/astro-accessible-accordion/) adapted for this project's Tailwind tokens and dark theme.

### Pattern 2: Client-Side Email Form with State Feedback

**What:** An inline email form that captures input and provides visual success/error feedback without a backend. The form will be "wired up" to Kit in Phase 4; for now it validates and shows a success message.

**Why:** The site is static (no SSR adapter). Email API integration is deferred to Phase 4. The form needs to exist structurally now (HOME-04) and show submission feedback, but actual subscriber creation happens later.

**Example:**
```astro
<!-- Email signup section in index.astro -->
<form id="email-signup" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
  <FormInput
    type="email"
    name="email"
    placeholder="Enter your email"
    required={true}
    class="flex-1"
  />
  <Button variant="primary" size="md">Get Notified</Button>
</form>
<p id="form-message" class="text-sm mt-3 hidden"></p>

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
```

### Pattern 3: Section Hierarchy for Authority Pages

**What:** Each page section follows a visual hierarchy pattern: section background differentiation, centered headline, supporting content, then CTA.

**How to differentiate sections on a single dark background:** Alternate between navy-900 (body default) and navy-800 or navy-950 background to create visual separation without introducing new colors. Use SectionWrapper for consistent padding/width.

**Example approach:**
```astro
<!-- Default background (navy-900 from body) -->
<SectionWrapper><!-- Hero --></SectionWrapper>

<!-- Darker background for contrast -->
<section class="bg-navy-950">
  <SectionWrapper><!-- Problem/Solution --></SectionWrapper>
</section>

<!-- Back to default -->
<SectionWrapper><!-- FAQ --></SectionWrapper>

<!-- Darker background for email capture -->
<section class="bg-navy-800">
  <SectionWrapper><!-- Email Signup --></SectionWrapper>
</section>
```

### Anti-Patterns to Avoid

- **Multiple CTAs per section:** Each section gets one CTA maximum. The hero gets "Get Started," the solution section gets "Start Scaling," the email section gets "Get Notified." Never put two competing CTAs side by side (the Phase 1 hero had two buttons -- Phase 2 should reduce to one primary).
- **Generic copy that could be any business:** Even placeholder copy should name specific pain points ("bottlenecked by you," "revenue plateaus," "no clear roadmap") per the research docs. Avoid vague "grow your business" language.
- **Hiding the email form:** The signup form should be its own prominent section, not buried in a footer or sidebar. It is a primary conversion goal.
- **Over-engineering interactivity:** The FAQ accordion needs ~30 lines of JS. Do not bring in a framework (React, Svelte) or a component library for this.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion animation | Custom CSS `interpolate-size` / `::details-content` | Button + `max-height` JS transition | CSS-only animation on `<details>` is Chromium-only; JS approach works in all browsers |
| Email validation | Complex regex patterns | HTML5 `type="email"` + `required` attribute + basic JS check | Browser-native validation covers 95% of cases |
| Form submission feedback | Custom toast/notification system | Simple `<p>` element with class toggling | Only one form on the page, a toast system is overkill |
| Section spacing | Manual padding per section | Existing `SectionWrapper` component | Already built in Phase 1 with fluid `clamp()` padding |
| Typography scale | Manual font sizes | Existing design tokens (`text-hero`, `text-h2`, `text-body-lg`, etc.) | Already defined in global.css `@theme` block |
| Button styling | New button styles | Existing `Button.astro` component | Already has primary/secondary/ghost variants with sm/md/lg sizes |

**Key insight:** Phase 1 built a comprehensive component library. Phase 2 should maximize reuse of SectionWrapper, Button, Card, and FormInput. The only genuinely new component is AccordionItem.

## Common Pitfalls

### Pitfall 1: Weak Hero Headline

**What goes wrong:** Generic "Grow Your Business" headline that could be any coaching site. Fails to differentiate or hook the target audience.
**Why it happens:** Placeholder copy drifts toward safe, generic language.
**How to avoid:** Even placeholder headlines should follow a proven formula: "[Specific outcome] for [specific audience]" -- e.g., "Scale Past $1M Without Burning Out." The headline must pass the "would acquisition.com use this?" test.
**Warning signs:** Headline does not contain a specific number, outcome, or audience identifier.

### Pitfall 2: Wall of Text in Problem/Solution Section

**What goes wrong:** Long paragraphs that visitors skip. Business owners scanning the page bounce before reaching the CTA.
**Why it happens:** Trying to explain everything instead of creating emotional resonance.
**How to avoid:** Use the Card component with short, punchy pain points (2-3 sentences max per card). Each card names one specific bottleneck. Let whitespace and headings carry the hierarchy.
**Warning signs:** Any Card content exceeds 3 sentences.

### Pitfall 3: FAQ Accordion Accessibility Failures

**What goes wrong:** Keyboard users cannot navigate FAQ items. Screen readers do not announce expand/collapse state.
**Why it happens:** Using `<div>` without proper ARIA attributes or keyboard handlers.
**How to avoid:** Use `<button>` elements (not `<div>`) as triggers so they are keyboard-focusable by default. Set `aria-expanded="true|false"` on toggle. The AccordionItem pattern above handles this correctly.
**Warning signs:** Cannot Tab to FAQ items and press Enter/Space to toggle.

### Pitfall 4: Email Form Submits to Nowhere with No Feedback

**What goes wrong:** User clicks "Submit," page reloads or nothing happens. No confirmation that anything worked.
**Why it happens:** Backend integration is in Phase 4, so the form is left as a dead HTML form.
**How to avoid:** `e.preventDefault()` on form submit, validate the email client-side, and show a success message. The form is "complete" from a UX perspective even though it doesn't call an API yet. Phase 4 will swap in the Kit API call.
**Warning signs:** Clicking submit causes a page reload or navigates away.

### Pitfall 5: Section Background Monotony

**What goes wrong:** All sections have the same navy-900 background, creating a "wall of same" effect where content sections blur together.
**Why it happens:** The dark theme has a narrow color range by design.
**How to avoid:** Alternate between navy-900 (body), navy-950, and navy-800 backgrounds for different sections. Use subtle border-top/border-bottom lines (border-navy-700/50) for additional separation. The hero can sit on navy-900, problem section on navy-950, FAQ on navy-900, email on navy-800.
**Warning signs:** Cannot tell where one section ends and another begins when scrolling quickly.

### Pitfall 6: Script Duplication in Astro

**What goes wrong:** If the AccordionItem component is used multiple times, the `<script>` tag runs only once due to Astro's deduplication. If the script uses `querySelectorAll` this is fine. But if it targets a single element by ID, only the first instance works.
**Why it happens:** Astro automatically deduplicates `<script>` tags in components.
**How to avoid:** Use class selectors (`.accordion-trigger`) not IDs for the accordion script. The script in AccordionItem should use `querySelectorAll('.accordion-trigger')` to target all instances. This is how Astro's built-in script processing is designed to work.
**Warning signs:** First accordion item works but subsequent ones do not respond to clicks.

## Code Examples

### Hero Section (Complete)
```astro
<!-- Source: PAS framework + acquisition.com pattern -->
<SectionWrapper width="narrow" class="pt-16 sm:pt-24 pb-12 sm:pb-16">
  <div class="text-center">
    <h1 class="text-hero font-bold text-white mb-6">
      Scale Past $1M Without<br class="hidden sm:inline" /> Sacrificing Your Sanity
    </h1>
    <p class="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
      Proven frameworks for established business owners who have hit a ceiling
      and need systems -- not more hustle -- to break through.
    </p>
    <Button variant="primary" size="lg" href="#signup">
      Start Scaling Today
    </Button>
    <p class="text-sm text-text-tertiary mt-6">
      Join 2,000+ business owners already scaling with Elevateo
    </p>
  </div>
</SectionWrapper>
```

### Problem/Solution Section (Cards)
```astro
<!-- Source: Research docs problem/solution pattern -->
<section class="bg-navy-950">
  <SectionWrapper width="wide">
    <div class="text-center mb-12">
      <h2 class="text-h2 mb-4">The $1M Ceiling Is Real</h2>
      <p class="text-body-lg text-text-secondary max-w-2xl mx-auto">
        Every growing business hits the same walls. Here is what is keeping you stuck.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div class="text-accent text-h2 mb-4">01</div>
        <h3 class="text-h3 mb-3">Bottlenecked by You</h3>
        <p class="text-text-secondary">
          Every decision runs through you. Your business cannot grow past your personal capacity.
        </p>
      </Card>
      <!-- ... more cards ... -->
    </div>
  </SectionWrapper>
</section>
```

### FAQ Section (Using AccordionItem)
```astro
<SectionWrapper width="narrow">
  <h2 class="text-h2 text-center mb-10">Frequently Asked Questions</h2>
  <div class="divide-y divide-navy-700/50">
    <AccordionItem question="Who is Elevateo for?">
      <p>Elevateo is built for established business owners already generating revenue
      who want to scale past $500K-$1M+. If you are just getting started, this is
      not the right fit -- we focus on scaling systems, not startup tactics.</p>
    </AccordionItem>
    <AccordionItem question="How is this different from other business coaching?">
      <p>Most coaching is generic motivation or theory. Elevateo provides specific,
      proven frameworks for operational scaling -- the systems, team structures, and
      processes that actually move the needle past seven figures.</p>
    </AccordionItem>
    <!-- ... more items ... -->
  </div>
</SectionWrapper>
```

### Email Signup Section (Inline Form)
```astro
<section class="bg-navy-800">
  <SectionWrapper width="narrow" id="signup" class="text-center">
    <h2 class="text-h2 mb-4">Stay Ahead of the Curve</h2>
    <p class="text-body-lg text-text-secondary mb-8 max-w-xl mx-auto">
      Get actionable scaling insights delivered to your inbox. No spam, no fluff --
      just frameworks that work.
    </p>
    <form id="email-signup" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <FormInput
        type="email"
        name="email"
        placeholder="Enter your email"
        required={true}
        class="flex-1"
      />
      <Button variant="primary" size="md">Get Notified</Button>
    </form>
    <p id="form-message" class="text-sm mt-3 hidden"></p>
    <p class="text-xs text-text-tertiary mt-4">
      No spam. Unsubscribe anytime. We respect your inbox.
    </p>
  </SectionWrapper>
</section>
```

## Copywriting Framework Reference

### PAS Framework (Problem-Agitation-Solution) -- Recommended for This Page

The PAS framework maps directly to the home page section structure:

| PAS Stage | Page Section | What It Does |
|-----------|-------------|--------------|
| **Problem** | Problem cards (3 cards) | Name specific bottlenecks the audience feels daily |
| **Agitation** | Subtext under cards / transition copy | Amplify the urgency -- what happens if they stay stuck |
| **Solution** | Solution section + CTA | Position Elevateo as the answer with a clear next step |

**Hero headline formulas that convert for business coaching:**
- "[Specific Outcome] Without [Common Objection]" -- e.g., "Scale Past $1M Without Burning Out"
- "The [Adjective] Way to [Desired Outcome]" -- e.g., "The Proven Way to Break Through Revenue Plateaus"
- "How [Specific Audience] [Achieve Outcome]" -- e.g., "How Established Owners Scale to 7 Figures"
- "[Number]+ [Social Proof] [Action]" -- e.g., "Join 2,000+ Owners Already Scaling"

**CTA button copy (action-oriented, not generic):**
- "Start Scaling Today" (better than "Get Started")
- "Get the Framework" (better than "Learn More")
- "Join Free" (better than "Sign Up")
- "Get Notified" (good for email capture, implies value)

### FAQ Questions to Address (Objection Handling)

Based on common objections in business coaching/education:
1. Who is this for? (Qualification -- filter the right audience)
2. How is this different from other coaching? (Differentiation)
3. Do I need to be at a certain revenue level? (Barrier clarity)
4. What kind of results can I expect? (Outcome expectation)
5. Is this a course, coaching, or community? (Format clarity)
6. What if it does not work for my industry? (Risk reversal)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<details>/<summary>` for FAQ accordion | Button + JS toggle with `aria-expanded` | Still current -- CSS animation for `<details>` is Chromium-only | Cross-browser smooth animation requires JS approach |
| Full SSR for form handling | Client-side JS in static Astro | Astro 5.x static output | No server needed for form UI feedback; API calls added later |
| Multiple font families (heading vs body) | Single variable font (Inter Variable) | Project decision (Phase 1) | Simpler, faster, consistent |
| Tailwind config file (tailwind.config.js) | CSS-first @theme in global.css | Tailwind CSS 4.x | Tokens defined in CSS, no JS config needed |

**Not applicable to this phase:**
- Astro Actions (requires SSR adapter, site is static)
- View Transitions (not configured in this project)
- React/Svelte islands (unnecessary complexity for FAQ toggle and form)

## Open Questions

1. **Founder photo in hero section**
   - What we know: Alan must provide professional photography. Phase 1 notes a "placeholder box" approach.
   - What's unclear: Whether the hero should include a founder photo at all, or keep it text-only like acquisition.com.
   - Recommendation: Keep the hero text-only for now. A founder photo can be added to the About page (Phase 3) or injected into the hero later. Text-only heroes convert well for authority sites (acquisition.com, basecamp.com).

2. **Trust indicator metrics in hero**
   - What we know: Research docs show acquisition.com displays "$250M+ in annual revenue" prominently. The success criteria mention "credibility signals."
   - What's unclear: Alan has not provided verifiable metrics yet (noted as a blocker in STATE.md).
   - Recommendation: Use a placeholder trust line like "Join 2,000+ business owners already scaling" -- the number and claim can be updated when real metrics are available. Do not invent specific revenue numbers.

3. **Number of FAQ items**
   - What we know: 5-8 items is standard for authority sites. Acquisition.com uses 4-5.
   - What's unclear: What specific objections Alan's audience has.
   - Recommendation: Start with 5-6 placeholder FAQ items covering the standard business coaching objections listed above. Real Q&A content can replace them later.

4. **Solution section structure**
   - What we know: The problem section uses Cards. The solution section needs to feel different to create a visual shift.
   - What's unclear: Whether to use cards, a checklist pattern, or paragraph + bullet points.
   - Recommendation: Use a different visual pattern than the problem cards -- a centered text block with 3 checkmark-style bullet points and a single CTA. This creates PAS rhythm: cards (problem) -> text (agitate/solve) -> form (action).

## Sources

### Primary (HIGH confidence)
- Astro 5.17.1 -- package.json verified, scripts and event handling docs (docs.astro.build/en/guides/client-side-scripts/)
- Tailwind CSS 4.1.18 -- package.json verified, @theme directive in global.css examined directly
- Existing codebase components -- SectionWrapper, Button, Card, FormInput read and analyzed
- Astro form handling recipe (docs.astro.build/en/recipes/build-forms/) -- confirms static sites need client-side JS for form interaction

### Secondary (MEDIUM confidence)
- Accessible Astro accordion pattern (webreaper.dev/posts/astro-accessible-accordion/) -- verified code pattern for button-based accordion with aria-expanded
- Builder.io animated CSS accordions (builder.io/blog/animated-css-accordions) -- confirmed ::details-content is Chromium-only
- WebDong details/summary animation (webdong.dev/en/post/build-a-native-accordion-using-html-details-and-summary/) -- confirmed interpolate-size browser limitation
- Acquisition.com homepage fetch -- confirmed hero structure, FAQ section, credibility signal placement

### Tertiary (LOW confidence)
- Hero section headline formulas -- synthesized from multiple WebSearch results (wpminds.com, thrivethemes.com, klientboost.com); formulas are well-established marketing patterns but specific conversion lift claims vary
- PAS/AIDA framework details -- well-known copywriting frameworks, synthesized from multiple sources

### Project Reference Documents (HIGH confidence)
- high-converting-websites-research.txt -- user-provided research with conversion benchmarks and design patterns
- website-urls-reference.txt -- user-provided reference URLs for authority sites

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed, versions verified from package.json
- Architecture: HIGH -- existing components examined, patterns derived from codebase + verified Astro docs
- Pitfalls: HIGH -- accordion browser limitations verified with multiple sources; Astro script dedup confirmed in official docs
- Copy frameworks: MEDIUM -- well-known marketing patterns but subjective; specific headline impact claims unverified
- FAQ content: LOW -- placeholder questions based on common patterns; real content requires Alan's input

**Research date:** 2026-02-11
**Valid until:** 2026-03-11 (stable -- no fast-moving dependencies)
