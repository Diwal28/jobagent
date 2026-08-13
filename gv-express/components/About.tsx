import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { restaurant, quotesFromExistingSite } from "@/data/restaurant";

export function About() {
  return (
    <section id="a-propos" className="relative py-24 sm:py-32 lg:py-40">
      <div className="container-gv">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visuel */}
          <Reveal className="relative lg:col-span-5" y={30}>
            <div className="relative">
              {/* Filet doré décalé : cadre éditorial. */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[1.5rem] border border-gold/25 sm:-inset-5"
              />
              <div className="grain relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/salle.webp"
                  alt="Ambiance de la salle de GV Express — emplacement prévu pour une photo du restaurant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-line bg-ink-2/95 px-5 py-4 backdrop-blur-md sm:left-8 sm:right-auto">
                <p className="flex items-center gap-2 text-sm font-medium text-cream">
                  <MapPin className="h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
                  {restaurant.street} — Pikine
                </p>
              </div>
            </div>
          </Reveal>

          {/* Texte éditorial */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <p className="eyebrow">À propos</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display-2 mt-5 text-cream text-balance">
                Bienvenue chez GV&nbsp;Express
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hairline mt-7 w-24" />
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-8 text-base leading-relaxed text-cream-muted sm:text-lg text-pretty">
                GV Express est une adresse de restauration installée au{" "}
                <span className="text-cream">{restaurant.venue}</span>, à{" "}
                {restaurant.street}. On y vient pour manger sur place ou pour
                emporter, tous les jours, de {restaurant.hours.opensAt}h à{" "}
                {restaurant.hours.closesAt}h.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 text-base leading-relaxed text-cream-muted sm:text-lg text-pretty">
                {quotesFromExistingSite.remoteOrder} : un appel ou un message
                WhatsApp suffit pour passer commande sans se déplacer.
              </p>
            </Reveal>

            {/* Citation reprise mot pour mot du site actuel du restaurant. */}
            <Reveal delay={0.22}>
              <blockquote className="mt-10 border-l-2 border-ember pl-6">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-cream sm:text-[1.75rem]">
                  «&nbsp;{quotesFromExistingSite.service}&nbsp;»
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                <div className="bg-ink-2 px-5 py-6">
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-faint">
                    <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    Horaires
                  </dt>
                  <dd className="mt-3 text-xl font-semibold tracking-tight text-cream">
                    {restaurant.hours.label}
                  </dd>
                  <dd className="mt-1 text-sm text-cream-muted">
                    {restaurant.hours.days}
                  </dd>
                </div>
                <div className="bg-ink-2 px-5 py-6">
                  <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-faint">
                    <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    Adresse
                  </dt>
                  <dd className="mt-3 text-base font-medium leading-snug text-cream">
                    {restaurant.venue}
                  </dd>
                  <dd className="mt-1 text-sm text-cream-muted">
                    {restaurant.street}, {restaurant.city}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
