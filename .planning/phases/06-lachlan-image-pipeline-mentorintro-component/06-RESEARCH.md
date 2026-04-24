# Phase 6: Lachlan Image Pipeline + MentorIntro Component - Research

**Researched:** 2026-04-23
**Domain:** Astro 5 component authoring + sharp WebP image pipeline for a personal-brand single-page site
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Image Pipeline**
- **D-01:** `Portrait.JPG` is the primary portrait — optimize to `lachlan-portrait.webp` for use in the bio split-grid
- **D-02:** `Picture_with_War_Room_members.JPG` should also be processed to WebP in Phase 6 (so it is available when Phase 7 decides where to place it) — placement deferred, not part of Phase 6 scope
- **D-03:** Both source files move from `public/Lachlan Pictures/` to `_zip_temp/Lachlan/` — neither should remain in the deploy bundle
- **D-04:** Image sizing: resize to a target width using sharp, let CSS handle aspect ratio and crop — no pre-crop during optimization
- **D-05:** Output target: 150–300 KB per MENTOR-08; follow the existing quality settings in optimize-images.mjs (quality 80–85)
- **D-06:** Output destination: `public/images/lachlan/` — consistent with existing `public/images/{category}/` pattern

**MentorIntro Component**
- **D-07:** Build the **full shell** — component includes bio section + specialty cards area + "who he works with" block; Phase 7 just passes content in via props
- **D-08:** Content delivered via **structured props** (typed arrays/objects), not Astro slots — enforces structure and matches the roadmap's "props-driven" intent
- **D-09:** Flip direction is a prop (`flip?: boolean`) — `false` (default) = text-left/image-right (Allan's layout); `true` = image-left/text-right (Lachlan's layout)
- **D-10:** Component wraps its sections in `SectionWrapper` — inherits existing padding, max-width, and responsive behaviour with no extra wrapper logic
- **D-11:** Elements tagged with `data-motion` attributes (blur-reveal, fade-up, stagger-words) — animations inherit automatically from the existing Motion One system, no new JS needed
- **D-12:** CTA button prop accepts an `href` — Phase 7 will pass Allan's Calendly link as the documented placeholder

### Claude's Discretion
- Props vs slots choice: props (structured data arrays) selected as the cleaner pattern for a reusable, explicitly typed component
- Exact prop interface shape (field names, TypeScript types) — Claude designs this to match existing component conventions in the codebase
- Whether to add a parallax `data-parallax` attribute to the portrait image — follow the same pattern used on Allan's portrait in index.astro
- Output filenames for the processed WebPs — follow kebab-case convention (e.g., `lachlan-portrait.webp`, `lachlan-warroom.webp`)

