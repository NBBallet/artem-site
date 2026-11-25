/**
 * Дані живого прототипу «Стрибок → Міст → Предела» (DRAFT_MOST, drafts.ts).
 *
 * Порядок і коди — аркуш «Товари» Chorégraphe.numbers (коди з 18.11.2026):
 * S1 Вечір МОЦАРТ25 (ціль сцени на квартал, тому першим) · S2 ICARE ·
 * S3 Дард · S3.1 Lorenzo. S4 і S5 на сайті не показуються (рішення Артема
 * 25.11.2026).
 *
 * Факти — лише ті, що вже є на сайті (src/lib/works.ts) або в «Товарах».
 * Усе інше — заглушка `null`: на сторінці стоїть сіре «текст Артема».
 * Кадри — справжні: галерея Mozart 25 (Cloudinary, як у works.ts) і
 * зображення пітчу в public/deck. ICARE ще не поставлено — кадр стрибка той
 * самий, що в пітчі.
 */

export interface MostPanel {
  /** кадр; null — сіра заглушка «матеріал Артема» */
  src: string | null;
  alt: string;
  /** підпис панелі (одне слово-два); null — заглушка «текст Артема» */
  caption: string | null;
}

export interface MostWork {
  slug: string;
  code: string;
  title: string;
  /** мета-рядок під назвою */
  meta: string;
  /** три зупинки мосту — три факти */
  stops: [string, string, string];
  /** великий кадр (pala) */
  pala: MostPanel;
  /** предела: 5–7 панелей */
  predella: MostPanel[];
  /** умови рядками (з «Товарів» або сайту) */
  facts: { label: string; value: string }[];
  /** справжнє посилання для перегляду, якщо є */
  watch?: { label: string; href: string };
  /** чинна сторінка твору на сайті, якщо є */
  current?: string;
}

const CLD = "https://res.cloudinary.com/dklfgqi9f/image/upload";
const m25 = (id: string) => `${CLD}/w_1600,q_auto,f_auto/${id}.jpg`;

export const M25 = {
  push: m25("v1776332576/IMG_3272_xhp1jv"), // підготовка, відштовхування
  reach: m25("v1776332558/IMG_3257_ujddyp"), // арабеск, розкриття
  flight: m25("v1776332573/IMG_3269_trvc2u"), // політ
  land: m25("v1776332559/IMG_3258_lhjtn3"), // приземлення: стоїть над тими, хто на підлозі
  mass: m25("v1776332557/IMG_3256_lrsqmc"),
  line: m25("v1776332557/IMG_3255_kqubva"),
  row: m25("v1776332559/IMG_3259_acelq0"),
  floor: m25("v1776332563/IMG_3263_fcvu8m"),
  group: m25("v1776332575/IMG_3271_bcyyyq"),
  wings: m25("v1776332557/IMG_3254_ysqk10"),
};

const blank = (alt: string): MostPanel => ({ src: null, alt, caption: null });

export const mostWorks: MostWork[] = [
  {
    slug: "mozart25",
    code: "S1",
    title: "Mozart 25",
    meta: "Soirée Mozart 25 · moment chorégraphique (titre de travail)",
    stops: ["2019–2025", "Wolfgang Amadeus Mozart", "3–5 min live · 5–7 dancers"],
    pala: { src: M25.flight, alt: "Mozart 25, a dancer in mid-air", caption: null },
    predella: [
      { src: M25.mass, alt: "Mozart 25, the company in motion", caption: null },
      { src: M25.line, alt: "Mozart 25, a line of dancers", caption: null },
      { src: M25.reach, alt: "Mozart 25, arabesque", caption: null },
      { src: M25.floor, alt: "Mozart 25, dancers on the floor", caption: null },
      { src: M25.row, alt: "Mozart 25, a row of dancers", caption: null },
      { src: M25.group, alt: "Mozart 25, group", caption: null },
      { src: M25.wings, alt: "Mozart 25, the wings", caption: null },
    ],
    facts: [
      { label: "Live", value: "3–5 min of dance; the evening follows the host's programme" },
      { label: "Cast", value: "5–7 dancers and the choreographer" },
      { label: "Space", value: "about 8 × 8 m, portable dance floor, sound, dressing room" },
      { label: "Music", value: "Wolfgang Amadeus Mozart" },
    ],
    watch: { label: "Watch the teaser", href: "https://www.youtube.com/watch?v=nEAiHrquJ74" },
    current: "/works/mozart25",
  },
  {
    slug: "icare",
    code: "S2",
    title: "ICARE",
    meta: "L'Envol d'Icare · Igor Markevitch",
    stops: ["1932", "Igor Markevitch", "27′ · first choreography of the score"],
    pala: {
      src: "/deck/t3lu2ig/m/icare-dancer.webp",
      alt: "ICARE, the leap from the pitch",
      caption: null,
    },
    predella: [
      { src: "/deck/t3lu2ig/m/icare-dancer.webp", alt: "ICARE, the leap", caption: null },
      { src: "/deck/t3lu2ig/m/ensemble.webp", alt: "The score in concert", caption: null },
      { src: "/deck/t3lu2ig/m/tl-1932.webp", alt: "Drawing, 1932", caption: null },
      { src: "/images/matisse-icare.jpg", alt: "Henri Matisse, Icarus", caption: null },
      blank("Sketch"),
      blank("Rehearsal"),
    ],
    facts: [
      { label: "Format", value: "A new work for the house company, a full Markevitch evening" },
      { label: "Score", value: "L'Envol d'Icare, Igor Markevitch, 27′" },
      { label: "Cycle", value: "18–30 months" },
    ],
    current: "/works/icare",
  },
  {
    slug: "dard",
    code: "S3",
    title: "La part du ciel",
    meta: "Titre de travail · after poems by Nicolas Dard",
    stops: ["Nicolas Dard, poems", "Contemporary ballet, large form", "Own production or co-production"],
    pala: blank("La part du ciel"),
    predella: [blank("Poem"), blank("Score"), blank("Sketch"), blank("Space"), blank("Voice")],
    facts: [
      { label: "Form", value: "Large form" },
      { label: "Production", value: "Own production or co-production" },
    ],
  },
  {
    slug: "lorenzo",
    code: "S3.1",
    title: "Lorenzo il Magnifico",
    meta: "Ballet with voice and orchestra",
    stops: ["1940", "Igor Markevitch", "Soprano, orchestra, company · 29′"],
    pala: blank("Lorenzo il Magnifico"),
    predella: [blank("I"), blank("II"), blank("III"), blank("IV"), blank("V")],
    facts: [
      { label: "Score", value: "Sinfonia concertante by Igor Markevitch (1940), five movements" },
      { label: "Texts", value: "Lorenzo de' Medici" },
      { label: "Cast", value: "The house company, soprano, the house orchestra" },
      { label: "Duration", value: "29′" },
    ],
  },
];

export function mostWork(slug: string) {
  return mostWorks.find((w) => w.slug === slug);
}
