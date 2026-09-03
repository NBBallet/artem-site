# -*- coding: utf-8 -*-
"""Renders the digital-CV design artboards (.dc.html) and src/lib/cv-data.ts
from the single copy source, design/cv/copy.json.

    python3 design/cv/gen.py

Artboards land next to this script and stay out of git (NAMU fonts are
inlined as base64, so each file is ~250 KB)."""

import base64, json, pathlib, html

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
COPY = json.loads((HERE / "copy.json").read_text(encoding="utf-8"))
S = COPY["shared"]


def b64(name):
    return base64.b64encode((ROOT / "public" / "fonts" / name).read_bytes()).decode()


NAMU_FACES = """
@font-face { font-family: "NAMU-1400"; font-weight: normal; font-style: normal;
  src: url(data:font/woff2;base64,%s) format("woff2"); }
@font-face { font-family: "NAMU-Pro"; font-weight: normal; font-style: normal;
  src: url(data:font/woff2;base64,%s) format("woff2"); }
""" % (b64("NAMU-1400.woff2"), b64("NAMU-Pro.woff2"))

# NOTE: single quotes only. These stacks are interpolated into double-quoted
# style="..." attributes, so a double quote inside them terminates the
# attribute early and every font declaration in the artboard is silently lost
# (the whole document falls back to Times). That is exactly what happened
# before 27.08 — the live site was fine because its fonts live in cv.css.
DISPLAY = "'NAMU-1400', Georgia, serif"
QUOTE = "'NAMU-Pro', 'NAMU-1400', Georgia, serif"
BODY = "'Inter', -apple-system, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif"
MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"

# ── palettes ────────────────────────────────────────────────────────────────
# Screen keeps the site's black + #c8102e, adds the brand's unused gold token.
# Print flips to bone paper: a full-bleed black A4 drinks ink and reads badly.
DARK = dict(
    bg="#070707", panel="#0d0d0d", panel2="#111111", line="#1c1c1c",
    line2="#2b2b2b", fg="#f5f5f5", body="#9a9a9a", meta="#616161",
    red="#c8102e", redSoft="rgba(200,16,46,0.10)", gold="#d4af37",
    goldSoft="rgba(212,175,55,0.09)", seam="#f5f5f5",
)
PAPER = dict(
    bg="#faf7f2", panel="#f3eee6", panel2="#efe9df", line="#ded5c7",
    line2="#c6bcab", fg="#111111", body="#3f3f3f", meta="#7b7368",
    red="#a80c24", redSoft="rgba(168,12,36,0.07)", gold="#8a6d17",
    goldSoft="rgba(138,109,23,0.09)", seam="#111111",
)

e = html.escape

# Set for the 390 px artboard (and mirrored by the real page's media queries):
# every multi-column grid collapses, the table becomes stacked cards.
NARROW = False


def gcols(n, narrow=1):
    return f"repeat({narrow if NARROW else n}, minmax(0, 1fr))"


def gpair(a, b, narrow="1fr"):
    return narrow if NARROW else f"minmax(0, {a}fr) minmax(0, {b}fr)"


def label(text, T, color=None, size=15, mb=18):
    """The tracked section label — the document's spine."""
    return (f'<div style="font-family:{MONO};font-size:{size}px;letter-spacing:2.6px;'
            f'text-transform:uppercase;color:{color or T["red"]};margin:0 0 {mb}px 0;">{e(text)}</div>')


def h2(text, T, size=34, mb=22):
    return (f'<h2 style="font-family:{DISPLAY};font-size:{size}px;line-height:1.12;'
            f'color:{T["fg"]};margin:0 0 {mb}px 0;font-weight:normal;">{e(text)}</h2>')


def p(text, T, size=14.5, color=None, mb=0, lh=1.72, maxw=None):
    mw = f"max-width:{maxw}px;" if maxw else ""
    return (f'<p style="font-family:{BODY};font-size:{size}px;line-height:{lh};'
            f'color:{color or T["body"]};margin:0 0 {mb}px 0;{mw}text-wrap:pretty;">{e(text)}</p>')


def section(inner, T, pad=64, border=True, bg=None):
    pad = int(pad * 0.62) if NARROW else pad
    bd = f"border-top:1px solid {T['line']};" if border else ""
    bgc = f"background:{bg};" if bg else ""
    return f'<section style="{bd}{bgc}padding:{pad}px 0;">{inner}</section>'


# ── 01 · position ───────────────────────────────────────────────────────────
def sec_position(L, T):
    d = L["s01"]
    return section(label(d["label"], T) + h2(d["title"], T, 34, 24)
                   + "".join(p(x, T, 17.5, T["fg"], mb=18, lh=1.72, maxw=980)
                             for x in d["body"].split("\n")), T)


