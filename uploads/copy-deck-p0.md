---
title: "BaanStory Copy Deck — P0"
aliases:
  - "copy deck p0"
  - "site copy p0"
  - "copy-deck-p0"
note_type: "copy_deck"
status: "active"
created: 2026-05-21
updated: 2026-05-21
language: "en"
domain: "baanstory"
tags:
  - "baanstory"
  - "copy"
  - "p0"
  - "ui-strings"
  - "bilingual"
  - "generator-spec"
  - "operational-subset"
provenance: "rewritten_from_v1_copy_deck_as_event_only_html_generation_subset"
evidence_role: "spec"
source: "work/discovery-phase/mvp-ready-docs:context/web/copy-deck.md"
implements: "context/product/mvp-scope-p0.md"
related_sources:
  - "work/discovery-phase/mvp-ready-docs:context/web/copy-deck.md"
  - "context/product/mvp-scope-p0.md"
  - "context/product/mvp-scope.md"
---

# BaanStory — Copy Deck P0

This file is the active copy and rendering spec for the current HTML generation pass on this branch.

It is intentionally narrower than the broader product scope in [`context/product/mvp-scope-p0.md`](../product/mvp-scope-p0.md). The scope document remains canon. This file defines only the public routes, strings, states, and rendering rules that belong in the current generated HTML.

## 1. Purpose and use of this file

Use this file when you need to generate or implement the current public HTML surfaces without guessing:

- which routes are in the current generation subset;
- which sections appear on each route, and in what order;
- which strings are fixed;
- which strings are templates with placeholders;
- which blocks are editorial slots;
- which states are allowed;
- which promises are forbidden in the current output.

Do not use this file to infer product deletions. If a surface is absent here, that means it is not part of the current HTML generation subset. It does not mean the broader scope has been rewritten.

## 2. Relationship to broader scope

Three documents now have different jobs:

- [`context/product/mvp-scope-p0.md`](../product/mvp-scope-p0.md) defines the broader P0 execution frame.
- This file defines the active HTML-generation subset for the current pass.
- The full V1 deck on `work/discovery-phase/mvp-ready-docs` remains the archive of wider copy material.

Working rule for this file:

- the current public HTML generation profile is event-only;
- no craft page, craft directory, craft CTA, craft navigation, or craft route is generated from this file;
- craft may still appear inside event editorial content when it helps explain the event, the region, the materials, or what the visitor should notice.

Examples of allowed craft context inside Event pages:

- a legend paragraph explains that a festival is known for hand-painted umbrellas, woven textiles, carved candles, or local food craft;
- a "What to notice" paragraph tells the visitor to look at weaving patterns, lacquer details, or umbrella ribs;
- a visit-preparation note explains that workshops or demonstrations may feature local makers.

Examples of forbidden craft behavior in the current generation subset:

- a `Crafts` top-level nav item;
- a `Browse crafts` CTA;
- a `View all crafts` link;
- a separate craft preview grid;
- a `/crafts` route promise;
- a linked "related crafts" section that behaves like a browse surface.

## 3. Generator rules

### 3.1 Content kinds

Every content item in this file is one of these kinds:

- **Literal string**: fixed UI text. Use exactly as written.
- **Template string**: fixed text with `{placeholders}` filled at runtime.
- **Editorial slot**: content authored per event. Do not auto-invent it from UI copy.

### 3.2 Voice

Use:

- ordinary words;
- short sentences;
- concrete nouns;
- observable details;
- practical next steps;
- Thai terms with Thai script and romanisation on first mention when relevant to the event.

Avoid:

- marketing uplift;
- vague heritage language;
- internal pipeline labels on public surfaces;
- confident claims where data is weak;
- UI promises for routes or features not in the current HTML subset.

### 3.3 Honest gaps

This is the active P0 rule for every generated page.

- Hide non-critical missing fields.
- Name critical gaps plainly and give a next step.
- Never render `—`, `N/A`, `Unknown`, `TBA`, `Coming soon`, or empty table rows.
- Do not fill factual gaps with confident prose.

### 3.4 Forbidden current-generation promises

Do not generate any of the following from this file:

- craft cards;
- craft directory pages;
- craft browse lanes;
- calendar actions;
- lifecycle banners for past, cancelled, or rescheduled editions;
- advanced browse filters or date-picker UI;
- dead links to routes not in the current output.

## 4. Supported routes in current HTML generation

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | Active | Event-first landing page |
| `/events` | Active | Event listing surface |
| `/events/{slug}` | Active | Event detail page |
| `/contact` | Active | Contact and intake form |

Routes explicitly not generated from this file:

- `/crafts`
- `/crafts/{slug}`
- `/about`
- `/privacy`
- `/terms`
- `/cookies`

If a broader scope document references those routes, treat that as broader context, not as an instruction to generate them from this deck.

## 5. Global copy

### 5.1 Global header

Route coverage:

- used on every active route in the current HTML subset.

Section order:

