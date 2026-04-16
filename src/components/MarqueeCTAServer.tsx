import { getSiteSettings } from "@/lib/settings";
import MarqueeCTA from "./MarqueeCTA";

interface Props {
  locale: "en" | "uk";
  href?: string;
}

// Async server component — fetches CTA text from Notion (or falls back to static)
export default async function MarqueeCTAServer({ locale, href }: Props) {
  const settings = await getSiteSettings();
  return (
    <MarqueeCTA
      locale={locale}
      href={href}
      textEn={settings.ctaTextEn}
      textUk={settings.ctaTextUk}
    />
  );
}
