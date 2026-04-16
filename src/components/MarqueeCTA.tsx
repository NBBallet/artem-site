"use client";

import Link from "next/link";

const DEFAULT_EN =
  "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·";
const DEFAULT_UK =
  "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·";

interface MarqueeCTAProps {
  locale: "en" | "uk";
  workTitle: string;
  /** Cover image of the next work — used as fill inside the title letters */
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

  const hasImage = Boolean(workImage);

  return (
    <Link
      href={href}
      className="block relative overflow-hidden bg-[#0a0a0a] border-t border-[#161616] group no-underline"
      style={{ height: "clamp(90px, 14vw, 160px)" }}
    >
      {/* ── NEXT → label — top left ── */}
      <div className="absolute top-5 left-6 md:left-12 z-20 flex items-center gap-2 group-hover:opacity-70 transition-opacity">
        <span className="text-[10px] tracking-[4px] uppercase text-brand-grey">
          {locale === "uk" ? "Наступна" : "Next"}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-brand-grey"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>

      {/* ── Flowing CTA text — bottom strip ── */}
      <div
        className="absolute bottom-5 left-0 right-0 flex items-center overflow-hidden pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 60%, transparent 82%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 60%, transparent 82%)",
        }}
      >
        <div
          className="whitespace-nowrap"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          <span
            className="text-[clamp(9px,1.1vw,13px)] text-white/[0.15] tracking-[0.5em] uppercase group-hover:text-white/25 transition-colors duration-500"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            {stream}
          </span>
        </div>
      </div>

      {/* ── Dark veil so title "owns" the right side ── */}
      <div
        className="absolute right-0 inset-y-0 z-[5] pointer-events-none"
        style={{
          width: "40%",
          background:
            "linear-gradient(to left, #0a0a0a 45%, transparent 100%)",
        }}
      />

      {/* ── Work title — image fill inside letters ── */}
      <div className="absolute right-6 md:right-12 inset-y-0 flex items-center z-10">
        <span
          className="leading-none uppercase select-none tracking-[0.05em]"
          style={{
            fontFamily: "NAMU-1400, serif",
            fontSize: "clamp(26px, 4.5vw, 58px)",
            // If cover image exists — fill letters with blurred photo
            ...(hasImage
              ? {
                  backgroundImage: `url(${workImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "brightness(1.6) saturate(0.75)",
                }
              : {
                  color: "#c8102e",
                }),
          }}
        >
          {workTitle}
        </span>
      </div>
    </Link>
  );
}
