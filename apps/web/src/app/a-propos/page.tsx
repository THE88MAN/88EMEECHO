import type { Metadata } from "next";
import Link from "next/link";
import {
  listForbiddenSourceNames,
  editorialPolicy,
} from "@/lib/editorial";

export const metadata: Metadata = { title: "À propos" };

export default function AProposPage() {
  const forbidden = listForbiddenSourceNames();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-kicker">Le média</p>
      <h1 className="mt-3 font-display text-4xl text-gold md:text-5xl">
        À propos de LE 88ÈME ÉCHO
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-parchment/80">
        LE 88ÈME ÉCHO est un média documentaire indépendant consacré à
        l’histoire africaine, aux diasporas, aux mémoires oubliées, aux
        rapports de pouvoir et aux enjeux contemporains du continent africain.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">Mission</h2>
        <p className="mt-3 text-parchment/70 leading-relaxed">
          Documenter les événements historiques et contemporains à partir de
          sources vérifiables, en privilégiant les archives, les chercheurs et
          les médias africains. Refuser les récits simplificateurs et les
          affirmations non vérifiées.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-parchment">
          Distinctions obligatoires
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-parchment/70">
          {editorialPolicy.contentLabels.map((label) => (
            <li key={label} className="font-mono text-sm">
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-parchment">
          Sources journalistiques interdites
        </h2>
        <p className="mt-3 text-parchment/70 leading-relaxed">
          Ne jamais utiliser comme sources éditoriales, ni reprendre leurs
          articles même indirectement via agrégateurs :
        </p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {forbidden.map((name) => (
            <li
              key={name}
              className="border border-crimson/50 px-3 py-1 text-sm text-parchment/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-parchment">Charte</h2>
        <p className="mt-3 text-parchment/70 leading-relaxed">
          La charte éditoriale complète et la policy machine-readable sont
          versionnées dans le dépôt (
          <code className="text-gold/90">content/editorial-charter.md</code>,{" "}
          <code className="text-gold/90">content/editorial-policy.json</code>
          ). Toute modification nécessite l’autorisation explicite du directeur
          éditorial. Aucune IA ne peut les modifier seule.
        </p>
      </section>

      <p className="mt-10 text-sm text-parchment/50">
        Domaine cible : {editorialPolicy.media.domain} — pas de production sans
        feu vert.
      </p>

      <Link
        href="/"
        className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Retour à l’accueil
      </Link>
    </div>
  );
}
