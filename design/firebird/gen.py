#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Канва нової сторінки ЖАР-ПТИЦЯ — /[lang]/works/firebird (заміна зовнішньої surge).

Джерело тексту — copy.json поруч (uk — майстер, fr/en — похідні). Цей файл
лише малює: 4 артборди канви — «Що вирішити», UA, FR, EN — у касі сайту
(NAMU-1400 на заголовках, JetBrains Mono на мітках, Inter на тексті) і у
візуальній мові ролика NYCB «Firebird» (Параджанов, «Колір граната»):
вапняна стіна, фронтальні живі картини (арки в ряд), кадр 4:3 у чорній
рамці, тіньовий театр на бурштині, гранат і золото, приколоті аркуші
партитури. Палітра — лише виміряна з кадрів (розвідка 18.11.2026, розд. 4);
червоний сайту #C8102E — тільки на клікабельному. Кадрів NYCB тут немає.

    python3 design/firebird/gen.py            # артборди + canvas.json (з виміром у Chrome)

Кожен артборд після верстки потоком переводиться в Chrome у ВІЛЬНІ
КООРДИНАТИ (стандарт 4-СЕКСТ): кожен блок, фраза, картинка й лінія —
position: absolute у власних координатах, на всіх рівнях (картка рухається
цілою, її частини — окремо). Висоти рамок міряються там само.

Картинки й шрифт живуть в asset-сховищі канви (/_blob/<id>) — карта в
assets.json; локальні копії — assets/. Код сторінки на сайті пише окремий чат
ПІСЛЯ затвердження канви Артемом; до релізу — прапорець у src/lib/drafts.ts.
"""
import html, json, math, pathlib, random, re, subprocess, sys, tempfile, urllib.parse

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "canvas" / "project"
C = json.loads((HERE / "copy.json").read_text(encoding="utf-8"))
SH = C["shared"]
BLOB = json.loads((HERE / "assets.json").read_text(encoding="utf-8"))
HEIGHTS_F = HERE / "heights.json"
HEIGHTS = json.loads(HEIGHTS_F.read_text()) if HEIGHTS_F.exists() else {}

# ── Палітра ролика NYCB (виміряна, розвідка розд. 4) ──────────────────────
LIME, LIME_D, LIME_L = "#C1CFB2", "#ABB9A2", "#E5EDDE"   # вапно, стіна
CREAM = "#F7EADF"                                        # теплий крем
GRANAT, GRANAT_D = "#7F281E", "#651D0F"                  # гранат, глибокий червоний
AMBER, AMBER_D = "#BC7F34", "#9A5723"                    # бурштин (тіньовий театр)
GOLD, GOLD_D = "#D7A950", "#C4842D"                      # золото
SCORE = "#857B57"                                        # аркуш партитури
BROCADE = "#61716E"                                      # синя парча
FRAME = "#000000"                                        # рамка
INK = "rgba(0, 0, 0, .82)"                               # текст на вапні
CREAM_T = "rgba(247, 234, 223, .76)"                     # текст на чорному
# каса сайту — тільки клікабельне
RED, PINK, PLAY = "#C8102E", "#E8455E", "#2150B8"
DISPLAY = "'NAMU-1400', Georgia, serif"
MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace"
SANS = "Inter, -apple-system, system-ui, sans-serif"
W = 1440
PAD = 80
MW = 390      # телефон: ширина артборда
MP = 16       # поля телефона: кадри й картки на всю ширину мінус 16 px
MC = MW - 2 * MP


def e(s):
    return html.escape(str(s), quote=True)


def works(s):
    """Назви творів курсивом — без перекладу."""
    s = e(s)
    for t in ("Icare →",):
        s = s.replace(t, f'<a href="https://www.hordieiev.art/works/icare" style="color: {PINK};">{t}</a>')
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400&amp;family=JetBrains+Mono:wght@400;500;700&amp;display=swap" rel="stylesheet">
  <style>
    @font-face {{ font-family: "NAMU-1400"; src: url({BLOB['NAMU-1400.woff2']}) format("woff2"); font-weight: 400; font-style: normal; font-display: block; }}
    body {{ margin: 0; background: {FRAME}; }}
    a {{ color: {RED}; text-decoration: none; }} a:hover {{ color: {GRANAT_D}; }}
  </style>
</helmet>
"""


def board_w(name):
    return 1000 if name == "Questions" else MW if name.startswith("Mobile") else W


def foot(name):
    h = HEIGHTS.get(name, 3000)
    props = json.dumps({"$preview": {"width": board_w(name), "height": h}})
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
def mono(t, color=GRANAT, size=13, ls=2.4, mb=0, upper=True):
    tt = "uppercase" if upper else "none"
    return (f'<div style="font-family: {MONO}; font-size: {size}px; letter-spacing: {ls}px; '
            f'text-transform: {tt}; color: {color}; margin: 0 0 {mb}px 0;">{t}</div>')


def p(t, color=INK, size=18, lh=1.66, mb=0, width="60ch", italic=False):
    it = "font-style: italic; " if italic else ""
    return (f'<p style="font-family: {SANS}; {it}font-size: {size}px; line-height: {lh}; color: {color}; '
            f'margin: 0 0 {mb}px 0; max-width: {width}; text-wrap: pretty;">{works(t)}</p>')


def display(t, size, color, mb=0, width="none", tag="h2", lh=1.02, upper=True):
    tt = "uppercase" if upper else "none"
    return (f'<{tag} style="margin: 0 0 {mb}px 0; font-family: {DISPLAY}; font-weight: 400; font-size: {size}px; '
            f'line-height: {lh}; letter-spacing: .012em; text-transform: {tt}; color: {color}; max-width: {width};">{e(t)}</{tag}>')


def qtag(loc, n, color=GRANAT):
    """Позначка питання з артборда «Що вирішити» — прибирається, коли Артем відповів."""
    return (f'<span style="display: inline-block; font-family: {MONO}; font-size: 11px; letter-spacing: 1.4px; '
            f'color: {color}; border: 1px dashed {color}; padding: 2px 7px; margin-left: 10px; '
            f'vertical-align: 2px; text-transform: none;">{e(C[loc]["q"])} {n}</span>')


def tri(color="#fff", size=14):
    return (f'<svg viewBox="0 0 10 12" width="{size}" height="{size}" aria-hidden="true">'
            f'<path d="M1 1 L9 6 L1 11 Z" fill="{color}"></path></svg>')


def play(size=56):
    return (f'<span style="display: flex; align-items: center; justify-content: center; width: {size}px; '
            f'height: {size}px; border-radius: 50%; background: {PLAY}; flex: none;">{tri(size=size // 3)}</span>')


def button(text, href, edge=RED, big=False):
    """Червона кнопка сайту (клікабельне). big — головна дія сторінки «Отримати досьє»."""
    mh, fs, px = (72, 17, 40) if big else (54, 14, 28)
    return (f'<a href="{e(href)}" style="display: inline-flex; align-items: center; gap: 14px; min-height: {mh}px; '
            f'box-sizing: border-box; padding: 0 {px}px; font-family: {MONO}; font-size: {fs}px; font-weight: 700; letter-spacing: 2.4px; '
            f'text-transform: uppercase; border-radius: 2px; background: {RED}; color: #FFFFFF; '
            f'border: 2px solid {edge}; box-shadow: 0 6px 0 rgba(0, 0, 0, .28);">{e(text)} <span aria-hidden="true">→</span></a>')


def mailto(subject):
    return f"mailto:{SH['email']}?subject=" + urllib.parse.quote(subject)


# ── фактури й мотиви (лише лінії й плями, жодного тексту в SVG) ───────────
def grain(w, h, uid, opacity=.22, blend="multiply", freq=.9):
    """Плівкове зерно / вапняна фактура."""
    return (f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" '
            f'style="position: absolute; left: 0; top: 0; pointer-events: none; opacity: {opacity}; mix-blend-mode: {blend};">'
            f'<filter id="g{uid}"><feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="2" seed="{len(uid) * 7}"></feTurbulence>'
            f'<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .9 0"></feColorMatrix></filter>'
            f'<rect width="{w}" height="{h}" filter="url(#g{uid})"></rect></svg>')


