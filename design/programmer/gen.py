#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Канвас «Замовити» — чернетка розділу /[lang]/programmer.

Розділ написаний кодом 04.09.2026 і три дні стояв у продакшені, не пройшовши
канваса. 14.09.2026 його прибрано за прапорцем (src/lib/drafts.ts), а цей
канвас — місце, де його правлять перед релізом.

Відмінність від design/cv і design/cohorts: тексту в цьому файлі НЕМАЄ.
Артборди малюються з того самого src/lib/offers-data.ts, який рендерить
сайт, — щоб канвас і сторінка не розійшлись. Тому правки з канваса
вносяться не сюди, а в offers-data.ts (і дзеркально в
CHORÉGRAPHE/03 Товари/fiches.json, звідки друкуються PDF).

    python3 design/programmer/gen.py
"""
import base64, html, json, pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]

# ── Джерело тексту: той самий модуль, що й у сайту ────────────────────────
# Node 22+ сам знімає типи, а `import type` з offers-data.ts стирається,
# тому модуль вантажиться без збирача.
DUMP = (
    "import('./src/lib/offers-data.ts')"
    ".then(m=>process.stdout.write(JSON.stringify({offers:m.offers,proCopy:m.proCopy})))"
)
DATA = json.loads(
    subprocess.run(
        ["node", "--no-warnings", "-e", DUMP],
        cwd=ROOT, capture_output=True, text=True, check=True,
    ).stdout
)
OFFERS, COPY = DATA["offers"], DATA["proCopy"]

# ── Каса сайту ────────────────────────────────────────────────────────────
BG, FG, BODY, META = "#0a0a0a", "#f5f5f5", "#9a9a9a", "#616161"
RED, LINE = "#c8102e", "#1a1a1a"
DISPLAY = "'NAMU-1400', Georgia, serif"
MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace"
SANS = "Inter, -apple-system, system-ui, sans-serif"

NAMU = base64.b64encode(
    (ROOT / "public" / "fonts" / "NAMU-1400.woff2").read_bytes()
).decode()

HEAD = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    @font-face { font-family: "NAMU-1400"; font-weight: normal; font-style: normal;
      src: url(data:font/woff2;base64,%s) format("woff2"); }
    body { margin: 0; background: %s; color: %s;
           font-family: Inter, -apple-system, system-ui, sans-serif;
           -webkit-font-smoothing: antialiased; }
  </style>
</helmet>
""" % (NAMU, BG, FG)

FOOT = "</x-dc>\n</body>\n</html>\n"


def e(s):
    return html.escape(str(s))


def label(t, mb=20, color=RED):
    return (f'<div style="font-family:{MONO};font-size:11px;letter-spacing:2.6px;'
            f'text-transform:uppercase;color:{color};margin:0 0 {mb}px 0;">{e(t)}</div>')


def disp(t, size=46, mb=0, color=FG, lh=1.05):
    return (f'<div style="font-family:{DISPLAY};font-size:{size}px;line-height:{lh};'
            f'color:{color};margin:0 0 {mb}px 0;">{e(t)}</div>')


def lead(t, mb=0, width="46ch"):
    return (f'<div style="font-family:{SANS};font-size:19px;line-height:1.55;'
            f'color:{FG};margin:0 0 {mb}px 0;max-width:{width};'
            f'text-wrap:pretty;">{e(t)}</div>')


def par(t, size=16, mb=0, width="62ch", color=BODY):
    return (f'<div style="font-family:{SANS};font-size:{size}px;line-height:1.62;'
            f'color:{color};margin:0 0 {mb}px 0;max-width:{width};'
            f'text-wrap:pretty;">{e(t)}</div>')


def mono(t, size=11, ls=1.6, color=META, mb=0):
    return (f'<div style="font-family:{MONO};font-size:{size}px;letter-spacing:{ls}px;'
            f'text-transform:uppercase;color:{color};margin:0 0 {mb}px 0;">{e(t)}</div>')


def rule(m=0):
    return f'<div style="height:1px;background:{LINE};margin:{m}px 0;"></div>'


def avail(o, c):
    return {"now": c["availNow"], "season": c["availSeason"]}.get(
        o["availability"], c["availDev"]
    )


