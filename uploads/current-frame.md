---
title: "BaanStory Current Frame"
aliases:
  - "current frame"
  - "current baanstory canon"
  - "project canon"
  - "product canon"
note_type: "current_frame"
status: "active"
created: 2026-05-19
updated: 2026-05-21
language: "mixed"
domain: "baanstory"
tags:
  - "baanstory"
  - "current-canon"
  - "product-frame"
  - "events-first"
provenance: "authored_from_prd_system_design_and_specs"
evidence_role: "decision"
related_sources:
  - "context/product/prd.md"
  - "context/product/business-model.md"
  - "context/product/jobs-and-user-stories.md"
  - "specs/architecture/baanstory-cultural-data-backbone-system-design.md"
  - "specs/architecture/baanstory-cultural-data-backbone-data-dictionary.md"
  - "specs/architecture/baanstory-cultural-data-backbone-implementation-plan.md"
  - "specs/legends/legend-generation-spec.md"
  - "specs/legends/legend-semiotic-contract-en.md"
  - "working_docs/active/legend-semantic-structure-en.md"
  - "context/product/legend_source_library/source-library-schema.md"
  - "context/web/site-design-brief.md"
  - "context/web/design-spec.md"
  - "context/web/page-anatomy.md"
  - "context/web/components.md"
  - "context/web/copy-deck.md"
  - "context/conflicts-and-open-questions.md"
  - "README.md"
---

# BaanStory Current Frame

Это короткий вход в текущий продуктовый канон. Следующий агент или разработчик должен из этого файла за пять минут понять, что мы строим, что не строим, и где лежит источник правды по каждому слою. Подробная иерархия документов и precedence — в `README.md`.

## What BaanStory is

BaanStory — это **web-based cultural discovery layer для craft tourism в Таиланде**. Сайт делает вокруг реального craft event / festival / craft village / culturally meaningful place понятную, многоязычную, source-backed запись, которая объясняет:

- что это за место или событие;
- почему оно стоит времени;
- что заметить глазами;
- как участвовать уважительно;
- что в записи подтверждено, а что — пока gap.

Это не "просто event info". Это **trusted cultural interpretation layer** между разрозненным локальным культурным знанием и иностранным посетителем, который физически рядом, но не понимает контекста.

## Core promise

BaanStory превращает разбросанное, локальное, часто непереведённое культурное знание в нечто, что:

- турист может реально использовать на месте;
- институция может атрибутировать, распространять и улучшать без того, чтобы каждый раз пересобирать research / translation / review / design с нуля.

## Product job in one sentence

Help people understand, trust, and show up for meaningful Thai craft experiences.

## What we are building now

1. **Public surface:** responsive website. Не native mobile app.
2. **Primary wedge:** Event Card / Place entry — для реальных craft fairs, festivals, village open days и культурно значимых мест.
3. **Secondary loop (in scope при наличии времени):** Craft Card, открывается из event regional context или Crafts Directory. Craft Card — это cultural / OTOP pointer, не магазин.
4. **Core content unit:** `Legend` — source-backed generated / curated cultural explanation. Не выдуманная красивая история.
5. **Trust behavior:** каждый фактический claim несёт provenance / trust status. Unknown или weak claims становятся gaps / questions, не уверенной прозой.
6. **Paid unit:** **Culture Pack** — named paid unit. Применяется к Event Card и к Craft Card одинаково. Платят институции, не туристы. За что именно платят — см. `## Free vs Paid` ниже.
7. **Trust boundary:** verification и provenance зависят от источников и review, не от платежа. Платный buyer не покупает правду; он покупает workflow, packaging, maintenance и institutional utility.
8. **Technical foundation:** raw-first cultural data backbone с Data Dictionary, source evidence, canonical entities, Core API и BFF view models.

## What we are not building now

- Не marketplace, checkout, cart, payment flow или ticket inventory.
- Не generic event calendar.
- Не travel blog.
- Не social feed / user-generated content layer.
- Не AI copywriter / social caption generator.
- Не mass directory всего культурного в Таиланде.
- Не каталог личных биографий артизанов.
- Не government certification system.
- Не source-free story generator.
- Не продукт, который по дефолту републикует personal phone / LINE / email / contact data.
- Не mobile-native первичная surface.
- Не manual / fixture-only demo, претендующий валидировать live discovery.
- Не mass tourism browsing, generic itinerary planning, booking или ticketing.

## Market and segments (short)

Полная разбивка — в `context/product/jobs-and-user-stories.md`. Здесь — минимум, который должен быть в каноне.

**Market.** Thai cultural tourism, конкретно: craft fairs, cultural festivals, craft villages, heritage-linked local experiences и институции, которые их продвигают.

**Geography.** Primary — Таиланд. Primary content context — Thai craft culture / ภูมิปัญญา / local cultural knowledge.

**Two segments, one revenue side:**

- **Tourists / visitors — primary users, не платят.** Иностранные путешественники в Таиланде, культурно любопытные, часто independent. Им нужно понять, стоит ли место/событие времени, что заметить и как себя вести. Tourist value создаёт *need to understand* — без него платный продукт не работает.
- **Institutions — primary payers.** Event organizers, hotels, tour operators, tourism boards, cultural institutions, destination managers, cultural route operators. Они платят за право упаковать, перевести, верифицировать и распространять локальное культурное знание как guest-facing asset.

Это **two-sided value model, но не marketplace.** Туристы получают понимание и уверенность. Институции платят за verification, translation, packaging и distribution.

## Primary wedge

The strongest first product wedge — **Event Card / Place context loop:**

`event → place → cultural context → related craft / product / local wisdom → trust / provenance → visitor action`

