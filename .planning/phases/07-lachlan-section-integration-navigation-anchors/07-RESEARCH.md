# Phase 7: Lachlan Section Integration + Navigation Anchors - Research

**Researched:** 2026-04-24
**Domain:** Astro 5 single-page integration + Lenis smooth-scroll anchor navigation + content authoring for a second mentor profile
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MENTOR-01 | Clear visual break between Allan's content and Lachlan's section (divider or design transition) | Reference patterns exist: `border-b border-white/5` used on Companies SectionWrapper (`index.astro:156`); gold-line eyebrow divider at `index.astro:117`, `266-268`; full-bleed background image section at `index.astro:218-260`. Recommended: insert a thin section divider between Allan's About (`index.astro:109-153`) and the Companies block, then let `MentorIntro.astro` begin with its own `py-20 sm:py-32` spacing. |
| MENTOR-02 | Split-grid layout — photo LEFT, text RIGHT (flipped from Allan) | `MentorIntro.astro` ALREADY implements this via `flip={true}` prop (`MentorIntro.astro:64-82` = image-left block; `:114-131` = image-right block). Phase 7 just passes `flip={true}` when calling the component. |
| MENTOR-03 | Lachlan's credentials: co-founder Bellum Advisors, CEO boltloop.co, solo agency scaling | Content-only requirement. Feeds the `credentials: string[]` prop (2-4 paragraphs). Existing companies bar in `index.astro:169-214` ALREADY features `boltloop.co` as one of Allan's 4 cards — content copy must avoid double-claiming ownership (see Pitfall 5). |
| MENTOR-04 | Subtle reference to fighting / physical discipline — no gym-bro framing | Content-only requirement. Soft-risk flagged in STATE.md. Feeds into the last paragraph of `credentials[]`. |
| MENTOR-05 | Three specialty cards: solo agency scaling, co-founder work, AI/automation | `MentorIntro.astro` ALREADY renders 3-card grid (`:138-165`). Feeds `specialties: Specialty[]` prop. Icons available: `automation.webp`, `team-training.webp`, `analytics.webp`, `funnel.webp`, `business-fit.webp`, `custom-development.webp`, `tier-growth.webp`, `contract.webp` (all already exist in `public/images/icons/`). |
| MENTOR-06 | "Who Lachlan works with" self-identification block | `MentorIntro.astro` ALREADY renders this (`:168-185`). Feeds `audienceHeading` + `audienceItems: AudienceItem[]` props. |
| MENTOR-07 | CTA routes to Allan's Calendly placeholder | Feeds `cta: { label, href }` prop. Allan's Calendly URL is already used twice in `index.astro` (hero at line 72, why-section at line 323) and once in `Header.astro:39,82`: `https://calendly.com/allan-chan-roseyco/one-on-one`. |
| NAV-04 | Header links to `#allan`, `#lachlan`, `#faq` with smooth scroll, desktop + mobile | Header.astro currently has only `{label:"Home", href:"/"}` in `navLinks` (line 10-12). Lenis 1.3.17 (confirmed installed in `node_modules/lenis/package.json`) supports native anchor navigation via `anchors: true` option — currently NOT set in `Base.astro:50-54`. Existing `scroll-padding-top: var(--header-height)` already present in `global.css:115` — Lenis respects this via its `offset` option. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

No `./CLAUDE.md` exists at the project root. Only the user's global `~/.claude/CLAUDE.md` applies. Its single repo-relevant directive:

- **Git identity is locked:** Commit/push as `TeamRoseyCo <team@elevateoco.com>`. Never as `watkbh247@gmail.com` or `Chase Buchanan`. Global git config is already set — no per-repo action needed.
- **Remote:** Push to the RoseyCoUk GitHub account (already the configured remote, no action needed in Phase 7 scope).

No other project-scoped constraints. No project `.claude/skills/` or `.agents/skills/` directory exists.

## Summary

Phase 7 is an **integration + content + navigation** phase. It is the thinnest of the three Lachlan phases — everything structural (image pipeline, component shell) was delivered in Phase 6. The work splits into three independent tracks that can be parallelized:

**Track A (Content authoring & MentorIntro wiring):** Import `MentorIntro.astro` into `src/pages/index.astro` at approximately line 153 — between Allan's About section (`<!-- About Section (Editorial Layout) -->`) and the Companies section (`<!-- Companies Section -->`). Write Lachlan's content — 2-4 bio paragraphs (incorporating Bellum Advisors, boltloop.co, solo-agency scaling, and a subtle fighting/discipline reference), three specialty descriptions, a `"Who Lachlan works with"` heading + 3-4 audience items, and a CTA `{ label, href }`. Pass `flip={true}` and `id="lachlan"` so the section is on the LEFT-image layout and is targetable by the header anchor.

**Track B (Header anchor navigation):** Extend `Header.astro` `navLinks` array to include three new links — `{label:"Allan", href:"#allan"}`, `{label:"Lachlan", href:"#lachlan"}`, `{label:"FAQ", href:"#faq"}`. Because the site is single-page and the header is rendered via `Astro.url.pathname` (`Base.astro:34`), the existing `currentPath === link.href` logic would break for hash links (a hash link is never equal to `/`); the "active" styling logic needs to be preserved for the Home label only, or a `isAnchor?: boolean` field added. Add `id="allan"`, `id="lachlan"`, `id="faq"` to the three target sections in `index.astro`. Enable Lenis anchor support by changing `new Lenis({ lerp: 0.08, wheelMultiplier: 0.8, smoothWheel: true })` in `Base.astro:50-54` to `new Lenis({ lerp: 0.08, wheelMultiplier: 0.8, smoothWheel: true, anchors: { offset: -72 } })` — the `-72` offset compensates for the fixed 4.5rem header (72 px) so the target section's top lines up with the viewport edge below the header, not hidden behind it.

**Track C (Visual divider between Allan and Lachlan):** Add a minimal section divider between Allan's About section and the new Lachlan section to satisfy MENTOR-01. Keep it consistent with the existing aesthetic — options: (1) the same gold-line eyebrow pattern used elsewhere (`<div class="h-[1px] w-12 bg-gold"></div>`); (2) a full-width hair-line `border-t border-white/5`; (3) a subtle section break with a small centered gold label. Recommendation: option (3) — a narrow label like `"The Specialist"` above the Lachlan section's H2 (which the `eyebrow` prop already provides) combined with an extra `pt-20` of breathing room before Lachlan's section starts, leveraging the natural transition from Allan's image to Lachlan's image.