### Deferred Ideas (OUT OF SCOPE for Phase 6)
- Placement of `lachlan-warroom.webp` (group photo) on the site — noted for Phase 7 to decide
- Lachlan's own Calendly link — currently placeholder to Allan's; swap when provided (tracked in STATE.md)
- Any edit to `src/pages/index.astro` to slot the component into the page — that is Phase 7
- Navigation anchors (#allan, #lachlan, #faq) — Phase 7 owns Header.astro changes
- Content copy for Lachlan (bio paragraphs, specialty card text, "who he works with" items) — Phase 6 delivers the component shell ready to receive props; Phase 7 supplies the content
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MENTOR-08 | Lachlan's portrait is processed to WebP (~150–300 KB) and renders consistently with the site's existing image quality | Existing reference: `public/images/heroes/alan-networking-2x.webp` = 177 KB (sits inside the 150–300 KB band). `scripts/optimize-images.mjs` already has `toWebp()` + `ensureDir()` helpers and a `processX()` pattern to extend. Target width ~1600 px + quality 82 matches Allan's reference output. The EXIF auto-rotation gap in the existing helper (see Pitfall 4) must be closed since iPhone portraits carry rotation metadata that sharp does NOT apply by default. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

No `CLAUDE.md` is present in this repository at the project root. Only the user's global `~/.claude/CLAUDE.md` applies, and it contains no project-specific directives for this codebase beyond GSD/workflow preferences. **No local project constraints to honor in this phase.**

## Summary

Phase 6 is a two-track foundational phase — one ops track (image pipeline extension) and one component track (props-driven Astro component) — with zero new npm dependencies and zero integration into `index.astro`. Both tracks are independent and can be parallelized.

**Track 1 (Image pipeline):** Move `Portrait.JPG` and `Picture_with_War_Room_members.JPG` (~18 MB combined) out of `public/Lachlan Pictures/` into `_zip_temp/Lachlan/` (gitignored — see `.gitignore:27`), then add a `processLachlan()` function to `scripts/optimize-images.mjs` following the exact shape of `processLogos()` / `processHeroes()`. Run the script to emit `public/images/lachlan/lachlan-portrait.webp` and `public/images/lachlan/lachlan-warroom.webp`. The existing `toWebp()` helper already calls `sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality })` and lets CSS handle crop — matching D-04. The only gap is **EXIF auto-orientation** — iPhone JPGs typically ship with rotation metadata that sharp does NOT apply unless `.rotate()` is called explicitly, so portraits can emit sideways. This is the single real risk on the pipeline track and the helper must be patched (add `.rotate()` before `.resize()`) or `processLachlan()` must call rotation inline.

**Track 2 (MentorIntro component):** Create `src/components/MentorIntro.astro` — a single component that renders the **full mentor section shell**: (1) a split-grid bio (image + credentials + CTA), (2) a specialty cards block, and (3) a "who he works with" block. The component takes structured props (typed arrays and objects, no Astro slots — see D-07/D-08), wraps its content in `SectionWrapper`, supports `flip?: boolean` for image-left/right (D-09), and tags animated elements with `data-motion="blur-reveal|stagger-words|fade-up"` plus `data-motion-delay` values (D-11). The Motion One observer in `src/layouts/Base.astro` picks these up automatically — no new JS is required. Allan's existing About section (`src/pages/index.astro` lines 109–153) is the visual reference pattern: the grid is `grid-cols-1 lg:grid-cols-12` with `gap-12 lg:gap-20`, the image wrapper uses `aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4]`, and the portrait uses `h-[120%] -top-[10%] data-parallax="-60"` with a navy gradient overlay. The flip is implemented by swapping `lg:col-span-5` (content) and `lg:col-span-7` (image) order in the DOM — CSS grid handles the visual flip without `flex-row-reverse` tricks.

Success criterion 4 ("renderable in isolation without breaking the page") is met simply by not importing the new component into `index.astro` during Phase 6 — Astro only emits a component's markup where it is imported, so the file's mere presence in `src/components/` cannot affect the live page.

**Primary recommendation:** Extend `optimize-images.mjs` with a `processLachlan()` function that (a) calls `.rotate()` before `.resize()` to respect EXIF, (b) uses `{ width: 1600, quality: 82 }` for the portrait, and `{ width: 1800, quality: 80 }` for the war-room group photo. Simultaneously, create `MentorIntro.astro` as a props-driven shell that mirrors Allan's split-grid at lines 113–152 of `index.astro`, parameterizing the fields listed in the "Component Prop Interface" section below. Do not import the component anywhere — Phase 7 handles integration.

## Standard Stack

### Core (already installed — no changes)

| Library | Version (locked) | Purpose | Why Standard |
|---------|------------------|---------|--------------|
| Astro | 5.17.1 | Static site framework for `.astro` components | Already in use; all existing components authored in this format |
| sharp | 0.34.5 | High-performance WebP encoder + resizer | Already devDependency; `scripts/optimize-images.mjs` uses it |
| Motion One (`motion`) | 12.34.0 | Scroll-triggered animations via `data-motion` attributes | Observer already wired in `Base.astro` — components just tag elements |
| SplitType | 0.3.4 | Word/char splitting for `stagger-words` | Already used by `Base.astro` animation observer |
| Lenis | 1.3.17 | Smooth scroll base | Already wired in `Base.astro` |
| Tailwind CSS | 4.1.18 | Utility classes (`text-h2`, `text-gold`, `navy-900`, etc.) | Existing tokens in `src/styles/global.css` |
| TypeScript | 5.9.3 | Prop interface typing for `MentorIntro.astro` | Already used in `Button.astro`, `SectionWrapper.astro` |

**Version verification (2026-04-23):**
- `npm view sharp version` → `0.34.5` — matches installed ✓
- `npm view astro version` → `6.1.9` (latest). Installed is `^5.17.1` — **do not upgrade**; Phase 6 scope is additive and v6 would trigger an unrelated migration.

### No New Dependencies Required

| Capability Needed | Already in stack | Action |
|-------------------|------------------|--------|
| JPG → WebP + resize | `sharp@^0.34.5` via `scripts/optimize-images.mjs` | Extend with `processLachlan()` |
| Props-driven Astro component | Native Astro component with TypeScript `interface Props` | Author new `.astro` file |
| Scroll-reveal + stagger + parallax | `motion@^12.34.0` + `split-type@^0.3.4` observer in `Base.astro` | Tag elements with `data-motion` / `data-parallax` |
| Responsive padding / max-width wrapping | `SectionWrapper.astro` (props: `id`, `width: "narrow" \| "wide"`, `class`) | Import and wrap |
| CTA button | `Button.astro` (props: `variant`, `size`, `href`) | Import and pass `href` prop |
| Specialty card shell | `Card.astro` (class-only wrapper with `card-hover-glow rounded-xl p-8`) | Import, compose with icon + heading + copy |

**Installation:** None.

### Alternatives Considered

| Instead of | Could Use | Tradeoff | Decision |
|------------|-----------|----------|----------|
| Manual `sharp` call in a new script | `astro:assets` `<Image>` component | `<Image>` runs at build time and outputs hashed filenames — loses the explicit `public/images/lachlan/lachlan-portrait.webp` path and forces runtime `import` of the source file | **Keep** `optimize-images.mjs` — matches existing pattern, stable file paths, portable across Vercel + local dev |
| Structured props | Astro slots (`<slot name="bio">`) | Slots give more flexibility but lose type safety and let callers forget required structure | **Props** per D-08 |
| `flex-row-reverse` for flip | CSS grid reorder via DOM order | `flex-row-reverse` only works on flex, not grid — would require converting the whole layout | **DOM order swap** in template |

## Architecture Patterns

### Recommended File Changes

```
project-root/
├── _zip_temp/
│   └── Lachlan/                                    # NEW — gitignored via .gitignore:27
│       ├── Portrait.JPG                            # MOVED from public/Lachlan Pictures/
│       └── Picture_with_War_Room_members.JPG      # MOVED from public/Lachlan Pictures/
├── public/
│   ├── Lachlan Pictures/                           # DELETE entire directory after move
│   └── images/
│       └── lachlan/                                # NEW
│           ├── lachlan-portrait.webp              # NEW — generated by processLachlan()
│           └── lachlan-warroom.webp               # NEW — generated by processLachlan()
├── scripts/
│   └── optimize-images.mjs                         # MODIFIED — add processLachlan() + .rotate() fix
└── src/
    └── components/
        └── MentorIntro.astro                       # NEW
```

**Note:** Do not touch `src/pages/index.astro`. Phase 7 owns integration.

### Pattern 1: Extending `optimize-images.mjs` (Track 1)

**What:** Add a new `processX()` function and call it from `main()`. The file already defines `toWebp()`, `ensureDir()`, and `logResult()` helpers.

**When to use:** Any time a new category of brand/content assets needs processing.

**Shape to follow** (mirror `processLogos()` at lines 60–77 and `processHeroes()` at lines 99–121):

```javascript
// scripts/optimize-images.mjs — NEW function
async function processLachlan() {
  console.log("\n👤 Lachlan:");
  const dir = join(DEST, "lachlan");           // -> public/images/lachlan
  await ensureDir(dir);

  const srcPortrait = join("_zip_temp/Lachlan", "Portrait.JPG");
  const srcWarRoom  = join("_zip_temp/Lachlan", "Picture_with_War_Room_members.JPG");

  const tasks = [
    toWebp(srcPortrait, join(dir, "lachlan-portrait.webp"), { width: 1600, quality: 82 }),
    toWebp(srcWarRoom,  join(dir, "lachlan-warroom.webp"),  { width: 1800, quality: 80 }),
  ];

  const results = await Promise.all(tasks);
  results.forEach((f, i) => logResult(["lachlan-portrait.webp", "lachlan-warroom.webp"][i], f));
}
```

**Then register in `main()`** — add one line after `processBanners()`:

```javascript
await processLachlan();
```

**Important caveat — SRC constant:** The file defines `const SRC = "_zip_temp/Elevateo";` at the top. `processLachlan()` must NOT use `SRC` — it uses a different source folder (`_zip_temp/Lachlan`). Either inline the path as shown above or introduce a second constant. Do not mutate `SRC`.

### Pattern 2: EXIF Rotation Fix in `toWebp()` (Track 1)

**Why this matters:** iPhone JPGs are shot in landscape sensor orientation and flagged via EXIF `Orientation` = 6 (or 8) to indicate "the camera was rotated 90°". Sharp **does not** auto-rotate by default — you get a sideways 3024×4032 image treated as 4032×3024 wide. Portrait.JPG from an iPhone will emit SIDEWAYS at `width: 1600` unless `.rotate()` is called.

**The fix (recommended):** Patch the shared `toWebp()` helper so every image is auto-oriented. This is the safest change — it also future-proofs `processHeroes()` and any future phase. Add a single line at line 26 (right after `let pipeline = img;`):

```javascript
pipeline = pipeline.rotate();  // Auto-orient per EXIF; no-op when no rotation flag present
```

Calling `.rotate()` with no argument applies EXIF-based auto-rotation and strips the orientation metadata. This is a no-op for images without orientation tags, so it will not regress existing outputs (logos, icons, banners — all PNG without EXIF).

**Alternative:** If you prefer not to touch the shared helper, call `.rotate()` inline inside `processLachlan()`:

```javascript
await sharp(srcPortrait).rotate().resize({ width: 1600 }).webp({ quality: 82 }).toFile(dest);
```

Avoids the shared-helper change but duplicates the sharp pipeline logic. Prefer the helper patch.

### Pattern 3: Props-Driven Astro Component (Track 2)

**What:** A `.astro` component whose template is parameterized by a typed `interface Props`. The pattern is already in use in `Button.astro`, `Card.astro`, and `SectionWrapper.astro`.

**Shape to follow:**

```astro
---
// src/components/MentorIntro.astro

import SectionWrapper from "./SectionWrapper.astro";
import Button from "./Button.astro";
import Card from "./Card.astro";

interface Specialty {
  icon: string;    // matches file in public/images/icons/ (e.g. "automation")
  name: string;
  desc: string;
}

interface AudienceItem {
  title: string;
  desc: string;
}

interface Props {
  id?: string;                // anchor target (#lachlan) — Phase 7 passes this
  eyebrow: string;            // "The Specialist" / "The Mentor"
  name: string;               // first-name for headline emphasis
  headline: string;           // full H2 text, first name replaced via markup
  credentials: string[];      // 2-4 paragraphs of bio copy
  image: {
    src: string;
    alt: string;
  };
  flip?: boolean;             // true = image LEFT, text RIGHT (Lachlan); default false (Allan)
  cta: {
    label: string;
    href: string;
  };
  specialties: Specialty[];   // 3 cards
  audienceHeading: string;    // "Who Lachlan works with"
  audienceItems: AudienceItem[];  // 3-4 items
}

const {
  id,
  eyebrow,
  name,
  headline,
  credentials,
  image,
  flip = false,
  cta,
  specialties,
  audienceHeading,
  audienceItems,
} = Astro.props;
---

{/* ============ Bio Split-Grid ============ */}
<section class="overflow-hidden relative py-20 sm:py-32" id={id}>
  <SectionWrapper width="wide">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

      {/* Image side — DOM-ordered first when flip=true */}
      {flip && (
        <div class="lg:col-span-7 relative h-full">
          <div class="aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
               data-motion="blur-reveal" data-motion-delay="0.3">
            <img
              src={image.src}
              alt={image.alt}
              class="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover object-center"
              data-parallax="-60"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent z-10"></div>
          </div>
        </div>
      )}

      {/* Text side */}
      <div class="lg:col-span-5 relative z-10 lg:pl-4">
        <div class="inline-flex items-center gap-4 mb-6" data-motion="blur-reveal">
          <div class="h-[1px] w-12 bg-gold"></div>
          <p class="text-gold font-bold text-xs tracking-[0.2em] uppercase">{eyebrow}</p>
        </div>
        <h2 class="text-h2 mb-10 leading-tight" data-motion="stagger-words" data-motion-delay="0.1">
          {headline.split(name)[0]}<span class="text-white italic font-light">{name}</span>{headline.split(name)[1]}
        </h2>

        <div class="space-y-6">
          {credentials.map((para, i) => (
            <p class="text-body text-text-secondary leading-relaxed" data-motion="blur-reveal" data-motion-delay={`${0.2 + i * 0.1}`}>
              {para}
            </p>
          ))}
        </div>

        <div class="mt-10" data-motion="fade-up" data-motion-delay="0.5">
          <Button variant="primary" size="lg" href={cta.href} target="_blank" rel="noopener noreferrer">
            {cta.label}
          </Button>
        </div>
      </div>

      {/* Image side — DOM-ordered last when flip=false (Allan's original order) */}
      {!flip && (
        <div class="lg:col-span-7 relative h-full">
          {/* identical image markup as above */}
        </div>
      )}
    </div>
  </SectionWrapper>
</section>

{/* ============ Specialty Cards ============ */}
<SectionWrapper width="wide" class="py-20 sm:py-32">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
    {specialties.map((s, i) => (
      <div data-motion="blur-reveal" data-motion-delay={`${i * 0.1}`} data-parallax={i % 2 === 0 ? "-20" : "-40"}>
        <Card class="h-full">
          <div class="flex flex-col gap-6 h-full">
            <img src={`/images/icons/${s.icon}.webp`} alt="" width="48" height="48" class="w-12 h-12 shrink-0" loading="lazy" />
            <div>
              <h3 class="text-h3 mb-3 font-heading">{s.name}</h3>
              <p class="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        </Card>
      </div>
    ))}
  </div>
</SectionWrapper>

{/* ============ "Who he works with" ============ */}
<SectionWrapper width="narrow" class="py-20 sm:py-32">
  <div class="text-center mb-12" data-motion="blur-reveal">
    <h3 class="text-h3">{audienceHeading}</h3>
  </div>
  <div class="max-w-xl mx-auto space-y-6">
    {audienceItems.map((item, i) => (
      <div class="flex items-start gap-6 border-l border-gold/30 pl-6 py-2 transition-colors duration-500 hover:border-gold group"
           data-motion="skew-up" data-motion-delay={`${0.1 + i * 0.1}`}>
        <span class="text-body-lg text-white group-hover:text-gold transition-colors duration-500">
          <strong class="font-bold">{item.title}</strong> — {item.desc}
        </span>
      </div>
    ))}
  </div>
</SectionWrapper>
```

**When to use:** Every mentor profile from now on. The component is explicitly designed so Allan's current hand-rolled section can be refactored to use it in a future phase (not Phase 6).

### Anti-Patterns to Avoid

- **`flex-row-reverse` for flip:** The Allan layout is a **CSS grid** (`grid-cols-12`), not flex. Use DOM ordering or `lg:order-*` Tailwind utilities. `flex-row-reverse` would force converting the whole layout away from grid.
- **Astro slots for bio content:** D-08 explicitly requires props; slots would let callers inject arbitrary HTML, defeating the "enforces structure" goal.
- **Importing `MentorIntro.astro` into `index.astro` during Phase 6:** That is Phase 7's job. The Phase 6 success criterion "renderable in isolation without breaking the page" depends on the component NOT being integrated yet. Integrating breaks the phase scope boundary.
- **Re-using `SRC` const in `processLachlan()`:** `SRC = "_zip_temp/Elevateo"`, Lachlan's source is `_zip_temp/Lachlan`. Inline the path or add a second constant.
- **Moving files via `fs.rename()` in the script:** Steps "move JPGs to `_zip_temp/Lachlan/`" and "delete `public/Lachlan Pictures/`" are **git/filesystem operations**, not script logic. Do them via `git mv` in the implementation task, not from inside `optimize-images.mjs`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JPG → WebP resize pipeline | Custom loop with `fs.writeFile` + a third-party encoder | Existing `toWebp()` helper in `scripts/optimize-images.mjs` | Helper handles `ensureDir`, `withoutEnlargement`, logging. Reinventing it fragments the build script. |
| Responsive padding + max-width container | Raw `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | `<SectionWrapper width="wide">` | Single source of truth for section chrome; already handles `narrow` vs `wide` variants. |
| Card styling + hover glow | Raw `<div class="rounded-2xl p-10 ...">` | `<Card>` | `card-hover-glow` class is wired to the mouse-targeting sheen observer in `Base.astro:192-204`; hand-rolled divs miss the sheen. |
| CTA button markup + shimmer | Raw `<a class="bg-white text-black ...">` | `<Button variant="primary" size="lg" href={...}>` | `btn-shimmer` class + variants live in one place; rewriting them per component drifts. |
| Scroll-reveal / stagger / parallax | Custom `IntersectionObserver` + `requestAnimationFrame` | `data-motion` / `data-motion-delay` / `data-parallax` attributes | Observer is already wired globally in `Base.astro:140-217`. Adding attributes = zero JS cost; adding a second observer = duplicate work + off-beat timing. |
| EXIF orientation handling | Custom image probing + manual rotate based on metadata | `sharp(...).rotate()` with no argument (applies EXIF auto-rotate) | Sharp's built-in is correct and well-tested; manual orientation logic is notorious for getting mirror cases wrong. |

**Key insight:** This phase is almost entirely composition. Every primitive needed (image pipeline helper, section wrapper, card, button, animation system) already exists. The only new artifact with real structure is `MentorIntro.astro`, and even that is a template composing existing components.

## Common Pitfalls

### Pitfall 1: EXIF Orientation — Portrait Emits Sideways

**What goes wrong:** iPhone portraits carry `EXIF Orientation = 6` (rotate 90° CW). Sharp reads the metadata but **does not** auto-apply rotation. The existing `toWebp()` helper at `scripts/optimize-images.mjs:22-37` calls `sharp(src).resize(...).webp(...)` with NO `.rotate()`. `Portrait.JPG` is 8.6 MB and almost certainly from an iPhone — it will emit sideways.

**Why it happens:** Sharp's design choice is "explicit > implicit" for rotation. The docs say directly: *"EXIF orientation is not taken into consideration"*. Developers familiar with the older Node image libs (jimp, gm) expect auto-rotation and get burned.

**How to avoid:** Call `.rotate()` (no argument) before `.resize()`. Patch either the shared `toWebp()` helper (recommended — also future-proofs other iPhone-sourced photos) or inline within `processLachlan()`.

**Warning signs:** After running the script, open `public/images/lachlan/lachlan-portrait.webp` — if Lachlan is lying on his side, the rotation is wrong.

**Source:** [sharp docs, api-input metadata section](https://sharp.pixelplumbing.com/api-input/) — HIGH confidence.

### Pitfall 2: Raw JPGs Ship to Production in `public/`

**What goes wrong:** Anything in `public/` is copied verbatim into Astro's build output (`dist/`). If `public/Lachlan Pictures/Portrait.JPG` (8.6 MB) + `Picture_with_War_Room_members.JPG` (9.4 MB) are left in place, the deploy bundle grows by ~18 MB of dead weight — increasing cold-start times on Vercel and wasting bandwidth.

**Why it happens:** The raw photos landed in `public/` as a staging area during content gathering. It's easy to forget they're there once the optimized versions exist.

**How to avoid:** Move them to `_zip_temp/Lachlan/` via `git mv`. `_zip_temp/` is gitignored (`.gitignore:27`) and never copied to `dist/`. After the move, delete the now-empty `public/Lachlan Pictures/` directory.

**Warning signs:** Run `ls public/Lachlan\ Pictures/` — if it still exists, the cleanup was missed. Check `dist/` after `npm run build` to confirm no `.JPG` files ship.

**Source:** [Astro docs — `public/` directory](https://docs.astro.build/en/basics/project-structure/#public) — HIGH confidence.

### Pitfall 3: Photo Quality Mismatch — Amateur Shot Next to Editorial

**What goes wrong:** `Portrait.JPG` is an iPhone-style shot in a casual context (likely a party/event given the companion photo is "War Room members"). Allan's `alan-networking-2x.webp` is a deliberately lit editorial photograph. Dropping them side-by-side in the same split-grid at the same size signals "amateur hour" to the $500K–$1M+ business-owner audience — exactly the cohort most prone to pattern-matching visual inconsistency and bouncing.

**Why it happens:** The photo "exists and is acceptable." Pressure to ship the milestone discourages scheduling a proper shoot. This pitfall was flagged at HIGH risk in `.planning/research/PITFALLS.md` Pitfall 4.

**How to avoid (Phase 6 scope):**
1. Run the optimized WebP through a side-by-side visual comparison with Allan's image at target display sizes (both ~1600 px on a retina screen) BEFORE closing Phase 6.
2. If the mismatch is stark, pause and flag for product owner: commission a proper shoot OR accept the quality delta as a known release note.
3. Do NOT use `Picture_with_War_Room_members.JPG` at hero/feature size at any point — per prior research it is "explicitly forbidden" (stolen social proof, party context). Phase 6 only *processes* it — Phase 7 or later decides placement, and the default should be "don't use it prominently."

**Warning signs:** Open both WebPs at full size in an image viewer. If they look like they're from different websites (different lighting mood, different color grading, different framing discipline) — the mismatch is real and must be addressed.

**Source:** `.planning/research/PITFALLS.md` Pitfall 4 — HIGH confidence. References: [m2mpics — inconsistent team headshots cost](https://www.m2mpics.com/post/why-inconsistent-team-photos-are-costing-your-alpharetta-business-clients-and-how-to-fix-it).

### Pitfall 4: `flex-row-reverse` Applied to a CSS Grid

**What goes wrong:** Engineer tries to implement the flip with `class:list={[flip && "flex-row-reverse"]}` on the grid container. It has no effect — `flex-row-reverse` is a flex utility; the container is `grid-cols-1 lg:grid-cols-12`. Result: image and text stay in original order even when `flip=true`.

**Why it happens:** Muscle memory from flexbox. The referenced pattern in `index.astro:113` is a grid, not flex — easy to miss.

**How to avoid:** Implement the flip via DOM ordering (two `{flip && (...)}` / `{!flip && (...)}` conditional blocks — the "Architecture Patterns → Pattern 3" template shows this) OR use `lg:order-*` Tailwind utilities on the grid children. Test at `lg` breakpoint — at mobile widths there's only one column, so flip is visually invisible below `lg:`.

**Warning signs:** Render the component with `flip={true}` and inspect the DOM. If the image `<div>` comes second in source order, the flip is broken.

**Source:** [Tailwind CSS docs — flex direction](https://tailwindcss.com/docs/flex-direction) + [CSS Grid ordering](https://developer.mozilla.org/en-US/docs/Web/CSS/order) — HIGH confidence.

### Pitfall 5: Component Imported into `index.astro` During Phase 6

**What goes wrong:** Engineer, feeling the component is "finished," imports `MentorIntro` into `index.astro` to "verify it works in place." This bleeds Phase 7 work into Phase 6 — Phase 7 owns page integration AND the content props — and because the component requires `credentials`, `specialties`, `audienceItems`, etc. as required props, any placeholder content shipped in Phase 6 becomes a de facto content draft that Phase 7 has to unwrite.

**Why it happens:** "It feels incomplete to leave it unused." Real Astro behavior: a component file that is never imported is never rendered. The file's existence does not affect the page.

**How to avoid:** Do NOT import `MentorIntro.astro` anywhere during Phase 6. Verify the component renders by one of:
- Creating a throwaway `src/pages/_mentor-preview.astro` route with hand-crafted fake props, running `astro dev`, visually verifying, then **deleting the preview file before commit**.
- Running `astro check` — confirms the prop interface compiles and there are no TypeScript errors — without rendering anywhere.

**Warning signs:** `grep "MentorIntro" src/pages/` returns hits at the end of Phase 6 that weren't deleted. `git status` shows `src/pages/index.astro` modified.

**Source:** Astro component semantics — [Astro docs: components](https://docs.astro.build/en/basics/astro-components/) — HIGH confidence.

### Pitfall 6: Missing Width/Height on `<img>` → CLS

**What goes wrong:** Portrait `<img>` renders without `width` / `height` attributes. During page load, the browser doesn't know the intrinsic dimensions, reserves zero height, then shifts the layout when the image loads. Cumulative Layout Shift (CLS) hits — a Core Web Vitals metric. Allan's existing portrait at `index.astro:141-147` also has no `width`/`height` and relies on the aspect-ratio container to hold space — this works **only because** the `aspect-[4/3]` utility locks the parent height before the image loads.

**Why it happens:** Copy-paste from a hero pattern where the image is `position: absolute` inside an aspect-ratio container. The container handles layout reservation; the `<img>` is just a visual fill.

**How to avoid:** Keep the pattern exactly as in `index.astro:139-148`: `aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4]` on the parent, `absolute inset-x-0 -top-[10%]` on the img. Do NOT remove the `aspect-*` utility — if you do, add explicit `width` / `height` to the `<img>`. (Sharp could report intrinsic dims but the aspect container is simpler.)

**Warning signs:** Lighthouse CLS > 0.1 for the page that contains MentorIntro. Visual "jump" when scrolling past the image on a slow connection.

**Source:** [web.dev — Cumulative Layout Shift](https://web.dev/articles/cls) — HIGH confidence.

### Pitfall 7: `logResult` Race — Logs Print Before File Exists

**What goes wrong:** The existing `logResult()` at `scripts/optimize-images.mjs:51-57` uses `import("node:fs").then(fs => ...)` — a fire-and-forget dynamic import. If called immediately after `await toWebp(...)`, the file has been written by the time `stat` runs, so it works. But `logResult(labels[i], results[i])` inside a `.forEach` fires all logs without awaiting, which means the console output can race — usually harmless, sometimes produces interleaved output.

**Why it happens:** Pre-existing design choice in the script; not worth refactoring for Phase 6 scope.

**How to avoid:** Leave `logResult()` as-is. Follow the `processLogos()` pattern exactly — it produces correct output in practice. If `processLachlan()` shows a mangled log line, it's cosmetic, not functional. Do NOT refactor the script's logging in Phase 6 (scope creep).

**Warning signs:** N/A — cosmetic only.

**Source:** Direct inspection of `scripts/optimize-images.mjs:51-57`.

### Pitfall 8: Quality 75 vs 85 Drift — Output Outside 150–300 KB

**What goes wrong:** Engineer picks quality 85 "to be safe" and the portrait emits at ~400 KB, violating MENTOR-08. Or picks 70 and gets 80 KB, missing the floor. Allan's existing reference `alan-networking-2x.webp` is **177 KB** — sitting mid-band — and was produced at roughly `{ width: ~1600-1800, quality: 80-82 }`.

**Why it happens:** Copy-paste from `processLogos()` (quality 85) or `processBanners()` (quality 75) without thinking about the output size budget.

**How to avoid:** Start with `{ width: 1600, quality: 82 }` for the portrait. After the first run, check file size:
- If < 150 KB: bump quality to 85 or width to 1800
- If > 300 KB: drop quality to 78 or width to 1400
Iterate once; do not over-tune. Commit the final values.

**Warning signs:** File size outside 150–300 KB after first run → adjust; if can't land in band within 2 tries, surface to product owner (source image may need pre-processing).

**Source:** Direct measurement — `public/images/heroes/alan-networking-2x.webp` = 177,416 bytes.

## Component Prop Interface (Recommended)

The prop interface below is the recommended shape for `MentorIntro.astro`. The planner may adjust field names if they conflict with existing conventions, but the *structure* (bio + specialties array + audience items array + flip + CTA) is locked by D-07 and D-08.

```typescript
interface Specialty {
  icon: string;                // Filename in public/images/icons/ without extension
                               // (component expands to /images/icons/{icon}.webp)
  name: string;                // Heading on the card
  desc: string;                // Card description
}

