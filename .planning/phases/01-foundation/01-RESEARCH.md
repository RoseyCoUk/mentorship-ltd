# Phase 1: Foundation -- Implementation Research

**Phase:** 01 - Foundation
**Researched:** 2026-02-11
**Overall Confidence:** HIGH
**Focus:** Astro 5.x + Tailwind CSS 4.x setup, dark theme design tokens, typography choices, responsive navigation, Astro component patterns

---

## Table of Contents

1. [Astro 5.x + Tailwind CSS 4.x Setup](#1-astro-5x--tailwind-css-4x-setup)
2. [Dark Theme Design Token System](#2-dark-theme-design-token-system-with-tailwind-v4)
3. [Typography for Authority Sites](#3-typography-for-authoritybold-sites)
4. [Responsive Navigation Patterns](#4-responsive-navigation-patterns)
5. [Astro Component Patterns](#5-astro-component-patterns)
6. [Verified Color Palette](#6-verified-color-palette-with-contrast-ratios)
7. [Implementation Sequence](#7-recommended-implementation-sequence)
8. [Gotchas and Warnings](#8-gotchas-and-warnings)
9. [Sources](#sources)

---

## 1. Astro 5.x + Tailwind CSS 4.x Setup

**Confidence: HIGH** -- Verified via official Tailwind docs, Astro 5.2 blog post, and multiple current guides.

### The Correct Setup (as of 2026)

Tailwind CSS v4 does NOT use the old `@astrojs/tailwind` integration. That integration is **deprecated**. Tailwind v4 uses its own Vite plugin (`@tailwindcss/vite`) that integrates directly with Astro's Vite-based build system.

Astro 5.2+ has native support for this approach. The `npx astro add tailwind` command now installs the Vite plugin, not the old integration.

### Step-by-Step Scaffolding

```bash
# 1. Create project with pnpm (minimal template)
pnpm create astro@latest elevateo-co -- --template minimal

# 2. Navigate into project
cd elevateo-co

# 3. Install Tailwind CSS v4 via Vite plugin
pnpm add tailwindcss @tailwindcss/vite

# 4. Done. No @astrojs/tailwind, no tailwind.config.js needed.
```

### astro.config.mjs

```typescript
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Key point:** Tailwind v4 is CSS-first. There is no `tailwind.config.js` or `tailwind.config.ts`. All configuration happens in CSS via the `@theme` directive.

### CSS Entry Point

Create `src/styles/global.css`:

```css
@import "tailwindcss";

/* All design tokens, custom styles, etc. go below */
```

Then import it once in the base layout:

```astro
---
// src/layouts/Base.astro
import "../styles/global.css";
---
```

### Project Structure

```
elevateo-co/
  src/
    layouts/
      Base.astro              # HTML shell, head, global CSS import
    pages/
      index.astro             # Home
      about.astro             # About
      courses.astro           # Courses
    components/
      Header.astro            # Navigation bar
      Footer.astro            # Site footer
      MobileMenu.astro        # Hamburger menu (if separated)
      Button.astro            # Reusable button component
      Card.astro              # Reusable card component
      FormInput.astro         # Reusable form input
      SectionWrapper.astro    # Consistent section padding/width
    styles/
      global.css              # @import "tailwindcss" + @theme tokens + @layer styles
    assets/
      images/                 # Source images (Astro optimizes at build)
  public/
    favicon.svg
    og-image.jpg
  astro.config.mjs
  package.json
  tsconfig.json
```

**Note:** Only `src/pages/` is required by Astro. All other directories are conventional but the structure above follows Astro community best practices.

### Gotcha: `npx astro add tailwind`

Running `npx astro add tailwind` on Astro 5.2+ will automatically:
- Install `tailwindcss` and `@tailwindcss/vite`
- Add the Vite plugin to `astro.config.mjs`
- Create `src/styles/global.css` with `@import "tailwindcss"`

However, there was a known issue (GitHub #13097) where this command could fail on fresh Astro 5.2 installs. If it fails, use the manual approach above. The manual approach is straightforward and only 2 steps (install packages, edit config).

---

## 2. Dark Theme Design Token System with Tailwind v4

**Confidence: HIGH** -- Verified via official Tailwind v4 docs on `@theme` directive and theme variables.

### How @theme Works in Tailwind v4

Tailwind v4 replaces `tailwind.config.js` with the `@theme` CSS directive. Variables defined in `@theme` do two things simultaneously:

1. **Generate utility classes** -- `--color-navy-900: #0B1120` creates `bg-navy-900`, `text-navy-900`, `border-navy-900`, etc.
2. **Become CSS custom properties** -- Available as `var(--color-navy-900)` everywhere in your CSS.

This is the design token system. Define once in `@theme`, use everywhere via utilities or `var()`.

### Key @theme Namespaces

| Namespace | Generates | Example |
|-----------|-----------|---------|
| `--color-*` | Color utilities (`bg-*`, `text-*`, `border-*`) | `--color-navy-900: #0B1120` |
| `--font-*` | Font family utilities (`font-*`) | `--font-heading: "Inter", sans-serif` |
| `--text-*` | Font size utilities (`text-*`) | `--text-hero: clamp(2.5rem, 5vw, 4rem)` |
| `--font-weight-*` | Font weight utilities (`font-*`) | `--font-weight-bold: 700` |
| `--leading-*` | Line height utilities (`leading-*`) | `--leading-relaxed: 1.75` |
| `--tracking-*` | Letter spacing utilities (`tracking-*`) | `--tracking-wide: 0.025em` |
| `--spacing` | All spacing/sizing utilities (`p-*`, `m-*`, `gap-*`, `w-*`, `h-*`) | `--spacing: 0.25rem` |
| `--radius-*` | Border radius utilities (`rounded-*`) | `--radius-lg: 0.75rem` |
| `--shadow-*` | Box shadow utilities (`shadow-*`) | `--shadow-card: 0 4px 6px ...` |
| `--breakpoint-*` | Responsive variants (`sm:`, `md:`, `lg:`) | `--breakpoint-md: 48rem` |

### Complete Design Token File for Elevateo

This is the recommended `src/styles/global.css` structure:

```css
@import "tailwindcss";

/* ============================================
   DESIGN TOKENS -- Elevateo Co
   Dark, bold, authority aesthetic
   ============================================ */

@theme {
  /* --- Colors: Dark Navy Palette --- */
  --color-navy-950: #070B14;     /* Deepest background */
  --color-navy-900: #0B1120;     /* Primary background */
  --color-navy-800: #0F172A;     /* Card/section backgrounds */
  --color-navy-700: #1E293B;     /* Elevated surfaces, borders */
  --color-navy-600: #334155;     /* Subtle borders, dividers */

  /* --- Colors: Text --- */
  --color-text-primary: #F1F5F9;    /* Primary text (off-white) */
  --color-text-secondary: #94A3B8;  /* Secondary/muted text */
  --color-text-tertiary: #64748B;   /* Subtle text, placeholders */

  /* --- Colors: Accent (choose ONE before building) --- */
  /* Option A: Gold (authority, premium) */
  --color-accent: #D4A843;
  --color-accent-hover: #E5BE5A;
  /* Option B: Electric blue (modern, tech) */
  /* --color-accent: #3B82F6; */
  /* --color-accent-hover: #60A5FA; */
  /* Option C: Warm amber (approachable authority) */
  /* --color-accent: #F59E0B; */
  /* --color-accent-hover: #FBBF24; */

  /* --- Colors: Semantic --- */
  --color-success: #22C55E;
  --color-error: #EF4444;

  /* --- Colors: Pure --- */
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* --- Typography --- */
  --font-heading: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;

  /* --- Font Sizes (fluid with clamp) --- */
  --text-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --text-h1: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  --text-h2: clamp(1.5rem, 3vw + 0.25rem, 2.5rem);
  --text-h3: clamp(1.25rem, 2vw + 0.25rem, 1.75rem);
  --text-body-lg: clamp(1.0625rem, 1.5vw, 1.25rem);
  --text-body: clamp(1rem, 1.25vw, 1.125rem);
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;

  /* --- Spacing (base unit for all spacing utilities) --- */
  --spacing: 0.25rem;

  /* --- Border Radius --- */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* --- Shadows (dark-theme-appropriate) --- */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4);

  /* --- Transitions --- */
  --animate-fade-in: fade-in 0.3s ease-out;

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* --- Breakpoints --- */
  --breakpoint-sm: 40rem;    /* 640px */
  --breakpoint-md: 48rem;    /* 768px */
  --breakpoint-lg: 64rem;    /* 1024px */
  --breakpoint-xl: 80rem;    /* 1280px */
  --breakpoint-2xl: 90rem;   /* 1440px */
}

/* ============================================
   BASE STYLES
   ============================================ */

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--color-navy-900);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--color-white);
  }

  /* Prevent iOS zoom on input focus */
  input, select, textarea {
    font-size: 16px;
  }

  /* Dark-themed selection highlight */
  ::selection {
    background-color: var(--color-accent);
    color: var(--color-navy-900);
  }

  /* Dark-themed scrollbar (Chromium) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-navy-950);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-navy-600);
    border-radius: var(--radius-full);
  }
}

/* ============================================
   COMPONENT STYLES
   ============================================ */

@layer components {
  /* Consistent section wrapper */
  .section {
    padding-block: clamp(4rem, 8vw, 8rem);
    padding-inline: clamp(1rem, 5vw, 2rem);
  }

  /* Constrained content width */
  .container-narrow {
    max-width: 48rem;
    margin-inline: auto;
  }

  .container-wide {
    max-width: 80rem;
    margin-inline: auto;
  }
}
```

### Why NOT Use dark: Prefix

Since this site is dark-only (not a light/dark toggle), **do not use the `dark:` variant**. Instead, define the dark palette directly as the default colors. This avoids doubling every class with `dark:` prefixes and keeps the HTML clean.

If a light mode is ever needed later, refactor to use CSS custom properties at the `:root` and `.dark` selector level. But for v1, dark is the only theme.

### @theme vs :root -- When to Use Which

| Use `@theme` | Use `:root` |
|--------------|-------------|
| Design tokens that need utility classes (colors, fonts, spacing) | CSS variables that do NOT need utility classes |
| `--color-navy-900` (generates `bg-navy-900`) | `--header-height: 4rem` (no utility needed) |
| `--font-heading` (generates `font-heading`) | `--transition-base: 300ms ease` (use in custom CSS) |

Put non-utility variables in `:root` outside `@theme`:

```css
:root {
  --header-height: 4.5rem;
  --footer-height: 20rem;
  --max-content-width: 80rem;
  --transition-base: 300ms ease;
  --transition-fast: 150ms ease;
}
```

---

## 3. Typography for Authority/Bold Sites

**Confidence: MEDIUM-HIGH** -- Recommendations based on multiple font pairing guides, dark theme typography research, and @fontsource documentation. Final choice is subjective and should be validated visually.

### Recommended Primary Font: Inter Variable

**Why Inter:**
- Designed specifically for screen readability, especially at small sizes
- Variable font (one file, weights 100-900) -- excellent performance
- Slightly taller x-height improves readability on dark backgrounds
- @fontsource package has 27M+ downloads, extremely well-supported
- Neutral enough to not fight the dark bold aesthetic
- Acquisition.com-tier authority sites use clean sans-serifs, not decorative fonts

**Why variable font:**
- Single file (~100KB) replaces multiple weight files (potentially 500KB+)
- Allows any weight value (not just 400, 500, 700), enabling fine-tuned dark-background readability
- Font weight 450 for body text on dark backgrounds is a practical option that static fonts cannot provide

**Installation:**
```bash
pnpm add @fontsource-variable/inter
```

**Import in Base.astro:**
```astro
---
import "@fontsource-variable/inter";
import "../styles/global.css";
---
```

**Register in @theme:**
```css
@theme {
  --font-heading: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

### Alternative: Two-Font Pairing Options

If a single font feels too monotonous, consider these pairings for the heading/body split. Each has a different personality:

| Pairing | Heading Font | Body Font | Character | Best For |
|---------|-------------|-----------|-----------|----------|
| **Recommended** | Inter Variable (700-900) | Inter Variable (400-500) | Clean authority, like a premium SaaS | Minimal risk, maximum readability |
| **Bold alternative** | Bebas Neue | Inter Variable | High-impact headlines, all-caps energy | If the design leans aggressive/marketing |
| **Serif contrast** | DM Serif Display | Inter Variable | Sophisticated authority, editorial feel | If the design leans premium/editorial |
| **Geometric bold** | Montserrat (700-900) | Inter Variable (400-500) | Modern energy, geometric precision | If the design leans startup/tech |

**Recommendation:** Start with Inter-only. It is the safest choice for dark backgrounds and the most performant (one font file). If headings feel flat during visual review, add Bebas Neue or DM Serif Display for headings only -- this is a 15-minute change.

### Typography Scale for Dark Backgrounds

Dark backgrounds require adjustments from standard typography:

| Property | Light Background | Dark Background (Elevateo) | Why |
|----------|-----------------|---------------------------|-----|
| Body font weight | 400 | 400-450 (use 400 minimum) | Thin text bleeds into dark backgrounds |
| Body line-height | 1.5-1.6 | 1.65-1.75 | Dark backgrounds need more breathing room |
| Letter-spacing for body | 0 | 0 to 0.01em | Slight opening improves dark readability |
| Letter-spacing for headings | -0.02em to -0.04em | -0.02em | Tight tracking looks bold on dark |
| Heading weight | 600-700 | 700-800 | Must be assertively bold on dark |
| Body text color | #333 or #1a1a1a | #E2E8F0 or #F1F5F9 (off-white) | Never pure white on dark backgrounds |
| Heading text color | #000 or #111 | #FFFFFF (pure white OK for headings) | Headings can handle higher contrast |

### @fontsource Performance Note

@fontsource self-hosts font files, which means:
- No external request to Google Fonts (faster, more private)
- Font files are bundled with the build (served from your CDN)
- `font-display: swap` is included by default (text shows immediately in fallback, swaps when font loads)
- For Inter Variable, expect ~100-150KB for the woff2 file (one-time load, cached)

---

## 4. Responsive Navigation Patterns

**Confidence: HIGH** -- Verified via Astro official docs, Astro tutorial, and community patterns.

### Architecture Decision: Pure Astro Component with Script Tag

For a 3-page site with no framework (no React/Vue/Svelte), the navigation should be:
- An Astro component (`.astro` file) with HTML + Tailwind classes
- A `<script>` tag inside the component for the mobile menu toggle
- No client directives needed (`client:load`, `client:visible`, etc.)
- No external navigation libraries

Astro's `<script>` tags are **processed by default**: bundled, deduplicated, and injected with `type="module"`. This means you get modern JS with zero configuration.

### Complete Header Component Pattern

```astro
---
// src/components/Header.astro

interface Props {
  currentPath?: string;
}

const { currentPath = "/" } = Astro.props;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Courses", href: "/courses/" },
];
---

<header class="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-navy-700/50">
  <div class="container-wide mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-18">
      <!-- Logo -->
      <a href="/" class="text-white font-heading font-bold text-xl tracking-tight">
        Elevateo
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            href={link.href}
            class:list={[
              "text-sm font-medium tracking-wide uppercase transition-colors duration-200",
              currentPath === link.href
                ? "text-accent"
                : "text-text-secondary hover:text-white",
            ]}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#signup"
          class="bg-accent hover:bg-accent-hover text-navy-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Get Started
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        id="mobile-menu-toggle"
        class="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
      >
        <!-- Hamburger icon -->
        <svg class="hamburger-icon w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <!-- Close icon (hidden by default) -->
        <svg class="close-icon w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu Panel -->
  <div id="mobile-menu" class="md:hidden hidden">
    <nav class="px-4 pb-6 pt-2 border-t border-navy-700/50 bg-navy-900" aria-label="Mobile navigation">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class:list={[
            "block py-3 text-base font-medium border-b border-navy-700/30 transition-colors",
            currentPath === link.href
              ? "text-accent"
              : "text-text-secondary hover:text-white",
          ]}
        >
          {link.label}
        </a>
      ))}
      <a
        href="#signup"
        class="block mt-4 bg-accent hover:bg-accent-hover text-navy-900 font-bold text-center py-3 rounded-lg transition-colors"
      >
        Get Started
      </a>
    </nav>
  </div>
</header>

<!-- Spacer to prevent content from hiding behind fixed header -->
<div class="h-18" aria-hidden="true"></div>

<script>
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const hamburgerIcon = toggle?.querySelector(".hamburger-icon");
  const closeIcon = toggle?.querySelector(".close-icon");

  toggle?.addEventListener("click", () => {
    const isOpen = !menu?.classList.contains("hidden");

    menu?.classList.toggle("hidden");
    hamburgerIcon?.classList.toggle("hidden");
    closeIcon?.classList.toggle("hidden");

    toggle.setAttribute("aria-expanded", String(!isOpen));

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "" : "hidden";
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu?.classList.contains("hidden")) {
      toggle?.click();
    }
  });

  // Close menu when clicking a link (for same-page anchors)
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!menu.classList.contains("hidden")) {
        toggle?.click();
      }
    });
  });
