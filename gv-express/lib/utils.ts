import { restaurant } from "@/data/restaurant";

/** Concatène des classes conditionnelles sans dépendance externe. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formate un prix en francs CFA.
 * Retourne `null` si le prix n’a pas été communiqué : l’interface
 * affiche alors une mention explicite plutôt qu’un faux montant.
 */
export function formatPrice(price: number | null): string | null {
  if (price === null) return null;
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

/**
 * Indique si le restaurant est ouvert à l’instant T.
 * Calculé sur le fuseau de Dakar (UTC+0, sans changement d’heure)
 * afin d’être juste quel que soit le fuseau du visiteur.
 */
export function isOpenNow(date: Date = new Date()): boolean {
  const { opensAt, closesAt, utcOffset } = restaurant.hours;
  const localHours = (date.getUTCHours() + utcOffset + 24) % 24;
  const localMinutes = date.getUTCMinutes();
  const current = localHours + localMinutes / 60;
  return current >= opensAt && current < closesAt;
}
