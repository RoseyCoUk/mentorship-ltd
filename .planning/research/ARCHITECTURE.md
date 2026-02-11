# Architecture Patterns

**Project:** Elevateo Co - Business Education Website
**Researched:** 2026-02-11
**Overall Confidence:** HIGH

---

## Recommended Architecture

**Plain HTML/CSS/JS with shared components loaded via vanilla JavaScript.**

This is a 3-page marketing website with one integration point (email capture). There is no dynamic content, no user authentication, no database, and no content that changes frequently. Using a framework like Astro, Next.js, or Hugo would add build tooling, a dependency tree, and cognitive overhead that is disproportionate to the problem. The entire site can be expressed as static files served from any hosting provider.

The one legitimate pain point of plain HTML -- duplicating headers/footers across pages -- is solved with a small vanilla JS component loader (under 30 lines). This keeps the project zero-dependency while avoiding copy-paste drift.

### Architecture Diagram

```
[Browser] ──GET──> [Static Host (Netlify / Vercel / GitHub Pages)]
                          │
                          ├── index.html (Home)
                          ├── about.html (About)
                          ├── courses.html (Courses)
                          │
                          ├── css/
                          │   ├── variables.css (design tokens)
                          │   ├── base.css (reset, typography, globals)
                          │   ├── components.css (buttons, cards, forms, nav)
                          │   └── pages.css (page-specific overrides)
                          │
                          ├── js/
                          │   ├── components.js (load header/footer)
                          │   └── forms.js (email capture handling)
                          │
                          ├── components/
                          │   ├── header.html (shared navigation)
                          │   ├── footer.html (shared footer)
                          │   └── email-signup.html (shared CTA block)
                          │
                          └── assets/
                              ├── images/ (WebP, optimized)
                              ├── fonts/ (self-hosted for performance)
                              └── favicon/

[Email Form Submit] ──POST──> [Kit (ConvertKit) API / Embed]
                                    │
                                    └──> Subscriber added to Kit list
                                         └──> Kit handles welcome email sequence
```

### Why Not a Framework

| Concern | Plain HTML/CSS | Astro / Hugo / Next.js |
|---------|---------------|----------------------|
| Build step required | No -- edit and deploy | Yes -- must run build command |
| Dependencies | Zero | npm packages, Node.js |
| Learning curve | HTML/CSS only | Framework syntax + CLI + config |
| Header/footer reuse | Vanilla JS includes (simple) | Built-in components (simpler) |
| Performance | Maximum -- no JS framework overhead | Excellent -- but still has build artifacts |
| Hosting | Any static host, drag-and-drop | Requires build pipeline |
| Maintenance | Edit HTML directly | Must maintain build toolchain |
| SEO | Native -- what you write is what ships | Equivalent for static output |

**Verdict:** For 3 pages with no content pipeline, no CMS, and no dynamic features, a framework adds cost without meaningful benefit. The only advantage (component reuse) is solved by a 25-line JS loader. If the site grows to 10+ pages or adds a blog/CMS, reconsider with Astro at that point.

**Confidence:** HIGH -- this is a well-understood pattern for small marketing sites.

---

## Component Boundaries

### 1. Shared Components (loaded on every page)

| Component | File | Responsibility | Notes |
|-----------|------|---------------|-------|
| **Header/Nav** | `components/header.html` | Logo, navigation links (Home, About, Courses), mobile hamburger menu | Fixed/sticky on scroll. 3 links max to reduce exit friction. |
| **Footer** | `components/footer.html` | Copyright, social links, secondary nav, email signup CTA | Consistent across all pages. |
| **Email Signup Block** | `components/email-signup.html` | Reusable email capture form with headline + input + button | Embedded in footer AND as standalone section on pages. |
| **Component Loader** | `js/components.js` | Fetches and injects shared HTML fragments into page placeholders | Runs on DOMContentLoaded. Uses `fetch()` to load HTML partials. |

### 2. Page-Specific Sections

**Home Page (`index.html`)**

