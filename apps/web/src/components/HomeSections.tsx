import Link from "next/link";
import { sectionArticles } from "@/lib/demo/content";

export function HomeSections() {
  return (
    <section className="border-b border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Rubriques</p>
            <h2 className="mt-3 font-display text-3xl text-parchment md:text-4xl">
              À la une des sections
            </h2>
          </div>
          <p className="max-w-md text-sm text-parchment/55">
            Placeholders fictifs — structure éditoriale Phase 1 uniquement.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {sectionArticles.map((article) => (
            <li key={article.id}>
              <Link
                href={article.rubricHref}
                className="group flex flex-col gap-2 py-6 transition md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">
                    {article.rubric} · {article.label}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-parchment transition group-hover:text-gold md:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-parchment/60">
                    {article.dek}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-parchment/40">
                  {article.readingTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
