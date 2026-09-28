export interface SourceFile { path: string; content: string }
export interface Match { path: string; start: number; end: number; raw: string }

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const variants = (ch: string): string[] => {
  const v = [ch];
  if (ch === "\\") v.push("\\\\");
  if (ch === '"') v.push('\\"', "&quot;");
  if (ch === "'") v.push("\\'", "&apos;", "&#39;");
  if (ch === "’") v.push("&rsquo;");
  if (ch === "&") v.push("&amp;");
  if (ch === "—") v.push("&mdash;");
  if (ch === "«") v.push("&laquo;");
  if (ch === "»") v.push("&raquo;");
  if (ch === "©") v.push("&copy;");
  return [...new Set(v)].map(escapeRe);
};

export function locate(text: string, files: SourceFile[]): Match[] {
  const needle = text.trim().replace(/[\s\u00a0\u202f]+/g, " ");
  if (needle.length < 2) return [];
  const parts: string[] = [];
  for (let i = 0; i < needle.length;) {
    if (needle[i] === " ") { while (needle[i] === " ") i++; parts.push("(?:\\s|\\\\n|\\\\t|&nbsp;| | )+"); }
    else parts.push("(?:" + variants(needle[i++]).join("|") + ")");
  }
  const re = new RegExp(parts.join(""), "g");
  const found: Match[] = [];
  for (const file of files) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(file.content))) {
      found.push({ path: file.path, start: m.index, end: m.index + m[0].length, raw: m[0] });
      if (!m[0].length) re.lastIndex++;
    }
  }
  return found;
}

export function contextWindow(content: string, start: number, end: number, lines = 40): { before: string; match: string; after: string; startLine: number } {
  let beforeStart = start;
  for (let n = 0; n <= lines; n++) { const p = content.lastIndexOf("\n", beforeStart - 1); if (p < 0) { beforeStart = 0; break; } beforeStart = p; }
  if (content[beforeStart] === "\n") beforeStart++;
  let afterEnd = end, n = 0;
  while (afterEnd < content.length && n < lines) { const p = content.indexOf("\n", afterEnd); if (p < 0) { afterEnd = content.length; break; } afterEnd = p + 1; n++; }
  return { before: content.slice(beforeStart, start), match: content.slice(start, end), after: content.slice(end, afterEnd), startLine: content.slice(0, beforeStart).split("\n").length };
}
