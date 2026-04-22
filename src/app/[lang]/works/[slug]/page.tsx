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

  return (
    <article className="pt-24">
      {/* ===== 1. HERO ===== */}
      <section className="relative px-6 md:px-16 py-24 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <Tryzub className="absolute right-8 top-16 opacity-[0.04] hidden md:block" />

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

  return (
    <article className="pt-24">

      {/* ===== HERO ===== */}
      <section className="relative px-6 md:px-16 py-24 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <Tryzub className="absolute right-8 top-16 opacity-[0.04] hidden md:block" />

        <Link
          href={`/${lang}#works`}
          className="inline-block mb-8 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
        >
          ← {t["work.back"]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Poster — Roerich "Mother of the World" (non-clickable) */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#0d0d0d]">
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

  return (
    <article className="pt-24">

      {/* ── HEADER: title + description side by side ── */}
      <section className="relative px-6 md:px-16 py-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <Tryzub className="absolute right-8 top-16 opacity-[0.04] hidden md:block" />
        <Link
          href={`/${locale}#works`}
          className="inline-block mb-8 text-[11px] tracking-[2px] uppercase text-brand-grey hover:text-brand-red transition-colors"
        >
          ← {t["work.back"]}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Left: title */}
          <div>
            <div className="mb-2 text-[11px] tracking-[3px] uppercase text-brand-red font-semibold">
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
          <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
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

  return <GenericWorkPage work={work} locale={locale} t={t} />;
}
