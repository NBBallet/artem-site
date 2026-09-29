"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ChangeResult = { old: string; new: string; status: "applied" | "not-found" | "ambiguous" | "error"; where?: string[]; translated?: string[]; note?: string };
type PublishResult = { ok: boolean; sha?: string; issue?: string; results: ChangeResult[]; error?: string };
const inline = new Set(["SPAN", "EM", "STRONG", "B", "I", "U", "SMALL", "SUP", "SUB", "MARK", "ABBR"]);
const excluded = "script,style,svg,noscript,iframe,video,input,textarea,select,button[data-editor],[data-no-edit]";

export default function SiteEditor({ lang }: { lang: "uk" | "en" | "fr" }) {
  const [enabled, setEnabled] = useState(false), [editing, setEditing] = useState(false);
  const [count, setCount] = useState(0), [modal, setModal] = useState(false), [requestText, setRequestText] = useState("");
  const [requestStatus, setRequestStatus] = useState(""), [publishing, setPublishing] = useState<"" | "translate" | "direct">("");
  const [result, setResult] = useState<PublishResult | null>(null), [deploy, setDeploy] = useState("");
  const [error, setError] = useState("");
  const host = useRef<HTMLDivElement>(null), originals = useRef(new WeakMap<HTMLElement, string>()), elements = useRef<HTMLElement[]>([]), lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => { setEnabled(document.cookie.split(";").some(c => c.trim() === "nb_editor=1")); }, []);

  useEffect(() => {
    if (!editing) return;
    const root = host.current;
    if (!root) return;
    const style = document.createElement("style");
    style.dataset.siteEditor = "";
    style.textContent = ".nb-editable:hover{outline:1px dashed rgba(200,16,46,.55)}.nb-editable:focus{outline:2px solid #C8102E}.nb-changed{box-shadow:inset 3px 0 0 #C8102E}";
    document.head.append(style);
    const okChildren = (el: Element): boolean => [...el.childNodes].every(n => n.nodeType === Node.TEXT_NODE || (n.nodeType === Node.ELEMENT_NODE && ((n as Element).tagName === "BR" || (inline.has((n as Element).tagName) && okChildren(n as Element)))));
    const candidates = [...document.body.querySelectorAll<HTMLElement>("*")].filter(el => !root.contains(el) && !el.closest(excluded) && !el.matches(excluded) && okChildren(el) && [...el.childNodes].some(n => n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim()));
    // Keep the outermost eligible container: a paragraph with <strong> inside is one
    // edit target, so its own text stays editable (a nested candidate would not be).
    const set = new Set(candidates);
    elements.current = candidates.filter(el => { for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false; return true; });
    for (const el of elements.current) {
      originals.current.set(el, el.innerText);
      el.contentEditable = "plaintext-only";
      if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
      el.spellcheck = false; el.classList.add("nb-editable");
      el.addEventListener("focus", onFocus);
      el.addEventListener("input", update);
      el.addEventListener("blur", update);
      el.addEventListener("keydown", onKey);
    }
    function onFocus(this: HTMLElement) { lastFocused.current = this; }
    function update() {
      setCount(elements.current.filter(el => el.innerText.trim() !== (originals.current.get(el) ?? "").trim()).length);
      for (const el of elements.current) el.classList.toggle("nb-changed", el.innerText.trim() !== (originals.current.get(el) ?? "").trim());
    }
    function onKey(this: HTMLElement, ev: KeyboardEvent) {
      if (ev.key === "Escape") { this.innerText = originals.current.get(this) ?? ""; this.blur(); update(); }
      else if (ev.key === "Enter" && !(originals.current.get(this) ?? "").includes("\n")) { ev.preventDefault(); this.blur(); }
    }
    const blockLinks = (ev: MouseEvent) => { const target = ev.target as Element | null; if (target?.closest("a") && elements.current.some(el => el.contains(target))) ev.preventDefault(); };
    const beforeUnload = (ev: BeforeUnloadEvent) => { if (elements.current.some(el => el.innerText.trim() !== (originals.current.get(el) ?? "").trim())) { ev.preventDefault(); ev.returnValue = ""; } };
    document.addEventListener("click", blockLinks, true);
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      document.removeEventListener("click", blockLinks, true); window.removeEventListener("beforeunload", beforeUnload);
      for (const el of elements.current) { el.removeEventListener("focus", onFocus); el.removeEventListener("input", update); el.removeEventListener("blur", update); el.removeEventListener("keydown", onKey); el.removeAttribute("contenteditable"); el.classList.remove("nb-editable", "nb-changed"); }
      elements.current = []; style.remove();
    };
  }, [editing]);

  if (!enabled) return null;
  const changed = () => elements.current.filter(el => el.innerText.trim() !== (originals.current.get(el) ?? "").trim());
  const exitAndRestore = () => { for (const el of elements.current) el.innerText = originals.current.get(el) ?? ""; setCount(0); setEditing(false); };
  const logout = async () => { await fetch("/api/edit/logout", { method: "POST" }); location.reload(); };
  const sendRequest = async () => {
    setRequestStatus("");
    try { const r = await fetch("/api/edit/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang, path: location.pathname, text: requestText, selection: lastFocused.current?.innerText ?? "" }) }); if (!r.ok) throw new Error(await r.text()); setRequestStatus("Надіслано — Claude внесе на наступній сесії"); }
    catch (e) { setRequestStatus(e instanceof Error ? e.message : "Помилка надсилання"); }
  };
  const publish = async (mode: "translate" | "direct") => {
    setPublishing(mode); setError(""); setDeploy("");
    try {
      const changes = changed().map(el => ({ old: (originals.current.get(el) ?? "").trim(), new: el.innerText.trim() }));
      const r = await fetch("/api/edit/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang, path: location.pathname, changes, mode }) });
      const data = await r.json() as PublishResult;
      if (!r.ok) throw new Error(data.error || "Помилка публікації");
      setResult(data); setEditing(false);
      if (data.sha) {
        setDeploy("Збирається на сервері…"); const until = Date.now() + 5 * 60 * 1000;
        while (Date.now() < until) { await new Promise(resolve => setTimeout(resolve, 5000)); const status = await fetch(`/api/edit/status?sha=${encodeURIComponent(data.sha!)}`); const body = await status.json() as { state: string }; if (body.state === "success") { setDeploy("✅ На сайті"); break; } if (body.state === "failure") { setDeploy("❌ Збірка не пройшла — зміни не на сайті, Claude подивиться"); break; } }
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Помилка публікації"); }
    finally { setPublishing(""); }
  };

  const button: React.CSSProperties = { minHeight: 44, background: "#C8102E", color: "white", border: 0, borderRadius: 5, padding: "8px 12px", font: "inherit" };
  const shell: React.CSSProperties = { position: "fixed", zIndex: 99999, bottom: 12, left: "50%", transform: "translateX(-50%)", width: "min(94vw, 720px)", boxSizing: "border-box", background: "#0a0a0a", color: "white", font: "14px Inter, system-ui, sans-serif", padding: 12, borderRadius: 9, boxShadow: "0 3px 18px #0008" };
  return <div ref={host} data-no-edit="" style={shell}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
      {!editing ? <button data-editor="" style={button} onClick={() => { setResult(null); setEditing(true); }}>✎ Правка</button> : <>
        <strong>Змін: {count}</strong><button data-editor="" style={button} onClick={exitAndRestore}>Скасувати</button>
        <button data-editor="" style={button} onClick={() => { setModal(true); setRequestStatus(""); }}>💬 Доручення</button>
        <button data-editor="" style={{ ...button, opacity: count ? 1 : .5 }} disabled={!count || !!publishing} onClick={() => publish("translate")}>{publishing === "translate" ? "Публікую… (переклад і збереження, до хвилини)" : "Опублікувати з перекладом"}</button>
        <button data-editor="" title="Безкоштовно: змінюється тільки ця мова, переклад іде дорученням Claude" style={{ ...button, background: "#333", opacity: count ? 1 : .5 }} disabled={!count || !!publishing} onClick={() => publish("direct")}>{publishing === "direct" ? "Публікую…" : "Лише цією мовою"}</button>
      </>}
      <button data-editor="" style={{ ...button, background: "transparent", textDecoration: "underline" }} onClick={logout}>Вийти</button>
    </div>
    {error && <p role="alert">{error}</p>}
    {result && <section style={{ marginTop: 10, maxHeight: "40vh", overflow: "auto" }}><button data-editor="" style={button} onClick={() => { setResult(null); setDeploy(""); }}>Закрити результати</button>{result.results.map((r, i) => <p key={i}>{r.status === "applied" ? "✅" : "⚠️"} {r.old} → {r.new}{r.where?.length ? ` · ${r.where.join(", ")}` : ""}{r.translated?.length ? ` · ${r.translated.join(", ")}` : ""}{r.note ? ` · ${r.note}` : ""}</p>)}{result.issue && <p>📝 Переклад в інші мови — дорученням для Claude: <a href={result.issue} target="_blank" rel="noreferrer" style={{ color: "white" }}>{result.issue.split("/").pop()}</a></p>}{result.error && <p>{result.error}</p>}{deploy && <p>{deploy}</p>}{deploy === "✅ На сайті" && <button data-editor="" style={button} onClick={() => location.reload()}>Оновити сторінку</button>}</section>}
    {/* Portal: the panel is transformed, which would make a fixed child fill the panel, not the screen. */}
    {modal && createPortal(<div data-no-edit="" role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 100000, background: "#0009", display: "grid", placeItems: "center", padding: 16, color: "white", font: "14px Inter, system-ui, sans-serif" }}><div style={{ background: "#0a0a0a", padding: 16, width: "min(100%, 480px)", borderRadius: 8 }}><label style={{ display: "block", marginBottom: 8 }}>Що змінити в дизайні чи верстці на цій сторінці?</label><textarea value={requestText} onChange={e => setRequestText(e.target.value)} style={{ width: "100%", minHeight: 120, boxSizing: "border-box", font: "inherit" }} />{requestStatus && <p>{requestStatus}</p>}<div style={{ display: "flex", gap: 8, marginTop: 8 }}><button data-editor="" style={button} onClick={sendRequest}>Надіслати</button><button data-editor="" style={button} onClick={() => setModal(false)}>Закрити</button></div></div></div>, document.body)}
  </div>;
}
