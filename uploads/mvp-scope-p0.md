---
title: "BaanStory MVP Scope — P0"
aliases:
  - "MVP Scope P0"
  - "BaanStory P0 Scope"
  - "mvp-scope-p0"
note_type: "mvp_scope"
status: "active"
created: 2026-05-21
updated: 2026-05-21
language: "en"
domain: "baanstory"
tags:
  - "baanstory"
  - "mvp"
  - "p0"
  - "product-scope"
  - "execution-focus"
  - "current-canon"
provenance: "authored_as_derived_split_from_mvp_scope"
evidence_role: "decision"
source: "mvp-scope.md"
implements: "mvp-scope.md"
related_sources:
  - "mvp-scope.md"
---

# BaanStory MVP Scope — P0

This document is the current execution master for the P0 phase. It narrows team focus to the first working slice only.

It is derived from [`mvp-scope.md`](mvp-scope.md), which remains the full V1 scope reference on this branch. P1 features, Should items, and Out-of-scope boundaries are intentionally excluded from active focus here unless they are required to satisfy a listed P0 dependency or acceptance.

## Purpose and precedence

Use this file when the question is:

- what must be built first;
- what belongs in the first working demo;
- what the team should treat as in-focus right now.

Precedence for this branch:

1. `mvp-scope-p0.md` — current execution master for the P0 phase.
2. `mvp-scope.md` — full V1 reference scope for broader context and later phases.

This file does not add new policy. Every active requirement here maps back to an existing `M*` or `T*` item in the full scope.

## P0 delivery goal

The immediate goal is narrower than full V1:

> One real source-backed event can be ingested, rendered as an Event Card, discovered from the site surface, shared by URL, and paired with an on-site Contact route for institutional follow-up.

If that path works end to end, the product has a real P0 demo. If it does not, the team should not broaden scope yet.

## P0 features only

### M1. Event Card page

- What it is: a public page for one real craft event or festival with structured core facts, Legend, and participation tips.
- Why it is essential now: this is the single object the entire product exists to produce. Without it, neither tourist nor institution side has anything to demonstrate.
- Depends on: `M5`, `M6`, `M12`
- Acceptance:
  - Structured fields for what, where, when, who are visible before any narrative.
  - The page renders the Legend as a source-grounded cultural explanation the visitor can scan or read in depth.
  - Participation tips appear where culturally relevant.
  - Uncertain or missing facts are handled per `M6`.
  - Reachable via a stable, indexable URL.
  - Renders without login, app install, or partner context.

### M4. Landing and listings

- What it is: landing page at the site root plus event listing surfaces.
- Why it is essential now: without a meaningful first screen, the product depends entirely on inbound deep-links and cannot stand on its own.
- Depends on: `M1`, `M12`
- Acceptance:
  - Landing is reachable at the site root.
  - Listings show Event Cards with enough preview information to choose.
  - Culture Pack entries in any listing are visibly differentiated from free entries.

### M5. Multilingual presentation

- What it is: every public page available in Thai plus English.
- Why it is essential now: the primary user is a foreign visitor; Thai-only content breaks the core tourist job.
- Depends on: `T4`
- Acceptance:
  - Every public page exists in Thai and English.
  - Language switch is reachable on the page via `M19`.
  - Translation preserves cultural meaning.

### M6. Honest gaps in factual content

- What it is: when a fact is missing or uncertain, the page says so plainly with a next step.
- Why it is essential now: this is the key trust boundary that separates BaanStory from a generic travel aggregator.
- Depends on: `M1`
- Acceptance:
  - Pages never render placeholders like `—`, `N/A`, `Unknown`, or empty rows.
  - Non-critical missing fields are hidden.
  - Critical missing fields are explained in plain language with a next step.
  - Page-level institutional verification remains a separate concern from this behavior.

### M10. Share via stable URL

- What it is: every page has a stable, shareable URL with meaningful link previews.
- Why it is essential now: sharing is the lightest real distribution loop and one of the explicit MVP success signals.
- Depends on: `M1`
- Acceptance:
  - URLs do not change across content updates or free-to-Culture-Pack transitions.
  - Link previews show enough context for messaging.
  - Shared links open to a complete entry without login.

