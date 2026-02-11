# Technology Stack

**Project:** Elevateo Co - Business Education Authority Website
**Researched:** 2026-02-11
**Overall Confidence:** HIGH

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro** | 5.17.x (stable) | Static site framework | Zero JS by default, outputs pure HTML/CSS. For a 3-page marketing site with email capture, this is the right tool. Astro ships 95% less JavaScript than Next.js for static sites, resulting in sub-second page loads. Islands architecture means you only pay for interactivity where you need it (e.g., a mobile nav toggle, an email form). Trusted by Google and Trivago. 6.0 is in beta -- stick with 5.x stable. | HIGH |

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Tailwind CSS** | 4.1.x | Utility-first CSS | Up to 5x faster builds in v4, zero-config setup with Astro 5.2+ via `@tailwindcss/vite` plugin. Built on modern CSS features (cascade layers, `@property`, `color-mix()`). Perfect for the dark-and-bold aesthetic -- rapid prototyping of custom designs without fighting a component library's opinionated styles. | HIGH |

### Animation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **GSAP** | 3.14.x | Scroll animations, entrance effects | The industry standard for high-end marketing site animations. ScrollTrigger plugin enables the scroll-driven reveals that acquisition.com and similar authority sites use. Now 100% free (including ScrollTrigger, SplitText, all premium plugins) after Webflow acquisition. Battle-tested, works with any framework including Astro. | HIGH |
| **CSS animations** | native | Simple transitions, hover states | Use native CSS transitions for simple hover effects and state changes. No library needed. Reserve GSAP for scroll-driven and complex choreographed sequences. | HIGH |

### Email Capture

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Kit** (formerly ConvertKit) | current | Email list management, automations | Built specifically for creators and educators. Higher deliverability (87%) than Mailchimp (85%). Native integrations with Teachable, Kajabi, and other course platforms -- critical when video courses are added later. Supports both JS embed forms and raw HTML embed for full styling control on static sites. API available for custom integrations. Automation sequences for welcome/nurture flows. Starts at $29/month for up to 1,000 subscribers. | HIGH |

### Image Optimization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro built-in** (`astro:assets`) | included | Image optimization, WebP/AVIF conversion | Astro's `<Image />` and `<Picture />` components handle automatic format conversion, responsive sizing, lazy loading, and optimal `fetchpriority` attributes. Uses Sharp under the hood. No additional library needed. Outputs modern WebP by default. | HIGH |

### Analytics

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Plausible Analytics** | current | Privacy-friendly web analytics | Script is 75x smaller than Google Analytics (under 1KB). No cookies means no consent banner cluttering the dark-and-bold design. GDPR/CCPA compliant out of the box. Shows the metrics that matter for a lead-gen site: traffic sources, page views, conversion goals (email signups). $9/month for 10K pageviews. | MEDIUM |
| **Google Analytics 4** (alternative) | current | Full analytics suite | Free. Deeper funnel analysis. Use if you need detailed attribution modeling or plan to run paid ads immediately. Tradeoff: requires cookie consent banner, heavier script, more complex setup. | HIGH |

