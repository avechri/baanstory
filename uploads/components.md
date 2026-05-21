---
title: "BaanStory Components"
aliases:
  - "components"
  - "component spec"
  - "component inventory"
note_type: "spec"
status: "draft"
created: 2026-05-21
updated: 2026-05-21
language: "en"
domain: "baanstory"
tags:
  - "baanstory"
  - "components"
  - "ui"
  - "current-canon"
provenance: "authored_from_canon_brief_and_prototype"
evidence_role: "spec"
related_sources:
  - "context/current-frame.md"
  - "context/product/jobs-and-user-stories.md"
  - "context/product/journeys.md"
  - "context/product/mvp-scope.md"
  - "context/web/site-design-brief.md"
  - "context/web/design-spec.md"
  - "context/web/page-anatomy.md"
  - "context/web/copy-deck.md"
---

# BaanStory Components

This document is the inventory of reusable components on the BaanStory web surface. It defines what each component does, what states it has, when it appears, and what data it needs. It does not specify visual design (that belongs in `design-spec.md`) and does not specify copy strings (those live in `copy-deck.md`). It does not say which components are on which page (that lives in `page-anatomy.md`).

Read this when you need to know what a component is, how it behaves, or where it is used. If you find a component referenced in `page-anatomy.md` that is not defined here, this document is incomplete.

## How this document works

Each component entry has the same structure:

- **Purpose** — one sentence, what the component does for the user.
- **Used on** — list of surfaces / pages where the component appears. Cross-referenced with `page-anatomy.md`.
- **Data inputs** — what the component needs to render.
- **States** — all visual / behavioural states the component can be in, including `loading` and error states where relevant.
- **Conditional logic** — when the component is shown vs hidden, when one state vs another.
- **Behavior** — what happens on user interaction (click, hover, focus, keyboard).
- **Accessibility** — keyboard, screen reader, focus management, semantic notes.
- **Notes** — edge cases, things easy to get wrong.

Components are grouped by role: chrome / global, trust & state, content & interactive, form & action.

## Conscious departures from the existing prototype

The HTML prototype contains visual elements that this document deliberately does not include as components. They were referenced for inspiration but are out of MVP scope per the canon:

- `Save to trip` / `Add to trip` — Trip planner is out of scope per `context/product/mvp-scope.md`. Save means save to the visitor's calendar or bookmarks, not into a BaanStory-owned trip object.
- Inline trust chips (`Documented`, `Oral`, `Inferred`, `Verified` per claim) embedded in body prose — `context/product/mvp-scope.md` M6 states: "No further public trust labels at MVP." The single page-level `VerifiedIndicator` plus `HonestGap` in prose replace the per-claim chip system.
- Verification log with multiple signatures, MOU references, photographer credits — these are aspirational. MVP has a single sign-off state, surfaced via `VerifiedIndicator` and `SourcesBlock` only.
- Hero meta-rows with `Entry tier`, `Languages`, `Country` chips — `site-design-brief.md` itself flags these as not for hero chrome.

The prototype remains useful as a visual reference. It is not the build target for MVP.

## Glossary

- **Free entry** — public discovery page for an event or craft. Source-backed where possible, may have gaps, not institutionally signed off.
- **Culture Pack** — paid, institutionally signed-off version of an event or craft entry. Public on the site but the term "Culture Pack" is not used as a tourist-facing label. Tourist surfaces show `Verified by {institution}` instead. The word "Culture Pack" appears only on institution-facing surfaces (About for organisers, Contact form intent labels).
- **Entity** — generic term for either an event or a craft. Used when a component behaves the same way regardless of type. **Internal documentation term only — never appears in user-facing copy.**
- **Sign-off owner** — the institution that has reviewed and signed off on a Culture Pack entry.

---

## Group A — Chrome / global

These components appear on every public page (with the exception of Cookie Banner, which appears only on first visit).

### `GlobalHeader`

**Purpose.** Top-level navigation, brand identity, and language switching. Always visible at the top of every page.

**Used on.** Every public page.

**Data inputs.**
- Current locale (e.g., `en`, `th`)
- Active nav item (for highlight)

**States.**
- `default` (desktop) — horizontal nav with logo + nav links + language switcher
- `mobile-collapsed` — logo + hamburger icon
- `mobile-expanded` — drawer is open (see `MobileDrawer` below as part of this component)

**Conditional logic.**
- Switches to mobile layout below 768px viewport
- Hamburger icon appears only on mobile; horizontal nav appears only on desktop

**Behavior.**
- Logo → links to `/` (home)
- Nav links → navigate to respective sections
- Hamburger (mobile) → opens drawer with same links + language switcher + Contact CTA
- Drawer close button or overlay tap → closes drawer

**Accessibility.**
- Drawer is keyboard-accessible (Esc closes, focus trap inside)
- Active nav item must have visible state beyond colour alone (also weight or underline) for users with colour-perception differences
- Logo is a link (`<a>` element), not just an image, so screen readers announce it as navigable
- Skip-to-content link should be the first focusable element for keyboard users

**Notes.**
- The header is sticky on desktop only — does not stick on mobile (saves vertical space)

---

### `GlobalFooter`

**Purpose.** Persistent footer with secondary navigation, brand line, and organiser entry routes. Appears at the bottom of every page.

**Used on.** Every public page.

**Data inputs.** None (static content, multilingual).

**States.**
- `default` — full four-column layout (desktop)
- `mobile-stacked` — columns stack vertically on mobile

**Conditional logic.** Layout switch at 768px.

**Behavior.**
- Browse column links → Events Directory, Crafts Directory
- Learn column links → About, How BaanStory works (if S8 ships), Sources & checks page (if exists)
- For organisers column links → all route into `ContactForm` with user-facing intent prefilled (`organiser_event`, `organiser_craft`, `update`, `send_source`, `partner`). See `ContactForm` for intent details.
- Legal column links → Privacy, Terms, Cookies pages
- All links open in same tab

**Accessibility.**
- Footer is wrapped in `<footer>` landmark
- Each column has a heading (h2 or appropriate level)
- Link list per column is in a `<nav>` with appropriate label

**Notes.**
- Even if About / How BaanStory works / Legal pages are not yet built (S8, S9 in `context/product/mvp-scope.md`), the footer still shows the links. Until pages exist, links may be hidden or routed to a placeholder; this is a build decision, not a copy decision.
- The "For organisers" column is the canonical cold-discovery entry for institutions who landed on the site without seeing their own event first.

