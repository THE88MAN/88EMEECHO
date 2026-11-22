export type NewsletterStatus = "pending" | "confirmed" | "unsubscribed";

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: NewsletterStatus;
  source: string;
  isDemo: boolean;
  createdAt: string;
  confirmedAt: string | null;
};

export type SubscriptionPlan = {
  id: string;
  slug: string;
  name: string;
  priceLabel: string;
  cadence: string;
  description: string;
  features: string[];
  isDemo: true;
};

export type ShareChannel =
  | "copy"
  | "email"
  | "x"
  | "linkedin"
  | "whatsapp"
  | "facebook";

export type ShareEvent = {
  id: string;
  channel: ShareChannel;
  path: string;
  title: string;
  createdAt: string;
  isDemo: boolean;
};

export type PageStat = {
  path: string;
  title: string;
  views: number;
  shares: number;
  isDemo: true;
};

export type DistributionSnapshot = {
  subscribersTotal: number;
  subscribersConfirmed: number;
  pageViewsTotal: number;
  sharesTotal: number;
  topPages: PageStat[];
  recentShares: ShareEvent[];
};
