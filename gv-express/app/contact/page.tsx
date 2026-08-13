import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { PageHeader } from "@/components/sections/PageHeader";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import {
  addressLines,
  defaultWhatsappMessage,
  mapsUrl,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter GV Express : téléphone, WhatsApp, adresse au Centre Hospitalier National de Pikine, Camp Thiaroye, et horaires d’ouverture.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: Phone,
    label: "Téléphone",
    value: restaurant.phone,
    href: restaurant.phoneHref,
    hint: "Aux horaires d’ouverture",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Écrire au restaurant",
    href: whatsappUrl(defaultWhatsappMessage),
    external: true,
    hint: "Commande et réservation",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: addressLines.join(", "),
    href: mapsUrl,
    external: true,
    hint: `Plus Code ${restaurant.plusCode}`,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: restaurant.hours.label,
    hint: restaurant.hours.days,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre commande"
        breadcrumb="Contact"
        description="Une question, une commande, une table à réserver : le restaurant répond directement."
        image="/images/gallery/ambiance-06.webp"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-gv">
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail, index) => (
              <Reveal
                as="li"
                key={detail.label}
                delay={index * 0.07}
                className="bg-cream-3 px-7 py-9"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35">
                  <detail.icon className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                </span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-cocoa-faint">
                  {detail.label}
                </p>

                {detail.href ? (
                  <a
                    href={detail.href}
                    {...(detail.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-2 block text-base leading-snug text-cocoa transition-colors duration-300 hover:text-ember-ink"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-2 text-base leading-snug text-cocoa">
                    {detail.value}
                  </p>
                )}

                <p className="mt-2 text-xs text-cocoa-faint">{detail.hint}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7" y={26}>
              <div className="border border-line bg-cream-3 p-7 sm:p-10">
                <p className="eyebrow">Écrire au restaurant</p>
                <h2 className="display-2 mt-4 text-cocoa text-balance">
                  Envoyez votre message
                </h2>
                <Ornament className="mt-5" />
                <ContactForm className="mt-9" />
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" y={26} delay={0.08}>
              <div className="flex h-full flex-col justify-between border border-line bg-cream-2 p-7 sm:p-9">
                <div>
                  <p className="eyebrow">Bon à savoir</p>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-snug text-cocoa">
                    Le plus rapide reste l’appel
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-cocoa-muted text-pretty">
                    Pour une commande immédiate, appelez le restaurant : la
                    prise de commande se fait dans la foulée, {" "}
                    {restaurant.hours.days.toLowerCase()} de{" "}
                    {restaurant.hours.opensAt}h à {restaurant.hours.closesAt}h.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-cocoa-muted text-pretty">
                    Pour une demande moins urgente — réservation, question sur la
                    carte, événement — WhatsApp garde une trace écrite de
                    l’échange.
                  </p>
                </div>

                <a
                  href={restaurant.phoneHref}
                  className="mt-9 block border-t border-line pt-6 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-cocoa transition-colors duration-300 hover:text-ember-ink"
                >
                  {restaurant.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LocationBlock />
      <CtaBand />
    </>
  );
}
