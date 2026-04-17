"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** "cover" | "contain" — how the image fits inside the lightbox */
  fit?: "cover" | "contain";
  /**
   * Pass ALL sibling image URLs (including this one) to enable
   * ←/→ keyboard + button + swipe navigation between them in the lightbox.
   * Works for any group of images — posters, scenes, etc.
   */
  group?: string[];
  /** This image's position inside the `group` array */
  groupIndex?: number;
}

/**
 * Drop-in replacement for <Image> inside a `relative overflow-hidden` container.
 * Renders the image normally + expands to a full-screen lightbox on click.
 *
 * Lightbox is rendered via React portal (appended to <body>) so it is never
 * clipped by any parent overflow:hidden or transform — fixes iOS Safari "fly away" bug.
 *
 * Single image: scroll/pinch/double-click zoom, drag, Escape to close.
 * Group: adds ←/→ arrows, keyboard nav, and finger-swipe on mobile.
 */
export default function ZoomableImage({
  src, alt, fill, className, sizes, priority,
  fit = "cover",
  group, groupIndex = 0,
}: Props) {
  const [open, setOpen]           = useState(false);
  const [currentIdx, setCurrentIdx] = useState(groupIndex);
  const [zoom, setZoom]           = useState(1);
  const [pos, setPos]             = useState({ x: 0, y: 0 });
  const [mounted, setMounted]     = useState(false);

  const isDragging   = useRef(false);
  const dragStart    = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const pinchRef     = useRef<{ dist: number; zoom: number } | null>(null);
  const swipeStart   = useRef<{ x: number; y: number } | null>(null);
  const imgRef       = useRef<HTMLDivElement>(null);

  // Portal needs the DOM to be ready
  useEffect(() => { setMounted(true); }, []);

  const isGroup  = group && group.length > 1;
  const activeSrc = isGroup ? group[currentIdx] : src;
  const activeAlt = isGroup ? `${alt} ${currentIdx + 1} / ${group.length}` : alt;

  const resetZoom = useCallback(() => { setZoom(1); setPos({ x: 0, y: 0 }); }, []);
  const close     = useCallback(() => { setOpen(false); resetZoom(); }, [resetZoom]);

  const prev = useCallback(() => {
    if (!isGroup) return;
    setCurrentIdx(i => (i - 1 + group.length) % group.length);
    resetZoom();
  }, [isGroup, group, resetZoom]);

  const next = useCallback(() => {
    if (!isGroup) return;
    setCurrentIdx(i => (i + 1) % group.length);
    resetZoom();
  }, [isGroup, group, resetZoom]);

  const handleOpen = () => { setCurrentIdx(groupIndex); setOpen(true); };

  // Body scroll-lock + wheel zoom (attach after portal renders)
  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  // Keyboard: Escape + ←/→
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close, prev, next]);

  const handleDblClick = () => zoom > 1 ? resetZoom() : setZoom(2.5);

  // ── Mouse drag (when zoomed) ──
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

  // ── Touch: pinch-zoom + single-finger swipe navigation ──
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
    // Swipe navigation only when not zoomed and in a group
    if (!isGroup || zoom > 1 || !swipeStart.current) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current.x;
    const dy = e.changedTouches[0].clientY - swipeStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    swipeStart.current = null;
  };

  return (
    <>
      {/* ── Thumbnail inside parent container ── */}
      <div className="absolute inset-0 group/zoom cursor-zoom-in" onClick={handleOpen}>
        <Image
          src={src} alt={alt} fill={fill}
          className={className} sizes={sizes} priority={priority}
        />
        {/* Expand hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/zoom:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Lightbox — rendered via portal into <body> ──
           This bypasses any parent overflow:hidden / transform so position:fixed
           always covers the full viewport (fixes iOS Safari "fly away" bug). */}
      {mounted && createPortal(
        open ? (
          <div
            className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
            onClick={close}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10 pointer-events-none">
              <span className="text-[11px] tracking-[3px] uppercase text-white/30 truncate max-w-[60%]">
                {isGroup ? `${currentIdx + 1} / ${group.length}` : alt}
              </span>
              <div className="flex items-center gap-4 pointer-events-auto">
                <span className="text-[10px] tracking-[2px] uppercase text-white/25 hidden md:block">
                  {isGroup ? "← → to navigate · scroll to zoom" : "scroll · double-click to zoom"}
                </span>
                <span className="text-[10px] tracking-[2px] uppercase text-white/25 md:hidden">
                  {isGroup ? "swipe to navigate" : "pinch to zoom"}
                </span>
                <button
                  className="text-white/50 hover:text-white text-2xl leading-none"
                  onClick={close}
                >✕</button>
              </div>
            </div>

            {/* Prev arrow (group only) */}
            {isGroup && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* Zoomable image */}
            <div
              ref={imgRef}
              className="relative w-[92vw] h-[88vh] overflow-hidden"
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
                  src={activeSrc} alt={activeAlt} fill
                  className={`object-${fit} select-none`}
                  sizes="92vw" priority draggable={false}
                />
              </div>
            </div>

            {/* Next arrow (group only) */}
            {isGroup && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}

            {zoom > 1 && (
              <button
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] uppercase text-white/40 hover:text-white z-10"
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
