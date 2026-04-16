"use client";

import Link from "next/link";

interface MarqueeCTAProps {
  locale: "en" | "uk";
  /** Override text (e.g. fetched from Notion) */
  textEn?: string;
  textUk?: string;
  /** Override link */
  href?: string;
}

const DEFAULT_EN =
  "JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us · JOIN THE COMMUNITY · Become part of the Newspaper Birds artistic family · Book a performance · Collaborate with us ·";

const DEFAULT_UK =
  "ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами · ПРИЄДНУЙТЕСЬ · Станьте частиною артистичної родини Newspaper Birds · Замовте виставу · Співпрацюйте з нами ·";

export default function MarqueeCTA({
  locale,
  textEn,
  textUk,
  href = "/#contact",
}: MarqueeCTAProps) {
  const text = locale === "uk" ? (textUk ?? DEFAULT_UK) : (textEn ?? DEFAULT_EN);

  return (
    <Link href={href} className="block overflow-hidden bg-brand-red group cursor-pointer">
      <div
        className="py-3 flex whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
        }}
      >
        {/* Repeat twice for seamless loop */}
        {[0, 1].map((n) => (
          <span
            key={n}
            className="inline-block pr-12 text-[11px] tracking-[3px] uppercase font-semibold text-white/90 group-hover:text-white transition-colors"
          >
            {text}
          </span>
        ))}
      </div>

    </Link>
  );
}
