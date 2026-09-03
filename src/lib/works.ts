export interface WorkVideo {
  id: string;
  title: { en: string; uk: string; fr: string };
}

export interface Work {
  slug: string;
  title: { en: string; uk: string; fr: string };
  subtitle: { en: string; uk: string; fr: string };
  year: string;
  music: string;
  description: { en: string; uk: string; fr: string };
  image: string;
  videos?: WorkVideo[];
  gallery?: string[]; // array of image URLs for horizontal slider
}

export const works: Work[] = [
  {
    slug: "the-ants",
    title: { en: "The Ants", uk: "Мурахі", fr: "Les Fourmis" },
    subtitle: {
      en: "Full-length ballet in two acts",
      uk: "Повнометражний балет у двох діях",
      fr: "Ballet en deux actes",
    },
    year: "2018–2024",
    music: "Antonio Vivaldi / Max Richter / J.S. Bach",
    description: {
      en: "A civilization of ants becomes a mirror of human society — its hierarchies, fears, and the eternal search for truth. Based on Bernard Werber's novel, this ballet weaves Vivaldi's Four Seasons with Richter's recompositions to explore what happens when a small creature dares to question the order of things.",
      uk: "Цивілізація мурах стає дзеркалом людського суспільства — його ієрархій, страхів та вічного пошуку правди. За романом Бернара Вербера, цей балет поєднує Пори року Вівальді з рекомпозиціями Ріхтера, щоб дослідити, що відбувається, коли маленька істота наважується поставити під сумнів порядок речей.",
      fr: "Une civilisation de fourmis devient le miroir de la société humaine — ses hiérarchies, ses peurs et sa quête éternelle de vérité. D'après le roman de Bernard Werber, ce ballet entrelace Les Quatre Saisons de Vivaldi aux recompositions de Richter pour explorer ce qui se produit lorsqu'une petite créature ose remettre en question l'ordre des choses.",
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
          en: "Part 1. Life awakens in the anthill. Dance of the Queen, the secret service, the princesses and the ordinary workers.",
          uk: "Частина 1. Пробудження життя в мурашнику. Танок Королеви, секретної служби, принцес та звичайних робітників.",
          fr: "Partie 1. L'éveil de la vie dans la fourmilière. Danse de la Reine, des services secrets, des princesses et des ouvrières ordinaires.",
        },
      },
      {
        id: "2YyjSLilMi4",
        title: {
          en: "Part 2. The Prince’s solo — the central character of the ballet.",
          uk: "Частина 2. Соло принца, головного героя вистави.",
          fr: "Partie 2. Solo du Prince, personnage principal du spectacle.",
        },
      },
    ],
  },
  {
    slug: "mozart25",
    title: { en: "Mozart 25", uk: "Моцарт 25", fr: "Mozart 25" },
    subtitle: {
      en: "One-act ballet",
      uk: "Одноактний балет",
      fr: "Ballet en un acte",
    },
    year: "2019–2025",
    music: "Wolfgang Amadeus Mozart",
    description: {
      en: "An immersion into the complex, contradictory inner world of the great composer. We see with our own eyes the forces that drove his artistic visions and demanded that Amadeus keep climbing, ever upward, the staircase of his musical path — without deferring even to the Archbishop of Salzburg.",
      uk: "Занурення у складний та суперечливий внутрішній світ великого композитора. Ми бачимо на власні очі, які сили спонукали мистецькі візії та вимагали від великого Амадея рухатися безупинно вверх і вгору сходами свого музичного шляху, не рахуючись навіть з Архієпископом Зальцбурзьким.",
      fr: "Une immersion dans le monde intérieur, complexe et contradictoire, du grand compositeur. Nous voyons de nos propres yeux les forces qui ont nourri ses visions et qui exigeaient d'Amadeus qu'il monte sans cesse, toujours plus haut, les marches de son chemin musical — sans s'incliner même devant l'archevêque de Salzbourg.",
    },
    image: "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776332563/IMG_3263_fcvu8m.jpg",
    videos: [
      {
        id: "nEAiHrquJ74",
        title: {
          en: "Stage workshop of the ballet’s choreography. Act One. Teaser.",
          uk: "Сценічна хореографічна розробка балету. Перший акт. Тизер.",
          fr: "Esquisse chorégraphique du ballet, sur scène. Premier acte. Teaser.",
        },
      },
      {
        id: "H5CGX13LNlY",
        title: {
          en: "A longer, fuller version of the choreographic text.",
          uk: "Більш розлога, повна версія хореографічного тексту.",
          fr: "Une version plus longue et plus complète du texte chorégraphique.",
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
    title: { en: "Anima", uk: "Аніма", fr: "Anima" },
    subtitle: {
      en: "One-act ballet · The Ascent of the Soul",
      uk: "Одноактний балет · Душа зростає",
      fr: "Ballet en un acte · L'Ascension de l'âme",
    },
    year: "2014",
    music: "L'Orchestre de Contrebasses (Marseille, France)",
    description: {
      en: "The Soul meets its trials beyond time and space. The Hero discovers the depth of his inner world and creates his own self by passing through the Major Arcana of the Tarot. Through Justice, the Hermit, the Wheel, Strength, the Hanged Man, Death and Temperance, the Soul rises according to the law of the Universe.",
      uk: "Душа зустрічає випробування поза часом і простором. Герой відкриває глибину свого внутрішнього світу, створюючи себе через проходження Старших Арканів Таро. Крізь Справедливість, Відлюдника, Колесо, Силу, Повішеного, Смерть і Поміркованість — Душа зростає згідно із законом Всесвіту.",
      fr: "L'Âme rencontre ses épreuves hors du temps et de l'espace. Le Héros découvre la profondeur de son monde intérieur et se crée lui-même en traversant les arcanes majeurs du Tarot. À travers la Justice, l'Ermite, la Roue, la Force, le Pendu, la Mort et la Tempérance, l'Âme s'élève selon la loi de l'Univers.",
    },
    image: "/images/works/anima/poster-v3.jpg",
  },
  {
    slug: "adios",
    title: { en: "Adios", uk: "Адьос", fr: "Adios" },
    subtitle: {
      en: "Contemporary piece · 1st Place, National Choreographers’ Competition, Lviv",
      uk: "Сучасна постановка · 1 місце, Національний конкурс балетмейстерів, Львів",
      fr: "Pièce contemporaine · 1re place, Concours national de chorégraphie, Lviv",
    },
    year: "2016",
    music: "Benjamin Clementine",
    description: {
      en: "A ballet quartet steeped in longing and farewell, set to the song of the same name by Benjamin Clementine from his Mercury Prize-winning debut album At Least for Now. The restrained dialogue of piano, strings and the artist's inimitable voice becomes a lyrical monologue of the body.",
      uk: "Балетний квартет, насичений тугою та прощанням, — на однойменну пісню Бенджаміна Клементайна з дебютного альбому At Least for Now, що отримав Mercury Prize. Стриманий діалог фортепіано, смичкових і неповторного голосу артиста стає ліричним монологом тіла.",
      fr: "Un quatuor de ballet empreint de nostalgie et d'adieu, sur la chanson éponyme de Benjamin Clementine, tirée de son premier album At Least for Now, lauréat du Mercury Prize. Le dialogue retenu du piano, des cordes et de la voix inimitable de l'artiste devient un monologue lyrique du corps.",
    },
    image: "https://i.ytimg.com/vi/m24yjydh5sg/hqdefault.jpg",
    gallery: [
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850615/IMG_2708_nyxpju.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850467/IMG_1786_sqn9nn.jpg",   // diploma — objectPosition: top
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850615/IMG_2706_kesqdi.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850451/IMG_1777_zhhzoe.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850608/IMG_2705_prcqou.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850460/IMG_1779_qwbngl.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850470/IMG_1782_wfd4th.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850477/IMG_1794_ibs6so.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850615/IMG_2711_q17xsv.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850434/IMG_1772_fnpnv5.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850610/IMG_2709_qtevrr.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850421/11745327_1698009643755197_2323341596441784479_n_zehaf2.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850616/IMG_2710_jxqskk.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850461/IMG_1780_w8wjv1.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850615/IMG_2707_fuuaf0.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850440/20150713_200500_dzefmv.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850470/IMG_1748_nxfmlj.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850423/13100753_992891810760556_2799049518492087432_n_d2tsia.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850457/IMG_1749_z7mgzv.jpg",
    ],
    videos: [
      {
        id: "m24yjydh5sg",
        title: {
          en: "1st Place · National Choreographers’ Competition, Lviv, 2015 · Theatre recording",
          uk: "1 місце · Національний конкурс балетмейстерів, Львів, 2015 · Запис із театру",
          fr: "1re place · Concours national de chorégraphie, Lviv, 2015 · Captation au théâtre",
        },
      },
      {
        id: "3dIw8OuNJLY",
        title: {
          en: "Adios · Re-filmed in the studio, better quality",
          uk: "Адьос · Перезйомка в залі, краща якість",
          fr: "Adios · Nouvelle captation en studio, meilleure qualité",
        },
      },
    ],
  },
  {
    slug: "carmen",
    title: { en: "Carmen", uk: "Кармен", fr: "Carmen" },
    subtitle: {
      en: "One-act ballet · Bizet-Shchedrin",
      uk: "Одноактний балет · Бізе-Щедрін",
      fr: "Ballet en un acte · Bizet-Chtchedrine",
    },
    year: "2019",
    music: "Georges Bizet / Rodion Shchedrin",
    description: {
      en: "Bizet's immortal opera reborn through Rodion Shchedrin's radical 1967 orchestration for strings and percussion — a Carmen of raw passion and modern psychological depth. Presented at the Lviv Opera choreographers competition, this staging strips the story to its essential conflict: freedom against possession, fire against submission.",
      uk: "Безсмертна опера Бізе, переосмислена крізь радикальну оркестровку Родіона Щедріна для смичкових та ударних (1967). Представлена на конкурсі балетмейстерів у Львівській опері, постановка зводить сюжет до сутнісного конфлікту: свобода проти власництва, вогонь проти підкорення.",
      fr: "L'opéra immortel de Bizet renaît à travers l'orchestration radicale de Rodion Chtchedrine pour cordes et percussions (1967) — une Carmen de passion brute et de profondeur psychologique moderne. Présentée au concours de chorégraphes de l'Opéra de Lviv, cette mise en scène réduit l'histoire à son conflit essentiel : la liberté contre la possession, le feu contre la soumission.",
    },
    image: "https://i.ytimg.com/vi/t8pL0hzb2i0/hqdefault.jpg",
    gallery: [
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850967/IMG_1142_jjtllw.jpg",
      "https://res.cloudinary.com/dklfgqi9f/image/upload/v1776850970/IMG_1227_cw0633.jpg",
    ],
    videos: [
      {
        id: "t8pL0hzb2i0",
        title: {
          en: "Teaser · Scene 6",
          uk: "Тизер · Сцена 6",
          fr: "Teaser · Scène 6",
        },
      },
    ],
  },
  {
    slug: "firebird",
    title: { en: "Firebird", uk: "Жар-Птиця", fr: "L'Oiseau de feu" },
    subtitle: {
      en: "Original Staging Concept",
      uk: "Авторська постановочна концепція",
      fr: "Conception scénique originale",
    },
    year: "2026",
    music: "Igor Stravinsky",
    description: {
      en: "The Firebird is the fire that pours light into a human being and creates a moment of awakening. This production begins with the first cause of the mysterious fire — a cosmogony growing from the philosophical legacy of the Roerich family.",
      uk: "Жар-Птиця — це вогонь, що вливає світло в людину і створює момент пробудження. Ця постановка починається з першопричини таємничого вогню — космогонія, що виростає з філософської спадщини родини Реріхів.",
      fr: "L'Oiseau de feu est ce feu qui déverse la lumière en l'être humain et crée un instant d'éveil. Cette production part de la cause première du feu mystérieux — une cosmogonie qui grandit à partir de l'héritage philosophique de la famille Roerich.",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Nicholas_Roerich_-_Mother_of_the_World%2C_1924_-_warmer_colours.jpg",
  },
  {
    slug: "icare",
    title: { en: "ICARE", uk: "ІКАР", fr: "ICARE" },
    subtitle: {
      en: "World Premiere · One-act ballet",
      uk: "Світова прем'єра · Одноактний балет",
      fr: "Création mondiale · Ballet en un acte",
    },
    year: "2026",
    music: "Igor Markevitch — L'Envol d'Icare (1932)",
    description: {
      en: "The world's first staging of Igor Markevitch's L'Envol d'Icare — composed in Paris in 1932, unstaged for 93 years. Not a cautionary tale. A celebration of the conscious choice to fly.",
      uk: "Перша в світі постановка «Польоту Ікара» Ігоря Маркевича — написаного в Парижі 1932 року, 93 роки без прем'єри. Не притча-застереження. Гімн усвідомленому вибору летіти.",
      fr: "La toute première création scénique de L'Envol d'Icare d'Igor Markevitch — composé à Paris en 1932, resté sans chorégraphie pendant 93 ans. Non pas une mise en garde : une célébration du choix conscient de voler.",
    },
    image: "/images/matisse-icare.jpg",
    videos: [
      {
        id: "BOpf7s2eqVs",
        title: {
          en: "L'Envol d'Icare — Igor Markevitch conducting the Belgian National Orchestra (complete)",
          uk: "«Політ Ікара» — Ігор Маркевич диригує Бельгійським національним оркестром (повна версія)",
          fr: "L'Envol d'Icare — Igor Markevitch dirige l'Orchestre national de Belgique (intégrale)",
        },
      },
    ],
  },
  {
    slug: "mercy",
    title: { en: "Mercy", uk: "Mercy", fr: "Mercy" },
    subtitle: {
      en: "Dance Film · Vocal-Choreographic Piece",
      uk: "Танцювальний фільм · Вокально-хореографічна п'єса",
      fr: "Film de danse · Pièce vocale et chorégraphique",
    },
    year: "2021",
    music: "Max Richter — Voices",
    description: {
      en: "Born in lockdown. A meditation on mercy, freedom, and what persists when everything is taken away. Set to Max Richter's Voices — a work grounded in the Universal Declaration of Human Rights and the Roerich Pact.",
      uk: "Народжена у локдауні. Медитація про милосердя, свободу та те, що лишається, коли все відібрано. На музику Макса Ріхтера Voices — твір, вкорінений у Загальній декларації прав людини та Пакті Реріха.",
      fr: "Née du confinement. Une méditation sur la miséricorde, la liberté et ce qui subsiste lorsque tout a été retiré. Sur Voices de Max Richter — une œuvre ancrée dans la Déclaration universelle des droits de l'homme et le Pacte Roerich.",
    },
    image: "",
  },
  {
    slug: "humans",
    title: { en: "Humans", uk: "Humans", fr: "Humans" },
    subtitle: {
      en: "Part of the Roerich Sacred Cycle",
      uk: "Частина сакрального циклу Реріха",
      fr: "Partie du cycle sacré de Roerich",
    },
    year: "2020",
    music: "Alessandro Martire – A Turn of the Page (John Talbot Mix)",
    description: {
      en: "Before the first rule. Before the first word. A choreographic cosmogony: cosmic parents perform their ancient ritual; a human is born from their dance; they depart. The created being is left alone on Earth to begin.",
      uk: "До першого правила. До першого слова. Хореографічна космогонія: космічні батьки виконують стародавній ритуал; з їхнього танцю народжується людина; вони йдуть. Створена істота залишається на Землі сама — щоб починати.",
      fr: "Avant la première règle. Avant le premier mot. Une cosmogonie chorégraphique : des parents cosmiques accomplissent leur rituel ancestral ; un humain naît de leur danse ; ils partent. L'être créé reste seul sur Terre pour commencer.",
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
    // Use static array as order backbone; overlay Notion data where available.
    // Static-only works (no Notion entry) are included as-is.
    const merged = works.map((sw) => {
      const nw = notionWorks.find((n) => n.slug === sw.slug);
      if (!nw) return sw;
      // Only use Notion's image if:
      // 1. The static version already has an image (intentionally imageless = stay imageless)
      // 2. The URL is from a reliable non-expiring host (not Google Photos / Notion S3)
      const imageOk = !!sw.image && nw.image &&
        !nw.image.includes("photos.google.com") &&
        !nw.image.includes("drive.google.com") &&
        !nw.image.includes("photo/AF1") &&
        !nw.image.includes("prod-files-secure") &&
        !nw.image.includes("amazonaws.com") &&
        !nw.image.includes("artic.edu");
      return {
        ...nw,
        image: imageOk ? nw.image : (sw.image || ""),
        videos: sw.videos ?? nw.videos,
        gallery: sw.gallery ?? nw.gallery,
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
