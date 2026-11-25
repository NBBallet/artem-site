---
name: Artem Hordieiev — hordieiev.art
description: Сайт хореографа для французького ринку. Чорна сцена, червоний акцент, NAMU-1400 у заголовках.
colors:
  black: "#0a0a0a"
  red: "#c8102e"
  white: "#f5f5f5"
  grey: "#888888"
  gold: "#d4af37"
  dark-grey: "#555555"
  surface: "#111111"
  surface-2: "#161616"
  line: "#1a1a1a"
  line-2: "#222222"
  line-3: "#2a2a2a"
  line-4: "#333333"
  body-fg: "#9a9a9a"
  meta-fg: "#616161"
  fg-2: "#bbbbbb"
  fg-3: "#aaaaaa"
  fg-4: "#999999"
  fg-5: "#777777"
  fg-6: "#444444"
typography:
  display:
    fontFamily: "NAMU-1400, Georgia, serif"
    fontWeight: 400
  display-alt:
    fontFamily: "NAMU-Pro, NAMU-1400, Georgia, serif"
    fontWeight: 400
  h2:
    fontFamily: "NAMU-1400, Georgia, serif"
    fontSize: "clamp(26px, 3.2vw, 34px)"
    lineHeight: 1.12
  text:
    fontFamily: "Inter, sans-serif"
    fontSize: "17px"
    lineHeight: 1.72
  lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "18px"
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "15px"
    letterSpacing: "2.6px"
  label-sm:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "13px"
    letterSpacing: "1.8px"
  kicker:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "5px"
rounded:
  sm: "2px"
  lg: "8px"
components:
  label:
    textColor: "{colors.red}"
    typography: "{typography.label}"
  rule:
    backgroundColor: "{colors.line}"
    height: "1px"
  contact-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  contact-card-hover:
    backgroundColor: "{colors.surface-2}"
---

# DESIGN.md — hordieiev.art

Стан на 25.11.2026, гілка `design/brand-namu`. Документ описує **поточну** систему,
зібрану з коду без зміни вигляду. Вибір нового бренду (шрифти тексту й міток,
деталі) робить окремий чат; він міняє значення токенів, а не компоненти.

## Overview