interface AudienceItem {
  title: string;               // Bold lead phrase ("Solo agency owners")
  desc: string;                // Trailing description
}

interface Props {
  id?: string;                 // HTML id for the outer section (for #lachlan anchor)
  eyebrow: string;             // Small gold label above headline
  name: string;                // First name — rendered in italic white emphasis inside headline
  headline: string;            // Full H2 text that INCLUDES `name` as a substring (split on it)
  credentials: string[];       // 2-4 bio paragraphs, each becomes a <p>
  image: { src: string; alt: string; };
  flip?: boolean;              // Default false. true = image LEFT, text RIGHT.
  cta: { label: string; href: string; };
  specialties: Specialty[];    // Recommend 3 items for visual balance
  audienceHeading: string;     // H3 above the audience list
  audienceItems: AudienceItem[];  // Recommend 3-4 items
}
```

**Icon filenames that already exist in `public/images/icons/` and map to Lachlan's specialties:**
- AI / automation: `automation.webp`, `custom-development.webp`
- Solo agency scaling: `analytics.webp`, `funnel.webp`, `tier-growth.webp`
- Co-founder work: `business-fit.webp`, `team-training.webp`, `contract.webp`

Phase 7 chooses final icons from this existing inventory.

## Code Examples

Verified patterns from this codebase:

### Image wrapper with parallax (source: `src/pages/index.astro:139-149`)
```astro
<div class="aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
     data-motion="blur-reveal" data-motion-delay="0.3">
  <img
    src="/images/lachlan/lachlan-portrait.webp"
    alt="Lachlan MacDonald"
    class="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover object-center"
    data-parallax="-60"
    loading="lazy"
  />
  <div class="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent z-10"></div>
