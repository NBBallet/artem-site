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

# Нова публічна сторінка не йде в `main` без канваса

Тут немає стейджингу: merge у `main` → Vercel → hordieiev.art за хвилини.
Отже **комміт у `main` і є публікацією**, і «дописати сторінку» ніколи
не дорівнює «випустити її».

04.09.2026 розділ `/[lang]/programmer` («Замовити») написали й одразу влили
в `main`. Він десять днів стояв у продакшені трьома мовами, хоч Артем його
не читав і не затверджував. Тексти там — його слово про власну роботу, не
технічна деталь.

Порядок для будь-якої нової публічної сторінки — той самий, що вже діяв
для резюме (`design/cv/`):

```
design/<розділ>/gen.py → канвас → правки Артема в дужках → код → реліз
```

До релізу сторінка живе за прапорцем чернетки — `src/lib/drafts.ts`. Одна
константа, яку читає і сторінка (без неї `notFound()`, і навіть
`title`/`description` не потрапляють у metadata 404-ї), і `Navbar`
(без неї пункт меню не рендериться). Локально відкривається змінною
середовища; **у Vercel цієї змінної немає і додавати її не треба**:
реліз = прибрати константу комітом, щоб «випустити» лишалось окремою
свідомою дією.

Повна історія й ширші наслідки — `CHORÉGRAPHE/CLAUDE.md` §9-БІС.
