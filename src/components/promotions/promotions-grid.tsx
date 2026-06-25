"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PromotionDialog,
  type PromotionContact,
  type PromotionLabels,
} from "@/components/promotions/promotion-dialog";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import type { LocalizedPromotion } from "@/types";

/**
 * Grid compacto de promociones (página /promociones). Cada card abre el mismo
 * PromotionDialog. Soporta deep-link /promociones#<slug>: limpia el hash de
 * inmediato (replaceState síncrono ANTES de abrir) para que cerrar no reabra.
 */
export function PromotionsGrid({
  promos,
  labels,
  contact,
  formHref,
}: {
  promos: LocalizedPromotion[];
  labels: PromotionLabels;
  contact: PromotionContact;
  formHref: string;
}) {
  const [selected, setSelected] = useState<LocalizedPromotion | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const promo = promos.find((p) => p.slug === hash);
    if (!promo) return;
    // Limpia el hash ANTES de abrir, para que cerrar el modal no lo reabra.
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    // Difiere el setState fuera del cuerpo del efecto (deep-link de una sola vez).
    queueMicrotask(() => setSelected(promo));
  }, [promos]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {promos.map((promo) => (
          <article
            key={promo.slug}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-blue-deep/10 bg-card shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-blue-deep/10"
          >
            <button
              type="button"
              onClick={() => setSelected(promo)}
              aria-label={labels.openAria.replace("{name}", promo.title)}
              className="group relative block aspect-4/5 w-full overflow-hidden"
            >
              <Image
                src={promo.image}
                alt={promo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-heading font-bold text-slate-dark">
                {promo.title}
              </h2>
              {promo.price && (
                <p className="mt-1 font-heading text-2xl font-extrabold text-red-accent">
                  {promo.price}
                </p>
              )}
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-primary">
                {promo.blurb}
              </p>
              <button
                type="button"
                onClick={() => setSelected(promo)}
                className={cn(
                  ctaButton({ variant: "primary", size: "sm" }),
                  "mt-4 w-full",
                )}
              >
                {labels.viewDetail}
              </button>
            </div>
          </article>
        ))}
      </div>

      <PromotionDialog
        promo={selected}
        labels={labels}
        contact={contact}
        formHref={formHref}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
