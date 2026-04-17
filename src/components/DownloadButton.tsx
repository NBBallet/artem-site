"use client";

interface Props {
  href: string;
  filename?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Forces a direct file download (no new tab) via fetch → blob.
 * Works for cross-origin URLs (Cloudinary, etc.).
 * Falls back to window.open if fetch fails.
 */
export default function DownloadButton({ href, filename, className, style, children }: Props) {
  const handleClick = async () => {
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || href.split("/").pop()?.split("?")[0] || "libretto.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button onClick={handleClick} className={className} style={style} type="button">
      {children}
    </button>
  );
}
