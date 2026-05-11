import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface SiteSettings {
  ctaTextEn: string;
  ctaTextUk: string;
  animaBlockquoteEn: string;
  animaBlockquoteUk: string;
  /** Poster image URLs (Cloudinary). Empty string = use built-in default. */
  animaPoster1: string;
  animaPoster2: string;
  animaPoster3: string;
  animaPoster4: string;
  /** Cloudinary PDF URL for libretto download. Empty = button hidden. */
  animaLibrettoPdf: string;
  /** Credits — all editable in Notion Site Settings */
  animaCreditIdeaEn: string;
  animaCreditIdeaUk: string;
  animaCreditChoreographyEn: string;
  animaCreditChoreographyUk: string;
  animaCreditMusic: string;
  animaCreditCostumesEn: string;
  animaCreditCostumesUk: string;
  animaCreditPremiereDateEn: string;
  animaCreditPremiereDateUk: string;
  animaCreditVenueEn: string;
  animaCreditVenueUk: string;
  animaCreditCompany: string;
  /** Video captions — editable in Notion Site Settings */
  animaVideoShowreelEn: string;
  animaVideoShowreelUk: string;
  animaVideoPremiereEn: string;
  animaVideoPremiereUk: string;
  animaVideoRehearsalEn: string;
  animaVideoRehearsalUk: string;
  /** Festival section */
  animaFestivalName: string;
  animaFestivalSubtitleEn: string;
  animaFestivalSubtitleUk: string;
  animaFestivalDatesEn: string;
  animaFestivalDatesUk: string;
  animaFestivalVenueEn: string;
  animaFestivalVenueUk: string;
  animaFestivalDescriptionEn: string;
  animaFestivalDescriptionUk: string;
  animaFestivalOrganizersEn: string;
  animaFestivalOrganizersUk: string;
  /** LITSO → NBB section */
  animaLitsoTitleEn: string;
  animaLitsoTitleUk: string;
  animaLitsoBodyEn: string;
  animaLitsoBodyUk: string;
  /** Scenes / Arcana section header */
  animaScenesLabelEn: string;
  animaScenesLabelUk: string;
  animaScenesTitleEn: string;
  animaScenesTitleUk: string;
  animaScenesDescriptionEn: string;
  animaScenesDescriptionUk: string;
  /** About section — editable in Notion Site Settings */
  aboutLabelEn: string;
  aboutLabelUk: string;
  aboutNameEn: string;
  aboutNameUk: string;
  aboutRoleEn: string;
  aboutRoleUk: string;
  aboutManifestoEn: string;
  aboutManifestoUk: string;
  aboutBioEn: string;
  aboutBioUk: string;
  aboutNbbEn: string;
  aboutNbbUk: string;
  /** CV / Résumé CTA section */
  cvCtaLabelEn: string;
  cvCtaLabelUk: string;
  cvCtaTitleEn: string;
  cvCtaTitleUk: string;
  cvCtaTextEn: string;
  cvCtaTextUk: string;
  cvCtaBtnEn: string;
  cvCtaBtnUk: string;
  /** CV URL — language-agnostic, stored in Value EN */
  cvUrl: string;
  /** Firebird page */
  firebirdImage: string;
  firebirdUrl: string;
  firebirdBtnEn: string;
  firebirdBtnUk: string;
  firebirdCaptionEn: string;
  firebirdCaptionUk: string;
  /** Firebird page — editable texts */
  firebirdTitleEn: string;
  firebirdTitleUk: string;
  firebirdSubtitleEn: string;
  firebirdSubtitleUk: string;
  firebirdDescriptionEn: string;
  firebirdDescriptionUk: string;
  firebirdYear: string;
  firebirdMusic: string;
  /** Firebird — NYCB reference video */
  firebirdRefVideoId: string;
  firebirdRefLabelEn: string;
  firebirdRefLabelUk: string;
  firebirdRefTitleEn: string;
  firebirdRefTitleUk: string;
  /** The Ants work — editable texts */
  theAntsTitleEn: string;
  theAntsTitleUk: string;
  theAntsSubtitleEn: string;
  theAntsSubtitleUk: string;
  theAntsDescriptionEn: string;
  theAntsDescriptionUk: string;
  theAntsYear: string;
  theAntsMusic: string;
  /** Mozart 25 work — editable texts */
  mozart25TitleEn: string;
  mozart25TitleUk: string;
  mozart25SubtitleEn: string;
  mozart25SubtitleUk: string;
  mozart25DescriptionEn: string;
  mozart25DescriptionUk: string;
  mozart25Year: string;
  mozart25Music: string;
  /** Adios work — editable texts */
  adiosTitleEn: string;
  adiosTitleUk: string;
  adiosSubtitleEn: string;
  adiosSubtitleUk: string;
  adiosDescriptionEn: string;
  adiosDescriptionUk: string;
  adiosYear: string;
  adiosMusic: string;
  /** Carmen work — editable texts */
  carmenTitleEn: string;
  carmenTitleUk: string;
  carmenSubtitleEn: string;
  carmenSubtitleUk: string;
  carmenDescriptionEn: string;
  carmenDescriptionUk: string;
  carmenYear: string;
  carmenMusic: string;
  /** Video captions — per-work (all editable in per-work Notion DBs) */
  theAntsVideo1En: string;
  theAntsVideo1Uk: string;
  theAntsVideo2En: string;
  theAntsVideo2Uk: string;
  mozart25Video1En: string;
  mozart25Video1Uk: string;
  mozart25Video2En: string;
  mozart25Video2Uk: string;
  adiosVideo1En: string;
  adiosVideo1Uk: string;
  adiosVideo2En: string;
  adiosVideo2Uk: string;
  carmenVideo1En: string;
  carmenVideo1Uk: string;
  /** Contact section */
  contactTitleEn: string;
  contactTitleUk: string;
  contactSubtitleEn: string;
  contactSubtitleUk: string;
  /** Email + social links — stored in Value EN */
  contactEmail: string;
  socialInstagram: string;
  socialThreads: string;
  socialTelegram: string;
  /** ── ICARE pitch page — all editable in ⚙️ ICARE Settings DB ── */
  icareImage: string;
  icareHeroLabelEn: string;  icareHeroLabelUk: string;
  icareHeroSubtitleEn: string; icareHeroSubtitleUk: string;
  icareHeroTaglineEn: string;  icareHeroTaglineUk: string;
  icareMissionTitleEn: string; icareMissionTitleUk: string;
  icareMission1932En: string;  icareMission1932Uk: string;
  icareMission93En: string;    icareMission93Uk: string;
  icareMission2026En: string;  icareMission2026Uk: string;
  icareQuoteEn: string;        icareQuoteUk: string;
  icareQuoteCiteEn: string;    icareQuoteCiteUk: string;
  icareConceptTitleEn: string; icareConceptTitleUk: string;
  icareConceptDescEn: string;  icareConceptDescUk: string;
  icarePillar1TitleEn: string; icarePillar1TitleUk: string;
  icarePillar1DescEn: string;  icarePillar1DescUk: string;
  icarePillar2TitleEn: string; icarePillar2TitleUk: string;
  icarePillar2DescEn: string;  icarePillar2DescUk: string;
  icarePillar3TitleEn: string; icarePillar3TitleUk: string;
  icarePillar3DescEn: string;  icarePillar3DescUk: string;
  icareScoreSubtitleEn: string; icareScoreSubtitleUk: string;
  icareScoreDescEn: string;    icareScoreDescUk: string;
  icareDramaturgyTitleEn: string; icareDramaturgyTitleUk: string;
  icareDramaturgyDescEn: string;  icareDramaturgyDescUk: string;
  icareSpecsTitleEn: string;   icareSpecsTitleUk: string;
  icareBioEn: string;          icareBioUk: string;
  icareBio2En: string;         icareBio2Uk: string;
  icareCtaTitleEn: string;     icareCtaTitleUk: string;
  icareCtaTextEn: string;      icareCtaTextUk: string;
  icareCtaBtnEn: string;       icareCtaBtnUk: string;
  /** Premiere CTA — per work (editable in each work's Notion DB) */
  theAntsPremiereTitleEn: string;  theAntsPremiereTitleUk: string;
  theAntsPremiereTextEn: string;   theAntsPremiereTextUk: string;
  theAntsPremiereBtnEn: string;    theAntsPremiereBtnUk: string;
  mozart25PremiereTitleEn: string; mozart25PremiereTitleUk: string;
  mozart25PremiereTextEn: string;  mozart25PremiereTextUk: string;
  mozart25PremiereBtnEn: string;   mozart25PremiereBtnUk: string;
  carmenPremiereTitleEn: string;   carmenPremiereTitleUk: string;
  carmenPremiereTextEn: string;    carmenPremiereTextUk: string;
  carmenPremiereBtnEn: string;     carmenPremiereBtnUk: string;
  /** Mercy page — all editable in ⚙️ Mercy Settings DB */
  mercyImage: string;
  mercyHeroLabelEn: string;     mercyHeroLabelUk: string;
  mercyHeroSubtitleEn: string;  mercyHeroSubtitleUk: string;
  mercyHeroTaglineEn: string;   mercyHeroTaglineUk: string;
  mercyIntroTitleEn: string;    mercyIntroTitleUk: string;
  mercyIntroBodyEn: string;     mercyIntroBodyUk: string;
  mercyContextTitleEn: string;  mercyContextTitleUk: string;
  mercyContextBodyEn: string;   mercyContextBodyUk: string;
  mercyVideo1Id: string;
  mercyVideo1En: string;        mercyVideo1Uk: string;
  mercyCtaTitleEn: string;      mercyCtaTitleUk: string;
  mercyCtaTextEn: string;       mercyCtaTextUk: string;
  mercyCtaBtnEn: string;        mercyCtaBtnUk: string;
  /** Homepage hero — editable in ⚙️ Site Settings DB */
  heroTaglineEn: string;  heroTaglineUk: string;
  heroRoleEn: string;     heroRoleUk: string;
  /** Mercy hero chips — 4 label pills, editable in ⚙️ Mercy Settings DB */
  mercyChip1En: string;   mercyChip1Uk: string;   // year
  mercyChip2En: string;   mercyChip2Uk: string;   // type
  mercyChip3En: string;   mercyChip3Uk: string;   // music
  mercyChip4En: string;   mercyChip4Uk: string;   // place
  /** Humans hero chips — 4 label pills, editable in ⚙️ Humans Settings DB */
  humansChip1En: string;  humansChip1Uk: string;  // year
  humansChip2En: string;  humansChip2Uk: string;  // type
  humansChip3En: string;  humansChip3Uk: string;  // cycle
  humansChip4En: string;  humansChip4Uk: string;  // theme
  /** Humans page — all editable in ⚙️ Humans Settings DB */
  humansImage: string;
  humansHeroLabelEn: string;    humansHeroLabelUk: string;
  humansHeroSubtitleEn: string; humansHeroSubtitleUk: string;
  humansHeroTaglineEn: string;  humansHeroTaglineUk: string;
  humansIntroTitleEn: string;   humansIntroTitleUk: string;
  humansIntroBodyEn: string;    humansIntroBodyUk: string;
  humansMythTitleEn: string;    humansMythTitleUk: string;
  humansMythBodyEn: string;     humansMythBodyUk: string;
  humansVideo1Id: string;
  humansVideo1En: string;       humansVideo1Uk: string;
  humansCtaTitleEn: string;     humansCtaTitleUk: string;
  humansCtaTextEn: string;      humansCtaTextUk: string;
  humansCtaBtnEn: string;       humansCtaBtnUk: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  ctaTextEn:
    "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·",
  ctaTextUk:
    "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·",
  animaBlockquoteEn:
    "The Hero harmonizes himself through the Major Arcana of Tarot. The Soul of the Hero is a separate character who appears in the penultimate scene as the result of all transformations.",
  animaBlockquoteUk:
    "Герой гармонізує себе за допомогою Старших Арканів карт Таро. Душа Героя, це окремий персонаж, що з'являється у передостанній сцені як результат усіх трансформацій.",
  animaPoster1: "",
  animaPoster2: "",
  animaPoster3: "",
  animaPoster4: "",
  animaLibrettoPdf: "",
  animaCreditIdeaEn: "",
  animaCreditIdeaUk: "",
  animaCreditChoreographyEn: "",
  animaCreditChoreographyUk: "",
  animaCreditMusic: "",
  animaCreditCostumesEn: "",
  animaCreditCostumesUk: "",
  animaCreditPremiereDateEn: "",
  animaCreditPremiereDateUk: "",
  animaCreditVenueEn: "",
  animaCreditVenueUk: "",
  animaCreditCompany: "",
  animaVideoShowreelEn: "",
  animaVideoShowreelUk: "",
  animaVideoPremiereEn: "",
  animaVideoPremiereUk: "",
  animaVideoRehearsalEn: "",
  animaVideoRehearsalUk: "",
  animaFestivalName: "",
  animaFestivalSubtitleEn: "",
  animaFestivalSubtitleUk: "",
  animaFestivalDatesEn: "",
  animaFestivalDatesUk: "",
  animaFestivalVenueEn: "",
  animaFestivalVenueUk: "",
  animaFestivalDescriptionEn: "",
  animaFestivalDescriptionUk: "",
  animaFestivalOrganizersEn: "",
  animaFestivalOrganizersUk: "",
  animaLitsoTitleEn: "",
  animaLitsoTitleUk: "",
  animaLitsoBodyEn: "",
  animaLitsoBodyUk: "",
  animaScenesLabelEn: "",
  animaScenesLabelUk: "",
  animaScenesTitleEn: "",
  animaScenesTitleUk: "",
  animaScenesDescriptionEn: "",
  animaScenesDescriptionUk: "",
  aboutLabelEn: "",
  aboutLabelUk: "",
  aboutNameEn: "",
  aboutNameUk: "",
  aboutRoleEn: "",
  aboutRoleUk: "",
  aboutManifestoEn: "",
  aboutManifestoUk: "",
  aboutBioEn: "",
  aboutBioUk: "",
  aboutNbbEn: "",
  aboutNbbUk: "",
  cvCtaLabelEn: "",
  cvCtaLabelUk: "",
  cvCtaTitleEn: "",
  cvCtaTitleUk: "",
  cvCtaTextEn: "",
  cvCtaTextUk: "",
  cvCtaBtnEn: "",
  cvCtaBtnUk: "",
  cvUrl: "",
  firebirdImage: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Nicholas_Roerich_-_Mother_of_the_World%2C_1924_-_warmer_colours.jpg",
  firebirdUrl: "https://firebird-hordieiev.surge.sh/",
  firebirdBtnEn: "View full concept",
  firebirdBtnUk: "Переглянути повну концепцію",
  firebirdCaptionEn: "N. Roerich, Mother of the World, 1924",
  firebirdCaptionUk: "М. Реріх, Мати Світу, 1924",
  firebirdTitleEn: "",
  firebirdTitleUk: "",
  firebirdSubtitleEn: "",
  firebirdSubtitleUk: "",
  firebirdDescriptionEn: "",
  firebirdDescriptionUk: "",
  firebirdYear: "2026",
  firebirdMusic: "Igor Stravinsky",
  firebirdRefVideoId: "MXM3HtkdHMQ",
  firebirdRefLabelEn: "Relevance · Reference",
  firebirdRefLabelUk: "Актуальність · Референс",
  firebirdRefTitleEn: "New York City Ballet — Firebird (Stravinsky)",
  firebirdRefTitleUk: "Нью-Йоркський міський балет — Жар-Птиця (Стравінський)",
  // The Ants & Mozart 25 — text comes from Portfolio — Works DB (bilingual fields there)
  // Settings DB is used ONLY for video captions; leave text fields empty to fall through
  theAntsTitleEn: "", theAntsTitleUk: "",
  theAntsSubtitleEn: "", theAntsSubtitleUk: "",
  theAntsDescriptionEn: "", theAntsDescriptionUk: "",
  theAntsYear: "", theAntsMusic: "",
  mozart25TitleEn: "", mozart25TitleUk: "",
  mozart25SubtitleEn: "", mozart25SubtitleUk: "",
  mozart25DescriptionEn: "", mozart25DescriptionUk: "",
  mozart25Year: "", mozart25Music: "",
  adiosTitleEn: "Adios",
  adiosTitleUk: "Адіос",
  adiosSubtitleEn: "Contemporary ballet · БАЛЕТ-FEST 1st Place",
  adiosSubtitleUk: "Сучасний балет · БАЛЕТ-FEST 1 місце",
  adiosDescriptionEn: "A contemporary solo charged with longing and departure — set to Benjamin Clementine's iconic song from his Mercury Prize-winning debut album At Least for Now.",
  adiosDescriptionUk: "Сучасне соло, насичене тугою та прощанням — на однойменну пісню Бенджаміна Клементайна з його дебютного альбому At Least for Now, що отримав Mercury Prize.",
  adiosYear: "2016",
  adiosMusic: "Benjamin Clementine",
  carmenTitleEn: "Carmen",
  carmenTitleUk: "Кармен",
  carmenSubtitleEn: "One-act ballet · Bizet-Shchedrin",
  carmenSubtitleUk: "Одноактний балет · Бізе-Щедрін",
  carmenDescriptionEn: "Bizet's immortal opera reborn through Rodion Shchedrin's 1967 orchestration for strings and percussion. Presented at the Lviv Opera choreographers competition.",
  carmenDescriptionUk: "Безсмертна опера Бізе, переосмислена крізь оркестровку Щедріна для смичкових та ударних (1967). Представлена на конкурсі балетмейстерів у Львівській опері.",
  carmenYear: "2019",
  carmenMusic: "Georges Bizet / Rodion Shchedrin",
  theAntsVideo1En: "Part 1. Awakening of life in the anthill. Dance of the Queen, the secret service, princesses and ordinary workers.",
  theAntsVideo1Uk: "Частина 1. Пробудження життя в мурашнику. Танок Королеви, секретної служби, принцес та звичайних робітників.",
  theAntsVideo2En: "Part 2. Solo of the Prince, the main hero of the performance.",
  theAntsVideo2Uk: "Частина 2. Соло принца, головного героя вистави.",
  mozart25Video1En: "Stage choreographic development of the ballet. First act. Teaser.",
  mozart25Video1Uk: "Сценічна хореографічна розробка балету. Перший акт. Тизер.",
  mozart25Video2En: "A more extensive, full version of the choreographic text.",
  mozart25Video2Uk: "Більш розлога, повна версія хореографічного тексту.",
  adiosVideo1En: "БАЛЕТ-FEST · 1st Place · Theatrical Recording",
  adiosVideo1Uk: "БАЛЕТ-FEST · 1 місце · Театральний запис",
  adiosVideo2En: "Adios — staging tease",
  adiosVideo2Uk: "Адіос — постановочний тизер",
  carmenVideo1En: "Teaser · Scene 6",
  carmenVideo1Uk: "Тизер · Сцена 6",
  contactTitleEn: "",
  contactTitleUk: "",
  contactSubtitleEn: "",
  contactSubtitleUk: "",
  contactEmail: "",
  socialInstagram: "",
  socialThreads: "",
  socialTelegram: "",
  // ── ICARE defaults ──
  icareImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg/1200px-Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
  icareHeroLabelEn: "World Premiere · 2026",        icareHeroLabelUk: "Світова прем'єра · 2026",
  icareHeroSubtitleEn: "After the score by Igor Markevich, 1932", icareHeroSubtitleUk: "За партитурою Ігоря Маркевича, 1932",
  icareHeroTaglineEn: "The first staging in history of a ballet that waited 93 years for a choreographer.", icareHeroTaglineUk: "Перша в історії постановка балету, що 93 роки чекав хореографа.",
  icareMissionTitleEn: "93 years of waiting. One world premiere.", icareMissionTitleUk: "93 роки очікування. Одна світова прем'єра.",
  icareMission1932En: "Igor Markevich composes Le Vol d'Icare in Paris. Written for Diaghilev's company. Diaghilev died in 1929 — the premiere was postponed indefinitely.", icareMission1932Uk: "Ігор Маркевич написав «Політ Ікара» в Парижі для трупи Дягілєва. Дягілєв помер у 1929-му — прем'єра відтерміновується назавжди.",
  icareMission93En: "Years of silence. The score survived. Concert performances existed. No choreographer gave it a body.", icareMission93Uk: "Роки тиші. Партитура існувала. Концертні виконання були. Хореографічного тіла — не було.",
  icareMission2026En: "Artem Hordieiev creates the first full staging. Ensemble of Five performs the original 1932 score. A world premiere 93 years in the making.", icareMission2026Uk: "Артем Гордієв створює першу повноцінну постановку. Ensemble of Five виконує партитуру 1932 року. Світова прем'єра через 93 роки.",
  icareQuoteEn: "Icarus did not fall by mistake. He chose to fly.", icareQuoteUk: "Ікар не впав через помилку. Він вибрав летіти.",
  icareQuoteCiteEn: "Artem Hordieiev — Choreographer", icareQuoteCiteUk: "Артем Гордієв — хореограф-постановник",
  icareConceptTitleEn: "Three Axes", icareConceptTitleUk: "Три осі координат",
  icareConceptDescEn: "The production is built on the intersection of three cultural strata — together they form a choreographic language entirely its own.", icareConceptDescUk: "Вистава будується на перетині трьох культурних пластів, що разом утворюють власну хореографічну мову.",
  icarePillar1TitleEn: "Flight as Conscious Choice", icarePillar1TitleUk: "Польот як усвідомлений вибір",
  icarePillar1DescEn: "Icarus was not reckless. He knew the wax would melt. He flew anyway — and longer than any human before him. This myth is not a warning. It is a manifesto.", icarePillar1DescUk: "Ікар не безрозсудний. Він знав, що віск розтопиться. Він летів — і довше, ніж будь-хто до нього. Цей міф — не застереження. Це маніфест.",
  icarePillar2TitleEn: "Minoan Substrate", icarePillar2TitleUk: "Мінойський субстрат",
  icarePillar2DescEn: "Crete. The labyrinth. Daedalus. Minoan civilisation as the original source — a movement culture that precedes Greece, precedes logos, where the body is the only truth.", icarePillar2DescUk: "Крит. Лабіринт. Дедал. Мінойська цивілізація як першоджерело — культура руху, що передує Греції, передує логосу, де тіло є єдиною правдою.",
  icarePillar3TitleEn: "Matisse — Body Syntax", icarePillar3TitleUk: "Матіс — синтаксис тіла",
  icarePillar3DescEn: "Blue Nudes. The Jazz cut-outs. Choreography that refuses ornament — only contour, only the essential line, only the irreducible truth of the body in space.", icarePillar3DescUk: "Сині Ню. Аплікації з «Джазу». Хореографія, що відмовляється від орнаменту — тільки контур, тільки суттєва лінія, тільки незвідна правда тіла в просторі.",
  icareScoreSubtitleEn: "Igor Markevich, Paris, 1932", icareScoreSubtitleUk: "Ігор Маркевич, Париж, 1932",
  icareScoreDescEn: "Quintet: violin, viola, cello, double bass, piano. Duration: 27 minutes. Performed by Ensemble of Five.", icareScoreDescUk: "Квінтет: скрипка, альт, віолончель, контрабас, фортепіано. Тривалість: 27 хвилин. Виконує Ensemble of Five.",
  icareDramaturgyTitleEn: "7 Movements · 27 Minutes", icareDramaturgyTitleUk: "7 частин · 27 хвилин",
  icareDramaturgyDescEn: "From silence to flight to illumination. Each movement — a distinct state of body and soul.", icareDramaturgyDescUk: "Від тиші до польоту до осяяння. Кожна частина — окремий стан тіла і душі.",
  icareSpecsTitleEn: "Production Requirements", icareSpecsTitleUk: "Умови постановки",
  icareBioEn: "Artem Hordieiev is a choreographer and founder of Newspaper Ballet Bureau (NBB). His works have been recognised at international competitions and presented on stages across Ukraine and Europe. Productions include The Ants (after Bernard Werber), Anima, Mozart 25, and Carmen (Bizet–Shchedrin).", icareBioUk: "Артем Гордієв — хореограф і засновник Newspaper Ballet Bureau (NBB). Його роботи відзначені на міжнародних конкурсах і представлені на сценах України та Європи. Серед постановок — «Мурахи» (за Бернаром Вербером), «Аніма», «Моцарт 25», «Кармен» (Бізе–Щедрін).",
  icareBio2En: "ICARE — the world's first choreographic staging of Markevich's Le Vol d'Icare — will be the centrepiece of his 2026 Paris season.", icareBio2Uk: "ICARE — перша в світі хореографічна постановка «Польоту Ікара» Маркевича — стане центральним проєктом його паризького сезону 2026 року.",
  icareCtaTitleEn: "Available for World Premiere", icareCtaTitleUk: "Доступна для прем'єри",
  icareCtaTextEn: "ICARE is open to negotiations with theatres, festivals, and producing organisations — exclusive partner for the world premiere staging.", icareCtaTextUk: "ICARE відкрита для переговорів з театрами, фестивалями та продюсерськими організаціями — виключний партнер для першої постановки у світі.",
  icareCtaBtnEn: "Contact Choreographer", icareCtaBtnUk: "Написати хореографу",
  // ── Premiere CTA defaults ──
  theAntsPremiereTitleEn: "Available for Co-Production",  theAntsPremiereTitleUk: "Доступна для копродукції",
  theAntsPremiereTextEn: "The Ants is available for international co-production, festival presentation and touring. Contact us to discuss collaboration.", theAntsPremiereTextUk: "«Мурахи» доступні для міжнародної копродукції, фестивального показу та гастролей. Зв'яжіться з нами, щоб обговорити співпрацю.",
  theAntsPremiereBtnEn: "Book Performance", theAntsPremiereBtnUk: "Замовити виставу",
  mozart25PremiereTitleEn: "Available for International Stages", mozart25PremiereTitleUk: "Доступна для міжнародних сцен",
  mozart25PremiereTextEn: "Mozart 25 is available for festival presentation, international touring and co-production. Contact us to discuss programming.", mozart25PremiereTextUk: "«Моцарт 25» доступний для фестивального показу, міжнародних гастролей та копродукції. Зв'яжіться з нами для обговорення програмування.",
  mozart25PremiereBtnEn: "Book Performance", mozart25PremiereBtnUk: "Замовити виставу",
  carmenPremiereTitleEn: "Available for International Stages", carmenPremiereTitleUk: "Доступна для міжнародних сцен",
  carmenPremiereTextEn: "Carmen (Bizet–Shchedrin) is available for festival presentation, competition and international touring. Contact us to discuss programming.", carmenPremiereTextUk: "«Кармен» (Бізе–Щедрін) доступна для фестивального показу, конкурсу та міжнародних гастролей. Зв'яжіться для обговорення.",
  carmenPremiereBtnEn: "Book Performance", carmenPremiereBtnUk: "Замовити виставу",
  // ── Homepage hero defaults ──
  heroTaglineEn: "",   heroTaglineUk: "",
  heroRoleEn: "",      heroRoleUk: "",
  // ── Mercy chip defaults ──
  mercyChip1En: "2021",             mercyChip1Uk: "2021",
  mercyChip2En: "Dance Film",       mercyChip2Uk: "Танцювальний фільм",
  mercyChip3En: "Max Richter — Voices", mercyChip3Uk: "Max Richter — Voices",
  mercyChip4En: "Lviv",             mercyChip4Uk: "Львів",
  // ── Humans chip defaults ──
  humansChip1En: "2020",            humansChip1Uk: "2020",
  humansChip2En: "Dance Piece",     humansChip2Uk: "Танцювальна п'єса",
  humansChip3En: "Roerich Cycle",   humansChip3Uk: "Цикл Реріха",
  humansChip4En: "Cosmogony",       humansChip4Uk: "Космогонія",
  // ── Mercy defaults ──
  mercyImage: "",
  mercyHeroLabelEn: "2021 · Max Richter · Voices",   mercyHeroLabelUk: "2021 · Max Richter · Voices",
  mercyHeroSubtitleEn: "Dance Film · Vocal-Choreographic Piece", mercyHeroSubtitleUk: "Танцювальний фільм · Вокально-хореографічна п'єса",
  mercyHeroTaglineEn: "Born in lockdown. Danced in defiance. A meditation on mercy, freedom, and the thin line between them.", mercyHeroTaglineUk: "Народжена у локдауні. Станцьована всупереч. Медитація про милосердя, свободу та тонку межу між ними.",
  mercyIntroTitleEn: "When Rehearsal Became Impossible", mercyIntroTitleUk: "Коли репетиція стала неможливою",
  mercyIntroBodyEn: "The pandemic split the National Ballet into seven isolated cohorts of five or six. Ensemble work — the very architecture of ballet — became illegal. Walking through empty Kyiv, the choreographer encountered the raw paradox of the human condition: total isolation inside an entire city. That sensation became the work. At personal expense, without institutional support, he travelled to Lviv and created Mercy — a small production that elevated corps dancers to the status of principal soloists. Not a compromise. A manifesto of what persists when everything is taken away.",
  mercyIntroBodyUk: "Пандемія розбила Національний балет на сім ізольованих груп по п'ять-шість людей. Ансамблева робота — сама архітектура балету — стала незаконною. Блукаючи порожнім Києвом, хореограф зіткнувся з парадоксом людського становища: повна ізоляція всередині цілого міста. Це відчуття стало виставою. За власні кошти, без інституційної підтримки, він поїхав до Львова і створив Mercy — невелику постановку, яка підняла артистів кордебалету до статусу провідних солістів. Не компроміс. Маніфест того, що лишається, коли все відібрано.",
  mercyContextTitleEn: "Max Richter · Voices · The Chain of Meaning", mercyContextTitleUk: "Max Richter · Voices · Ланцюг смислу",
  mercyContextBodyEn: "The choreography is set to Max Richter's Voices (2020), built on a single radical act: a twenty-four-hour continuous reading of the Universal Declaration of Human Rights, as voiced by Eleanor Roosevelt in 1948. That Declaration, in turn, invoked the Roerich Pact — the first international treaty protecting cultural heritage in wartime, signed in Washington in 1935. The chain: a ballet born from pandemic isolation, choreographed to music about human rights, rooted in a treaty that made culture sacred. Mercy stands in that lineage. In potential — it is a large project.",
  mercyContextBodyUk: "Хореографія поставлена на музику Макса Ріхтера Voices (2020) — твір, побудований на одному радикальному акті: двадцятичотиригодинному безперервному читанні Загальної декларації прав людини у виконанні Елеонори Рузвельт, 1948. Та Декларація, своєю чергою, спиралась на Пакт Реріха — перший міжнародний договір про захист культурної спадщини під час війни, підписаний у Вашингтоні 1935 року. Ланцюг: балет, народжений з пандемічної ізоляції, поставлений на музику про права людини, вкорінену в договорі, що зробив культуру священною. Mercy стоїть у цій традиції. В потенціалі — великий проєкт.",
  mercyVideo1Id: "",
  mercyVideo1En: "", mercyVideo1Uk: "",
  mercyCtaTitleEn: "A Work in Development",  mercyCtaTitleUk: "Проєкт у розробці",
  mercyCtaTextEn: "Mercy is in the conceptual and choreographic development phase. Producing partners interested in a full-length development are welcome to reach out. The artistic foundation exists. The scale is available.",
  mercyCtaTextUk: "Mercy перебуває у фазі концептуальної та хореографічної розробки. Виробничі партнери, зацікавлені у повномасштабній постановці, можуть звернутися напряму. Мистецька основа існує. Масштаб — доступний.",
  mercyCtaBtnEn: "Discuss the Project",      mercyCtaBtnUk: "Обговорити проєкт",
  // ── Humans defaults ──
  humansImage: "",
  humansHeroLabelEn: "Roerich Cosmogony · Dance Piece", humansHeroLabelUk: "Космогонія Реріха · Танцювальна п'єса",
  humansHeroSubtitleEn: "Part of the Roerich Sacred Cycle", humansHeroSubtitleUk: "Частина сакрального циклу Реріха",
  humansHeroTaglineEn: "Before the first rule. Before the first word. The ritual that made us human.", humansHeroTaglineUk: "До першого правила. До першого слова. Ритуал, що зробив нас людьми.",
  humansIntroTitleEn: "A Choreographic Cosmogony", humansIntroTitleUk: "Хореографічна космогонія",
  humansIntroBodyEn: "Humans is the second chapter of a sacred cycle rooted in the philosophical legacy of Nicholas Roerich — painter, explorer, and architect of the Roerich Pact. The work continues a choreographic research into the ancient mystical rituals that precede recorded civilization: the awakening of nature, the origin of consciousness, the first moment a body became human. The audience enters a hypothetical world in which human beings were not born — they were made. Not by gods in the theological sense. By cosmic parents: beings from another plane whose ritual dance is itself the act of creation.",
  humansIntroBodyUk: "Humans — другий розділ сакрального циклу, вкоріненого у філософській спадщині Миколи Реріха — художника, дослідника і архітектора Пакту Реріха. Вистава продовжує хореографічне дослідження стародавніх містичних ритуалів, що передують зафіксованій цивілізації: пробудження природи, витоки свідомості, перший момент, коли тіло стало людиною. Глядач занурюється у гіпотетичний світ, де людей не народжують — їх творять. Не богами в теологічному сенсі. Космічними батьками: істотами з іншої площини, чий ритуальний танець є самим актом творення.",
  humansMythTitleEn: "The Myth of Making", humansMythTitleUk: "Міф про Творення",
  humansMythBodyEn: "The cosmic parents arrive. Their bodies enact an ancient ritual: the awakening of matter, the shaping of form, the ignition of consciousness. From their movement, a human being is born — incomplete, dependent, terrified, full of unrealised potential. Then the parents depart. Back to their native planet. The created being is left alone on Earth — to discover language, to establish rules, to build civilisation from nothing. This is the fundamental human condition: made by something greater than ourselves, then abandoned to the impossible task of becoming.",
  humansMythBodyUk: "Космічні батьки з'являються. Їхні тіла відтворюють стародавній ритуал: пробудження матерії, формування форми, запалення свідомості. З їхнього руху народжується людина — неповна, залежна, налякана, сповнена нереалізованого потенціалу. Потім батьки йдуть. Назад на свою рідну планету. Створена істота залишається на Землі на самоті — щоб відкрити мову, встановити правила, побудувати цивілізацію з нічого. Це фундаментальний стан людини: створений чимось більшим за себе, а потім покинутий перед неможливим завданням ставати.",
  humansVideo1Id: "",
  humansVideo1En: "", humansVideo1Uk: "",
  humansCtaTitleEn: "Part of the Roerich Cycle", humansCtaTitleUk: "Частина циклу Реріха",
  humansCtaTextEn: "Humans is in active development as the second part of a larger Roerich cosmogony trilogy. Co-production partners and festival presenters are invited to begin a conversation about future staging.",
  humansCtaTextUk: "Humans у активній розробці як друга частина більшої трилогії космогонії Реріха. Виробничі партнери та фестивальні презентери запрошуються до початку розмови про майбутню постановку.",
  humansCtaBtnEn: "Discuss the Project", humansCtaBtnUk: "Обговорити проєкт",
};

