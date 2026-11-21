import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseStub } from "@/lib/db/client";
import { listForbiddenSourceNames } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Admin (stub)",
  robots: { index: false, follow: false },
};

export default function AdminStubPage() {
  const db = getSupabaseStub();
  const forbidden = listForbiddenSourceNames();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
      <p className="section-kicker">Administration</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Tableau de bord — stub Phase 1
      </h1>
      <p className="mt-4 max-w-2xl text-parchment/70">
        Structure réservée aux rôles éditoriaux (directeur, rédacteur,
        validateur). Auth Supabase réelle et RLS : Phase 2+. Aucune action
        destructive disponible ici.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="border border-white/10 bg-ink-soft p-6">
          <h2 className="font-display text-xl text-gold">Connexion données</h2>
          <p className="mt-3 text-sm text-parchment/65">
            Supabase configuré :{" "}
            <span className="text-parchment">
              {db.configured ? "oui" : "non (stub local)"}
            </span>
          </p>
          <p className="mt-2 text-sm text-parchment/55">
            Schéma :{" "}
            <code className="text-gold/80">
              supabase/migrations/001_initial_schema.sql
            </code>
          </p>
        </div>
        <div className="border border-white/10 bg-ink-soft p-6">
          <h2 className="font-display text-xl text-gold">File éditoriale</h2>
          <ul className="mt-3 space-y-2 text-sm text-parchment/65">
            <li>BROUILLON — 0</li>
            <li>À VÉRIFIER — 0</li>
            <li>VALIDÉ — 0</li>
            <li>PUBLIÉ — 0 (démo front uniquement)</li>
          </ul>
        </div>
        <div className="border border-white/10 bg-ink-soft p-6 md:col-span-2">
          <h2 className="font-display text-xl text-gold">
            Filtre sources interdites
          </h2>
          <p className="mt-3 text-sm text-parchment/65">
            Module technique actif : {forbidden.join(", ")}.
          </p>
          <p className="mt-2 text-sm text-parchment/50">
            Toute tentative d’ingestion depuis ces sources doit être rejetée en
            amont (Phase 3 veille).
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Retour au site public
      </Link>
    </div>
  );
}
