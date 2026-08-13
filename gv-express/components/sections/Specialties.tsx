"use client";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useCallback, useRef } from "react";

import { DishCard } from "@/components/sections/DishCard";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { MENU_IS_PLACEHOLDER, menuCategories, menuItems } from "@/data/menu";

/** Sélection présentée sur l'accueil, en défilement horizontal. */
const selection = menuItems.slice(0, 8);

export function Specialties() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const categoryLabel = (id: string) =>
    menuCategories.find((category) => category.id === id)?.label ?? "";

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="container-gv">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Colonne éditoriale */}
          <div className="lg:col-span-3 lg:pt-6">
            <Reveal>
              <p className="eyebrow">Explorer la carte</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-2 mt-4 text-cocoa text-balance">
                Nos spécialités
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Ornament className="mt-5" />
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-cocoa-muted text-pretty">
                Découvrez nos spécialités et choisissez votre prochaine envie.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ButtonLink href="/menu" variant="outline" className="mt-7">
                Voir toute la carte
              </ButtonLink>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 hidden gap-2 lg:flex">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  aria-label="Voir les plats précédents"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-cocoa transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  aria-label="Voir les plats suivants"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-cocoa transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Piste de cartes — `min-w-0` empêche la piste horizontale
              d'élargir la colonne de grille. */}
          <div className="min-w-0 lg:col-span-9">
            {MENU_IS_PLACEHOLDER && (
              <Reveal>
                <p className="mb-6 flex items-start gap-2.5 border border-gold/30 bg-gold/[0.07] px-4 py-3 text-xs leading-relaxed text-cocoa-muted">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-ink" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-cocoa">Démonstration.</span>{" "}
                    Les intitulés, photos et prix réels de GV Express seront
                    intégrés à l’identique. Aucun plat ni tarif n’a été inventé.
                  </span>
                </p>
              </Reveal>
            )}

            <Reveal delay={0.08}>
              <ul
                ref={trackRef}
                className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
              >
                {selection.map((item) => (
                  <li
                    key={item.id}
                    className="w-[78vw] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
                  >
                    <DishCard
                      item={item}
                      categoryLabel={categoryLabel(item.category)}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
