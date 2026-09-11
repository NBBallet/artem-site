"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Loads the PDF in a hidden iframe and calls print() on it once loaded, so
 * the dialog opens straight on the one-pager with no extra tab for the
 * visitor to close.
 */
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

/**
 * The visitor's actions on the CV page: download the ready-made one-page CV,
 * print it, or go back to the site.
 *
 * Downloading is the primary action in every language — it hands the exact
 * recruiter's format straight to the visitor's device — so it carries the red
 * `cv-btn-primary` styling.
 *
 * Printing is the secondary, `cv-btn-ghost` action, and exists only where
 * `printLabel`/`printHref` are given: French, decided 10.09.2026. In en/uk the
 * same button used to land on /cv?print=1 and open a print dialog; since
 * 11.09.2026 those locales download the file instead, so they get no print
 * button at all. What it prints is the one-pager, never the long
 * multi-section digital CV. Arriving at /cv?print=1 fires the same logic on
 * load, which is how the home page's French CV button works.
 */
export default function CvActions({
  downloadLabel,
  downloadHref,
  printLabel,
  printHref,
  backLabel,
  backHref,
}: {
  downloadLabel: string;
  downloadHref: string;
  printLabel?: string;
  printHref?: string;
  backLabel: string;
  backHref: string;
}) {
  useEffect(() => {
    if (!printHref) return;
    if (new URLSearchParams(window.location.search).get("print") !== "1") return;
    printOnePager(printHref);
  }, [printHref]);

  return (
    <div className="cv-screen-only flex flex-wrap justify-center gap-4 pt-3 pb-6">
      {printLabel && printHref && (
        <button
          type="button"
          onClick={() => printOnePager(printHref)}
          className="cv-btn cv-btn-ghost"
        >
          {printLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 9V4h12v5M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 14h12v7H6v-7Z" />
          </svg>
        </button>
      )}
      {/* The `download` attribute is a courtesy for browsers that respect
          it (desktop, Android Chrome); the href itself forces the download
          server-side via Content-Disposition — see src/app/api/cv-download —
          which is what actually makes it work on iOS Safari, where the
          HTML attribute alone is known to be ignored for same-origin PDFs. */}
      <a href={downloadHref} download className="cv-btn cv-btn-primary">
        {downloadLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 20h16" />
        </svg>
      </a>
      <Link href={backHref} className="cv-btn cv-btn-ghost">
        ← {backLabel}
      </Link>
    </div>
  );
}
