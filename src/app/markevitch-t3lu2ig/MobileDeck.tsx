import { Fragment, type CSSProperties, type ReactNode } from "react";
import "./mobile.css";

/* Телефонна версія пітчу «The return of Markevitch» (28.09.2026).

   На комп'ютері сторінка показує знімки слайдів — це і є презентація, її тут
   не чіпаємо. На телефоні знімок 1280×720 стискається до 360 px і текст стає
   дрібним, тому під 768 px ті самі слайди зверстано живим текстом: слово
   в слово з канви (версія, з якої знято знімки), з тими самими картинками
   й посиланнями, але в одну колонку.

   Змінився текст слайда на канві → поправити і знімки (веб_колоди.py), і цей
   файл. Нижче слайда 06 на телефоні нічого немає (30.09.2026, правка Артема):
   французькі аркуші — тільки за кнопками «Imprimer». */

const M = "/deck/t3lu2ig/m";
const YT_ICARE = "https://www.youtube.com/watch?v=mCAXXyfZjOU&t=385s";
const YT_BERNSTEIN = "https://www.youtube.com/watch?v=7lOgQJm1vaU&t=195s";
const YT_LORENZO = "https://www.youtube.com/watch?v=bcqsh95bR5g";
const MOZART = "https://www.hordieiev.art/fr/works/mozart25";
const out = { target: "_blank", rel: "noopener" } as const;

/* виміряно в браузері (NAMU-1400, letter-spacing 0.012em): ширина найдовшого рядка в em */
const FIT = {
  cover: { em: 8.94 },
  works: { em: 12.95, max: 34 },
  who: { em: 8.56 },
  mission: { em: 12.87 },
  icare: { em: 9.16 },
  icareSub: { em: 12.05, max: 28 },
  quote: { em: 14.53, max: 26 },
  lorenzo: { em: 7.45, max: 52 },
  proposal: { em: 12.0 },
  next: { em: 10.45 },
} satisfies Record<string, Fit>;

/* ширина найдовшого рядка кожного заголовка в em шрифту NAMU (з letter-spacing),
   виміряна в браузері; заголовок = (екран − поля) / em */
type Fit = { em: number; max?: number };
function Title({ fit, as: Tag = "h2", children }: { fit: Fit; as?: "h1" | "h2" | "p"; children: ReactNode }) {
  const style = { "--em": fit.em, "--max": `${fit.max ?? 60}px` } as CSSProperties;
  return (
    <Tag className="mk-fit" style={style}>
      {children}
    </Tag>
  );
}

/* нерв: шість тонких червоних волокон, як лінії на слайдах */
const H_PATHS: [string, number, number][] = [
  ["M0 8.3 C290 10.2 630 6.0 1000 8.2", 1.1, 0.95],
  ["M0 7.9 C180 5.0 800 10.9 1000 7.6", 0.6, 0.85],
  ["M0 8.2 C270 4.6 820 11.2 1000 7.9", 0.45, 0.8],
  ["M22 8.3 C390 5.1 590 10.6 950 7.5", 0.3, 0.7],
  ["M40 8.0 C210 9.9 740 6.6 998 8.4", 0.3, 0.6],
  ["M4 7.6 C285 4.7 780 9.9 990 8.5", 0.25, 0.55],
];
function Nerve({ id, fade = "end", vertical = false, className = "mk-nerve", style }: {
  id: string; fade?: "end" | "both"; vertical?: boolean; className?: string; style?: CSSProperties;
}) {
  const stops = fade === "both" ? [[0, 0], [0.12, 1], [0.88, 1], [1, 0]] : [[0, 1], [0.7, 0.85], [1, 0]];
  return (
    <svg className={className} style={style} viewBox={vertical ? "0 0 16 1000" : "0 0 1000 16"} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          {stops.map(([o, a]) => <stop key={o} offset={o} stopColor="#fff" stopOpacity={a} />)}
        </linearGradient>
        {/* маска живе в системі координат групи, тобто вже після повороту — завжди горизонтальна */}
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-6" y="-6" width="1012" height="28">
          <rect x="-6" y="-6" width="1012" height="28" fill={`url(#${id}-g)`} />
        </mask>
      </defs>
      <g fill="none" stroke="#E8455E" strokeLinecap="round" mask={`url(#${id}-m)`}
         transform={vertical ? "matrix(0 1 1 0 0 0)" : undefined}>
        {H_PATHS.map(([d, w, o]) => <path key={d} d={d} strokeWidth={w} opacity={o} vectorEffect="non-scaling-stroke" />)}
      </g>
    </svg>
  );
}

