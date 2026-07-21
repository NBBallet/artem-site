import { getSiteSettings } from "@/lib/settings";
import type { Locale } from "@/lib/i18n";
import MarqueeCTA from "./MarqueeCTA";

interface Props {
  locale: Locale;
  workTitle: string;
  workImage?: string;
  href?: string;
}

export default async function MarqueeCTAServer({
  locale,
  workTitle,
  workImage,
  href,
}: Props) {
  const settings = await getSiteSettings();
  return (
    <MarqueeCTA
      locale={locale}
      workTitle={workTitle}
      workImage={workImage}
      href={href}
      textEn={settings.ctaTextEn}
      textUk={settings.ctaTextUk}
      textFr={settings.ctaTextFr}
    />
  );
}