**Primary recommendation:** Pass `flip={true}`, `id="lachlan"`, and `eyebrow="The Specialist"` to `MentorIntro` at `index.astro` line ~153. Add `anchors: { offset: -72 }` to the Lenis init in `Base.astro`. Extend `Header.astro` navLinks with hash anchors. Add `id="allan"` to the existing About section and `id="faq"` to the existing FAQ SectionWrapper. Content copy for Lachlan is the biggest risk — review once with a human before shipping to ensure the fighting reference is tasteful.

## Standard Stack

### Core (already installed — no version changes)

| Library | Version (locked) | Purpose in Phase 7 | Why Standard |
|---------|------------------|---------------------|--------------|
| Astro | 5.17.1 | Single-page integration; `.astro` component composition | Already all other pages authored this way |
| Lenis | 1.3.17 | Smooth-scroll with `anchors: true` native hash-link support | Already wired in `Base.astro`; upgrading one config line unlocks NAV-04 |
| Motion One (`motion`) | 12.34.0 | Scroll-triggered animations already inherited by MentorIntro via `data-motion` | No new JS needed in Phase 7 |
| SplitType | 0.3.4 | Word/char stagger on headlines | Reused via `data-motion="stagger-words"` — no changes |
| Tailwind CSS | 4.1.18 | Utility classes for divider, spacing, hover states | Tokens already defined in `global.css` |

### No New Dependencies Required

| Capability Needed | Already in stack | Action in Phase 7 |
|-------------------|------------------|--------------------|
| Smooth-scroll anchor navigation on hash-link click | Lenis 1.3.17 `anchors` option | Add `anchors: { offset: -72 }` to Lenis config in `Base.astro:50-54` |
| Header offset compensation for anchor targets | CSS `scroll-padding-top` already set (`global.css:115`) | None — but also pass `offset` to Lenis so it matches |
| MentorIntro component | Delivered in Phase 6 (`src/components/MentorIntro.astro`) | Import + render with props |
| Optimized Lachlan portrait WebP | Delivered in Phase 6 (`public/images/lachlan/lachlan-portrait.webp` = 164 KB — verified) | Pass `image.src` to `MentorIntro` |
| Visual section divider | Existing gold-line / border-b patterns in codebase | Choose one pattern, apply between Allan & Lachlan |
| 3-card specialty grid with icons | Existing `public/images/icons/*.webp` inventory | Pick 3 icons, write 3 descriptions |

**Installation:** None. `pnpm install` only if node_modules is stale.

**Version verification (2026-04-24):** No new packages. Installed versions match `package.json` — confirmed by presence of `node_modules/lenis/package.json` = 1.3.17, which is the same version documented to support `anchors: true`.

### Alternatives Considered

| Instead of | Could Use | Tradeoff | Decision |
|------------|-----------|----------|----------|
| Lenis `anchors: true` | Manual `document.querySelectorAll('a[href^="#"]').forEach(...)` + `lenis.scrollTo(href)` on click | Custom handler must manage URL hash updates, focus management, and work with `astro:after-swap`. Lenis's built-in already covers these. | **Lenis `anchors`** — native, one-line config |
| CSS `scroll-padding-top` only | Rely on existing `global.css:115` (`scroll-padding-top: var(--header-height)`) | `scroll-padding` only affects native browser scroll; Lenis's JS-driven scroll ignores it unless the `offset` option is ALSO set. Leaving Lenis without `offset` will land the target flush against the top of viewport, hidden behind the fixed header. | **Pass `offset: -72`** to Lenis (or `-72px`). Keep `scroll-padding-top` for non-Lenis fallback (e.g., `prefers-reduced-motion` paths). |
| Full header redesign | Rebuild Header.astro with dropdowns / mega-menu | Out of scope; phase goal is incremental anchor insertion. | **Extend `navLinks` array** only |
| Active-link highlighting based on `IntersectionObserver` | Track which section is in view and mark the corresponding nav link "active" | Nice polish but not required by NAV-04. Adds JS complexity. | **Defer** — keep only the Home current-path logic for now |
| Render Allan's About via `MentorIntro.astro` too | Refactor Allan's section into the same component for symmetry | Tempting for DRY, but risks breaking Allan's shipped hero flow. Allan's section has a unique italic-quote paragraph (`:131-133`) that doesn't fit the `credentials[]` structure. | **Keep Allan as hand-rolled**; use MentorIntro only for Lachlan. Document this asymmetry in STATE. |

## Architecture Patterns

### Recommended File Changes

```
src/
├── components/
│   └── Header.astro                # MODIFIED — navLinks array + active-state logic tweak
├── layouts/
│   └── Base.astro                  # MODIFIED — Lenis config: add `anchors: { offset: -72 }`
└── pages/
    └── index.astro                 # MODIFIED — import MentorIntro, insert between lines 153 and 155,
                                    #            add id="allan"/"faq", pass props (content)
```

**No new files created.** Phase 7 is pure integration.

### Pattern 1: Inserting `MentorIntro` into `index.astro` (Track A)

**Target location:** Between the closing `</section>` of Allan's About section (`index.astro:153`) and the opening `<!-- Companies Section -->` comment (`index.astro:155`).

**Shape to follow:**

