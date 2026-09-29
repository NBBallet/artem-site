import test from "node:test";
import assert from "node:assert/strict";
import { checkPassword, signSession, verifySession } from "../src/lib/site-editor/auth.ts";
import { locate } from "../src/lib/site-editor/locate.ts";
import { applyEdits, detectLiteralKind, directEdit, escapeForContext } from "../src/lib/site-editor/apply.ts";
import { makeGitHub } from "../src/lib/site-editor/github.ts";

test("session signing, expiry, tampering, and passwords", () => {
  const token = signSession("secret", 1000);
  assert.equal(verifySession(token, "secret", 2000), true);
  assert.equal(verifySession(token, "secret", 1000 + 181 * 86400000), false);
  assert.equal(verifySession(token + "x", "secret", 2000), false);
  assert.equal(verifySession(token, "", 2000), false);
  assert.equal(checkPassword("abc", "abc"), true);
  assert.equal(checkPassword("abc", "abd"), false);
  assert.equal(checkPassword("abc", undefined), false);
});

test("locates escaped and formatted text in source", () => {
  const files = [
    { path: "a.json", content: '{"x":"Sample Ballet\\n\\\"Live\\\""}' },
    { path: "b.ts", content: "const x = { en: 'L’été arrive' };" },
    { path: "c.tsx", content: "<p>Sample Ballet\n      arrives today</p>" },
    { path: "d.tsx", content: "<p>Rock &apos;n&apos; &amp; Roll</p>" },
    { path: "e.ts", content: "Welcome home" },
    { path: "f.ts", content: "Sample Ballet" },
  ];
  assert.equal(locate('Sample Ballet\n"Live"', files)[0]?.path, "a.json");
  assert.equal(locate("L’été arrive", files)[0]?.path, "b.ts");
  assert.equal(locate("Sample Ballet arrives today", files)[0]?.path, "c.tsx");
  assert.equal(locate("Rock 'n' & Roll", files)[0]?.path, "d.tsx");
  assert.equal(locate("Welcome home", files)[0]?.path, "e.ts");
  const duplicated = [{ path: "x", content: "Sample Ballet" }, { path: "y", content: "Sample Ballet" }];
  assert.equal(locate("Sample Ballet", duplicated).length, 2);
});

test("applies edits sequentially and safely without mutating input", () => {
  const input = { a: "one two two" };
  const r = applyEdits(input, [
    { path: "a", find: "one", replace: "ONE" }, { path: "a", find: "two", replace: "TWO" },
    { path: "a", find: "missing", replace: "x" }, { path: "a", find: "ONE", replace: "ONE" },
    { path: "z", find: "a", replace: "b" },
  ]);
  assert.deepEqual(r.applied.map(e => e.find), ["one"]);
  assert.deepEqual(r.rejected.map(e => e.reason), ["ambiguous", "not-found", "no-op", "unknown-file"]);
  assert.equal(r.files.a, "ONE two two"); assert.equal(input.a, "one two two");
});

test("escapes each literal kind and detects literal contexts", () => {
  assert.equal(escapeForContext('a"\\\nb', "json"), 'a\\"\\\\\\nb');
  assert.equal(escapeForContext("a'\\\nb", "js-single"), "a\\'\\\\\\nb");
  assert.equal(escapeForContext("a` ${x}", "js-template"), "a\\` \\${x}");
  assert.equal(escapeForContext("a{b}<", "jsx-text"), 'a{"{"}b{"}"}&lt;');
  assert.equal(detectLiteralKind('const x = "hi";', 12), "js-double");
  assert.equal(detectLiteralKind("const x = 'hi';", 12), "js-single");
  assert.equal(detectLiteralKind("const x = `hi`;", 12), "js-template");
  assert.equal(detectLiteralKind("<p>Hello</p>", 3), "jsx-text");
  assert.equal(detectLiteralKind('"hi"', 2, "x.json"), "json");
});

test("GitHub client reads head, creates commits in order, and maps deployment", async () => {
  const calls: { url: string; init?: RequestInit }[] = [];
  let patchStatus = 200;
  const fake = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input); calls.push({ url, init });
    let data: any = {};
    if (url.endsWith("/git/ref/heads/main")) data = { object: { sha: "parent" } };
    else if (url.endsWith("/git/commits/parent")) data = { tree: { sha: "base" } };
    else if (url.endsWith("/git/blobs")) data = { sha: "blob" };
    else if (url.endsWith("/git/trees")) data = { sha: "tree" };
    else if (url.endsWith("/git/commits")) data = { sha: "newcommit" };
    else if (url.endsWith("/deployments?sha=sha")) data = [{ id: 3, environment: "Production" }];
    else if (url.endsWith("/deployments/3/statuses")) data = [{ state: "success" }];
    const status = url.includes("/git/refs/heads/") ? patchStatus : 200;
    return new Response(status === 200 ? JSON.stringify(data) : "non-fast-forward", { status, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
  const gh = makeGitHub({ token: "t", owner: "o", repo: "r", branch: "main", fetchImpl: fake });
  assert.deepEqual(await gh.getHead(), { commitSha: "parent", treeSha: "base" });
  assert.equal(await gh.commitFiles({ parentSha: "parent", baseTreeSha: "base", files: { "a.txt": "hi" }, message: "edit", author: { name: "Sample", email: "sample@example.test" } }), "newcommit");
  assert.deepEqual(calls.slice(2, 6).map(c => new URL(c.url).pathname.split("/").slice(-1)[0]), ["blobs", "trees", "commits", "main"]);
  assert.equal(await gh.deploymentState("sha"), "success");
  patchStatus = 422;
  await assert.rejects(() => gh.commitFiles({ parentSha: "p", baseTreeSha: "b", files: {}, message: "m", author: { name: "n", email: "e" } }), (e: any) => e.code === "conflict");
});

test("free mode replaces one exact place and refuses shared text", async () => {
  const files = [
    { path: "src/content/a.json", content: '{"uk":"Старий \\"текст\\"","en":"Old text","fr":"Ancien texte"}' },
    { path: "src/app/p.tsx", content: "<p>Балет\n        сьогодні</p>\n<p>ANIMA</p>" },
    { path: "src/app/q.tsx", content: "<h1>ANIMA</h1>" },
  ];
  const map = Object.fromEntries(files.map(f => [f.path, f.content]));
  const run = (o: string, n: string) => directEdit(locate(o, files), n, map);
  const a = run('Старий "текст"', 'Новий "текст"');
  assert.ok(a.ok);
  const r = applyEdits(map, [a.edit]);
  assert.equal(JSON.parse(r.files["src/content/a.json"]).uk, 'Новий "текст"');
  assert.equal(JSON.parse(r.files["src/content/a.json"]).en, "Old text");
  const b = run("Балет сьогодні", "Балет завтра");
  assert.ok(b.ok);
  assert.equal(applyEdits({ "src/app/p.tsx": files[1].content }, [b.edit]).files["src/app/p.tsx"], "<p>Балет завтра</p>\n<p>ANIMA</p>");
  assert.deepEqual(run("ANIMA", "Anima"), { ok: false, reason: "ambiguous", count: 2 });
  assert.deepEqual(run("немає", "x"), { ok: false, reason: "not-found", count: 0 });
});
