"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One A4 sheet shown on screen and printed with the browser's own
 * window.print() — the one print call iOS Safari and Android Chrome honour.
 * On a computer the dialog opens by itself once the fonts are in, as the
 * French CV's print link does; on a phone the visitor taps «Imprimer».
 */
export default function PrintSheet({ html, title, pdf }: { html: string; title: string; pdf: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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
          <button type="button" onClick={() => window.print()} className="imp-btn imp-btn-primary">
            Imprimer
          </button>
          <a href={pdf} download className="imp-btn">
            PDF
          </a>
        </span>
      </div>
      <div className="imp-stage" ref={stage}>
        <div className="imp-frame" style={{ width: 792 * scale, height: 1120 * scale }}>
          <div
            className="imp-sheet"
            style={{ transform: `scale(${scale})` }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