```astro
---
// At top of index.astro, add this import alongside existing imports:
import MentorIntro from "../components/MentorIntro.astro";

// Add a data block defining Lachlan's content (mirrors the existing `metrics`, `services`, `results` const pattern):
const lachlanSpecialties = [
  { icon: "analytics",       name: "Solo Agency Scaling",   desc: "From founder-led to systemized — build an agency that runs on process, not your calendar." },
  { icon: "team-training",   name: "Co-Founder Operator",   desc: "I partner directly with founders to run operations, sales, or delivery so you can focus on growth." },
  { icon: "automation",      name: "AI & Automation",       desc: "As CEO of boltloop.co I build custom AI systems that eliminate the repetitive work inside your business." },
];

const lachlanAudience = [
  { title: "Solo agency owners",    desc: "you are billing well but can't get off the delivery treadmill" },
  { title: "Early-stage founders",  desc: "you need an operator partner, not another consultant" },
  { title: "Ops-heavy businesses",  desc: "your team is drowning in repetitive tasks AI should be doing" },
];

const lachlanCredentials = [
  "I'm co-founder of Bellum Advisors and CEO of boltloop.co — a division of Elevateo Co focused on AI and automation for operator-owned businesses.",
  "Before that, I spent years scaling solo agencies from founder-led chaos into systemized, process-run teams. I know the exact bottlenecks because I've lived them.",
  "Outside work I train — physical discipline is non-negotiable for me, and it has shaped how I show up in business: consistent, precise, and willing to do the unglamorous reps.",
];
---

{/* ... Allan's About section ends at line 153 ... */}

{/* NEW: Lachlan section */}
<MentorIntro
  id="lachlan"
  eyebrow="The Specialist"
  name="Lachlan"
  headline="Meet Lachlan"
  credentials={lachlanCredentials}
  image={{ src: "/images/lachlan/lachlan-portrait.webp", alt: "Lachlan MacDonald" }}
  flip={true}
  cta={{ label: "Book a Call", href: "https://calendly.com/allan-chan-roseyco/one-on-one" }}
  specialties={lachlanSpecialties}
  audienceHeading="Who Lachlan works with"
  audienceItems={lachlanAudience}
/>

{/* ... Companies Section continues at original line 155+ ... */}
```

**When to use:** Single-use — this is the integration point; the component is not reused elsewhere in v1.1.

**Note on `id="allan"`:** Allan's existing About section (`index.astro:109`) has no `id`. Add `id="allan"` to its opening `<section>` tag so `#allan` anchors resolve. Equivalent change: replace line 109 `<section class="overflow-hidden relative py-20 sm:py-32">` with `<section id="allan" class="overflow-hidden relative py-20 sm:py-32">`.

**Note on `id="faq"`:** The FAQ block at `index.astro:332` uses `<SectionWrapper width="narrow" class="py-24 sm:py-32">` with no `id`. The `SectionWrapper` component accepts an `id` prop (`SectionWrapper.astro:5,11,22`). Change line 332 to `<SectionWrapper width="narrow" id="faq" class="py-24 sm:py-32">`.

### Pattern 2: Enabling Lenis Anchor Navigation (Track B)

**Why this matters:** Without `anchors: true`, Lenis actively **prevents** anchor-link scrolling (confirmed in README: *"By default, Lenis will prevent anchor links from working while scrolling"*). Clicking `#lachlan` in the header will do nothing — or worse, jump-cut natively and then be interrupted.

**The fix (in `src/layouts/Base.astro`):**

```diff
// Base.astro:50-54
- lenis = new Lenis({
-   lerp: 0.08,
-   wheelMultiplier: 0.8,
-   smoothWheel: true,
- });
+ lenis = new Lenis({
+   lerp: 0.08,
+   wheelMultiplier: 0.8,
+   smoothWheel: true,
+   anchors: {
+     offset: -72,              // compensate for fixed 4.5rem (72px) header
+   },
+ });
```

**Why `-72`?** The site uses a fixed-position header at 4.5rem height (`global.css:101`; `Header.astro:17` = `h-18` = 72px). When Lenis scrolls to a target section, the target's `top` aligns with viewport y=0 — but the header's bottom edge is at y=72. Without offset, the section's top 72px would sit behind the header. Negative offset scrolls 72px farther, so the target's top is at y=72 (right below the header).

**Sign convention caveat:** Lenis's `anchors.offset` maps to its internal `scrollTo` offset, which is **added** to the target position. Behavior verified below in Open Questions — the plan should probe by manually testing with both `offset: 72` and `offset: -72` once implemented.

### Pattern 3: Header Anchor Links (Track B)

**Current state (`Header.astro:10-12`):**
```typescript
const navLinks = [
  { label: "Home", href: "/" },
];
```

**Recommended change:**
```typescript
const navLinks = [
  { label: "Allan",   href: "#allan" },
  { label: "Lachlan", href: "#lachlan" },
  { label: "FAQ",     href: "#faq" },
];
```

**Drop the "Home" link.** On a single-page site, `href="/"` is a full navigation (it reloads the page). The three anchor links replace it.

**Active-state logic:** Lines 28-33 and 70-75 use `currentPath === link.href`. For hash links, `currentPath` (from `Astro.url.pathname`) is always `/`, never `#allan`. The comparison fails silently — all links render in "inactive" style. This is fine behaviorally (no broken styling, just no "current" highlight). If an in-view highlight is desired, it's an enhancement deferred outside this phase.

**Mobile menu close-on-click:** Already handled at `Header.astro:121-127` — the mobile menu auto-closes when any `<a>` inside is clicked. This works for anchor links too.

### Pattern 4: Visual Divider Between Allan and Lachlan (Track C / MENTOR-01)

**What:** A subtle visual transition that tells the visitor "you are now moving from Allan's section to a different person's section."

**Three options, ranked:**

1. **Relying on MentorIntro's own `eyebrow` label + natural spacing (RECOMMENDED):** `MentorIntro.astro:86-89` already renders an eyebrow with `<div class="h-[1px] w-12 bg-gold"></div>` + the gold uppercase label. Combined with the component's own `py-20 sm:py-32` vertical padding (`:60`), this creates ~320px of breathing room between Allan's image and Lachlan's headline. The eyebrow label ("The Specialist") is itself the divider — it announces the new section.

2. **Adding a full-bleed hair-line `border-t border-white/5` on the MentorIntro's outer `<section>`:** Minimal visual weight. Add `class:list={["overflow-hidden relative py-20 sm:py-32 border-t border-white/5"]}` to MentorIntro's opening `<section>` (line 60). Matches the existing divider on the Companies SectionWrapper (`index.astro:156`: `class="py-20 sm:py-32 border-b border-white/5"`).

3. **Centered ornamental divider (e.g., `· · ·` or small gold line between sections):** Extra markup, most visible. Over-designed for this aesthetic.

**Recommendation:** Go with **option 1 + option 2 together** — the eyebrow does the semantic work, and a hair-line `border-t border-white/5` provides the "crisp crease" between Allan's image and Lachlan's section. This is additive, costs one class, and matches the Companies section's existing `border-b`. Requires one small edit to `MentorIntro.astro` (or can be wrapped by adding `class="border-t border-white/5"` — but MentorIntro doesn't accept a top-level `class` prop, so the simplest path is adding a bare `<div class="border-t border-white/5"></div>` between the Allan `</section>` and `<MentorIntro .../>` in `index.astro`).

