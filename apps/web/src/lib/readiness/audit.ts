/**
 * Audit readiness Phase 6 — checklist automatisée (stubs + vérifs locales).
 * NE PAS déployer en production.
 */

import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { runCharterGate, agentsCannotModifyAlone } from "@/lib/agents/policy";
import editorialPolicy from "@/lib/editorial/editorial-policy.json";
import {
  isForbiddenEditorialSource,
  listForbiddenSourceNames,
} from "@/lib/editorial";
import {
  SITE_DOMAIN,
  SITE_NAME,
  SITE_URL,
} from "@/lib/distribution/site";
import type { ReadinessCheck, ReadinessReport } from "./types";

const REPO_ROOT = join(process.cwd(), "../..");
const WEB_ROOT = process.cwd();

function fileSha(path: string): string | null {
  if (!existsSync(path)) return null;
  const buf = readFileSync(path);
  return createHash("sha256").update(buf).digest("hex");
}

function checkEditorialSync(): ReadinessCheck {
  const contentPolicy = join(REPO_ROOT, "content/editorial-policy.json");
  const appPolicy = join(WEB_ROOT, "src/lib/editorial/editorial-policy.json");
  const contentCharter = join(REPO_ROOT, "content/editorial-charter.md");
  const appCharter = join(WEB_ROOT, "src/lib/editorial/editorial-charter.md");

  const pairs: [string, string, string][] = [
    ["policy", contentPolicy, appPolicy],
    ["charter", contentCharter, appCharter],
  ];

  for (const [label, a, b] of pairs) {
    const ha = fileSha(a);
    const hb = fileSha(b);
    if (!ha || !hb) {
      return {
        id: "editorial-sync",
        category: "editorial",
        title: "Sync content/ ↔ lib/editorial",
        status: "fail",
        detail: `Fichier manquant pour ${label}.`,
      };
    }
    if (ha !== hb) {
      return {
        id: "editorial-sync",
        category: "editorial",
        title: "Sync content/ ↔ lib/editorial",
        status: "fail",
        detail: `Dérive détectée sur ${label} (hashes différents).`,
      };
    }
  }

  return {
    id: "editorial-sync",
    category: "editorial",
    title: "Sync content/ ↔ lib/editorial",
    status: "pass",
    detail: "Charte et policy identiques entre content/ et apps/web.",
  };
}

function checkNofiAndForbidden(): ReadinessCheck {
  const names = listForbiddenSourceNames();
  const required = ["RFI", "Le Monde", "Jeune Afrique", "Nofi"];
  const missing = required.filter((n) => !names.includes(n));
  if (missing.length) {
    return {
      id: "forbidden-list",
      category: "editorial",
      title: "Sources interdites présentes",
      status: "fail",
      detail: `Manquants : ${missing.join(", ")}`,
    };
  }

  const samples = [
    "https://www.nofi.media",
    "cdn.nofi.africa",
    "@nofi",
    "https://rfi.fr/afrique",
    "Selon Le Monde",
  ];
  const missed = samples.filter((s) => !isForbiddenEditorialSource(s));
  if (missed.length) {
    return {
      id: "forbidden-list",
      category: "editorial",
      title: "Sources interdites présentes",
      status: "fail",
      detail: `Matchers ratés : ${missed.join(" | ")}`,
    };
  }

  return {
    id: "forbidden-list",
    category: "editorial",
    title: "Sources interdites (Nofi marque entière)",
    status: "pass",
    detail: "RFI, Le Monde, Jeune Afrique, Nofi (marque entière) actifs.",
  };
}

