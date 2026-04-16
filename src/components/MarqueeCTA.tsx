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
      className="block relative overflow-hidden bg-[#0a0a0a] border-t border-[#161616] group no-underline"
      style={{ height: "clamp(90px, 14vw, 160px)" }}
    >

      {/* ── Left side: NEXT label + flowing text, stacked vertically ── */}
      <div
        className="absolute inset-y-0 left-0 flex flex-col justify-center gap-[6px] overflow-hidden"
        style={{ right: "42%" }}
      >
        {/* NEXT → label — directly above text */}
        <div className="pl-6 md:pl-12 flex items-center gap-2">
          <span className="text-[10px] tracking-[4px] uppercase text-brand-grey group-hover:text-white/60 transition-colors">
            {locale === "uk" ? "Наступна" : "Next"}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.8"
            className="text-brand-grey group-hover:text-white/60 transition-colors"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>

        {/* Flowing CTA text — right under the label */}
        <div
          className="overflow-hidden pl-6 md:pl-12"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
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
      </div>

      {/* ── Dark veil so title owns the right side ── */}
      <div
        className="absolute right-0 inset-y-0 z-[5] pointer-events-none"
        style={{
          width: "44%",
          background: "linear-gradient(to left, #0a0a0a 50%, transparent 100%)",
        }}
      />

      {/* ── Work title: image fills letters (with red fallback) ── */}
      <div className="absolute right-6 md:right-12 inset-y-0 flex items-center z-10">
        <span
          className="leading-none uppercase select-none tracking-[0.05em]"
          style={{
            fontFamily: "NAMU-1400, serif",
            fontSize: "clamp(26px, 4.5vw, 58px)",
            // image fills letters; red gradient is the fallback if image fails/missing
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
    </Link>
  );
}
