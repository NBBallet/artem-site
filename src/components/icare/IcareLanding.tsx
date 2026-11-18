/* ─── ІКАР — нова сторінка /[lang]/works/icare (чернетка, @/lib/drafts) ───
   Світова хореографічна прем'єра L'Envol d'Icare Ігоря Маркевича — для
   оперно-балетних домів і меценатів по всій Франції.

   Верстка — за канвою design/icare/ (gen.py, версія 74, 18.11.2026).
   Текст — ЛИШЕ з design/icare/copy.json (uk майстер, fr/en похідні): ні
   Notion, ні рядків у коді, тож на збої мережі нічого не порожніє (AGENTS.md).
   Нерви й «ніч» — з ./art.ts, який пише `python3 design/icare/gen.py --site`. */

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import copy from "../../../design/icare/copy.json";
import * as art from "./art";
import type { Art } from "./art";

type Copy = (typeof copy)["uk"];
const SH = copy.shared;

/* ── каса канви (gen.py) ─────────────────────────────────────────────── */
const BG = "#0a0a0a";
const FG = "#f5f5f5";
const BODY = "#9a9a9a";
const META = "#8a8a8a";
const PINK = "#E8455E";
const ULTRA = "#12275e";
const PLAY = "#2150B8";
const GOLD = "#C9AE7A";
const LINE = "#1f1e1c";
const BTN_LINE = "#8fa6e6";
const DISPLAY = "NAMU-1400, Georgia, serif";
const MONO = "var(--mono-font)";
const IMG = "/images/works/icare";

/* Назви творів курсивом, без перекладу — як works() у gen.py. */
const WORKS_RE =
  /(L'Envol d'Icare|L’Envol d’Icare|Icare 1943|Être et avoir été|Jazz|(?:власний|own|propre) Icare)/g;
function works(s: string): ReactNode {
  return s.split(WORKS_RE).map((part, i) => {
    if (i % 2 === 0) return part;
    const m = part.match(/^(власний|own|propre) (Icare)$/);
    if (m) return <span key={i}>{m[1]} <i>{m[2]}</i></span>;
    return <i key={i}>{part}</i>;
  });
}

