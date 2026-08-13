import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Ornament } from "@/components/ui/Ornament";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Libellé court du fil d'Ariane (par défaut : le titre). */
  breadcrumb?: string;
  /** Image de fond — remplaçable par une photo du restaurant. */
  image?: string;
};

/** Bandeau d'en-tête commun à toutes les pages intérieures. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  image = "/images/hero.webp",
}: PageHeaderProps) {
  return (
    <section className="grain relative overflow-hidden bg-ink pt-[7.5rem] pb-16 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="veil-soft absolute inset-0" />
      </div>

      <div className="container-gv text-center">
        <p className="eyebrow-dark">{eyebrow}</p>
        <h1 className="display-1 mt-4 text-sand text-balance">{title}</h1>
        <Ornament tone="dark" className="mx-auto mt-6" />

        {description && (
          <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-sand-muted text-pretty sm:text-base">
            {description}
          </p>
        )}

        <nav
          aria-label="Fil d’Ariane"
          className="mt-8 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sand-faint"
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-gold">{breadcrumb ?? title}</span>
        </nav>
      </div>
    </section>
  );
}
