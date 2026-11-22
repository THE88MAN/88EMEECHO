import type { Metadata } from "next";
import Link from "next/link";
import {
  dossierHref,
  FACET_KIND_FR,
  filterDossiers,
  libraryFacets,
  listFacetsByKind,
} from "@/lib/cms";
import type { LibraryFacetKind } from "@/lib/cms/types";

export const metadata: Metadata = {
  title: "Bibliothèque historique",
  description:
    "Dossiers historiques classés par pays, région, siècle, période, personnalité, événement, thématique et type.",
};

type Props = {
  searchParams: Promise<{ q?: string; facet?: string; kind?: string }>;
};

const KIND_ORDER: LibraryFacetKind[] = [
  "pays",
  "region",
  "siecle",
  "periode",
  "personnalite",
  "evenement",
  "thematique",
  "type_document",
];

export default async function BibliothequePage({ searchParams }: Props) {
  const sp = await searchParams;
  const kind = KIND_ORDER.includes(sp.kind as LibraryFacetKind)
    ? (sp.kind as LibraryFacetKind)
    : undefined;
  const dossiers = filterDossiers({
    q: sp.q,
    facetSlug: sp.facet,
    kind,
  });

  return (
    <div className="bg-ink">
      <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
        <p className="section-kicker">Mémoire vivante</p>
        <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
          Bibliothèque historique
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-base text-parchment/70 md:text-lg">
          Classement multi-axes — pays, région, siècle, période, personnalité,
          événement, thématique, type de document. Contenu démo fictif.
        </p>

        <form
          method="get"
          className="mt-8 flex flex-wrap items-end gap-3 border border-anthracite-light bg-ink-soft p-4"
        >
          <label className="flex flex-col gap-1 font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/50">
            Recherche
            <input
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Mot-clé…"
              className="min-w-[12rem] border border-anthracite-light bg-ink px-3 py-2 font-serif text-sm text-parchment outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-1 font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/50">
            Axe
            <select
              name="kind"
              defaultValue={sp.kind ?? ""}
              className="border border-anthracite-light bg-ink px-3 py-2 font-sans text-sm text-parchment outline-none focus:border-gold"
            >
              <option value="">Tous</option>
              {KIND_ORDER.map((k) => (
                <option key={k} value={k}>
                  {FACET_KIND_FR[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/50">
            Facette
            <select
              name="facet"
              defaultValue={sp.facet ?? ""}
              className="border border-anthracite-light bg-ink px-3 py-2 font-sans text-sm text-parchment outline-none focus:border-gold"
            >
              <option value="">Toutes</option>
              {(kind ? listFacetsByKind(kind) : libraryFacets).map((f) => (
                <option key={f.id} value={f.slug}>
                  {FACET_KIND_FR[f.kind]} · {f.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="bg-gold px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Filtrer
          </button>
          {(sp.q || sp.facet || sp.kind) && (
            <Link
              href="/bibliotheque"
              className="px-3 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-parchment/50 hover:text-gold"
            >
              Réinitialiser
            </Link>
          )}
        </form>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {dossiers.length === 0 ? (
            <li className="font-serif text-parchment/50 md:col-span-2">
              Aucun dossier pour ces filtres.
            </li>
          ) : (
            dossiers.map((d) => (
              <li
                key={d.id}
                className="border border-anthracite-light bg-ink-soft p-6 transition hover:border-gold/40"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold/70">
                  Dossier · démo
                </p>
                <h2 className="mt-2 font-display text-2xl text-parchment">
                  <Link
                    href={dossierHref(d)}
                    className="hover:text-gold"
                  >
                    {d.title}
                  </Link>
                </h2>
                <p className="mt-3 font-serif text-sm text-parchment/65">
                  {d.summary}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