1. Logo
2. Primary nav
3. Language switcher
4. Mobile drawer CTA

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Logo text | `BaanStory` | `BaanStory` | Literal string |
| Primary nav | `Events` | `งานอีเวนต์` | No `Crafts` item |
| Primary nav | `Contact` | `ติดต่อเรา` | Literal string |
| Skip-to-content link | `Skip to content` | `ข้ามไปยังเนื้อหา` | Accessibility copy |
| Mobile hamburger ARIA label | `Open menu` | `เปิดเมนู` | Accessibility copy |
| Mobile drawer close ARIA label | `Close menu` | `ปิดเมนู` | Accessibility copy |
| Mobile drawer footer CTA | `Contact us` | `ติดต่อเรา` | Literal string |

Conditional render rules:

- render `Events` and `Contact` only;
- do not render `Crafts` or `About`;
- language switcher appears on every active page.

Forbidden UI promises:

- no `Crafts` nav item;
- no `/crafts` drawer link;
- no placeholder nav items for routes outside the current subset.

### 5.2 Language switcher

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Current locale label | `English` | `ภาษาไทย` | Use active locale label |
| Switcher ARIA label | `Change language` | `เปลี่ยนภาษา` | Accessibility copy |
| Disabled-state template | `Not available in {target language} yet.` | `ยังไม่มีหน้านี้ในภาษา{target language}` | Template string |

Conditional render rules:

- every active route is expected to have `EN` and `TH`;
- keep the disabled-state string as a safety rule, not as the default experience.

### 5.3 Global footer

Route coverage:

- used on every active route in the current HTML subset.

Section order:

1. Brand line
2. Browse column
3. For organisers column
4. Bottom strip

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Brand line | `Understand Thai events and traditions — what they are, why they matter, and what to notice.` | `เข้าใจงานอีเวนต์และประเพณีไทย ว่าคืออะไร สำคัญอย่างไร และควรสังเกตอะไรเมื่อไปถึง` | Literal string |
| Column heading | `Browse` | `เลือกดู` | Literal string |
| Browse link | `Events` | `งานอีเวนต์` | Only active browse link |
| Column heading | `For organisers` | `สำหรับผู้จัดงาน` | Literal string |
| Organiser link | `Add or claim your event` | `ส่งงานอีเวนต์ของคุณหรือขอรับหน้าของงาน` | Links to `/contact?intent=organiser_event` |
| Organiser link | `Update a verified page` | `อัปเดตหน้าที่ได้รับการยืนยันแล้ว` | Links to `/contact?intent=update` |
| Organiser link | `Send us a source` | `ส่งแหล่งข้อมูลให้เรา` | Links to `/contact?intent=send_source` |
| Organiser link | `Become a partner` | `ร่วมงานกับเรา` | Links to `/contact?intent=partner` |
| Bottom strip | `© 2026 BaanStory` | `© 2026 BaanStory` | Literal string |

Conditional render rules:

- render only the `Events` browse link;
- do not render a craft browse link;
- omit legal-page links from the current generated HTML.

Forbidden UI promises:

- no `Crafts` footer link;
- no `Add or claim your craft` footer link;
- no legal links unless those routes are actually generated elsewhere.

### 5.4 Global buttons and links

Fixed strings:

| Usage | EN | TH | Notes |
| --- | --- | --- | --- |
| Primary discovery CTA | `Find events` | `ดูงานอีเวนต์` | Home primary CTA |
| View-all CTA | `View all events` | `ดูงานอีเวนต์ทั้งหมด` | Listing CTA |
| Event card CTA | `Open event` | `เปิดหน้างานอีเวนต์` | Preview CTA |
| Map action | `Open in Maps` | `เปิดในแผนที่` | Render only when location is map-usable |
| Share action | `Share` | `แชร์` | Active public action |
| Trust/source CTA | `Check source` | `ดูแหล่งข้อมูล` | Literal string |
| Trust/source CTA | `Submit correction` | `ส่งข้อมูลแก้ไข` | Literal string |
| Contact CTA | `Contact us` | `ติดต่อเรา` | Literal string |
| Contact CTA | `Get in touch` | `ติดต่อเรา` | Literal string |
| Form CTA | `Send message` | `ส่งข้อความ` | Literal string |
| Retry CTA | `Try again` | `ลองอีกครั้ง` | Literal string |

Forbidden current-generation actions:

- `Browse crafts`
- `View all crafts`
- `Open craft`
- `Add to calendar`
- `Download PDF`
- `Show QR`
- `Clear filters`
- `Clear search`

### 5.5 Toast messages

Fixed strings:

| Event | EN | TH | Notes |
| --- | --- | --- | --- |
| Link copied | `Link copied.` | `คัดลอกลิงก์แล้ว` | Success toast |
| Language changed | `Language changed.` | `เปลี่ยนภาษาแล้ว` | Success toast |
| Contact form submitted | `Thanks — we'll reply within 2 business days.` | `ขอบคุณ เราจะตอบกลับภายใน 2 วันทำการ` | Success toast |
| Correction submitted | `Thanks — we'll review this and update the page if needed.` | `ขอบคุณ เราจะตรวจสอบและอัปเดตหน้านี้หากจำเป็น` | Success toast |
| Source submitted | `Thanks — we'll check this source.` | `ขอบคุณ เราจะตรวจสอบแหล่งข้อมูลนี้` | Success toast |

