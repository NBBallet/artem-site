import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * /robots.txt — індексацію й ШІ-краулери дозволяємо (рішення 18.11.2026:
 * OAI-SearchBot та ін. не блокувати).
 *
 * Приховані сторінки (/markevitch-…, /cv-…, /imprimer/…) тут НАВМИСНО не
 * названі: robots.txt публічний, і рядок Disallow оприлюднив би їхні
 * таємні адреси. Їх закриває noindex — у metadata сторінок і заголовок
 * X-Robots-Tag у next.config.ts. Disallow до того ж не дав би краулеру
 * побачити цей noindex.
 */
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: "/", disallow: ["/api/"] };
  return {
    rules: [
      { userAgent: "*", ...rule },
      { userAgent: AI_BOTS, ...rule },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
