import type { Locale } from "@/lib/i18n";

/**
 * The one-page CV — the same short recruiter's format in all three
 * languages (11.09.2026), translated one-to-one from the French master.
 * Files live in public/cv/ and are rebuilt from
 * ФІНАНСИ/06 Guides - Довідники/CV France Travail — редактор/build.py
 *
 * Both the CV page and the home page's CV block link to these, so the file
 * names live here rather than being spelled out twice.
 */

/**
 * Hands the file to the visitor's device. Points at the forced-download API
 * route (Content-Disposition: attachment), not the static /cv/… path, so it
 * also works on iOS Safari — see src/app/api/cv-download/[file]/route.ts for
 * why the HTML `download` attribute alone isn't enough there.
 */
export const CV_DOWNLOAD: Record<Locale, string> = {
  fr: "/api/cv-download/Artem-Hordieiev-CV-FR.pdf",
  en: "/api/cv-download/Artem-Hordieiev-CV-EN.pdf",
  uk: "/api/cv-download/Artem-Hordieiev-CV-UK.pdf",
};

/**
 * Opens the print dialog on the one-pager instead of downloading it —
 * French only (decided 10.09.2026; en/uk download straight to the device,
 * 11.09.2026). Has to be the plain static path, never the API route above:
 * that route sends `Content-Disposition: attachment`, which makes a browser
 * download the file inside the print iframe instead of rendering it, so
 * nothing appears in the print dialog.
 */
export const CV_PRINT: Partial<Record<Locale, string>> = {
  fr: "/cv/Artem-Hordieiev-CV-FR.pdf",
};
