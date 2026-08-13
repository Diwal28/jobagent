"use client";

import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { ActionButton } from "@/components/ui/Button";
import { restaurant, whatsappUrl } from "@/data/restaurant";
import { cn } from "@/lib/utils";

const subjects = [
  "Passer une commande",
  "Réserver une table",
  "Poser une question",
  "Autre demande",
];

const field =
  "mt-2 w-full border border-line-strong bg-transparent px-3 py-3 text-sm text-cocoa outline-none transition-colors placeholder:text-cocoa-faint focus:border-gold-ink";

const label =
  "text-[10px] font-semibold uppercase tracking-[0.18em] text-cocoa-faint";

/**
 * Formulaire de contact.
 *
 * Aucun envoi serveur, aucune boîte mail : le message est composé
 * puis ouvert dans WhatsApp. Le site ne prétend donc jamais avoir
 * enregistré une demande.
 */
export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(subjects[0] ?? "");
  const [message, setMessage] = useState("");

  const composed = useMemo(() => {
    const lines = [`Bonjour ${restaurant.name},`];
    if (subject) lines.push(`Objet : ${subject}`);
    if (message.trim()) lines.push(message.trim());
    if (name.trim()) lines.push(`— ${name.trim()}`);
    return lines.join("\n");
  }, [name, subject, message]);

  return (
    <form
      className={cn("space-y-5", className)}
      onSubmit={(event) => {
        event.preventDefault();
        window.open(whatsappUrl(composed), "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="contact-name">
            Votre nom
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nom et prénom"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="contact-subject">
            Objet
          </label>
          <select
            id="contact-subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={cn(field, "appearance-none")}
          >
            {subjects.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="contact-message">
          Votre message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          placeholder="Écrivez votre demande…"
          className={cn(field, "resize-none")}
        />
      </div>

      <ActionButton type="submit" size="lg" className="w-full sm:w-auto">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Envoyer sur WhatsApp
      </ActionButton>

      <p className="text-[11px] leading-relaxed text-cocoa-faint">
        Le message s’ouvre dans WhatsApp, déjà rédigé. Vous pouvez aussi appeler
        le {restaurant.phone} aux horaires d’ouverture.
      </p>
    </form>
  );
}
