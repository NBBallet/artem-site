import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { EDIT_COOKIE, EDITOR_FLAG_COOKIE, signSession, verifySession } from "./auth";

const MAX_AGE = 180 * 24 * 60 * 60; // seconds

/** Session key derives from the password: changing EDIT_PASSWORD in Vercel
 *  signs every device out at once. */
function secret(): string | undefined {
  const pw = process.env.EDIT_PASSWORD;
  return pw ? createHash("sha256").update("nb-edit:" + pw).digest("hex") : undefined;
}

export async function isEditor(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(EDIT_COOKIE)?.value, secret());
}

export async function startSession() {
  const s = secret();
  if (!s) throw new Error("EDIT_PASSWORD is not set");
  const store = await cookies();
  const common = { path: "/", maxAge: MAX_AGE, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" };
  store.set(EDIT_COOKIE, signSession(s), { ...common, httpOnly: true });
  store.set(EDITOR_FLAG_COOKIE, "1", { ...common, httpOnly: false });
}

export async function endSession() {
  const store = await cookies();
  store.delete(EDIT_COOKIE);
  store.delete(EDITOR_FLAG_COOKIE);
}
