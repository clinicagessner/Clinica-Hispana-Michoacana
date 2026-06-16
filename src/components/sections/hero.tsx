import Image from "next/image";
import { Check, Clock, Navigation, Phone, ShieldCheck, Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CONTACT_INFO } from "@/lib/constants";
import { getGooglePlaceData } from "@/lib/google-places";
import { StarRating } from "@/components/shared/star-rating";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export async function Hero() {
  const t = await getTranslations("Hero");
  const tc = await getTranslations("Common");
  const place = await getGooglePlaceData();

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-sky-bg via-white to-teal-bg/50">
      {/* Acentos decorativos suaves */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-blue-soft/20 blur-3xl"
      />
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute right-0 top-1/3 -z-10 h-72 w-72 text-blue-deep/5"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* ── Columna de contenido ── */}
        <div className="order-2 lg:order-1">
          {/* Pill de estado */}
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-deep/10 bg-white px-4 py-1.5 text-sm font-semibold text-slate-dark shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t("openToday")}
            <span className="h-3.5 w-px bg-blue-deep/15" />
            <span className="font-medium text-slate-muted">
              {CONTACT_INFO.city}, {CONTACT_INFO.state}
            </span>
          </span>

          {/* Titular */}
          <h1 className="mt-6 font-heading text-[2.7rem] font-extrabold leading-none tracking-tight text-slate-dark sm:text-5xl lg:text-6xl">
            {t("titleLead")}{" "}
            <span className="text-blue-primary">{t("titleHighlight")}</span>
            <span className="mt-3 block text-2xl font-semibold text-slate-primary sm:text-3xl">
              {t("titleTail")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-primary">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              aria-label={`${t("ctaCall")} ${CONTACT_INFO.phoneFormatted}`}
              className={cn(ctaButton({ variant: "red", size: "lg" }))}
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">
                {t("callShort")} · {CONTACT_INFO.phoneDisplay}
              </span>
            </a>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(ctaButton({ variant: "outline", size: "lg" }))}
            >
              <Navigation className="h-5 w-5 shrink-0" />
              {t("ctaDirections")}
            </a>
          </div>

          {/* Chips de confianza */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-primary">
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal-bg text-teal-deep">
                <Check className="h-4 w-4" />
              </span>
              {t("trustWalkIn")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal-bg text-teal-deep">
                <ShieldCheck className="h-4 w-4" />
              </span>
              {t("trustInsurance")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal-bg text-teal-deep">
                <Languages className="h-4 w-4" />
              </span>
              {t("trustBilingual")}
            </span>
          </div>

          {/* Línea de horario */}
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-muted">
            <Clock className="h-4 w-4 text-blue-primary" />
            {t("hoursLine")}
          </p>
        </div>

        {/* ── Columna de imagen (showcase) ── */}
        <div className="relative order-1 lg:order-2">
          {/* Bloque de acento detrás de la foto */}
          <div
            aria-hidden
            className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-4xl bg-linear-to-br from-blue-primary/15 to-teal/15 lg:block"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-white shadow-2xl shadow-blue-deep/15">
            <Image
              src="/images/hero-bg.webp"
              alt="Rótulo de Clínica Hispana Nueva Salud Michoacana en su consultorio de Pasadena, TX"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-video w-full object-cover"
            />
          </div>

          {/* Tarjeta de rating flotante */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-blue-deep/5 bg-white px-4 py-3 shadow-xl shadow-blue-deep/15 sm:left-6">
            <span className="font-heading text-3xl font-extrabold leading-none text-slate-dark">
              {place.averageRating.toFixed(1)}
            </span>
            <span className="flex flex-col gap-0.5">
              <StarRating rating={place.averageRating} />
              <span className="text-xs font-medium text-slate-muted">
                {tc("ratingSummary", { count: place.totalReviews })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
