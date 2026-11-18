/**
 * SEO і дані для ШІ — спільна основа сайту (18.11.2026).
 *
 * Тут живе все, що бачать пошуковики й ШІ-краулери, а людина — ні:
 * canonical, hreflang, Open Graph / Twitter, JSON-LD (schema.org) і
 * перелік сторінок для sitemap.xml / llms.txt.
 *
 * Правила (СОЦМЕРЕЖІ/00 Рекомендації.md → «Джерело 2», 18.11.2026):
 *  - ШІ-ботів не блокуємо (OAI-SearchBot та ін.) — див. src/app/robots.ts;
 *  - цін у HTML і в структурованих даних немає (CHORÉGRAPHE §7 п. 2);
 *  - назви компанії немає (її не визначено, §8);
 *  - особистої пошти й телефону в машинних даних немає.
 *
 * Чернетки: сторінка за прапорцем із src/lib/drafts.ts не потрапляє ні в
 * sitemap, ні в llms.txt, поки прапорець вимкнений. Нова чернетка =
 * новий рядок у draftPaths() нижче.
 */
import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { works, type Work } from "@/lib/works";
import { DRAFT_PROGRAMMER } from "@/lib/drafts";

export const SITE_URL = "https://hordieiev.art";
export const SITE_NAME = "Artem Hordieiev";
export const DEFAULT_OG_IMAGE = "/images/website-og-1200x630.png";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  uk: "uk_UA",
  fr: "fr_FR",
};

/** Абсолютна адреса: "/en/cv" → "https://hordieiev.art/en/cv". */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Шлях сторінки мовою: localePath("fr", "/cv") → "/fr/cv"; "" → "/fr". */
export function localePath(lang: Locale, path: string = ""): string {
  return `/${lang}${path}`;
}

/** canonical + hreflang для сторінки, що існує всіма мовами. */
export function localeAlternates(lang: Locale, path: string = "") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return { canonical: absoluteUrl(localePath(lang, path)), languages };
}

/* ─── Чернетки ─── */

/**
 * Шляхи без мови ("/programmer", "/works/firebird"), які зараз сховані
 * прапорцем чернетки. Реліз сторінки = прибрати її прапорець у drafts.ts,
 * і рядок тут перестає діяти сам.
 */
export function draftPaths(): string[] {
  const hidden: string[] = [];
  if (!DRAFT_PROGRAMMER) hidden.push("/programmer");
  return hidden;
}

export function isDraftPath(path: string): boolean {
  return draftPaths().includes(path);
}

/** Публічні сторінки без мови, які варто індексувати. */
export function indexablePaths(): string[] {
  const paths = ["", "/cv", ...works.map((w) => `/works/${w.slug}`)];
  return paths.filter((p) => !isDraftPath(p));
}

/** Твори, сторінки яких зараз опубліковані (не чернетки). */
export function publishedWorks(): Work[] {
  return works.filter((w) => !isDraftPath(`/works/${w.slug}`));
}

/* ─── Metadata ─── */

export interface PageMetaInput {
  lang: Locale;
  /** Шлях без мови: "" для головної, "/cv", "/works/icare". */
  path: string;
  title: string;
  description: string;
  /** Картка для соцмереж і месенджерів; за замовчуванням — загальна OG. */
  image?: string;
  type?: "website" | "article" | "profile";
  /** Чернетка чи прихована сторінка: noindex і без hreflang. */
  noindex?: boolean;
}

/**
 * Повний набір metadata для сторінки: title/description (тексти дає сама
 * сторінка — хелпер їх не міняє), canonical, hreflang, Open Graph, Twitter.
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(localePath(lang, path));
  const images = [{ url: absoluteUrl(image) }];
  const meta: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
  if (noindex) {
    meta.robots = { index: false, follow: false };
  } else {
    meta.alternates = localeAlternates(lang, path);
  }
  return meta;
}

/* ─── JSON-LD (schema.org) ─── */

export const PERSON_ID = `${SITE_URL}/#person`;

