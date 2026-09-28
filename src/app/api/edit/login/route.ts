import { NextResponse } from "next/server";
import { checkPassword } from "@/lib/site-editor/auth";
import { startSession } from "@/lib/site-editor/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const lang = ["uk", "en", "fr"].includes(String(form.get("lang"))) ? String(form.get("lang")) : "uk";
  if (!checkPassword(password, process.env.EDIT_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 1500)); // slow down guessing
    return NextResponse.redirect(new URL("/edit?e=1", req.url), 303);
  }
  await startSession();
  return NextResponse.redirect(new URL(`/${lang}`, req.url), 303);
}