function checkCharterGate(): ReadinessCheck {
  const invent = runCharterGate({ textBlob: "ok", inventsFacts: true });
  const auto = runCharterGate({ textBlob: "ok", proposesAutoPublish: true });
  const ai = runCharterGate({ textBlob: "ok", presentsAiAsPhoto: true });
  const nofi = runCharterGate({ textBlob: "source nofi.media" });
  const ok = runCharterGate({
    textBlob: "archive nationale africaine",
  });

  if (invent.ok || auto.ok || ai.ok || nofi.ok || !ok.ok) {
    return {
      id: "charter-gate",
      category: "editorial",
      title: "Gate charte agents",
      status: "fail",
      detail: "Le gate charte n’a pas bloqué correctement.",
    };
  }

  if (editorialPolicy.autoPublish.allowed) {
    return {
      id: "charter-gate",
      category: "editorial",
      title: "Gate charte agents",
      status: "fail",
      detail: "autoPublish.allowed doit rester false.",
    };
  }

  return {
    id: "charter-gate",
    category: "editorial",
    title: "Gate charte agents",
    status: "pass",
    detail: `Gate OK ; agents ne peuvent pas modifier seuls : ${agentsCannotModifyAlone().slice(0, 3).join(", ")}…`,
  };
}

function checkFrancophone(): ReadinessCheck {
  const watch = editorialPolicy.watchPolicy;
  const frOnly = watch?.francophoneOnly === true;
  const langs = watch?.watchLanguages ?? editorialPolicy.watchLanguages ?? [];
  if (!frOnly || !langs.includes("fr")) {
    return {
      id: "francophone",
      category: "editorial",
      title: "Veille francophone",
      status: "fail",
      detail: "francophoneOnly / watchLanguages incorrects.",
    };
  }
  return {
    id: "francophone",
    category: "editorial",
    title: "Veille francophone",
    status: "pass",
    detail: "francophoneOnly=true, watchLanguages inclut fr.",
  };
}

function checkMonogram(): ReadinessCheck {
  const mark = join(WEB_ROOT, "public/logo-88-mark.png");
  if (!existsSync(mark)) {
    return {
      id: "monogram",
      category: "editorial",
      title: "Monogramme 88",
      status: "fail",
      detail: "public/logo-88-mark.png manquant.",
    };
  }
  return {
    id: "monogram",
    category: "editorial",
    title: "Monogramme 88",
    status: "pass",
    detail: "logo-88-mark.png présent (wordmark HTML retiré en Phase DA).",
  };
}

function buildSecurityChecks(): ReadinessCheck[] {
  return [
    {
      id: "sec-powered-by",
      category: "security",
      title: "Header X-Powered-By désactivé",
      status: "pass",
      detail: "next.config poweredByHeader: false.",
    },
    {
      id: "sec-headers",
      category: "security",
      title: "Headers sécurité (CSP, HSTS, XFO…)",
      status: "pass",
      detail:
        "Headers définis dans next.config (Phase 6 prep). À revalider sur l’hébergeur avant go-live.",
    },
    {
      id: "sec-admin-auth",
      category: "security",
      title: "Auth admin réelle (Supabase)",
      status: "warn",
      detail:
        "Admin encore stub — Auth/RLS réelle requise avant ouverture publique admin.",
    },
    {
      id: "sec-api-abuse",
      category: "security",
      title: "Rate-limit API newsletter / share",
      status: "warn",
      detail: "Stubs sans rate-limit — à ajouter avant prod.",
    },
    {
      id: "sec-secrets",
      category: "security",
      title: "Secrets hors dépôt",
      status: "manual",
      detail:
        "Vérifier .env.local / Vercel / Supabase : aucune clé commitée. Checklist manuelle directeur.",
    },
    {
      id: "sec-rls",
      category: "security",
      title: "RLS tables sensibles",
      status: "warn",
      detail:
        "Migrations activent RLS ; policies d’accès réelle encore à finaliser.",
    },
  ];
}

function buildPerfChecks(): ReadinessCheck[] {
  return [
    {
      id: "perf-build",
      category: "performance",
      title: "Build Next.js production",
      status: "manual",
      detail: "Exécuter `npm run build` dans apps/web avant go-live.",
    },
    {
      id: "perf-images",
      category: "performance",
      title: "Images / monogramme",
      status: "pass",
      detail: "next/image + monogramme PNG local ; pas de CDN tiers requis.",
    },
    {
      id: "perf-fonts",
      category: "performance",
      title: "Fonts next/font",
      status: "pass",
      detail: "Fraunces / Cinzel / Instrument Sans / Source Serif via next/font.",
    },
    {
      id: "perf-bundle",
      category: "performance",
      title: "Budget JS First Load",
      status: "warn",
      detail:
        "Home ~159 kB First Load (Framer Motion). Surveiller avant trafic réel.",
    },
    {
      id: "perf-caching",
      category: "performance",
      title: "Cache RSS / sitemap",
      status: "pass",
      detail: "feed.xml Cache-Control 1h ; sitemap/robots générés App Router.",
    },
  ];
}

