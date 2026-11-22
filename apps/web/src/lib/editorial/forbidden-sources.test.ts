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
assert(listForbiddenSourceNames().includes("Nofi"), "Nofi manquant");

assert(isForbiddenEditorialSource("https://www.rfi.fr/fr/afrique"), "rfi.fr");
assert(isForbiddenEditorialSource("rfi"), "nom court RFI");
assert(isForbiddenEditorialSource("Selon Le Monde…"), "Le Monde texte");
assert(
  isForbiddenEditorialSource("jeuneafrique.com/article"),
  "jeuneafrique.com",
);

// Nofi — marque entière
assert(isForbiddenEditorialSource("Nofi"), "Nofi nom");
assert(isForbiddenEditorialSource("nofi.media"), "nofi.media");
assert(isForbiddenEditorialSource("https://www.nofi.fr/actu"), "www.nofi.fr");
assert(isForbiddenEditorialSource("https://cdn.nofi.africa/x"), "cdn.nofi.africa");
assert(isForbiddenEditorialSource("m.nofi.com"), "m.nofi.com");
assert(isForbiddenEditorialSource("nofi-media"), "nofi-media");
assert(isForbiddenEditorialSource("@nofi"), "@nofi");
assert(
  isForbiddenEditorialSource("https://instagram.com/nofi/"),
  "instagram nofi",
);
assert(isForbiddenEditorialSource("https://x.com/nofi"), "x.com/nofi");
assert(
  isForbiddenEditorialSource("agrégateur reprenant Nofi"),
  "agrégateur Nofi",
);
assert(
  isForbiddenEditorialSource("miroir nofi.example.net"),
  "miroir nofi.*",
);

assert(!isForbiddenEditorialSource("agence de presse africaine"), "faux positif");
assert(!isForbiddenEditorialSource("média antillais"), "caraïbe OK");
assert(!isForbiddenEditorialSource("le"), "trop court");

console.log("forbidden-sources.test.ts: OK");
