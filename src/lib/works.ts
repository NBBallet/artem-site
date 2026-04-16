export interface WorkVideo {
  id: string;
  title: { en: string; uk: string };
}

export interface Work {
  slug: string;
  title: { en: string; uk: string };
  subtitle: { en: string; uk: string };
  year: string;
  music: string;
  description: { en: string; uk: string };
  image: string;
  videos?: WorkVideo[];
  gallery?: string[]; // array of image URLs for horizontal slider
}

export const works: Work[] = [
  {
    slug: "the-ants",
    title: { en: "The Ants", uk: "Мурахі" },
    subtitle: {
      en: "Full-length ballet in two acts",
      uk: "Повнометражний балет у двох діях",
    },
    year: "2018–2024",
    music: "Antonio Vivaldi / Max Richter / J.S. Bach",
    description: {
      en: "A civilization of ants becomes a mirror of human society — its hierarchies, fears, and the eternal search for truth. Based on Bernard Werber's novel, this ballet weaves Vivaldi's Four Seasons with Richter's recompositions to explore what happens when a small creature dares to question the order of things.",
      uk: "Цивілізація мурах стає дзеркалом людського суспільства — його ієрархій, страхів та вічного пошуку правди. За романом Бернара Вербера, цей балет поєднує Пори року Вівальді з рекомпозиціями Ріхтера, щоб дослідити, що відбувається, коли маленька істота наважується поставити під сумнів порядок речей.",
    },
    image: "/images/works/the-ants/the-ants.jpg",
    videos: [
      {
        id: "lkeQ3z5rlro",
        title: {
          en: "Part 1. Awakening of life in the anthill. Dance of the Queen, the secret service, princesses and ordinary workers.",
          uk: "Частина 1. Пробудження життя в мурашнику. Танок Королеви, секретної служби, принцес та звичайних робітників.",
        },
      },
      {
        id: "2YyjSLilMi4",
        title: {
          en: "Part 2. Solo of the Prince, the main hero of the performance.",
          uk: "Частина 2. Соло принца, головного героя вистави.",
        },
      },
    ],
  },
  {
    slug: "mozart25",
    title: { en: "Mozart 25", uk: "Моцарт 25" },
    subtitle: {
      en: "One-act ballet",
      uk: "Одноактний балет",
    },
    year: "2019–2025",
    music: "Wolfgang Amadeus Mozart",
    description: {
      en: "An immersion into the complex, contradictory inner world of the great composer. We witness the forces that drove his artistic visions and demanded that Amadeus move ceaselessly upward along the staircase of his musical path — not counting even the Archbishop of Salzburg.",
      uk: "Занурення у складний та суперечливий внутрішній світ великого композитора. Ми бачимо на власні очі, які сили спонукали мистецькі візії та вимагали від великого Амадея рухатися безупинно вверх і вгору сходами свого музичного шляху, не рахуючись навіть з Архієпископом Зальцбурзьким.",
    },
    image: "",
  },
  {
    slug: "anima",
    title: { en: "Anima", uk: "Аніма" },
    subtitle: {
      en: "One-act ballet · Rising of the Soul",
      uk: "Одноактний балет · Душа зростає",
    },
    year: "2014",
    music: "L'Orchestre de Contrebasses (Marseille, France)",
    description: {
      en: "The Soul encounters challenges beyond time and space. The Hero discovers the depth of his inner world, creating his own self by ascending the Major Arcana of Tarot. Through Justice, the Hermit, the Wheel, Strength, the Hanged Man, Death, and Temperance — the Soul rises according to the law of the Universe.",
      uk: "Душа зустрічає випробування поза часом і простором. Герой відкриває глибину свого внутрішнього світу, створюючи себе через проходження Старших Арканів Таро. Крізь Справедливість, Відлюдника, Колесо, Силу, Повішеного, Смерть і Поміркованість — Душа зростає згідно із законом Всесвіту.",
    },
    image: "/images/works/anima/poster-v3.jpg",
  },
  {
    slug: "ikar-markevich",
    title: { en: "Ikar / Markevich", uk: "Ікар / Маркевич" },
    subtitle: {
      en: "One-act ballet",
      uk: "Одноактний балет",
    },
    year: "2020",
    music: "Igor Markevich — The Flight of Icarus",
    description: {
      en: "A ballet inspired by the life and music of Igor Markevich — the Ukrainian-born conductor and composer whose Flight of Icarus became a symbol of daring artistic ambition and the price of reaching too close to the sun.",
      uk: "Балет, натхненний життям та музикою Ігоря Маркевича — українського за походженням диригента та композитора, чий Політ Ікара став символом зухвалих мистецьких амбіцій та ціни наближення до сонця.",
    },
    image: "",
  },
  {
    slug: "roerich-ballet",
    title: { en: "Roerich Ballet", uk: "Балет Реріха" },
    subtitle: {
      en: "Full-length ballet in development",
      uk: "Повнометражний балет у розробці",
    },
    year: "2025–",
    music: "TBA",
    description: {
      en: "A new full-length work exploring the intersection of East and West through the life, expeditions, and artistic philosophy of Nicholas Roerich — painter, philosopher, and visionary who bridged cultures through art.",
      uk: "Нова повнометражна робота, що досліджує перетин Сходу і Заходу через життя, експедиції та мистецьку філософію Миколи Реріха — художника, філософа і візіонера, який поєднував культури через мистецтво.",
    },
    image: "",
  },
  {
    slug: "antifragile",
    title: { en: "Antifragile", uk: "Антихрупкість" },
    subtitle: {
      en: "Contemporary ballet",
      uk: "Сучасний балет",
    },
    year: "2023",
    music: "TBA",
    description: {
      en: "Inspired by Nassim Taleb's philosophy, this work explores systems and beings that gain from disorder — bodies that grow stronger under stress, spirits that thrive in chaos.",
      uk: "Натхненний філософією Насіма Талеба, ця робота досліджує системи та істот, що зміцнюються від хаосу — тіла, що стають сильнішими під тиском, духи, що розквітають у безладді.",
    },
    image: "",
  },
  {
    slug: "mercy",
    title: { en: "Mercy", uk: "Mercy" },
    subtitle: {
      en: "Short film / dance piece",
      uk: "Короткометражка / танцювальна п'єса",
    },
    year: "2022",
    music: "TBA",
    description: {
      en: "A visceral dance film exploring compassion, vulnerability, and the thin line between mercy and surrender.",
      uk: "Танцювальний фільм, що досліджує співчуття, вразливість та тонку межу між милосердям і капітуляцією.",
    },
    image: "",
  },
  {
    slug: "voices",
    title: { en: "VOICES", uk: "VOICES" },
    subtitle: {
      en: "Vocal-choreographic performance",
      uk: "Вокально-хореографічна вистава",
    },
    year: "2021",
    music: "Various",
    description: {
      en: "A performance where voice and body become one instrument — exploring the primal connection between breath, sound, and movement.",
      uk: "Вистава, де голос і тіло стають одним інструментом — досліджуючи первісний зв'язок між диханням, звуком та рухом.",
    },
    image: "",
  },
  {
    slug: "humans",
    title: { en: "Humans", uk: "Humans" },
    subtitle: {
      en: "Dance performance",
      uk: "Танцювальна вистава",
    },
    year: "2020",
    music: "TBA",
    description: {
      en: "What makes us human? A choreographic investigation into the essence of being, stripped of social roles and cultural armor.",
      uk: "Що робить нас людьми? Хореографічне дослідження сутності буття, позбавлене соціальних ролей та культурної броні.",
    },
    image: "",
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

// ─── Dynamic: fetch from Notion with static fallback ───
import { getWorksFromNotion } from "./notion";

let _cachedWorks: Work[] | null = null;

export async function getWorks(): Promise<Work[]> {
  // Try Notion first
  const notionWorks = await getWorksFromNotion();
  if (notionWorks.length > 0) {
    // Merge static-only fields (videos) and fallback image if Notion URL is invalid
    const merged = notionWorks.map((nw) => {
      const staticWork = works.find((w) => w.slug === nw.slug);
      const imageOk = nw.image &&
        !nw.image.includes("photos.google.com") &&
        !nw.image.includes("drive.google.com") &&
        !nw.image.includes("photo/AF1");
      return {
        ...nw,
        image: imageOk ? nw.image : (staticWork?.image || ""),
        videos: staticWork?.videos ?? nw.videos,
      };
    });
    _cachedWorks = merged;
    return merged;
  }
  // Fallback to static
  return works;
}

export async function getWorkBySlugAsync(
  slug: string
): Promise<Work | undefined> {
  const allWorks = await getWorks();
  return allWorks.find((w) => w.slug === slug);
}