function richText(rt: Array<{ plain_text: string }> | undefined): string {
  // Collapse Notion newlines to spaces so body text wraps naturally in HTML
  return (rt?.map((t) => t.plain_text).join("") ?? "").replace(/\n/g, " ");
}

/** Query one Notion DB, return [] if env var is missing or query fails. */
async function queryDb(dbId: string | undefined): Promise<unknown[]> {
  if (!dbId) return [];
  try {
    const res = await notion.databases.query({ database_id: dbId });
    return res.results;
  } catch (err) {
    console.error(`[settings] queryDb(${dbId.slice(0, 8)}…) failed:`, err);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_SETTINGS_DB_ID)
    return DEFAULT_SETTINGS;

  try {
    // All DBs queried in parallel — per-work DBs override main DB for their keys
    const [mainRows, animaRows, adiosRows, carmenRows, firebirdRows, theAntsRows, mozart25Rows, icareRows, mercyRows, humansRows] =
      await Promise.all([
        queryDb(process.env.NOTION_SETTINGS_DB_ID),
        queryDb(process.env.NOTION_ANIMA_DB_ID),
        queryDb(process.env.NOTION_ADIOS_DB_ID),
        queryDb(process.env.NOTION_CARMEN_DB_ID),
        queryDb(process.env.NOTION_FIREBIRD_DB_ID),
        queryDb(process.env.NOTION_THE_ANTS_DB_ID),
        queryDb(process.env.NOTION_MOZART25_DB_ID),
        queryDb(process.env.NOTION_ICARE_DB_ID),
        queryDb(process.env.NOTION_MERCY_DB_ID),
        queryDb(process.env.NOTION_HUMANS_DB_ID),
      ]);

    const settings: SiteSettings = { ...DEFAULT_SETTINGS };
    const allRows = [
      ...mainRows, ...animaRows, ...adiosRows, ...carmenRows,
      ...firebirdRows, ...theAntsRows, ...mozart25Rows, ...icareRows,
      ...mercyRows, ...humansRows,
    ];

    for (const page of allRows) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = (page as any).properties as Record<string, any>;

      const key = richText(props["Setting"]?.title);
      const valueEn = richText(props["Value EN"]?.rich_text);
      const valueUk = richText(props["Value UK"]?.rich_text);

      if (key === "cta_text") {
        if (valueEn) settings.ctaTextEn = valueEn;
        if (valueUk) settings.ctaTextUk = valueUk;
      }
      // Homepage hero
      if (key === "hero_tagline") { if (valueEn) settings.heroTaglineEn = valueEn; if (valueUk) settings.heroTaglineUk = valueUk; }
      if (key === "hero_role") { if (valueEn) settings.heroRoleEn = valueEn; if (valueUk) settings.heroRoleUk = valueUk; }
      // Mercy chips
      if (key === "mercy_chip_1") { if (valueEn) settings.mercyChip1En = valueEn; if (valueUk) settings.mercyChip1Uk = valueUk; }
      if (key === "mercy_chip_2") { if (valueEn) settings.mercyChip2En = valueEn; if (valueUk) settings.mercyChip2Uk = valueUk; }
      if (key === "mercy_chip_3") { if (valueEn) settings.mercyChip3En = valueEn; if (valueUk) settings.mercyChip3Uk = valueUk; }
      if (key === "mercy_chip_4") { if (valueEn) settings.mercyChip4En = valueEn; if (valueUk) settings.mercyChip4Uk = valueUk; }
      // Humans chips
      if (key === "humans_chip_1") { if (valueEn) settings.humansChip1En = valueEn; if (valueUk) settings.humansChip1Uk = valueUk; }
      if (key === "humans_chip_2") { if (valueEn) settings.humansChip2En = valueEn; if (valueUk) settings.humansChip2Uk = valueUk; }
      if (key === "humans_chip_3") { if (valueEn) settings.humansChip3En = valueEn; if (valueUk) settings.humansChip3Uk = valueUk; }
      if (key === "humans_chip_4") { if (valueEn) settings.humansChip4En = valueEn; if (valueUk) settings.humansChip4Uk = valueUk; }
      if (key === "anima_blockquote") {
        if (valueEn) settings.animaBlockquoteEn = valueEn;
        if (valueUk) settings.animaBlockquoteUk = valueUk;
      }
      // Poster URLs and PDF — URL is language-agnostic, stored in Value EN
      if (key === "anima_poster_1" && valueEn) settings.animaPoster1 = valueEn;
      if (key === "anima_poster_2" && valueEn) settings.animaPoster2 = valueEn;
      if (key === "anima_poster_3" && valueEn) settings.animaPoster3 = valueEn;
      if (key === "anima_poster_4" && valueEn) settings.animaPoster4 = valueEn;
      if (key === "anima_libretto_pdf" && valueEn) settings.animaLibrettoPdf = valueEn;
      // Credits
      if (key === "anima_credit_idea") {
        if (valueEn) settings.animaCreditIdeaEn = valueEn;
        if (valueUk) settings.animaCreditIdeaUk = valueUk;
      }
      if (key === "anima_credit_choreography") {
        if (valueEn) settings.animaCreditChoreographyEn = valueEn;
        if (valueUk) settings.animaCreditChoreographyUk = valueUk;
      }
      if (key === "anima_credit_music" && valueEn) settings.animaCreditMusic = valueEn;
      if (key === "anima_credit_costumes") {
        if (valueEn) settings.animaCreditCostumesEn = valueEn;
        if (valueUk) settings.animaCreditCostumesUk = valueUk;
      }
      if (key === "anima_credit_premiere_date") {
        if (valueEn) settings.animaCreditPremiereDateEn = valueEn;
        if (valueUk) settings.animaCreditPremiereDateUk = valueUk;
      }
      if (key === "anima_credit_venue") {
        if (valueEn) settings.animaCreditVenueEn = valueEn;
        if (valueUk) settings.animaCreditVenueUk = valueUk;
      }
      if (key === "anima_credit_company" && valueEn) settings.animaCreditCompany = valueEn;
      // Video captions
      if (key === "anima_video_showreel") {
        if (valueEn) settings.animaVideoShowreelEn = valueEn;
        if (valueUk) settings.animaVideoShowreelUk = valueUk;
      }
      if (key === "anima_video_premiere") {
        if (valueEn) settings.animaVideoPremiereEn = valueEn;
        if (valueUk) settings.animaVideoPremiereUk = valueUk;
      }
      if (key === "anima_video_rehearsal") {
        if (valueEn) settings.animaVideoRehearsalEn = valueEn;
        if (valueUk) settings.animaVideoRehearsalUk = valueUk;
      }
      // Festival section
      if (key === "anima_festival_name" && valueEn) settings.animaFestivalName = valueEn;
      if (key === "anima_festival_subtitle") {
        if (valueEn) settings.animaFestivalSubtitleEn = valueEn;
        if (valueUk) settings.animaFestivalSubtitleUk = valueUk;
      }
      if (key === "anima_festival_dates") {
        if (valueEn) settings.animaFestivalDatesEn = valueEn;
        if (valueUk) settings.animaFestivalDatesUk = valueUk;
      }
      if (key === "anima_festival_venue") {
        if (valueEn) settings.animaFestivalVenueEn = valueEn;
        if (valueUk) settings.animaFestivalVenueUk = valueUk;
      }
      if (key === "anima_festival_description") {
        if (valueEn) settings.animaFestivalDescriptionEn = valueEn;
        if (valueUk) settings.animaFestivalDescriptionUk = valueUk;
      }
      if (key === "anima_festival_organizers") {
        if (valueEn) settings.animaFestivalOrganizersEn = valueEn;
        if (valueUk) settings.animaFestivalOrganizersUk = valueUk;
      }
      // LITSO → NBB section
      if (key === "anima_litso_title") {
        if (valueEn) settings.animaLitsoTitleEn = valueEn;
        if (valueUk) settings.animaLitsoTitleUk = valueUk;
      }
      if (key === "anima_litso_body") {
        if (valueEn) settings.animaLitsoBodyEn = valueEn;
        if (valueUk) settings.animaLitsoBodyUk = valueUk;
      }
      // Scenes section header
      if (key === "anima_scenes_label") {
        if (valueEn) settings.animaScenesLabelEn = valueEn;
        if (valueUk) settings.animaScenesLabelUk = valueUk;
      }
      if (key === "anima_scenes_title") {
        if (valueEn) settings.animaScenesTitleEn = valueEn;
        if (valueUk) settings.animaScenesTitleUk = valueUk;
      }
      if (key === "anima_scenes_description") {
        if (valueEn) settings.animaScenesDescriptionEn = valueEn;
        if (valueUk) settings.animaScenesDescriptionUk = valueUk;
      }
      // About section
      if (key === "about_label") {
        if (valueEn) settings.aboutLabelEn = valueEn;
        if (valueUk) settings.aboutLabelUk = valueUk;
      }
      if (key === "about_name") {
        if (valueEn) settings.aboutNameEn = valueEn;
        if (valueUk) settings.aboutNameUk = valueUk;
      }
      if (key === "about_role") {
        if (valueEn) settings.aboutRoleEn = valueEn;
        if (valueUk) settings.aboutRoleUk = valueUk;
      }
      if (key === "about_manifesto") {
        if (valueEn) settings.aboutManifestoEn = valueEn;
        if (valueUk) settings.aboutManifestoUk = valueUk;
      }
      if (key === "about_bio") {
        if (valueEn) settings.aboutBioEn = valueEn;
        if (valueUk) settings.aboutBioUk = valueUk;
      }
      if (key === "about_nbb") {
        if (valueEn) settings.aboutNbbEn = valueEn;
        if (valueUk) settings.aboutNbbUk = valueUk;
      }
      // CV CTA section
      if (key === "cv_cta_label") {
        if (valueEn) settings.cvCtaLabelEn = valueEn;
        if (valueUk) settings.cvCtaLabelUk = valueUk;
      }
      if (key === "cv_cta_title") {
        if (valueEn) settings.cvCtaTitleEn = valueEn;
        if (valueUk) settings.cvCtaTitleUk = valueUk;
      }
      if (key === "cv_cta_text") {
        if (valueEn) settings.cvCtaTextEn = valueEn;
        if (valueUk) settings.cvCtaTextUk = valueUk;
      }
      if (key === "cv_cta_btn") {
        if (valueEn) settings.cvCtaBtnEn = valueEn;
        if (valueUk) settings.cvCtaBtnUk = valueUk;
      }
      if (key === "cv_url" && valueEn) settings.cvUrl = valueEn;
      // Contact section
      if (key === "contact_title") {
        if (valueEn) settings.contactTitleEn = valueEn;
        if (valueUk) settings.contactTitleUk = valueUk;
      }
      if (key === "contact_subtitle") {
        if (valueEn) settings.contactSubtitleEn = valueEn;
        if (valueUk) settings.contactSubtitleUk = valueUk;
      }
      // Firebird page
      if (key === "firebird_image" && valueEn) settings.firebirdImage = valueEn;
      if (key === "firebird_url" && valueEn) settings.firebirdUrl = valueEn;
      if (key === "firebird_btn") {
        if (valueEn) settings.firebirdBtnEn = valueEn;
        if (valueUk) settings.firebirdBtnUk = valueUk;
      }
      if (key === "firebird_caption") {
        if (valueEn) settings.firebirdCaptionEn = valueEn;
        if (valueUk) settings.firebirdCaptionUk = valueUk;
      }
      if (key === "firebird_title") {
        if (valueEn) settings.firebirdTitleEn = valueEn;
        if (valueUk) settings.firebirdTitleUk = valueUk;
      }
      if (key === "firebird_subtitle") {
        if (valueEn) settings.firebirdSubtitleEn = valueEn;
        if (valueUk) settings.firebirdSubtitleUk = valueUk;
      }
      if (key === "firebird_description") {
        if (valueEn) settings.firebirdDescriptionEn = valueEn;
        if (valueUk) settings.firebirdDescriptionUk = valueUk;
      }
      if (key === "firebird_year" && valueEn) settings.firebirdYear = valueEn;
      if (key === "firebird_music" && valueEn) settings.firebirdMusic = valueEn;
      if (key === "firebird_ref_video" && valueEn) settings.firebirdRefVideoId = valueEn;
      if (key === "firebird_ref_label") {
        if (valueEn) settings.firebirdRefLabelEn = valueEn;
        if (valueUk) settings.firebirdRefLabelUk = valueUk;
      }
      if (key === "firebird_ref_title") {
        if (valueEn) settings.firebirdRefTitleEn = valueEn;
        if (valueUk) settings.firebirdRefTitleUk = valueUk;
      }
      if (key === "the_ants_title") {
        if (valueEn) settings.theAntsTitleEn = valueEn;
        if (valueUk) settings.theAntsTitleUk = valueUk;
      }
      if (key === "the_ants_subtitle") {
        if (valueEn) settings.theAntsSubtitleEn = valueEn;
        if (valueUk) settings.theAntsSubtitleUk = valueUk;
      }
      if (key === "the_ants_description") {
        if (valueEn) settings.theAntsDescriptionEn = valueEn;
        if (valueUk) settings.theAntsDescriptionUk = valueUk;
      }
      if (key === "the_ants_year" && valueEn) settings.theAntsYear = valueEn;
      if (key === "the_ants_music" && valueEn) settings.theAntsMusic = valueEn;
      if (key === "mozart25_title") {
        if (valueEn) settings.mozart25TitleEn = valueEn;
        if (valueUk) settings.mozart25TitleUk = valueUk;
      }
      if (key === "mozart25_subtitle") {
        if (valueEn) settings.mozart25SubtitleEn = valueEn;
        if (valueUk) settings.mozart25SubtitleUk = valueUk;
      }
      if (key === "mozart25_description") {
        if (valueEn) settings.mozart25DescriptionEn = valueEn;
        if (valueUk) settings.mozart25DescriptionUk = valueUk;
      }
      if (key === "mozart25_year" && valueEn) settings.mozart25Year = valueEn;
      if (key === "mozart25_music" && valueEn) settings.mozart25Music = valueEn;
      if (key === "adios_title") {
        if (valueEn) settings.adiosTitleEn = valueEn;
        if (valueUk) settings.adiosTitleUk = valueUk;
      }
      if (key === "adios_subtitle") {
        if (valueEn) settings.adiosSubtitleEn = valueEn;
        if (valueUk) settings.adiosSubtitleUk = valueUk;
      }
      if (key === "adios_description") {
        if (valueEn) settings.adiosDescriptionEn = valueEn;
        if (valueUk) settings.adiosDescriptionUk = valueUk;
      }
      if (key === "adios_year" && valueEn) settings.adiosYear = valueEn;
      if (key === "adios_music" && valueEn) settings.adiosMusic = valueEn;
      if (key === "carmen_title") {
        if (valueEn) settings.carmenTitleEn = valueEn;
        if (valueUk) settings.carmenTitleUk = valueUk;
      }
      if (key === "carmen_subtitle") {
        if (valueEn) settings.carmenSubtitleEn = valueEn;
        if (valueUk) settings.carmenSubtitleUk = valueUk;
      }
      if (key === "carmen_description") {
        if (valueEn) settings.carmenDescriptionEn = valueEn;
        if (valueUk) settings.carmenDescriptionUk = valueUk;
      }
      if (key === "carmen_year" && valueEn) settings.carmenYear = valueEn;
      if (key === "carmen_music" && valueEn) settings.carmenMusic = valueEn;
      // Video captions
      if (key === "the_ants_video_1") {
        if (valueEn) settings.theAntsVideo1En = valueEn;
        if (valueUk) settings.theAntsVideo1Uk = valueUk;
      }
      if (key === "the_ants_video_2") {
        if (valueEn) settings.theAntsVideo2En = valueEn;
        if (valueUk) settings.theAntsVideo2Uk = valueUk;
      }
      if (key === "mozart25_video_1") {
        if (valueEn) settings.mozart25Video1En = valueEn;
        if (valueUk) settings.mozart25Video1Uk = valueUk;
      }
      if (key === "mozart25_video_2") {
        if (valueEn) settings.mozart25Video2En = valueEn;
        if (valueUk) settings.mozart25Video2Uk = valueUk;
      }
      if (key === "adios_video_1") {
        if (valueEn) settings.adiosVideo1En = valueEn;
        if (valueUk) settings.adiosVideo1Uk = valueUk;
      }
      if (key === "adios_video_2") {
        if (valueEn) settings.adiosVideo2En = valueEn;
        if (valueUk) settings.adiosVideo2Uk = valueUk;
      }
      if (key === "carmen_video_1") {
        if (valueEn) settings.carmenVideo1En = valueEn;
        if (valueUk) settings.carmenVideo1Uk = valueUk;
      }
      if (key === "contact_email" && valueEn) settings.contactEmail = valueEn;
      if (key === "social_instagram" && valueEn) settings.socialInstagram = valueEn;
      if (key === "social_threads" && valueEn) settings.socialThreads = valueEn;
      if (key === "social_telegram" && valueEn) settings.socialTelegram = valueEn;
      // ── ICARE page ──
      if (key === "icare_image" && valueEn) settings.icareImage = valueEn;
      if (key === "icare_hero_label") { if (valueEn) settings.icareHeroLabelEn = valueEn; if (valueUk) settings.icareHeroLabelUk = valueUk; }
      if (key === "icare_hero_subtitle") { if (valueEn) settings.icareHeroSubtitleEn = valueEn; if (valueUk) settings.icareHeroSubtitleUk = valueUk; }
      if (key === "icare_hero_tagline") { if (valueEn) settings.icareHeroTaglineEn = valueEn; if (valueUk) settings.icareHeroTaglineUk = valueUk; }
      if (key === "icare_mission_title") { if (valueEn) settings.icareMissionTitleEn = valueEn; if (valueUk) settings.icareMissionTitleUk = valueUk; }
      if (key === "icare_mission_1932") { if (valueEn) settings.icareMission1932En = valueEn; if (valueUk) settings.icareMission1932Uk = valueUk; }
      if (key === "icare_mission_93") { if (valueEn) settings.icareMission93En = valueEn; if (valueUk) settings.icareMission93Uk = valueUk; }
      if (key === "icare_mission_2026") { if (valueEn) settings.icareMission2026En = valueEn; if (valueUk) settings.icareMission2026Uk = valueUk; }
      if (key === "icare_quote") { if (valueEn) settings.icareQuoteEn = valueEn; if (valueUk) settings.icareQuoteUk = valueUk; }
      if (key === "icare_quote_cite") { if (valueEn) settings.icareQuoteCiteEn = valueEn; if (valueUk) settings.icareQuoteCiteUk = valueUk; }
      if (key === "icare_concept_title") { if (valueEn) settings.icareConceptTitleEn = valueEn; if (valueUk) settings.icareConceptTitleUk = valueUk; }
      if (key === "icare_concept_desc") { if (valueEn) settings.icareConceptDescEn = valueEn; if (valueUk) settings.icareConceptDescUk = valueUk; }
      if (key === "icare_pillar_1_title") { if (valueEn) settings.icarePillar1TitleEn = valueEn; if (valueUk) settings.icarePillar1TitleUk = valueUk; }
      if (key === "icare_pillar_1_desc") { if (valueEn) settings.icarePillar1DescEn = valueEn; if (valueUk) settings.icarePillar1DescUk = valueUk; }
      if (key === "icare_pillar_2_title") { if (valueEn) settings.icarePillar2TitleEn = valueEn; if (valueUk) settings.icarePillar2TitleUk = valueUk; }
      if (key === "icare_pillar_2_desc") { if (valueEn) settings.icarePillar2DescEn = valueEn; if (valueUk) settings.icarePillar2DescUk = valueUk; }
      if (key === "icare_pillar_3_title") { if (valueEn) settings.icarePillar3TitleEn = valueEn; if (valueUk) settings.icarePillar3TitleUk = valueUk; }
      if (key === "icare_pillar_3_desc") { if (valueEn) settings.icarePillar3DescEn = valueEn; if (valueUk) settings.icarePillar3DescUk = valueUk; }
      if (key === "icare_score_subtitle") { if (valueEn) settings.icareScoreSubtitleEn = valueEn; if (valueUk) settings.icareScoreSubtitleUk = valueUk; }
      if (key === "icare_score_desc") { if (valueEn) settings.icareScoreDescEn = valueEn; if (valueUk) settings.icareScoreDescUk = valueUk; }
      if (key === "icare_dramaturgy_title") { if (valueEn) settings.icareDramaturgyTitleEn = valueEn; if (valueUk) settings.icareDramaturgyTitleUk = valueUk; }
      if (key === "icare_dramaturgy_desc") { if (valueEn) settings.icareDramaturgyDescEn = valueEn; if (valueUk) settings.icareDramaturgyDescUk = valueUk; }
      if (key === "icare_specs_title") { if (valueEn) settings.icareSpecsTitleEn = valueEn; if (valueUk) settings.icareSpecsTitleUk = valueUk; }
      if (key === "icare_bio") { if (valueEn) settings.icareBioEn = valueEn; if (valueUk) settings.icareBioUk = valueUk; }
      if (key === "icare_bio_2") { if (valueEn) settings.icareBio2En = valueEn; if (valueUk) settings.icareBio2Uk = valueUk; }
      if (key === "icare_cta_title") { if (valueEn) settings.icareCtaTitleEn = valueEn; if (valueUk) settings.icareCtaTitleUk = valueUk; }
      if (key === "icare_cta_text") { if (valueEn) settings.icareCtaTextEn = valueEn; if (valueUk) settings.icareCtaTextUk = valueUk; }
      if (key === "icare_cta_btn") { if (valueEn) settings.icareCtaBtnEn = valueEn; if (valueUk) settings.icareCtaBtnUk = valueUk; }
      // ── Premiere CTA per work ──
      if (key === "the_ants_premiere_title") { if (valueEn) settings.theAntsPremiereTitleEn = valueEn; if (valueUk) settings.theAntsPremiereTitleUk = valueUk; }
      if (key === "the_ants_premiere_text") { if (valueEn) settings.theAntsPremiereTextEn = valueEn; if (valueUk) settings.theAntsPremiereTextUk = valueUk; }
      if (key === "the_ants_premiere_btn") { if (valueEn) settings.theAntsPremiereBtnEn = valueEn; if (valueUk) settings.theAntsPremiereBtnUk = valueUk; }
      if (key === "mozart25_premiere_title") { if (valueEn) settings.mozart25PremiereTitleEn = valueEn; if (valueUk) settings.mozart25PremiereTitleUk = valueUk; }
      if (key === "mozart25_premiere_text") { if (valueEn) settings.mozart25PremiereTextEn = valueEn; if (valueUk) settings.mozart25PremiereTextUk = valueUk; }
      if (key === "mozart25_premiere_btn") { if (valueEn) settings.mozart25PremiereBtnEn = valueEn; if (valueUk) settings.mozart25PremiereBtnUk = valueUk; }
      if (key === "carmen_premiere_title") { if (valueEn) settings.carmenPremiereTitleEn = valueEn; if (valueUk) settings.carmenPremiereTitleUk = valueUk; }
      if (key === "carmen_premiere_text") { if (valueEn) settings.carmenPremiereTextEn = valueEn; if (valueUk) settings.carmenPremiereTextUk = valueUk; }
      if (key === "carmen_premiere_btn") { if (valueEn) settings.carmenPremiereBtnEn = valueEn; if (valueUk) settings.carmenPremiereBtnUk = valueUk; }
      // ── Mercy page ──
      if (key === "mercy_image" && valueEn) settings.mercyImage = valueEn;
      if (key === "mercy_hero_label") { if (valueEn) settings.mercyHeroLabelEn = valueEn; if (valueUk) settings.mercyHeroLabelUk = valueUk; }
      if (key === "mercy_hero_subtitle") { if (valueEn) settings.mercyHeroSubtitleEn = valueEn; if (valueUk) settings.mercyHeroSubtitleUk = valueUk; }
      if (key === "mercy_hero_tagline") { if (valueEn) settings.mercyHeroTaglineEn = valueEn; if (valueUk) settings.mercyHeroTaglineUk = valueUk; }
      if (key === "mercy_intro_title") { if (valueEn) settings.mercyIntroTitleEn = valueEn; if (valueUk) settings.mercyIntroTitleUk = valueUk; }
      if (key === "mercy_intro_body") { if (valueEn) settings.mercyIntroBodyEn = valueEn; if (valueUk) settings.mercyIntroBodyUk = valueUk; }
      if (key === "mercy_context_title") { if (valueEn) settings.mercyContextTitleEn = valueEn; if (valueUk) settings.mercyContextTitleUk = valueUk; }
      if (key === "mercy_context_body") { if (valueEn) settings.mercyContextBodyEn = valueEn; if (valueUk) settings.mercyContextBodyUk = valueUk; }
      if (key === "mercy_video_1" && valueEn) settings.mercyVideo1Id = valueEn;
      if (key === "mercy_video_1_caption") { if (valueEn) settings.mercyVideo1En = valueEn; if (valueUk) settings.mercyVideo1Uk = valueUk; }
      if (key === "mercy_cta_title") { if (valueEn) settings.mercyCtaTitleEn = valueEn; if (valueUk) settings.mercyCtaTitleUk = valueUk; }
      if (key === "mercy_cta_text") { if (valueEn) settings.mercyCtaTextEn = valueEn; if (valueUk) settings.mercyCtaTextUk = valueUk; }
      if (key === "mercy_cta_btn") { if (valueEn) settings.mercyCtaBtnEn = valueEn; if (valueUk) settings.mercyCtaBtnUk = valueUk; }
      // ── Humans page ──
      if (key === "humans_image" && valueEn) settings.humansImage = valueEn;
      if (key === "humans_hero_label") { if (valueEn) settings.humansHeroLabelEn = valueEn; if (valueUk) settings.humansHeroLabelUk = valueUk; }
      if (key === "humans_hero_subtitle") { if (valueEn) settings.humansHeroSubtitleEn = valueEn; if (valueUk) settings.humansHeroSubtitleUk = valueUk; }
      if (key === "humans_hero_tagline") { if (valueEn) settings.humansHeroTaglineEn = valueEn; if (valueUk) settings.humansHeroTaglineUk = valueUk; }
      if (key === "humans_intro_title") { if (valueEn) settings.humansIntroTitleEn = valueEn; if (valueUk) settings.humansIntroTitleUk = valueUk; }
      if (key === "humans_intro_body") { if (valueEn) settings.humansIntroBodyEn = valueEn; if (valueUk) settings.humansIntroBodyUk = valueUk; }
      if (key === "humans_myth_title") { if (valueEn) settings.humansMythTitleEn = valueEn; if (valueUk) settings.humansMythTitleUk = valueUk; }
      if (key === "humans_myth_body") { if (valueEn) settings.humansMythBodyEn = valueEn; if (valueUk) settings.humansMythBodyUk = valueUk; }
      if (key === "humans_video_1" && valueEn) settings.humansVideo1Id = valueEn;
      if (key === "humans_video_1_caption") { if (valueEn) settings.humansVideo1En = valueEn; if (valueUk) settings.humansVideo1Uk = valueUk; }
      if (key === "humans_cta_title") { if (valueEn) settings.humansCtaTitleEn = valueEn; if (valueUk) settings.humansCtaTitleUk = valueUk; }
      if (key === "humans_cta_text") { if (valueEn) settings.humansCtaTextEn = valueEn; if (valueUk) settings.humansCtaTextUk = valueUk; }
      if (key === "humans_cta_btn") { if (valueEn) settings.humansCtaBtnEn = valueEn; if (valueUk) settings.humansCtaBtnUk = valueUk; }
    }

    return settings;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}
