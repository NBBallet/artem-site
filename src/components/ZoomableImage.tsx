"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** "cover" | "contain" — how the image fits inside the lightbox */
  fit?: "cover" | "contain";
}

/**
 * Drop-in replacement for <Image> inside a `relative overflow-hidden` container.
 * Renders the image normally + expands to a full-screen zoomable lightbox on click.
 * Supports: scroll-to-zoom (desktop), pinch-to-zoom (mobile), drag when zoomed,
 * double-click toggle, Escape to close.
 */
export default function ZoomableImage({
  src, alt, fill, className, sizes, priority, fit = "cover",
}: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const pinchStart = useRef<number | null>(null);
  const pinchZoomStart = useRef(1);
  const imgRef = useRef<HTMLDivElement>(null);

  const resetZoom = () => { setZoom(1); setPos({ x: 0, y: 0 }); };
  const close = useCallback(() => { setOpen(false); resetZoom(); }, []);

  // Scroll zoom
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !open) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => Math.min(Math.max(z * (e.deltaY < 0 ? 1.12 : 0.9), 1), 5));
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [open]);

  // Keyboard: Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  const handleDblClick = () => zoom > 1 ? resetZoom() : setZoom(2.5);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPos({ x: dragStart.current.px + (e.clientX - dragStart.current.x), y: dragStart.current.py + (e.clientY - dragStart.current.y) });
  };
  const onMouseUp = () => { isDragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    pinchStart.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    pinchZoomStart.current = zoom;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2 || pinchStart.current === null) return;
    e.preventDefault();
    const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    setZoom(Math.min(Math.max(pinchZoomStart.current * (dist / pinchStart.current), 1), 5));
  };

  return (
    <>
      {/* ── Thumbnail inside parent container ── */}
      <div className="absolute inset-0 group/zoom cursor-zoom-in" onClick={() => setOpen(true)}>
        <Image src={src} alt={alt} fill={fill} className={className} sizes={sizes} priority={priority} />
        {/* Expand icon hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/zoom:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center" onClick={close}>
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10 pointer-events-none">
            <span className="text-[11px] tracking-[3px] uppercase text-white/30 truncate max-w-[60%]">{alt}</span>
            <div className="flex items-center gap-4 pointer-events-auto">
              <span className="text-[10px] tracking-[2px] uppercase text-white/25 hidden md:block">scroll · double-click to zoom</span>
              <span className="text-[10px] tracking-[2px] uppercase text-white/25 md:hidden">pinch to zoom</span>
              <button className="text-white/50 hover:text-white text-2xl leading-none" onClick={close}>✕</button>
            </div>
          </div>

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
          >
            <div style={{
              width: "100%", height: "100%",
              transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
              transition: isDragging.current ? "none" : "transform 0.2s ease",
              transformOrigin: "center center",
            }}>
              <Image src={src} alt={alt} fill className={`object-${fit} select-none`} sizes="92vw" priority draggable={false} />
            </div>
          </div>

          {zoom > 1 && (
            <button
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[2px] uppercase text-white/40 hover:text-white z-10"
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
            >
              reset zoom ×{zoom.toFixed(1)}
            </button>
          )}
        </div>
      )}
    </>
  );
}
