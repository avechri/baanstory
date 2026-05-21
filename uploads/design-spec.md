---
title: "BaanStory Design Spec"
aliases:
  - "design-spec"
  - "visual-system"
note_type: "spec"
status: "draft"
created: 2026-05-21
updated: 2026-05-21
language: "en"
domain: "baanstory"
tags:
  - "baanstory"
  - "design"
  - "visual-system"
  - "current-canon"
provenance: "rebuilt_from_old_design_spec_and_direction_recommendations_reconciled_with_canon"
evidence_role: "spec"
related_sources:
  - "current-frame.md"
  - "MVP_Scope.md"
  - "components.md"
  - "page-anatomy.md"
  - "copy-deck.md"
  - "ia-and-content-blueprint.md"
supersedes:
  - "context/web/design-spec.md (2026-05-19 draft)"
  - "context/web/site-design-brief.md (older brief)"
  - "context/web/design-direction-recommendations.md (folded in)"
---

# BaanStory Design Spec

This document defines the visual system for BaanStory: palette, typography, spacing, layout, motion, accessibility, and the visual treatment of components defined in `components.md`. It does not list components (`components.md`), specify page anatomy (`page-anatomy.md`), or hold copy strings (`copy-deck.md`). It does specify how those things look.

Read this when you are building a page, styling a component, or making a visual decision and you want the answer to already exist. If a visual question is not answered here, raise it rather than guess.

## How this document works

The spec is divided into:

1. **Design thesis** — what BaanStory should feel like, and what it must not feel like.
2. **Voice & vocabulary** — load-bearing words and anti-words. Read this before writing any copy that will appear in the UI.
3. **Visual tokens** — palette, typography, spacing, radii, borders. The hard system.
4. **Layout & rhythm** — page geometry, breakpoints, section spacing.
5. **Photo strategy** — when to show a photo, when to use a typographic block.
6. **Trust rendering** — how Verified, source attribution, and honest gaps look.
7. **Culture Pack vs free differentiation** — the visual mechanic for M8.
8. **Interaction & motion** — what the site does on hover, click, scroll.
9. **Accessibility** — non-negotiable visual constraints.
10. **Editorial copy patterns** — how copy looks on the page (not what it says).
11. **Reuse rules** — checklist before shipping any new page.
12. **What's still open** — known gaps in the visual system.

## 1. Design thesis

BaanStory is a cultural learning layer for Thailand. The visitor is a foreign tourist (B1–B2 English), a Thai person outside their region, a hotel concierge, an organiser, or a curious traveller — not a collector, academic, or heritage expert. The site exists so they can read what they are looking at.

The design personality is **an accessible cultural field guide for everyday discovery**. It combines:

- the clarity of a practical travel guide
- the trust of a museum label
- the warmth of a local recommendation
- the usability of a modern discovery product
- the tactile richness of material culture

It is closer to a museum object label, an FT Weekend supplement, and a Wikipedia infobox stitched together than to any travel-marketing site or AI-copywriting product. Every claim remains source-aware. Typography is the dominant visual layer; imagery earns its place.

### What this is not

- **Not luxury heritage.** No gilded mood, no costume-Thai motifs, no opulent black-and-gold.
- **Not museum-only.** No expert-only language. No academic-style footnotes in body prose.
- **Not generic travel marketing.** No "discover", no "vibrant", no "hidden gem".
- **Not SaaS / dashboard.** No tag soup, no provenance chips lining every claim.
- **Not lifestyle blog.** No long uninterrupted prose blocks; compact, tactile components.
- **Not playful / kitsch.** Cultural dignity is not negotiable.

### The test

A mass user, in 10 seconds, should understand what the site is for. After reading one page, they should be able to state one specific reason why something matters. The design should make Thai culture readable and actionable for ordinary people. Visual polish that does not teach or orient is weaker than a simpler treatment that gives the visitor a clear cultural "aha".

