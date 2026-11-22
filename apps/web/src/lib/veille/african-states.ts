/** 54 États africains — couverture ÉCHO VEILLE */

export type AfricanState = {
  code: string;
  nameFr: string;
  region: string;
  languages: string[];
};

export const AFRICAN_STATES: AfricanState[] = [
  { code: "DZ", nameFr: "Algérie", region: "Afrique du Nord", languages: ["ar", "fr"] },
  { code: "AO", nameFr: "Angola", region: "Afrique australe", languages: ["pt"] },
  { code: "BJ", nameFr: "Bénin", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "BW", nameFr: "Botswana", region: "Afrique australe", languages: ["en"] },
  { code: "BF", nameFr: "Burkina Faso", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "BI", nameFr: "Burundi", region: "Afrique de l’Est", languages: ["fr", "en"] },
  { code: "CV", nameFr: "Cabo Verde", region: "Afrique de l’Ouest", languages: ["pt"] },
  { code: "CM", nameFr: "Cameroun", region: "Afrique centrale", languages: ["fr", "en"] },
  { code: "CF", nameFr: "Centrafrique", region: "Afrique centrale", languages: ["fr"] },
  { code: "TD", nameFr: "Tchad", region: "Afrique centrale", languages: ["fr", "ar"] },
  { code: "KM", nameFr: "Comores", region: "Afrique de l’Est", languages: ["ar", "fr"] },
  { code: "CG", nameFr: "Congo", region: "Afrique centrale", languages: ["fr"] },
  { code: "CD", nameFr: "RD Congo", region: "Afrique centrale", languages: ["fr"] },
  { code: "CI", nameFr: "Côte d’Ivoire", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "DJ", nameFr: "Djibouti", region: "Afrique de l’Est", languages: ["fr", "ar"] },
  { code: "EG", nameFr: "Égypte", region: "Afrique du Nord", languages: ["ar"] },
  { code: "GQ", nameFr: "Guinée équatoriale", region: "Afrique centrale", languages: ["es", "fr", "pt"] },
  { code: "ER", nameFr: "Érythrée", region: "Afrique de l’Est", languages: ["en", "ar"] },
  { code: "SZ", nameFr: "Eswatini", region: "Afrique australe", languages: ["en"] },
  { code: "ET", nameFr: "Éthiopie", region: "Afrique de l’Est", languages: ["en"] },
  { code: "GA", nameFr: "Gabon", region: "Afrique centrale", languages: ["fr"] },
  { code: "GM", nameFr: "Gambie", region: "Afrique de l’Ouest", languages: ["en"] },
  { code: "GH", nameFr: "Ghana", region: "Afrique de l’Ouest", languages: ["en"] },
  { code: "GN", nameFr: "Guinée", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "GW", nameFr: "Guinée-Bissau", region: "Afrique de l’Ouest", languages: ["pt"] },
  { code: "KE", nameFr: "Kenya", region: "Afrique de l’Est", languages: ["en"] },
  { code: "LS", nameFr: "Lesotho", region: "Afrique australe", languages: ["en"] },
  { code: "LR", nameFr: "Liberia", region: "Afrique de l’Ouest", languages: ["en"] },
  { code: "LY", nameFr: "Libye", region: "Afrique du Nord", languages: ["ar"] },
  { code: "MG", nameFr: "Madagascar", region: "Afrique de l’Est", languages: ["fr"] },
  { code: "MW", nameFr: "Malawi", region: "Afrique australe", languages: ["en"] },
  { code: "ML", nameFr: "Mali", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "MR", nameFr: "Mauritanie", region: "Afrique de l’Ouest", languages: ["ar", "fr"] },
  { code: "MU", nameFr: "Maurice", region: "Afrique de l’Est", languages: ["en", "fr"] },
  { code: "MA", nameFr: "Maroc", region: "Afrique du Nord", languages: ["ar", "fr"] },
  { code: "MZ", nameFr: "Mozambique", region: "Afrique australe", languages: ["pt"] },
  { code: "NA", nameFr: "Namibie", region: "Afrique australe", languages: ["en"] },
  { code: "NE", nameFr: "Niger", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "NG", nameFr: "Nigeria", region: "Afrique de l’Ouest", languages: ["en"] },
  { code: "RW", nameFr: "Rwanda", region: "Afrique de l’Est", languages: ["en", "fr"] },
  { code: "ST", nameFr: "Sao Tomé-et-Principe", region: "Afrique centrale", languages: ["pt"] },
  { code: "SN", nameFr: "Sénégal", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "SC", nameFr: "Seychelles", region: "Afrique de l’Est", languages: ["en", "fr"] },
  { code: "SL", nameFr: "Sierra Leone", region: "Afrique de l’Ouest", languages: ["en"] },
  { code: "SO", nameFr: "Somalie", region: "Afrique de l’Est", languages: ["ar", "en"] },
  { code: "ZA", nameFr: "Afrique du Sud", region: "Afrique australe", languages: ["en"] },
  { code: "SS", nameFr: "Soudan du Sud", region: "Afrique de l’Est", languages: ["en"] },
  { code: "SD", nameFr: "Soudan", region: "Afrique du Nord", languages: ["ar", "en"] },
  { code: "TZ", nameFr: "Tanzanie", region: "Afrique de l’Est", languages: ["en"] },
  { code: "TG", nameFr: "Togo", region: "Afrique de l’Ouest", languages: ["fr"] },
  { code: "TN", nameFr: "Tunisie", region: "Afrique du Nord", languages: ["ar", "fr"] },
  { code: "UG", nameFr: "Ouganda", region: "Afrique de l’Est", languages: ["en"] },
  { code: "ZM", nameFr: "Zambie", region: "Afrique australe", languages: ["en"] },
  { code: "ZW", nameFr: "Zimbabwe", region: "Afrique australe", languages: ["en"] },
];

if (AFRICAN_STATES.length !== 54) {
  throw new Error(`AFRICAN_STATES must be 54, got ${AFRICAN_STATES.length}`);
}

export function getStateByCode(code: string): AfricanState | undefined {
  return AFRICAN_STATES.find((s) => s.code === code);
}

export function listStatesByRegion(): Record<string, AfricanState[]> {
  return AFRICAN_STATES.reduce<Record<string, AfricanState[]>>((acc, s) => {
    (acc[s.region] ??= []).push(s);
    return acc;
  }, {});
}
