import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { offers, proCopy, type Offer } from "@/lib/offers-data";
import { DRAFT_PROGRAMMER } from "@/lib/drafts";

/* Repo-local structured content, like the CV — no Notion fetch, so nothing on
   this page can blank out on a rate-limited request (see AGENTS.md). */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Programmer — Artem Hordieiev",
    description:
      "Quatre formats disponibles : conférence dansée, version de chambre, pièce courte et transmission, chorégraphie pour l'opéra. Fiches, durées et conditions techniques.",
  },
  en: {
    title: "Programme the work — Artem Hordieiev",
    description:
      "Four available formats: danced lecture, chamber version, short piece and transmission, choreography for opera. Sheets, durations and technical conditions.",
  },
  uk: {
    title: "Замовити роботу — Артем Гордєєв",
    description:
      "Чотири доступні формати: лекція-перформанс, камерна версія, коротка робота і перенос, хореографія для опери. Картки, тривалість і технічні умови.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  /* Поки розділ — чернетка, назовні не йде навіть його title/description:
     generateMetadata виконується і для 404-сторінки, тож текст осідав би
     у payload. А відкритий локально — все одно без індексації. */
  if (!DRAFT_PROGRAMMER) return { robots: { index: false, follow: false } };
  return {
    ...META[hasLocale(lang) ? lang : "fr"],
    robots: { index: false, follow: false },
  };
}

function availabilityText(o: Offer, c: Record<string, string>) {
  if (o.availability === "now") return c.availNow;
  if (o.availability === "season") return c.availSeason;
  return c.availDev;
}

export default async function ProgrammerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  /* Розділ не затверджений на канвасі — у продакшені його немає (@/lib/drafts). */
  if (!DRAFT_PROGRAMMER) notFound();
  const locale = lang as Locale;
  const c = proCopy[locale];

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-[1100px] mx-auto">
      {/* ── Заголовок ─────────────────────────────────────────────────── */}
      <header className="border-b border-[#1a1a1a] pb-12">
        <p className="t-label t-mono text-brand-red">{c.label}</p>
        <h1
          className="t-h2 mt-5 text-[34px] md:text-[46px] leading-[1.05]"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {c.title}
        </h1>
        <p className="t-lead mt-6 max-w-[46ch]">{c.lede}</p>
        <p className="t-p mt-4 max-w-[62ch]">{c.intro}</p>
      </header>

      {/* ── Чотири пропозиції ─────────────────────────────────────────── */}
      <div className="mt-4">
        {offers.map((o) => (
          <section
            key={o.code}
            id={o.code.toLowerCase()}
            className="border-b border-[#1a1a1a] py-12 grid md:grid-cols-[1fr_300px] gap-8 md:gap-12"
          >
            <div>
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="t-mono text-brand-red text-[13px] tracking-[2.4px]">
                  {o.code}
                </span>
                <span className="t-mono t-meta-c text-[12px] tracking-[1.8px] uppercase">
                  {o.genre[locale]}
                </span>
              </div>

              <h2
                className="t-h3 mt-3 text-[24px] md:text-[30px] leading-[1.15]"
                style={{ fontFamily: "NAMU-1400, serif" }}
              >
                {o.title[locale]}
              </h2>

              <p className="t-lead mt-4 max-w-[52ch]">{o.lede[locale]}</p>
              <p className="t-p mt-4 max-w-[62ch]">{o.body[locale]}</p>

              <p className="t-p mt-6 max-w-[62ch] text-[15px]">
                <span className="t-mono t-meta-c text-[11px] tracking-[1.6px] uppercase mr-2">
                  {c.buyerLabel}
                </span>
                {o.buyer[locale]}
              </p>
            </div>

            {/* Права колонка — те, що продюсер має знати за десять секунд. */}
            <aside className="md:border-l md:border-[#1a1a1a] md:pl-8">
              <dl className="space-y-4">
                <div>
                  <dt className="t-mono t-meta-c text-[11px] tracking-[1.6px] uppercase">
                    {c.durationLabel}
                  </dt>
                  <dd className="t-p text-[15px] mt-1">{o.duration[locale]}</dd>
                </div>
                <div>
                  <dt className="t-mono t-meta-c text-[11px] tracking-[1.6px] uppercase">
                    {c.castLabel}
                  </dt>
                  <dd className="t-p text-[15px] mt-1">{o.cast[locale]}</dd>
                </div>
                <div>
                  <dt className="t-mono t-meta-c text-[11px] tracking-[1.6px] uppercase">
                    {c.techLabel}
                  </dt>
                  <dd className="mt-1">
                    <ul className="space-y-1.5">
                      {o.technical[locale].map((t) => (
                        <li key={t} className="t-p text-[15px] leading-[1.55]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <p className="t-mono text-[11px] tracking-[1.6px] uppercase mt-6 text-brand-red">
                {availabilityText(o, c)}
              </p>

              <a
                href={o.fiche}
                target="_blank"
                rel="noopener"
                className="inline-block mt-4 t-mono text-[11px] tracking-[2px] uppercase border border-brand-red text-brand-red px-4 py-2 rounded-sm hover:bg-brand-red hover:text-brand-white transition-colors"
              >
                {c.ficheLabel}
              </a>
            </aside>
          </section>
        ))}
      </div>

      {/* ── Умови ─────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-[#1a1a1a]">
        <p className="t-label t-mono text-brand-red">{c.condTitle}</p>
        <ul className="mt-6 grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-[80ch]">
          {[c.cond1, c.cond2, c.cond3, c.cond4].map((line) => (
            <li key={line} className="t-p text-[16px]">
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Реквізити і контакт ───────────────────────────────────────── */}
      <section className="py-12 grid md:grid-cols-2 gap-10">
        <div>
          <p className="t-label t-mono text-brand-red">{c.mentionsTitle}</p>
          <p className="t-p mt-5 text-[15px] max-w-[46ch]">{c.mentions}</p>
          <div className="flex gap-6 mt-6">
            <Link
              href={`/${locale}/cv`}
              className="t-mono text-[11px] tracking-[2px] uppercase t-body-c hover:text-brand-red transition-colors border-b border-[#333] pb-0.5"
            >
              {c.cvLink}
            </Link>
            <Link
              href={`/${locale}#works`}
              className="t-mono text-[11px] tracking-[2px] uppercase t-body-c hover:text-brand-red transition-colors border-b border-[#333] pb-0.5"
            >
              {c.worksLink}
            </Link>
          </div>
        </div>
        <div>
          <p className="t-label t-mono text-brand-red">{c.contactTitle}</p>
          <p className="t-p mt-5 text-[15px] max-w-[38ch]">{c.contactLede}</p>
          <div className="mt-5 space-y-2">
            <a
              href="mailto:art_om@me.com"
              className="block t-lead hover:text-brand-red transition-colors"
            >
              art_om@me.com
            </a>
            <a
              href="https://wa.me/33743791841"
              target="_blank"
              rel="noopener"
              className="block t-p hover:text-brand-red transition-colors"
            >
              +33 7 43 79 18 41
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
