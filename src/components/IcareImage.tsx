"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt?: string;
}

/**
 * ICARE hero image with gradient fallback.
 * artic.edu IIIF server is intermittently unavailable —
 * onError swaps it for a cerulean gradient that matches the page palette.
 */
export default function IcareImage({ src, alt = "Henri Matisse — Icare, Jazz, 1947" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1B45B5 0%, #0A1A50 45%, #060810 100%)",
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
