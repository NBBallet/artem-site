"use client";

import Link from "next/link";

const DEFAULT_EN =
  "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·";
const DEFAULT_UK =
  "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·";

interface MarqueeCTAProps {
  locale: "en" | "uk";
  workTitle: string;
  workImage?: string;
  textEn?: string;
  textUk?: string;
  href?: string;
}

export default function MarqueeCTA({
  locale,
  workTitle,
  workImage,
  textEn,
  textUk,
  href = "#works",
}: MarqueeCTAProps) {
  const rawText =
    locale === "uk" ? (textUk ?? DEFAULT_UK) : (textEn ?? DEFAULT_EN);
  const stream = Array(10).fill(rawText).join("   ·   ");

  return (
    <Link
      href={href}
      className="block overflow-hidden bg-[#0a0a0a] border-t border-[#161616] group no-underline"
      style={{ height: "clamp(90px, 14vw, 160px)" }}
    >
      {/* ── Flex row: text area grows, right column sizes to title ── */}
      <div className="flex items-center h-full">

        {/* ── Left / text column — fills all space up to the title ── */}
        <div
          className="flex-1 min-w-0 overflow-hidden h-full flex items-center"
          style={{
            /* fades in from left, fades out toward the title on the right */
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 82%, transparent 100%)",
          }}
        >
          <div
            className="whitespace-nowrap"
            style={{ animation: "marquee 50s linear infinite" }}
          >
            <span
              className="text-[clamp(9px,1.1vw,13px)] text-white/[0.15] tracking-[0.45em] uppercase group-hover:text-white/25 transition-colors duration-500"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {stream}
            </span>
          </div>
        </div>

        {/* ── Right column: NEXT label above title, both right-aligned ── */}
        <div className="flex-none pr-6 md:pr-12 pl-4 flex flex-col items-end justify-center gap-[4px]">

          {/* NEXT → — brand style, red, above the title */}
          <div className="flex items-center gap-[6px]">
            <span
              className="text-[clamp(9px,1vw,12px)] tracking-[4px] uppercase text-brand-red group-hover:opacity-70 transition-opacity"
              style={{ fontFamily: "NAMU-1400, serif" }}
            >
              {locale === "uk" ? "Наступна" : "Next"}
            </span>
            <svg
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="#c8102e" strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>

          {/* Work title — image fills letters, red gradient fallback ── */}
          <span
            className="leading-none uppercase select-none tracking-[0.05em]"
            style={{
              fontFamily: "NAMU-1400, serif",
              fontSize: "clamp(26px, 4.5vw, 58px)",
              backgroundImage: workImage
                ? `url(${workImage}), linear-gradient(135deg, #c8102e 0%, #a00d24 100%)`
                : `linear-gradient(135deg, #c8102e 0%, #a00d24 100%)`,
              backgroundSize: "cover, 100% 100%",
              backgroundPosition: "center, 0 0",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: workImage ? "brightness(1.55) saturate(0.8)" : "none",
            }}
          >
            {workTitle}
          </span>
        </div>

      </div>
    </Link>
  );
}
