#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Канвас «Когорти» — чернетка розділу, де відвідувач сайту сам каже, хто він,
і забирає свій набір файлів.

Той самий підхід, що в design/cv/gen.py: увесь текст живе тут, скрипт малює
артборди .dc.html поруч із собою. Шрифт NAMU вшивається base64, тому файли
важкі й у git не йдуть.

    python3 design/cohorts/gen.py
"""
import base64, html, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(__file__).resolve().parent


def b64(name):
    return base64.b64encode((ROOT / "public" / "fonts" / name).read_bytes()).decode()


NAMU = b64("NAMU-1400.woff2")

BG, CARD = "#0a0a0a", "#101010"
FG, BODY, META = "#f5f5f5", "#9a9a9a", "#616161"
RED, LINE, LINE2 = "#c8102e", "#222222", "#1a1a1a"

DISPLAY = "'NAMU-1400', Georgia, serif"
MONO = "'JetBrains Mono', ui-monospace, Menlo, monospace"
SANS = "Inter, -apple-system, system-ui, sans-serif"

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
    body { margin: 0; background: #0a0a0a; color: #f5f5f5;
           font-family: Inter, -apple-system, system-ui, sans-serif;
           -webkit-font-smoothing: antialiased; }
    a { color: #c8102e; text-decoration: none; }
    a:hover { color: #f5f5f5; }
  </style>
</helmet>
""" % NAMU

FOOT = "</x-dc>\n</body>\n</html>\n"


def e(s):
    return html.escape(str(s))


def label(t, color=RED, mb=0):
    return (f'<div style="font-family:{MONO};font-size:11px;letter-spacing:2.6px;'
            f'text-transform:uppercase;color:{color};margin:0 0 {mb}px 0;">{e(t)}</div>')


def disp(t, size=38, color=FG, mb=0, lh=1.08):
    return (f'<div style="font-family:{DISPLAY};font-size:{size}px;line-height:{lh};'
            f'color:{color};margin:0 0 {mb}px 0;">{e(t)}</div>')


def par(t, size=15, color=BODY, mb=0, width="none", lh=1.62):
    return (f'<div style="font-family:{SANS};font-size:{size}px;line-height:{lh};'
            f'color:{color};margin:0 0 {mb}px 0;max-width:{width};'
            f'text-wrap:pretty;">{t}</div>')


def mono(t, size=11, color=META, ls=1.8, mb=0):
    return (f'<div style="font-family:{MONO};font-size:{size}px;letter-spacing:{ls}px;'
            f'color:{color};margin:0 0 {mb}px 0;line-height:1.5;">{e(t)}</div>')


def bullets(items, color=BODY, size=15):
    rows = "".join(
        f'<div style="display:flex;gap:10px;align-items:baseline;">'
        f'<span style="color:{RED};font-family:{MONO};font-size:10px;">—</span>'
        f'<span style="font-family:{SANS};font-size:{size}px;line-height:1.55;'
        f'color:{color};">{i}</span></div>' for i in items)
    return f'<div style="display:flex;flex-direction:column;gap:7px;">{rows}</div>'


def page(inner, pad="56px 60px 72px"):
    return (f'<div style="background:{BG};min-height:100%;padding:{pad};'
            f'box-sizing:border-box;">{inner}</div>')


def header(kicker, title, lede, width="72ch"):
    return (f'<div style="border-bottom:1px solid {LINE};padding-bottom:26px;margin-bottom:34px;">'
            + label(kicker, mb=16) + disp(title, 38, mb=16)
            + par(lede, 17, FG, width=width) + '</div>')


