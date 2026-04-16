import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artem Hordieiev — Choreographer",
  description:
    "Ukrainian choreographer and ballet director. Dance about who we truly are.",
  openGraph: {
    title: "Artem Hordieiev — Choreographer",
    description:
      "Ukrainian choreographer and ballet director. Founder of Newspaper Birds Ballet.",
    images: ["/images/website-og-1200x630.png"],
    type: "website",
  },
  icons: {
    icon: "/images/favicon-512x512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