/** Публічні профілі — ті самі, що стоять у ContactSection на головній. */
export const SAME_AS = [
  "https://www.instagram.com/artem_hordieiev",
  "https://www.threads.com/@artem_hordieiev",
  "https://www.facebook.com/hordieiev.art",
];

const PERSON_TEXT: Record<Locale, { jobTitle: string; description: string }> = {
  /* Тексти — дослівно з src/dictionaries/*.json (about.role). */
  en: {
    jobTitle: "Choreographer",
    description: "Ukrainian choreographer, based in France since 2026.",
  },
  uk: {
    jobTitle: "Хореограф",
    description: "Український хореограф, з 2026 року працює у Франції.",
  },
  fr: {
    jobTitle: "Chorégraphe",
    description: "Chorégraphe ukrainien, installé en France depuis 2026.",
  },
};

/** schema.org Person для Артема. Без пошти, телефону, назви компанії. */
export function personJsonLd(lang: Locale) {
  const t = PERSON_TEXT[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Artem Hordieiev",
    alternateName: ["Артем Гордєєв", "Artem Hordieyev"],
    jobTitle: t.jobTitle,
    description: t.description,
    url: absoluteUrl(localePath(lang)),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    nationality: { "@type": "Country", name: "Ukraine" },
    homeLocation: { "@type": "Country", name: "France" },
    knowsAbout: ["Choreography", "Ballet", "Contemporary ballet"],
    sameAs: SAME_AS,
    mainEntityOfPage: absoluteUrl(localePath(lang, "/cv")),
  };
}

/**
 * Заготовка schema.org CreativeWork для сторінки твору. Підключає її чат
 * сторінки твору (works/[slug]) — тут лише будова. Цін немає.
 * Рік: лише якщо це один рік ("2026"); проміжок "2018–2024" не ставимо.
 */
export function workJsonLd(work: Work, lang: Locale) {
  const url = absoluteUrl(localePath(lang, `/works/${work.slug}`));
  const year = /^\d{4}$/.test(work.year) ? work.year : undefined;
  const others = locales.filter((l) => l !== lang);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: work.title[lang],
    alternateName: Array.from(
      new Set(others.map((l) => work.title[l]).filter((n) => n !== work.title[lang]))
    ),
    alternativeHeadline: work.subtitle[lang],
    description: work.description[lang],
    genre: "Ballet",
    inLanguage: lang,
    url,
    image: work.image ? absoluteUrl(work.image) : undefined,
    ...(year ? { dateCreated: year } : {}),
    creator: { "@type": "Person", "@id": PERSON_ID, name: "Artem Hordieiev" },
    ...(work.music
      ? { isBasedOn: { "@type": "MusicComposition", name: work.music } }
      : {}),
    ...(work.videos?.length
      ? {
          video: work.videos.map((v) => ({
            "@type": "VideoObject",
            name: v.title[lang],
            embedUrl: `https://www.youtube.com/embed/${v.id}`,
            thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
          })),
        }
      : {}),
  };
}

/**
 * Заготовка schema.org DanceEvent — для показу з відомою датою й місцем.
 * Даних про покази на сайті поки немає; викликати лише з підтвердженими
 * фактами (дата, зала). Цін і квитків не ставимо.
 */
export function danceEventJsonLd(input: {
  work: Work;
  lang: Locale;
  startDate: string; // ISO 8601
  venueName: string;
  venueCity: string;
  venueCountry?: string;
  url?: string;
}) {
  const { work, lang } = input;
  return {
    "@context": "https://schema.org",
    "@type": "DanceEvent",
    name: work.title[lang],
    description: work.description[lang],
    startDate: input.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: input.venueName,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.venueCity,
        addressCountry: input.venueCountry ?? "FR",
      },
    },
    url: input.url ?? absoluteUrl(localePath(lang, `/works/${work.slug}`)),
    workPerformed: { "@id": `${absoluteUrl(localePath(lang, `/works/${work.slug}`))}#work` },
    // Хореограф — не виконавець: його зв'язок іде через workPerformed.creator.
  };
}
