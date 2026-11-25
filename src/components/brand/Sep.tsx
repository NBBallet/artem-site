import { GLYPH } from "@/lib/brand";

/** Розділювач у рядку метаданих: «2024 · Stravinsky». Пробіли — частина гліфа. */
export function Sep() {
  return <span aria-hidden="true">{` ${GLYPH.sep} `}</span>;
}
