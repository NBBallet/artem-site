/* ─── ЖАР-ПТИЦЯ — нова сторінка /[lang]/works/firebird (чернетка, @/lib/drafts) ───
   Авторська постановочна концепція на музику Стравінського — для художніх і
   програмних директорів балетних труп і оперно-балетних домів. Ціль сторінки
   одна: запит досьє (кнопка «Отримати досьє» → лист із міткою [firebird]).

   Верстка — за канвою design/firebird/ (gen.py, версія ≈70, 18.11.2026):
   десктоп 1440 (page()) і телефон 390 (mobile_page()) в одному DOM, межа — lg.
   Текст — ЛИШЕ з design/firebird/copy.json (uk майстер, fr/en похідні): ні
   Notion, ні рядків у коді, тож на збої мережі нічого не порожніє (AGENTS.md).
   Мотиви (аркуші партитури, гранати, арки, силует, тканини) — з ./art.ts,
   який пише `python3 design/firebird/gen.py --site`. Позначок питань
   (qtag) канви тут немає: це службове для Артема, не контент. */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import copy from "../../../design/firebird/copy.json";
import * as art from "./art";
import type { Art } from "./art";
import "./firebird.css";
import { FONT, HEX } from "@/lib/brand";
import { Arrow } from "@/components/brand/Arrow";

type Copy = (typeof copy)["uk"];
const SH = copy.shared;

/* ── каса канви (gen.py) ─────────────────────────────────────────────── */
const CREAM = "#F7EADF";
const GRANAT = "#7F281E";
const GRANAT_D = "#651D0F";
const AMBER = "#BC7F34";
const GOLD = "#D7A950";
const FRAME = "#000000";
const INK = "rgba(0, 0, 0, .82)";
const CREAM_T = "rgba(247, 234, 223, .76)";
const RED = HEX.red; /* червоний сайту */
const PINK = "#E8455E";
const PLAY = "#2150B8";
const DISPLAY = FONT.display;
const MONO = FONT.label;
const IMG = "/images/works/firebird";

/** Лист «Отримати досьє»: тема з міткою [firebird] (рахувати запити з цієї сторінки) і заготовка тіла. */
export function dossierMailto(c: Copy): string {
  return (
    `mailto:${SH.email}?subject=${encodeURIComponent(c.mail_subject)}` +
    `&body=${encodeURIComponent(c.mail_body)}`
  );
}

/* «Icare →» у рядку «Приєднуйтесь» — посилання на сторінку твору (works() у gen.py). */
function works(s: string, lang: Locale): ReactNode {
  return s.split(/(Icare →)/).map((part, i) =>
    part === "Icare →" ? (
      <Link key={i} href={`/${lang}/works/icare`} className="fb-link" style={{ color: PINK }}>
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

/* Слова з дефісом («Жар-Птиця», «Нью-Йоркський») не рвуться, «—» не починає рядок (nobreak() у gen.py). */
function nobreak(t: string, cls = "whitespace-nowrap"): ReactNode {
  const out: string[] = [];
  for (const w of t.split(" ")) {
    if (w === "—" && out.length) out[out.length - 1] += " —";
    else out.push(w);
  }
  return out.map((w, i) => (
    <span key={i}>
      {i > 0 && " "}
      {w.includes("-") || w.includes(" ") ? <span className={cls}>{w}</span> : w}
    </span>
  ));
}

/* SVG з art.ts, розтягнутий на свій контейнер. */
function Svg({ a, className = "", style, fit = "xMidYMid meet" }: { a: Art; className?: string; style?: CSSProperties; fit?: string }) {
  return (
    <svg
      viewBox={a.viewBox}
      preserveAspectRatio={fit}
      aria-hidden="true"
      className={className}
      style={{ display: "block", ...style }}
      dangerouslySetInnerHTML={{ __html: a.inner }}
    />
  );
}

/* Плівкове зерно / вапняна фактура (grain() у gen.py). */
function Grain({ uid, opacity = 0.26, blend = "multiply", freq = 0.9 }: { uid: string; opacity?: number; blend?: CSSProperties["mixBlendMode"]; freq?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: blend }}
    >
      <filter id={`fbg-${uid}`}>
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={uid.length * 7} />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .9 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#fbg-${uid})`} />
    </svg>
  );
}

/* Аркуш партитури: (x, y, w, h) — як у gen.py; svg має поле 24 px довкола аркуша. */
function Sheet({ a, x, y, w, h, right, className = "" }: { a: Art; x?: number; y: number; w: number; h: number; right?: number; className?: string }) {
  const pos: CSSProperties = right !== undefined ? { right: right - 24 } : { left: (x ?? 0) - 24 };
  return <Svg a={a} className={`absolute pointer-events-none ${className}`} style={{ ...pos, top: y - 24, width: w + 48, height: h + 48 }} />;
}

/* Гранат на підлозі: r — радіус плоду (svg 2.6·r), rot — нахил. */
function Pomegranate({ r, rot = 0, style, className = "" }: { r: number; rot?: number; style: CSSProperties; className?: string }) {
  const s = Math.round(r * 2.6);
  return <Svg a={art.pomegranate} className={`absolute pointer-events-none ${className}`} style={{ width: s, height: s, transform: `rotate(${rot}deg)`, ...style }} />;
}

function Play({ size, className = "" }: { size: number; className?: string }) {
  const t = Math.floor(size / 3);
  return (
    <span
      className={`flex items-center justify-center rounded-full flex-none ${className}`}
      style={{ width: size, height: size, background: PLAY }}
    >
      <svg viewBox="0 0 10 12" width={t} height={t} aria-hidden="true">
        <path d="M1 1 L9 6 L1 11 Z" fill="#fff" />
      </svg>
    </span>
  );
}

function Mono({ children, color, className = "", style }: { children: ReactNode; color: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`uppercase ${className}`} style={{ fontFamily: MONO, color, ...style }}>
      {children}
    </div>
  );
}

