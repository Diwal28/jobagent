"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { ease, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retard d’apparition, en secondes. */
  delay?: number;
  /** Déplacement vertical initial. Mettre 0 pour un simple fondu. */
  y?: number;
  as?: "div" | "li" | "section" | "span";
};

/**
 * Apparition au scroll, une seule fois.
 * Respecte `prefers-reduced-motion` : le contenu est alors affiché
 * immédiatement, sans déplacement.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Component>
  );
}
