"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/gallery";
import { ease } from "@/lib/motion";

export function Gallery() {
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

  return (
    <section id="galerie" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-gv">
        <SectionHeading
          eyebrow="Galerie"
          title="L’ambiance en images"
          description="Les visuels ci-dessous sont des emplacements : ils accueilleront les photos de GV Express."
        />

        <div className="mt-14 columns-2 gap-4 lg:columns-3 lg:gap-6">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.id}
              delay={Math.min(index * 0.06, 0.3)}
              className="mb-4 break-inside-avoid lg:mb-6"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-[var(--radius-card)] border border-line"
                aria-label={`Agrandir : ${image.caption}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream">
                  {image.caption}
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Fermer la galerie"
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-cream transition-colors hover:border-cream sm:right-8 sm:top-8"
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
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-cream transition-colors hover:border-cream sm:left-8"
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
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-cream transition-colors hover:border-cream sm:right-8"
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
                className="max-h-[74svh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-cream-muted">
                {current.caption}
                <span className="mx-3 text-cream-faint">·</span>
                {(openIndex ?? 0) + 1} / {galleryImages.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
