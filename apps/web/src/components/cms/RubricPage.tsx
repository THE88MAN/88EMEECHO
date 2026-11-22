import Link from "next/link";
import { listArticlesByRubric } from "@/lib/cms";
import { rubricsMeta } from "@/lib/demo/content";
import type { RubricSlug } from "@/lib/cms/types";
import { ArticleCard } from "./ArticleCard";

export function RubricPage({ slug }: { slug: RubricSlug }) {
  const meta = rubricsMeta[slug];
  const articles = listArticlesByRubric(slug);

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">{meta.salle}</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        {meta.title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-parchment/70">
        {meta.description}
      </p>
      <p className="mt-3 font-sans text-sm text-gold/80">
        Contenu démo fictif — Phase 2 CMS.
      </p>

      <ul className="mt-12 divide-y divide-anthracite-light border-y border-anthracite-light">
        {articles.length === 0 ? (
          <li className="py-8 font-serif text-parchment/50">
            Aucun article publié dans cette rubrique.
          </li>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </ul>

      <div className="mt-10 flex flex-wrap gap-6">
        <Link
          href="/bibliotheque"
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
        >
          Bibliothèque historique →
        </Link>
        <Link
          href="/"
          className="font-sans text-[11px] uppercase tracking-[0.2em] text-parchment/50 hover:text-gold"
        >
          ← Accueil
        </Link>
      </div>
    </div>
  );
}
