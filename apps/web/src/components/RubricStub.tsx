import Link from "next/link";
import { DemoArticle } from "@/lib/demo/content";

type Props = {
  title: string;
  description: string;
  articles: DemoArticle[];
};

export function RubricStub({ title, description, articles }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-kicker">Rubrique</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-parchment/70">
        {description}
      </p>
      <p className="mt-3 text-sm text-gold/80">
        Page stub Phase 1 — contenus fictifs de démonstration.
      </p>

      <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {articles.length === 0 ? (
          <li className="py-8 text-parchment/50">
            Aucun placeholder pour cette rubrique pour l’instant.
          </li>
        ) : (
          articles.map((article) => (
            <li key={article.id} className="py-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                {article.label}
              </p>
              <h2 className="mt-2 font-display text-2xl text-parchment">
                {article.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-parchment/60">
                {article.dek}
              </p>
            </li>
          ))
        )}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
      >
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
