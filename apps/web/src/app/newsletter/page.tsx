import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  absoluteUrl,
  buildOpenGraph,
  buildTwitter,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/distribution";

export const metadata: Metadata = {
  title: "Newsletter",
  description: `Recevoir les alertes éditoriales de ${SITE_NAME} (stub — pas d’envoi réel).`,
  alternates: { canonical: absoluteUrl("/newsletter") },
  openGraph: buildOpenGraph({
    title: "Newsletter",
    description: SITE_DESCRIPTION,
    path: "/newsletter",
  }),
  twitter: buildTwitter({
    title: "Newsletter",
    description: SITE_DESCRIPTION,
  }),
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Newsletter · ${SITE_NAME}`,
          url: absoluteUrl("/newsletter"),
        }}
      />
      <p className="section-kicker">Distribution · Phase 5</p>
      <h1 className="mt-3 font-display text-4xl text-parchment md:text-5xl">
        Newsletter
      </h1>
      <p className="mt-5 max-w-xl font-serif text-lg text-parchment/75">
        Inscription stub — aucun e-mail réel n’est envoyé. La charte et les
        sources interdites restent inchangées.
      </p>
      <NewsletterForm source="newsletter-page" />
      <p className="mt-8 font-serif text-sm text-parchment/55">
        Flux RSS :{" "}
        <Link href="/feed.xml" className="text-gold hover:underline">
          /feed.xml
        </Link>
        {" · "}
        <Link href="/abonnement" className="text-gold hover:underline">
          Abonnements
        </Link>
      </p>
    </div>
  );
}
