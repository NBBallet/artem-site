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

   The sheet is rendered as HTML and printed with window.print(): phones
   (iOS Safari, Android Chrome) won't let a script print a PDF inside an
   iframe, but they all print the page itself. The PDF stays as a download.
   Both come from the canvas artboards FR-01…03 via
   CHORÉGRAPHE/_інструменти/канва/pdf_аркушів.py (src/content/imprimer/*.html
   and public/imprimer/*.pdf). */
export const dynamic = "force-static";
export const dynamicParams = false;

const DOCS: Record<string, string> = {
  icare: "L'Envol d'Icare — dossier",
  lorenzo: "Lorenzo il Magnifico — dossier",
  note: "Note d'accompagnement",
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
  return <PrintSheet html={html} title={title} pdf={`/imprimer/Le-retour-de-Markevitch-${doc}.pdf`} />;
}