---

### `LanguageSwitcher`

**Purpose.** Let the user switch the interface language.

**Used on.** Inside `GlobalHeader` (desktop nav and mobile drawer).

**Data inputs.**
- Current locale
- List of available locales for this page (some pages may exist in only one language)

**States.**
- `default` — shows current locale label (e.g., `EN`)
- `open` — dropdown is open, all available locales listed
- `unavailable` — when the current page is not available in any other language than the one shown, the switcher is either hidden or shown disabled

**Conditional logic.**
- If only one locale exists for this page, the switcher does not render (or renders disabled with a tooltip explaining why)
- "Available locales" is determined per-page, not globally — a page may be in EN+TH while another page is in EN only

**Behavior.**
- Click on switcher → opens dropdown
- Click on locale → switches language, navigates to localised version of current page
- Click outside → closes dropdown
- After switch, page reloads in new locale; if the new locale version doesn't exist for this page (race condition), fallback to home in the new locale

**Accessibility.**
- Keyboard accessible: arrow keys to navigate options, Enter to select, Esc to close
- Trigger button uses `aria-haspopup="listbox"` and `aria-expanded`
- Open state announces to screen readers

**Notes.**
- Switching language should preserve scroll position where possible
- The switcher does not switch the user's content preferences globally — only the current page. (For MVP, locale is per-page state, not session state. If session-wide locale is needed later, that's a future addition.)

---

### `MobileDrawer`

**Purpose.** Mobile menu drawer that contains all nav links, language switcher, and a Contact CTA. Triggered by the hamburger in `GlobalHeader`.

**Used on.** Mobile viewports only, on every public page (via `GlobalHeader`).

**Data inputs.** Same as `GlobalHeader` (current locale, active nav).

**States.**
- `closed` — drawer is hidden, hamburger is visible
- `open` — drawer is visible, overlay dims the page underneath
- `closing` — transient animation state

**Conditional logic.** Only renders on mobile viewports (below 768px).

**Behavior.**
- Hamburger tap → opens drawer
- Close button (×) tap, overlay tap, Esc key, or back gesture → closes drawer
- When open, body scroll is locked
- Tapping a nav link both navigates and closes the drawer

**Accessibility.**
- Focus is trapped inside drawer when open; focus returns to hamburger when closed
- Drawer is announced as a dialog (`role="dialog"`, `aria-modal="true"`)
- Drawer has an accessible name via `aria-labelledby`

**Notes.**
- Drawer should slide in from a side (typically right), not appear as a full-screen modal — this preserves the user's sense of context
- The drawer must include the Contact CTA explicitly (separate from regular nav), because Contact is the canonical action route for both tourists (corrections) and institutions (claim path)

---

### `CookieBanner`

**Purpose.** Inform the user about cookie / analytics use and capture their preference. Required for production launch where analytics are deployed.

**Used on.** Every public page on first visit (until user accepts or declines).

**Data inputs.**
- Whether the user has previously responded (persisted in localStorage or cookie)

**States.**
- `shown` — banner is visible (first visit, or no prior response)
- `dismissed` — banner is hidden (user accepted or declined)

**Conditional logic.**
- Banner appears only if no prior response is stored
- After acceptance or decline, banner does not reappear (unless user clears storage)

**Behavior.**
- `Accept` button → stores acceptance, hides banner, analytics initialise
- `Decline` button → stores decline, hides banner, analytics do not initialise
- `Customise` button → only shows if real granular settings exist (in MVP, it does not)
- Banner does not block interaction with the page — it sits at the bottom or top in a non-intrusive way

**Notes.**
- MVP uses simple binary accept/decline (no per-cookie customisation)
- The banner copy must comply with PDPA (Thailand) baseline — see `ContactForm` notes below and legal/privacy copy in `copy-deck.md`
- This component depends on having an actual `/privacy` page to link to

---

### `Toast`

**Purpose.** Show transient, low-priority feedback after a user action (link copied, language switched, form submitted, etc.).

**Used on.** Any page that triggers a confirmable action.

**Data inputs.**
- Message string
- Optional dismiss timeout (default 4 seconds)
- Optional severity (`success` is default; `error` for failures)

**States.**
- `hidden` — no toast visible
- `visible` — toast is showing
- `dismissing` — fade-out animation

**Conditional logic.**
- Multiple toasts queue rather than overlap
- Errors persist longer than successes (default error timeout: 8 seconds)

**Behavior.**
- Appears via slide / fade animation
- Auto-dismisses after timeout
- User can manually dismiss with a close button or by swiping (mobile)

**Accessibility.**
- Toast is announced to screen readers via ARIA live region (`role="status"` for info, `role="alert"` for errors)
- Auto-dismiss timeout must be long enough for screen reader users to hear the announcement (minimum 4 seconds, errors longer)
- Toast must not steal focus

**Notes.**
- Toasts are for confirmation only, never for critical information. If the user must see it, use an inline message or a banner, not a toast.
- Position: typically bottom-centre on mobile, bottom-right on desktop. The exact placement is a design call.

---

### `Breadcrumbs`

**Purpose.** Show the user's location in the site hierarchy and provide quick back-navigation.

**Used on.** Event Card, Craft Card. Not on Home, Directories, About, Contact.

**Data inputs.**
- Ordered list of ancestors (label + URL each)
- Current page label (not linkified)

**States.**
- `default` — shows full trail
- `truncated` (mobile) — shows only first + last segment with `…` between, if total length exceeds viewport

**Conditional logic.**
- Hidden on top-level pages (Home, Directories, About, Contact)
- Truncates on narrow viewports

**Behavior.**
- Each segment is a link except the last (current page)
- Clicking a segment navigates to that ancestor

**Accessibility.**
- Wrapped in `<nav aria-label="Breadcrumb">`
- Uses ordered list (`<ol>`) for semantic structure
- Current page marked with `aria-current="page"`

**Notes.**
- Breadcrumbs should be quiet, not loud — small text, muted colour, above the hero
- Pattern: `Events › North › Chiang Mai › Bo Sang Umbrella Festival`

---

## Group B — Trust & state

These components communicate trust, provenance, lifecycle, and missing data — the things that make BaanStory not a travel blog.

### `VerifiedIndicator`

**Purpose.** Show that the current entity has been institutionally signed off as a Culture Pack. Displays the name of the sign-off institution.

