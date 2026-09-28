export interface WorkVideo {
  id: string;
  title: { en: string; uk: string; fr: string };
}

export interface Work {
  slug: string;
  title: { en: string; uk: string; fr: string };
  subtitle: { en: string; uk: string; fr: string };
  year: string;
  music: string;
  description: { en: string; uk: string; fr: string };
  image: string;
  videos?: WorkVideo[];
  gallery?: string[]; // array of image URLs for horizontal slider
}

// Вистави — src/content/works.json (з 28.09.2026 це єдине джерело: колишній
// статичний масив тут, злитий із тим, що було в Notion Portfolio DB).
import worksData from "@/content/works.json";

export const works: Work[] = worksData as Work[];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export async function getWorks(): Promise<Work[]> {
  return works;
}

export async function getWorkBySlugAsync(
  slug: string
): Promise<Work | undefined> {
  return works.find((w) => w.slug === slug);
}