### Anti-Patterns to Avoid

- **Hard-coding `<a href="#anchor">` with a manual onClick JS handler** — Lenis's `anchors` option handles the click + prevent-default + scrollTo in one line. Don't reimplement it.
- **Forgetting `anchors: { offset }`** — scroll-padding-top in CSS works for NATIVE scroll but Lenis intercepts anchor clicks with its own scrollTo. Without `offset`, the target top hides under the fixed header.
- **Keeping `href="/"` Home link alongside hash anchors** — mixes navigation modes on a single-page site. Confusing and visually wastes nav space.
- **Modifying `Allan's About section` to use `MentorIntro.astro`** — out of scope, risks breaking shipped v1. Phase 7 adds a SECOND mentor below Allan; it does not refactor the first.
- **Inserting the MentorIntro import inside the JSX body** — Astro imports belong in the frontmatter block (above `---`), not inline in the template.
- **Adding `id="lachlan"` to a wrapping `<div>` instead of the opening section** — anchor offsets are measured from the element with the `id`. Put it on the outer `<section>` (which `MentorIntro` does when `id` prop is passed, see `MentorIntro.astro:60`). Phase 7 just needs to pass `id="lachlan"` — no restructuring of MentorIntro.
- **Using Astro slots to pass Lachlan's content** — `MentorIntro` is **explicitly props-driven** (D-07/D-08 locked in Phase 6). Phase 7 must pass structured `credentials`, `specialties`, `audienceItems` arrays.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll to hash anchor | Custom `addEventListener('click')` on nav links + `element.scrollIntoView({ behavior: 'smooth' })` | Lenis `anchors: { offset: -72 }` in Base.astro config | Lenis already owns scroll. Browser-native `scrollIntoView` conflicts with Lenis's RAF loop and produces jank. One-line config beats a hand-rolled click handler. |
| URL hash update on navigation | Manual `history.pushState({}, '', href)` on click | Lenis handles this automatically when `anchors: true` | Lenis updates the URL hash to match the scrolled-to target. Reimplementing is both bug-prone and redundant. |
| Active nav-link highlighting | Hand-rolled `IntersectionObserver` tracking which section is in view | **Defer** — not a Phase 7 requirement. If ever needed, use `motion`'s `scroll(callback)` API already imported in Base.astro | NAV-04 does not require active-state tracking. Don't inflate scope. |
| Mentor section structural shell | New Astro component for Lachlan's bio + specialties + audience | **Phase 6's `MentorIntro.astro`** — already built, props-driven, handles flip + anchor id | Shell is already delivered; Phase 7 is pure usage. |
| Photo → WebP conversion | Custom image optimization call in Phase 7 | **Phase 6's `public/images/lachlan/lachlan-portrait.webp`** (164 KB, verified) | Already exists on disk. |
| Fixed-header offset for anchor landing | `scroll-margin-top` utility on every target section | `scroll-padding-top` (already set globally in `global.css:115`) + Lenis `offset` | Global CSS rule covers every anchor target with one declaration; per-section `scroll-margin` is repetitive. |
| Calendly CTA styling | Custom button markup for Lachlan's CTA | `Button.astro` (same component used by Allan's CTAs) — invoked via MentorIntro's `cta` prop | Matches the site's btn-shimmer + variant system. Already wired. |

**Key insight:** Phase 7 is 80% content-writing and prop-wiring, 15% Lenis config + header tweaks, 5% a small visual divider. Zero new components, zero new libraries, zero new assets. Every technical affordance the phase needs is already in the codebase — the ONLY risk areas are (1) content tone for MENTOR-04, and (2) verifying the Lenis offset sign convention with a manual test.

## Runtime State Inventory

> Phase 7 is **not a rename or refactor phase** — it is an additive integration. This section documents what existing runtime state the new integration touches, for completeness.

| Category | Items Found | Action Required |
|----------|-------------|-------------------|
| Stored data | None — no database, no localStorage, no serverless state touches this phase | None |
| Live service config | None — Calendly link is hard-coded to Allan's URL, documented placeholder per MENTOR-07 and STATE.md decision | None (swap link when Lachlan's Calendly provided — tracked as a STATE.md pending todo, not a Phase 7 task) |
| OS-registered state | None — static site, no background services, no scheduled tasks | None |
| Secrets/env vars | None touched. `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` exist for `/api/subscribe` route but are unrelated to this phase | None |
| Build artifacts | `dist/` is regenerated by `pnpm run build` — no stale artifact risk from this phase's code changes | None (standard `pnpm run build` on deploy) |

**Nothing found in any category requires migration work.** Phase 7 is safe to ship without any data or service coordination.

## Common Pitfalls

### Pitfall 1: Lenis `anchors` Offset Sign Convention

**What goes wrong:** Engineer passes `anchors: { offset: 72 }` (positive 72) expecting "scroll 72px short of the target to leave room for the header." Result is inverted — the target lands 72px below the intended spot (or 72px above, depending on Lenis's internal math). Visitor clicks `#lachlan`, lands looking at the middle of Lachlan's bio paragraph, not his eyebrow/headline.

**Why it happens:** Lenis's `offset` semantics are documented as *"equivalent to `scroll-padding-top`"* but the convention — positive vs. negative — is NOT clearly spelled out in the public README. Different smooth-scroll libraries use opposite signs (GSAP ScrollTo uses positive offsets for "scroll less," Motion One's scroll API varies). Safer to test empirically.

**How to avoid:**
1. In the implementation task, set `offset: -72` as the first attempt.
2. Test by clicking the `Lachlan` nav link and visually confirming the section's eyebrow ("The Specialist") is fully visible, NOT tucked under the header.
3. If the target is under the header: flip the sign to `offset: 72`.
4. Document the final working value in a code comment: `// offset = -72 because header is 72px fixed`.

**Warning signs:** After clicking a nav anchor, the target section's topmost content (eyebrow + H2) is obscured by the fixed header. OR there's a noticeable extra gap above the target section.

