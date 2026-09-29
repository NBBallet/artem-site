import { toParas } from "@/lib/paras";

/** Бігучий текст у колонці читання: абзаци з `toParas`, ритм — `.r-flow`. */
export default function Paras({
  text,
  className = "",
  pClassName = "",
}: {
  text: string | null | undefined;
  className?: string;
  pClassName?: string;
}) {
  const paras = toParas(text);
  if (!paras.length) return null;
  return (
    <div className={`r-flow ${className}`}>
      {paras.map((p, i) => (
        <p key={i} className={pClassName}>
          {p}
        </p>
      ))}
    </div>
  );
}
