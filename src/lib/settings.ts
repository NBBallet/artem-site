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
    }

    return settings;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}
