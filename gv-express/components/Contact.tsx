import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  addressLines,
  defaultWhatsappMessage,
  mapsUrl,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

export function Contact() {
  const details = [
    {
      icon: Phone,
      label: "Téléphone",
      value: restaurant.phone,
      href: restaurant.phoneHref,
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: addressLines.join(", "),
      href: mapsUrl,
      external: true,
    },
    {
      icon: Clock,
      label: "Horaires",
      value: `${restaurant.hours.label} — ${restaurant.hours.days.toLowerCase()}`,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line bg-ink-2/40 py-24 sm:py-32"
    >
      <div className="container-gv">
        <SectionHeading
          eyebrow="Contact"
          title="Parlons de votre prochaine commande"
          align="center"
        />

        <ul className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal
              as="li"
              key={detail.label}
              delay={index * 0.08}
              className="bg-ink px-7 py-9"
            >
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-faint">
                <detail.icon className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
                {detail.label}
              </p>

              {detail.href ? (
                <a
                  href={detail.href}
                  {...(detail.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-4 block text-lg leading-snug text-cream transition-colors duration-300 hover:text-ember"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="mt-4 text-lg leading-snug text-cream">
                  {detail.value}
                </p>
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href={restaurant.phoneHref}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Appeler
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
            <ButtonLink
              href={mapsUrl}
              external
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              Itinéraire
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
