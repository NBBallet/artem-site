import { NextResponse } from "next/server";
import { isEditor } from "@/lib/site-editor/session";
import { LANGS, publishChanges, type Change } from "@/lib/site-editor/publish";
import type { Lang } from "@/lib/site-editor/translate";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  if (!(await isEditor())) return NextResponse.json({ ok: false, results: [], error: "Потрібен вхід: /edit" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { lang?: string; path?: string; changes?: Change[] } | null;
  const lang = body?.lang as Lang;
  const changes = (body?.changes ?? []).filter(
    (c) => typeof c?.old === "string" && typeof c?.new === "string" && c.old.trim() && c.old.length <= 5000 && c.new.length <= 5000,
  );
  if (!LANGS.includes(lang) || changes.length === 0 || changes.length > 20)
    return NextResponse.json({ ok: false, results: [], error: "Некоректний запит" }, { status: 400 });
  if (!process.env.GITHUB_TOKEN || !process.env.ANTHROPIC_API_KEY)
    return NextResponse.json({ ok: false, results: [], error: "На сервері не задані ключі GITHUB_TOKEN / ANTHROPIC_API_KEY" }, { status: 500 });
  try {
    const out = await publishChanges({ lang, pagePath: String(body?.path ?? "").slice(0, 200), changes });
    return NextResponse.json(out);
  } catch (e) {
    const err = e as Error & { code?: string };
    const msg = err.code === "conflict" ? "Сайт щойно оновився з іншого місця — натисни «Опублікувати» ще раз." : `Помилка: ${err.message.slice(0, 200)}`;
    return NextResponse.json({ ok: false, results: [], error: msg }, { status: 500 });
  }
}
