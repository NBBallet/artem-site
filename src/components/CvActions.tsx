"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * The visitor's actions on the CV page: print the CV, download the
 * ready-made one-page CV, or go back to the site.
 *
 * The one-page download is the primary action — it hands over the exact
 * recruiter's format, the same file sent to French institutions — so it
 * carries the red `cv-btn-primary` styling; printing is the secondary,
 * `cv-btn-ghost` action.
 *
 * The one-page button is FR-only (onePagerLabel/onePagerHref omitted for
 * en/uk): decided 10.09.2026, so the page keeps two buttons in those
 * locales and three only in French.
 *
 * The print button: where a one-pager exists (`printHref`, FR only,
 * decided 10.09.2026), printing prints THAT file — a visitor asking to
 * print gets the same single recruiter's page as the download, not the
 * long, multi-section digital CV. It loads the PDF in a hidden iframe and
 * calls print() on it once loaded, so the dialog opens straight on the
 * one-pager with no extra tab for the visitor to close. Without a
 * `printHref` (en/uk, for now), it falls back to printing this very page:
 * the print stylesheet flips the CV's colour variables to paper, so the
 * page is the document itself. Arriving at /cv?print=1 (the download link
 * on the home page) fires the same logic on load.
 */
export default function CvActions({
  downloadLabel,
  printHref,
  onePagerLabel,
  onePagerHref,
  backLabel,
  backHref,
}: {
  downloadLabel: string;
  printHref?: string;
  onePagerLabel?: string;
  onePagerHref?: string;
  backLabel: string;
  backHref: string;
}) {
  const printOnePager = (href: string) => {
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
    iframe.src = href;
    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        // Cross-origin or blocked — fall back to a tab the visitor can
        // print from with the browser's own PDF viewer.
        window.open(href, "_blank");
      }
    };
    document.body.appendChild(iframe);
    // Give the print dialog plenty of time to open before cleanup; the
    // iframe is invisible either way, so a generous delay costs nothing.
    window.setTimeout(() => iframe.remove(), 60_000);
  };

  const doPrint = () => {
    if (printHref) {
      printOnePager(printHref);
    } else {
      window.print();
    }
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") !== "1") return;
    if (printHref) {
      doPrint();
      return;
    }
    // Wait for NAMU/Inter/JetBrains Mono, otherwise the dialog opens on a
    // fallback-font layout and the preview shows the wrong line breaks.
    // Only needed for the full-page print path — the one-pager PDF above
    // carries its own fonts.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printHref]);

  const showOnePager = Boolean(onePagerLabel && onePagerHref);

  return (
    <div className="cv-screen-only flex flex-wrap justify-center gap-4 pt-3 pb-6">
      <button
        type="button"
        onClick={doPrint}
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
