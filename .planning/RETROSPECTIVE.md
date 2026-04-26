# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.1 — Add Lachlan MacDonald

**Shipped:** 2026-04-26
**Phases:** 2 (6-7) | **Plans:** 4 | **Timeline:** 3 days (2026-04-23 → 2026-04-26)

### What Was Built

- Lachlan image pipeline — EXIF auto-rotate fix in shared `toWebp()`, two optimized WebPs (portrait 160.2 KB, war-room 146.3 KB), raw JPGs removed from deploy bundle
- `MentorIntro.astro` — fully reusable props-driven component (split-grid bio with flip, specialty cards, audience list, Motion One data-attribute integration)
- Anchor navigation — Lenis `anchors: { offset: -72 }` + bare hash hrefs in header (no Astro router reloads) + section `id=` attributes
- Lachlan section live in `index.astro` with locked-copy const blocks in frontmatter, hair-line divider, and Calendly CTA placeholder

### What Worked

- **Phased decomposition paid off:** Splitting image pipeline + component shell (Phase 6) from full integration (Phase 7) meant Phase 7 had a clean, fully-tested surface to work with — no ambiguity about what the component could accept
- **Locked-copy const pattern:** Defining content as typed consts in Astro frontmatter kept template diffs clean and copy changes easy to review
- **data-motion attribute contract:** Reusing the existing animation observer contract meant zero new JS and animations "just worked" on the new section
- **Human checkpoint at Phase 7 end:** The reviewer pass caught real UX issues (em dashes, cheesy credentials, Allan/Lachlan transition clarity) before shipping

### What Was Inefficient

- **Worktree cherry-pick recovery (Phase 6):** Agent used a git worktree, but work was committed to the worktree branch rather than master. Required manual cherry-pick and filesystem cleanup — ~15 min overhead
- **Requirements doc not updated after Phase 7:** MENTOR-01..07 and NAV-04 remained "Pending" in REQUIREMENTS.md even after Phase 7 completed. Required manual fix during milestone archive

### Patterns Established

- **Per-person image directory:** `public/images/{person}/` pattern established; source assets in gitignored `_zip_temp/{Person}/`
- **EXIF-safe toWebp():** Always call `.rotate()` before `.resize()` in sharp pipeline — now baked into shared helper
- **Locked-copy pattern:** Content data blocks as typed consts in Astro frontmatter, passed as props — keeps template body clean and content diffs readable
- **Bare hash hrefs for same-page anchors:** `#allan` not `/#allan` — prevents Astro router from triggering full-page reload on hash click

### Key Lessons

1. **Worktree agents need explicit branch context** — when spawning agents with `isolation: "worktree"`, verify the work is merged back to master before the session ends, not just committed in the worktree
2. **Mark requirements complete as part of phase execution** — requirements doc updates should be an explicit task in the plan, not deferred to milestone time
3. **Reusable component first pays dividends immediately** — the MentorIntro component, though it took a full plan to build, made Phase 7 integration trivially fast

### Cost Observations

- Sessions: ~3 (Phase 6 plan 01, Phase 6 plan 02 + Phase 7 combined, Phase 7 plan 02 review)
- Notable: Phase 6 plan 01 was the heaviest (~25 min) due to worktree recovery; Phase 6 plan 02 was 8 min; Phase 7 combined was ~30 min including human checkpoint
- Model: Claude Sonnet 4.6 throughout

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 5 | 11 | Initial build — greenfield from scaffold to full site |
| v1.1 | 2 | 4 | Feature expansion — second mentor, reusable component architecture |

### Top Lessons (Verified Across Milestones)

1. **Phase decomposition beats big-bang:** Both milestones benefited from small, focused phases with clear handoff contracts between them
2. **Human checkpoints catch copy/tone issues AI misses:** v1.1 plan 07-02 checkpoint caught em dashes and framing issues before ship
