import { getSiteSettings } from "@/lib/settings";
import MarqueeCTA from "./MarqueeCTA";

interface Props {
  locale: "en" | "uk";
  /** Work title shown as the "source" on the right side */
  workTitle: string;
  href?: string;
}

export default async function MarqueeCTAServer({ locale, workTitle, href }: Props) {
  const settings = await getSiteSettings();
  return (
    <MarqueeCTA
      locale={locale}
      workTitle={workTitle}
      href={href}
      textEn={settings.ctaTextEn}
      textUk={settings.ctaTextUk}
    />
  );
}