## 2. Voice & vocabulary (load-bearing — read before writing UI copy)

This applies to every string that appears on the public surface — labels, microcopy, headings, button text, empty states, fallback notices. Exact copy lives in `copy-deck.md`; this section governs what kind of words it uses.

**Posture.** Documentary / field-guide. Knowledgeable, plain-spoken, never breathless.

### Anti-vocabulary — never use these on the public surface

- discover, immerse, immersive
- vibrant, vibrancy
- living heritage, hidden gem, soul of, heart of
- explore, adventure, journey, escape
- authentic, magical, must-see, bucket list
- experience (as a noun for a place), the perfect …

### Preferred verbs

see, look at, hold, turn over, count, ask, watch (someone do something), bring back, attend, walk through, observe.

### Sensory test, not adjective stack

Instead of *"vibrant umbrellas"* → *"fewer than twelve ribs on the saa-paper umbrella usually means it was scaled for tourists; ask to see one with sixteen."* Replace adjectives with specific instructions a reader can perform in front of the object.

### Romanisation in parens

When a Thai term appears, give the Thai script plus a short romanisation:

> Mudmee silk (มัดหมี่ /mát-mìː/), khantoke (ขันโตก /khǎn-tòːk/).

### Internal terms that never leak to the public surface

`Free preview`, `Entry tier`, `CSS plate`, `Country Thailand`, `Languages` as a chip (the language switcher already conveys this), `Culture Pack` (tourist-facing surfaces — institution-facing copy may use the term, per glossary), `Editorial`, `Auto-generated`, `Inferred`, `Documented`, `Oral` (the multi-label trust system is internal-only per MVP M6), `Entity`, `Sign-off owner`.

## 3. Palette — locked

The palette is closer to museum interpretive signage and lacquerware than to a consumer travel app. The Sanuk Scroll palette (coral / mustard / warm peach / Nunito) is deliberately rejected — it reads as dopamine consumer-app and fights the field-guide tone.

### Token set

```css
:root {
  /* Surfaces */
  --bg:             #fdfaf3;  /* cream paper page */
  --surface:        #ffffff;  /* card surface */
  --surface-2:      #f7efde;  /* tinted block, callout, skeleton tint */
  --surface-3:      #f0f6ed;  /* verified-state tint (sparingly) */

  /* Borders */
  --border:         #ede4d0;  /* hairline */
  --border-2:       #d9cdb0;  /* assertive hairline (hover, focus rim) */

  /* Ink (foreground text) */
  --fg:             #1d1a16;  /* primary ink */
  --fg-2:           #3a342b;  /* secondary ink */
  --muted:          #6a6258;  /* metadata, captions */
  --muted-2:        #9a9082;  /* tertiary, separators */

  /* Accent (used sparingly — see budget) */
  --accent:         #7a2031;  /* deep Thai lacquer maroon — assertive */
  --accent-ink:     #5a151f;  /* hover / pressed maroon */

  /* Gold (metadata-only — never a fill or button) */
  --gold:           #a68945;  /* muted brass — kickers, verified label */
  --gold-ink:       #806820;  /* gold ink for kicker text */

  /* Semantic — state colours */
  --state-past:     #6a6258;  /* same as --muted; events that have ended */
  --state-cancelled:#7a2031;  /* same as --accent; cancellation is loud */
  --state-gap:      #806820;  /* same as --gold-ink; honest gap, missing fact */
  --state-verified: #3a5a3a;  /* deep green for verified institution */
}
```

### Accent budget

- Maroon `--accent` appears at most **twice per screen**. It is not a button fill colour by default; it carries primary CTAs and the cancelled state, nothing else.
- Gold `--gold` is **metadata-only** — kicker text, verified label, decorative numerals. Never a button, never a fill block.
- Deep green `--state-verified` is **trust-only** — appears on the Verified indicator and nowhere else. Not a system "success" colour for unrelated UI.

### Forbidden on this product