| Section | Purpose | Key Elements |
|---------|---------|-------------|
| Hero | Instant value proposition, primary CTA | Bold headline, subheadline, CTA button, trust indicators |
| Social Proof | Build credibility immediately | Metrics, logos, brief testimonials |
| Problem/Solution | Address pain, position as answer | Pain points of scaling, Elevateo as the solution |
| How It Works | Reduce perceived complexity | 3-step process visual |
| About Preview | Introduce Alan Chan | Photo, brief bio, link to About page |
| Courses Preview | Tease upcoming content | 2-3 course cards, "Coming Soon" positioning |
| FAQ | Handle objections | Accordion-style, 5-7 questions |
| Final CTA | Close -- email signup | Restate benefit, email capture form |

**About Page (`about.html`)**

| Section | Purpose | Key Elements |
|---------|---------|-------------|
| Hero | Alan Chan's positioning statement | Photo, headline, credibility summary |
| Origin Story | Build trust through narrative | Founder journey, relatable challenges |
| Credentials | Prove authority | Key metrics, experience, results |
| Philosophy | Differentiate approach | What makes Elevateo's method distinct |
| CTA | Convert interested visitors | Email signup |

**Courses Page (`courses.html`)**

| Section | Purpose | Key Elements |
|---------|---------|-------------|
| Hero | Set expectations | "Courses launching soon" with confident framing |
| Course Grid | Show what is coming | 3-6 placeholder cards with topic, description, "Coming Soon" badge |
| Why These Topics | Build anticipation | Brief explanation of curriculum thinking |
| Notify CTA | Capture leads | "Be the first to know" email signup, most important CTA on this page |

### 3. Integration Components

| Component | Responsibility | External Dependency |
|-----------|---------------|-------------------|
| **Email Form** | Capture name + email, submit to provider | Kit (ConvertKit) embed or API |
| **Analytics** | Track page views, CTA clicks | Google Analytics 4 (script tag) |
| **Font Loading** | Self-hosted fonts for performance | None -- fonts in `/assets/fonts/` |

---

## Data Flow

### Email Capture Flow (Primary Conversion Path)

This is the most important data flow in the entire site. Every other element exists to drive visitors toward this action.

```
User lands on any page
    │
    ├── Sees email signup in:
    │   ├── Hero section CTA (Home)
    │   ├── Final CTA section (Home, About)
    │   ├── "Notify Me" section (Courses)
    │   └── Footer (all pages)
    │
    ▼
User enters email (+ optional first name)
    │
    ▼
Form submits to Kit (ConvertKit)
    │
    ├── Option A: Kit JavaScript Embed (RECOMMENDED)
    │   └── Kit's JS handles submission directly
    │       └── Kit shows success message inline
    │
    ├── Option B: Kit API via form action
    │   └── Form action="https://app.kit.com/forms/{id}/subscriptions"
    │       └── Redirects to Kit thank-you or custom page
    │
    └── Option C: Custom fetch() to Kit API
        └── JS intercepts form submit
            └── POST to Kit API endpoint
                └── Show custom success/error message
                    └── No page redirect (best UX)
    │
    ▼
Kit adds subscriber to list
    │
    ▼
Kit triggers welcome email sequence (configured in Kit, not in our code)
```

**Recommendation: Option C (Custom fetch to Kit API)** because:
- No page redirect (stays on the current page)
- Custom success/error messaging matching the site's dark theme
- Form validation happens client-side before submission
- Loading state feedback while submitting
- No Kit-branded UI injected into the page

**Confidence:** HIGH -- Kit's form API is well-documented and widely used with static sites.

### Page Navigation Flow

```
Home ←──→ About
  │          │
  ├──→ Courses ←──┘
  │
  └──→ Email Signup (on every page)
```

All pages link to all other pages via the shared header. The navigation is flat (no dropdowns, no hierarchy). This is intentional -- with 3 pages, every page should be one click away.

### Analytics Flow

```
User action (page view, CTA click, form submit)
    │
    ▼
Google Analytics 4 script (loaded async, deferred)
    │
    ▼
GA4 property (configured in Google Analytics dashboard)
```

Track these specific events:
- `page_view` (automatic)
- `cta_click` (custom event on CTA buttons)
- `email_signup_start` (custom event when user focuses email input)
- `email_signup_complete` (custom event on successful submission)

---

## CSS Architecture: Design Token System

The dark, bold aesthetic is the project's visual identity. It must be systematic, not ad-hoc. Use CSS custom properties (variables) as design tokens.

