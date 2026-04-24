---
phase: 6
slug: lachlan-image-pipeline-mentorintro-component
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-23
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — `astro check` + `astro build` (no test framework installed) |
| **Config file** | `astro.config.mjs` |
| **Quick run command** | `npx astro check` |
| **Full suite command** | `npx astro build` |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx astro check`
- **After every plan wave:** Run `npx astro build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 1 | MENTOR-08 | build | `npx astro check` | ✅ | ⬜ pending |
| 6-01-02 | 01 | 1 | MENTOR-08 | build | `node scripts/optimize-images.mjs` | ✅ | ⬜ pending |
| 6-02-01 | 02 | 2 | MENTOR-08 | type-check | `npx astro check` | ✅ | ⬜ pending |
| 6-02-02 | 02 | 2 | MENTOR-08 | build | `npx astro build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework install needed — `astro check` and `astro build` serve as the validation gates.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lachlan WebP renders without distortion | MENTOR-08 | Visual check required | Open `dist/images/` WebP in browser; confirm dimensions, aspect ratio, colour fidelity match source JPG |
| MentorIntro component isolation (not imported into page) | MENTOR-08 | Build output inspection | Confirm `index.astro` does NOT import `MentorIntro.astro`; confirm `astro build` completes without rendering it |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