### 5.6 Loading and accessibility labels

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Page skeleton ARIA label | `Loading page` | `กำลังโหลดหน้า` | Accessibility copy |
| List skeleton ARIA label | `Loading events` | `กำลังโหลดงานอีเวนต์` | Accessibility copy |
| Card skeleton ARIA label | `Loading entry` | `กำลังโหลดรายการ` | Accessibility copy |
| Long-load line | `Still loading. Slow connection?` | `ยังโหลดไม่เสร็จ การเชื่อมต่อช้าหรือไม่` | Optional long-load line |
| Breadcrumb ARIA label | `Breadcrumb` | `เส้นทางหน้า` | Accessibility copy |

## 6. Home

Route:

- `/`

Page purpose:

- explain the product in one screen and route the visitor into the event listing or an example event.

Supported locales:

- `EN`
- `TH`

Section order:

1. Hero
2. Example guide preview
3. Upcoming events
4. What you get here

### 6.1 Hero

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| H1 | `Understand what you are seeing in Thailand.` | `เข้าใจสิ่งที่คุณกำลังเห็นในประเทศไทย` | Literal string |
| Subhead | `Events, food markets, temple fairs and local traditions explained in plain language — what they are, why they matter, and what to notice when you go.` | `อธิบายงานอีเวนต์ ตลาดอาหาร งานวัด และประเพณีท้องถิ่นด้วยภาษาที่เข้าใจง่าย ว่าคืออะไร สำคัญอย่างไร และควรสังเกตอะไรเมื่อไปถึง` | Literal string |
| Primary CTA | `Find events` | `ดูงานอีเวนต์` | Literal string |
| Cue row | `lantern parades · temple fairs · food markets · candle processions · boat races` | `ขบวนโคมไฟ · งานวัด · ตลาดอาหาร · ขบวนแห่เทียน · แข่งเรือ` | Literal string |

Conditional render rules:

- render only one primary CTA in the current subset;
- do not render a secondary craft CTA;
- keep cue row as a non-clickable line.

### 6.2 Example guide preview

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section label | `Example guide` | `ตัวอย่างไกด์` | Literal string |

Editorial slots:

- one event preview card using the Event preview contract from Section 8;
- optional only when there is a strong real example.

Conditional render rules:

- if no suitable event is available, omit the preview block entirely;
- do not replace the missing preview with a craft example or placeholder card.

### 6.3 Upcoming events

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Heading | `Upcoming events` | `งานอีเวนต์ที่กำลังจะมาถึง` | Literal string |
| Sub-line | `Festivals, temple fairs, food markets and regional events you can plan around.` | `เทศกาล งานวัด ตลาดอาหาร และงานท้องถิ่นที่คุณวางแผนไปได้` | Literal string |
| View-all CTA | `View all events` | `ดูงานอีเวนต์ทั้งหมด` | Literal string |

Editorial slots:

- a small set of event previews.

Conditional render rules:

- render only event previews;
- do not render a companion craft lane;
- if there are no events, use the empty state from Section 10.

### 6.4 What you get here

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Heading | `What you get here` | `คุณจะได้อะไรจากที่นี่` | Literal string |
| Body | `Most listings tell you where and when. BaanStory tells you what to notice when you arrive.` | `หลายเว็บไซต์บอกแค่ว่าอยู่ที่ไหนและจัดเมื่อไร แต่ BaanStory บอกด้วยว่าควรสังเกตอะไรเมื่อไปถึง` | Literal string |
| Point label | `Practical details` | `ข้อมูลที่ใช้ได้จริง` | Literal string |
| Point body | `Dates, places, maps and source links you can act on.` | `วันที่ สถานที่ แผนที่ และลิงก์แหล่งข้อมูลที่นำไปใช้ต่อได้` | Literal string |
| Point label | `What to notice` | `สิ่งที่ควรสังเกต` | Literal string |
| Point body | `Concrete things to look for, ask about, or compare when you arrive.` | `สิ่งที่จับต้องได้ซึ่งควรสังเกต ถามต่อ หรือเปรียบเทียบเมื่อไปถึง` | Literal string |
| Point label | `Cultural context` | `บริบททางวัฒนธรรม` | Literal string |
| Point body | `Plain-language explanation of why the event matters.` | `คำอธิบายง่าย ๆ ว่าทำไมงานนี้จึงสำคัญ` | Literal string |

Forbidden Home behavior:

- no craft browse lane;
- no `Essential crafts` section;
- no `View all crafts` link;
- no object-first craft discovery promise.

## 7. Events listing

Route:

- `/events`

Page purpose:

- list events in a simple event-only browsing surface for the current HTML subset.

Supported locales:

- `EN`
- `TH`

Section order:

1. Header
2. Quiet caution line
3. Month-grouped event list
4. Empty state or contact/source route

