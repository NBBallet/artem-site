"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Horizontal photo strip with a full-screen lightbox.
 *
 * Lightbox rendered via React portal into <body> — never clipped by any parent
 * overflow:hidden. Supports:
 *   • keyboard ← / → / Escape
 *   • mobile finger swipe left / right to navigate
 *   • pinch-to-zoom, scroll-to-zoom, double-click zoom, drag when zoomed
 */
export default function PhotoSlider({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoom, setZoom]         = useState(1);
  const [pos, setPos]           = useState({ x: 0, y: 0 });
  const [mounted, setMounted]   = useState(false);

  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const pinchRef   = useRef<{ dist: number; zoom: number } | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const resetZoom = () => { setZoom(1); setPos({ x: 0, y: 0 }); };
  const close     = useCallback(() => { setLightbox(null); resetZoom(); }, []);
  const prev      = useCallback(() => {
    setLightbox(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
    resetZoom();
  }, [photos.length]);
  const next      = useCallback(() => {
    setLightbox(i => (i !== null ? (i + 1) % photos.length : null));
    resetZoom();
  }, [photos.length]);

  // Body scroll-lock + wheel zoom
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const el = imgRef.current;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => Math.min(Math.max(z * (e.deltaY < 0 ? 1.12 : 0.9), 1), 5));
    };
    el?.addEventListener("wheel", handler, { passive: false });
    return () => {
      el?.removeEventListener("wheel", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  // Keyboard: ← / → / Escape
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape")     close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, prev, next, close]);

  const handleDblClick = () => { zoom > 1 ? resetZoom() : setZoom(2.5); };

  // ── Mouse drag ──
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPos({
      x: dragStart.current.px + (e.clientX - dragStart.current.x),
      y: dragStart.current.py + (e.clientY - dragStart.current.y),
    });
  };
  const onMouseUp = () => { isDragging.current = false; };

  // ── Touch: pinch-zoom + swipe navigation ──
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current = {
        dist: Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        ),
        zoom,
      };
      swipeStart.current = null;
    } else if (e.touches.length === 1) {
      swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      pinchRef.current = null;
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setZoom(Math.min(Math.max(pinchRef.current.zoom * (dist / pinchRef.current.dist), 1), 5));
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (zoom > 1 || !swipeStart.current) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current.x;
    const dy = e.changedTouches[0].clientY - swipeStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    swipeStart.current = null;
  };

  if (!photos || photos.length === 0) return null;

  return (
    <>
      {/* ── Horizontal strip ── */}
      <div className="w-full overflow-hidden bg-[#0a0a0a]">
        <div className="flex overflow-x-auto gap-1" style={{ scrollbarWidth: "none" }}>
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => { setLightbox(i); resetZoom(); }}
              className="relative flex-none focus:outline-none group/photo"
              style={{ width: "clamp(220px, 26vw, 420px)", height: "clamp(160px, 19vw, 300px)" }}
            >
              <Image
                src={src} alt={`Photo ${i + 1}`} fill
                className="object-cover transition-opacity duration-300 group-hover/photo:opacity-75"
                sizes="(max-width: 768px) 70vw, 26vw"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox — portal into <body> ── */}
      {mounted && createPortal(
        lightbox !== null ? (
          <div
            className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
            onClick={close}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10">
              <span className="text-[11px] tracking-[3px] uppercase text-white/35">
                {lightbox + 1} / {photos.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[2px] uppercase text-white/25 hidden md:block">
                  ← → to navigate · scroll to zoom
                </span>
                <span className="text-[10px] tracking-[2px] uppercase text-white/25 md:hidden">
                  swipe to navigate
                </span>
                <button className="text-white/50 hover:text-white text-2xl leading-none" onClick={close}>
                  ✕
                </button>
              </div>
            </div>

            {/* Prev */}
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Zoomable image */}
            <div
              ref={imgRef}
              className="relative w-[90vw] h-[84vh] overflow-hidden"
              style={{ cursor: zoom > 1 ? "grab" : "zoom-in" }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleDblClick}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div style={{
                width: "100%", height: "100%",
                transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
                transition: isDragging.current ? "none" : "transform 0.2s ease",
                transformOrigin: "center center",
              }}>
                <Image
                  src={photos[lightbox]} alt={`Photo ${lightbox + 1}`} fill
                  className="object-contain select-none"
                  sizes="90vw" priority draggable={false}
                />
              </div>
            </div>

            {/* Next */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {zoom > 1 && (
              <button
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] uppercase text-white/40 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              >
                reset zoom ×{zoom.toFixed(1)}
              </button>
            )}
          </div>
        ) : null,
        document.body,
      )}
    </>
  );
}
