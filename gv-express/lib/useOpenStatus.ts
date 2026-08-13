"use client";

import { useSyncExternalStore } from "react";

import { isOpenNow } from "./utils";

/** Ré-évalue l’état d’ouverture toutes les minutes. */
function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(timer);
}

/**
 * Indique si le restaurant est ouvert.
 * Retourne `null` au rendu serveur : l’heure du visiteur n’y est
 * pas connue, et cela évite tout écart d’hydratation.
 */
export function useOpenStatus(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    subscribe,
    () => isOpenNow(),
    () => null,
  );
}