### 7.1 Header

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| H1 | `Events` | `งานอีเวนต์` | Literal string |
| Sub-line | `Festivals, temple fairs, food markets and regional events across Thailand.` | `เทศกาล งานวัด ตลาดอาหาร และงานท้องถิ่นจากทั่วประเทศไทย` | Literal string |
| Caution line | `Some dates shift with lunar calendars. Check the source before planning travel.` | `บางวันจัดงานอาจเปลี่ยนตามปฏิทินจันทรคติ ควรตรวจสอบแหล่งข้อมูลก่อนวางแผนเดินทาง` | Literal string |

### 7.2 Active listing model

Current generation rules:

- the listing is event-only;
- month grouping is allowed;
- static or server-rendered lists are allowed;
- advanced search and advanced filters are not part of this active generator contract.

Forbidden listing features in the current subset:

- search inputs;
- filter groups;
- active-filter summaries;
- date pickers;
- craft-related browse terms;
- craft fallback routes.

### 7.3 Month grouping

Template strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Month heading | `{Month name} {year}` | `{Month name} {year}` | Template string; localise month names per locale |
| Count sub-line | `{count} events` | `{count} งาน` | Template string |

### 7.4 Event preview contract

This preview pattern is the only active preview pattern in the current generation subset.

Template pattern:

```text
{Event name}
{Thai name}

{One-line concrete value statement}
{Date} · {place}
{Verified line or source line}
```

If a button CTA is rendered, use:

- `EN`: `Open event`
- `TH`: `เปิดหน้างานอีเวนต์`

Editorial slots:

- `{One-line concrete value statement}`

Rules for the value statement:

- one sentence;
- mention at least one concrete thing the visitor will see, hear, taste, or do;
- no marketing uplift;
- craft references are allowed only as part of event context, not as a separate destination.

### 7.5 Empty state

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Whole directory empty | `No upcoming events indexed yet. Check back later or send us a source.` | `ตอนนี้ยังไม่มีงานอีเวนต์ที่กำลังจะมาถึงในระบบ ลองกลับมาดูอีกครั้งหรือส่งแหล่งข้อมูลให้เรา` | Literal string |
| Source CTA | `Send us a source` | `ส่งแหล่งข้อมูลให้เรา` | Link to `/contact?intent=send_source` |

Forbidden empty-state behavior:

- no `browse crafts in the meantime`;
- no filter-specific recovery copy;
- no search recovery copy.

## 8. Event page

Route:

- `/events/{slug}`

Page purpose:

- render one source-backed event with structured facts, source language, cultural context, and contact paths.

Supported locales:

- `EN`
- `TH`

Section order:

1. Translation fallback notice, if needed
2. Breadcrumb
3. Hero
4. Plan your visit
5. What to notice
6. Why this matters
7. Visit preparation
8. Sources & checks
9. Contact / attribution block

### 8.1 Breadcrumb

Template strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Breadcrumb trail | `Events` → `{Event name}` | `งานอีเวนต์` → `{Event name}` | Template string |

### 8.2 Hero

Template pattern:

```text
{Event name}
{Thai name} /{romanisation}/

{One-line concrete value statement}
{Date or season} · {place}
{Verified line or source line}
```

Editorial example:

> Bo Sang Umbrella Festival
> เทศกาลร่มบ่อสร้าง /têet-sà-gaan rôm bɔ̀ɔ sâang/
>
> Open workshops, painted paper umbrellas and a village parade near Chiang Mai.
> 16–18 January 2026 · Bo Sang, San Kamphaeng, Chiang Mai

Editorial slots:

- `{One-line concrete value statement}`

Rules for the value statement:

- one sentence;
- name at least one concrete thing the visitor will see, hear, taste, or do;
- no marketing uplift;
- if the event includes craft context, keep it inside the sentence as event explanation, not as a separate CTA.

Hero-level public action:

- `EN`: `Share`
- `TH`: `แชร์`

Rule:

- `Share` is the only always-available public action on the current Event page;
- render it near the hero or at the top edge of the factual block;
- do not add calendar or distribution actions beside it.

### 8.3 Plan your visit

Fixed section strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section title | `Plan your visit` | `วางแผนก่อนเดินทาง` | Literal string |
| Field label | `Date` | `วันที่` | Literal string |
| Field label | `Hours` | `เวลา` | Literal string |
| Field label | `Location` | `สถานที่` | Literal string |
| Field label | `Entry` | `ค่าเข้า` | Literal string |
| Field label | `Organiser` | `ผู้จัดงาน` | Literal string |
| Field label | `Source` | `แหล่งข้อมูล` | Literal string |
| Field label | `Checked` | `ตรวจสอบล่าสุด` | Literal string |
| Entry value | `Free` | `ฟรี` | Literal string |
| Entry value | `Free to enter, paid workshops` | `เข้างานฟรี แต่บางกิจกรรมมีค่าใช้จ่าย` | Literal string |
| Entry value | `Check with organiser` | `กรุณาตรวจสอบกับผู้จัดงาน` | Literal string |

Template values:

- `Date` → `{Date range}` or `{Season}`
- `Hours` → `{Daily hours}` or per-day hours
- `Location` → `{Venue}, {District}, {Province}`
- `Entry` → `{price} per person` where relevant
- `Organiser` → `{Organisation name}`
- `Source` → `{Source name}`
- `Checked` → `{Month year}`

Allowed actions inside this block:

