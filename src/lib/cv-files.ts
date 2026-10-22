import type { CvLocale } from "@/lib/cv-data";

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
export const CV_DOWNLOAD: Record<CvLocale, string> = {
  fr: "/api/cv-download/Artem-Hordieiev-CV-FR.pdf",
  en: "/api/cv-download/Artem-Hordieiev-CV-EN.pdf",
  uk: "/api/cv-download/Artem-Hordieiev-CV-UK.pdf",
  ru: "/api/cv-download/Artem-Hordieiev-CV-RU.pdf",
};

/**
 * Opens the print dialog on the one-pager instead of downloading it —
 * French only (decided 10.09.2026; en/uk download straight to the device,
 * 11.09.2026). Has to be the plain static path, never the API route above:
 * that route sends `Content-Disposition: attachment`, which makes a browser
 * download the file inside the print iframe instead of rendering it, so
 * nothing appears in the print dialog.
 *
 * The printed file is the one-pager plus a verso with a QR code to /fr/cv
 * (28.09.2026, verso by CHORÉGRAPHE/_інструменти/канва/cv_зворот.py). Since
 * 30.09.2026 the one-pager itself is the branded one: both files come from
 * CHORÉGRAPHE/_інструменти/канва/cv_фірмовий.py (same data.json as the neutral
 * France Travail CV) — rerun it after every change of the CV text.
 * The download stays one page.
 */
export const CV_PRINT: Partial<Record<CvLocale, string>> = {
  fr: "/cv/Artem-Hordieiev-CV-FR-recto-verso.pdf",
  ru: "/cv/Artem-Hordieiev-CV-RU-recto-verso.pdf",
};

/**
 * The line under the print button: print it double-sided, the QR is on the
 * back. Russian (22.10.2026) has the same recto verso as French, its QR
 * pointing at the private page — CHORÉGRAPHE/_інструменти/канва/cv_зворот.py --ru.
 */
export const CV_PRINT_NOTE: Partial<Record<CvLocale, { note: string; ios: string }>> = {
  fr: {
    note: "Imprimez en recto verso : le code QR au dos renvoie à ce CV en ligne.",
    ios: "Sur iPhone : touchez le bouton, puis Partager → Imprimer. ",
  },
  ru: {
    note: "Печатайте с двух сторон: QR-код на обороте ведёт на это резюме.",
    ios: "На iPhone: нажмите кнопку, затем «Поделиться» → «Напечатать». ",
  },
};
