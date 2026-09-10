"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * The visitor's actions on the CV page: print this page to PDF, download the
 * ready-made one-page CV, or go back to the site.
 *
 * The one-page download is the primary action — it hands over the exact
 * recruiter's format, the same file sent to French institutions — so it
 * carries the red `cv-btn-primary` styling; printing the page is the
 * secondary, `cv-btn-ghost` action.
 *
 * The one-page button is FR-only (onePagerLabel/onePagerHref omitted for
 * en/uk): decided 10.09.2026, so the page keeps two buttons in those
 * locales and three only in French.
 *
 * The print button: the print stylesheet flips the CV's colour variables to
 * paper, so the file is the document itself, never a separate export that
 * can drift out of date. Arriving at /cv?print=1 (the download link on the
 * home page) opens that dialog straight away.
 */
export default function CvActions({
  downloadLabel,
  onePagerLabel,
  onePagerHref,
  backLabel,
  backHref,
}: {
  downloadLabel: string;
  onePagerLabel?: string;
  onePagerHref?: string;
  backLabel: string;
  backHref: string;
}) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") !== "1") return;
    // Wait for NAMU/Inter/JetBrains Mono, otherwise the dialog opens on a
    // fallback-font layout and the preview shows the wrong line breaks.
    let cancelled = false;
    const fire = () => {
      if (!cancelled) window.print();
    };
    const fonts = document.fonts?.ready;
    if (fonts) {
      fonts.then(() => window.setTimeout(fire, 120));
    } else {
      window.setTimeout(fire, 400);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const showOnePager = Boolean(onePagerLabel && onePagerHref);

  return (
    <div className="cv-screen-only flex flex-wrap justify-center gap-4 pt-3 pb-6">
      <button
        type="button"
        onClick={() => window.print()}
        className={showOnePager ? "cv-btn cv-btn-ghost" : "cv-btn cv-btn-primary"}
      >
        {downloadLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M6 9V4h12v5M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7Z" />
        </svg>
      </button>
      {showOnePager && (
        // The `download` attribute is a courtesy for browsers that respect
        // it (desktop, Android Chrome); the href itself forces the download
        // server-side via Content-Disposition — see src/app/api/cv-download —
        // which is what actually makes it work on iOS Safari, where the
        // HTML attribute alone is known to be ignored for same-origin PDFs.
        <a href={onePagerHref} download className="cv-btn cv-btn-primary">
          {onePagerLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 20h16" />
          </svg>
        </a>
      )}
      <Link href={backHref} className="cv-btn cv-btn-ghost">
        ← {backLabel}
      </Link>
    </div>
  );
}
