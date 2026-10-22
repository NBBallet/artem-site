import type { Metadata } from "next";
import CvView from "../[lang]/cv/CvView";

/* Творче резюме російською — приватна сторінка (22.10.2026). Російська не є
   мовою сайту: цієї адреси немає ні в навігації, ні в перемикачі мов, ні в
   пошуку. Бачить її лише той, кому посилання надіслали особисто, — так само
   влаштовано /markevitch-t3lu2ig. PDF до неї (one-pager і recto verso з QR на
   цю адресу) теж закриті від індексації заголовком у next.config.ts.

   Текст — design/cv/copy.json → "ru", правки йдуть із канви через gen.py. */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Артем Гордеев — творческое резюме",
  description:
    "Украинский хореограф, с мая 2026 года во Франции. Украинская академическая школа и техника Complexions Дуайта Родена и Десмонда Ричардсона.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: null,
};

export default function CvRuPage() {
  return <CvView locale="ru" />;
}
