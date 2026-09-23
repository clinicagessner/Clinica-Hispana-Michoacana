import { SERVICES, SERVICE_CATEGORIES } from "@/lib/constants";
import { getLocalizedService, serviceImagePath } from "@/lib/utils";
import type {
  Locale,
  Service,
  ServiceCardData,
  ServiceCategory,
} from "@/types";

// Servicios que YA tienen foto en /public/images/services/<slug>.webp.
// Vacío por ahora: el cliente entregará las imágenes. Mientras tanto la card
// usa el fallback de icono/CSS. Agregar el slug aquí cuando exista la foto.
const SERVICE_IMAGE_SLUGS = new Set<string>([
  "condiciones-cronicas",
  "tiroides",
  "alergias",
  "enfermedades-respiratorias",
  "examen-fisico-escolar",
  "ginecologia",
  "prueba-embarazo",
  "anticonceptivos",
  "extraccion-implantes",
  "salud-hombre",
  "examenes-sangre",
  "infecciones-urinarias",
  "examen-heces",
  "prueba-strep",
  "prueba-tuberculosis",
  "enfermedades-transmision-sexual",
  "examen-alcohol-drogas",
  "electrocardiograma",
  "ultrasonido",
  "examen-dot",
  "examenes-inmigracion",
  "vacunas",
  "sueros-vitaminados",
  "suturas-heridas",
  "curacion-heridas",
  "cirugias-menores",
  "drenaje-abscesos",
  "unas-encarnadas",
  "farmacia",
]);

export function hasServiceImage(slug: string): boolean {
  return SERVICE_IMAGE_SLUGS.has(slug);
}

export function getCategoryLabel(
  category: ServiceCategory,
  locale: Locale,
): string {
  const cat = SERVICE_CATEGORIES.find((c) => c.value === category);
  if (!cat) return "";
  return locale === "en" ? cat.labelEn : cat.label;
}

export function getAllServices(): Service[] {
  return [...SERVICES].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getHighlightedServices(): Service[] {
  return getAllServices().filter((s) => s.highlighted);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return getAllServices().filter((s) => s.category === category);
}

/**
 * Servicios relacionados: misma categoría primero, completando con otros.
 *
 * La selección **rota** a partir de la posición del servicio actual en vez de
 * cortar siempre por el principio con `slice(0, n)`. Con el corte fijo, los
 * primeros de cada categoría acumulaban todos los enlaces y la cola se quedaba
 * con uno solo: medido con `toolkit/links.mjs`, cuatro servicios tenían 1
 * enlace entrante de contenido. La rotación garantiza el mínimo en lugar de
 * dejarlo al azar del orden.
 */
export function getRelatedServices(slug: string, count = 3): Service[] {
  const all = getAllServices();
  const current = getServiceBySlug(slug);
  if (!current) return all.slice(0, count);

  const sameCategory = all.filter(
    (s) => s.slug !== slug && s.category === current.category,
  );
  const others = all.filter(
    (s) => s.slug !== slug && s.category !== current.category,
  );
  const pool = [...sameCategory, ...others];
  if (pool.length <= count) return pool;

  const start = all.findIndex((s) => s.slug === slug);
  return Array.from(
    { length: count },
    (_, i) => pool[(start + i) % pool.length],
  );
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

/** DTOs ligeros para tarjetas, ya localizados (seguros para el cliente). */
export function getServiceCardData(locale: Locale): ServiceCardData[] {
  return getAllServices().map((s) => {
    const l = getLocalizedService(s, locale);
    return {
      slug: l.slug,
      title: l.title,
      shortDescription: l.shortDescription,
      icon: l.icon,
      category: l.category,
      categoryLabel: getCategoryLabel(l.category, locale),
      image: SERVICE_IMAGE_SLUGS.has(l.slug)
        ? serviceImagePath(l.slug)
        : undefined,
    };
  });
}
