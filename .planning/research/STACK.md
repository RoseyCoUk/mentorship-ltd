# Technology Stack — Milestone v1.1: Add Lachlan MacDonald

**Project:** Mentorship Ltd — second mentor addition
**Researched:** 2026-04-23
**Mode:** Ecosystem (subsequent milestone, focused scope)
**Overall confidence:** HIGH

> This file was rewritten for the v1.1 milestone. The original launch-phase stack research (2026-02-11) recommended Astro 5 + Tailwind 4 + Motion One + Lenis + SplitType + Sharp + Resend, all of which shipped and are now in production. This rewrite answers only: **what changes (if any) for adding a second mentor?**

---

## Verdict: No New Packages Required

**Every capability needed for adding Lachlan's mentor section already exists in the current stack.** The milestone is purely additive content — a new section (or group of sections) using the same components, image pipeline, and animation primitives already shipping on the site.

| Need | Already in stack? | Answer |
|------|-------------------|--------|
| New mentor section markup | Yes — native `.astro` components | Add sections to `src/pages/index.astro` |
| Image optimization for Lachlan's photos | Yes — `sharp@^0.34.5` + `scripts/optimize-images.mjs` | Extend existing script, reuse WebP pipeline |
| Parallax + scroll reveals on new section | Yes — `motion@^12.34.0`, `lenis@^1.3.17` via `data-motion` / `data-parallax` | Reuse existing attributes |
| Heading word-stagger animation | Yes — `split-type@^0.3.4` via `data-motion="stagger-words"` | Reuse |
| Cards for "what Lachlan helps with" | Yes — `Card.astro` | Reuse |
| Book-a-call CTA | Yes — `Button.astro` + Calendly link pattern | Reuse (new URL for Lachlan) |
| Layout/typography tokens | Yes — Tailwind 4 `@theme` tokens (`text-gold`, `text-h2`, `navy-900` etc.) | Reuse |

Rationale: the existing codebase already demonstrates every pattern needed for a mentor profile (hero image with cinematic zoom, editorial portrait with parallax, metric bar, bento grid of service cards, quote-styled testimonial, CTA). Introducing a new package would add weight, build complexity, and regression risk with no functional gain.

---

## Current Stack (Locked — No Changes)

### Core Framework

| Technology | Version (locked) | Purpose | Why keep |
|------------|------------------|---------|----------|
| `astro` | `^5.17.1` | Static-first SSG with island hydration | Already configured; Astro 5 stable branch, no upgrade needed for this milestone |
| `typescript` | `^5.9.3` | Type safety for inline `<script>` blocks | In use in existing form handler |

### Styling

| Technology | Version | Purpose | Why keep |
|------------|---------|---------|----------|
| `tailwindcss` | `^4.1.18` | Utility CSS | `@theme` tokens for `gold`, `navy-900/950`, `text-h2/h3`, `text-body-lg` already defined — reuse without changes |
| `@tailwindcss/vite` | `^4.1.18` | Tailwind 4 Vite integration | No migration to config.js needed |

Note: Tailwind 4's CSS-first config (no `tailwind.config.js`) means any new typography/colour tokens for Lachlan would be added to the existing `@theme` block in the global stylesheet. None are expected — the mentor section uses the same visual language.

### Animation & Scroll

| Technology | Version | Purpose | Why keep |
|------------|---------|---------|----------|
| `motion` | `^12.34.0` | Motion One — `animate()`, scroll triggers, `data-motion` driver | Already powers `blur-reveal`, `stagger-words`, `skew-up`, `fade-up` and parallax. Confidence HIGH (Motion v12.x is current on npm as of Apr 2026). |
| `lenis` | `^1.3.17` | Smooth scroll | Needed for the `data-parallax` system used on Allan's editorial portrait (line 144 of `index.astro`). Same attribute on Lachlan's portrait works unmodified. |
| `split-type` | `^0.3.4` | DOM word/char splitting for `stagger-words` | Used by the heading reveal pattern — reuse for "Meet Lachlan" headline. |

### Fonts

| Technology | Version | Purpose | Why keep |
|------------|---------|---------|----------|
| `@fontsource-variable/inter` | `^5.2.8` | Body sans | Already loaded, no second family required |
| `@fontsource-variable/playfair-display` | `^5.2.8` | Heading serif (italic variants used in editorial blocks like "Hey, I'm *Allan*") | Reuse for "Hey, I'm *Lachlan*" mirror block |

### Build / Deploy

