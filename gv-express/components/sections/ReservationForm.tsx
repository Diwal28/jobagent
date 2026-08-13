"use client";

import { CalendarDays, Clock, MessageCircle, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { ActionButton } from "@/components/ui/Button";
import { restaurant, whatsappUrl } from "@/data/restaurant";
import { cn } from "@/lib/utils";

/**
 * Formulaire de réservation.
 *
 * Il n'y a volontairement AUCUN traitement serveur : la demande
 * part sur WhatsApp, pré-remplie, et c'est le restaurant qui
 * confirme. Le site ne promet donc jamais une réservation
 * automatiquement validée.
 */

/** Créneaux générés à partir des horaires réels, toutes les 30 min. */
function useTimeSlots() {
  return useMemo(() => {
    const slots: string[] = [];
    for (let hour = restaurant.hours.opensAt; hour < restaurant.hours.closesAt; hour += 1) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return slots;
  }, []);
}

const fieldBase =
  "h-12 w-full appearance-none border bg-transparent px-3 text-sm outline-none transition-colors";

type ReservationFormProps = {
  /** `band` = bandeau compact sur fond sombre ; `panel` = formulaire complet. */
  variant?: "band" | "panel";
  className?: string;
};

export function ReservationForm({
  variant = "band",
  className,
}: ReservationFormProps) {
  const slots = useTimeSlots();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const dark = variant === "band";
  const isPanel = variant === "panel";

  const message = useMemo(() => {
    const lines = [
      `Bonjour ${restaurant.name}, je souhaite réserver une table.`,
      date ? `Date : ${date}` : "Date : à confirmer",
      `Heure : ${time}`,
      `Nombre de personnes : ${guests}`,
    ];
    if (name.trim()) lines.push(`Nom : ${name.trim()}`);
    if (notes.trim()) lines.push(`Précisions : ${notes.trim()}`);
    return lines.join("\n");
  }, [date, time, guests, name, notes]);

  const submit = () => {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  const fieldClasses = cn(
    fieldBase,
    dark
      ? "border-line-dark-strong text-sand [color-scheme:dark] focus:border-gold"
      : "border-line-strong text-cocoa focus:border-gold-ink",
  );

  const labelClasses = cn(
    "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
    dark ? "text-sand-faint" : "text-cocoa-faint",
  );

  return (
    <form
      className={cn(
        isPanel
          ? "grid gap-5 sm:grid-cols-2"
          : "grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className={isPanel ? "sm:col-span-1" : ""}>
        <label className={labelClasses} htmlFor="reservation-date">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Date
        </label>
        <input
          id="reservation-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className={cn(fieldClasses, "mt-2")}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="reservation-time">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Heure
        </label>
        <select
          id="reservation-time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className={cn(fieldClasses, "mt-2")}
        >
          {slots.map((slot) => (
            <option key={slot} value={slot} className="bg-ink text-sand">
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses} htmlFor="reservation-guests">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          Personnes
        </label>
        <select
          id="reservation-guests"
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          className={cn(fieldClasses, "mt-2")}
        >
          {["1", "2", "3", "4", "5", "6", "7", "8", "Plus de 8"].map((value) => (
            <option key={value} value={value} className="bg-ink text-sand">
              {value}
            </option>
          ))}
        </select>
      </div>

      {isPanel && (
        <>
          <div>
            <label className={labelClasses} htmlFor="reservation-name">
              Nom
            </label>
            <input
              id="reservation-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Votre nom"
              className={cn(fieldClasses, "mt-2 placeholder:text-cocoa-faint")}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="reservation-notes">
              Précisions (facultatif)
            </label>
            <textarea
              id="reservation-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Occasion, préférences, allergies…"
              className={cn(
                fieldBase,
                "mt-2 h-auto resize-none border-line-strong py-3 text-cocoa placeholder:text-cocoa-faint focus:border-gold-ink",
              )}
            />
          </div>
        </>
      )}

      <div className={cn(isPanel ? "sm:col-span-2" : "flex items-end")}>
        <ActionButton
          type="submit"
          size="lg"
          className={cn("w-full", !isPanel && "lg:w-auto")}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Envoyer la demande
        </ActionButton>
      </div>

      <p
        className={cn(
          "text-[11px] leading-relaxed",
          isPanel ? "sm:col-span-2" : "md:col-span-2 lg:col-span-4",
          dark ? "text-sand-faint" : "text-cocoa-faint",
        )}
      >
        La demande s’ouvre dans WhatsApp, déjà rédigée. La réservation est
        confirmée par le restaurant — par message ou au {restaurant.phone}.
      </p>
    </form>
  );
}
