import type { Transition, Variants } from "framer-motion";

/**
 * Courbe d’accélération unique du projet : lente au départ,
 * relâchée à la fin. Utilisée partout pour garder une signature
 * de mouvement cohérente.
 */
export const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Apparition verticale discrète, réutilisée par toutes les sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Apparition sans déplacement (titres longs, images pleine largeur). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease } },
};

/** Conteneur qui décale l’apparition de ses enfants. */
export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren, staggerChildren },
    },
  };
}

/** Réglage commun d’entrée au scroll : une seule fois, assez tôt. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