Coral, mustard, warm peach washes, pastel page backgrounds, purple/violet gradients, neon highlights. The cream `--bg` is the page; nothing should tint it warmer or pinker.

### Why no per-claim provenance colours

The 2026-05-19 spec defined a five-label provenance palette (`Verified` green, `Documented` green, `Oral` purple, `Auto-generated` amber, `Inferred` amber). Per `MVP_Scope.md` M6 — *"No further public trust labels at MVP"* — only the page-level Verified indicator and inline `HonestGap` survive. The colour reservations for the multi-label system are removed. The deep green is retained for the single Verified indicator; the amber moves to `--state-gap` for honest gaps.

## 4. Typography

Three roles, three families, no substitution.

### Token set

```css
--font-display:     'Playfair Display', 'Iowan Old Style', Georgia, serif;
--font-display-th:  'IBM Plex Sans Thai', 'Noto Sans Thai', sans-serif;
--font-body:        'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-body-th:     'IBM Plex Sans Thai', 'Noto Sans Thai', sans-serif;
--font-mono:        'IBM Plex Mono', ui-monospace, Menlo, monospace;
```

### Thai script

Playfair Display does not cover Thai. For Thai-script headings, use **IBM Plex Sans Thai** in higher weights (600–700). For Thai body text, IBM Plex Sans Thai 400. The decision favours mass accessibility over editorial gesture — a serif Thai face would read as state-institutional, which contradicts the field-guide posture.

When a heading mixes Thai and Latin (e.g., `มัดหมี่ Mudmee silk`), wrap the Thai portion with `<span lang="th">` and let CSS apply the Thai font stack to that span.

**Thai size compensation.** Thai script reads visually smaller than Latin at the same `em`. To keep visual balance, the Thai span carries a +10–15% size adjustment in headings:

```css
:lang(th) {
  font-size: 1.12em;
  line-height: 1.3;
}
```

In body copy the adjustment is smaller (+5–8%) or omitted — readability matters more than match. Never scale Latin down to "match" Thai; always scale Thai up.

### Type roles

| Use | Family (Latin) | Family (Thai) | Weight | Size (desktop) | Notes |
|---|---|---|---|---|---|
| Page headline | Playfair Display | IBM Plex Sans Thai | 600 | `clamp(48px, 6vw, 84px)` | Italic permitted on hero (Latin only); never on Thai |
| H2 section title | Playfair Display | IBM Plex Sans Thai | 600 | `clamp(32px, 3.4vw, 48px)` | |
| H3 card title | Playfair Display | IBM Plex Sans Thai | 600 | 22–26px | |
| Body | Inter | IBM Plex Sans Thai | 400 | 16px / 1.55 | Long-form: 17px / 1.6, max 64ch |
| Caption / source | IBM Plex Mono | IBM Plex Sans Thai | 400 | 10px | +0.12em letter-spacing, uppercase (Latin); Thai stays normal-case |
| Kicker / eyebrow | IBM Plex Mono | IBM Plex Sans Thai | 500 | 11px | +0.16em letter-spacing, uppercase (Latin), gold-ink |
| Counter / numerals | IBM Plex Mono | IBM Plex Mono | 500 | 11px | tabular-nums; numerals stay mono in either script |
| Pill (Verified, lifecycle) | IBM Plex Mono | IBM Plex Sans Thai | 500–600 | 10–11px | uppercase (Latin); +0.12em |

### Pairing rule

Body and display must remain in different families on Latin. Mono is only for caption, kicker, counter, and pill — never for body. Thai uses IBM Plex Sans Thai across heading, body, and caption roles; differentiation comes from weight and size, not family.

## 5. Spacing, radii, borders

### Spacing scale

8-pt scale. Use these values; never invent intermediate ones.

```css
--space-1:  4px;
--space-2:  8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
```

Default component-internal padding: `--space-4` (16px). Default card padding: `--space-5` (24px). Default section vertical rhythm: `--space-8` to `--space-9` (64–96px) desktop, `--space-7` to `--space-8` (48–64px) mobile.

