"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import {
  defaultWhatsappMessage,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { useOpenStatus } from "@/lib/useOpenStatus";

/** Pastille d'état — calculée côté client pour éviter tout écart d'hydratation. */
function OpenBadge() {
  const open = useOpenStatus();

  return (
    <span className="inline-flex items-center gap-2 border border-line-dark bg-ink-2/70 px-3.5 py-2 backdrop-blur-sm">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          open === false ? "bg-sand-faint" : "bg-leaf"
        }`}
        aria-hidden="true"
      />
      <span className="text-[11px] font-medium tracking-wide text-sand-muted">
        {open === null && `${restaurant.hours.days} · ${restaurant.hours.label}`}
        {open === true && "Ouvert maintenant · jusqu’à 23:00"}
        {open === false && "Fermé · ouvre à 08:00"}
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
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease, delay },
        };

  return (
    <section className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-32 pb-16 sm:items-center sm:pt-44 sm:pb-24">
      {/* Visuel d'ambiance — à remplacer par une photo de GV Express. */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? undefined : { scale: 1.1, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        >
          <Image
            src="/images/hero.webp"
            alt="Ambiance chaleureuse du restaurant GV Express à Camp Thiaroye, Pikine"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </motion.div>
        <div className="veil absolute inset-0" />
      </div>

      <div className="container-gv relative">
        <div className="max-w-2xl">
          <motion.p {...rise(0.05)} className="script text-2xl text-gold sm:text-[1.75rem]">
            Bienvenue chez GV Express
          </motion.p>

          <motion.h1 {...rise(0.16)} className="display-1 mt-4 text-sand text-balance">
            Le goût qui vous
            <span className="script mt-1 block text-gold">accompagne.</span>
          </motion.h1>

          <motion.p
            {...rise(0.28)}
            className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-sand-muted text-pretty sm:text-base"
          >
            Une expérience gourmande au cœur de Pikine. Découvrez notre menu et
            commandez simplement.
          </motion.p>

          <motion.div
            {...rise(0.4)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/menu" size="lg" className="w-full sm:w-auto">
              Découvrir le menu
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              variant="outline-dark"
              size="lg"
              className="w-full sm:w-auto"
            >
              Commander
            </ButtonLink>
          </motion.div>

          <motion.div
            {...rise(0.52)}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <a
              href={restaurant.phoneHref}
              className="group flex items-center gap-3"
              aria-label={`Appeler GV Express au ${restaurant.phone}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark-strong transition-colors duration-300 group-hover:border-gold">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sand-faint">
                  Commandes
                </span>
                <span className="text-base font-semibold tracking-tight text-sand sm:text-lg">
                  {restaurant.phone}
                </span>
              </span>
            </a>

            <OpenBadge />
          </motion.div>

          <motion.p
            {...rise(0.6)}
            className="mt-6 flex items-center gap-2 text-xs text-sand-faint"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {restaurant.venue} — {restaurant.street}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
