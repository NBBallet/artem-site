import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { works, getWorkBySlug, getWorks } from "@/lib/works";
import { animaData } from "@/lib/anima-data";
import { getAnimaCast, getAnimaScenes } from "@/lib/anima-notion";
import Tryzub from "@/components/Tryzub";
import PhotoSlider from "@/components/PhotoSlider";
import MarqueeCTA from "@/components/MarqueeCTA";
import ZoomableImage from "@/components/ZoomableImage";
import DownloadButton from "@/components/DownloadButton";
import { getSiteSettings } from "@/lib/settings";
import { firebirdData } from "@/lib/firebird-data";

// Always render fresh from Notion — no stale-while-revalidate confusion
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    works.map((work) => ({ lang, slug: work.slug }))
  );
}

/* ─── ANIMA-specific page ─── */
async function AnimaPage({ work, locale, t }: { work: NonNullable<ReturnType<typeof getWorkBySlug>>; locale: Locale; t: Record<string, string> }) {
  const d = animaData;
  const lang = locale;
  const [cast, scenes, settings] = await Promise.all([getAnimaCast(), getAnimaScenes(), getSiteSettings()]);

  // ANIMA palette
  const ANIMA_BG     = "#08000A";
  const ANIMA_ACCENT = "#8B0A1A";

  return (
    <article className="pt-24 relative" style={{ background: ANIMA_BG }}>
      {/* Burgundy atmospheric glow — full viewport width, fades from top-right */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "80vh", background: `radial-gradient(ellipse 70% 100% at 85% 0%, ${ANIMA_ACCENT}50 0%, transparent 65%)`, zIndex: 0 }}
      />

      {/* ===== 1. HERO ===== */}
      <section className="relative px-6 md:px-16 py-24 max-w-[1200px] mx-auto border-b border-[#1a1a1a]" style={{ zIndex: 1 }}>

        <Link
          href={`/${lang}#works`}
          className="inline-block mb-8 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
        >
          ← {t["work.back"]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Poster — URL editable in Notion Portfolio DB → "Cover image" field */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
            <ZoomableImage
              src={work.image || "/images/works/anima/poster-v3.jpg"}
              alt="ANIMA poster"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div>
            {/* Top meta — editable via Notion: anima_credit_premiere_date + anima_credit_company */}
            <div className="mb-2 text-[11px] tracking-[3px] uppercase text-brand-red font-semibold">
              {locale === "uk"
                ? (settings.animaCreditPremiereDateUk || d.premiere.dateUk)
                : (settings.animaCreditPremiereDateEn || d.premiere.date)
              } · {settings.animaCreditCompany || d.credits.company}
            </div>

            <h1
              className="text-[clamp(48px,8vw,80px)] leading-[1.05] text-brand-white mb-2"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              ANIMA
            </h1>
            <p
              className="text-xl text-brand-grey mb-8"
              style={{ fontFamily: "NAMU-Pro, sans-serif" }}
            >
              {work.subtitle[locale]}
            </p>

            {/* Credits — all editable in Notion Site Settings DB */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Продюсер" : "Producer"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk"
                  ? (settings.animaCreditIdeaUk || d.credits.idea.nameUk)
                  : (settings.animaCreditIdeaEn || d.credits.idea.name)}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Хореографія" : "Choreography"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk"
                  ? (settings.animaCreditChoreographyUk || d.credits.choreography.nameUk)
                  : (settings.animaCreditChoreographyEn || d.credits.choreography.name)}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Музика" : "Music"}
              </dt>
              <dd className="text-brand-grey">
                {settings.animaCreditMusic || d.credits.music}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Костюми" : "Costumes"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk"
                  ? (settings.animaCreditCostumesUk || d.credits.costumes.nameUk)
                  : (settings.animaCreditCostumesEn || d.credits.costumes.name)}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Прем'єра" : "Premiere"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk"
                  ? (settings.animaCreditPremiereDateUk || d.premiere.dateUk)
                  : (settings.animaCreditPremiereDateEn || d.premiere.date)}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Місце" : "Venue"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk"
                  ? (settings.animaCreditVenueUk || d.premiere.venue.uk)
                  : (settings.animaCreditVenueEn || d.premiere.venue.en)}
              </dd>
            </dl>
          </div>
        </div>
      </section>

      {/* ===== 2. SYNOPSIS ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[800px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Синопсис" : "Synopsis"}
        </div>
        <p className="text-[17px] text-[#bbb] leading-[1.8] mb-8">
          {work.description[locale]}
        </p>
        {/* Blockquote — editable in Notion Site Settings DB → key "anima_blockquote" */}
        <blockquote className="border-l-2 border-brand-red pl-6">
          <p className="text-[15px] text-brand-grey italic leading-[1.7]">
            {locale === "uk" ? settings.animaBlockquoteUk : settings.animaBlockquoteEn}
          </p>
        </blockquote>
      </section>

      {/* ===== 4. SCENES — Gallery of 7 Arcana ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        {/* Header: label, then h2 + button on same row, then description */}
        {/* All texts editable in Notion Site Settings → keys: anima_scenes_* */}
        <div className="mb-16">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
            {locale === "uk"
              ? (settings.animaScenesLabelUk || "ЛІБРЕТО · АРКАНИ")
              : (settings.animaScenesLabelEn || "Libretto · Arcana")}
          </div>
          <div className="flex items-center justify-between gap-6 mb-4 flex-wrap">
            <h2
              className="text-3xl text-brand-white"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {locale === "uk"
                ? (settings.animaScenesTitleUk || "7 Арканів")
                : (settings.animaScenesTitleEn || "7 Arcana")}
            </h2>
            {/* Libretto PDF — desktop only; mobile version is below the LITSO section */}
            {settings.animaLibrettoPdf && (
              <DownloadButton
                href={settings.animaLibrettoPdf}
                filename="ANIMA-libretto.pdf"
                className="hidden md:inline-flex items-center gap-3 px-6 py-3 border border-brand-red/60 hover:border-brand-red text-brand-red hover:text-white hover:bg-brand-red transition-all duration-200 rounded-sm text-[11px] tracking-[3px] uppercase whitespace-nowrap flex-none cursor-pointer"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
                </svg>
                {locale === "uk" ? "Завантажити лібрето" : "Download Libretto"}
              </DownloadButton>
            )}
          </div>
          <p className="text-[15px] text-brand-grey max-w-[520px]">
            {locale === "uk"
              ? (settings.animaScenesDescriptionUk || "Кожна сцена вистави відповідає Старшому Аркану Таро — етапу духовного сходження Героя.")
              : (settings.animaScenesDescriptionEn || "Each scene corresponds to a Major Arcana of Tarot — a stage in the Hero's spiritual ascent.")}
          </p>
        </div>

        <div className="space-y-16">
          {scenes.map((scene, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                (idx + 1) % 2 === 0 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[16/10] rounded-lg overflow-hidden bg-[#111] ${
                (idx + 1) % 2 === 0 ? "md:order-2" : ""
              }`}>
                <ZoomableImage
                  src={scene.image}
                  alt={`Scene ${idx + 1}: ${scene.arcana}`}
                  fill
                  className="object-cover"
                  fit="contain"
                />
              </div>

              {/* Text */}
              <div className={(idx + 1) % 2 === 0 ? "md:order-1" : ""}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[40px] text-brand-red/20 font-light leading-none" style={{ fontFamily: "NAMU-1400, serif" }}>
                    #{idx + 1}
                  </span>
                  <div>
                    <h3
                      className="text-2xl text-brand-white"
                      style={{ fontFamily: "NAMU-1400, serif" }}
                    >
                      {scene.arcana}
                    </h3>
                    <p className="text-[12px] text-brand-dark-grey uppercase tracking-[2px]">
                      {locale === "uk" ? scene.arcanaUk : scene.arcana}
                    </p>
                  </div>
                </div>
                <p className="text-[15px] text-brand-grey leading-[1.7]">
                  {locale === "uk" ? scene.descriptionUk : scene.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile libretto button — right after last scene, mobile only */}
        {settings.animaLibrettoPdf && (
          <div className="md:hidden mt-12">
            <DownloadButton
              href={settings.animaLibrettoPdf}
              filename="ANIMA-libretto.pdf"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-brand-red/60 hover:border-brand-red text-brand-red hover:text-white hover:bg-brand-red transition-all duration-200 rounded-sm text-[11px] tracking-[3px] uppercase cursor-pointer"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
              </svg>
              {locale === "uk" ? "Завантажити лібрето" : "Download Libretto"}
            </DownloadButton>
          </div>
        )}
      </section>

      {/* ===== 5. VIDEO ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <h2
          className="text-3xl text-brand-white mb-12"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk" ? "Відео" : "Video"}
        </h2>

        {/* Main showreel */}
        <div className="mb-12">
          <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
            <iframe
              src={`https://www.youtube.com/embed/${d.videos.showreel.id}`}
              title={d.videos.showreel.title[locale]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">
            {locale === "uk"
              ? (settings.animaVideoShowreelUk || d.videos.showreel.title.uk)
              : (settings.animaVideoShowreelEn || d.videos.showreel.title.en)}
          </p>
        </div>

        {/* Secondary videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
              <iframe
                src={`https://www.youtube.com/embed/${d.videos.premiere.id}`}
                title={d.videos.premiere.title[locale]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">
              {locale === "uk"
                ? (settings.animaVideoPremiereUk || d.videos.premiere.title.uk)
                : (settings.animaVideoPremiereEn || d.videos.premiere.title.en)}
            </p>
          </div>
          <div>
            <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
              <iframe
                src={`https://www.youtube.com/embed/${d.videos.rehearsal.id}`}
                title={d.videos.rehearsal.title[locale]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">
              {locale === "uk"
                ? (settings.animaVideoRehearsalUk || d.videos.rehearsal.title.uk)
                : (settings.animaVideoRehearsalEn || d.videos.rehearsal.title.en)}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. FESTIVAL ===== */}
      {/* All texts editable in Notion Site Settings → keys: anima_festival_* */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Фестиваль" : "Festival"}
        </div>
        <h2
          className="text-3xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {settings.animaFestivalName || d.festival.name}
        </h2>
        <p className="text-lg text-brand-grey mb-2">
          {locale === "uk"
            ? (settings.animaFestivalSubtitleUk || d.festival.fullName.uk)
            : (settings.animaFestivalSubtitleEn || d.festival.fullName.en)}
        </p>
        <p className="text-sm text-brand-dark-grey mb-8">
          {locale === "uk"
            ? (settings.animaFestivalDatesUk || d.festival.dates.uk)
            : (settings.animaFestivalDatesEn || d.festival.dates.en)}
          {" · "}
          {locale === "uk"
            ? (settings.animaFestivalVenueUk || d.festival.venue.uk)
            : (settings.animaFestivalVenueEn || d.festival.venue.en)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 mb-12 items-start">
          <div className="pt-1">
            <p className="text-[15px] text-[#999] leading-[1.7] mb-6">
              {locale === "uk"
                ? (settings.animaFestivalDescriptionUk || d.festival.description.uk)
                : (settings.animaFestivalDescriptionEn || d.festival.description.en)}
            </p>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {locale === "uk"
                ? (settings.animaFestivalOrganizersUk || d.festival.organizers.uk)
                : (settings.animaFestivalOrganizersEn || d.festival.organizers.en)}
            </p>
          </div>

          {/* Festival program image — slightly larger, right-aligned with text top */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#111]">
            <ZoomableImage
              src={d.festival.programImage}
              alt="KMATOB-FEST 2014 program"
              fill
              className="object-contain"
              fit="contain"
            />
          </div>
        </div>

      </section>

      {/* ===== 7. ABOUT LITSO → NBB ===== */}
      {/* All texts editable in Notion Site Settings → keys: anima_litso_* */}
      <section className="py-24 px-6 md:px-16 max-w-[800px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          LITSO → NBB
        </div>
        <h2
          className="text-3xl text-brand-white mb-8"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk"
            ? (settings.animaLitsoTitleUk || "Від LITSO до Newspaper Birds")
            : (settings.animaLitsoTitleEn || "From LITSO to Newspaper Birds")}
        </h2>
        <p className="text-[15px] text-[#999] leading-[1.8]">
          {locale === "uk"
            ? (settings.animaLitsoBodyUk || d.litsoCompany.uk)
            : (settings.animaLitsoBodyEn || d.litsoCompany.en)}
        </p>
      </section>

      {/* ===== 8. POSTER GALLERY ===== */}
      {/* URLs editable in Notion Site Settings → keys: anima_poster_1 … anima_poster_4 */}
      {(() => {
        const posters = [
          settings.animaPoster1 || work.image || "/images/works/anima/poster-v3.jpg",
          settings.animaPoster2 || "/images/works/anima/poster-premiere.jpg",
          settings.animaPoster3,
          settings.animaPoster4,
        ].filter(Boolean) as string[];
        return (
          <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
            <div className="mb-8 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
              {locale === "uk" ? "Афіші" : "Posters"}
            </div>
            <div className={`grid gap-4 grid-cols-2 ${posters.length >= 3 ? "md:grid-cols-4" : "md:grid-cols-2"}`}>
              {posters.map((src, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
                  <ZoomableImage
                    src={src}
                    alt="ANIMA"
                    fill
                    className="object-cover"
                    fit="contain"
                    group={posters}
                    groupIndex={i}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ===== CTA + Navigation ===== */}
      <WorkFooter slug="anima" locale={locale} />
    </article>
  );
}

/* ─── FIREBIRD-specific page ─── */
async function FirebirdPage({ work, locale, t }: { work: NonNullable<ReturnType<typeof getWorkBySlug>>; locale: Locale; t: Record<string, string> }) {
  const lang = locale;
  const settings = await getSiteSettings();
  const FIREBIRD_URL = settings.firebirdUrl;
  const MOTHER_IMG = settings.firebirdImage;
  const firebirdYear = settings.firebirdYear || "2026";
  const firebirdMusicLabel = settings.firebirdMusic || "Igor Stravinsky";
  const firebirdTitle = locale === "uk" ? (settings.firebirdTitleUk || "Жар-Птиця") : (settings.firebirdTitleEn || "Firebird");
  const firebirdSubtitle = locale === "uk" ? (settings.firebirdSubtitleUk || work.subtitle.uk) : (settings.firebirdSubtitleEn || work.subtitle.en);
  const firebirdDesc = locale === "uk" ? (settings.firebirdDescriptionUk || work.description.uk) : (settings.firebirdDescriptionEn || work.description.en);

  // FIREBIRD palette — ultramarine blue only (matching ICARE / Stravinsky era)
  const FB_BG   = "#020608";
  const FB_BLUE = "#1B3FA0";

  return (
    <article className="pt-24 relative" style={{ background: FB_BG }}>
      {/* Ultramarine atmospheric glow — full viewport width */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "80vh", background: `radial-gradient(ellipse 80% 100% at 20% 0%, ${FB_BLUE}50 0%, transparent 65%)`, zIndex: 0 }}
      />

      {/* ===== HERO ===== */}
      <section className="relative px-6 md:px-16 py-24 max-w-[1200px] mx-auto border-b border-[#1a1a1a]" style={{ zIndex: 1 }}>

        <Link
          href={`/${lang}#works`}
          className="inline-block mb-8 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
        >
          ← {t["work.back"]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Poster — Roerich "Mother of the World" (non-clickable) */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden" style={{ background: "#020610" }}>
            <Image
              src={MOTHER_IMG}
              alt={locale === "uk" ? "М. Реріх — Мати Світу, 1924" : "N. Roerich — Mother of the World, 1924"}
              fill
              className="object-cover"
              priority
            />
            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {/* image caption bottom — editable via Notion Site Settings → firebird_caption */}
            <p className="absolute bottom-4 left-5 text-[10px] text-white/40 tracking-[1px]">
              {locale === "uk" ? settings.firebirdCaptionUk : settings.firebirdCaptionEn}
            </p>
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 text-[11px] tracking-[3px] uppercase text-brand-red font-semibold">
              {firebirdYear} · {firebirdMusicLabel}
            </div>

            <h1
              className="text-[clamp(48px,8vw,80px)] leading-[1.05] text-brand-white mb-2"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {firebirdTitle}
            </h1>
            <p
              className="text-xl text-brand-grey mb-8"
              style={{ fontFamily: "NAMU-Pro, sans-serif" }}
            >
              {firebirdSubtitle}
            </p>

            <p className="text-[16px] text-[#aaa] leading-[1.8] mb-10">
              {firebirdDesc}
            </p>

            {/* Branded CTA — link to full concept site */}
            <a
              href={FIREBIRD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 w-full md:w-auto bg-brand-red hover:bg-white text-white hover:text-brand-red transition-all duration-300 px-8 py-5 rounded-sm"
            >
              <span
                className="text-[13px] tracking-[4px] uppercase font-semibold"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {locale === "uk" ? settings.firebirdBtnUk : settings.firebirdBtnEn}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="flex-none group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== REFERENCE VIDEO — NYCB (editable via Notion → firebird_ref_video / firebird_ref_label / firebird_ref_title) ===== */}
      {settings.firebirdRefVideoId && (
        <section className="py-20 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
          <div className="mb-8 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
            {locale === "uk" ? settings.firebirdRefLabelUk : settings.firebirdRefLabelEn}
          </div>
          <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
            <iframe
              src={`https://www.youtube.com/embed/${settings.firebirdRefVideoId}`}
              title={locale === "uk" ? settings.firebirdRefTitleUk : settings.firebirdRefTitleEn}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-[13px] text-white/40 mt-4 leading-[1.5]">
            {locale === "uk" ? settings.firebirdRefTitleUk : settings.firebirdRefTitleEn}
          </p>
        </section>
      )}

      {/* ===== CTA + Navigation ===== */}
      <WorkFooter slug="firebird" locale={locale} />
    </article>
  );
}

/* ─── ICARE pitch page — world premiere of Markevich's Le Vol d'Icare ─── */
async function IcarePage({
  work,
  locale,
  t,
}: {
  work: NonNullable<ReturnType<typeof getWorkBySlug>>;
  locale: Locale;
  t: Record<string, string>;
}) {
  const lang = locale;
  const uk = locale === "uk";
  const settings = await getSiteSettings();

  // ICARE brand palette
  const ULTRA = "#1B3FA0"; // Ultramarine
  const RED   = "#C8102E"; // Heart Red
  const OCHRE = "#D4A017"; // Ochre Star

  // Crop to the Icarus silhouette (right side of the Jazz spread) — no handwriting visible
  const MATISSE_SRC = (settings.icareImage && !settings.icareImage.includes("wikimedia"))
    ? settings.icareImage.includes("/full/")
      ? settings.icareImage.replace("/full/", "/pct:48,3,52,94/")
      : settings.icareImage
    : "https://www.artic.edu/iiif/2/3bbeb5c0-82ad-cae7-0c52-4db83b283f5b/pct:48,3,52,94/843,/0/default.jpg";

  const scoreVideoId = work.videos?.[0]?.id ?? "";

  const movements = [
    {
      num: "I", timeEn: "0:00", durEn: "2′09″",
      en: "Prelude", uk: "Прелюдія",
      descEn: "The world before wings. Silence that holds all possible flights.",
      descUk: "Світ до крил. Тиша, що містить усі можливі польоти.",
    },
    {
      num: "II", timeEn: "2:09", durEn: "2′51″",
      en: "Youth Games", uk: "Юнацькі ігри",
      descEn: "The body discovering its own language. Joy without gravity.",
      descUk: "Тіло відкриває свою мову. Радість без тяжіння.",
    },
    {
      num: "III", timeEn: "5:00", durEn: "3′46″",
      en: "Icarus Studies Birds", uk: "Ікар вивчає птахів",
      descEn: "Observation becomes obsession. The first understanding: flight is possible.",
      descUk: "Спостереження стає одержимістю. Перше усвідомлення: політ можливий.",
    },
    {
      num: "IV", timeEn: "8:46", durEn: "4′22″",
      en: "Wings Attached", uk: "Кріплення крил",
      descEn: "The technical and the sacred. Wax and feather. When instrument becomes destiny.",
      descUk: "Технічне і священне. Віск і пір'я. Коли інструмент стає долею.",
    },
    {
      num: "V", timeEn: "13:08", durEn: "5′18″",
      en: "Flight", uk: "Політ",
      descEn: "The longest movement. The fullest freedom. This is the purpose of everything before.",
      descUk: "Найдовша частина. Найповніша свобода. Це ціль усього, що було до.",
    },
    {
      num: "VI", timeEn: "18:26", durEn: "2′08″",
      en: "The Fall", uk: "Падіння",
      descEn: "The briefest movement. Not punishment — transformation. The body returns to its element.",
      descUk: "Найкоротша частина. Не покарання — трансформація. Тіло повертається до свого елементу.",
    },
    {
      num: "VII", timeEn: "20:34", durEn: "6′56″",
      en: "Death / Illumination", uk: "Смерть / Осяяння",
      descEn: "Icarus does not end. He becomes light. The final movement is the longest — meaning requires time to arrive.",
      descUk: "Ікар не зникає. Він стає світлом. Фінальна частина найдовша — смислу потрібен час.",
    },
  ];

  return (
    <article className="pt-24" style={{ background: "#0A0A0A" }}>

      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-16 py-20 border-b border-[#1a1a1a] overflow-hidden">
        {/* Ultramarine atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 90% at 75% 50%, ${ULTRA}50 0%, transparent 70%)` }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <Link
            href={`/${lang}#works`}
            className="inline-block mb-10 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
          >
            ← {t["work.back"]}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-12 items-center">

            {/* Left: Matisse Icarus */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MATISSE_SRC}
                alt="Henri Matisse — Icare, Jazz (1947)"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* edge vignettes */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #0A0A0A 0%, transparent 25%, transparent 75%, #0A0A0A 100%)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 55%, #0A0A0A 100%)" }}
              />
              <p className="absolute bottom-4 left-5 text-[10px] tracking-[1px] text-white/20">
                Henri Matisse — Icare, Jazz, 1947
              </p>
            </div>

            {/* Right: title block */}
            <div>
              {/* World premiere badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-2 h-2 rounded-full flex-none" style={{ backgroundColor: RED }} />
                <span className="text-[11px] tracking-[5px] uppercase" style={{ color: OCHRE }}>
                  {uk ? settings.icareHeroLabelUk : settings.icareHeroLabelEn}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-[clamp(72px,11vw,140px)] leading-[0.88] text-white mb-5"
                style={{ fontFamily: "NAMU-1400, serif", letterSpacing: "-3px" }}
              >
                ICARE
              </h1>

              {/* Ultramarine rule */}
              <div className="w-20 h-[2px] mb-7" style={{ backgroundColor: ULTRA }} />

              <p className="text-[16px] text-white/50 mb-3" style={{ fontFamily: "NAMU-Pro, sans-serif" }}>
                {uk ? settings.icareHeroSubtitleUk : settings.icareHeroSubtitleEn}
              </p>
              <p className="text-[15px] text-white/65 mb-10 leading-[1.7] max-w-[460px]">
                {uk ? settings.icareHeroTaglineUk : settings.icareHeroTaglineEn}
              </p>

              {/* Spec chips */}
              <div className="flex flex-wrap gap-2 mb-10">
                {([
                  { en: "27 min",          uk: "27 хвилин" },
                  { en: "One act",         uk: "Одна дія" },
                  { en: "Ensemble of Five",uk: "Ensemble of Five" },
                  { en: "Chamber music",   uk: "Камерна музика" },
                ] as { en: string; uk: string }[]).map((chip) => (
                  <span
                    key={chip.en}
                    className="text-[10px] tracking-[2px] uppercase px-3 py-1.5"
                    style={{ border: `1px solid ${ULTRA}55`, color: "#777" }}
                  >
                    {uk ? chip.uk : chip.en}
                  </span>
                ))}
              </div>

              {/* Primary CTA */}
              <a
                href="https://wa.me/77052980397"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 text-white transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: ULTRA, fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[12px] tracking-[4px] uppercase font-semibold">
                  {uk ? settings.icareCtaBtnUk : settings.icareCtaBtnEn}
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="flex-none transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. THE UNFINISHED MISSION ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ULTRA }}>
            {uk ? "Нездійснена місія" : "The Unfinished Mission"}
          </div>
          <h2
            className="text-[clamp(28px,4vw,52px)] text-white mb-12 max-w-[720px]"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            {uk ? settings.icareMissionTitleUk : settings.icareMissionTitleEn}
          </h2>

          {/* 3-column timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-16">
            {([
              { year: "1932", accent: ULTRA,         en: settings.icareMission1932En, uk: settings.icareMission1932Uk },
              { year: "93",   accent: `${ULTRA}44`,  en: settings.icareMission93En,   uk: settings.icareMission93Uk   },
              { year: "2026", accent: RED,            en: settings.icareMission2026En, uk: settings.icareMission2026Uk },
            ] as { year: string; accent: string; en: string; uk: string }[]).map((card) => (
              <div
                key={card.year}
                className="pl-8 py-8 pr-6 border-l-2 border-b md:border-b-0 border-[#1a1a1a]"
                style={{ borderLeftColor: card.accent }}
              >
                <div
                  className="text-[52px] font-light text-white/10 mb-4 leading-none"
                  style={{ fontFamily: "NAMU-1400, serif" }}
                >
                  {card.year}
                </div>
                <p className="text-[14px] text-white/70 leading-[1.7]">
                  {uk ? card.uk : card.en}
                </p>
              </div>
            ))}
          </div>

          {/* Central quote — large, centered */}
          <div className="text-center py-12 border-t border-[#1a1a1a] mt-8">
            <p
              className="text-[clamp(24px,3.5vw,52px)] text-white/85 italic leading-[1.3] mb-6 max-w-[900px] mx-auto"
              style={{ fontFamily: "NAMU-Pro, sans-serif" }}
            >
              &ldquo;{uk ? settings.icareQuoteUk : settings.icareQuoteEn}&rdquo;
            </p>
            <p className="text-[11px] tracking-[4px] uppercase text-white/45">
              — {uk ? settings.icareQuoteCiteUk : settings.icareQuoteCiteEn}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3. CONCEPT — 3 PILLARS ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ULTRA }}>
            {uk ? "Концепція" : "Concept"}
          </div>
          <h2
            className="text-[clamp(28px,4vw,52px)] text-white mb-3"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            {uk ? settings.icareConceptTitleUk : settings.icareConceptTitleEn}
          </h2>
          <p className="text-[15px] text-white/65 mb-12 max-w-[600px] leading-[1.7]">
            {uk ? settings.icareConceptDescUk : settings.icareConceptDescEn}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { num: "I",   en: settings.icarePillar1TitleEn, uk: settings.icarePillar1TitleUk, descEn: settings.icarePillar1DescEn, descUk: settings.icarePillar1DescUk },
              { num: "II",  en: settings.icarePillar2TitleEn, uk: settings.icarePillar2TitleUk, descEn: settings.icarePillar2DescEn, descUk: settings.icarePillar2DescUk },
              { num: "III", en: settings.icarePillar3TitleEn, uk: settings.icarePillar3TitleUk, descEn: settings.icarePillar3DescEn, descUk: settings.icarePillar3DescUk },
            ] as { num: string; en: string; uk: string; descEn: string; descUk: string }[]).map((pillar) => (
              <div
                key={pillar.num}
                className="p-8"
                style={{ background: `${ULTRA}0a`, border: `1px solid ${ULTRA}25` }}
              >
                <div
                  className="text-[40px] font-light mb-5 leading-none"
                  style={{ color: OCHRE, fontFamily: "NAMU-1400, serif" }}
                >
                  {pillar.num}
                </div>
                <h3
                  className="text-[17px] text-white mb-4"
                  style={{ fontFamily: "NAMU-1400, serif" }}
                >
                  {uk ? pillar.uk : pillar.en}
                </h3>
                <p className="text-[14px] text-white/70 leading-[1.7]">
                  {uk ? pillar.descUk : pillar.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. THE SCORE + VIDEO ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ULTRA }}>
            {uk ? "Партитура" : "The Score"}
          </div>
          <h2
            className="text-[clamp(28px,4vw,52px)] text-white mb-4"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            Le Vol d&apos;Icare
          </h2>
          <p className="text-[15px] text-white/70 mb-2 leading-[1.6]">
            {uk ? settings.icareScoreSubtitleUk : settings.icareScoreSubtitleEn}
          </p>
          <p className="text-[15px] text-white/65 mb-10 max-w-[580px] leading-[1.7]">
            {uk ? settings.icareScoreDescUk : settings.icareScoreDescEn}
          </p>

          {scoreVideoId ? (
            <>
              <div className="aspect-video rounded-sm overflow-hidden bg-[#111]">
                <iframe
                  src={`https://www.youtube.com/embed/${scoreVideoId}`}
                  title={
                    uk
                      ? "Ensemble of Five — Ігор Маркевич, Політ Ікара"
                      : "Ensemble of Five — Igor Markevich, Le Vol d'Icare"
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </>
          ) : (
            <div
              className="aspect-video rounded-sm flex items-center justify-center"
              style={{ background: `${ULTRA}08`, border: `1px dashed ${ULTRA}30` }}
            >
              <div className="text-center px-6">
                <p
                  className="text-[10px] tracking-[4px] uppercase mb-4"
                  style={{ color: `${ULTRA}80` }}
                >
                  {uk ? "Відео незабаром" : "Score recording forthcoming"}
                </p>
                <p
                  className="text-[28px] text-white/10"
                  style={{ fontFamily: "NAMU-1400, serif" }}
                >
                  Ensemble of Five
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 5. BOOKING CTA ===== */}
      <section
        className="py-28 px-6 md:px-16 border-b border-[#1a1a1a]"
        style={{ background: `linear-gradient(135deg, #0A0A0A 0%, ${ULTRA}16 100%)` }}
      >
        <div className="max-w-[800px] mx-auto text-center">
          <div className="mb-6 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ULTRA }}>
            {uk ? "Бронювання" : "Booking"}
          </div>
          <h2
            className="text-[clamp(36px,5vw,68px)] text-white mb-6 leading-[1.0]"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            {uk ? settings.icareCtaTitleUk : settings.icareCtaTitleEn}
          </h2>
          <p className="text-[15px] text-white/40 mb-10 leading-[1.85] max-w-[520px] mx-auto">
            {uk ? settings.icareCtaTextUk : settings.icareCtaTextEn}
          </p>
          <a
            href="https://wa.me/77052980397"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-12 py-6 text-white transition-all duration-300 hover:brightness-110 mb-6"
            style={{ backgroundColor: ULTRA, fontFamily: "NAMU-1400, serif" }}
          >
            <span className="text-[13px] tracking-[4px] uppercase font-semibold whitespace-nowrap">
              {uk ? settings.icareCtaBtnUk : settings.icareCtaBtnEn}
            </span>
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className="flex-none transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <p className="text-[11px] tracking-[2px] text-white/20 uppercase">
            art_om@me.com
          </p>
        </div>
      </section>

      {/* ===== Navigation ===== */}
      <WorkFooter slug="icare" locale={locale} />
    </article>
  );
}

/* ─── MERCY page — pandemic-born work, Max Richter Voices ─── */
async function MercyPage({
  locale,
  t,
}: {
  work: NonNullable<ReturnType<typeof getWorkBySlug>>;
  locale: Locale;
  t: Record<string, string>;
}) {
  const lang = locale;
  const uk = locale === "uk";
  const settings = await getSiteSettings();

  const ROSE   = "#CC2954";
  const BLUSH  = "#F5A7B8";

  // Parse video: supports Vimeo URLs, YouTube IDs, and full YouTube URLs
  function buildVideoSrc(val: string): string {
    if (!val) return "";
    const vimeoM = val.match(/vimeo\.com\/(\d+)/);
    if (vimeoM) return `https://player.vimeo.com/video/${vimeoM[1]}`;
    if (val.startsWith("http")) return val;
    return `https://www.youtube.com/embed/${val}`;
  }

  return (
    <article className="pt-24 relative" style={{ background: "#0A0608" }}>
      {/* Rose atmospheric glow — full viewport width */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "85vh", background: `radial-gradient(ellipse 70% 100% at 70% 0%, ${ROSE}50 0%, transparent 70%)`, zIndex: 0 }}
      />

      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-[82vh] flex items-center px-6 md:px-16 py-20 border-b border-[#1a1a1a]" style={{ zIndex: 1 }}>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <Link href={`/${lang}#works`}
            className="inline-block mb-10 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors">
            ← {t["work.back"]}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-12 items-center">
            {/* Left: cover image or gradient placeholder */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${ROSE} 0%, #7A0022 50%, #1A0008 100%)` }}
            >
              {settings.mercyImage ? (
                <Image src={settings.mercyImage} alt="Mercy" fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <p className="text-[11px] tracking-[6px] uppercase text-white/15">Mercy</p>
                  <p className="text-[9px] tracking-[2px] uppercase text-white/10">Max Richter · Voices</p>
                </div>
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 55%, #0A0608 100%)" }}
              />
            </div>

            {/* Right: title + meta */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-2 h-2 rounded-full flex-none" style={{ backgroundColor: ROSE }} />
                <span className="text-[11px] tracking-[5px] uppercase" style={{ color: BLUSH }}>
                  {uk ? settings.mercyHeroLabelUk : settings.mercyHeroLabelEn}
                </span>
              </div>

              <h1 className="text-[clamp(72px,11vw,140px)] leading-[0.88] text-white mb-5"
                style={{ fontFamily: "NAMU-1400, serif", letterSpacing: "-3px" }}>
                Mercy
              </h1>

              <div className="w-20 h-[2px] mb-7" style={{ backgroundColor: ROSE }} />

              <p className="text-[16px] text-white/50 mb-3" style={{ fontFamily: "NAMU-Pro, sans-serif" }}>
                {uk ? settings.mercyHeroSubtitleUk : settings.mercyHeroSubtitleEn}
              </p>
              <p className="text-[15px] text-white/35 mb-10 leading-[1.7] max-w-[460px]">
                {uk ? settings.mercyHeroTaglineUk : settings.mercyHeroTaglineEn}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {([
                  { en: "2021", uk: "2021" },
                  { en: "Dance Film", uk: "Танцювальний фільм" },
                  { en: "Max Richter — Voices", uk: "Max Richter — Voices" },
                  { en: "Lviv", uk: "Львів" },
                ] as { en: string; uk: string }[]).map((chip) => (
                  <span key={chip.en} className="text-[10px] tracking-[2px] uppercase px-3 py-1.5"
                    style={{ border: `1px solid ${ROSE}55`, color: "#777" }}>
                    {uk ? chip.uk : chip.en}
                  </span>
                ))}
              </div>

              <a href="https://wa.me/77052980397" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 text-white transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: ROSE, fontFamily: "NAMU-1400, serif" }}>
                <span className="text-[12px] tracking-[4px] uppercase font-semibold">
                  {uk ? settings.mercyCtaBtnUk : settings.mercyCtaBtnEn}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="flex-none transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. VIDEO — right after hero, only shown if mercy_video_1 set in Notion ===== */}
      {settings.mercyVideo1Id && (
        <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ROSE }}>
              {uk ? "Відео" : "Video"}
            </div>
            <div className="aspect-video rounded-sm overflow-hidden bg-[#111]">
              <iframe
                src={buildVideoSrc(settings.mercyVideo1Id)}
                title={uk ? settings.mercyVideo1Uk : settings.mercyVideo1En}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen className="w-full h-full"
              />
            </div>
            {(settings.mercyVideo1En || settings.mercyVideo1Uk) && (
              <p className="text-[13px] text-white/35 mt-4 leading-[1.5]">
                {uk ? settings.mercyVideo1Uk : settings.mercyVideo1En}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ===== 3. THE STORY ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ROSE }}>
            {uk ? "Передісторія" : "The Story"}
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] text-white mb-8 leading-[1.1] break-words"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.mercyIntroTitleUk : settings.mercyIntroTitleEn}
          </h2>
          <p className="text-[16px] text-white/55 leading-[1.9] break-words overflow-wrap-anywhere">
            {uk ? settings.mercyIntroBodyUk : settings.mercyIntroBodyEn}
          </p>
        </div>
      </section>

      {/* ===== 4. CONTEXT — MAX RICHTER CHAIN ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]"
        style={{ background: `${ROSE}06` }}>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ROSE }}>
            {uk ? "Контекст" : "Context"}
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] text-white mb-8 leading-[1.1] break-words"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.mercyContextTitleUk : settings.mercyContextTitleEn}
          </h2>
          <p className="text-[16px] text-white/55 leading-[1.9] break-words">
            {uk ? settings.mercyContextBodyUk : settings.mercyContextBodyEn}
          </p>
        </div>
      </section>

      {/* ===== 5. BOOKING CTA ===== */}
      <section className="py-28 px-6 md:px-16 border-b border-[#1a1a1a]"
        style={{ background: `linear-gradient(135deg, #0A0608 0%, ${ROSE}12 100%)` }}>
        <div className="max-w-[800px] mx-auto text-center">
          <div className="mb-6 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: ROSE }}>
            {uk ? "Запит" : "Inquiry"}
          </div>
          <h2 className="text-[clamp(36px,5vw,68px)] text-white mb-6 leading-[1.0]"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.mercyCtaTitleUk : settings.mercyCtaTitleEn}
          </h2>
          <p className="text-[15px] text-white/40 mb-10 leading-[1.85] max-w-[520px] mx-auto">
            {uk ? settings.mercyCtaTextUk : settings.mercyCtaTextEn}
          </p>
          <a href="https://wa.me/77052980397" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-12 py-6 text-white transition-all duration-300 hover:brightness-110 mb-6"
            style={{ backgroundColor: ROSE, fontFamily: "NAMU-1400, serif" }}>
            <span className="text-[13px] tracking-[4px] uppercase font-semibold whitespace-nowrap">
              {uk ? settings.mercyCtaBtnUk : settings.mercyCtaBtnEn}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="flex-none transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <p className="text-[11px] tracking-[2px] text-white/20 uppercase">art_om@me.com</p>
        </div>
      </section>

      <WorkFooter slug="mercy" locale={locale} />
    </article>
  );
}

/* ─── HUMANS page — Roerich cosmogony, sacred cycle ─── */
async function HumansPage({
  locale,
  t,
}: {
  work: NonNullable<ReturnType<typeof getWorkBySlug>>;
  locale: Locale;
  t: Record<string, string>;
}) {
  const lang = locale;
  const uk = locale === "uk";
  const settings = await getSiteSettings();

  const INDIGO = "#2D1B69";
  const VIOLET = "#7B3FD4";
  const GOLD   = "#D4A017";

  return (
    <article className="pt-24" style={{ background: "#080612" }}>

      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-[82vh] flex items-center px-6 md:px-16 py-20 border-b border-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 90% at 65% 50%, ${INDIGO}55 0%, transparent 70%)` }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <Link href={`/${lang}#works`}
            className="inline-block mb-10 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors">
            ← {t["work.back"]}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-12 items-center">
            {/* Left: cover image or cosmic gradient */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${INDIGO} 0%, #0E0830 50%, #080612 100%)` }}
            >
              {settings.humansImage ? (
                <Image src={settings.humansImage} alt="Humans" fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-28 h-28 rounded-full opacity-15"
                    style={{ background: `radial-gradient(circle, ${GOLD} 0%, ${VIOLET} 60%, transparent 100%)` }}
                  />
                  <p className="text-[11px] tracking-[6px] uppercase text-white/15">Humans</p>
                </div>
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 55%, #080612 100%)" }}
              />
            </div>

            {/* Right: title + meta */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-2 h-2 rounded-full flex-none" style={{ backgroundColor: GOLD }} />
                <span className="text-[11px] tracking-[5px] uppercase" style={{ color: GOLD }}>
                  {uk ? settings.humansHeroLabelUk : settings.humansHeroLabelEn}
                </span>
              </div>

              <h1 className="text-[clamp(72px,11vw,140px)] leading-[0.88] text-white mb-5"
                style={{ fontFamily: "NAMU-1400, serif", letterSpacing: "-3px" }}>
                Humans
              </h1>

              <div className="w-20 h-[2px] mb-7" style={{ backgroundColor: VIOLET }} />

              <p className="text-[16px] text-white/50 mb-3" style={{ fontFamily: "NAMU-Pro, sans-serif" }}>
                {uk ? settings.humansHeroSubtitleUk : settings.humansHeroSubtitleEn}
              </p>
              <p className="text-[15px] text-white/35 mb-10 leading-[1.7] max-w-[460px]">
                {uk ? settings.humansHeroTaglineUk : settings.humansHeroTaglineEn}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {([
                  { en: "2020", uk: "2020" },
                  { en: "Dance Piece", uk: "Танцювальна п'єса" },
                  { en: "Roerich Cycle", uk: "Цикл Реріха" },
                  { en: "Cosmogony", uk: "Космогонія" },
                ] as { en: string; uk: string }[]).map((chip) => (
                  <span key={chip.en} className="text-[10px] tracking-[2px] uppercase px-3 py-1.5"
                    style={{ border: `1px solid ${VIOLET}55`, color: "#777" }}>
                    {uk ? chip.uk : chip.en}
                  </span>
                ))}
              </div>

              <a href="https://wa.me/77052980397" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 text-white transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: VIOLET, fontFamily: "NAMU-1400, serif" }}>
                <span className="text-[12px] tracking-[4px] uppercase font-semibold">
                  {uk ? settings.humansCtaBtnUk : settings.humansCtaBtnEn}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="flex-none transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. VIDEO — only shown if humans_video_1 set in Notion ===== */}
      {settings.humansVideo1Id && (
        <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: GOLD }}>
              {uk ? "Відео" : "Video"}
            </div>
            <div className="aspect-video rounded-sm overflow-hidden bg-[#111]">
              <iframe
                src={`https://www.youtube.com/embed/${settings.humansVideo1Id}`}
                title={uk ? settings.humansVideo1Uk : settings.humansVideo1En}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full"
              />
            </div>
            {(settings.humansVideo1En || settings.humansVideo1Uk) && (
              <p className="text-[13px] text-white/35 mt-4 leading-[1.5]">
                {uk ? settings.humansVideo1Uk : settings.humansVideo1En}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ===== 3. CONCEPT ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: GOLD }}>
            {uk ? "Концепція" : "Concept"}
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] text-white mb-8 leading-[1.1]"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.humansIntroTitleUk : settings.humansIntroTitleEn}
          </h2>
          <p className="text-[16px] text-white/50 leading-[1.9]">
            {uk ? settings.humansIntroBodyUk : settings.humansIntroBodyEn}
          </p>
        </div>
      </section>

      {/* ===== 4. THE MYTH ===== */}
      <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]"
        style={{ background: `${INDIGO}08` }}>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: GOLD }}>
            {uk ? "Міф" : "The Myth"}
          </div>
          <h2 className="text-[clamp(28px,4vw,52px)] text-white mb-8 leading-[1.1]"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.humansMythTitleUk : settings.humansMythTitleEn}
          </h2>
          <p className="text-[16px] text-white/50 leading-[1.9]">
            {uk ? settings.humansMythBodyUk : settings.humansMythBodyEn}
          </p>
        </div>
      </section>

      {/* ===== 5. BOOKING CTA ===== */}
      <section className="py-28 px-6 md:px-16 border-b border-[#1a1a1a]"
        style={{ background: `linear-gradient(135deg, #080612 0%, ${INDIGO}22 100%)` }}>
        <div className="max-w-[800px] mx-auto text-center">
          <div className="mb-6 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: GOLD }}>
            {uk ? "Запит" : "Inquiry"}
          </div>
          <h2 className="text-[clamp(36px,5vw,68px)] text-white mb-6 leading-[1.0]"
            style={{ fontFamily: "NAMU-1400, serif" }}>
            {uk ? settings.humansCtaTitleUk : settings.humansCtaTitleEn}
          </h2>
          <p className="text-[15px] text-white/40 mb-10 leading-[1.85] max-w-[520px] mx-auto">
            {uk ? settings.humansCtaTextUk : settings.humansCtaTextEn}
          </p>
          <a href="https://wa.me/77052980397" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-12 py-6 text-white transition-all duration-300 hover:brightness-110 mb-6"
            style={{ backgroundColor: VIOLET, fontFamily: "NAMU-1400, serif" }}>
            <span className="text-[13px] tracking-[4px] uppercase font-semibold whitespace-nowrap">
              {uk ? settings.humansCtaBtnUk : settings.humansCtaBtnEn}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="flex-none transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <p className="text-[11px] tracking-[2px] text-white/20 uppercase">art_om@me.com</p>
        </div>
      </section>

      <WorkFooter slug="humans" locale={locale} />
    </article>
  );
}

/* ─── Generic work page (for non-ANIMA works) ─── */
async function GenericWorkPage({
  work,
  locale,
  t,
}: {
  work: NonNullable<ReturnType<typeof getWorkBySlug>>;
  locale: Locale;
  t: Record<string, string>;
}) {
  const settings = await getSiteSettings();
  const s = work.slug;
  const uk = locale === "uk";

  // Returns Notion-overridden caption for a video at position `idx`, falling back to works.ts title
  const getVideoCaption = (idx: number): string => {
    const v = work.videos?.[idx];
    if (!v) return "";
    type Cap = { en: string; uk: string };
    const caps: Record<string, Cap[]> = {
      "the-ants":  [{ en: settings.theAntsVideo1En,  uk: settings.theAntsVideo1Uk  },
                    { en: settings.theAntsVideo2En,  uk: settings.theAntsVideo2Uk  }],
      "mozart25":  [{ en: settings.mozart25Video1En, uk: settings.mozart25Video1Uk },
                    { en: settings.mozart25Video2En, uk: settings.mozart25Video2Uk }],
      "adios":     [{ en: settings.adiosVideo1En,    uk: settings.adiosVideo1Uk    },
                    { en: settings.adiosVideo2En,    uk: settings.adiosVideo2Uk    }],
      "carmen":    [{ en: settings.carmenVideo1En,   uk: settings.carmenVideo1Uk   }],
    };
    const cap = caps[s]?.[idx];
    if (!cap) return v.title[locale];
    return (uk ? cap.uk : cap.en) || v.title[locale];
  };

  // Per-work Notion overrides — lookup map covers all 4 fully-editable works
  type WorkOv = { titleEn: string; titleUk: string; subtitleEn: string; subtitleUk: string; descEn: string; descUk: string; year: string; music: string };
  const workOverrides: Record<string, WorkOv> = {
    "the-ants": { titleEn: settings.theAntsTitleEn,   titleUk: settings.theAntsTitleUk,   subtitleEn: settings.theAntsSubtitleEn,   subtitleUk: settings.theAntsSubtitleUk,   descEn: settings.theAntsDescriptionEn,   descUk: settings.theAntsDescriptionUk,   year: settings.theAntsYear,   music: settings.theAntsMusic },
    "mozart25": { titleEn: settings.mozart25TitleEn,  titleUk: settings.mozart25TitleUk,  subtitleEn: settings.mozart25SubtitleEn,  subtitleUk: settings.mozart25SubtitleUk,  descEn: settings.mozart25DescriptionEn,  descUk: settings.mozart25DescriptionUk,  year: settings.mozart25Year,  music: settings.mozart25Music },
    "adios":    { titleEn: settings.adiosTitleEn,     titleUk: settings.adiosTitleUk,     subtitleEn: settings.adiosSubtitleEn,     subtitleUk: settings.adiosSubtitleUk,     descEn: settings.adiosDescriptionEn,     descUk: settings.adiosDescriptionUk,     year: settings.adiosYear,     music: settings.adiosMusic },
    "carmen":   { titleEn: settings.carmenTitleEn,    titleUk: settings.carmenTitleUk,    subtitleEn: settings.carmenSubtitleEn,    subtitleUk: settings.carmenSubtitleUk,    descEn: settings.carmenDescriptionEn,    descUk: settings.carmenDescriptionUk,    year: settings.carmenYear,    music: settings.carmenMusic },
  };
  const ov = workOverrides[s];

  const displayTitle       = (uk ? ov?.titleUk     : ov?.titleEn)     || work.title[locale];
  const displaySubtitle    = (uk ? ov?.subtitleUk  : ov?.subtitleEn)  || work.subtitle[locale];
  const displayDescription = (uk ? ov?.descUk      : ov?.descEn)      || work.description[locale];
  const displayYear        = ov?.year  || work.year;
  const displayMusic       = ov?.music || work.music;

  // Per-work atmospheric palette — bg color, glow color, accent color for labels/CTA
  type WorkTheme = { bg: string; glow: string; accent: string };
  const workThemes: Record<string, WorkTheme> = {
    "the-ants": { bg: "#080400", glow: "#C44A00",  accent: "#C44A00" },
    "mozart25": { bg: "#020810", glow: "#1B5FA0",  accent: "#1B5FA0" },
    "adios":    { bg: "#0A0A0A", glow: "#888888",  accent: "#CCCCCC" },
    "carmen":   { bg: "#010804", glow: "#1A6B3C",  accent: "#1A6B3C" },
  };
  const theme = workThemes[s] ?? { bg: "#0A0A0A", glow: "#C8102E", accent: "#C8102E" };

  return (
    <article className="pt-24 relative" style={{ background: theme.bg }}>
      {/* Atmospheric glow — full viewport width, fades from top-left */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "75vh", background: `radial-gradient(ellipse 80% 100% at 15% 0%, ${theme.glow}55 0%, transparent 65%)`, zIndex: 0 }}
      />

      {/* ── HEADER: title + description side by side ── */}
      <section className="relative px-6 md:px-16 py-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]" style={{ zIndex: 1 }}>
        <Link
          href={`/${locale}#works`}
          className="inline-block mb-8 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
        >
          ← {t["work.back"]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Left: title */}
          <div>
            <div className="mb-2 text-[11px] tracking-[3px] uppercase font-semibold" style={{ color: theme.accent }}>
              {displayYear} · {displayMusic}
            </div>
            <h1
              className="text-[clamp(40px,6vw,80px)] leading-[1.05] text-brand-white mb-3"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {displayTitle}
            </h1>
            <p className="text-lg text-brand-grey">
              {displaySubtitle}
            </p>
          </div>

          {/* Right: description */}
          <div className="md:pt-8">
            <p className="text-[16px] text-[#aaa] leading-[1.8]">
              {displayDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── PHOTO SLIDER — full width, right after header.
           Skipped for works that show gallery photos beside the video instead. ── */}
      {work.gallery && work.gallery.length > 0 && !(work.videos?.length === 1) && (() => {
        // Per-work thumbnail object-position overrides
        const thumbPositions: Record<string, Record<number, string>> = {
          "adios": { 1: "top" },
        };
        const overrides = thumbPositions[s] ?? {};
        const positions = work.gallery!.map((_, i) => overrides[i] ?? "center");
        return <PhotoSlider photos={work.gallery!} objectPositions={positions} />;
      })()}

      {/* ── VIDEO ── */}
      {work.videos && work.videos.length > 0 ? (
        <section className="py-20 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: theme.accent }}>
            {locale === "uk" ? "Відео" : "Video"}
          </div>

          {/* Single video + gallery photos side by side (e.g. Carmen) */}
          {work.videos.length === 1 && work.gallery && work.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-start">
              {/* Left: video */}
              <div>
                <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
                  <iframe
                    src={`https://www.youtube.com/embed/${work.videos[0].id}`}
                    title={getVideoCaption(0)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{getVideoCaption(0)}</p>
              </div>
              {/* Right: photos stacked, same lightbox/zoom/swipe as rest of site */}
              <div className="flex flex-col gap-4">
                {work.gallery.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#111]">
                    <ZoomableImage
                      src={src}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                      fit="contain"
                      group={work.gallery!}
                      groupIndex={i}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Multiple videos — original grid layout */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {work.videos.map((video, idx) => (
                <div key={video.id}>
                  <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={getVideoCaption(idx)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{getVideoCaption(idx)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="py-20 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
          <div className="aspect-[21/9] bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-[11px] tracking-[4px] uppercase text-brand-red/50 mb-3">
                {locale === "uk" ? "Проєкт у розробці" : "Project in development"}
              </p>
              <span className="text-3xl text-brand-grey/20" style={{ fontFamily: "NAMU-1400, serif" }}>
                {work.title[locale]}
              </span>
              <p className="text-[13px] text-brand-dark-grey/60 mt-4 leading-[1.6]">
                {locale === "uk"
                  ? "Відео та матеріали з'являться найближчим часом"
                  : "Video and materials coming soon"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PREMIERE CTA — shown for the-ants, mozart25, carmen ── */}
      {(s === "the-ants" || s === "mozart25" || s === "carmen") && (() => {
        type Texts = { titleEn: string; titleUk: string; textEn: string; textUk: string; btnEn: string; btnUk: string };
        const map: Record<string, Texts> = {
          "the-ants": { titleEn: settings.theAntsPremiereTitleEn, titleUk: settings.theAntsPremiereTitleUk, textEn: settings.theAntsPremiereTextEn, textUk: settings.theAntsPremiereTextUk, btnEn: settings.theAntsPremiereBtnEn, btnUk: settings.theAntsPremiereBtnUk },
          "mozart25": { titleEn: settings.mozart25PremiereTitleEn, titleUk: settings.mozart25PremiereTitleUk, textEn: settings.mozart25PremiereTextEn, textUk: settings.mozart25PremiereTextUk, btnEn: settings.mozart25PremiereBtnEn, btnUk: settings.mozart25PremiereBtnUk },
          "carmen":   { titleEn: settings.carmenPremiereTitleEn,  titleUk: settings.carmenPremiereTitleUk,  textEn: settings.carmenPremiereTextEn,  textUk: settings.carmenPremiereTextUk,  btnEn: settings.carmenPremiereBtnEn,  btnUk: settings.carmenPremiereBtnUk  },
        };
        const p = map[s];
        return (
          <section className="py-24 px-6 md:px-16 border-b border-[#1a1a1a]" style={{ background: `${theme.bg}` }}>
            <div className="max-w-[800px] mx-auto text-center">
              <div className="mb-4 text-[11px] tracking-[5px] uppercase font-semibold" style={{ color: theme.accent }}>
                {uk ? "Бронювання" : "Booking"}
              </div>
              <h2
                className="text-[clamp(32px,5vw,60px)] text-brand-white mb-6 leading-[1.05]"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {uk ? p.titleUk : p.titleEn}
              </h2>
              <p className="text-[15px] text-[#999] mb-10 leading-[1.8] max-w-[520px] mx-auto">
                {uk ? p.textUk : p.textEn}
              </p>
              <a
                href="https://wa.me/77052980397"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 px-12 py-6 text-white transition-all duration-300 hover:brightness-110 rounded-sm"
                style={{ backgroundColor: theme.accent, fontFamily: "NAMU-1400, serif" }}
              >
                <span className="text-[13px] tracking-[4px] uppercase font-semibold whitespace-nowrap">
                  {uk ? p.btnUk : p.btnEn}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="flex-none transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </section>
        );
      })()}

      <WorkFooter slug={work.slug} locale={locale} />
    </article>
  );
}

/* ─── Work Footer: CTA strip only (prev/next nav removed) ─── */
async function WorkFooter({ slug, locale }: { slug: string; locale: Locale }) {
  const [allWorks, settings] = await Promise.all([getWorks(), getSiteSettings()]);

  const currentIndex = allWorks.findIndex((w) => w.slug === slug);
  const nextWork =
    currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  // CTA source = next work; if last, loop to first
  const ctaWork = nextWork ?? allWorks[0];
  const ctaTitle = ctaWork?.title[locale] ?? "";
  // Some works have dark photos that don't suit image-fill — list them here
  const noImageFillSlugs = ["mozart25"];
  const ctaImage =
    ctaWork && !noImageFillSlugs.includes(ctaWork.slug)
      ? (ctaWork.image ?? "")
      : "";
  const ctaHref = ctaWork
    ? `/${locale}/works/${ctaWork.slug}`
    : `/${locale}#works`;

  return (
    <MarqueeCTA
      locale={locale}
      workTitle={ctaTitle}
      workImage={ctaImage || undefined}
      href={ctaHref}
      textEn={settings.ctaTextEn}
      textUk={settings.ctaTextUk}
    />
  );
}

/* ─── Main Page Component ─── */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const t = await getDictionary(locale);

  // Dynamic: try Notion first, fallback to static
  const allWorks = await getWorks();
  const work = allWorks.find((w) => w.slug === slug) || getWorkBySlug(slug);

  if (!work) notFound();

  if (slug === "anima") {
    return <AnimaPage work={work} locale={locale} t={t} />;
  }

  if (slug === "firebird") {
    return <FirebirdPage work={work} locale={locale} t={t} />;
  }

  if (slug === "icare") {
    return <IcarePage work={work} locale={locale} t={t} />;
  }

  if (slug === "mercy") {
    return <MercyPage work={work} locale={locale} t={t} />;
  }

  if (slug === "humans") {
    return <HumansPage work={work} locale={locale} t={t} />;
  }

  return <GenericWorkPage work={work} locale={locale} t={t} />;
}