### M12. Free entry from public source

- What it is: ingestion pipeline pulling events and places from public sources.
- Why it is essential now: without source-based data, the site is empty and organisers cannot discover their own entries.
- Depends on: `T1`
- Acceptance:
  - At least one real ingestion source is wired up end to end.
  - Ingested entries appear as free entries with traceable source references.
  - Personal contact data is not republished by default.

### M17. Contact form (intent router)

- What it is: a single Contact form routing requests by user-facing intent, with backend mapping for claim/create distinctions.
- Why it is essential now: this is the only on-site entry point into the institutional workflow and the only path for corrections or organiser follow-up.
- Depends on: `M20`
- Acceptance:
  - Form supports the defined intents and shapes fields accordingly.
  - Organiser intents map server-side to verify or create flows based on whether a Page URL is present.
  - Reachable from Event Card, Craft Card, free entry, footer, and cold entry.
  - Submissions capture enough context for off-site follow-up.
  - The form does not promise on-site payment, sign-off, or material handover.

### M19. Global header

- What it is: header on every page with logo, primary nav, language switcher, and mobile drawer.
- Why it is essential now: without it, the site is a pile of disconnected pages and there is no reliable navigation or language path.
- Depends on: none
- Acceptance:
  - Appears on every public page.
  - Exposes navigation to Events, Crafts, and Contact.
  - Includes the language switcher required by `M5`.
  - Collapses to a mobile drawer on small screens.

### M20. Global footer

- What it is: footer on every page with browse, learn, organiser, and legal columns.
- Why it is essential now: it carries the persistent organiser route for institutions who did not land on their own page.
- Depends on: none
- Acceptance:
  - Appears on every public page.
  - Exposes a persistent organiser or work-with-us route into `M17`.
  - Exposes browse links to Events and Crafts.
  - Legal links may remain placeholder-level in P0.

## Required internal prerequisites

Only the internal capabilities that directly block listed P0 items are in current focus here.

### T1. Source ingestion admin

- Why it is required now: `M12` cannot be satisfied without a working way to ingest and re-ingest real source-backed entries.
- Current role in P0: provide at least one live or scripted ingestion path that yields a real free entry.

### T4. Translation pipeline

- Why it is required now: `M5` cannot be satisfied without a way to produce Thai and English public pages.
- Current role in P0: ensure translations exist for the P0 public surfaces; the implementation may be human, machine, or hybrid.

No other internal tooling is active scope in this file unless it becomes a direct blocker to the acceptance of the P0 items above.

## Not in current focus

The following remain part of the broader V1 picture, but are not current execution focus for this branch:

- **P1 feature set:** craft loop and deeper browse surfaces (`M2`, `M3`, `M18`), verified and preview refinement (`M7`, `M8`), lifecycle and calendar extras (`M9`, `M11`), organiser-specific refinements (`M13`, `M14`, `M16`), and distribution assets (`M15`).
- **Should items:** extra languages, widgets, audio, richer filters, About page polish, legal polish, better empty/error states, and cookie banner.
- **Out of scope categories:** booking/ticketing, trip planner, social or UGC features, AI copywriter surfaces, mass cultural directory expansion, native app, government certification, source-free story generation, default personal-contact republication, differentiated verification tiers, subscription pricing, open self-publishing, full SEO programme, and on-site analytics product.

Those items are still governed by the full [`mvp-scope.md`](mvp-scope.md). They are simply not part of the first-build focus here.

## P0 build order

Build in dependency order:

1. **Establish shell:** `M19`, `M20`
2. **Enable inputs:** `T1`, `M12`, `T4`
3. **Define page behavior:** `M6`, `M1`
4. **Expose entry surface:** `M4`
5. **Enable distribution and sharing:** `M10`
6. **Enable institutional intake:** `M17`

This sequence is the recommended implementation path for the current branch. Do not broaden into P1 until this path works end to end on one real example.
