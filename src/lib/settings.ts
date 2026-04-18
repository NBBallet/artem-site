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

export async function getSiteSettings(): Promise<SiteSettings> {
  const dbId = process.env.NOTION_SETTINGS_DB_ID;
  if (!process.env.NOTION_API_KEY || !dbId) return DEFAULT_SETTINGS;

  try {
    const response = await notion.databases.query({ database_id: dbId });
    const settings: SiteSettings = { ...DEFAULT_SETTINGS };

    for (const page of response.results) {
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
