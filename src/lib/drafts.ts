/**
 * Чернетки — розділи, які вже написані кодом, але ще НЕ затверджені Артемом
 * на канвасі. Вони живуть у репозиторії, збираються разом із сайтом і
 * відкриваються локально, але в продакшені їх немає: маршрут віддає 404,
 * посилання в навігації не рендериться, пошук їх не бачить.
 *
 * Увімкнути локально:
 *     NEXT_PUBLIC_DRAFT_PROGRAMMER=1 npm run dev
 *
 * Реліз розділу = не «додати прапорець у Vercel», а прибрати його звідси
 * разом із перевірками в page.tsx і Navbar.tsx — після того, як правки
 * з канваса внесені (див. design/programmer/README.md).
 *
 * NEXT_PUBLIC_, бо той самий прапорець читає і серверна сторінка, і
 * клієнтський Navbar.
 */
export const DRAFT_PROGRAMMER =
  process.env.NEXT_PUBLIC_DRAFT_PROGRAMMER === "1";

/**
 * Нова сторінка ЖАР-ПТИЦЯ (`/[lang]/works/firebird`) за канвою
 * `design/firebird/` (https://claude.ai/artifact/5e7RpHVRyFnnC5zbW4tYeU,
 * версія ≈70, 18.11.2026). Замінює стару сторінку з кнопкою на surge.
 *
 * Поки ця константа є, у продакшені на `works/firebird` лишається СТАРА
 * сторінка (FirebirdPage у works/[slug]/page.tsx) без змін, а сам шлях
 * не потрапляє ні в sitemap.xml, ні в llms.txt (draftPaths() у seo.ts).
 * Нова відкривається:
 *   - локально:  NEXT_PUBLIC_DRAFT_FIREBIRD=1 npm run dev
 *   - на preview-збірках Vercel (VERCEL_ENV=preview, next.config.ts), щоб
 *     Артем переглянув її за посиланням preview. На production-збірці
 *     VERCEL_ENV=production, тож там прапорець вимкнений.
 *
 * Реліз — лише окремим словом Артема після перегляду preview: прибрати цю
 * константу й стару FirebirdPage, у WorkPage віддавати FirebirdLanding
 * безумовно. Після релізу — редірект firebird-hordieiev.surge.sh на сайт.
 */
export const DRAFT_FIREBIRD =
  process.env.NEXT_PUBLIC_DRAFT_FIREBIRD === "1" ||
  process.env.NEXT_PUBLIC_SITE_ENV === "preview";

/**
 * Брендпакет NB · 2 (вибір Артема 25.11.2026: «Так, NB · 2») — NAMU-1400 на
 * назвах, IBM Plex Sans на тексті, палітра брендбуку Newspaper Birds.
 * ЧЕРНЕТКА: увімкнено лише на preview гілки design/brand-namu (і локально
 * прапорцем). У продакшені <html> не отримує data-brand="nb2", тож усі
 * правила з src/app/brand-nb2.css сплять, і сайт лишається як є.
 *
 *     NEXT_PUBLIC_DRAFT_BRAND_NB2=1 npm run dev
 *
 * Реліз = прибрати прапорець (поставити атрибут безумовно) — лише після «так»
 * Артема на preview.
 */
export const DRAFT_BRAND_NB2 =
  process.env.NEXT_PUBLIC_DRAFT_BRAND_NB2 === "1" ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "design/brand-namu" ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "design/most-predela";

/**
 * Живий прототип поєднання напрямів сайту (рішення Артема 25.11.2026):
 * головна — «Стрибок через склейку» (Майя Дерен, 1945); сторінки творів —
 * «Хасіґакарі» (міст театру Но, три зупинки з фактами) веде до «Пределі»
 * (вівтар Фра Анджеліко: великий кадр і ряд епізодів).
 * Канва: https://claude.ai/artifact/4XcVdrZwWvAKpWQQyrLuhM ; опис —
 * CHORÉGRAPHE/_довідка/Напрями сайту — 2026-11-25.md.
 *
 * Окремі маршрути /[lang]/most і /[lang]/most/[slug]; опубліковані сторінки
 * не змінюються. Увімкнено лише на preview гілки design/most-predela і
 * локально:
 *     NEXT_PUBLIC_DRAFT_MOST=1 NEXT_PUBLIC_DRAFT_BRAND_NB2=1 npm run dev
 * У продакшені маршрути віддають 404. Реліз — лише словом Артема.
 */
export const DRAFT_MOST =
  process.env.NEXT_PUBLIC_DRAFT_MOST === "1" ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "design/most-predela";