/* Мітка секції: телефон — по центру з рискою під нею; десктоп — ліворуч, риска поруч. */
function SectionLabel({ children, color, rule, className = "" }: { children: ReactNode; color: string; rule: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center lg:flex-row lg:gap-[18px] ${className}`}>
      <Mono color={color} className="text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
        {children}
      </Mono>
      <span className="block w-16 h-px mt-[14px] lg:w-[120px] lg:mt-0" style={{ background: rule }} />
    </div>
  );
}

const display = (extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: DISPLAY,
  fontWeight: 400,
  letterSpacing: ".012em",
  textTransform: "uppercase",
  marginTop: 0,
  ...extra,
});

/* Головна дія сторінки — «Отримати досьє». Телефон: на всю ширину, 60 px; десктоп: 72 px. */
function DossierButton({ c, className = "" }: { c: Copy; className?: string }) {
  return (
    <a
      href={dossierMailto(c)}
      data-cta="firebird-dossier"
      className={`fb-cta flex lg:inline-flex w-full lg:w-auto items-center justify-center gap-3 lg:gap-[14px] min-h-[60px] lg:min-h-[72px] px-4 lg:px-10 text-center text-[15px] lg:text-[17px] font-bold tracking-[2px] lg:tracking-[2.4px] uppercase rounded-[2px] ${className}`}
      style={{
        fontFamily: MONO,
        background: RED,
        color: "#FFFFFF",
        border: `2px solid ${RED}`,
        boxShadow: "0 6px 0 rgba(0, 0, 0, .28)",
      }}
    >
      {c.cta} <Arrow dir="next" />
    </a>
  );
}

/* Кадр 4:3 у чорній рамці (пілербокс) з плівковим зерном. */
function Frame43({ src, alt, uid }: { src: string; alt: string; uid: string }) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ background: FRAME }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${IMG}/${src}`} alt={alt} className="absolute inset-0 w-full h-full object-contain block" loading="lazy" />
      <Grain uid={uid} opacity={0.16} blend="screen" freq={1.1} />
    </div>
  );
}

const WRAP = "relative mx-auto w-full max-w-[1440px]";
const ARCH_NAME = [GRANAT_D, CREAM, "#000", CREAM];
const SCENE_IMG = ["roerich-mother.webp", "lissitzky-wedge.webp", "roerich-himalayas.webp"];