# ─────────────────────────────────────────────────────────────────────────────
# Дані: п'ять когорт. Прив'язка до CHORÉGRAPHE — колонки «Лінія» і «Тип» у CRM.
# ─────────────────────────────────────────────────────────────────────────────
COHORTS = [
    {
        "code": "A",
        "fr": "Direction de compagnie",
        "ua": "Театр шукає керівника",
        "who": "Опери, балетні трупи, junior ballets, вищі школи — коли відкрита вакансія "
               "директора балету, балетмейстера, керівника хореографічних студій. "
               "Когорта, заради якої сьогодні переписане CV.",
        "crm": "Лінія 4 opéra · 6 transmission · типи Opéra, Ballet, Junior ballet, CCN, "
               "École supérieure · посади Direction du Ballet, Direction des études chorégraphiques",
        "n": "≈ 22 адреси",
        "need": "Ким керував, скільки випустив, чи витримає трупу, чи має право працювати у Франції.",
        "kit": ["CV одна сторінка — FR / EN / UK",
                "Дос'є кар'єри: довга версія з переліком трупп",
                "Projet artistique для трупи — 2 сторінки",
                "Репертуар: 50+ постановок списком",
                "Відео: 3 хв відкрито, повні вистави за адресою",
                "Références — на запит"],
        "price": "Ціни немає: це наймання, а не продаж. Замість ціни — доступність, мови, статус у Франції.",
    },
    {
        "code": "B",
        "fr": "Programmation · diffusion",
        "ua": "Сцена купує показ",
        "who": "Scènes nationales й conventionnées, CDCN, міські театри, фестивалі — "
               "ті, хто ставить дату в сезон і підписує cession.",
        "crm": "Лінія 2 diffusion · 5 création · типи Scène nationale, Scène conventionnée, "
               "CDCN, CCN, Festival",
        "n": "≈ 21 адреса",
        "need": "Скільки триває, скільки людей, що з підлогою, коли вільний, скільки коштує.",
        "kit": ["Fiches S1–S4 (уже на сайті)",
                "Dossier artistique ICARE",
                "Fiche technique повна, з планом світла",
                "Календар сезону: коли вільні вікна",
                "Відео повного вечора — за адресою",
                "Фото HD із кредитами"],
        "price": "Prix de cession — «sur demande». Перша названа цифра лишається назавжди: "
                 "правило CHORÉGRAPHE, і на сайті воно теж діє.",
    },
    {
        "code": "C",
        "fr": "Action culturelle · éducation",
        "ua": "Медіатека, ліцей, музей",
        "who": "Responsables de l'action culturelle, департаментські медіатеки, ліцеї "
               "з pass Culture, музеї, університети. Найбільша частина CRM.",
        "crm": "Лінія 1 action culturelle · 6 transmission · типи Médiathèque, Conservatoire, "
               "Musée, Université, Éducation nationale",
        "n": "≈ 32 адреси — найбільша когорта",
        "need": "Чи влізе в залу, чи є devis, чи проходить через pass Culture, скільки годин.",
        "kit": ["Fiche S1 — conférence dansée",
                "Fiche ateliers і masterclass",
                "Дорожня карта EAC: як це вписати в проєкт року",
                "Devis-type для pass Culture",
                "Тариф за годину втручання"],
        "price": "Єдина когорта, де прайс показують відкрито: погодинний тариф втручання — "
                 "ринковий стандарт, його однаково спитають першим листом.",
    },
    {
        "code": "D",
        "fr": "Résidence · financement",
        "ua": "Дає простір або гроші",
        "who": "Fabriques, accueil studio CDCN, DRAC, Регіон, департаменти, фонди, меценати. "
               "Лінія Тетяни: підписує вона, не Артем.",
        "crm": "Лінія 3 résidence · 7 collectivité + окремий аркуш «Фінансування»",
        "n": "≈ 16 адрес + 24 джерела",
        "need": "Дос'є, бюджет, календар створення, юридичний статус, права на партитуру.",
        "kit": ["Dossier de production ICARE",
                "Бюджет prévisionnel",
                "Календар створення",
                "Статут асоціації + SIRET, ліцензія",
                "Стан прав на партитуру Маркевича",
                "CV команди"],
        "price": "Відкритого немає нічого: усе за адресою. У цих файлах суми — вони не лежать на сайті.",
    },
    {
        "code": "E",
        "fr": "Presse · public",
        "ua": "Просто дивиться",
        "who": "Журналісти, глядачі, колеги, майбутні танцівники. Сюди ж потрапляє кожен, "
               "хто не вибрав нічого: розділ не має глухого кута.",
        "crm": "Поза CRM. Але звідси приходить половина перших листів.",
        "n": "трафік",
        "need": "Хто це, що він зробив, як це виглядає.",
        "kit": ["Dossier de presse",
                "Біо коротке й довге, три мови",
                "Фото HD із кредитами фотографів",
                "Афіша й тизер"],
        "price": "Усе відкрито, жодної форми. Це вітрина, а не воронка.",
    },
]

TIERS = [
    ("Ouvert", "Відкрито", "Файл забирають одразу, без пошти. Усе, що можна показувати всім."),
    ("Sur adresse", "За адресою", "Пошта в обмін на посилання. З цього народжується рядок у CRM «до перевірки»."),
    ("Sur demande", "На запит", "Відповідає людина. Ціна, права, références, доступність — тільки так."),
]


def tier_mark(kind, size=13):
    """Три рівні доступу: суцільне коло, півколо, порожнє коло. Прочерк — не для цієї когорти."""
    if kind == "-":
        return (f'<svg width="{size}" height="{size}" viewBox="0 0 14 14" aria-hidden>'
                f'<line x1="3" y1="7" x2="11" y2="7" stroke="{LINE}" stroke-width="1.3"/></svg>')
    if kind == "o":
        return (f'<svg width="{size}" height="{size}" viewBox="0 0 14 14" aria-hidden>'
                f'<circle cx="7" cy="7" r="4.6" fill="{RED}"/></svg>')
    if kind == "a":
        return (f'<svg width="{size}" height="{size}" viewBox="0 0 14 14" aria-hidden>'
                f'<circle cx="7" cy="7" r="4.9" fill="none" stroke="{RED}" stroke-width="1.2"/>'
                f'<circle cx="7" cy="7" r="1.9" fill="{RED}"/></svg>')
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 14 14" aria-hidden>'
            f'<circle cx="7" cy="7" r="4.6" fill="none" stroke="{META}" stroke-width="1.3"/></svg>')


