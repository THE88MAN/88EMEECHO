import type { Metadata } from "next";
import Link from "next/link";
import { searchIndex } from "@/lib/cms";
import { isForbiddenEditorialSource } from "@/lib/editorial";

export const metadata: Metadata = { title: "Recherche" };

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RecherchePage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const forbidden = query ? isForbiddenEditorialSource(query) : false;
  const results = forbidden ? [] : searchIndex(query);

  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Recherche</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        {query ? `Résultats pour « ${q} »` : "Rechercher"}
      </h1>
      <p className="mt-3 font-serif text-sm text-parchment/55">
        Index Phase 2 (articles, dossiers, sources) — stubs locaux, pas encore
        de full-text Supabase.
      </p>

      {!query && (
        <p className="mt-8 font-serif text-parchment/60">
          Saisissez un terme dans la barre de recherche du menu.
        </p>
      )}

      {forbidden && (
        <p className="mt-8 border border-crimson/40 bg-ink-soft p-4 font-serif text-sm text-parchment/70">
          Requête liée à une source journalistique interdite. Aucun résultat
          éditorial servi.
        </p>
      )}

      {query && !forbidden && results.length === 0 && (
        <p className="mt-8 font-serif text-parchment/60">Aucun résultat.</p>
      )}

      {results.length > 0 && (
        <ul className="mt-10 divide-y divide-anthracite-light border-y border-anthracite-light">
          {results.map((r) => (
            <li key={`${r.type}-${r.id}`} className="py-5">
              <p className="font-sans text-[11px] uppercase tracking-widest text-gold/70">
                {r.meta} · {r.type}
              </p>
              <Link
                href={r.href}
                className="mt-1 block font-display text-xl text-parchment hover:text-gold"
              >
                {r.title}
              </Link>
              <p className="mt-1 font-serif text-sm text-parchment/55">{r.dek}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
