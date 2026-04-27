---
quick_id: 260427-mfr
description: Update bluepillar logo
date: 2026-04-27
---

# Quick Task 260427-mfr: Update bluepillar logo

## Goal

Replace `public/images/logos/bluepillar.webp` with a freshly converted WebP from the new source PNG at `C:\Work File\Assets\Logos\bluepillar-logo.png`.

## Task 1: Convert PNG to WebP and replace logo

**Files:** `public/images/logos/bluepillar.webp`
**Action:** Run sharp to convert source PNG (500x500, 8-bit colormap) to WebP at quality 85, output directly to `public/images/logos/bluepillar.webp`
**Verify:** File exists, size is reasonable (> 5 KB), renders as expected
**Done:** bluepillar.webp replaced in public/images/logos/