# Матриця: документ × когорта. o = відкрито, a = за адресою, d = на запит, - = не для них.
# «Стан» — чесна інвентаризація: що вже лежить у public/, що ще треба зробити.
DOCS = [
    ("CV одна сторінка — FR / EN / UK",        "ooooo", "FR і UK готові · EN у роботі", "part"),
    ("Дос'є кар'єри, довга версія",            "o--a-", "треба зробити", "todo"),
    ("Projet artistique для трупи",            "a--a-", "треба зробити", "todo"),
    ("Репертуар: 50+ постановок списком",      "ooo-o", "є на /works, окремим PDF — ні", "part"),
    ("Відео 3 хв — короткий показник",         "ooooo", "треба зняти", "todo"),
    ("Повна вистава, відео",                   "aa-a-", "треба зібрати", "todo"),
    ("Fiches S1–S4",                           "-ooo-", "готові, лежать на сайті", "done"),
    ("Dossier artistique ICARE",               "-a-a-", "треба зробити", "todo"),
    ("Fiche technique повна, план світла",     "-aa--", "частково всередині fiches", "part"),
    ("Календар сезону: вільні вікна",          "-aaa-", "треба зробити", "todo"),
    ("Fiche ateliers і masterclass",           "--o--", "треба зробити", "todo"),
    ("Тариф за годину втручання",              "--o--", "єдиний прайс, який показуємо", "todo"),
    ("Devis-type для pass Culture",            "--a--", "треба зробити", "todo"),
    ("Prix de cession",                        "-dd--", "назавжди «sur demande»", "rule"),
    ("Dossier de production + бюджет",         "---a-", "треба зробити", "todo"),
    ("Статут асоціації, SIRET, ліцензія",      "-a-a-", "після реєстрації, до 30.09", "todo"),
    ("Права на партитуру Маркевича",           "-d-d-", "тільки листом", "rule"),
    ("Références, lettres de soutien",         "d--d-", "тільки листом", "rule"),
    ("Dossier de presse + біо, три мови",      "ooooo", "треба зробити", "todo"),
    ("Фото HD із кредитами",                   "oo-oo", "частково зібрані", "part"),
]

STATE_COLOR = {"done": FG, "part": BODY, "todo": RED, "rule": META}


# ─────────────────────────────────────────────────────────────────────────────
# 1. Карта когорт
# ─────────────────────────────────────────────────────────────────────────────
def art_main():
    rows = []
    for c in COHORTS:
        left = (
            f'<div>'
            + f'<div style="display:flex;align-items:baseline;gap:14px;margin-bottom:12px;">'
            + f'<span style="font-family:{MONO};font-size:12px;letter-spacing:3px;color:{RED};">{c["code"]}</span>'
            + f'<span style="font-family:{MONO};font-size:11px;letter-spacing:2.2px;'
              f'text-transform:uppercase;color:{META};">{e(c["fr"])}</span></div>'
            + disp(c["ua"], 27, mb=14)
            + par(c["who"], 15, BODY, mb=18, width="52ch")
            + f'<div style="border-top:1px solid {LINE2};padding-top:14px;">'
            + mono("що він хоче знати", 10, META, 2.2, mb=8)
            + par(c["need"], 15, FG, width="52ch") + '</div>'
            + '</div>'
        )
        right = (
            f'<div style="border-left:1px solid {LINE};padding-left:28px;">'
            + mono("у CRM CHORÉGRAPHE", 10, RED, 2.2, mb=10)
            + par(e(c["crm"]), 13.5, BODY, mb=8, lh=1.55)
            + mono(c["n"], 11, META, 1.4, mb=22)
            + mono("що він забирає", 10, RED, 2.2, mb=10)
            + bullets([e(k) for k in c["kit"]], BODY, 13.5)
            + f'<div style="margin-top:20px;border-top:1px solid {LINE2};padding-top:14px;">'
            + mono("ціна", 10, META, 2.2, mb=8)
            + par(e(c["price"]), 13.5, BODY, lh=1.55) + '</div>'
            + '</div>'
        )
        rows.append(
            f'<section style="display:grid;grid-template-columns:1fr 420px;gap:48px;'
            f'padding:38px 0;border-bottom:1px solid {LINE};">{left}{right}</section>')

    inner = (
        header("Чернетка · розділ сайту", "П'ять когорт",
               "Кожен, хто відкриває hordieiev.art, приходить по щось одне. Розділ не питає "
               "«чим вам допомогти» — він пропонує назватися, і далі показує лише те, що "
               "цій людині справді потрібно. Поділ узятий не з голови: це колонка «Лінія» "
               "в CRM CHORÉGRAPHE, та сама, за якою вже розсортовані 76 французьких адрес.")
        + "".join(rows)
        + f'<div style="margin-top:34px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;">'
        + "".join(
            f'<div style="border-top:1px solid {LINE};padding-top:16px;">'
            + f'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
            + tier_mark({"Ouvert": "o", "Sur adresse": "a", "Sur demande": "d"}[fr])
            + f'<span style="font-family:{MONO};font-size:11px;letter-spacing:2.2px;'
              f'text-transform:uppercase;color:{FG};">{e(fr)}</span>'
            + f'<span style="font-family:{MONO};font-size:10px;letter-spacing:1.6px;'
              f'color:{META};">{e(ua)}</span></div>'
            + par(e(txt), 13.5, BODY, lh=1.55) + '</div>' for fr, ua, txt in TIERS)
        + '</div>'
    )
    return HEAD + page(inner) + FOOT