### Radii

```css
--radius-sm:  2px;   /* pill, kicker badge */
--radius-md:  6px;   /* card, button, input */
--radius-lg: 12px;   /* modal, drawer panel */
```

No fully rounded buttons. No 0-radius buttons. The 6px radius is the house default.

### Borders

```css
--border-width:    1px;   /* hairline — all cards, inputs, callouts */
--border-width-2:  2px;   /* focus ring; assertive emphasis only */
```

Every card, input, and callout is bordered with `var(--border-width) solid var(--border)`. No left-bar accents. No coloured borders by default — colour appears on hover (`--border-2`) or focus (`--accent`).

### Shadows

**No shadows by default.** The only allowed shadow is the sticky-nav backdrop blur / alpha (see §7 Layout). Cards do not lift. Drawers and modals use a 1px border + colour, not elevation.

## 6. Layout & rhythm

### Page geometry

- Page max-width: **1280px**
- Gutter: **48px** desktop, **20px** mobile
- Container queries acceptable; fluid type via `clamp()` mandatory

### Breakpoints

```
mobile compact     360
mobile standard    390–430
small tablet       600–744
tablet portrait    768          ← primary mobile→desktop break (matches components.md)
tablet landscape   1024–1180
laptop             1280–1366
desktop            1440–1536
wide               1920
```

The primary mobile→desktop break is **768px**, consistent with `components.md`. At 768px:

- `GlobalHeader` switches from horizontal nav to hamburger
- `MobileDrawer` becomes available
- Two-column layouts (Event Card / Craft Card body) collapse to single column
- `FilterGroup` collapses by default

### Section rhythm

- Section vertical padding: `--space-8` to `--space-9` (64–96px) desktop, `--space-7` to `--space-8` (48–64px) mobile
- Each major section may open with a kicker counter (`01 — FEATURED`, `02 — UPCOMING`) in mono uppercase gold-ink
- Sections are separated by space, not lines. Avoid horizontal rules unless inside a `SourcesBlock` style component

### Cards

- 1px hairline border (`--border`), white surface (`--surface`), 6px radius
- No shadows, no left-bar accents, no hover lift
- Hover: border colour shifts `--border` → `--border-2`
- Card padding: `--space-5` (24px) default; compact list cards use `--space-4` (16px)

## 7. Photo strategy

Thai craft and event photography is often flash-blown, low-resolution, poster-like, or watermarked. The canon (current-frame, MVP_Scope) forbids AI-generated imagery. The visual system therefore makes **typography the dominant layer** and treats every image as an archival object.

### Rules

1. **No mandatory hero photo.** A hero may be a typographic block + a small editorial illustration (CSS-drawn, e.g., umbrella-rib motif for Bo Sang) inside a hairline frame. When no verified photo exists, do not show a generic placeholder — show the typographic block with the event facts.
2. **Card thumbnails are placeholder-by-default.** 56–88px tinted colour blocks. Each carries one editorial glyph, a tiny three-colour regional palette dot row, and a mono source-mini label (`Editorial · BaanStory` or `Photo · organiser source`). When a verified photo exists, the thumbnail uses the photo; otherwise the placeholder.
3. **When a real photo earns its place, frame it.** White card, 1px hairline, museum-style caption directly beneath in IBM Plex Mono (date, source, license). Never full-bleed across the page.
4. **No decorative SVG humans, no "AI scenery", no stock travel atmosphere.** A textured colour block + an editorial glyph beats a bad render.
5. **No Hero CTA repetition.** If the Hero contains `Find events` / `Browse crafts`, do not repeat those two CTAs as a card pair immediately below. Use the next block to explain the two modes (`Plan by time` / `Learn by object`) with content, not duplicated buttons.

## 8. Trust rendering

