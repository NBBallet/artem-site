import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Середовище Vercel для прапорців чернеток (src/lib/drafts.ts): на preview-
  // збірці чернетка видна за посиланням preview, на production — ні.
  env: {
    NEXT_PUBLIC_SITE_ENV: process.env.VERCEL_ENV ?? "",
    // Гілка збірки — для прапорця DRAFT_BRAND_NB2 (лише preview design/brand-namu).
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF ?? "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
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
