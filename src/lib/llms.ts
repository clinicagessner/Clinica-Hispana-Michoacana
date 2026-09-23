import {
  CONTACT_INFO,
  PROMOTIONS,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getAllServices } from "@/lib/services";
import { getServiceFaqs } from "@/lib/service-faqs";
import { HOME_FAQS } from "@/lib/home-faqs";
import { getAllPosts } from "@/lib/blog";
import { getLocalizedFaq, getLocalizedService } from "@/lib/utils";
import type { Locale } from "@/types";

/**
 * `llms.txt` y `llms-full.txt` generados desde el contenido real. Antes eran
 * dos archivos estáticos en `public/`: al reescribir los servicios se quedaron
 * describiendo textos que ya no existían, y encima uno de ellos seguía
 * afirmando que surtimos recetas.
 *
 * Regla: **toda URL va como enlace Markdown**. Una URL suelta no cuenta como
 * enlace y el rastreo agéntico da el archivo por vacío.
 */

const BASE = SITE_CONFIG.baseUrl;

function url(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? `${BASE}/en${clean}` : `${BASE}${clean}`;
}

function link(text: string, path: string, locale: Locale): string {
  return `[${text}](${url(path, locale)})`;
}

function nap(locale: Locale): string {
  const en = locale === "en";
  const wa = CONTACT_INFO.whatsapp;
  const waFormatted = `+${wa.slice(0, 1)} (${wa.slice(1, 4)}) ${wa.slice(4, 7)}-${wa.slice(7)}`;
  return [
    `- ${en ? "Name" : "Nombre"}: ${SITE_CONFIG.name}`,
    `- ${en ? "Address" : "Dirección"}: ${CONTACT_INFO.address}, ${CONTACT_INFO.city}, ${CONTACT_INFO.state} ${CONTACT_INFO.zip}`,
    `- ${en ? "Phone" : "Teléfono"}: ${CONTACT_INFO.phoneDisplay}`,
    `- WhatsApp: [${waFormatted}](https://wa.me/${wa})`,
    `- ${en ? "Email" : "Correo"}: ${CONTACT_INFO.email}`,
    `- ${en ? "Hours" : "Horario"}: ${en ? CONTACT_INFO.hoursEn : CONTACT_INFO.hours}`,
    `- ${en ? "Languages" : "Idiomas"}: ${en ? "Spanish (primary) and English" : "Español (principal) e inglés"}`,
    `- ${en ? "Map" : "Mapa"}: [Google Maps](${CONTACT_INFO.googleMapsUrl})`,
    `- ${en ? "Website" : "Sitio web"}: ${link(SITE_CONFIG.name, "/", locale)}`,
  ].join("\n");
}

function socials(): string {
  return Object.entries(SOCIAL_LINKS)
    .filter(([, href]) => Boolean(href))
    .map(([name, href]) => `- [${name[0].toUpperCase()}${name.slice(1)}](${href})`)
    .join("\n");
}

function services(locale: Locale) {
  return getAllServices()
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((s) => getLocalizedService(s, locale));
}

