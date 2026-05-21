---
title: "BaanStory Page Anatomy"
aliases:
  - "page anatomy"
  - "page structure"
  - "site structure"
note_type: "spec"
status: "draft"
created: 2026-05-21
updated: 2026-05-21
language: "en"
domain: "baanstory"
tags:
  - "baanstory"
  - "page-anatomy"
  - "ia"
  - "current-canon"
provenance: "authored_from_components_canon_and_brief"
evidence_role: "spec"
related_sources:
  - "context/current-frame.md"
  - "context/product/jobs-and-user-stories.md"
  - "context/product/journeys.md"
  - "context/product/mvp-scope.md"
  - "context/web/site-design-brief.md"
  - "context/web/design-spec.md"
  - "context/web/components.md"
  - "context/web/copy-deck.md"
---

# BaanStory Page Anatomy

This document describes the structure of every public page in BaanStory V1. For each page, it lists which components appear, in what order, on mobile and desktop, with conditional rules for what's hidden when. It does not define how individual components behave (that's in `components.md`) and does not contain any user-facing strings (those live in `copy-deck.md`).

Read this when you need to know:

- What pages exist in V1
- What goes on each page, in what order
- How a page changes when the entity behind it is in a different state (free vs Culture Pack, past vs upcoming, error vs success)
- What's MVP-must vs MVP-should vs out-of-scope on each page

If you find a page referenced elsewhere but not defined here, the document is incomplete.

## How this document works

For each page, the structure is:

- **Purpose** — one sentence, what job this page does for the user
- **URL** — the canonical path
- **Used by** — which user segment uses this page (tourist / institution / either)
- **MVP status** — Must / Should / Out (mapped to `context/product/mvp-scope.md` feature IDs)
- **Components and order** — the page's anatomy, top to bottom
- **States** — how the page changes in different conditions
- **Edge cases** — what happens when data is partial, missing, or wrong
- **What this page does not have** — explicit non-inclusions to prevent scope creep

Pages are ordered roughly by visit frequency in the tourist journey, then by relevance to the institution journey. PascalCase component names in code style reference entries in `components.md`.

## Conventions used in this document

