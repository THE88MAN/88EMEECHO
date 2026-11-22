import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  absoluteUrl,
  buildOpenGraph,
  buildTwitter,
  listSubscriptionPlans,
  SITE_NAME,
} from "@/lib/distribution";

export const metadata: Metadata = {
  title: "Abonnements",
  description: `Formules d’abonnement ${SITE_NAME} — stubs démo, aucun paiement.`,
  alternates: { canonical: absoluteUrl("/abonnement") },
  openGraph: buildOpenGraph({
    title: "Abonnements",
    description: "Formules stubs — aucun paiement réel.",
    path: "/abonnement",
  }),
  twitter: buildTwitter({
    title: "Abonnements",
    description: "Formules stubs — aucun paiement réel.",
  }),
};

export default function AbonnementPage() {
  const plans = listSubscriptionPlans();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Abonnements · ${SITE_NAME}`,
          url: absoluteUrl("/abonnement"),
        }}
      />
      <p className="section-kicker">Distribution · Phase 5</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        Abonnements
      </h1>
      <p className="mt-5 max-w-2xl font-serif text-lg text-parchment/75">
        Stubs uniquement — pas de paiement, pas de prod. Les formules
        illustrent la future distribution.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <section
            key={plan.id}
            className="border border-anthracite-light bg-ink-soft p-6 md:p-8"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              {plan.priceLabel}
              {plan.cadence !== "—" ? ` / ${plan.cadence}` : ""}
            </p>
            <h2 className="mt-2 font-display text-2xl text-parchment">
              {plan.name}
            </h2>
            <p className="mt-3 font-serif text-sm text-parchment/70">
              {plan.description}
            </p>
            <ul className="mt-5 space-y-2 font-serif text-sm text-parchment/80">
              {plan.features.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="mt-6 border border-anthracite-light px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-parchment/40"
            >
              Bientôt (stub)
            </button>
          </section>
        ))}
      </div>

      <p className="mt-10 font-serif text-sm text-parchment/55">
        <Link href="/newsletter" className="text-gold hover:underline">
          Newsletter
        </Link>
        {" · "}
        <Link href="/a-propos" className="text-gold hover:underline">
          Charte
        </Link>
      </p>
    </div>
  );
}