def offer_block(o, loc, c):
    tech = "".join(
        f'<li style="font-family:{SANS};font-size:15px;line-height:1.55;color:{BODY};'
        f'margin:0 0 6px 0;list-style:none;">{e(t)}</li>'
        for t in o["technical"][loc]
    )
    left = (
        f'<div style="display:flex;gap:16px;align-items:baseline;margin-bottom:12px;">'
        f'<span style="font-family:{MONO};font-size:13px;letter-spacing:2.4px;color:{RED};">{e(o["code"])}</span>'
        f'<span style="font-family:{MONO};font-size:12px;letter-spacing:1.8px;'
        f'text-transform:uppercase;color:{META};">{e(o["genre"][loc])}</span></div>'
        + disp(o["title"][loc], size=30, mb=16, lh=1.15)
        + lead(o["lede"][loc], mb=16, width="52ch")
        + par(o["body"][loc], mb=24)
        + f'<div style="font-family:{SANS};font-size:15px;line-height:1.6;color:{BODY};max-width:62ch;">'
        f'<span style="font-family:{MONO};font-size:11px;letter-spacing:1.6px;'
        f'text-transform:uppercase;color:{META};margin-right:8px;">{e(c["buyerLabel"])}</span>'
        f'{e(o["buyer"][loc])}</div>'
    )
    right = (
        mono(c["durationLabel"], mb=4)
        + par(o["duration"][loc], size=15, mb=18, width="none")
        + mono(c["castLabel"], mb=4)
        + par(o["cast"][loc], size=15, mb=18, width="none")
        + mono(c["techLabel"], mb=6)
        + f'<ul style="margin:0;padding:0;">{tech}</ul>'
        + f'<div style="font-family:{MONO};font-size:11px;letter-spacing:1.6px;'
        f'text-transform:uppercase;color:{RED};margin:24px 0 14px 0;">{e(avail(o, c))}</div>'
        + f'<div style="display:inline-block;font-family:{MONO};font-size:11px;'
        f'letter-spacing:2px;text-transform:uppercase;color:{RED};'
        f'border:1px solid {RED};padding:9px 16px;border-radius:2px;">{e(c["ficheLabel"])}</div>'
    )
    return (
        '<section style="display:grid;grid-template-columns:1fr 300px;gap:48px;padding:48px 0;">'
        f'<div>{left}</div>'
        f'<aside style="border-left:1px solid {LINE};padding-left:32px;">{right}</aside>'
        "</section>" + rule()
    )


def page(loc):
    c = COPY[loc]
    conds = "".join(
        f'<li style="font-family:{SANS};font-size:16px;line-height:1.62;color:{BODY};'
        f'margin:0 0 14px 0;list-style:none;">{e(c[k])}</li>'
        for k in ("cond1", "cond2", "cond3", "cond4")
    )
    body = (
        '<header style="padding-bottom:48px;">'
        + label(c["label"], mb=18)
        + disp(c["title"], size=46, mb=22)
        + lead(c["lede"], mb=16)
        + par(c["intro"])
        + "</header>"
        + rule()
        + "".join(offer_block(o, loc, c) for o in OFFERS)
        + '<section style="padding:48px 0;">'
        + label(c["condTitle"], mb=22)
        + f'<ul style="margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;'
        f'column-gap:48px;max-width:80ch;">{conds}</ul></section>'
        + rule()
        + '<section style="display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:48px 0;">'
        + "<div>" + label(c["mentionsTitle"], mb=20) + par(c["mentions"], size=15, width="46ch")
        + f'<div style="display:flex;gap:24px;margin-top:24px;">'
        f'{mono(c["cvLink"], ls=2, color=BODY)}{mono(c["worksLink"], ls=2, color=BODY)}</div></div>'
        + "<div>" + label(c["contactTitle"], mb=20) + par(c["contactLede"], size=15, width="38ch")
        + lead("art_om@me.com", mb=8) + par("+33 7 43 79 18 41", size=15, width="none")
        + "</div></section>"
    )
    return HEAD + f'<div style="padding:64px 64px 80px;max-width:1100px;margin:0 auto;">{body}</div>' + FOOT