function Head({ label, num, id }: { label: string; num: string; id: string }) {
  return (
    <div className="mk-head">
      <span className="mk-label">{label}</span>
      <Nerve id={id} fade="both" />
      <span className="num">{num}</span>
    </div>
  );
}

const Tri = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="#fff" /></svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* великий знак питання NAMU з картки 2026 */
const Question = () => (
  <svg className="q" viewBox="0 0 540 720" aria-hidden="true">
    <g transform="translate(0 720) scale(1 -1)" fill="#E8455E">
      <path d="M186 230Q186 276 204.5 307.0Q223 338 249.0 356.0Q275 374 318 397Q370 423 396.0 446.5Q422 470 422 511Q422 566 376.0 590.0Q330 614 269 614Q211 614 167.5 588.5Q124 563 112 510H10Q19 574 57.5 619.0Q96 664 153.0 687.0Q210 710 274 710Q336 710 392.5 689.0Q449 668 485.5 624.5Q522 581 522 518Q522 467 502.0 432.5Q482 398 454.0 378.0Q426 358 381 335Q346 317 327.5 305.0Q309 293 296.5 275.0Q284 257 284 233V210H186Z" />
      <path d="M292 110V0H182V110Z" />
    </g>
  </svg>
);

/* ── 00 · обкладинка ─────────────────────────────────────────────────────── */
function Cover() {
  return (
    <section className="mk-slide" id="m01">
      <div className="mk-label">Opéra national du Capitole · Ballet</div>
      <div className="mk-label grey">2 October 2026</div>
      <div className="mk-gap-s" />
      <Title as="h1" fit={FIT.cover}>
        <span>The return of</span>
        <span className="red">Markevitch</span>
      </Title>

      <figure className="mk-matisse" style={{ marginBottom: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${M}/matisse.webp`} alt="Henri Matisse, Icare, from the Jazz series, 1947" width={843} height={1002} />
        <figcaption className="mk-label">Henri Matisse · Icare · Jazz, 1947<br /><span>reference</span></figcaption>
      </figure>

      <div className="mk-gap" />
      <div className="mk-work">
        <Title as="p" fit={FIT.works}><span>L&apos;Envol d&apos;Icare</span></Title>
        <div className="mk-label grey">1932 · act one · world premiere</div>
      </div>
      <Nerve id="c-n1" />
      <div className="mk-work">
        <Title as="p" fit={FIT.works}><span>Lorenzo il Magnifico</span></Title>
        <div className="mk-label grey">1940 · act two · soprano and orchestra</div>
      </div>
      <Nerve id="c-n2" />

      <p className="mk-lead mk-gap">
        A score that Serge Lifar commissioned from Igor Markevitch in 1932 for the Paris Opera. Almost a hundred
        years later, it has yet to be staged.
      </p>
      <p className="mk-p mk-gap-s" style={{ color: "var(--muted)" }}>
        A world premiere, and the opening of a wider project: bringing Markevitch back to the French stage, work by work.
      </p>

      <Nerve id="c-n3" style={{ marginTop: 24 }} />
      <div className="mk-credits">
        <div><div className="mk-label dim">Concept &amp; choreography</div><div className="v">Artem Hordieiev</div></div>
        <div><div className="mk-label dim">Producer</div><div className="v">Tetiana Hordieieva</div></div>
      </div>
    </section>
  );
}

/* ── 01 · досвід ─────────────────────────────────────────────────────────── */
function Who() {
  return (
    <section className="mk-slide" id="m02">
      <Head label="Our experience as a team" num="01" id="w-h" />
      <Title fit={FIT.who}>
        <span>Fifteen years</span>
        <span>of working</span>
        <span className="red">together</span>
      </Title>

      <div className="mk-gap" />
      <p className="mk-p">
        We have created and produced work for television, national and large-scale public events, performance and
        theatre. Throughout, we have worked as one creative team: direction, production, choreography, and concepts
        built from scratch.
      </p>
      <p className="mk-p">
        We have worked with clients and budgets at every scale: from projects of <span style={{ whiteSpace: "nowrap" }}>€10,000–20,000</span>{" "}to major
        commissions for national television and state events of €1,000,000 and more. Whatever the budget, we
        know how to make a stage project compelling — strong, rewarding for every partner involved, and effective.
      </p>
      <p className="mk-p">
        With every client, our aim is to explore as deeply as possible the context of the project and of the place
        itself — the country, the city, the organisation we work with — so that the audience leaves truly delighted.
      </p>

      <div className="mk-stats">
        <Nerve id="w-s0" />
        <div className="mk-stat"><div className="n">15</div><div className="c">years of producing work in five countries</div></div>
        <Nerve id="w-s1" />
        <div className="mk-stat">
          <div className="n">800+ h</div>
          <div className="c">of stage and screen content created together — some fifty projects, from concerts to full television seasons</div>
        </div>
        <Nerve id="w-s2" />
        <div className="mk-stat"><div className="n gold">50 M+</div><div className="c">viewers — national television and state events, 2012–2025</div></div>
      </div>

      <a className="mk-card" href={MOZART} {...out} aria-label="Mozart 25, ballet in one act — video and photos on hordieiev.art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${M}/mozart25.webp`} alt="" width={400} height={200} loading="lazy" />
        <span className="t">
          <span className="mk-label" style={{ color: "#4f7be0", fontSize: 10.5 }}>Our work</span>
          <span className="ttl" style={{ display: "block" }}>Mozart 25</span>
          <span className="sub" style={{ display: "block" }}>Ballet in one act · Symphony No. 25 · stage teaser</span>
        </span>
        <span className="mk-play s"><Tri /></span>
      </a>
      <a className="mk-tile" href="https://www.hordieiev.art/fr" {...out}>
        <span>
          <span className="mk-label" style={{ display: "block" }}>All works available<br />for staging</span>
          <span className="url" style={{ display: "block" }}>hordieiev.art</span>
        </span>
        <span style={{ color: "#fff" }}><Arrow /></span>
      </a>
    </section>
  );
}

/* ── 02 · місія ──────────────────────────────────────────────────────────── */
const ERAS: { y: string; img?: string; imgStyle?: CSSProperties; alt?: string; text: ReactNode; kind?: "blue" | "cap"; dot?: string }[] = [
  {
    y: "1929–30", img: "tl-1929", alt: "Serge Lifar, photographed by Teddy Piaz, 1929–30",
    imgStyle: { opacity: 0.26, filter: "grayscale(1) contrast(1.1)" },
    text: <>Serge Lifar joins the Paris Opera. A turning point: Markevitch, Cocteau, Balanchine and Lifar begin to write a new chapter of ballet.</>,
  },
  {
    y: "1932", img: "tl-1932", alt: "Igor Markevitch, drawn by Jacques Courteaux, 1930, among birds and stars",
    imgStyle: { opacity: 0.42, filter: "invert(1) grayscale(1) contrast(1.15)" },
    text: <>Serge Lifar commissions the score of <i>L&apos;Envol d&apos;Icare</i>{" "}from Igor Markevitch.</>,
  },
  {
    y: "1933", img: "tl-1933", alt: "Serge Lifar's own Icare on the stage of the Paris Opera, photograph by Roger Pic",
    imgStyle: { opacity: 0.28, filter: "grayscale(1) contrast(1.1)" },
    text: <>The score has its concert premiere. In 1935 Lifar stages his own <i>Icare</i>{" "}— to his own rhythms. Markevitch&apos;s score is never danced.</>,
  },
  {
    y: "2026", kind: "blue", dot: "#E8455E",
    text: <>Can we give <i>L&apos;Envol d&apos;Icare</i>{" "}the place on the French stage it was written for?</>,
  },
  {
    y: "2028–2030", kind: "cap", img: "tl-2027", dot: "#ede9e3",
    alt: "The Capitole de Toulouse at night, central pavilion with the word CAPITOLIUM", imgStyle: { opacity: 0.46 },
    text: <>Premiere in 2028–29. In 2029–30, a hundred years on, Markevitch the composer reclaims his place on the stage.</>,
  },
];

function Mission() {
  return (
    <section className="mk-slide" id="m03">
      <Head label="The mission" num="02" id="m-h" />
      <Title fit={FIT.mission}>
        <span>Bringing Markevitch</span>
        <span>back to the stage</span>
        <span>in <span className="red">France</span></span>
      </Title>
      <p className="mk-names">Diaghilev · Cocteau · Ballet · Opera</p>

      <div className="mk-tl">
        <Nerve id="m-tl" vertical className="mk-tl-line" />
        {ERAS.map((e) => (
          <div key={e.y} className={`mk-tl-item ${e.kind ?? ""}`}>
            <span className="mk-tl-dot" style={e.dot ? { background: e.dot } : undefined} />
            {e.img && (
              <span className="clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${M}/${e.img}.webp`} alt={e.alt} style={e.imgStyle} loading="lazy" />
              </span>
            )}
            {e.kind === "blue" && <span className="clip"><Question /></span>}
            <div className="in">
              <div className="y">{e.y}</div>
              <p className="x">{e.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mk-box" style={{ marginTop: 24 }}>
        <Nerve id="m-c0" vertical className="edge" />
        <div className="mk-label gold">The anchor</div>
        <p className="mk-p">
          We see 1929 as the turning point for the international ballet world. The death of Diaghilev and the break-up
          of the Ballets Russes opened the history of twentieth-century ballet as we know it today. His dancers and
          artists — and their fame with them — scattered across the world <b className="red">like birds</b>.
        </p>
      </div>
      <div className="mk-box">
        <Nerve id="m-c1" vertical className="edge" />
        <div className="mk-label">New homes</div>
        <p className="mk-p">
          Balanchine found his home in New York, Ninette de Valois in London, Massine in Monte Carlo, and Lifar —{" "}
          <b>born in Kyiv, like Markevitch</b>{" "}— at the Paris Opera.
        </p>
      </div>

      <p className="mk-credit">
        Images via BnF / Wikimedia Commons · Lifar: Teddy Piaz, 1929–30 · Markevitch: Jacques Courteaux, 1930 ·{" "}
        <i>Icare</i>: Roger Pic · public domain · Capitole de Toulouse: photo Diego Delso, CC BY-SA 4.0
      </p>
    </section>
  );
}

/* ── 03 · L'Envol d'Icare ────────────────────────────────────────────────── */
function Icare() {
  return (
    <section className="mk-slide" id="m04">
      <Head label="The ballet" num="03" id="i-h" />
      <Title fit={FIT.icare}>
        <span>L&apos;Envol <span className="red">d&apos;Icare</span></span>
      </Title>
      <div className="mk-gap-s" />
      <Title as="p" fit={FIT.icareSub}>
        <span>In this myth, today,</span>
        <span>I see a <span className="red">possibility</span></span>
      </Title>

      <div className="mk-gap" />
      <p className="mk-p">
        The myth warns: do not fly too high — the sun will melt your wings. Our Icarus holds the whole universe in
        his heart — the flight, the sun, the father and the fall are one.
      </p>
      <p className="mk-p">
        This line of thought interests me all the more because Matisse has already given it form in his modern
        Icarus: the sun is inside, and the figure seems to levitate, like an astronaut in a space shuttle.
      </p>

      <div className="mk-quote">
        <Title as="p" fit={FIT.quote}>
          <span>“The work still awaits</span>
          <span>its <span className="red">dance premiere</span>.”</span>
        </Title>
        <div className="mk-label grey">Boosey &amp; Hawkes, dance catalogue</div>
      </div>

      <div className="mk-bluecol">
        <div className="mk-label">The score · two pianos · three percussion</div>
        <a className="mk-video" href={YT_ICARE} {...out}
           aria-label="Play L'Envol d'Icare, version for two pianos and three percussion, from 6:25 — opens YouTube">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${M}/ensemble.webp`} alt="Two pianos and three percussion on a concert stage, performing L'Envol d'Icare" loading="lazy" />
          <span className="tag">Ensemble of five</span>
          <span className="mk-play"><Tri /></span>
        </a>
        <dl className="mk-facts">
          <dt>Composer</dt><dd>Igor Markevitch</dd>
          <dt>Versions</dt><dd>1932 · revised as <i>Icare</i>{" "}1943</dd>
          <dt>Duration</dt><dd>27 minutes, in seven parts</dd>
        </dl>
        <a className="mk-dancer" href={MOZART} {...out} aria-label="Mozart 25, ballet in one act — on hordieiev.art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${M}/icare-dancer.webp`} alt="A dancer in mid-air, arms open, Mozart 25" width={936} height={408} loading="lazy" />
        </a>
        <Nerve id="i-b" style={{ marginTop: 4 }} />
        <a className="mk-row" href={YT_BERNSTEIN} {...out} style={{ marginTop: 10 }}
           aria-label="Play the orchestral version, Icare 1943, New York Philharmonic under Leonard Bernstein — opens YouTube">
          <span className="mk-play s"><Tri /></span>
          <span className="t">
            <span className="mk-label blue" style={{ display: "block", fontSize: 10.5 }}>Orchestral version · <i>Icare</i>{" "}1943</span>
            <span className="l" style={{ display: "block" }}>New York Philharmonic · Leonard Bernstein · Carnegie Hall, 1958</span>
          </span>
        </a>
      </div>
    </section>
  );
}

/* ── 04 · Lorenzo il Magnifico ───────────────────────────────────────────── */
function Lorenzo() {
  return (
    <section className="mk-slide" id="m05">
      <div className="mk-urbain">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${M}/urbain.webp`} alt="" loading="lazy" />
      </div>
      <div style={{ position: "relative" }}>
        <Head label="Ballet with voice and orchestra" num="04" id="l-h" />
        <Title fit={FIT.lorenzo}>
          <span>Lorenzo</span>
          <span className="red">il Magnifico</span>
        </Title>

        <a className="mk-circle" href={YT_LORENZO} {...out}
           aria-label="Listen to Lorenzo il Magnifico — the whole work, 29 minutes — opens YouTube">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${M}/lorenzo-circle.webp`} alt="Lorenzo de' Medici by Benozzo Gozzoli, in a circle after Galileo's drawings of the Moon" width={608} height={608} loading="lazy" />
          <span className="mk-play"><Tri /></span>
        </a>
        {/* шість станцій кола — за годинниковою стрілкою, як на слайді */}
        <p className="mk-orbits">
          {["Urban II in Toulouse, 1096", "The capitouls", "The troubadours", "Dante", "The Renaissance", "Lorenzo de' Medici"].map(
            (t, i) => <Fragment key={t}>{i > 0 && " "}<span>{i > 0 && <em aria-hidden="true">→ </em>}{t}</span></Fragment>,
          )}
        </p>

        <div className="mk-gap" />
        <p className="mk-p">
          When I first visited the Capitole this summer, I was struck by a monumental painting — the entry of Pope
          Urban II into Toulouse in 1096. I became interested in this story and began to dig deeper into the history
          of the relationship between the capitouls of Toulouse, the counts and the citizens of the city.
        </p>
        <p className="mk-p">
          This research, across several centuries, brought me back to Igor Markevitch&apos;s most mature work —{" "}
          <i>Lorenzo il Magnifico</i>, 1940.
        </p>

        <div className="mk-table">
          <Nerve id="l-t" vertical className="edge" />
          <dl>
            <dt>Form</dt><dd>sinfonia concertante for soprano and orchestra, in five movements, 29 minutes</dd>
            <dt>Premiere</dt><dd>Florence, 1941, the composer conducting</dd>
            <dt>Text</dt><dd>poems by Lorenzo de&apos; Medici — public domain, no separate rights holder for the text</dd>
          </dl>
        </div>

        <p className="mk-p mk-gap">
          In this work we hear an extraordinary Markevitch — impassioned and sonorous — in a Europe already engulfed
          by war. He then joined the Italian Resistance, never returned to composition, and became one of the great
          conductors of the twentieth century.
        </p>

        <a className="mk-listen" href={YT_LORENZO} {...out}>
          <span className="mk-play s redbg"><Tri /></span>
          <span className="t">
            <span className="mk-label" style={{ display: "block", color: "var(--fg)" }}>Listen · the whole work, 29′</span>
            <span className="l" style={{ display: "block" }}>Lucy Shelton · Arnhem Philharmonic · Christopher Lyndon-Gee</span>
          </span>
        </a>

        <p className="mk-credit">
          Circle after Galileo Galilei, <i>Sidereus Nuncius</i>, 1610 — the Moon and the four moons of Jupiter he named
          the Medicean Stars · Lorenzo: Benozzo Gozzoli, Palazzo Medici Riccardi · Benjamin-Constant,{" "}
          <i>L&apos;entrée à Toulouse du pape Urbain II en 1096</i>, Salle des Illustres, Capitole · public domain
        </p>
      </div>
    </section>
  );
}

/* ── 05 · пропозиція ─────────────────────────────────────────────────────── */
function Proposal() {
  return (
    <section className="mk-slide" id="m06">
      <div className="mk-muraille">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${M}/muraille.webp`} alt="" loading="lazy" />
      </div>
      <div style={{ position: "relative" }}>
        <Head label="The partnership" num="05" id="p-h" />
        <Title fit={FIT.proposal}>
          <span>What we propose,</span>
          <span>and what</span>
          <span className="red">we are looking for</span>
        </Title>

        <div className="mk-block">
          <div className="mk-label">The centenary · 2029–30</div>
          <p className="mk-p">
            <b>2029–30</b>{" "}marks one hundred years since the turning point: Diaghilev dies, the Ballets Russes break
            up, and Lifar arrives at the Paris Opera. It is the anchor of the project.
          </p>
        </div>
        <div className="mk-block">
          <div className="mk-label">The score</div>
          <p className="mk-p">
            For <b><i>L&apos;Envol d&apos;Icare</i></b>{" "}we plan to use Markevitch&apos;s chamber version for five players —{" "}
            <b>two pianos and three percussion</b>. He began the reduction himself in 1933; the current edition, by
            Christopher Lyndon-Gee, is listed in the <b>Boosey &amp; Hawkes</b>{" "}dance catalogue as available for touring.
          </p>
        </div>
        <div className="mk-block">
          <div className="mk-label">When</div>
          <p className="mk-p">
            We propose the world premiere in the 2028–29 season. From the centenary season, 2029–30, a tour and a Paris
            premiere may follow.
          </p>
        </div>
        <div className="mk-block">
          <div className="mk-label">The team</div>
          <p className="mk-p">
            <b>15 years</b>{" "}of joint production experience, plus Artem&apos;s experience as founder and
            choreographer of his own dance company, on projects of every scale.
          </p>
        </div>
        <div className="mk-block">
          <div className="mk-label">Rights — one publisher</div>
          <p className="mk-p">
            Boosey &amp; Hawkes handle worldwide rights for all the Markevitch works; the poems of Lorenzo de&apos; Medici
            are in the public domain.
          </p>
        </div>

        <div className="mk-gap" />
        <div className="mk-offer">
          <Nerve id="p-o0" vertical className="edge" />
          <div className="mk-label gold">The company on stage</div>
          <p className="mk-p">Both works involve <b>the full company of the Ballet du Capitole</b>.</p>
        </div>
        <div className="mk-offer">
          <Nerve id="p-o1" vertical className="edge" />
          <div className="mk-label gold">What the Capitole receives</div>
          <p className="mk-p">
            An <b>exclusive world premiere</b>, a renewed myth, and a fresh look at the twentieth-century heritage of
            French ballet.
          </p>
        </div>
        <div className="mk-offer">
          <Nerve id="p-o2" vertical className="edge" />
          <div className="mk-label gold">Open dates · what we bring</div>
          <p className="mk-p">
            The premiere dates we propose are open and depend entirely on your programming and season. On our side:{" "}
            <b>production skills</b>{" "}built over years as a team — professional broadcast and filming, promotion and
            touring support, international contacts, sponsor partnerships, marketing strategy and brand integration.
          </p>
        </div>

        <p className="mk-credit">
          Ground: Jean-Paul Laurens, <i>La Muraille</i>, 1895, Capitole de Toulouse · photo PierreSelim, CC BY-SA 3.0
        </p>
      </div>
    </section>
  );
}

/* ── 06 · наступний крок ─────────────────────────────────────────────────── */
function NextStep() {
  return (
    <section className="mk-slide" id="m07">
      <div className="mk-icare-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${M}/matisse.webp`} alt="" loading="lazy" />
      </div>
      <div style={{ position: "relative" }}>
        <Head label="The next step" num="06" id="n-h" />
        <Title fit={FIT.next}>
          <span>Since 1932, Icare</span>
          <span>has been waiting</span>
          <span className="red">to take off.</span>
          <span className="red">Let it be</span>
          <span className="red">in Toulouse.</span>
        </Title>

        <Nerve id="n-l" style={{ marginTop: 28 }} />
        <div className="mk-label" style={{ marginTop: 10 }}>What we leave with you</div>
        <div className="mk-docs">
          <div className="mk-doc">
            <div className="mk-label">01 · Dossier · one page</div>
            <div className="ttl">L&apos;Envol d&apos;Icare</div>
            <p className="d">World premiere · Markevitch, 1932 · 27 minutes. The first act.</p>
            <div className="mk-btns">
              <a className="mk-btn" href="https://www.hordieiev.art/imprimer/icare" {...out}>Imprimer <Arrow /></a>
            </div>
          </div>
          <div className="mk-doc">
            <div className="mk-label">02 · Dossier · one page</div>
            <div className="ttl">Lorenzo il Magnifico</div>
            <p className="d">Ballet with voice and orchestra · 1940 · 29 minutes. The second act.</p>
            <div className="mk-btns">
              <a className="mk-btn" href="https://www.hordieiev.art/imprimer/lorenzo" {...out}>Imprimer <Arrow /></a>
            </div>
          </div>
          <div className="mk-doc">
            <div className="mk-label">03 · The presentation · online</div>
            <div className="ttl">On your phone</div>
            <p className="d">Today&apos;s slides — you are reading them now. The link to share:</p>
            <div className="mk-btns">
              <a className="mk-btn" href="https://www.hordieiev.art/markevitch-t3lu2ig">hordieiev.art/markevitch-t3lu2ig</a>
            </div>
            <div className="mk-label dim mk-hint">Tap and hold the link to copy or share it</div>
          </div>
          <div className="mk-doc">
            <div className="mk-label">04 · CV · one page</div>
            <div className="ttl">Artem Hordieiev</div>
            <div className="mk-btns">
              <a className="mk-btn" href="https://www.hordieiev.art/fr/cv?print=1" {...out}>Imprimer <Arrow /></a>
              <a className="mk-btn" href="https://www.hordieiev.art/fr/cv" {...out}>En ligne <Arrow /></a>
            </div>
          </div>
        </div>

        <div className="mk-contact">
          <a href="mailto:art_om@me.com"><span>art_om@me.com</span><span className="k">E-mail</span></a>
          <a href="tel:+33743791841"><span>+33 7 43 79 18 41</span><span className="k">Call</span></a>
          <a href="https://wa.me/33743791841" {...out}><span className="red">WhatsApp</span><Arrow /></a>
          <a href="https://hordieiev.art/" {...out}><span className="red">hordieiev.art</span><Arrow /></a>
        </div>
        <p className="mk-sign">
          Toulouse, Haute-Garonne<br />Artem Hordieiev, concept &amp; choreography<br />Tetiana Hordieieva, production
        </p>
        <p className="mk-credit">Ground: Henri Matisse, <i>Icare</i>, <i>Jazz</i>, 1947</p>
      </div>
    </section>
  );
}

export default function MobileDeck() {
  return (
    <div className="mk">
      <Cover />
      <Who />
      <Mission />
      <Icare />
      <Lorenzo />
      <Proposal />
      <NextStep />
    </div>
  );
}
