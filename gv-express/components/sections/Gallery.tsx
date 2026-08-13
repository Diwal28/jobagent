"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/gallery";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Emprises de la composition éditoriale, par position dans la grille. */
const spanClasses = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

export function Gallery({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback((direction: 1 | -1) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : galleryImages[openIndex];
  const dark = tone === "dark";

  return (
    <section
      id="galerie"
      className={cn("py-16 sm:py-24", dark ? "bg-ink" : "bg-cream-2")}
    >
      <div className="container-gv">
        <SectionHeading
          eyebrow="Galerie"
          title="L’ambiance en images"
          align="center"
          tone={tone}
          description="Les visuels ci-dessous sont des emplacements : ils accueilleront les photos de GV Express."
        />

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.id}
              delay={Math.min(index * 0.06, 0.3)}
              className={cn("relative", spanClasses[index] ?? "")}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block h-full w-full overflow-hidden border border-line"
                aria-label={`Agrandir : ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sand">
                    {image.caption}
                  </span>
                  <Expand
                    className="h-4 w-4 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie — ${current.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/96 p-4 backdrop-blur-xl sm:p-8"
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Fermer la galerie"
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Image précédente"
              className="absolute left-3 flex h-12 w-12 items-center justify-center border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Image suivante"
              className="absolute right-3 flex h-12 w-12 items-center justify-center border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold sm:right-8"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              className="max-h-full w-full max-w-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(max-width: 768px) 92vw, 768px"
                className="max-h-[72svh] w-full object-contain"
              />
              <figcaption className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-sand-muted">
                {current.caption}
                <span className="mx-3 text-sand-faint">·</span>
                {(openIndex ?? 0) + 1} / {galleryImages.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