</script>
```

### How Astro Script Tags Work (Important)

1. **Processed by default:** Astro bundles `<script>` tags, resolves imports, transpiles TypeScript, and outputs `type="module"`.
2. **Deduplicated:** If `Header.astro` appears on multiple pages, the script is bundled once and shared, not duplicated per page.
3. **No client directive needed:** For simple DOM manipulation (like toggle classes), a plain `<script>` tag is all you need. `client:load` is for framework components (React/Vue/Svelte islands), not vanilla JS.
4. **Runs on page load:** The script executes after the HTML is parsed. No need for `DOMContentLoaded` with `type="module"` scripts.

### Accessibility Requirements for Mobile Menu

| Feature | Implementation | Why |
|---------|---------------|-----|
| `aria-label` on button | `"Toggle navigation menu"` | Screen readers announce purpose |
| `aria-expanded` | Toggled `true`/`false` on click | Screen readers announce state |
| `aria-label` on `<nav>` | `"Main navigation"` / `"Mobile navigation"` | Identifies nav landmark |
| Escape key closes menu | Event listener on `keydown` | Keyboard accessibility |
| Focus trapping (optional for v1) | Trap focus inside open menu | Important for full a11y, can add in polish phase |

### Responsive Breakpoint Strategy

| Viewport | Navigation Style | Breakpoint |
|----------|-----------------|------------|
| < 768px (mobile) | Hamburger menu, full-width dropdown | Default (mobile-first) |
| >= 768px (tablet+) | Inline horizontal links | `md:` prefix in Tailwind |
| >= 1024px (desktop) | Same as tablet, more spacing | `lg:` prefix |

This uses Tailwind's `md:hidden` and `md:flex` to toggle between mobile and desktop nav. No JavaScript needed for the breakpoint switch -- pure CSS.

---

## 5. Astro Component Patterns

**Confidence: HIGH** -- Verified via official Astro docs (layouts, components, project structure).

### Base Layout Pattern

The Base layout is the HTML shell that wraps every page. It is the single source of truth for `<head>` tags, global CSS, analytics scripts, and shared structural elements.

```astro
---
// src/layouts/Base.astro
import "@fontsource-variable/inter";
import "../styles/global.css";

