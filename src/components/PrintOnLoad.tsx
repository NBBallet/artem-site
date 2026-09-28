"use client";

import { useEffect } from "react";

/**
 * Shows a one-page PDF full-screen and opens the print dialog on it straight
 * away — the same hidden-iframe trick as the French CV's print button
 * (CvActions). The visible copy is the fallback: where the browser won't print
 * from a script (iOS), the visitor prints from its own PDF viewer, or taps the
 * button again.
 */
const printPdf = (href: string) => {
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
  iframe.src = href;
  iframe.onload = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      window.open(href, "_blank");
    }
  };
  document.body.appendChild(iframe);
  window.setTimeout(() => iframe.remove(), 60_000);
};

export default function PrintOnLoad({ href, title }: { href: string; title: string }) {
  useEffect(() => {
    printPdf(href);
  }, [href]);

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#0a0a0a" }}>
      <div
        className="flex items-center justify-between gap-4 px-5 py-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.12em", color: "#EDE9E3" }}
      >
        <span className="uppercase" style={{ color: "#E8455E" }}>{title}</span>
        <span className="flex gap-3">
          <button
            type="button"
            onClick={() => printPdf(href)}
            className="uppercase px-3 py-1.5"
            style={{ border: "1px solid #4a4540" }}
          >
            Imprimer
          </button>
          <a href={href} download className="uppercase px-3 py-1.5" style={{ border: "1px solid #4a4540" }}>
            PDF
          </a>
        </span>
      </div>
      <iframe src={href} title={title} className="flex-1 w-full" style={{ border: 0, background: "#fff" }} />
    </div>
  );
}
