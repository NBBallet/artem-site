import { applyEdits, type Edit } from "./apply";
import { contextWindow, locate, type SourceFile } from "./locate";
import { makeGitHub } from "./github";
import { planPatch, type Excerpt, type Lang } from "./translate";

export const LANGS: Lang[] = ["uk", "en", "fr"];

/** Files that hold visible copy. cv-data.ts is generated from design/cv/copy.json,
 *  so it is not searched: edits to copy.json are mirrored into it (same JSON text). */
const CV_JSON = "design/cv/copy.json";
const CV_TS = "src/lib/cv-data.ts";
const FR_EXCEPTIONS = "src/content/fr-exceptions.json";

export function isCopyFile(p: string): boolean {
  if (p === CV_JSON) return true;
  if (p === CV_TS || p === FR_EXCEPTIONS) return false;
  if (p.startsWith("src/lib/site-editor/")) return false;
  if (/^src\/(content|dictionaries)\/[^/]+\.json$/.test(p)) return true;
  if (/^src\/lib\/[^/]+\.ts$/.test(p)) return true;
  if (/^src\/(app|components)\/.+\.tsx$/.test(p)) return true;
  return false;
}

export interface Change { old: string; new: string }
export interface ChangeResult {
  old: string;
  new: string;
  status: "applied" | "not-found" | "ambiguous" | "error";
  where?: string[];
  translated?: string[];
  note?: string;
}

// A short label ("Одноактний балет") legitimately lives in many places; the model
// picks the right one by page path, so allow more matches with narrower windows.
const MAX_MATCHES = 16;
const norm = (s: string) => s.replace(/[\s  ]+/g, " ").trim();

type JsonPath = (string | number)[];

function leaves(v: unknown, path: JsonPath = [], out: [JsonPath, string][] = []) {
  if (typeof v === "string") out.push([path, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => leaves(x, [...path, i], out));
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) leaves(x, [...path, k], out);
  return out;
}

function getAt(v: unknown, path: JsonPath): unknown {
  return path.reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), v);
}

/** Where the other-language versions of a JSON string sit: a language segment
 *  (`en` → `uk`), a key suffix (`aboutBioEn` → `aboutBioUk`), or the sibling
 *  dictionary file (`dictionaries/en.json` → `uk.json`). */
function jsonSiblings(file: SourceFile, oldText: string, all: Map<string, SourceFile>): Excerpt[] {
  let data: unknown;
  try { data = JSON.parse(file.content); } catch { return []; }
  const target = norm(oldText);
  const hits = leaves(data).filter(([, v]) => norm(v).includes(target));
  const out: Excerpt[] = [];
  const add = (f: SourceFile | undefined, path: JsonPath) => {
    if (!f) return;
    let d: unknown;
    try { d = JSON.parse(f.content); } catch { return; }
    const val = getAt(d, path);
    if (typeof val !== "string" || !val) return;
    const raw = JSON.stringify(val).slice(1, -1);
    const at = f.content.indexOf(raw);
    if (at < 0) return;
    const w = contextWindow(f.content, at, at + raw.length, 2);
    out.push({ path: f.path, startLine: w.startLine, text: w.before + w.match + w.after });
  };
  for (const [path] of hits.slice(0, 3)) {
    path.forEach((seg, i) => {
      if (typeof seg !== "string") return;
      if ((LANGS as string[]).includes(seg))
        for (const l of LANGS) if (l !== seg) add(file, [...path.slice(0, i), l, ...path.slice(i + 1)]);
      const m = /^(.*)(En|Uk|Fr)$/.exec(seg);
      if (m && i === path.length - 1)
        for (const s of ["En", "Uk", "Fr"]) if (s !== m[2]) add(file, [...path.slice(0, i), m[1] + s]);
    });
    const dict = /^(.*\/)(en|uk|fr)\.json$/.exec(file.path);
    if (dict) for (const l of LANGS) if (l !== dict[2]) add(all.get(`${dict[1]}${l}.json`), path);
  }
  return out;
}

export function excerptsFor(oldText: string, files: SourceFile[]) {
  const matches = locate(oldText, files);
  const byPath = new Map(files.map((f) => [f.path, f]));
  const excerpts: Excerpt[] = [];
  for (const m of matches.slice(0, MAX_MATCHES)) {
    const f = byPath.get(m.path)!;
    const w = contextWindow(f.content, m.start, m.end, matches.length > 4 ? 8 : 25);
    excerpts.push({ path: m.path, startLine: w.startLine, text: w.before + w.match + w.after });
    if (m.path.endsWith(".json")) excerpts.push(...jsonSiblings(f, oldText, byPath));
  }
  const seen = new Set<string>();
  const unique = excerpts.filter((e) => {
    const k = `${e.path}:${e.startLine}:${e.text.length}`;
    return seen.has(k) ? false : (seen.add(k), true);
  });
  return { matches, excerpts: unique };
}

