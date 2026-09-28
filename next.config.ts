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
    ];
  },
};

export default nextConfig;
