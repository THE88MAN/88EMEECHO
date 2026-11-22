import {
  absoluteUrl,
  SITE_DOMAIN,
  SITE_NAME,
  SITE_URL,
} from "./site";
import {
  subscribeNewsletter,
  listSubscriptionPlans,
  getDistributionSnapshot,
} from "./store";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

assert(SITE_NAME.includes("88"), "marque 88");
assert(SITE_DOMAIN === "88.com", "domaine cible");
assert(SITE_URL.includes("88.com"), "SITE_URL");
assert(
  absoluteUrl("/feed.xml") === `${SITE_URL}/feed.xml`,
  "absoluteUrl feed",
);

const plans = listSubscriptionPlans();
assert(plans.length >= 2, "plans abonnement");

const bad = subscribeNewsletter("pas-un-email", "test");
assert(!bad.ok, "email invalide rejeté");

const nofi = subscribeNewsletter("lecteur@nofi.media", "test");
assert(!nofi.ok, "email nofi rejeté");

const ok = subscribeNewsletter("phase6.demo@example.invalid", "phase6-test");
assert(ok.ok, "inscription stub OK");

const snap = getDistributionSnapshot();
assert(snap.subscribersTotal >= 1, "snapshot abonnés");

console.log("distribution.test.ts: OK");
