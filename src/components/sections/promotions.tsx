import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/animations/reveal";
import { Link } from "@/i18n/navigation";
import { PromotionsCarousel } from "@/components/sections/promotions-carousel";
import { CONTACT_INFO, PROMOTIONS } from "@/lib/constants";
import { ctaButton } from "@/lib/button-styles";
import { cn, getLocalizedPromotion } from "@/lib/utils";
import type { Locale } from "@/types";

export async function Promotions() {
  const t = await getTranslations("Promotions");
  const locale = (await getLocale()) as Locale;
  const promos = PROMOTIONS.map((p) => getLocalizedPromotion(p, locale));

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
    <section
      id="promociones"
      aria-labelledby="promociones-heading"
      className="relative scroll-mt-24 overflow-hidden bg-sand-bg py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="cross-pattern pointer-events-none absolute -left-12 -top-12 -z-10 h-64 w-64 text-blue-deep/6"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{t("eyebrow")}</span>
          <h2
            id="promociones-heading"
            className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-dark sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-primary">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-12">
          <PromotionsCarousel
            promos={promos}
            labels={labels}
            contact={contact}
            formHref="/#contacto"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/promociones"
            className={cn(ctaButton({ variant: "primary", size: "md" }))}
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
