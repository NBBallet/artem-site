import { NextResponse } from "next/server";
import { endSession } from "@/lib/site-editor/session";

export async function POST() {
  await endSession();
  return NextResponse.json({ ok: true });
}
