import { useLocale } from "next-intl";
import { Reveal } from "@/components/animations/reveal";
import { ENTITY_BLOCK } from "@/lib/constants";
import type { Locale } from "@/types";

/**
 * Bloque de definición de entidad (§B1): quién es la clínica, dónde, cuándo
 * abre y qué resuelve, en hechos verificables. Es el párrafo que los motores
 * de IA citan literalmente, así que va en texto plano y sin publicidad.
 */
export function AboutClinic() {
  const locale = useLocale() as Locale;
  const en = locale === "en";
  const body = en ? ENTITY_BLOCK.bodyEn : ENTITY_BLOCK.body;

  return (
    <section
      id="sobre-la-clinica"
      aria-labelledby="sobre-la-clinica-heading"
      className="scroll-mt-24 bg-background py-16 lg:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="sobre-la-clinica-heading"
            className="font-heading text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl"
          >
            {en ? ENTITY_BLOCK.titleEn : ENTITY_BLOCK.title}
          </h2>
          <div className="mt-6 space-y-4">
            {body.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-slate-primary sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
