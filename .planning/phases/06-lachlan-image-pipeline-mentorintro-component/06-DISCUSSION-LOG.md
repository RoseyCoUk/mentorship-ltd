# Phase 6: Lachlan Image Pipeline + MentorIntro Component - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-23
**Phase:** 06-lachlan-image-pipeline-mentorintro-component
**Areas discussed:** Portrait photo selection, Image output spec, MentorIntro component completeness

---

## Portrait Photo Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Portrait.JPG (8.4 MB) | Solo headshot — natural choice for mentor bio split-grid | ✓ |
| Picture_with_War_Room_members.JPG (9.5 MB) | Group shot — unclear if needed for Phase 6 | |

**User's choice:** Portrait.JPG for the bio portrait. Group photo should also be processed (WebP) in Phase 6 so it is available for Phase 7 placement.

**Notes:** User confirmed both photos should be processed and moved to `_zip_temp/Lachlan/`. Placement of the group photo on the site is deferred to Phase 7.

---

## Image Output Spec

| Option | Description | Selected |
|--------|-------------|----------|
| Resize + CSS crop | Resize to target width, let CSS handle aspect ratio and crop | ✓ |
| Pre-crop during sharp | Crop to fixed aspect ratio during optimization | |

**User's choice:** "not initially" — resize to width, CSS handles crop.

**Notes:** Consistent with how Allan's portrait is handled. CSS `object-cover object-center` handles the visual crop in the split-grid container.

---

## MentorIntro Component Completeness

| Option | Description | Selected |
|--------|-------------|----------|
| Bio shell only | name, credentials, image, CTA — specialty cards left for Phase 7 | |
| Full shell | Bio + specialty cards area + "who works with" block — Phase 7 just passes data | ✓ |

**User's choice:** "full" — build the complete component structure in Phase 6.

**Notes:** User selected full shell. Delivery mechanism (props vs slots) deferred to Claude's discretion — props chosen as the cleaner pattern for a typed, reusable component.

---

## Claude's Discretion

- Props vs slots: props (structured typed arrays) — cleaner, enforces structure, matches roadmap's "props-driven" language
- Exact prop interface shape — Claude designs based on existing component conventions
- Whether to add parallax attribute to portrait — follow Allan's portrait pattern

## Deferred Ideas

- Group photo placement on the site — noted for Phase 7
- Lachlan's own Calendly link — placeholder to Allan's until provided
