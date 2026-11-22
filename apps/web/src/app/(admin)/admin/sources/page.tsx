import type { Metadata } from "next";
import Link from "next/link";
import { cmsSources } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Admin · Sources",
  robots: { index: false, follow: false },
};

export default function AdminSourcesPage() {
  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">CMS</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">Sources</h1>
      <p className="mt-3 max-w-2xl font-serif text-sm text-parchment/60">
        Gestion consultable. Sources interdites (RFI, Le Monde, Jeune Afrique,
        Nofi) verrouillées — trigger SQL + filtre TS. Sources africaines et
        antillaises / caribéennes internes autorisées (évaluées).
      </p>

      <ul className="mt-10 divide-y divide-anthracite-light border-y border-anthracite-light">
        {cmsSources.map((s) => (
          <li key={s.id} className="flex flex-wrap items-start justify-between gap-4 py-5">
            <div>
              <h2 className="font-display text-lg text-parchment">{s.name}</h2>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-parchment/45">
                {s.category}
              </p>
              <p className="mt-2 max-w-xl font-serif text-sm text-parchment/60">
                {s.description}
              </p>
            </div>
            <span
              className={`border px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] ${
                s.isForbidden
                  ? "border-crimson text-parchment/70"
                  : "border-gold/50 text-gold"
              }`}
            >
              {s.isForbidden ? "Interdite" : "Autorisée"}
            </span>
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
