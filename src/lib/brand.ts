/**
 * Токени бренду для TS/TSX — дзеркало змінних у src/app/globals.css.
 *
 * Значення тут — лише посилання на CSS-змінні (`var(--…)`), тож справжнє
 * джерело одне: globals.css. Цей файл потрібен там, де стиль задається
 * inline (`style={{ fontFamily: FONT.display }}`), і для гліфів деталей.
 * Опис системи — DESIGN.md.
 */

import { DRAFT_BRAND_NB2 } from "@/lib/drafts";

export const FONT = {
  /** NAMU-1400 — заголовки, імена творів, великі цифри */
  display: "var(--font-display)",
  /** NAMU-Pro — підзаголовки творів, цитати */
  displayAlt: "var(--font-display-alt)",
  /** Inter — бігучий текст */
  text: "var(--font-text)",
  /** JetBrains Mono — мітки, дати, статуси */
  label: "var(--font-label)",
} as const;

/**
 * Гліфи деталей. Щоб змінити стрілку чи розділювач на всьому сайті —
 * правка тут (або заміна <Arrow>/<Sep> на SVG у components/brand).
 * Гліфи всередині текстів (Notion, src/content, *-data.ts) — це текст,
 * їх ця система не чіпає.
 */
// NB · 2 (чернетка, src/lib/drafts.ts): стрілок немає — гліфи порожні.
const NO_ARROWS = DRAFT_BRAND_NB2;

export const GLYPH = {
  back: NO_ARROWS ? "" : "←",
  next: NO_ARROWS ? "" : "→",
  out: NO_ARROWS ? "" : "↗",
  up: NO_ARROWS ? "" : "↑",
  sep: "·",
} as const;

export type ArrowDir = "back" | "next" | "out" | "up";

/**
 * Hex-копії для місць, де колір склеюється з альфою як рядок
 * (`${accent}99`) або йде в SVG-атрибут за замовчуванням: CSS-змінна
 * там не спрацює. Тримати рівними з globals.css (--red).
 */
export const HEX = {
  red: "#c8102e",
} as const;

/**
 * Кольори категорій B (NB · 2) — вибір Артема 25.11.2026: «Мені подобається B,
 * давай подивимось як буде виглядати все. Категорію "лекції" поки не беремо.»
 * Поправка того ж дня: «Поки ні для S4 і S5».
 *
 *   creation — Création для трупи (S2 ICARE)          #B3CAEA блакитний
 *   grande   — Велика форма (S3 Дард, S3.1 Lorenzo)   #284731 пляшковий (сторінок поки немає)
 *   evenement — Подія замовника (лише S1 Вечір МОЦАРТ25) #F5A57C абрикос
 *
 * Решта творів — без категорії (пудровий). Класи `nb-cat nb-cat-<ключ>`
 * мають правила лише під html[data-brand="nb2"] (src/app/brand-nb2.css),
 * тож без прапорця DRAFT_BRAND_NB2 вони інертні.
 */
export type NbCategory = "creation" | "grande" | "evenement";
export const NB_CATEGORY: Record<string, NbCategory> = {
  icare: "creation",
  mozart25: "evenement",
};
export const nbCatClass = (slug: string): string =>
  NB_CATEGORY[slug] ? ` nb-cat nb-cat-${NB_CATEGORY[slug]}` : "";
