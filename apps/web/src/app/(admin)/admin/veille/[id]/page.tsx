import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemActionButtons } from "@/components/admin/VeilleControls";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { VeilleArticleStructure } from "@/components/veille/VeilleArticleStructure";
import {
  getStateByCode,
  getVeilleItem,
  listVeilleItems,
  STAGE_FR,
  UNCERTAINTY_FR,
} from "@/lib/veille";
import { getSourcesByIds } from "@/lib/cms";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return listVeilleItems().map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getVeilleItem(id);
  return {
    title: item ? `Veille · ${item.sections.titre}` : "Item veille",
    robots: { index: false, follow: false },
  };
}

export default async function VeilleItemPage({ params }: Props) {
  const { id } = await params;
  const item = getVeilleItem(id);
  if (!item) notFound();

  const state = getStateByCode(item.stateCode);
  const sources = getSourcesByIds(item.sourceIds);

  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <p className="section-kicker">
        Item file · {state?.nameFr ?? item.stateCode} · langue source{" "}
        {item.sourceLanguage}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <StatusBadge status={item.publicationStatus} />
        <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/45">
          {STAGE_FR[item.stage]} · incertitude{" "}
          {UNCERTAINTY_FR[item.uncertainty]}
        </span>
      </div>
      <h1 className="mt-4 font-display text-3xl text-parchment md:text-4xl text-balance">
        {item.sections.titre}
      </h1>

      {item.autoPublishBlocked && (
        <p className="mt-4 border border-ambre/40 bg-ink-soft p-4 font-serif text-sm text-parchment/75">
          Auto-publish bloqué : {item.blockReason}
        </p>
      )}

      <div className="mt-8">
        <ItemActionButtons
          itemId={item.id}
          stage={item.stage}
          publicationStatus={item.publicationStatus}
          uncertainty={item.uncertainty}
        />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl text-parchment">
          Structure article
        </h2>
        <p className="mt-2 font-serif text-sm text-parchment/55">
          Titre, chapô, contexte, faits, enjeux, à confirmer, sources.
        </p>
        <div className="mt-6">
          <VeilleArticleStructure sections={item.sections} />
        </div>
      </div>

      <section className="mt-10 border-t border-anthracite-light pt-6">
        <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
          Sources attachées (catalogue)
        </h2>
        <ul className="mt-3 space-y-2">
          {sources.length === 0 ? (
            <li className="font-serif text-sm text-parchment/50">
              Aucune source autorisée attachée
              {item.candidateSourceName
                ? ` — candidat rejeté : ${item.candidateSourceName}`
                : ""}
            </li>
          ) : (
            sources.map((s) => (
              <li key={s.id} className="font-serif text-sm text-parchment/70">
                {s.name}{" "}
                <span className="text-parchment/40">({s.category})</span>
              </li>
            ))
          )}
        </ul>
        <Link
          href="/admin/sources"
          className="mt-4 inline-block font-sans text-[10px] uppercase tracking-[0.16em] text-gold"
        >
          Consulter les sources →
        </Link>
      </section>

      <Link
        href="/admin/veille"
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← File veille
      </Link>
    </div>
  );
}