import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = "Learn how to scale your business past $1M with Elevateo Co.",
  ogImage = "/og-image.jpg",
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO -->
    <title>{title} | Elevateo Co</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Preconnect (if using external services later) -->
    <!-- <link rel="preconnect" href="https://..." /> -->
  </head>
  <body class="min-h-screen flex flex-col">
    <Header currentPath={Astro.url.pathname} />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </body>
</html>
```

### How Pages Use the Layout

```astro
---
// src/pages/index.astro
import Base from "../layouts/Base.astro";
---

<Base title="Home" description="Elevateo Co helps established business owners scale past $1M.">
  <section class="section">
    <div class="container-wide mx-auto">
      <h1 class="text-hero font-bold text-white">
        Scale Your Business
      </h1>
    </div>
  </section>
</Base>
```

### Component Props Pattern

Every reusable component should define its props interface for type safety:

```astro
---
// src/components/Button.astro
interface Props {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  class?: string;
}

const {
  variant = "primary",
  size = "md",
  href,
  class: className,
} = Astro.props;

const baseClasses = "inline-flex items-center justify-center font-bold rounded-lg transition-colors duration-200";

const variants = {
  primary: "bg-accent hover:bg-accent-hover text-navy-900",
  secondary: "bg-navy-700 hover:bg-navy-600 text-white border border-navy-600",
  ghost: "bg-transparent hover:bg-navy-800 text-text-secondary hover:text-white",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-body px-8 py-4",
};