# ── 02 · the trajectory graph ───────────────────────────────────────────────
def trajectory_svg(L, T, W=1120, H=236):
    """A wave, not a fall-and-rise: the peaks are named underneath and the
    line carries the shape. No highlighted region, no annotation on the line —
    the reader is not told which part to feel bad about."""
    pts = S["trajectory"]
    n = len(pts)
    padT, padB = 22, 26
    innerH = H - padT - padB
    xs = [16 + (W - 32) * i / (n - 1) for i in range(n)]
    ys = [padT + innerH * (1 - pt["v"] / 100.0) for pt in pts]

    o = [f'<svg viewBox="0 0 {W} {H}" width="100%" height="{H}" '
         f'style="display:block;overflow:visible;" xmlns="http://www.w3.org/2000/svg">']
    for k in range(5):
        y = padT + innerH * k / 4
        o.append(f'<line x1="0" y1="{y:.1f}" x2="{W}" y2="{y:.1f}" '
                 f'stroke="{T["line"]}" stroke-width="1" />')
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in zip(xs, ys))
    o.append(f'<polyline points="{poly}" fill="none" stroke="{T["red"]}" '
             f'stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round" />')
    for i, pt in enumerate(pts):
        if pt.get("peak"):
            o.append(f'<circle cx="{xs[i]:.1f}" cy="{ys[i]:.1f}" r="9" fill="none" '
                     f'stroke="{T["gold"]}" stroke-width="1.25" />')
            o.append(f'<circle cx="{xs[i]:.1f}" cy="{ys[i]:.1f}" r="4.5" fill="{T["red"]}" />')
        else:
            o.append(f'<circle cx="{xs[i]:.1f}" cy="{ys[i]:.1f}" r="4" fill="{T["bg"]}" '
                     f'stroke="{T["red"]}" stroke-width="1.75" />')
    o.append("</svg>")
    return "".join(o)


def sec_trajectory(L, T):
    pts = S["trajectory"]
    cells = []
    for pt in pts:
        d = L["s02"]["points"][pt["key"]]
        accent = T["red"] if pt.get("peak") else T["meta"]
        cells.append(
            f'<div style="border-top:1px solid {T["line"]};padding:12px 14px 0 0;">'
            f'<div style="font-family:{MONO};font-size:14px;letter-spacing:1.4px;color:{accent};'
            f'margin-bottom:8px;">{e(pt["year"])}</div>'
            f'<div style="font-family:{DISPLAY};font-size:18px;line-height:1.25;color:{T["fg"]};'
            f'margin-bottom:7px;">{e(d["title"])}</div>'
            f'<div style="font-family:{BODY};font-size:16px;line-height:1.55;color:{T["body"]};">'
            f'{e(d["meta"])}</div></div>')
    grid = ('<div style="display:grid;grid-template-columns:' + gcols(5, 2) + ';'
            f'gap:22px 26px;margin-top:34px;">{"".join(cells)}</div>')
    axis = (f'<div style="font-family:{MONO};font-size:12px;letter-spacing:1.8px;'
            f'text-transform:uppercase;color:{T["meta"]};margin:0 0 16px 0;">'
            f'↑ {e(L["s02"]["axis"])}</div>') if L["s02"].get("axis") else ""
    note = (f'<div style="max-width:430px;">'
            f'{p(L["s02"]["note"], T, 12.5, T["meta"], lh=1.6)}</div>'
            ) if L["s02"].get("note") else ""
    head = ('<div style="display:flex;justify-content:space-between;align-items:flex-end;'
            'gap:40px;margin-bottom:26px;">'
            f'<div>{label(L["s02"]["label"], T)}{h2(L["s02"]["title"], T, 34, 0)}</div>'
            f'{note}</div>')
    return section(head + axis + trajectory_svg(L, T) + grid, T)


# ── 03 · Ukraine × United States ────────────────────────────────────────────
def bullets(items, T, accent):
    out = []
    for it in items:
        out.append(
            '<li style="display:flex;gap:12px;align-items:flex-start;margin:0 0 15px 0;">'
            f'<span style="flex:0 0 auto;width:5px;height:5px;background:{accent};'
            'margin-top:8px;transform:rotate(45deg);"></span>'
            f'<span style="font-family:{BODY};font-size:15.5px;line-height:1.65;'
            f'color:{T["body"]};text-wrap:pretty;">{e(it)}</span></li>')
    return f'<ul style="list-style:none;margin:0;padding:0;">{"".join(out)}</ul>'


def sec_two_schools(L, T):
    d = L["s03"]
    left = (f'<div style="padding:{"0 0 30px 0" if NARROW else "0 38px 0 0"};">'
            f'{label(d["leftLabel"], T, T["gold"], 13, 20)}{bullets(d["left"], T, T["gold"])}</div>')
    right = (f'<div style="padding:{"30px 0 0 0" if NARROW else "0 0 0 38px"};'
             f'border-{"top" if NARROW else "left"}:1px solid {T["seam"]};">'
             f'{label(d["rightLabel"], T, T["red"], 13, 20)}{bullets(d["right"], T, T["red"])}</div>')
    cols = ('<div style="display:grid;grid-template-columns:' + gcols(2) + ';'
            f'gap:0;margin-bottom:44px;">{left}{right}</div>')

    meet = (f'<div style="background:{T["redSoft"]};border-left:2px solid {T["red"]};'
            'padding:28px 32px;margin-bottom:20px;">'
            f'{label(d["meetLabel"], T, T["red"], 13, 14)}'
            f'<div style="font-family:{DISPLAY};font-size:27px;line-height:1.1;color:{T["fg"]};'
            f'margin-bottom:12px;">{e(d["meetTitle"])}</div>'
            f'{p(d["meetBody"], T, 14, maxw=780)}</div>')
    europe = (f'<div style="border-left:2px solid {T["line2"]};padding:24px 32px;">'
              f'{label(d["europeLabel"], T, T["meta"], 13, 12)}'
              f'<div style="font-family:{DISPLAY};font-size:19px;line-height:1.2;'
              f'color:{T["fg"]};margin-bottom:9px;">{e(d["europeTitle"])}</div>'
              f'{p(d["europeBody"], T, 13, T["meta"], maxw=780)}</div>')
    return section(label(d["label"], T) + h2(d["title"], T, 34, 34) + cols + meet + europe, T)


