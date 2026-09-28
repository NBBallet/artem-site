import type { Metadata } from "next";

export const metadata: Metadata = { title: "Правка сайту", robots: { index: false, follow: false } };

/** Вхід у редактор. Після входу на цьому пристрої внизу сторінок сайту
 *  з'являється кнопка «✎ Правка»; для відвідувачів її немає. */
export default async function EditLogin({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0a0a0a", color: "#f5f5f5", padding: 16, fontFamily: "Inter, system-ui, sans-serif" }}>
      <form method="post" action="/api/edit/login" style={{ width: "min(100%, 360px)", display: "grid", gap: 12 }}>
        <h1 style={{ fontFamily: "NAMU-1400, serif", fontWeight: 400, fontSize: 32, margin: 0 }}>Правка сайту</h1>
        <label htmlFor="pw" style={{ fontSize: 14, color: "#9a9a9a" }}>Пароль</label>
        <input id="pw" name="password" type="password" autoComplete="current-password" required autoFocus
          style={{ minHeight: 44, padding: "0 12px", background: "#111", color: "#f5f5f5", border: "1px solid #2b2b2b", borderRadius: 6, fontSize: 16 }} />
        <label htmlFor="lang" style={{ fontSize: 14, color: "#9a9a9a" }}>Після входу відкрити</label>
        <select id="lang" name="lang" defaultValue="uk"
          style={{ minHeight: 44, padding: "0 12px", background: "#111", color: "#f5f5f5", border: "1px solid #2b2b2b", borderRadius: 6, fontSize: 16 }}>
          <option value="uk">Українську версію</option>
          <option value="en">Англійську версію</option>
          <option value="fr">Французьку версію</option>
        </select>
        {e && <p role="alert" style={{ color: "#E8455E", margin: 0 }}>Пароль не підійшов.</p>}
        <button type="submit" style={{ minHeight: 44, background: "#C8102E", color: "#fff", border: 0, borderRadius: 6, fontSize: 16 }}>Увійти</button>
      </form>
    </main>
  );
}
