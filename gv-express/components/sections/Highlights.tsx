import { Clock, MapPin, Smartphone, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { quotesFromExistingSite, restaurant } from "@/data/restaurant";

type Highlight = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/**
 * Bandeau d'atouts sous le hero.
 * Uniquement des éléments vérifiables : aucune promesse de délai,
 * de classement ou de provenance des produits.
 */
const highlights: Highlight[] = [
  {
    icon: Timer,
    title: "Service rapide",
    text: `${quotesFromExistingSite.service}.`,
  },
  {
    icon: Smartphone,
    title: "Commande à distance",
    text: "Par téléphone ou WhatsApp, sans vous déplacer.",
  },
  {
    icon: MapPin,
    title: "Emplacement pratique",
    text: `Au ${restaurant.venue}, à ${restaurant.street}.`,
  },
  {
    icon: Clock,
    title: "Ouvert tous les jours",
    text: `${restaurant.hours.label}, sans interruption.`,
  },
];

export function Highlights() {
  return (
    <section className="border-b border-line bg-cream-2">
      <div className="container-gv">
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {highlights.map((highlight, index) => (
            <Reveal
              as="li"
              key={highlight.title}
              delay={index * 0.07}
              className="flex items-start gap-4 py-8 sm:py-10 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-cream">
                <highlight.icon
                  className="h-5 w-5 text-gold-ink"
                  aria-hidden="true"
                />
              </span>
              <span>
                <span className="block font-[family-name:var(--font-display)] text-lg font-semibold text-cocoa">
                  {highlight.title}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-cocoa-muted text-pretty">
                  {highlight.text}
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
