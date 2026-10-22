import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
