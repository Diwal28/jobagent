"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import {
  defaultWhatsappMessage,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { useOpenStatus } from "@/lib/useOpenStatus";

/** Pastille d’état — calculée côté client pour éviter tout écart d’hydratation. */
function OpenBadge() {
  const open = useOpenStatus();

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-3.5 py-1.5 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${
            open === false ? "bg-cream-faint" : "bg-leaf"
          } opacity-70`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            open === false ? "bg-cream-faint" : "bg-leaf"
          }`}
        />
      </span>
      <span className="text-[11px] font-medium tracking-wide text-cream-muted">
        {open === null && `${restaurant.hours.days} · ${restaurant.hours.label}`}
        {open === true && `Ouvert maintenant · jusqu’à 23:00`}
        {open === false && `Fermé · ouvre à 08:00`}
      </span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <section
      id="accueil"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20"
    >
      {/* Visuel d’ambiance — à remplacer par une photo de GV Express. */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? undefined : { scale: 1.12, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Image
            src="/images/hero.webp"
            alt="Ambiance chaleureuse du restaurant GV Express à Camp Thiaroye, Pikine"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="veil absolute inset-0" />
      </div>

      {/* Mention verticale — détail éditorial, masqué sur mobile. */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.4em] text-cream-faint [writing-mode:vertical-rl]">
          Camp Thiaroye — Pikine
        </span>
      </div>

      <div className="container-gv relative">
        <motion.div {...rise(0.1)} className="flex flex-wrap items-center gap-4">
          <span className="eyebrow">GV Express</span>
          <span className="hidden h-px w-16 bg-line-strong sm:block" aria-hidden="true" />
          <OpenBadge />
        </motion.div>

        <motion.h1
          {...rise(0.22)}
          className="display-1 mt-7 max-w-4xl text-cream text-balance"
        >
          Le goût qui vous
          <br className="hidden sm:block" /> accompagne.
        </motion.h1>

        <motion.p
          {...rise(0.34)}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream-muted sm:text-lg text-pretty"
        >
          Une expérience gourmande au cœur de Pikine. Découvrez notre menu et
          commandez simplement.
        </motion.p>

        <motion.div {...rise(0.46)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#menu" size="lg" className="w-full sm:w-auto">
            Découvrir le menu
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl(defaultWhatsappMessage)}
            external
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Commander
          </ButtonLink>
        </motion.div>

        <motion.div
          {...rise(0.58)}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href={restaurant.phoneHref}
            className="group inline-flex items-center gap-3"
            aria-label={`Appeler GV Express au ${restaurant.phone}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-ember group-hover:bg-ember/10">
              <Phone className="h-4 w-4 text-ember" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-faint">
                Commandes
              </span>
              <span className="text-lg font-semibold tracking-tight text-cream">
                {restaurant.phone}
              </span>
            </span>
          </a>

          <span className="inline-flex items-center gap-2 text-sm text-cream-muted">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
            {restaurant.venue}
          </span>
        </motion.div>

        <motion.a
          href="#a-propos"
          {...rise(0.7)}
          className="mt-14 hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream-faint transition-colors hover:text-cream sm:inline-flex"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          Faire défiler
        </motion.a>
      </div>
    </section>
  );
}