const classes = [baseClasses, variants[variant], sizes[size], className].filter(Boolean).join(" ");

const Tag = href ? "a" : "button";
---

<Tag href={href} class={classes}>
  <slot />
</Tag>
```

### Card Component Pattern

```astro
---
// src/components/Card.astro
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<div class:list={[
  "bg-navy-800 border border-navy-700/50 rounded-xl p-6 sm:p-8 transition-colors hover:border-navy-600",
  className
]}>
  <slot />
</div>
```

### Section Wrapper Pattern

```astro
---
// src/components/SectionWrapper.astro
interface Props {
  id?: string;
  width?: "narrow" | "wide";
  class?: string;
}

const {
  id,
  width = "wide",
  class: className,
} = Astro.props;

const widths = {
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};
---

<section id={id} class:list={["section", className]}>
  <div class:list={[widths[width], "mx-auto px-4 sm:px-6 lg:px-8"]}>
    <slot />
  </div>
</section>
```

### Form Input Pattern

```astro
---
// src/components/FormInput.astro
interface Props {
  type?: string;
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

### Key Astro Patterns Summary

| Pattern | Use Case | Notes |
|---------|----------|-------|
| `<slot />` | Content injection in layouts/components | Like React's `children` |
| `Astro.props` | Receiving data from parent | Typed via `interface Props` |
| `class:list` | Conditional CSS classes | Astro's built-in utility, like `clsx` |
| `<script>` | Client-side JS in components | Processed, bundled, deduplicated |
| `<style>` | Scoped CSS (if not using Tailwind for something) | Scoped by default in Astro |
| Named slots | Multiple injection points | `<slot name="header" />` |

---

## 6. Verified Color Palette with Contrast Ratios

**Confidence: HIGH** for the token values. **MEDIUM** for exact contrast ratios -- these should be verified with WebAIM Contrast Checker during implementation.

### Recommended Palette

Based on the PITFALLS.md research (dark design that kills readability) and WCAG 4.5:1 minimum requirement:

| Token | Hex | Usage | Approx Contrast vs navy-900 |
|-------|-----|-------|---------------------------|
| `--color-navy-950` | `#070B14` | Deepest BG (footer, hero overlays) | N/A (background) |
| `--color-navy-900` | `#0B1120` | Primary page background | N/A (background) |
| `--color-navy-800` | `#0F172A` | Card backgrounds, sections | N/A (background) |
| `--color-navy-700` | `#1E293B` | Borders, elevated surfaces | N/A (background) |
| `--color-text-primary` | `#F1F5F9` | Primary body text | ~14:1 vs navy-900 (PASSES AAA) |
| `--color-text-secondary` | `#94A3B8` | Muted text | ~6.5:1 vs navy-900 (PASSES AA) |
| `--color-text-tertiary` | `#64748B` | Placeholders, hints | ~3.5:1 vs navy-900 (FAILS normal text, OK for large text) |
| `--color-white` | `#FFFFFF` | Headings, emphasis | ~18:1 vs navy-900 (PASSES AAA) |
| `--color-accent` (gold) | `#D4A843` | CTAs, links, highlights | ~7:1 vs navy-900 (PASSES AA) |

### Critical Rules

1. **Never use `#000000` as a background.** The darkest background is `#070B14` (dark navy with a cool blue tone). Pure black causes the "halation" effect where white text appears to bleed.
2. **Body text is `#F1F5F9` (off-white), not `#FFFFFF`.** Pure white on near-black is harsh. Off-white is more comfortable for reading while still passing AAA.
3. **Headings CAN use `#FFFFFF`.** Large text at bold weights handles higher contrast without fatigue.
4. **Tertiary text (`#64748B`) should only be used for non-essential elements** like placeholder text, captions, or decorative labels. It does not meet 4.5:1 for normal text on dark backgrounds.
5. **Accent color on dark background must pass 4.5:1.** Gold (#D4A843) at ~7:1 passes. Saturated colors (pure red, pure blue) often fail -- desaturate them.

### Validation Step Required Before Building

Before writing any component HTML, run these combinations through [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

- `#F1F5F9` on `#0B1120` (primary text on primary BG)
- `#F1F5F9` on `#0F172A` (primary text on card BG)
- `#94A3B8` on `#0B1120` (secondary text on primary BG)
- `#94A3B8` on `#0F172A` (secondary text on card BG)
- `#D4A843` on `#0B1120` (accent on primary BG)
- `#D4A843` on `#0F172A` (accent on card BG)
- `#FFFFFF` on `#0B1120` (heading on primary BG)

If any combination fails 4.5:1, adjust the lighter color upward (more white) until it passes. Do not adjust the dark colors -- the dark palette is the brand identity.

---

## 7. Recommended Implementation Sequence

Based on dependency analysis (what blocks what):

### Plan 01-01: Astro + Tailwind + Design Tokens

**Sequence:**
1. Scaffold Astro project with pnpm (`pnpm create astro@latest`)
2. Install Tailwind v4 (`pnpm add tailwindcss @tailwindcss/vite`)
3. Configure `astro.config.mjs` with Vite plugin
4. Install Inter Variable font (`pnpm add @fontsource-variable/inter`)
5. Create `src/styles/global.css` with full `@theme` token system
6. Create `src/layouts/Base.astro` with head tags, font import, CSS import
7. Create a test page to verify tokens render (background colors, text colors, font)
8. Verify contrast ratios with WebAIM checker
9. Commit working foundation

**Blocker:** Accent color must be decided before step 5. The three options (gold, blue, amber) are provided in the @theme section above. This can be changed later with a single line, but a decision is needed to start.

### Plan 01-02: Shared Components + Navigation

**Sequence (after 01-01):**
1. Build `Header.astro` with desktop nav and mobile hamburger toggle
2. Build `Footer.astro` with nav links, copyright, social placeholders
3. Build `Button.astro` with primary/secondary/ghost variants
4. Build `Card.astro` as a dark-themed container
5. Build `FormInput.astro` for email inputs (visual only, no submission logic)
6. Build `SectionWrapper.astro` for consistent section spacing
7. Test mobile nav toggle on actual mobile viewport (Chrome DevTools and real device)
8. Verify all components render correctly on the test page
9. Test keyboard accessibility (Tab through nav, Escape to close mobile menu)

### Plan 01-03: Page Shells + Responsive Verification

**Sequence (after 01-02):**
1. Create `src/pages/index.astro` (Home) -- use Base layout, add placeholder sections
2. Create `src/pages/about.astro` (About) -- use Base layout, add placeholder sections
3. Create `src/pages/courses.astro` (Courses) -- use Base layout, add placeholder sections
4. Verify navigation links work between all three pages
5. Test at all breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide)
6. Verify no broken layouts, overflow issues, or text truncation at any width
7. Verify mobile menu opens/closes correctly on all page shells
8. Lighthouse audit for basic performance baseline (should be 95+ at this stage with no content)

---

## 8. Gotchas and Warnings

### Gotcha 1: @astrojs/tailwind vs @tailwindcss/vite

**The problem:** If you search "Astro Tailwind setup" many results show the OLD approach using `@astrojs/tailwind`. This integration is **deprecated** for Tailwind v4.

**The fix:** Use `@tailwindcss/vite` as a Vite plugin. Do NOT install `@astrojs/tailwind`.

**How to tell if you are using the wrong one:**
- You have `@astrojs/tailwind` in your `package.json` -- WRONG
- You have `integrations: [tailwind()]` in `astro.config.mjs` -- WRONG
- You have a `tailwind.config.js` file -- WRONG (Tailwind v4 uses CSS-first config)

**Correct indicators:**
- `@tailwindcss/vite` in `package.json`
- `vite: { plugins: [tailwindcss()] }` in `astro.config.mjs`
- No `tailwind.config.js` file
- `@import "tailwindcss"` in your CSS file

### Gotcha 2: Tailwind v4 Utility Class Name Changes

Some utility class names changed between Tailwind v3 and v4. If you are copying code from older tutorials:

| v3 Syntax | v4 Syntax | Notes |
|-----------|-----------|-------|
| `bg-opacity-50` | `bg-black/50` | Opacity modifiers use `/` syntax |
| `text-opacity-75` | `text-white/75` | Same for text opacity |
| `ring-offset-2` | `ring-offset-2` | Unchanged |
| Custom colors in config JS | Custom colors in `@theme` CSS | Different location |

### Gotcha 3: Font Import Location Matters

Import `@fontsource-variable/inter` in the **layout component**, not in `global.css`. The CSS import happens in the Astro component frontmatter:

```astro
---
// CORRECT: Import in Base.astro frontmatter
import "@fontsource-variable/inter";
import "../styles/global.css";
---
```

Do NOT try to `@import` @fontsource in global.css via CSS -- it may not resolve correctly through the Vite pipeline.

### Gotcha 4: Fixed Header Content Overlap

If the header is `position: fixed`, page content will hide behind it. Add a spacer div after the header:

```html
<header class="fixed top-0 ...">...</header>
<div class="h-18" aria-hidden="true"></div> <!-- Spacer matching header height -->
```

Or use `scroll-padding-top` on the HTML element to account for the header when anchor-scrolling:

```css
html {
  scroll-padding-top: var(--header-height);
}
```

### Gotcha 5: Tailwind v4 @theme Resets

If you use `--color-*: initial` in `@theme`, it removes ALL default Tailwind colors. Only do this if you want a fully custom palette. For Elevateo, since we are defining a bespoke dark palette, consider resetting:

```css
@theme {
  /* Reset default colors so only our custom palette generates utilities */
  --color-*: initial;

  /* Then define our palette */
  --color-navy-950: #070B14;
  --color-navy-900: #0B1120;
  /* ... */
}
```

This prevents default Tailwind colors (red-500, blue-300, etc.) from generating unused utility classes, keeping the CSS output smaller. However, it also means you cannot use `bg-gray-100` or `text-blue-500` -- only your defined tokens. This is a design choice that enforces consistency.

**Recommendation:** DO reset `--color-*: initial` for Elevateo. The site uses a constrained, bespoke palette. Removing defaults prevents accidental use of off-brand colors and reduces CSS output size.

### Gotcha 6: Astro Script Deduplication

Astro deduplicates `<script>` tags by content. If `Header.astro` has a script, and the header appears on every page, the script is bundled once, not once per page. This is correct behavior.

However, this means the script runs once per page load. If navigating between pages causes a full page reload (standard for Astro without View Transitions), the script re-initializes on each page -- which is exactly what you want for the mobile menu toggle.

### Gotcha 7: Mobile Menu Body Scroll Lock

When the mobile menu opens, the page behind it should not scroll. Add `overflow: hidden` to `<body>` when the menu is open, remove it when closed. This is handled in the script example in section 4.

### Gotcha 8: clamp() Font Sizes and Browser Minimum

`clamp()` for font sizes is well-supported, but some browsers enforce a minimum font size (typically 12px). Ensure no `clamp()` value resolves below 12px at the smallest viewport. All values in the recommended scale above stay above 12px at 320px viewport width.

---

## Decision Points Before Building

These decisions must be made before Plan 01-01 can start. They are not "nice to have" -- they block implementation:

| Decision | Options | Recommendation | Impact if Deferred |
|----------|---------|---------------|-------------------|
| Accent color | Gold (#D4A843), Blue (#3B82F6), Amber (#F59E0B) | Gold -- conveys premium authority | Cannot build CTAs, links, or interactive elements |
| Single font vs pairing | Inter only vs Inter + heading font | Inter only for v1 | Low impact -- easy to add second font later |
| Header position | Fixed (stays on scroll) vs Static (scrolls away) | Fixed -- keeps nav accessible | Affects layout of every page |
| Reset default Tailwind colors | Keep defaults + add custom vs Reset + custom only | Reset -- enforces design consistency | Generates unused CSS if not reset |
| Max content width | 1200px (compact) vs 1280px (standard) vs 1440px (wide) | 1280px (`max-w-7xl`) | Affects all page layouts |

---

## Sources

### Official Documentation (HIGH confidence)
- [Tailwind CSS: Install with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro) -- Official v4 setup guide
- [Tailwind CSS: Theme Variables](https://tailwindcss.com/docs/theme) -- @theme directive documentation
- [Tailwind CSS: Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) -- @layer and custom CSS in v4
- [Tailwind CSS: Dark Mode](https://tailwindcss.com/docs/dark-mode) -- Dark mode strategies
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- What changed in v4
- [Astro: Project Structure](https://docs.astro.build/en/basics/project-structure/) -- Directory conventions
- [Astro: Layouts](https://docs.astro.build/en/basics/layouts/) -- Layout component patterns
- [Astro: Components](https://docs.astro.build/en/basics/astro-components/) -- Component anatomy, props, slots
- [Astro: Scripts and Event Handling](https://docs.astro.build/en/guides/client-side-scripts/) -- Client-side JS in Astro
- [Astro: Using Custom Fonts](https://docs.astro.build/en/guides/fonts/) -- @fontsource integration
- [Astro 5.2 Release](https://astro.build/blog/astro-520/) -- Tailwind v4 native support

### Font Resources (MEDIUM-HIGH confidence)
- [Fontsource: Inter](https://fontsource.org/fonts/inter) -- Inter font documentation
- [Fontsource: Inter Install](https://fontsource.org/fonts/inter/install) -- Install instructions
- [LandingPageFlow: Google Font Pairings 2026](https://www.landingpageflow.com/post/google-font-pairings-for-websites) -- Font pairing recommendations
- [Buzzcube: Best Google Fonts 2026](https://www.buzzcube.io/best-google-fonts-for-websites-2026/) -- Font recommendations
- [Typewolf: 40 Best Google Fonts 2026](https://www.typewolf.com/google-fonts) -- Curated font list

### Navigation Patterns (HIGH confidence)
- [Web3Templates: Responsive Navigation in Astro](https://web3templates.com/blog/create-responsive-navigation-menu-in-astro-javascript) -- Hamburger menu implementation
- [Astro Tutorial: Navigation Component](https://docs.astro.build/en/tutorial/3-components/1/) -- Official nav tutorial
- [Astro Tutorial: Client-Side Scripts](https://docs.astro.build/en/tutorial/3-components/4/) -- Adding interactivity

### Accessibility (HIGH confidence)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/) -- WCAG contrast testing tool
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/) -- WCAG contrast requirements
- [W3C WCAG 2.1: Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) -- Official specification

### Dark Theme Design (MEDIUM confidence)
- [618 Media: Dark Mode CSS Guide 2026](https://618media.com/en/blog/dark-mode-with-css-a-comprehensive-guide/) -- Dark mode implementation patterns
- [Tailwind Color: OKLCH Palette](https://tailwindcolor.com/) -- Tailwind v4 OKLCH color reference