# ── 04 · the honest section ─────────────────────────────────────────────────
def sec_gap(L, T):
    d = L["s04"]
    paras = "".join(p(x, T, 15, mb=20, lh=1.78) for x in d["paras"])
    return section(
        f'<div style="border-left:2px solid {T["gold"]};padding-left:38px;max-width:900px;">'
        f'{label(d["label"], T, T["gold"])}{h2(d["title"], T, 38, 30)}{paras}</div>',
        T, pad=72, bg=T["panel"])


# ── 05 · what the detour built ──────────────────────────────────────────────
def sec_payoff(L, T):
    d = L["s05"]
    cells = []
    for it in d["items"]:
        cells.append(
            f'<div style="border-top:2px solid {T["red"]};padding-top:16px;">'
            + (f'<div style="font-family:{MONO};font-size:13px;letter-spacing:2px;'
               f'color:{T["red"]};margin-bottom:12px;">{e(it["n"])}</div>'
               if it["n"] else "")
            + f'<div style="font-family:{DISPLAY};font-size:21px;line-height:1.15;'
              f'color:{T["fg"]};margin-bottom:10px;">{e(it["title"])}</div>'
            + f'{p(it["body"], T, 17, lh=1.65)}</div>')
    grid = ('<div style="display:grid;grid-template-columns:' + gcols(4) + ';'
            f'gap:30px;">{"".join(cells)}</div>')
    return section(label(d["label"], T) + grid, T)


# ── 06 · repertoire ─────────────────────────────────────────────────────────
def status_color(status, T):
    s = status.lower()
    if "develop" in s or "розроб" in s or "développ" in s:
        return T["meta"]
    if ("готов" in s or "prêt" in s or "prête" in s or "ready" in s or "finished" in s):
        return T["gold"]
    if ("repertoire" in s or "репертуар" in s or "répertoire" in s
            or "у роботі" in s or "en cours" in s or "work in progress" in s):
        return T["gold"]
    return T["red"]


def sec_repertoire(L, T):
    d = L["s06"]
    cols = "1fr" if NARROW else "230px 108px 1fr 1fr 200px"
    head_cells = [d["colWork"], d["colYear"], d["colFormat"], d["colMusic"], d["colStatus"]]
    rows = [] if NARROW else [(f'<div style="display:grid;grid-template-columns:{cols};gap:20px;'
             f'padding:0 0 12px 0;border-bottom:1px solid {T["line2"]};">'
             + "".join(f'<div style="font-family:{MONO};font-size:12px;letter-spacing:1.8px;'
                       f'text-transform:uppercase;color:{T["meta"]};">{e(c)}</div>'
                       for c in head_cells) + "</div>")]
    for w in S["repertoire"]:
        wd = d["works"][w["key"]]
        sc = status_color(wd["status"], T)
        rows.append(
            f'<div style="display:grid;grid-template-columns:{cols};gap:20px;align-items:baseline;'
            f'padding:17px 0;border-bottom:1px solid {T["line"]};">'
            f'<div style="font-family:{DISPLAY};font-size:19px;color:{T["fg"]};'
            f'letter-spacing:0.5px;">{e(wd.get("title", w["title"]))}</div>'
            f'<div style="font-family:{MONO};font-size:13.5px;color:{T["meta"]};">{e(w["year"])}</div>'
            f'<div style="font-family:{BODY};font-size:14.5px;line-height:1.5;'
            f'color:{T["body"]};">{e(wd["format"])}</div>'
            f'<div style="font-family:{BODY};font-size:14.5px;line-height:1.5;'
            f'color:{T["meta"]};">{e(wd.get("music", w["music"]))}</div>'
            f'<div style="font-family:{MONO};font-size:12px;letter-spacing:1.4px;'
            f'text-transform:uppercase;color:{sc};">{e(wd["status"])}</div></div>')
    icare_head, _, icare_body = d["icareNote"].partition("\n")
    note = (f'<div style="margin-top:26px;border-left:2px solid {T["red"]};padding-left:22px;'
            f'max-width:900px;">{label(icare_head, T, T["red"], 13, 10)}'
            f'{p(icare_body, T, 17, T["body"], lh=1.7)}</div>'
            f'<div style="margin-top:16px;border-left:2px solid {T["gold"]};padding-left:22px;'
            f'max-width:900px;">{p(d["tourNote"], T, 17, T["body"], lh=1.7)}</div>')
    works_link = (f'<a href="{e(S["contact"]["siteUrl"])}/uk#works" '
                  f'style="display:inline-flex;align-items:center;gap:12px;'
                  f'border:1px solid {T["line2"]};color:{T["fg"]};font-family:{MONO};'
                  f'font-size:13px;letter-spacing:2.4px;text-transform:uppercase;'
                  f'padding:16px 30px;text-decoration:none;margin-top:28px;">'
                  f'{e(d["worksBtn"])}</a>')
    head = ('<div style="display:flex;justify-content:space-between;align-items:flex-end;'
            'gap:40px;margin-bottom:28px;">'
            f'<div>{label(d["label"], T)}{h2(d["title"], T, 30, 0)}</div></div>')
    return section(head + "".join(rows) + note + works_link, T)


