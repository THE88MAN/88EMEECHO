import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { dossierHref, libraryDossiers } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Admin · Bibliothèque",
  robots: { index: false, follow: false },
};

export default function AdminBibliothequePage() {
  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">CMS</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Bibliothèque
      </h1>
      <p className="mt-3 font-serif text-sm text-parchment/60">
        Dossiers seed — publier / archiver via les mêmes statuts articles
        (stub).
      </p>

      <ul className="mt-10 divide-y divide-anthracite-light border-y border-anthracite-light">
        {libraryDossiers.map((d) => (
          <li
            key={d.id}
            className="flex flex-wrap items-center justify-between gap-4 py-5"
          >
            <div>
              <h2 className="font-display text-xl text-parchment">{d.title}</h2>
              <p className="mt-1 font-serif text-sm text-parchment/55">
                {d.summary}
              </p>
              {d.status === "PUBLIE" && (
                <Link
                  href={dossierHref(d)}
                  className="mt-2 inline-block font-sans text-[10px] uppercase tracking-[0.16em] text-gold"
                >
                  Voir public →
                </Link>
              )}
            </div>
            <StatusBadge status={d.status} />
          </li>
        ))}
      </ul>

      <Link
        href="/admin"
        className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Tableau de bord
      </Link>
    </div>
  );
}
