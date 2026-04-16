import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales, type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar lang={lang as Locale} t={t} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#222] py-12 px-6 text-center">
        <p className="text-[13px] text-brand-dark-grey">
          &copy; {new Date().getFullYear()} {t["footer.copyright"]}
        </p>
      </footer>
    </>
  );
}
