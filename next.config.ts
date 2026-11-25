import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Середовище Vercel для прапорців чернеток (src/lib/drafts.ts): на preview-
  // збірці чернетка видна за посиланням preview, на production — ні.
  env: {
    NEXT_PUBLIC_SITE_ENV: process.env.VERCEL_ENV ?? "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Мітка мови на сайті — «UA», а адреса — /uk (25.11.2026): людина, що
  // набрала /ua руками, потрапляє на українську версію, а не на 404.
  async redirects() {
    return [
      { source: "/ua", destination: "/uk", permanent: true },
      { source: "/ua/:path*", destination: "/uk/:path*", permanent: true },
    ];
  },
  // The pitch sheets under /imprimer are unlisted: keep the PDFs themselves
  // out of search results too (the pages carry their own noindex).
  async headers() {
    return [
      {
        source: "/imprimer/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // The Russian CV is private too (22.10.2026): its page and its PDFs.
      {
        source: "/cv-mj9szja",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/cv/:file(Artem-Hordieiev-CV-RU.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/cv-download/Artem-Hordieiev-CV-RU.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