# ── 07 · collaborations · recognition ───────────────────────────────────────
def sec_collabs(L, T):
    d = L["s07"]
    rows = []
    for c in S["collabs"]:
        rows.append(
            f'<div style="display:flex;gap:{"7px" if NARROW else "22px"};'
            f'flex-direction:{"column" if NARROW else "row"};'
            f'align-items:{"stretch" if NARROW else "baseline"};padding:13px 0;'
            f'border-top:1px solid {T["line"]};">'
            f'<div style="flex:{"0 0 auto" if NARROW else "0 0 200px"};font-family:{DISPLAY};font-size:17px;'
            f'color:{T["fg"]};">{e(c["name"])}</div>'
            f'<div style="flex:1;font-family:{BODY};font-size:14.5px;line-height:1.55;'
            f'color:{T["meta"]};">{e(d["collabs"][c["key"]])}</div></div>')
    awards = []
    for a in S["awards"]:
        awards.append(
            f'<div style="padding:15px 0;border-top:1px solid {T["line"]};">'
            f'<div style="font-family:{MONO};font-size:13px;letter-spacing:1.6px;'
            f'color:{T["gold"]};margin-bottom:8px;">{e(a["year"])}</div>'
            f'<div style="font-family:{BODY};font-size:15px;line-height:1.55;'
            f'color:{T["fg"]};">{e(d["awards"][a["key"]])}</div></div>')
    left = (f'<div>{label(d["collabsTitle"], T, T["meta"], 13, 16)}{"".join(rows)}</div>')
    right = (f'<div>{label(d["awardsTitle"], T, T["meta"], 13, 16)}{"".join(awards)}</div>')
    grid = ('<div style="display:grid;grid-template-columns:' + gpair(1.9, 1) + ';'
            f'gap:56px;">{left}{right}</div>')
    return section(label(d["label"], T) + grid, T)


# ── 08 · profile ────────────────────────────────────────────────────────────
def sec_profile(L, T):
    d = L["s08"]
    f = S["facts"]

    def fact(k, v):
        return (f'<div style="border-top:1px solid {T["line"]};padding-top:12px;">'
                f'<div style="font-family:{MONO};font-size:12px;letter-spacing:1.8px;'
                f'text-transform:uppercase;color:{T["meta"]};margin-bottom:8px;">{e(k)}</div>'
                f'<div style="font-family:{BODY};font-size:15px;line-height:1.5;'
                f'color:{T["fg"]};">{e(v)}</div></div>')

    facts = "".join([
        fact(d["education"], d["educationValue"]),
        fact(d["specialty"], d["specialtyValue"]),
        fact(d["productions"], f["productions"]),
        "" if NARROW else '<div></div>',
        fact(d["countries"], d["countriesValue"]),
        fact(d["producer"], f["producer"]),
    ])
    grid = ('<div style="display:grid;grid-template-columns:' + gcols(3) + ';'
            f'gap:26px 34px;margin-bottom:44px;">{facts}</div>')
    # «Напрями» знято; «Мови» стоять на його місці, горизонтально на всю ширину
    langs = "".join(
        f'<div style="border-top:1px solid {T["line"]};padding:14px 0 0 0;">'
        f'<div style="font-family:{BODY};font-size:17px;line-height:1.4;'
        f'color:{T["fg"]};margin-bottom:7px;">{e(x["name"])}</div>'
        f'<div style="font-family:{MONO};font-size:13px;letter-spacing:1.2px;'
        f'color:{T["meta"]};">{e(x["level"])}</div></div>'
        for x in d["languages"])
    bottom = (f'<div style="padding-left:{"0" if NARROW else "56px"};">'
              f'{label(d["languagesLabel"], T, T["meta"], 15, 18)}'
              '<div style="display:grid;grid-template-columns:' + gcols(4, 2) + ';'
              f'gap:26px 34px;">{langs}</div></div>')

    # Where the body comes from — the first thing a company director looks for.
    lines = "".join(
        f'<div style="display:flex;gap:13px;align-items:flex-start;padding:12px 0;'
        f'border-top:1px solid {T["line"]};">'
        f'<span style="flex:0 0 auto;width:5px;height:5px;background:{T["gold"]};'
        'margin-top:9px;transform:rotate(45deg);"></span>'
        f'<span style="font-family:{BODY};font-size:17px;line-height:1.6;'
        f'color:{T["fg"]};">{e(x)}</span></div>' for x in d["school"])
    school = (f'<div style="margin-bottom:44px;">'
              f'{label(d["schoolLabel"], T, T["meta"], 15, 18)}'
              '<div style="display:grid;grid-template-columns:' + gcols(2) + ';'
              f'gap:0 40px;">{lines}</div></div>')
    return section(label(d["label"], T) + grid + school + bottom, T)


# ── 09 · open for · contact ─────────────────────────────────────────────────
def sec_open(L, T):
    d = L["s09"]
    c = S["contact"]
    items = "".join(
        f'<div style="display:flex;gap:16px;align-items:flex-start;padding:14px 0;'
        f'border-top:1px solid {T["line2"]};">'
        f'<span style="font-family:{MONO};font-size:12.5px;letter-spacing:1.4px;'
        f'color:{T["red"]};flex:0 0 auto;padding-top:3px;">0{i + 1}</span>'
        f'<span style="font-family:{BODY};font-size:17px;line-height:1.6;'
        f'color:{T["fg"]};text-wrap:pretty;">{e(x)}</span></div>'
        for i, x in enumerate(d["items"]))

    def link(href, text, mono=True):
        fam = MONO if mono else BODY
        return (f'<a href="{e(href)}" style="font-family:{fam};font-size:15px;'
                f'letter-spacing:0.6px;color:{T["fg"]};text-decoration:none;'
                f'border-bottom:1px solid {T["red"]};padding-bottom:2px;">{e(text)}</a>')

    contact = (
        f'<div style="padding-left:{"0" if NARROW else "28px"};">'
        f'{label(d["contactLabel"], T, T["red"], 13, 20)}'
        '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start;">'
        f'{link("mailto:" + c["email"], c["email"])}'
        f'{link(c["whatsappUrl"], "WhatsApp " + c["whatsapp"])}'
        f'{link(c["instagram"], "Instagram " + c["instagramHandle"])}'
        f'{link(c["siteUrl"], c["site"])}'
        '</div>'
        f'<div style="margin-top:26px;font-family:{MONO};font-size:12px;letter-spacing:1.6px;'
        f'text-transform:uppercase;color:{T["meta"]};">{e(d["producerLabel"])} — '
        f'{e(S["facts"]["producer"])}</div></div>')
    grid = ('<div style="display:grid;grid-template-columns:' + gpair(1.75, 1) + ';'
            f'gap:60px;align-items:start;">'
            f'<div>{h2(d["title"], T, 32, 24)}{items}</div>{contact}</div>')
    return section(label(d["label"], T) + grid, T, pad=72, bg=T["panel"])


