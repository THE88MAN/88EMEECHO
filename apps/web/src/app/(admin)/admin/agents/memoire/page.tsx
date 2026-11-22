import type { Metadata } from "next";
import Link from "next/link";
import { AGENT_KIND_FR, listEditorialMemory } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Admin · Mémoire éditoriale",
  robots: { index: false, follow: false },
};

export default function EditorialMemoryPage() {
  const memory = listEditorialMemory();

  return (
    <div className="mx-auto max-w-3xl px-[4vw] py-14 md:py-20">
      <p className="section-kicker">Mémoire éditoriale</p>
      <h1 className="mt-3 font-display text-4xl text-parchment">
        Sujets, recherches, angles
      </h1>
      <p className="mt-4 font-serif text-parchment/65">
        Mémoire persistante (stub) — sujets traités, recherches, notes de
        sources, suggestions d’angles. Contenu démo.
      </p>

      <ul className="mt-10 space-y-4">
        {memory.map((m) => (
          <li key={m.id} className="border border-anthracite-light bg-ink-soft p-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-gold/70">
              {m.kind}
              {m.agentKind ? ` · ${AGENT_KIND_FR[m.agentKind]}` : ""} ·{" "}
              {m.tags.join(" · ")}
            </p>
            <h2 className="mt-2 font-display text-xl text-parchment">{m.title}</h2>
            <p className="mt-2 font-serif text-sm text-parchment/65">{m.body}</p>
          </li>
        ))}
      </ul>

      <Link
        href="/admin/agents"
        className="mt-12 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        ← Agents
      </Link>
    </div>
  );
}
