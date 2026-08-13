import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import {
  defaultWhatsappMessage,
  quotesFromExistingSite,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

/**
 * Bandeau d'informations au-dessus de la navigation.
 * Masqué sur mobile, où la barre d'action fixe joue ce rôle.
 */
export function TopBar() {
  return (
    <div className="hidden border-b border-line-dark bg-ink text-sand-muted lg:block">
      <div className="container-gv flex h-11 items-center justify-between text-[11px] tracking-wide">
        <p className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          {restaurant.venue}, {restaurant.street}, {restaurant.city}
        </p>

        <p className="hidden items-center gap-2 uppercase tracking-[0.18em] text-sand-faint xl:flex">
          <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          {quotesFromExistingSite.remoteOrder}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={restaurant.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-sand"
          >
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {restaurant.phone}
          </a>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-sand"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