# ─────────────────────────────────────────────────────────────────────────────
# 2. Матриця файлів
# ─────────────────────────────────────────────────────────────────────────────
def art_kits():
    head_cells = "".join(
        f'<div style="text-align:center;font-family:{MONO};font-size:11px;'
        f'letter-spacing:2px;color:{RED};">{c["code"]}</div>' for c in COHORTS)
    head_sub = "".join(
        f'<div style="text-align:center;font-family:{MONO};font-size:9px;'
        f'letter-spacing:.6px;color:{META};line-height:1.3;">{e(c["fr"].split(" ")[0])}</div>'
        for c in COHORTS)

    grid = f'grid-template-columns:1fr repeat(5,64px) 230px;'
    rows = [
        f'<div style="display:grid;{grid}gap:0 12px;align-items:end;'
        f'padding-bottom:12px;border-bottom:1px solid {LINE};">'
        + f'<div>{mono("документ", 10, META, 2.2)}</div>' + head_cells
        + f'<div>{mono("стан", 10, META, 2.2)}</div></div>'
        + f'<div style="display:grid;{grid}gap:0 12px;padding:6px 0 14px;">'
        + '<div></div>' + head_sub + '<div></div></div>'
    ]
    for name, marks, state, kind in DOCS:
        cells = "".join(
            f'<div style="display:flex;justify-content:center;">{tier_mark(m)}</div>'
            for m in marks)
        rows.append(
            f'<div style="display:grid;{grid}gap:0 12px;align-items:center;'
            f'padding:11px 0;border-bottom:1px solid {LINE2};">'
            + f'<div style="font-family:{SANS};font-size:14.5px;color:{FG};">{e(name)}</div>'
            + cells
            + f'<div style="font-family:{MONO};font-size:10.5px;letter-spacing:.6px;'
              f'color:{STATE_COLOR[kind]};">{e(state)}</div></div>')

    legend = (
        f'<div style="display:flex;gap:28px;flex-wrap:wrap;margin-top:26px;">'
        + "".join(
            f'<div style="display:flex;align-items:center;gap:8px;">' + tier_mark(m)
            + f'<span style="font-family:{MONO};font-size:10px;letter-spacing:1.6px;'
              f'text-transform:uppercase;color:{META};">{e(t)}</span></div>'
            for m, t in [("o", "ouvert — без пошти"), ("a", "sur adresse — пошта в обмін"),
                         ("d", "sur demande — відповідає людина"), ("-", "не для цієї когорти")])
        + '</div>')

    note = (
        f'<div style="margin-top:38px;border-left:2px solid {RED};padding:4px 0 4px 22px;">'
        + mono("що показує ця таблиця", 10, RED, 2.2, mb=12)
        + par("Половина рядків червоні — цих файлів ще немає. Це не докір, це порядок робіт: "
              "когорта A (де вже є CV) вмикається першою і майже готова, когорта E "
              "потребує одного дос'є преси, когорти B і D — найдорожчі за часом. "
              "Джерело текстів для fiches — CHORÉGRAPHE/03 Товари/fiches.json; усе нове "
              "робиться так само: JSON → PDF, а не вручну в редакторі.",
              14.5, BODY, width="86ch") + '</div>')

    inner = (
        header("Чернетка · матриця", "Хто що забирає",
               "Двадцять документів на п'ять когорт — і три рівні доступу. Рівень не про "
               "секретність, а про те, коли з відвідувача стає адреса: відкритий файл "
               "нічого не запитує, файл «за адресою» лишає пошту, ціна не лежить ніде.")
        + "".join(rows) + legend + note)
    return HEAD + page(inner) + FOOT


# ─────────────────────────────────────────────────────────────────────────────
# 3. Скринінг
# ─────────────────────────────────────────────────────────────────────────────
STEPS = [
    ("01", "Сам сказав", "найсильніший сигнал",
     ["Клік по картці когорти на /pro",
      "Мова, якою читає сайт",
      "Який файл узяв першим",
      "З якого листа прийшов — мітка в посиланні"],
     "Дев'ять десятих роботи робить цей крок, а не ШІ. Людина, яка шукає директора балету, "
     "натискає «Direction» за півсекунди."),
    ("02", "Що видно без стеження", "сесія, не профіль",
     ["Які сторінки відкриті в цьому візиті",
      "Звідки прийшов: пошук, лист, лінк із фестивалю",
      "Мова браузера, країна за IP — грубо",
      "Жодних cookie третіх сторін, жодного профілю під іменем"],
     "Це живе рівно стільки, скільки триває візит, і нікуди не пишеться, поки людина "
     "сама чогось не надіслала."),
    ("03", "ШІ читає — і тільки тоді", "на надіслану дію",
     ["Вмикається на формі або запиті файлу «за адресою»",
      "Отримує: вільний текст, домен пошти, що дивились, сторінки",
      "Плюс таксономію CRM: 7 ліній, типи закладів, посади",
      "Повертає: когорта · лінія · товар S1–S7 · впевненість · чому"],
     "Модель не вгадує анонімів. Вона розбирає те, що людина написала сама — рівно як "
     "розбирає ручну книгу копілот у ФІНАНСАХ."),
    ("04", "Куди це йде", "дві адреси, не одна",
     ["Відвідувачу — його набір файлів, одразу",
      "У CRM — рядок зі статусом «до перевірки»",
      "Лінія й товар уже проставлені, пошта є",
      "Людина перевіряє → «готово до листа» → лист.py"],
     "Той самий ланцюг статусів, що вже працює. Сайт стає ще одним джерелом адрес — "
     "поруч із адреси.py, а не замість нього."),
]


