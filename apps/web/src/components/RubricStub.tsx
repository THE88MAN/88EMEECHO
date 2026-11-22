import Link from "next/link";
import { DemoArticle } from "@/lib/demo/content";

type Props = {
  title: string;
  description: string;
  articles: DemoArticle[];
  salle?: string;
};

export function RubricStub({ title, description, articles, salle }: Props) {
  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">{salle ?? "Rubrique"}</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-parchment/70">
        {description}
      </p>
      <p className="mt-3 font-sans text-sm text-gold/80">
        Page stub — contenus fictifs de démonstration.
      </p>

      <ul className="mt-12 divide-y divide-anthracite-light border-y border-anthracite-light">
        {articles.length === 0 ? (
          <li className="py-8 font-serif text-parchment/50">
            Aucun placeholder pour cette rubrique pour l’instant.
          </li>
        ) : (
          articles.map((article) => (
            <li key={article.id} className="cartel-frame py-6">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold/70">
                {article.label}
              </p>
              <h2 className="mt-2 font-display text-2xl text-parchment">
                {article.title}
              </h2>
              <p className="mt-2 max-w-2xl font-serif text-sm text-parchment/60">
                {article.dek}
              </p>
            </li>
          ))
        )}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
      >
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
