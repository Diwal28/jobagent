"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Réglage global du mouvement.
 *
 * `reducedMotion="user"` suit la préférence système : les
 * déplacements et transformations sont neutralisés, les fondus
 * restent. C'est indispensable ici — les composants doivent rendre
 * exactement le même arbre côté serveur et côté client, sinon le
 * style `opacity:0` issu du rendu serveur n'est jamais levé et le
 * contenu reste invisible pour les visiteurs ayant activé
 * « réduire les animations ».
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