# ── masthead ────────────────────────────────────────────────────────────────
def masthead(L, T, screen=True):
    c = S["contact"]
    top = ('<div style="display:flex;justify-content:space-between;align-items:center;'
           f'padding-bottom:20px;border-bottom:1px solid {T["line2"]};margin-bottom:52px;">'
           f'<span style="font-family:{MONO};font-size:14px;letter-spacing:3px;'
           f'text-transform:uppercase;color:{T["red"]};">{e(L["docLabel"])}</span>'
           f'<a href="{e(c["siteUrl"])}" style="font-family:{MONO};font-size:14px;'
           f'letter-spacing:3px;text-transform:uppercase;color:{T["body"]};'
           f'text-decoration:none;">{e(c["site"])}</a></div>')
    name = (f'<h1 style="font-family:{DISPLAY};font-size:{(38 if NARROW else 78) if screen else 60}px;'
            f'line-height:0.98;margin:0 0 20px 0;font-weight:normal;letter-spacing:1px;">'
            f'<span style="color:{T["fg"]};">ARTEM</span> '
            f'<span style="color:{T["red"]};">HORDIEIEV</span></h1>')
    base = (f'<div style="font-family:{BODY};font-size:15.5px;color:{T["meta"]};'
            f'margin-bottom:44px;">{e(L["base"])}</div>') if L.get("base") else ""
    role = (f'<div style="font-family:{MONO};font-size:21px;letter-spacing:4.5px;'
            f'text-transform:uppercase;color:{T["fg"]};'
            f'margin-bottom:{"10px" if base else "40px"};">'
            f'{e(L["role"])}</div>' + base)
    claim_lines = "".join(
        f'<div style="font-family:{QUOTE};font-size:23px;line-height:1.38;'
        f'color:{T["fg"] if i == 0 else T["gold"]};">{e(x)}</div>'
        for i, x in enumerate(L["claim"].split("\n")))
    claim = (f'<div style="border-left:2px solid {T["gold"]};padding-left:28px;'
             f'margin-bottom:48px;max-width:720px;">{claim_lines}</div>')
    stats = "".join(
        f'<div style="border-top:1px solid {T["line"]};padding-top:12px;">'
        f'<div style="font-family:{MONO};font-size:13px;letter-spacing:2px;'
        f'text-transform:uppercase;color:{T["meta"]};margin-bottom:9px;">{e(x["label"])}</div>'
        f'<div style="font-family:{BODY};font-size:19px;line-height:1.3;'
        f'color:{T["fg"]};">{e(x["value"])}</div></div>'
        for x in L["headStats"])
    stats = ('<div style="display:grid;grid-template-columns:' + gcols(4, 2) + ';'
             f'gap:30px;">{stats}</div>')
    return f'<header style="padding:44px 0 60px 0;">{top}{name}{role}{claim}{stats}</header>'


def actions(L, T):
    """Screen-only: the two things a five-second visitor needs."""
    return (f'<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;'
            f'padding:14px 0 22px 0;">'
            f'<span style="display:inline-flex;align-items:center;gap:14px;'
            f'background:{T["red"]};color:#f5f5f5;font-family:{MONO};font-size:15px;'
            f'letter-spacing:2.8px;text-transform:uppercase;padding:21px 42px;">'
            f'{e(L["downloadBtn"])} ↓</span>'
            f'<span style="display:inline-flex;align-items:center;gap:14px;'
            f'border:1px solid {T["line2"]};color:{T["fg"]};font-family:{MONO};'
            f'font-size:15px;letter-spacing:2.8px;text-transform:uppercase;'
            f'padding:21px 42px;">← {e(L["backBtn"])}</span></div>')


def footer(L, T):
    c = S["contact"]
    return (f'<footer style="border-top:1px solid {T["line"]};padding:30px 0 10px 0;'
            'display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;">'
            f'<span style="font-family:{MONO};font-size:12px;letter-spacing:2px;'
            f'text-transform:uppercase;color:{T["meta"]};">'
            f'ARTEM HORDIEIEV · {e(L["docLabel"])}</span>'
            f'<span style="font-family:{MONO};font-size:12px;letter-spacing:2px;'
            f'color:{T["meta"]};">{e(L["printedFrom"])} '
            f'<a href="{e(c["siteUrl"])}" style="color:{T["meta"]};'
            f'text-decoration:none;">{e(c["site"])}</a></span></footer>')


