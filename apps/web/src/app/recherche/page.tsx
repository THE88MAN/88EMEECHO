import type { Metadata } from "next";
import Link from "next/link";
import { sectionArticles, une, demoVideos } from "@/lib/demo/content";

export const metadata: Metadata = { title: "Recherche" };

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RecherchePage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const articles = [une, ...sectionArticles].filter((a) => {
    if (!query) return false;
    return (
      a.title.toLowerCase().includes(query) ||
      a.dek.toLowerCase().includes(query) ||
      a.rubric.toLowerCase().includes(query)
    );
  });

  const videos = demoVideos.filter((v) => {
    if (!query) return false;
    return (
      v.title.toLowerCase().includes(query) ||
      v.rubric.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-kicker">Recherche</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        {query ? `Résultats pour « ${q} »` : "Rechercher"}
      </h1>
      <p className="mt-3 text-sm text-parchment/55">
        Index démo Phase 1 (placeholders locaux) — pas encore de moteur
        full-text.
      </p>

      {!query && (
        <p className="mt-8 text-parchment/60">
          Saisissez un terme dans la barre de recherche du menu.
        </p>
      )}

      {query && articles.length === 0 && videos.length === 0 && (
        <p className="mt-8 text-parchment/60">Aucun résultat démo.</p>
      )}

      {articles.length > 0 && (
        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {articles.map((a) => (
            <li key={a.id} className="py-5">
              <p className="text-[11px] uppercase tracking-widest text-gold/70">
                {a.rubric}
              </p>
              <Link
                href={a.rubricHref}
                className="mt-1 block font-display text-xl text-parchment hover:text-gold"
              >
                {a.title}
              </Link>
              <p className="mt-1 text-sm text-parchment/55">{a.dek}</p>
            </li>
          ))}
        </ul>
      )}

      {videos.length > 0 && (
        <ul className="mt-8 space-y-4">
          {videos.map((v) => (
            <li key={v.id}>
              <Link
                href="/documentaires"
                className="font-display text-lg text-parchment hover:text-gold"
              >
                {v.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
