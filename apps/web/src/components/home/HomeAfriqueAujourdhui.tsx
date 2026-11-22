import Link from "next/link";
import { afriqueAujourdhui } from "@/lib/demo/content";
import { Reveal } from "@/components/motion/Reveal";

export function HomeAfriqueAujourdhui() {
  const { lead, briefs } = afriqueAujourdhui;

  return (
    <section
      id="afrique-aujourdhui"
      className="scroll-mt-24 border-t border-anthracite-light bg-ink"
    >
      <div className="salle-pad mx-auto max-w-salle">
        <Reveal>
          <p className="section-kicker">Salle 01</p>
          <h2 className="mt-3 font-display text-3xl text-parchment md:text-5xl">
            L’Afrique aujourd’hui
          </h2>
        </Reveal>

        {/* B : mosaïque asymétrique */}
        <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-5">
          <Reveal
            as="article"
            className="relative flex min-h-[320px] flex-col justify-end bg-terre p-5 md:col-span-7 md:min-h-[440px] md:p-7"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 30%, rgba(212,168,75,0.12), transparent 55%)",
              }}
              aria-hidden
            />
            <p className="relative font-sans text-[10px] uppercase tracking-[0.18em] text-gold-vif/80">
              {lead.label}
            </p>
            <h3 className="relative mt-3 font-display text-2xl leading-tight text-parchment md:text-3xl text-balance">
              {lead.title}
            </h3>
            <p className="relative mt-3 max-w-lg font-serif text-sm leading-relaxed text-parchment/65 md:text-base">
              {lead.dek}
            </p>
            <Link
              href={lead.href}
              className="relative mt-6 inline-block w-fit bg-gold px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-gold-soft"
            >
              Actualités
            </Link>
          </Reveal>

          <div className="grid gap-4 md:col-span-5 md:grid-rows-3">
            {briefs.map((b, i) => (
              <Reveal key={b.id} delay={0.08 * (i + 1)} as="article">
                <Link
                  href={b.href}
                  className="cartel-frame group flex h-full flex-col justify-end border-l-2 border-gold bg-ink-soft p-4 transition hover:border-gold-vif"
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-parchment/45">
                    {b.label}
                  </p>
                  <h4 className="mt-2 font-display text-lg text-parchment group-hover:text-gold">
                    {b.title}
                  </h4>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
