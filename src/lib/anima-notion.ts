import { Client } from "@notionhq/client";
import { animaData } from "./anima-data";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface AnimaCastMember {
  roleEn: string;
  roleUk: string;
  nameEn: string;
  nameUk: string;
  photo: string;
}

export interface AnimaScene {
  arcana: string;
  arcanaUk: string;
  descriptionEn: string;
  descriptionUk: string;
  image: string;
}

function rt(prop: unknown): string {
  const p = prop as { rich_text?: Array<{plain_text:string}>; title?: Array<{plain_text:string}>; url?: string | null } | null;
  if (!p) return "";
  if (p.title) return p.title.map(t => t.plain_text).join("");
  if (p.rich_text) return p.rich_text.map(t => t.plain_text).join("");
  if (p.url !== undefined) return p.url ?? "";
  return "";
}

function num(prop: unknown): number {
  const p = prop as { number?: number | null } | null;
  return p?.number ?? 999;
}

// Cast
export async function getAnimaCast(): Promise<AnimaCastMember[]> {
  const dbId = process.env.NOTION_ANIMA_CAST_DB_ID;
  if (!process.env.NOTION_API_KEY || !dbId) return getStaticCast();
  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Sort Order", direction: "ascending" }],
    });
    if (res.results.length === 0) return getStaticCast();
    return res.results.map((page) => {
      const p = (page as unknown as Record<string, unknown>).properties as Record<string, unknown>;
      return {
        roleEn: rt(p["Role EN"]),
        roleUk: rt(p["Role UK"]),
        nameEn: rt(p["Performer EN"]),
        nameUk: rt(p["Performer UK"]),
        photo: rt(p["Photo"]),
      };
    });
  } catch { return getStaticCast(); }
}

function getStaticCast(): AnimaCastMember[] {
  return animaData.cast.map(m => ({
    roleEn: m.role.en,
    roleUk: m.role.uk,
    nameEn: m.name.en,
    nameUk: m.name.uk,
    photo: "",
  }));
}

// Scenes
export async function getAnimaScenes(): Promise<AnimaScene[]> {
  const dbId = process.env.NOTION_ANIMA_SCENES_DB_ID;
  if (!process.env.NOTION_API_KEY || !dbId) return getStaticScenes();
  try {
    const res = await notion.databases.query({
      database_id: dbId,
      sorts: [{ property: "Sort Order", direction: "ascending" }],
    });
    if (res.results.length === 0) return getStaticScenes();
    return res.results.map((page) => {
      const p = (page as unknown as Record<string, unknown>).properties as Record<string, unknown>;
      return {
        arcana: rt(p["Arcana"]),
        arcanaUk: rt(p["Arcana UK"]),
        descriptionEn: rt(p["Description EN"]),
        descriptionUk: rt(p["Description UK"]),
        image: rt(p["Image URL"]),
      };
    });
  } catch { return getStaticScenes(); }
}

function getStaticScenes(): AnimaScene[] {
  return animaData.scenes.map(s => ({
    arcana: s.arcana,
    arcanaUk: s.arcanaUk,
    descriptionEn: s.description.en,
    descriptionUk: s.description.uk,
    image: s.image,
  }));
}