def art_screening():
    cols = "".join(
        f'<div style="border-top:1px solid {LINE};padding-top:18px;">'
        + f'<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:14px;">'
        + f'<span style="font-family:{MONO};font-size:12px;letter-spacing:2.4px;color:{RED};">{n}</span>'
        + f'<span style="font-family:{MONO};font-size:9.5px;letter-spacing:1.6px;'
          f'text-transform:uppercase;color:{META};">{e(sub)}</span></div>'
        + disp(t, 22, mb=16, lh=1.15)
        + bullets([e(i) for i in items], BODY, 13.5)
        + f'<div style="margin-top:18px;border-top:1px solid {LINE2};padding-top:12px;">'
        + par(e(note), 13, META, lh=1.55) + '</div></div>'
        for n, t, sub, items, note in STEPS)

    never = [
        "Не профілює анонімного відвідувача й не тримає історію переглядів під іменем",
        "Не ставить трекерів третіх сторін і не продає нікому сигналів",
        "Не надсилає лист сам — це залізне правило CHORÉGRAPHE, і на сайті воно те саме",
        "Не називає ціну автоматично: prix de cession лишається «sur demande»",
        "Не вирішує за людину: вердикт ШІ приходить у CRM як «до перевірки», не як факт",
    ]
    rgpd = [
        "Галочка згоди в тій самій формі, окремим реченням, не дрібним шрифтом",
        "Зберігаємо три речі: пошта, заявлена когорта, дата. Більше нічого",
        "Mentions légales і сторінка «дані» — обов'язкові у Франції, зробити разом із формою",
        "Лист із файлом містить рядок «відписатися» й адресу, куди написати про видалення",
        "Дані живуть у CRM, тобто локально в Numbers, а не в чужому сервісі",
    ]

    def box(title, items, color):
        return (f'<div style="border:1px solid {color};padding:24px 26px;">'
                + mono(title, 10, color, 2.2, mb=16)
                + bullets([e(i) for i in items], BODY, 13.5) + '</div>')

    inner = (
        header("Чернетка · механіка", "Як сайт здогадується, хто прийшов",
               "«Скринінг за допомогою ШІ» звучить як магія, а працює як черга. Спершу людина "
               "сама себе називає — це найточніший сигнал, який взагалі буває. Далі сесія "
               "додає контекст. І лише коли людина щось надіслала, до справи береться модель: "
               "вона перекладає написане людською мовою у мову CRM — лінія, тип закладу, товар. "
               "Останній крок робить не машина.")
        + f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;">{cols}</div>'
        + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:44px;">'
        + box("чого система не робить", never, RED)
        + box("RGPD — Франція, отже без варіантів", rgpd, LINE)
        + '</div>'
        + f'<div style="margin-top:34px;border-top:1px solid {LINE};padding-top:20px;">'
        + par("Технічно це один route handler у Next і один виклик моделі — не окремий сервіс. "
              "Класифікатор не має бути розумним: йому дають готову таксономію CRM і просять "
              "вибрати з неї, а не вигадати. Помилка коштує рівно одного неправильного рядка "
              "у списку «до перевірки», який людина виправить за секунду. Саме тому "
              "автоматичного листа немає й не буде.",
              15, BODY, width="100ch") + '</div>')
    return HEAD + page(inner) + FOOT


# ─────────────────────────────────────────────────────────────────────────────
# 4. Макет: сторінка вибору (français)
# ─────────────────────────────────────────────────────────────────────────────
NAV = (
    f'<div style="display:flex;align-items:center;justify-content:space-between;'
    f'border-bottom:1px solid {LINE};padding:14px 40px;background:rgba(10,10,10,.92);">'
    + f'<span style="font-family:{DISPLAY};font-size:14px;letter-spacing:4px;color:{BODY};">ARTEM HORDIEIEV</span>'
    + '<div style="display:flex;align-items:center;gap:24px;">'
    + "".join(f'<span style="font-family:{SANS};font-size:11px;letter-spacing:2px;'
              f'text-transform:uppercase;color:{BODY};">{e(x)}</span>'
              for x in ["Œuvres", "À propos"])
    + f'<span style="font-family:{SANS};font-size:11px;letter-spacing:2px;'
      f'text-transform:uppercase;color:{RED};">Programmer</span>'
    + f'<span style="font-family:{SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;'
      f'color:{FG};border:1px solid {RED};background:{RED};padding:6px 12px;">CV</span>'
    + f'<span style="font-family:{MONO};font-size:10px;letter-spacing:1.6px;color:{META};">EN · FR · UK</span>'
    + '</div></div>')

