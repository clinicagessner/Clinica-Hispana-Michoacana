import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Promotions } from "@/components/sections/promotions";
import { Services } from "@/components/sections/services";
import { Gynecology } from "@/components/sections/gynecology";
import { MensHealth } from "@/components/sections/mens-health";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Faq } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";
import { Contact } from "@/components/sections/contact";
import { ScrollSpy } from "@/components/shared/scroll-spy";
import { CONTACT_INFO } from "@/lib/constants";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/types";

// Orden de las secciones en el DOM, para el scroll-spy que actualiza la URL.
const SECTION_IDS = [
  "inicio",
  "promociones",
  "servicios",
  "ginecologia",
  "salud-hombre",
  "testimonios",
  "blog",
  "preguntas",
  "ubicacion",
  "contacto",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  // Search Console: la gente busca por el nombre ("clinica michoacana",
  // "clinica la michoacana cerca de mi") y el title anterior no lo incluía,
  // lo que daba 0 clics en top 10. El nombre va primero y la description
  // lleva los ganchos de decisión (sin cita, sin seguro, horario, teléfono).
  return {
    title: isEn
      ? "Clínica Hispana Nueva Salud Michoacana | Walk-in Clinic in Pasadena, TX"
      : "Clínica Hispana Nueva Salud Michoacana | Sin Cita en Pasadena, TX",
    description: isEn
      ? `Hispanic clinic in Pasadena, TX. Walk-ins welcome, no insurance needed, care in Spanish. Blood tests, physicals, immigration exams and more. Open daily 9 AM–9 PM. Call ${CONTACT_INFO.phoneDisplay}.`
      : `Clínica hispana en Pasadena, TX. Sin cita, sin seguro y 100% en español. Análisis de sangre, exámenes físicos, inmigración y más. Abierto todos los días de 9 AM a 9 PM. Llama al ${CONTACT_INFO.phoneDisplay}.`,
    alternates: buildAlternates("/", locale as Locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <ScrollSpy ids={SECTION_IDS} />
      <Hero />
      <Promotions />
      <Services />
      <Gynecology />
      <MensHealth />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <Location />
      <Contact />
    </>
  );
}
