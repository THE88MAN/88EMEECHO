import type { Metadata } from "next";
import Link from "next/link";
import {
  getDistributionSnapshot,
  listSubscribers,
} from "@/lib/distribution";

export const metadata: Metadata = {
  title: "Admin · Distribution",
  robots: { index: false, follow: false },
};

const STATUS_FR: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  unsubscribed: "Désinscrit",
};

const CHANNEL_FR: Record<string, string> = {
  copy: "Copie",
  email: "E-mail",
  x: "X",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
};

export default function AdminDistributionPage() {
  const snap = getDistributionSnapshot();
  const subs = listSubscribers();

  return (
    <div className="mx-auto max-w-salle px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Administration · Phase 5</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Distribution
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-parchment/70">
        SEO, newsletter, partages et stats — stubs locaux. Aucun analytics
        tiers, aucun envoi réel.
      </p>

      <nav className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/admin"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold"
        >
          ← Dashboard
        </Link>
        <Link
          href="/newsletter"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-parchment/50 hover:text-gold"
        >
          Page newsletter
        </Link>
        <Link
          href="/feed.xml"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-parchment/50 hover:text-gold"
        >
          RSS
        </Link>
        <Link
          href="/sitemap.xml"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-parchment/50 hover:text-gold"
        >
          Sitemap
        </Link>
      </nav>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Abonnés", value: snap.subscribersTotal },
          { label: "Confirmés", value: snap.subscribersConfirmed },
          { label: "Vues (stub)", value: snap.pageViewsTotal },
          { label: "Partages (stub)", value: snap.sharesTotal },
        ].map((m) => (
          <div
            key={m.label}
            className="border border-anthracite-light bg-ink-soft px-5 py-4"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-parchment/45">
              {m.label}
            </p>
            <p className="mt-2 font-display text-3xl text-gold">{m.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-parchment">Pages</h2>
        <ul className="mt-4 divide-y divide-anthracite-light border border-anthracite-light">
          {snap.topPages.map((p) => (
            <li
              key={p.path}
              className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3"
            >
              <div>
                <p className="font-serif text-parchment">{p.title}</p>
                <p className="font-sans text-[10px] text-parchment/40">
                  {p.path}
                </p>
              </div>
              <p className="font-sans text-[11px] uppercase tracking-wider text-parchment/55">
                {p.views} vues · {p.shares} partages
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-parchment">
            Newsletter
          </h2>
          <ul className="mt-4 space-y-3">
            {subs.map((s) => (
              <li
                key={s.id}
                className="border border-anthracite-light bg-ink-soft px-4 py-3"
              >
                <p className="font-serif text-sm text-parchment">{s.email}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-parchment/45">
                  {STATUS_FR[s.status] ?? s.status} · {s.source}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-parchment">
            Partages récents
          </h2>
          <ul className="mt-4 space-y-3">
            {snap.recentShares.map((sh) => (
              <li
                key={sh.id}
                className="border border-anthracite-light bg-ink-soft px-4 py-3"
              >
                <p className="font-serif text-sm text-parchment">{sh.title}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-widest text-parchment/45">
                  {CHANNEL_FR[sh.channel] ?? sh.channel} ·{" "}
                  {new Date(sh.createdAt).toLocaleString("fr-FR")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