The full multi-label trust system (Verified / Documented / Oral / Inferred / Auto-generated) is **out of scope on the public surface per MVP_Scope M6**. The internal claim-level labels still exist in editorial tooling and the data layer; they do not render to the visitor.

Public surfaces show three trust elements only:

### 8.1 Verified indicator (`VerifiedIndicator`)

The single public trust label. Appears on Event Card and Craft Card hero when the entity has institutional sign-off, and as a quieter inline indicator on `EntityCardPreview` for Culture Pack entries.

**Visual pattern.**

```
[ VERIFIED ]
Bo Sang Umbrella Festival Committee
```

- Top line: `VERIFIED` in `--font-mono`, weight 500, 11px, `+0.16em` letter-spacing, uppercase, colour `--gold-ink`
- Second line: institution name in `--font-body`, weight 400, 14px, colour `--fg-2`
- When institution name is not available: render the top line only. The kicker carries the signal alone.
- Sits on `--bg` directly — no surrounding pill, no border, no fill block
- Optional small icon (check mark, hairline only) to the left of the kicker, also in `--gold-ink`, at the mono baseline

**Hover / focus.** A tooltip may reveal last verified date and a link to the page's `SourcesBlock`. Tooltip uses `--surface` background, `--border` hairline, `--space-3` padding.

**Position on hero.** Sits above the H1 page title, separated by `--space-3` (12px). On `EntityCardPreview` (Culture Pack variant), sits above the card title with the same spacing rule, or in the top-right corner of the card as a compact kicker-only variant when space is constrained.

### 8.2 Source attribution (`SourceAttribution`)

Appears on free entries in the position where `VerifiedIndicator` would otherwise be. This is **meta text, not a badge**. No pill, no border, no chip.

**Visual pattern.**

```
From M-Culture Event API, checked May 2026.
```

- Single line in `--font-body`, 13px, colour `--muted`
- No kicker, no icon
- Sits on `--bg` directly

The absence of `VerifiedIndicator` is the signal that this is a free entry. Free entries do not carry a negative label.

### 8.3 Honest gap (`HonestGap`)

Appears inline in body prose or in `PlanYourVisit` field rows when a critical fact is missing. This is the only place where "we don't know X" surfaces to the visitor — non-critical missing fields are hidden silently.

**Visual pattern.**

- Inline in prose: italicised phrase in `--font-body`, colour `--state-gap`, no border
- In a field row (e.g., `PlanYourVisit`): the field label in normal style, the value position carries a single line in `--font-body`, italic, colour `--state-gap`, with a next-step phrase
- Never `—`, `N/A`, `Unknown`, empty cells, "TBA", "Coming soon"

Example field-row:

```
Hours       Not confirmed. Check the organiser source before going.
```

The italic and the `--state-gap` colour together make the gap visible without alarming the reader.

### 8.4 Sources block (`SourcesBlock`)

The canonical home for detailed provenance. Appears as a standard section on Event Card and Craft Card. Visual treatment is the standard section pattern (kicker counter + title + body). Inside, the source list and known gaps are presented in `--font-body` 14px, with source URLs in `--font-mono` 12px. No chips, no pills.

## 9. Culture Pack vs free differentiation (M8)

`MVP_Scope M8` requires that Culture Pack previews look visibly different from free previews in listings, before the visitor clicks in. The differentiation works on **two layers acting together**:

### Content layer

- Culture Pack `EntityCardPreview`: title, key meta, one-line value, 2–3 cues, `VerifiedIndicator` (compact form, kicker only), optional photo
- Free `EntityCardPreview`: title, key meta, one-line value, `SourceAttribution` (small meta line). May omit cues if not available. No photo by default.

### Visual layer — grid size

In listings (Events Directory, Crafts Directory, Home featured grids):

- **Culture Pack previews occupy a wider grid slot.** On desktop, where the grid is 3 columns, a Culture Pack card spans 2 column-widths. Free cards stay at 1 column.
- On mobile (≤768px), all cards stack to a single column. Culture Pack vs free differentiation in mobile relies on the content layer (kicker + photo) and an optional thin gold top-rule on Culture Pack cards.

