import Image from "next/image";
import {
  Check,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CONTACT_INFO } from "@/lib/constants";
import { getGooglePlaceData } from "@/lib/google-places";
import { StarRating } from "@/components/shared/star-rating";
import { ctaButton } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

export async function Hero() {
  // i18n + reseñas en vivo, en paralelo (sin waterfall).
  const [t, tc, place] = await Promise.all([
    getTranslations("Hero"),
    getTranslations("Common"),
    getGooglePlaceData(),
  ]);

  const features = [
    t("trustBilingual"),
    t("trustWalkIn"),
    t("trustInsurance"),
    t("trustAffordable"),
  ];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden"
    >
      {/* Imagen de fondo a sangre completa */}
      <Image
        src="/images/hero-bg.webp"
        alt="Equipo de Clínica Hispana Nueva Salud Michoacana atendiendo a pacientes en Pasadena, TX"
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[35%_22%]"
      />

      {/* Overlay de marca para legibilidad (degradado oscuro azul) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-linear-to-br from-blue-deep/95 via-blue-dark/85 to-blue-deep/90"
      />
      {/* Oscurecido extra inferior solo en móvil */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-20 h-2/3 bg-linear-to-t from-blue-deep/90 to-transparent md:hidden"
      />
      {/* Glows decorativos suaves */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 -z-20 h-96 w-96 rounded-full bg-blue-soft/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 -z-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl"
      />
      {/* Degradado de transición hacia la siguiente sección (Services es claro) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-linear-to-b from-transparent to-white sm:h-36"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left lg:max-w-2xl">
          {/* Badge de reseñas de Google */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white shadow-sm backdrop-blur-sm">
            <StarRating rating={place.averageRating} />
            <span className="font-heading font-bold">
              {place.averageRating.toFixed(1)}
            </span>
            <span className="h-3.5 w-px bg-white/25" />
            <span className="font-medium text-white/85">
              {tc("ratingSummary", { count: place.totalReviews })}
            </span>
          </span>

          {/* Titular */}
          <h1
            id="hero-heading"
            className="mt-6 font-heading text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("titleLead")}{" "}
            <span className="text-teal-light">{t("titleHighlight")}</span>{" "}
            {t("titleTail")}
          </h1>

          {/* Subtítulo (servicios clave para SEO local) */}
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:mx-0">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              aria-label={`${t("ctaCall")} ${CONTACT_INFO.phoneFormatted}`}
              className={cn(ctaButton({ variant: "red", size: "lg" }))}
            >
              <Phone className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">
                {t("callNow")} · {CONTACT_INFO.phoneDisplay}
              </span>
            </a>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("ctaDirections")} — ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state}`}
              className={cn(ctaButton({ variant: "outlineWhite", size: "lg" }))}
            >
              <Navigation className="h-5 w-5 shrink-0" />
              {t("ctaDirections")}
            </a>
          </div>

          {/* Lista de 4 features con checks */}
          <ul className="mx-auto mt-9 grid max-w-md grid-cols-1 gap-x-6 gap-y-3 text-left sm:grid-cols-2 md:mx-0 md:max-w-none">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm font-medium text-white sm:text-base"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-teal/30 text-teal-light ring-1 ring-inset ring-white/15">
                  <Check className="h-4 w-4" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Tira de ubicación + horario */}
          <div className="mt-9 flex flex-col items-center gap-x-5 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/85 sm:flex-row sm:flex-wrap md:items-start md:justify-start">
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <MapPin className="h-4 w-4 shrink-0 text-teal-light" />
              {CONTACT_INFO.address}, {CONTACT_INFO.city}, {CONTACT_INFO.state}
            </a>
            <span aria-hidden className="hidden h-3.5 w-px bg-white/25 sm:inline-block" />
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-teal-light" />
              {t("hoursLine")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