| Technology | Version | Purpose | Why keep |
|------------|---------|---------|----------|
| `@astrojs/vercel` | `^9.0.4` | Adapter (note: `astro.config.mjs` uses Vercel, not Cloudflare Pages as the milestone brief stated) | Works today; do not change mid-milestone |
| `sharp` | `^0.34.5` | Build-time image optimization | Used by `scripts/optimize-images.mjs` — extend, do not replace |

**Discrepancy flag (MEDIUM confidence):** The milestone context states "Cloudflare Pages for hosting" but `astro.config.mjs` imports and uses `@astrojs/vercel`. Downstream (requirements/roadmap) should confirm the actual deploy target before writing tasks that assume one or the other. This does not block the feature work — both adapters support static output and Sharp image optimization identically.

### Validation / Email

| Technology | Version | Purpose | Notes |
|------------|---------|---------|-------|
| `@astrojs/check` | `^0.9.6` | Dev-time type checking | No change |
| Resend (runtime, via `/api/subscribe` endpoint) | — | Email capture | Untouched by this milestone — the existing signup form is shared across both mentors |

---

## Image Handling Approach for Lachlan's Photos

Source photos present in `public/Lachlan Pictures/`:

| File | Raw size | Intended use |
|------|----------|--------------|
| `Portrait.JPG` | 8.7 MB | Editorial portrait (mirrors Allan's `alan-networking-2x.webp`) — likely lg:col-span-7 image in a new "Meet Lachlan" section |
| `Picture_with_War_Room_members.JPG` | 9.5 MB | Secondary proof-of-work image — e.g. section background with dark overlay (mirrors `IMG_1081.webp` / `IMG_1082.webp` usage) |

These are roughly 50-100x too large to ship directly. The existing Sharp pipeline is the correct tool.

### Recommended approach: extend `scripts/optimize-images.mjs`

Add a new function modelled on `processHeroes()`:

```js
// --- Lachlan ---
async function processLachlan() {
  console.log("\nLachlan:");
  const dir = join(DEST, "heroes"); // keep flat, same folder as Allan
  await ensureDir(dir);

  // NOTE: move source files OUT of public/ first -- see critical fix below
  const SRC_LACHLAN = "_zip_temp/Lachlan";

  const tasks = [
    // Editorial portrait -- ~1400w is enough for lg:col-span-7 on a 1440 viewport
    toWebp(
      join(SRC_LACHLAN, "Portrait.JPG"),
      join(dir, "lachlan-portrait.webp"),
      { width: 1400, quality: 80 }
    ),
    // Background/proof image -- 1920w mirrors banner sizing
    toWebp(
      join(SRC_LACHLAN, "Picture_with_War_Room_members.JPG"),
      join(dir, "lachlan-warroom.webp"),
      { width: 1920, quality: 75 }
    ),
  ];

  const results = await Promise.all(tasks);
  results.forEach((f, i) =>
    logResult(["lachlan-portrait.webp", "lachlan-warroom.webp"][i], f)
  );
}
```

Call `await processLachlan();` from `main()`.

### Critical fix: move source files OUT of `public/`

`public/Lachlan Pictures/` is currently shipped to the browser as 18 MB of unoptimized JPGs. **Before the milestone closes**, move the raw files to `_zip_temp/Lachlan/` (mirroring how `_zip_temp/Elevateo/` is used today) so Vercel/Cloudflare does not serve the originals. This keeps the optimized `.webp` under `public/images/heroes/` as the only shipped assets.

### Expected output sizes

Based on existing ratios (`alan-networking-2x.webp` = 177 KB from a likely multi-MB source at quality 80, width ~1600-2000; `hero-bg.webp` = 102 KB at similar width):

| Target file | Target size | Target dimensions | Quality |
|-------------|-------------|-------------------|---------|
| `lachlan-portrait.webp` | 150-250 KB | 1400w | 80 |
| `lachlan-warroom.webp` | 250-400 KB | 1920w | 75 |

This keeps the page total well inside the existing 78-91 KB-per-page budget (which refers to initial paint only — both Lachlan images would be `loading="lazy"` below the fold).

### Responsive images — do NOT add `@astrojs/image` or `astro:assets`

The site currently uses plain `<img src="/images/...">` with manual `width`/`height`/`loading="lazy"` attributes (see `index.astro` lines 142-147, 220-224). It does **not** use the Astro `<Image>` component or `import` image assets. Sticking with this pattern for Lachlan is correct — introducing `astro:assets` mid-project would require refactoring every existing `<img>` for consistency and is out of scope. The hand-tuned Sharp pipeline already achieves the target sizes.

---

## Animation Pattern Reuse

Every motion primitive for the Lachlan section already exists. Mirror these exact attributes from `index.astro`:

| Pattern | Attribute | Source line | Use for Lachlan |
|---------|-----------|-------------|-----------------|
| Cinematic zoom on hero-style image | `style="animation: slow-zoom 20s cubic-bezier(0.16, 1, 0.3, 1) forwards;"` | L42, L87-90 | Optional — if Lachlan gets his own hero-style band |
| Blur reveal (paragraphs, labels) | `data-hero-motion="blur-reveal" data-hero-delay="X"` or `data-motion="blur-reveal" data-motion-delay="X"` | L58-68, L116-131 | Lachlan's intro copy paragraphs |
| Word-stagger headline | `data-motion="stagger-words" data-motion-delay="0.1"` | L120-122 | "Hey, I'm *Lachlan*" headline |
| Fade-up button | `data-hero-motion="fade-up" data-hero-delay="0.8"` | L71 | Lachlan's Calendly CTA |
| Skew-up list items | `data-motion="skew-up" data-motion-delay="0.15"` | L312-320 | Lachlan's three angle bullets (solo agencies, boltloop.co, co-founders + athletic) |
| Parallax image | `data-parallax="-60"` (range -20 to -60 observed) | L144, L238 | Lachlan's editorial portrait — use `-60` to match Allan for visual symmetry |
| Slow-pulse orb glow | `class="glow-orb ... animate-pulse-slow"` | L52-53 | Optional ambient accent |
| Hover scale on card/link | `transition-transform duration-500 hover:scale-[1.03]` | L170-213 | Reuse on boltloop.co card if featured |

**No new animation code needs to be written.** The Motion One driver that interprets `data-motion` / `data-hero-motion` / `data-parallax` already scans the DOM on page load; adding Lachlan's section is transparent to it.

### Considerations for a second animated section

1. **Stagger-delay budget.** Allan's hero uses delays up to 1.2s (`data-hero-delay="1.2"`). Lachlan's section is below the fold, so `data-motion` (scroll-triggered) is the correct prefix — **not** `data-hero-motion` (which runs once on page load). Confirm by checking the driver in `src/scripts/` (out of scope for stack research, but flag for requirements).
2. **Reduced motion.** Any new `<style>` keyframes added for Lachlan (e.g. a new `slow-zoom` variant) should inherit or replicate the same `@media (prefers-reduced-motion: reduce)` handling used elsewhere. Reuse `animation: slow-zoom 20s ...` — don't define a new keyframe.
3. **Parallax stacking.** Lenis drives global smooth-scroll; adding a second `data-parallax` image does not cost extra setup. Two parallax images on one page is well within Lenis's normal usage.

---

## Component Reuse Map

Every component needed already exists in `src/components/`:

| Component | Current use on page | Reuse for Lachlan |
|-----------|---------------------|-------------------|
| `Base.astro` (layout) | Wraps whole page | Same page, no change |
| `SectionWrapper.astro` | 7x on page (widths: `wide`, `narrow`) | Wrap Lachlan's section (likely `wide`) |
| `Card.astro` | Portfolio grid, service grid, results grid | Lachlan's angle cards or boltloop.co featured card |
| `Button.astro` | Hero CTA, Why section CTA | Lachlan's Calendly CTA (new href) |
| `AccordionItem.astro` | FAQ section | Unlikely needed for Lachlan's section itself |
| `FormInput.astro` | Email signup | Not needed — single signup form serves both mentors |
| `Header.astro` / `Footer.astro` | Site chrome | Optional: add "Meet Lachlan" anchor link if Header has in-page nav |

**No new components need to be created** unless the design calls for a dedicated `MentorProfile.astro` wrapper to DRY-up the Allan and Lachlan sections. That's a refactor decision for the requirements agent, not a stack decision — both options work with the current stack.

---

## Alternatives Considered (and Rejected)

| Addition considered | Why rejected |
|---------------------|--------------|
| `astro:assets` / `<Image>` component | Existing page uses plain `<img>` + hand-tuned Sharp. Introducing `<Image>` now means refactoring every existing image for consistency — scope creep. |
| `@astrojs/image` (legacy) | Deprecated since Astro 3; `astro:assets` is its replacement. Not relevant. |
| `astro-icon` for new iconography | Existing site uses `.webp` icon images in `/images/icons/` (see L242). No new icons required; if Lachlan's section needs a boltloop logo, reuse `/images/logos/boltloop.webp` which already exists on page. |
| GSAP / ScrollTrigger | Milestone context explicitly states GSAP is not used. Motion One + Lenis + SplitType cover all needed patterns. |
| Swiper / Embla for mentor carousel | Design brief places mentors stacked vertically (Allan top, Lachlan below). No carousel needed. |
| `astro-seo` or structured-data helper | SEO metadata handled by `Base.astro`'s `title`/`description` props today. Adding a second `Person` JSON-LD entry can be done inline in `Base.astro` (or a new `<script type="application/ld+json">` block) without any library. |
| `@resvg/resvg` or other image lib | Sharp already handles everything needed. |
| Cloudinary / imgix / Vercel Image Optimization runtime | Runtime costs + external dependency. Build-time Sharp produces equivalent quality at 100-400 KB per image with zero runtime cost. |

---

## Installation

**No install commands required.** Existing `node_modules` and lockfile already contain every dependency.

To run the extended image optimization:

```bash
# 1. Move Lachlan's raw JPGs out of public/ (critical -- see above)
mv "public/Lachlan Pictures" "_zip_temp/Lachlan"

# 2. After extending scripts/optimize-images.mjs with processLachlan()
node scripts/optimize-images.mjs

# 3. Verify output
ls -lh public/images/heroes/lachlan-*.webp
```

Expected outputs: `public/images/heroes/lachlan-portrait.webp`, `public/images/heroes/lachlan-warroom.webp`.

---

## Downstream Integration Points (for requirements & roadmap agents)

1. **Image pipeline task** — extend `scripts/optimize-images.mjs` with `processLachlan()` and move raw files out of `public/`. Must run before the section references the WebP paths, otherwise build will have broken images.

2. **Section placement** — new Lachlan block goes between existing "Why Section" (L292-329) and "FAQ Section" (L332-357), OR mirrored as a second "About-style" block immediately after the existing About section (L108-153). Requirements agent picks; both are stack-compatible.

3. **Calendly URL for Lachlan** — Allan's URL is `https://calendly.com/allan-chan-roseyco/one-on-one` (L72, L323). Lachlan needs his own Calendly link; reuse the same `Button` component with a different `href`.

4. **Metadata update** — `Base.astro`'s default `description` prop currently names only Allan ("Allan Chan helps business owners scale..." — L32). Update to include both mentors, or leave if Lachlan is explicitly secondary.

5. **Header nav (if present)** — add an anchor link to a `#meet-lachlan` `id` on the new section if the header has in-page nav; not a stack concern but a content-task flag.

6. **Deploy-target discrepancy** — confirm Vercel (per `astro.config.mjs`) vs Cloudflare Pages (per milestone brief). Does not affect this milestone's code; flag for ops clarification.

---

## Confidence Assessment

| Claim | Confidence | Basis |
|-------|------------|-------|
| No new npm packages needed | HIGH | Read `package.json` + full `index.astro` — every capability mapped to existing dep |
| Sharp pipeline can handle Lachlan's JPGs | HIGH | Sharp handles JPG->WebP natively; existing script already does this for PNG->WebP with the same API (`toWebp` helper) |
| Motion One / Lenis / SplitType versions current (Apr 2026) | HIGH | `motion@^12.34.0`, `lenis@^1.3.17`, `split-type@^0.3.4` are all present stable lines on npm; caret ranges will pick latest patch |
| `data-motion` / `data-parallax` attributes will work on a new section without code changes | HIGH | Attribute-driven animation drivers scan the full DOM; adding markup is transparent |
| Tailwind 4 `@theme` tokens cover all visual needs | HIGH | Every colour/type token used on Allan's section (`text-gold`, `text-h2`, `navy-900`, etc.) is already resolved in production CSS |
| `public/Lachlan Pictures/` must be moved before deploy | HIGH | Files at 8.7 and 9.5 MB in `public/` would ship to end users — standard static-site rule |
| Deploy target is Vercel, not Cloudflare Pages | MEDIUM | `astro.config.mjs` imports `@astrojs/vercel`; milestone brief contradicts. Flagged for confirmation. |
| No `<Image>` component migration needed | HIGH | Existing code uses plain `<img>` uniformly; consistency > nominal improvement |

---

## Sources

- Local: `package.json`, `astro.config.mjs`, `scripts/optimize-images.mjs`, `src/pages/index.astro`, `public/images/heroes/`, `public/Lachlan Pictures/`
- Inferred from existing code patterns (no external web research needed for this scope — all answers derivable from the working codebase)