- `Open in Maps` only when the location is map-usable;
- `Check source` only when there is a source URL.

Forbidden actions inside this block:

- `Add to calendar`

### 8.4 What to notice

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section title | `What to notice` | `สิ่งที่ควรสังเกต` | Literal string |
| Sub-line | `A few things to look for when you arrive.` | `สิ่งเล็ก ๆ ที่ควรลองสังเกตเมื่อไปถึง` | Literal string |

Editorial slots:

- source-backed observational body copy.

Rules:

- this is an editorial slot, not a generated list from taxonomy;
- craft mentions are allowed only when they explain what the visitor is seeing at the event.

### 8.5 Why this matters

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section title | `Why this matters` | `ทำไมงานนี้จึงสำคัญ` | Literal string |

Editorial slots:

- legend or cultural-context body copy.

Rules:

- this section may mention regional craft traditions, materials, or maker practices when they are part of the event's meaning;
- do not turn that context into a separate linked craft surface;
- there is no public fallback paragraph for a missing legend body;
- if the body is missing in both locales, the page is not complete for production generation and should return to editorial completion instead of receiving synthetic replacement copy.

### 8.6 Visit preparation

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section title | `Visit preparation` | `เตรียมตัวก่อนไป` | Literal string |
| Sub-label | `Best time` | `ช่วงเวลาที่เหมาะ` | Literal string |
| Sub-label | `What to bring` | `ควรเตรียมอะไรไป` | Literal string |
| Sub-label | `Etiquette` | `มารยาทที่ควรรู้` | Literal string |
| Sub-label | `Useful phrase` | `ประโยคที่ใช้ได้` | Literal string |

Conditional render rules:

- render this section only when at least one sub-block has content.

Useful phrase template:

```text
"{English meaning}"
{Thai script}
/{romanisation}/

{Optional one-line usage note}
```

Editorial example:

> "May I look?"
> ขอดูได้ไหม
> /khǎaw duu dâai mǎi/
>
> Polite when a maker is at work. They may say yes, or wave you in, or invite you to try.

### 8.7 Sources & checks

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Section title | `Sources & checks` | `แหล่งข้อมูลและสิ่งที่ตรวจสอบแล้ว` | Literal string |
| Intro | `The sources we checked, and what we couldn't confirm.` | `นี่คือแหล่งข้อมูลที่เราตรวจสอบ และสิ่งที่เรายังยืนยันไม่ได้` | Literal string |
| Gap subheading | `What we couldn't confirm` | `สิ่งที่เรายังยืนยันไม่ได้` | Literal string |
| Correction prompt | `See something wrong? Send us the source and we'll re-check it.` | `ถ้าคุณเห็นข้อมูลที่อาจไม่ถูกต้อง ส่งแหล่งข้อมูลมาให้เรา แล้วเราจะตรวจสอบอีกครั้ง` | Literal string |
| Button | `Submit correction` | `ส่งข้อมูลแก้ไข` | Literal string |

Source row templates:

- `EN`: `Official poster, checked {month year}`
- `TH`: `โปสเตอร์ทางการ ตรวจสอบเมื่อ {month year}`
- `EN`: `Organiser page, checked {month year}`
- `TH`: `หน้าเพจของผู้จัดงาน ตรวจสอบเมื่อ {month year}`
- `EN`: `Tourism listing, checked {month year}`
- `TH`: `หน้ารายการท่องเที่ยว ตรวจสอบเมื่อ {month year}`
- `EN`: `Cultural reference, used for context`
- `TH`: `เอกสารอ้างอิงด้านวัฒนธรรม ใช้ประกอบบริบท`
- `EN`: `Community source, named in our records`
- `TH`: `แหล่งข้อมูลจากชุมชนที่บันทึกไว้ในระบบ`

Gap-entry templates:

- `EN`: `Opening hours.`
- `TH`: `เวลาเปิดงาน`
- `EN`: `Exact venue address.`
- `TH`: `ที่อยู่สถานที่จัดงานแบบละเอียด`
- `EN`: `Public sources list different dates.`
- `TH`: `แหล่งข้อมูลสาธารณะระบุวันจัดงานไม่ตรงกัน`
- `EN`: `No verified photo supplied yet.`
- `TH`: `ยังไม่มีรูปภาพที่ยืนยันแล้ว`

### 8.8 Contact / attribution block

Free-entry state:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Heading | `Are you the organiser?` | `คุณเป็นผู้จัดงานใช่ไหม` | Literal string |
| Body | `If this is your event, you can verify the details, add photos, and turn this page into an official guide.` | `หากนี่คืองานของคุณ คุณสามารถช่วยยืนยันรายละเอียด เพิ่มรูปภาพ และทำให้หน้านี้เป็นไกด์ทางการได้` | Literal string |
| CTA | `Get in touch` | `ติดต่อเรา` | Links to `/contact?intent=organiser_event&page={current_url}` |

