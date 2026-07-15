"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Navigation, Phone } from "lucide-react";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingButtons() {
  const t = useTranslations("Floating");
  const tc = useTranslations("Common");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Los CTAs flotantes aparecen a partir de la sección que sigue al hero
  // (el hero ya tiene sus propios CTAs). En páginas sin hero (#inicio solo
  // existe en la home) se muestran desde el inicio.
  useEffect(() => {
    const onHeroVisibility = (visible: boolean) => setPastHero(!visible);
    const hero = document.getElementById("inicio");
    if (!hero) {
      onHeroVisibility(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => onHeroVisibility(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // WhatsApp usa su número dedicado (CONTACT_INFO.whatsapp), nunca el
  // principal: CallRail (swap.js) reescribe el número de llamadas mostrado y
  // este botón no debe verse afectado. Tampoco se muestra el número como
  // texto visible — solo el label — para que nadie intente llamarlo.
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(tc("whatsappMessage"))}`;

  const ctaVisibility = pastHero
    ? "translate-y-0 opacity-100"
    : "pointer-events-none translate-y-3 opacity-0";

  return (
    <>
      {/* Volver arriba — lado izquierdo (aparece al hacer scroll) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("backToTop")}
        className={cn(
          "fixed bottom-5 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-deep/10 bg-white text-blue-dark shadow-md transition-all duration-300 hover:bg-sand-bg hover:text-red-accent sm:bottom-6 sm:left-6",
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* CTAs — lado derecho, visibles a partir de la sección después del hero */}
      <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {/* Cómo llegar — círculo en móvil, pastilla con texto en escritorio */}
        <a
          href={CONTACT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("directions")}
          className={cn(
            "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-dark font-heading text-sm font-semibold text-white shadow-lg shadow-blue-deep/30 ring-1 ring-white/10 transition-all duration-300 hover:bg-blue-deep sm:h-12 sm:w-auto sm:gap-2 sm:px-5",
            ctaVisibility,
          )}
        >
          <Navigation className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{t("directions")}</span>
        </a>

        {/* Llamar — círculo en móvil, pastilla con teléfono en escritorio */}
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          aria-label={t("call")}
          className={cn(
            "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-accent font-heading text-sm font-semibold text-white shadow-lg shadow-red-accent/30 ring-1 ring-white/10 transition-all duration-300 hover:bg-red-dark sm:h-12 sm:w-auto sm:gap-2 sm:px-5",
            ctaVisibility,
          )}
        >
          <Phone className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">{CONTACT_INFO.phoneDisplay}</span>
        </a>

        {/* WhatsApp — círculo en móvil, pastilla con label (sin número) en escritorio */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          className={cn(
            "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-whatsapp font-heading text-sm font-semibold text-white shadow-lg shadow-whatsapp/30 ring-1 ring-white/10 transition-all duration-300 hover:bg-whatsapp-dark sm:h-12 sm:w-auto sm:gap-2 sm:px-5",
            ctaVisibility,
          )}
        >
          <WhatsappLogoIcon className="h-5 w-5 shrink-0" weight="fill" />
          <span className="hidden sm:inline">{t("whatsapp")}</span>
        </a>
      </div>
    </>
  );
}
