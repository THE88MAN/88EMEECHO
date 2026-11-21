import Link from "next/link";
import { listForbiddenSourceNames } from "@/lib/editorial";

export function SiteFooter() {
  const forbidden = listForbiddenSourceNames().join(", ");

  return (
    <footer className="border-t border-anthracite-light bg-ink-soft">
      <div className="mx-auto grid max-w-salle gap-8 px-[4vw] py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gold">LE 88ÈME ÉCHO</p>
          <p className="mt-3 max-w-sm font-serif text-sm leading-relaxed text-parchment/70">
            Média documentaire indépendant — mémoire vivante. Domaine cible :
            88emeecho.com.
          </p>
        </div>
        <div>
          <p className="section-kicker">Gouvernance</p>
          <ul className="mt-3 space-y-2 font-sans text-sm text-parchment/75">
            <li>
              <Link href="/a-propos" className="hover:text-gold">
                À propos & charte
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold">
                Espace admin (stub)
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="section-kicker">Sources interdites</p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-parchment/65">
            Ne jamais utiliser comme sources éditoriales : {forbidden}.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 px-[4vw] py-4 text-center font-sans text-[11px] tracking-wide text-parchment/45">
        © {new Date().getFullYear()} LE 88ÈME ÉCHO — Mémoire vivante (A+B+C).
        Pas de production sans autorisation.
      </div>
    </footer>
  );
}
