import Link from "next/link";
import { histoiresOubliees } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeHistoiresOubliees() {
  const item = histoiresOubliees;

  return (
    <section
      id="histoires-oubliees"
      className="scroll-mt-24 border-t border-anthracite-light bg-ink-soft"
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <p className="section-kicker">Salle 02</p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
            Les histoires oubliées
          </h2>
        </Reveal>

        {/* A/B : split muséal + overlap titre/image */}
        <div className="mt-12 grid items-center gap-8 md:grid-cols-12 md:gap-0">
          <Reveal className="md:col-span-5 md:pr-8 lg:pr-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              {item.label}
            </p>
            <h3 className="mt-3 font-display text-2xl leading-tight text-parchment md:text-4xl text-balance">
              {item.title}
            </h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-parchment/70">
              {item.dek}
            </p>
            <Link
              href={item.href}
              className="mt-8 inline-block border border-gold/60 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-ink"
            >
              Explorer Histoire
            </Link>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative md:col-span-7 md:-ml-[6%] md:min-h-[380px]"
          >
            <div
              className="archive-frame relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[380px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(184,151,74,0.1), transparent 45%), linear-gradient(180deg, #2a241c, #12100e)",
              }}
            >
              <span className="absolute bottom-3 left-3 font-sans text-[10px] uppercase tracking-[0.16em] text-gold">
                {item.inventory}
              </span>
              <span className="absolute right-3 top-3 font-sans text-[10px] uppercase tracking-[0.14em] text-parchment/40">
                Image documentaire · démo
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