- **Required component** = always rendered on this page, even if the data is sparse (use `HonestGap` if a critical field is missing)
- **Conditional component** = rendered only when a stated condition is met
- **Optional component** = rendered when data is available; hidden if not (per the empty / unavailable rule in `components.md`)
- **Mobile / Desktop reflow** = when the order differs between mobile and desktop, mobile order is the canonical priority signal (what's most important is first on mobile)
- **Breakpoint** = 768px unless stated otherwise

### Naming convention for structural elements

- **PascalCase backticks** (for example, `GlobalHeader`) are used **only** for reusable components defined in `components.md`. If you see a PascalCase name in backticks, you can find its full spec there.
- **Quoted names** ("Plan your visit", "What to notice") are used for **page-specific blocks** — sections of a page that have a fixed structure but aren't reusable as components. They're built from primitives but live only on one page.
- **Block** suffix is used in the text to make it clear when we're referring to a page-specific block rather than a reusable component (e.g., "Hero block" not "Hero").

If you find a PascalCase component name in backticks that isn't in `components.md`, the cross-reference is broken — raise it.

## Decisions taken in this document

Some decisions weren't explicit in the canon. I'm fixing them here so they're visible and can be revisited:

1. **Home** uses the **intermediate structure** (~6 blocks): hero, discovery modes, upcoming events, essential crafts, learning strip, why BaanStory. Not the minimal 4-block version, not the 8-block brief version.
2. **Event Card** has 6 required sections + 2 conditional. Section order matches the journey arc: orient → understand → trust → decide & act.
3. **Craft Card** mirrors Event Card structure with substitutions (region/material instead of date, no calendar action) — and includes a Legend section per `context/current-frame.md` ("The Craft & Lineage").
4. **Listings** ship without filters in MVP P0 (`context/product/mvp-scope.md` S6/S7 are Should). Filters are described here but marked conditional.
5. **Past / cancelled events** still render in Events Directory, with `LifecycleBadge` in past/cancelled state. They are not hidden.
6. **Distribution assets** (`DownloadPDFAction`, `ShowQRAction`) are visible on Culture Pack pages only. Free entries get `ShareAction` and `AddToCalendarAction` (events), nothing more.
7. **The institutional attribution block** is the single canonical location for the claim path (`ClaimCTA`) and the Culture Pack institutional attribution. It lives in the footer area of Event Card and Craft Card.

If a decision here turns out to be wrong, change it here first, then propagate to `components.md` and `copy-deck.md`.

---

## Site map

```
/                       Home (landing)
/events                 Events Directory
/events/[slug]          Event Card
/crafts                 Crafts Directory
/crafts/[slug]          Craft Card
/contact                Contact form
/about                  About (S8, may ship later)
/privacy                Privacy (S9, may ship later)
/terms                  Terms (S9, may ship later)
/cookies                Cookies (S9, may ship later)
404                     Not found (any unrecognised path)
```

No other routes in V1. No `/places/[slug]`, no `/regions/[slug]`, no `/articles`, no user account pages, no search results page (search results render inline in Directories).

---

## Universal page chrome

Every page in V1 includes the same chrome — header at top, footer at bottom, cookie banner on first visit. This is described here once and not repeated for each page.

**Order on every page (top to bottom):**

1. `GlobalHeader` — sticky on desktop, not sticky on mobile. On mobile, the header opens `MobileDrawer` via the hamburger; on desktop, the drawer is not used.
2. Page content (specific to each page below)
3. `GlobalFooter`

**Always-on:**

- `Toast` container (positioned absolutely, appears as needed)
- `CookieBanner` (only on first visit, until accepted/declined)

**Conditional per page:**

- `Breadcrumbs` — on Event Card and Craft Card only

The chrome does not change between Culture Pack and free entries, between past and upcoming events, or between languages. It's the consistent frame around everything else.

---

## Home

**Purpose.** Explain BaanStory to a first-time visitor and route them into Events or Crafts within seconds. Home is not a content destination; it's a routing surface with enough context to earn the next click.

**URL.** `/`

**Used by.** Tourist primarily. Institutions arriving cold may use it but their canonical entry is via the footer's "For organisers" links.

**MVP status.** Must (M4 Landing & listings, P0).

### Components and order

**Mobile (canonical order):**

1. **Hero block** — page-specific, not a component
   - H1 (one of two approved options from copy-deck)
   - Subhead
   - Two primary CTAs: link to `/events`, link to `/crafts`
   - Optional cue row (one-line list of example things you'd discover: `lanterns · silk · temple fairs · food markets · umbrellas`)
2. **Discovery modes block** — page-specific
   - Two cards or blocks side by side: `Plan by time` (links to Events Directory) and `Learn by object` (links to Crafts Directory)
   - Each has a short body line explaining when to use that path
3. **Upcoming events section**
   - Heading + sub-line
   - 4-6 `EntityCardPreview` (event type, mix of Culture Pack and free)
   - "View all events" link
4. **Essential crafts section**
   - Heading + sub-line
   - 4-6 `EntityCardPreview` (craft type, mix of Culture Pack and free)
   - "View all crafts" link
5. **Learning strip** — page-specific
   - Heading
   - 3-5 `MomentCard` (collapsed state only on Home, no expansion)
6. **Why BaanStory block** — page-specific
   - Heading
   - 3 short comparison points (Google / Generic AI / Travel guides / BaanStory)

**Desktop reflow.**

- Hero block uses a two-column layout: H1 + subhead + CTAs on the left, optional concrete guide preview on the right (a single `EntityCardPreview` of a representative entry, with one or two `MomentCard`s shown). The right-side preview is **conditional** — appears only when there's a good example to surface.
- Discovery modes and the lower sections flow vertically as on mobile, but use more of the horizontal space (4 cards across instead of 1-2).

### States

- **Default** — all sections render with content
- **Empty upcoming events** — section heading still renders, but the list is replaced with `EmptyState` ("No events indexed for the coming weeks. Browse all crafts instead.")
- **Empty essential crafts** — same pattern, with alternate path to Events Directory

The empty states should not happen in practice past the first weeks of MVP, but they're defined here to avoid broken layouts during development.

### Edge cases

- If the right-side hero preview cannot be filled with a real entry (no Culture Pack examples yet), the hero collapses to a single column on desktop. No placeholder for the missing card.
- Learning strip can ship empty in the first weeks of MVP — in that case the section is hidden entirely, not rendered with a "coming soon" message.

### What this page does not have

- Search box (search lives in Directories)
- Filters (filters live in Directories)
- A blog feed, news section, or editorial articles
- User-generated content (no comments, no reviews, no ratings)
- Pricing or paid product pitch (the paid product is institutional; tourists never see a paywall here)
- Newsletter signup (no marketing list in MVP)

---

## Events Directory

**Purpose.** Help a visitor find a craft event that fits their time, location, and interest. The primary discovery surface for the "plan by time" path.

**URL.** `/events`

**Used by.** Tourist.

**MVP status.** Must (M18 Events Directory, P1).

### Components and order

**Mobile:**

1. **Page header block** — page-specific
   - H1 ("Events")
   - Subtitle (one line about what's here)
2. **Search and filters bar**
   - `SearchBar` — always rendered
   - `FilterGroup` for "When" — conditional (S6, may not ship in P0)
   - `FilterGroup` for "Where" — conditional (S6)
   - `FilterGroup` for `What to see` — conditional (S6)
   - "Active filters" summary line — rendered only when filters have selections
3. **Event list, grouped by month**
   - Month heading (e.g., "January 2027") + event count
   - Multiple `EntityCardPreview` (event type) per month group
   - Empty months are skipped (do not render "0 events in March")
4. **No-results state** — `EmptyState`, rendered when search or filters return zero
5. **Date caution line** — quiet note about lunar calendars and date verification (rendered always, sits below the list as a footer-area aside)

**Desktop reflow.**

- Filters move to a left sidebar; the event list takes the right column
- Within each month group, event cards may render in a 2- or 3-column grid

### States

- **Default** — filters empty, all events showing
- **Filtered** — filters applied, list shows filtered subset, "Active filters" summary visible above the list
- **Searched** — search query active, list shows matching subset, search query echoed in the heading area
- **No results** — `EmptyState` with suggestions ("Try another month", "Clear filters")
- **Loading** — filters/search in flight; list area shows skeleton placeholders via `EntityCardPreview`'s loading state

### Edge cases

- If a month has only past or cancelled events, it still renders, with all cards showing their `LifecycleBadge` accordingly
- If the user lands here with a deep link like `/events?region=north&month=2026-01`, the filters initialise from URL params (so the view is shareable)
- If filters return one event, that's fine — no special "only one result" treatment

### What this page does not have

- A calendar view widget (S6 is "search and filters" not "calendar view")
- A map view (out of scope for MVP)
- Sort options beyond the default month-grouped order
- Saved searches or alerts
- Per-event hover previews (whole card click opens the event)

---

## Crafts Directory

**Purpose.** Help a visitor identify a craft they saw and understand what it is. The primary discovery surface for the "learn by object" path.

**URL.** `/crafts`

**Used by.** Tourist.

**MVP status.** Must (M3 Crafts Directory, P1).

### Components and order

**Mobile:**

1. **Page header block** — page-specific
   - H1 ("Crafts")
   - Subtitle + supporting line
2. **Starter section** — page-specific
   - Heading ("Essential Thai crafts")
   - 4-6 `EntityCardPreview` (craft type), curated as starter set
3. **Search and filters**
   - `SearchBar` — always rendered
   - `FilterGroup` for "Region" — conditional (S7)
   - `FilterGroup` for "Material" — conditional (S7)
4. **Craft list, grouped by region**
   - Region heading (e.g., "North / Lanna") + region context line
   - Multiple `EntityCardPreview` (craft type) per region group
5. **No-results state** — `EmptyState`

**Desktop reflow.** Same as Events Directory — filters move to left sidebar, list to right column.

### States

Same shape as Events Directory:

- Default, Filtered, Searched, No results, Loading

### Edge cases

- If a region has no crafts indexed yet (early MVP), the region group is hidden entirely — do not render "0 crafts in this region"
- Search supports both English and Thai — e.g., search "ผ้าไหม" finds silk-related crafts
- A craft can appear in multiple regions (it's practiced in several) — in that case, it appears in each relevant region group with the same data

### What this page does not have

- A Thailand map widget with region pickers (it's an S7 "future" item)
- Sort by recency, popularity, or any other axis — only by region grouping in MVP
- Per-craft hover previews (whole card click opens the craft)
- A shop or "where to buy" page (Craft Card surfaces "Where to find" pointers, but never with prices or carts)

---

## Event Card

**Purpose.** Turn a craft event into something a visitor can understand, trust, decide on, and act on. This is the most important page in BaanStory — every other surface exists to get a visitor here.

**URL.** `/events/[slug]`

**Used by.** Tourist primary. Institution accesses their own Culture Pack here too (it's their public surface).

**MVP status.** Must (M1 Event Card, P0).

### Components and order

**Mobile (canonical):**

1. **`LifecycleBanner`** — conditional (renders only when event is past or cancelled)
2. **`Breadcrumbs`** — required
3. **`EntityImage`** — required (real photo or editorial placeholder)
4. **Hero block** — page-specific, contains:
   - H1 (event name)
   - `Term` component (Thai name + romanisation)
   - One-line value statement
   - Date / season + place line
   - `LifecycleBadge` (when upcoming, may be omitted if date already says it; required when past or cancelled)
   - `VerifiedIndicator` — conditional (Culture Pack only)
   - `SourceAttribution` — conditional (free entry only)
5. **"Plan your visit" block** — page-specific, required, contains:
   - Field labels: Date, Hours, Location, Entry, Organiser
   - For each field: value, or `HonestGap` if critical and missing
   - `AddToCalendarAction` (conditional: upcoming events with confirmed dates only)
   - Link / button: open location in Maps (external)
6. **"What to notice" section** — page-specific, required
   - Section title
   - 3-5 `MomentCard` (collapsed by default, expandable)
7. **"The Legend & Lineage" section** — page-specific, required
   - Section title (public label "The Legend & Lineage" or "Why it matters" — final label per content spec)
   - Body prose (1-3 short paragraphs, source-backed)
8. **"Visit preparation" section** — conditional (renders only when culturally relevant content exists)
   - Section title
   - Sub-blocks: Best time, What to bring, Etiquette, Useful phrase (uses `Phrase` component)
9. **"Regional crafts to know" section** — conditional (renders only when linked crafts exist)
   - Section title + sub-line
   - 3-4 `EntityCardPreview` (craft type, compact variant)
10. **`SourcesBlock`** — required
    - Section title
    - List of sources checked
    - Known gaps list (via `HonestGap` pattern)
    - Correction CTA
11. **`DistributionAssetsBlock`** — required
    - `ShareAction` (always)
    - `AddToCalendarAction` (upcoming + dated events)
    - `DownloadPDFAction` (Culture Pack only)
    - `ShowQRAction` (Culture Pack only)
12. **`ClaimCTA`** — required (free state) or institutional attribution block (Culture Pack state)

**Desktop reflow.**

The body uses a two-column layout below the hero:

- **Main column** (left, wider): "What to notice", "The Legend & Lineage", "Regional crafts to know", `SourcesBlock`
- **Sidebar** (right, narrower): "Plan your visit", `DistributionAssetsBlock`, "Visit preparation", `ClaimCTA`

The Hero block and `LifecycleBanner` span full width above the two columns. The order within each column matches the mobile order (top to bottom by priority).

### States

| State | Behavior |
|---|---|
| **Upcoming + Culture Pack** | Full experience: `VerifiedIndicator`, all distribution actions, full content. `LifecycleBadge` may be omitted from hero if date is obvious. |
| **Upcoming + Free** | `SourceAttribution` instead of `VerifiedIndicator`. `DistributionAssetsBlock` has only Share + Add to calendar. `ClaimCTA` in free state ("Are you the organiser?"). |
| **Past + Culture Pack** | `LifecycleBanner` at top ("This event was held in {date}"). Calendar action hidden. PDF and QR still available (institutional reference value remains). Other actions intact. |
| **Past + Free** | Same as past + Culture Pack but with `SourceAttribution` instead of `VerifiedIndicator`, and fewer distribution actions. |
| **Cancelled + either** | `LifecycleBanner` at top in cancelled state. Calendar action hidden. Other actions intact for institutional record / context. |
| **Loading** | Page chrome renders immediately. Hero and content sections show skeleton via `EntityCardPreview` patterns and `EntityImage` loading. |
| **Translation missing** | Page renders in fallback language (Thai) with a small notice in place of language toggle ("This page is not yet available in English. Showing Thai."). |

### Edge cases

- **Slug change.** If the slug changes (typo correction, rename), the old slug returns HTTP 301 to the new one. Stable URL is the contract — see `context/product/mvp-scope.md` M10.
- **Hours not confirmed but date confirmed.** "Plan your visit" shows date with confirmation, `HonestGap` for hours, calendar action still available with date-only entry.
- **Date conflict between sources.** Hero shows the most likely date with a small "Date needs confirmation" link to `SourcesBlock`. Both candidate dates are listed in `SourcesBlock`.
- **No photo available.** `EntityImage` renders an editorial placeholder (material swatch or pattern crop). No "photo coming soon" copy.
- **Free entry pulled from multiple sources.** `SourceAttribution` lists primary source; `SourcesBlock` lists all.
- **Newer edition exists for an annual event.** `LifecycleBanner` (past state) includes a "Looking for the 2027 edition?" link.

### What this page does not have

- Comments, reviews, or ratings
- "People who liked this also liked" recommendations (Regional crafts is curation, not recommendation)
- A booking widget or ticket purchase (`AddToCalendarAction` is the only "decide to go" action)
- Real-time availability or capacity indicators
- Social share counts ("Shared 1,200 times")
- User check-in or attendance tracking
- Audio narration of the Legend (S3 audio phrase is the only audio in MVP, and only for the useful phrase)

---

## Craft Card

**Purpose.** Help a visitor identify a craft, understand what it is, learn what to notice, and find where to encounter it. Closes the loop: object → context → events that feature it.

**URL.** `/crafts/[slug]`

**Used by.** Tourist primary. Institutions representing the craft (cooperatives, OTOP cooperatives, cultural centres) can claim and stand behind the page.

**MVP status.** Must (M2 Craft Card, P1).

### Components and order

The Craft Card mirrors the Event Card structure with substitutions: no date, no calendar action, no lifecycle banner (crafts don't go past). Public label for the Legend section is "The Craft & Lineage" instead of "The Legend & Lineage".

**Mobile (canonical):**

1. **`Breadcrumbs`** — required
2. **`EntityImage`** — required (real photo, material swatch, or pattern crop)
3. **Hero block** — page-specific, contains:
   - H1 (craft name)
   - `Term` component (Thai name + romanisation)
   - One-line value statement
   - Region + Material + Technique line
   - `VerifiedIndicator` — conditional (Culture Pack only)
   - `SourceAttribution` — conditional (free entry only)
4. **"What to notice" section** — page-specific, required
   - Section title
   - 3-5 `MomentCard` (collapsed by default, expandable)
5. **"The Craft & Lineage" section** — page-specific, required
   - Section title
   - Body prose (1-3 short paragraphs, source-backed)
6. **"What to check in person" section** — page-specific, conditional (when source-backed observable checks exist)
   - Section title + sub-line ("Observable checks, not certification")
   - 2-4 specific check items, each with hint about what it may suggest
7. **"Where to find" section** — page-specific, required
   - Section title
   - Pointers: villages, districts, provinces, markets, museums, cooperatives (where data exists)
   - `HonestGap` if location data is sparse ("Exact village not confirmed. Start with regional cultural centres in {region}.")
8. **"Events featuring this craft" section** — conditional (only when confirmed event participation exists)
   - Alt title: "Where this culture appears" — used when links are by region or theme, not confirmed participation
   - 2-4 `EntityCardPreview` (event type, compact variant)
9. **"Related craft traditions" section** — conditional (only when related crafts exist)
   - Section title
   - 2-4 `EntityCardPreview` (craft type, compact variant)
   - Relationship label per card (Same region / Same material / Same technique / Useful comparison)
10. **`SourcesBlock`** — required
11. **`DistributionAssetsBlock`** — required
    - `ShareAction` (always)
    - `DownloadPDFAction` (Culture Pack only)
    - `ShowQRAction` (Culture Pack only)
    - No `AddToCalendarAction` (crafts have no date)
12. **`ClaimCTA`** — required

**Desktop reflow.**

Two-column layout below the hero, same pattern as Event Card:

- **Main column**: "What to notice", "The Craft & Lineage", "What to check in person", "Events featuring this craft", "Related craft traditions", `SourcesBlock`
- **Sidebar**: "Where to find", `DistributionAssetsBlock`, `ClaimCTA`

### States

| State | Behavior |
|---|---|
| **Culture Pack** | `VerifiedIndicator` in hero. Full distribution actions. Full content depth. |
| **Free entry** | `SourceAttribution` in hero. Limited distribution (Share only). `ClaimCTA` in free state. |
| **Loading** | Skeleton placeholders, page chrome immediate. |
| **Translation missing** | Same fallback as Event Card. |

Crafts do not have a lifecycle state — they're always "current" in MVP. If a craft becomes extinct or stops being practiced, that's a content edit, not a state change.

### Edge cases

- **Exact maker / village unknown.** Use the fallback hierarchy from `site-design-brief.md`:
  1. Village known → show it
  2. Province known → "Exact maker not confirmed. This tradition is associated with {province}."
  3. Region known → "Exact village not confirmed. Start with regional craft events and cultural centres in {region}."
  4. Nothing → hide the location block, invite source via correction
- **No related crafts.** Section hidden entirely.
- **No events feature this craft.** Section hidden entirely. Do not render "No events yet" — it's an empty state without a useful action.
- **Multiple regions practice this craft.** Page shows all regions in the hero, and "Where to find" lists pointers in each.
- **Craft straddles material categories** (e.g., a piece made of both bamboo and lacquer). Use the dominant material in the hero; mention the other in the body.

### What this page does not have

- Prices, shop links, marketplace integration
- "Add to wishlist" or favourite functionality
- Per-artisan biographies (canon explicitly excludes this)
- Provenance certificates or authenticity guarantees (we teach observation, not certification)
- Calendar / date — crafts are timeless
- A "Past" or "Discontinued" state — if a craft is extinct, the content reflects that in prose, not via state

---

## Contact

**Purpose.** Capture structured first contact from anyone with intent — tourists reporting corrections, institutions claiming pages or initiating new ones, partners exploring distribution, anyone sharing a source. Single on-site entry point to the entire institution workflow.

**URL.** `/contact`

**Used by.** Both tourists (corrections) and institutions (claim, create, update, partner, send source) and any visitor with a question (general).

**MVP status.** Must (M17 Contact form, P0).

### Components and order

**Mobile (canonical):**

1. **Page header block** — page-specific
   - H1
   - Subtitle (one line about what this form does)
2. **`ContactForm`** — required
   - Intent dropdown (first field)
   - Universal fields (name, email, message)
   - Intent-specific fields (vary based on dropdown — see `ContactForm` in `components.md`)
   - Privacy notice + consent checkbox (above submit)
   - Submit button
3. **Fallback contact line** — page-specific, quiet
   - One-line text: "If this form doesn't work, write to {fallback email}."

**Desktop reflow.** Form centred, max-width around 600px. Side margins, but no second column.

### States

| State | Behavior |
|---|---|
| **Idle** | Empty or partially filled form. Intent dropdown defaults to general or to the value in URL `?intent=` param. |
| **Intent prefilled** | URL has `?intent=organiser_event&page=...`. Dropdown is set, page URL field prefilled, relevant fields shown. User can still change the intent. |
| **Validating** | Client-side validation runs on submit attempt. Errors shown inline next to fields. |
| **Submitting** | Submit button shows loading state, button disabled. |
| **Submission success** | Form replaced with `ContactForm` success state (confirmation message, 2-business-day expectation, link back to where the user came from or to landing). |
| **Submission error** | Error shown with retry; form data preserved. |
| **Update mismatch** (special case for the update intent where institution name doesn't match sign-off owner) | User sees normal success state. Internal email flagged. See `ContactForm` in `components.md`. |

### Edge cases

- **User pastes a URL into the message field instead of using the page parameter.** Form accepts it. Internal triage handles parsing.
- **Submit fails server-side.** Form preserves all entered data and shows retry. The fallback email line is always visible.
- **User changes intent mid-flow.** Fields visible reshape; data in universal fields (name, email, message) is preserved.
- **User opens in incognito or with localStorage disabled.** Form still works. No state persistence is expected here in MVP.
- **Form receives a spam submission caught by honeypot.** User sees success state (so spammer doesn't learn). Server silently drops the submission.

### What this page does not have

- File upload (material handover is off-site after first contact)
- Payment fields (commercial agreement is off-site)
- Multi-step wizard (one form, one screen, dropdown switches fields)
- Login or account requirement
- A chat widget or live support
- CAPTCHA (deferred unless spam becomes a problem)
- An FAQ section (this is a contact form, not a help page)

---

## About

**Purpose.** Explain BaanStory in under 2 minutes to a visitor who wants to know who we are, what we do, why we're different, and whether to trust us. Secondary purpose: surface the partnership / organiser route for institutions who landed here cold.

**URL.** `/about`

**Used by.** Both segments. Tourists seeking context; institutions exploring partnership.

**MVP status.** Should (S8 About page). May not ship in the first release, but defined here so the nav link doesn't break and the structure exists when it's built.

### Components and order

**Mobile (canonical):**

1. **Hero block** — page-specific
   - H1 (what BaanStory is in one sentence)
   - Subhead (subtitle expanding the sentence)
   - Two CTAs: link to `/events`, link to `/crafts`
2. **What we do block** — page-specific
   - Heading + body
   - 3 compact points
3. **Who it is for block** — page-specific
   - Heading + body
4. **Why it is different block** — page-specific (the "Not Google" comparison)
   - Heading
   - 4 comparison points
5. **What we check block** — page-specific
   - Heading + body
   - CTA: link to Contact form with `intent=correction`
6. **For organisers and partners block** — page-specific
   - Heading + body
   - CTA: link to Contact form with `intent=partner`
7. **Languages block** — page-specific
   - Heading + body
8. **Closing block** — page-specific
   - Short line + two CTAs (Events, Crafts)

**Desktop reflow.** Single column, comfortable max-width. No multi-column layouts inside About — it should read like a page of prose, not a marketing dashboard.

### States

- **Default** — all blocks render
- **No localised version** — fall back to source language with notice

This page has no dynamic states. It's prose.

### What this page does not have

- A team / staff page
- Press / media kit
- Investor information
- A timeline or history dump
- Methodology specifics (those are referenced in `SourcesBlock` on detail pages and possibly a separate "How BaanStory works" page later)
- Statistics or growth claims

---

## Privacy / Terms / Cookies

**Purpose.** Legal compliance. Privacy explains data handling per PDPA. Terms cover usage. Cookies explains analytics.

**URL.** `/privacy`, `/terms`, `/cookies`

**Used by.** Either segment. Mostly visited via footer links and from the `ContactForm` privacy notice.

**MVP status.** Should (S9 Legal pages). Required for production launch under baseline PDPA/privacy requirements. May ship later than P0 but should not lag much.

### Components and order

Each of the three pages has the same structure:

**Mobile and desktop:**

1. **Page header block** — page-specific
   - H1 (page name)
   - Last-updated date line
2. **Body** — prose
   - Sections with subheadings (h2, h3 as needed)
   - Plain language, not legalese where possible
3. **Contact line** — page-specific
   - "Questions? Contact us." with link to `/contact?intent=general`

### States

Static prose. No dynamic states.

### What these pages do not have

- Acceptance prompts ("By using this site, you agree to..." — that's the cookie banner's job, not these pages)
- Interactive consent toggles (in MVP, cookie consent is binary via the banner)
- Multi-jurisdictional variants (PDPA baseline only in MVP; if we need GDPR-specific or US state variants, that's a future addition)

---

## 404 / Not Found

**Purpose.** Help a user who landed on a broken link recover. Common causes: stale shared link, deleted entity, mistyped URL, slug change that didn't redirect.

**URL.** Any unrecognised path

**Used by.** Either segment.

**MVP status.** Should (S10 — 404 / Empty / Error states).

### Components and order

**Mobile and desktop:**

1. **Hero block** — page-specific
   - H1 ("We couldn't find that page")
   - Body (one sentence about likely causes)
2. **CTA row**
   - Three buttons or links: Events, Crafts, Contact
3. **Small footer link**
   - "Tell us this link is broken" — routes to `ContactForm` with `intent=correction` and the broken URL in the message field

### States

No states. Static page.

### Edge cases

- **Old slug that was redirected.** The user should never see 404 in this case — 301 redirect handles it. If they do see 404, it means the redirect rule is missing.
- **Entity was deleted intentionally.** Currently MVP doesn't delete entities (only past/cancelled state), so this shouldn't happen. If it does, 404 is the right response.
- **Mistyped path.** Standard 404 applies.

### What this page does not have

- Search box (we don't have a global search, just Directory-scoped search)
- Recently visited pages (no user state)
- Suggestions based on the broken URL (no fuzzy slug matching in MVP)

---

## Cross-cutting page concerns

Some things apply across all pages and aren't tied to one entry. Defining them here so they're not re-litigated per page.

### Link previews (Open Graph metadata)

Every page exposes `og:title`, `og:description`, `og:image`, `og:url`, and `og:type` for shareable previews. The values come from the entity data:

- `og:title` — page title (entity name for cards, page H1 for others)
- `og:description` — one-line value statement (for cards) or subtitle (for others)
- `og:image` — `EntityImage` URL when available; falls back to a BaanStory brand image when not
- `og:url` — canonical URL of the page
- Open Graph type — "article" for cards, "website" for everything else
- `og:locale` — current locale

For Culture Pack entries, `og:description` should subtly include the `VerifiedIndicator` value (e.g., "Verified by Bo Sang Festival Committee · Painted paper umbrellas...") so the link preview shows the institutional backing.

### Canonical URL and stable URL contract

Every page has one canonical URL that survives:

- Content updates
- Free → Culture Pack upgrade
- Translation changes
- Reslugs (old slug 301-redirects to new)

Filters and search use query parameters, which don't change the canonical URL. This means a filtered Events Directory view is shareable but the canonical of `/events?region=north` is still `/events`.

### Language fallback

If a page is not available in the user's chosen language:

- Show the page in the source language (Thai for content that originated in Thai)
- Display a small notice ("This page is not yet available in English. Showing Thai.")
- Do not render an English page with Thai content scattered through it — that's worse than a clean fallback

`LanguageSwitcher` should disable or hide locales that don't exist for the current page.

### Loading and error behavior per page

Every page renders chrome (`GlobalHeader`, `GlobalFooter`) immediately. Below the chrome, the loading pattern is:

- **Hero block** — placeholder skeleton with rough shape
- **Lists / cards** — skeleton placeholders via `EntityCardPreview` loading state
- **Prose sections** — placeholder lines

If a critical resource fails to load:

- Use `NetworkError` component inline within the section that failed
- Page chrome remains usable so the user can navigate elsewhere

### Lifecycle awareness across pages

- Events Directory shows past and cancelled events with appropriate `LifecycleBadge`. Past months still appear in the grouped list.
- Crafts Directory has no lifecycle states (crafts don't go past).
- Home's Upcoming events section shows only upcoming events. Past events that haven't been removed are filtered here.
- Event Card surfaces lifecycle via `LifecycleBanner` (when past or cancelled) and `LifecycleBadge` (when upcoming).
- Craft Card has no lifecycle UI.

### Where the institution workflow surfaces on each page

The institution can encounter BaanStory at multiple entry points, and each page handles this differently:

| Page | Institutional surface |
|---|---|
| Home | None directly; footer "For organisers" column is the route |
| Events Directory | None directly; footer is the route |
| Crafts Directory | None directly; footer is the route |
| Event Card | `ClaimCTA` in the body (claim path for the specific event) |
| Craft Card | `ClaimCTA` in the body (claim path for the specific craft) |
| Contact | `ContactForm` is the entire page; intent dropdown handles all routes |
| About | "For organisers and partners" block links into Contact with `intent=partner` |
| Privacy / Terms / Cookies | None |
| 404 | None |

The principle: an institution should be able to start the journey from any page, but the path always converges on Contact form with the right intent.

---

## State matrix across pages

This table captures how key states affect each page. It's a quick reference; details are in the per-page sections above.

| State | Home | Events Directory | Crafts Directory | Event Card | Craft Card | Contact | About | 404 |
|---|---|---|---|---|---|---|---|---|
| Free entry | applies in previews | applies in previews | applies in previews | full free layout | full free layout | n/a | n/a | n/a |
| Culture Pack | applies in previews (visual diff) | applies in previews | applies in previews | full CP layout (Verified, full distribution) | full CP layout | n/a | n/a | n/a |
| Past event | filtered out of upcoming | rendered with past badge | n/a (no events) | LifecycleBanner + LifecycleBadge | n/a | n/a | n/a | n/a |
| Cancelled event | filtered out | rendered with cancelled badge | n/a | LifecycleBanner + LifecycleBadge | n/a | n/a | n/a | n/a |
| Missing critical data | Empty state if applicable | Empty state if applicable | Empty state if applicable | HonestGap inline | HonestGap inline | n/a | n/a | n/a |
| Missing translation | Fallback notice | Fallback notice | Fallback notice | Fallback notice | Fallback notice | Fallback notice | Fallback notice | Fallback notice |
| Loading | Skeleton per section | Skeleton in list area | Skeleton in list area | Skeleton in main + sidebar | Skeleton in main + sidebar | Submit button only | Static, no loading | Static, no loading |
| Submission success | n/a | n/a | n/a | n/a | n/a | Replaces form | n/a | n/a |

---

## What this document does not cover

- Visual design — pixel measurements, colours, typography. See `design-spec.md`.
- Component behavior in detail — see `components.md`.
- Copy strings — labels, microcopy, error messages. See `copy-deck.md`.
- API contracts — what data the page fetches. See architecture docs.
- SEO strategy beyond Open Graph basics — sitemap, schema.org markup are MVP-out per `context/product/mvp-scope.md`.
- Performance budgets — page weight, render time targets. Engineering decision.
- Analytics events — what gets tracked per page. Operational decision.

If a question feels like it belongs here but isn't answered, raise it in `conflicts-and-open-questions.md` rather than guessing.
