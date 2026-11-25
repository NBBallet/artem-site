"use client";

import { useEffect, useRef, useState } from "react";
import type { MostWork } from "@/lib/most-data";

/**
 * «Хасіґакарі» — міст театру Но від завіси до сцени, три сосни ділять його на
 * три відрізки. Тут: прохід ≤ 1,5 екрана прокрутки, на кожній «сосні» один
 * факт; після третього сцена (кадр твору) світлішає. «Straight to the work»
 * видно завжди — для того, хто поспішає.
 *
 * Без JS і з prefers-reduced-motion усе видно одразу.
 */
export default function Bridge({ work, altarId }: { work: MostWork; altarId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // «озброїти» міст лише коли скрипт живий: без JS усе видно
    ref.current?.setAttribute("data-armed", "");
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const run = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / run));
      // перша сосна — одразу після входу, третя — до кінця мосту
      setSeen(p >= 0.62 ? 3 : p >= 0.32 ? 2 : 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bridge tone-dark"
      data-open={seen >= 3 ? "" : undefined}
    >
      <div className="bridge-stick">
        <h1 className="namu title">{work.title}</h1>
        <p className="meta">{work.meta}</p>
        <ol className="stops" aria-label="Three facts">
          {work.stops.map((s, i) => (
            <li key={s} className={`stop${seen > i ? " seen" : ""}`}>
              {s}
            </li>
          ))}
        </ol>
        <div className="stage">
          {work.pala.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={work.pala.src} alt={work.pala.alt} />
          ) : (
            <div className="ph-wrap">
              <span className="ph">кадр · матеріал Артема</span>
            </div>
          )}
        </div>
        <a className="pill quiet skip" href={`#${altarId}`}>
          Straight to the work
        </a>
      </div>
    </div>
  );
}
