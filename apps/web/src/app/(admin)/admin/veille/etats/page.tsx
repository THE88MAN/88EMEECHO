import type { Metadata } from "next";
import Link from "next/link";
import { AFRICAN_STATES, listStatesByRegion } from "@/lib/veille";

export const metadata: Metadata = {
  title: "Admin · 54 États",
  robots: { index: false, follow: false },
};

export default function VeilleEtatsPage() {
  const byRegion = listStatesByRegion();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">ÉCHO VEILLE</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Couverture — {AFRICAN_STATES.length} États
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        Langues de veille multi (ar, en, es, fr, pt selon pays). Sortie
        publique toujours en français après rédaction.
      </p>

      <div className="mt-12 space-y-10">
        {Object.entries(byRegion).map(([region, states]) => (
          <section key={region}>
            <h2 className="font-display text-2xl text-gold">{region}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {states.map((s) => (
                <li
                  key={s.code}
                  className="border border-anthracite-light px-3 py-2 font-serif text-sm text-parchment/80"
                >
                  <span className="font-sans text-[10px] text-parchment/40">
                    {s.code}
                  </span>{" "}
                  {s.nameFr}
                  <span className="block font-sans text-[10px] uppercase tracking-wider text-parchment/40">
                    {s.languages.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link
        href="/admin/veille"
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← ÉCHO VEILLE
      </Link>
    </div>
  );
}
