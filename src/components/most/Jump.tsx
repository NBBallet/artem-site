"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * «Стрибок через склейку» (Майя Дерен, «A Study in Choreography for Camera»,
 * 1945): фігура стоїть у тих самих координатах екрана, а розділ під нею
 * змінюється. Кожен розділ — фаза одного жесту: відштовхування → розкриття →
 * політ → приземлення. Без автоплею й відео; лише чотири кадри.
 *
 * Телефон (< 900 px): кадр фази стоїть у тому самому місці на початку
 * кожного розділу (склейка за розділом). prefers-reduced-motion: нерухомий
 * ряд із чотирьох фаз (хронофотографія) у першому розділі.
 */
export interface JumpSection {
  id: string;
  tone: "dark" | "light";
  phase: string; // кадр фази
  label: string; // aria-label розділу
  content: ReactNode;
}

export default function Jump({ sections, phases }: { sections: JumpSection[]; phases: string[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="jump">
      <div className="jump-figure" data-tone={sections[active]?.tone} aria-hidden="true">
        <div className="frame">
          {sections.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.id} src={s.phase} alt="" className={i === active ? "on" : ""} loading={i === 0 ? "eager" : "lazy"} />
          ))}
        </div>
      </div>
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-label={s.label}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`jump-section tone-${s.tone}`}
        >
          <div className="col">
            <div className="jump-inline" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.phase} alt="" loading={i === 0 ? "eager" : "lazy"} />
            </div>
            {s.content}
            {i === 0 && (
              <div className="jump-chrono" aria-hidden="true">
                {phases.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p} src={p} alt="" />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
