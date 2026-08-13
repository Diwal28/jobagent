import { MessageCircle, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  defaultWhatsappMessage,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

export function Order() {
  return (
    <section id="commander" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-gv">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[1.75rem] border border-ember/25 px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            {/* Fond chaud — dégradé maîtrisé, sans surcharge. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(90%_140%_at_15%_0%,rgba(224,100,44,0.28),transparent_60%),radial-gradient(70%_120%_at_100%_100%,rgba(200,161,90,0.16),transparent_65%)] bg-ink-2"
            />

            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Commande rapide</p>
                <h2 className="display-2 mt-5 text-cream text-balance">
                  Une envie&nbsp;? Commandez simplement.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-muted sm:text-lg text-pretty">
                  Contactez directement {restaurant.name} pour passer votre
                  commande.
                </p>

                <a
                  href={restaurant.phoneHref}
                  className="mt-9 inline-flex flex-col"
                  aria-label={`Appeler GV Express au ${restaurant.phone}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream-faint">
                    Par téléphone
                  </span>
                  <span className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-cream transition-colors duration-300 hover:text-ember sm:text-4xl">
                    {restaurant.phone}
                  </span>
                </a>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-5">
                <ButtonLink
                  href={whatsappUrl(defaultWhatsappMessage)}
                  external
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </ButtonLink>

                <ButtonLink
                  href={restaurant.phoneHref}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Appeler
                </ButtonLink>

                <p className="mt-2 text-center text-xs leading-relaxed text-cream-faint">
                  {restaurant.hours.days} · {restaurant.hours.label}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
