import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DRAFT_MOST } from "@/lib/drafts";
import { mostWork, mostWorks } from "@/lib/most-data";
import Bridge from "@/components/most/Bridge";
import Predella from "@/components/most/Predella";
import "../most.css";

export function generateStaticParams() {
  return mostWorks.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = mostWork(slug);
  return { title: `${w?.title ?? "Work"} · Prototype`, robots: { index: false, follow: false } };
}

export default async function MostWorkPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  if (!DRAFT_MOST) notFound();
  const { lang, slug } = await params;
  const work = mostWork(slug);
  if (!work) notFound();
  const i = mostWorks.indexOf(work);
  const next = mostWorks[(i + 1) % mostWorks.length];
  const altarId = "work";

  return (
    <div className="most">
      <Bridge work={work} altarId={altarId} />
      <section id={altarId} className="altar tone-light" aria-label={work.title} tabIndex={-1}>
        <div className="head">
          <h2 className="namu">{work.title}</h2>
          <span className="meta">{work.meta}</span>
        </div>
        <Predella pala={work.pala} panels={work.predella} watch={work.watch} />
        <dl className="facts">
          {work.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="next">
          {work.current && (
            <Link className="pill quiet" href={`/${lang}${work.current}`}>
              Current page of the work
            </Link>
          )}
          <Link className="pill quiet" href={`/${lang}/most`}>
            All works
          </Link>
          <Link className="pill" href={`/${lang}/most/${next.slug}`}>
            Next: {next.title}
          </Link>
        </div>
      </section>
    </div>
  );
}
