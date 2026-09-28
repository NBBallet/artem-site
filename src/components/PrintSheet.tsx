"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Device = "ios" | "mac" | "android" | "other";

const detectDevice = (): Device => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/.test(ua)) return "android";
  if (/Macintosh/.test(ua)) return "mac";
  return "other";
};
const noSubscribe = () => () => {};

/**
 * One A4 sheet, recto verso, shown on screen; «Imprimer» opens the PDF of it.
 *
 * The page itself is no longer printed with window.print() (28.09.2026): Safari
 * on a Mac enlarged the 792×1120 artboard by about 1.18, so one sheet came out
 * as two pages and a recto verso as four. A PDF is already exactly A4, and every
 * browser's own viewer prints it one page per page. A line under the bar says,
 * for the visitor's device, where Print is and to choose two-sided printing —
 * the verso carries the QR code.
 */
export default function PrintSheet({ sheets, title, pdf }: { sheets: string[]; title: string; pdf: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // the device never changes while the page is open; the server renders "other"
  const device = useSyncExternalStore<Device>(noSubscribe, detectDevice, () => "other");

  useEffect(() => {
    const fit = () => {
      const w = stage.current?.clientWidth ?? 792;
      setScale(Math.min(1, (w - 32) / 792));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="imp">
      <div className="imp-bar">
        <span className="imp-bar-title">{title}</span>
        <span className="imp-bar-actions">
          <a href={pdf} className="imp-btn imp-btn-primary">
            Imprimer
          </a>
          <a href={pdf} download className="imp-btn">
            PDF
          </a>
        </span>
      </div>
      <p className="imp-hint">
        {device === "ios" ? (
          <>
            Sur iPhone : touchez <b>Imprimer</b>, puis{" "}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-label="Partager">
              <path d="M12 3v12m0-12l-4 4m4-4l4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
            </svg>
            <b>Partager</b> → <b>Imprimer</b>.
          </>
        ) : device === "mac" ? (
          <>
            Sur Mac : cliquez <b>Imprimer</b>, puis <b>⌘ P</b> dans le PDF qui s&apos;ouvre.
          </>
        ) : device === "android" ? (
          <>
            Sur Android : touchez <b>Imprimer</b>, puis le menu <b>⋮</b> → <b>Imprimer</b>.
          </>
        ) : (
          <>
            Cliquez <b>Imprimer</b>, puis <b>Ctrl P</b> dans le PDF qui s&apos;ouvre.
          </>
        )}{" "}
        Choisissez <b>Recto verso</b> : le code QR se trouve au dos.
      </p>
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
