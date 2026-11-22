import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE_DOMAIN } from "@/lib/distribution";
import { listForbiddenSourceNames } from "@/lib/editorial";

export function SiteFooter() {
  const forbidden = listForbiddenSourceNames().join(", ");

  return (
    <footer className="border-t border-anthracite-light bg-ink-soft">
      <div className="mx-auto grid max-w-salle gap-8 px-[4vw] py-12 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="LE 88ÈME ÉCHO — Accueil">
            <Image
              src="/logo-88-mark.png"
              alt=""
              width={120}
              height={88}
              className="h-12 w-auto object-contain"
              aria-hidden
            />
          </Link>
          <p className="mt-4 max-w-sm font-serif text-sm leading-relaxed text-parchment/70">
            Média documentaire indépendant — mémoire vivante. Domaine cible :{" "}
            {SITE_DOMAIN}.
          </p>
        </div>
        <div>
          <p className="section-kicker">Gouvernance</p>
          <ul className="mt-3 space-y-2 font-sans text-sm text-parchment/75">
            <li>
              <Link href="/bibliotheque" className="hover:text-gold">
                Bibliothèque historique
              </Link>
            </li>
            <li>
              <Link href="/sources" className="hover:text-gold">
                Sources consultables
              </Link>
            </li>
            <li>
              <Link href="/corrections" className="hover:text-gold">
                Historique des corrections
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-gold">
                À propos & charte
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold">
                Espace admin (CMS)
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="section-kicker">Distribution</p>
          <ul className="mt-3 space-y-2 font-sans text-sm text-parchment/75">
            <li>
              <Link href="/newsletter" className="hover:text-gold">
                Newsletter
              </Link>
            </li>
            <li>
              <Link href="/abonnement" className="hover:text-gold">
                Abonnements
              </Link>
            </li>
            <li>
              <Link href="/feed.xml" className="hover:text-gold">
                Flux RSS
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-gold">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="section-kicker">Newsletter</p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-parchment/65">
            Stub — pas d’envoi réel. Sources interdites : {forbidden}.
          </p>
          <NewsletterForm source="footer" compact />
        </div>
      </div>
      <div className="border-t border-white/5 px-[4vw] py-4 text-center font-sans text-[11px] tracking-wide text-parchment/45">
        © {new Date().getFullYear()} — Mémoire vivante (A+B+C). Pas de
        production sans autorisation.
      </div>
    </footer>
  );
}