### `css/variables.css` -- The Single Source of Truth

```css
:root {
  /* === Colors === */
  --color-bg-primary: #0a0a0a;        /* Near-black background */
  --color-bg-secondary: #141414;      /* Slightly lighter sections */
  --color-bg-card: #1a1a1a;           /* Card backgrounds */
  --color-text-primary: #ffffff;       /* Main text */
  --color-text-secondary: #a0a0a0;    /* Muted text */
  --color-accent: #d4af37;            /* Gold accent (authority) */
  --color-accent-hover: #e5c54a;      /* Accent hover state */
  --color-border: #2a2a2a;            /* Subtle borders */

  /* === Typography === */
  --font-heading: 'Inter', sans-serif;     /* Or similar bold sans */
  --font-body: 'Inter', sans-serif;
  --font-size-hero: clamp(2.5rem, 5vw, 4.5rem);
  --font-size-h1: clamp(2rem, 4vw, 3.5rem);
  --font-size-h2: clamp(1.5rem, 3vw, 2.5rem);
  --font-size-h3: clamp(1.25rem, 2vw, 1.75rem);
  --font-size-body: clamp(1rem, 1.5vw, 1.125rem);
  --font-size-small: 0.875rem;
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-regular: 400;

  /* === Spacing === */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;
  --space-section: clamp(4rem, 8vw, 8rem);

  /* === Layout === */
  --max-width: 1200px;
  --max-width-narrow: 800px;

  /* === Transitions === */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;

  /* === Borders === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

This token system means:
- Every color, font size, and spacing value is defined ONCE
- Changing the accent color from gold to another color is a single line change
- Responsive sizing uses `clamp()` -- no media queries needed for font scaling
- Any component references tokens, never hard-coded values

### CSS File Responsibilities

| File | What Goes In It | What Does NOT Go In It |
|------|-----------------|----------------------|
| `variables.css` | All design tokens (colors, fonts, spacing) | No selectors, no rules |
| `base.css` | Reset/normalize, html/body styles, global typography, utility classes | No component-specific styles |
| `components.css` | Buttons, cards, forms, navigation, footer, badges | No page layout |
| `pages.css` | Page-specific section layouts, hero variants, grid configurations | No component definitions |

**Load order matters:**
```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/pages.css">
```

---

## Responsive Strategy

**Mobile-first.** Write base styles for mobile, then add complexity for larger screens.

### Breakpoints

```css
/* Mobile: default (no media query needed) */
/* Tablet: */  @media (min-width: 768px) { ... }
/* Desktop: */ @media (min-width: 1024px) { ... }
/* Wide: */    @media (min-width: 1400px) { ... }
```

### Key Responsive Behaviors

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger or inline | Inline links |
| Hero text | `2.5rem` (via clamp) | Scales up | `4.5rem` (via clamp) |
| Course grid | 1 column | 2 columns | 3 columns |
| Section padding | `4rem` top/bottom | Scales up | `8rem` top/bottom |
| CTA buttons | Full width | Auto width | Auto width |

---

## File and Folder Organization

```
elevateo-co/
├── index.html                    # Home page
├── about.html                    # About Alan Chan
├── courses.html                  # Course grid + coming soon
│
├── css/
│   ├── variables.css             # Design tokens only
│   ├── base.css                  # Reset, global styles, utilities
│   ├── components.css            # Buttons, cards, nav, forms, footer
│   └── pages.css                 # Page-specific layouts
│
├── js/
│   ├── components.js             # Shared component loader (header, footer)
│   ├── forms.js                  # Email capture form handling (Kit API)
│   └── nav.js                    # Mobile hamburger toggle
│
├── components/
│   ├── header.html               # Shared header/navigation
│   ├── footer.html               # Shared footer
│   └── email-signup.html         # Reusable email CTA block
│
├── assets/
│   ├── images/
│   │   ├── hero-home.webp        # Home hero image
│   │   ├── alan-chan.webp         # Founder photo
│   │   ├── alan-chan-about.webp   # Larger About page photo
│   │   ├── og-image.jpg          # Social sharing image (JPG for compatibility)
│   │   └── logo.svg              # Elevateo Co logo
│   │
│   ├── fonts/
│   │   ├── inter-var.woff2       # Variable font (one file, all weights)
│   │   └── (or separate weight files if not using variable font)
│   │
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── site.webmanifest
│
└── (no package.json, no node_modules, no build config)
```

**Why this structure:**
- Flat page structure -- every HTML page at root level, reflecting the flat URL structure (`/about.html` not `/pages/about/index.html`)
- CSS split by concern, not by page -- avoids duplication
- Components directory holds HTML fragments, not full pages
- Assets organized by type (images, fonts, favicons)
- No build tooling directory -- there is nothing to build

---

## Shared Component Loader Pattern

The one piece of JavaScript architecture that matters. This solves the "duplicate header/footer" problem without a framework.

### How It Works

Each page contains placeholder elements:

```html
<!-- In every page's <body> -->
<div id="site-header"></div>

