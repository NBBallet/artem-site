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
};

function richText(rt: Array<{ plain_text: string }> | undefined): string {
  return rt?.map((t) => t.plain_text).join("") ?? "";
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
    const [mainRows, animaRows, adiosRows, carmenRows, firebirdRows, theAntsRows, mozart25Rows] =
      await Promise.all([
        queryDb(process.env.NOTION_SETTINGS_DB_ID),
        queryDb(process.env.NOTION_ANIMA_DB_ID),
        queryDb(process.env.NOTION_ADIOS_DB_ID),
        queryDb(process.env.NOTION_CARMEN_DB_ID),
        queryDb(process.env.NOTION_FIREBIRD_DB_ID),
        queryDb(process.env.NOTION_THE_ANTS_DB_ID),
        queryDb(process.env.NOTION_MOZART25_DB_ID),
      ]);

    const settings: SiteSettings = { ...DEFAULT_SETTINGS };
    const allRows = [
      ...mainRows, ...animaRows, ...adiosRows, ...carmenRows,
      ...firebirdRows, ...theAntsRows, ...mozart25Rows,
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
    }

    return settings;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}