/** Índice: una línea por página, siempre como enlace Markdown absoluto. */
export function buildLlmsTxt(): string {
  const out: string[] = [];

  out.push(`# ${SITE_CONFIG.name}`);
  out.push("");
  out.push(`> ${SITE_CONFIG.description}`);
  out.push("");

  out.push("## Datos de la clínica / Clinic details");
  out.push("");
  out.push(nap("es"));
  out.push("");

  out.push("## Servicios");
  out.push("");
  for (const s of services("es")) {
    out.push(`- ${link(s.title, `/services/${s.slug}`, "es")} — ${s.description}`);
  }
  out.push("");

  out.push("## Services (English)");
  out.push("");
  for (const s of services("en")) {
    out.push(`- ${link(s.title, `/services/${s.slug}`, "en")} — ${s.description}`);
  }
  out.push("");

  if (PROMOTIONS.length > 0) {
    out.push("## Promociones vigentes / Current promotions");
    out.push("");
    for (const p of PROMOTIONS) {
      out.push(`- ${p.title}${p.price ? ` (${p.price})` : ""} — ${p.blurb}`);
    }
    out.push(`- ${link("Todas las promociones", "/promociones", "es")}`);
    out.push(`- ${link("All promotions", "/promociones", "en")}`);
    out.push("");
  }

  out.push("## Blog");
  out.push("");
  for (const post of getAllPosts("es")) {
    out.push(`- ${link(post.title, `/blog/${post.slug}`, "es")} — ${post.description}`);
  }
  for (const post of getAllPosts("en")) {
    out.push(`- ${link(post.title, `/blog/${post.slug}`, "en")} — ${post.description}`);
  }
  out.push("");

  out.push("## Preguntas frecuentes");
  out.push("");
  for (const faq of HOME_FAQS.map((f) => getLocalizedFaq(f, "es"))) {
    out.push(`- **${faq.question}** ${faq.answer}`);
  }
  out.push("");

  out.push("## Otras páginas / Other pages");
  out.push("");
  out.push(`- ${link("Inicio", "/", "es")} · ${link("Home", "/", "en")}`);
  out.push(
    `- ${link("Todos los servicios", "/services", "es")} · ${link("All services", "/services", "en")}`,
  );
  out.push(
    `- ${link("Atención sin cita", "/walk-in", "es")} · ${link("Walk-in care", "/walk-in", "en")}`,
  );
  out.push(`- ${link("Blog", "/blog", "es")} · ${link("Blog", "/blog", "en")}`);
  out.push(`- [llms-full.txt](${BASE}/llms-full.txt) — contenido completo`);
  out.push(`- [Sitemap](${BASE}/sitemap.xml)`);
  out.push("");

  out.push("## Redes y perfiles");
  out.push("");
  out.push(socials());
  out.push("");

  return out.join("\n");
}

/** Contenido completo en los dos idiomas, para citar sin rastrear el sitio. */
export function buildLlmsFullTxt(): string {
  const out: string[] = [];

  out.push(`# ${SITE_CONFIG.name} — contenido completo`);
  out.push("");
  out.push(nap("es"));
  out.push("");
  out.push(
    `Índice de páginas: [llms.txt](${BASE}/llms.txt). Sitio: ${link(SITE_CONFIG.name, "/", "es")}.`,
  );
  out.push("");
  out.push("---");
  out.push("");

  out.push("## Servicios / Services");
  out.push("");
  for (const locale of ["es", "en"] as const) {
    for (const s of services(locale)) {
      out.push(`### ${s.title}${locale === "en" ? " (EN)" : ""}`);
      out.push("");
      out.push(link(locale === "en" ? "Service page" : "Página del servicio", `/services/${s.slug}`, locale));
      out.push("");
      out.push(s.longDescription);
      out.push("");
      const faqs = getServiceFaqs(s.slug).map((f) => getLocalizedFaq(f, locale));
      for (const faq of faqs) {
        out.push(`**${faq.question}** ${faq.answer}`);
        out.push("");
      }
    }
  }

  out.push("## Promociones / Promotions");
  out.push("");
  for (const p of PROMOTIONS) {
    out.push(`### ${p.title}${p.price ? ` — ${p.price}` : ""}`);
    out.push("");
    out.push(p.blurb);
    out.push("");
    out.push(p.includes.map((i) => `- ${i}`).join("\n"));
    out.push("");
  }
  out.push(`${link("Todas las promociones", "/promociones", "es")}`);
  out.push("");

  out.push("## Blog");
  out.push("");
  for (const locale of ["es", "en"] as const) {
    for (const post of getAllPosts(locale)) {
      out.push(`### ${post.title}`);
      out.push("");
      out.push(link(locale === "en" ? "Read the post" : "Leer el artículo", `/blog/${post.slug}`, locale));
      out.push("");
      out.push(post.description);
      out.push("");
    }
  }

  out.push("## Preguntas frecuentes / FAQ");
  out.push("");
  for (const locale of ["es", "en"] as const) {
    for (const faq of HOME_FAQS.map((f) => getLocalizedFaq(f, locale))) {
      out.push(`**${faq.question}** ${faq.answer}`);
      out.push("");
    }
  }

  return out.join("\n");
}
