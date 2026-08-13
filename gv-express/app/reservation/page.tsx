import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { addressLines, restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Réservation",
  description:
    "Réservez votre table chez GV Express, Camp Thiaroye, Pikine. Demande envoyée par WhatsApp et confirmée directement par le restaurant.",
  alternates: { canonical: "/reservation" },
};

const steps = [
  {
    title: "Vous remplissez",
    text: "Date, heure et nombre de personnes — rien de plus.",
  },
  {
    title: "WhatsApp s’ouvre",
    text: "Le message est déjà rédigé, vous n’avez qu’à l’envoyer.",
  },
  {
    title: "Le restaurant confirme",
    text: `GV Express vous répond, ou vous rappelle au ${restaurant.phone}.`,
  },
];

export default function ReservationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réservation"
        title="Réserver une table"
        breadcrumb="Réservation"
        description="Indiquez votre créneau : la demande part sur WhatsApp et le restaurant la confirme."
        image="/images/gallery/ambiance-02.webp"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-gv">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Formulaire */}
            <Reveal className="lg:col-span-7" y={26}>
              <div className="border border-line bg-cream-3 p-7 sm:p-10">
                <p className="eyebrow">Votre demande</p>
                <h2 className="display-2 mt-4 text-cocoa text-balance">
                  Dites-nous quand vous venez
                </h2>
                <Ornament className="mt-5" />

                <ReservationForm variant="panel" className="mt-9" />
              </div>
            </Reveal>

            {/* Informations */}
            <div className="lg:col-span-5">
              <Reveal y={26} delay={0.08}>
                <div className="border border-line bg-cream-2 p-7 sm:p-9">
                  <p className="eyebrow">Comment ça marche</p>
                  <ol className="mt-7 space-y-6">
                    {steps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs font-semibold text-gold-ink">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block font-[family-name:var(--font-display)] text-lg text-cocoa">
                            {step.title}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-cocoa-muted text-pretty">
                            {step.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal y={26} delay={0.16}>
                <div className="mt-6 border border-line bg-cream-3 p-7 sm:p-9">
                  <p className="eyebrow">Informations pratiques</p>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      <span className="text-sm text-cocoa-muted">
                        <span className="block font-semibold text-cocoa">
                          {restaurant.hours.label}
                        </span>
                        {restaurant.hours.days}
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      <span className="text-sm text-cocoa-muted">
                        {addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      <a
                        href={restaurant.phoneHref}
                        className="text-sm font-semibold text-cocoa transition-colors hover:text-ember-ink"
                      >
                        {restaurant.phone}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                      <span className="text-sm text-cocoa-muted">
                        Réponse et confirmation par WhatsApp.
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
