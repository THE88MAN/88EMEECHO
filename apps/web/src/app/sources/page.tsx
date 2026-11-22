import type { Metadata } from "next";
import Link from "next/link";
import { listForbiddenSources, listPublicSources } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Catalogue des sources consultables — exclusion technique des sources journalistiques interdites.",
};

export default function SourcesPage() {
  const allowed = listPublicSources();
  const forbidden = listForbiddenSources();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Transparence éditoriale</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        Sources consultables
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-base text-parchment/70">
        Catalogue Phase 2 (seed démo). Les sources journalistiques interdites
        par la charte restent exclues techniquement — elles ne sont jamais
        attachables à un article ou un dossier.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">
          Sources autorisées (démo)
        </h2>
        <ul className="mt-6 divide-y divide-anthracite-light border-y border-anthracite-light">
          {allowed.map((s) => (
            <li key={s.id} className="py-5">
              <h3 className="font-display text-xl text-parchment">{s.name}</h3>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.16em] text-gold/70">
                {s.category}
                {s.country ? ` · ${s.country}` : ""}
              </p>
              <p className="mt-2 max-w-2xl font-serif text-sm text-parchment/60">
                {s.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border border-crimson/50 bg-ink-soft p-6">
        <h2 className="font-display text-xl text-parchment">
          Sources journalistiques interdites
        </h2>
        <p className="mt-2 font-serif text-sm text-parchment/60">
          Présentes en base pour le filtre technique — jamais utilisées comme
          sources éditoriales.
        </p>
        <ul className="mt-4 space-y-2">
          {forbidden.map((s) => (
            <li
              key={s.id}
              className="font-sans text-sm uppercase tracking-wider text-parchment/50 line-through"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/bibliotheque"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        Bibliothèque historique →
      </Link>
    </div>
  );
}
