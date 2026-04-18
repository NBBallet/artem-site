import Link from "next/link";
import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getWorks } from "@/lib/works";
import { getSiteSettings } from "@/lib/settings";
import Tryzub from "@/components/Tryzub";
import ContactSection from "@/components/ContactSection";

// ISR: revalidate every 30 seconds — Notion edits appear on site within ~30s
export const revalidate = 30;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [t, works, settings] = await Promise.all([
    getDictionary(locale),
    getWorks(),
    getSiteSettings(),
  ]);

  // ── Social links with fallbacks ──
  const instagramUrl = settings.socialInstagram || "https://instagram.com/artem_hordieiev";
  const threadsUrl   = settings.socialThreads   || "https://threads.net/@artem_hordieiev";
  const telegramUrl  = settings.socialTelegram  || "https://t.me/artemhordieiev";

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section id="works" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <h2 className="text-4xl text-brand-white mb-4" style={{ fontFamily: "NAMU-1400, serif" }}>
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
              <div className="aspect-[16/10] relative overflow-hidden bg-[#1a1a1a]">
                {work.image ? (
                  <>
                    <Image
                      src={work.image}
                      alt={work.title[locale]}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[3px] uppercase font-semibold text-brand-white bg-brand-red/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                        {t["works.viewProject"]} →
                      </span>
                    </div>
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                    <span
                      className="text-2xl text-brand-grey/30 group-hover:text-brand-red/50 transition-colors"
                      style={{ fontFamily: "NAMU-1400, serif" }}
                    >
                      {work.title[locale]}
                    </span>
                    <span className="text-[10px] tracking-[2px] uppercase text-brand-dark-grey/60">
                      {locale === "uk" ? "У розробці · незабаром" : "In development · coming soon"}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-[12px] text-brand-dark-grey uppercase tracking-[2px] mb-2">
                  {work.subtitle[locale]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-brand-grey">{work.music}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ABOUT =====
           All texts editable in Notion Site Settings → keys: about_* */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk"
            ? (settings.aboutNameUk || t["about.title"])
            : (settings.aboutNameEn || t["about.title"])}
        </h2>
        <p className="text-[15px] text-brand-grey mb-8 max-w-[700px]">
          {locale === "uk"
            ? (settings.aboutRoleUk || t["about.role"])
            : (settings.aboutRoleEn || t["about.role"])}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <blockquote className="border-l-2 border-brand-red pl-6 mb-8">
              <p
                className="text-xl text-brand-white leading-[1.5] italic"
                style={{ fontFamily: "NAMU-Pro, sans-serif" }}
              >
                &ldquo;{locale === "uk"
                  ? (settings.aboutManifestoUk || t["about.manifesto"])
                  : (settings.aboutManifestoEn || t["about.manifesto"])}&rdquo;
              </p>
            </blockquote>
          </div>
          <div>
            <p className="text-[15px] text-[#999] leading-[1.7] mb-6">
              {locale === "uk"
                ? (settings.aboutBioUk || t["about.bio"])
                : (settings.aboutBioEn || t["about.bio"])}
            </p>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {locale === "uk"
                ? (settings.aboutNbbUk || t["about.nbb"])
                : (settings.aboutNbbEn || t["about.nbb"])}
            </p>
          </div>
        </div>
      </section>

      {/* ===== CV / RÉSUMÉ CTA =====
           Editable in Notion Site Settings → keys: cv_cta_*, cv_url */}
      <section className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="py-20 px-6 md:px-16 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-10">
            {/* Text */}
            <div className="w-full max-w-[700px] text-center">
              <h2
                className="text-[clamp(32px,5vw,56px)] leading-[1.05] text-brand-white mb-5"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {locale === "uk"
                  ? (settings.cvCtaTitleUk || "Цифрове CV")
                  : (settings.cvCtaTitleEn || "Digital CV")}
              </h2>
              <p className="text-[15px] text-[#777] leading-[1.7]">
                {locale === "uk"
                  ? (settings.cvCtaTextUk || "Хочеш дізнатися більше про мій творчий шлях, репертуар та умови співпраці? Тут — усе необхідне для програмування та бронювання.")
                  : (settings.cvCtaTextEn || "Want to learn more about my creative journey, repertoire and collaboration terms? Here is everything you need for programming and booking.")}
              </p>
            </div>

            {/* CTA button — visible only when cv_url is set in Notion */}
            {settings.cvUrl ? (
              <a
                href={settings.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 px-12 py-6 bg-brand-red hover:bg-white text-white hover:text-brand-red transition-all duration-300 rounded-sm text-base"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[14px] tracking-[4px] uppercase whitespace-nowrap font-semibold">
                  {locale === "uk"
                    ? (settings.cvCtaBtnUk || "Відкрити CV")
                    : (settings.cvCtaBtnEn || "Open CV")}
                </span>
                <svg
                  width="22" height="22" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ===== CONTACT =====
           2-column: Write button (WhatsApp) · Social links
           Editable in Notion Site Settings → keys: contact_*, social_* */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto">
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk"
            ? (settings.contactTitleUk || t["contact.title"])
            : (settings.contactTitleEn || t["contact.title"])}
        </h2>
        <p className="text-[15px] text-[#999] max-w-[700px] mb-12 leading-[1.7]">
          {locale === "uk"
            ? (settings.contactSubtitleUk || t["contact.subtitle"])
            : (settings.contactSubtitleEn || t["contact.subtitle"])}
        </p>

        {/* 4-column: WhatsApp · Instagram · Threads · Telegram */}
        <ContactSection
          instagram={instagramUrl}
          threads={threadsUrl}
          telegram={telegramUrl}
          locale={locale}
          whatsappPhone="77052980397"
        />
      </section>
    </>
  );
}