# ── Артборд відкритих питань ──────────────────────────────────────────────
QUESTIONS = [
    ("Ціна", "На сторінці ціни немає навмисно (CHORÉGRAPHE §7.2). Умови — формулою "
             "« Quel format de rémunération pratiquez-vous ? ». Підтвердити, що так і лишається."),
    ("Назва компанії", "У «Реквізитах» стоїть «Les Oiseaux des Journaux, dite Newspaper Birds» "
                       "і рядок про SIRET та licence. CHORÉGRAPHE §8 від 13.09.2026 каже: у "
                       "французьких друкованих матеріалах формула «dite Newspaper Birds» і рядок "
                       "про SIRET НЕ друкуються. Вирішити, чи це правило поширюється на сайт, "
                       "і звірити саму назву: §8 пише «Les Oiseaux de Journal»."),
    ("Когорти", "design/cohorts уже описує поділ відвідувачів на п'ять когорт і матрицю файлів. "
                "Цей розділ зроблений за товарами S1–S4, а не за когортами. Одна з двох "
                "конструкцій має поступитись — вирішити, яка."),
    ("Пункт у навігації", "Як він називається трьома мовами: Programmer / Programme / Замовити. "
                          "І чи видно його на телефоні (зараз ховався від 640 px, як «Роботи»)."),
    ("Контакт", "Зараз це пошта і WhatsApp. У чернетці когорт передбачена форма, яка створює "
                "рядок у CRM зі статусом «до перевірки». Вирішити, що з цього в релізі."),
    ("Картки PDF", "Чотири fiches у public/fiches/ згенеровані fiches.py 04.09.2026. Після "
                   "будь-якої правки тексту їх треба передрукувати — інакше сторінка й PDF розійдуться."),
]


def questions_board():
    items = "".join(
        f'<div style="padding:22px 0;border-top:1px solid {LINE};">'
        + mono(f"{i + 1:02d}", ls=2, color=RED, mb=8)
        + disp(t, size=22, mb=10, lh=1.2)
        + par(b, size=15, width="70ch")
        + "</div>"
        for i, (t, b) in enumerate(QUESTIONS)
    )
    body = (
        label("Перед релізом", mb=18)
        + disp("Що вирішити на цьому канвасі", size=38, mb=20)
        + par(
            "Розділ уже написаний кодом і вміє показуватись — питання не в тому, чи він "
            "працює, а в тому, чи він каже те, що треба. Правки пиши просто тут, у дужках "
            "поряд із текстом, як на канвасі резюме.",
            mb=28, width="70ch",
        )
        + items
    )
    return HEAD + f'<div style="padding:64px;max-width:1000px;">{body}</div>' + FOOT


BOARDS = {
    # Точка входу канваса — французька сторінка: це та мова, якою розділ читають.
    "Main.dc.html": page("fr"),
    "English.dc.html": page("en"),
    "Ukrainian.dc.html": page("uk"),
    "Questions.dc.html": questions_board(),
}

# Висоти рамок виміряні в браузері (scrollHeight + ~6%), не вгадані:
# низ артборда, що не влазить у рамку, canvas мовчки обрізає — див.
# «Пастка: висота рамки артборда» в design/cv/README.md.
CANVAS = {
    "pages": [{"id": "page-1", "name": "Замовити"}],
    "artboards": [
        {"file": "Questions.dc.html", "page": "page-1", "x": 0, "y": 0, "w": 1000, "h": 1400, "title": "Що вирішити"},
        {"file": "Main.dc.html", "page": "page-1", "x": 1120, "y": 0, "w": 1100, "h": 3350, "title": "/fr/programmer"},
        {"file": "English.dc.html", "page": "page-1", "x": 2340, "y": 0, "w": 1100, "h": 3270, "title": "/en/programmer"},
        {"file": "Ukrainian.dc.html", "page": "page-1", "x": 3560, "y": 0, "w": 1100, "h": 3260, "title": "/uk/programmer"},
    ],
    "annotations": [
        {"id": "note-brief", "page": "page-1", "x": 0, "y": -170, "w": 700,
         "text": "Чернетка. У продакшені розділу немає: маршрут віддає 404, пункт у навігації "
                 "не рендериться (src/lib/drafts.ts).\nТри артборди — те, що побачить продюсер, "
                 "слово в слово з коду сайту. Правки пиши в дужках поряд із текстом."},
    ],
    "launch": {"view": "canvas", "page": "page-1"},
}

if __name__ == "__main__":
    for name, markup in BOARDS.items():
        (HERE / name).write_text(markup, encoding="utf-8")
    (HERE / "canvas.json").write_text(
        json.dumps(CANVAS, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("артборди:", ", ".join(BOARDS))
