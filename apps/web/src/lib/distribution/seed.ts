import type {
  NewsletterSubscriber,
  PageStat,
  ShareEvent,
  SubscriptionPlan,
} from "./types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-libre",
    slug: "lecture-libre",
    name: "Lecture libre",
    priceLabel: "0 €",
    cadence: "—",
    description:
      "Accès public aux articles publiés et à la bibliothèque (stub démo).",
    features: [
      "Articles publiés",
      "Bibliothèque historique",
      "Flux RSS",
      "Newsletter optionnelle",
    ],
    isDemo: true,
  },
  {
    id: "plan-soutien",
    slug: "soutien",
    name: "Soutien (stub)",
    priceLabel: "—",
    cadence: "mensuel",
    description:
      "Placeholder abonnement — aucun paiement réel. Réservé à une future phase autorisée.",
    features: [
      "Accès anticipé (placeholder)",
      "Sans publicité (placeholder)",
      "Soutien éditorial (placeholder)",
    ],
    isDemo: true,
  },
];

export const initialSubscribers: NewsletterSubscriber[] = [
  {
    id: "ns-1",
    email: "lecteur.demo@example.invalid",
    status: "confirmed",
    source: "footer",
    isDemo: true,
    createdAt: "2026-11-18T10:00:00.000Z",
    confirmedAt: "2026-11-18T10:05:00.000Z",
  },
  {
    id: "ns-2",
    email: "diaspora.demo@example.invalid",
    status: "pending",
    source: "newsletter-page",
    isDemo: true,
    createdAt: "2026-11-21T08:30:00.000Z",
    confirmedAt: null,
  },
];

export const initialPageStats: PageStat[] = [
  {
    path: "/",
    title: "Accueil",
    views: 1280,
    shares: 42,
    isDemo: true,
  },
  {
    path: "/articles/memoires-d-archives-fictives",
    title: "Mémoires d’archives (démo)",
    views: 640,
    shares: 28,
    isDemo: true,
  },
  {
    path: "/articles/veille-continentale-breve-demo",
    title: "Veille continentale (démo)",
    views: 410,
    shares: 15,
    isDemo: true,
  },
  {
    path: "/bibliotheque",
    title: "Bibliothèque",
    views: 320,
    shares: 9,
    isDemo: true,
  },
  {
    path: "/a-propos",
    title: "À propos",
    views: 190,
    shares: 4,
    isDemo: true,
  },
];

export const initialShareEvents: ShareEvent[] = [
  {
    id: "sh-1",
    channel: "linkedin",
    path: "/articles/memoires-d-archives-fictives",
    title: "Mémoires d’archives (démo)",
    createdAt: "2026-11-21T14:00:00.000Z",
    isDemo: true,
  },
  {
    id: "sh-2",
    channel: "x",
    path: "/articles/veille-continentale-breve-demo",
    title: "Veille continentale (démo)",
    createdAt: "2026-11-21T16:20:00.000Z",
    isDemo: true,
  },
  {
    id: "sh-3",
    channel: "whatsapp",
    path: "/bibliotheque/silences-documentaires-ouest",
    title: "Silences documentaires (démo)",
    createdAt: "2026-11-22T09:10:00.000Z",
    isDemo: true,
  },
];