</div>
```

### Eyebrow + H2 + bio paragraphs (source: `src/pages/index.astro:116-134`)
```astro
<div class="inline-flex items-center gap-4 mb-6" data-motion="blur-reveal">
  <div class="h-[1px] w-12 bg-gold"></div>
  <p class="text-gold font-bold text-xs tracking-[0.2em] uppercase">The Specialist</p>
</div>
<h2 class="text-h2 mb-10 leading-tight" data-motion="stagger-words" data-motion-delay="0.1">
  Meet <span class="text-white italic font-light">Lachlan</span>
</h2>
<div class="space-y-6">
  <p class="text-body text-text-secondary leading-relaxed" data-motion="blur-reveal" data-motion-delay="0.2">
    {paragraph_1}
  </p>
  <!-- etc. -->
</div>
```

### Specialty card (source: `src/pages/index.astro:236-256`)
```astro
<div data-motion="blur-reveal" data-motion-delay="0.1" data-parallax="-20">
  <Card class="h-full">
    <div class="flex flex-col gap-6 h-full">
      <img src="/images/icons/automation.webp" alt="" width="48" height="48" class="w-12 h-12 shrink-0" loading="lazy" />
      <div>
        <h3 class="text-h3 mb-3 font-heading">{name}</h3>
        <p class="text-text-secondary text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </Card>
