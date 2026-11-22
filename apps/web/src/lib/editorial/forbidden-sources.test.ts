import {
  isForbiddenEditorialSource,
  listForbiddenSourceNames,
} from "./forbidden-sources";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

assert(listForbiddenSourceNames().includes("RFI"), "RFI manquant");
assert(listForbiddenSourceNames().includes("Le Monde"), "Le Monde manquant");
assert(
  listForbiddenSourceNames().includes("Jeune Afrique"),
  "Jeune Afrique manquant",
);
assert(isForbiddenEditorialSource("https://www.rfi.fr/fr/afrique"), "rfi.fr");
assert(isForbiddenEditorialSource("rfi"), "nom court RFI");
assert(isForbiddenEditorialSource("Selon Le Monde…"), "Le Monde texte");
assert(
  isForbiddenEditorialSource("jeuneafrique.com/article"),
  "jeuneafrique.com",
);
assert(!isForbiddenEditorialSource("agence de presse africaine"), "faux positif");
assert(!isForbiddenEditorialSource("le"), "trop court");

console.log("forbidden-sources.test.ts: OK");
