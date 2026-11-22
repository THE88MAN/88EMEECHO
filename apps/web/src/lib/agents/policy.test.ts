import { runCharterGate } from "./policy";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const clean = runCharterGate({ textBlob: "archive nationale africaine" });
assert(clean.ok, "texte propre doit passer");

const invent = runCharterGate({ textBlob: "x", inventsFacts: true });
assert(!invent.ok, "invention bloquée");

const ai = runCharterGate({ textBlob: "x", presentsAiAsPhoto: true });
assert(!ai.ok, "IA comme photo bloquée");

const pub = runCharterGate({ textBlob: "x", proposesAutoPublish: true });
assert(!pub.ok, "auto-publish bloqué");

const nofi = runCharterGate({ textBlob: "selon nofi.media" });
assert(!nofi.ok, "Nofi bloqué par gate");

const rfi = runCharterGate({ textBlob: "https://www.rfi.fr/fr" });
assert(!rfi.ok, "RFI bloqué par gate");

console.log("policy.test.ts: OK");