export async function publishChanges(params: {
  lang: Lang;
  pagePath: string;
  changes: Change[];
}): Promise<{ ok: boolean; sha?: string; results: ChangeResult[]; error?: string }> {
  const gh = makeGitHub({
    token: process.env.GITHUB_TOKEN ?? "",
    owner: "NBBallet",
    repo: "artem-site",
    branch: editBranch(),
  });
  const head = await gh.getHead();
  const paths = await gh.listFiles(head.commitSha, (p: string) => isCopyFile(p) || p === CV_TS || p === FR_EXCEPTIONS);
  const contents = await Promise.all(paths.map(async (p) => [p, (await gh.readFile(p, head.commitSha)) ?? ""] as const));
  let files: Record<string, string> = Object.fromEntries(contents);
  let frExceptions: string[] = [];
  try { frExceptions = JSON.parse(files[FR_EXCEPTIONS] ?? "[]"); } catch { /* empty list */ }

  const searchable = (): SourceFile[] =>
    Object.entries(files).filter(([p]) => isCopyFile(p)).map(([path, content]) => ({ path, content }));

  // Plan all changes in parallel against the same snapshot; apply sequentially.
  const plans = await Promise.all(
    params.changes.map(async (c) => {
      const { matches, excerpts } = excerptsFor(c.old, searchable());
      if (matches.length === 0) return { c, kind: "not-found" as const };
      if (matches.length > MAX_MATCHES) return { c, kind: "ambiguous" as const, count: matches.length };
      try {
        const plan = await planPatch({ lang: params.lang, pagePath: params.pagePath, oldText: c.old, newText: c.new, excerpts, frExceptions });
        return { c, kind: "plan" as const, plan };
      } catch (e) {
        return { c, kind: "error" as const, message: e instanceof Error ? e.message : String(e) };
      }
    }),
  );

  const results: ChangeResult[] = [];
  const changed = new Set<string>();
  for (const p of plans) {
    const base = { old: p.c.old, new: p.c.new };
    if (p.kind === "not-found") { results.push({ ...base, status: "not-found", note: "Не знайшов цей текст у джерелах сайту — напиши Claude в чаті." }); continue; }
    if (p.kind === "ambiguous") { results.push({ ...base, status: "ambiguous", note: `Такий текст стоїть у ${p.count} місцях — виправ довший фрагмент.` }); continue; }
    if (p.kind === "error") { results.push({ ...base, status: "error", note: `Переклад не вдався: ${p.message.slice(0, 160)}` }); continue; }

    const edits: Edit[] = [...p.plan.edits];
    // Mirror copy.json edits into the generated cv-data.ts (same JSON escaping).
    for (const e of p.plan.edits) if (e.path === CV_JSON && files[CV_TS]) edits.push({ ...e, path: CV_TS });
    const r = applyEdits(files, edits);
    const mirrorMisses = r.rejected.filter((x) => x.edit.path === CV_TS);
    const realRejects = r.rejected.filter((x) => x.edit.path !== CV_TS);
    if (r.applied.length === 0 || realRejects.length > 0) {
      results.push({ ...base, status: "error", note: p.plan.note || "Не вдалося однозначно застосувати правку — нічого не змінено." });
      continue;
    }
    files = r.files;
    r.applied.forEach((e) => changed.add(e.path));
    results.push({
      ...base,
      status: "applied",
      where: [...new Set(r.applied.map((e) => e.path))],
      translated: p.plan.translated,
      note: [p.plan.note, mirrorMisses.length ? "CV-дані не синхронізовано автоматично — Claude перегенерує." : ""].filter(Boolean).join(" ") || undefined,
    });
  }

  if (changed.size === 0) return { ok: false, results };

  const first = params.changes[0];
  const clip = (s: string) => (s.length > 60 ? s.slice(0, 57) + "…" : s);
  const sha = await gh.commitFiles({
    parentSha: head.commitSha,
    baseTreeSha: head.treeSha,
    files: Object.fromEntries([...changed].map((p) => [p, files[p]])),
    message:
      `правка з сайту (${params.lang}, ${params.pagePath}): «${clip(first.old)}» → «${clip(first.new)}»` +
      (params.changes.length > 1 ? ` і ще ${params.changes.length - 1}` : "") +
      "\n\nВнесено редактором на сайті (/edit).",
    author: { name: "Artem Hordieiev (редактор сайту)", email: "site-editor@hordieiev.art" },
  });
  return { ok: true, sha, results };
}

/** Production edits main; a preview deployment edits its own branch. */
export function editBranch(): string {
  return process.env.EDIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
}
