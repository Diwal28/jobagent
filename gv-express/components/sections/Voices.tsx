import { MessageCircle, Quote } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  quotesFromExistingSite,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

/**
 * Aucun avis client n'a été communiqué : le site n'en invente donc
 * aucun. Cette section reprend les phrases publiées par GV Express
 * elle-même, et réserve visiblement la place aux futurs avis.
 */
const quotes = [
  {
    text: quotesFromExistingSite.service,
    source: "GV Express",
    context: "Site officiel du restaurant",
  },
  {
    text: quotesFromExistingSite.remoteOrder,
    source: "GV Express",
    context: "Site officiel du restaurant",
  },
];

export function Voices() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="container-gv">
        <SectionHeading
          eyebrow="Témoignages"
          title="Les mots de la maison"
          align="center"
          description="Les avis clients seront ajoutés ici dès qu’ils seront recueillis. En attendant, voici les engagements affichés par le restaurant."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <Reveal
              as="li"
              key={quote.text}
              delay={index * 0.08}
              className="flex flex-col border border-line bg-cream-3 p-7"
            >
              <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
              <p className="mt-5 flex-1 font-[family-name:var(--font-display)] text-lg leading-snug text-cocoa text-pretty">
                «&nbsp;{quote.text}&nbsp;»
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm font-semibold text-cocoa">{quote.source}</p>
                <p className="mt-1 text-xs text-cocoa-faint">{quote.context}</p>
              </div>
            </Reveal>
          ))}

          {/* Emplacement assumé pour les futurs avis clients. */}
          <Reveal
            as="li"
            delay={0.16}
            className="flex flex-col justify-between border border-dashed border-line-strong bg-cream-2 p-7"
          >
            <div>
              <MessageCircle className="h-6 w-6 text-gold-ink" aria-hidden="true" />
              <p className="mt-5 font-[family-name:var(--font-display)] text-lg leading-snug text-cocoa">
                Votre avis a sa place ici.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cocoa-muted text-pretty">
                Vous avez commandé chez {restaurant.name}&nbsp;? Envoyez votre
                retour, il sera publié à cet endroit.
              </p>
            </div>
            <a
              href={whatsappUrl(
                `Bonjour ${restaurant.name}, voici mon avis sur votre restaurant : `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa transition-colors hover:text-ember-ink"
            >
              Partager mon avis
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
