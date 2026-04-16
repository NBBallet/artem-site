"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface NavbarProps {
  lang: Locale;
  t: Record<string, string>;
}

export default function Navbar({ lang, t }: NavbarProps) {
  const pathname = usePathname();

  const switchLang = lang === "en" ? "uk" : "en";
  const switchPath = pathname.replace(`/${lang}`, `/${switchLang}`);

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
        <a
          href={`/${lang}#contact`}
          className="text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors hidden sm:block"
        >
          {t["nav.contact"]}
        </a>
        <Link
          href={switchPath}
          className="text-[11px] tracking-[2px] uppercase text-brand-red hover:text-brand-white transition-colors border border-brand-red/30 px-3 py-1 rounded"
        >
          {t["lang.switch"]}
        </Link>
      </div>
    </nav>
  );
}
