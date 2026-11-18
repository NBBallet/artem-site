#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Що Артем змінив на канві: текстовий diff збереженого артборда проти згенерованого.

    # 1) зчитати артборд з канви (Artifact read, path project/Main.dc.html) у теку
    # 2) порівняти:
    python3 design/icare/diff.py <зчитаний Main.dc.html> [Main]

Друкує рядки, що зникли (-) і з'явились (+). Правки в дужках «( … )» — це
інструкції Артема: виконати, внести в copy.json (uk), перекласти в fr/en,
потім python3 design/icare/gen.py і перепублікувати канву.
"""
import difflib, html, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent


def text(path):
    s = pathlib.Path(path).read_text(encoding="utf-8")
    s = s.split("</helmet>", 1)[-1].split("</x-dc>", 1)[0]
    s = re.sub(r"<svg.*?</svg>", "", s, flags=re.S)
    s = re.sub(r"</(p|div|h1|h2|h3|li|a|figcaption|blockquote|span)>", "\n", s)
    s = html.unescape(re.sub(r"<[^>]+>", "", s))
    return [l.strip() for l in s.splitlines() if l.strip()]


if __name__ == "__main__":
    saved = sys.argv[1]
    board = sys.argv[2] if len(sys.argv) > 2 else "Main"
    ours = HERE / "canvas" / "project" / f"{board}.dc.html"
    for l in difflib.unified_diff(text(ours), text(saved), "згенеровано", "на канві", n=0, lineterm=""):
        print(l)
