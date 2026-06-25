import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/animations/reveal";
import { Link } from "@/i18n/navigation";
import { Contact } from "@/components/sections/contact";
import { FaqSection } from "@/components/sections/faq-section";
import { PromotionsGrid } from "@/components/promotions/promotions-grid";
import { StarRating } from "@/components/shared/star-rating";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { CONTACT_INFO, PROMOTIONS } from "@/lib/constants";
import { PROMO_FAQS } from "@/lib/promo-faqs";
import { getGooglePlaceData } from "@/lib/google-places";
import { getLocalizedPromotion } from "@/lib/utils";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Promotions" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: buildAlternates("/promociones", locale as Locale),
  };
}

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const loc = locale as Locale;

  const [t, th, place] = await Promise.all([
    getTranslations("Promotions"),
    getTranslations("Hero"),
    getGooglePlaceData(),
  ]);

  const promos = PROMOTIONS.map((p) => getLocalizedPromotion(p, loc));
  const labels = {
    viewPromo: t("viewPromo"),
    viewDetail: t("viewDetail"),
    prev: t("prev"),
    next: t("next"),
    swipeHint: t("swipeHint"),
    openAria: t.raw("openAria") as string,
    limitedTime: t("limitedTime"),
    priceLabel: t("priceLabel"),
    includesLabel: t("includesLabel"),
    ctaCall: t("ctaCall"),
    ctaDirections: t("ctaDirections"),
    ctaForm: t("ctaForm"),
    close: t("close"),
  };
  const contact = {
    phone: CONTACT_INFO.phone,
    phoneFormatted: CONTACT_INFO.phoneFormatted,
    address: CONTACT_INFO.address,
    city: CONTACT_INFO.city,
    state: CONTACT_INFO.state,
    googleMapsUrl: CONTACT_INFO.googleMapsUrl,
  };

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", url: absoluteUrl("/", loc) },
          { name: t("pageTitle"), url: absoluteUrl("/promociones", loc) },
        ]}
      />

      {/* Encabezado compacto + badge de reseñas */}
      <section className="relative overflow-hidden border-b border-blue-deep/10 bg-sand-bg py-14 lg:py-20">
        <div
          aria-hidden
          className="cross-pattern pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 text-blue-primary/15 lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-dark transition-colors hover:text-red-accent"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              {t("backToHome")}
            </Link>
            <p className="eyebrow mt-6">{t("eyebrow")}</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl">
              <span className="ink-underline">{t("pageTitle")}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-primary">
              {t("pageSubtitle")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-blue-deep/10 bg-card px-4 py-2 shadow-sm">
              <StarRating rating={place.averageRating} />
              <span className="font-heading font-bold text-slate-dark">
                {place.averageRating.toFixed(1)}
              </span>
              <span className="h-3.5 w-px bg-blue-deep/15" />
              <span className="text-sm font-medium text-slate-muted">
                {th("reviewsBadge", { count: place.totalReviews })}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid de promociones */}
      <section className="bg-background py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PromotionsGrid
            promos={promos}
            labels={labels}
            contact={contact}
            formHref="/promociones#lead-form"
          />
        </div>
      </section>

      <FaqSection items={PROMO_FAQS} />

      {/* Lead form (ancla #lead-form) */}
      <Contact id="lead-form" />
    </>
  );
}
