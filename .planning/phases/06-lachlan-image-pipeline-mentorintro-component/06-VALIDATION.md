---
phase: 6
slug: lachlan-image-pipeline-mentorintro-component
status: draft
nyquist_compliant: true
wave_0_complete: true
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
| **Estimated runtime** | `astro check`: ~5–15 seconds; `astro build`: ~20–45 seconds |

---

## Sampling Rate

- **After every code-producing task:** Run `npx astro check`
- **After each plan completes:** Run `npx astro build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 45 seconds for task-level checks; full-build gate at end of each plan

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 1 | MENTOR-08 | file-check + type-check | `powershell -NoProfile -Command "if (Test-Path 'public/Lachlan Pictures') { exit 1 }; if (!(Test-Path '_zip_temp/Lachlan/Portrait.JPG')) { exit 1 }; if (!(Test-Path '_zip_temp/Lachlan/Picture_with_War_Room_members.JPG')) { exit 1 }; if (-not (Select-String -Path 'scripts/optimize-images.mjs' -Pattern 'pipeline\\.rotate\\(\\)' -Quiet)) { exit 1 }"` | ✅ | ⬜ pending |
| 6-01-02 | 01 | 1 | MENTOR-08 | generation + size-check | `powershell -NoProfile -Command "node scripts/optimize-images.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; if (!(Test-Path 'public/images/lachlan/lachlan-portrait.webp')) { exit 1 }; if (!(Test-Path 'public/images/lachlan/lachlan-warroom.webp')) { exit 1 }; node -e \"const s=require('fs').statSync('public/images/lachlan/lachlan-portrait.webp').size; process.exit(s>=150*1024 && s<=300*1024 ? 0 : 1)\"; exit $LASTEXITCODE"` | ✅ | ⬜ pending |
| 6-01-03 | 01 | 1 | MENTOR-08 | full-build gate | `powershell -NoProfile -Command "npx astro build; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; if (Test-Path 'public/Lachlan Pictures') { exit 1 }; if (!(Test-Path 'dist/images/lachlan/lachlan-portrait.webp')) { exit 1 }; if (!(Test-Path 'dist/images/lachlan/lachlan-warroom.webp')) { exit 1 }; $jpgs = Get-ChildItem -Path 'dist' -Recurse -File -Include *.jpg,*.jpeg; if ($jpgs.Count -gt 0) { exit 1 }"` | ✅ | ⬜ pending |
| 6-02-01 | 02 | 1 | MENTOR-08 | file-check + type-check | `powershell -NoProfile -Command "if (!(Test-Path 'src/components/MentorIntro.astro')) { exit 1 }; npx astro check; exit $LASTEXITCODE"` | ✅ | ⬜ pending |
| 6-02-02 | 02 | 1 | MENTOR-08 | full-build gate | `powershell -NoProfile -Command "npx astro check; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; npx astro build; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; if ((@(Select-String -Path 'src/pages/**/*.astro' -Pattern 'MentorIntro' -SimpleMatch -ErrorAction SilentlyContinue)).Count -ne 0) { exit 1 }; if ((@(Select-String -Path 'src/layouts/**/*.astro' -Pattern 'MentorIntro' -SimpleMatch -ErrorAction SilentlyContinue)).Count -ne 0) { exit 1 }"` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework install needed — `astro check`, targeted PowerShell file assertions, and end-of-plan `astro build` gates are sufficient.*

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
- [ ] Feedback latency < 45s for task-level checks
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
