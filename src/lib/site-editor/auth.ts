import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const EDIT_COOKIE = "nb_edit";
export const EDITOR_FLAG_COOKIE = "nb_editor";

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(input: string, expected: string | undefined): boolean {
  if (!expected) return false;
  return safeEqual(createHash("sha256").update(input).digest(), createHash("sha256").update(expected).digest());
}

export function signSession(secret: string, now = Date.now()): string {
  const issuedAt = String(now);
  const signature = createHmac("sha256", secret).update(issuedAt).digest("hex");
  return `${issuedAt}.${signature}`;
}

export function verifySession(token: string | undefined, secret: string | undefined, now = Date.now(), maxAgeMs = 180 * 24 * 60 * 60 * 1000): boolean {
  if (!token || !secret) return false;
  const match = /^(0|[1-9]\d*)\.([0-9a-f]{64})$/.exec(token);
  if (!match) return false;
  const issued = Number(match[1]);
  if (!Number.isSafeInteger(issued) || issued > now + 5 * 60 * 1000 || now - issued > maxAgeMs) return false;
  const expected = createHmac("sha256", secret).update(match[1]).digest();
  return safeEqual(expected, Buffer.from(match[2], "hex"));
}