CHOICES = [
    ("A", "Direction de compagnie",
     "Vous recrutez un directeur de ballet, un maître de ballet ou un responsable des études chorégraphiques.",
     "6 documents · 4 en libre accès"),
    ("B", "Programmation, diffusion",
     "Vous cherchez une pièce pour une saison : durée, plateau, jauge, fenêtres de tournée.",
     "6 documents · 1 en libre accès"),
    ("C", "Action culturelle, éducation",
     "Médiathèque, lycée, musée, université : une conférence dansée, des ateliers, un devis.",
     "5 documents · 3 en libre accès · tarif horaire affiché"),
    ("D", "Résidence, financement",
     "Vous accueillez en studio, vous instruisez une demande ou vous soutenez un projet.",
     "6 documents · sur adresse"),
    ("E", "Presse et public",
     "Vous écrivez sur le travail, ou vous êtes simplement curieux.",
     "4 documents · tout en libre accès"),
]


def art_espace():
    cards = "".join(
        f'<div style="border:1px solid {LINE};background:{CARD};padding:26px 28px;'
        f'display:flex;flex-direction:column;gap:12px;">'
        + f'<div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;">'
        + f'<span style="font-family:{MONO};font-size:11px;letter-spacing:2.6px;color:{RED};">{code}</span>'
        + f'<span style="font-family:{MONO};font-size:9.5px;letter-spacing:1.2px;color:{META};">{e(meta)}</span></div>'
        + disp(t, 23, mb=0, lh=1.15)
        + par(e(d), 14.5, BODY, lh=1.55)
        + f'<div style="margin-top:6px;display:flex;align-items:center;gap:10px;">'
        + f'<span style="font-family:{MONO};font-size:10.5px;letter-spacing:2px;'
          f'text-transform:uppercase;color:{RED};">Entrer</span>'
        + f'<svg width="16" height="10" viewBox="0 0 16 10" aria-hidden>'
          f'<path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="{RED}" stroke-width="1.2"/></svg>'
        + '</div></div>'
        for code, t, d, meta in CHOICES)

    inner = (
        f'<div style="padding:0 0 60px;">'
        + NAV
        + f'<div style="padding:58px 60px 0;">'
        + label("Espace professionnel", mb=18)
        + f'<div style="font-family:{DISPLAY};font-size:44px;line-height:1.05;color:{FG};'
          f'margin-bottom:20px;">Dites-nous qui vous êtes</div>'
        + par("Un jury de recrutement, un programmateur et une médiathèque ne cherchent pas "
              "les mêmes pages. Choisissez votre entrée : vous n'aurez que les documents qui "
              "vous concernent — la plupart se téléchargent sans rien remplir.",
              17, BODY, mb=40, width="62ch")
        + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">{cards}</div>'
        + f'<div style="margin-top:34px;display:flex;justify-content:space-between;'
          f'align-items:baseline;gap:30px;border-top:1px solid {LINE};padding-top:20px;">'
        + par('Vous ne vous reconnaissez pas ici ? <a href="#">Voir tous les documents</a>',
              14.5, BODY)
        + f'<span style="font-family:{MONO};font-size:10px;letter-spacing:1.4px;color:{META};'
          f'text-align:right;max-width:44ch;line-height:1.5;">Aucun cookie de suivi. '
          f'Une adresse n\'est demandée que pour les documents qui l\'exigent.</span>'
        + '</div></div></div>')
    return HEAD + page(inner, pad="0") + FOOT


# ─────────────────────────────────────────────────────────────────────────────
# 5. Макет: набір однієї когорти (français)
# ─────────────────────────────────────────────────────────────────────────────
KIT_A = [
    ("o", "Curriculum vitæ — une page", "PDF · FR / EN / UK · 108 Ko", "Télécharger"),
    ("o", "Parcours détaillé", "PDF · 4 pages · FR", "Télécharger"),
    ("a", "Projet artistique pour une compagnie", "PDF · 2 pages · FR", "Recevoir par courriel"),
    ("o", "Répertoire — 50 productions", "PDF · FR / EN", "Télécharger"),
    ("o", "Extrait vidéo — 3 minutes", "lien vidéo", "Voir"),
    ("a", "Spectacles intégraux", "liens privés, valables 30 jours", "Recevoir par courriel"),
    ("d", "Références", "trois contacts, sur accord préalable", "Demander"),
]


