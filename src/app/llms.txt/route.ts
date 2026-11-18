import { absoluteUrl, localePath, publishedWorks } from "@/lib/seo";
import en from "@/dictionaries/en.json";
import { cvData } from "@/lib/cv-data";

/**
 * /llms.txt — короткий опис сайту для ШІ (формат llmstxt.org), англійською.
 * Збирається з текстів сайту (словник, works.ts, cv-data), тож нічого не
 * вигадує і сам оновлюється, коли змінюються твори. Чернетки не входять.
 * Без назви компанії, без цін, без особистої пошти й телефону.
 */
export const dynamic = "force-static";

export function GET() {
  const facts = cvData.shared.facts;
  const profile = cvData.en.s08; // мітки з резюме: «Productions», «Touring»
  const lines: string[] = [
    "# Artem Hordieiev",
    "",
    `> ${en["about.role"]} ${en["hero.role"]}.`,
    "",
    en["about.bio"],
    "",
    `${profile.productions}: ${facts.productions}. ${profile.countries}: ${profile.countriesValue}. ${profile.specialty}: ${profile.specialtyValue}.`,
    "",
    en["about.collabP1"],
    "",
    en["about.collabP2"],
    "",
    "The site is available in English (/en), French (/fr) and Ukrainian (/uk).",
    "",
    "## Works",
    "",
    ...publishedWorks().map(
      (w) =>
        `- [${w.title.en}](${absoluteUrl(localePath("en", `/works/${w.slug}`))}): ${w.subtitle.en}, ${w.year}. Music: ${w.music}. ${w.description.en}`
    ),
    "",
    "## About",
    "",
    `- [Artistic CV](${absoluteUrl(localePath("en", "/cv"))}): biography, productions, collaborations (also in [French](${absoluteUrl(localePath("fr", "/cv"))}) and [Ukrainian](${absoluteUrl(localePath("uk", "/cv"))}))`,
    `- [Contact](${absoluteUrl(localePath("en"))}#contact): ${en["contact.subtitle"]}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
