import { Clock, MapPin, Smartphone, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quotesFromExistingSite, restaurant } from "@/data/restaurant";

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/**
 * Uniquement des atouts vérifiables à partir des informations
 * communiquées par le restaurant : aucune promesse de délai, de
 * classement ou de provenance des produits.
 */
const features: Feature[] = [
  {
    icon: Timer,
    title: "Service rapide",
    text: `${quotesFromExistingSite.service}.`,
  },
  {
    icon: Smartphone,
    title: "Commande à distance",
    text: `${quotesFromExistingSite.remoteOrder} — par téléphone ou WhatsApp.`,
  },
  {
    icon: MapPin,
    title: "Emplacement pratique",
    text: `Au ${restaurant.venue}, à ${restaurant.street}.`,
  },
  {
    icon: Clock,
    title: "Ouvert tous les jours",
    text: `${restaurant.hours.label}, ${restaurant.hours.days.toLowerCase()}.`,
  },
];

export function Features() {
  return (
    <section className="relative border-y border-line bg-ink-2/40 py-24 sm:py-32">
      <div className="container-gv">
        <SectionHeading
          eyebrow="Pourquoi GV Express"
          title="Une adresse pensée pour aller vite, sans rien perdre du plaisir."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={index * 0.08}
              className="group relative flex flex-col bg-ink px-7 py-10 transition-colors duration-500 hover:bg-ink-2"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream-faint">
                0{index + 1}
              </span>

              <feature.icon
                className="mt-8 h-6 w-6 text-ember transition-transform duration-500 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />

              <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-cream">
                {feature.title}
              </h3>

              <div className="mt-4 h-px w-10 bg-gold/40" aria-hidden="true" />

              <p className="mt-4 text-sm leading-relaxed text-cream-muted text-pretty">
                {feature.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
