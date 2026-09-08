// Espace pro — що саме можна замовити, з якої бюджетної лінії і на яких умовах.
//
// Це структурований вміст репозиторію, не редагована копія з Notion: сторінка
// force-static, отже жодне поле не може зникнути на rate-limited запиті, як це
// буває з Notion-полями (див. AGENTS.md). Джерело тих самих текстів для PDF —
// CHORÉGRAPHE/03 Товари/fiches.json; змінюючи тут, змінити і там.

import type { Locale } from "@/lib/i18n";

export type Availability = "now" | "season" | "development";

export interface Offer {
  code: "S1" | "S2" | "S3" | "S4";
  /** Файл fiche у /public/fiches/ — те, що продюсер забирає з собою. */
  fiche: string;
  duration: Record<Locale, string>;
  cast: Record<Locale, string>;
  availability: Availability;
  title: Record<Locale, string>;
  genre: Record<Locale, string>;
  lede: Record<Locale, string>;
  body: Record<Locale, string>;
  /** Хто в домі це купує — рядок, який економить продюсерові хвилину. */
  buyer: Record<Locale, string>;
  technical: Record<Locale, string[]>;
}

export const offers: Offer[] = [
  {
    code: "S1",
    fiche: "/fiches/S1_conference-dansee.pdf",
    availability: "now",
    duration: { fr: "60 min · 80 min avec l'échange", en: "60 min · 80 with the talk", uk: "60 хв · 80 хв із розмовою" },
    cast: { fr: "1 à 2 interprètes", en: "1–2 performers", uk: "1–2 виконавці" },
    title: {
      fr: "Icare, le ballet qui n'a jamais eu lieu",
      en: "Icarus, the ballet that never happened",
      uk: "Ікар, балет, якого не було",
    },
    genre: { fr: "Conférence dansée", en: "Danced lecture", uk: "Лекція-перформанс" },
    lede: {
      fr: "Une partition commandée en 1932, refusée par Serge Lifar, jamais chorégraphiée pendant quatre-vingt-treize ans. Une heure pour la faire entendre et la faire voir.",
      en: "A score commissioned in 1932, refused by Serge Lifar, never choreographed for ninety-three years. One hour to make it heard and seen.",
      uk: "Партитура, замовлена 1932 року, від якої відмовився Серж Лифар і яку 93 роки ніхто не хореографував. Година, щоб її почути й побачити.",
    },
    body: {
      fr: "En 1932, Igor Markevitch écrit L'Envol d'Icare pour Serge Lifar. Lifar refuse : il ne parvient pas à accorder son rythme à celui de la partition, et danse en 1935 son propre Icare sans musique. L'œuvre n'a jamais été portée à la scène. Markevitch et Lifar sont nés à Kyiv ; Artem Hordieiev y a été formé. La conférence raconte cette histoire et en donne à voir les premières phrases chorégraphiques : le récit, la partition, le corps, dans le même temps.",
      en: "In 1932 Igor Markevitch wrote L'Envol d'Icare for Serge Lifar. Lifar refused: he could not bring his rhythm into accord with the score, and in 1935 danced his own Icare without music. The work has never been staged. Markevitch and Lifar were both born in Kyiv; Artem Hordieiev was formed there too. The lecture tells that story and shows the first choreographic phrases: the account, the score and the body at once.",
      uk: "1932 року Ігор Маркевич пише «L'Envol d'Icare» для Сержа Лифаря. Лифар відмовляється: не може узгодити свій ритм із партитурою, і 1935 танцює власного «Ікара» без музики. Твір ніколи не був поставлений. Маркевич і Лифар народились у Києві; Київ сформував і Артема Гордєєва. Лекція розповідає цю історію і показує перші хореографічні фрази: розповідь, партитура і тіло водночас.",
    },
    buyer: {
      fr: "Responsable de l'action culturelle · médiathèques départementales · lycées (EAC, pass Culture) · musées · universités",
      en: "Head of cultural action · county libraries · schools · museums · universities",
      uk: "Відповідальні за культурну дію · департаментські медіатеки · ліцеї · музеї · університети",
    },
    technical: {
      fr: [
        "Plateau ou salle dégagée à partir de 6 × 5 m, sol plat",
        "Diffusion sonore : le système de la salle suffit",
        "Lumière : service de salle, aucun plan de feu spécifique",
        "Montage 1 h 30 · démontage 45 min",
      ],
      en: [
        "Stage or clear room from 6 × 5 m, flat floor",
        "Sound: the venue's own system is enough",
        "Light: house rig, no specific lighting plan",
        "Get-in 1 h 30 · get-out 45 min",
      ],
      uk: [
        "Сцена або вільна зала від 6 × 5 м, рівна підлога",
        "Звук: достатньо системи зали",
        "Світло: чергове, без окремого плану",
        "Монтаж 1 год 30 хв · демонтаж 45 хв",
      ],
    },
  },
  {
    code: "S2",
    fiche: "/fiches/S2_version-de-chambre.pdf",
    availability: "season",
    duration: { fr: "75 à 80 min sans entracte", en: "75–80 min, no interval", uk: "75–80 хв без антракту" },
    cast: { fr: "5 interprètes · 1 régisseur", en: "5 performers · 1 stage manager", uk: "5 виконавців · 1 режисер сцени" },
    title: { fr: "Icare — version de chambre", en: "Icare — chamber version", uk: "Ікар — камерна версія" },
    genre: { fr: "Spectacle, soirée complète", en: "Full evening", uk: "Повний вечір" },
    lede: {
      fr: "Une soirée en quatre temps autour d'une partition restée sans chorégraphe pendant quatre-vingt-treize ans.",
      en: "An evening in four movements around a score that waited ninety-three years for a choreographer.",
      uk: "Вечір на чотири частини навколо партитури, яка 93 роки чекала на хореографа.",
    },
    body: {
      fr: "La forme de plateau du projet ICARE, conçue pour être accueillie sans orchestre et transportée dans un véhicule. Conférence dansée (20 min), ICARE pour cinq interprètes sur la partition de Markevitch (27–30 min), deux pièces courtes du répertoire (15 min), rencontre avec le public. Elle se joue en série de trois dates sur un même territoire : la logistique partagée change les conditions.",
      en: "The stage form of the ICARE project, built to be presented without orchestra and carried in one vehicle. Danced lecture (20 min), ICARE for five performers on Markevitch's score (27–30 min), two short repertory pieces (15 min), meeting with the audience. It plays in runs of three dates on one territory: shared logistics change the terms.",
      uk: "Сценічна форма проєкту ICARE: без оркестру, вміщається в один автомобіль. Лекція-перформанс (20 хв), ICARE на п'ятьох на партитуру Маркевича (27–30 хв), дві короткі роботи з репертуару (15 хв), зустріч із глядачами. Грається серіями по три дати на одній території: спільна логістика змінює умови.",
    },
    buyer: {
      fr: "Programmateur · direction · scènes nationales et conventionnées · CDCN · théâtres de ville",
      en: "Programmer · artistic direction · national and contracted stages · dance centres · city theatres",
      uk: "Програматор · дирекція · національні сцени · CDCN · міські театри",
    },
    technical: {
      fr: [
        "Plateau minimum 10 × 8 m, tapis de danse noir",
        "Lumière : plan de feu adaptable au parc de la salle, conduite fournie",
        "Son : diffusion façade, bande fournie",
        "2 services de montage · 1 filage · loges pour 7",
      ],
      en: [
        "Stage from 10 × 8 m, black dance floor",
        "Light: plan adapts to the house rig, cue sheet provided",
        "Sound: front-of-house, track supplied",
        "2 get-in sessions · 1 run · dressing rooms for 7",
      ],
      uk: [
        "Сцена від 10 × 8 м, чорний танцювальний килим",
        "Світло: план адаптується під парк зали, партитура світла надається",
        "Звук: фронтальна система, фонограма надається",
        "2 монтажні служби · 1 прогін · гримерки на 7 осіб",
      ],
    },
  },
  {
    code: "S3",
    fiche: "/fiches/S3_piece-courte-transmission.pdf",
    availability: "now",
    duration: { fr: "10 à 30 min selon la pièce", en: "10–30 min depending on the piece", uk: "10–30 хв залежно від роботи" },
    cast: { fr: "Selon votre effectif", en: "Your own company", uk: "За вашим складом" },
    title: { fr: "Pièce courte et transmission", en: "Short piece and transmission", uk: "Коротка робота і перенос" },
    genre: { fr: "Création ou transmission pour votre ensemble", en: "Creation or transmission for your ensemble", uk: "Створення або перенос на ваш склад" },
    lede: {
      fr: "Une pièce signée, créée sur vos danseurs, ou une œuvre du répertoire transmise à votre promotion.",
      en: "A signed piece made on your dancers, or a repertory work passed to your graduating year.",
      uk: "Підписана робота, створена на ваших танцівниках, або твір із репертуару, переданий вашому курсу.",
    },
    body: {
      fr: "MOZART 25, néoclassique sur la Symphonie n° 25, 20 à 25 min, 10 à 20 danseurs. ADIOS, quatuor contemporain sur Benjamin Clementine, 12 min — 1re place, Concours international de chorégraphie, Opéra national de Lviv, 2015. ANIMA, extraits. MERCY, duo sur Max Richter. Ou une création originale écrite sur votre effectif. Le nom du chorégraphe figure au programme et les droits sont déclarés à la SACD.",
      en: "MOZART 25, neoclassical on Symphony no. 25, 20–25 min, 10–20 dancers. ADIOS, contemporary quartet to Benjamin Clementine, 12 min — 1st place, International Choreographers' Competition, Lviv National Opera, 2015. ANIMA, extracts. MERCY, duet to Max Richter. Or an original piece written on your company. The choreographer is credited in the programme and the rights are declared to SACD.",
      uk: "MOZART 25 — неокласика на Симфонію № 25, 20–25 хв, 10–20 танцівників. ADIOS — сучасний квартет на музику Бенжамена Клементайна, 12 хв; 1 місце, Міжнародний конкурс балетмейстерів, Львівська опера, 2015. ANIMA — фрагменти. MERCY — дует на музику Макса Ріхтера. Або оригінальна робота, написана на ваш склад. Ім'я хореографа стоїть у програмці, права декларуються в SACD.",
    },
    buyer: {
      fr: "Direction des études · ballets juniors · conservatoires · compagnies permanentes (soirée mixte)",
      en: "Head of studies · junior companies · conservatoires · permanent companies (mixed bill)",
      uk: "Керівник навчальної частини · юніорські трупи · консерваторії · постійні трупи",
    },
    technical: {
      fr: [
        "Transmission : 15 à 30 heures, en 2 à 4 sessions",
        "Création : 3 à 5 semaines de résidence",
        "Studio équipé, sol de danse, diffusion sonore",
        "Vidéos intégrales des pièces sur demande",
      ],
      en: [
        "Transmission: 15–30 hours across 2–4 sessions",
        "Creation: 3–5 weeks of residency",
        "Equipped studio, dance floor, sound",
        "Full videos of the pieces on request",
      ],
      uk: [
        "Перенос: 15–30 годин у 2–4 сесії",
        "Створення: 3–5 тижнів резиденції",
        "Обладнана студія, танцювальна підлога, звук",
        "Повні відео робіт — на запит",
      ],
    },
  },
  {
    code: "S4",
    fiche: "/fiches/S4_choregraphie-opera.pdf",
    availability: "now",
    duration: { fr: "2 à 5 semaines par production", en: "2–5 weeks per production", uk: "2–5 тижнів на постановку" },
    cast: { fr: "Selon la production", en: "As the production requires", uk: "За постановкою" },
    title: {
      fr: "Chorégraphie et direction des mouvements pour l'opéra",
      en: "Choreography and movement direction for opera",
      uk: "Хореографія і постановка руху в опері",
    },
    genre: { fr: "Collaboration à une production lyrique", en: "Collaboration on a lyric production", uk: "Співпраця в оперній постановці" },
    lede: {
      fr: "Un chorégraphe formé à l'école classique et au théâtre physique, habitué aux plateaux de grande échelle et au direct.",
      en: "A choreographer trained in the classical school and in physical theatre, at home on large stages and live broadcast.",
      uk: "Хореограф класичної школи й фізичного театру, звиклий до великих сцен і прямого ефіру.",
    },
    body: {
      fr: "Écriture des scènes dansées, mouvement du chœur, direction d'acteurs au plateau. Référence : Carmen (Bizet / Chtchedrine), 2019, et dix-neuf ans de mise en scène de grande échelle — opéra, arenas de dix mille spectateurs, cérémonies officielles, direct télévisé. Répertoire de référence : Carmen, Faust, La Traviata, Aïda, Orphée, opérette — tout ouvrage comportant des scènes dansées ou un chœur en mouvement.",
      en: "Writing the danced scenes, moving the chorus, directing bodies on stage. Reference: Carmen (Bizet / Shchedrin), 2019, and nineteen years of large-scale staging — opera, arenas of ten thousand, state ceremonies, live broadcast. Repertory: Carmen, Faust, La Traviata, Aida, Orphée, operetta — any work with danced scenes or a chorus in movement.",
      uk: "Написання танцювальних сцен, рух хору, робота з артистами на сцені. Референс: «Кармен» (Бізе / Щедрін), 2019, і дев'ятнадцять років постановок великого масштабу — опера, арени на десять тисяч, державні церемонії, прямий ефір. Репертуар: «Кармен», «Фауст», «Травіата», «Аїда», «Орфей», оперета — усе, де є танцювальні сцени або хор у русі.",
    },
    buyer: {
      fr: "Direction artistique de la production lyrique · maisons d'opéra · festivals lyriques",
      en: "Artistic direction of the lyric production · opera houses · lyric festivals",
      uk: "Художня дирекція оперної постановки · оперні доми · оперні фестивалі",
    },
    technical: {
      fr: [
        "S'inscrit dans le calendrier et les moyens de la maison",
        "Contrat CDDU",
        "Assistant·e chorégraphique sur demande",
        "Présence aux raccords et à la première série",
      ],
      en: [
        "Fits the house calendar and means",
        "Fixed-term performing-arts contract",
        "Choreographic assistant on request",
        "Present for run-throughs and the first series",
      ],
      uk: [
        "Вписується в календар і можливості дому",
        "Контракт CDDU",
        "Асистент-хореограф — на запит",
        "Присутність на зведених і першій серії",
      ],
    },
  },
];

