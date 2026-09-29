import type { Match } from "./locate";

export interface Edit { path: string; find: string; replace: string }
export interface ApplyResult { files: Record<string, string>; applied: Edit[]; rejected: { edit: Edit; reason: "not-found" | "ambiguous" | "no-op" | "unknown-file" }[] }

export function applyEdits(files: Record<string, string>, edits: Edit[]): ApplyResult {
  const result = { ...files }, applied: Edit[] = [], rejected: ApplyResult["rejected"] = [];
  for (const edit of edits) {
    if (!(edit.path in result)) { rejected.push({ edit, reason: "unknown-file" }); continue; }
    if (edit.find === edit.replace) { rejected.push({ edit, reason: "no-op" }); continue; }
    const content = result[edit.path], at = content.indexOf(edit.find);
    if (at < 0) { rejected.push({ edit, reason: "not-found" }); continue; }
    if (content.indexOf(edit.find, at + edit.find.length) >= 0) { rejected.push({ edit, reason: "ambiguous" }); continue; }
    result[edit.path] = content.slice(0, at) + edit.replace + content.slice(at + edit.find.length);
    applied.push(edit);
  }
  return { files: result, applied, rejected };
}

export function escapeForContext(value: string, kind: "json" | "js-double" | "js-single" | "js-template" | "jsx-text"): string {
  if (kind === "jsx-text") return [...value].map(ch => ch === "{" ? '{"{"}' : ch === "}" ? '{"}"}' : ch === "<" ? "&lt;" : ch).join("");
  const out = value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n");
  if (kind === "json" || kind === "js-double") return out.replace(/"/g, '\\"');
  if (kind === "js-single") return out.replace(/'/g, "\\'");
  return out.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

export function detectLiteralKind(content: string, start: number, path = ""): "json" | "js-double" | "js-single" | "js-template" | "jsx-text" {
  if (/\.json$/i.test(path)) return "json";
  const lineStart = Math.max(content.lastIndexOf("\n", start - 1), content.lastIndexOf(";", start - 1), content.lastIndexOf("{", start - 1));
  const prefix = content.slice(lineStart + 1, start);
  let quote: string | undefined;
  for (let i = 0; i < prefix.length; i++) {
    if (prefix[i] === "\\") { i++; continue; }
    if (quote) { if (prefix[i] === quote) quote = undefined; }
    else if (prefix[i] === '"' || prefix[i] === "'" || prefix[i] === "`") quote = prefix[i];
  }
  if (quote === '"') return "js-double";
  if (quote === "'") return "js-single";
  if (quote === "`") return "js-template";
  return "jsx-text";
}

/** Free mode: no model call. The edited text is replaced only where it literally
 *  stands, in the edited language; the translation goes to Claude as an issue.
 *  Only a single match is replaced — text that stands in several places (a shared
 *  label, the same word in two languages) needs the translate mode. */
export function directEdit(matches: Match[], newText: string, files: Record<string, string>):
  | { ok: true; edit: Edit }
  | { ok: false; reason: "not-found" | "ambiguous"; count: number } {
  if (matches.length === 0) return { ok: false, reason: "not-found", count: 0 };
  if (matches.length > 1) return { ok: false, reason: "ambiguous", count: matches.length };
  const m = matches[0], content = files[m.path];
  const kind = detectLiteralKind(content, m.start, m.path);
  // A little context on both sides keeps the find string unique in the file.
  const from = Math.max(0, m.start - 40), to = Math.min(content.length, m.end + 40);
  const find = content.slice(from, to);
  const replace = content.slice(from, m.start) + escapeForContext(newText, kind) + content.slice(m.end, to);
  return { ok: true, edit: { path: m.path, find, replace } };
}