def art_kit():
    def btn(t, primary):
        if primary:
            return (f'<span style="font-family:{MONO};font-size:10px;letter-spacing:2px;'
                    f'text-transform:uppercase;color:{FG};background:{RED};'
                    f'border:1px solid {RED};padding:9px 16px;white-space:nowrap;">{e(t)}</span>')
        return (f'<span style="font-family:{MONO};font-size:10px;letter-spacing:2px;'
                f'text-transform:uppercase;color:{BODY};border:1px solid {LINE};'
                f'padding:9px 16px;white-space:nowrap;">{e(t)}</span>')

    rows = "".join(
        f'<div style="display:grid;grid-template-columns:20px 1fr 240px;gap:20px;'
        f'align-items:center;padding:18px 0;border-bottom:1px solid {LINE2};">'
        + f'<div style="display:flex;">{tier_mark(m, 14)}</div>'
        + f'<div><div style="font-family:{SANS};font-size:16px;color:{FG};margin-bottom:5px;">{e(t)}</div>'
        + f'<div style="font-family:{MONO};font-size:10px;letter-spacing:1.2px;color:{META};">{e(meta)}</div></div>'
        + f'<div style="display:flex;justify-content:flex-end;">{btn(act, m == "o")}</div></div>'
        for m, t, meta, act in KIT_A)

    form = (
        f'<div style="border:1px solid {LINE};background:{CARD};padding:26px 28px;">'
        + mono("Pour les documents « sur adresse »", 10, RED, 2, mb=16)
        + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">'
        + "".join(
            f'<div style="border:1px solid {LINE};padding:11px 14px;font-family:{SANS};'
            f'font-size:14px;color:{META};">{e(ph)}</div>'
            for ph in ["Courriel professionnel", "Établissement"])
        + '</div>'
        + f'<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:18px;">'
        + f'<span style="width:13px;height:13px;border:1px solid {META};margin-top:3px;'
          f'display:inline-block;flex:none;"></span>'
        + par("J’accepte que cette adresse serve à m’envoyer les documents demandés "
              "et à me recontacter à ce sujet. Rien d’autre n’est conservé.",
              13, BODY, lh=1.5) + '</div>'
        + btn("Recevoir les documents", True) + '</div>')

    aside = (
        f'<div style="border-left:2px solid {RED};padding:2px 0 2px 22px;">'
        + mono("Ce qui n’est pas sur cette page", 10, RED, 2, mb=14)
        + bullets(["Disponibilité et période de préavis",
                   "Autorisation de travail en France, statut",
                   "Langues de travail : ukrainien, russe, français, anglais",
                   "Prétentions et conditions"], BODY, 14)
        + f'<div style="margin-top:18px;">'
        + par("Un courriel suffit — réponse sous 48 heures.", 14.5, FG, mb=10)
        + f'<div style="font-family:{SANS};font-size:15px;color:{RED};">art_om@me.com</div>'
        + f'<div style="font-family:{SANS};font-size:14px;color:{BODY};margin-top:4px;">+33 7 43 79 18 41</div>'
        + '</div></div>')

    inner = (
        f'<div style="padding:0 0 60px;">'
        + NAV
        + f'<div style="padding:52px 60px 0;">'
        + f'<div style="font-family:{MONO};font-size:10px;letter-spacing:2.2px;'
          f'text-transform:uppercase;color:{META};margin-bottom:20px;">'
          f'Espace pro <span style="color:{LINE};">/</span> '
          f'<span style="color:{RED};">Direction de compagnie</span></div>'
        + f'<div style="font-family:{DISPLAY};font-size:40px;line-height:1.05;color:{FG};'
          f'margin-bottom:18px;">Direction de compagnie</div>'
        + par("Ce qu’un jury demande, dans l’ordre où il le demande. Quatre documents "
              "se prennent tout de suite ; deux arrivent par courriel parce qu’ils "
              "contiennent des liens privés.", 17, BODY, mb=36, width="62ch")
        + rows
        + f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;margin-top:38px;">'
        + form + aside + '</div>'
        + '</div></div>')
    return HEAD + page(inner, pad="0") + FOOT


# ─────────────────────────────────────────────────────────────────────────────
# 6. Етапи
# ─────────────────────────────────────────────────────────────────────────────
PHASES = [
    ("Етап 1", "Вибір без бекенда",
     "Розділ /pro з п'ятьма входами і п'ять сторінок-наборів. Файли лежать у public/, "
     "сторінки force-static — отже нічого не може зникнути на rate-limited запиті, "
     "як це буває з Notion-полями.",
     ["src/lib/cohorts-data.ts — структура когорт і файлів, як offers-data.ts",
      "src/app/[lang]/pro/page.tsx і pro/[cohort]/page.tsx",
      "тексти FR / EN / UK — українська майстер, далі похідні",
      "чотири-п'ять відсутніх PDF з матриці"],
     "нічого не ламає, працює того ж дня"),
    ("Етап 2", "Пошта в обмін на файл",
     "Форма для рівня «sur adresse»: людина лишає пошту, отримує лист із посиланнями, "
     "а в CRM з'являється рядок «до перевірки» з лінією й товаром.",
     ["route handler на надсилання листа",
      "згода, mentions légales, сторінка про дані",
      "черга рядків для CRM — JSON, який підбирає адреси.py",
      "посилання з терміном дії, щоб приватне відео не жило вічно"],
     "перший справжній зв'язок сайту з CHORÉGRAPHE"),
    ("Етап 3", "ШІ-класифікатор",
     "Виклик моделі на надіслану форму: вільний текст плюс домен пошти перетворюються "
     "на лінію 1–7, тип закладу й товар S1–S7 — мовою, якою вже говорить CRM.",
     ["один route handler, одна модель, готова таксономія в промті",
      "лог вердиктів: що вгадала, що ні — інакше не видно якості",
      "статус завжди «до перевірки», ніколи не «готово до листа»",
      "жодного автоматичного листа — правило системи"],
     "економить ручну класифікацію, не приймає рішень"),
    ("Етап 4", "Прайси",
     "Ціна з'являється рівно там, де її поява не шкодить: погодинний тариф для когорти C. "
     "Для B — grille de cession за адресою. Для решти — «sur demande» назавжди.",
     ["тариф ateliers — відкрито, як у всіх у Франції",
      "grille de cession — тільки листом і тільки після розмови",
      "жодної ціни на відкритій сторінці для B і D",
      "джерело — аркуш «Товари» в Chorégraphe.numbers"],
     "остання за порядком навмисно"),
]


