/**
 * Store distribution — newsletter, abonnements, stats (stubs in-memory).
 */

import {
  initialPageStats,
  initialShareEvents,
  initialSubscribers,
  subscriptionPlans,
} from "./seed";
import type {
  DistributionSnapshot,
  NewsletterSubscriber,
  PageStat,
  ShareChannel,
  ShareEvent,
  SubscriptionPlan,
} from "./types";

type Store = {
  subscribers: NewsletterSubscriber[];
  pageStats: PageStat[];
  shares: ShareEvent[];
};

const g = globalThis as unknown as { __echoDistributionStore?: Store };

function store(): Store {
  if (!g.__echoDistributionStore) {
    g.__echoDistributionStore = {
      subscribers: structuredClone(initialSubscribers),
      pageStats: structuredClone(initialPageStats),
      shares: structuredClone(initialShareEvents),
    };
  }
  return g.__echoDistributionStore;
}

export type DistributionActionResult = {
  ok: boolean;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function listSubscriptionPlans(): SubscriptionPlan[] {
  return subscriptionPlans;
}

export function listSubscribers(): NewsletterSubscriber[] {
  return store().subscribers;
}

export function listPageStats(): PageStat[] {
  return [...store().pageStats].sort((a, b) => b.views - a.views);
}

export function listRecentShares(limit = 20): ShareEvent[] {
  return store().shares.slice(0, limit);
}

export function getDistributionSnapshot(): DistributionSnapshot {
  const subs = store().subscribers;
  const pages = listPageStats();
  return {
    subscribersTotal: subs.length,
    subscribersConfirmed: subs.filter((s) => s.status === "confirmed").length,
    pageViewsTotal: pages.reduce((n, p) => n + p.views, 0),
    sharesTotal: pages.reduce((n, p) => n + p.shares, 0),
    topPages: pages.slice(0, 8),
    recentShares: listRecentShares(10),
  };
}

export function subscribeNewsletter(
  emailRaw: string,
  source = "unknown",
): DistributionActionResult {
  const email = emailRaw.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Adresse e-mail invalide." };
  }
  if (
    email.includes("nofi") ||
    email.endsWith("@rfi.fr") ||
    email.endsWith("@lemonde.fr")
  ) {
    return {
      ok: false,
      message: "Inscription refusée (stub politique éditoriale).",
    };
  }
  const existing = store().subscribers.find((s) => s.email === email);
  if (existing) {
    if (existing.status === "unsubscribed") {
      existing.status = "pending";
      existing.confirmedAt = null;
      return {
        ok: true,
        message: "Réinscription enregistrée (confirmation stub).",
      };
    }
    return { ok: true, message: "Cette adresse est déjà inscrite (stub)." };
  }
  store().subscribers.unshift({
    id: `ns-${Date.now()}`,
    email,
    status: "pending",
    source,
    isDemo: true,
    createdAt: new Date().toISOString(),
    confirmedAt: null,
  });
  return {
    ok: true,
    message: "Inscription enregistrée — confirmation e-mail stub (pas d’envoi réel).",
  };
}

export function confirmSubscriber(id: string): DistributionActionResult {
  const sub = store().subscribers.find((s) => s.id === id);
  if (!sub) return { ok: false, message: "Abonné introuvable." };
  sub.status = "confirmed";
  sub.confirmedAt = new Date().toISOString();
  return { ok: true, message: "Abonné confirmé (stub)." };
}

export function unsubscribeByEmail(emailRaw: string): DistributionActionResult {
  const email = emailRaw.trim().toLowerCase();
  const sub = store().subscribers.find((s) => s.email === email);
  if (!sub) return { ok: false, message: "Adresse introuvable." };
  sub.status = "unsubscribed";
  return { ok: true, message: "Désinscription enregistrée (stub)." };
}

export function recordShare(input: {
  channel: ShareChannel;
  path: string;
  title: string;
}): DistributionActionResult {
  const event: ShareEvent = {
    id: `sh-${Date.now()}`,
    channel: input.channel,
    path: input.path,
    title: input.title,
    createdAt: new Date().toISOString(),
    isDemo: true,
  };
  store().shares.unshift(event);
  const page = store().pageStats.find((p) => p.path === input.path);
  if (page) {
    page.shares += 1;
  } else {
    store().pageStats.push({
      path: input.path,
      title: input.title,
      views: 0,
      shares: 1,
      isDemo: true,
    });
  }
  return { ok: true, message: `Partage ${input.channel} enregistré (stub).` };
}

export function recordPageView(
  path: string,
  title: string,
): DistributionActionResult {
  const page = store().pageStats.find((p) => p.path === path);
  if (page) {
    page.views += 1;
  } else {
    store().pageStats.push({
      path,
      title,
      views: 1,
      shares: 0,
      isDemo: true,
    });
  }
  return { ok: true, message: "Vue enregistrée (stub)." };
}
