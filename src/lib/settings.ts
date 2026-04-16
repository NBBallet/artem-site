import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface SiteSettings {
  ctaTextEn: string;
  ctaTextUk: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  ctaTextEn:
    "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·",
  ctaTextUk:
    "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·",
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
    }

    return settings;
  } catch (err) {
    console.error("getSiteSettings error:", err);
    return DEFAULT_SETTINGS;
  }
}
