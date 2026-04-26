# Milestones

## v1.1 Add Lachlan MacDonald (Shipped: 2026-04-26)

**Phases completed:** 2 phases (6-7), 4 plans, ~5 tasks
**Timeline:** 2026-04-23 → 2026-04-26 (3 days)
**Git range:** 07cb636 → cf5a7be

**Key accomplishments:**

- Lachlan JPGs relocated out of deploy bundle; EXIF auto-rotate patched into shared `toWebp()` helper; two optimized WebPs produced (portrait 160.2 KB, war-room 146.3 KB)
- Props-driven `MentorIntro.astro` component built (split-grid bio, specialty cards, audience list, Motion One integration) — fully reusable for any future mentor
- Smooth anchor navigation wired via Lenis (`anchors: { offset: -72 }`) — #allan, #lachlan, #faq links in header on both desktop and mobile
- Lachlan's full mentor section live in index.astro — bio split-grid (flip=true), 3 specialty cards, "Who he works with" block, Calendly CTA placeholder — all MENTOR-01..07 + NAV-04 resolved

**Known stubs:**
- Lachlan's Calendly URL is a placeholder (currently Allan's link) — swap when Lachlan provides his own booking link

---