<!-- Page content here -->

<div id="site-footer"></div>

<script src="js/components.js"></script>
```

The loader script:

```javascript
// js/components.js
document.addEventListener('DOMContentLoaded', () => {
  const components = [
    { id: 'site-header', src: 'components/header.html' },
    { id: 'site-footer', src: 'components/footer.html' },
  ];

  components.forEach(({ id, src }) => {
    const target = document.getElementById(id);
    if (target) {
      fetch(src)
        .then(res => res.text())
        .then(html => {
          target.innerHTML = html;
          // Re-initialize any JS in loaded component (e.g., mobile nav)
          target.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            script.replaceWith(newScript);
          });
        });
    }
  });
});
```

**Tradeoff acknowledged:** The header/footer load via JS after the initial HTML parse, which means a brief flash on slow connections. For a 3-page marketing site, this is imperceptible on modern connections. If it becomes a concern, the mitigation is to inline critical header CSS and use a skeleton placeholder.

**Alternative considered:** Server-Side Includes (SSI) or build-time includes via a simple script. These eliminate the flash-of-unstyled-content risk but require either server configuration (SSI) or a build step (script). The JS approach is chosen for zero-config simplicity. If the team later wants to eliminate the flash, a 5-line Node script that concatenates the partials into full HTML files at deploy time is a straightforward upgrade.

---

## Performance Architecture

### Loading Strategy

```html
<head>
  <!-- Critical: Design tokens + base styles (render-blocking is OK for these) -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/pages.css">

  <!-- Fonts: Preload for fast rendering -->
  <link rel="preload" href="assets/fonts/inter-var.woff2"
        as="font" type="font/woff2" crossorigin>

  <!-- Analytics: Async, non-blocking -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
</head>
<body>
  <!-- Content... -->

  <!-- JS: At end of body, after content renders -->
  <script src="js/components.js"></script>
  <script src="js/forms.js"></script>
  <script src="js/nav.js"></script>
</body>
```

### Image Strategy

| Format | When to Use |
|--------|------------|
| WebP | All photographs and complex images (hero, portraits) |
| SVG | Logo, icons, simple graphics |
| PNG | Only if transparency needed and SVG not suitable |

All images should have:
- `width` and `height` attributes (prevents layout shift)
- `loading="lazy"` on below-fold images
- `alt` text for accessibility
- Responsive `srcset` for hero images if multiple sizes are provided

### Target Performance Budget

| Metric | Target | Why |
|--------|--------|-----|
| First Contentful Paint | < 1.0s | User sees content immediately |
| Largest Contentful Paint | < 2.0s | Hero image/text fully visible |
| Total page weight | < 500KB | Fast on mobile networks |
| Total requests | < 15 | Minimize round trips |
| JavaScript total | < 20KB | Only loader + form + nav |
| CSS total | < 30KB | Design tokens + components |

These targets are achievable because there is no framework JS, no CSS framework, and the only external scripts are analytics and the Kit form embed (if using Option A).

---

## SEO and Meta Architecture

Each page needs complete meta tags. Structure them consistently:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Page-specific -->
  <title>[Page Title] | Elevateo Co</title>
  <meta name="description" content="[Page-specific description, 150-160 chars]">

  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="[Page Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[Full URL to og-image.jpg]">
  <meta property="og:url" content="[Full page URL]">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Page Title]">
  <meta name="twitter:description" content="[Description]">
  <meta name="twitter:image" content="[Full URL to og-image.jpg]">

  <!-- Canonical -->
  <link rel="canonical" href="[Full canonical URL]">

  <!-- Favicon -->
  <link rel="icon" href="assets/favicon/favicon.ico">
  <link rel="apple-touch-icon" href="assets/favicon/apple-touch-icon.png">
</head>
```

