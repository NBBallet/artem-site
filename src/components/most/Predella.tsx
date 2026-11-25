"use client";

import { useState } from "react";
import type { MostPanel } from "@/lib/most-data";

/**
 * «Предела» — нижній ярус ренесансного вівтаря (зразок: Фра Анджеліко,
 * вівтар Сан-Доменіко, Ф'єзоле, близько 1423–24): великий образ (pala)
 * видно здалеку, ряд малих сцен під ним читають зблизька. Усі панелі видно
 * одразу, нічого не крутиться; наведення, фокус або дотик ставить панель
 * у pala.
 */
export default function Predella({
  pala,
  panels,
  watch,
}: {
  pala: MostPanel;
  panels: MostPanel[];
  watch?: { label: string; href: string };
}) {
  const [cur, setCur] = useState<number | null>(null);
  const shown = cur === null ? pala : panels[cur];

  return (
    <>
      <figure className="pala" aria-live="polite" style={{ margin: 0 }}>
        {shown.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown.src} alt={shown.alt} />
        ) : (
          <div className="ph-wrap">
            <span className="ph">{shown.alt} · матеріал Артема</span>
          </div>
        )}
      </figure>
      <div className="pala-cap">
        {shown.caption ? (
          <span className="alt">{shown.caption}</span>
        ) : (
          <span className="ph">підпис · текст Артема</span>
        )}
        {watch && (
          <a className="pill" href={watch.href} target="_blank" rel="noopener noreferrer">
            {watch.label}
          </a>
        )}
      </div>
      <ol className="predella" aria-label="Episodes">
        {panels.map((p, i) => (
          <li key={i}>
            <button
              type="button"
              aria-pressed={cur === i}
              aria-label={`Episode ${i + 1}: ${p.alt}`}
              onClick={() => setCur(cur === i ? null : i)}
              onMouseEnter={() => setCur(i)}
              onFocus={() => setCur(i)}
            >
              <span className="thumb">
                {p.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.src} alt="" loading="lazy" />
                ) : (
                  <span className="ph-wrap">
                    <span className="ph">матеріал Артема</span>
                  </span>
                )}
              </span>
              <span className="cap">
                <span className="num">{i + 1}</span>
                {p.caption ?? <span className="ph">текст Артема</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
