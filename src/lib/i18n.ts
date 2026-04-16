export type Locale = "en" | "uk";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "uk"];

const dictionaries: Record<Locale, () => Promise<Record<string, string>>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  uk: () => import("@/dictionaries/uk.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
