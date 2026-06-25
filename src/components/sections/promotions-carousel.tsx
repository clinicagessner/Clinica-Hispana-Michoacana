"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PromotionDialog,
  type PromotionContact,
  type PromotionLabels,
} from "@/components/promotions/promotion-dialog";
import type { LocalizedPromotion } from "@/types";

/**
 * Carrusel deslizable de flyers. Al hacer clic en uno se abre el
 * PromotionDialog SOBRE la home (estado local; no navega). Autoplay con pausa
 * en hover/focus y respeto a prefers-reduced-motion; flechas accesibles.
 */
export function PromotionsCarousel({
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      emblaApi.plugins().autoplay?.stop();
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y py-2">
          {promos.map((promo) => (
            <div
              key={promo.slug}
              className="min-w-0 shrink-0 grow-0 basis-[82%] px-2.5 sm:basis-1/2 lg:basis-1/3"
            >
              <button
                type="button"
                onClick={() => setSelected(promo)}
                aria-label={labels.openAria.replace("{name}", promo.title)}
                className="group block w-full overflow-hidden rounded-3xl border border-blue-deep/10 bg-card text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-deep/10"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.alt}
                    fill
                    sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-linear-to-t from-blue-deep/85 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {labels.viewPromo}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pista + flechas */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-muted sm:hidden">{labels.swipeHint}</p>
        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label={labels.prev}
            className="grid h-11 w-11 place-items-center rounded-full border border-blue-deep/15 bg-card text-blue-dark transition-colors hover:bg-sky-bg hover:text-red-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label={labels.next}
            className="grid h-11 w-11 place-items-center rounded-full border border-blue-deep/15 bg-card text-blue-dark transition-colors hover:bg-sky-bg hover:text-red-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary focus-visible:ring-offset-2"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <PromotionDialog
        promo={selected}
        labels={labels}
        contact={contact}
        formHref={formHref}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
