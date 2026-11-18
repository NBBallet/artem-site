import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl, indexablePaths, localeAlternates, localePath } from "@/lib/seo";

/**
 * /sitemap.xml — усі публічні сторінки трьома мовами з hreflang.
 * Чернетки (src/lib/drafts.ts) сюди не потрапляють, поки прапорець вимкнений;
 * приховані сторінки (/markevitch-…, /cv-…, /imprimer/…) не перелічуються взагалі.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths().flatMap((path) =>
    locales.map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/cv" ? 0.9 : 0.8,
      alternates: { languages: localeAlternates(lang, path).languages },
    }))
  );
}
