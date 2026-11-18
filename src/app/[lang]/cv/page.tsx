import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import CvView from "./CvView";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

/* The CV is repo-local structured content (src/lib/cv-data.ts, generated from
   design/cv/copy.json) — no Notion fetch, so nothing here can blank out on a
   rate-limited request the way Notion-backed fields can. See AGENTS.md.
   Not force-static since 18.11.2026: the root layout reads the page language
   from the request (src/proxy.ts → <html lang>), and a force-static page
   would be prerendered without it, i.e. as lang="en" in all three languages.
   The content is the same; it is just rendered per request. */

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
  const l: Locale = hasLocale(lang) ? lang : "en";
  return buildMetadata({ lang: l, path: "/cv", ...META[l], type: "profile" });
}


export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <JsonLd data={personJsonLd(lang as Locale)} />
      <CvView locale={lang as Locale} />
    </>
  );
}
