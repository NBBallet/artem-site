import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Forces a real download of the one-page CV, on every platform.
 *
 * A plain `<a href="/cv/…" download>` is enough on desktop and on Android
 * Chrome, but iOS Safari is known to ignore the HTML `download` attribute
 * for same-origin PDFs and opens its built-in viewer instead — the file
 * never reaches the device's Files app. Safari DOES honour a server-sent
 * `Content-Disposition: attachment` header, so this route re-serves the
 * static file from public/cv/ with that header set explicitly. The static
 * files stay published too (linked from elsewhere, easy to inspect), only
 * the CV page's download button points here.
 */

const ALLOWED: Record<string, string> = {
  "Artem-Hordieiev-CV-FR.pdf": "Artem-Hordieiev-CV-FR.pdf",
  "Artem-Hordieiev-CV-UK.pdf": "Artem-Hordieiev-CV-UK.pdf",
  "Artem-Hordieiev-CV-EN.pdf": "Artem-Hordieiev-CV-EN.pdf",
};

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const safeName = ALLOWED[file];
  if (!safeName) {
    return NextResponse.json({ error: "unknown file" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "cv", safeName);
  const bytes = await readFile(filePath);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
