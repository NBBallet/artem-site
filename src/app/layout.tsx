import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Artem Hordieiev — Choreographer",
  description:
    "Ukrainian choreographer. Dance about who we truly are.",
  openGraph: {
    title: "Artem Hordieiev — Choreographer",
    description:
      "Ukrainian choreographer. Dance about who we truly are.",
    images: ["/images/website-og-1200x630.png"],
    type: "website",
  },
  icons: {
    icon: "/images/favicon-512x512.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Мова з адреси (src/proxy.ts): /uk/… → "uk", /fr/… → "fr"; решта — "en".
  const lang = (await headers()).get("x-site-lang") ?? "en";
  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
