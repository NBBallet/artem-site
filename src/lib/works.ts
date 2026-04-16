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
    gallery: [
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325779/47580617_302305113726727_3540207874120613888_n_kdqfmm.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325776/468926405_1566626430627916_3641130413285529658_n_tkqjiq.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325761/47363167_300974687193103_134555948084625408_n_zfhuou.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325760/48192552_304053406885231_2609068628024229888_n_swbsu2.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325749/48052964_304053393551899_7294468714886332416_n_ubqtfy.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325744/47680490_302305183726720_4796214744224628736_n_eys9ts.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325734/47189898_300974770526428_4663380047233548288_n_gyqv8c.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325717/47398138_302305103726728_4554435822358626304_n_lmcohw.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325709/47051029_298203894136849_9034833306251689984_n_gvulcj.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325705/46831299_298204020803503_5493644521730211840_n_d5x1s8.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325705/47349078_300974800526425_8306268950040150016_n_cm4xrt.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325699/46837309_298204000803505_8949358986000334848_n_z9bi7l.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325689/46916746_298204397470132_4908057509383634944_n_kbzdwj.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325688/46761026_298204097470162_200417819869839360_n_uuwffa.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776325676/46766794_298204404136798_4646738169948012544_n_zimklh.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776322337/the-ants_uhbmoc.jpg",
    ],
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
    image: "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332563/IMG_3263_fcvu8m.jpg",
    videos: [
      {
        id: "nEAiHrquJ74",
        title: {
          en: "Stage choreographic development of the ballet. First act. Teaser.",
          uk: "Сценічна хореографічна розробка балету. Перший акт. Тизер.",
        },
      },
      {
        id: "H5CGX13LNlY",
        title: {
          en: "A more extensive, full version of the choreographic text.",
          uk: "Більш розлога, повна версія хореографічного тексту.",
        },
      },
    ],
    gallery: [
      // Alternating: odd = life / непарні = побутові, even = dance / парні = танцювальні
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332585/IMG_3274_mzoihf.jpg",   // 1 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332563/IMG_3263_fcvu8m.jpg",   // 2 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332585/IMG_3275_rms0de.jpg",   // 3 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332561/IMG_3262_fo2ehs.jpg",   // 4 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332583/IMG_3277_xytwyo.jpg",   // 5 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332561/IMG_3260_vzz4h9.jpg",   // 6 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332582/IMG_3273_gxqohq.jpg",   // 7 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332559/IMG_3259_acelq0.jpg",   // 8 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332581/IMG_3276_o5lo5o.jpg",   // 9 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332559/IMG_3258_lhjtn3.jpg",   // 10 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332576/IMG_3272_xhp1jv.jpg",   // 11 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332558/IMG_3257_ujddyp.jpg",   // 12 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332573/IMG_3270_ioavy2.jpg",   // 13 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332557/IMG_3255_kqubva.jpg",   // 14 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332575/IMG_3271_bcyyyq.jpg",   // 15 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332557/IMG_3254_ysqk10.jpg",   // 16 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332573/IMG_3267_sd4qcd.jpg",   // 17 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332557/IMG_3256_lrsqmc.jpg",   // 18 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332573/IMG_3269_trvc2u.jpg",   // 19 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332551/55842758_350343045589600_2465565279514525696_n_r6u58f.jpg", // 20 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332572/IMG_3268_q4nick.jpg",   // 21 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332567/IMG_3266_nbqrmd.jpg",   // 22 dance
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332566/IMG_3265_mpwlvs.jpg",   // 23 life
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332565/IMG_3264_eytq7y.jpg",   // 24 dance
    ],
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
        gallery: staticWork?.gallery ?? nw.gallery,
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
