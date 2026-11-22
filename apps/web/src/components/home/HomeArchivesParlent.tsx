import Link from "next/link";
import { archivesPieces } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeArchivesParlent() {
  return (
    <section
      id="archives-parlent"
      className="scroll-mt-24 border-t border-anthracite-light bg-ink"
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Salle 03</p>
              <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
                Les archives parlent
              </h2>
            </div>
            <Link
              href="/archives"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-soft"
            >
              Fonds & inventaires →
            </Link>
          </div>
          <p className="mt-4 max-w-2xl font-serif text-sm text-parchment/60 md:text-base">
            Deux régimes d’image : archive (provenance) vs reconstitution IA
            (label obligatoire). Placeholders fictifs.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {archivesPieces.map((piece, i) => {
            const isRecon = piece.kind === "reconstitution";
            return (
              <Reveal key={piece.id} as="li" delay={0.06 * i}>
                <div
                  className={`flex aspect-[3/4] flex-col justify-end p-3 md:p-4 ${
                    isRecon ? "recon-frame" : "archive-frame"
                  }`}
                >
                  <p
                    className={`font-sans text-[10px] uppercase tracking-[0.14em] ${
                      isRecon ? "text-parchment/80" : "text-gold"
                    }`}
                  >
                    {isRecon ? "Reconstitution IA" : "Archive"}
                  </p>
                  <h3 className="mt-2 font-display text-base text-parchment md:text-lg">
                    {piece.title}
                  </h3>
                  <p className="mt-1 font-sans text-[11px] leading-snug text-parchment/55">
                    {piece.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
