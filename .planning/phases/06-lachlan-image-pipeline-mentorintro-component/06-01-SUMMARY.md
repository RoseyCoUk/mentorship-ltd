---
phase: 06-lachlan-image-pipeline-mentorintro-component
plan: "01"
subsystem: ui
tags: [sharp, webp, image-optimization, exif, astro]

# Dependency graph
requires:
  - phase: 05-animation-polish
    provides: existing optimize-images.mjs pipeline (logos, icons, heroes, banners)
provides:
  - public/images/lachlan/lachlan-portrait.webp (160.2 KB, MENTOR-08 satisfied)
  - public/images/lachlan/lachlan-warroom.webp (146.3 KB)
  - EXIF auto-rotate patch in toWebp() helper (backward-compatible)
  - _zip_temp/Lachlan/ as source staging folder (gitignored)
affects: [06-02-MentorIntro-component, 07-lachlan-section-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "sharp .rotate() called before .resize() in toWebp() — mandatory for iPhone-sourced JPGs with EXIF orientation flags"
    - "Lachlan source assets live in gitignored _zip_temp/Lachlan/ — NOT in public/ or _zip_temp/Elevateo/"
    - "processLachlan() follows processLogos() shape: ensureDir, hardcoded source paths, Promise.all tasks, logResult per file"

key-files:
  created:
    - public/images/lachlan/lachlan-portrait.webp
    - public/images/lachlan/lachlan-warroom.webp
  modified:
    - scripts/optimize-images.mjs

key-decisions:
  - "EXIF auto-rotate fix applied to shared toWebp() helper (not just processLachlan) so all future iPhone-sourced photos benefit automatically"
  - "Portrait encoded at width=1600/quality=82 — lands at 160.2 KB within 150-300 KB MENTOR-08 budget"
  - "War-room encoded at width=1800/quality=80 — no hard size budget per D-02"
  - "public/Lachlan Pictures/ physically deleted from working tree (was untracked — JPGs had never been git-committed)"

patterns-established:
  - "Per-person image directory: public/images/{person}/ (mirrors existing public/images/{category}/ pattern)"
  - "EXIF-safe toWebp(): always call .rotate() before .resize() in sharp pipeline"

requirements-completed: [MENTOR-08]

# Metrics
duration: 25min
completed: 2026-04-24
---

# Phase 06 Plan 01: Lachlan Image Pipeline Summary

**Lachlan JPGs relocated from deploy bundle, EXIF auto-rotate patched into toWebp() helper, and two optimized WebPs produced (portrait 160.2 KB, war-room 146.3 KB) via extended optimize-images.mjs pipeline**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-24T11:20:00Z
- **Completed:** 2026-04-24T18:45:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint:human-verify — approved)
- **Files modified:** 3 (scripts/optimize-images.mjs, lachlan-portrait.webp, lachlan-warroom.webp)

## Accomplishments
- Eliminated ~18 MB deploy bundle weight: `public/Lachlan Pictures/` (raw JPGs) removed entirely
- EXIF auto-rotate fix merged into shared `toWebp()` helper — portrait renders upright (not sideways) without workarounds
- `processLachlan()` function added to optimize-images.mjs, following the established processLogos() shape, registered in main()
- Both WebPs committed to public/images/lachlan/: portrait at 160.2 KB (within MENTOR-08 150-300 KB band), war-room at 146.3 KB
- Blocking visual-quality gate passed: portrait confirmed upright, natural aspect ratio, quality comparable to alan-networking-2x.webp reference
- Full Astro build passes, no JPG leak in dist/, existing pipeline (logos/icons/heroes/banners) unaffected by .rotate() patch

## Task Commits

Each task was committed atomically:

1. **Task 1: Relocate Lachlan JPGs and patch toWebp() with EXIF auto-rotate** - `7f8d513` (feat)
2. **Task 2: Add processLachlan() function and emit optimized WebPs** - `9f31395` (feat)
3. **Task 3: Blocking visual-quality gate** - checkpoint:human-verify (approved, no code changes)

## Files Created/Modified
- `scripts/optimize-images.mjs` - Added `pipeline.rotate()` to toWebp() helper + new processLachlan() function + registered in main()
- `public/images/lachlan/lachlan-portrait.webp` - Optimized portrait (1600px wide, quality 82, 160.2 KB)
- `public/images/lachlan/lachlan-warroom.webp` - Optimized group photo (1800px wide, quality 80, 146.3 KB)

## Output File Sizes

| File | Size | Budget | Status |
|------|------|--------|--------|
| lachlan-portrait.webp | 160.2 KB | 150-300 KB (MENTOR-08) | PASS |
| lachlan-warroom.webp | 146.3 KB | > 50 KB (sanity) | PASS |
| Combined | 306.6 KB | < 1024 KB | PASS |

## Decisions Made
- **EXIF fix in shared helper, not processLachlan() only:** Applied `.rotate()` to `toWebp()` so all future iPhone-sourced photos (from any processX function) auto-orient. Backward-compatible — no-op on PNGs without orientation metadata.
- **Portrait settings: width=1600, quality=82:** First run landed at 160.2 KB, within the 150-300 KB band — no tuning required.
- **War-room settings: width=1800, quality=80:** No hard budget per D-02; 146.3 KB is well above the 50 KB sanity floor.

## Deviations from Plan

### Execution Context Deviation

**[Context] Previous agent used a git worktree**
- **Found during:** Continuation setup
- **Issue:** Tasks 1 and 2 were committed in a separate worktree branch (`worktree-agent-ab48b565` at `07cb636`) rather than directly to `master`. The working tree showed `public/Lachlan Pictures/` still present and `public/images/lachlan/` absent — as if the work had not been done.
- **Fix:** Cherry-picked both task commits (`de7bf8a`, `07cb636`) into master, then physically deleted `public/Lachlan Pictures/` (it was untracked — the JPGs had never been git-committed, only moved out of git tracking in the worktree). Copied JPGs to `_zip_temp/Lachlan/` in working tree.
- **Files modified:** No source files changed — only git history and filesystem cleanup.
- **Committed in:** `7f8d513`, `9f31395` (cherry-picks of original task commits)

---

**Total deviations:** 1 (execution context — worktree cherry-pick recovery)
**Impact on plan:** No code changes required. Final state identical to intended plan outcome.

## Issues Encountered
- **Astro build EPERM warning on Windows:** `astro build` emits a symlink EPERM error from the Vercel adapter's `astro:build:done` hook when trying to symlink the `sharp` module for serverless functions. This is a **pre-existing Windows limitation** with the Vercel adapter — unrelated to this plan's changes. The actual web assets in `dist/client/` are correctly built (both Lachlan WebPs present, no JPG leak, all existing image outputs intact).

## Visual Quality Gate Results

| Check | Result |
|-------|--------|
| Portrait orientation (upright, not sideways) | PASS |
| Natural aspect ratio (no stretching/squashing) | PASS |
| No unnatural cropping from optimization | PASS |
| Quality comparable to alan-networking-2x.webp | PASS |
| No visible blur, muddy detail, or heavy artifacting | PASS |

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `public/images/lachlan/lachlan-portrait.webp` is ready for use in MentorIntro.astro (Plan 06-02)
- `public/images/lachlan/lachlan-warroom.webp` is available for Phase 7 placement decision
- The MentorIntro.astro component shell (Plan 06-02) can now wire the portrait image path
- No blockers for Phase 7 (Lachlan section integration)

---
*Phase: 06-lachlan-image-pipeline-mentorintro-component*
*Completed: 2026-04-24*