Verified state:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Verified line | `Verified by {institution name}` | `ยืนยันข้อมูลโดย {institution name}` | Template string |
| Verified line, optional role | `Verified by {institution name}, {short role description}.` | `ยืนยันข้อมูลโดย {institution name}, {short role description}` | Template string |
| Update prompt | `Need to update this page?` | `ต้องการอัปเดตหน้านี้หรือไม่` | Literal string |
| Update link | `Request an update` | `ขออัปเดตข้อมูล` | Links to `/contact?intent=update&page={current_url}` |

Page-state rules in the current subset:

- free entry: source line plus organiser CTA;
- verified entry: verified line plus update route;
- translation-missing case: fallback notice at top.

Forbidden Event-page behavior:

- no `Regional crafts to know` section;
- no linked craft previews;
- no `Add to calendar`;
- no lifecycle banners;
- no next-edition links;
- no premium distribution actions.

## 9. Contact page

Route:

- `/contact`

Page purpose:

- provide the single active intake form for event organisers, corrections, source submissions, partner requests, and general contact.

Supported locales:

- `EN`
- `TH`

Current public intent set:

- `organiser_event`
- `update`
- `correction`
- `partner`
- `send_source`
- `general`

The craft-specific public intent is intentionally not part of the current HTML generation subset.

Section order:

1. Page header
2. Intent selector
3. Universal fields
4. Intent-specific fields
5. Consent and privacy note
6. Submit button
7. Validation or server state
8. Success state

### 9.1 Page header

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| H1 | `How can we help?` | `เราช่วยอะไรคุณได้บ้าง` | Literal string |
| Sub-line | `Tell us what you need. Pick an option below and we'll route your message to the right person.` | `บอกเราว่าคุณต้องการอะไร แล้วเลือกหัวข้อด้านล่าง เราจะส่งข้อความของคุณไปยังคนที่เกี่ยวข้อง` | Literal string |

### 9.2 Intent selector

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Dropdown label | `What's this about?` | `เรื่องที่ต้องการติดต่อคืออะไร` | Literal string |
| Placeholder | `Choose one` | `เลือกหนึ่งข้อ` | Literal string |

Intent option labels:

| Value | EN | TH | Notes |
| --- | --- | --- | --- |
| `organiser_event` | `I run or represent an event` | `ฉันเป็นผู้จัดงานหรือเป็นตัวแทนของงานอีเวนต์` | Public intent |
| `update` | `I need to update a page my institution has already verified` | `ฉันต้องการอัปเดตหน้าที่หน่วยงานของฉันยืนยันข้อมูลไว้แล้ว` | Public intent |
| `correction` | `I want to report a correction on a page` | `ฉันต้องการแจ้งข้อมูลแก้ไขในหน้าใดหน้าหนึ่ง` | Public intent |
| `partner` | `I represent a hotel, tour operator, or tourism body` | `ฉันเป็นตัวแทนโรงแรม บริษัททัวร์ หรือหน่วยงานท่องเที่ยว` | Public intent |
| `send_source` | `I want to send a source or photo` | `ฉันต้องการส่งแหล่งข้อมูลหรือรูปภาพ` | Public intent |
| `general` | `Something else` | `เรื่องอื่น ๆ` | Public intent |

Mapping note:

- `organiser_event` maps to `verify_event` when a page URL is present, otherwise `create_new`.

Forbidden intent behavior:

- do not render `organiser_craft`;
- do not promise a craft-page claim flow.

### 9.3 Universal fields

Fixed strings:

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Name label | `Your name` | `ชื่อของคุณ` | Literal string |
| Name placeholder | `First name, last name` | `ชื่อ นามสกุล` | Literal string |
| Email label | `Your email` | `อีเมลของคุณ` | Literal string |
| Email placeholder | `you@example.com` | `you@example.com` | Literal string |
| Email helper | `We'll reply to this address.` | `เราจะตอบกลับทางอีเมลนี้` | Literal string |
| Message label | `Message` | `ข้อความ` | Literal string |
| Message placeholder | `Tell us what you need. The more concrete, the better.` | `บอกเราว่าคุณต้องการอะไร ยิ่งชัดเจนยิ่งช่วยได้มาก` | Literal string |
| Message helper | `If you have a source link, paste it in the message.` | `หากมีลิงก์แหล่งข้อมูล สามารถวางไว้ในข้อความได้` | Literal string |

### 9.4 Intent-specific fields

`organiser_event`

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Label | `Your institution` | `หน่วยงานของคุณ` | Literal string |
| Label | `Your role` | `บทบาทของคุณ` | Literal string |
| Label | `Where can we find your institution online?` | `มีลิงก์ออนไลน์ของหน่วยงานที่ใดบ้าง` | Literal string |
| Label | `Is your event already on BaanStory? Paste the page URL.` | `งานของคุณมีอยู่บน BaanStory แล้วหรือยัง วาง URL ของหน้าไว้ได้` | Literal string |
| Helper | `The name that would appear as "Verified by ___" on the page.` | `ชื่อที่จะแสดงในบรรทัด "Verified by ___"` | Literal string |
| Helper | `A website, Facebook page, or any link that shows your institution is real.` | `เว็บไซต์ เฟซบุ๊ก หรือข้อมูลออนไลน์ที่ช่วยยืนยันว่าเป็นหน่วยงานจริง` | Literal string |
| Helper | `Skip the page URL if you can't find your page — we'll work from scratch.` | `หากยังหาหน้าไม่เจอ สามารถเว้น URL ไว้ได้ แล้วเราจะเริ่มตรวจสอบให้จากต้นทาง` | Literal string |