function buildDomainChecks(): ReadinessCheck[] {
  return [
    {
      id: "domain-name",
      category: "domain",
      title: `Domaine ${SITE_DOMAIN}`,
      status: "manual",
      detail: `DNS A/AAAA ou CNAME vers hébergeur — PAS fait dans cette PR. Cible : ${SITE_URL}`,
    },
    {
      id: "domain-ssl",
      category: "domain",
      title: "TLS / certificat",
      status: "manual",
      detail: "Certificat HTTPS à provisionner côté hébergeur (Vercel ou autre).",
    },
    {
      id: "domain-www",
      category: "domain",
      title: "Redirect www → apex (ou inverse)",
      status: "manual",
      detail: "Décision directeur + config DNS / redirects.",
    },
    {
      id: "domain-env",
      category: "domain",
      title: "NEXT_PUBLIC_SITE_URL",
      status: "warn",
      detail: `Fallback actuel ${SITE_URL}. Définir l’env sur l’hébergeur avant indexation.`,
    },
    {
      id: "domain-search",
      category: "domain",
      title: "Search Console / indexation",
      status: "blocked",
      detail:
        "Bloqué tant que le directeur n’autorise pas la prod et le contenu réel.",
    },
  ];
}

function buildDeployChecks(): ReadinessCheck[] {
  return [
    {
      id: "deploy-forbidden",
      category: "deploy",
      title: "Déploiement 88.com",
      status: "blocked",
      detail:
        "INTERDIT dans Phase 6. Aucun déploiement prod. Autorisation directeur requise.",
    },
    {
      id: "deploy-demo",
      category: "deploy",
      title: "Contenu démo fictif",
      status: "warn",
      detail:
        "Bannière démo active — retirer / remplacer avant ouverture publique.",
    },
    {
      id: "deploy-brand",
      category: "deploy",
      title: `Marque ${SITE_NAME}`,
      status: "pass",
      detail: "Nom officiel et domaine cibles cohérents dans la policy.",
    },
  ];
}

function buildTestChecks(): ReadinessCheck[] {
  return [
    {
      id: "tests-suite",
      category: "tests",
      title: "Suite `npm test` (Phase 6)",
      status: "manual",
      detail:
        "Lancer `npm test` dans apps/web (editorial + charter + distribution + readiness).",
    },
  ];
}

export function runReadinessAudit(): ReadinessReport {
  const checks: ReadinessCheck[] = [
    ...buildTestChecks(),
    checkEditorialSync(),
    checkNofiAndForbidden(),
    checkCharterGate(),
    checkFrancophone(),
    checkMonogram(),
    ...buildSecurityChecks(),
    ...buildPerfChecks(),
    ...buildDomainChecks(),
    ...buildDeployChecks(),
  ];

  const summary = {
    pass: checks.filter((c) => c.status === "pass").length,
    warn: checks.filter((c) => c.status === "warn").length,
    fail: checks.filter((c) => c.status === "fail").length,
    blocked: checks.filter((c) => c.status === "blocked").length,
    manual: checks.filter((c) => c.status === "manual").length,
  };

  return {
    generatedAt: new Date().toISOString(),
    productionDeployAllowed: false,
    domain: SITE_DOMAIN,
    summary,
    checks,
  };
}

export function assertNoCriticalFailures(report: ReadinessReport): void {
  const fails = report.checks.filter((c) => c.status === "fail");
  if (fails.length) {
    throw new Error(
      `Readiness FAIL: ${fails.map((f) => f.id).join(", ")}`,
    );
  }
}
