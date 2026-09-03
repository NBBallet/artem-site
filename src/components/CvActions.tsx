"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * The two things a visitor needs in their first five seconds on the CV:
 * take it away as a PDF, or go back to the site.
 *
 * "Download PDF" prints this very page — the print stylesheet flips the CV's
 * colour variables to paper, so the file is the document itself, never a
 * separate export that can drift out of date. Arriving at /cv?print=1 (the
 * download link on the home page) opens that dialog straight away.
 */
export default function CvActions({
  downloadLabel,
  backLabel,
  backHref,
}: {
  downloadLabel: string;
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

  return (
    <div className="cv-screen-only flex flex-wrap justify-center gap-4 pt-3 pb-6">
      <button
        type="button"
        onClick={() => window.print()}
        className="cv-btn cv-btn-primary"
      >
        {downloadLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 20h16" />
        </svg>
      </button>
      <Link
        href={backHref}
        className="cv-btn cv-btn-ghost"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}
