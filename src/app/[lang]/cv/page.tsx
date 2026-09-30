import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { cvData, cvShared } from "@/lib/cv-data";
import CvActions from "@/components/CvActions";
import Paras from "@/components/Paras";
import { toParas } from "@/lib/paras";

import { CV_DOWNLOAD, CV_PRINT } from "@/lib/cv-files";
import "./cv.css";

/* The CV is repo-local structured content (src/lib/cv-data.ts, generated from
   design/cv/copy.json) — no Notion fetch, so nothing here can blank out on a
   rate-limited request the way Notion-backed fields can. See AGENTS.md. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Artem Hordieiev — Artistic CV",
    description:
      "Ukrainian choreographer, based in France since May 2026. The Ukrainian academic school meets the Complexions technique of Dwight Rhoden and Desmond Richardson.",
  },
  uk: {
    title: "Артем Гордєєв — творче резюме",
    description:
      "Український хореограф, із травня 2026 у Франції. Українська академічна школа та техніка Complexions Дуайта Родена й Дезмонда Річардсона.",
  },
  fr: {
    title: "Artem Hordieiev — CV artistique",
    description:
      "Chorégraphe ukrainien, installé en France depuis mai 2026. L'école académique ukrainienne rencontre la technique Complexions de Dwight Rhoden et Desmond Richardson.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return META[hasLocale(lang) ? lang : "en"];
}

// ── small shared pieces ────────────────────────────────────────────────────
type Tone = "red" | "gold" | "meta";
const TONE: Record<Tone, string> = {
  red: "var(--cv-red)",
  gold: "var(--cv-gold)",
  meta: "var(--cv-meta)",
};

function Label({
  children,
  tone = "red",
  small = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  small?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`cv-label ${small ? "cv-label-sm" : ""} ${className}`}
      style={{ color: TONE[tone] }}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  panel = false,
  first = false,
  id,
  className = "",
}: {
  children: React.ReactNode;
  panel?: boolean;
  first?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`cv-section py-16 md:py-24 ${className}`}
      style={{
        borderTop: first ? "none" : "1px solid var(--cv-line)",
        background: panel ? "var(--cv-panel)" : undefined,
        paddingLeft: panel ? "clamp(20px,3vw,40px)" : undefined,
        paddingRight: panel ? "clamp(20px,3vw,40px)" : undefined,
      }}
    >
      {children}
    </section>
  );
}

/** Відкриття розділу по центру — мітка, заголовок і (за потреби) вступ. */
function Head({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`r-head ${className}`}>{children}</div>;
}

// ── 02 · the trajectory graph ──────────────────────────────────────────────
/** A wave, not a fall-and-rise. The peaks are named underneath; the line only
 *  carries the shape, with no highlighted region and no annotation telling the
 *  reader which stretch to feel bad about. */
