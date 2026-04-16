import Link from "next/link";
import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getWorks } from "@/lib/works";
import Tryzub from "@/components/Tryzub";

// ISR: revalidate every 30 seconds — Notion edits appear on site within ~30s
export const revalidate = 30;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = await getDictionary(locale);
  const works = await getWorks();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center border-b border-[#222] overflow-hidden">
        <Tryzub className="absolute bottom-12 right-8 opacity-[0.06] scale-[0.5] origin-bottom-right hidden md:block" />
        <h1
          className="text-[clamp(48px,8vw,96px)] leading-[1.05] mb-6"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          <span className="text-brand-white">ARTEM</span>
          <br />
          <span className="text-brand-red">HORDIEIEV</span>
        </h1>
        <p className="text-sm tracking-[6px] text-brand-grey uppercase font-light mb-12">
          {t["hero.tagline"]}
        </p>
        <p className="text-[11px] tracking-[3px] text-brand-dark-grey uppercase">
          {t["hero.role"]}
        </p>
        <div className="absolute bottom-8 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#555"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section id="works" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {t["works.title"]}
        </div>
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {t["works.title"]}
        </h2>
        <p className="text-[15px] text-[#999] max-w-[700px] mb-12 leading-[1.7]">
          {t["works.subtitle"]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/${lang}/works/${work.slug}`}
              className="group block bg-[#111] border border-[#222] rounded-lg overflow-hidden hover:border-brand-red/40 transition-colors"
            >
              {/* Card image — with photo overlay if available, plain dark bg otherwise */}
              <div className="aspect-[16/10] relative overflow-hidden bg-[#1a1a1a]">
                {work.image ? (
                  <>
                    <Image
                      src={work.image}
                      alt={work.title[locale]}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    {/* gradient bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* VIEW PROJECT — top right, on the wall, appears on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[3px] uppercase font-semibold text-brand-white bg-brand-red/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                        {t["works.viewProject"]} →
                      </span>
                    </div>

                    {/* Title + year — bottom center */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 text-center">
                      <h3
                        className="text-[clamp(18px,2.5vw,26px)] leading-tight text-brand-white tracking-[2px] uppercase drop-shadow-lg"
                        style={{ fontFamily: "NAMU-1400, serif" }}
                      >
                        {work.title[locale]}
                      </h3>
                      <p className="text-[10px] text-brand-red uppercase tracking-[3px] mt-1 font-semibold">
                        {work.year}
                      </p>
                    </div>
                  </>
                ) : (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-2xl text-brand-grey/30 group-hover:text-brand-red/50 transition-colors"
                    style={{ fontFamily: "NAMU-1400, serif" }}
                  >
                    {work.title[locale]}
                  </span>
                )}
              </div>

              {/* Card footer */}
              <div className="p-5">
                <p className="text-[12px] text-brand-dark-grey uppercase tracking-[2px] mb-2">
                  {work.subtitle[locale]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-brand-grey">
                    {work.music}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {t["about.label"]}
        </div>
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {t["about.title"]}
        </h2>
        <p className="text-[15px] text-brand-grey mb-8 max-w-[700px]">
          {t["about.role"]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <blockquote className="border-l-2 border-brand-red pl-6 mb-8">
              <p
                className="text-xl text-brand-white leading-[1.5] italic"
                style={{ fontFamily: "NAMU-Pro, sans-serif" }}
              >
                &ldquo;{t["about.manifesto"]}&rdquo;
              </p>
            </blockquote>
          </div>
          <div>
            <p className="text-[15px] text-[#999] leading-[1.7] mb-6">
              {t["about.bio"]}
            </p>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {t["about.nbb"]}
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {t["contact.title"]}
        </div>
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {t["contact.title"]}
        </h2>
        <p className="text-[15px] text-[#999] max-w-[700px] mb-12 leading-[1.7]">
          {t["contact.subtitle"]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[11px] tracking-[3px] uppercase text-brand-red mb-4">
              {t["contact.email"]}
            </h3>
            <a
              href="mailto:artem@newspaperbirds.com"
              className="text-lg text-brand-white hover:text-brand-red transition-colors"
            >
              artem@newspaperbirds.com
            </a>
          </div>
          <div>
            <h3 className="text-[11px] tracking-[3px] uppercase text-brand-red mb-4">
              {t["contact.social"]}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/artem_hordieiev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-grey hover:text-brand-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com/@artemhordieiev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-grey hover:text-brand-white transition-colors text-sm"
              >
                YouTube
              </a>
              <a
                href="https://t.me/artemhordieiev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-grey hover:text-brand-white transition-colors text-sm"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