export const proCopy: Record<Locale, Record<string, string>> = {
  fr: {
    label: "Espace professionnel",
    title: "Programmer le travail",
    lede: "Quatre formats, du plus léger au plus engageant. Chaque fiche tient sur une page : durée, distribution, conditions techniques, ce que la salle doit fournir.",
    intro:
      "La compagnie est installée en Occitanie et travaille en France entière. Les quatre propositions ci-dessous relèvent de lignes budgétaires différentes — action culturelle, diffusion, transmission, production lyrique — et s'adressent donc à des interlocuteurs différents dans la même maison.",
    buyerLabel: "S'adresse à",
    durationLabel: "Durée",
    castLabel: "Distribution",
    techLabel: "Conditions techniques",
    ficheLabel: "Fiche d'offre (PDF)",
    availNow: "Disponible cette saison",
    availSeason: "Création 2027–28 · préachat possible",
    availDev: "En développement",
    condTitle: "Conditions",
    cond1: "Format de rémunération selon les usages de votre structure. Je transmets la fiche et les conditions correspondantes.",
    cond2: "Chaque accueil peut être complété, sans supplément, par un volet d'action culturelle : rencontre, atelier, répétition ouverte.",
    cond3: "L'accueil peut être éligible à un soutien à la diffusion ; je fournis les éléments du dossier.",
    cond4: "Série de trois dates dans un rayon de 150 km : conditions ajustées à la logistique partagée.",
    mentionsTitle: "Mentions",
    mentions:
      "Compagnie Les Oiseaux des Journaux, dite Newspaper Birds. Artem Hordieiev, chorégraphe et direction artistique. Tetiana Hordieieva, production. Base : Tarbes (65), Occitanie — mobilité France entière. SIRET et licence d'entrepreneur de spectacles : en cours d'obtention.",
    contactTitle: "Écrire",
    contactLede: "Une question précise reçoit une réponse précise, sous deux jours ouvrés.",
    cvLink: "CV artistique",
    worksLink: "Les œuvres",
  },
  en: {
    label: "For programmers",
    title: "Programme the work",
    lede: "Four formats, from the lightest to the most committing. Each sheet fits on one page: duration, cast, technical conditions, what the venue provides.",
    intro:
      "The company is based in Occitanie and works across France. The four offers below sit in different budget lines — cultural action, touring, transmission, lyric production — and therefore address different people inside the same house.",
    buyerLabel: "Addressed to",
    durationLabel: "Duration",
    castLabel: "Cast",
    techLabel: "Technical conditions",
    ficheLabel: "Offer sheet (PDF)",
    availNow: "Available this season",
    availSeason: "Premiere 2027–28 · pre-purchase open",
    availDev: "In development",
    condTitle: "Terms",
    cond1: "Fee structure follows your house's usual practice. I send the sheet and the matching terms.",
    cond2: "Every date can include, at no extra cost, a cultural-action strand: meeting, workshop, open rehearsal.",
    cond3: "The date may be eligible for touring support; I supply the dossier material.",
    cond4: "Three dates within 150 km: terms adjusted to the shared logistics.",
    mentionsTitle: "Details",
    mentions:
      "Compagnie Les Oiseaux des Journaux, known as Newspaper Birds. Artem Hordieiev, choreographer and artistic direction. Tetiana Hordieieva, production. Based in Tarbes (65), Occitanie — available across France. French company registration and performing-arts licence: in progress.",
    contactTitle: "Write",
    contactLede: "A precise question gets a precise answer within two working days.",
    cvLink: "Artistic CV",
    worksLink: "The works",
  },
  uk: {
    label: "Для програматорів",
    title: "Замовити роботу",
    lede: "Чотири формати, від найлегшого до найзобов'язальнішого. Кожна картка вміщається на одну сторінку: тривалість, склад, технічні умови, що дає зала.",
    intro:
      "Компанія базується в Окситанії й працює по всій Франції. Чотири пропозиції нижче належать до різних бюджетних ліній — культурна дія, дифузія, перенос, оперна постановка — отже адресовані різним людям у тому самому домі.",
    buyerLabel: "Кому адресовано",
    durationLabel: "Тривалість",
    castLabel: "Склад",
    techLabel: "Технічні умови",
    ficheLabel: "Картка пропозиції (PDF)",
    availNow: "Доступно цього сезону",
    availSeason: "Прем'єра 2027–28 · можливий передпродаж",
    availDev: "У розробці",
    condTitle: "Умови",
    cond1: "Форма гонорару — за практикою вашої структури. Надсилаю картку і відповідні умови.",
    cond2: "Кожен показ може без доплати включати блок культурної дії: зустріч, ательє, відкриту репетицію.",
    cond3: "Показ може підпадати під підтримку дифузії; матеріали досьє надаю.",
    cond4: "Три дати в радіусі 150 км: умови під спільну логістику.",
    mentionsTitle: "Реквізити",
    mentions:
      "Compagnie Les Oiseaux des Journaux, вона ж Newspaper Birds. Артем Гордєєв — хореограф і художній керівник. Тетяна Гордєєва — продюсерка. База: Тарб (65), Окситанія; мобільність по всій Франції. SIRET і ліцензія антрепренера вистав — в оформленні.",
    contactTitle: "Написати",
    contactLede: "На конкретне питання приходить конкретна відповідь протягом двох робочих днів.",
    cvLink: "Творче резюме",
    worksLink: "Роботи",
  },
};
