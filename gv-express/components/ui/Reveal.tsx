"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { ease, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retard d'apparition, en secondes. */
  delay?: number;
  /** Déplacement vertical initial. Mettre 0 pour un simple fondu. */
  y?: number;
  as?: "div" | "li" | "section" | "span";
};

/**
 * Apparition au scroll, une seule fois.
 *
 * Les props sont identiques au rendu serveur et au rendu client :
 * c'est `MotionConfig reducedMotion="user"` (voir MotionProvider)
 * qui neutralise le déplacement pour les visiteurs ayant activé
 * « réduire les animations ». Un branchement conditionnel ici
 * laisserait le style `opacity:0` du rendu serveur en place et
 * rendrait le contenu invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: RevealProps) {
  const Component = motion[as];

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