This pattern means a glance at a desktop listing immediately shows which entries are "fuller / institution-backed" and which are "in discovery preview". The visual asymmetry is the signal; the content asymmetry confirms it on read.

### What does not differentiate

- No coloured background fill on Culture Pack cards
- No "PREMIUM" / "PRO" / "CULTURE PACK" badge (the word is internal-only on tourist surfaces)
- No border colour change. Both Culture Pack and free cards use the standard `--border` hairline at rest.

### Past and cancelled in listings

A past or cancelled event still renders in the Events Directory (not hidden), carrying a `LifecycleBadge`. This is independent of free vs Culture Pack differentiation.

### Edge case — listing of one type only

When a listing contains only Culture Pack entries (or only free entries), the asymmetric grid mechanic does not apply. Render the cards in the grid's natural size: 3-column desktop, 1-column mobile. The content-layer differentiation (kicker, photo, attribution) still operates per card, but the grid is uniform.

A Culture Pack-only listing is acceptable to render at uniform 3-column desktop — the `VerifiedIndicator` on each card already carries the trust signal. A free-only listing is the default state for early product life and should not feel like something is missing.

## 10. State colours — recap

| Component / state | Colour token | Visual |
|---|---|---|
| Default text | `--fg` | Ink on cream |
| Muted text, captions | `--muted` | Quieter ink |
| `VerifiedIndicator` kicker | `--gold-ink` | Mono uppercase |
| `VerifiedIndicator` icon (if used) | `--gold-ink` | Hairline check, mono baseline |
| `LifecycleBadge` upcoming | `--muted` | Often omitted from hero |
| `LifecycleBadge` past | `--state-past` (= `--muted`) | Neutral text label "Past" |
| `LifecycleBadge` cancelled | `--state-cancelled` (= `--accent`) | Text + small icon, never colour-only |
| `LifecycleBanner` past | `--surface-2` background, `--state-past` text | Full-width above hero |
| `LifecycleBanner` cancelled | `--surface-2` background, `--state-cancelled` text and icon | Full-width above hero |
| `HonestGap` | `--state-gap` italic body | Inline in prose or field-row |
| Primary CTA | `--accent` fill, `--bg` text | Button — max one per visible region |
| Secondary CTA | `--fg` text, `--border` hairline | Outline button |
| Focus ring | `--accent` 2px, 2px offset | All focusable elements |
| Loading skeleton | `--surface-2` tint | Static, no shimmer animation |

### Button states

| State | Primary CTA | Secondary CTA |
|---|---|---|
| Default | Fill `--accent`, text `--bg`, no border | Fill transparent, text `--fg`, hairline `--border` |
| Hover | Fill `--accent-ink`, text `--bg` | Fill `--surface-2`, text `--fg`, hairline `--border-2` |
| Pressed / active | Fill `--accent-ink`, slight inset feeling (no transform, just colour) | Fill `--surface-2`, text `--accent-ink`, hairline `--border-2` |
| Focus | Adds 2px `--accent` outline at 2px offset, on top of any state above | Same |
| Disabled | Fill `--muted-2`, text `--bg`, cursor `not-allowed`, no hover response | Fill transparent, text `--muted-2`, hairline `--muted-2`, no hover response |
| Loading | Same as default; inside the button, the label is replaced by a small static "Working…" mono caption | Same |

Buttons never animate during state changes. The transition is instant; the visual difference between states carries the signal.

## 11. Interaction & motion