function TrajectoryGraph() {
  const pts = cvShared.trajectory;
  const W = 1120;
  const H = 236;
  const padT = 22;
  const innerH = H - padT - 26;
  const xs = pts.map((_, i) => 16 + ((W - 32) * i) / (pts.length - 1));
  const ys = pts.map((pt) => padT + innerH * (1 - pt.v / 100));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} height={H} className="cv-graph" role="presentation">
      {[0, 1, 2, 3, 4].map((k) => {
        const y = padT + (innerH * k) / 4;
        return <line key={k} x1={0} y1={y} x2={W} y2={y} stroke="var(--cv-line)" strokeWidth={1} />;
      })}
      <polyline
        points={xs.map((x, i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ")}
        fill="none" stroke="var(--cv-red)" strokeWidth={2.25}
        strokeLinejoin="round" strokeLinecap="round"
      />
      {pts.map((pt, i) =>
        "peak" in pt && pt.peak ? (
          <g key={pt.key}>
            <circle cx={xs[i]} cy={ys[i]} r={9} fill="none" stroke="var(--cv-gold)" strokeWidth={1.25} />
            <circle cx={xs[i]} cy={ys[i]} r={4.5} fill="var(--cv-red)" />
          </g>
        ) : (
          <circle
            key={pt.key} cx={xs[i]} cy={ys[i]} r={4}
            fill="var(--cv-bg)" stroke="var(--cv-red)" strokeWidth={1.75}
          />
        )
      )}
    </svg>
  );
}

// ── page ───────────────────────────────────────────────────────────────────
export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = cvData[locale];
  const c = cvShared.contact;
  const f = cvShared.facts;

  const pointCopy = d.s02.points as Record<string, { title: string; meta: string }>;
  const workCopy = d.s06.works as Record<
    string,
    { title?: string; music?: string; format: string; status: string }
  >;
  const collabCopy = d.s07.collabs as Record<string, string>;
  const awardCopy = d.s07.awards as Record<string, string>;
  const claimLines = d.claim.split("\n");
  // the work's name sits on its own line above the note
  const [icareHead, ...icareRest] = d.s06.icareNote.split("\n");
  const icareBody = icareRest.join(" ");

  // repertoire key → the work's page on the site (src/lib/works.ts). All
  // seven have a page; "ants"/"mozart" are the two whose CV key differs
  // from its slug.
  const WORK_SLUG: Record<string, string> = {
    ants: "the-ants",
    icare: "icare",
    mozart: "mozart25",
    carmen: "carmen",
    anima: "anima",
    adios: "adios",
    firebird: "firebird",
  };

  const statusTone = (key: string, status: string): { color: string; soft: string } => {
    // Firebird carries the site's own midnight-blue identity (matches
    // FB_BLUE on its work page) rather than the generic "in development"
    // grey — decided 10.09.2026.
    if (key === "firebird") return { color: "var(--cv-navy)", soft: "var(--cv-navy-soft)" };
    const s = status.toLowerCase();
    if (s.includes("develop") || s.includes("розроб") || s.includes("développ"))
      return { color: "var(--cv-meta)", soft: "var(--cv-line2)" };
    if (s.includes("готов") || s.includes("prêt") || s.includes("prête") || s.includes("ready") || s.includes("finished"))
      return { color: "var(--cv-gold)", soft: "var(--cv-gold-soft)" };
    if (
      s.includes("repertoire") || s.includes("репертуар") || s.includes("répertoire") ||
      s.includes("у роботі") || s.includes("en cours") || s.includes("work in progress")
    ) return { color: "var(--cv-gold)", soft: "var(--cv-gold-soft)" };
    return { color: "var(--cv-red)", soft: "var(--cv-red-soft)" };
  };

  return (
    <div className="cv" lang={locale}>
      <div className="cv-wrap max-w-[1120px] mx-auto px-5 md:px-10 pb-10">
        {/* ── masthead ── */}
        <header className="cv-masthead r-head pt-24 md:pt-28 pb-14 md:pb-16">
          <div
            className="w-full flex items-center justify-between gap-4 pb-5 mb-14 md:mb-20"
            style={{ borderBottom: "1px solid var(--cv-line2)" }}
          >
            <span className="cv-mono text-[14px] tracking-[3px] uppercase" style={{ color: "var(--cv-red)" }}>
              {d.docLabel}
            </span>
            <Link href={`/${locale}`} className="cv-mono text-[14px] tracking-[3px] uppercase cv-body-c">
              {c.site}
            </Link>
          </div>

          <h1 className="cv-h1 mb-5 md:mb-6">
            <span className="cv-fg">ARTEM</span> <span className="cv-red">HORDIEIEV</span>
          </h1>
          <div
            className="cv-role cv-mono text-[17px] md:text-[21px] tracking-[4.5px] uppercase cv-fg"
            style={{ marginBottom: d.base ? "10px" : "48px" }}
          >
            {d.role}
          </div>
          {d.base ? <div className="text-[15.5px] cv-meta mb-10 md:mb-11">{d.base}</div> : null}

          <div className="r-rule mb-6" style={{ height: "2px", background: "var(--cv-gold)" }} />
          <div className="cv-claim mb-12 md:mb-16 max-w-[680px]" style={{ textWrap: "balance" }}>
            {claimLines.map((line, i) => (
              <div key={i} className="cv-quote" style={{ color: i === 0 ? "var(--cv-fg)" : "var(--cv-gold)" }}>
                {line}
              </div>
            ))}
          </div>

          <div
            className="cv-stats w-full max-w-[820px]"
            style={{ ["--n" as string]: d.headStats.length } as CSSProperties}
          >
            {d.headStats.map((s) => (
              <div key={s.label} className="cv-stat">
                <div className="cv-mono text-[13px] tracking-[2px] uppercase cv-meta">{s.label}</div>
                <div className="text-[17px] sm:text-[20px] leading-[1.3] cv-fg">{s.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* FR keeps the pair — print the one-pager, or download it — so its
            download button takes the longer `onePagerBtn` label to stand apart
            from the print one. en/uk have the single direct download, under
            the plain "Download PDF" label they have always carried. */}
        <CvActions
          downloadLabel={CV_PRINT[locale] ? d.onePagerBtn : d.downloadBtn}
          downloadHref={CV_DOWNLOAD[locale]}
          printLabel={CV_PRINT[locale] ? d.downloadBtn : undefined}
          printHref={CV_PRINT[locale]}
          backLabel={d.backBtn}
          backHref={`/${locale}`}
        />

        {/* ── 01 · position ── */}
        <Section>
          <Head>
            <Label className="mb-4">{d.s01.label}</Label>
            <h2 className="cv-h2 mb-10 md:mb-12">{d.s01.title}</h2>
          </Head>
          {(() => {
            // the last line of the body is the one-line summary — it stands apart
            const lines = d.s01.body.split("\n");
            const tail = lines.length > 1 ? lines.pop()! : "";
            return (
              <>
                <div className="r-col r-flow">
                  {toParas(lines.join("\n")).map((para, i) => (
                    <p key={i} className="cv-p cv-read" style={i === 0 ? { color: "var(--cv-fg)" } : undefined}>
                      {para}
                    </p>
                  ))}
                </div>
                {tail ? (
                  <>
                    <div className="r-rule mt-12 mb-6" style={{ background: "var(--cv-red)" }} />
                    <p className="r-accent cv-fg">{tail}</p>
                  </>
                ) : null}
              </>
            );
          })()}
        </Section>

        {/* ── 02 · trajectory ── */}
        <Section id="trajectory">
          <Head className="mb-10 md:mb-12">
            <Label className="mb-4">{d.s02.label}</Label>
            <h2 className="cv-h2">{d.s02.title}</h2>
            {d.s02.note ? (
              <p className="text-[16px] leading-[1.65] cv-meta max-w-[560px] mt-5">{d.s02.note}</p>
            ) : null}
          </Head>
          {d.s02.axis ? (
            <div className="cv-mono text-[12px] tracking-[1.8px] uppercase cv-meta mb-4">↑ {d.s02.axis}</div>
          ) : null}
          <div className="cv-graph-scroll overflow-x-auto">
            <div className="min-w-[640px]">
              <TrajectoryGraph />
            </div>
          </div>
          <div className="cv-traj-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-7 gap-y-10 mt-10">
            {cvShared.trajectory.map((pt) => {
              const p = pointCopy[pt.key];
              const tone = "peak" in pt && pt.peak ? "var(--cv-red)" : "var(--cv-meta)";
              return (
                <div key={pt.key} className="cv-keep pt-3 pr-3" style={{ borderTop: "1px solid var(--cv-line)" }}>
                  <div className="cv-mono text-[14px] tracking-[1.4px] mb-2" style={{ color: tone }}>
                    {pt.year}
                  </div>
                  <div className="cv-h3 text-[18px] mb-2.5">{p.title}</div>
                  <div className="text-[15.5px] leading-[1.62] cv-body-c">{p.meta}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── 03 · Ukraine × United States ── */}
        <Section id="ukraine-usa">
          <Head className="mb-10 md:mb-14">
            <Label className="mb-4">{d.s03.label}</Label>
            <h2 className="cv-h2">{d.s03.title}</h2>
          </Head>

          <div className="cv-two-cols grid grid-cols-1 md:grid-cols-2 mb-16">
            <div className="md:pr-9 pb-7 md:pb-0">
              <Label tone="gold" small className="mb-5">{d.s03.leftLabel}</Label>
              <ul className="list-none m-0 p-0">
                {d.s03.left.map((x) => (
                  <li key={x} className="flex gap-3 items-start mb-4 cv-keep">
                    <span className="cv-dot" style={{ background: "var(--cv-gold)" }} />
                    <span className="text-[16.5px] leading-[1.68] cv-body-c" style={{ textWrap: "pretty" }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cv-seam md:pl-9 pt-7 md:pt-0">
              <Label tone="red" small className="mb-5">{d.s03.rightLabel}</Label>
              <ul className="list-none m-0 p-0">
                {d.s03.right.map((x) => (
                  <li key={x} className="flex gap-3 items-start mb-4 cv-keep">
                    <span className="cv-dot" style={{ background: "var(--cv-red)" }} />
                    <span className="text-[16.5px] leading-[1.68] cv-body-c" style={{ textWrap: "pretty" }}>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="cv-meet cv-keep max-w-[880px] mx-auto px-5 md:px-12 py-10 md:py-14 mb-6"
            style={{ background: "var(--cv-red-soft)", borderTop: "2px solid var(--cv-red)" }}
          >
            <Head className="mb-6 md:mb-8">
              <Label tone="red" small className="mb-4">{d.s03.meetLabel}</Label>
              <div className="cv-h3 text-[26px] md:text-[34px]">{d.s03.meetTitle}</div>
            </Head>
            <Paras text={d.s03.meetBody} className="r-col" pClassName="cv-p cv-read" />
          </div>
          <div
            className="cv-europe cv-keep max-w-[880px] mx-auto px-5 md:px-12 py-10 md:py-12"
            style={{ borderTop: "1px solid var(--cv-line2)" }}
          >
            <Head className="mb-6">
              <Label tone="meta" small className="mb-4">{d.s03.europeLabel}</Label>
              <div className="cv-h3 text-[20px] md:text-[24px] leading-[1.3]">{d.s03.europeTitle}</div>
            </Head>
            <Paras text={d.s03.europeBody} className="r-col" pClassName="cv-p cv-read-sm" />
          </div>
        </Section>

        {/* ── 04 · what this CV does not hide ── */}
        <Section panel>
          <Head className="mb-10 md:mb-12">
            <div className="r-rule mb-6" style={{ height: "2px", background: "var(--cv-gold)" }} />
            <Label tone="gold" className="mb-4">{d.s04.label}</Label>
            <h2 className="cv-h2" style={{ fontSize: "clamp(28px,3.6vw,38px)" }}>{d.s04.title}</h2>
          </Head>
          <Paras text={d.s04.paras.join("\n")} className="r-col" pClassName="cv-p cv-read" />
        </Section>

        {/* ── 05 · what the detour built ── */}
        <Section>
          <Head className="mb-10 md:mb-12">
            <Label>{d.s05.label}</Label>
          </Head>
          <div className="cv-payoff grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
            {d.s05.items.map((it) => (
              <div key={it.title} className="cv-keep pt-4" style={{ borderTop: "2px solid var(--cv-red)" }}>
                {it.n && <div className="cv-mono text-[13px] tracking-[2px] cv-red mb-3">{it.n}</div>}
                <div className="cv-h3 text-[21px] mb-2.5">{it.title}</div>
                <p className="text-[16px] leading-[1.65] cv-body-c" style={{ textWrap: "pretty" }}>{it.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 06 · repertoire ── */}
        <Section id="repertoire">
          <Head className="mb-10 md:mb-12">
            <Label className="mb-4">{d.s06.label}</Label>
            <h2 className="cv-h2" style={{ fontSize: "clamp(26px,3vw,34px)" }}>{d.s06.title}</h2>
          </Head>

          <div
            className="cv-rep-head hidden lg:grid gap-5 pb-3"
            style={{ borderBottom: "1px solid var(--cv-line2)" }}
          >
            {[d.s06.colWork, d.s06.colYear, d.s06.colFormat, d.s06.colMusic, d.s06.colStatus].map((h) => (
              <div key={h} className="cv-mono text-[12px] tracking-[1.8px] uppercase cv-meta">{h}</div>
            ))}
          </div>
          {cvShared.repertoire.map((w) => {
            const wd = workCopy[w.key];
            const tone = statusTone(w.key, wd.status);
            const slug = WORK_SLUG[w.key];
            return (
              <Link
                key={w.key}
                href={`/${locale}/works/${slug}`}
                className="cv-rep-row cv-keep grid grid-cols-1 lg:items-baseline gap-2 lg:gap-5 py-4"
                style={{
                  borderBottom: "1px solid var(--cv-line)",
                  ["--row-tone" as string]: tone.color,
                  ["--row-tone-soft" as string]: tone.soft,
                } as CSSProperties}
              >
                <div className="cv-h3 text-[19px] tracking-[0.5px]">{wd.title ?? w.title}</div>
                <div className="cv-mono text-[13.5px] cv-meta">{w.year}</div>
                <div className="text-[14.5px] leading-[1.5] cv-body-c">{wd.format}</div>
                <div className="text-[14.5px] leading-[1.5] cv-meta">{wd.music ?? w.music}</div>
                <div className="cv-status-pill cv-mono text-[12px] tracking-[1.4px] uppercase">
                  {wd.status}
                  <svg
                    className="cv-screen-only"
                    width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" aria-hidden
                  >
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </div>
              </Link>
            );
          })}
          <div className="cv-note r-col mt-12 pt-6" style={{ borderTop: "2px solid var(--cv-red)" }}>
            <Label tone="red" small className="mb-3">{icareHead}</Label>
            <Paras text={icareBody} pClassName="cv-p cv-read" />
          </div>
          <div className="cv-note r-col mt-8 pt-6" style={{ borderTop: "2px solid var(--cv-gold)" }}>
            <Paras text={d.s06.tourNote} pClassName="cv-p cv-read" />
          </div>
          {/* straight into the works section of the site, not the home page top */}
          <div className="cv-screen-only flex justify-center mt-10">
            <Link href={`/${locale}#works`} className="cv-btn cv-btn-ghost">
              {d.s06.worksBtn}
            </Link>
          </div>
        </Section>

        {/* ── 07 · collaborations · recognition ── */}
        <Section>
          <Head className="mb-10 md:mb-12">
            <Label>{d.s07.label}</Label>
          </Head>
          <div className="cv-split grid grid-cols-1 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] gap-12 lg:gap-14">
            <div>
              <Label tone="meta" small className="mb-4">{d.s07.collabsTitle}</Label>
              {cvShared.collabs.map((x) => (
                <div
                  key={x.key}
                  className="cv-collab-row cv-keep flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-5 py-4"
                  style={{ borderTop: "1px solid var(--cv-line)" }}
                >
                  <div className="cv-h3 text-[17px] md:flex-[0_0_200px]">{x.name}</div>
                  <div className="flex-1 text-[15.5px] leading-[1.6] cv-body-c">{collabCopy[x.key]}</div>
                </div>
              ))}
            </div>
            <div>
              <Label tone="meta" small className="mb-4">{d.s07.awardsTitle}</Label>
              {cvShared.awards.map((a) => (
                <div key={a.key} className="cv-keep py-4" style={{ borderTop: "1px solid var(--cv-line)" }}>
                  <div className="cv-mono text-[13px] tracking-[1.6px] cv-gold mb-2">{a.year}</div>
                  <div className="text-[16px] leading-[1.58] cv-fg">{awardCopy[a.key]}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 08 · profile ── */}
        <Section className="cv-profile-a">
          <Head className="mb-10 md:mb-12">
            <Label>{d.s08.label}</Label>
          </Head>
          <div className="cv-facts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 mb-11">
            {[
              [d.s08.education, d.s08.educationValue],
              [d.s08.specialty, d.s08.specialtyValue],
              [d.s08.productions, f.productions],
              ["", ""],
              [d.s08.countries, d.s08.countriesValue],
              [d.s08.producer, f.producer],
            ].map(([k, v], i) =>
              k === "" ? (
                <div key={`spacer-${i}`} className="cv-facts-spacer hidden lg:block" aria-hidden />
              ) : (
              <div key={k} className="cv-keep pt-3" style={{ borderTop: "1px solid var(--cv-line)" }}>
                <div className="cv-mono text-[12px] tracking-[1.8px] uppercase cv-meta mb-2">{k}</div>
                <div className="text-[16px] leading-[1.5] cv-fg">{v}</div>
              </div>
              ),
            )}
          </div>
        </Section>

        {/* ── 08b · school and languages ──
           A section of its own, not a tail of the profile: on paper each
           section moves as one block, and profile + school + languages
           together are taller than a sheet. On screen the seam is invisible:
           the pair keeps the spacing it had as one section. */}
        <Section className="cv-profile-b">
          {/* Where the body comes from — the first thing a company director looks for. */}
          <div className="cv-school-block mb-11">
            <Head className="mb-6">
              <Label tone="meta">{d.s08.schoolLabel}</Label>
            </Head>
            <div className="cv-school grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {d.s08.school.map((x) => (
                <div
                  key={x}
                  className="cv-keep flex gap-3.5 items-start py-3"
                  style={{ borderTop: "1px solid var(--cv-line)" }}
                >
                  <span className="cv-dot mt-[9px]" style={{ background: "var(--cv-gold)" }} />
                  <span className="text-[17px] leading-[1.6] cv-fg">{x}</span>
                </div>
              ))}
            </div>
          </div>

          {/* «Напрями» знято; «Мови» стоять на його місці, горизонтально */}
          <div className="cv-langs-block">
            <Head className="mb-6">
              <Label tone="meta">{d.s08.languagesLabel}</Label>
            </Head>
            <div className="cv-langs grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
              {d.s08.languages.map((x) => (
                <div key={x.name} className="cv-keep pt-3.5" style={{ borderTop: "1px solid var(--cv-line)" }}>
                  <div className="text-[17px] leading-[1.4] cv-fg mb-1.5">{x.name}</div>
                  <div className="cv-mono text-[13px] tracking-[1.2px] cv-meta">{x.level}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* The tail of the document: the ask, the contacts and the last line
           travel together — a footer alone on a sheet is not a page. */}
        <div className="cv-tail">
        {/* ── 09 · open for · contact ── */}
        <Section panel>
          <Head className="mb-10 md:mb-12">
            <Label>{d.s09.label}</Label>
          </Head>
          <div className="cv-split grid grid-cols-1 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] gap-12 lg:gap-14 items-start">
            <div>
              <h2 className="cv-h2 mb-6" style={{ fontSize: "clamp(24px,3vw,32px)" }}>{d.s09.title}</h2>
              {d.s09.items.map((x, i) => (
                <div
                  key={x}
                  className="cv-keep flex gap-4 items-start py-3.5"
                  style={{ borderTop: "1px solid var(--cv-line2)" }}
                >
                  <span className="cv-mono text-[12.5px] tracking-[1.4px] cv-red pt-[3px] flex-none">
                    0{i + 1}
                  </span>
                  <span className="text-[17px] leading-[1.6] cv-fg" style={{ textWrap: "pretty" }}>{x}</span>
                </div>
              ))}
            </div>
            <div className="cv-contact-block lg:pl-7">
              <Label tone="red" small className="mb-5">{d.s09.contactLabel}</Label>
              <div className="flex flex-col gap-3.5 items-start">
                {[
                  [`mailto:${c.email}`, c.email],
                  [c.whatsappUrl, `WhatsApp ${c.whatsapp}`],
                  [c.instagram, `Instagram ${c.instagramHandle}`],
                  [c.siteUrl, c.site],
                ].map(([href, text]) => (
                  <a
                    key={href}
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="cv-mono text-[15px] tracking-[0.6px] pb-0.5"
                    style={{ borderBottom: "1px solid var(--cv-red)" }}
                  >
                    {text}
                  </a>
                ))}
              </div>
              <div className="mt-6 cv-mono text-[12px] tracking-[1.6px] uppercase cv-meta">
                {d.s09.producerLabel} — {f.producer}
              </div>
            </div>
          </div>
        </Section>

        {/* ── document footer (also the last line of the PDF) ── */}
        <footer
          className="cv-doc-foot flex flex-wrap justify-between gap-4 pt-7 pb-2"
          style={{ borderTop: "1px solid var(--cv-line)" }}
        >
          <span className="cv-mono text-[12px] tracking-[2px] uppercase cv-meta">
            Artem Hordieiev · {d.docLabel}
          </span>
          <span className="cv-mono text-[12px] tracking-[2px] cv-meta">
            {d.printedFrom}{" "}
            <Link href={`/${locale}`} className="cv-fg">
              {c.site}
            </Link>
          </span>
        </footer>
        </div>
      </div>
    </div>
  );
}
