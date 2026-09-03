import Link from "next/link";
import Image from "next/image";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getWorks } from "@/lib/works";
import { getSiteSettings } from "@/lib/settings";
import { cvData } from "@/lib/cv-data";
import Tryzub from "@/components/Tryzub";
import ContactSection from "@/components/ContactSection";

// Always render fresh from Notion — no stale-while-revalidate confusion
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const [t, rawWorks, settings] = await Promise.all([
    getDictionary(locale),
    getWorks(),
    getSiteSettings(),
  ]);

  // Inject Notion poster images and corrected year for imageless works
  const works = rawWorks.map((w) => {
    if (w.slug === "mercy") return {
      ...w,
      image: (!w.image && settings.mercyImage) ? settings.mercyImage : w.image,
      year: settings.mercyChip1En || "2021",  // year chip = source of truth
    };
    if (w.slug === "humans") return {
      ...w,
      image: (!w.image && settings.humansImage) ? settings.humansImage : w.image,
      year: settings.humansChip1En || "2020",
    };
    return w;
  });

  // ── Social links — canonical handles (artem_hordieiev) ──
  const instagramUrl = "https://www.instagram.com/artem_hordieiev";
  const threadsUrl   = "https://www.threads.com/@artem_hordieiev";
  const facebookUrl  = "https://www.facebook.com/ArtemGordeevNB/";

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
          {(locale === "fr" ? settings.heroTaglineFr : locale === "uk" ? settings.heroTaglineUk : settings.heroTaglineEn) || t["hero.tagline"]}
        </p>
        <p className="text-[11px] tracking-[3px] text-brand-dark-grey uppercase">
          {(locale === "fr" ? settings.heroRoleFr : locale === "uk" ? settings.heroRoleUk : settings.heroRoleEn) || t["hero.role"]}
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

        {/* Per-work gradient backgrounds for imageless cards */}
        {(() => {
          const workCardBg: Record<string, string> = {
            "mercy":    "linear-gradient(160deg, #7A0015 0%, #3E0010 45%, #0A0608 100%)",
            "humans":   "linear-gradient(160deg, #32207A 0%, #130940 45%, #070511 100%)",
            "icare":    "linear-gradient(160deg, #0F2068 0%, #060F32 50%, #020410 100%)",
            "firebird": "linear-gradient(160deg, #0A1A50 0%, #050D2A 50%, #010508 100%)",
          };
          const workCardAccent: Record<string, string> = {
            "mercy":    "#C4001E",
            "humans":   "#7B3FD4",
            "icare":    "#1B45B5",
            "firebird": "#0F2760",
          };
          return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => {
            const cardBg = workCardBg[work.slug];
            const cardAccent = workCardAccent[work.slug] || "#C8102E";
            return (
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center"
                    style={{ background: cardBg || undefined }}>
                    {/* Thin accent line above title */}
                    <div className="w-8 h-[1px]" style={{ backgroundColor: cardAccent + "88" }} />
                    <span
                      className="text-[clamp(20px,3vw,30px)] text-white/70 group-hover:text-white/90 transition-colors drop-shadow-lg leading-tight tracking-[2px]"
                      style={{ fontFamily: "NAMU-1400, serif" }}
                    >
                      {work.title[locale]}
                    </span>
                    <span className="text-[9px] tracking-[3px] uppercase font-semibold" style={{ color: cardAccent + "CC" }}>
                      {work.year}
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
            );
          })}
        </div>
          );
        })()}
      </section>

      {/* ===== ABOUT =====
           All texts editable in Notion Site Settings → keys: about_* */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <h2
          className="text-4xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "fr"
            ? (settings.aboutNameFr || t["about.title"])
            : locale === "uk"
            ? (settings.aboutNameUk || t["about.title"])
            : (settings.aboutNameEn || t["about.title"])}
        </h2>
        <p className="text-[15px] text-brand-grey mb-8 max-w-[700px]">
          {locale === "fr"
            ? (settings.aboutRoleFr || t["about.role"])
            : locale === "uk"
            ? (settings.aboutRoleUk || t["about.role"])
            : (settings.aboutRoleEn || t["about.role"])}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {locale === "fr"
                ? (settings.aboutBioFr || t["about.bio"])
                : locale === "uk"
                ? (settings.aboutBioUk || t["about.bio"])
                : (settings.aboutBioEn || t["about.bio"])}
            </p>
          </div>
          <div>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {locale === "fr"
                ? (settings.aboutNbbFr || t["about.nbb"])
                : locale === "uk"
                ? (settings.aboutNbbUk || t["about.nbb"])
                : (settings.aboutNbbEn || t["about.nbb"])}
            </p>
          </div>
        </div>

        {/* ===== COLLABORATION UKRAINE — USA =====
             Rhoden / Richardson, Complexions, The Great Gatsby.
             All texts editable in Notion Site Settings → keys: about_collab_* */}
        <div className="mt-16 md:mt-[72px] pt-11 border-t border-[#1a1a1a]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[14px] font-semibold tracking-[4.5px] uppercase text-brand-red mb-[22px]">
                {locale === "fr"
                  ? (settings.aboutCollabLabelFr || t["about.collabLabel"])
                  : locale === "uk"
                  ? (settings.aboutCollabLabelUk || t["about.collabLabel"])
                  : (settings.aboutCollabLabelEn || t["about.collabLabel"])}
              </p>
              <p
                className="text-[26px] md:text-[30px] leading-[1.2] text-brand-white mb-3"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {locale === "fr"
                  ? (settings.aboutCollabNamesFr || t["about.collabNames"])
                  : locale === "uk"
                  ? (settings.aboutCollabNamesUk || t["about.collabNames"])
                  : (settings.aboutCollabNamesEn || t["about.collabNames"])}
              </p>
              <p
                className="text-[15px] md:text-[17px] leading-[1.45] text-brand-grey"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {locale === "fr"
                  ? (settings.aboutCollabSubtitleFr || t["about.collabSubtitle"])
                  : locale === "uk"
                  ? (settings.aboutCollabSubtitleUk || t["about.collabSubtitle"])
                  : (settings.aboutCollabSubtitleEn || t["about.collabSubtitle"])}
              </p>
            </div>
            <div>
              <p className="text-[16px] md:text-[17px] text-brand-white leading-[1.6] mb-[18px]">
                {locale === "fr"
                  ? (settings.aboutCollabLeadFr || t["about.collabLead"])
                  : locale === "uk"
                  ? (settings.aboutCollabLeadUk || t["about.collabLead"])
                  : (settings.aboutCollabLeadEn || t["about.collabLead"])}
              </p>
              <p className="text-[15px] text-[#999] leading-[1.7] mb-[14px]">
                {locale === "fr"
                  ? (settings.aboutCollabP1Fr || t["about.collabP1"])
                  : locale === "uk"
                  ? (settings.aboutCollabP1Uk || t["about.collabP1"])
                  : (settings.aboutCollabP1En || t["about.collabP1"])}
              </p>
              <p className="text-[15px] text-[#999] leading-[1.7]">
                {locale === "fr"
                  ? (settings.aboutCollabP2Fr || t["about.collabP2"])
                  : locale === "uk"
                  ? (settings.aboutCollabP2Uk || t["about.collabP2"])
                  : (settings.aboutCollabP2En || t["about.collabP2"])}
              </p>
            </div>
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
                {locale === "fr"
                  ? (settings.cvCtaTitleFr || "CV numérique")
                  : locale === "uk"
                  ? (settings.cvCtaTitleUk || "Цифрове CV")
                  : (settings.cvCtaTitleEn || "Digital CV")}
              </h2>
              <p className="text-[15px] text-[#777] leading-[1.7]">
                {locale === "fr"
                  ? (settings.cvCtaTextFr || "Vous souhaitez en savoir plus sur mon parcours artistique, mon répertoire et mes conditions de collaboration ? Vous trouverez ici tout ce qu'il faut pour la programmation et les réservations.")
                  : locale === "uk"
                  ? (settings.cvCtaTextUk || "Хочеш дізнатися більше про мій творчий шлях, репертуар та умови співпраці? Тут — усе необхідне для програмування та бронювання.")
                  : (settings.cvCtaTextEn || "Want to learn more about my creative journey, repertoire and collaboration terms? Here is everything you need for programming and booking.")}
              </p>
            </div>

            {/* Two ways in, both inside the site: read the CV at /[lang]/cv,
                 or land on it with the print dialog already open (?print=1).
                 No external host — the CV is a page of this site. */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/${lang}/cv`}
                className="group inline-flex items-center justify-center gap-5 px-12 py-6 bg-brand-red hover:bg-white text-white hover:text-brand-red transition-all duration-300 rounded-sm text-base"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[14px] tracking-[4px] uppercase whitespace-nowrap font-semibold">
                  {locale === "fr"
                    ? (settings.cvCtaBtnFr || "Consulter le CV")
                    : locale === "uk"
                    ? (settings.cvCtaBtnUk || "Відкрити CV")
                    : (settings.cvCtaBtnEn || "Open CV")}
                </span>
                <svg
                  width="22" height="22" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M4 12h15M13 6l6 6-6 6"/>
                </svg>
              </Link>
              <Link
                href={`/${lang}/cv?print=1`}
                className="group inline-flex items-center justify-center gap-4 px-10 py-6 border border-[#2b2b2b] hover:border-brand-red text-[#999] hover:text-brand-white transition-all duration-300 rounded-sm"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[13px] tracking-[3px] uppercase whitespace-nowrap">
                  {cvData[locale].downloadBtn}
                </span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 20h16"/>
                </svg>
              </Link>
            </div>
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
          {locale === "fr"
            ? (settings.contactTitleFr || t["contact.title"])
            : locale === "uk"
            ? (settings.contactTitleUk || t["contact.title"])
            : (settings.contactTitleEn || t["contact.title"])}
        </h2>
        <p className="text-[15px] text-[#999] max-w-[700px] mb-12 leading-[1.7]">
          {locale === "fr"
            ? (settings.contactSubtitleFr || t["contact.subtitle"])
            : locale === "uk"
            ? (settings.contactSubtitleUk || t["contact.subtitle"])
            : (settings.contactSubtitleEn || t["contact.subtitle"])}
        </p>

        {/* 4-column: WhatsApp · Instagram · Facebook · Threads */}
        <ContactSection
          instagram={instagramUrl}
          threads={threadsUrl}
          facebook={facebookUrl}
          locale={locale}
          whatsappPhone="33743791841"
        />
      </section>
    </>
  );
}
