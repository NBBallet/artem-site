import { GLYPH, type ArrowDir } from "@/lib/brand";

/** Стрілка-деталь бренду: «← Назад», «Детальніше →», «WhatsApp ↗». Декоративна. */
export function Arrow({ dir = "next" }: { dir?: ArrowDir }) {
  return <span aria-hidden="true" className="nb-arrow">{GLYPH[dir]}</span>;
}