### Deployment & Hosting

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Cloudflare Pages** | current | Static site hosting & CDN | Unlimited bandwidth on free tier. 300+ global edge locations. Free SSL, DDoS protection. 500 builds/month on free tier (plenty for a 3-page site). Zero cost to start, scales infinitely. Astro has first-class Cloudflare support (Astro 6 beta even uses Cloudflare's workerd runtime for dev). Cloudflare recently acquired Astro's parent company, making this the most aligned deployment target. | HIGH |

### Domain & DNS

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Cloudflare DNS** | current | DNS management | Free. Fastest authoritative DNS. Natural pairing with Cloudflare Pages -- zero-config custom domain setup. | HIGH |

### Version Control & Development

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Git + GitHub** | current | Source control, CI/CD trigger | Cloudflare Pages auto-deploys from GitHub pushes. Industry standard. Free for private repos. | HIGH |
| **Node.js** | 22.x LTS | JavaScript runtime | Required by Astro 5.x. Node 22 is the current LTS. Note: Astro 6 beta drops Node 18/20 support entirely, so starting on 22 future-proofs the project. | HIGH |
| **pnpm** | 9.x | Package manager | 2-3x faster installs than npm. Strict dependency resolution prevents phantom dependency issues. Disk-efficient via hard links. | MEDIUM |

---

## Supporting Libraries (Add Only If Needed)

These are NOT installed upfront. Add them only when a specific feature requires them.

| Library | Version | Purpose | When to Add |
|---------|---------|---------|-------------|
| `@fontsource/*` | latest | Self-hosted fonts | When finalizing typography. Eliminates render-blocking Google Fonts requests. |
| `astro-icon` | latest | SVG icon system | If custom SVG icons are needed beyond inline SVGs. |
| `astro-seo` | latest | SEO meta tags helper | If you want a component-based approach to meta tags (Astro's built-in `<head>` works fine for 3 pages). |

---

## What NOT to Use (and Why)

### Frameworks That Are Wrong for This Project

| Technology | Why Not |
|------------|---------|
| **Next.js** | Massively over-engineered for a 3-page static marketing site. Sends full React bundles to the client. RSC, App Router, middleware -- complexity you will never need. Acquisition.com itself uses Nuxt.js (Vue-based), not Next.js, but even that is more framework than this project needs. |
| **React / Vue / Svelte (as primary framework)** | This is a content site, not a web app. You do not need a client-side JavaScript framework rendering your pages. Astro renders to static HTML. If you need one interactive widget, Astro islands let you drop in a single React/Preact/Svelte component without adopting the whole framework. |
| **WordPress** | Slow, security-prone, requires hosting with PHP/MySQL. The dark-bold-custom aesthetic would fight every WordPress theme. Overkill CMS for 3 static pages. |
| **Webflow / Framer / Squarespace** | Lock-in, limited customization for the exact aesthetic needed, ongoing subscription costs, poor performance compared to static HTML. You lose code-level control over animations, interactions, and email form behavior. |
| **Gatsby** | Effectively abandoned. Last major release was years ago. Community has moved to Astro for static sites. |

### Libraries That Are Wrong for This Project

| Technology | Why Not |
|------------|---------|
| **Framer Motion / Motion** | React-only (v12 added Vue support, but still requires a framework runtime). For a static Astro site, GSAP is the right choice -- it works with vanilla DOM, no framework dependency. Motion adds 30KB+ of React runtime overhead. |
| **Bootstrap / Material UI / Chakra UI** | Component libraries impose visual opinions that fight the custom dark-and-bold aesthetic. You would spend more time overriding defaults than building from scratch. Tailwind gives you design primitives without opinions. |
| **jQuery** | It is 2026. |
| **Mailchimp** | Lower deliverability (85% vs Kit's 87%). Designed for e-commerce, not creators/educators. Kit's automation and future course-platform integrations are a better strategic fit. |
| **Vercel** | Optimized for Next.js. For a pure static Astro site, Cloudflare Pages offers better free tier (unlimited bandwidth vs Vercel's 100GB), faster global edge, and tighter Astro integration given the Cloudflare-Astro merger. |

---

## Architecture Decision: Why NOT a Page Builder or CMS

This project is 3 pages. The content changes infrequently. Adding a headless CMS (Sanity, Contentful, Strapi) introduces:
- Another service to manage and pay for
- Build triggers and webhook complexity
- API latency during builds
- A solution searching for a problem

**When to reconsider:** If the site grows beyond 10+ pages with frequently changing content (blog posts, case studies), then a headless CMS becomes justified. At that point, Astro's Content Layer API makes CMS integration clean. But that is a future problem, not a launch problem.

---

## Installation

```bash
# Initialize project
npm create astro@latest elevateo-co -- --template minimal

# Core dependencies (installed by Astro scaffolding)
# astro is the only core dependency

# Add Tailwind CSS v4 (uses Vite plugin, not legacy integration)
npx astro add tailwind

# Add GSAP for scroll animations
pnpm add gsap

# Add Plausible (or configure via script tag -- no npm package needed)
# Plausible is a <script> tag in your layout, not an npm dependency
```

### Project Structure

```
elevateo-co/
  src/
    layouts/
      Base.astro          # HTML shell, head tags, analytics, global styles
    pages/
      index.astro         # Home: hero + credibility + CTA
      about.astro         # About: Alan's story
      courses.astro       # Courses: placeholder grid
    components/
      Header.astro        # Minimal nav (logo + 3 links)
      Footer.astro        # Links, copyright, social
      Hero.astro          # Bold hero section
      EmailCapture.astro  # Kit form embed (JS or raw HTML)
      TestimonialCard.astro
      CourseCard.astro     # Placeholder course grid item
    styles/
      global.css          # @import "tailwindcss" + custom properties
    assets/
      images/             # Source images (Astro optimizes at build)
  public/
    favicon.svg
    og-image.jpg          # Social sharing image
  astro.config.mjs
  tailwind.config.ts      # Only if custom config needed (v4 is CSS-first)
  package.json
```

---

## Alternatives Considered

| Category | Recommended | Alternatives | Why Not the Alternative |
|----------|-------------|-------------|------------------------|
| Framework | **Astro 5.x** | Next.js 15, Nuxt 3, SvelteKit, Hugo | Next/Nuxt/SvelteKit are app frameworks -- overkill. Hugo is fast but Go templates are harder to work with than Astro's JSX-like syntax and lack island interactivity. |
| Styling | **Tailwind CSS 4.x** | Plain CSS, Sass, UnoCSS | Plain CSS is fine but slower to iterate. Sass adds build complexity for minimal gain. UnoCSS is viable but smaller ecosystem and community. |
| Animation | **GSAP 3.14** | Motion (Framer Motion), Anime.js, CSS-only | Motion needs React runtime. Anime.js is less maintained. CSS-only cannot do scroll-driven choreography at the level authority sites use. |
| Email | **Kit** | Mailchimp, Brevo, Buttondown | Mailchimp is e-commerce focused. Brevo is good but less creator-ecosystem integration. Buttondown is newsletter-only, no automation. |
| Hosting | **Cloudflare Pages** | Vercel, Netlify, GitHub Pages | Vercel charges for bandwidth over 100GB. Netlify free tier is 100GB. GitHub Pages lacks edge functions if needed later. Cloudflare is unlimited and free. |
| Analytics | **Plausible** | GA4, Fathom, Matomo | GA4 is free but heavy + needs cookie consent. Fathom is similar to Plausible but more expensive. Matomo requires self-hosting for free tier. |

---

## Cost at Launch

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| Cloudflare Pages | $0 | Free tier: unlimited bandwidth, 500 builds/mo |
| Cloudflare DNS | $0 | Free |
| Kit (ConvertKit) | $0-$29 | Free up to 10,000 subscribers (limited automations), $29/mo for full features under 1,000 subs |
| Plausible Analytics | $9 | For up to 10K monthly pageviews |
| Domain name | ~$10-15/year | One-time annual cost |
| **Total** | **$9-$29/mo** | Rises only with subscriber count and traffic |

---

## Version Verification Log

| Technology | Claimed Version | Verification Method | Verification Date |
|------------|----------------|--------------------|--------------------|
| Astro | 5.17.x stable | npm registry search + Astro blog | 2026-02-11 |
| Astro 6 | beta only | GitHub releases + Astro blog | 2026-02-11 |
| Tailwind CSS | 4.1.18 | GitHub releases page | 2026-02-11 |
| GSAP | 3.14.2 | npm registry search | 2026-02-11 |
| Node.js | 22.x LTS | Astro 5 requirements docs | 2026-02-11 |
| Kit (ConvertKit) | SaaS (current) | Kit help center, comparison articles | 2026-02-11 |
| Cloudflare Pages | SaaS (current) | Cloudflare docs, free tier page | 2026-02-11 |
| Sharp | 0.34.5 | npm registry (bundled with Astro) | 2026-02-11 |

---

## Sources

### Framework Selection
- [Astro vs Next.js vs Remix: Static Site Generators Comparison 2026](https://octahedroid.com/blog/astro-vs-nextjs-vs-remix-react-router-static-site-generators-comparison-2026)
- [Best Next.js Alternatives 2026](https://naturaily.com/blog/best-nextjs-alternatives)
- [Top 10 Full Stack Frameworks in 2026](https://www.nucamp.co/blog/top-10-full-stack-frameworks-in-2026-next.js-remix-nuxt-sveltekit-and-more)

### Astro
- [Astro 6 Beta Announcement](https://astro.build/blog/astro-6-beta/)
- [Astro 5.0 Release](https://astro.build/blog/astro-5/)
- [Astro Images Documentation](https://docs.astro.build/en/guides/images/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [What's New in Astro - January 2026](https://astro.build/blog/whats-new-january-2026/)

### Tailwind CSS
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Install Tailwind CSS with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Astro + Tailwind v4 Setup Guide](https://tailkits.com/blog/astro-tailwind-setup/)

### GSAP
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP Installation](https://gsap.com/docs/v3/Installation/)
- [GSAP npm Package](https://www.npmjs.com/package/gsap)

### Email Marketing
- [Kit vs Mailchimp Comparison 2026](https://moosend.com/blog/convertkit-vs-mailchimp/)
- [Kit Form Embedding Basics](https://help.kit.com/en/articles/4009572-form-embedding-basics)
- [Best Email Marketing Software 2026](https://thecmo.com/tools/best-email-marketing-software/)

### Hosting & Deployment
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages Free Tier](https://pages.cloudflare.com/)
- [Best Static Website Hosting Providers 2026](https://crystallize.com/blog/static-hosting)
- [Vercel vs Netlify vs Cloudflare Pages Comparison](https://bejamas.com/compare/cloudflare-pages-vs-netlify-vs-vercel)

### Analytics
- [Plausible Analytics](https://plausible.io/)
- [Best Google Analytics Alternatives 2026](https://backlinko.com/google-analytics-alternatives)

### Acquisition.com Tech Stack Reference
- [Acquisition.com uses Nuxt.js, Azure, Nginx](https://builtwith.com/) (via BuiltWith/Crunchbase tech details)
