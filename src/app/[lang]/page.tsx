import Link from "next/link";
import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getWorks } from "@/lib/works";
import { getSiteSettings } from "@/lib/settings";
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
  const [t, works, settings] = await Promise.all([
    getDictionary(locale),
    getWorks(),
    getSiteSettings(),
  ]);

  // ── Social links with fallbacks ──
  const instagramUrl = settings.socialInstagram || "https://instagram.com/artem_hordieiev";
  const threadsUrl   = settings.socialThreads   || "https://threads.net/@artem_hordieiev";
  const telegramUrl  = settings.socialTelegram  || "https://t.me/artemhordieiev";
  const contactEmail = settings.contactEmail    || "artem@newspaperbirds.com";

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
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {t["works.title"]}
        </div>
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
                  <span
                    className="absolute inset-0 flex items-center justify-center text-2xl text-brand-grey/30 group-hover:text-brand-red/50 transition-colors"
                    style={{ fontFamily: "NAMU-1400, serif" }}
                  >
                    {work.title[locale]}
                  </span>
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
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk"
            ? (settings.aboutLabelUk || t["about.label"])
            : (settings.aboutLabelEn || t["about.label"])}
        </div>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            {/* Text */}
            <div className="flex-1 max-w-[600px]">
              <div className="mb-3 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
                {locale === "uk"
                  ? (settings.cvCtaLabelUk || "РЕЗЮМЕ")
                  : (settings.cvCtaLabelEn || "RÉSUMÉ")}
              </div>
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
                className="flex-none group inline-flex items-center gap-4 px-8 py-5 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-200 rounded-sm"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[11px] tracking-[3px] uppercase whitespace-nowrap">
                  {locale === "uk"
                    ? (settings.cvCtaBtnUk || "Відкрити CV")
                    : (settings.cvCtaBtnEn || "Open CV")}
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ) : (
              /* Placeholder shown when no URL is set yet — invisible to visitors but
                 reminds the admin where to add the link in Notion */
              <div className="flex-none inline-flex items-center gap-4 px-8 py-5 border border-dashed border-[#333] rounded-sm opacity-40 select-none">
                <span className="text-[11px] tracking-[3px] uppercase text-[#555] whitespace-nowrap"
                  style={{ fontFamily: "NAMU-1400, serif" }}>
                  {locale === "uk" ? "Додай cv_url у Notion →" : "Add cv_url in Notion →"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CONTACT =====
           Editable in Notion Site Settings → keys: contact_*, social_* */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto">
        {/* White heading only — no duplicate red label */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Email */}
          <div>
            <h3 className="text-[11px] tracking-[3px] uppercase text-brand-red mb-5">
              {t["contact.email"]}
            </h3>
            <a
              href={`mailto:${contactEmail}`}
              className="text-lg text-brand-white hover:text-brand-red transition-colors"
            >
              {contactEmail}
            </a>
          </div>

          {/* Social links — with platform logos */}
          <div>
            <h3 className="text-[11px] tracking-[3px] uppercase text-brand-red mb-5">
              {t["contact.social"]}
            </h3>
            <div className="flex flex-col gap-4">

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <span className="text-sm tracking-wide">Instagram</span>
              </a>

              {/* Threads */}
              <a
                href={threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.014-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.163 1.43 1.783 3.631 2.698 6.54 2.717 1.677-.01 3.151-.306 4.276-.882 1.312-.675 2.028-1.69 2.028-2.924 0-.73-.174-1.356-.49-1.822-.322-.476-.831-.814-1.496-.97l-2.274-.501c-1.196-.263-2.215-.73-3.028-1.387-1.108-.899-1.657-2.073-1.596-3.396.065-1.42.78-2.621 2.08-3.477 1.14-.748 2.623-1.131 4.293-1.107 1.73.025 3.26.48 4.42 1.32.987.718 1.7 1.734 2.12 3.02l-1.978.694c-.596-1.867-2.029-2.904-4.545-2.945-1.307-.02-2.375.258-3.081.74-.614.42-.942.985-.973 1.638-.027.563.208 1.028.694 1.385.544.4 1.325.694 2.32.9l2.275.502c1.247.274 2.24.808 2.95 1.591.738.817 1.132 1.9 1.132 3.133 0 2.042-1.087 3.761-3.064 4.883-1.443.813-3.282 1.256-5.323 1.27z"/>
                  </svg>
                </div>
                <span className="text-sm tracking-wide">Threads</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.985 13.645l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                  </svg>
                </div>
                <span className="text-sm tracking-wide">Telegram</span>
              </a>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
