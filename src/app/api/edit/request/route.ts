import { NextResponse } from "next/server";
import { isEditor } from "@/lib/site-editor/session";

export const runtime = "nodejs";

/** «Доручення» — a design/layout request code cannot apply literally. Lands as a
 *  GitHub issue labelled «правка-сайту»; Claude picks these up next session. */
export async function POST(req: Request) {
  if (!(await isEditor())) return new NextResponse("Потрібен вхід: /edit", { status: 401 });
  const body = (await req.json().catch(() => null)) as { lang?: string; path?: string; text?: string; selection?: string } | null;
  const text = String(body?.text ?? "").trim().slice(0, 4000);
  if (!text) return new NextResponse("Порожнє доручення", { status: 400 });
  const path = String(body?.path ?? "").slice(0, 200);
  const selection = String(body?.selection ?? "").trim().slice(0, 1000);
  const res = await fetch("https://api.github.com/repos/NBBallet/artem-site/issues", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ""}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "site-editor",
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `Доручення: ${path || "сайт"} — ${text.slice(0, 60)}`,
      body: `**Сторінка:** https://hordieiev.art${path}\n**Мова:** ${body?.lang ?? "?"}\n\n${text}` +
        (selection ? `\n\n**Біля тексту:**\n> ${selection.replace(/\n/g, "\n> ")}` : ""),
      labels: ["правка-сайту"],
    }),
  });
  if (!res.ok) return new NextResponse(`GitHub ${res.status}`, { status: 502 });
  return NextResponse.json({ ok: true });
}
