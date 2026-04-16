"use client";

import Image from "next/image";

export default function PhotoSlider({ photos }: { photos: string[] }) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="w-full border-b border-[#1a1a1a] overflow-hidden">
      <div
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="relative flex-none snap-center"
            style={{ width: "clamp(280px, 40vw, 600px)", height: "clamp(200px, 28vw, 420px)" }}
          >
            <Image
              src={src}
              alt={`Photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 40vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
