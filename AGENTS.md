<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Known pitfalls — read before touching Notion-backed content

## Every field sourced from Notion MUST have a real, non-empty fallback default

Pages are `dynamic = "force-dynamic"`, so **every request** (plus Next's
prefetch of linked pages) re-fetches from Notion. `getSiteSettings()` fires
~10 DB queries in parallel; `queryDb()` **silently returns `[]` on any failure**
(rate-limit / network blip), and each field then falls back to its value in
`DEFAULT_SETTINGS`. Notion's API rate-limits easily under this fan-out, and the
DBs queried **last** in the `Promise.all` array are the first to be dropped.

**Therefore: never default a Notion-sourced field to `""`.** An empty default
means one transient fetch failure blanks that content in the live UI — and it
will keep happening intermittently, hardest to reproduce, on whichever fields
sit late in the query order.

Real bug this caused (2026-07): `mercyImage` / `humansImage` were the only two
image defaults set to `""` (their DBs are #9 and #10 in the query array). Their
covers kept vanishing to grey placeholders in production while `firebirdImage` /
`icareImage` — which have real URL defaults — never broke. Fix was to give the
two a real Cloudinary URL default, exactly like the others.

Rules when adding/editing settings:
- Give text fields a sensible English default; give image/URL fields a real
  working URL (or a local `/public` asset) — mirror `firebirdImage` /
  `icareImage` in `src/lib/settings.ts`. `""` is only acceptable when the
  consuming component **intentionally** hides the element when empty AND that
  blank state is acceptable to ship on a fetch failure.
- Notion overrides the default when it loads, so a real default does not reduce
  editability — it only guarantees the page never renders blank.
- Reads in `settings.ts` / `notion.ts` / `anima-notion.ts` are wrapped in
  `withRetry()` (`src/lib/notion-retry.ts`); keep new Notion reads wrapped too.