- **Motion budget: cross-fade only.** No parallax, no scroll-jacking, no card lifts on hover.
- **Hover.** Text links: underline-on-hover with 3px underline-offset, colour shifts to `--accent-ink`. Cards: border colour shifts `--border` → `--border-2`. No translateY, no scale.
- **Active / pressed.** Buttons darken from `--accent` to `--accent-ink`.
- **Reduced motion.** Respect `prefers-reduced-motion: reduce` — no fades, instant state change.
- **Scroll behaviour.** Anchored navigation uses `window.scrollTo({ top, behavior })` with manual offset for the sticky header. `scrollIntoView` is forbidden inside any preview/sandbox environment (positioning is unreliable).
- **Sticky header.** Frosted backdrop: `--bg` at 92% alpha, `backdrop-filter: blur(8px)`. The one allowed exception to "no shadows".
- **No intro strip.** The older brief described an above-nav "intro strip" with a status dot and a multilingual line. This pattern is not carried into the new canon — global chrome is the header only. If a status announcement is needed, it appears as a dismissable toast (`Toast` component), not as persistent chrome.
- **Drawer (mobile).** Slides in from right, 280–320px wide, `--surface` background, 1px `--border` on the left edge. No backdrop dimming beyond a faint `rgba(0,0,0,0.15)` overlay.
- **Tooltips, popovers.** Static reveal on hover/focus, no animated entrance.

## 12. Accessibility

WCAG 2.2 AA is the target. The constraints below are the non-negotiables for visual decisions.

### Contrast

- `--fg` on `--bg` passes AA
- `--fg-2` on `--bg` passes AA
- `--muted` on `--bg` passes AA for non-essential metadata only — never for body
- `--accent` on `--bg` passes AA at 14px+
- Verify any new colour pairing before adoption

### Focus

- Focus ring: `2px solid var(--accent)`, 2px offset
- Never `outline: none` without a replacement
- Focus must be visible on every focusable element including cards, custom buttons, and the language switcher

### Hit targets

- 44×44px minimum for any tap target (mobile platform guidance)
- Trust elements that are interactive (e.g., `VerifiedIndicator` opening a tooltip) must meet the 44px minimum even if the visible label is smaller — pad the hit area

### Colour is never the only signal

- `LifecycleBadge` cancelled uses both colour and the text "Cancelled" (and optionally an icon)
- `HonestGap` italic carries the meaning, not just the colour
- Verified state is conveyed by the word "Verified" and the institution name, not by the gold colour alone

### Thai script

- Always wrap Thai script in `<span lang="th">` so screen readers and rendering engines handle it correctly
- Romanisation uses `<span lang="th-Latn">` where appropriate
- IBM Plex Sans Thai is the rendering target; the system fallback is Noto Sans Thai

### Motion

- All motion respects `prefers-reduced-motion`
- No animation is required to understand or operate any component

### Semantic structure

- Buttons are `<button>`, links are `<a>`, headings nest correctly
- Decorative elements have `aria-hidden="true"` or empty alt
- Live regions for dynamic updates (filter result counts, toasts, form submission status) use appropriate ARIA politeness

## 13. Editorial copy patterns

This section is about how copy looks. What it says lives in `copy-deck.md`.

- **Page headline.** Playfair Display (Latin) / IBM Plex Sans Thai (Thai), 600 weight. Italic permitted on the hero scale only; never on Thai.
- **Tagline / dek.** ≤ 24 words. Ends with a verb the reader can perform ("count the ribs", "turn the plate over"). Inter / IBM Plex Sans Thai 400, 18–20px, colour `--fg-2`.
- **Section kicker.** Pattern `NN — LABEL` in mono uppercase, gold-ink. Example: `02 — UPCOMING`. One per section, optional.
- **Numbers in body copy.** Spell out one–nine, numerals for 10+. Dates as `15–17 November 2026` (en-dash, full month, year). Numerals use tabular-nums via mono when appearing in counters.
- **Pull-quote.** Optional, max one per page. Playfair italic (Latin) or IBM Plex Sans Thai 600 (Thai), 28–32px, 1px maroon left rule, source line in mono beneath ("Recorded with Lung Somsak, Bo Sang, 2024").
- **Romanisation in parens.** Always for Thai terms on first mention: `Mudmee silk (มัดหมี่ /mát-mìː/)`.

