import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Clock, Info } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EVENTS_ARE_PLACEHOLDER, events, eventServices } from "@/data/events";
import { defaultWhatsappMessage, restaurant, whatsappUrl } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Les annonces et rendez-vous de GV Express, au Centre Hospitalier National de Pikine, Camp Thiaroye.",
  alternates: { canonical: "/evenements" },
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Événements"
        title="Nos rendez-vous"
        breadcrumb="Événements"
        description="Les annonces du restaurant : soirées, formules de groupe et actualités."
        image="/images/gallery/ambiance-05.webp"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-gv">
          {EVENTS_ARE_PLACEHOLDER && (
            <Reveal>
              <p className="mx-auto flex max-w-3xl items-start gap-3 border border-gold/30 bg-gold/[0.07] px-5 py-4 text-sm leading-relaxed text-cocoa-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-cocoa">Démonstration.</span>{" "}
                  Aucun événement n’a encore été communiqué par GV Express :
                  aucune date ni annonce n’a été inventée. Les emplacements
                  ci-dessous montrent la mise en page définitive.
                </span>
              </p>
            </Reveal>
          )}

          <ul className="mt-12 space-y-6">
            {events.map((event, index) => (
              <Reveal as="li" key={event.id} delay={index * 0.07}>
                <article className="group grid gap-0 overflow-hidden border border-line bg-cream-3 md:grid-cols-12">
                  <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[260px]">
                    <Image
                      src={event.image}
                      alt={`Emplacement photo réservé pour ${event.title.toLowerCase()}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-7 md:col-span-7 sm:p-9">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cocoa-faint">
                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-gold-ink" aria-hidden="true" />
                        {event.dateLabel}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-gold-ink" aria-hidden="true" />
                        {event.timeLabel}
                      </span>
                    </div>

                    <h2 className="display-2 mt-4 text-[1.75rem] text-cocoa sm:text-[2rem]">
                      {event.title}
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-cocoa-muted text-pretty sm:text-[0.9375rem]">
                      {event.description}
                    </p>

                    <ButtonLink
                      href={whatsappUrl(
                        `Bonjour ${restaurant.name}, je souhaite des informations sur vos événements.`,
                      )}
                      external
                      variant="outline"
                      className="mt-7 self-start"
                    >
                      Demander des informations
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services confirmés */}
      <section className="border-t border-line bg-cream-2 py-16 sm:py-20">
        <div className="container-gv">
          <SectionHeading
            eyebrow="En pratique"
            title="Ce que le restaurant propose déjà"
            align="center"
            description="Ces trois points reprennent uniquement des informations confirmées."
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {eventServices.map((service, index) => (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 0.08}
                className="border border-line bg-cream p-7"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cocoa-faint">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-cocoa">
                  {service.title}
                </h3>
                <div className="mt-3 h-px w-10 bg-gold/50" aria-hidden="true" />
                <p className="mt-4 text-sm leading-relaxed text-cocoa-muted text-pretty">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <ButtonLink
                href={whatsappUrl(defaultWhatsappMessage)}
                external
                size="lg"
              >
                Organiser avec GV Express
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