Чорна сцена (`--black`), біла й сіра типографіка, один червоний акцент
(`--red`, #c8102e) лише на мітках, активних посиланнях і головних діях.
Три шари шрифту, кожен зі своєю роллю:

| Роль | Токен | Зараз | Де |
|---|---|---|---|
| Дисплей | `--font-display` | NAMU-1400 | заголовки, імена творів, великі цифри, навбар |
| Дисплей-2 | `--font-display-alt` | NAMU-Pro | підзаголовки творів, цитати CV |
| Текст | `--font-text` | Inter | бігучий текст, кнопки, капс-мітки творів |
| Мітка | `--font-label` | JetBrains Mono | мітки розділів, дати, статуси, цифри |
| Капс-мітка | `--font-kicker` | = `--font-text` | 11px/5px мітки на сторінках творів |

**Де міняти.** Усе в одному блоці `:root` у `src/app/globals.css`. TS-код
читає ті самі змінні через `src/lib/brand.ts` (`FONT.display` = `"var(--font-display)"`),
тож інлайн-стилі теж ідуть за токеном. Шрифти підключені: NAMU — `@font-face`
у `globals.css` (`/public/fonts`), Inter і JetBrains Mono — Google Fonts у
`src/app/layout.tsx`. Новий шрифт = новий `@font-face`/`<link>` + значення токена.

## Colors

- Бренд: `--black`, `--red`, `--white`, `--grey`, `--gold`, `--dark-grey`
  (Tailwind: `bg-brand-black`, `text-brand-red` …).
- Нейтральні (нові токени, були hex у класах):
  поверхні `--surface` #111, `--surface-2` #161616;
  лінії `--line` #1a1a1a, `--line-2` #222, `--line-3` #2a2a2a, `--line-4` #333;
  текст `--fg-2`…`--fg-6` (#bbb → #444), `--body-fg` #9a9a9a, `--meta-fg` #616161.
  Tailwind: `bg-surface`, `border-line`, `border-line-2`, `text-fg-5` …
- **Палітри творів** (ANIMA, Mercy, Humans, ЖАР-ПТИЦЯ, ICARE) живуть у
  `works/[slug]/page.tsx`, `lib/works.ts`, `components/firebird/*` — це кольори
  конкретних вистав, не бренд. Свідомо лишені локальними.

## Typography

Шкалу задає цифрове резюме (`src/app/[lang]/cv/cv.css`), класи `t-*` у
`globals.css` повторюють її для решти сайту:

- `.t-h2` / `.t-h3` — дисплей; `.t-p` 17/1.72, `.t-lead` 18/1.6 — текст.
- `.t-label` / `.t-label-sm` — моно-мітка; розмір, розрядка й колір —
  токени `--label-size`, `--label-tracking`, `--label-color` (+ `-sm`).
- `.t-kicker` — капс-мітка сторінок творів; токени `--kicker-size`,
  `--kicker-tracking`, `--kicker-weight`, `--font-kicker`. Колір — утилітою поруч.
- `.t-mono`, `.t-fg`, `.t-body-c`, `.t-meta-c` — шар і колір окремо.

Правило: NAMU ніколи не стоїть на бігучому тексті (дрібніше ~20px не читається).

## Layout

Контент до ~1200px, бічні поля 16–40px за брейкпоінтом, фіксований навбар
з `backdrop-blur`. Мобільна ширина перевірена на 375px.

## Shapes

Майже без заокруглень: кнопки й рамки `rounded-sm` / 2px, картки контактів
`rounded-lg`. Розділювач — 1px лінія `--rule-color` (= `--line`), здебільшого
як `border-b border-line` між рядками списків.

## Components

- `components/brand/Arrow.tsx` — `<Arrow dir="back|next|out|up" />`, гліф із
  `GLYPH` у `lib/brand.ts`. Використано: 6× «← Назад» на сторінках творів,
  «↑» у CV, «→» і «↗» на ЖАР-ПТИЦІ. Заміна на SVG-стрілку — одна правка компонента.
- `components/brand/Sep.tsx` — `<Sep />`, « · » у рядках метаданих
  (рік · музика, дата · компанія, підвал CV).
- Там, де стрілка стоїть у flex-контейнері з `gap` (кнопка CV «← Назад»,
  ховер «View project →» на головній), гліф вставлено рядком
  `` `${GLYPH.back} ${label}` ``: окремий `<span>` став би окремим flex-елементом
  і змінив відступ.
- `HEX.red` у `lib/brand.ts` — hex-копія `--red` для місць, де колір склеюється
  з альфою рядком (`${accent}99` у MarqueeCTA) або є SVG-дефолтом (Tryzub).

## Do's and Don'ts

- **Do** брати шрифт, колір, мітку, розділювач лише з токенів; новий сірий —
  спершу перевірити наявні `--fg-*` / `--line-*`.
- **Do** для інлайн-стилів — `FONT.*` з `lib/brand.ts`, не рядок з іменем шрифту.
- **Don't** ставити NAMU на бігучий текст.
- **Don't** додавати нові капс-мітки над заголовками в новій роботі: наявні
  `.t-kicker` збережені як є, але нова сторінка тримає заголовок без «брови».
- **Don't** переносити в токени палітри окремих вистав.

## Що лишилось жорстко закодованим і чому

| Місце | Чому |
|---|---|
| `markevitch-t3lu2ig/*`, `imprimer/*` | окремі документи з власним `@font-face "NAMU"` (`font-display: block`) і ширинами рядків, заміряними під NAMU; токен не врятує верстку при зміні шрифту — їх перевиготовляють з канви |
| `cv.css` кольори `--cv-*` | резюме свідомо має власні сірі й друкований режим; шрифти й червоний/золото вже беруться з токенів |
| `components/firebird/*`, `firebird.css`, `art.ts` | кольори з кадрів NYCB, затверджені на канві v70; шрифти вже через `FONT` |
| палітри творів у `works/[slug]/page.tsx` | кольори вистав (`ULTRA`, `ROSE`, `VIOLET`, градієнти постерів) |
| капс-мітки з розрядкою 2–4px і моно-мітки з інлайн-розміром (~90 місць) | розмір і розрядка різні від місця до місця; шрифт у них уже успадковується з токена (`--font-text` / `--font-label`). Звести в 2–3 класи — окреме рішення разом із новою системою міток |
| `·` і `→` всередині текстів (Notion-дефолти, `*-data.ts`, словники, MarqueeCTA) | це текст, який пише Артем; не деталь верстки |
| `font-display` fallback | інлайн раніше мав `NAMU-1400, serif`, токен — `NAMU-1400, Georgia, serif`: різниця видна лише якщо NAMU не завантажився |

## NB · 2 — новий бренд за прапорцем (25.11.2026)

Вибір Артема 25.11.2026: «Так, NB · 2». Специфікація — `CHORÉGRAPHE/_довідка/Брендпакет NAMU v2 — дослідження (25.11.2026).md`, розділ «Вибір Артема».

- **Прапорець:** `DRAFT_BRAND_NB2` у `src/lib/drafts.ts` — увімкнено на preview гілки `design/brand-namu` (`NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF`) і локально `NEXT_PUBLIC_DRAFT_BRAND_NB2=1`. Тоді `<html data-brand="nb2">`, IBM Plex Sans (`next/font/google`, `--font-plex`) замість Inter і JetBrains Mono, стрілки в `GLYPH` порожні.
- **Усі правила** — `src/app/brand-nb2.css`, кожне під `html[data-brand="nb2"]`; без атрибута файл спить. Компоненти міняються лише маркерами: `nb-btn` (`nb-btn-soft`, `nb-btn-sm`) — кнопка-пігулка; `nb-stack` + `nb-meta` — мета-рядок під назвою; `nb-dark` — темна тональність (сторінки творів, підписи на кадрах); `nb-chip`, `nb-rule`, `nb-arrow`, `nb-langs`, `nb-band`.
- **Світла тональність:** тло `#FEF8F5`, NAMU і текст `#1D1D1B`, бігучий текст графітом `#3C3C3B` (Plex 300), мета сланцем `#607577`, картки пудровою заливкою `#FBD9C9` (мета всередині — графітом: сланець на пудровому 3,7 : 1), кнопка — сланцева пігулка з білим.
- **Темна тональність** (`.nb-dark`): атмосфера вистави лишається (палітри творів — не бренд), NAMU пудровим, мета і кнопка абрикосом `#F5A57C` з чорним текстом.
- **Прибрано під прапорцем:** капс і розрядка поза NAMU, `.t-kicker` (мітка над заголовком), мітка над `cv-h2`, усі рамки й лінії між рядками, риски `r-rule`, стрілки, підкреслення.
- **Реліз** = зробити атрибут безумовним і прибрати прапорець — лише після «так» Артема на preview. Тоді ж переписати §4-КВІНТ / §4-СЕКСТ у `CHORÉGRAPHE/CLAUDE.md`.