## 14. Reuse rules — checklist before shipping any new page

1. Copy the palette and typography tokens from §3 and §4 verbatim. Never invent intermediate colours or sizes.
2. Lift the global header, footer, drawer, and cookie banner unchanged. They are the site shell.
3. Each new page introduces at most one new component pattern. If you create one, add it to `components.md` (behaviour) and reference its visual treatment here.
4. **Run the anti-vocab check.** Grep the page copy for the words in §2. If any survive, rewrite.
5. Every photographic claim ships with a source caption or a neutral typographic block — never an AI-generated image, never a stock travel photo.
6. Every page reachable to the public must have a path to `SourcesBlock`. List/preview surfaces may use quieter `SourceAttribution` instead.
7. No internal pipeline terminology leaks: `Free preview`, `Entry tier`, `CSS plate`, `Country Thailand`, raw provenance labels (`Auto-generated`, `Inferred`, `Documented`, `Oral`), or the term `Culture Pack` on tourist surfaces.
8. Test the page at 360, 768, 1280, and 1920. Mobile-first; the design must work at 360 before it is celebrated at 1920.

## 15. What this document does not cover

- **Component behaviour, states, conditional logic, data inputs** — lives in `components.md`.
- **Page anatomy — which components appear on which page, in what order** — lives in `page-anatomy.md`.
- **Copy strings — actual labels, button text, microcopy, validation messages** — lives in `copy-deck.md`.
- **Public section titles for Legend-derived content** — open, lives in the Legend content spec when ready.
- **Information architecture, URL structure, navigation model** — lives in `ia-and-content-blueprint.md`.
- **Backend / API contracts, data model** — lives in architecture docs and `data-model.md`.
- **Build details — framework, component library, CSS approach** — engineering decisions.
- **Analytics, performance budgets** — operational decisions.

If a visual question is not answered here and not delegated to one of the documents above, raise it in `conflicts-and-open-questions.md` rather than guessing.

## 16. What's still open

- **`HonestGap` visual finalisation.** The italic + `--state-gap` colour pattern is committed here, but specific treatments (icon? hairline rule?) still need a round of real-content testing.
- **Cookie banner visual.** `components.md` describes behaviour; the visual treatment defaults to the standard surface-2 callout with hairline border. Confirm at first-build.
- **Pricing / institutional onboarding page** (for hotel/DMC/tour operator, tourism board, event activation pack). Not in MVP scope; visual style will follow this spec when built.
- **Map / region cue visuals.** `direction-recommendations` calls for small maps and regional dot rows; specific renderer (SVG inline? static PNG?) not chosen.
- **Editorial illustration set.** The "small CSS-drawn editorial illustration (umbrella-rib motif for Bo Sang)" pattern needs a starter set. Each illustration is built per-event, hairline-style; no system library yet.
- **Loading skeleton motion.** Currently static (`--surface-2` tint with no shimmer). If perceived performance becomes a complaint, revisit with a slow, low-amplitude fade.

---

## Provenance

This spec supersedes:

- `context/web/design-spec.md` (2026-05-19 draft) — palette, typography, layout, motion, accessibility carried over; the §3 multi-label provenance system removed; §8 component inventory removed (delegated to `components.md`); `Add to Trip` and other out-of-scope items removed; breakpoint reconciled to 768px.
- `context/web/site-design-brief.md` (older brief) — referenced as background; its outdated sections (5-intent contact, trust chip system, `Add to Trip`, state banner conflating free/CP with lifecycle) are not carried forward.
- `context/web/design-direction-recommendations.md` (2026-05-20) — design thesis, audience posture, anti-vocabulary, and the "accessible cultural field guide" framing are folded into §1 and §2 of this document.

The HTML prototype remains an aspirational visual reference; it is not the build target. Build target is this document plus `components.md` and `page-anatomy.md`.
