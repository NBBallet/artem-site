import { Client } from "@notionhq/client";
import type { Work } from "./works";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const PORTFOLIO_DB_ID = process.env.NOTION_PORTFOLIO_DB_ID!;

// Helper to extract plain text from Notion rich text
function richTextToPlain(
  richText: Array<{ plain_text: string }> | undefined
): string {
  if (!richText) return "";
  return richText.map((t) => t.plain_text).join("");
}

// Helper to extract property values from Notion page
function getProperty(page: Record<string, unknown>, name: string): unknown {
  const props = page.properties as Record<string, Record<string, unknown>>;
  return props?.[name];
}

function getTextProp(page: Record<string, unknown>, name: string): string {
  const prop = getProperty(page, name) as {
    rich_text?: Array<{ plain_text: string }>;
    title?: Array<{ plain_text: string }>;
  } | null;
  if (!prop) return "";
  if (prop.rich_text) return richTextToPlain(prop.rich_text);
  if (prop.title) return richTextToPlain(prop.title);
  return "";
}

function getCheckboxProp(
  page: Record<string, unknown>,
  name: string
): boolean {
  const prop = getProperty(page, name) as {
    checkbox?: boolean;
  } | null;
  return prop?.checkbox ?? false;
}

function getNumberProp(page: Record<string, unknown>, name: string): number {
  const prop = getProperty(page, name) as {
    number?: number | null;
  } | null;
  return prop?.number ?? 999;
}

function getSelectProp(page: Record<string, unknown>, name: string): string {
  const prop = getProperty(page, name) as {
    select?: { name: string } | null;
  } | null;
  return prop?.select?.name ?? "";
}

function getUrlProp(page: Record<string, unknown>, name: string): string {
  const prop = getProperty(page, name) as {
    url?: string | null;
  } | null;
  return prop?.url ?? "";
}

export interface NotionWork extends Work {
  notionId: string;
  category: string;
  published: boolean;
  coverImage: string;
  youtubeIds: string[];
  videoLabels: string[];
  sortOrder: number;
}

export async function getWorksFromNotion(): Promise<NotionWork[]> {
  // If Notion is not configured, return empty (fallback to static)
  if (!process.env.NOTION_API_KEY || !PORTFOLIO_DB_ID) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: PORTFOLIO_DB_ID,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [
        { property: "Sort Order", direction: "ascending" },
      ],
    });

    return response.results.map((page) => {
      const p = page as unknown as Record<string, unknown>;
      const youtubeRaw = getTextProp(p, "YouTube IDs");
      const labelsRaw = getTextProp(p, "Video Labels");

      return {
        notionId: (p as { id: string }).id,
        slug: getTextProp(p, "Slug"),
        title: {
          en: getTextProp(p, "Title"),
          uk: getTextProp(p, "Title UA") || getTextProp(p, "Title"),
        },
        subtitle: {
          en: getTextProp(p, "Subtitle EN"),
          uk: getTextProp(p, "Subtitle UA"),
        },
        year: getTextProp(p, "Year"),
        music: getTextProp(p, "Music"),
        description: {
          en: getTextProp(p, "Description EN"),
          uk: getTextProp(p, "Description UA"),
        },
        image: getUrlProp(p, "Cover Image") || getTextProp(p, "Cover Image"),
        category: getSelectProp(p, "Category"),
        published: getCheckboxProp(p, "Published"),
        coverImage: getUrlProp(p, "Cover Image") || getTextProp(p, "Cover Image"),
        youtubeIds: youtubeRaw ? youtubeRaw.split(",").map((s) => s.trim()) : [],
        videoLabels: labelsRaw ? labelsRaw.split(",").map((s) => s.trim()) : [],
        sortOrder: getNumberProp(p, "Sort Order"),
      };
    });
  } catch (error) {
    console.error("Failed to fetch from Notion:", error);
    return [];
  }
}
