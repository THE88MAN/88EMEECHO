import Link from "next/link";
import { une } from "@/lib/demo/content";

export function HomeUne() {
  return (
    <section
      id="une"
      className="scroll-mt-24 border-b border-white/10 bg-section-grain"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <p className="section-kicker">La Une</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-parchment/50">
              {une.rubric} · {une.label}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-parchment md:text-5xl text-balance">
              {une.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-parchment/70 md:text-lg">
              {une.dek}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={une.rubricHref}
                className="bg-gold px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-gold-soft"
              >
                Explorer {une.rubric}
              </Link>
              <span className="text-sm text-parchment/45">
                {une.readingTime} · démo
              </span>
            </div>
          </div>
          <aside className="border-l border-gold/30 pl-6 lg:pl-10">
            <p className="section-kicker">Rappel éditorial</p>
            <p className="mt-3 text-sm leading-relaxed text-parchment/65">
              Distinguer faits établis, informations vérifiées, interprétations,
              hypothèses, analyses et opinions. Aucune hypothèse présentée comme
              certitude.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