**Source:** [Lenis README §Anchor links](https://github.com/darkroomengineering/lenis/blob/main/README.md) — HIGH confidence for the existence of the option; MEDIUM confidence for sign convention (requires empirical test).

### Pitfall 2: Anchor Click Works on Load But Breaks After Page Interaction

**What goes wrong:** After clicking a nav anchor once, subsequent clicks stop scrolling. Or anchors work in `astro dev` but not in production after an SPA-style navigation.

**Why it happens:** `Base.astro:40-230` wraps the Lenis init in `initLenis()` and calls it on load + on `astro:after-swap`. However, if Lenis's `anchors` behavior is attached at construction time and NOT reattached after re-init, the second Lenis instance might lose the click handlers OR have stale handlers fighting each other. Additionally, `lenis?.destroy()` at line 49 is called before re-init — if destroy doesn't clean up anchor-click listeners, they accumulate.

**How to avoid:**
1. `initLenis()` already destroys the old instance before creating a new one — good. Verify that `destroy()` in Lenis 1.3.17 also removes anchor-click listeners. Per README, `destroy()` is documented to clean up all listeners including anchors.
2. The site is a single-page Astro site with no view transitions (no `<ViewTransitions />` in Base.astro), so `astro:after-swap` essentially never fires in practice. The re-init path is cold. Primary path is "load once on initial page visit."
3. After implementation, test by: load page → click `Lachlan` nav → wait 2s → click `Allan` nav → wait 2s → click `FAQ` nav. All three should scroll smoothly every time.

**Warning signs:** Second or third anchor click does nothing, or produces jump-scroll instead of smooth.

**Source:** Direct inspection of `Base.astro:48-64`. MEDIUM confidence — Lenis destroy semantics for anchors listener not fully confirmed in README.

### Pitfall 3: `href="/#anchor"` Triggers Full-Page Reload

**What goes wrong:** Engineer writes `href="/#lachlan"` (with leading slash) thinking it's safer for multi-page sites. On a single-page site this is fine, but if the browser interprets it as "go to `/` AND then fragment `#lachlan`", it may trigger a full reload. Even when it doesn't, Astro's routing observer might intercept the `/` and navigate.

**Why it happens:** Habit from multi-page apps. On THIS site, `/` IS the only page, so bare `#lachlan` is correct and safer.

**How to avoid:** Use bare hash anchors in `Header.astro`:
```typescript
{ label: "Lachlan", href: "#lachlan" },   // ✓ Good — no leading slash
{ label: "Lachlan", href: "/#lachlan" },  // ✗ Bad — may reload
```

**Warning signs:** Clicking the nav link causes a visible page flash / full reload / loss of scroll position.

**Source:** [MDN — URL fragments and anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/href) — HIGH confidence.

### Pitfall 4: Lachlan's Fighting Reference Reads as "Gym Bro"

**What goes wrong:** Writer tries to work the fighting reference in and over-indexes on it. Copy reads like "Lachlan is a beast in and out of the gym — he brings that same warrior energy to every client engagement." Business-owner audience ($500K–$1M+ cohort) instantly pattern-matches "bro marketing" and bounces. MENTOR-04's locked tone requirement is violated.

**Why it happens:** The fighting angle is novel and visible; writer highlights it because it's differentiating. But the AUDIENCE doesn't care about the fighting — they care about the business credentials. The fighting should be a ONE-LINE character detail, not a framing device.

**How to avoid:**
1. Bury the fighting reference at the END of the last credential paragraph, one sentence max.
2. Frame it as DISCIPLINE (consistency, reps, precision), NOT physicality (warrior, beast, grind).
3. Recommended template: *"Outside work I train — physical discipline is non-negotiable for me, and it has shaped how I show up in business: consistent, precise, and willing to do the unglamorous reps."* — this works because it uses fighting as a METAPHOR for work ethic, not as a personality brag.
4. Human review before ship: have one non-engineer read Lachlan's bio and answer "does this feel like gym-bro?" If yes, rewrite.

**Warning signs:** The word "beast," "warrior," "grind," "alpha," or "savage" appears anywhere in Lachlan's copy. OR the fighting reference opens a paragraph. OR more than two sentences about fighting appear.

**Source:** STATE.md Concern #1 (tone calibration); brand voice already established in existing copy (`index.astro:126-133` is Allan's first-person style — calm, specific, zero machismo). HIGH confidence — directly anchored in project tone.

### Pitfall 5: Double-Claiming boltloop.co

**What goes wrong:** Allan's existing Companies section (`index.astro:192-202`) describes boltloop.co as one of "Companies I've Built." Lachlan's bio describes him as "CEO of boltloop.co." A reader scrolls past Allan's claim and then reads Lachlan's claim and thinks: "Wait — who owns boltloop? Is this a real company?"

**Why it happens:** Both statements are technically accurate (Allan's portfolio includes a stake; Lachlan runs it day-to-day as CEO). But when a reader encounters both without context, the redundancy reads as inconsistency.

**How to avoid:** In Lachlan's copy, frame boltloop.co as "a division of Elevateo Co" (which aligns with PROJECT.md line 67: *"CEO of boltloop.co (a division of Elevateo)"*). This makes the relationship transparent: Elevateo is the holding company (Allan's portfolio); boltloop is a specific division Lachlan runs as CEO. Both claims are true and non-conflicting.

Example phrasing (already in the recommended `credentials` draft above):
> "I'm co-founder of Bellum Advisors and CEO of boltloop.co — a division of Elevateo Co focused on AI and automation for operator-owned businesses."

**Warning signs:** Reader (non-technical) reads both sections consecutively and asks "so who actually owns boltloop?" Copy review should catch this.

**Source:** `.planning/PROJECT.md` line 67 — decision already captured. Direct inspection of `src/pages/index.astro:169-214`.

### Pitfall 6: MentorIntro's Three SectionWrapper Blocks = Three Section Breaks

**What goes wrong:** `MentorIntro.astro` internally renders THREE sibling sections (`:60-135` bio, `:138-165` specialties, `:168-185` audience). Each is a separate vertical block with its own `py-20 sm:py-32`. Total vertical footprint when rendered: roughly 60–80 rem of content. If the planner expects "one compact section," the visible footprint is actually long — longer than Allan's entire About-section alone.

**Why it happens:** The component was designed in Phase 6 as a FULL mentor shell (bio + specialties + audience). It's not a compact bio block.

**How to avoid:** Confirm page flow with the full vertical stack in mind:
- Hero (`min-h-[95vh]`)
- Authority metrics bar
- Allan About section (`py-20 sm:py-32`)
- **[NEW] Lachlan bio + specialties + audience** (~3× `py-20 sm:py-32`)
- Companies section (`py-20 sm:py-32`)
- What I Help With (`py-24 sm:py-32`)
- Results section (`py-24 sm:py-32`)
- Why section (`py-24 sm:py-32`)
- FAQ (`py-24 sm:py-32`)
- Email signup (`py-24 sm:py-32`)

The page becomes ~30% longer. This is acceptable for the v1.1 goal ("second mentor gets real estate"), but the planner should not expect a tight visual insertion — it is a substantial new block.

**Warning signs:** QA comment "the Lachlan section is huge" — this is expected, not a bug.

**Source:** Direct inspection of `src/components/MentorIntro.astro:60,138,168`.

### Pitfall 7: `id="allan"` Conflict with Existing Astro.url.pathname-based Active Logic

**What goes wrong:** Adding `id="allan"` to Allan's `<section>` and dropping the `Home` nav link means `Astro.url.pathname` active-state logic in `Header.astro:30-33` and `:72-75` never matches any current link. The comparison `currentPath === link.href` is ALWAYS false for hash links. All three nav items render in "inactive" style.

**Why it happens:** Active-state logic was written for multi-page navigation. Not a bug per se — nav items just don't show a "current" indicator.

**How to avoid:** This is **acceptable behavior** — no nav link is visually "active" but all three function correctly. If an active-state highlight is desired later, it requires `IntersectionObserver` tracking (scope for a future phase, NOT Phase 7).

Alternative micro-fix: remove the `currentPath === link.href ? "..." : "..."` conditional entirely and render all nav links in a single consistent style. This is cleaner than keeping dead logic. One-line simplification.

**Warning signs:** None — behavior is correct as-is. This pitfall is a heads-up for the planner, not a bug to fix.

**Source:** Direct inspection of `Header.astro:28-36,68-79`.

### Pitfall 8: Anchor Navigation Does Not Work with `prefers-reduced-motion`

**What goes wrong:** User with `prefers-reduced-motion: reduce` enabled clicks an anchor link. Lenis's anchor behavior might still animate the scroll (Lenis does not have a built-in `prefers-reduced-motion` short-circuit). Accessibility complaint.

**Why it happens:** Lenis doesn't respect `prefers-reduced-motion` by default. Current `Base.astro:50-54` Lenis init unconditionally enables smooth scroll.

**How to avoid:**
1. Current `global.css:175-179` already disables `[data-motion]` transitions for `prefers-reduced-motion`.
2. For Lenis specifically, add a reduced-motion check inside `initLenis()`:
   ```js
   const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   lenis = new Lenis({
     lerp: prefersReduced ? 1 : 0.08,     // lerp 1 = instant (no smoothing)
     wheelMultiplier: 0.8,
     smoothWheel: !prefersReduced,
     anchors: { offset: -72 },
   });
   ```
3. `lerp: 1` makes the scroll "instant" (effectively native); `smoothWheel: false` disables wheel smoothing entirely. Anchor clicks still work but jump-to rather than glide-to.

**Warning signs:** `axe` or Lighthouse accessibility audit flags the smooth-scroll behavior.

**Source:** [Lenis GitHub — prefers-reduced-motion discussion](https://github.com/darkroomengineering/lenis/discussions) — MEDIUM confidence. [web.dev prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — HIGH confidence for the CSS media query.

## Code Examples

Verified patterns from THIS codebase:

### Existing Lenis init (source: `src/layouts/Base.astro:48-64`)
```typescript
let lenis: Lenis;

function initLenis() {
  lenis?.destroy();
  lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.8,
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

initLenis();
document.addEventListener("astro:after-swap", initLenis);
```

### Target Lenis init (Phase 7)
```typescript
lenis = new Lenis({
  lerp: 0.08,
  wheelMultiplier: 0.8,
  smoothWheel: true,
  anchors: {
    offset: -72,   // match fixed-header height (4.5rem = 72px)
  },
});
```

### Existing header nav array (source: `src/components/Header.astro:10-12`)
```typescript
const navLinks = [
  { label: "Home", href: "/" },
];
```

### Target header nav array (Phase 7)
```typescript
const navLinks = [
  { label: "Allan",   href: "#allan" },
  { label: "Lachlan", href: "#lachlan" },
  { label: "FAQ",     href: "#faq" },
];
```

### MentorIntro invocation (what Phase 7 adds to `index.astro` ~ line 154)
```astro
<MentorIntro
  id="lachlan"
  eyebrow="The Specialist"
  name="Lachlan"
  headline="Meet Lachlan"
  credentials={lachlanCredentials}
  image={{ src: "/images/lachlan/lachlan-portrait.webp", alt: "Lachlan MacDonald" }}
  flip={true}
  cta={{ label: "Book a Call", href: "https://calendly.com/allan-chan-roseyco/one-on-one" }}
  specialties={lachlanSpecialties}
  audienceHeading="Who Lachlan works with"
  audienceItems={lachlanAudience}
/>
```

### Existing `id`-on-SectionWrapper pattern (source: `src/pages/index.astro:369`)
```astro
<SectionWrapper width="narrow" id="signup" class="text-center">
```
Proves `id` prop on `SectionWrapper` already works — apply same pattern for `id="faq"` on line 332.

### Existing Section-with-id pattern for anchor
```astro
<!-- Currently in index.astro:109 — NO id, add one -->
<section class="overflow-hidden relative py-20 sm:py-32">    <!-- BEFORE -->
<section id="allan" class="overflow-hidden relative py-20 sm:py-32">    <!-- AFTER -->
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multi-page Astro site with `/`, `/about`, `/courses` routes | Single-page Astro site (only `src/pages/index.astro`) | Pivot 2026-02-12 — 2026-04-23 | Navigation moves from route-based to hash-anchor; NAV-04 is the formal expression of this |
| Hand-rolled IntersectionObserver for scroll animations | Motion One `inView()` + `data-motion` attributes | Pivot period | No change needed in Phase 7 |
| GSAP ScrollTrigger | Motion One + Lenis | Pivot period | Lenis's `anchors` option is the canonical solution here |
| Browser-native `scroll-behavior: smooth` | Lenis-driven smooth scroll | Since Phase 5 | `scroll-behavior: auto` is explicitly set in `global.css:113` so native doesn't fight Lenis |

**Deprecated / irrelevant:**
- Multi-page navigation in Header (`{label:"Home", href:"/"}` — being replaced in Phase 7).
- Pre-Pivot About/Courses page routes — already removed; `src/pages/` only has `index.astro` and `api/`.

## Open Questions

1. **Does `Lenis.anchors.offset` use positive or negative sign to push target below a fixed header?**
   - What we know: README says offset is "equivalent to scroll-padding-top." CSS `scroll-padding-top: 72px` is **positive** for pushing targets below a header. But Lenis's internal implementation may invert this.
   - What's unclear: Not empirically tested yet.
   - Recommendation: Implementation task tries `offset: -72` first; if the target is hidden under the header, flip to `offset: 72`. Document final value in code comment. Budget 5 minutes for this visual verification.

2. **Does Lenis's `anchors` option respect `prefers-reduced-motion` automatically, or must it be handled manually?**
   - What we know: Lenis has no documented `prefers-reduced-motion` handling. The site's motion observer in `Base.astro` does not coordinate with Lenis on this.
   - What's unclear: Whether Lenis anchor clicks animate even when smoothWheel is off.
   - Recommendation: Add the prefers-reduced-motion guard shown in Pitfall 8. Cheap, correct, and future-proof. Can be deferred to a polish pass if the plan chooses not to implement it in Phase 7.

3. **Should Allan's section be renamed/restructured to use `MentorIntro.astro` for symmetry?**
   - What we know: Phase 6 explicitly delivered `MentorIntro` as reusable for future refactor. Allan's current hand-rolled section has a unique italic-quote paragraph pattern.
   - What's unclear: Whether the product wants visual parity between Allan and Lachlan.
   - Recommendation: **Defer** — out of Phase 7 scope. Allan's section ships as-is; Lachlan uses MentorIntro. Document the asymmetry in STATE.md so it's not forgotten. If v1.2 wants refactor symmetry, that's a future phase.

4. **Does `Picture_with_War_Room_members.JPG` (now `lachlan-warroom.webp`) get used anywhere in Phase 7?**
   - What we know: Phase 6 processed it to `public/images/lachlan/lachlan-warroom.webp` (149.8 KB). STATE.md Concern #3 flags whether it's even needed. `.planning/research/PITFALLS.md` Pitfall 4 (referenced in Phase 6 RESEARCH) notes the photo is "explicitly forbidden at hero/feature size" due to party context + stolen social proof concerns.
   - What's unclear: Whether Phase 7 uses it in a small secondary spot, or leaves it unused.
   - Recommendation: **Don't use it in Phase 7.** The MentorIntro portrait slot uses `lachlan-portrait.webp`. There is no other natural slot in v1.1. If the product wants a "behind the scenes" group photo block later, that's a new requirement — not implicit in Phase 7's success criteria. The optimized asset stays on disk, unused, as deferred work.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `astro check`, `pnpm run build`, `pnpm run dev` | ✓ | 24.14.0 (confirmed in Phase 6 research) | — |
| pnpm | Install deps, run scripts | ✓ (project uses pnpm per `package.json.pnpm` field) | Any 9+ | `npm install` also works |
| Astro CLI | Dev server, build, check | ✓ | ^5.17.1 | — |
| Lenis 1.3.17 package | `anchors` option | ✓ | 1.3.17 (verified in `node_modules/lenis/package.json`) | — (dropping below 1.2 removes `anchors` option; do not downgrade) |
| `public/images/lachlan/lachlan-portrait.webp` | MentorIntro image prop | ✓ | 164,094 bytes (verified) | — (missing would block; Phase 6 already delivered) |
| Allan's Calendly URL | MentorIntro CTA href | ✓ | `https://calendly.com/allan-chan-roseyco/one-on-one` (hard-coded in 3 locations already) | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

**Note:** Phase 7 is a "no new installs" phase. `pnpm install` only needed if `node_modules/` is cleared.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | **None installed.** Same as Phase 6 — no `jest`, `vitest`, `playwright`, or similar. No `test` script in `package.json`. |
| Config file | None |
| Quick run command | `pnpm run astro check` — Astro's built-in TS + component type check. Runs in ~5–15 s. |
| Full suite command | `pnpm run build` — full Astro build (catches template errors, missing imports, broken prop types). Runs in ~20–45 s. |
| Manual smoke | `pnpm run dev` → open `http://localhost:4321` → click each nav anchor → visually confirm scroll lands correctly below header → click CTA → confirm Calendly tab opens |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MENTOR-01 | Visual break between Allan and Lachlan | manual-only | Visual check in `pnpm run dev` — eyebrow label + spacing + optional hair-line divider visible | — (automated visual-diff out of scope) |
| MENTOR-02 | Split-grid with photo LEFT, text RIGHT | integration | `pnpm run astro check` (confirms `flip={true}` prop passes TS) + visual check at `lg:` breakpoint in `pnpm run dev` | ✅ for typecheck; ❌ Wave 0 for any visual regression test |
| MENTOR-03 | Credentials copy mentions Bellum, boltloop, solo agency scaling | unit-ish | `grep -q "Bellum" src/pages/index.astro && grep -q "boltloop" src/pages/index.astro && grep -q "solo" src/pages/index.astro` | ✅ (one-line bash grep) |
| MENTOR-04 | Fighting reference is subtle, not gym-bro | manual-only | Human read-through of bio paragraphs; checklist from Pitfall 4 | — (no automated tone check) |
| MENTOR-05 | 3 specialty cards present with correct icons | integration | `pnpm run astro check` + visual check at `md:` breakpoint | ✅ |
| MENTOR-06 | "Who Lachlan works with" block renders with 3+ audience items | integration | `pnpm run astro check` (TS enforces `audienceItems: AudienceItem[]`) + visual check | ✅ |
| MENTOR-07 | CTA href points to Allan's Calendly | unit-ish | `grep -q "calendly.com/allan-chan-roseyco/one-on-one" src/pages/index.astro` returns at least 3 hits (hero, why, Lachlan's MentorIntro cta) | ✅ |
| NAV-04 | Header contains 3 anchor links: Allan/Lachlan/FAQ | unit | `grep -c 'href="#allan"\|href="#lachlan"\|href="#faq"' src/components/Header.astro` returns `6` (desktop + mobile) | ✅ |
| NAV-04 | Clicking anchor scrolls smoothly to target with correct offset | manual-only | `pnpm run dev` → click Allan / Lachlan / FAQ → confirm eyebrow label is visible below header, not hidden | — |
| NAV-04 | `id="allan"`, `id="lachlan"`, `id="faq"` exist on correct sections | unit | `grep -q 'id="allan"' src/pages/index.astro && grep -q 'id="lachlan"' src/pages/index.astro && grep -q 'id="faq"' src/pages/index.astro` | ✅ |
| Overall | Build passes with no template / TS errors | integration | `pnpm run build` exits 0 | ✅ |
| Overall | No CLS regressions introduced | manual-only | Lighthouse mobile score ≥ 90, CLS < 0.1 | — (optional, sanity check) |

### Sampling Rate

- **Per task commit:** `pnpm run astro check` (runs in ~10 s)
- **Per wave merge:** `pnpm run build` + the `grep` one-liners for NAV-04 + MENTOR-03/07
- **Phase gate:** Full build green + manual smoke test (click through all three nav anchors in dev server, verify scroll lands correctly with header offset accounted for) + human read-through of Lachlan's copy against Pitfall 4 checklist

### Wave 0 Gaps

- [ ] No test framework install is required — `astro check` + `astro build` + `grep` one-liners provide sufficient signal for this phase's scope.
- [ ] No new test files to author. The grep-based req→test map above is executable directly from the verification task's shell.
- [ ] Optional future enhancement (NOT Phase 7): add a `playwright` smoke test that clicks each anchor and asserts scroll position. Flag as a v1.2+ nice-to-have; not blocking for Phase 7 ship.

*(No Wave 0 test authoring needed. Phase 7's testable surface is covered by `astro check`, `astro build`, and a small set of grep assertions runnable inline.)*

## Sources

### Primary (HIGH confidence)

- **Direct file inspection (this codebase):**
  - `src/pages/index.astro` (full read, 447 lines) — location and structure of Allan's About section (lines 109-153), Companies section (155-215), FAQ section (332-357), integration point for Lachlan
  - `src/components/MentorIntro.astro` (full read) — prop interface, flip behavior via DOM ordering (lines 64-82 vs 114-131), internal three-section structure, data-motion wiring
  - `src/components/Header.astro` (full read, 128 lines) — `navLinks` array location (10-12), active-state logic (28-36, 68-79), mobile menu auto-close behavior (121-127), fixed h-18 header (lines 17, 92)
  - `src/layouts/Base.astro` (full read, 232 lines) — Lenis init in `initLenis()` at lines 48-64, reinit-on-swap wiring, Motion One observer
  - `src/components/SectionWrapper.astro` (full read) — supports `id` prop (confirmed via lines 5, 11, 22)
  - `src/components/Button.astro` (full read) — CTA component used by MentorIntro
  - `src/components/Card.astro` (full read) — card shell used by MentorIntro specialty cards
  - `src/styles/global.css` (full read, 407 lines) — `--header-height: 4.5rem` (line 101), `scroll-padding-top: var(--header-height)` (line 115), `scroll-behavior: auto` (line 113), prefers-reduced-motion rules (175-185)
  - `public/images/lachlan/lachlan-portrait.webp` stat → **164,094 bytes** (confirmed asset exists)
  - `public/images/lachlan/lachlan-warroom.webp` stat → **149,818 bytes** (confirmed asset exists)
  - `public/images/icons/` listing — confirmed `automation.webp`, `team-training.webp`, `analytics.webp`, `funnel.webp`, `business-fit.webp`, `custom-development.webp`, `tier-growth.webp`, `contract.webp` all present
  - `node_modules/lenis/package.json` → version 1.3.17 confirmed
  - `node_modules/lenis/README.md` lines 303-323 — direct inspection of `anchors` option docs

- **Lenis documentation:** [Lenis README § Anchor links](https://github.com/darkroomengineering/lenis/blob/main/README.md) — HIGH confidence for the `anchors` option existence and the `offset` config; MEDIUM for the exact sign convention (see Open Question #1).
- **Astro documentation:** [Astro components](https://docs.astro.build/en/basics/astro-components/) — confirms prop-passing semantics.
- **Prior phase research:**
  - `.planning/phases/06-lachlan-image-pipeline-mentorintro-component/06-RESEARCH.md` — MentorIntro prop interface, animation patterns, Allan's split-grid reference pattern
  - `.planning/phases/06-lachlan-image-pipeline-mentorintro-component/06-CONTEXT.md` — locked decisions D-07 through D-12
  - `.planning/PROJECT.md` line 67 — "CEO of boltloop.co (a division of Elevateo)" framing for MENTOR-05 copy
  - `.planning/STATE.md` Concerns #1 and #2 — tone calibration for fighting reference, Calendly placeholder

### Secondary (MEDIUM confidence)

- [darkroomengineering/lenis GitHub discussions](https://github.com/darkroomengineering/lenis/discussions) — general community usage patterns, `prefers-reduced-motion` approaches (MEDIUM — community posts, not official docs)
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — standard media-query behavior (HIGH at the spec level, MEDIUM for Lenis-specific integration)
- [digidop Lenis smooth scroll integration](https://www.digidop.com/blog/lenis-smooth-scroll) — Webflow-oriented walkthrough; confirms general `anchors` pattern

### Tertiary (LOW confidence)

- None. Every technical claim in this document is backed either by direct file inspection or by the official Lenis README / Astro docs.

## Metadata

**Confidence breakdown:**

- **Standard stack: HIGH** — all packages installed at confirmed versions; Lenis 1.3.17 verified on disk; MentorIntro component already built in Phase 6 and inspected line-by-line.
- **Architecture patterns: HIGH** — integration points identified by direct line-number reference in `index.astro`, `Header.astro`, `Base.astro`. Diff-level edits specified.
- **Pitfalls: HIGH for most; MEDIUM for Pitfall 1 (Lenis offset sign)** — sign convention requires empirical verification during implementation, documented as Open Question #1 with a 5-minute test plan.
- **Content recommendations (MENTOR-03/04/05/06): MEDIUM** — copy drafts are derived from PROJECT.md and STATE.md cues; require one human review pass before ship (captured as Pitfall 4 warning signs).
- **Validation architecture: HIGH** — same tooling as Phase 6 (`astro check`, `astro build`), plus simple `grep` assertions for the NAV-04 and MENTOR-03/07 requirements.

**Research date:** 2026-04-24
**Valid until:** 2026-05-24 (30 days — stack is stable; the only time-sensitive item is a hypothetical Lenis 1.4 with breaking `anchors` API changes, which is not imminent).
