import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const settingsDbId = process.env.NOTION_SETTINGS_DB_ID;
  const portfolioDbId = process.env.NOTION_PORTFOLIO_DB_ID;

  const result: Record<string, unknown> = {
    hasApiKey: !!apiKey,
    apiKeyPrefix: apiKey ? apiKey.slice(0, 8) + "…" : "MISSING",
    hasSettingsDb: !!settingsDbId,
    hasPortfolioDb: !!portfolioDbId,
    hasAnimaDb: !!process.env.NOTION_ANIMA_DB_ID,
    hasAdiosDb: !!process.env.NOTION_ADIOS_DB_ID,
    hasCarmenDb: !!process.env.NOTION_CARMEN_DB_ID,
    hasFirebirdDb: !!process.env.NOTION_FIREBIRD_DB_ID,
    hasTheAntsDb: !!process.env.NOTION_THE_ANTS_DB_ID,
    hasMozart25Db: !!process.env.NOTION_MOZART25_DB_ID,
  };

  if (!apiKey || !settingsDbId) {
    return NextResponse.json({ ...result, error: "Missing env vars" });
  }

  const notion = new Client({ auth: apiKey });

  try {
    const res = await notion.databases.query({
      database_id: settingsDbId,
      page_size: 3,
    });
    result.settingsDbOk = true;
    result.settingsDbRows = res.results.length;
    // Show first key to confirm real data
    const first = res.results[0] as any;
    result.firstKey = first?.properties?.["Setting"]?.title?.[0]?.plain_text ?? "?";
  } catch (e: any) {
    result.settingsDbOk = false;
    result.settingsDbError = e.message;
  }

  try {
    const res = await notion.databases.query({
      database_id: portfolioDbId!,
      page_size: 3,
      filter: { property: "Published", checkbox: { equals: true } },
    });
    result.portfolioDbOk = true;
    result.portfolioDbRows = res.results.length;
  } catch (e: any) {
    result.portfolioDbOk = false;
    result.portfolioDbError = e.message;
  }

  return NextResponse.json(result);
}
