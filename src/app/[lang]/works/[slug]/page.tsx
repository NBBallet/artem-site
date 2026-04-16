import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { works, getWorkBySlug, getWorks } from "@/lib/works";
import { animaData } from "@/lib/anima-data";
import Tryzub from "@/components/Tryzub";
import PhotoSlider from "@/components/PhotoSlider";
import MarqueeCTAServer from "@/components/MarqueeCTAServer";

// ISR: revalidate every 30 seconds
export const revalidate = 30;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    works.map((work) => ({ lang, slug: work.slug }))
  );
}

/* ─── ANIMA-specific page ─── */
function AnimaPage({ locale, t }: { locale: Locale; t: Record<string, string> }) {
  const work = getWorkBySlug("anima")!;
  const d = animaData;
  const lang = locale;

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
          {/* Poster */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
            <Image
              src="/images/works/anima/poster-v3.jpg"
              alt="ANIMA poster"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 text-[11px] tracking-[3px] uppercase text-brand-red font-semibold">
              {locale === "uk" ? d.premiere.dateUk : d.premiere.date} · {d.credits.company}
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

            {/* Quick credits */}
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Ідея" : "Idea"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk" ? d.credits.idea.nameUk : d.credits.idea.name}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Хореографія" : "Choreography"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk" ? d.credits.choreography.nameUk : d.credits.choreography.name}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Музика" : "Music"}
              </dt>
              <dd className="text-brand-grey">{d.credits.music}</dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Костюми" : "Costumes"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk" ? d.credits.costumes.nameUk : d.credits.costumes.name}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Прем'єра" : "Premiere"}
              </dt>
              <dd className="text-brand-grey">
                {locale === "uk" ? d.premiere.dateUk : d.premiere.date}
              </dd>

              <dt className="text-brand-dark-grey uppercase tracking-[2px] text-[11px]">
                {locale === "uk" ? "Місце" : "Venue"}
              </dt>
              <dd className="text-brand-grey">{d.premiere.venue[locale]}</dd>
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
        <blockquote className="border-l-2 border-brand-red pl-6">
          <p className="text-[15px] text-brand-grey italic leading-[1.7]">
            {locale === "uk"
              ? "Герой гармонізує себе за допомогою Старших Арканів карт Таро. Його Душа — окремий персонаж, що з'являється у передостанній сцені як результат усіх трансформацій."
              : "The Hero harmonizes himself through the Major Arcana of Tarot. His Soul is a separate character who appears in the penultimate scene as the result of all transformations."}
          </p>
        </blockquote>
      </section>

      {/* ===== 3. CAST ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Виконавці" : "Cast"}
        </div>
        <h2
          className="text-3xl text-brand-white mb-12"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk" ? "Виконавці" : "Cast"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.cast.map((member, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-[#222] hover:border-brand-red/40 transition-all"
              style={{
                background: `linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 40%, ${
                  i % 3 === 0 ? "#1a0a0a" : i % 3 === 1 ? "#0a0f1a" : "#0f1a0a"
                } 100%)`,
              }}
            >
              {/* Decorative number */}
              <span
                className="absolute top-4 right-5 text-[64px] leading-none text-white/[0.04] group-hover:text-brand-red/10 transition-colors select-none"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Role — centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                <p
                  className="text-[20px] text-center text-brand-white/90 leading-snug mb-1"
                  style={{ fontFamily: "NAMU-1400, serif" }}
                >
                  {member.role[locale]}
                </p>
              </div>

              {/* Name at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-4 px-5">
                <div className="text-[10px] tracking-[2px] uppercase text-brand-red/80 font-semibold mb-1">
                  {locale === "uk" ? "Виконавець" : "Performer"}
                </div>
                <div
                  className="text-[15px] text-brand-white/90"
                  style={{ fontFamily: "NAMU-Pro, sans-serif" }}
                >
                  {member.name[locale]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. SCENES — Gallery of 7 Arcana ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Сцени · Аркани" : "Scenes · Arcana"}
        </div>
        <h2
          className="text-3xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk" ? "7 Арканів" : "7 Arcana"}
        </h2>
        <p className="text-[15px] text-brand-grey mb-12 max-w-[600px]">
          {locale === "uk"
            ? "Кожна сцена вистави відповідає Старшому Аркану Таро — етапу духовного сходження Героя."
            : "Each scene corresponds to a Major Arcana of Tarot — a stage in the Hero's spiritual ascent."}
        </p>

        <div className="space-y-16">
          {d.scenes.map((scene) => (
            <div
              key={scene.number}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                scene.number % 2 === 0 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[16/10] rounded-lg overflow-hidden bg-[#111] ${
                scene.number % 2 === 0 ? "md:order-2" : ""
              }`}>
                <Image
                  src={scene.image}
                  alt={`Scene ${scene.number}: ${scene.arcana}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className={scene.number % 2 === 0 ? "md:order-1" : ""}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[40px] text-brand-red/20 font-light leading-none" style={{ fontFamily: "NAMU-1400, serif" }}>
                    #{scene.number}
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
                  {scene.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 5. VIDEO ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Відео" : "Video"}
        </div>
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
          <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{d.videos.showreel.title[locale]}</p>
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
            <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{d.videos.premiere.title[locale]}</p>
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
            <p className="text-[14px] font-semibold text-white/80 mt-4 leading-[1.5]">{d.videos.rehearsal.title[locale]}</p>
          </div>
        </div>
      </section>

      {/* ===== 6. FESTIVAL ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Фестиваль" : "Festival"}
        </div>
        <h2
          className="text-3xl text-brand-white mb-4"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {d.festival.name}
        </h2>
        <p className="text-lg text-brand-grey mb-2">
          {d.festival.fullName[locale]}
        </p>
        <p className="text-sm text-brand-dark-grey mb-8">
          {d.festival.dates[locale]} · {d.festival.venue[locale]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-[15px] text-[#999] leading-[1.7] mb-6">
              {d.festival.description[locale]}
            </p>
            <p className="text-[15px] text-[#999] leading-[1.7]">
              {d.festival.organizers[locale]}
            </p>
          </div>

          {/* Festival program image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#111]">
            <Image
              src={d.festival.programImage}
              alt="KMATOB-FEST 2014 program"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Masterclasses */}
        <div>
          <h3 className="text-[11px] tracking-[3px] uppercase text-brand-red mb-4">
            {locale === "uk" ? "Майстер-класи LITSO Dance Company" : "LITSO Dance Company Masterclasses"}
          </h3>
          <ul className="space-y-2">
            {d.festival.masterclasses[locale].map((mc, i) => (
              <li key={i} className="text-[14px] text-brand-grey leading-[1.6] pl-4 border-l border-[#333]">
                {mc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 7. ABOUT LITSO → NBB ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[800px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          LITSO → NBB
        </div>
        <h2
          className="text-3xl text-brand-white mb-8"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {locale === "uk" ? "Від LITSO до Newspaper Birds" : "From LITSO to Newspaper Birds"}
        </h2>
        <p className="text-[15px] text-[#999] leading-[1.8]">
          {d.litsoCompany[locale]}
        </p>
      </section>

      {/* ===== 8. POSTER GALLERY ===== */}
      <section className="py-24 px-6 md:px-16 max-w-[1200px] mx-auto border-b border-[#1a1a1a]">
        <div className="mb-2 text-[11px] tracking-[5px] uppercase text-brand-red font-semibold">
          {locale === "uk" ? "Афіші" : "Posters"}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
            <Image
              src="/images/works/anima/poster-v3.jpg"
              alt="ANIMA poster"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#111]">
            <Image
              src="/images/works/anima/poster-premiere.jpg"
              alt="ANIMA premiere poster"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA Ticker + Navigation ===== */}
      <MarqueeCTAServer locale={locale} workTitle="ANIMA" href={`/${lang}#contact`} />
      <WorkNavigation slug="anima" locale={locale} />
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

      <MarqueeCTAServer locale={locale} workTitle={work.title[locale]} href={`/${locale}#contact`} />
      <WorkNavigation slug={work.slug} locale={locale} />
    </article>
  );
}

/* ─── Work Navigation (async — uses dynamic data) ─── */
async function WorkNavigation({ slug, locale }: { slug: string; locale: Locale }) {
  const allWorks = await getWorks();
  const currentIndex = allWorks.findIndex((w) => w.slug === slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  return (
    <section className="py-16 px-6 md:px-16 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        {prevWork ? (
          <Link href={`/${locale}/works/${prevWork.slug}`} className="group">
            <span className="text-[11px] tracking-[2px] uppercase text-brand-grey group-hover:text-brand-red transition-colors">
              ← Previous
            </span>
            <p className="text-lg text-brand-white mt-1" style={{ fontFamily: "NAMU-1400, serif" }}>
              {prevWork.title[locale]}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextWork ? (
          <Link href={`/${locale}/works/${nextWork.slug}`} className="group text-right">
            <span className="text-[11px] tracking-[2px] uppercase text-brand-grey group-hover:text-brand-red transition-colors">
              Next →
            </span>
            <p className="text-lg text-brand-white mt-1" style={{ fontFamily: "NAMU-1400, serif" }}>
              {nextWork.title[locale]}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
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
    return <AnimaPage locale={locale} t={t} />;
  }

  return <GenericWorkPage work={work} locale={locale} t={t} />;
}
