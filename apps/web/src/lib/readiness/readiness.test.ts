import {
  assertNoCriticalFailures,
  runReadinessAudit,
} from "./audit";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const report = runReadinessAudit();

assert(report.productionDeployAllowed === false, "prod déploy interdit");
assert(report.domain === "88.com", "domaine");
assert(report.checks.length >= 10, "checklist complète");

const deploy = report.checks.find((c) => c.id === "deploy-forbidden");
assert(deploy?.status === "blocked", "déploiement bloqué");

const editorial = report.checks.filter((c) => c.category === "editorial");
assert(
  editorial.every((c) => c.status === "pass"),
  `éditorial non vert: ${editorial
    .filter((c) => c.status !== "pass")
    .map((c) => c.id)
    .join(",")}`,
);

assertNoCriticalFailures(report);

console.log(
  `readiness.test.ts: OK (${report.summary.pass} pass / ${report.summary.warn} warn / ${report.summary.blocked} blocked / ${report.summary.manual} manual)`,
);