def wall_bg():
    """Вибілена вапном стіна: світлі плями й тіні з виміряних тонів."""
    return (f"background: radial-gradient(ellipse 60% 70% at 28% 22%, {LIME_L} 0%, rgba(229,237,222,0) 70%), "
            f"radial-gradient(ellipse 55% 60% at 86% 92%, {LIME_D} 0%, rgba(171,185,162,0) 70%), {LIME};")


def score_sheet(x, y, w, h, rot, seed):
    """Приколотий аркуш партитури: папір, нотні стани, кілька голівок нот, шпилька."""
    rnd = random.Random(seed)
    pad = 24
    vw, vh = w + pad * 2, h + pad * 2
    lines, notes = [], []
    staves = max(3, int((h - 40) // 46))
    for s in range(staves):
        y0 = 30 + s * 46
        for k in range(5):
            yy = y0 + k * 5
            lines.append(f'<line x1="16" y1="{yy}" x2="{w - 16}" y2="{yy}"></line>')
        for _ in range(rnd.randint(5, 9)):
            nx = rnd.uniform(28, w - 28)
            ny = y0 + rnd.choice((0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20))
            notes.append(f'<ellipse cx="{nx:.1f}" cy="{ny:.1f}" rx="3.4" ry="2.4" transform="rotate(-20 {nx:.1f} {ny:.1f})"></ellipse>'
                         f'<line x1="{nx + 3:.1f}" y1="{ny:.1f}" x2="{nx + 3:.1f}" y2="{ny - 16:.1f}" stroke-width=".9"></line>')
    return (f'<svg viewBox="0 0 {vw} {vh}" width="{vw}" height="{vh}" aria-hidden="true" '
            f'style="position: absolute; left: {x - pad}px; top: {y - pad}px; pointer-events: none;">'
            f'<g transform="translate({pad} {pad}) rotate({rot} {w / 2} {h / 2})">'
            f'<rect x="3" y="5" width="{w}" height="{h}" fill="#000" opacity=".12"></rect>'
            f'<rect width="{w}" height="{h}" fill="{CREAM}"></rect>'
            f'<rect width="{w}" height="{h}" fill="{SCORE}" opacity=".16"></rect>'
            f'<g stroke="{SCORE}" stroke-width=".8">{"".join(lines)}</g>'
            f'<g fill="#000" stroke="#000" opacity=".62">{"".join(notes)}</g>'
            f'<circle cx="{w / 2}" cy="9" r="5" fill="{GRANAT}"></circle>'
            f'<circle cx="{w / 2 - 1.5}" cy="7.5" r="1.6" fill="{CREAM}" opacity=".7"></circle>'
            f'</g></svg>')


def pomegranate(x, y, r, rot=0):
    """Гранат на підлозі: плід, корона, відблиск."""
    s = r * 2.6
    cx, cy = s / 2, s / 2 + r * .15
    crown = (f'M{cx - r * .32:.1f} {cy - r * .86:.1f} L{cx - r * .42:.1f} {cy - r * 1.28:.1f} L{cx - r * .14:.1f} {cy - r * 1.02:.1f} '
             f'L{cx:.1f} {cy - r * 1.36:.1f} L{cx + r * .14:.1f} {cy - r * 1.02:.1f} L{cx + r * .42:.1f} {cy - r * 1.28:.1f} '
             f'L{cx + r * .32:.1f} {cy - r * .86:.1f} Z')
    return (f'<svg viewBox="0 0 {s:.0f} {s:.0f}" width="{s:.0f}" height="{s:.0f}" aria-hidden="true" '
            f'style="position: absolute; left: {x}px; top: {y}px; pointer-events: none;">'
            f'<g transform="rotate({rot} {cx:.1f} {cy:.1f})">'
            f'<ellipse cx="{cx:.1f}" cy="{cy + r * .92:.1f}" rx="{r * .9:.1f}" ry="{r * .18:.1f}" fill="#000" opacity=".18"></ellipse>'
            f'<path d="{crown}" fill="{GRANAT_D}"></path>'
            f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="{GRANAT}"></circle>'
            f'<circle cx="{cx + r * .25:.1f}" cy="{cy + r * .2:.1f}" r="{r * .75:.1f}" fill="{GRANAT_D}" opacity=".55"></circle>'
            f'<ellipse cx="{cx - r * .38:.1f}" cy="{cy - r * .36:.1f}" rx="{r * .22:.1f}" ry="{r * .14:.1f}" fill="{CREAM}" opacity=".45"></ellipse>'
            f'</g></svg>')


def frame43(w, img, alt, fit="contain", pos="50% 50%", grain_uid=None):
    """Кадр 4:3 у чорній рамці (пілербокс), з плівковим зерном."""
    h = round(w * 3 / 4)
    g = grain(w, h, grain_uid, opacity=.16, blend="screen", freq=1.1) if grain_uid else ""
    return (f'<div style="position: relative; width: {w}px; height: {h}px; background: {FRAME}; overflow: hidden;">'
            f'<img src="{BLOB[img]}" alt="{e(alt)}" style="position: absolute; left: 0; top: 0; width: {w}px; height: {h}px; '
            f'object-fit: {fit}; object-position: {pos}; display: block;">'
            + g + '</div>')


def arch(w, h, fill, inner, halo=None):
    """Арка-ніша на вапняній стіні: фронтальна жива картина."""
    r = w / 2
    d = f"M0 {h} L0 {r} A{r} {r} 0 0 1 {w} {r} L{w} {h} Z"
    i = 16
    ri = r - i
    di = f"M{i} {h} L{i} {r} A{ri} {ri} 0 0 1 {w - i} {r} L{w - i} {h}"
    halo_svg = (f'<circle cx="{r}" cy="{r + 10}" r="{r * .52:.0f}" fill="none" stroke="{halo}" stroke-width="1.6" opacity=".9"></circle>'
                f'<circle cx="{r}" cy="{r + 10}" r="{r * .44:.0f}" fill="{halo}" opacity=".16"></circle>') if halo else ""
    return (f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" style="display: block;">'
            f'<path d="{d}" fill="{fill}"></path>'
            f'<path d="{di}" fill="none" stroke="{inner}" stroke-width="1.4" opacity=".7"></path>'
            + halo_svg + '</svg>')


def bird_shadow(w, h, pos="right: 40px; top: 30px;"):
    """Тіньовий театр: чорний силует Жар-Птиці з довгим хвостом на бурштині."""
    tail = []
    for k, (dy, sw) in enumerate(((0, 9), (26, 7), (-22, 6), (48, 4.5), (-44, 4), (70, 3))):
        tail.append(f'<path d="M300 236 C 380 {250 + dy} 470 {300 + dy * 1.6} 560 {290 + dy * 2} '
                    f'S 690 {210 + dy * 2.4} 760 {250 + dy * 2.6}" stroke-width="{sw}"></path>')
        tail.append(f'<circle cx="{760}" cy="{250 + dy * 2.6:.0f}" r="{sw * 1.6:.1f}" fill="#000" stroke="none"></circle>')
    return (f'<svg viewBox="0 0 800 460" width="{w}" height="{h}" aria-hidden="true" '
            f'style="position: absolute; {pos} pointer-events: none;">'
            f'<g fill="none" stroke="#000" stroke-linecap="round">{"".join(tail)}</g>'
            # тіло, шия, голова з чубом, дзьоб
            f'<path d="M150 250 C 170 200 240 190 310 228 C 280 262 220 286 170 280 Z" fill="#000"></path>'
            f'<path d="M168 246 C 150 220 130 196 108 182 C 96 176 84 178 76 186 L 54 192 L 78 198 '
            f'C 90 206 112 214 140 262 Z" fill="#000"></path>'
            f'<path d="M100 178 C 96 160 104 146 118 140 M106 176 C 108 158 120 150 134 150 M98 180 C 86 164 84 150 90 138" '
            f'stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"></path>'
            # крило, підняте вгору — фронтально, як у живій картині
            f'<path d="M210 226 C 190 160 200 90 250 30 C 252 90 262 140 300 210 Z" fill="#000"></path>'
            f'<path d="M240 222 C 250 150 290 90 350 50 C 330 110 320 160 312 222 Z" fill="#000"></path>'
            f'<circle cx="96" cy="190" r="2.6" fill="{AMBER}"></circle>'
            # земля тіньового театру
            f'<rect x="0" y="438" width="800" height="22" fill="#000"></rect>'
            f'</svg>')


def swatch(kind, w, h):
    """Шматок тканини костюма — лише кольором і фактурою, з виміряної палітри."""
    if kind == 0:   # Мати — білий, тканина дихає
        body = (f'<rect width="{w}" height="{h}" fill="{CREAM}"></rect>'
                + "".join(f'<path d="M0 {14 + k * 16} C {w * .3} {6 + k * 16} {w * .6} {24 + k * 16} {w} {12 + k * 16}" '
                          f'stroke="{LIME_D}" stroke-width=".9" fill="none" opacity=".7"></path>' for k in range(9)))
    elif kind == 1:  # Жар-Птиця — кристали вогню
        rnd = random.Random(5)
        cr = "".join(f'<polygon points="{x},{y - 14} {x + 8},{y} {x},{y + 14} {x - 8},{y}" fill="{c}" opacity="{o:.2f}"></polygon>'
                     for x, y, c, o in ((rnd.uniform(10, w - 10), rnd.uniform(10, h - 10),
                                         rnd.choice((GOLD, GOLD_D, AMBER, CREAM)), rnd.uniform(.55, .95)) for _ in range(26)))
        body = (f'<defs><linearGradient id="fbg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="{GRANAT_D}"></stop>'
                f'<stop offset=".55" stop-color="{GRANAT}"></stop><stop offset="1" stop-color="{GOLD_D}"></stop></linearGradient></defs>'
                f'<rect width="{w}" height="{h}" fill="url(#fbg)"></rect>' + cr)
    elif kind == 2:  # Царевич — земні тони
        body = (f'<rect width="{w}" height="{h}" fill="{SCORE}"></rect>'
                f'<rect y="{h * .55}" width="{w}" height="{h * .45}" fill="{AMBER_D}" opacity=".7"></rect>'
                + "".join(f'<line x1="{k * 6}" y1="0" x2="{k * 6}" y2="{h}" stroke="#000" stroke-width=".5" opacity=".18"></line>' for k in range(w // 6)))
    elif kind == 3:  # Агенти Кощія — графічний чорний, конструктивістські вставки
        body = (f'<rect width="{w}" height="{h}" fill="{FRAME}"></rect>'
                f'<rect x="1" y="1" width="{w - 2}" height="{h - 2}" fill="none" stroke="{BROCADE}" stroke-width="1"></rect>'
                + "".join(f'<rect x="{18 + k * 46}" y="0" width="14" height="{h}" fill="{BROCADE}" opacity=".7"></rect>' for k in range(5))
                + f'<line x1="0" y1="{h}" x2="{w}" y2="0" stroke="{BROCADE}" stroke-width="10" opacity=".9"></line>')
    else:            # Спляче місто — полотно, що оживає
        body = (f'<defs><linearGradient id="slg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{LIME_D}"></stop>'
                f'<stop offset=".7" stop-color="{LIME_L}"></stop><stop offset="1" stop-color="{AMBER}"></stop></linearGradient></defs>'
                f'<rect width="{w}" height="{h}" fill="url(#slg)"></rect>'
                + "".join(f'<line x1="0" y1="{k * 4}" x2="{w}" y2="{k * 4}" stroke="{SCORE}" stroke-width=".5" opacity=".35"></line>' for k in range(h // 4)))
    return f'<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" style="display: block;">{body}</svg>'


# ── сторінка однією мовою ─────────────────────────────────────────────────
def page(loc, name):
    c = C[loc]
    lang = {"uk": "uk", "fr": "fr", "en": "en"}[loc]
    L = "uk" if loc == "uk" else loc

    nav = (
        f'<header style="display: flex; align-items: center; justify-content: space-between; padding: 26px {PAD}px; '
        f'background: {FRAME}; border-bottom: 1px solid #1f1e1c;">'
        f'<span style="font-family: {DISPLAY}; font-size: 22px; color: {CREAM}; letter-spacing: .02em;">ARTEM HORDIEIEV</span>'
        f'<nav style="display: flex; align-items: center; gap: 30px; font-family: {MONO}; font-size: 13px; '
        f'letter-spacing: 1.8px; text-transform: uppercase; color: #9a9a9a;">'
        + "".join(f'<span>{e(t)}</span>' for t in c["nav"][:2])
        + f'<span style="background: {RED}; color: #fff; padding: 8px 14px; border-radius: 2px;">{e(c["nav"][2])}</span>'
        f'<span>{e(c["nav"][3])}</span>'
        f'<span style="color: #8a8a8a;">' + " · ".join(
            f'<b style="color: {CREAM}; font-weight: 500;">{l}</b>' if l.lower() == ("ua" if loc == "uk" else loc) else l
            for l in ("UA", "FR", "EN")) + '</span></nav></header>'
    )

    # ── герой: вапняна стіна, кадр 4:3 з Реріхом, приколоті аркуші, гранати ──
    hero_h = 860
    hero = (
        f'<section style="position: relative; overflow: hidden; height: {hero_h}px; {wall_bg()}">'
        + grain(W, hero_h, f"hero{loc}", opacity=.28)
        + score_sheet(1004, 70, 190, 250, -6, 1)
        + score_sheet(1250, 120, 160, 214, 5, 2)
        + score_sheet(1170, 600, 200, 150, -3, 3)
        + pomegranate(60, 742, 26, -12) + pomegranate(128, 768, 18, 20) + pomegranate(694, 760, 22, 8)
        + f'<div style="position: absolute; left: {PAD}px; top: 64px; width: 700px;">'
        + f'<a href="https://www.hordieiev.art/{L}/works" style="display: inline-block; font-family: {MONO}; font-size: 13px; '
          f'letter-spacing: 1.8px; text-transform: uppercase; color: {RED}; margin-bottom: 54px;">{e(c["back"])}</a>'
        + mono(e(c["hero_meta"]), color=GRANAT_D, size=14, ls=2.6, mb=22)
        + display(c["title"], 100, GRANAT, mb=22, tag="h1", lh=.98)
        + mono(e(c["subtitle"]) + qtag(loc, "③"), color=GRANAT_D, size=15, ls=2.4, mb=40)
        + p(c["hero_lead"], color="#000", size=22, lh=1.55, mb=44, width="30em")
        + f'<div style="display: flex; align-items: center; gap: 22px; flex-wrap: wrap;">'
        + button(c["cta"], mailto("Firebird — " + c["cta"]), big=True)
        + mono(e(c["cta_note"]), color=GRANAT_D, size=12, ls=1.8)
        + '</div></div>'
        + f'<div style="position: absolute; left: 760px; top: 220px;">'
        + frame43(600, "roerich-mother.webp", c["hero_caption"], grain_uid=f"hf{loc}")
        + f'<div style="margin-top: 14px;">{mono(e(c["hero_caption"]) + qtag(loc, "①"), color=GRANAT_D, size=11, ls=1.6)}</div>'
        + '</div></section>'
    )

    # ── концепція: чорна рамка ──
    concept = (
        f'<section style="position: relative; padding: 120px {PAD}px 112px; background: {FRAME};">'
        + f'<div style="display: flex; align-items: center; gap: 18px; margin-bottom: 30px;">'
        + mono(e(c["concept_label"]), color=GOLD, size=13)
        + f'<span style="display: block; width: 120px; height: 1px; background: {GOLD};"></span></div>'
        + display(c["concept_title"], 64, CREAM, mb=22, width="15em")
        + p(c["concept_tagline"], color=AMBER, size=26, lh=1.4, mb=64, width="none", italic=True)
        + f'<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 96px;">'
        # 18.11.2026 Артем прибрав 3-й абзац; фінал лишився в правій колонці, де стояв на канві
        + "".join((f'<div style="grid-column: 2;">' + p(t, color=CREAM_T, size=18, width="none") + '</div>')
                  if i == 2 and len(c["concept_p"]) == 3 else p(t, color=CREAM_T, size=18, width="none")
                  for i, t in enumerate(c["concept_p"]))
        + '</div></section>'
    )

    # ── ключові дійові особи: чотири арки в ряд, фронтально ──
    arch_cols = [(CREAM, LIME_D, GRANAT_D, GOLD_D), (GRANAT, GOLD, CREAM, None),
                 (AMBER, CREAM, "#000", None), (BROCADE, LIME_L, CREAM, None)]
    aw, ah = 292, 380
    AWPX = f"{aw}px"
    figures = "".join(
        f'<div>'
        + f'<div style="position: relative; width: {aw}px; height: {ah}px;">'
        + arch(aw, ah, f, inner, halo)
        + f'<div style="position: absolute; left: 0; right: 0; bottom: 34px; text-align: center; font-family: {DISPLAY}; '
          f'font-size: 26px; line-height: 1.1; text-transform: uppercase; color: {nc}; padding: 0 22px;">{e(nm)}</div>'
        + '</div>'
        + f'<div style="margin-top: 26px;">{p(tx, color=INK, size=16, lh=1.62, width=AWPX)}</div>'
        + '</div>'
        for (nm, tx), (f, inner, nc, halo) in zip(c["chars"], arch_cols))
    chars = (
        f'<section style="position: relative; overflow: hidden; padding: 112px {PAD}px 104px; {wall_bg()}">'
        + grain(W, 1000, f"ch{loc}", opacity=.26)
        + mono(e(c["chars_label"]), color=GRANAT, size=13, mb=56)
        + f'<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px;">{figures}</div>'
        + '</section>'
    )

    # ── цитата Реріха: тіньовий театр на бурштині ──
    quote = (
        f'<section style="position: relative; overflow: hidden; height: 540px; '
        f'background: radial-gradient(ellipse 70% 90% at 62% 46%, {AMBER} 0%, {AMBER_D} 100%);">'
        + grain(W, 540, f"q{loc}", opacity=.3)
        + bird_shadow(640, 368)
        + f'<figure style="position: absolute; left: {PAD}px; top: 112px; width: 700px; margin: 0;">'
        + f'<blockquote style="margin: 0; font-family: {SANS}; font-size: 27px; line-height: 1.5; font-style: italic; '
          f'color: #000; text-wrap: pretty;">{e(c["quote"])}</blockquote>'
        + f'<figcaption style="margin-top: 24px;">{mono(e(c["quote_cite"]), color="#000", size=13, ls=2.6)}</figcaption>'
        + '</figure></section>'
    )

    # ── візуальний всесвіт: три кадри 4:3 на стіні ──
    imgs = ["roerich-mother.webp", "lissitzky-wedge.webp", "roerich-himalayas.webp"]
    scenes = "".join(
        f'<div>'
        + frame43(408, img, cap, grain_uid=f"s{i}{loc}")
        + f'<div style="margin-top: 12px;">{mono(e(cap), color=GRANAT_D, size=11, ls=1.4, upper=False)}</div>'
        + f'<div style="font-family: {DISPLAY}; font-size: 46px; line-height: 1; color: {GRANAT}; margin: 34px 0 10px;">{rn}</div>'
        + display(tt, 30, GRANAT_D, mb=16, tag="h3", lh=1.1)
        + p(tx, color=INK, size=16, lh=1.62, width="none")
        + '</div>'
        for i, ((rn, tt, tx, cap), img) in enumerate(zip(c["scenes"], imgs)))
    visual = (
        f'<section style="position: relative; overflow: hidden; padding: 112px {PAD}px 112px; {wall_bg()}">'
        + grain(W, 1200, f"vu{loc}", opacity=.26)
        + mono(e(c["visual_label"]) + qtag(loc, "①"), color=GRANAT, size=13, mb=20)
        + display(c["visual_sub"], 50, GRANAT_D, mb=60, width="18em")
        + f'<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 44px;">{scenes}</div>'
        + '</section>'
    )

    # ── костюми: чорна рамка, п'ять шматків тканини ──
    sw_w, sw_h = 240, 170
    cos = "".join(
        f'<div>' + swatch(i, sw_w, sw_h)
        + f'<div style="margin-top: 22px;">{display(nm, 24, CREAM, mb=12, tag="h3", lh=1.1)}</div>'
        + p(tx, color=CREAM_T, size=15, lh=1.6, width="none") + '</div>'
        for i, (nm, tx) in enumerate(c["costumes"]))
    costumes = (
        f'<section style="position: relative; padding: 112px {PAD}px 112px; background: {FRAME};">'
        + f'<div style="display: flex; align-items: center; gap: 18px; margin-bottom: 52px;">'
        + mono(e(c["costumes_label"]), color=GOLD, size=13)
        + f'<span style="display: block; width: 120px; height: 1px; background: {GOLD};"></span></div>'
        + f'<div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 32px;">{cos}</div>'
        + '</section>'
    )

    # ── приклад роботи: кадр 4:3, ▶ збоку від артистів; референс NYCB — велика картка під ним ──
    work = (
        f'<section style="position: relative; overflow: hidden; padding: 112px {PAD}px 112px; {wall_bg()}">'
        + grain(W, 1400, f"wk{loc}", opacity=.26)
        + score_sheet(1170, 560, 170, 220, 4, 7)
        + mono(e(c["work_label"]), color=GRANAT, size=13, mb=32)
        + f'<a href="{e(SH["yt_work"])}" style="position: relative; display: block; width: 760px; height: 570px; background: {FRAME}; overflow: hidden;">'
        + f'<img src="{BLOB["work-sample.webp"]}" alt="" style="position: absolute; left: 0; top: 0; width: 760px; height: 570px; object-fit: contain; display: block;">'
        + grain(760, 570, f"wf{loc}", opacity=.14, blend="screen", freq=1.1)
        + f'<span style="position: absolute; left: 36px; top: 470px;">{play(68)}</span></a>'
        + f'<div style="margin-top: 14px; margin-bottom: 56px;">{mono(e(c["work_cite"]), color=GRANAT_D, size=12, ls=1.6, upper=False)}</div>'
        # референс NYCB — велика картка на всю ширину: крем, чорна рамка, великий ▶ (кадру немає — чужі права)
        + f'<a href="{e(SH["yt_ref"])}" style="display: flex; align-items: center; gap: 40px; width: {W - 2 * PAD}px; box-sizing: border-box; '
          f'padding: 44px 52px; background: {CREAM}; border: 3px solid {FRAME}; box-shadow: 10px 10px 0 {GRANAT};">'
        + play(104)
        + f'<span style="display: block;">'
        + f'<span style="display: block; margin-bottom: 16px;">{mono(e(c["ref_label"]), color=GRANAT, size=15, ls=2.6)}</span>'
        + f'<span style="display: block; font-family: {DISPLAY}; font-size: 46px; line-height: 1.08; color: #000; max-width: 24em;">{e(c["ref_title"])}</span>'
        + '</span></a>'
        + '</section>'
    )

    # ── постановочна команда: чорна рамка ──
    team = (
        f'<section style="position: relative; padding: 112px {PAD}px 112px; background: {FRAME};">'
        + f'<div style="display: flex; align-items: center; gap: 18px; margin-bottom: 52px;">'
        + mono(e(c["team_label"]), color=GOLD, size=13)
        + f'<span style="display: block; width: 120px; height: 1px; background: {GOLD};"></span></div>'
        + f'<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 96px;">'
        + f'<div>' + display(c["artem_name"], 44, CREAM, mb=12, tag="h3", lh=1.05)
        + mono(e(c["artem_role"]), color=GOLD, size=13, ls=2.2, mb=28)
        + p(c["artem_p"][0], color=CREAM_T, size=17, mb=18, width="none")
        + p(c["artem_p"][1], color=CREAM_T, size=17, mb=26, width="none")
        + f'<a href="https://www.hordieiev.art/{L}/cv" style="font-family: {MONO}; font-size: 13px; letter-spacing: 2px; '
          f'text-transform: uppercase; color: {PINK};">{e(c["cv_link"])}</a></div>'
        + f'<div>' + display(c["tetiana_name"], 44, CREAM, mb=12, tag="h3", lh=1.05)
        + mono(e(c["tetiana_role"]) + qtag(loc, "④", color=GOLD), color=GOLD, size=13, ls=2.2, mb=28)
        + p(c["tetiana_p"], color=CREAM_T, size=17, width="none") + '</div>'
        + '</div></section>'
    )

    # ── постановка + контакт: гранатова панель на чорному ──
    staging = (
        f'<section style="position: relative; padding: 112px {PAD}px 88px; background: {FRAME};">'
        + f'<div style="display: grid; grid-template-columns: 780px minmax(0, 1fr); gap: 72px; align-items: start;">'
        + f'<div style="position: relative; background: {GRANAT}; padding: 56px 56px 60px;">'
        + mono(e(c["staging_label"]), color=GOLD, size=13, mb=22)
        + display(c["staging_title"], 50, CREAM, mb=26, width="13em", lh=1.05)
        + p(c["staging_p"], color=CREAM, size=18, lh=1.62, mb=40, width="none")
        + f'<div style="display: flex; align-items: center; gap: 26px; flex-wrap: wrap; background: {CREAM}; '
          f'margin: 0 -56px -60px; padding: 36px 56px;">'
        + button(c["cta"], mailto("Firebird — " + c["cta"]), big=True)
        + mono(e(c["staging_note"]), color=GRANAT_D, size=12, ls=1.8)
        + '</div></div>'
        + f'<div style="padding-top: 56px;">'
        + mono(e(c["contact_label"]), color=GOLD, size=13, mb=22)
        + f'<div style="font-family: {SANS}; font-size: 19px; color: {CREAM}; margin-bottom: 26px;">{e(c["contact_name"])}</div>'
        + f'<a href="mailto:{SH["email"]}" style="display: block; font-family: {DISPLAY}; font-size: 34px; color: {CREAM}; margin-bottom: 16px;">{SH["email"]}</a>'
        + f'<a href="tel:{SH["phone"].replace(" ", "")}" style="display: block; font-family: {SANS}; font-size: 20px; color: {CREAM}; margin-bottom: 16px;">{SH["phone"]}</a>'
        + f'<a href="{SH["whatsapp"]}" style="display: block; font-family: {MONO}; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: {PINK};">WhatsApp ↗</a>'
        + '</div></div></section>'
    )

    footer = (
        f'<footer style="position: relative; padding: 40px {PAD}px 48px; background: {FRAME}; border-top: 1px solid #1f1e1c;">'
        + mono(works(c["join"]), color=CREAM_T, size=12, ls=1.6, mb=26)
        + f'<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px;">'
        + mono(e(c["copyright"]), color="#8a8a8a", size=11, ls=1.6)
        + f'<a href="https://www.hordieiev.art/{L}" style="font-family: {MONO}; font-size: 11px; letter-spacing: 1.6px; color: {PINK};">hordieiev.art</a></div>'
        + f'<div style="font-family: {MONO}; font-size: 11px; letter-spacing: .6px; line-height: 1.6; color: #6f6a64;">'
          f'{e(c["credits_label"])}: {e(SH["credits"])}</div>'
        + '</footer>'
    )

    body = (f'<main style="width: {W}px; background: {FRAME}; color: {CREAM}; font-family: {SANS}; '
            f'-webkit-font-smoothing: antialiased;">' + nav + hero + concept + chars + quote + visual
            + costumes + work + team + staging + footer + '</main>')
    return head(lang, f"Firebird — {loc.upper()}"), body, foot(name)


# ── телефон 390 px: ті самі секції в один стовпчик ─────────────────────────
def mbutton(text, href, w=MC):
    """«Отримати досьє» на телефоні: червона, на всю ширину, 60 px заввишки."""
    return (f'<a href="{e(href)}" style="display: flex; align-items: center; justify-content: center; gap: 12px; '
            f'width: {w}px; min-height: 60px; box-sizing: border-box; padding: 0 16px; font-family: {MONO}; font-size: 15px; '
            f'font-weight: 700; letter-spacing: 2px; text-transform: uppercase; text-align: center; border-radius: 2px; '
            f'background: {RED}; color: #FFFFFF; border: 2px solid {RED}; box-shadow: 0 5px 0 rgba(0, 0, 0, .28);">'
            f'{e(text)} <span aria-hidden="true">→</span></a>')


def mlabel(t, color, rule):
    """Мітка секції по центру, під нею коротка риска (як золота риска десктопа)."""
    return (mono(e(t), color=color, size=12, ls=2.2, mb=14)
            + f'<span style="display: block; width: 64px; height: 1px; background: {rule}; margin: 0 auto;"></span>')


def at(x, y, inner, side="top"):
    """Обгортка для мотиву, прив'язаного до низу секції (side='bottom')."""
    return f'<div style="position: absolute; left: {x}px; {side}: {y}px; width: 0; height: 0;">{inner}</div>'


def mobile_page(loc, name):
    c = C[loc]
    lang = loc
    L = loc
    CT = "text-align: center;"
    ctr = lambda inner: f'<div style="{CT}">{inner}</div>'

    nav = (
        f'<header style="padding: 18px {MP}px 16px; background: {FRAME}; border-bottom: 1px solid #1f1e1c; {CT}">'
        f'<div style="font-family: {DISPLAY}; font-size: 20px; color: {CREAM}; letter-spacing: .02em; margin-bottom: 14px;">ARTEM HORDIEIEV</div>'
        f'<nav style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px 16px; font-family: {MONO}; '
        f'font-size: 11px; letter-spacing: 1.4px; text-transform: uppercase; color: #9a9a9a;">'
        + "".join(f'<span>{e(t)}</span>' for t in c["nav"][:2])
        + f'<span style="background: {RED}; color: #fff; padding: 6px 10px; border-radius: 2px;">{e(c["nav"][2])}</span>'
        f'<span>{e(c["nav"][3])}</span>'
        f'<span style="color: #8a8a8a;">' + " · ".join(
            f'<b style="color: {CREAM}; font-weight: 500;">{l}</b>' if l.lower() == ("ua" if loc == "uk" else loc) else l
            for l in ("UA", "FR", "EN")) + '</span></nav></header>'
    )

    hero = (
        f'<section style="position: relative; overflow: hidden; padding: 30px {MP}px 92px; {wall_bg()}">'
        + grain(MW, 1600, f"mhero{loc}", opacity=.28)
        + score_sheet(318, 8, 58, 78, 6, 2)
        + at(6, 40, pomegranate(0, 0, 15, -12), "bottom") + at(50, 28, pomegranate(0, 0, 11, 20), "bottom")
        + at(318, 34, pomegranate(0, 0, 13, 8), "bottom")
        + f'<div style="position: relative; {CT}">'
        + f'<a href="https://www.hordieiev.art/{L}/works" style="display: inline-block; font-family: {MONO}; font-size: 12px; '
          f'letter-spacing: 1.6px; text-transform: uppercase; color: {RED}; margin-bottom: 40px;">{e(c["back"])}</a>'
        + mono(e(c["hero_meta"]), color=GRANAT_D, size=12, ls=2, mb=16)
        + display(c["title"], 54, GRANAT, mb=16, tag="h1", lh=1)
        + mono(e(c["subtitle"]) + qtag(loc, "③"), color=GRANAT_D, size=12, ls=1.8, mb=28)
        + frame43(MC, "roerich-mother.webp", c["hero_caption"], grain_uid=f"mhf{loc}")
        + f'<div style="margin: 12px 0 30px;">{mono(e(c["hero_caption"]) + qtag(loc, "①"), color=GRANAT_D, size=10, ls=1.2)}</div>'
        + p(c["hero_lead"], color="#000", size=18, lh=1.55, mb=30, width="none")
        + mbutton(c["cta"], mailto("Firebird — " + c["cta"]))
        + f'<div style="margin-top: 14px;">{mono(e(c["cta_note"]), color=GRANAT_D, size=11, ls=1.4)}</div>'
        + '</div></section>'
    )

    concept = (
        f'<section style="position: relative; padding: 72px {MP + 8}px 68px; background: {FRAME}; {CT}">'
        + f'<div style="margin-bottom: 26px;">{mlabel(c["concept_label"], GOLD, GOLD)}</div>'
        + display(c["concept_title"], 34, CREAM, mb=18, lh=1.05)
        + p(c["concept_tagline"], color=AMBER, size=20, lh=1.4, mb=36, width="none", italic=True)
        + f'<div style="text-align: left;">'
        + "".join(p(t, color=CREAM_T, size=16, lh=1.65, mb=20, width="none") for t in c["concept_p"])
        + '</div></section>'
    )

    arch_cols = [(CREAM, LIME_D, GRANAT_D, GOLD_D), (GRANAT, GOLD, CREAM, None),
                 (AMBER, CREAM, "#000", None), (BROCADE, LIME_L, CREAM, None)]
    aw, ah = (MC - 14) // 2, 228
    figures = "".join(
        f'<div style="width: {aw}px;">'
        + f'<div style="position: relative; width: {aw}px; height: {ah}px;">'
        + arch(aw, ah, f, inner, halo)
        + f'<div style="position: absolute; left: 0; right: 0; bottom: 20px; text-align: center; font-family: {DISPLAY}; '
          f'font-size: 17px; line-height: 1.1; text-transform: uppercase; color: {nc}; padding: 0 16px;">{e(nm)}</div>'
        + '</div>'
        + f'<div style="margin-top: 14px; {CT}">{p(tx, color=INK, size=14, lh=1.55, width="none")}</div>'
        + '</div>'
        for (nm, tx), (f, inner, nc, halo) in zip(c["chars"], arch_cols))
    chars = (
        f'<section style="position: relative; overflow: hidden; padding: 64px {MP}px 60px; {wall_bg()}">'
        + grain(MW, 1400, f"mch{loc}", opacity=.26)
        + ctr(mono(e(c["chars_label"]), color=GRANAT, size=12, ls=2.2, mb=34))
        + f'<div style="display: grid; grid-template-columns: repeat(2, {aw}px); gap: 34px 14px;">{figures}</div>'
        + '</section>'
    )

    bw = MC
    bh = round(bw * 460 / 800)
    quote = (
        f'<section style="position: relative; overflow: hidden; padding: {bh + 28}px {MP + 8}px 56px; '
        f'background: radial-gradient(ellipse 90% 70% at 50% 30%, {AMBER} 0%, {AMBER_D} 100%); {CT}">'
        + grain(MW, 900, f"mq{loc}", opacity=.3)
        + bird_shadow(bw, bh, pos=f"left: {MP}px; top: 24px;")
        + f'<figure style="position: relative; margin: 0;">'
        + f'<blockquote style="margin: 0; font-family: {SANS}; font-size: 20px; line-height: 1.5; font-style: italic; '
          f'color: #000; text-wrap: pretty;">{e(c["quote"])}</blockquote>'
        + f'<figcaption style="margin-top: 18px;">{mono(e(c["quote_cite"]), color="#000", size=11, ls=2)}</figcaption>'
        + '</figure></section>'
    )

    imgs = ["roerich-mother.webp", "lissitzky-wedge.webp", "roerich-himalayas.webp"]
    scenes = "".join(
        f'<div style="margin-top: {0 if i == 0 else 52}px; {CT}">'
        + frame43(MC, img, cap, grain_uid=f"ms{i}{loc}")
        + f'<div style="margin-top: 10px;">{mono(e(cap), color=GRANAT_D, size=10, ls=1, upper=False)}</div>'
        + f'<div style="font-family: {DISPLAY}; font-size: 38px; line-height: 1; color: {GRANAT}; margin: 24px 0 8px;">{rn}</div>'
        + display(tt, 24, GRANAT_D, mb=12, tag="h3", lh=1.1)
        + p(tx, color=INK, size=15, lh=1.6, width="none")
        + '</div>'
        for i, ((rn, tt, tx, cap), img) in enumerate(zip(c["scenes"], imgs)))
    visual = (
        f'<section style="position: relative; overflow: hidden; padding: 64px {MP}px 64px; {wall_bg()}">'
        + grain(MW, 3200, f"mvu{loc}", opacity=.26)
        + ctr(mono(e(c["visual_label"]) + qtag(loc, "①"), color=GRANAT, size=12, ls=2.2, mb=16))
        + ctr(display(c["visual_sub"], 30, GRANAT_D, mb=40, lh=1.05))
        + scenes
        + '</section>'
    )

    sw_w, sw_h = (MC - 14) // 2, 120
    cos = "".join(
        f'<div style="width: {sw_w}px; {CT}">' + swatch(i, sw_w, sw_h)
        + f'<div style="margin-top: 14px;">{display(nm, 18, CREAM, mb=8, tag="h3", lh=1.1)}</div>'
        + p(tx, color=CREAM_T, size=14, lh=1.55, width="none") + '</div>'
        for i, (nm, tx) in enumerate(c["costumes"]))
    costumes = (
        f'<section style="position: relative; padding: 64px {MP}px 64px; background: {FRAME};">'
        + f'<div style="margin-bottom: 34px; {CT}">{mlabel(c["costumes_label"], GOLD, GOLD)}</div>'
        + f'<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 34px 14px;">{cos}</div>'
        + '</section>'
    )

    fw, fh = MC, round(MC * 3 / 4)
    work = (
        f'<section style="position: relative; overflow: hidden; padding: 64px {MP}px 72px; {wall_bg()}">'
        + grain(MW, 1400, f"mwk{loc}", opacity=.26)
        + ctr(mono(e(c["work_label"]), color=GRANAT, size=12, ls=2.2, mb=24))
        + f'<a href="{e(SH["yt_work"])}" style="position: relative; display: block; width: {fw}px; height: {fh}px; background: {FRAME}; overflow: hidden;">'
        + f'<img src="{BLOB["work-sample.webp"]}" alt="" style="position: absolute; left: 0; top: 0; width: {fw}px; height: {fh}px; object-fit: contain; display: block;">'
        + grain(fw, fh, f"mwf{loc}", opacity=.14, blend="screen", freq=1.1)
        + f'<span style="position: absolute; left: 16px; top: {fh - 72}px;">{play(56)}</span></a>'
        + f'<div style="margin-top: 12px; margin-bottom: 40px; {CT}">{mono(e(c["work_cite"]), color=GRANAT_D, size=11, ls=1.2, upper=False)}</div>'
        # референс NYCB — та сама крем-картка, що на десктопі, у стовпчик: ▶ над назвою
        + f'<a href="{e(SH["yt_ref"])}" style="display: block; width: {MC - 6}px; box-sizing: border-box; padding: 30px 22px 32px; '
          f'background: {CREAM}; border: 3px solid {FRAME}; box-shadow: 6px 6px 0 {GRANAT}; {CT}">'
        + f'<span style="display: flex; justify-content: center; margin-bottom: 22px;">{play(84)}</span>'
        + f'<span style="display: block; margin-bottom: 12px;">{mono(e(c["ref_label"]), color=GRANAT, size=12, ls=2)}</span>'
        + f'<span style="display: block; font-family: {DISPLAY}; font-size: 28px; line-height: 1.1; color: #000;">{e(c["ref_title"])}</span>'
        + '</a>'
        + '</section>'
    )

    team = (
        f'<section style="position: relative; padding: 64px {MP + 8}px 64px; background: {FRAME};">'
        + f'<div style="margin-bottom: 36px; {CT}">{mlabel(c["team_label"], GOLD, GOLD)}</div>'
        + f'<div style="{CT}">' + display(c["artem_name"], 32, CREAM, mb=10, tag="h3", lh=1.05)
        + mono(e(c["artem_role"]), color=GOLD, size=11, ls=1.8, mb=22) + '</div>'
        + p(c["artem_p"][0], color=CREAM_T, size=16, lh=1.65, mb=16, width="none")
        + p(c["artem_p"][1], color=CREAM_T, size=16, lh=1.65, mb=20, width="none")
        + f'<div style="{CT} margin-bottom: 52px;"><a href="https://www.hordieiev.art/{L}/cv" style="font-family: {MONO}; font-size: 12px; letter-spacing: 1.8px; '
          f'text-transform: uppercase; color: {PINK};">{e(c["cv_link"])}</a></div>'
        + f'<div style="{CT}">' + display(c["tetiana_name"], 32, CREAM, mb=10, tag="h3", lh=1.05)
        + mono(e(c["tetiana_role"]) + qtag(loc, "④", color=GOLD), color=GOLD, size=11, ls=1.8, mb=22) + '</div>'
        + p(c["tetiana_p"], color=CREAM_T, size=16, lh=1.65, width="none")
        + '</section>'
    )

    staging = (
        f'<section style="position: relative; padding: 24px {MP}px 64px; background: {FRAME};">'
        + f'<div style="position: relative; background: {GRANAT}; padding: 40px 22px 0; {CT}">'
        + mono(e(c["staging_label"]), color=GOLD, size=12, ls=2.2, mb=18)
        + display(c["staging_title"], 32, CREAM, mb=20, lh=1.05)
        + p(c["staging_p"], color=CREAM, size=16, lh=1.6, mb=32, width="none")
        + f'<div style="background: {CREAM}; margin: 0 -22px; padding: 24px 16px 26px;">'
        + mbutton(c["cta"], mailto("Firebird — " + c["cta"]), w=MC - 32)
        + f'<div style="margin-top: 14px;">{mono(e(c["staging_note"]), color=GRANAT_D, size=11, ls=1.4)}</div>'
        + '</div></div>'
        + f'<div style="padding-top: 56px; {CT}">'
        + mono(e(c["contact_label"]), color=GOLD, size=12, ls=2.2, mb=18)
        + f'<div style="font-family: {SANS}; font-size: 17px; color: {CREAM}; margin-bottom: 20px;">{e(c["contact_name"])}</div>'
        + f'<a href="mailto:{SH["email"]}" style="display: block; font-family: {DISPLAY}; font-size: 28px; color: {CREAM}; margin-bottom: 14px;">{SH["email"]}</a>'
        + f'<a href="tel:{SH["phone"].replace(" ", "")}" style="display: block; font-family: {SANS}; font-size: 18px; color: {CREAM}; margin-bottom: 14px;">{SH["phone"]}</a>'
        + f'<a href="{SH["whatsapp"]}" style="display: block; font-family: {MONO}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: {PINK};">WhatsApp ↗</a>'
        + '</div></section>'
    )

    footer = (
        f'<footer style="position: relative; padding: 32px {MP + 8}px 40px; background: {FRAME}; border-top: 1px solid #1f1e1c; {CT}">'
        + mono(works(c["join"]), color=CREAM_T, size=11, ls=1.2, mb=22, upper=True)
        + mono(e(c["copyright"]), color="#8a8a8a", size=10, ls=1.2, mb=10)
        + f'<a href="https://www.hordieiev.art/{L}" style="display: block; font-family: {MONO}; font-size: 11px; letter-spacing: 1.6px; color: {PINK}; margin-bottom: 18px;">hordieiev.art</a>'
        + f'<div style="font-family: {MONO}; font-size: 10px; letter-spacing: .4px; line-height: 1.6; color: #6f6a64;">'
          f'{e(c["credits_label"])}: {e(SH["credits"])}</div>'
        + '</footer>'
    )

    body = (f'<main style="width: {MW}px; overflow: hidden; background: {FRAME}; color: {CREAM}; font-family: {SANS}; '
            f'-webkit-font-smoothing: antialiased;">' + nav + hero + concept + chars + quote + visual
            + costumes + work + team + staging + footer + '</main>')
    return head(lang, f"Firebird — {loc.upper()} · mobile"), body, foot(name)


# ── артборд «Що вирішити» ─────────────────────────────────────────────────
def questions():
    Q = C["questions"]
    BG = "#0a0a0a"

    def item(n, t, b, answer=None):
        tail = (f'<p style="margin: 12px 0 0; font-family: {SANS}; font-size: 16px; line-height: 1.62; color: {PINK};">Ваша відповідь: ( )</p>'
                if answer is None else "")
        return (f'<div style="padding: 24px 0; border-top: 1px solid #1f1e1c;">'
                + mono(n, color=GOLD if answer is None else "#8a8a8a", size=16, ls=0, mb=10)
                + f'<h3 style="margin: 0 0 10px; font-family: {DISPLAY}; font-weight: 400; font-size: 26px; line-height: 1.2; '
                  f'color: {CREAM if answer is None else "#bdb8b0"};">{e(t)}</h3>'
                + f'<p style="margin: 0; font-family: {SANS}; font-size: 16px; line-height: 1.62; color: #9a9a9a; max-width: 72ch;">{e(b)}</p>'
                + tail + '</div>')

    total = len(Q["open"]) + len(Q["closed"])
    body = (
        f'<main style="width: 1000px; box-sizing: border-box; padding: 64px; background: {BG}; color: {CREAM}; font-family: {SANS};">'
        + mono("Перед кодом · чернетка за прапорцем drafts.ts", color=PINK, size=13, mb=18)
        + f'<h1 style="margin: 0 0 20px; font-family: {DISPLAY}; font-weight: 400; font-size: 44px; line-height: 1.05; color: {CREAM};">Що вирішити на цій канві</h1>'
        + f'<p style="margin: 0 0 32px; font-family: {SANS}; font-size: 17px; line-height: 1.66; color: #9a9a9a; max-width: 72ch;">{e(Q["intro"])}</p>'
        + ((mono(f"Відкриті · {len(Q['open'])}", color=PINK, size=13, mb=14)
            + "".join(item(n, t, b) for n, t, b in Q["open"])
            + '<div style="height: 40px;"></div>') if Q["open"] else "")
        + ((mono(f"Закрито · {len(Q['closed'])} з {total} · ваші відповіді", color="#8a8a8a", size=13, mb=14)
            + "".join(item(n, t, b, answer=True) for n, t, b in Q["closed"])) if Q["closed"] else "")
        + '</main>'
    )
    return head("uk", "Що вирішити"), body, foot("Questions")


BOARDS = {
    "Questions": questions,
    "Main": lambda: page("uk", "Main"),
    "French": lambda: page("fr", "French"),
    "English": lambda: page("en", "English"),
    "Mobile": lambda: mobile_page("uk", "Mobile"),
    "MobileFR": lambda: mobile_page("fr", "MobileFR"),
    "MobileEN": lambda: mobile_page("en", "MobileEN"),
}
TITLES = {"Questions": "Що вирішити", "Main": "UA · /uk/works/firebird · правити тут",
          "French": "FR · /fr/works/firebird", "English": "EN · /en/works/firebird",
          "Mobile": "UA · телефон 390 · правити тут", "MobileFR": "FR · телефон 390", "MobileEN": "EN · телефон 390"}

# ── вільні координати: у Chrome кожен блок → position: absolute ────────────
FREEZE_JS = r"""
(function(){
const INH=['font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform','color','text-align','white-space'];
function hasBox(cs){
  if(cs.backgroundColor!=='rgba(0, 0, 0, 0)'||cs.backgroundImage!=='none') return true;
  for(const s of ['Top','Right','Bottom','Left']) if(cs['border'+s+'Style']!=='none'&&parseFloat(cs['border'+s+'Width'])>0) return true;
  return false;
}
function directText(el){for(const n of el.childNodes) if(n.nodeType===3&&n.textContent.trim()) return true; return false;}
function kind(c){
  const t=c.tagName.toUpperCase();
  if(t==='IMG'||t==='SVG') return 'leaf';
  if(t==='BR'||t==='STYLE'||t==='SCRIPT') return 'drop';
  const cs=getComputedStyle(c);
  if(cs.display==='none') return 'drop';
  const box=hasBox(cs), txt=directText(c);
  if(/^(P|H[1-6]|BLOCKQUOTE)$/.test(t)) return 'text';
  if(txt) return box?'boxtext':'text';
  if(box) return c.children.length?'box':'leaf';
  if(t==='A') return c.children.length?'box':'drop';
  if(c.children.length) return 'wrap';
  return 'drop';
}
const R=v=>Math.round(v*10)/10;
function freeze(container){
  const cr=container.getBoundingClientRect();
  const ox=cr.left+container.clientLeft, oy=cr.top+container.clientTop;
  const atoms=[];
  (function walk(el){
    for(const c of Array.from(el.children)){
      const k=kind(c);
      if(k==='wrap'){walk(c);continue;}
      if(k==='drop') continue;
      const r=c.getBoundingClientRect();
      if(r.width<0.5&&r.height<0.5) continue;
      const cs=getComputedStyle(c); const inh={};
      for(const p of INH) inh[p]=cs.getPropertyValue(p);
      atoms.push({el:c,k,x:r.left-ox,y:r.top-oy,w:r.width,h:r.height,inh});
    }
  })(container);
  const s0=container.style;
  if(getComputedStyle(container).position==='static') s0.position='relative';
  s0.boxSizing='border-box'; s0.height=R(cr.height)+'px'; s0.width=R(cr.width)+'px';
  container.replaceChildren(...atoms.map(a=>a.el));
  s0.display='block'; s0.padding='0'; s0.minHeight='0';
  for(const a of atoms){
    const s=a.el.style;
    for(const p of INH) if(!s.getPropertyValue(p)) s.setProperty(p,a.inh[p]);
    s.position='absolute'; s.left=R(a.x)+'px'; s.top=R(a.y)+'px';
    s.right='auto'; s.bottom='auto'; s.margin='0'; s.maxWidth='none'; s.transform='none'; s.boxSizing='border-box';
    if(a.k==='text'||a.k==='boxtext'){ s.width=Math.ceil(a.w+1)+'px'; }
    else { s.width=R(a.w)+'px'; s.height=R(a.h)+'px'; }
    if(a.k==='text'&&getComputedStyle(a.el).display.startsWith('inline')) s.display='block';
  }
  for(const a of atoms) if(a.k==='box') freeze(a.el);
}
window.__freeze=function(){
  const m=document.querySelector('main');
  freeze(m);
  const p=document.createElement('pre'); p.id='h'; p.textContent=m.getBoundingClientRect().height;
  document.body.appendChild(p);
};
})();
"""

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def render(n, parts, free=True):
    """Верстка потоком → Chrome → вільні координати + висота."""
    hd, body, ft = parts
    inv = {v: (HERE / "assets" / k).as_uri() for k, v in BLOB.items()}
    helmet = hd.split("<helmet>", 1)[1].split("</helmet>", 1)[0]
    script = ("<script>" + FREEZE_JS + "window.addEventListener('load',()=>document.fonts.ready.then(()=>"
              "setTimeout(()=>{" + ("window.__freeze();" if free else
              "const p=document.createElement('pre');p.id='h';p.textContent=document.querySelector('main').getBoundingClientRect().height;document.body.appendChild(p);")
              + "},300)))</script>")
    doc = f"<!doctype html><html><head><meta charset='utf-8'>{helmet}</head><body>{body}{script}</body></html>"
    for k, v in inv.items():
        doc = doc.replace(k, v)
    tmp = pathlib.Path(tempfile.mkdtemp())
    f = tmp / f"{n}.html"
    f.write_text(doc, encoding="utf-8")
    w = board_w(n)
    dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
                          "--virtual-time-budget=15000", f"--window-size={w},2000", "--dump-dom", f.as_uri()],
                         capture_output=True, text=True, check=True).stdout
    h = float(re.search(r'<pre id="h">([\d.]+)</pre>', dom).group(1))
    main = dom[dom.index("<main"):dom.rindex("</main>") + len("</main>")]
    for k, v in inv.items():
        main = main.replace(v, k)
    HEIGHTS[n] = int(math.ceil(h))
    print(n, round(h))
    return main


def write_all():
    OUT.mkdir(parents=True, exist_ok=True)
    for n, fn in BOARDS.items():
        parts = fn()
        main = render(n, parts, free=True)
        hd, _, _ = parts
        (OUT / f"{n}.dc.html").write_text(hd + main + "\n" + foot(n), encoding="utf-8")
    HEIGHTS_F.write_text(json.dumps(HEIGHTS, indent=1) + "\n")
    idx_f = OUT / "canvas.json"
    idx = json.loads(idx_f.read_text()) if idx_f.exists() else {
        "v": 3, "createdOnFiles": {"v": 1, "at": "2026-11-18T17:40:00Z"}}
    # позиції рамок, які вже стоять на канві (Артем міг їх пересунути), не чіпаємо — лише w/h
    boards = idx.get("boards", {})
    x = 0
    for n in ("Questions", "Main", "French", "English"):
        k, w = f"{n}.dc.html", board_w(n)
        boards.setdefault(k, {"x": x, "y": 0, "title": TITLES[n]}).update({"w": w, "h": HEIGHTS.get(n, 3000)})
        x += w + 120
    # телефони — другим рядом під десктопними: 120 px між рядами, 80 між рамками, від лівого краю UA
    desk = [boards[f"{n}.dc.html"] for n in ("Main", "French", "English")]
    y2 = max(b["y"] + b["h"] for b in desk) + 120
    x = boards["Main.dc.html"]["x"]
    for n in ("Mobile", "MobileFR", "MobileEN"):
        k = f"{n}.dc.html"
        boards.setdefault(k, {"x": x, "y": y2, "title": TITLES[n]}).update({"w": MW, "h": HEIGHTS.get(n, 9000)})
        x += MW + 80
    order = idx.get("order") or ["Main.dc.html", "Questions.dc.html", "French.dc.html", "English.dc.html"]
    order += [f"{n}.dc.html" for n in BOARDS if f"{n}.dc.html" not in order]
    idx.update({
        "title": idx.get("title", "ЖАР-ПТИЦЯ — сторінка сайту"),
        "launch": idx.get("launch", {"view": "canvas"}),
        "pages": idx.get("pages", []),
        "boards": boards,
        "order": order,
        "notes": idx.get("notes") or {
            "brief": {"x": 0, "y": -300, "w": 900, "fill": "orange",
                      "text": "Чернетка нової сторінки ЖАР-ПТИЦЯ (/works/firebird) замість зовнішньої surge — для художніх і програмних директорів балетних труп і оперних домів. "
                              "Стиль — ролик NYCB «Firebird» (Параджанов). UA — головна: правте її, інструкції в дужках; зайве прибирайте прямо тут. "
                              "FR і EN перезбираються з української. У main — лише після вашого «так»."},
        },
        "designSystems": idx.get("designSystems", []),
    })
    idx_f.write_text(json.dumps(idx, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


if __name__ == "__main__":
    write_all()
    print("артборди:", ", ".join(BOARDS), "→", OUT)
