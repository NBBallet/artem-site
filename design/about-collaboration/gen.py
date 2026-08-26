# -*- coding: utf-8 -*-
import base64, pathlib, os

ROOT = pathlib.Path(__file__).resolve().parents[2] / "public" / "fonts"
OUT  = pathlib.Path(os.path.dirname(os.path.abspath(__file__)))

def b64(p):
    return base64.b64encode((ROOT / p).read_bytes()).decode()

NAMU = """
@font-face {
  font-family: "NAMU-1400";
  src: url(data:font/woff2;base64,%s) format("woff2");
  font-weight: normal; font-style: normal;
}
@font-face {
  font-family: "NAMU-Pro";
  src: url(data:font/woff2;base64,%s) format("woff2");
  font-weight: normal; font-style: normal;
}
""" % (b64("NAMU-1400.woff2"), b64("NAMU-Pro.woff2"))

HEAD = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
  <style>
    body { margin: 0; background: #0a0a0a; }
    a { color: #c8102e; text-decoration: none; }
    a:hover { color: #f5f5f5; }
    ::selection { background: #c8102e; color: #f5f5f5; }
__NAMU__
  </style>
</helmet>
"""
FOOT = """</x-dc>
</body>
</html>
"""

NAMES   = "Dwight Rhoden &middot; Desmond Richardson"
COMPANY = "Complexions Contemporary Ballet — New York"

# ================== copy per locale ==================
FR = dict(
    name = "Artem Hordieiev",
    role = "Chorégraphe ukrainien, fondateur de Newspaper Birds Production.",
    bio = ("Crée des spectacles contemporains où la structure musicale rencontre la vérité du corps "
           "humain, du corps du danseur. Il travaille à la croisée de la puissante école "
           "chorégraphique ukrainienne et de la scène européenne, proposant un langage visuel "
           "audacieux."),
    nbb = ("Fondateur de Newspaper Birds Production — une structure de production de ballet contemporain "
           "basée en France, qui associe artistes et organisations internationales en collaboration et "
           "en coproduction."),
    eyebrow = "COLLABORATION UKRAINE - ÉTATS-UNIS",
    bar = False,
    names = NAMES,
    company = "Mentors et maîtres. Complexions Contemporary Ballet, New York. Une collaboration clé.&nbsp;",
    lead = "Artiste invité sur un projet de la compagnie new-yorkaise Complexions Contemporary Ballet.",
    p1 = ("Dwight Rhoden et Desmond Richardson — anciens solistes de l’Alvin Ailey American Dance "
          "Theater, fondateurs du Complexions Contemporary Ballet (1994) et auteurs de la technique de "
          "danse du même nom. Leur école est au fondement du style chorégraphique d’Artem Hordieiev."),
    p2 = ("De cette rencontre entre l’école américaine et l’école ukrainienne est né "
          "<em style=\"font-style: italic\">Gatsby le Magnifique</em>, d’après F. Scott Fitzgerald — "
          "distribution internationale de production avec des étoiles du théâtre Mariinsky ; créé à "
          "Kyiv, puis présenté à Berlin, Paris et Genève, et en tournée dans les grandes villes "
          "européennes."),
    strip_tail = ("&mdash; mentors et maîtres. Artiste invité sur un projet de la compagnie &middot; "
                  "<em style=\"font-style: italic; color: #f5f5f5;\">Gatsby le Magnifique</em>, "
                  "d’après F. Scott Fitzgerald &middot; Kyiv &middot; Berlin &middot; Paris "
                  "&middot; Genève."),
)

EN = dict(
    name = "Artem Hordieiev",
    role = "Ukrainian choreographer, founder of Newspaper Birds Production.",
    bio = ("Creates contemporary productions where musical structure meets the truth of the human, "
           "ballet body. Works at the intersection of the powerful Ukrainian choreographic school and "
           "the European stage, offering a bold visual language."),
    nbb = ("Founder of Newspaper Birds Production — a contemporary ballet production group based in "
           "France, bringing international artists and organisations into collaboration and "
           "co-production."),
    eyebrow = "UKRAINE - UNITED STATES COLLABORATION",
    bar = False,
    names = NAMES,
    company = "Mentors and teachers. Complexions Contemporary Ballet, New York. A key collaboration.&nbsp;",
    lead = "Guest artist on a project of the New York company Complexions Contemporary Ballet.",
    p1 = ("Dwight Rhoden and Desmond Richardson — former principals of the Alvin Ailey American Dance "
          "Theater, founders of Complexions Contemporary Ballet (1994) and authors of the dance "
          "technique of the same name. Their school underlies Artem Hordieiev’s choreographic style."),
    p2 = ("From this meeting of the American and the Ukrainian schools came "
          "<em style=\"font-style: italic\">The Great Gatsby</em>, after F. Scott Fitzgerald — an "
          "international production cast with stars of the Mariinsky Theatre; created in Kyiv, then "
          "shown in Berlin, Paris and Geneva, and toured major European cities."),
    strip_tail = ("&mdash; mentors. Guest artist with the company &middot; "
                  "<em style=\"font-style: italic; color: #f5f5f5;\">The Great Gatsby</em>, after "
                  "F. Scott Fitzgerald &middot; Kyiv &middot; Berlin &middot; Paris &middot; Geneva."),
)

UK = dict(
    name = "Артем Гордєєв",
    role = "Український хореограф, засновник Newspaper Birds Production.",
    bio = ("Створює сучасні вистави, де музикальна структура зустрічається з правдою людського, "
           "балетного тіла. Працює на перетині потужної української хореографічної школи та "
           "європейської сцени, пропонуючи сміливу візуальну мову."),
    nbb = ("Засновник Newspaper Birds Production — сучасної балетної виробничої групи, що базується у "
           "Франції та залучає міжнародних артистів та організації до співпраці, ко-продукції."),
    eyebrow = "СПІВПРАЦЯ УКРАЇНА - США",
    bar = False,
    names = "Дуайт Роден &middot; Дезмонд Річардсон",
    company = "Ментори та наставники. Complexions Contemporary Ballet, Нью-Йорк. Ключова співпраця.&nbsp;",
    lead = "Запрошений артист проєкту нью-йоркської компанії Complexions Contemporary Ballet.",
    p1 = ("Дуайт Роден і Дезмонд Річардсон — колишні солісти Alvin Ailey American Dance Theater, "
          "засновники Complexions Contemporary Ballet (1994) й автори однойменної техніки танцю. "
          "Їхня школа лежить в основі хореографічного стилю Артема Гордєєва."),
    p2 = ("Із цієї зустрічі американської та української шкіл народився "
          "<em style=\"font-style: italic\">«Великий Гетсбі»</em> за Ф. Скоттом Фіцджеральдом — "
          "міжнародний виробничий склад із зірками Маріїнського театру; створений у Києві, далі "
          "показаний у Берліні, Парижі та Женеві й турне великими європейськими містами."),
    strip_tail = ("&mdash; ментори та наставники. Запрошений артист компанії &middot; "
                  "<em style=\"font-style: italic; color: #f5f5f5;\">«Великий Гетсбі»</em> за "
                  "Ф. Скоттом Фіцджеральдом &middot; Київ &middot; Берлін &middot; Париж "
                  "&middot; Женева."),
)

# ================== fragments ==================
def eyebrow(C, size="14px", ls="4.5px", bar="64px", mb="22px"):
    # C["bar"] = False -> pas de filet rouge (édité dans le canvas sur l'artboard UA)
    rule = "" if C.get("bar") is False else (
        """        <span style="display: block; width: %s; height: 2px; background: #c8102e; margin-bottom: 16px;"></span>\n""" % bar)
    return ("""      <div style="margin-bottom: %s;">
%s        <span style="display: block; font-family: Inter, sans-serif; font-size: %s; font-weight: 600; letter-spacing: %s; text-transform: uppercase; color: #c8102e;">%s</span>
      </div>
""" % (mb, rule, size, ls, C["eyebrow"]))

def header(C):
    return ("""      <h2 style="font-family: 'NAMU-1400', serif; font-size: 36px; line-height: 40px; color: #f5f5f5; margin: 0 0 16px 0; font-weight: normal;">%s</h2>
      <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; color: #888888; margin: 0 0 32px 0; max-width: 700px;">%s</p>
""" % (C["name"], C["role"]))

def bio_p(C):
    return ("""          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>""" % C["bio"])

def nbb_p(C):
    return ("""          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>""" % C["nbb"])

def bio_row(C, mb="0"):
    return ("""      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; align-items: start; margin-bottom: %s;">
        <div>
%s
        </div>
        <div>
%s
        </div>
      </div>
""" % (mb, bio_p(C), nbb_p(C)))

def names_block(C, size="30px"):
    return ("""          <div>
%s            <p style="font-family: 'NAMU-1400', serif; font-size: %s; line-height: 1.2; color: #f5f5f5; margin: 0 0 12px 0;">%s</p>
            <p style="font-family: 'NAMU-1400', serif; font-size: 17px; line-height: 1.45; color: #888888; margin: 0;">%s</p>
          </div>""" % (eyebrow(C), size, C["names"], C["company"]))

def collab_text(C):
    return ("""          <div>
            <p style="font-family: Inter, sans-serif; font-size: 17px; line-height: 1.6; color: #f5f5f5; margin: 0 0 18px 0;">%s</p>
            <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0 0 14px 0;">%s</p>
            <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>
          </div>""" % (C["lead"], C["p1"], C["p2"]))

def section(inner, padding="96px 64px", maxw="1200px"):
    return ("""<div style="width: 100%%; min-height: 100%%; background: #0a0a0a;">
  <section style="max-width: %s; margin: 0 auto; padding: %s; border-bottom: 1px solid #1a1a1a; box-sizing: border-box;">
%s  </section>
</div>
""" % (maxw, padding, inner))

def write(name, inner, **kw):
    html = HEAD.replace("__NAMU__", NAMU) + section(inner, **kw) + FOOT
    (OUT / name).write_text(html, encoding="utf-8")
    print(name, len(html))

# ================== A — bande pleine largeur ==================
def option_a(C):
    return header(C) + bio_row(C) + """
      <div style="margin-top: 72px; padding-top: 44px; border-top: 1px solid #1a1a1a;">
        <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; align-items: start;">
%s
%s
        </div>
      </div>
""" % (names_block(C), collab_text(C))

write("Main.dc.html",      option_a(FR))
write("English.dc.html",   option_a(EN))
write("Ukrainian.dc.html", option_a(UK))

# ================== B — bandeau haut (FR) ==================
b_strip = ("""      <div style="border: 1px solid #1a1a1a; background: #0d0d0d; padding: 32px; margin: 0 0 48px 0;">
%s        <p style="font-family: 'NAMU-1400', serif; font-size: 26px; line-height: 1.25; color: #f5f5f5; margin: 0 0 10px 0;">%s</p>
        <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; color: #999999; margin: 0;">%s %s</p>
      </div>
""" % (eyebrow(FR), FR["names"], COMPANY, FR["strip_tail"]))
write("OptionB.dc.html", header(FR) + b_strip + """      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; align-items: start;">
        <div>
%s
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 24px 0 0 0;">%s</p>
        </div>
        <div>
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0 0 14px 0;">%s</p>
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>
        </div>
      </div>
""" % (bio_p(FR), FR["nbb"], FR["p1"], FR["p2"]))

# ================== C — collaboration en colonne gauche (FR) ==================
write("OptionC.dc.html", header(FR) + """      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; align-items: start;">
        <div>
%s          <p style="font-family: 'NAMU-1400', serif; font-size: 26px; line-height: 1.2; color: #f5f5f5; margin: 0 0 10px 0;">%s</p>
          <p style="font-family: 'NAMU-1400', serif; font-size: 16px; line-height: 1.45; color: #888888; margin: 0 0 20px 0;">%s</p>
          <p style="font-family: Inter, sans-serif; font-size: 16px; line-height: 1.6; color: #f5f5f5; margin: 0 0 16px 0;">%s</p>
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0 0 14px 0;">%s</p>
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>
        </div>
        <div>
%s
          <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 24px 0 0 0;">%s</p>
        </div>
      </div>
""" % (eyebrow(FR), FR["names"], FR["company"], FR["lead"], FR["p1"], FR["p2"],
         bio_p(FR), FR["nbb"]))

# ================== Mobile — A à 390 px (FR) ==================
C = FR
write("Mobile.dc.html", ("""      <h2 style="font-family: 'NAMU-1400', serif; font-size: 32px; line-height: 36px; color: #f5f5f5; margin: 0 0 14px 0; font-weight: normal;">%s</h2>
      <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.6; color: #888888; margin: 0 0 32px 0;">%s</p>
      <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0 0 20px 0;">%s</p>
      <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>

      <div style="margin-top: 48px; padding-top: 36px; border-top: 1px solid #1a1a1a;">
%s        <p style="font-family: 'NAMU-1400', serif; font-size: 26px; line-height: 1.2; color: #f5f5f5; margin: 0 0 10px 0;">%s</p>
        <p style="font-family: 'NAMU-1400', serif; font-size: 15px; line-height: 1.5; color: #888888; margin: 0 0 22px 0;">%s</p>
        <p style="font-family: Inter, sans-serif; font-size: 16px; line-height: 1.6; color: #f5f5f5; margin: 0 0 16px 0;">%s</p>
        <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0 0 14px 0;">%s</p>
        <p style="font-family: Inter, sans-serif; font-size: 15px; line-height: 1.7; color: #999999; margin: 0;">%s</p>
      </div>
""" % (C["name"], C["role"], C["bio"], C["nbb"], eyebrow(C, size="12px", ls="3.5px", bar="48px"),
       C["names"], C["company"], C["lead"], C["p1"], C["p2"])),
   padding="72px 24px", maxw="390px")
