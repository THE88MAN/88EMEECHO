import Link from "next/link";
import { geopolitiqueTriptyque } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeGeopolitique() {
  return (
    <section
      id="geopolitique"
      className="scroll-mt-24 border-t border-anthracite-light bg-terre"
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <p className="section-kicker">Salle 04</p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
            Géopolitique
          </h2>
          <p className="mt-4 max-w-xl font-serif text-parchment/70">
            Distinguer faits, déclarations officielles et analyses. Aucune
            intention d’État sans élément documenté.
          </p>
        </Reveal>

        {/* C : triptyque carton */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {geopolitiqueTriptyque.map((box, i) => (
            <Reveal key={box.id} delay={0.08 * i} as="article">
              <div className="flex min-h-[180px] flex-col border border-anthracite-light bg-ink/60 p-5 md:min-h-[220px] md:p-6">
                <p className="font-carton text-sm uppercase tracking-[0.22em] text-ambre">
                  {box.kind}
                </p>
                <p className="mt-4 flex-1 font-serif text-base leading-relaxed text-parchment/75">
                  {box.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/geopolitique"
            className="mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
          >
            Rubrique Géopolitique →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
