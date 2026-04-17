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

// ISR: revalidate every 30 seconds
export const revalidate = 30;

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

/* ─── Generic work page (for non-ANIMA works) ─── */
function GenericWorkPage({
  work,
  locale,
  t,
}: {
  work: NonNullable<ReturnType<typeof getWorkBySlug>>;
  locale: Locale;
  t: Record<string, string>;
}) {
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
              {work.year} · {work.music}
            </div>
            <h1
              className="text-[clamp(40px,6vw,80px)] leading-[1.05] text-brand-white mb-3"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {work.title[locale]}
            </h1>
            <p className="text-lg text-brand-grey">
              {work.subtitle[locale]}
            </p>
          </div>

          {/* Right: description */}
          <div className="md:pt-8">
            <p className="text-[16px] text-[#aaa] leading-[1.8]">
              {work.description[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* ── PHOTO SLIDER — full width, right after header ── */}
      {work.gallery && work.gallery.length > 0 && (
        <PhotoSlider photos={work.gallery} />
      )}

      {/* ── VIDEO ── */}
      {work.videos && work.videos.length > 0 ? (
        <section className="py-20 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
          <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
            {locale === "uk" ? "Відео" : "Video"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {work.videos.map((video) => (
              <div key={video.id}>
                <div className="aspect-video rounded-lg overflow-hidden bg-[#111]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title[locale]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{video.title[locale]}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="aspect-[21/9] bg-[#111] border-b border-[#1a1a1a] flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl text-brand-grey/20" style={{ fontFamily: "NAMU-1400, serif" }}>
              {work.title[locale]}
            </span>
            <p className="text-[11px] text-brand-dark-grey mt-4 tracking-[2px] uppercase">
              Photo / Video coming soon
            </p>
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

  return <GenericWorkPage work={work} locale={locale} t={t} />;
}
