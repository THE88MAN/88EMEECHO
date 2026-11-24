import { AI_IMAGE_LABEL } from "./policy";
import { initialVisuelSheets } from "./seed";
import { checkVisuelSheet, emptyVisuelSheet } from "./visuel-sheet";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const empty = checkVisuelSheet(emptyVisuelSheet("x", "t"));
assert(!empty.complete, "fiche vide refusée");
assert(empty.problems.length === 7, "7 champs charte signalés");
assert(emptyVisuelSheet("x", "t").mandatoryLabel === AI_IMAGE_LABEL, "label pré-rempli");

const seed = initialVisuelSheets[0];
assert(checkVisuelSheet(seed).complete, "fiche démo complète");
assert(checkVisuelSheet(seed).warnings.length > 0, "sans génération : avertissement");

const blank = checkVisuelSheet({ ...seed, uncertainties: "   " });
assert(!blank.complete, "espaces seuls = vide");

const label = checkVisuelSheet({ ...seed, mandatoryLabel: "Image IA" });
assert(!label.complete, "mention modifiée refusée");

const gen = { prompt: "p", seed: 42, format: "16:9", generatedAt: "2026-11-24T00:00:00Z" };
const ok = checkVisuelSheet({ ...seed, generation: gen });
assert(ok.complete && ok.warnings.length === 0, "fiche + génération complète");

const fmt = checkVisuelSheet({ ...seed, generation: { ...gen, format: "3:2" } });
assert(!fmt.complete, "format hors politique refusé");

const noSeed = checkVisuelSheet({ ...seed, generation: { ...gen, seed: null } });
assert(noSeed.complete && noSeed.warnings.length === 1, "seed manquant = avertissement");

console.log("visuel-sheet.test.ts: OK");
