"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A4 sheets shown on screen and printed with the browser's own
 * window.print(), one printed page per sheet (recto, verso).
 * On a computer the dialog opens by itself once the fonts are in, as the
 * French CV's print link does; on a phone the visitor taps «Imprimer».
 */
export default function PrintSheet({ sheets, title, pdf }: { sheets: string[]; title: string; pdf: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // iOS Safari ignores window.print() from a page (checked on an iPhone,
  // 28.09.2026): there the button opens the PDF itself, and a line under the
  // bar says where Safari keeps its own Print.
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIos(/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1));
  }, []);

  useEffect(() => {
    const fit = () => {
      const w = stage.current?.clientWidth ?? 792;
      setScale(Math.min(1, (w - 32) / 792));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) window.setTimeout(() => window.print(), 300);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="imp">
      <div className="imp-bar">
        <span className="imp-bar-title">{title}</span>
        <span className="imp-bar-actions">
          {ios ? (
            <a href={pdf} className="imp-btn imp-btn-primary">
              Imprimer
            </a>
          ) : (
            <button type="button" onClick={() => window.print()} className="imp-btn imp-btn-primary">
              Imprimer
            </button>
          )}
          <a href={pdf} download className="imp-btn">
            PDF
          </a>
        </span>
      </div>
      {ios && (
        <p className="imp-hint">
          Sur iPhone : touchez <b>Imprimer</b>, puis{" "}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label="Partager">
            <path d="M12 3v12m0-12l-4 4m4-4l4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
          </svg>
          <b>Partager</b> → <b>Imprimer</b>.
        </p>
      )}
      <div className="imp-stage" ref={stage}>
        {sheets.map((html, i) => (
          <div key={i} className="imp-frame" style={{ width: 792 * scale, height: 1120 * scale }}>
            <div
              className="imp-sheet"
              style={{ transform: `scale(${scale})` }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
