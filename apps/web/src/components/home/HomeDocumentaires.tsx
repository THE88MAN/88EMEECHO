import Link from "next/link";
import { demoVideos } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeDocumentaires() {
  const [main, ...rest] = demoVideos;

  return (
    <section
      id="documentaires"
      className="scroll-mt-24 border-t border-anthracite-light bg-ink"
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <p className="section-kicker">Salle 06</p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
            Documentaires
          </h2>
          <p className="mt-4 max-w-xl font-serif text-parchment/65">
            Entrée de salle : un focus principal (cinéma), puis formats qui
            cassent la grille (magazine).
          </p>
        </Reveal>

        {/* C : salle de projection */}
        <Reveal className="mt-12">
          <div className="grid gap-6 border border-anthracite-light bg-ink-soft p-4 md:grid-cols-[1.4fr_1fr] md:gap-8 md:p-6">
            <div
              className="relative flex aspect-video items-center justify-center bg-black"
              aria-label="Player placeholder"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-ambre text-ambre">
                ▶
              </span>
              <span className="absolute bottom-3 right-3 bg-ink/80 px-2 py-0.5 font-sans text-[11px] text-parchment">
                {main.duration}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ambre">
                Entrée de salle · {main.rubric}
              </p>
              <h3 className="mt-3 font-display text-2xl text-parchment md:text-3xl">
                {main.title}
              </h3>
              <Link
                href="/documentaires"
                className="mt-8 inline-block w-fit border border-ambre px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ambre transition hover:bg-ambre hover:text-ink"
              >
                Regarder
              </Link>
            </div>
          </div>
        </Reveal>

        {/* B : formats mixtes */}
        <ul className="mt-8 grid grid-cols-2 items-end gap-4 md:grid-cols-3">
          {rest.map((v, i) => (
            <Reveal key={v.id} as="li" delay={0.08 * (i + 1)}>
              <div
                className={`relative bg-anthracite ${
                  v.ratio === "9/16"
                    ? "aspect-[9/16] max-h-72"
                    : v.ratio === "1/1"
                      ? "aspect-square"
                      : "aspect-video"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gold">
                  ▶
                </div>
                <span className="absolute bottom-2 right-2 bg-ink/80 px-1.5 py-0.5 font-sans text-[10px]">
                  {v.duration}
                </span>
              </div>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.14em] text-gold/70">
                {v.ratio.replace("/", ":")} · {v.rubric}
              </p>
              <h4 className="mt-1 font-display text-base text-parchment md:text-lg">
                {v.title}
              </h4>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.24} className="col-span-2 md:col-span-1">
            <Link
              href="/documentaires"
              className="flex h-full min-h-[120px] items-center justify-center border border-dashed border-anthracite-light font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:border-gold"
            >
              Toute la rubrique →
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