The strongest first paid wedge — **Culture Pack для distributor, у которого уже есть гости:** hotel, DMC, tour operator, tourism board, cultural route operator или event organizer.

Craft Cards важны, потому что закрывают петлю event → craft → event и потому что один и тот же source-backed Legend переиспользуется в guest-facing assets. Они — **не** шоп и не полный OTOP-зеркальный каталог.

## Legend concept

**Legend** — это не красивая выдуманная история. Это source-backed generated / curated cultural explanation для Event Card или Craft Card.

Хороший Legend объясняет:

- почему event, place, craft или product имеет культурное значение;
- что посетитель заметит глазами;
- одну takeable phrase / pocketable claim, которую можно унести и не соврать;
- что известно, что выведено, что пока gap;
- какой source / corpus layer стоит за каждым фактическим claim.

Публичные section labels: `The Legend & Lineage` для Event Card и `The Craft & Lineage` для Craft Card. Внутреннее техническое имя сохранённого артефакта — `story_card`. **`story_card` не публичный продуктовый термин.** Полная механика — в `specs/legends/legend-generation-spec.md`. Рабочая граница между Legend, Moment, evidence, public copy и UI framing — в `specs/legends/legend-semiotic-contract-en.md` и `specs/legends/legend-semiotic-contract-ru.md`; разбор семантической структуры пока лежит в `working_docs/active/legend-semantic-structure-en.md` и `working_docs/active/legend-semantic-structure-ru.md`.

## Free vs Paid

Туристы читают бесплатно. Институции платят за operational cultural interpretation assets.

**Free entry** = public discovery preview. Тонкий, source-backed где возможно, с inline provenance labels и честными gaps / questions. Не packaged / reviewed / maintained для institutional distribution. Free **не** означает "ложный" или "untrusted by default".

**Culture Pack (paid unit)** = operationalized institutional asset. Применяется одинаково к Event Card и к Craft Card. Когда институция платит — она платит за **Culture Pack**, независимо от того, обёрнут он вокруг event'а или craft'а. Состав:

- reviewed и institution-signed где relevant;
- multilingual;
- distributable;
- maintained и измеряемый через usage / readiness signals;
- может включать QR / PDF / share / embed surfaces, guide / concierge notes, structured gap / correction workflow, freshness cycle, usage readout;
- даёт право использовать материал как official или semi-official guest material.

**Trust не продаётся.** Payment покупает workflow, packaging, maintenance и institutional utility. Конкретное pricing, turnaround и approval owners пока open — фиксируется в `context/conflicts-and-open-questions.md`.

## Source roles (short)

- **Live event sources** валидируют существование / дату / локацию реального события. First-wave примеры: M-Culture Event API, ThailandFestival.
- **Enrichment / reference sources** объясняют культуру, place, local wisdom, OTOP / product context, motifs, visitor prompts. Примеры: Cultural Map Thailand, OTOP / OTOPTODAY / OTOP Big Data, M-Culture legend-source bundles, source-grounded OTOP research.
- **Manual seed / import** разрешён для demos, fixtures, debug и curated examples. Должен быть тегирован. Сам по себе live validation **не** удовлетворяет.

Подробнее — в system design, Data Dictionary и implementation plan.

## Evidence boundary

Evidence docs под `evidence_context/` — это source / reference material. Могут поддерживать claims после review, но **не определяют product strategy сами по себе**. Канон — это продуктовые root docs (см. `README.md`).

## First proof

**Smallest useful product proof** — не "мы умеем генерировать красивый текст". Это:

> На нескольких реальных upcoming source-backed событиях BaanStory помогает туристу понять, почему event / place стоит времени, что заметить, чему можно доверять и что делать дальше — быстрее и честнее, чем обычная цепочка Google / Facebook / TAT / ticketing workaround.

**Smallest paid proof** — не "мы умеем продать страницу". Это:

> Hotel, DMC, tour operator, tourism body или organizer хочет распространять Culture Pack, потому что он позволяет их staff объяснять локальную культуру гостям безопасно, повторяемо и без пересборки research / translation / review / design с нуля.

## Where to look next

Полная иерархия источников правды и precedence rules — в `README.md` (handover index). Для быстрой навигации:

- **Продуктовое scope** → `context/product/prd.md`
- **Сегменты и jobs** → `context/product/jobs-and-user-stories.md`
- **Бизнес-модель и paid boundary** → `context/product/business-model.md`
- **Архитектура** → `specs/architecture/baanstory-cultural-data-backbone-system-design.md`
- **Модель данных / schema reference** → `specs/architecture/baanstory-cultural-data-backbone-data-dictionary.md`
- **План работ** → `specs/architecture/baanstory-cultural-data-backbone-implementation-plan.md`
- **Legend mechanics** → `specs/legends/legend-generation-spec.md`
- **Legend semantic boundary** → `specs/legends/legend-semiotic-contract-en.md`, `specs/legends/legend-semiotic-contract-ru.md`, `working_docs/active/legend-semantic-structure-en.md`, `working_docs/active/legend-semantic-structure-ru.md`
- **Legend moment/content adjuncts** → `specs/legends/baanstory-legend-content-spec.md`, `working_docs/active/moments.md`, `working_docs/active/legend-glossary.md` (working; current Legend/source-library canon wins on conflicts)
- **Web surface** → `context/web/site-design-brief.md`, `context/web/design-spec.md`, `context/web/page-anatomy.md`, `context/web/components.md`, `context/web/copy-deck.md`
- **Словарь** → `context/glossary.md`
- **Открытые вопросы** → `context/conflicts-and-open-questions.md`
- **User stories** → `context/product/jobs-and-user-stories.md`
