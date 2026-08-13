import { MessageCircle, Phone } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import {
  addressLines,
  defaultWhatsappMessage,
  navLinks,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-gv py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-muted text-pretty">
              Restauration au {restaurant.venue}, à {restaurant.street}.
              Sur place, à emporter ou en commande à distance.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold text-cream transition-colors duration-300 hover:border-leaf hover:text-leaf"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={restaurant.phoneHref}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold text-cream transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Appeler
              </a>
            </div>
          </div>

          <nav aria-label="Navigation de bas de page" className="lg:col-span-3">
            <p className="eyebrow">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream-muted transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#galerie"
                  className="text-sm text-cream-muted transition-colors duration-300 hover:text-cream"
                >
                  Galerie
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow">Coordonnées</p>
            <address className="mt-5 space-y-3 not-italic">
              <a
                href={restaurant.phoneHref}
                className="block text-lg font-semibold tracking-tight text-cream transition-colors duration-300 hover:text-ember"
              >
                {restaurant.phone}
              </a>
              <span className="block text-sm leading-relaxed text-cream-muted">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <span className="block pt-1 text-sm text-cream-muted">
                {restaurant.hours.days} · {restaurant.hours.label}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream-faint">
            © 2026 {restaurant.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-cream-faint">
            Plus Code&nbsp;: <span className="text-cream-muted">{restaurant.plusCode}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
