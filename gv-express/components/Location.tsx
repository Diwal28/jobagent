import { Clock, Navigation, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addressLines, mapsUrl, restaurant } from "@/data/restaurant";

export function Location() {
  return (
    <section id="localisation" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-gv">
        <SectionHeading
          eyebrow="Localisation"
          title="Retrouvez-nous"
          description="Une adresse simple à repérer, au sein du Centre Hospitalier National de Pikine."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Coordonnées */}
          <Reveal className="lg:col-span-5" y={26}>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-ink-2 p-7 sm:p-9">
              <div>
                <p className="eyebrow">Adresse</p>
                <address className="mt-5 not-italic">
                  {addressLines.map((line, index) => (
                    <span
                      key={line}
                      className={
                        index === 0
                          ? "block font-[family-name:var(--font-display)] text-2xl leading-snug text-cream"
                          : "mt-1 block text-base text-cream-muted"
                      }
                    >
                      {line}
                    </span>
                  ))}
                </address>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-faint">
                      Plus Code
                    </p>
                    <p className="mt-1.5 font-mono text-lg tracking-tight text-gold">
                      {restaurant.plusCode}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-faint">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      Horaires
                    </p>
                    <p className="mt-1.5 text-lg tracking-tight text-cream">
                      {restaurant.hours.label}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={mapsUrl} external size="lg" className="w-full sm:flex-1">
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  Itinéraire
                </ButtonLink>
                <ButtonLink
                  href={restaurant.phoneHref}
                  variant="outline"
                  size="lg"
                  className="w-full sm:flex-1"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Appeler
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {/* Visuel du lieu */}
          <Reveal className="lg:col-span-7" y={26} delay={0.08}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group grain relative block h-full min-h-[280px] overflow-hidden rounded-[var(--radius-card)] border border-line sm:min-h-[380px]"
              aria-label="Ouvrir l’itinéraire vers GV Express dans Google Maps"
            >
              <Image
                src="/images/lieu.webp"
                alt="Visuel d’ambiance du quartier de Camp Thiaroye — emplacement prévu pour une photo de la devanture de GV Express"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

              <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-4 sm:inset-x-9 sm:bottom-9">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {restaurant.city}, {restaurant.country}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight text-cream sm:text-3xl">
                    {restaurant.street}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink/70 px-4 py-2.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors duration-300 group-hover:border-ember group-hover:text-ember">
                  <Navigation className="h-4 w-4" aria-hidden="true" />
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
