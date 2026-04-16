"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

export default function PhotoSlider({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() =>
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), [photos.length]);
  const next = useCallback(() =>
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : null)), [photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      {/* ── Horizontal strip ── */}
      <div className="w-full overflow-hidden bg-[#0a0a0a]">
        <div
          className="flex overflow-x-auto gap-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative flex-none focus:outline-none group/photo"
              style={{ width: "clamp(220px, 26vw, 420px)", height: "clamp(160px, 19vw, 300px)" }}
            >
              <Image
                src={src}
                alt={`Photo ${i + 1}`}
                fill
                className="object-cover transition-opacity duration-300 group-hover/photo:opacity-80"
                sizes="(max-width: 768px) 70vw, 26vw"
              />
              {/* zoom hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl font-light z-10"
            onClick={close}
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[3px] uppercase text-white/40">
            {lightbox + 1} / {photos.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[88vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox]}
              alt={`Photo ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
