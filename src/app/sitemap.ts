import type { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES_LAST_REVIEWED } from "@/lib/constants";
import { getAllServiceSlugs } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

const BASE = SITE_CONFIG.baseUrl;

// Fecha de la última edición **de contenido** de cada página estática. Se
// actualiza en el mismo commit que cambia la página. Un `lastmod` con la fecha
// del build miente en cada despliegue y Google deja de fiarse de él justo
// cuando más falta hace, al reescribir el contenido.
const PAGE_DATES: Record<string, string> = {
  "": "2026-09-22", // reseñas reales, horario de la ficha
  "/services": "2026-09-22",
  "/promociones": "2026-09-13",
  "/blog": "2026-09-22",
  "/walk-in": "2026-09-22", // horario del domingo
  // /privacy es noindex: incluirla en el sitemap hace que Search Console la
  // reporte como "excluida por noindex" (problema crítico). No la listamos.
};

// Una <url> por idioma, con alternates recíprocos. Antes solo se listaba la
// versión en español, así que /en no estaba enviado en ningún sitemap.
function entry(path: string, lastModified: Date): MetadataRoute.Sitemap {
  const languages = {
    es: `${BASE}${path}`,
    en: `${BASE}/en${path}`,
    "x-default": `${BASE}${path}`,
  };
  return locales.map((locale) => ({
    url: `${BASE}${locale === "es" ? "" : `/${locale}`}${path}` || BASE,
    lastModified,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.entries(PAGE_DATES).flatMap(([path, date]) =>
    entry(path, new Date(date)),
  );

  const serviceRoutes = getAllServiceSlugs().flatMap((slug) =>
    entry(`/services/${slug}`, new Date(SERVICES_LAST_REVIEWED)),
  );

  const postRoutes = getAllPosts("es").flatMap((post) =>
    entry(`/blog/${post.slug}`, new Date(post.dateModified ?? post.date)),
  );

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