export default function FirebirdLanding({ locale }: { locale: Locale }) {
  const c: Copy = copy[locale];
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const ref = c.ref_title.split(" — ");
  const refLines = ref.length === 2 ? [`${ref[0]} —`, ref[1]] : [c.ref_title];

  return (
    <article lang={locale} className="pt-[49px] antialiased" style={{ background: FRAME, color: CREAM }}>
      {/* ===== 1. ГЕРОЙ: вапняна стіна, кадр 4:3 з Реріхом, приколоті аркуші, гранати ===== */}
      <section className="fb-wall relative overflow-hidden lg:min-h-[860px]">
        <Grain uid="hero" opacity={0.28} />
        <div className={`${WRAP} h-full`}>
          {/* мотиви десктопа — координати page() від правого краю 1440 */}
          <div className="hidden lg:block">
            <Sheet a={art.sheetHero1} right={1440 - 1004 - 190} y={70} w={190} h={250} />
            <Sheet a={art.sheetHero2} right={1440 - 1250 - 160} y={120} w={160} h={214} />
            <Sheet a={art.sheetHero3} right={1440 - 1170 - 200} y={600} w={200} h={150} />
            <Pomegranate r={26} rot={-12} style={{ left: 60, top: 742 }} />
            <Pomegranate r={18} rot={20} style={{ left: 128, top: 768 }} />
            <Pomegranate r={22} rot={8} style={{ left: 694, top: 760 }} />
          </div>
          {/* мотиви телефона — mobile_page() */}
          <div className="lg:hidden">
            <Sheet a={art.sheetMobile} right={390 - 318 - 58} y={8} w={58} h={78} />
            <Pomegranate r={15} rot={-12} style={{ left: 6, bottom: 40 }} />
            <Pomegranate r={11} rot={20} style={{ left: 50, bottom: 28 }} />
            <Pomegranate r={13} rot={8} style={{ right: 390 - 318 - 34, bottom: 34 }} />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(600px,44vw)] lg:grid-rows-[auto_1fr] px-4 pt-[30px] pb-[92px] text-center lg:text-left lg:px-20 lg:pt-16 lg:pb-[150px]">
            <div className="lg:col-start-1 lg:row-start-1 lg:pr-5">
              <a
                href={`/${locale}#works`}
                className="inline-block mb-10 lg:mb-[54px] text-[12px] lg:text-[13px] tracking-[1.6px] lg:tracking-[1.8px] uppercase fb-link"
                style={{ fontFamily: MONO, color: RED }}
              >
                {c.back}
              </a>
              <Mono color={GRANAT_D} className="mb-4 lg:mb-[22px] text-[12px] tracking-[2px] lg:text-[14px] lg:tracking-[2.6px]">
                {c.hero_meta}
              </Mono>
              {/* зсув Артема на канві 18.11: заголовок −20 px */}
              <h1 className="mb-4 lg:mb-[22px] text-[54px] leading-[1] lg:text-[clamp(64px,6.95vw,100px)] lg:leading-[0.98] lg:relative lg:-left-5" style={display({ color: GRANAT })}>
                {c.title}
              </h1>
              <Mono color={GRANAT_D} className="mb-7 lg:mb-10 text-[12px] tracking-[1.8px] lg:text-[15px] lg:tracking-[2.4px]">
                {c.subtitle}
              </Mono>
            </div>

            <figure className="m-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-[156px]">
              <Frame43 src="roerich-mother.webp" alt={c.hero_caption} uid="hf" />
              <figcaption>
                <Mono color={GRANAT_D} className="mt-3 mb-[30px] lg:mt-[14px] lg:mb-0 text-[10px] tracking-[1.2px] lg:text-[11px] lg:tracking-[1.6px]">
                  {c.hero_caption}
                </Mono>
              </figcaption>
            </figure>

            <div className="lg:col-start-1 lg:row-start-2 lg:pr-0 xl:-mr-5">
              <p className="m-0 mb-[30px] lg:mb-11 text-[18px] lg:text-[22px] leading-[1.55] lg:max-w-[30em] [text-wrap:pretty]" style={{ color: "#000" }}>
                {c.hero_lead}
              </p>
              <div className="flex flex-col lg:flex-row lg:items-center gap-[14px] lg:gap-[22px] lg:flex-wrap">
                {/* зсув Артема на канві 18.11: верхня кнопка −20 px */}
                <DossierButton c={c} className="lg:relative lg:-left-5" />
                <Mono color={GRANAT_D} className="text-[11px] tracking-[1.4px] lg:text-[12px] lg:tracking-[1.8px]">
                  {c.cta_note}
                </Mono>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. КОНЦЕПЦІЯ: чорна рамка ===== */}
      <section style={{ background: FRAME }}>
        <div className={`${WRAP} px-6 pt-[72px] pb-[68px] text-center lg:text-left lg:px-20 lg:pt-[120px] lg:pb-[112px]`}>
          <SectionLabel color={GOLD} rule={GOLD} className="mb-[26px] lg:mb-[30px]">{c.concept_label}</SectionLabel>
          <h2 className="mb-[18px] lg:mb-[22px] text-[34px] leading-[1.05] lg:text-[64px] lg:leading-[1.02] lg:max-w-[15em]" style={display({ color: CREAM })}>
            {c.concept_title}
          </h2>
          <p className="m-0 mb-9 lg:mb-16 text-[20px] lg:text-[26px] leading-[1.4] italic [text-wrap:pretty]" style={{ color: AMBER }}>
            {c.concept_tagline}
          </p>
          {/* зсуви Артема на канві 18.11.2026: лівий абзац нижче на 41 px, права колонка вище на 64, фінал щільно під нею */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-9 text-left">
            {c.concept_p.map((t, i) => (
              <p
                key={i}
                className={`m-0 text-[16px] lg:text-[18px] leading-[1.65] lg:leading-[1.66] [text-wrap:pretty] lg:relative ${
                  ["lg:top-[41px]", "lg:-top-16", "lg:-top-[84px] lg:col-start-2"][i] ?? ""
                }`}
                style={{ color: CREAM_T }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. КЛЮЧОВІ ДІЙОВІ ОСОБИ: чотири арки в ряд, фронтально ===== */}
      <section className="fb-wall relative overflow-hidden">
        <Grain uid="ch" />
        <div className={`${WRAP} px-4 pt-16 pb-[60px] lg:px-20 lg:pt-28 lg:pb-[104px]`}>
          <Mono color={GRANAT} className="mb-[34px] lg:mb-14 text-center lg:text-left text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
            {c.chars_label}
          </Mono>
          <div className="grid grid-cols-2 gap-x-[14px] gap-y-[34px] lg:grid-cols-4 lg:gap-6">
            {c.chars.map(([name, text], i) => (
              <div key={i}>
                <div className="relative w-full aspect-[292/380]">
                  <Svg a={art.arches[i]} className="absolute inset-0 w-full h-full" fit="none" />
                  <div
                    className="absolute left-0 right-0 bottom-5 lg:bottom-[34px] px-4 lg:px-[22px] text-center text-[17px] lg:text-[26px] leading-[1.1] uppercase"
                    style={{ fontFamily: DISPLAY, color: ARCH_NAME[i] }}
                  >
                    {name}
                  </div>
                </div>
                <p className="m-0 mt-[14px] lg:mt-[26px] text-center lg:text-left text-[14px] lg:text-[16px] leading-[1.55] lg:leading-[1.62] [text-wrap:pretty]" style={{ color: INK }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. ЦИТАТА РЕРІХА: тіньовий театр на бурштині ===== */}
      <section className="fb-amber relative overflow-hidden lg:h-[540px]">
        <Grain uid="q" opacity={0.3} />
        <div className={`${WRAP} h-full px-4 pt-6 pb-14 text-center lg:text-left lg:px-20 lg:pt-28 lg:pb-0`}>
          <Svg
            a={art.birdShadow}
            className="relative w-full aspect-[800/460] mb-7 lg:mb-0 lg:absolute lg:right-10 lg:top-[30px] lg:w-[640px] lg:h-[368px] lg:aspect-auto"
            fit="none"
          />
          <figure className="relative m-0 px-2 lg:px-0 lg:w-[700px]">
            <blockquote className="m-0 text-[20px] lg:text-[27px] leading-[1.5] italic [text-wrap:pretty]" style={{ color: "#000" }}>
              {c.quote}
            </blockquote>
            <figcaption>
              <Mono color="#000" className="mt-[18px] lg:mt-6 text-[11px] tracking-[2px] lg:text-[13px] lg:tracking-[2.6px]">
                {c.quote_cite}
              </Mono>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===== 5. ВІЗУАЛЬНИЙ ВСЕСВІТ: три кадри 4:3 на стіні ===== */}
      <section className="fb-wall relative overflow-hidden">
        <Grain uid="vu" />
        <div className={`${WRAP} px-4 py-16 lg:px-20 lg:py-28`}>
          <div className="text-center lg:text-left">
            <Mono color={GRANAT} className="mb-4 lg:mb-5 text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
              {c.visual_label}
            </Mono>
            <h2 className="mb-10 lg:mb-[60px] text-[30px] leading-[1.05] lg:text-[50px] lg:leading-[1.02] lg:max-w-[22em] [text-wrap:balance]" style={display({ color: GRANAT_D })}>
              {/* на телефоні канва не тримає «ПРОСТОРОВО-КОНЦЕПТУАЛЬНІ» цілим — не вміщається в 390 */}
              {nobreak(c.visual_sub, "lg:whitespace-nowrap")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[52px] lg:grid-cols-3 lg:gap-11">
            {c.scenes.map(([rn, title, text, cap], i) => (
              <div key={i} className="text-center lg:text-left">
                <Frame43 src={SCENE_IMG[i]} alt={cap} uid={`s${i}`} />
                <div className="mt-[10px] lg:mt-3 text-[10px] tracking-[1px] lg:text-[11px] lg:tracking-[1.4px]" style={{ fontFamily: MONO, color: GRANAT_D }}>
                  {cap}
                </div>
                <div className="mt-6 mb-2 lg:mt-[34px] lg:mb-[10px] text-[38px] lg:text-[46px] leading-none" style={{ fontFamily: DISPLAY, color: GRANAT }}>
                  {rn}
                </div>
                <h3 className="mb-3 lg:mb-4 text-[24px] lg:text-[30px] leading-[1.1]" style={display({ color: GRANAT_D })}>
                  {title}
                </h3>
                <p className="m-0 text-[15px] lg:text-[16px] leading-[1.6] lg:leading-[1.62] [text-wrap:pretty]" style={{ color: INK }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. КОСТЮМИ: чорна рамка, п'ять шматків тканини ===== */}
      <section style={{ background: FRAME }}>
        <div className={`${WRAP} px-4 py-16 lg:px-20 lg:py-28`}>
          <SectionLabel color={GOLD} rule={GOLD} className="mb-[34px] lg:mb-[52px]">{c.costumes_label}</SectionLabel>
          <div className="flex flex-wrap justify-center gap-x-[14px] gap-y-[34px] lg:grid lg:grid-cols-5 lg:gap-8">
            {c.costumes.map(([name, text], i) => (
              <div key={i} className="w-[calc(50%-7px)] lg:w-auto text-center lg:text-left">
                <Svg a={art.swatches[i]} className="w-full h-auto aspect-[240/170]" fit="none" />
                <h3 className="mt-[14px] mb-2 lg:mt-[22px] lg:mb-3 text-[18px] lg:text-[24px] leading-[1.1]" style={display({ color: CREAM })}>
                  {name}
                </h3>
                <p className="m-0 text-[14px] lg:text-[15px] leading-[1.55] lg:leading-[1.6] [text-wrap:pretty]" style={{ color: CREAM_T }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. ПРИКЛАД РОБОТИ: кадр у чорній рамці, колаж партитури й гранатів, картка NYCB ===== */}
      <section className="fb-wall relative overflow-hidden">
        <Grain uid="wk" />
        <div className={`${WRAP} px-4 pt-16 pb-[72px] lg:px-20 lg:py-28`}>
          <Mono color={GRANAT} className="mb-6 lg:mb-8 text-center lg:text-left text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
            {c.work_label}
          </Mono>
          <div className="relative lg:h-[572px]">
            <a
              href={SH.yt_work}
              {...ext}
              aria-label={`${c.work_label} — YouTube`}
              className="relative block w-full aspect-[4/3] overflow-hidden lg:w-[868px] lg:h-[572px] lg:aspect-auto lg:border-[10px] lg:border-solid lg:shadow-[0_18px_40px_rgba(0,0,0,.22)]"
              style={{ background: FRAME, borderColor: FRAME }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/work-sample.webp`} alt="" className="absolute inset-0 w-full h-full object-cover block" style={{ objectPosition: "55% 50%" }} loading="lazy" />
              <Grain uid="wf" opacity={0.14} blend="screen" freq={1.1} />
              <Play size={56} className="absolute left-4 bottom-4 lg:hidden" />
              <Play size={80} className="absolute left-7 bottom-7 hidden lg:flex" />
            </a>
            {/* колаж поруч із кадром — лише там, де він уміщається, як на канві */}
            <div className="hidden min-[1360px]:block">
              <Sheet a={art.sheetWork1} x={868 - 40} y={132} w={220} h={300} />
              <Sheet a={art.sheetWork2} x={868 + 212} y={30} w={160} h={214} />
              <Pomegranate r={26} rot={-10} style={{ left: 868 + 236, top: 572 - 64 }} />
              <Pomegranate r={17} rot={18} style={{ left: 868 + 306, top: 572 - 42 }} />
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-[14px] mt-[14px] mb-11 lg:mt-[18px] lg:mb-[72px]">
            <span className="hidden lg:block w-10 h-px" style={{ background: GRANAT_D }} />
            <div className="text-[12px] tracking-[1.2px] lg:text-[13px] lg:tracking-[1.6px] [text-wrap:balance] text-center lg:text-left" style={{ fontFamily: MONO, color: GRANAT_D }}>
              {c.work_cite}
            </div>
          </div>

          {/* референс NYCB — крем-картка з чорною рамкою й гранатовою тінню; кадру немає (чужі права) */}
          <a
            href={SH.yt_ref}
            {...ext}
            className="block w-[calc(100%-6px)] lg:w-full px-[22px] pt-[30px] pb-8 text-center lg:flex lg:items-center lg:gap-11 lg:px-12 lg:py-10 lg:text-left shadow-[6px_6px_0_#7F281E] lg:shadow-[8px_8px_0_#7F281E] transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ background: CREAM, border: `3px solid ${FRAME}` }}
          >
            <span className="flex justify-center mb-[22px] lg:mb-0">
              <Play size={84} className="lg:hidden" />
              <Play size={104} className="hidden lg:flex" />
            </span>
            <span className="block">
              <Mono color={GRANAT} className="mb-3 lg:mb-[14px] text-[12px] tracking-[2px] lg:text-[14px] lg:tracking-[2.6px]">
                {c.ref_label}
              </Mono>
              <span className="block lg:hidden text-[28px] leading-[1.12] [text-wrap:balance]" style={{ fontFamily: DISPLAY, color: "#000" }}>
                {nobreak(c.ref_title)}
              </span>
              {refLines.map((t, i) => (
                <span key={i} className="hidden lg:block text-[clamp(30px,3.2vw,46px)] leading-[1.1] whitespace-nowrap" style={{ fontFamily: DISPLAY, color: "#000" }}>
                  {t}
                </span>
              ))}
            </span>
          </a>
        </div>
      </section>

      {/* ===== 8. ПОСТАНОВОЧНА КОМАНДА: чорна рамка ===== */}
      <section style={{ background: FRAME }}>
        <div className={`${WRAP} px-6 py-16 lg:px-20 lg:pt-28 lg:pb-28`}>
          <SectionLabel color={GOLD} rule={GOLD} className="mb-9 lg:mb-[52px]">{c.team_label}</SectionLabel>
          <div className="grid grid-cols-1 gap-[52px] lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="text-center lg:text-left">
                <h3 className="mb-[10px] lg:mb-3 text-[32px] lg:text-[44px] leading-[1.05]" style={display({ color: CREAM })}>
                  {c.artem_name}
                </h3>
                <Mono color={GOLD} className="mb-[22px] lg:mb-7 text-[11px] tracking-[1.8px] lg:text-[13px] lg:tracking-[2.2px]">
                  {c.artem_role}
                </Mono>
              </div>
              {c.artem_p.map((t, i) => (
                <p key={i} className={`m-0 ${i === 0 ? "mb-4 lg:mb-[18px]" : "mb-5 lg:mb-[26px]"} text-[16px] lg:text-[17px] leading-[1.65] lg:leading-[1.66] [text-wrap:pretty]`} style={{ color: CREAM_T }}>
                  {t}
                </p>
              ))}
              <div className="text-center lg:text-left">
                <Link href={`/${locale}/cv`} className="fb-link text-[12px] tracking-[1.8px] lg:text-[13px] lg:tracking-[2px] uppercase" style={{ fontFamily: MONO, color: PINK }}>
                  {c.cv_link}
                </Link>
              </div>
            </div>
            <div>
              <div className="text-center lg:text-left">
                <h3 className="mb-[10px] lg:mb-3 text-[32px] lg:text-[44px] leading-[1.05]" style={display({ color: CREAM })}>
                  {c.tetiana_name}
                </h3>
                <Mono color={GOLD} className="mb-[22px] lg:mb-7 text-[11px] tracking-[1.8px] lg:text-[13px] lg:tracking-[2.2px]">
                  {c.tetiana_role}
                </Mono>
              </div>
              <p className="m-0 text-[16px] lg:text-[17px] leading-[1.65] lg:leading-[1.66] [text-wrap:pretty]" style={{ color: CREAM_T }}>
                {c.tetiana_p}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. ПОСТАНОВКА + КОНТАКТ: гранатова панель на чорному ===== */}
      <section id="dossier" className="scroll-mt-20" style={{ background: FRAME }}>
        <div className={`${WRAP} px-4 pt-6 pb-16 lg:px-20 lg:pt-0 lg:pb-[88px]`}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,780fr)_minmax(0,428fr)] lg:gap-[72px] lg:items-start">
            <div className="relative px-[22px] pt-10 text-center lg:text-left lg:px-14 lg:pt-14" style={{ background: GRANAT }}>
              <Mono color={GOLD} className="mb-[18px] lg:mb-[22px] text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
                {c.staging_label}
              </Mono>
              <h2 className="mb-5 lg:mb-[26px] text-[32px] lg:text-[50px] leading-[1.05] lg:max-w-[13em]" style={display({ color: CREAM })}>
                {c.staging_title}
              </h2>
              <p className="m-0 mb-8 lg:mb-10 text-[16px] lg:text-[18px] leading-[1.6] lg:leading-[1.62] [text-wrap:pretty]" style={{ color: CREAM }}>
                {c.staging_p}
              </p>
              <div className="-mx-[22px] px-4 pt-6 pb-[26px] lg:-mx-14 lg:px-14 lg:py-9 flex flex-col lg:flex-row lg:items-center gap-[14px] lg:gap-[26px] lg:flex-wrap" style={{ background: CREAM }}>
                <DossierButton c={c} />
                <Mono color={GRANAT_D} className="text-[11px] tracking-[1.4px] lg:text-[12px] lg:tracking-[1.8px]">
                  {c.staging_note}
                </Mono>
              </div>
            </div>
            <div className="pt-14 text-center lg:text-left">
              <Mono color={GOLD} className="mb-[18px] lg:mb-[22px] text-[12px] tracking-[2.2px] lg:text-[13px] lg:tracking-[2.4px]">
                {c.contact_label}
              </Mono>
              <div className="mb-5 lg:mb-[26px] text-[17px] lg:text-[19px]" style={{ color: CREAM }}>
                {c.contact_name}
              </div>
              {/* та сама адреса, що й у кнопці: лист із цієї сторінки теж іде з міткою [firebird] */}
              <a href={dossierMailto(c)} className="fb-link block mb-[14px] lg:mb-4 text-[28px] lg:text-[clamp(24px,2.36vw,34px)] break-words" style={{ fontFamily: DISPLAY, color: CREAM }}>
                {SH.email}
              </a>
              <a href={`tel:${SH.phone.replace(/ /g, "")}`} className="fb-link block mb-[14px] lg:mb-4 text-[18px] lg:text-[20px]" style={{ color: CREAM }}>
                {SH.phone}
              </a>
              <a href={SH.whatsapp} {...ext} className="fb-link block text-[12px] lg:text-[13px] tracking-[2px] uppercase" style={{ fontFamily: MONO, color: PINK }}>
                WhatsApp <Arrow dir="out" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. ПІДВАЛ СТОРІНКИ: «Приєднуйтесь», підписи зображень (© — у підвалі сайту) ===== */}
      <section style={{ background: FRAME, borderTop: "1px solid #1f1e1c" }}>
        <div className={`${WRAP} px-6 pt-8 pb-10 text-center lg:text-left lg:px-20 lg:pt-10 lg:pb-12`}>
          <Mono color={CREAM_T} className="mb-[22px] lg:mb-[26px] text-[11px] tracking-[1.2px] lg:text-[12px] lg:tracking-[1.6px] leading-[1.6]">
            {works(c.join, locale)}
          </Mono>
          <div className="text-[10px] tracking-[0.4px] lg:text-[11px] lg:tracking-[0.6px] leading-[1.6]" style={{ fontFamily: MONO, color: "#6f6a64" }}>
            {c.credits_label}: {SH.credits}
          </div>
        </div>
      </section>
    </article>
  );
}
