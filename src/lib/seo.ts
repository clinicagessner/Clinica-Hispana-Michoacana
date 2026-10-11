import { SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/types";

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

/** URL absoluta para un path interno en un locale (es sin prefijo). */
export function absoluteUrl(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_CONFIG.baseUrl}${localePrefix(locale)}${clean}`;
}

/**
 * Bloque alternates para generateMetadata: canonical del locale actual
 * + hreflang es / en / x-default. El español nunca lleva prefijo.
 */
export function buildAlternates(path: string, locale: Locale) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      es: `${SITE_CONFIG.baseUrl}${clean}`,
      en: `${SITE_CONFIG.baseUrl}/en${clean}`,
      "x-default": `${SITE_CONFIG.baseUrl}${clean}`,
    },
  };
}

/**
 * Bloque openGraph + twitter para una página. El `openGraph` de la página
 * REEMPLAZA entero al del layout: sin `images` aquí, los 29 servicios salían
 * sin imagen social.
 */
export function buildSocial({
  title,
  description,
  path,
  locale,
  type = "website",
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const url = absoluteUrl(path, locale);
  const img = image ?? SITE_CONFIG.ogImage;
  return {
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: SITE_CONFIG.name,
      locale: locale === "en" ? "en_US" : "es_MX",
      images: [{ url: img, alt: imageAlt ?? title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [img],
    },
  };
}

// <title> de los servicios con la ciudad (análisis diario 2026-10-11). Los H1 no cambian.
// Landings de Google Ads (RED.md: ginecologia, infecciones-urinarias) fuera: su <title> no se toca sin aprobación.
export const SERVICE_META_TITLES: Record<string, Record<Locale, string>> = {
  "condiciones-cronicas": { es: "Control de Diabetes, Presión y Colesterol en Pasadena, TX", en: "Diabetes, Blood Pressure & Cholesterol Care in Pasadena, TX" },
  "tiroides": { es: "Exámenes de Tiroides y Tratamiento en Pasadena, TX", en: "Thyroid Testing & Treatment in Pasadena, TX" },
  "alergias": { es: "Exámenes y Tratamiento de Alergias en Pasadena, TX", en: "Allergy Testing & Treatment in Pasadena, TX" },
  "enfermedades-respiratorias": { es: "Prueba de Flu y COVID en Pasadena, TX, Sin Cita", en: "Flu & COVID Testing in Pasadena, TX, Walk-In" },
  "examen-fisico-escolar": { es: "Físicos Escolares y Deportivos en Pasadena, TX", en: "School & Sports Physicals in Pasadena, TX" },
  "prueba-embarazo": { es: "Prueba de Embarazo en Pasadena, TX, Sin Cita", en: "Pregnancy Test in Pasadena, TX, Walk-In" },
  "anticonceptivos": { es: "Métodos Anticonceptivos en Pasadena, TX", en: "Birth Control Methods in Pasadena, TX" },
  "extraccion-implantes": { es: "Retiro de Implante Anticonceptivo en Pasadena, TX", en: "Birth Control Implant Removal in Pasadena, TX" },
  "salud-hombre": { es: "Salud del Hombre: PSA y Perfil Hormonal en Pasadena", en: "Men's Health: PSA & Hormone Panel in Pasadena, TX" },
  "examenes-sangre": { es: "Análisis de Sangre y Laboratorio en Pasadena, TX", en: "Blood Tests & Lab Work in Pasadena, TX" },
  "examen-heces": { es: "Examen de Heces en Pasadena, TX", en: "Stool Test in Pasadena, TX" },
  "prueba-strep": { es: "Prueba de Estreptococo (Strep) en Pasadena, TX", en: "Strep Test in Pasadena, TX, Walk-In" },
  "prueba-tuberculosis": { es: "Prueba de Tuberculosis (TB) en Pasadena, TX", en: "Tuberculosis (TB) Test in Pasadena, TX" },
  "enfermedades-transmision-sexual": { es: "Pruebas de ETS (STD) Confidenciales en Pasadena, TX", en: "Confidential STD Testing in Pasadena, TX" },
  "examen-alcohol-drogas": { es: "Examen de Alcohol y Drogas en Pasadena, TX", en: "Alcohol & Drug Testing in Pasadena, TX" },
  "electrocardiograma": { es: "Electrocardiograma (EKG) en Pasadena, TX", en: "Electrocardiogram (EKG) in Pasadena, TX" },
  "ultrasonido": { es: "Ultrasonido y Ecografía en Pasadena, TX", en: "Ultrasound & Sonography in Pasadena, TX" },
  "examen-dot": { es: "Examen Físico DOT para CDL en Pasadena, TX", en: "DOT Physical Exam for CDL in Pasadena, TX" },
  "examenes-inmigracion": { es: "Examen Médico de Inmigración I-693 en Pasadena, TX", en: "I-693 Immigration Medical Exam in Pasadena, TX" },
  "vacunas": { es: "Vacunas de Influenza y Tétano en Pasadena, TX", en: "Flu & Tetanus (Tdap) Vaccines in Pasadena, TX" },
  "sueros-vitaminados": { es: "Sueros Vitaminados (Terapia IV) en Pasadena, TX", en: "Vitamin IV Therapy in Pasadena, TX" },
  "suturas-heridas": { es: "Suturas de Heridas Sin Cita en Pasadena, TX", en: "Walk-In Wound Stitches in Pasadena, TX" },
  "curacion-heridas": { es: "Curación de Heridas en Pasadena, TX", en: "Wound Care in Pasadena, TX" },
  "cirugias-menores": { es: "Cirugías Menores: Lunares y Quistes en Pasadena, TX", en: "Minor Surgery: Moles & Cysts in Pasadena, TX" },
  "drenaje-abscesos": { es: "Drenaje de Abscesos en Pasadena, TX", en: "Abscess Drainage in Pasadena, TX" },
  "unas-encarnadas": { es: "Uña Encarnada: Extracción en Pasadena, TX", en: "Ingrown Toenail Removal in Pasadena, TX" },
  "farmacia": { es: "Farmacia dentro de la Clínica en Pasadena, TX", en: "In-Clinic Pharmacy in Pasadena, TX" },
};
