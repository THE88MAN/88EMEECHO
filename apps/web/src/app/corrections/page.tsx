import type { Metadata } from "next";
import Link from "next/link";
import { articleHref, listPublicCorrections } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Historique des corrections",
  description:
    "Corrections publiques — transparence éditoriale. Contenu démo fictif.",
};

export default function CorrectionsPage() {
  const corrections = listPublicCorrections();

  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Transparence</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        Historique public des corrections
      </h1>
      <p className="mt-4 font-serif text-base text-parchment/70">
        Structure Phase 2. Les corrections ne sont pas effacées en silence.
        Entrées fictives de démonstration.
      </p>

      <ul className="mt-12 space-y-6">
        {corrections.map((c) => (
          <li
            key={c.id}
            className="border border-anthracite-light bg-ink-soft p-6"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-gold/70">
              {new Date(c.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-2 font-display text-xl text-parchment">
              {c.summary}
            </h2>
            <p className="mt-3 font-serif text-sm text-parchment/70">{c.body}</p>
            <p className="mt-4 font-sans text-[11px] text-parchment/45">
              Article :{" "}
              <Link
                href={articleHref({ slug: c.articleSlug })}
                className="text-gold hover:text-gold-soft"
              >
                {c.articleTitle}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
