import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import CvView from "./CvView";

/* The CV is repo-local structured content (src/lib/cv-data.ts, generated from
   design/cv/copy.json) — no Notion fetch, so nothing here can blank out on a
   rate-limited request the way Notion-backed fields can. See AGENTS.md. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Artem Hordieiev — Artistic CV",
    description:
      "Ukrainian choreographer, based in France since May 2026. The Ukrainian academic school meets the Complexions technique of Dwight Rhoden and Desmond Richardson.",
  },
  uk: {
    title: "Артем Гордєєв — творче резюме",
    description:
      "Український хореограф, із травня 2026 у Франції. Українська академічна школа та техніка Complexions Дуайта Родена й Дезмонда Річардсона.",
  },
  fr: {
    title: "Artem Hordieiev — CV artistique",
    description:
      "Chorégraphe ukrainien, installé en France depuis mai 2026. L'école académique ukrainienne rencontre la technique Complexions de Dwight Rhoden et Desmond Richardson.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return META[hasLocale(lang) ? lang : "en"];
}


export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <CvView locale={lang as Locale} />;
}
