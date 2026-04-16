"use client";

import Link from "next/link";

const DEFAULT_EN =
  "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·";
const DEFAULT_UK =
  "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·";

interface MarqueeCTAProps {
  locale: "en" | "uk";
  /** Work title — the "source" letters the text flows from */
  workTitle: string;
  textEn?: string;
  textUk?: string;
  href?: string;
}

export default function MarqueeCTA({
  locale,
  workTitle,
  textEn,
  textUk,
  href = "#contact",
}: MarqueeCTAProps) {
  const rawText =
    locale === "uk" ? (textUk ?? DEFAULT_UK) : (textEn ?? DEFAULT_EN);

  // Repeat enough times to fill any screen width
  const stream = Array(10).fill(rawText).join("   ·   ");

  return (
    <Link
      href={href}
      className="block relative overflow-hidden bg-[#0a0a0a] border-t border-[#161616] group no-underline"
      style={{ height: "clamp(80px, 12vw, 140px)" }}
    >
      {/* ── Flowing text — scrolls left ── */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{
          // fade in from left edge, fade out near the title on the right
          maskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 62%, transparent 84%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 62%, transparent 84%)",
        }}
      >
        <div
          className="whitespace-nowrap"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          <span
            className="text-[clamp(10px,1.3vw,15px)] text-white/[0.17] tracking-[0.5em] uppercase transition-colors duration-500 group-hover:text-white/30"
            style={{ fontFamily: "NAMU-1400, serif" }}
          >
            {stream}
          </span>
        </div>
      </div>

      {/* ── Dark veil behind the title so text "disappears into" it ── */}
      <div
        className="absolute right-0 inset-y-0 z-[5] pointer-events-none"
        style={{
          width: "38%",
          background: "linear-gradient(to left, #0a0a0a 50%, transparent 100%)",
        }}
      />

      {/* ── Work title — the source of the flow ── */}
      <div className="absolute right-6 md:right-16 inset-y-0 flex items-center z-10">
        <span
          className="text-[clamp(30px,5.5vw,72px)] leading-none text-brand-red tracking-[0.06em] uppercase select-none transition-opacity duration-500 group-hover:opacity-80"
          style={{ fontFamily: "NAMU-1400, serif" }}
        >
          {workTitle}
        </span>
      </div>
    </Link>
  );
}
