import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { addressLines, mapsUrl, restaurant } from "@/data/restaurant";

/** Section « Retrouvez-nous » : adresse, Plus Code et itinéraire. */
export function LocationBlock() {
  return (
    <section id="localisation" className="scroll-mt-28 bg-cream py-16 sm:py-24">
      <div className="container-gv">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" y={26}>
            <div className="flex h-full flex-col justify-between border border-line bg-cream-3 p-7 sm:p-9">
              <div>
                <p className="eyebrow">Localisation</p>
                <h2 className="display-2 mt-4 text-cocoa text-balance">
                  Retrouvez-nous
                </h2>
                <Ornament className="mt-5" />

                <address className="mt-8 space-y-5 not-italic">
                  <span className="flex gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span>
                      <span className="block font-[family-name:var(--font-display)] text-xl leading-snug text-cocoa">
                        {addressLines[0]}
                      </span>
                      <span className="mt-1 block text-sm text-cocoa-muted">
                        {addressLines.slice(1).join(" — ")}
                      </span>
                    </span>
                  </span>

                  <a
                    href={restaurant.phoneHref}
                    className="flex items-center gap-3 text-cocoa transition-colors hover:text-ember-ink"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span className="text-base font-semibold">{restaurant.phone}</span>
                  </a>

                  <span className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                    <span className="text-sm text-cocoa-muted">
                      {restaurant.hours.days} · {restaurant.hours.label}
                    </span>
                  </span>
                </address>

                <div className="mt-7 border-t border-line pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cocoa-faint">
                    Plus Code Google Maps
                  </p>
                  <p className="mt-2 font-mono text-lg tracking-tight text-ember-ink">
                    {restaurant.plusCode}
                  </p>
                </div>
              </div>

              <ButtonLink href={mapsUrl} external size="lg" className="mt-9 w-full">
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Ouvrir l’itinéraire
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" y={26} delay={0.08}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group grain relative block h-full min-h-[300px] overflow-hidden border border-line sm:min-h-[420px]"
              aria-label="Ouvrir l’itinéraire vers GV Express dans Google Maps"
            >
              <Image
                src="/images/lieu.webp"
                alt="Visuel d’ambiance du quartier de Camp Thiaroye — emplacement prévu pour une photo de la devanture de GV Express"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="veil-soft absolute inset-0" />

              <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-4 sm:inset-x-9 sm:bottom-9">
                <div>
                  <p className="eyebrow-dark">
                    {restaurant.city}, {restaurant.country}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight text-sand sm:text-3xl">
                    {restaurant.street}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 border border-line-dark-strong bg-ink/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-sand backdrop-blur-sm transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  Ouvrir dans Maps
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
