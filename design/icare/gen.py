#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Канва нової сторінки ІКАР — /[lang]/works/icare (заміна старої works/icare).

Джерело тексту — copy.json поруч (uk — майстер, fr/en — похідні). Цей файл
лише малює: 4 артборди канви — «Що вирішити», UA, FR, EN — у тій самій касі,
що сайт і резюме (NAMU-1400 на заголовках, JetBrains Mono на мітках, Inter
17/1.72/#9a9a9a на тексті), плюс прийоми презентації «Le retour de Markevitch»:
синя колонка, нерви червоні на синьому й сині на чорному (#E8455E / #3563D8),
«ніч» навколо танцівника за вирізанками Матіса, рожеве d'Icare, лінія дат.

    python3 design/icare/gen.py            # артборди + canvas.json
    python3 design/icare/gen.py --measure  # те саме + переміряти висоти в Chrome

Картинки й шрифт живуть в asset-сховищі канви (/_blob/<id>) — карта в
assets.json; локальні копії — assets/ (для виміру висот).
Код сторінки на сайті пише окремий чат ПІСЛЯ затвердження канви Артемом;
до релізу сторінка за прапорцем у src/lib/drafts.ts.
"""
import html, json, math, pathlib, random, re, subprocess, sys, tempfile, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "canvas" / "project"
C = json.loads((HERE / "copy.json").read_text(encoding="utf-8"))
SH = C["shared"]
BLOB = json.loads((HERE / "assets.json").read_text(encoding="utf-8"))
HEIGHTS_F = HERE / "heights.json"
HEIGHTS = json.loads(HEIGHTS_F.read_text()) if HEIGHTS_F.exists() else {}

# ── Каса сайту + пітчу ────────────────────────────────────────────────────
BG, FG, BODY, META = "#0a0a0a", "#f5f5f5", "#9a9a9a", "#8a8a8a"
RED, PINK, NERVE_BLUE = "#c8102e", "#E8455E", "#3563D8"
ULTRA, PLAY, GOLD, LINE = "#12275e", "#2150B8", "#C9AE7A", "#1f1e1c"
BTN_LINE = "#8fa6e6"   # контурна синя кнопка: ≈8:1 на чорному
DISPLAY = "'NAMU-1400', Georgia, serif"
MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace"
SANS = "Inter, -apple-system, system-ui, sans-serif"
W = 1440


def e(s):
    return html.escape(str(s), quote=True)


def works(s):
    """Назви творів курсивом — без перекладу."""
    s = e(s)
    for t in ("L&#x27;Envol d&#x27;Icare", "Icare 1943", "Être et avoir été", "Jazz"):
        s = s.replace(t, f"<i>{t}</i>")
    s = re.sub(r"(власний|own|propre) Icare", r"\1 <i>Icare</i>", s)
    return s


def head(lang, title):
    return f"""<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <title>{e(title)}</title>
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet">
  <style>
    @font-face {{ font-family: "NAMU-1400"; src: url({BLOB['NAMU-1400.woff2']}) format("woff2"); font-weight: 400; font-style: normal; font-display: block; }}
    body {{ margin: 0; background: {BG}; }}
    a {{ color: {PINK}; text-decoration: none; }} a:hover {{ color: {FG}; }}
  </style>
</helmet>
"""


def foot(name):
    h = HEIGHTS.get(name, 3000)
    props = json.dumps({"$preview": {"width": W if name != "Questions" else 1000, "height": h}})
    return f"""</x-dc>
<script type="text/x-dc" data-dc-script data-props='{props}'>
class Component extends DCLogic {{
  renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
"""


# ── дрібні будівельні блоки ───────────────────────────────────────────────
def label(t, color=PINK, mb=18, size=13):
    return (f'<div style="font-family: {MONO}; font-size: {size}px; letter-spacing: 2.4px; '
            f'text-transform: uppercase; color: {color}; margin: 0 0 {mb}px 0;">{e(t)}</div>')


def mono(t, color=META, size=12, ls=1.8, mb=0):
    return (f'<div style="font-family: {MONO}; font-size: {size}px; letter-spacing: {ls}px; '
            f'text-transform: uppercase; color: {color}; margin: 0 0 {mb}px 0;">{t}</div>')


def p(t, color=BODY, size=17, lh=1.72, mb=0, width="62ch"):
    return (f'<p style="font-family: {SANS}; font-size: {size}px; line-height: {lh}; color: {color}; '
            f'margin: 0 0 {mb}px 0; max-width: {width}; text-wrap: pretty;">{works(t)}</p>')


def tag(n):
    """Позначка питання з канви: ①/② — прибирається, коли Артем відповів."""
    return (f'<span style="display: inline-block; font-family: {MONO}; font-size: 11px; letter-spacing: 1.4px; '
            f'color: {GOLD}; border: 1px dashed {GOLD}; padding: 2px 7px; margin-left: 8px; '
            f'vertical-align: 2px;">питання {n}</span>')


def tri(color="#fff", size=14):
    return (f'<svg viewBox="0 0 10 12" width="{size}" height="{size}" aria-hidden="true">'
            f'<path d="M1 1 L9 6 L1 11 Z" fill="{color}"></path></svg>')


def play(size=56):
    return (f'<span style="display: flex; align-items: center; justify-content: center; width: {size}px; '
            f'height: {size}px; border-radius: 50%; background: {PLAY}; flex: none;">{tri(size=size // 3)}</span>')


# ── нерви: пучок тонких кривих, як у пітчі (nerves.py) ──────────────────────
def nerve_h(width, color=PINK, seed=1, fade="both", opacity=0.9, height=16):
    rnd = random.Random(seed)
    stops = ([(0, 0), (0.12, 1), (0.88, 1), (1, 0)] if fade == "both"
             else [(0, 1), (0.7, 0.85), (1, 0)])
    gid = f"nh{seed}"
    paths = []
    for sw, op in ((1.1, .95), (.6, .85), (.45, .8), (.3, .7), (.3, .6), (.25, .55)):
        y = lambda: 8 + rnd.uniform(-1.8, 1.8)
        x0 = rnd.uniform(0, width * .05)
        x1 = width - rnd.uniform(0, width * .05)
        paths.append(f'<path d="M{x0:.1f} {y():.1f} C{width*rnd.uniform(.2,.4):.1f} {y():.1f} '
                     f'{width*rnd.uniform(.6,.8):.1f} {y():.1f} {x1:.1f} {y():.1f}" stroke="{color}" '
                     f'stroke-width="{sw}" opacity="{op}"></path>')
    st = "".join(f'<stop offset="{o}" stop-color="#fff" stop-opacity="{a}"></stop>' for o, a in stops)
    return (f'<svg viewBox="0 0 {width} {height}" width="{width}" height="{height}" aria-hidden="true" '
            f'style="display: block; overflow: visible; opacity: {opacity};">'
            f'<defs><linearGradient id="{gid}g" x1="0" y1="0" x2="1" y2="0">{st}</linearGradient>'
            f'<mask id="{gid}m" maskUnits="userSpaceOnUse" x="-6" y="-6" width="{width+12}" height="{height+12}">'
            f'<rect x="-6" y="-6" width="{width+12}" height="{height+12}" fill="url(#{gid}g)"></rect></mask></defs>'
            f'<g fill="none" stroke-linecap="round" mask="url(#{gid}m)">{"".join(paths)}</g></svg>')


def nerve_v(height, color=PINK, seed=1):
    rnd = random.Random(seed)
    paths = []
    for sw, op in ((1.1, .95), (.6, .85), (.45, .8), (.3, .6)):
        x = lambda: 8 + rnd.uniform(-1.6, 1.6)
        paths.append(f'<path d="M{x():.1f} 0 C{x():.1f} {height*.3:.0f} {x():.1f} {height*.7:.0f} {x():.1f} {height}" '
                     f'stroke="{color}" stroke-width="{sw}" opacity="{op}"></path>')
    return (f'<svg viewBox="0 0 16 {height}" width="16" height="{height}" aria-hidden="true" '
            f'style="position: absolute; left: -8px; top: 0; overflow: visible;">'
            f'<g fill="none" stroke-linecap="round">{"".join(paths)}</g></svg>')


def smooth_closed(pts):
    """Catmull-Rom → кубічні Безьє, замкнений контур."""
    n = len(pts)
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    return d + " Z"


def night_path(cx, cy, s):
    """«Ніч» — хвилястий вирізаний силует з пелюстками до рук і стоп (рішення 23.09)."""
    # кінцівки танцівника в координатах картинки dancer.png (340×380)
    limbs = [(110, 40), (318, 14), (16, 300), (62, 356), (270, 70)]
    c0 = (205, 190)
    pts = []
    for i in range(96):
        th = 2 * math.pi * i / 96
        r = 128 + 7 * math.sin(9 * th) + 4 * math.sin(14 * th + 1)
        for lx, ly in limbs:
            a = math.atan2(ly - c0[1], lx - c0[0])
            dist = math.hypot(lx - c0[0], ly - c0[1]) + 34
            da = math.atan2(math.sin(th - a), math.cos(th - a))
            r += max(0, dist - 128) * math.exp(-(da / 0.30) ** 2)
        x = cx + (c0[0] + r * math.cos(th) - 170) * s
        y = cy + (c0[1] + r * math.sin(th) - 190) * s
        pts.append((x, y))
    return smooth_closed(pts)


def blue_column_art(w, h, dx, dy, s, seed=7):
    """Синя колонка: танцівник у «ночі»; нерви з грудей — червоні на синьому, сині на чорному."""
    rnd = random.Random(seed)
    cx, cy = dx + 170 * s, dy + 190 * s        # центр картинки
    chest = (dx + 236 * s, dy + 172 * s)
    night = night_path(cx, cy, s)
    lines = []
    for i in range(30):
        side = rnd.random()
        # нерви не заходять на текст угорі колонки: кінці — лише боки й низ
        top = dy - 40
        if side < .4:
            ex, ey = -10, rnd.uniform(top, h)
        elif side < .75:
            ex, ey = w + 10, rnd.uniform(top, h)
        else:
            ex, ey = rnd.uniform(0, w), h + 10
        c1 = (chest[0] + rnd.uniform(-60, 60), chest[1] + rnd.uniform(20, 120))
        c2y_min = top
        c2 = (ex + rnd.uniform(-120, 120), max(c2y_min, ey + rnd.uniform(-120, 120)))
        sw = rnd.choice((.5, .6, .8, 1.0, 1.2))
        op = rnd.uniform(.45, .95)
        lines.append(f'<path d="M{chest[0]:.1f} {chest[1]:.1f} C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} '
                     f'{ex:.1f} {ey:.1f}" stroke-width="{sw}" opacity="{op:.2f}"></path>')
    L = "".join(lines)
    return (f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" '
            f'style="position: absolute; left: 0; top: 0; overflow: hidden; pointer-events: none;">'
            f'<defs><clipPath id="nightclip"><path d="{night}"></path></clipPath>'
            f'<mask id="outside" maskUnits="userSpaceOnUse" x="0" y="0" width="{w}" height="{h}">'
            f'<rect width="{w}" height="{h}" fill="#fff"></rect><path d="{night}" fill="#000"></path></mask></defs>'
            f'<g fill="none" stroke="{PINK}" stroke-linecap="round" mask="url(#outside)">{L}</g>'
            f'<path d="{night}" fill="{BG}"></path>'
            f'<g fill="none" stroke="{NERVE_BLUE}" stroke-linecap="round" clip-path="url(#nightclip)">{L}</g>'
            f'</svg>'
            f'<img src="{BLOB["dancer.png"]}" alt="" style="position: absolute; left: {dx}px; top: {dy}px; '
            f'width: {340*s:.0f}px; height: {380*s:.0f}px; pointer-events: none;">')


def black_field_nerves(w, h, seed=11):
    """Сині нерви на чорному полі ліворуч — розчиняються до лівого краю (28.09)."""
    rnd = random.Random(seed)
    L = []
    for i in range(11):
        y0 = rnd.uniform(.25, .75) * h
        y1 = rnd.uniform(0, h)
        L.append(f'<path d="M{w} {y0:.0f} C{w*.7:.0f} {rnd.uniform(0,h):.0f} {w*.35:.0f} {rnd.uniform(0,h):.0f} '
                 f'0 {y1:.0f}" stroke-width="{rnd.choice((.6,.8,1.0))}"></path>')
    return (f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" '
            f'style="position: absolute; left: 0; top: 0; pointer-events: none;">'
            f'<defs><linearGradient id="bff" x1="0" y1="0" x2="1" y2="0">'
            f'<stop offset="0" stop-color="#fff" stop-opacity="0"></stop>'
            f'<stop offset="1" stop-color="#fff" stop-opacity="0.55"></stop></linearGradient>'
            f'<mask id="bfm" maskUnits="userSpaceOnUse" x="0" y="0" width="{w}" height="{h}">'
            f'<rect width="{w}" height="{h}" fill="url(#bff)"></rect></mask></defs>'
            f'<g fill="none" stroke="{NERVE_BLUE}" stroke-linecap="round" mask="url(#bfm)">{"".join(L)}</g></svg>')


def mailto(subject):
    return f"mailto:{SH['email']}?subject=" + urllib.parse.quote(subject)


def button(text, href, solid=True):
    st = (f"background: {PLAY}; color: #fff; border: 1px solid {PLAY};" if solid
          else f"background: transparent; color: {BTN_LINE}; border: 1px solid {BTN_LINE};")
    return (f'<a href="{e(href)}" style="display: inline-flex; align-items: center; gap: 10px; min-height: 48px; '
            f'box-sizing: border-box; padding: 0 22px; font-family: {MONO}; font-size: 13px; letter-spacing: 2px; '
            f'text-transform: uppercase; border-radius: 2px; {st}">{e(text)} <span aria-hidden="true">→</span></a>')


# ── сторінка однією мовою ─────────────────────────────────────────────────
def page(loc, name):
    c = C[loc]
    lang = {"uk": "uk", "fr": "fr", "en": "en"}[loc]

    nav = (
        f'<header style="display: flex; align-items: center; justify-content: space-between; padding: 26px 64px; '
        f'border-bottom: 1px solid {LINE};">'
        f'<span style="font-family: {DISPLAY}; font-size: 22px; color: {FG}; letter-spacing: .02em;">ARTEM HORDIEIEV</span>'
        f'<nav style="display: flex; align-items: center; gap: 30px; font-family: {MONO}; font-size: 13px; '
        f'letter-spacing: 1.8px; text-transform: uppercase; color: {BODY};">'
        + "".join(f'<span>{e(t)}</span>' for t in c["nav"][:2])
        + f'<span style="background: {RED}; color: #fff; padding: 8px 14px; border-radius: 2px;">{e(c["nav"][2])}</span>'
        f'<span>{e(c["nav"][3])}</span>'
        f'<span style="color: {META};">' + " · ".join(
            f'<b style="color: {FG}; font-weight: 500;">{l}</b>' if l.lower() == ("ua" if loc == "uk" else loc) else l
            for l in ("UA", "FR", "EN")) + '</span></nav></header>'
    )

    # ── герой ──
    hero = (
        f'<section style="display: grid; grid-template-columns: minmax(0, 1fr) 520px; min-height: 760px;">'
        f'<div style="padding: 96px 64px 80px; display: flex; flex-direction: column;">'
        + label(c["hero_label"], mb=28)
        + f'<h1 style="margin: 0; font-family: {DISPLAY}; font-weight: 400; font-size: 104px; line-height: .98; '
          f'letter-spacing: .01em; text-transform: uppercase; color: {FG};">{e(c["title_a"])} '
          f'<span style="color: {PINK};">{e(c["title_b"])}</span></h1>'
        + f'<div style="margin: 26px 0 40px;">{mono(e(c["hero_meta"]), color=BODY, size=14, ls=2.2)}</div>'
        + f'<p style="font-family: {SANS}; font-size: 22px; line-height: 1.55; color: {FG}; margin: 0 0 18px; '
          f'max-width: 34em; text-wrap: pretty;">{works(c["hero_lead"])}</p>'
        + p(c["hero_lead2"], mb=40, width="38em")
        + f'<div style="display: flex; gap: 48px; margin-bottom: 48px;">'
        + "".join(f'<div>{mono(e(c[f"credit{i}_role"]), size=11, mb=6)}'
                  f'<div style="font-family: {SANS}; font-size: 18px; color: {FG};">{e(c[f"credit{i}_name"])}</div></div>'
                  for i in (1, 2))
        + '</div>'
        + f'<div style="display: flex; gap: 14px; flex-wrap: wrap;">'
        + button(c["cta_house"], "#houses") + button(c["cta_patron"], "#patrons", solid=False)
        + '</div></div>'
        # права колонка — сама плита Matisse від краю до краю, без полів і ефектів (раунд 4)
        + f'<div style="position: relative; overflow: hidden;">'
        + f'<img src="{BLOB["matisse-plate.webp"]}" alt="Henri Matisse, Icare, Jazz, 1947" '
          f'style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 53% 50%; display: block;">'
        + f'<div style="position: absolute; left: 24px; bottom: 18px;">'
        + mono(e(c["matisse_caption"]), color="#fff", size=11, ls=1.6) + '</div></div>'
        + '</section>'
    )

    # ── місія і лінія дат ──
    eras = [
        ("1929–30", "tl-1929.webp", "opacity: .26; filter: grayscale(1) contrast(1.1);", c["era_1929"], "card"),
        ("1932", "tl-1932.webp", "opacity: .42; filter: invert(1) grayscale(1) contrast(1.15);", c["era_1932"], "card"),
        # 1933: власне фото (Mozart 25, стрибок) замість Roger Pic — рішення Артема 18.11
        ("1933", "tl-1933-mozart25.webp", "opacity: .34; filter: grayscale(1) contrast(1.1);", c["era_1933"], "card"),
        ("2026", None, "", c["era_2026"], "blue"),
        (c["era_2029_year"], None, "", c["era_2029"], "anchor"),
    ]
    qmark = ('<svg viewBox="0 0 540 720" width="170" height="227" aria-hidden="true" '
             'style="position: absolute; right: -18px; bottom: -30px; display: block;">'
             f'<g transform="translate(0 720) scale(1 -1)" fill="{PINK}"><path d="M186 230Q186 276 204.5 307.0Q223 338 249.0 356.0Q275 374 318 397Q370 423 396.0 446.5Q422 470 422 511Q422 566 376.0 590.0Q330 614 269 614Q211 614 167.5 588.5Q124 563 112 510H10Q19 574 57.5 619.0Q96 664 153.0 687.0Q210 710 274 710Q336 710 392.5 689.0Q449 668 485.5 624.5Q522 581 522 518Q522 467 502.0 432.5Q482 398 454.0 378.0Q426 358 381 335Q346 317 327.5 305.0Q309 293 296.5 275.0Q284 257 284 233V210H186Z"></path><path d="M292 110V0H182V110Z"></path></g></svg>')
    cards = []
    for y, img, flt, txt, kind in eras:
        bg = {"blue": ULTRA, "anchor": "#141310"}.get(kind, "#111010")
        bd = {"blue": ULTRA, "anchor": GOLD}.get(kind, LINE)
        ycol = {"blue": PINK, "anchor": GOLD}.get(kind, "#d8d3cc")
        tcol = {"blue": FG, "anchor": "#ede9e3"}.get(kind, "#b8b2aa")
        dot = {"blue": PINK, "anchor": GOLD}.get(kind, "#d8d3cc")
        im = (f'<img src="{BLOB[img]}" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; '
              f'object-fit: cover; {flt}">') if img else ""
        cards.append(
            f'<div style="position: relative; height: 330px; overflow: hidden; background: {bg}; border: 1px solid {bd};">'
            + im + (qmark if kind == "blue" else "")
            + f'<div style="position: absolute; left: 22px; top: 18px; font-family: {DISPLAY}; font-size: 36px; color: {ycol};">{y}</div>'
            + f'<span style="position: absolute; left: 22px; top: 76px; width: 15px; height: 15px; border-radius: 50%; background: {dot};"></span>'
            + f'<p style="position: absolute; left: 22px; right: 22px; top: 112px; margin: 0; font-family: {SANS}; '
              f'font-size: 16px; line-height: 1.5; color: {tcol}; text-wrap: pretty;">{works(txt)}</p></div>')
    mission = (
        f'<section style="padding: 112px 64px 96px; border-top: 1px solid {LINE};">'
        + f'<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 30px;">'
        + label(c["mission_label"], mb=0) + nerve_h(1100, seed=3) + '</div>'
        + f'<h2 style="margin: 0; font-family: {DISPLAY}; font-weight: 400; font-size: 58px; line-height: 1.04; '
          f'letter-spacing: .012em; text-transform: uppercase; color: {FG}; max-width: 16em; margin-bottom: 48px;">{e(c["mission_title_a"])} '
          f'<span style="color: {PINK};">{e(c["mission_title_b"])}</span></h2>'
        + f'<div style="position: relative;">'
        + f'<div style="position: absolute; left: 0; right: 0; top: 75px; z-index: 2; pointer-events: none;">{nerve_h(1312, seed=4)}</div>'
        + f'<div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px;">{"".join(cards)}</div></div>'
        # цитата Лифаря — дослівно, французькою
        + f'<figure style="margin: 72px 0 0; padding: 0 0 0 40px; position: relative; max-width: 980px;">'
        + nerve_v(150, color=PINK, seed=5)
        + f'<blockquote lang="fr" style="margin: 0; font-family: {SANS}; font-size: 24px; line-height: 1.5; '
          f'font-style: italic; color: {FG}; text-wrap: pretty;">{e(SH["lifar_quote"])}</blockquote>'
        + f'<figcaption style="margin-top: 16px;">{mono(works(c["quote_cite"]), color=META, size=12, ls=1.4)}</figcaption></figure>'
        + '</section>'
    )

    # ── балет: чорне поле + синя колонка ──
    col_w, col_h = 560, 1080
    bh = SH["bh_quote"]
    bh_html = e(bh).replace("dance premiere", f'<span style="color: {PINK};">dance premiere</span>')
    ballet = (
        f'<section style="display: grid; grid-template-columns: minmax(0, 1fr) {col_w}px; border-top: 1px solid {LINE};">'
        f'<div style="position: relative; padding: 112px 64px 96px; overflow: hidden;">'
        + black_field_nerves(W - col_w, col_h)
        + f'<div style="position: relative;">'
        + label(c["ballet_label"], mb=34)
        + f'<div style="font-family: {DISPLAY}; font-size: 76px; line-height: 1; text-transform: uppercase; color: {FG}; margin-bottom: 30px;">'
          f'{e(c["title_a"])} <span style="color: {PINK};">{e(c["title_b"])}</span></div>'
        + f'<h2 style="margin: 0 0 52px; font-family: {DISPLAY}; font-weight: 400; font-size: 38px; line-height: 1.1; '
          f'text-transform: uppercase; color: {FG}; max-width: 15em;">{e(c["ballet_title_a"])} '
          f'<span style="color: {PINK};">{e(c["ballet_title_b"])}</span></h2>'
        + p(c["ballet_p1"], color="#d8d3cc", size=19, lh=1.65, mb=24, width="36em")
        + p(c["ballet_p2"], color="#d8d3cc", size=19, lh=1.65, mb=96, width="36em")
        + f'<div style="font-family: {DISPLAY}; font-size: 34px; line-height: 1.15; text-transform: uppercase; color: {FG}; max-width: 14em;">{bh_html}</div>'
        + f'<div style="margin-top: 18px;">{mono(e(c["bh_cite"]), color=META, size=12, ls=2.6)}</div>'
        + '</div></div>'
        # синя колонка
        + f'<div style="position: relative; background: {ULTRA}; min-height: {col_h}px; overflow: hidden;">'
        + blue_column_art(col_w, col_h, dx=110, dy=575, s=1.0)
        + f'<div style="position: relative; padding: 96px 44px 0;">'
        + mono(e(c["score_label"]), color="#ede9e3", size=12, ls=2.2, mb=18)
        + f'<a href="{e(SH["yt_chamber"])}" style="position: relative; display: block; height: 266px; overflow: hidden; '
          f'background: #000 url({BLOB["ensemble.webp"]}) center / cover no-repeat;">'
        + f'<span style="position: absolute; left: 14px; top: 14px; background: {PLAY}; color: #fff; font-family: {MONO}; '
          f'font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; padding: 5px 9px;">{e(c["score_video"])}</span>'
        + f'<span style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">{play(64)}</span></a>'
        + f'<div style="display: grid; grid-template-columns: 130px 1fr; row-gap: 10px; margin: 26px 0 0; font-family: {SANS}; font-size: 16px; color: #fff;">'
        + "".join(f'<span style="font-family: {MONO}; font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; color: #9fb0e0; padding-top: 3px;">{e(c[k+"_k"])}</span>'
                  f'<span>{works(c[k+"_v"])}</span>' for k in ("score_composer", "score_versions", "score_duration"))
        + '</div>'
        + '</div>'
        + f'<div style="position: absolute; left: 44px; right: 44px; bottom: 44px;">'
        + f'<div style="margin-bottom: 18px;">{nerve_h(472, seed=9, fade="right")}</div>'
        + f'<a href="{e(SH["yt_orchestra"])}" style="display: flex; align-items: center; gap: 18px; color: #fff;">{play(48)}'
        + f'<span>{mono(works(c["score_orch_k"]), color="#c9d3f0", size=11, ls=1.8, mb=4)}'
        + f'<span style="font-family: {SANS}; font-size: 15px; line-height: 1.45; color: #fff;">{e(c["score_orch_v"])}</span></span></a>'
        + '</div></div></section>'
    )

    # ── команда ──
    stats = "".join(
        f'<div style="padding: 26px 0 0; border-top: 1px solid {LINE};">'
        f'<div style="font-family: {DISPLAY}; font-size: 54px; line-height: 1; color: {FG};">{e(c[f"stat{i}_n"])}</div>'
        f'<div style="font-family: {SANS}; font-size: 15px; line-height: 1.5; color: {BODY}; margin-top: 10px; max-width: 24em;">{e(c[f"stat{i}_t"])}</div></div>'
        for i in (1, 2, 3))
    team = (
        f'<section style="padding: 112px 64px 96px; border-top: 1px solid {LINE};">'
        + label(c["team_label"], mb=24)
        + f'<h2 style="margin: 0 0 48px; font-family: {DISPLAY}; font-weight: 400; font-size: 58px; line-height: 1.04; '
          f'text-transform: uppercase; color: {FG};">{e(c["team_title"])}</h2>'
        # два короткі абзаци поруч, під ними — три цифри в ряд, потім посилання
        + f'<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 72px; margin-bottom: 56px;">'
        + p(c["team_p1"], width="none") + p(c["team_p2"], width="none") + '</div>'
        + f'<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 48px; margin-bottom: 56px;">{stats}</div>'
        + f'<div style="display: flex; justify-content: center; align-items: stretch; gap: 32px; flex-wrap: wrap; margin-top: 8px;">'
        + f'<a href="https://www.hordieiev.art/{"uk" if loc == "uk" else loc}/works/mozart25" style="display: flex; align-items: center; gap: 24px; '
          f'min-height: 112px; min-width: 520px; box-sizing: border-box; padding: 20px 40px 20px 24px; border: 1px solid {LINE}; background: #111010;">{play(64)}'
        + f'<span>{mono(e(c["link_mozart_k"]), color="#8fa6e6", size=14, ls=2, mb=8)}'
        + f'<span style="font-family: {SANS}; font-size: 24px; line-height: 1.3; color: {FG};">{works(c["link_mozart_v"])}</span></span></a>'
        + f'<a href="https://www.hordieiev.art/{"uk" if loc == "uk" else loc}" style="display: flex; align-items: center; justify-content: center; min-height: 112px; min-width: 440px; '
          f'box-sizing: border-box; padding: 0 48px; background: {PLAY}; color: #fff; font-family: {MONO}; font-size: 18px; '
          f'letter-spacing: 2.2px; text-transform: uppercase;">{e(c["link_all"])} ↗</a>'
        + '</div></section>'
    )

    # ── два адресати ──
    def offer(prefix, anchor, solid, nerve_seed):
        rows = "".join(
            f'<div style="padding: 18px 0; border-top: 1px solid #262522;">'
            + mono(e(c[f"{prefix}_k{i}"]), color=PINK if solid else GOLD, size=12, ls=1.8, mb=8)
            + f'<div style="font-family: {SANS}; font-size: 16px; line-height: 1.62; color: {BODY}; text-wrap: pretty;">{works(c[f"{prefix}_v{i}"])}</div></div>'
            for i in (1, 2, 3) if f"{prefix}_k{i}" in c)
        return (
            f'<div id="{anchor}" style="position: relative; background: #111010; border: 1px solid {LINE}; padding: 40px 40px 44px; '
            f'display: flex; flex-direction: column;">'
            + f'<div style="position: absolute; left: 40px; right: 40px; top: -1px;">{nerve_h(560, color=PINK if solid else NERVE_BLUE, seed=nerve_seed)}</div>'
            + label(c[f"{prefix}_label"], color=PINK if solid else GOLD, mb=20, size=12)
            + f'<h3 style="margin: 0 0 22px; font-family: {DISPLAY}; font-weight: 400; font-size: 36px; line-height: 1.12; '
              f'text-transform: uppercase; color: {FG};">{e(c[f"{prefix}_title"])}</h3>'
            + f'<p style="margin: 0 0 26px; font-family: {SANS}; font-size: 18px; line-height: 1.6; color: {FG}; text-wrap: pretty;">{works(c[f"{prefix}_p"])}</p>'
            + rows
            + f'<div style="flex-grow: 1; min-height: 32px;"></div>'
            + f'<div>{button(c[f"{prefix}_cta"], mailto("L’Envol d’Icare — " + c[f"{prefix}_cta"]), solid=solid)}</div></div>')

    offers = (
        f'<section style="padding: 112px 64px 96px; border-top: 1px solid {LINE};">'
        + f'<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;">'
        + offer("house", "houses", True, 12) + offer("patron", "patrons", False, 13)
        + '</div></section>'
    )

    # ── контакт і підвал ──
    contact = (
        f'<footer style="padding: 88px 64px 56px; border-top: 1px solid {LINE};">'
        + label(c["contact_label"], mb=26)
        + f'<div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 18px 48px; margin-bottom: 22px;">'
        + f'<a href="mailto:{SH["email"]}" style="font-family: {DISPLAY}; font-size: 40px; color: {FG};">{SH["email"]}</a>'
        + f'<a href="tel:{SH["phone"].replace(" ", "")}" style="font-family: {SANS}; font-size: 20px; color: {FG};">{SH["phone"]}</a>'
        + f'<a href="{SH["whatsapp"]}" style="font-family: {MONO}; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: {PINK};">WhatsApp ↗</a>'
        + '</div>'
        + p(c["contact_names"], color=BODY, size=15, mb=56, width="none")
        + f'<div style="border-top: 1px solid {LINE}; padding-top: 18px; font-family: {MONO}; font-size: 11px; '
          f'letter-spacing: .6px; line-height: 1.6; color: #6f6a64;">{e(c["credits_label"])}: {works(SH["credits"])}</div>'
        + '</footer>'
    )

    body = (f'<main style="width: {W}px; background: {BG}; color: {FG}; font-family: {SANS}; '
            f'-webkit-font-smoothing: antialiased;">' + nav + hero + mission + ballet + team + offers + contact + '</main>')
    return head(lang, f"L'Envol d'Icare — {loc.upper()}") + body + foot(name)


# ── артборд «Що вирішити» ─────────────────────────────────────────────────
def questions():
    Q = C["questions"]

    def item(n, t, b, answer=None):
        tail = (f'<p style="margin: 12px 0 0; font-family: {SANS}; font-size: 16px; line-height: 1.62; color: {PINK};">Ваша відповідь: ( )</p>'
                if answer is None else "")
        return (f'<div style="padding: 24px 0; border-top: 1px solid {LINE};">'
                + mono(n, color=GOLD if answer is None else META, size=16, ls=0, mb=10)
                + f'<h3 style="margin: 0 0 10px; font-family: {DISPLAY}; font-weight: 400; font-size: 26px; line-height: 1.2; '
                  f'color: {FG if answer is None else "#bdb8b0"};">{e(t)}</h3>'
                + f'<p style="margin: 0; font-family: {SANS}; font-size: 16px; line-height: 1.62; color: {BODY}; max-width: 72ch;">{e(b)}</p>'
                + tail + '</div>')

    body = (
        f'<main style="width: 1000px; box-sizing: border-box; padding: 64px; background: {BG}; color: {FG}; font-family: {SANS};">'
        + label("Перед кодом · чернетка за прапорцем drafts.ts", mb=18)
        + f'<h1 style="margin: 0 0 20px; font-family: {DISPLAY}; font-weight: 400; font-size: 44px; line-height: 1.05; color: {FG};">Що вирішити на цій канві</h1>'
        + p(C["questions"]["intro"],
            mb=32, width="72ch")
        + ((label(f"Відкриті · {len(Q['open'])}", mb=14)
            + "".join(item(n, t, b) for n, t, b in Q["open"])
            + f'<div style="height: 40px;"></div>') if Q["open"] else "")
        + label(f"Закрито · {len(Q['closed'])} з 6 · ваші відповіді", color=META, mb=14)
        + "".join(item(n, t, b, answer=True) for n, t, b in Q["closed"])
        + '</main>'
    )
    return head("uk", "Що вирішити") + body + foot("Questions")


BOARDS = {
    "Questions": questions,
    "Main": lambda: page("uk", "Main"),
    "French": lambda: page("fr", "French"),
    "English": lambda: page("en", "English"),
}
TITLES = {"Questions": "Що вирішити", "Main": "UA · /uk/works/icare · правити тут",
          "French": "FR · /fr/works/icare", "English": "EN · /en/works/icare"}


def write_all():
    OUT.mkdir(parents=True, exist_ok=True)
    for n, fn in BOARDS.items():
        (OUT / f"{n}.dc.html").write_text(fn(), encoding="utf-8")
    x, boards = 0, {}
    for n in ("Questions", "Main", "French", "English"):
        w = 1000 if n == "Questions" else W
        boards[f"{n}.dc.html"] = {"x": x, "y": 0, "w": w, "h": HEIGHTS.get(n, 3000), "title": TITLES[n]}
        x += w + 120
    idx_f = OUT / "canvas.json"
    idx = json.loads(idx_f.read_text()) if idx_f.exists() else {
        "v": 3, "createdOnFiles": {"v": 1, "at": "2026-11-18T12:00:00Z"}}
    idx.update({
        "title": "ІКАР — сторінка сайту",
        "launch": {"view": "canvas"},
        "pages": [],
        "boards": boards,
        "order": ["Main.dc.html", "Questions.dc.html", "French.dc.html", "English.dc.html"],
        "notes": {
            "brief": {"x": 0, "y": -300, "w": 900, "fill": "orange",
                      "text": "Чернетка нової сторінки ІКАР (/works/icare) — для оперно-балетних домів, меценатів і фондів по всій Франції. "
                              "UA — головна: правте її, у дужках. FR і EN перезбираються з української. "
                              "До 30.11 сторінка не публікується — потім окремим рішенням."},
        },
        "designSystems": idx.get("designSystems", []),
    })
    idx_f.write_text(json.dumps(idx, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def measure():
    """Висоти рамок — у Chrome, з локальними копіями картинок і шрифту (+2% запасу)."""
    inv = {v: (HERE / "assets" / k).as_uri() for k, v in BLOB.items()}
    tmp = pathlib.Path(tempfile.mkdtemp())
    for n in BOARDS:
        s = (OUT / f"{n}.dc.html").read_text(encoding="utf-8")
        helmet = s.split("<helmet>", 1)[1].split("</helmet>", 1)[0]
        body = s.split("</helmet>", 1)[1].split("</x-dc>", 1)[0]
        doc = f"<!doctype html><html><head><meta charset='utf-8'>{helmet}</head><body>{body}" \
              "<script>window.addEventListener('load',()=>document.fonts.ready.then(()=>{" \
              "const p=document.createElement('pre');p.id='h';p.textContent=document.body.firstElementChild.getBoundingClientRect().height;" \
              "document.body.appendChild(p)}))</script></body></html>"
        for k, v in inv.items():
            doc = doc.replace(k, v)
        f = tmp / f"{n}.html"
        f.write_text(doc, encoding="utf-8")
        w = 1000 if n == "Questions" else W
        dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
                              "--virtual-time-budget=10000", f"--window-size={w},2000", "--dump-dom", f.as_uri()],
                             capture_output=True, text=True, check=True).stdout
        h = float(re.search(r'<pre id="h">([\d.]+)</pre>', dom).group(1))
        HEIGHTS[n] = int(math.ceil(h)) + 8
        print(n, round(h), "→", HEIGHTS[n])
    HEIGHTS_F.write_text(json.dumps(HEIGHTS, indent=1) + "\n")


if __name__ == "__main__":
    write_all()
    if "--measure" in sys.argv:
        measure()
        write_all()
    print("артборди:", ", ".join(BOARDS), "→", OUT)
