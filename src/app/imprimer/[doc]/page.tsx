import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrintOnLoad from "@/components/PrintOnLoad";

/* The sheets left on the table after a pitch (Capitole, 02.10.2026): the two
   one-page dossiers and the accompanying note, in French. Unlisted on purpose —
   nothing on the site links here; only the pitch deck and its PDF do. The
   pages carry noindex, and next.config sends X-Robots-Tag for the files.
   The PDFs are built from the canvas artboards FR-01…03 by
   CHORÉGRAPHE/_інструменти/канва/pdf_аркушів.py. */
export const dynamic = "force-static";
export const dynamicParams = false;

const DOCS: Record<string, { title: string; file: string }> = {
  icare: {
    title: "L'Envol d'Icare — dossier",
    file: "/imprimer/Le-retour-de-Markevitch-icare.pdf",
  },
  lorenzo: {
    title: "Lorenzo il Magnifico — dossier",
    file: "/imprimer/Le-retour-de-Markevitch-lorenzo.pdf",
  },
  note: {
    title: "Note d'accompagnement",
    file: "/imprimer/Le-retour-de-Markevitch-note.pdf",
  },
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
    title: `${DOCS[doc]?.title ?? "Imprimer"} · Le retour de Markevitch`,
    robots: { index: false, follow: false },
  };
}

export default async function ImprimerPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = DOCS[doc];
  if (!d) notFound();
  return <PrintOnLoad href={d.file} title={d.title} />;
}