/* SVG з art.ts, розтягнутий на свій контейнер. */
function Svg({
  a,
  className = "",
  style,
  fit = "none",
  viewBox,
  idSuffix,
}: {
  a: Art;
  className?: string;
  style?: React.CSSProperties;
  fit?: string;
  viewBox?: string;
  idSuffix?: string;
}) {
  // Та сама сцена двічі в DOM (desktop/mobile) — id масок мусять різнитись.
  const inner = idSuffix
    ? a.inner.replace(/(id="|url\(#)([a-z0-9]+)/g, `$1$2${idSuffix}`)
    : a.inner;
  return (
    <svg
      viewBox={viewBox ?? a.viewBox}
      preserveAspectRatio={fit}
      aria-hidden="true"
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

function Label({ children, color = PINK, className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <div
      className={`text-[12px] md:text-[13px] tracking-[2.4px] uppercase ${className}`}
      style={{ fontFamily: MONO, color }}
    >
      {children}
    </div>
  );
}

function Mono({
  children,
  color = META,
  size = 12,
  ls = 1.8,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  ls?: number;
  className?: string;
}) {
  return (
    <div
      className={`uppercase ${className}`}
      style={{ fontFamily: MONO, fontSize: size, letterSpacing: ls, color }}
    >
      {children}
    </div>
  );
}

function Play({ size }: { size: number }) {
  const t = Math.floor(size / 3);
  return (
    <span
      className="flex items-center justify-center rounded-full flex-none"
      style={{ width: size, height: size, background: PLAY }}
    >
      <svg viewBox="0 0 10 12" width={t} height={t} aria-hidden="true">
        <path d="M1 1 L9 6 L1 11 Z" fill="#fff" />
      </svg>
    </span>
  );
}

function Button({ href, children, solid = true }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-[10px] min-h-[48px] px-[22px] text-[12px] md:text-[13px] tracking-[2px] uppercase rounded-[2px] transition-opacity hover:opacity-85"
      style={{
        fontFamily: MONO,
        background: solid ? PLAY : "transparent",
        color: solid ? "#fff" : BTN_LINE,
        border: `1px solid ${solid ? PLAY : BTN_LINE}`,
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

const display = (size: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: DISPLAY,
  fontWeight: 400,
  fontSize: size,
  textTransform: "uppercase",
  color: FG,
  ...extra,
});

function mailto(subject: string) {
  return `mailto:${SH.email}?subject=${encodeURIComponent(subject)}`;
}

/* Знак питання NAMU у віконці 2026 (контур із gen.py). */
function QMark() {
  return (
    <svg
      viewBox="0 0 540 720"
      width={170}
      height={227}
      aria-hidden="true"
      className="absolute block"
      style={{ right: -18, bottom: -30 }}
    >
      <g transform="translate(0 720) scale(1 -1)" fill={PINK}>
        <path d="M186 230Q186 276 204.5 307.0Q223 338 249.0 356.0Q275 374 318 397Q370 423 396.0 446.5Q422 470 422 511Q422 566 376.0 590.0Q330 614 269 614Q211 614 167.5 588.5Q124 563 112 510H10Q19 574 57.5 619.0Q96 664 153.0 687.0Q210 710 274 710Q336 710 392.5 689.0Q449 668 485.5 624.5Q522 581 522 518Q522 467 502.0 432.5Q482 398 454.0 378.0Q426 358 381 335Q346 317 327.5 305.0Q309 293 296.5 275.0Q284 257 284 233V210H186Z" />
        <path d="M292 110V0H182V110Z" />
      </g>
    </svg>
  );
}

const SECTION = "px-6 md:px-16 border-t";

export default function IcareLanding({ locale }: { locale: Locale }) {
  const c: Copy = copy[locale];

  /* ── місія: лінія дат ── */
  const eras: {
    year: string;
    img?: string;
    filter?: string;
    opacity?: number;
    text: string;
    kind: "card" | "blue" | "anchor";
  }[] = [
    { year: "1929–30", img: "tl-1929.webp", opacity: 0.26, filter: "grayscale(1) contrast(1.1)", text: c.era_1929, kind: "card" },
    { year: "1932", img: "tl-1932.webp", opacity: 0.42, filter: "invert(1) grayscale(1) contrast(1.15)", text: c.era_1932, kind: "card" },
    // 1933: власне фото (Mozart 25, стрибок) — рішення Артема 18.11
    { year: "1933", img: "tl-1933-mozart25.webp", opacity: 0.34, filter: "grayscale(1) contrast(1.1)", text: c.era_1933, kind: "card" },
    { year: "2026", text: c.era_2026, kind: "blue" },
    { year: c.era_2029_year, text: c.era_2029, kind: "anchor" },
  ];

  const bh = SH.bh_quote.split("dance premiere");
  const score = (["score_composer", "score_versions", "score_duration"] as const).map((k) => ({
    k: c[`${k}_k`],
    v: c[`${k}_v`],
  }));

  const offer = (prefix: "house" | "patron", anchor: string, solid: boolean, nerve: Art) => {
    const accent = solid ? PINK : GOLD;
    return (
      <div
        id={anchor}
        className="relative flex flex-col scroll-mt-20 px-6 py-8 md:px-10 md:pt-10 md:pb-11"
        style={{ background: "#111010", border: `1px solid ${LINE}` }}
      >
        <div className="absolute left-6 right-6 md:left-10 md:right-10" style={{ top: -1, height: 16 }}>
          <Svg a={nerve} className="w-full h-full" />
        </div>
        <Label color={accent} className="mb-5 !text-[12px]">{c[`${prefix}_label`]}</Label>
        <h3 className="mb-[22px] leading-[1.12]" style={display("clamp(26px, 2.5vw, 36px)")}>
          {c[`${prefix}_title`]}
        </h3>
        <p className="mb-[26px] text-[17px] md:text-[18px] leading-[1.6] [text-wrap:pretty]" style={{ color: FG }}>
          {works(c[`${prefix}_p`])}
        </p>
        {([1, 2] as const).map((i) => (
          <div key={i} className="py-[18px]" style={{ borderTop: "1px solid #262522" }}>
            <Mono color={accent} className="mb-2">{c[`${prefix}_k${i}`]}</Mono>
            <div className="text-[16px] leading-[1.62] [text-wrap:pretty]" style={{ color: BODY }}>
              {works(c[`${prefix}_v${i}`])}
            </div>
          </div>
        ))}
        <div className="flex-grow min-h-8" />
        <div>
          <Button href={mailto(`L’Envol d’Icare — ${c[`${prefix}_cta`]}`)} solid={solid}>
            {c[`${prefix}_cta`]}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <article lang={locale} className="pt-[49px] antialiased" style={{ background: BG, color: FG }}>
      {/* ===== 1. ГЕРОЙ: текст + плита Matisse від краю до краю ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] lg:min-h-[760px]">
        <div className="flex flex-col px-6 pt-16 pb-14 md:px-16 md:pt-24 md:pb-20">
          <Label className="mb-7">{c.hero_label}</Label>
          <h1 className="m-0 leading-[0.98] tracking-[0.01em]" style={display("clamp(52px, 7.2vw, 104px)")}>
            {c.title_a} <span style={{ color: PINK }}>{c.title_b}</span>
          </h1>
          <Mono color={BODY} size={14} ls={2.2} className="mt-[26px] mb-10">{c.hero_meta}</Mono>
          <p className="mb-[18px] max-w-[34em] text-[19px] md:text-[22px] leading-[1.55] [text-wrap:pretty]" style={{ color: FG }}>
            {works(c.hero_lead)}
          </p>
          <p className="t-p mb-10 max-w-[38em]">{works(c.hero_lead2)}</p>
          <div className="flex flex-wrap gap-x-12 gap-y-6 mb-12">
            {([1, 2] as const).map((i) => (
              <div key={i}>
                <Mono size={11} className="mb-[6px]">{c[`credit${i}_role`]}</Mono>
                <div className="text-[18px]" style={{ color: FG }}>{c[`credit${i}_name`]}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-[14px]">
            <Button href="#houses">{c.cta_house}</Button>
            <Button href="#patrons" solid={false}>{c.cta_patron}</Button>
          </div>
        </div>
        {/* сама плита, без полів і ефектів (раунд 4) */}
        <div className="relative overflow-hidden aspect-[657/979] max-h-[90vh] lg:aspect-auto lg:max-h-none">
          <Image
            src={`${IMG}/matisse-plate.webp`}
            alt="Henri Matisse, Icare, Jazz, 1947"
            fill
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
            style={{ objectPosition: "53% 50%" }}
          />
          <div className="absolute left-6 bottom-[18px]">
            <Mono color="#fff" size={11} ls={1.6}>{c.matisse_caption}</Mono>
          </div>
        </div>
      </section>

      {/* ===== 2. МІСІЯ + лінія дат + Лифар ===== */}
      <section className={`${SECTION} pt-20 pb-20 md:pt-28 md:pb-24`} style={{ borderColor: LINE }}>
        <div className="flex items-center gap-4 mb-[30px]">
          <Label className="flex-none">{c.mission_label}</Label>
          <div className="flex-1 min-w-0 h-4 max-w-[1100px]">
            <Svg a={art.missionNerve} className="w-full h-full" />
          </div>
        </div>
        <h2 className="m-0 mb-12 max-w-[16em] leading-[1.04] tracking-[0.012em]" style={display("clamp(34px, 4vw, 58px)")}>
          {c.mission_title_a} <span style={{ color: PINK }}>{c.mission_title_b}</span>
        </h2>
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 z-[2] pointer-events-none h-4" style={{ top: 75 }}>
            <Svg a={art.timelineNerve} className="w-full h-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[14px]">
            {eras.map((e) => {
              const bg = e.kind === "blue" ? ULTRA : e.kind === "anchor" ? "#141310" : "#111010";
              const bd = e.kind === "blue" ? ULTRA : e.kind === "anchor" ? GOLD : LINE;
              const ycol = e.kind === "blue" ? PINK : e.kind === "anchor" ? GOLD : "#d8d3cc";
              const tcol = e.kind === "blue" ? FG : e.kind === "anchor" ? "#ede9e3" : "#b8b2aa";
              return (
                <div
                  key={e.year}
                  className="relative overflow-hidden min-h-[250px] lg:h-[330px] px-[22px] pt-[18px] pb-6"
                  style={{ background: bg, border: `1px solid ${bd}` }}
                >
                  {e.img && (
                    <Image
                      src={`${IMG}/${e.img}`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={{ opacity: e.opacity, filter: e.filter }}
                    />
                  )}
                  {e.kind === "blue" && <QMark />}
                  <div className="relative text-[36px] leading-none" style={{ fontFamily: DISPLAY, color: ycol }}>
                    {e.year}
                  </div>
                  <span className="relative block mt-[22px] w-[15px] h-[15px] rounded-full" style={{ background: ycol }} />
                  <p className="relative m-0 mt-[21px] text-[16px] leading-[1.5] [text-wrap:pretty]" style={{ color: tcol }}>
                    {works(e.text)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* цитата Лифаря — дослівно, французькою, в усіх трьох версіях */}
        <figure className="relative mt-14 md:mt-[72px] mx-0 pl-8 md:pl-10 max-w-[980px]">
          <div className="absolute top-0" style={{ left: -8, width: 16, height: 150 }}>
            <Svg a={art.quoteNerve} className="w-full h-full" />
          </div>
          <blockquote lang="fr" className="m-0 italic text-[19px] md:text-[24px] leading-[1.5] [text-wrap:pretty]" style={{ color: FG }}>
            {SH.lifar_quote}
          </blockquote>
          <figcaption className="mt-4">
            <Mono ls={1.4}>{works(c.quote_cite)}</Mono>
          </figcaption>
        </figure>
      </section>

      {/* ===== 3. БАЛЕТ: чорне поле з синіми нервами + синя колонка ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_560px] border-t" style={{ borderColor: LINE }}>
        <div className="relative overflow-hidden px-6 pt-20 pb-20 md:px-16 md:pt-28 md:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <Svg a={art.blackField} className="w-full h-full" />
          </div>
          <div className="relative">
            <Label className="mb-[34px]">{c.ballet_label}</Label>
            <div className="mb-[30px] leading-none" style={display("clamp(44px, 5.3vw, 76px)")}>
              {c.title_a} <span style={{ color: PINK }}>{c.title_b}</span>
            </div>
            <h2 className="m-0 mb-[52px] max-w-[15em] leading-[1.1]" style={display("clamp(26px, 2.65vw, 38px)")}>
              {c.ballet_title_a} <span style={{ color: PINK }}>{c.ballet_title_b}</span>
            </h2>
            <p className="mb-6 max-w-[36em] text-[17px] md:text-[19px] leading-[1.65] [text-wrap:pretty]" style={{ color: "#d8d3cc" }}>
              {works(c.ballet_p1)}
            </p>
            <p className="mb-16 md:mb-24 max-w-[36em] text-[17px] md:text-[19px] leading-[1.65] [text-wrap:pretty]" style={{ color: "#d8d3cc" }}>
              {works(c.ballet_p2)}
            </p>
            <div lang="en" className="max-w-[14em] leading-[1.15]" style={display("clamp(26px, 2.4vw, 34px)")}>
              {bh[0]}
              <span style={{ color: PINK }}>dance premiere</span>
              {bh[1]}
            </div>
            <Mono ls={2.6} className="mt-[18px]">{c.bh_cite}</Mono>
          </div>
        </div>

        {/* синя колонка: камерний запис, дані партитури, танцівник у «ночі», Бернстайн */}
        <div className="relative overflow-hidden lg:min-h-[1080px]" style={{ background: ULTRA }}>
          <div className="hidden lg:block absolute left-0 top-0 pointer-events-none" style={{ width: 560, height: 1080 }}>
            <Svg a={art.blueColumn} className="w-full h-full" fit="xMidYMid meet" style={{ overflow: "hidden" }} />
          </div>
          <div className="relative px-6 pt-16 md:px-11 lg:pt-24">
            <Mono color="#ede9e3" ls={2.2} className="mb-[18px]">{c.score_label}</Mono>
            <a
              href={SH.yt_chamber}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block overflow-hidden aspect-[900/506] lg:aspect-auto lg:h-[266px] bg-black"
            >
              <Image src={`${IMG}/ensemble.webp`} alt="" fill sizes="(min-width: 1024px) 472px, 100vw" className="object-cover" />
              <span
                className="absolute left-[14px] top-[14px] text-[11px] tracking-[1.6px] uppercase px-[9px] py-[5px] text-white"
                style={{ fontFamily: MONO, background: PLAY }}
              >
                {c.score_video}
              </span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Play size={64} />
              </span>
            </a>
            <div className="grid grid-cols-[120px_1fr] md:grid-cols-[130px_1fr] gap-y-[10px] mt-[26px] text-[16px] text-white">
              {score.map((r) => (
                <div key={r.k} className="contents">
                  <span className="pt-[3px] text-[11px] tracking-[1.6px] uppercase" style={{ fontFamily: MONO, color: "#9fb0e0" }}>
                    {r.k}
                  </span>
                  <span>{works(r.v)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* на телефоні — нижня частина тієї ж сцени: танцівник у «ночі» */}
          <div className="lg:hidden relative -mt-2 aspect-[560/560] pointer-events-none">
            <Svg a={art.blueColumn} viewBox="0 500 560 560" idSuffix="m" className="w-full h-full" fit="xMidYMid meet" style={{ overflow: "hidden" }} />
          </div>
          <div className="relative px-6 pb-10 md:px-11 lg:absolute lg:left-0 lg:right-0 lg:bottom-11 lg:pb-0">
            <div className="mb-[18px] h-4 max-w-[472px]">
              <Svg a={art.orchNerve} className="w-full h-full" />
            </div>
            <a
              href={SH.yt_orchestra}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[18px] text-white"
            >
              <Play size={48} />
              <span>
                <Mono color="#c9d3f0" size={11} className="mb-1">{works(c.score_orch_k)}</Mono>
                <span className="block text-[15px] leading-[1.45] text-white">{c.score_orch_v}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== 4. КОМАНДА ===== */}
      <section className={`${SECTION} pt-20 pb-20 md:pt-28 md:pb-24`} style={{ borderColor: LINE }}>
        <Label className="mb-6">{c.team_label}</Label>
        <h2 className="m-0 mb-12 leading-[1.04]" style={display("clamp(34px, 4vw, 58px)")}>
          {c.team_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[72px] gap-y-6 mb-14">
          <p className="t-p m-0">{works(c.team_p1)}</p>
          <p className="t-p m-0">{works(c.team_p2)}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 mb-14">
          {([1, 2, 3] as const).map((i) => (
            <div key={i} className="pt-[26px]" style={{ borderTop: `1px solid ${LINE}` }}>
              <div className="text-[44px] md:text-[54px] leading-none" style={{ fontFamily: DISPLAY, color: FG }}>
                {c[`stat${i}_n`]}
              </div>
              <div className="mt-[10px] max-w-[24em] text-[15px] leading-[1.5]" style={{ color: BODY }}>
                {c[`stat${i}_t`]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-8 mt-2">
          <Link
            href={`/${locale}/works/mozart25`}
            className="flex items-center gap-5 md:gap-6 w-full md:w-auto md:min-w-[520px] min-h-[96px] md:min-h-[112px] py-5 pl-5 pr-6 md:pl-6 md:pr-10 transition-colors hover:border-[#3a3936]"
            style={{ border: `1px solid ${LINE}`, background: "#111010" }}
          >
            <Play size={64} />
            <span>
              <Mono color={BTN_LINE} size={13} ls={2} className="mb-2 md:!text-[14px]">{c.link_mozart_k}</Mono>
              <span className="block text-[20px] md:text-[24px] leading-[1.3]" style={{ color: FG }}>
                {works(c.link_mozart_v)}
              </span>
            </span>
          </Link>
          <Link
            href={`/${locale}#works`}
            className="flex items-center justify-center text-center w-full md:w-auto md:min-w-[440px] min-h-[96px] md:min-h-[112px] px-6 md:px-12 text-[15px] md:text-[18px] tracking-[2.2px] uppercase text-white transition-opacity hover:opacity-85"
            style={{ fontFamily: MONO, background: PLAY }}
          >
            {c.link_all} ↗
          </Link>
        </div>
      </section>

      {/* ===== 5. ДВА АДРЕСАТИ ===== */}
      <section className={`${SECTION} pt-20 pb-20 md:pt-28 md:pb-24`} style={{ borderColor: LINE }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offer("house", "houses", true, art.houseNerve)}
          {offer("patron", "patrons", false, art.patronNerve)}
        </div>
      </section>

      {/* ===== 6. КОНТАКТ ===== */}
      <section className={`${SECTION} pt-16 pb-12 md:pt-[88px] md:pb-14`} style={{ borderColor: LINE }}>
        <Label className="mb-[26px]">{c.contact_label}</Label>
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-[18px] mb-[22px]">
          <a href={`mailto:${SH.email}`} className="hover:opacity-80" style={{ fontFamily: DISPLAY, fontSize: "clamp(28px, 2.8vw, 40px)", color: FG }}>
            {SH.email}
          </a>
          <a href={`tel:${SH.phone.replace(/ /g, "")}`} className="text-[20px] hover:opacity-80" style={{ color: FG }}>
            {SH.phone}
          </a>
          <a
            href={SH.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-[2px] uppercase hover:opacity-80"
            style={{ fontFamily: MONO, color: PINK }}
          >
            WhatsApp ↗
          </a>
        </div>
        <p className="m-0 mb-14 text-[15px] leading-[1.72]" style={{ color: BODY }}>
          {c.contact_names}
        </p>
        <div
          className="pt-[18px] text-[11px] tracking-[0.6px] leading-[1.6]"
          style={{ fontFamily: MONO, color: "#6f6a64", borderTop: `1px solid ${LINE}` }}
        >
          {c.credits_label}: {works(SH.credits)}
        </div>
      </section>
    </article>
  );
}
