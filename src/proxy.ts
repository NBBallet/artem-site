/**
 * Мова сторінки для <html lang> (18.11.2026).
 *
 * Кореневий layout не бачить сегмента [lang], тому до 18.11.2026 на всіх
 * сторінках стояло lang="en" — і українська, і французька версії казали
 * пошуковикам і читалкам екрана, що вони англійські. Тут мова береться з
 * першого сегмента адреси й передається layout заголовком x-site-lang.
 *
 * Працює для сторінок, що рендеряться на запит (головна, твори, CV).
 * Сторінка з `dynamic = "force-static"` збирається без запиту й лишається
 * lang="en" — тому /[lang]/cv з 18.11.2026 не force-static.
 */
import { NextResponse, type NextRequest } from "next/server";

const BY_PREFIX: Record<string, string> = {
  en: "en",
  uk: "uk",
  fr: "fr",
};

export function proxy(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1] ?? "";
  const lang = BY_PREFIX[first];
  if (!lang) return NextResponse.next();
  const headers = new Headers(request.headers);
  headers.set("x-site-lang", lang);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // лише сторінки: без API, статики, картинок і службових файлів
  matcher: ["/(en|uk|fr)", "/(en|uk|fr)/:path*"],
};
