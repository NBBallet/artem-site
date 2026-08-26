# hordieiev.art

Сайт хореографа Артема Гордєєва. Next.js (App Router) + Tailwind,
контент редагується в Notion, деплой — Vercel із гілки `main`.

| | |
|---|---|
| Прод | https://hordieiev.art |
| Репозиторій | `NBBallet/artem-site` |
| Мови | `en` / `uk` / `fr` — маршрут `/[lang]` |
| Хостинг | Vercel, автодеплой на push у `main` |

## Запуск

```bash
npm install
npm run dev
```

Потрібен `.env.local` із `NOTION_API_KEY` і `NOTION_*_DB_ID` — без них
сторінки віддадуть дефолтні тексти замість нотіонівських.

> **Тримай цю теку поза iCloud.** На Desktop (він синхронізується) iCloud
> вивантажує файли з `node_modules` у хмару, і dev-сервер зависає на
> компіляції по 20+ хвилин, а eslint падає з `ETIMEDOUT`. Тому проєкт
> живе в `/Users/mac/Ballet/`.

## Структура

| Шлях | Що там |
|---|---|
| `src/app/[lang]/page.tsx` | головна: hero, роботи, About, CV CTA, контакти |
| `src/app/[lang]/works/[slug]/` | сторінка окремої постановки |
| `src/lib/settings.ts` | усі тексти й картинки з Notion + дефолти |
| `src/lib/notion.ts`, `anima-notion.ts` | читання з Notion, обгорнуте у `withRetry()` |
| `src/dictionaries/*.json` | статичні переклади (фолбек, коли Notion мовчить) |
| `public/fonts/` | NAMU-1400 і NAMU-Pro — фірмові шрифти |
| `design/` | дизайн-джерела секцій (див. README всередині) |
| `docs/` | бренд-матеріали |

## Контент

Тексти живуть у Notion Site Settings — таблиця «ключ → Value EN / UK / FR».
Кожне поле в коді читається як `settings.<field><Lang> || t["<ключ>"]`:
Notion перекриває словник, словник рятує, коли Notion недоступний.

**Перед правкою контенту читай [AGENTS.md](AGENTS.md)** — там описана пастка
з порожніми дефолтами, через яку картинки й тексти зникали на проді.