</div>
```

### Bordered-list row (source: `src/pages/index.astro:312-314`)
```astro
<div class="flex items-start gap-6 border-l border-gold/30 pl-6 py-2 transition-colors duration-500 hover:border-gold group"
     data-motion="skew-up" data-motion-delay="0.15">
  <span class="text-body-lg text-white group-hover:text-gold transition-colors duration-500">
    <strong class="font-bold">{item.title}</strong> — {item.desc}
  </span>
</div>
```

### `processX()` function (source: `scripts/optimize-images.mjs:60-77`)
```javascript
async function processLogos() {
  console.log("\n🖼  Logos:");
  const dir = join(DEST, "logos");
  await ensureDir(dir);

  const srcFull = join(SRC, "logos/transparent/logo-full.png");
  // ...

  const tasks = [
    toWebp(srcFull, join(dir, "logo-full.webp"), { width: 400, quality: 85 }),
  ];

  const results = await Promise.all(tasks);
  results.forEach((f, i) => logResult(["logo-full.webp"][i], f));
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JPG in `public/` + manual file-by-file optimization | `_zip_temp/` staging + `scripts/optimize-images.mjs` batch pipeline | Established in Phase 1 | Keeps deploy bundle lean; repeatable |
| GSAP scroll animations | Motion One + `data-motion` observer in `Base.astro` | Pivot 2026-02-12 → 2026-04-23 | ~40 KB bundle savings; same API surface |
| Kit (ConvertKit) email | Resend | Pivot period | Not relevant to Phase 6 |
| Cloudflare Pages adapter | Vercel adapter (`@astrojs/vercel`) | Pivot period | `astro.config.mjs` reflects this |

**Deprecated / irrelevant:**
- `public/Lachlan Pictures/` directory — being removed in Phase 6 per D-03.
- Original launch research `STACK.md` (pre-2026-04-23) — superseded by v1.1 rewrite in same file.

## Open Questions

1. **Should `toWebp()` be patched globally, or `.rotate()` inlined in `processLachlan()`?**
   - What we know: patching the helper is safer (covers future iPhone uploads) and the change is backward-compatible (no-op for images without EXIF orientation).
   - What's unclear: whether the maintainer prefers minimal diffs in existing working code.
   - Recommendation: **patch the helper** — one-line change, no regression risk, future-proof. Flag for human review in the PR.

2. **Does `Portrait.JPG` actually have EXIF Orientation metadata?**
   - What we know: 8.6 MB source, consistent with an iPhone raw JPG, which almost always ships with orientation tags.
   - What's unclear: without running `sharp(src).metadata()` (blocked — deps not installed in this session), we can't confirm the orientation flag value.
   - Recommendation: treat as IF orientation is present, apply `.rotate()` unconditionally. Worst case: no-op.

3. **What target width is optimal — 1400, 1600, or 1800?**
   - What we know: Allan's `alan-networking-2x.webp` (177 KB) comes in around 1400–1800 px judging by file size vs quality. The image is displayed at max ~700 px wide on desktop (inside `lg:col-span-7` at `max-w-7xl`), so a 2x retina target is ~1400 px.
   - What's unclear: whether the source has enough resolution at 1800 px — an 8.6 MB iPhone JPG almost certainly does.
   - Recommendation: **1600 px at quality 82** as the first trial. Adjust if file size misses 150–300 KB band on first build.

4. **Is `Picture_with_War_Room_members.JPG` worth processing at all?**
   - What we know: D-02 says yes (process now, placement deferred). Prior PITFALLS research says the image is "explicitly forbidden" as hero/feature imagery and should not carry social proof.
   - What's unclear: whether Phase 7 will actually find a use for it.
   - Recommendation: process it per D-02, but flag in the phase summary that its existence does not mandate its use. STATE.md already tracks this as a pending concern.

## Environment Availability

> This phase requires only Node tooling and the existing codebase. No databases, services, or OS-level dependencies.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Running `optimize-images.mjs` | ✓ | 24.14.0 (confirmed via session) | — |
| `sharp` npm package | Image optimization | ✓ (declared in `package.json` devDependencies) | ^0.34.5 | — |
| `astro` CLI | `astro check` / `astro dev` | ✓ (declared in `package.json`) | ^5.17.1 | — |
| pnpm (or npm) | Install deps if missing | Assumed ✓ (project uses pnpm per `package.json.pnpm` field) | — | `npm install` works as fallback |
| Source JPGs | `processLachlan()` | ✓ | `public/Lachlan Pictures/Portrait.JPG` (8.6 MB), `Picture_with_War_Room_members.JPG` (9.4 MB) | — |
| `_zip_temp/` directory | Target for moved JPGs | ✗ (confirmed via glob — directory does not exist yet) | — | Create via `mkdir` before `git mv` |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:**
- `_zip_temp/Lachlan/` directory doesn't exist yet — must be created by the plan before the `git mv` step (trivial — `mkdir -p _zip_temp/Lachlan`).

**Note on pnpm install:** If a clean clone is used, `pnpm install` must run before `node scripts/optimize-images.mjs` executes. This is standard project hygiene — not a Phase 6-specific concern — but worth flagging in the plan's task for the image pipeline.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | **None installed.** No `jest`, `vitest`, `playwright`, or similar package. No `test` script in `package.json`. |
| Config file | None |
| Quick run command | `pnpm run astro check` — Astro's built-in TS + component type check. Runs in ~5–15 s. |
| Full suite command | `pnpm run build` — full Astro build (catches template errors, missing imports, broken types). Runs in ~20–45 s. |
| Manual smoke | `pnpm run dev` + open `http://localhost:4321` — visual check of any test route |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MENTOR-08 | `public/images/lachlan/lachlan-portrait.webp` exists and is 150–300 KB | integration | `node scripts/optimize-images.mjs && node -e "const s=require('fs').statSync('public/images/lachlan/lachlan-portrait.webp').size; process.exit(s>=150*1024 && s<=300*1024 ? 0 : 1)"` | ✅ (just extends existing script) |
| MENTOR-08 | `public/images/lachlan/lachlan-portrait.webp` renders without distortion | manual-only | Open file in image viewer; compare dimensions + visual appearance to source | — (no automated image-diff tooling; visual check is the pragmatic option) |
| D-03 | No `.JPG` files remain in `public/` after the move | integration | `! find public -iname "*.jpg" -o -iname "*.jpeg" 2>/dev/null \| grep .` (exits non-zero if any JPG exists) | ✅ |
| D-03 | No `.JPG` files ship in `dist/` | integration | `pnpm run build && ! find dist -iname "*.jpg" -o -iname "*.jpeg" 2>/dev/null \| grep .` | ✅ |
| D-11 (Component compiles) | `MentorIntro.astro` typechecks | unit | `pnpm run astro check` | ✅ |
| Phase 6 success #4 (renders in isolation) | Component does not break the page | integration | `pnpm run build` — build succeeds with no new component references in `index.astro` | ✅ |
| D-11 (Component animations wire correctly) | Elements get `data-motion` attributes | manual-only | Temporarily create `src/pages/_mentor-preview.astro`, run `pnpm run dev`, visually confirm animations fire | — |

### Sampling Rate

- **Per task commit:** `pnpm run astro check` (runs in ~10 s)
- **Per wave merge:** `pnpm run build` + file-size assertion one-liner above
- **Phase gate:** Full build green + visual comparison of WebP output against source + `alan-networking-2x.webp`

### Wave 0 Gaps

- [ ] No test framework install is required — `astro check` + `astro build` provide sufficient signal for this phase's scope.
- [ ] Consider adding a `scripts/validate-images.mjs` one-liner that asserts file-size budgets across `public/images/**/*.webp` — **defer**, not Phase 6 scope. Flag as a future "nice to have" if MENTOR-08 regressions ever reappear.

*(No test files need to be authored during Wave 0 of Phase 6 — the existing Astro tooling covers the testable surface.)*

## Sources

### Primary (HIGH confidence)
- **Direct file inspection:**
  - `scripts/optimize-images.mjs` (full read) — helper shapes, SRC/DEST constants, logResult race
  - `src/pages/index.astro:109-153` — Allan's split-grid reference pattern (visual blueprint for MentorIntro)
  - `src/pages/index.astro:218-260` — bento grid + Card + data-parallax reference
  - `src/pages/index.astro:302-326` — bordered-list rows (for "who he works with" block)
  - `src/components/SectionWrapper.astro` — prop interface: `id`, `width: "narrow" | "wide"`, `class`
  - `src/components/Button.astro` — prop interface: `variant`, `size`, `href`, passthrough `...attrs`
  - `src/components/Card.astro` — single-class wrapper
  - `src/layouts/Base.astro:140-217` — Motion One observer (`data-motion`, `data-motion-delay`, `data-parallax`)
  - `.gitignore:27` — confirms `_zip_temp/` is ignored
  - `package.json` — sharp 0.34.5, astro 5.17.1, motion 12.34.0, split-type 0.3.4, lenis 1.3.17
  - `public/images/heroes/alan-networking-2x.webp` stat → **177,416 bytes** (reference size)
  - `public/Lachlan Pictures/Portrait.JPG` stat → 8,665,356 bytes (source size)
  - `public/Lachlan Pictures/Picture_with_War_Room_members.JPG` stat → 9,483,528 bytes
- **Sharp documentation (fetched 2026-04-23):** [api-output/#webp](https://sharp.pixelplumbing.com/api-output/) — webp defaults (quality 80, effort 4)
- **Sharp documentation (fetched 2026-04-23):** [api-input/](https://sharp.pixelplumbing.com/api-input/) — EXIF orientation NOT auto-applied; `.rotate()` required
- **Astro documentation:** [basics/project-structure](https://docs.astro.build/en/basics/project-structure/) — `public/` copied verbatim into `dist/`
- **Prior milestone research (directly applicable):**
  - `.planning/research/STACK.md` — "No new packages required" finding
  - `.planning/research/PITFALLS.md` Pitfall 4 — photo quality mismatch
  - `.planning/REQUIREMENTS.md` MENTOR-08 — 150–300 KB WebP requirement

### Secondary (MEDIUM confidence)
- [web.dev — CLS](https://web.dev/articles/cls) — aspect-ratio parent reserves space pattern
- [m2mpics — inconsistent team headshots cost](https://www.m2mpics.com/post/why-inconsistent-team-photos-are-costing-your-alpharetta-business-clients-and-how-to-fix-it) — cited in prior PITFALLS research; directly applicable to Pitfall 3

### Tertiary (LOW confidence)
- None — every claim in this doc is backed by either direct code inspection or an official docs source.

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — all packages already installed, versions verified against npm registry
- Architecture patterns: **HIGH** — directly traced from existing code in `index.astro` and `optimize-images.mjs`
- Pitfalls: **HIGH** — EXIF (sharp docs), public directory (Astro docs), flex-vs-grid (Tailwind docs), quality mismatch (prior milestone research cites m2mpics). All verified.
- Validation architecture: **HIGH** — `astro check` / `astro build` confirmed via `package.json` scripts; no test framework installed, so no false advertising.

**Research date:** 2026-04-23
**Valid until:** 2026-05-23 (30 days — stack is stable; extend if no sharp 0.35 / Astro 6 upgrade pressure emerges)