**Used on.**
- Event Card (hero)
- Craft Card (hero)
- `EntityCardPreview` (when entity is a Culture Pack) — in Events Directory, Crafts Directory, Home listings
- Link preview metadata (og:description, when applicable)

**Data inputs.**
- Sign-off institution name
- Optional: last verified date

**States.**
- `verified` — indicator is shown with institution name
- `not-shown` — entity is a free entry; indicator does not render at all (no visible "unverified" badge — free entries do not need to apologise)

**Conditional logic.**
- Renders only when entity has `culture_pack: true` and `sign_off_institution` is set
- Does not render on free entries — absence is the signal, not a negative label

**Behavior.**
- Static display in most contexts (hero, card)
- Optional: hover/tap reveals a tooltip with last verified date and a link to Sources & checks block on the same page

**Accessibility.**
- Indicator carries an accessible label combining state and institution name (e.g., "Verified by Bo Sang Festival Committee")
- Not purely conveyed by colour or icon — text label is essential
- If tooltip is used, it must be keyboard-accessible (visible on focus, not only hover)

**Notes.**
- Never reads as a claim of objective truth — the indicator means "this institution stands behind this page," not "every fact is independently certified"
- The word "Culture Pack" does not appear in this indicator — tourist surfaces use "Verified by {institution}" only

---

### `LifecycleBadge`

**Purpose.** Show the temporal state of an event (events with dates only). Quiet visual marker.

**Used on.**
- Event Card (hero, near date)
- `EntityCardPreview` for events (in Events Directory, Home listings)
- Not on Craft Card (crafts are timeless)

**Data inputs.**
- Lifecycle state: `upcoming`, `past`, or `cancelled`
- Event date (for context)

**States.**
- `upcoming` — quiet, low-key (default state — most events shown are upcoming)
- `past` — visible, neutral colour, communicates "this has already happened"
- `cancelled` — visible, warning colour, communicates "this will not happen"

**Conditional logic.**
- `upcoming` shown when event date is in the future
- `past` shown when event date is in the past (event ended)
- `cancelled` shown when the entity explicitly carries a cancelled state, regardless of date
- For Craft Card, this component never renders (crafts have no lifecycle in this sense)

**Behavior.**
- Static badge, no interaction
- Pairs with `LifecycleBanner` on Event Card (banner is the louder version for past/cancelled; badge is the quieter version everywhere)

**Accessibility.**
- State is conveyed by text label, not only colour (e.g., `Past`, `Cancelled`)
- Cancelled state uses both colour and an icon or strong wording to ensure it is not missed

**Notes.**
- For `upcoming`, the badge may be omitted from the hero if the date itself already communicates this clearly. The badge is most useful on listing previews where the date might be hard to scan.
- Crafts in MVP are treated as timeless. Some crafts have seasonal rhythm (rice harvest, monsoon weaving) but the MVP does not model this as a lifecycle. If seasonal data exists, it appears as context inside the Craft Card body, not as a badge.

---

### `LifecycleBanner`

**Purpose.** When a user arrives at an Event Card whose event has passed or been cancelled, make this immediately clear above the fold — typically because the user followed an old shared link.

**Used on.** Event Card only (full page, not preview).

**Data inputs.**
- Lifecycle state (`past` or `cancelled`)
- Event date that was held
- Optional: link to a newer edition (e.g., 2027 edition of an annual event)
- Optional: cancellation source and date

**States.**
- `not-shown` — event is upcoming, no banner
- `past` — event has ended (banner shown with date and optional newer-edition link)
- `cancelled` — event was cancelled (banner shown with date and source)

**Conditional logic.**
- Renders only when lifecycle state is `past` or `cancelled`
- Sits above the hero, full-width, can be dismissed but reappears on reload

**Behavior.**
- Static banner with informational copy
- If a newer edition exists, banner contains a CTA linking to it
- Dismiss button hides for current session only

**Accessibility.**
- Banner uses `role="status"` or appropriate landmark
- Critical state (Cancelled) is announced clearly, not only visually

**Notes.**
- The banner is louder than `LifecycleBadge`. The user must not miss it — they may be planning travel against an outdated link.
- For annual events, the system should automatically detect when an entry is past and prompt the editor (via internal tooling) to create the next edition. This is a backend concern; from the component's perspective, it just renders based on the entity's lifecycle state.

---

### `SourceAttribution`

**Purpose.** On free entries, show the user where the data originally came from (M-Culture, Cultural Map Thailand, ThailandFestival, etc.) and when it was last refreshed.

**Used on.**
- Event Card (free entry only — sits in the position where `VerifiedIndicator` appears on Culture Pack entries)
- Craft Card (free entry only)
- Optionally in `EntityCardPreview` (free entries) — as a quiet meta line

**Data inputs.**
- Source name (e.g., "M-Culture event API")
- Last refreshed date

**States.**
- `default` — quiet meta line
- `multi-source` — entity has multiple source references; component lists them or links to Sources & checks for the full list

**Conditional logic.**
- Renders on free entries only
- On Culture Pack entries, `VerifiedIndicator` replaces this component in the hero; source attribution is still available in the `SourcesBlock` lower on the page

**Behavior.**
- Quiet text, not interactive in MVP
- Optional future enhancement: link from source name to source documentation

**Notes.**
- Pattern of meaning: "This page exists because we pulled it from {source}. We didn't write this from scratch."
- This is part of how free entries earn trust without paying for it — by being transparent about origin.

---

### `HonestGap`

**Purpose.** Replace empty fields, placeholders (`—`, `N/A`, `Unknown`), and uncertain data with plain-language explanations and next steps.

**Used on.**
- Inline within `PlanYourVisit` on Event Card
- Inline within Craft Card detail sections (Where to find, etc.)
- Anywhere a critical field is missing or conflicting

**Data inputs.**
- Field name (e.g., "Hours", "Exact venue")
- Gap type (`missing`, `conflicting`, `pending verification`, `unknown`)
- Optional: next step CTA (e.g., "Check source", "Submit correction")