`update`

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Label | `Your institution` | `หน่วยงานของคุณ` | Literal string |
| Label | `Which page needs updating?` | `ต้องการอัปเดตหน้าใด` | Literal string |
| Label | `What needs to change?` | `ข้อมูลใดที่ต้องแก้ไข` | Literal string |

`correction`

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Label | `Which page has the issue?` | `หน้าใดมีข้อมูลที่ควรแก้ไข` | Literal string |
| Label | `What's wrong?` | `ข้อมูลใดไม่ถูกต้อง` | Literal string |
| Label | `How do you know? (optional)` | `คุณทราบข้อมูลนี้จากอะไร (ถ้าไม่สะดวกไม่ต้องกรอก)` | Literal string |

`partner`

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Label | `Your organisation` | `องค์กรของคุณ` | Literal string |
| Label | `What kind of organisation?` | `เป็นองค์กรประเภทใด` | Literal string |
| Label | `What are you hoping to do with BaanStory?` | `คุณต้องการร่วมงานกับ BaanStory ในรูปแบบใด` | Literal string |

Organisation-type options:

| EN | TH | Notes |
| --- | --- | --- |
| `Hotel` | `โรงแรม` | Literal string |
| `Tour operator` | `บริษัททัวร์` | Literal string |
| `DMC (destination management company)` | `บริษัทจัดการปลายทางท่องเที่ยว` | Literal string |
| `Tourism board` | `หน่วยงานท่องเที่ยว` | Literal string |
| `Cultural route operator` | `ผู้จัดเส้นทางท่องเที่ยวเชิงวัฒนธรรม` | Literal string |
| `Other` | `อื่น ๆ` | Literal string |

`send_source`

| Field | EN | TH | Notes |
| --- | --- | --- | --- |
| Label | `Link to the source` | `ลิงก์แหล่งข้อมูล` | Literal string |
| Label | `Why this source matters (optional)` | `เหตุใดแหล่งข้อมูลนี้จึงสำคัญ (ถ้าไม่สะดวกไม่ต้องกรอก)` | Literal string |

`general`

- no additional fields.

### 9.5 Consent and privacy note

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Checkbox label | `I agree to BaanStory processing my contact details to respond to this message.` | `ฉันยินยอมให้ BaanStory ใช้ข้อมูลติดต่อของฉันเพื่อตอบกลับข้อความนี้` | Literal string |
| Privacy note | `We use your name, email, and message only to reply to you and follow up if needed. We do not send marketing emails.` | `เราใช้ชื่อ อีเมล และข้อความของคุณเพื่อตอบกลับและติดตามเรื่องเท่าที่จำเป็นเท่านั้น เราจะไม่ส่งอีเมลการตลาด` | Literal string |

Current-generation rule:

- do not render a legal-page link inside this note unless the legal route is actually generated elsewhere.

### 9.6 Submit button

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Default | `Send message` | `ส่งข้อความ` | Literal string |
| While submitting | `Sending...` | `กำลังส่ง...` | Literal string |
| Disabled tooltip | `Tick the consent box to send.` | `กรุณาติ๊กช่องยินยอมก่อนส่งข้อความ` | Literal string |

### 9.7 Validation errors

Fixed strings:

| Error | EN | TH | Notes |
| --- | --- | --- | --- |
| Name empty | `Please enter your name.` | `กรุณากรอกชื่อของคุณ` | Literal string |
| Email empty | `Please enter your email.` | `กรุณากรอกอีเมลของคุณ` | Literal string |
| Email malformed | `That doesn't look like an email address.` | `รูปแบบอีเมลนี้ดูไม่ถูกต้อง` | Literal string |
| Intent empty | `Please choose an option.` | `กรุณาเลือกหัวข้อที่ต้องการติดต่อ` | Literal string |
| URL empty when required | `Please paste the URL.` | `กรุณาวาง URL` | Literal string |
| URL malformed | `That doesn't look like a URL. URLs start with http:// or https://` | `URL นี้ดูไม่ถูกต้อง ควรขึ้นต้นด้วย http:// หรือ https://` | Literal string |
| Message empty | `Please write a message.` | `กรุณาเขียนข้อความ` | Literal string |
| Message too short | `Message is a little short — give us a few more words.` | `ข้อความยังสั้นเกินไป กรุณาให้รายละเอียดเพิ่มอีกเล็กน้อย` | Literal string |
| Consent unticked | `Please tick the consent box.` | `กรุณาติ๊กช่องยินยอม` | Literal string |
| Generic fallback | `This field is required.` | `ต้องกรอกข้อมูลในช่องนี้` | Literal string |

### 9.8 Success state

