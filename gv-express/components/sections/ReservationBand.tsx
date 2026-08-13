import Image from "next/image";

import { ReservationForm } from "@/components/sections/ReservationForm";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

/** Bandeau de réservation entre deux sections claires. */
export function ReservationBand() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-14 sm:py-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/salle.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="container-gv">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow-dark">Réservation</p>
            <h2 className="display-2 mt-3 text-sand text-balance">
              Réservez votre table
            </h2>
            <Ornament tone="dark" className="mt-4" />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ReservationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
