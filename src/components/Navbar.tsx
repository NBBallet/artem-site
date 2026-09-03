"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";

interface NavbarProps {
  lang: Locale;
  t: Record<string, string>;
}

const LANG_LABEL: Record<Locale, string> = { en: "EN", uk: "UA", fr: "FR" };
/** Display order of the switcher (routing order lives in @/lib/i18n). */
const LANG_ORDER: Locale[] = ["en", "fr", "uk"];

export default function Navbar({ lang, t }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/92 backdrop-blur-[12px] border-b border-[#222] px-6 md:px-10 py-3 flex items-center justify-between">
      <Link
        href={`/${lang}`}
        className="font-[NAMU-1400] text-sm tracking-[4px] text-brand-grey hover:text-brand-red transition-colors"
        style={{ fontFamily: "NAMU-1400, serif" }}
      >
        ARTEM HORDIEIEV
      </Link>
      <div className="flex items-center gap-6">
        <a
          href={`/${lang}#works`}
          className="text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors hidden sm:block"
        >
          {t["nav.works"]}
        </a>
        <a
          href={`/${lang}#about`}
          className="text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors hidden sm:block"
        >
          {t["nav.about"]}
        </a>
        <Link
          href={`/${lang}/cv`}
          className="text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors hidden sm:block"
        >
          {t["nav.cv"]}
        </Link>
        <a
          href={`/${lang}#contact`}
          className="text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors hidden sm:block"
        >
          {t["nav.contact"]}
        </a>
        <div className="flex items-center gap-1 border border-brand-red/30 rounded overflow-hidden">
          {LANG_ORDER.map((locale) => {
            const isActive = locale === lang;
            const path = pathname.replace(`/${lang}`, `/${locale}`);
            return isActive ? (
              <span
                key={locale}
                className="text-[11px] tracking-[2px] uppercase text-brand-white bg-brand-red/30 px-3 py-1"
              >
                {LANG_LABEL[locale]}
              </span>
            ) : (
              <Link
                key={locale}
                href={path}
                className="text-[11px] tracking-[2px] uppercase text-brand-red hover:text-brand-white transition-colors px-3 py-1"
              >
                {LANG_LABEL[locale]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
