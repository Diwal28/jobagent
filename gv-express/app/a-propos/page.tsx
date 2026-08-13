import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Smartphone, Utensils } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quotesFromExistingSite, restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "GV Express, adresse de restauration au Centre Hospitalier National de Pikine, Camp Thiaroye. Service rapide, sur place, à emporter et commande à distance.",
  alternates: { canonical: "/a-propos" },
};

/** Faits vérifiés uniquement — aucune histoire ni distinction inventée. */
const facts = [
  {
    icon: MapPin,
    title: "Où nous sommes",
    text: `${restaurant.venue}, ${restaurant.street}, ${restaurant.city}.`,
  },
  {
    icon: Clock,
    title: "Quand nous ouvrons",
    text: `${restaurant.hours.days.toLowerCase()}, de ${restaurant.hours.opensAt}h à ${restaurant.hours.closesAt}h.`,
  },
  {
    icon: Utensils,
    title: "Comment on mange",
    text: "Sur place ou à emporter, selon votre temps disponible.",
  },
  {
    icon: Smartphone,
    title: "Comment commander",
    text: `${quotesFromExistingSite.remoteOrder}.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Bienvenue chez GV Express"
        breadcrumb="À propos"
        description="Une adresse de restauration au cœur de Pikine, pensée pour un service rapide et organisé."
        image="/images/salle.webp"
      />

      {/* Récit */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-gv">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5" y={28}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 -z-10 border border-gold/30 sm:-inset-5"
                />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/salle.webp"
                    alt="Ambiance de la salle de GV Express — emplacement prévu pour une photo du restaurant"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Notre adresse</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display-2 mt-4 text-cocoa text-balance">
                  Manger bien, sans perdre de temps
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Ornament className="mt-5" />
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-7 text-[0.9375rem] leading-relaxed text-cocoa-muted text-pretty sm:text-base">
                  GV Express est installé au{" "}
                  <span className="text-cocoa">{restaurant.venue}</span>, à{" "}
                  {restaurant.street}. Le restaurant accueille aussi bien celles
                  et ceux qui s’installent pour un vrai repas que celles et ceux
                  qui passent commande en vitesse.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-cocoa-muted text-pretty sm:text-base">
                  Les portes sont ouvertes {restaurant.hours.days.toLowerCase()},
                  de {restaurant.hours.opensAt}h à {restaurant.hours.closesAt}h.
                  Un appel ou un message WhatsApp suffit pour commander sans se
                  déplacer.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <blockquote className="mt-9 border-l-2 border-gold pl-6">
                  <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-cocoa sm:text-[1.75rem]">
                    «&nbsp;{quotesFromExistingSite.service}&nbsp;»
                  </p>
                  <footer className="mt-3 text-xs uppercase tracking-[0.18em] text-cocoa-faint">
                    GV Express — site officiel
                  </footer>
                </blockquote>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/menu">Voir la carte</ButtonLink>
                  <ButtonLink href="/reservation" variant="outline">
                    Réserver une table
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Repères pratiques */}
      <section className="border-y border-line bg-cream-2 py-16 sm:py-20">
        <div className="container-gv">
          <SectionHeading
            eyebrow="Repères"
            title="L’essentiel en un coup d’œil"
            align="center"
            description="Seules les informations confirmées par le restaurant figurent ici."
          />

          <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <Reveal
                as="li"
                key={fact.title}
                delay={index * 0.07}
                className="flex flex-col bg-cream px-7 py-9"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cocoa-faint">
                  0{index + 1}
                </span>
                <fact.icon className="mt-7 h-6 w-6 text-gold-ink" aria-hidden="true" />
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold text-cocoa">
                  {fact.title}
                </h3>
                <div className="mt-3 h-px w-10 bg-gold/50" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-cocoa-muted text-pretty">
                  {fact.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Gallery />
      <CtaBand />
    </>
  );
}
