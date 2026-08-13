import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { menuItems } from "@/data/menu";
import {
  addressLines,
  defaultWhatsappMessage,
  mapsUrl,
  navLinks,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";
import { formatPrice } from "@/lib/utils";

/** Trois entrées de la carte mises en avant en pied de page. */
const highlighted = menuItems.filter((item) => item.featured).slice(0, 3);

export function Footer() {
  return (
    <footer className="grain relative bg-ink text-sand-muted">
      <div className="container-gv py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Identité */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-pretty">
              Restauration au {restaurant.venue}, à {restaurant.street}.
              Sur place, à emporter ou en commande à distance.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Écrire à GV Express sur WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-line-dark-strong text-sand transition-colors hover:border-leaf hover:text-leaf"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={restaurant.phoneHref}
                aria-label={`Appeler GV Express au ${restaurant.phone}`}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir l’itinéraire vers GV Express"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation de bas de page" className="lg:col-span-2">
            <p className="eyebrow-dark">Navigation</p>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Extraits de la carte */}
          <div className="lg:col-span-3">
            <p className="eyebrow-dark">La carte</p>
            <ul className="mt-6 space-y-4">
              {highlighted.map((item) => {
                const price = formatPrice(item.price);
                return (
                  <li key={item.id}>
                    <Link
                      href="/menu"
                      className="group flex items-center gap-3"
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm text-sand transition-colors group-hover:text-gold">
                          {item.name}
                        </span>
                        <span className="mt-0.5 text-xs text-gold">
                          {price ?? "Prix à confirmer"}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="lg:col-span-3">
            <p className="eyebrow-dark">Nous contacter</p>
            <address className="mt-6 space-y-4 not-italic">
              <span className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block leading-relaxed">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
              <a
                href={restaurant.phoneHref}
                className="flex items-center gap-3 text-sm transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {restaurant.phone}
              </a>
              <span className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {restaurant.hours.days} · {restaurant.hours.label}
              </span>
            </address>

            <ButtonLink
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              variant="outline-dark"
              className="mt-7 w-full sm:w-auto"
            >
              Commander maintenant
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-7 text-xs text-sand-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {restaurant.name}. Tous droits réservés.</p>
          <p>
            Plus Code&nbsp;: <span className="text-sand-muted">{restaurant.plusCode}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