**States.**
- `missing` — field has no data, gap shown with explanation
- `conflicting` — sources disagree, gap shown with note about disagreement
- `pending` — data was promised but not yet supplied (e.g., institution agreed to verify but hasn't yet)

**Conditional logic.**
- Only renders for **critical** fields. Non-critical missing fields are simply hidden.
- "Critical" is content-defined — for an Event Card, date/location/hours are critical; for a Craft Card, region/material are critical.

**Behavior.**
- Most gaps are static text
- Some gaps include an inline CTA — e.g., "Check source" links to the source URL, "Submit correction" routes into `ContactForm` with `intent=correction&page={current_url}`

**Notes.**
- This component is the operational expression of `context/product/mvp-scope.md` M6 ("Honest gaps in factual content")
- Tone is direct and useful, not apologetic. "Hours not confirmed. Check the organiser source before going." — not "We're sorry, hours are not available at this time."

---

### `SourcesBlock`

**Purpose.** A dedicated section that lists sources checked, known gaps, conflicts, and the correction route. Provides full provenance without making the main UI noisy.

**Used on.**
- Event Card (lower section)
- Craft Card (lower section)
- Linkable from `SourceAttribution`, `HonestGap`, and from About page

**Data inputs.**
- List of sources (each: type, name, checked date)
- List of known gaps (each: short description)
- Optional: list of conflicts (where multiple sources disagree)
- Correction CTA link (always present — routes into `ContactForm` with `intent=correction`)

**States.**
- `default` — sources + gaps + correction CTA
- `culture-pack` — additionally shows institutional sign-off info (which institution, when signed off, what was reviewed)
- `sparse` — when only one source exists and no gaps are known, the block is short

**Conditional logic.**
- Always renders on Event Card and Craft Card (even if sparse)
- Culture Pack entries include sign-off detail; free entries do not

**Behavior.**
- Sources are listed as text lines, not links (unless source is a public URL worth linking)
- Gaps are listed as text bullets
- Correction CTA is a button or visible link

**Notes.**
- This is the transparency surface. The honest spirit of the product lives here.
- Sign-off information here complements but does not replace `VerifiedIndicator` in the hero. The hero indicator is the badge; this block is the full record.

---

### `NetworkError`

**Purpose.** Show the user that something failed and offer retry. Used for any data-fetch or action failure.

**Used on.** Any page or component that loads data dynamically — Directories on filter, ContactForm on submit, etc.

**Data inputs.**
- Optional: error context (e.g., "loading events", "submitting form")
- Optional: retry callback

**States.**
- `inline` — error appears inline within a component (e.g., Directory failed to load events → error appears in Directory body)
- `blocking` — error replaces the page content entirely (e.g., a critical resource failed)

**Conditional logic.**
- `inline` is the default for most cases
- `blocking` only for true page failure

**Behavior.**
- Shows a brief error message
- Shows a `Retry` button when a retry is meaningful
- Form errors do not destroy form state — user's input is preserved

**Notes.**
- Never expose technical detail (stack traces, status codes) to the user
- For ContactForm specifically, a fallback contact email should be visible if the form keeps failing

---

## Group C — Content & interactive

These are the components that carry actual content — entities, moments, terms, claim routes.

### `EntityImage`

**Purpose.** Display a photo of an event or craft, with a graceful fallback to an editorial placeholder (material swatch, pattern crop, neutral diagram) when no verified photo exists. Used in hero areas and previews.

**Used on.**
- Event Card hero
- Craft Card hero
- `EntityCardPreview` (when image is available or when Culture Pack)

**Data inputs.**
- Image URL (if available)
- Alt text (descriptive, not generic)
- Optional: image attribution (photographer / source / licence)
- Fallback type: `material-swatch`, `pattern-crop`, `neutral-diagram`, or `text-led` (when no visual fallback is appropriate)

**States.**
- `verified-photo` — image is from a verified source (Culture Pack institution-supplied or source-confirmed) and renders normally
- `placeholder` — no verified photo available; renders an editorial placeholder
- `loading` — image is fetching; placeholder or skeleton shown
- `error` — image failed to load; falls back to placeholder

**Conditional logic.**
- Culture Pack entries should have verified photos in most cases
- Free entries may have placeholders by default — the canon explicitly avoids stock photos and unverified imagery
- When placeholder is shown, no apology copy ("Photograph withheld pending verification") — the placeholder simply is the image

**Behavior.**
- Image loads lazily (below-the-fold images don't block initial render)
- Click behaviour depends on context: in hero, optional lightbox; in preview, the whole card click takes over

**Accessibility.**
- Alt text is descriptive ("From beneath a four-metre saa-paper umbrella, mid-painting"), not generic ("photo of umbrella")
- Decorative placeholders use `alt=""` so screen readers skip them
- Attribution caption (photographer credit) is part of the visible figure, associated via `<figure>` + `<figcaption>` semantics

**Notes.**
- The canon (`context/current-frame.md` + `site-design-brief.md`) is explicit: no stock photos, no travel-atmosphere imagery. When no real photo exists, use a placeholder that teaches something (a pattern, a material swatch, a structural diagram).
- This component does not handle photo upload — photos arrive via off-site material handover after first contact and are added by BaanStory team.

---

### `EntityCardPreview`

**Purpose.** Compact preview of an event or a craft for display in listings, directories, related-content blocks, and on Home. One component handles both events and crafts via a `type` parameter — the underlying data and structure are similar enough.

**Used on.**
- Events Directory (event list)
- Crafts Directory (craft list)
- Home (Upcoming events section, Essential crafts section)
- Event Card → Regional crafts to know (uses craft preview)
- Craft Card → Events featuring this craft / Where this culture appears (uses event preview)

**Data inputs.**
- Entity type: `event` or `craft`
- Title
- Thai name (optional)
- For events: date, place, lifecycle state
- For crafts: region, material, technique
- One-line value statement
- Optional: 2-3 cues (concrete things to notice)
- Optional: photo or material/pattern placeholder
- `culture_pack: true | false` flag
- `sign_off_institution` (if culture_pack)
- Source attribution (if free)

**States.**
- `free` — basic structure: title, key meta, one-line value, source attribution. May omit cues if not available.
- `culture-pack` — fuller structure: title, key meta, one-line value, 2-3 cues, `VerifiedIndicator`, optional photo. Visually richer.
- `past-event` (events only) — shows `LifecycleBadge` in past state
- `cancelled-event` (events only) — shows `LifecycleBadge` in cancelled state
- `loading` — skeleton placeholder while data is fetching (used in listings during search / filter)

**Conditional logic.**
- Culture Pack vs free is the primary visual differentiation. The differentiation works on two layers, used together:
    - **Content layer** — Culture Pack previews carry more content (cues, attribution, photo). Free previews are leaner.
    - **Visual layer** — Culture Pack previews carry a visual treatment (border, accent, kicker, or similar) that distinguishes them from free at preview level
- A glance at a listing must show which entries are "fuller / institution-backed" and which are "in discovery preview" — that signal comes from both layers acting together
- Past/cancelled events still render in listings (Directory) but with appropriate badge; they are not hidden

**Behavior.**
- Whole card is clickable, navigates to the full Event Card or Craft Card
- Hover state (desktop) — subtle elevation or border change

**Accessibility.**
- Card is focusable and keyboard-activatable (Enter to open)
- The clickable area is wrapped in a single `<a>` (rather than nested links) so screen readers announce it as one navigable item
- Image (if present) has descriptive alt text; decorative placeholders have empty alt (`alt=""`)
- Loading skeleton is announced as busy state via `aria-busy="true"` on the container

**Notes.**
- Internally, this is one component with a `type` discriminator. Externally, it appears as "event card" or "craft card" in user-facing language. The unification is a code/maintenance choice, not a user-facing concept.
- The cues are short factual hooks, not marketing — e.g., "Look for the soft ikat blur" not "An unforgettable cultural experience."
- Free entry previews should not look broken or apologetic — they should look like credible discovery previews. The Culture Pack preview looks richer, but the free preview is still a complete, presentable preview.

---

### `MomentCard`

**Purpose.** One unit of "what to notice" — a specific, concrete thing the visitor can look for, ask, or check on site. Used in the Moment Set.

**Used on.**
- Event Card (`What to notice` section)
- Craft Card (`What to notice` section)
- Home (`Start with one thing to notice` learning strip, if shipped)

**Data inputs.**
- Moment title (3-7 words)
- One concrete observation, action, or question (one sentence)
- Optional expanded body (2-5 sentences)
- Optional: glossary term link
- Optional: `Ask:` prompt
- Optional: source note
- Optional: image or pattern crop

**States.**
- `collapsed` — title + one concrete sentence. Must be useful on its own.
- `expanded` — adds body, glossary, Ask prompt, source note
- `static` (Home learning strip) — typically collapsed only, no expansion

**Conditional logic.**
- Expansion is per-card, not page-wide
- A moment that cannot be useful when collapsed is not ready and should be omitted (not shown half-built)
- Image is optional — moments must work without images

**Behavior.**
- Tap or click on collapsed card → expands
- Tap on expanded → collapses
- Multiple cards can be expanded at once (no accordion lockstep)

**Accessibility.**
- Card uses `<button>` semantics for the toggle (not a `<div>` with click handler)
- `aria-expanded` reflects current state
- Expanded content has a unique id referenced from `aria-controls`
- Keyboard: Enter/Space toggles when card is focused

**Notes.**
- Collapsed card is the contract: it must teach something on its own. Expansion is a bonus.
- Tone: concrete, observational, non-marketing. "Count the umbrella ribs" not "Marvel at the artistry."
- Source-backed only. If there isn't source material for a moment, the card is omitted.

---

### `Term`

**Purpose.** Inline Thai or local term with native script and romanisation, used in hero titles and body text.

**Used on.**
- Event Card hero (Thai event name under the English title)
- Craft Card hero (Thai craft name)
- Body prose anywhere a Thai term appears for the first time
- Home (learning strip can include term components)

**Data inputs.**
- English or romanised form
- Thai script (with `lang="th"` attribute)
- Romanisation (with IPA-like markers if appropriate)
- Optional: short gloss / translation
- Optional: glossary link target

**States.**
- `inline` — appears within prose, minimal formatting
- `block` — appears as a structured heading (e.g., under hero title)
- `with-tooltip` — gloss appears on hover (desktop) or tap (mobile)

**Conditional logic.**
- First appearance of a term on a page uses block or inline-with-gloss
- Subsequent appearances may use just the English form

**Behavior.**
- Tooltip or popover for definition — optional, depending on context

**Accessibility.**
- Thai script is wrapped with `lang="th"` so screen readers switch language
- Romanisation may be hidden from screen readers (`aria-hidden="true"`) if the screen reader is already reading the Thai correctly — otherwise both are announced and the result is jarring
- Tooltip / popover is keyboard-accessible (visible on focus, not only hover)

**Notes.**
- Thai script must always be in proper Unicode, never transliterated
- Romanisation style should be consistent across the site (one chosen system, applied throughout)
- The component supports both formal romanisation (with diacritics like `têet-sà-gaan rôm bɔ̀ɔ sâang`) and lighter romanisation depending on context

---

### `Phrase`

**Purpose.** Block component for a useful spoken phrase — a phrase the visitor could actually say at the event or place. Includes English meaning, Thai script, and romanisation.

**Used on.**
- Event Card (`Visit preparation` section, `Useful phrase` sub-block)
- Craft Card (similar context if relevant)

**Data inputs.**
- English meaning (in quotes — "May I look?")
- Thai script (`lang="th"`)
- Romanisation
- Optional: usage hint (when to say it, how to say it, etiquette around it)
- Optional: audio file (future — S3 in `context/product/mvp-scope.md`)

**States.**
- `default` — text only
- `with-audio` (future) — adds play button

**Conditional logic.**
- Only included when there is actually a culturally relevant phrase. Not every event needs one.
- Audio is opt-in per phrase

**Behavior.**
- Static display in MVP
- Future: tap on phrase or play button → plays audio

**Accessibility.**
- Thai script wrapped with `lang="th"`, romanisation with `lang="th-Latn"`
- Phrase is structured as a definition list or clearly labelled group so screen readers can navigate language layers
- Audio (when added) has accessible controls and a text alternative

**Notes.**
- A phrase is more than a translation — it's a real, situational phrase, with hint about when to use it ("Said softly at the threshold of a workshop, before stepping inside")
- Avoid phrases that are too touristy ("Hello, how are you") — focus on phrases tied to the experience

---

### `ClaimCTA`

**Purpose.** On free entries, give the institution that organises this event (or represents this craft) a visible, low-friction route to claim the page and start the verification workflow. On Culture Pack entries, this component transforms into a "Verified by + Request update" block.

**Used on.**
- Event Card (lower section, near Sources & checks)
- Craft Card (lower section, near Sources & checks)

**Data inputs.**
- Whether the entity is currently a Culture Pack or free entry
- If Culture Pack: sign-off institution name, last verified date

**States.**
- `free` — "Are you the organiser?" block with Contact CTA
- `culture-pack` — "Verified by {institution}" block with "Request an update" link
- `claim-pending` — if a claim has been submitted but not yet processed (future state, may not ship in MVP)

**Conditional logic.**
- Renders on every Event Card and Craft Card
- Free vs Culture Pack determines which version shows

**Behavior.**
- Free state: button or link routes to `ContactForm` with appropriate user-facing intent prefilled (`organiser_event` for events, `organiser_craft` for crafts) and `page={current_url}` so the backend can route the submission as a claim
- Culture Pack state: "Request an update" link routes to `ContactForm` with `intent=update&page={current_url}`

**Notes.**
- This is the canonical institution entry route from a specific page. Without this, claim path (M13) and update workflow (M16) have no visible entry.
- Tone is direct, not salesy — "Are you the organiser?" is the spec wording, not "Promote your event with us"

---

### `DistributionAssetsBlock`

**Purpose.** Surface the distribution actions (Share, Add to calendar, Download PDF, Show QR) for an entity. Different actions are available depending on whether the entity is a Culture Pack or free entry.

**Used on.**
- Event Card (sidebar or below hero)
- Craft Card (same position)

**Data inputs.**
- Entity URL
- Entity title
- For events: date, location (for calendar export)
- `culture_pack: true | false` flag
- For Culture Pack: PDF URL, QR code data

**States.**
- `free` — only `ShareAction` is available; calendar is available for events with dates
- `culture-pack` — Share + Add to calendar (if event) + Download PDF + Show QR

**Conditional logic.**
- `AddToCalendarAction` only renders when entity is an event with a date
- `DownloadPDFAction` and `ShowQRAction` only render when entity is a Culture Pack
- `ShareAction` always renders

**Behavior.**
- Each sub-action behaves per its own component (see `ShareAction`, `AddToCalendarAction` below)
- PDF download triggers a file download
- Show QR opens a modal or popover with the QR code image (large enough to scan from another device or to screenshot for printing)

**Notes.**
- This is the visible part of `context/product/mvp-scope.md` M15 (Distribution assets) on the public site
- Free entries deliberately have fewer distribution actions — this is part of the differentiation between free and Culture Pack
- The PDF and QR are pre-generated by BaanStory's internal tooling, not generated on the fly client-side

---

## Group D — Form & action

### `ContactForm`

**Purpose.** Single, intent-routed contact form. Captures structured first contact from tourists (corrections) and institutions (claim, create, update, partner, send source, general). Routes to an internal inbox.

**Used on.** `/contact` page only. Reachable from `GlobalFooter`, `ClaimCTA`, "Submit correction" links in `SourcesBlock`, and direct URL.

**Data inputs (URL parameters).**
- Optional: `intent` (prefills dropdown — one of `organiser_event`, `organiser_craft`, `update`, `correction`, `partner`, `send_source`, or unset for `general`)
- Optional: `page` (prefills "Page URL on BaanStory" field — used by claim and correction routes)

**Fields.** Universal fields plus intent-specific fields. Summary:
- Universal: intent, name, email, message
- For `organiser_event` / `organiser_craft`: institution name, role, link to website/social, optional page URL
- For `update`: institution name, page URL, what changed
- For `correction`: page URL, what's wrong, optional "how do you know"
- For `partner`: organisation name, organisation type, what you're hoping to do
- For `send_source`: link to source, optional why
- For `general`: only universal

**User-facing to backend intent mapping.**

| User-facing intent | Backend intent | When |
|---|---|---|
| `organiser_event` | `verify_event` | Page URL is present |
| `organiser_event` | `create_new` | Page URL is absent |
| `organiser_craft` | `verify_craft` | Page URL is present |
| `organiser_craft` | `create_new` | Page URL is absent |
| `update` | `update` | Always |
| `correction` | `correction` | Always |
| `partner` | `partner` | Always |
| `send_source` | `send_source` | Always |
| `general` | `general` | Always |

**States.**
- `idle` — form is empty or partially filled, no submission attempted
- `validating` — client-side validation runs on submit
- `validation-error` — inline errors on offending fields, form not submitted
- `submitting` — submit button shows loading state
- `submission-success` — form replaced with confirmation message
- `submission-error` — error state with retry; form state preserved

**Conditional logic.**
- Intent dropdown is the first field; selecting an intent reshapes the field set below
- Changing intent preserves data in fields that exist in both (name, email, message)
- Consent checkbox is required for submission (PDPA)
- Page URL field is pre-filled if URL has `page` parameter, otherwise hidden or empty depending on intent

**Behavior.**
- Submit: client validation → POST to server → server validation → email sent to operational inbox → success response → success state shown
- On server error: error state with retry; form state preserved
- Honeypot field present, invisible; submissions with honeypot filled are silently rejected (user sees success state to not tip off bots)
- IP rate limit: 5/hour per IP server-side
- Origin check server-side
- For organiser submissions mapped to `verify_event` / `verify_craft`, an additional internal verification step happens off-form
- For `update` submissions where the institution name doesn't match the sign-off owner on file, the submission email subject is flagged `MISMATCH`; the user sees standard success state

**Accessibility.**
- Each field has an associated `<label>` (not placeholder-only)
- Required fields marked with both `required` attribute and visible indicator
- Validation errors are programmatically associated with their fields via `aria-describedby`
- Validation errors are announced to screen readers (via ARIA live region or focus management to the first error)
- Submit button has loading state announced (`aria-busy="true"` or dynamic label change)
- Honeypot field is hidden from visual users AND from assistive tech via `aria-hidden="true"` plus tab-index removal, so screen reader users don't accidentally fill it
- Success state moves focus to the success message so it's announced
- Server error message is in a live region (`role="alert"`)

**Notes.**
- The operational details include anti-spam, privacy, fake-claim protection, and update-mismatch handling
- No file upload in MVP — material handover happens off-site via email after first contact
- No payment surface — commercial agreement is off-site

---

### `SearchBar`

**Purpose.** Free-text search input for Directories. Allows cultural queries (lanterns, silk, water festival) not just exact names.

**Used on.**
- Events Directory
- Crafts Directory

**Data inputs.**
- Current search query (controlled component)
- Search examples to show as placeholder hint

**States.**
- `empty` — placeholder visible
- `typing` — user is entering query
- `with-query` — query is set, results are filtered
- `cleared` — explicit clear via × button or `EmptyState` action
- `searching` — debounce window or fetch in flight; results area shows loading skeleton

**Conditional logic.**
- Results update live (debounced) as user types
- Empty query shows all entries in the directory

**Behavior.**
- Typing updates results with a debounce (~250ms)
- × button clears the input and resets the result list
- Esc clears query
- Enter key has no special behavior (search is live)
- Search is plain text matching against indexed fields (title, region, material, theme, Thai name)

**Accessibility.**
- Input has an associated label (visible or via `aria-label`)
- Result count updates announced via live region (`aria-live="polite"`) so screen reader users hear "12 events match" after filtering
- Clear button has accessible name (`aria-label="Clear search"`)

**Notes.**
- Search examples (`Try: lanterns, silk, water festival, temple fair, Mor Lam`) appear as placeholder copy or as a hint below the input
- No autocomplete in MVP — that's a nice-to-have, not a must

---

### `FilterGroup`

**Purpose.** Faceted filter for Directories — multiple axes (When / Where / What to see in events; Region / Material in crafts).

**Used on.**
- Events Directory (When, Where, What to see)
- Crafts Directory (Region, Material)

**Data inputs.**
- Axis name
- List of options (each: label, value, count)
- Currently selected option(s) — single-select or multi-select depending on axis

**States.**
- `collapsed` (mobile) — group is hidden behind a label; expands on tap
- `expanded` — options visible
- `active` — at least one filter on this axis is selected; selected count is visible

**Conditional logic.**
- Each axis is independent
- Selecting an option immediately filters results (no apply button)
- Filter availability may depend on context — e.g., "When: This month" only makes sense in Events Directory

**Behavior.**
- Tap/click on option → toggles selection
- Selected options accumulate in an "Active filters" summary above the list
- "Clear filters" action removes all selections
- Filter state may be persisted in URL query parameters so the user can share / bookmark a filtered view

**Accessibility.**
- Each axis is a group with a heading; options inside are properly grouped (e.g., `<fieldset>` + `<legend>` or `role="group"` + `aria-labelledby`)
- Options are keyboard navigable
- Selected state announced via `aria-pressed` (for toggle buttons) or `aria-checked` (for checkbox-style options)
- "Active filters" summary in a live region so changes are announced

**Notes.**
- Filters are S6/S7 in `context/product/mvp-scope.md` (Should, not Must). For the first MVP release, Directories may ship without filters and rely on month-grouping and search alone.
- If filters ship, "Verified only" must not be the primary discovery axis — verification is trust support, not a browsing pattern

---

### `EmptyState`

**Purpose.** Show useful guidance when a list, search, or filter has no results. Never a dead end — always offer an alternative action.

**Used on.**
- Events Directory (when no events match filters or search)
- Crafts Directory (same)
- 404 page (uses a variant of this pattern)
- Any list that can be empty (e.g., Regional crafts when no crafts link to the region)

**Data inputs.**
- Context (which list is empty)
- Suggested alternatives (one or more)

**States.**
- `no-results` — search/filter returned nothing
- `not-yet-indexed` — no content exists yet (early MVP for some categories)
- `error-fallback` — when data load fails, shows alternative paths

**Conditional logic.**
- Replaces the list area when the list would otherwise be empty
- Does not replace filters or search — those stay visible so the user can adjust

**Behavior.**
- Static informational text
- One or more action buttons (e.g., "Clear filters", "Browse all crafts", "Submit an event source")

**Notes.**
- The tone is helpful, not apologetic
- The alternative actions should be specific — "Try another month" is better than "Try again"

---

### `ShareAction`

**Purpose.** Let the user share the current page via the device's native share mechanism, with a fallback to copy-link.

**Used on.** Inside `DistributionAssetsBlock` on Event Card and Craft Card.

**Data inputs.**
- Page URL
- Page title
- Optional short description (one-line value statement)

**States.**
- `available` — Web Share API is available, native sheet opens
- `fallback` — Web Share API unavailable, click copies link to clipboard and shows Toast confirmation

**Conditional logic.**
- Behavior detected at runtime
- Native sheet preferred where available (mobile, some desktops)

**Behavior.**
- Click → invokes `navigator.share()` with title and URL
- If unavailable: copy URL to clipboard, show Toast (`Link copied.`)
- If user cancels native sheet: no toast, no error

**Notes.**
- The shared payload includes title and URL only in MVP. The receiver sees a clean link, and the link preview renders the entity's meta (og:title, og:description) on the platform side.

---

### `AddToCalendarAction`

**Purpose.** Let the user add an event to their calendar — Google Calendar, Apple Calendar, Outlook, or a downloadable .ics file.

**Used on.** Inside `DistributionAssetsBlock` on Event Card. Not on Craft Card (crafts have no date).

**Data inputs.**
- Event title
- Event start date and time (or all-day flag)
- Event end date and time
- Event location (text)
- Page URL (included in description)
- Optional: short description of the event for the calendar entry

**States.**
- `dropdown-closed` — button visible, dropdown closed
- `dropdown-open` — dropdown shows calendar provider options
- `processing` — transient state while .ics is generated or external URL constructed

**Conditional logic.**
- Renders only for events with a confirmed date
- For past or cancelled events, button is hidden (no point adding a past event to calendar)
- For events with unconfirmed date, button is hidden and the gap is communicated via `HonestGap` in `PlanYourVisit`

**Behavior.**
- Click on button → opens dropdown
- Click on Google Calendar option → opens Google's add-event URL in a new tab with prefilled data
- Click on Apple Calendar / Outlook option → similar, with platform-specific URL
- Click on Download .ics → downloads .ics file with event metadata
- Esc / outside click closes dropdown

**Accessibility.**
- Trigger button has `aria-haspopup="menu"` and `aria-expanded` reflecting state
- Dropdown options are keyboard navigable (arrow keys, Enter to select)
- Each option has an accessible label clearly indicating the destination ("Add to Google Calendar", "Download .ics file")
- External links open in new tab — communicated to screen readers via `aria-label` suffix or visible indicator

**Notes.**
- The .ics description includes the event title, location, and a link back to the BaanStory page (so the user can revisit context on the day of the event)
- Provider URLs follow the standard patterns each provider supports for prefilled add-event flows

---

### `DownloadPDFAction`

**Purpose.** Let any user (typically institutions or partner distributors) download the Culture Pack as a PDF for offline use, printing, or attachment.

**Used on.** Inside `DistributionAssetsBlock`, on Culture Pack entries only (Event Card or Craft Card).

**Data inputs.**
- PDF file URL (pre-generated by BaanStory tooling)
- File size (shown alongside button for transparency)

**States.**
- `available` — Culture Pack PDF exists, button is enabled
- `not-available` — entity is free entry, component does not render

**Conditional logic.**
- Renders only when entity is a Culture Pack and a PDF has been generated
- On free entries, the entire button is hidden

**Behavior.**
- Click → triggers download of PDF
- No login required

**Notes.**
- The PDF is generated by BaanStory internal tooling (preview-for-review process + render step), not by the browser
- Showing file size next to the button is good practice — users on mobile data appreciate knowing what they're about to download

---

### `ShowQRAction`

**Purpose.** Let a user (typically an institution at the venue, or anyone wanting to print) display a QR code that links to the entity's stable URL. The QR is useful for physical venue signage, printed handouts, hotel concierge desks.

**Used on.** Inside `DistributionAssetsBlock`, on Culture Pack entries only.

**Data inputs.**
- Entity URL (encoded into the QR)
- Entity title (shown alongside QR)

**States.**
- `closed` — only button visible
- `open` — modal or popover displaying the QR code, large enough to scan or screenshot

**Conditional logic.**
- Renders only on Culture Pack entries
- On free entries, hidden

**Behavior.**
- Click → opens modal/popover with QR
- Modal includes a download button to save the QR as an image (PNG)
- Esc or close button → closes modal

**Accessibility.**
- Modal uses `role="dialog"` with `aria-modal="true"` and accessible name
- Focus moves to modal on open, returns to trigger on close
- Focus is trapped within modal while open
- QR image has alt text describing what it links to ("QR code linking to {entity title} on BaanStory")

**Notes.**
- The QR is generated client-side or via a simple endpoint; it doesn't need to be pre-baked
- The QR encodes the canonical URL only; no tracking parameters embedded in the QR itself

---

## Cross-cutting concerns

Some behaviour applies across many components. Rather than repeating it in every entry, these rules apply unless a specific component entry overrides them.

### Loading states

Any component that fetches data from the network (`EntityCardPreview`, `EntityImage`, lists driven by `SearchBar` or `FilterGroup`, `ContactForm`) supports a loading state. The MVP pattern:

- **Skeleton placeholders** for list / card content while data is fetching. Skeletons should approximate the shape of the loaded content so layout doesn't shift.
- **Loading indicator** on action buttons (`Submit`, `Retry`) while a request is in flight; button is disabled during this state.
- **Containers fetching data** have `aria-busy="true"` set so assistive tech announces the busy state.
- **No global spinners** that block the whole page — loading is local to the component that's loading.

If data fetch takes longer than ~5 seconds, surface an inline message ("Still loading…") so the user doesn't think it's broken.

### Empty / unavailable behaviour

Components that may legitimately have no data follow one rule:
- **Non-critical missing data** → hide the component entirely
- **Critical missing data** → render `HonestGap` in its place

Never render placeholders (`—`, `N/A`, `TBD`, "Coming soon", empty rows).

### Error behaviour

Components that may fail to fetch or submit follow `NetworkError` behavior:
- Inline error within the component (preferred)
- Retry action
- Form state preserved on failure
- No technical detail (status codes, stack traces) exposed to users

### Internationalisation

All text-bearing components render in the locale chosen via `LanguageSwitcher`. The MVP supports Thai and English.

- Thai script is always wrapped with `lang="th"` so screen readers and rendering engines handle it correctly
- Romanisation uses `lang="th-Latn"` where appropriate
- Components that have not yet been translated to a given locale fall back to Thai (the source language) with a small notice — not English, because English fallback would obscure that translation is missing

### Accessibility baseline (applies to all components unless overridden)

- **Keyboard.** All interactive components are reachable and operable via keyboard alone. Tab, Shift-Tab, Enter, Space, Esc, and arrow keys work as users expect.
- **Focus.** Focus is visible (clear outline) on all focusable elements. Custom outlines must meet WCAG contrast ratios. Focus is never hidden by `outline: none` without a replacement.
- **Semantic HTML.** Use the right element for the job. Buttons are `<button>`. Links are `<a>`. Lists are `<ul>` / `<ol>`. Headings are correctly nested (no h2 inside h4).
- **Names and roles.** Every interactive element has an accessible name. Decorative elements have `aria-hidden="true"` or empty alt.
- **Colour is not the only signal.** State (active, selected, error, verified, past) is conveyed via text, icon, or other indicator in addition to colour.
- **Contrast.** Text meets WCAG AA contrast against its background. This is enforced by the design system, not per component.
- **Motion.** Animations respect `prefers-reduced-motion`. No animation is required to understand or operate any component.
- **Forms.** Labels are programmatically associated. Required fields are marked. Errors are announced. Honeypot fields are hidden from assistive tech.
- **Live regions.** Dynamic updates (filter result counts, toasts, form submission status) use ARIA live regions with appropriate politeness levels.
- **Landmarks.** Page sections use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`).

WCAG 2.2 AA is the target. Specific compliance verification happens during build / QA, not at the component-spec level.

### Responsive behaviour

Components adapt between mobile and desktop layouts at a 768px breakpoint by default. Specific components (`GlobalHeader` → `MobileDrawer`, `GlobalFooter` → stacked columns, `FilterGroup` → collapsed groups) define their own responsive behaviour.

Touch targets on mobile are minimum 44×44px per platform guidance.

### State persistence

- Language preference (`LanguageSwitcher`) is persisted in localStorage
- Cookie banner choice is persisted in localStorage
- Filter and search state in Directories is persisted in URL query parameters (so the view is shareable and bookmarkable)
- Form state (`ContactForm`) is not persisted across page reloads in MVP — if a user navigates away, their input is lost. Adding draft persistence is a future enhancement.

---

## What this document does not cover

- Visual design — exact pixel measurements, colour codes, typography sizing. That belongs in `design-spec.md`.
- Copy strings — actual labels, placeholders, button text, validation messages. Lives in `copy-deck.md`.
- Page layouts — which components appear on which page, in what order, with what conditional visibility. Lives in `page-anatomy.md`.
- Backend / API contracts — how entity data is fetched, what fields the entity object has at the API layer. Lives in architecture docs.
- Build details — framework, component library, CSS approach. Engineering decisions.

If a component is referenced elsewhere but not defined here, raise it as an open question rather than guessing.