Fixed strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Heading | `Thanks — we've got your message.` | `ขอบคุณ เราได้รับข้อความของคุณแล้ว` | Literal string |
| Body | `We read every submission. You'll hear back within 2 business days, sometimes sooner.` | `เราตรวจอ่านทุกข้อความ และจะตอบกลับภายใน 2 วันทำการ บางครั้งอาจเร็วกว่า` | Literal string |
| Link | `Send another message` | `ส่งข้อความอีกครั้ง` | Literal string |
| Link | `Back to events` | `กลับไปที่งานอีเวนต์` | Literal string |

Forbidden success-state behavior:

- no `Back to crafts` link.

## 10. Shared states

### 10.1 Trust and source language

Only one tourist-facing trust label is active in the current subset.

Template strings:

| Item | EN | TH | Notes |
| --- | --- | --- | --- |
| Verified line | `Verified by {institution name}` | `ยืนยันข้อมูลโดย {institution name}` | Template string |
| Free-entry source line | `From {source name}, checked {month year}.` | `อ้างอิงจาก {source name} ตรวจสอบเมื่อ {month year}` | Template string |
| Multi-source line | `From {source 1} and {source 2}, last checked {month year}.` | `อ้างอิงจาก {source 1} และ {source 2} ตรวจสอบล่าสุดเมื่อ {month year}` | Template string |

Rules:

- verified line replaces the source line when institutional sign-off exists;
- free entries use the source line as quiet meta text;
- do not introduce extra public trust labels.

### 10.2 Honest gaps

Fixed strings:

| Situation | EN | TH | Notes |
| --- | --- | --- | --- |
| Missing hours | `Hours not confirmed. Check the organiser source before going.` | `ยังไม่ยืนยันเวลาเปิดงาน กรุณาตรวจสอบแหล่งข้อมูลของผู้จัดงานก่อนเดินทาง` | Literal string |
| Missing exact location | `Exact venue not confirmed. We have the province, but not the street address.` | `ยังไม่ยืนยันที่อยู่สถานที่จัดงานแบบละเอียด เราทราบจังหวัด แต่ยังไม่มีที่อยู่ถนน` | Literal string |
| Conflicting dates | `Date needs confirmation. Public sources list different dates.` | `วันจัดงานยังต้องตรวจสอบเพิ่มเติม เพราะแหล่งข้อมูลสาธารณะระบุไม่ตรงกัน` | Literal string |
| Missing organiser contact | `No public organiser contact yet. We've listed the source we used instead.` | `ตอนนี้ยังไม่มีข้อมูลติดต่อผู้จัดงานในที่สาธารณะ เราจึงแสดงแหล่งข้อมูลที่เราใช้แทน` | Literal string |

### 10.3 Translation fallback

Fixed strings:

| Situation | EN | TH | Notes |
| --- | --- | --- | --- |
| English requested, Thai shown | `This page isn't available in English yet. Showing Thai.` | `หน้านี้ยังไม่มีภาษาอังกฤษ จึงแสดงเป็นภาษาไทย` | Safety fallback |
| Thai requested, English shown | `This page isn't available in Thai yet. Showing English.` | `หน้านี้ยังไม่มีภาษาไทย จึงแสดงเป็นภาษาอังกฤษ` | Safety fallback |

Rule:

- current goal is full `EN + TH` coverage on every active route;
- fallback is a safety behavior, not the target steady state.

### 10.4 Generic load and server errors

Fixed strings:

| Situation | EN | TH | Notes |
| --- | --- | --- | --- |
| Generic load failure | `We couldn't load this. Try refreshing, or come back in a moment.` | `เราโหลดข้อมูลนี้ไม่สำเร็จ ลองรีเฟรชหน้า หรือลองใหม่อีกครั้งในอีกสักครู่` | Literal string |
| Form submit failure | `Something went wrong on our side. Your message wasn't sent.` | `เกิดข้อผิดพลาดทางฝั่งเรา ข้อความของคุณยังไม่ถูกส่ง` | Literal string |
| Rate limit | `Too many submissions from this connection. Try again in an hour.` | `มีการส่งข้อมูลจากการเชื่อมต่อนี้มากเกินไป กรุณาลองใหม่อีกครั้งในหนึ่งชั่วโมง` | Literal string |

## 11. Locale rules

Supported locales for every active route:

- `en`
- `th`

Generator rules:

- fixed UI strings must exist in both locales;
- template strings must use the same placeholder names in both locales;
- editorial slots must be supplied in both locales before the page is considered fully ready;
- do not machine-translate editorial event content at runtime;
- if an editorial slot is missing in one locale during a preview or staging pass, use the translation fallback notice from Section 10 and render the source locale instead.

Romanisation rules:

- keep Thai script and romanisation together where the pattern calls for them;
- do not remove Thai script to simplify layout;
- do not add romanisation where the editorial source does not support it confidently.

## 12. Excluded from current HTML generation

The following are intentionally outside this deck's active generator contract:

- craft pages;
- craft directory pages;
- craft browse sections;
- craft top-level navigation;
- craft footer browse links;
- craft claim flows;
- craft preview components;
- `Add to calendar`;
- lifecycle banners and next-edition links;
- advanced listing search;
- advanced listing filters;
- legal-page route copy;
- About-page route copy;
- premium distribution assets.

If any of those surfaces are needed later, they should return through a new explicit update to this file or through a different deck aimed at that broader output.
