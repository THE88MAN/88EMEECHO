import Link from "next/link";
import { diasporasDemo } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeDiasporas() {
  const d = diasporasDemo;

  return (
    <section
      id="diasporas"
      className="scroll-mt-24 border-t border-anthracite-light"
      style={{ background: "#1f3a2e" }}
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <p className="section-kicker" style={{ color: "#d4b87a" }}>
            Salle 05
          </p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
            Diasporas
          </h2>
        </Reveal>

        {/* B : quote monumental + portrait */}
        <div className="mt-12 grid items-center gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <blockquote className="font-display text-2xl leading-snug text-parchment md:text-4xl text-balance">
              « {d.quote} »
            </blockquote>
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.18em] text-gold-soft">
              {d.attribution}
            </p>
            <h3 className="mt-8 font-display text-xl text-parchment md:text-2xl">
              {d.title}
            </h3>
            <p className="mt-3 max-w-lg font-serif text-parchment/70">
              {d.dek}
            </p>
            <Link
              href={d.href}
              className="mt-8 inline-block border border-parchment/40 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.18em] text-parchment transition hover:border-gold hover:text-gold"
            >
              Explorer Diasporas
            </Link>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-5">
            <div
              className="aspect-[4/5] border border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, #4a3228 0%, #0f1a14 100%)",
              }}
              aria-label="Portrait placeholder — démo"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
