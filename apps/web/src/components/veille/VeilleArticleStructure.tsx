import type { VeilleArticleSections } from "@/lib/veille/types";

const BLOCKS: { key: keyof VeilleArticleSections; label: string }[] = [
  { key: "titre", label: "Titre" },
  { key: "chapo", label: "Chapô" },
  { key: "contexte", label: "Contexte" },
  { key: "faits", label: "Faits" },
  { key: "enjeux", label: "Enjeux" },
  { key: "aConfirmer", label: "À confirmer" },
];

export function VeilleArticleStructure({
  sections,
}: {
  sections: VeilleArticleSections;
}) {
  return (
    <div className="space-y-6">
      {BLOCKS.map(({ key, label }) => (
        <section key={key} className="border-t border-anthracite-light pt-4">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold/80">
            {label}
          </h3>
          <p className="mt-2 font-serif text-sm leading-relaxed text-parchment/80 whitespace-pre-line">
            {Array.isArray(sections[key])
              ? (sections[key] as string[]).join(" · ")
              : (sections[key] as string) || "—"}
          </p>
        </section>
      ))}
      <section className="border-t border-anthracite-light pt-4">
        <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold/80">
          Sources
        </h3>
        {sections.sources.length === 0 ? (
          <p className="mt-2 font-serif text-sm text-parchment/50">Aucune</p>
        ) : (
          <ul className="mt-2 list-inside list-disc space-y-1 font-serif text-sm text-parchment/75">
            {sections.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
