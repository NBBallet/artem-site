/**
 * SEO і дані для ШІ нової сторінки ЖАР-ПТИЦЯ (18.11.2026) — на хелперах
 * src/lib/seo.ts. Тексти title/description — з design/firebird/copy.json
 * (seo_title, seo_description), трьома мовами.
 *
 * Індексація: лише на production-збірці. Поки сторінка — чернетка, її бачать
 * тільки локально й на preview (src/lib/drafts.ts), і там вона noindex; canonical
 * і hreflang при цьому вже стоять, щоб їх можна було перевірити на preview.
 * Цін і назви компанії тут немає (CHORÉGRAPHE §7 п. 2, §8).
 */
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { buildMetadata, workJsonLd, absoluteUrl } from "@/lib/seo";
import { getWorkBySlug } from "@/lib/works";
import copy from "../../../design/firebird/copy.json";

const PATH = "/works/firebird";
export const FIREBIRD_OG = "/images/works/firebird/og-1200x630.jpg";

/* Назва балету Стравінського (1910) мовою сторінки — для schema.org isBasedOn. */
const STRAVINSKY_TITLE: Record<Locale, string> = {
  en: "The Firebird",
  uk: "Жар-птиця",
  fr: "L'Oiseau de feu",
};

export function firebirdMetadata(lang: Locale): Metadata {
  const c = copy[lang];
  const meta = buildMetadata({
    lang,
    path: PATH,
    title: c.seo_title,
    description: c.seo_description,
    image: FIREBIRD_OG,
    type: "article",
  });
  if (process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
    meta.robots = { index: false, follow: false };
  }
  return meta;
}

/** schema.org CreativeWork: хореограф Артем Гордєєв, музика Ігоря Стравінського. */
export function firebirdJsonLd(lang: Locale) {
  const c = copy[lang];
  const work = getWorkBySlug("firebird")!;
  return {
    ...workJsonLd(work, lang),
    name: c.title,
    alternativeHeadline: c.subtitle,
    description: c.hero_lead,
    image: absoluteUrl(FIREBIRD_OG),
    genre: ["Ballet", "Choreography"],
    audience: { "@type": "Audience", audienceType: c.cta_note },
    isBasedOn: {
      "@type": "MusicComposition",
      name: STRAVINSKY_TITLE[lang],
      composer: { "@type": "Person", name: "Igor Stravinsky" },
    },
  };
}
