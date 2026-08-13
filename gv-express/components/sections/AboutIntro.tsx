import { CalendarDays, Clock, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { quotesFromExistingSite, restaurant } from "@/data/restaurant";

type Stat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

/**
 * Chiffres affichés à droite du texte.
 * Ils reprennent uniquement des informations confirmées : ni
 * années d'existence, ni nombre de clients, ni nombre de plats.
 */
const stats: Stat[] = [
  { icon: CalendarDays, value: "7/7", label: "Ouvert tous les jours" },
  { icon: Clock, value: "08–23", label: "Sans interruption" },
  { icon: PhoneCall, value: "1 appel", label: "Pour commander à distance" },
];

export function AboutIntro() {
  return (
    <section className="bg-cream-2 py-16 sm:py-24">
      <div className="container-gv">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Composition d'images */}
          <Reveal className="lg:col-span-5" y={28}>
            <div className="grid grid-cols-5 gap-3">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/salle.webp"
                  alt="Ambiance de la salle de GV Express — emplacement prévu pour une photo du restaurant"
                  fill
                  sizes="(max-width: 1024px) 55vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/gallery/ambiance-03.webp"
                    alt="Emplacement prévu pour une photo du service de GV Express"
                    fill
                    sizes="(max-width: 1024px) 35vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src="/images/menu/plat-03.webp"
                    alt="Emplacement prévu pour une photo de plat de GV Express"
                    fill
                    sizes="(max-width: 1024px) 35vw, 16vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Texte */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">À propos</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-2 mt-4 text-cocoa text-balance">
                Une adresse simple, un service qui va vite
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Ornament className="mt-5" />
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-cocoa-muted text-pretty">
                GV Express est une adresse de restauration installée au{" "}
                <span className="text-cocoa">{restaurant.venue}</span>, à{" "}
                {restaurant.street}. On y vient pour manger sur place ou pour
                emporter, tous les jours, de {restaurant.hours.opensAt}h à{" "}
                {restaurant.hours.closesAt}h.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <blockquote className="mt-7 border-l-2 border-gold pl-5">
                <p className="font-[family-name:var(--font-display)] text-xl leading-snug text-cocoa sm:text-2xl">
                  «&nbsp;{quotesFromExistingSite.service}&nbsp;»
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.22}>
              <ButtonLink href="/a-propos" variant="outline" className="mt-8">
                En savoir plus
              </ButtonLink>
            </Reveal>
          </div>

          {/* Chiffres */}
          <div className="lg:col-span-3">
            <ul className="space-y-4">
              {stats.map((stat, index) => (
                <Reveal
                  as="li"
                  key={stat.label}
                  delay={0.1 + index * 0.08}
                  className="flex items-center gap-4 border border-line bg-cream px-5 py-6"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/35">
                    <stat.icon className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-cocoa">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs text-cocoa-muted">
                      {stat.label}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