---

## Suggested Build Order

This ordering is based on dependency analysis: what blocks what.

### Phase 1: Foundation (Build First)

**What:** Design token system, base CSS, shared components (header, footer), page shells.

**Why first:** Everything else depends on the visual foundation and shared navigation. If you build a page section before the design tokens exist, you will hard-code colors and spacing, then have to refactor when the token system is introduced. Build the system first.

**Deliverables:**
1. `css/variables.css` -- all design tokens
2. `css/base.css` -- reset, typography, body styles
3. `components/header.html` -- navigation
4. `components/footer.html` -- footer with placeholder email form
5. `js/components.js` -- component loader
6. Three empty page shells (`index.html`, `about.html`, `courses.html`) with header/footer loading

**Done when:** You can navigate between 3 pages with consistent header, footer, and dark theme.

### Phase 2: Home Page (Build Second)

**What:** All home page sections, top to bottom.

**Why second:** The home page is the most complex page and establishes every component pattern (hero, cards, CTA blocks, FAQ accordion) that the other pages will reuse. Building it second means the design system gets stress-tested early.

**Deliverables:**
1. Hero section with headline, subheadline, CTA
2. Social proof section
3. Problem/Solution section
4. How It Works section
5. About preview section
6. Course preview cards
7. FAQ accordion
8. Final CTA section
9. `css/components.css` -- all component styles built here
10. `css/pages.css` -- home page layout

**Done when:** Home page is fully built, responsive, and visually complete.

### Phase 3: About + Courses Pages (Build Third)

**What:** Remaining pages, reusing components established in Phase 2.

**Why third:** These pages are simpler and mostly compose existing components. The About page is a narrative layout. The Courses page is a grid of cards. Both reuse the CTA block, card component, and section patterns from the home page.

**Deliverables:**
1. About page -- all sections
2. Courses page -- grid layout + coming soon cards
3. Page-specific CSS additions

**Done when:** All 3 pages fully built and responsive.

### Phase 4: Email Capture Integration (Build Fourth)

**What:** Connect email forms to Kit (ConvertKit), implement form handling JS, success/error states.

**Why fourth (not earlier):** The forms need to exist visually first (built in Phase 2/3 as static HTML). Integration is a separate concern -- it connects to an external service and needs its own testing. Doing it last means you are not blocked by Kit account setup while building the site.

**Deliverables:**
1. Kit account setup and form creation
2. `js/forms.js` -- form submission handler
3. Success/error UI states
4. Form validation (client-side)
5. Test submissions confirmed in Kit dashboard

**Done when:** A visitor can enter their email on any page and appear in the Kit subscriber list.

### Phase 5: Polish and Optimization (Build Last)

**What:** Performance optimization, SEO meta tags, analytics, accessibility audit, cross-browser testing.

**Why last:** Polish should happen after all content is in place. Optimizing images that might change is wasted effort. Meta descriptions need final copy. Analytics events need final CTA placements.

**Deliverables:**
1. Image optimization (compression, WebP conversion)
2. SEO meta tags on all pages
3. Google Analytics 4 setup
4. Accessibility pass (contrast, alt text, keyboard nav, ARIA)
5. Cross-browser testing (Chrome, Firefox, Safari, Edge, mobile)
6. Lighthouse audit and fixes

**Done when:** Lighthouse scores 90+ across all categories.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Premature Framework Adoption
**What:** Using React, Vue, Next.js, or even Astro for a 3-page static marketing site.
**Why bad:** Adds build tooling, dependencies, and complexity without proportional benefit. The site has no dynamic data, no user state, no API routes, no content pipeline.
**Instead:** Plain HTML/CSS/JS. Reconsider if the site grows to 10+ pages or adds dynamic features.

### Anti-Pattern 2: CSS Framework for Custom Design
**What:** Using Tailwind CSS or Bootstrap when the design is custom (acquisition.com-inspired dark theme).
**Why bad:** The design tokens are bespoke -- dark backgrounds, gold accents, specific typography. A CSS framework would fight the custom design rather than accelerate it. You would spend as much time overriding defaults as writing custom CSS.
**Instead:** Custom CSS with a design token system (CSS custom properties). Total CSS will be under 30KB.

