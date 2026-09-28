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
