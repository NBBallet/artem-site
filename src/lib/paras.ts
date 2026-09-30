/**
 * Сітка читання (29.09.2026): довгий абзац ділиться на кілька коротших —
 * по межі речення, без жодної зміни в словах. Око тримає блок у 2–3 речення;
 * суцільна «стіна» на 6–8 рядків змушує шукати, де ти зупинився.
 *
 *  • "\n" у джерелі — завжди межа абзацу (так було й раніше);
 *  • абзац коротший за `min` знаків не чіпаємо;
 *  • решту збираємо з речень у блоки від `target` знаків, але не довші
 *    за ~340 (тоді речення відкривають новий блок);
 *  • хвіст, коротший за 90 знаків, прилипає до попереднього блоку.
 *
 * Межа речення — «.!?…» після слова щонайменше з трьох знаків, далі пробіл
 * і велика літера / цифра / лапка. Три знаки відсікають ініціали
 * («N. Roerich», «J.-S. Bach»), тож ім'я ніколи не розривається.
 */
const SENTENCE = /(?<=[^\s.]{3}[.!?…])\s+(?=[«"„“(A-ZÀ-ÖØ-ÞА-ЯІЇЄҐ0-9])/u;

export function toParas(
  text: string | null | undefined,
  { min = 340, target = 220 }: { min?: number; target?: number } = {},
): string[] {
  if (!text) return [];
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap((p) => {
      if (p.length < min) return [p];
      const chunks: string[] = [];
      let cur = "";
      for (const s of p.split(SENTENCE)) {
        // a block never swells past ~340 chars just to reach `target`
        if (cur.length >= 120 && cur.length + s.length > 340) {
          chunks.push(cur);
          cur = "";
        }
        cur = cur ? `${cur} ${s}` : s;
        if (cur.length >= target) {
          chunks.push(cur);
          cur = "";
        }
      }
      if (cur) {
        if (cur.length < 90 && chunks.length) chunks[chunks.length - 1] += ` ${cur}`;
        else chunks.push(cur);
      }
      return chunks;
    });
}
