import { MessageCircle, Navigation, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import {
  defaultWhatsappMessage,
  mapsUrl,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

/** Appel à l'action final, commun à toutes les pages. */
export function CtaBand() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/lieu.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="container-gv text-center">
        <Reveal>
          <p className="eyebrow-dark">Commande rapide</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-2 mt-4 text-sand text-balance">
            Une envie&nbsp;? Commandez simplement.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Ornament tone="dark" className="mx-auto mt-5" />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-sand-muted text-pretty">
            Contactez directement {restaurant.name} pour passer votre commande.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <a
            href={restaurant.phoneHref}
            className="mt-8 inline-block font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-sand transition-colors duration-300 hover:text-gold sm:text-4xl"
          >
            {restaurant.phone}
          </a>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href={restaurant.phoneHref} size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Appeler
            </ButtonLink>
            <ButtonLink href={mapsUrl} external variant="outline-dark" size="lg">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Itinéraire
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-7 text-xs text-sand-faint">
            {restaurant.hours.days} · {restaurant.hours.label}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
