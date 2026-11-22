#!/usr/bin/env node
/**
 * Runner tests Phase 6 — tsx séquentiel, exit 1 si échec.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "src/lib/editorial/forbidden-sources.test.ts",
  "src/lib/agents/policy.test.ts",
  "src/lib/distribution/distribution.test.ts",
  "src/lib/readiness/readiness.test.ts",
];

let failed = 0;
for (const file of files) {
  console.log(`\n→ ${file}`);
  const r = spawnSync(
    "npx",
    ["--yes", "tsx", file],
    { cwd: root, stdio: "inherit", shell: false },
  );
  if (r.status !== 0) {
    failed += 1;
    console.error(`FAIL ${file}`);
  }
}

if (failed) {
  console.error(`\n${failed} suite(s) en échec`);
  process.exit(1);
}
console.log("\nToutes les suites Phase 6 : OK");