### Anti-Pattern 3: Over-Engineering the Email Form
**What:** Building a custom backend API, setting up a database, or using serverless functions for email capture.
**Why bad:** Kit (ConvertKit) handles all of this. Their API accepts form submissions directly from the client. A custom backend is unnecessary complexity and a maintenance burden.
**Instead:** Client-side fetch to Kit's API. Kit manages subscribers, sequences, and deliverability.

### Anti-Pattern 4: Single-Page Application (SPA) Routing
**What:** Using JavaScript-based routing instead of separate HTML pages.
**Why bad:** SPAs hurt SEO for content sites, add JS weight, create complexity for 3 pages, and break basic browser behavior (back button, bookmarks) unless carefully handled.
**Instead:** Separate HTML files. Let the browser do what browsers do.

### Anti-Pattern 5: Putting All CSS in One File
**What:** One monolithic `style.css` that mixes tokens, reset, components, and page layouts.
**Why bad:** Becomes unmaintainable quickly. Hard to find where styles are defined. Changes have unpredictable cascade effects.
**Instead:** Split into 4 files by concern: `variables.css`, `base.css`, `components.css`, `pages.css`. Clear boundaries, predictable cascade.

---

## Scalability Considerations

| Concern | At Launch (3 pages) | At 10 pages | At 30+ pages |
|---------|---------------------|-------------|-------------|
| Page management | HTML files at root | Consider Astro or 11ty | Migrate to SSG with CMS |
| Component reuse | JS loader | JS loader still works | SSG component system |
| CSS organization | 4-file split | May need page-specific files | Consider CSS modules or scoping |
| Email capture | Kit embed/API | Still Kit | Kit + segmentation by page |
| Content updates | Edit HTML directly | Workable | Need CMS (headless CMS + SSG) |
| Build process | None needed | Optional minification | Required build pipeline |
| Hosting | Any static host | Same | Same (CDN) |

**The migration path is clear:** If Elevateo Co grows beyond ~10 pages or adds a blog, migrate to Astro. The CSS token system, HTML component structures, and content patterns will transfer directly -- Astro uses the same HTML/CSS with `.astro` component wrappers. This is not a rewrite; it is a reorganization.

---

## Hosting Recommendation

**Netlify** (free tier) is the recommended host because:
- Zero-config deployment (drag-and-drop or Git push)
- Free SSL/HTTPS
- Global CDN
- Free tier handles the expected traffic
- Custom domain support
- Optional: Netlify Forms as a backup if Kit integration has issues
- No server to maintain

**Alternatives:** Vercel (equivalent), GitHub Pages (more limited), Cloudflare Pages (excellent performance). All work. Netlify is recommended for simplicity.

---

## Sources

- acquisition.com structure analysis (WebFetch, 2026-02-11) -- Confirmed HubSpot CMS, modular layout, flexbox-based responsive design
- [Crunchbase: Acquisition.com Tech Stack](https://www.crunchbase.com/organization/acquisition-com/technology) -- Nuxt.js, Azure, Nginx, Cloudflare
- [Astro vs Plain HTML/CSS comparison](https://www.tutorialpedia.org/blog/astro-framework-vs-plain-html-css/) -- Framework tradeoffs for small sites
- [Kit (ConvertKit) Form Embedding Basics](https://help.kit.com/en/articles/4009572-form-embedding-basics) -- Embed options: JS, raw HTML, API
- [Building Plain HTML Forms with ConvertKit](https://sayzlim.net/plain-html-form-convertkit/) -- Custom form submission approach
- [freeCodeCamp: Reusable HTML Components](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/) -- Vanilla JS component loading pattern
- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) -- Native web component standards
- [Dark Mode CSS Comprehensive Guide 2026](https://618media.com/en/blog/dark-mode-with-css-a-comprehensive-guide/) -- CSS custom properties for theming
- [Netlify Forms Setup](https://docs.netlify.com/manage/forms/setup/) -- Static site form handling
- [Kinsta: Top Static Site Generators 2026](https://kinsta.com/blog/static-site-generator/) -- SSG landscape overview
