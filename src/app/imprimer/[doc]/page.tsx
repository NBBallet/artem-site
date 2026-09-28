import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrintSheet from "@/components/PrintSheet";
import "./imprimer.css";

/* The sheets left on the table after a pitch (Capitole, 02.10.2026): the two
   one-page dossiers and the accompanying note, in French. Unlisted on purpose —
   nothing on the site links here; only the pitch deck and its PDF do. The
   pages carry noindex, and next.config sends X-Robots-Tag for the files.

   The sheet is shown as HTML; «Imprimer» opens its PDF, which every browser
   prints exactly A4 (the page itself printed too large in Safari on a Mac,
   28.09.2026 — see PrintSheet). Both come from the canvas artboards FR-01…04
   via CHORÉGRAPHE/_інструменти/канва/pdf_аркушів.py (src/content/imprimer/*.html
   and public/imprimer/*.pdf). */
export const dynamic = "force-static";
export const dynamicParams = false;

/* Each button prints its own sheet, recto verso: the document on the front,
   the QR code to the online presentation (FR-04) on the back (28.09.2026). */
const DOCS: Record<string, string> = {
  icare: "L'Envol d'Icare — recto verso",
  lorenzo: "Lorenzo il Magnifico — recto verso",
  note: "Note d'accompagnement — recto verso",
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  return {
    title: `${DOCS[doc] ?? "Imprimer"} · Le retour de Markevitch`,
    robots: { index: false, follow: false },
  };
}

export default async function ImprimerPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const title = DOCS[doc];
  if (!title) notFound();
  const html = fs.readFileSync(path.join(process.cwd(), "src/content/imprimer", `${doc}.html`), "utf8");
  const sheets = html.split("<!--sheet-->").map((s) => s.trim());
  return <PrintSheet sheets={sheets} title={title} pdf={`/imprimer/Le-retour-de-Markevitch-${doc}.pdf`} />;
}
