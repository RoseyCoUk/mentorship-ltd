---
phase: 7
slug: lachlan-section-integration-navigation-anchors
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-24
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro built-in (`astro check`, `astro build`) |
| **Config file** | `astro.config.mjs` |
| **Quick run command** | `npx astro check` |
| **Full suite command** | `npx astro build` |
| **Estimated runtime** | ~15–30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx astro check`
- **After every plan wave:** Run `npx astro build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 7-01-01 | 01 | 1 | NAV-04 | grep | `grep -n "anchors" src/layouts/Base.astro` | ✅ | ⬜ pending |
| 7-01-02 | 01 | 1 | NAV-04 | grep | `grep -n "Allan\|Lachlan\|FAQ" src/components/Header.astro` | ✅ | ⬜ pending |
| 7-01-03 | 01 | 1 | NAV-04 | grep | `grep -n 'id="allan"' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-01-04 | 01 | 1 | NAV-04 | grep | `grep -n 'id="faq"' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-01 | 02 | 2 | MENTOR-01,02 | grep | `grep -n 'MentorIntro' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-02 | 02 | 2 | MENTOR-02 | grep | `grep -n 'flip={true}' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-03 | 02 | 2 | MENTOR-03 | grep | `grep -n 'Bellum Advisors\|boltloop' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-04 | 02 | 2 | MENTOR-07 | grep | `grep -n 'calendly.com/allan-chan-roseyco' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-05 | 02 | 2 | MENTOR-05 | grep | `grep -n 'lachlanSpecialties\|specialties=' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-02-06 | 02 | 2 | MENTOR-06 | grep | `grep -n 'audienceItems\|Who Lachlan' src/pages/index.astro` | ✅ | ⬜ pending |
| 7-build | all | all | all | build | `npx astro build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No new test files needed — Phase 7 uses Astro's built-in type checker and build pipeline. No Wave 0 installs required.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Clicking `#lachlan` in header smoothly scrolls to Lachlan section without hiding under header | NAV-04 | Requires browser; Lenis offset sign must be verified visually | Run `pnpm dev`, open header nav, click "Lachlan" — confirm section top is visible below the fixed header (~72px from top of viewport) |
| Clicking `#allan` and `#faq` smooth-scroll correctly | NAV-04 | Same as above | Click each anchor; confirm smooth scroll and correct section visible |
| Mobile nav anchor links work | NAV-04 | Requires browser + mobile viewport | Open dev tools, set 375px viewport, open mobile nav, click each anchor |
| Lachlan photo appears on LEFT, text on RIGHT | MENTOR-02 | CSS layout; needs visual inspection | Load site, verify split-grid — photo left, bio text right |
| Fighting/discipline reference is tasteful — no gym-bro framing | MENTOR-04 | Subjective copy review | Read credential paragraph containing physical reference; confirm it uses words like "discipline/reps/consistent" not "beast/warrior/grind/alpha/savage" |
| boltloop is framed as Elevateo division, not Allan's company | MENTOR-03 | Content review | Read Lachlan bio; confirm "boltloop.co — a division of Elevateo Co focused on AI and automation" or equivalent phrasing |
| CTA routes to Allan's Calendly and is documented as placeholder | MENTOR-07 | Browser test + code review | Click Lachlan CTA; confirm it opens Calendly; check code comment noting this as a placeholder |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
