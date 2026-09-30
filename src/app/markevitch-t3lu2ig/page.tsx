import type { Metadata } from "next";
import deck from "./deck.json";
import MobileDeck from "./MobileDeck";

/* Прихована сторінка пітчу «Le retour de Markevitch» для Балету Капітолію
   (RDV 02.10.2026). Не в навігації, не в пошуку: на неї веде тільки QR-код
   на звороті обох досьє (FR-04) і на слайді 06.

   Слайди — знімки канви (CHORÉGRAPHE/_інструменти/канва/веб_колоди.py):
   картинка + прозорі посилання поверх, координати з links.json. Оновити =
   перезняти канву тим самим скриптом і замінити public/deck/t3lu2ig/ і deck.json.

   Під 768 px знімки не показуються: там ті самі слайди живим текстом
   (MobileDeck.tsx), бо на телефоні знімок стискається і текст не читається. */

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The return of Markevitch — Opéra national du Capitole",
  description: "L'Envol d'Icare · Lorenzo il Magnifico — un projet en deux actes.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: null,
};

const DIR = "/deck/t3lu2ig";
const SLIDES = ["01", "02", "03", "04", "05", "06", "07"];
const SHEETS = [
  ["08", "L'Envol d'Icare · recto"],
  ["09", "Lorenzo il Magnifico · verso"],
] as const;

const sizes: Record<string, number[]> = deck.sizes;
const links = deck.links as Record<string, { href: string; x: number; y: number; w: number; h: number }[]>;

function Board({ id, alt }: { id: string; alt: string }) {
  const [W, H] = sizes[id];
  return (
    <figure id={id} className="relative m-0 w-full scroll-mt-6" style={{ aspectRatio: `${W} / ${H}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${DIR}/${id}.webp`}
        alt={alt}
        width={W * 2}
        height={H * 2}
        loading={id === "01" ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full"
      />
      {links[id].map((l, i) => (
        <a
          key={i}
          href={l.href}
          aria-label={l.href}
          {...(l.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener" })}
          className="absolute rounded-sm hover:bg-white/5"
          style={{
            left: `${(l.x / W) * 100}%`,
            top: `${(l.y / H) * 100}%`,
            width: `${(l.w / W) * 100}%`,
            height: `${(l.h / H) * 100}%`,
          }}
        />
      ))}
    </figure>
  );
}

const label = "font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[0.17em]";

export default function MarkevitchCapitole() {
  return (
    <main className="flex-1 bg-[#0a0a0a] text-[#EDE9E3] md:px-8 md:py-12">
      <div className="md:hidden">
        <MobileDeck />
      </div>
      <div className="mx-auto hidden max-w-[1280px] flex-col gap-8 md:flex">
        <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className={`${label} text-[#E8455E]`}>Opéra national du Capitole · 2 octobre 2026</span>
          <span className={`${label} text-[#8a8580]`}>The return of Markevitch · a project in two acts</span>
        </header>

        {SLIDES.map((id) => (
          <Board key={id} id={id} alt={`The return of Markevitch — slide ${Number(id)}`} />
        ))}

        <h2 className={`${label} mt-8 border-t border-[#2a2622] pt-6 text-[#E8455E]`}>
          Les documents · en français
        </h2>
        <div className="mx-auto grid max-w-[852px] grid-cols-2 gap-6">
          {SHEETS.map(([id, alt]) => (
            <Board key={id} id={id} alt={alt} />
          ))}
        </div>

        <footer className={`${label} mt-6 flex flex-wrap justify-between gap-2 text-[#6f6a64]`}>
          <span>Artem Hordieiev · Toulouse</span>
          <a href="https://hordieiev.art/fr" className="text-[#E8455E]">hordieiev.art</a>
        </footer>
      </div>
    </main>
  );
}