def art_etapes():
    cards = "".join(
        f'<div style="border-top:1px solid {LINE};padding-top:20px;">'
        + f'<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:14px;">'
        + f'<span style="font-family:{MONO};font-size:11px;letter-spacing:2.4px;color:{RED};">{e(n)}</span></div>'
        + disp(t, 24, mb=14, lh=1.15)
        + par(e(d), 14.5, BODY, mb=18, lh=1.58)
        + f'<div style="border-top:1px solid {LINE2};padding-top:14px;">'
        + mono("що для цього треба", 10, META, 2.2, mb=10)
        + bullets([e(i) for i in items], BODY, 13)
        + '</div>'
        + f'<div style="margin-top:16px;font-family:{MONO};font-size:10px;letter-spacing:1.4px;'
          f'color:{RED};text-transform:uppercase;">{e(gain)}</div>'
        + '</div>'
        for n, t, d, items, gain in PHASES)

    inner = (
        header("Чернетка · порядок робіт", "Чотири етапи, у цьому порядку",
               "Перший етап не потребує ні сервера, ні моделі, ні згоди — і вже дає найбільше: "
               "людина сама себе називає. Усе розумне добудовується згори, коли перший крок "
               "почав приносити адреси.")
        + f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:30px;">{cards}</div>'
        + f'<div style="margin-top:40px;border-top:1px solid {LINE};padding-top:20px;">'
        + par("Одне залишається незмінним на всіх етапах: сайт ніколи не надсилає листа сам "
              "і ніколи не називає ціну першим. Він приводить людину, називає її мовою CRM "
              "і зупиняється. Далі — понеділок, лист.py і підпис живої людини.",
              15, BODY, width="100ch") + '</div>')
    return HEAD + page(inner) + FOOT


CANVAS = """{
  "pages": [
    { "id": "page-1", "name": "Система" },
    { "id": "page-2", "name": "Як це виглядає" }
  ],
  "artboards": [
    { "file": "Main.dc.html",      "page": "page-1", "x": 0,    "y": 0,    "w": 1300, "h": 3000, "title": "Когорти" },
    { "file": "Kits.dc.html",      "page": "page-1", "x": 1420, "y": 0,    "w": 1300, "h": 1520, "title": "Матриця файлів" },
    { "file": "Screening.dc.html", "page": "page-1", "x": 1420, "y": 1660, "w": 1300, "h": 1340, "title": "Скринінг" },
    { "file": "Etapes.dc.html",    "page": "page-1", "x": 2840, "y": 0,    "w": 1300, "h": 1040, "title": "Етапи" },
    { "file": "Espace.dc.html",    "page": "page-2", "x": 0,    "y": 0,    "w": 1200, "h": 1180, "title": "/fr/pro — вибір" },
    { "file": "Kit.dc.html",       "page": "page-2", "x": 1320, "y": 0,    "w": 1200, "h": 1260, "title": "/fr/pro/direction" }
  ],
  "annotations": [
    { "id": "note-brief", "page": "page-1", "x": 0, "y": -150, "w": 620,
      "text": "Чернетка, нічого не зачіпає в коді сайту.\\nПравки пиши просто тут, у дужках — як на канвасі резюме." },
    { "id": "note-ui", "page": "page-2", "x": 0, "y": -150, "w": 620,
      "text": "Два макети французькою — вибір когорти і набір «Direction».\\nСтиль узятий із живого сайту: NAMU, JetBrains Mono, червоний C8102E." }
  ],
  "launch": { "view": "canvas", "page": "page-1" }
}
"""

if __name__ == "__main__":
    files = {
        "Main.dc.html": art_main(),
        "Kits.dc.html": art_kits(),
        "Screening.dc.html": art_screening(),
        "Espace.dc.html": art_espace(),
        "Kit.dc.html": art_kit(),
        "Etapes.dc.html": art_etapes(),
        "canvas.json": CANVAS,
    }
    for name, body in files.items():
        (OUT / name).write_text(body, encoding="utf-8")
    print("написано:", ", ".join(files))