# ── artboard assembly ───────────────────────────────────────────────────────
HEAD = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    body { margin: 0; background: __BG__; }
    a { color: __FG__; text-decoration: none; }
    a:hover { color: __RED__; }
    ::selection { background: __RED__; color: #f5f5f5; }
__NAMU__
  </style>
</helmet>
"""
FOOT = "</x-dc>\n</body>\n</html>\n"


def wrap(inner, T):
    head = (HEAD.replace("__NAMU__", NAMU_FACES).replace("__BG__", T["bg"])
            .replace("__FG__", T["fg"]).replace("__RED__", T["red"]))
    return head + inner + FOOT


# Document order. Section 01 was missing from both the artboards and the page
# until 27.08 — it is the section that opens the whole argument.
SECTION_ORDER = ["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09"]

SECTIONS = {
    "s01": sec_position,
    "s02": sec_trajectory,
    "s03": sec_two_schools,
    "s04": sec_gap,
    "s05": sec_payoff,
    "s06": sec_repertoire,
    "s07": sec_collabs,
    "s08": sec_profile,
    "s09": sec_open,
}


def full_cv(loc, T, width=1440, pad=64, screen=True):
    L = COPY[loc]
    ordered = "".join(SECTIONS[k](L, T) for k in SECTION_ORDER)
    body = (masthead(L, T, screen)
            + (actions(L, T) if screen else "")
            + ordered + footer(L, T))
    return wrap(f'<div style="background:{T["bg"]};padding:0 {pad}px 40px {pad}px;'
                f'width:{width}px;box-sizing:border-box;">{body}</div>', T)


# ── direction sketches ──────────────────────────────────────────────────────
def sketch_frame(title, note, inner, T, w=900):
    head = ('<div style="display:flex;justify-content:space-between;align-items:baseline;'
            f'gap:24px;padding:26px 44px 20px 44px;border-bottom:1px solid {T["line"]};">'
            f'<span style="font-family:{MONO};font-size:13px;letter-spacing:3px;'
            f'text-transform:uppercase;color:{T["red"]};">{e(title)}</span>'
            f'<span style="font-family:{BODY};font-size:13.5px;color:{T["meta"]};'
            f'max-width:460px;text-align:right;line-height:1.5;">{e(note)}</span></div>')
    return wrap(f'<div style="background:{T["bg"]};width:{w}px;box-sizing:border-box;">'
                f'{head}<div style="padding:38px 44px 44px 44px;">{inner}</div></div>', T)


def direction_b(loc="fr"):
    """Split field — the two schools as two coloured halves, red seam between."""
    L, T = COPY[loc], DARK
    d = L["s03"]
    half = ('<div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0;'
            f'border:1px solid {T["line"]};margin-bottom:30px;">'
            f'<div style="background:{T["goldSoft"]};padding:32px 30px;">'
            f'{label("УКРАЇНА", T, T["gold"], 11, 18)}'
            f'<div style="font-family:{DISPLAY};font-size:30px;line-height:1.08;'
            f'color:{T["fg"]};margin-bottom:16px;">{e(d["leftLabel"])}</div>'
            f'{p(d["left"][0], T, 13)}</div>'
            f'<div style="background:{T["redSoft"]};padding:32px 30px;'
            f'border-left:2px solid {T["seam"]};">'
            f'{label("США", T, T["red"], 11, 18)}'
            f'<div style="font-family:{DISPLAY};font-size:30px;line-height:1.08;'
            f'color:{T["fg"]};margin-bottom:16px;">{e(d["rightLabel"])}</div>'
            f'{p(d["right"][0], T, 13)}</div></div>')
    name = (f'<h1 style="font-family:{DISPLAY};font-size:62px;line-height:0.98;margin:0 0 14px 0;'
            f'font-weight:normal;"><span style="color:{T["fg"]};">ARTEM</span> '
            f'<span style="color:{T["red"]};">HORDIEIEV</span></h1>'
            f'<div style="font-family:{MONO};font-size:13px;letter-spacing:3.2px;'
            f'text-transform:uppercase;color:{T["body"]};margin-bottom:34px;">{e(L["role"])}</div>')
    gap = (f'<div style="background:{T["panel"]};padding:30px 32px;">'
           f'{label(L["s04"]["label"], T, T["gold"], 10, 14)}'
           f'<div style="font-family:{DISPLAY};font-size:24px;line-height:1.12;'
           f'color:{T["fg"]};margin-bottom:14px;">{e(L["s04"]["title"])}</div>'
           f'{p(L["s04"]["paras"][0], T, 13.5)}</div>')
    return sketch_frame(
        "НАПРЯМОК B — РОЗДІЛЕНЕ ПОЛЕ",
        "Дві школи стають самою версткою: половина золота, половина червона, білий шов "
        "посередині. Б'є одразу — але на всю довжину резюме така сітка втомлює.",
        name + half + gap, T)


def direction_c(loc="fr"):
    """Ledger — near-monochrome, mono-dominant, red used three times only."""
    L, T = COPY[loc], DARK
    rows = []
    for pt in S["trajectory"][:6]:
        pd = L["s02"]["points"][pt["key"]]
        rows.append(
            f'<div style="display:grid;grid-template-columns:110px 1fr;gap:24px;'
            f'padding:12px 0;border-top:1px solid {T["line"]};">'
            f'<span style="font-family:{MONO};font-size:13px;letter-spacing:1.4px;'
            f'color:{T["meta"]};">{e(pt["year"])}</span>'
            f'<span style="font-family:{MONO};font-size:14px;letter-spacing:0.4px;'
            f'color:{T["fg"]};">{e(pd["title"])}</span></div>')
    name = (f'<div style="font-family:{MONO};font-size:12px;letter-spacing:4px;'
            f'text-transform:uppercase;color:{T["meta"]};margin-bottom:26px;">'
            f'{e(L["docLabel"])}</div>'
            f'<h1 style="font-family:{MONO};font-size:34px;line-height:1.15;letter-spacing:2px;'
            f'font-weight:500;color:{T["fg"]};margin:0 0 16px 0;">ARTEM HORDIEIEV</h1>'
            f'<div style="font-family:{MONO};font-size:13px;letter-spacing:2.6px;'
            f'text-transform:uppercase;color:{T["meta"]};margin-bottom:38px;">{e(L["role"])}</div>')
    claim = (f'<div style="font-family:{MONO};font-size:17px;line-height:1.75;color:{T["fg"]};'
             f'border-left:1px solid {T["red"]};padding-left:20px;margin-bottom:38px;'
             f'white-space:pre-line;">{e(L["claim"])}</div>')
    return sketch_frame(
        "НАПРЯМОК C — РЕГІСТР",
        "Радикальна стриманість: усе моноширинним, майже монохром, червоний рівно тричі "
        "на документ. Жест «жодного лоску», взятий буквально.",
        name + claim + "".join(rows), T)


# ── canvas layout ───────────────────────────────────────────────────────────
# ── canvas notes (Ukrainian — these are read by the person deciding) ───────
NOTE_BRIEF = """ЩО ЦЕ І ЧОМУ ТАК

Резюме більше не веде на surge.sh — воно живе на hordieiev.art/[мова]/cv, у межах сайту. Кнопка «Завантажити PDF» друкує цю саму сторінку: один документ, жодних розсинхронів між екраном і файлом.

СТРАТЕГІЯ ТЕКСТУ (за файлом «Уточнення в резюме АН»). Ідеальне резюме нічого не доводить. Тому головний аргумент — «пройдена дистанція»: розділ 02 малює траєкторію 2007→2026 з видимим провалом 2016–2020, а розділ 04 називає його вголос — війна з 2014, зникле фінансування, пост-радянський репертуар держтеатрів, і як через це ремесло здобувалося на ТБ. Розділ 05 конвертує це у чотири професійні переваги. Нічого не «відбілено».

ФРАНЦІЯ = УКРАЇНА × США. Розділ 03 стоїть третім, одразу після траєкторії, і побудований як дві колонки з білим швом: золото — що дала українська школа, червоне — що дав Нью-Йорк (Роден, Річардсон, Complexions). Під ними — «Гетсбі» як точка, де школи зустрілись, і європейське плече (Клуг, Марибор).

ТЕКСТ НЕ ДУБЛЮЄ САЙТ. На сайті блок співпраці — описовий. Тут він відповідає на інше питання: що саме кожна школа дала в роботу і що з цього отримає французький продюсер."""

NOTE_DIR_A = """DIRECTION A — «ТРАЄКТОРІЯ» (рекомендую, це Main).

Спорідненість із сайтом: та сама чорна основа, той самий червоний #c8102e, той самий NAMU-1400.

Відмінність — свідома: (1) NAMU працює дрібно, у трекованих мітках, а не як гігантський дисплей — це документ, не афіша; (2) з'являється моноширинний шар (JetBrains Mono) для дат, статусів і цифр — досьє, а не лендинг; (3) вмикається золото #d4af37 — токен, який уже є в globals.css, але на сайті ніде не використовується; (4) секції в рамках із внутрішнім відступом, а не на всю ширину, як смуги сайту.

Головний елемент — графік траєкторії. Він не декоративний: це і є аргумент резюме, показаний за секунду."""

NOTE_PRINT = """PDF. Друк перевертає палітру: чорний A4 з'їдає фарбу і погано читається — тому папір, чорний текст, той самий червоний і темніше золото. На сайті це зроблено однією зміною CSS-змінних у @media print, тож PDF — це буквально ця сама сторінка, а не окремий файл, який колись розійдеться з нею.

Ширина 794 px = A4 при 96 dpi. Артборд позначений print:flow, тож в експорті він пагінується, а не стискається в одну сторінку."""

NOTE_DIR_BC = """ДВІ АЛЬТЕРНАТИВИ — щоб було з чим порівняти, а не щоб обрати «ще один відтінок».

B — ЧАМП ПАРТАЖЕ. Дві школи стають самою версткою: половина золота, половина червона, білий шов посередині. Плюс: б'є одразу, ідея зчитується без читання. Мінус: на всю довжину резюме така сітка втомлює, а таблиця репертуару в неї не лягає.

C — РЕГІСТР. Усе моноширинним, майже монохром, червоний рівно тричі на документ. Плюс: буквальний жест «жодного лоску» — форма підтверджує текст. Мінус: холодно; для хореографа ризикує читатися як резюме інженера."""

NOTE_LANGS = """ТРИ МОВИ, ПОРУЧ.

Українська лишається майстер-версією: коли правка приходить у ній, я переношу її у французьку й англійську. Але правити можна будь-яку з трьох — вони однакові артборди, з тими самими блоками в тому самому порядку.

Якщо правиш FR або EN напряму, я зчитую правку саме з тієї мови і не переписую її з української. Французька — версія для ринку, тож вона перекладена під французького продюсера, а не слово в слово: у ній фрази місцями довші за українські.

Тексти всіх трьох живуть в одному джерелі design/cv/copy.json, з якого генеруються і ці артборди, і src/lib/cv-data.ts для сайту."""


def canvas(h):
    """Page 1 holds all three languages side by side — UA is still the master
    version, but FR and EN are the same artboards and take edits directly.
    Print and phone views sit on page 2, the directions not taken on page 3."""
    return {
        "pages": [
            {"id": "page-1", "name": "Три мови — правлю тут"},
            {"id": "page-2", "name": "PDF · мобільна"},
            {"id": "page-3", "name": "Варіанти"},
        ],
        "artboards": [
            {"file": "Main.dc.html", "page": "page-1", "x": 0, "y": 0,
             "w": 1440, "h": h["Main"],
             "title": "UA — майстер-версія"},
            {"file": "French.dc.html", "page": "page-1", "x": 1560, "y": 0,
             "w": 1440, "h": h["French"], "title": "FR — версія для ринку"},
            {"file": "English.dc.html", "page": "page-1", "x": 3120, "y": 0,
             "w": 1440, "h": h["English"], "title": "EN — міжнародна версія"},

            {"file": "Print.dc.html", "page": "page-2", "x": 0, "y": 0,
             "w": 794, "h": h["Print"], "title": "PDF / A4 — FR", "print": "flow"},
            {"file": "Mobile.dc.html", "page": "page-2", "x": 914, "y": 0,
             "w": 390, "h": h["Mobile"], "title": "390 px — UA"},

            {"file": "DirectionB.dc.html", "page": "page-3", "x": 0, "y": 0,
             "w": 900, "h": h["DirectionB"], "title": "B — розділене поле"},
            {"file": "DirectionC.dc.html", "page": "page-3", "x": 1020, "y": 0,
             "w": 900, "h": h["DirectionC"], "title": "C — регістр"},
        ],
        "annotations": [
            {"id": "langues", "page": "page-1", "x": 0, "y": -560, "w": 1440,
             "text": NOTE_LANGS},
            {"id": "brief", "page": "page-1", "x": 4680, "y": 0, "w": 900,
             "text": NOTE_BRIEF},
            {"id": "dir-a", "page": "page-1", "x": 4680, "y": 720, "w": 900,
             "text": NOTE_DIR_A},
            {"id": "print", "page": "page-2", "x": 0, "y": -420, "w": 700,
             "text": NOTE_PRINT},
            {"id": "dir-bc", "page": "page-3", "x": 0, "y": -420, "w": 900,
             "text": NOTE_DIR_BC},
        ],
        "launch": {"view": "canvas", "page": "page-1"},
    }


# ── src/lib/cv-data.ts ──────────────────────────────────────────────────────
def ts_literal(v, indent=2):
    pad = " " * indent
    if isinstance(v, dict):
        inner = ",\n".join(f"{pad}  {json.dumps(k, ensure_ascii=False)}: "
                           f"{ts_literal(val, indent + 2)}" for k, val in v.items())
        return "{\n" + inner + f"\n{pad}}}"
    if isinstance(v, list):
        inner = ",\n".join(f"{pad}  {ts_literal(x, indent + 2)}" for x in v)
        return "[\n" + inner + f"\n{pad}]"
    return json.dumps(v, ensure_ascii=False)


def write_ts():
    payload = {"shared": S, "en": COPY["en"], "fr": COPY["fr"], "uk": COPY["uk"]}
    src = (
        "// GENERATED — do not edit by hand.\n"
        "// Source of truth: design/cv/copy.json · regenerate with `python3 design/cv/gen.py`.\n"
        "//\n"
        "// The CV is structured content, not editable site copy, so it lives in the repo\n"
        "// rather than in Notion — no fetch, no empty-default trap (see AGENTS.md).\n\n"
        "export type CvLocale = \"en\" | \"uk\" | \"fr\";\n\n"
        "export const cvData = " + ts_literal(payload, 0) + " as const;\n\n"
        "export const cvShared = cvData.shared;\n\n"
        "export function getCv(locale: CvLocale) {\n"
        "  return cvData[locale];\n"
        "}\n"
    )
    (ROOT / "src" / "lib" / "cv-data.ts").write_text(src, encoding="utf-8")
    return "src/lib/cv-data.ts"


# ── main ────────────────────────────────────────────────────────────────────
def main(ts_only=False):
    global NARROW
    if ts_only:
        print(" ", write_ts())
        return
    written = {}

    def put(name, html_src):
        (HERE / name).write_text(html_src, encoding="utf-8")
        written[name] = len(html_src)

    # Ukrainian is the master version — Artem edits it, FR and EN are derived
    # from it. So Main, the entry artboard, is the Ukrainian one.
    put("Main.dc.html", full_cv("uk", DARK))
    put("French.dc.html", full_cv("fr", DARK))
    put("English.dc.html", full_cv("en", DARK))
    # The PDF stays French: that is the version a French programmer receives.
    put("Print.dc.html", full_cv("fr", PAPER, width=794, pad=48, screen=False))
    NARROW = True
    put("Mobile.dc.html", full_cv("uk", DARK, width=390, pad=20))
    NARROW = False
    put("DirectionB.dc.html", direction_b("uk"))
    put("DirectionC.dc.html", direction_c("uk"))

    # measured from the rendered artboards, plus ~8% slack (surplus frame
    # paints the artboard background, clipping is the only real failure)
    # MEASURED, not guessed — see design/cv/README.md for how to re-measure.
    # A frame shorter than its artboard CLIPS the bottom silently; surplus just
    # paints the artboard background. Re-measure after any change that adds
    # text or raises type sizes: on 27.08 the copy grew past a stale 5900 and
    # cut ~1800 px off the end of the CV.
    # переміряно в браузері 03.09.2026, кожен у своїй ширині, +6% запасу
    heights = {"Main": 7870, "French": 8030, "English": 7780,
               "Print": 10510, "Mobile": 15730, "DirectionB": 950,
               "DirectionC": 750}
    c = canvas(heights)
    (HERE / "canvas.json").write_text(
        json.dumps(c, ensure_ascii=False, indent=2), encoding="utf-8")

    ts = write_ts()
    for k, v in written.items():
        print(f"  {k:24} {v // 1024:>4} KB")
    print(f"  canvas.json")
    print(f"  {ts}")


if __name__ == "__main__":
    import sys
    main(ts_only="--ts-only" in sys.argv)
