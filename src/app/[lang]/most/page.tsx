import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DRAFT_MOST } from "@/lib/drafts";
import { M25, mostWorks } from "@/lib/most-data";
import Jump, { type JumpSection } from "@/components/most/Jump";
import "./most.css";

export const metadata: Metadata = {
  title: "Prototype · Artem Hordieiev",
  robots: { index: false, follow: false },
};

export default async function MostHome({ params }: { params: Promise<{ lang: string }> }) {
  if (!DRAFT_MOST) notFound();
  const { lang } = await params;

  const sections: JumpSection[] = [
    {
      id: "start",
      tone: "dark",
      phase: M25.push,
      label: "Artem Hordieiev",
      content: (
        <>
          <h1 className="namu">Artem Hordieiev</h1>
          <p className="lead">Choreographer</p>
          <p className="slogan">
            <span className="ph">слоган · Артем перепише</span>
          </p>
        </>
      ),
    },
    {
      id: "works",
      tone: "light",
      phase: M25.reach,
      label: "Works",
      content: (
        <>
          <h2 className="namu">Works</h2>
          <ul className="list">
            {mostWorks.map((w) => (
              <li key={w.slug}>
                <Link href={`/${lang}/most/${w.slug}`}>
                  <span className="code">{w.code}</span>
                  <span className="t">{w.title}</span>
                  <span className="m">{w.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "cv",
      tone: "dark",
      phase: M25.flight,
      label: "CV",
      content: (
        <>
          <h2 className="namu">CV</h2>
          <p className="lead">
            <span className="ph">текст Артема</span>
          </p>
          <div className="row">
            <Link className="pill" href={`/${lang}/cv`}>
              Open the CV
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "contact",
      tone: "light",
      phase: M25.land,
      label: "Contact",
      content: (
        <>
          <h2 className="namu">Contact</h2>
          <p className="lead">
            <span className="ph">текст Артема</span>
          </p>
          <div className="row">
            <Link className="pill" href={`/${lang}#contact`}>
              Write to Artem
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="most">
      <Jump sections={sections} phases={[M25.push, M25.reach, M25.flight, M25.land]} />
    </div>
  );
}
