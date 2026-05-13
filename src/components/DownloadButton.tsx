"use client";

interface Props {
  href: string;
  filename?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * For Cloudinary URLs — adds fl_attachment so the server sends
 * Content-Disposition: attachment. This makes downloads work on
 * iOS Safari and Android where fetch → blob approaches fail.
 */
function toDownloadUrl(href: string, filename?: string): string {
  if (!href.includes("res.cloudinary.com")) return href;
  const safeName = (filename || "file.pdf")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  return href.replace(/\/upload\//, `/upload/fl_attachment:${safeName}/`);
}

export default function DownloadButton({ href, filename, className, style, children }: Props) {
  const downloadUrl = toDownloadUrl(href, filename);

  return (
    <a
      href={downloadUrl}
      download={filename}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
