"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Navigation, Phone, X } from "lucide-react";
import { ScrollLink } from "@/components/shared/scroll-link";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { LocalizedPromotion } from "@/types";

export interface PromotionLabels {
  viewPromo: string;
  viewDetail: string;
  prev: string;
  next: string;
  swipeHint: string;
  openAria: string;
  limitedTime: string;
  priceLabel: string;
  includesLabel: string;
  ctaCall: string;
  ctaDirections: string;
  ctaForm: string;
  close: string;
}

export interface PromotionContact {
  phone: string;
  phoneFormatted: string;
  address: string;
  city: string;
  state: string;
  googleMapsUrl: string;
}

/**
 * Modal de detalle de una promoción. Una sola columna scrollable en todos los
 * tamaños (la imagen no se recorta). Cerrar SOLO invoca onClose; nunca navega.
 */
export function PromotionDialog({
  promo,
  labels,
  contact,
  formHref,
  onClose,
}: {
  promo: LocalizedPromotion | null;
  labels: PromotionLabels;
  contact: PromotionContact;
  formHref: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!promo) return;
    // Enfoca el botón cerrar al abrir.
    closeRef.current?.focus();
    // Bloquea el scroll del body mientras está abierto.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Cerrar con Escape.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [promo, onClose]);

  if (!promo) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label={labels.close}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-blue-deep/70 backdrop-blur-sm"
      />

      {/* Panel: una columna scrollable */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-dialog-title"
        className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-3xl bg-card shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-blue-deep/60 text-white backdrop-blur transition-colors hover:bg-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {/* Flyer completo (sin recorte) */}
        <div className="relative aspect-4/5 w-full shrink-0">
          <Image
            src={promo.image}
            alt={promo.alt}
            fill
            sizes="(max-width: 480px) 100vw, 28rem"
            className="object-cover"
          />
        </div>

        {/* Detalle */}
        <div className="flex flex-col p-6">
          <h2
            id="promo-dialog-title"
            className="font-heading text-2xl font-bold text-slate-dark"
          >
            {promo.title}
          </h2>

          {promo.price && (
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
                {labels.priceLabel}
              </span>
              <span className="font-heading text-3xl font-extrabold text-red-accent">
                {promo.price}
              </span>
            </p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-slate-primary">
            {promo.blurb}
          </p>

          <p className="mt-5 text-sm font-semibold text-slate-dark">
            {labels.includesLabel}
          </p>
          <ul className="mt-2 space-y-2">
            {promo.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-slate-primary"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>

          {/* 3 CTAs */}
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={`tel:${contact.phone}`}
              aria-label={`${labels.ctaCall} — ${promo.title} ${contact.phoneFormatted}`}
              className={cn(ctaButton({ variant: "red", size: "sm" }), "w-full")}
            >
              <Phone className="h-4 w-4 shrink-0" />
              {labels.ctaCall}
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labels.ctaDirections} — ${contact.address}, ${contact.city}, ${contact.state}`}
                className={cn(ctaButton({ variant: "outline", size: "sm" }))}
              >
                <Navigation className="h-4 w-4 shrink-0" />
                {labels.ctaDirections}
              </a>
              <ScrollLink
                href={formHref}
                onNavigate={onClose}
                className={cn(ctaButton({ variant: "primary", size: "sm" }))}
              >
                {labels.ctaForm}
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
