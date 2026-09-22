import type {
  NavLink,
  Promotion,
  Service,
  ServiceCategory,
} from "@/types";

// Normaliza la URL del sitio: añade https:// si falta el esquema y quita la
// barra final. Evita que un valor mal puesto en la env (p. ej.
// "clinicamedicamichoacana.com" sin https) rompa `new URL()` en el build.
function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withScheme.replace(/\/+$/, "");
}

const SITE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clinicamedicamichoacana.com",
);

export const SITE_CONFIG = {
  name: "Clínica Hispana Nueva Salud Michoacana",
  shortName: "Nueva Salud Michoacana",
  tagline: "Atención médica 100% en español en Pasadena, TX",
  taglineEn: "Healthcare 100% in Spanish in Pasadena, TX",
  description:
    "Clínica hispana y centro médico en Pasadena, TX, en el área de Houston. Atención profesional en español, sin cita previa y con precios accesibles. No necesitas seguro médico. Médico primario, medicina familiar, análisis de sangre, laboratorio y más.",
  descriptionEn:
    "Hispanic clinic and medical center in Pasadena, TX, in the Houston area. Professional care in Spanish, walk-ins welcome, no insurance needed. Primary care, family medicine, blood tests, lab work and more.",
  baseUrl: SITE_URL,
  locale: "es-MX",
  // Nombre exacto de la ficha de Google (va como alternateName en el schema).
  gbpName: "Clínica Hispana Nueva Salud Michoacana",
  // Fecha de apertura declarada en la ficha: solo el año, el 1-ene es relleno.
  foundingYear: "2010",
  logoUrl: "/logo-nueva-salud.webp",
  ogImage: "/images/og/og-default.png",
} as const;

export const CONTACT_INFO = {
  address: "6500 Spencer Hwy Ste 180",
  city: "Pasadena",
  state: "TX",
  zip: "77505",
  phone: "+18326177439",
  phoneFormatted: "+1 (832) 617-7439",
  phoneDisplay: "(832) 617-7439",
  // WhatsApp — número EXCLUSIVO para chat. Nunca usarlo en tel:, NAP ni
  // schema: el teléfono de llamadas sigue siendo `phone` (CallRail hace swap
  // solo sobre ese). No derivar este enlace de `phone`: son números distintos.
  // Es el WhatsApp de la ficha de Google (confirmado 2026-09-22) y lo comparten
  // otras clínicas Nueva Salud: por eso `whatsappMessage` nombra clínica y calle.
  whatsapp: "18328314016", // E.164 sin "+", listo para wa.me
  whatsappDisplay: "(832) 831-4016",
  email: "clinicanuevasaludmichuacana@gmail.com",
  hours: "Lunes a Sábado: 9:00 AM - 9:00 PM · Domingo: 9:00 AM - 7:00 PM",
  hoursEn: "Monday to Saturday: 9:00 AM - 9:00 PM · Sunday: 9:00 AM - 7:00 PM",
  hoursWeekday: "Lunes a Viernes: 9:00 AM - 9:00 PM",
  hoursWeekend: "Sábado: 9:00 AM - 9:00 PM · Domingo: 9:00 AM - 7:00 PM",
  hoursWeekendEn: "Sat: 9:00 AM - 9:00 PM · Sun: 9:00 AM - 7:00 PM",
  // Coordenadas aproximadas del plus code MV76+MG (Pasadena). TODO(verificar
  // contra el Place real con Text Search a Places API New antes de producción).
  coordinates: { lat: 29.6641, lng: -95.1385 },
  // Place ID real verificado con Text Search a Places API (New): coincide en
  // nombre, dirección y rating (4.8/249) con el Google Business Profile.
  googlePlaceId: "ChIJOa_WwTWfQIYRXsupNvjnet0",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=6500+Spencer+Hwy+Ste+180%2C+Pasadena%2C+TX+77505&query_place_id=ChIJOa_WwTWfQIYRXsupNvjnet0",
  // Enlace directo al cuadro de "escribir reseña" de Google (Place ID real).
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJOa_WwTWfQIYRXsupNvjnet0",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=6500+Spencer+Hwy+Ste+180,+Pasadena,+TX+77505&t=m&z=16&ie=UTF8&iwloc=&output=embed",
} as const;

// Horario estructurado para JSON-LD (openingHoursSpecification).
// Última revisión de contenido de las páginas de servicio (lastmod del sitemap).
// Se toca en el mismo commit que cambia el texto de los servicios.
export const SERVICES_LAST_REVIEWED = "2026-09-22";

// Zonas que atiende la clínica. La ficha solo declara Pasadena; el resto sale
// de la descripción de la ficha, que las nombra una a una.
export const AREAS_SERVED = [
  "Pasadena",
  "Deer Park",
  "La Porte",
  "South Houston",
  "Houston",
] as const;

export const OPENING_HOURS = [
  { day: "Monday", opens: "09:00", closes: "21:00" },
  { day: "Tuesday", opens: "09:00", closes: "21:00" },
  { day: "Wednesday", opens: "09:00", closes: "21:00" },
  { day: "Thursday", opens: "09:00", closes: "21:00" },
  { day: "Friday", opens: "09:00", closes: "21:00" },
  { day: "Saturday", opens: "09:00", closes: "21:00" },
  { day: "Sunday", opens: "09:00", closes: "19:00" },
] as const;

// Perfiles confirmados por el cliente. (El footer oculta cualquiera que quede
// vacío.) El handle de Facebook es "buenavida" a propósito, según el cliente.
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/clinicabuenavidapasadenatx",
  instagram: "https://www.instagram.com/clinicanuevasaludmichoacana/",
} as const;

// Fallback de build para rating/reseñas (comprobado con Places API el
// 2026-09-22: 4.8 · 288). La data en vivo la trae getGooglePlaceData() cuando hay
// GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID.
export const GOOGLE_REVIEWS_DATA = {
  averageRating: 4.8,
  totalReviews: 288,
} as const;

// Promociones de la clínica (flyers en /images/promotions/<slug>.webp).
// Misma fuente para el carrusel de la home y la página /promociones.
// Copy factual (sin claims médicos exagerados) para compliance de Google Ads salud.
export const PROMOTIONS: Promotion[] = [
  {
    slug: "chequeo-general-completo",
    title: "Chequeo General Completo",
    titleEn: "Complete General Checkup",
    price: "$99",
    blurb:
      "Cuídate hoy, vive mejor mañana. Chequeo general completo con consulta médica gratis por solo $99 (valor regular $250). Resultados rápidos y atención personalizada en español.",
    blurbEn:
      "Take care of yourself today, live better tomorrow. Complete general checkup with a free medical consultation for only $99 (regular value $250). Fast results and personalized care in Spanish.",
    includes: [
      "Examen general de sangre",
      "A1C (hemoglobina glicosilada)",
      "Examen general de orina",
      "Consulta médica gratis",
    ],
    includesEn: [
      "Complete blood panel",
      "A1C (glycated hemoglobin)",
      "Complete urine test",
      "Free medical consultation",
    ],
    alt: "Promoción Chequeo General Completo por $99 con consulta médica gratis en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Complete General Checkup promotion for $99 with a free medical consultation at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
  {
    slug: "salud-intima-femenina",
    title: "Salud Íntima Femenina",
    titleEn: "Women's Intimate Health",
    price: "$69",
    blurb:
      "¿Picazón, flujo o mal olor? No lo ignores: pueden ser señales de una infección. Te atendemos con privacidad y en español, con consulta médica incluida.",
    blurbEn:
      "Itching, discharge or odor? Don't ignore it: these can be signs of an infection. We care for you privately and in Spanish, with a medical consultation included.",
    includes: ["Cultivo íntimo", "Consulta médica", "Examen de orina gratis"],
    includesEn: [
      "Intimate culture",
      "Medical consultation",
      "Free urine test",
    ],
    alt: "Promoción Salud Íntima Femenina por $69 en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Women's Intimate Health promotion for $69 at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
  {
    slug: "perfil-hormonal-hombres",
    title: "Perfil Hormonal para Hombres",
    titleEn: "Men's Hormone Panel",
    price: "$200",
    blurb:
      "Evalúa tu salud hormonal masculina: fatiga, pérdida de masa muscular, baja libido, problemas de sueño y más, con resultados confiables y atención profesional.",
    blurbEn:
      "Evaluate your male hormonal health: fatigue, muscle loss, low libido, sleep problems and more, with reliable results and professional care.",
    includes: [
      "Perfil hormonal masculino completo",
      "Resultados precisos y confiables",
      "Atención profesional",
    ],
    includesEn: [
      "Complete male hormone panel",
      "Precise, reliable results",
      "Professional care",
    ],
    alt: "Promoción Perfil Hormonal Masculino por $200 en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Men's Hormone Panel promotion for $200 at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
  {
    slug: "general-sangre-vitamina-b12",
    title: "Inyección de Vitamina B12 + General de Sangre",
    titleEn: "Vitamin B12 Injection + Blood Panel",
    price: "$99",
    blurb:
      "Inyección de vitamina B12 más examen general de sangre por $99. Ideal si tienes cansancio, hormigueo o poca energía: medimos tu nivel y aplicamos la inyección el mismo día.",
    blurbEn:
      "Vitamin B12 injection plus a complete blood panel for $99. Ideal if you feel tired, have tingling or low energy: we check your level and give the shot the same day.",
    includes: [
      "Examen general de sangre",
      "Inyección de Vitamina B12",
      "Más energía y bienestar",
    ],
    includesEn: [
      "Complete blood panel",
      "Vitamin B12 injection",
      "More energy and wellbeing",
    ],
    alt: "Promoción especial General de Sangre más inyección de Vitamina B12 por $99 en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Special promotion: complete blood panel plus a Vitamin B12 injection for $99 at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
  {
    slug: "examen-testosterona",
    title: "Examen de Testosterona",
    titleEn: "Testosterone Test",
    price: "$79",
    blurb:
      "¿Cansado, con menos energía o menos deseo sexual? Revisa tu testosterona: examen de testosterona más examen de orina, con consulta médica gratis, por solo $79 (precio regular $220).",
    blurbEn:
      "Tired, low on energy or with less sexual desire? Check your testosterone: testosterone test plus a urine test, with a free medical consultation, for only $79 (regular price $220).",
    includes: [
      "Examen de testosterona",
      "Examen de orina",
      "Consulta médica gratis",
    ],
    includesEn: [
      "Testosterone test",
      "Urine test",
      "Free medical consultation",
    ],
    alt: "Promoción Examen de Testosterona por $79 con examen de orina y consulta médica gratis en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Testosterone Test promotion for $79 with a urine test and free medical consultation at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
  {
    slug: "chequeo-completo-mujer",
    title: "Chequeo Completo de la Mujer",
    titleEn: "Complete Women's Checkup",
    price: "$179",
    blurb:
      "¿Hace cuánto no revisas tu salud femenina? Chequeo completo de la mujer con ultrasonido pélvico, papanicolaou y examen de orina, más consulta médica gratis, por solo $179 (precio regular $300).",
    blurbEn:
      "How long has it been since you checked your women's health? Complete women's checkup with a pelvic ultrasound, Pap smear and urine test, plus a free medical consultation, for only $179 (regular price $300).",
    includes: [
      "Ultrasonido pélvico",
      "Papanicolaou",
      "Examen de orina",
      "Consulta médica gratis",
    ],
    includesEn: [
      "Pelvic ultrasound",
      "Pap smear",
      "Urine test",
      "Free medical consultation",
    ],
    alt: "Promoción Chequeo Completo de la Mujer por $179 con ultrasonido pélvico, papanicolaou y consulta médica gratis en Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
    altEn:
      "Complete Women's Checkup promotion for $179 with a pelvic ultrasound, Pap smear and free medical consultation at Clínica Hispana Nueva Salud Michoacana, Pasadena, TX",
  },
];

// Navbar (header): sin "Sin cita".
export const NAV_LINKS: NavLink[] = [
  { key: "services", href: "/services" },
  { key: "promociones", href: "/promociones" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contacto" },
];

// Footer: incluye "Sin cita" (walk-in).
export const FOOTER_NAV_LINKS: NavLink[] = [
  { key: "services", href: "/services" },
  { key: "promociones", href: "/promociones" },
  { key: "blog", href: "/blog" },
  { key: "walkIn", href: "/walk-in" },
  { key: "contact", href: "/#contacto" },
];

export const SERVICE_CATEGORIES: {
  value: ServiceCategory;
  label: string;
  labelEn: string;
}[] = [
  { value: "medicina-general", label: "Medicina general", labelEn: "General medicine" },
  { value: "salud-mujer", label: "Salud de la mujer", labelEn: "Women's health" },
  { value: "examenes", label: "Exámenes y certificados", labelEn: "Exams & certificates" },
  { value: "laboratorio", label: "Laboratorio y pruebas", labelEn: "Lab & testing" },
  { value: "tratamientos", label: "Tratamientos", labelEn: "Treatments" },
];

// Bloques de copy reutilizados (marca Nueva Salud Michoacana + Pasadena).
// TODO(cliente): confirmar barrios/comunidades reales que sirve la clínica
// desde 77505 (zona SE de Pasadena, junto a Deer Park).
const WHY_ES = `## ¿Por qué atenderte en la Michoacana?

Estamos sobre Spencer Hwy, en el 6500 Ste 180, a un lado de la 225 y a pocos minutos de Deer Park, South Houston y La Porte. Abrimos los siete días: de lunes a sábado de 9 AM a 9 PM y el domingo de 9 AM a 7 PM, así que puedes venir después del trabajo o el fin de semana sin pedir permiso en tu empleo. No hace falta cita ni seguro médico. Todo el personal habla español, el estacionamiento es gratuito y la entrada es accesible en silla de ruedas.`;

const WHY_EN = `## Why come to La Michoacana?

We are on Spencer Hwy, at 6500 Ste 180, just off Highway 225 and minutes from Deer Park, South Houston and La Porte. We open seven days a week: Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM, so you can come after work or on the weekend without taking time off. No appointment and no insurance needed. Our whole team speaks Spanish, parking is free and the entrance is wheelchair accessible.`;

const PAYMENT_ES = `## Cómo se paga

Aquí se paga por visita, sin seguro de por medio. Aceptamos efectivo, tarjeta de débito, tarjeta de crédito (Visa, Mastercard, American Express y Discover) y pagos con el teléfono. No aceptamos cheques. Pregunta el precio de tu servicio al llegar o por teléfono: te lo decimos antes de empezar, para que sepas cuánto vas a pagar.`;

const PAYMENT_EN = `## How payment works

You pay per visit, with no insurance involved. We take cash, debit cards, credit cards (Visa, Mastercard, American Express and Discover) and phone payments. We do not take checks. Ask about the price of your service when you arrive or over the phone: we tell you before we start, so you know what you are paying.`;

const AREAS_ES = `## De dónde llegan nuestros pacientes

La mayoría vive en Pasadena, en los códigos 77505, 77504, 77506 y 77503. También atendemos a familias que llegan desde Deer Park, South Houston, La Porte, Pearland y el resto del área de Houston. Si trabajas en los complejos industriales de la 225 o del Ship Channel, te queda de camino a casa.`;

const AREAS_EN = `## Where our patients come from

Most live in Pasadena, in ZIP codes 77505, 77504, 77506 and 77503. We also see families from Deer Park, South Houston, La Porte, Pearland and the rest of the Houston area. If you work at the industrial plants along Highway 225 or the Ship Channel, we are on your way home.`;


export const SERVICES: Service[] = [
  {
    slug: "condiciones-cronicas",
    order: 1,
    category: "medicina-general",
    icon: "Activity",
    title: "Control de Diabetes, Hipertensión y Colesterol",
    titleEn: "Diabetes, Hypertension & Cholesterol Care",
    shortDescription:
      "Exámenes y control de diabetes, presión alta y dislipidemias (colesterol y triglicéridos), con seguimiento cercano.",
    shortDescriptionEn:
      "Testing and management of diabetes, high blood pressure and dyslipidemia (cholesterol and triglycerides), with close follow-up.",
    description:
      "Control de diabetes, hipertensión y dislipidemias en Pasadena, TX. Laboratorio y seguimiento en español, con precios accesibles.",
    descriptionEn:
      "Diabetes, hypertension and dyslipidemia management in Pasadena, TX. Lab work and follow-up in Spanish, with affordable pricing.",
    keywords: [
      "control de diabetes pasadena",
      "doctor diabetes español pasadena",
      "control de presion alta pasadena",
      "colesterol alto tratamiento pasadena",
    ],
    keywordsEn: [
      "diabetes management pasadena",
      "high blood pressure doctor pasadena",
      "cholesterol management pasadena",
      "chronic disease clinic pasadena",
    ],
    features: [
      "Diagnóstico y monitoreo de laboratorio",
      "Control de glucosa, presión y colesterol",
      "Ajuste de medicamentos",
      "Plan de alimentación y hábitos",
    ],
    featuresEn: [
      "Diagnosis and lab monitoring",
      "Glucose, blood pressure and cholesterol control",
      "Medication adjustment",
      "Nutrition and lifestyle plan",
    ],
    longDescription: `La diabetes, la presión alta y el colesterol elevado no duelen: por eso se descuidan hasta que hacen daño. El control consiste en medir, ajustar y volver a medir, y eso es lo que hacemos aquí, con laboratorio propio y en español.

## ¿Cada cuánto hay que revisarse?

Con diabetes, la hemoglobina glicosilada (A1C) se revisa cada tres meses mientras no esté en meta, y dos veces al año cuando ya lo está. La presión, en cada visita. El colesterol, una o dos veces al año según tu riesgo y si tomas medicamento.

## ¿Qué incluye el seguimiento?

Laboratorio (A1C, glucosa, perfil de lípidos, función de riñón), revisión de presión y peso, repaso de tus medicamentos y de cómo los estás tomando de verdad, y ajuste de dosis. También revisión de pies si tienes diabetes, que es donde empiezan los problemas serios.

## ¿Puedo dejar el medicamento si me siento bien?

Sentirse bien es justo lo que buscan el medicamento y los cambios de hábito: dejarlo hace que la presión y el azúcar suban otra vez, casi siempre sin avisar. Si algo te molesta (mareo, tos, hinchazón), dilo y se cambia el esquema. No lo suspendas por tu cuenta.

## ¿Qué puedo esperar de la primera visita?

Una consulta con laboratorio el mismo día, metas claras por escrito y un plan con lo que sí puedes sostener: comida real de tu día a día, caminata y horarios de medicamento. Si aparecen complicaciones que requieren especialista, se orienta la referencia.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Diabetes, high blood pressure and high cholesterol do not hurt: that is why they get neglected until they cause damage. Control means measuring, adjusting and measuring again, and that is what we do here, with our own lab and in Spanish.

## How often should I be checked?

With diabetes, hemoglobin A1C is checked every three months while it is above target, and twice a year once it is at goal. Blood pressure, at every visit. Cholesterol, once or twice a year depending on your risk and whether you take medication.

## What does follow-up include?

Lab work (A1C, glucose, lipid panel, kidney function), blood pressure and weight, a review of your medications and how you are actually taking them, and dose adjustments. Also a foot check if you have diabetes, since that is where the serious problems start.

## Can I stop my medication if I feel fine?

Feeling fine is exactly what the medication and the habit changes are for: stopping sends blood pressure and sugar back up, almost always without warning. If something bothers you (dizziness, cough, swelling), say so and the regimen gets changed. Do not stop on your own.

## What can I expect at the first visit?

A consultation with same-day lab work, clear written targets and a plan you can actually keep: real food from your daily life, walking and medication timing. If complications appear that need a specialist, we guide the referral.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "tiroides",
    order: 2,
    category: "medicina-general",
    icon: "Thermometer",
    title: "Exámenes y Tratamiento de la Tiroides",
    titleEn: "Thyroid Testing & Treatment",
    shortDescription:
      "Diagnóstico y tratamiento de enfermedades de la tiroides (hipotiroidismo e hipertiroidismo) con seguimiento en español.",
    shortDescriptionEn:
      "Diagnosis and treatment of thyroid conditions (hypothyroidism and hyperthyroidism) with follow-up in Spanish.",
    description:
      "Exámenes y tratamiento de la tiroides en Pasadena, TX. Pruebas de laboratorio y control en español, con precios accesibles.",
    descriptionEn:
      "Thyroid testing and treatment in Pasadena, TX. Lab tests and follow-up in Spanish, with affordable pricing.",
    keywords: [
      "tiroides pasadena",
      "examen de tiroides pasadena",
      "hipotiroidismo tratamiento pasadena",
      "doctor tiroides español pasadena",
    ],
    keywordsEn: [
      "thyroid testing pasadena",
      "thyroid doctor pasadena",
      "hypothyroidism treatment pasadena",
      "thyroid clinic pasadena",
    ],
    features: [
      "Pruebas de función tiroidea (TSH, T3, T4)",
      "Diagnóstico de hipo e hipertiroidismo",
      "Tratamiento y ajuste de medicamentos",
      "Seguimiento en español",
    ],
    featuresEn: [
      "Thyroid function tests (TSH, T3, T4)",
      "Diagnosis of hypo- and hyperthyroidism",
      "Treatment and medication adjustment",
      "Follow-up in Spanish",
    ],
    longDescription: `La tiroides regula tu energía, tu peso, tu temperatura y tu ánimo. Cuando trabaja de más o de menos, los síntomas se confunden con estrés durante meses. Una muestra de sangre lo aclara.

## ¿Qué síntomas hacen sospechar?

Cansancio que no se quita, subir o bajar de peso sin cambiar de hábitos, caída del cabello, piel seca, sentir frío cuando nadie más lo siente, estreñimiento, reglas irregulares. Si la tiroides va acelerada: nerviosismo, palpitaciones, temblor en las manos, insomnio y sudoración.

## ¿Qué prueba se hace?

Se empieza con la TSH, que es la que detecta la mayoría de los casos, y según el resultado se añaden T4 libre y T3. No hace falta ayuno. Si ya tomas medicamento para la tiroides, ese día tómalo después de la muestra.

## ¿Cómo es el tratamiento?

El hipotiroidismo se trata con hormona en pastilla, todos los días y en ayunas, y el ajuste se hace con análisis de control a las seis u ocho semanas hasta encontrar tu dosis. El hipertiroidismo requiere una evaluación distinta y, en varios casos, referencia al especialista.

## ¿Con qué frecuencia hay que revisarse?

Mientras se ajusta la dosis, cada dos o tres meses. Ya estable, una o dos veces al año. El embarazo y los cambios de peso importantes obligan a revisar antes, porque la dosis deja de servir. Aquí tienes el [laboratorio](/services/examenes-sangre) y el seguimiento en el mismo lugar.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Your thyroid regulates energy, weight, temperature and mood. When it runs fast or slow, the symptoms get mistaken for stress for months. A blood sample settles it.

## Which symptoms raise suspicion?

Fatigue that does not lift, gaining or losing weight without changing habits, hair loss, dry skin, feeling cold when nobody else does, constipation, irregular periods. If the thyroid is running fast: anxiety, palpitations, hand tremor, insomnia and sweating.

## Which test is done?

It starts with TSH, which catches most cases, and free T4 and T3 are added depending on the result. No fasting needed. If you already take thyroid medication, take it that day after the sample is drawn.

## What does treatment look like?

Hypothyroidism is treated with a daily hormone tablet taken on an empty stomach, and the dose is adjusted with follow-up labs at six to eight weeks until yours is right. Hyperthyroidism needs a different workup and, in several cases, a specialist referral.

## How often should I be rechecked?

While the dose is being adjusted, every two or three months. Once stable, once or twice a year. Pregnancy and major weight changes call for an earlier check, because the dose stops fitting. The [lab](/en/services/examenes-sangre) and the follow-up are in the same place.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "alergias",
    order: 3,
    category: "medicina-general",
    icon: "Leaf",
    title: "Exámenes y Tratamiento de Alergias",
    titleEn: "Allergy Testing & Treatment",
    shortDescription:
      "Evaluación y tratamiento de alergias estacionales, respiratorias y de la piel, con atención en español.",
    shortDescriptionEn:
      "Evaluation and treatment of seasonal, respiratory and skin allergies, with care in Spanish.",
    description:
      "Exámenes y tratamiento de alergias en Pasadena, TX. Diagnóstico y manejo en español, con precios accesibles.",
    descriptionEn:
      "Allergy testing and treatment in Pasadena, TX. Diagnosis and management in Spanish, with affordable pricing.",
    keywords: [
      "alergias pasadena",
      "tratamiento de alergias pasadena",
      "doctor de alergias español pasadena",
      "examen de alergias pasadena",
    ],
    keywordsEn: [
      "allergy treatment pasadena",
      "allergy testing pasadena",
      "allergy doctor pasadena",
      "allergy clinic pasadena",
    ],
    features: [
      "Evaluación de síntomas y desencadenantes",
      "Tratamiento de alergias respiratorias y de piel",
      "Manejo de rinitis y congestión",
      "Atención en español",
    ],
    featuresEn: [
      "Evaluation of symptoms and triggers",
      "Treatment of respiratory and skin allergies",
      "Management of rhinitis and congestion",
      "Care in Spanish",
    ],
    longDescription: `En la costa del Golfo la temporada de alergias casi no termina: al polen de primavera le siguen el pasto del verano, la ambrosía del otoño y el moho todo el año por la humedad. Aquí evaluamos qué te está afectando y cómo controlarlo.

## ¿Es alergia o es gripe?

La alergia da comezón (en nariz, ojos o garganta), estornudos en serie y moco claro, dura semanas y empeora en ciertos lugares u horas del día. La gripe trae fiebre y dolor de cuerpo y se va en una semana. Esa diferencia cambia el tratamiento.

## ¿Qué se hace en la consulta?

Se revisa tu historia: en qué época empeora, si hay mascotas, humedad o polvo en casa, si el trabajo te expone a algo. Se examinan nariz, garganta, oídos y pulmones, y si hay sibilancias o falta de aire se valora si además hay asma.

## ¿Qué tratamientos hay?

Antihistamínicos, aerosoles nasales con esteroide, lavados con solución salina y, cuando hay ronchas, tratamiento para la piel. La mayoría mejora en días. Si los síntomas no ceden o vuelven cada año con fuerza, se orienta la referencia al alergólogo para pruebas específicas.

## ¿Qué puedo cambiar en casa?

Cerrar ventanas en los días de más polen, bañarse por la noche para no llevar polen a la cama, usar filtro en el aire acondicionado y atacar la humedad del baño, que es donde crece el moho en Pasadena. Son medidas aburridas y funcionan.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `On the Gulf Coast allergy season barely ends: spring pollen gives way to summer grasses, fall ragweed and year-round mold thanks to the humidity. We work out what is affecting you and how to control it.

## Is it allergy or a cold?

Allergy itches (nose, eyes or throat), brings sneezing fits and clear mucus, lasts weeks and gets worse in certain places or at certain hours. A cold brings fever and body aches and clears in a week. That difference changes the treatment.

## What happens during the visit?

We go through your history: which season is worse, whether there are pets, damp or dust at home, whether work exposes you to something. We examine nose, throat, ears and lungs, and if there is wheezing or shortness of breath we assess whether asthma is also involved.

## What treatments are available?

Antihistamines, steroid nasal sprays, saline rinses and, when there are hives, treatment for the skin. Most people improve within days. If symptoms do not ease or come back hard every year, we guide a referral to an allergist for specific testing.

## What can I change at home?

Keep windows closed on high-pollen days, shower at night so pollen does not reach your bed, use a filter on the air conditioning and go after bathroom humidity, which is where mold grows in Pasadena. Boring measures, and they work.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-respiratorias",
    order: 4,
    category: "medicina-general",
    icon: "Wind",
    title: "Pruebas de Flu y COVID y Enfermedades Respiratorias",
    titleEn: "Flu & COVID Testing and Respiratory Illness Care",
    shortDescription:
      "Pruebas de detección de influenza (flu) y COVID, y tratamiento de gripe, tos y enfermedades respiratorias.",
    shortDescriptionEn:
      "Influenza (flu) and COVID detection testing, plus treatment of flu, cough and respiratory illnesses.",
    description:
      "Pruebas de flu y COVID y tratamiento de enfermedades respiratorias en Pasadena, TX. Sin cita previa, en español.",
    descriptionEn:
      "Flu and COVID testing and respiratory illness treatment in Pasadena, TX. Walk-ins welcome, in Spanish.",
    keywords: [
      "prueba de covid pasadena",
      "prueba de flu pasadena",
      "tratamiento gripe pasadena",
      "enfermedades respiratorias pasadena",
    ],
    keywordsEn: [
      "covid test pasadena",
      "flu test pasadena",
      "flu treatment pasadena",
      "respiratory illness pasadena",
    ],
    features: [
      "Prueba rápida de flu y COVID",
      "Diagnóstico el mismo día",
      "Tratamiento de gripe, tos y bronquitis",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "Rapid flu and COVID testing",
      "Same-day diagnosis",
      "Treatment of flu, cough and bronchitis",
      "Walk-in care in Spanish",
    ],
    longDescription: `Cuando llegan la fiebre y la tos, lo primero es saber qué es. Hacemos pruebas rápidas de influenza y COVID en la clínica, con resultado en minutos, y se indica el tratamiento en la misma visita.

## ¿Es flu, COVID o un resfriado?

Los tres comparten síntomas y no se distinguen a simple vista. La influenza suele empezar de golpe, con fiebre alta y dolor de cuerpo; el resfriado avanza despacio y rara vez da fiebre alta; el COVID varía mucho. La prueba lo aclara en minutos.

## ¿Cuándo conviene hacerse la prueba?

En los primeros días de síntomas, que es cuando el resultado es más confiable y cuando el tratamiento antiviral todavía sirve. También si convives con personas mayores, embarazadas o con enfermedades crónicas, porque el resultado cambia lo que hay que hacer en casa.

## ¿Qué se trata aquí?

Gripe, bronquitis, faringitis, sinusitis y tos persistente. Se revisan oídos, garganta y pulmones, y se decide si hace falta antibiótico, que no sirve para infecciones por virus y por eso no se receta por rutina.

## ¿Cuándo hay que ir a urgencias?

Falta de aire en reposo, labios o uñas morados, dolor de pecho, confusión, fiebre que no baja en varios días o empeoramiento después de haber mejorado. Eso no espera a una consulta: es sala de emergencias.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `When fever and cough arrive, the first thing is knowing what it is. We run rapid influenza and COVID tests at the clinic, with results in minutes, and treatment is prescribed during the same visit.

## Is it flu, COVID or a cold?

All three share symptoms and cannot be told apart by eye. Influenza usually starts abruptly, with high fever and body aches; a cold builds slowly and rarely brings high fever; COVID varies widely. The test settles it in minutes.

## When should I get tested?

In the first days of symptoms, when the result is most reliable and antiviral treatment still helps. Also if you live with older adults, pregnant women or people with chronic conditions, because the result changes what you do at home.

## What gets treated here?

Flu, bronchitis, pharyngitis, sinusitis and lingering cough. We check ears, throat and lungs and decide whether an antibiotic is needed, which does nothing for viral infections and is therefore not prescribed routinely.

## When should I go to the emergency room?

Shortness of breath at rest, blue lips or nails, chest pain, confusion, fever that will not come down for days, or getting worse after improving. That does not wait for a clinic visit.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-fisico-escolar",
    order: 5,
    category: "examenes",
    icon: "ClipboardList",
    title: "Chequeos Físicos Escolares y Deportivos",
    titleEn: "School & Sports Physical Exams",
    shortDescription:
      "Exámenes físicos para la escuela y los deportes, rápidos y con los formularios completados.",
    shortDescriptionEn:
      "Physical exams for school and sports, fast and with the forms completed.",
    description:
      "Chequeos físicos escolares y deportivos en Pasadena, TX. Rápidos, en español y con precios accesibles.",
    descriptionEn:
      "School and sports physical exams in Pasadena, TX. Fast, in Spanish, with affordable pricing.",
    keywords: [
      "examen fisico escolar pasadena",
      "physical para la escuela pasadena",
      "examen deportivo pasadena",
      "chequeo escolar pasadena",
    ],
    keywordsEn: [
      "school physical pasadena",
      "sports physical pasadena",
      "school physical exam pasadena",
      "kids physical pasadena",
    ],
    features: [
      "Examen físico completo",
      "Revisión de signos vitales",
      "Formularios escolares y deportivos llenados",
      "Atención en español",
    ],
    featuresEn: [
      "Complete physical exam",
      "Vital-signs check",
      "School and sports forms completed",
      "Care in Spanish",
    ],
    longDescription: `El examen físico escolar y deportivo revisa que el niño o el joven pueda estudiar y competir sin riesgo. En la Michoacana lo hacemos sin cita, en español y con el formulario de la escuela llenado y firmado antes de que salgas.

## ¿Qué se revisa?

Peso, talla, presión arterial, vista y oído, corazón y pulmones, columna y movilidad de rodillas y tobillos, más las preguntas sobre desmayos, dolor de pecho al hacer ejercicio y antecedentes familiares de problemas cardiacos. Esa parte del cuestionario es la que más casos detecta.

## ¿Qué formularios llenan?

El de tu escuela o distrito y el de deportes escolares de Texas, que en la mayoría de las preparatorias es el formulario de la UIL. Trae el papel que te dieron; si lo olvidaste, dinos de qué escuela es.

## ¿Qué debo llevar?

Identificación del padre o tutor, la cartilla de vacunas del estudiante, lentes si los usa y el nombre de los medicamentos que tome. Si el chico usa inhalador para el asma, tráelo: se anota en el formulario y evita problemas en la práctica.

## ¿Cuándo conviene hacerlo?

Antes de que empiece la temporada, no el día de la primera práctica. En julio y agosto se juntan todas las familias; el resto del año se hace en una sola visita, y tenemos horario de tarde y fines de semana, que es cuando se puede sin faltar a clases ni al trabajo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A school and sports physical checks that a child or teen can study and compete safely. At La Michoacana we do it walk-in, in Spanish, with the school form filled out and signed before you leave.

## What gets checked?

Weight, height, blood pressure, vision and hearing, heart and lungs, spine and knee and ankle mobility, plus the questions about fainting, chest pain during exercise and family history of heart problems. That part of the questionnaire is what catches the most cases.

## Which forms do you complete?

Your school or district form and the Texas school sports form, which at most high schools is the UIL form. Bring the paper they gave you; if you forgot it, tell us which school it is for.

## What should I bring?

Parent or guardian ID, the student's vaccination record, glasses if they wear them and the names of any medications. If your child uses an asthma inhaler, bring it: it goes on the form and prevents problems at practice.

## When should we come?

Before the season starts, not on the day of the first practice. July and August are when every family shows up; the rest of the year it takes a single visit, and we have evening and weekend hours, which is when most families can come without missing school or work.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "ginecologia",
    order: 6,
    category: "salud-mujer",
    icon: "Flower2",
    highlighted: true,
    title: "Atención Ginecológica: Papanicolaou y Cultivos",
    titleEn: "Gynecology Care: Pap Smear & Cultures",
    shortDescription:
      "Papanicolaou, cultivos vaginales y tratamiento de infecciones vaginales, con privacidad y en español.",
    shortDescriptionEn:
      "Pap smear, vaginal cultures and treatment of vaginal infections, with privacy and in Spanish.",
    description:
      "Atención ginecológica en una clínica hispana en Pasadena, TX: papanicolaou, cultivos vaginales y tratamiento de infecciones. En español, con precios accesibles.",
    descriptionEn:
      "Gynecology care at a Hispanic clinic in Pasadena, TX: Pap smear, vaginal cultures and infection treatment. In Spanish, with affordable pricing.",
    keywords: [
      "ginecologo pasadena español",
      "ginecologia cerca de mi pasadena",
      "clinica hispana ginecologia pasadena",
      "papanicolaou pasadena",
      "cultivo vaginal pasadena",
      "infeccion vaginal tratamiento pasadena",
    ],
    keywordsEn: [
      "gynecologist pasadena spanish",
      "gynecology near me pasadena",
      "pap smear pasadena",
      "vaginal culture pasadena",
      "vaginal infection treatment pasadena",
    ],
    features: [
      "Papanicolaou y chequeo ginecológico",
      "Cultivos vaginales",
      "Tratamiento de infecciones vaginales",
      "Atención privada en español",
    ],
    featuresEn: [
      "Pap smear and gynecological checkup",
      "Vaginal cultures",
      "Treatment of vaginal infections",
      "Private care in Spanish",
    ],
    longDescription: `Tu salud como mujer merece un espacio de confianza. En Clínica Hispana Nueva Salud Michoacana ofrecemos atención ginecológica en español, con la privacidad y el respeto que mereces.

## ¿Qué incluye?

- Papanicolaou y chequeo ginecológico
- Cultivos vaginales para identificar infecciones
- Tratamiento de infecciones vaginales (hongos, bacterias)
- Evaluación de molestias y flujo anormal
- Referencias cuando se necesita un especialista

## No te quedes con la duda

Comezón, ardor, flujo diferente o mal olor son señales de que algo necesita atención. Un cultivo permite un diagnóstico correcto y un tratamiento que sí resuelve.

## Ginecología en una clínica hispana cerca de ti

Somos un centro médico hispano en Pasadena, TX, a minutos del área de Houston. Te atendemos sin cita previa, con precios accesibles y con la privacidad que este tipo de consulta merece.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Your health as a woman deserves a space of trust. At Clínica Hispana Nueva Salud Michoacana we offer gynecology care in Spanish, with the privacy and respect you deserve.

## What's included?

- Pap smear and gynecological checkup
- Vaginal cultures to identify infections
- Treatment of vaginal infections (yeast, bacteria)
- Evaluation of discomfort and abnormal discharge
- Referrals when a specialist is needed

## Don't stay in doubt

Itching, burning, unusual discharge or odor are signs that something needs attention. A culture allows an accurate diagnosis and treatment that truly resolves it.

## Gynecology at a Hispanic clinic near you

We are a Hispanic medical center in Pasadena, TX, minutes from the Houston area. We see you with no appointment needed, with affordable pricing and the privacy this kind of visit deserves.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-embarazo",
    order: 7,
    category: "salud-mujer",
    icon: "Baby",
    title: "Examen y Diagnóstico de Embarazo",
    titleEn: "Pregnancy Testing & Confirmation",
    shortDescription:
      "Pruebas de embarazo confiables y orientación sobre tus siguientes pasos, en español.",
    shortDescriptionEn:
      "Reliable pregnancy tests and guidance on your next steps, in Spanish.",
    description:
      "Examen y diagnóstico de embarazo en Pasadena, TX. Pruebas confiables y orientación en español, con precios accesibles.",
    descriptionEn:
      "Pregnancy testing and confirmation in Pasadena, TX. Reliable tests and guidance in Spanish, with affordable pricing.",
    keywords: [
      "prueba de embarazo pasadena",
      "examen de embarazo pasadena",
      "confirmar embarazo pasadena",
      "test de embarazo español pasadena",
    ],
    keywordsEn: [
      "pregnancy test pasadena",
      "pregnancy confirmation pasadena",
      "confirm pregnancy pasadena",
      "pregnancy testing pasadena",
    ],
    features: [
      "Prueba de embarazo confiable",
      "Confirmación médica",
      "Orientación sobre próximos pasos",
      "Atención en español",
    ],
    featuresEn: [
      "Reliable pregnancy test",
      "Medical confirmation",
      "Guidance on next steps",
      "Care in Spanish",
    ],
    longDescription: `Si crees que podrías estar embarazada, una prueba confiable te da tranquilidad y claridad. En Clínica Hispana Nueva Salud Michoacana realizamos pruebas de embarazo y te orientamos sobre lo que sigue, en español y sin juicios.

## ¿Qué incluye?

- Prueba de embarazo (orina o sangre)
- Confirmación médica del resultado
- Orientación sobre tus siguientes pasos
- Información sobre control prenatal y referencias

## Con confianza y respeto

Te explicamos el resultado con claridad y te acompañamos en la decisión que tomes, siempre con respeto y privacidad.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `If you think you might be pregnant, a reliable test gives you peace of mind and clarity. At Clínica Hispana Nueva Salud Michoacana we perform pregnancy tests and guide you on what comes next, in Spanish and without judgment.

## What's included?

- Pregnancy test (urine or blood)
- Medical confirmation of the result
- Guidance on your next steps
- Information on prenatal care and referrals

## With trust and respect

We explain the result clearly and support you in whatever decision you make, always with respect and privacy.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "anticonceptivos",
    order: 8,
    category: "salud-mujer",
    icon: "Tablets",
    title: "Tratamientos Anticonceptivos",
    titleEn: "Contraceptive Methods",
    shortDescription:
      "Orientación y métodos anticonceptivos (pastillas, inyección y más) para decidir con información, en español.",
    shortDescriptionEn:
      "Guidance and contraceptive methods (pills, injection and more) to decide with clear information, in Spanish.",
    description:
      "Tratamientos anticonceptivos en Pasadena, TX: orientación, pastillas e inyección. En español, con precios accesibles.",
    descriptionEn:
      "Contraceptive methods in Pasadena, TX: guidance, pills and injection. In Spanish, with affordable pricing.",
    keywords: [
      "anticonceptivos pasadena",
      "metodos anticonceptivos pasadena",
      "inyeccion anticonceptiva pasadena",
      "pastillas anticonceptivas pasadena",
    ],
    keywordsEn: [
      "birth control pasadena",
      "contraception clinic pasadena",
      "birth control shot pasadena",
      "birth control pills pasadena",
    ],
    features: [
      "Orientación personalizada",
      "Pastillas e inyección anticonceptiva",
      "Inicio y seguimiento del método",
      "Atención en español",
    ],
    featuresEn: [
      "Personalized guidance",
      "Birth control pills and injection",
      "Method start and follow-up",
      "Care in Spanish",
    ],
    longDescription: `Aquí puedes hablar de anticoncepción sin juicios y empezar el método el mismo día. Se revisa tu salud, se comparan las opciones disponibles y te explicamos qué esperar los primeros meses.

## ¿Qué métodos se manejan aquí?

Pastillas anticonceptivas e inyección, con inicio y seguimiento en la clínica. Si tu caso necesita un procedimiento que no realizamos, como la colocación de un dispositivo, se orienta la referencia. También retiramos [implantes subdérmicos](/services/extraccion-implantes).

## ¿Cómo se elige el método?

Según tu salud, tus planes y tu rutina. Se preguntan antecedentes de trombosis, migraña con aura, presión alta, tabaquismo y lactancia, porque esos datos descartan algunas opciones. La que se te olvide tomar todos los días no es la mejor opción para ti, aunque sea la más popular.

## ¿Qué efectos son normales al principio?

Manchado entre reglas durante los primeros dos o tres meses, sensibilidad en los senos o cambios leves de ánimo. Suelen ceder. Lo que no es normal: dolor de pierna, dolor de pecho, falta de aire o dolor de cabeza intenso con alteraciones en la vista.

## ¿Necesito cita o receta previa?

No. Llega sin cita y sin seguro. Si llevas tiempo sin revisión, se aprovecha para valorar [atención ginecológica](/services/ginecologia) y, si toca, hacer papanicolaou o [prueba de embarazo](/services/prueba-embarazo).

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Here you can talk about birth control without judgment and start a method the same day. We review your health, compare the available options and explain what to expect in the first months.

## Which methods do you offer?

Birth control pills and the injection, started and followed up at the clinic. If your case needs a procedure we do not perform, such as device insertion, we guide the referral. We also remove [subdermal implants](/en/services/extraccion-implantes).

## How is a method chosen?

Based on your health, your plans and your routine. We ask about blood clots, migraine with aura, high blood pressure, smoking and breastfeeding, because those rule out some options. The one you forget to take daily is not the best one for you, however popular it is.

## Which side effects are normal at first?

Spotting between periods during the first two or three months, breast tenderness or mild mood changes. They usually settle. What is not normal: leg pain, chest pain, shortness of breath or a severe headache with vision changes.

## Do I need an appointment or a prescription?

No. Walk in, no insurance needed. If it has been a while since your last checkup, we can also cover [gynecological care](/en/services/ginecologia) and, if due, a Pap smear or a [pregnancy test](/en/services/prueba-embarazo).

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "extraccion-implantes",
    order: 9,
    category: "salud-mujer",
    icon: "Bandage",
    title: "Extracción de Implantes Subdérmicos",
    titleEn: "Subdermal Implant Removal",
    shortDescription:
      "Retiro seguro de implantes anticonceptivos subdérmicos del brazo, por personal capacitado.",
    shortDescriptionEn:
      "Safe removal of subdermal arm contraceptive implants by trained staff.",
    description:
      "Extracción de implantes subdérmicos en Pasadena, TX, procedimiento seguro y en español. Con precios accesibles.",
    descriptionEn:
      "Subdermal implant removal in Pasadena, TX, a safe procedure in Spanish. With affordable pricing.",
    keywords: [
      "extraccion de implante subdermico pasadena",
      "quitar implante del brazo pasadena",
      "retiro de implante anticonceptivo pasadena",
      "remover implante pasadena",
    ],
    keywordsEn: [
      "subdermal implant removal pasadena",
      "arm implant removal pasadena",
      "contraceptive implant removal pasadena",
      "birth control implant removal pasadena",
    ],
    features: [
      "Procedimiento ambulatorio",
      "Anestesia local",
      "Personal capacitado",
      "Cuidado posterior explicado",
    ],
    featuresEn: [
      "Outpatient procedure",
      "Local anesthesia",
      "Trained staff",
      "After-care explained",
    ],
    longDescription: `El implante subdérmico se retira con anestesia local en la misma visita. En la Michoacana lo hacemos sin cita, en español, y te explicamos qué esperar después y qué opciones tienes si quieres seguir con un método anticonceptivo.

## ¿Cuándo hay que retirarlo?

Cuando cumple su tiempo de duración, cuando quieres embarazarte o cuando el método te está dando molestias que no mejoran, como sangrados irregulares que ya te cansaron. También si sientes el implante doblado o fuera de su sitio.

## ¿Cómo es el procedimiento?

Primero se localiza el implante con los dedos, se limpia la zona y se aplica anestesia local: sientes el piquete y después presión, no dolor. Se hace una incisión pequeña, se retira el implante y se cierra con un vendaje. Son unos minutos y sales caminando.

## ¿Qué cuidados siguen después?

Mantén el vendaje seco 24 horas, evita cargar peso con ese brazo dos o tres días y vigila la zona. Es normal un moretón. Si aparece enrojecimiento que crece, pus o fiebre, regresa: eso sí hay que revisarlo.

## ¿Y si quiero seguir cuidándome?

Puedes cambiar de método el mismo día. Te explicamos las opciones disponibles aquí, como pastillas o inyección, en la consulta de [anticonceptivos](/services/anticonceptivos), y si tu caso necesita un procedimiento que no hacemos, se orienta la referencia.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A subdermal implant is removed with local anesthesia in the same visit. At La Michoacana we do it walk-in, in Spanish, and explain what to expect afterward and what your options are if you want to stay on a birth control method.

## When should it come out?

When it reaches the end of its lifespan, when you want to get pregnant, or when the method is causing side effects that are not improving, such as irregular bleeding you are tired of. Also if the implant feels bent or out of place.

## What does the procedure involve?

The implant is located by touch, the area is cleaned and local anesthesia is given: you feel the pinch, then pressure, not pain. A small incision is made, the implant comes out and the site is bandaged. It takes a few minutes and you walk out.

## What aftercare is needed?

Keep the bandage dry for 24 hours, avoid lifting weight with that arm for two or three days, and watch the area. Bruising is normal. If you get spreading redness, pus or fever, come back: that does need to be checked.

## What if I want to stay protected?

You can switch methods the same day. We go over the options available here, such as pills or the injection, at the [birth control](/en/services/anticonceptivos) visit, and if your case needs a procedure we do not perform, we guide the referral.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "salud-hombre",
    order: 10,
    category: "medicina-general",
    icon: "Mars",
    highlighted: true,
    title: "Exámenes del Hombre: PSA y Testosterona",
    titleEn: "Men's Health Exams: PSA & Testosterone",
    shortDescription:
      "Exámenes de salud del hombre: antígeno prostático (PSA), testosterona y chequeo general, en español.",
    shortDescriptionEn:
      "Men's health exams: prostate antigen (PSA), testosterone and general checkup, in Spanish.",
    description:
      "Exámenes del hombre en Pasadena, TX: PSA y testosterona. Laboratorio y atención en español, con precios accesibles.",
    descriptionEn:
      "Men's health exams in Pasadena, TX: PSA and testosterone. Lab work and care in Spanish, with affordable pricing.",
    keywords: [
      "examen del hombre pasadena",
      "prueba psa pasadena",
      "examen de prostata pasadena",
      "examen de testosterona pasadena",
    ],
    keywordsEn: [
      "mens health pasadena",
      "psa test pasadena",
      "prostate exam pasadena",
      "testosterone test pasadena",
    ],
    features: [
      "Antígeno prostático (PSA)",
      "Nivel de testosterona",
      "Chequeo general del hombre",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "Prostate antigen (PSA)",
      "Testosterone level",
      "General men's checkup",
      "Results explained in Spanish",
    ],
    longDescription: `Los exámenes de salud del hombre revisan lo que suele pasar desapercibido: próstata, hormonas, azúcar, presión y colesterol. En la Michoacana se hacen sin cita, con el laboratorio en el mismo lugar y los resultados explicados en español.

## ¿A partir de qué edad conviene?

La conversación sobre el PSA empieza normalmente a los 50 años, y antes, hacia los 40 o 45, si hay padre o hermano con cáncer de próstata o si eres afroamericano. La presión, la glucosa y el colesterol se revisan desde los 30, sobre todo si hay sobrepeso o antecedentes familiares.

## ¿Qué incluye la visita?

Chequeo general con presión y peso, análisis de sangre con PSA y perfil hormonal, revisión de síntomas urinarios (levantarse de noche, chorro débil, ardor) y de señales de fatiga, ánimo bajo o falta de sueño que muchos hombres normalizan durante años.

## ¿Qué significa un PSA alto?

No significa cáncer. El valor sube también por inflamación de la próstata, por una infección urinaria, por andar en bicicleta o después de eyacular. Por eso se interpreta junto con tus síntomas y, si hace falta, se repite o se orienta la referencia al especialista.

## ¿Y si me siento cansado todo el tiempo?

El cansancio tiene muchas causas y conviene medir antes de suponer. En la misma muestra se revisan azúcar, tiroides, vitamina B12 y hormonas. Si el resultado pide tratamiento, se empieza en la visita, y si necesitas seguimiento, tienes el [control de condiciones crónicas](/services/condiciones-cronicas) aquí mismo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Men's health exams check what usually goes unnoticed: prostate, hormones, blood sugar, blood pressure and cholesterol. At La Michoacana they are walk-in, with the lab on site and results explained in Spanish.

## At what age should I start?

The PSA conversation usually starts at 50, and earlier, around 40 to 45, if your father or brother had prostate cancer or if you are African American. Blood pressure, glucose and cholesterol get checked from age 30, especially with extra weight or family history.

## What does the visit include?

A general check with blood pressure and weight, blood work with PSA and a hormone panel, a review of urinary symptoms (getting up at night, weak stream, burning) and of the fatigue, low mood or poor sleep that many men put up with for years.

## What does a high PSA mean?

It does not mean cancer. The value also rises with prostate inflammation, a urinary infection, cycling or recent ejaculation. That is why it is read alongside your symptoms and, if needed, repeated or referred on to a specialist.

## What if I am tired all the time?

Fatigue has many causes and it is worth measuring before assuming. The same sample covers blood sugar, thyroid, vitamin B12 and hormones. If the result calls for treatment, it starts during the visit, and if you need follow-up, [chronic condition care](/en/services/condiciones-cronicas) is right here.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examenes-sangre",
    order: 11,
    category: "laboratorio",
    icon: "FlaskConical",
    highlighted: true,
    title: "Análisis y Exámenes de Sangre | Laboratorio",
    titleEn: "Blood Tests & Blood Work | Lab",
    shortDescription:
      "Análisis de sangre completos con resultados rápidos e interpretación en español, sin cita previa.",
    shortDescriptionEn:
      "Complete blood work with fast results and results explained in Spanish, no appointment needed.",
    description:
      "Análisis y exámenes de sangre en Pasadena, TX: biometría, química, glucosa, colesterol y más. Resultados en español, con precios accesibles.",
    descriptionEn:
      "Blood tests in Pasadena, TX: CBC, chemistry, glucose, cholesterol and more. Results in Spanish, with affordable pricing.",
    keywords: [
      "examenes de sangre pasadena",
      "analisis de sangre pasadena",
      "laboratorio pasadena",
      "laboratorio cerca de mi pasadena",
    ],
    keywordsEn: [
      "blood test pasadena",
      "blood work pasadena",
      "lab near me pasadena",
      "clinical lab pasadena",
    ],
    features: [
      "Biometría y química sanguínea",
      "Glucosa, colesterol y triglicéridos",
      "Pruebas de tiroides, hígado y riñón",
      "Prueba e inyección de vitamina B12",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "CBC and blood chemistry",
      "Glucose, cholesterol and triglycerides",
      "Thyroid, liver and kidney tests",
      "Vitamin B12 test and injection",
      "Results explained in Spanish",
    ],
    longDescription: `El laboratorio está dentro de la clínica: la muestra se toma en el momento, sin cita, y los resultados te los explicamos en español, sin tecnicismos.

## ¿Qué estudios se hacen?

Biometría hemática, química sanguínea, hemoglobina glicosilada (A1C), perfil de lípidos, perfil tiroideo, función de hígado y riñón, nivel de vitamina B12 y los paneles que piden los trámites de trabajo, escuela o inmigración.

## ¿Tengo que venir en ayunas?

Para glucosa en ayunas y perfil de lípidos, sí: entre 8 y 12 horas sin comer. El A1C, la biometría y el perfil tiroideo no lo necesitan. El agua sí se puede tomar, y de hecho ayuda a que la toma de muestra sea más fácil. Si tomas medicamento diario, pregunta antes de suspenderlo.

## ¿Cuánto tardan los resultados?

En la mayoría de los casos salen el mismo día y te los explicamos al entregarlos: qué valor está fuera de rango, si conviene repetir el estudio y cuál es el siguiente paso. Si hace falta tratamiento, se empieza en la misma visita.

## ¿Cansancio o poca energía?

Antes de comprar vitaminas a ciegas, conviene medir. La deficiencia de vitamina B12 da fatiga, hormigueo en manos y pies y falta de concentración, y se confunde con estrés. Mira la [promoción de examen general de sangre más inyección de B12](/promociones) o lee la [guía del laboratorio](/blog/laboratorio-clinico-pasadena-analisis-sangre).

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `The lab is inside the clinic: your sample is drawn on the spot, with no appointment, and we explain the results in Spanish, without jargon.

## Which tests do you run?

Complete blood count, metabolic panel, hemoglobin A1C, lipid panel, thyroid panel, liver and kidney function, vitamin B12 level, and the panels required for work, school or immigration paperwork.

## Do I need to fast?

For fasting glucose and the lipid panel, yes: 8 to 12 hours without food. A1C, the blood count and the thyroid panel do not require it. Water is fine, and it actually makes the draw easier. If you take daily medication, ask before skipping a dose.

## How long do results take?

In most cases they are ready the same day and we go through them with you: which value is out of range, whether the test should be repeated and what the next step is. If treatment is needed, it starts during the same visit.

## Tired or low on energy?

Before buying vitamins blindly, it is worth measuring. Vitamin B12 deficiency causes fatigue, tingling in hands and feet and trouble concentrating, and it gets mistaken for stress. See the [blood panel plus B12 injection promotion](/en/promociones) or read our [lab guide](/en/blog/laboratorio-clinico-pasadena-analisis-sangre).

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "infecciones-urinarias",
    order: 12,
    category: "tratamientos",
    icon: "Droplet",
    highlighted: true,
    title: "Examen de Orina y Tratamiento de Infecciones Urinarias",
    titleEn: "Urinalysis & Urinary Infection Treatment",
    shortDescription:
      "Examen de orina y tratamiento de infecciones urinarias con atención rápida, en español.",
    shortDescriptionEn:
      "Urinalysis and prompt urinary infection treatment, in Spanish.",
    description:
      "Examen de orina y tratamiento de infecciones urinarias sin cita y con atención rápida, en una clínica hispana en Pasadena, TX. En español.",
    descriptionEn:
      "Urinalysis and prompt urinary infection treatment, walk-in, at a Hispanic clinic in Pasadena, TX. In Spanish, with affordable pricing.",
    keywords: [
      "examen de orina pasadena",
      "infeccion urinaria pasadena",
      "infeccion urinaria cerca de mi pasadena",
      "tratamiento infeccion urinaria pasadena",
      "doctor infeccion de orina pasadena",
    ],
    keywordsEn: [
      "urinalysis pasadena",
      "urinary tract infection pasadena",
      "uti clinic near me pasadena",
      "uti treatment pasadena",
      "uti doctor pasadena",
    ],
    features: [
      "Examen de orina en la clínica",
      "Diagnóstico de infección urinaria",
      "Tratamiento sin cita previa",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "In-clinic urinalysis",
      "Diagnosis of urinary infection",
      "Walk-in treatment",
      "Walk-in care in Spanish",
    ],
    longDescription: `El examen de orina ayuda a detectar infecciones urinarias y otras condiciones. En Clínica Hispana Nueva Salud Michoacana te hacemos la prueba y, si hay infección, empezamos el tratamiento en la misma visita.

## ¿Qué incluye?

- Examen general de orina (urianálisis)
- Evaluación de síntomas
- Diagnóstico de infección urinaria
- Tratamiento adecuado según el resultado
- Indicaciones para evitar que regrese

## Síntomas frecuentes

Ardor al orinar, ganas constantes de ir al baño, orina turbia o con mal olor y dolor en la parte baja del abdomen. No esperes: una infección sin tratar puede llegar a los riñones.

## Tratamiento de infecciones urinarias en una clínica hispana cerca de ti

Somos un centro médico hispano en Pasadena, TX, a minutos del área de Houston. Llega sin cita: te hacemos el examen de orina y, si hay infección, salimos de la visita con tu tratamiento indicado.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A urine test helps detect urinary infections and other conditions. At Clínica Hispana Nueva Salud Michoacana we run the test and, if there's an infection, we start treatment during the same visit.

## What's included?

- General urinalysis
- Symptom evaluation
- Diagnosis of urinary infection
- Appropriate treatment based on the result
- Tips to prevent it from coming back

## Common symptoms

Burning when urinating, a constant urge to go, cloudy or foul-smelling urine and lower-abdomen pain. Don't wait: an untreated infection can reach the kidneys.

## Urinary infection care at a Hispanic clinic near you

We are a Hispanic medical center in Pasadena, TX, minutes from the Houston area. Walk in with no appointment: we run the urine test and, if there's an infection, you leave the visit with your treatment indicated.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-heces",
    order: 13,
    category: "laboratorio",
    icon: "TestTubes",
    title: "Exámenes de Heces Fecales",
    titleEn: "Stool Tests",
    shortDescription:
      "Análisis de heces fecales para detectar infecciones y problemas digestivos, en español.",
    shortDescriptionEn:
      "Stool analysis to detect infections and digestive problems, in Spanish.",
    description:
      "Exámenes de heces fecales en Pasadena, TX. Detección de parásitos e infecciones, en español, con precios accesibles.",
    descriptionEn:
      "Stool tests in Pasadena, TX. Detection of parasites and infections, in Spanish, with affordable pricing.",
    keywords: [
      "examen de heces pasadena",
      "analisis de heces fecales pasadena",
      "examen de parasitos pasadena",
      "laboratorio heces pasadena",
    ],
    keywordsEn: [
      "stool test pasadena",
      "stool analysis pasadena",
      "parasite test pasadena",
      "stool lab pasadena",
    ],
    features: [
      "Análisis de heces fecales",
      "Detección de parásitos e infecciones",
      "Evaluación de síntomas digestivos",
      "Resultados explicados en español",
    ],
    featuresEn: [
      "Stool analysis",
      "Detection of parasites and infections",
      "Digestive symptom evaluation",
      "Results explained in Spanish",
    ],
    longDescription: `El examen de heces busca la causa de las molestias digestivas que no se van: parásitos, infecciones intestinales o sangre que no se ve a simple vista. La muestra se entrega en la clínica y los resultados se explican en español.

## ¿Cuándo conviene hacerlo?

Diarrea de más de unos días, dolor o inflamación después de comer, gases y retortijones constantes, evacuaciones con moco o sangre, o pérdida de peso sin explicación. También cuando varios miembros de la familia tienen lo mismo al mismo tiempo.

## ¿Cómo se recoge la muestra?

Te damos el frasco y las indicaciones. La muestra no debe mezclarse con orina ni con agua del inodoro, y se entrega lo antes posible. Si el estudio busca parásitos, a veces se piden tres muestras de días distintos, porque no siempre aparecen en la primera.

## ¿Qué se busca?

Parásitos y sus huevecillos, bacterias que causan infección intestinal, grasa en exceso que sugiere mala absorción y sangre oculta, que es la prueba que se usa como tamizaje de problemas del colon a partir de los 45 años.

## ¿Y después del resultado?

Si hay parásitos o infección, el tratamiento se indica en la clínica y se explica cómo evitar que se repita en casa. Si el estudio sale normal pero los síntomas siguen, el paso lógico es [laboratorio de sangre](/services/examenes-sangre) o una referencia para estudio del colon.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A stool test looks for the cause of digestive problems that will not go away: parasites, intestinal infections or blood you cannot see. The sample is dropped off at the clinic and results are explained in Spanish.

## When is it worth doing?

Diarrhea lasting more than a few days, pain or bloating after meals, constant gas and cramping, stools with mucus or blood, or unexplained weight loss. Also when several people in the household have the same thing at the same time.

## How is the sample collected?

We give you the container and the instructions. The sample must not mix with urine or toilet water, and it should be dropped off as soon as possible. When the test is looking for parasites, three samples from different days are sometimes requested, because they do not always show up in the first one.

## What does it look for?

Parasites and their eggs, bacteria that cause intestinal infection, excess fat that suggests poor absorption, and occult blood, which is the test used to screen for colon problems starting at age 45.

## What happens after the result?

If there are parasites or an infection, treatment is prescribed at the clinic along with advice on keeping it from coming back at home. If the test is normal but symptoms persist, the logical next step is [blood work](/en/services/examenes-sangre) or a referral for a colon study.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-strep",
    order: 14,
    category: "laboratorio",
    icon: "TestTube",
    title: "Prueba de Estreptococo (Strep Test)",
    titleEn: "Strep Test",
    shortDescription:
      "Prueba rápida de estreptococo (strep) para el dolor de garganta, con resultado el mismo día.",
    shortDescriptionEn:
      "Rapid strep test for sore throat, with same-day result.",
    description:
      "Prueba de estreptococo (strep test) en Pasadena, TX. Resultado rápido y tratamiento en español, con precios accesibles.",
    descriptionEn:
      "Strep test in Pasadena, TX. Fast result and treatment in Spanish, with affordable pricing.",
    keywords: [
      "prueba de estreptococo pasadena",
      "strep test pasadena",
      "prueba de garganta pasadena",
      "dolor de garganta doctor pasadena",
    ],
    keywordsEn: [
      "strep test pasadena",
      "rapid strep test pasadena",
      "sore throat test pasadena",
      "strep throat doctor pasadena",
    ],
    features: [
      "Prueba rápida de estreptococo",
      "Resultado el mismo día",
      "Tratamiento si es positivo",
      "Atención sin cita en español",
    ],
    featuresEn: [
      "Rapid strep test",
      "Same-day result",
      "Treatment if positive",
      "Walk-in care in Spanish",
    ],
    longDescription: `No todo dolor de garganta es igual: la faringitis por estreptococo necesita tratamiento específico. En Clínica Hispana Nueva Salud Michoacana hacemos la prueba rápida de strep y te damos el resultado y el tratamiento el mismo día.

## ¿Qué incluye?

- Prueba rápida de estreptococo (hisopado de garganta)
- Resultado en pocos minutos
- Evaluación del dolor de garganta
- Tratamiento adecuado si el resultado es positivo
- Indicaciones de recuperación

## Cuándo hacerla

Dolor de garganta fuerte, fiebre, dificultad para tragar o placas blancas en las amígdalas, sobre todo en niños. La prueba evita tratamientos innecesarios.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Not every sore throat is the same: strep throat needs specific treatment. At Clínica Hispana Nueva Salud Michoacana we run the rapid strep test and give you the result and treatment the same day.

## What's included?

- Rapid strep test (throat swab)
- Result in minutes
- Sore-throat evaluation
- Appropriate treatment if the result is positive
- Recovery instructions

## When to get it

Severe sore throat, fever, trouble swallowing or white patches on the tonsils, especially in children. The test avoids unnecessary treatments.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "prueba-tuberculosis",
    order: 15,
    category: "laboratorio",
    icon: "ShieldPlus",
    title: "Examen de Tuberculosis (TB)",
    titleEn: "Tuberculosis (TB) Test",
    shortDescription:
      "Prueba de tuberculosis (PPD) para trabajo, escuela o trámites, con lectura en español.",
    shortDescriptionEn:
      "Tuberculosis (PPD) test for work, school or paperwork, with reading in Spanish.",
    description:
      "Examen de tuberculosis (TB/PPD) en Pasadena, TX. Para trabajo y escuela, en español, con precios accesibles.",
    descriptionEn:
      "Tuberculosis (TB/PPD) test in Pasadena, TX. For work and school, in Spanish, with affordable pricing.",
    keywords: [
      "examen de tuberculosis pasadena",
      "prueba ppd pasadena",
      "prueba de tb pasadena",
      "tb test español pasadena",
    ],
    keywordsEn: [
      "tuberculosis test pasadena",
      "ppd test pasadena",
      "tb test pasadena",
      "tb skin test pasadena",
    ],
    features: [
      "Prueba cutánea de tuberculosis (PPD)",
      "Lectura del resultado",
      "Útil para trabajo y escuela",
      "Atención en español",
    ],
    featuresEn: [
      "Tuberculosis skin test (PPD)",
      "Result reading",
      "Useful for work and school",
      "Care in Spanish",
    ],
    longDescription: `Muchos trabajos y escuelas piden una prueba de tuberculosis al día. En Clínica Hispana Nueva Salud Michoacana la aplicamos y leemos el resultado, con todo explicado en español.

## ¿Qué incluye?

- Prueba cutánea de tuberculosis (PPD)
- Cita de lectura del resultado (48–72 horas después)
- Documentación del resultado para tu trámite
- Orientación si el resultado requiere seguimiento

## Para qué la piden

Empleos de salud, escuelas, trámites y voluntariado suelen requerir una prueba de TB vigente. Te ayudamos a cumplir el requisito sin complicaciones.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many jobs and schools require an up-to-date tuberculosis test. At Clínica Hispana Nueva Salud Michoacana we administer it and read the result, with everything explained in Spanish.

## What's included?

- Tuberculosis skin test (PPD)
- Result-reading appointment (48–72 hours later)
- Documentation of the result for your paperwork
- Guidance if the result needs follow-up

## Why it's required

Healthcare jobs, schools, paperwork and volunteering often require a current TB test. We help you meet the requirement without hassle.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "enfermedades-transmision-sexual",
    order: 16,
    category: "laboratorio",
    icon: "ShieldCheck",
    title: "Pruebas de Enfermedades de Transmisión Sexual (STD)",
    titleEn: "Sexually Transmitted Disease (STD) Testing",
    shortDescription:
      "Pruebas de enfermedades de transmisión sexual confidenciales y sin juicios, con tratamiento.",
    shortDescriptionEn:
      "Confidential, judgment-free sexually transmitted disease testing, with treatment.",
    description:
      "Pruebas de ETS/STD confidenciales en Pasadena, TX. Resultados y tratamiento en español, con precios accesibles.",
    descriptionEn:
      "Confidential STD testing in Pasadena, TX. Results and treatment in Spanish, with affordable pricing.",
    keywords: [
      "prueba std pasadena",
      "examen de transmision sexual pasadena",
      "prueba ets confidencial pasadena",
      "clinica std español pasadena",
    ],
    keywordsEn: [
      "std testing pasadena",
      "std test near me pasadena",
      "confidential std clinic pasadena",
      "sti testing pasadena",
    ],
    features: [
      "Pruebas confidenciales y sin juicios",
      "Evaluación de síntomas y riesgo",
      "Tratamiento disponible",
      "Atención en español",
    ],
    featuresEn: [
      "Confidential, judgment-free testing",
      "Symptom and risk assessment",
      "Treatment available",
      "Care in Spanish",
    ],
    longDescription: `Las pruebas de ETS se hacen aquí de forma confidencial, sin cita y sin seguro. Si el resultado es positivo, el tratamiento se indica en la clínica y se explica qué hacer con tu pareja.

## ¿Cuándo conviene hacerse la prueba?

Después de un contacto de riesgo, si tienes síntomas como ardor al orinar, flujo distinto, llagas o comezón, al empezar una relación nueva, o durante el embarazo. Los CDC recomiendan la prueba anual de clamidia y gonorrea en mujeres sexualmente activas menores de 25 años.

## ¿Cuánto hay que esperar después del contacto?

Cada infección tiene su ventana: unos días para clamidia y gonorrea, semanas para sífilis y VIH. Hacerse la prueba demasiado pronto puede dar un resultado negativo falso, así que en la consulta te decimos cuándo conviene repetirla.

## ¿Muchas infecciones no dan síntomas?

Sí, y ese es el punto. La clamidia y la gonorrea pueden pasar meses en silencio y, sin tratamiento, afectar la fertilidad. Por eso la prueba no es solo para cuando algo duele.

## ¿Es confidencial?

Sí. Tu resultado es tuyo. Se explica en privado y, si hay tratamiento, se te indica ahí mismo junto con la recomendación de que tu pareja también se revise para evitar el rebote de la infección.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `STD testing is done here confidentially, walk-in and without insurance. If a result is positive, treatment is prescribed at the clinic and we explain what to do about your partner.

## When should I get tested?

After a risky encounter, if you have symptoms such as burning when urinating, unusual discharge, sores or itching, when starting a new relationship, or during pregnancy. The CDC recommends annual chlamydia and gonorrhea screening for sexually active women under 25.

## How long after exposure should I wait?

Each infection has its own window: a few days for chlamydia and gonorrhea, weeks for syphilis and HIV. Testing too early can give a false negative, so at the visit we tell you when it is worth repeating.

## Do many infections have no symptoms?

Yes, and that is the point. Chlamydia and gonorrhea can go months unnoticed and, untreated, affect fertility. That is why testing is not only for when something hurts.

## Is it confidential?

Yes. Your result is yours. It is explained in private and, if treatment is needed, it is prescribed right there, along with the recommendation that your partner get checked too so the infection does not bounce back.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-alcohol-drogas",
    order: 17,
    category: "examenes",
    icon: "Beaker",
    title: "Exámenes de Alcohol y Drogas",
    titleEn: "Alcohol & Drug Testing",
    shortDescription:
      "Pruebas de alcohol y drogas para trabajo y trámites, rápidas y con documentación.",
    shortDescriptionEn:
      "Alcohol and drug testing for work and paperwork, fast and with documentation.",
    description:
      "Exámenes de alcohol y drogas en Pasadena, TX. Para empleo y trámites, en español, con precios accesibles.",
    descriptionEn:
      "Alcohol and drug testing in Pasadena, TX. For employment and paperwork, in Spanish, with affordable pricing.",
    keywords: [
      "examen de drogas pasadena",
      "prueba de alcohol y drogas pasadena",
      "drug test pasadena español",
      "examen de drogas para trabajo pasadena",
    ],
    keywordsEn: [
      "drug test pasadena",
      "alcohol and drug test pasadena",
      "employment drug test pasadena",
      "drug screening pasadena",
    ],
    features: [
      "Prueba de drogas para empleo",
      "Prueba de alcohol",
      "Proceso rápido",
      "Documentación del resultado",
    ],
    featuresEn: [
      "Drug test for employment",
      "Alcohol test",
      "Fast process",
      "Result documentation",
    ],
    longDescription: `Muchos empleos y trámites requieren una prueba de alcohol y drogas. En Clínica Hispana Nueva Salud Michoacana la realizamos de forma rápida y te entregamos la documentación que necesitas.

## ¿Qué incluye?

- Prueba de detección de drogas
- Prueba de alcohol
- Proceso ágil y discreto
- Documentación del resultado para tu empleador o trámite

## Para trabajo y trámites

Atendemos solicitudes de empleo, requisitos laborales y trámites personales. Te explicamos el proceso en español para que llegues tranquilo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many jobs and processes require an alcohol and drug test. At Clínica Hispana Nueva Salud Michoacana we perform it quickly and give you the documentation you need.

## What's included?

- Drug screening test
- Alcohol test
- Quick, discreet process
- Result documentation for your employer or paperwork

## For work and paperwork

We handle job applications, workplace requirements and personal paperwork. We explain the process in Spanish so you arrive with peace of mind.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "electrocardiograma",
    order: 18,
    category: "laboratorio",
    icon: "HeartPulse",
    title: "Electrocardiograma (EKG)",
    titleEn: "Electrocardiogram (EKG)",
    shortDescription:
      "Electrocardiograma (EKG) rápido y sin dolor para evaluar la salud de tu corazón, en español.",
    shortDescriptionEn:
      "Fast, painless electrocardiogram (EKG) to evaluate your heart health, in Spanish.",
    description:
      "Electrocardiograma EKG en Pasadena, TX, rápido y sin dolor. Resultados y atención en español, con precios accesibles.",
    descriptionEn:
      "Electrocardiogram EKG in Pasadena, TX, fast and painless. Results and care in Spanish, with affordable pricing.",
    keywords: [
      "electrocardiograma pasadena",
      "ekg pasadena español",
      "examen del corazon pasadena",
      "ecg pasadena",
    ],
    keywordsEn: [
      "electrocardiogram pasadena",
      "ekg pasadena",
      "heart test pasadena",
      "ecg pasadena spanish",
    ],
    features: [
      "Estudio rápido y sin dolor",
      "Evaluación del ritmo cardiaco",
      "Útil para exámenes médicos",
      "Resultados en español",
    ],
    featuresEn: [
      "Fast and painless test",
      "Heart-rhythm evaluation",
      "Useful for medical exams",
      "Results in Spanish",
    ],
    longDescription: `El electrocardiograma (EKG) registra la actividad eléctrica de tu corazón en pocos minutos y sin ninguna molestia. En Clínica Hispana Nueva Salud Michoacana lo realizamos como parte de chequeos y exámenes médicos.

## ¿Qué incluye?

- Estudio del ritmo y la actividad del corazón
- Interpretación por personal médico
- Útil para exámenes de trabajo, deporte o cirugía
- Resultados explicados en español

## Cuándo se recomienda

Si tienes palpitaciones, presión alta, dolor en el pecho o necesitas un examen médico completo, el EKG aporta información valiosa sobre tu corazón.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `The electrocardiogram (EKG) records your heart's electrical activity in just a few minutes with no discomfort. At Clínica Hispana Nueva Salud Michoacana we perform it as part of checkups and medical exams.

## What's included?

- Study of your heart's rhythm and activity
- Interpretation by medical staff
- Useful for work, sports or surgery exams
- Results explained in Spanish

## When it's recommended

If you have palpitations, high blood pressure, chest discomfort or need a complete medical exam, the EKG provides valuable information about your heart.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "ultrasonido",
    order: 19,
    category: "laboratorio",
    icon: "ScanLine",
    title: "Ultrasonido y Ecografía",
    titleEn: "Ultrasound & Sonography",
    shortDescription:
      "Ultrasonidos diagnósticos y de embarazo con equipo moderno y atención en español.",
    shortDescriptionEn:
      "Diagnostic and pregnancy ultrasounds with modern equipment and care in Spanish.",
    description:
      "Ultrasonido y ecografía en Pasadena, TX: abdominal, pélvico y de embarazo. En español, con precios accesibles.",
    descriptionEn:
      "Ultrasound and sonography in Pasadena, TX: abdominal, pelvic and pregnancy. In Spanish, with affordable pricing.",
    keywords: [
      "ultrasonido pasadena",
      "ecografia pasadena español",
      "ultrasonido de embarazo pasadena",
      "sonograma pasadena",
    ],
    keywordsEn: [
      "ultrasound pasadena",
      "sonogram pasadena",
      "pregnancy ultrasound pasadena",
      "abdominal ultrasound pasadena",
    ],
    features: [
      "Ultrasonido abdominal y pélvico",
      "Ultrasonido de embarazo",
      "Equipo moderno",
      "Atención en español",
    ],
    featuresEn: [
      "Abdominal and pelvic ultrasound",
      "Pregnancy ultrasound",
      "Modern equipment",
      "Care in Spanish",
    ],
    longDescription: `El ultrasonido usa ondas de sonido, no radiación, así que es seguro incluso en el embarazo. Se hace en la clínica, sin cita, y el personal te explica en español qué se está viendo.

## ¿Qué estudios se hacen?

Abdominal (hígado, vesícula, riñones, páncreas y bazo), pélvico, de embarazo para control y seguimiento, de tiroides y de tejidos blandos cuando hay un bulto o una zona inflamada que hay que revisar.

## ¿Cómo me preparo?

Para el abdominal, entre 6 y 8 horas sin comer, porque la comida y el gas tapan la vista de la vesícula. Para el pélvico y algunos de embarazo, al contrario: hay que llegar con la vejiga llena, tomando agua una hora antes y sin ir al baño.

## ¿Duele o es incómodo?

No duele. Se aplica un gel frío y se desliza el transductor sobre la piel; si la zona está inflamada puede haber algo de molestia al presionar. El estudio dura entre 15 y 30 minutos según lo que se revise.

## ¿Cuándo tengo el resultado?

Se revisa en la misma visita y se te explica qué se vio. Si el hallazgo requiere otro estudio o un especialista, se orienta la referencia y te decimos con claridad cuál es el siguiente paso.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Ultrasound uses sound waves, not radiation, so it is safe even in pregnancy. It is done at the clinic, walk-in, and staff explain in Spanish what is being seen.

## Which studies do you perform?

Abdominal (liver, gallbladder, kidneys, pancreas and spleen), pelvic, pregnancy scans for monitoring and follow-up, thyroid, and soft tissue when there is a lump or a swollen area to check.

## How do I prepare?

For an abdominal scan, 6 to 8 hours without food, because food and gas block the view of the gallbladder. For pelvic and some pregnancy scans it is the opposite: arrive with a full bladder, drinking water an hour before and not using the restroom.

## Does it hurt?

No. Cold gel is applied and the probe slides over the skin; if the area is inflamed there may be some discomfort with pressure. The study takes 15 to 30 minutes depending on what is being reviewed.

## When do I get the result?

It is reviewed during the same visit and explained to you. If the finding calls for another study or a specialist, we guide the referral and tell you clearly what the next step is.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examen-dot",
    order: 20,
    category: "examenes",
    icon: "Truck",
    highlighted: true,
    title: "Examen Físico DOT - Licencia CDL",
    titleEn: "DOT Physical Exam - CDL License",
    shortDescription:
      "Examen físico DOT para conductores comerciales (CDL), con certificado el mismo día.",
    shortDescriptionEn:
      "DOT physical exam for commercial drivers (CDL), with same-day certificate.",
    description:
      "Examen físico DOT en Pasadena, TX para licencia CDL, certificado el mismo día y en español. Con precios accesibles.",
    descriptionEn:
      "DOT physical exam in Pasadena, TX for CDL license, same-day certificate, in Spanish. With affordable pricing.",
    keywords: [
      "examen dot pasadena",
      "examen fisico dot pasadena español",
      "examen cdl pasadena",
      "dot physical pasadena español",
    ],
    keywordsEn: [
      "dot physical pasadena",
      "dot exam pasadena",
      "cdl physical pasadena",
      "dot medical exam pasadena",
    ],
    features: [
      "Certificado DOT el mismo día",
      "Para licencia CDL",
      "Proceso rápido",
      "Atención en español",
    ],
    featuresEn: [
      "Same-day DOT certificate",
      "For CDL license",
      "Fast process",
      "Care in Spanish",
    ],
    longDescription: `El examen físico DOT certifica que puedes manejar un vehículo comercial con seguridad. En la Michoacana lo hacemos sin cita, en español, y sales el mismo día con tu certificado.

## ¿Qué se revisa?

Visión (20/40 en cada ojo, con lentes si los usas), audición, presión arterial, análisis de orina, corazón y pulmones, columna y movilidad, más tu historial de medicamentos y condiciones como diabetes, apnea del sueño o cirugías recientes.

## ¿Qué debo traer?

Identificación con foto, tu CDL o el permiso, lentes o aparatos auditivos, la lista de tus medicamentos y, si aplican, el formulario de insulina llenado por tu médico o el reporte de uso del CPAP de los últimos 90 días. Sin esos papeles el certificado se retrasa.

## ¿Cuánto dura el certificado?

Hasta 24 meses. Si tu presión está alta o llevas control de una condición crónica, puede salir por 12 meses o menos, para revisarte antes. La presión es el motivo más común de un certificado corto: evita café y cigarro antes de la cita y ven descansado.

## ¿Y si algo sale mal ese día?

Aquí mismo tienes [laboratorio](/services/examenes-sangre) y [control de presión, diabetes y colesterol](/services/condiciones-cronicas), así que se puede empezar a resolver en la misma visita en vez de mandarte a otro lugar. Si quieres prepararte, lee la [guía del examen DOT](/blog/examen-dot-cdl-camioneros-pasadena).

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `The DOT physical certifies that you can operate a commercial vehicle safely. At La Michoacana we do it walk-in, in Spanish, and you leave the same day with your certificate.

## What gets checked?

Vision (20/40 in each eye, with glasses if you wear them), hearing, blood pressure, urinalysis, heart and lungs, spine and mobility, plus your history of medications and conditions such as diabetes, sleep apnea or recent surgery.

## What should I bring?

Photo ID, your CDL or permit, glasses or hearing aids, your medication list and, if they apply, the insulin form completed by your provider or your CPAP compliance report for the last 90 days. Without those papers the certificate gets delayed.

## How long is the certificate good for?

Up to 24 months. If your blood pressure is high or you are managing a chronic condition, it may be issued for 12 months or less so you get rechecked sooner. Blood pressure is the most common reason for a short certificate: skip coffee and cigarettes before the visit and come rested.

## What if something comes up that day?

We have [lab work](/en/services/examenes-sangre) and [blood pressure, diabetes and cholesterol care](/en/services/condiciones-cronicas) right here, so it can be addressed in the same visit instead of sending you somewhere else. To prepare, read our [DOT exam guide](/en/blog/examen-dot-cdl-camioneros-pasadena).

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "examenes-inmigracion",
    order: 21,
    category: "examenes",
    icon: "ClipboardCheck",
    title: "Examen Médico de Inmigración I-693",
    titleEn: "Immigration Medical Exam I-693",
    shortDescription:
      "Examen médico de inmigración con médico autorizado por USCIS y el Formulario I-693 sellado.",
    shortDescriptionEn:
      "Immigration medical exam with a USCIS-authorized physician and the sealed Form I-693.",
    description:
      "Examen médico de inmigración I-693 en Pasadena, TX con médico autorizado por USCIS. Vacunas y formulario sellado.",
    descriptionEn:
      "I-693 immigration medical exam in Pasadena, TX with a USCIS-authorized physician. Vaccines and sealed form.",
    keywords: [
      "examen de inmigracion pasadena",
      "examen medico i-693 pasadena",
      "civil surgeon pasadena español",
      "medico autorizado uscis pasadena",
    ],
    keywordsEn: [
      "immigration medical exam pasadena",
      "i-693 exam pasadena",
      "civil surgeon pasadena",
      "uscis authorized doctor pasadena",
    ],
    features: [
      "Médico autorizado (civil surgeon)",
      "Formulario I-693 sellado",
      "Vacunas requeridas disponibles",
      "Proceso explicado en español",
    ],
    featuresEn: [
      "Authorized civil surgeon",
      "Sealed Form I-693",
      "Required vaccines available",
      "Process explained in Spanish",
    ],
    longDescription: `Somos civil surgeon autorizado por USCIS: hacemos el examen médico de inmigración completo, con laboratorio y vacunas en el mismo lugar, y te entregamos el Formulario I-693 en su sobre sellado.

## ¿Qué revisa el examen?

Cuatro cosas: enfermedades transmisibles de importancia para la salud pública, vacunas exigidas, trastornos con comportamiento peligroso y consumo de drogas. Tener diabetes, presión alta o sobrepeso no afecta tu trámite.

## ¿Qué debo traer?

Identificación con foto, tu cartilla de vacunas (aunque sea de tu país y en español), la lista de tus medicamentos, resultados previos de tuberculosis si los tienes y el aviso de USCIS de tu caso. Sin cartilla se repiten dosis que ya tenías.

## ¿Cuánto dura y cuándo sale?

La visita suele tomar menos de una hora. Si la prueba de tuberculosis sale positiva, sigue una radiografía y el proceso se alarga unos días. Algunas vacunas necesitan una segunda dosis: pregunta desde el primer día si tu esquema la requiere.

## ¿El formulario caduca?

Desde 2024, el I-693 firmado no tiene fecha de vencimiento mientras esté bien llenado. No abras el sobre: si llega abierto, USCIS puede rechazarlo. Si quieres prepararte, lee la [guía del examen I-693](/blog/guia-examen-medico-inmigracion-i693-pasadena).

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `We are a USCIS-authorized civil surgeon: we perform the full immigration medical exam, with lab work and vaccines in the same place, and hand you Form I-693 in its sealed envelope.

## What does the exam check?

Four things: communicable diseases of public health significance, required vaccines, disorders with harmful behavior and drug use. Having diabetes, high blood pressure or extra weight does not affect your case.

## What should I bring?

Photo ID, your vaccination record (even if it is from your home country and in Spanish), your medication list, previous tuberculosis results if you have them and the USCIS notice for your case. Without the record, doses you already had get repeated.

## How long does it take?

The visit usually takes under an hour. If the tuberculosis test is positive, a chest X-ray follows and the process stretches a few days. Some vaccines need a second dose: ask on day one whether your schedule requires it.

## Does the form expire?

Since 2024, the signed I-693 has no expiration date as long as it is properly completed. Do not open the envelope: if it arrives open, USCIS can reject it. To prepare, read our [I-693 exam guide](/en/blog/guia-examen-medico-inmigracion-i693-pasadena).

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "vacunas",
    order: 22,
    category: "tratamientos",
    icon: "Syringe",
    title: "Vacunas contra la Influenza y Toxoide Tetánico",
    titleEn: "Flu and Tetanus (Tdap) Vaccines",
    shortDescription:
      "Vacuna contra la influenza (flu) y toxoide tetánico, aplicadas por personal médico, en español.",
    shortDescriptionEn:
      "Influenza (flu) vaccine and tetanus toxoid, administered by medical staff, in Spanish.",
    description:
      "Vacunas de flu y toxoide tetánico en Pasadena, TX. Aplicación por personal médico en español, con precios accesibles.",
    descriptionEn:
      "Flu and tetanus vaccines in Pasadena, TX. Administered by medical staff in Spanish, with affordable pricing.",
    keywords: [
      "vacuna de la flu pasadena",
      "vacuna contra la influenza pasadena",
      "toxoide tetanico pasadena",
      "vacuna del tetano pasadena",
    ],
    keywordsEn: [
      "flu shot pasadena",
      "flu vaccine pasadena",
      "tetanus shot pasadena",
      "tdap vaccine pasadena",
    ],
    features: [
      "Vacuna contra la influenza (flu)",
      "Toxoide tetánico",
      "Aplicación por personal médico",
      "Atención en español",
    ],
    featuresEn: [
      "Influenza (flu) vaccine",
      "Tetanus toxoid",
      "Administered by medical staff",
      "Care in Spanish",
    ],
    longDescription: `Aplicamos la vacuna contra la influenza y el toxoide tetánico sin cita, en minutos y con registro por escrito para que lo lleves a la escuela, al trabajo o a tu trámite.

## ¿Cuándo toca la vacuna de la influenza?

Cada año, y conviene ponerla al inicio de la temporada, entre septiembre y octubre, porque la protección tarda unas dos semanas en instalarse. Ponerla tarde sigue sirviendo: la temporada en Texas se extiende hasta bien entrado el invierno.

## ¿Cada cuánto se pone el tétanos?

El refuerzo se pone cada diez años. También se adelanta cuando hay una herida sucia, profunda o con metal oxidado y han pasado más de cinco años desde la última dosis. Si no recuerdas cuándo fue la tuya, dilo: se decide con base en eso.

## ¿Qué reacciones son normales?

Dolor o enrojecimiento en el brazo uno o dos días, y a veces cansancio o febrícula. No significa que la vacuna te haya enfermado. Lo que sí hay que atender de inmediato: ronchas por todo el cuerpo, hinchazón de labios o lengua, o dificultad para respirar.

## ¿Sirven para trámites?

Sí. Te entregamos el comprobante con fecha. Si estás haciendo un trámite migratorio, el [examen I-693](/services/examenes-inmigracion) incluye la revisión completa del esquema y la aplicación de las vacunas que exige USCIS.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `We give the influenza vaccine and tetanus toxoid walk-in, in minutes, with written documentation you can take to school, work or your paperwork.

## When is the flu shot due?

Every year, ideally at the start of the season, September to October, because protection takes about two weeks to build. Getting it late still helps: the Texas season runs well into winter.

## How often is the tetanus booster?

Every ten years. It is also moved up when there is a dirty or deep wound, or one involving rusty metal, and more than five years have passed since your last dose. If you cannot recall when yours was, say so: that is how the decision is made.

## Which reactions are normal?

Soreness or redness in the arm for a day or two, sometimes fatigue or a slight fever. It does not mean the vaccine made you sick. What needs immediate attention: a body-wide rash, swelling of lips or tongue, or trouble breathing.

## Do they count for paperwork?

Yes. We give you dated documentation. If you are going through an immigration process, the [I-693 exam](/en/services/examenes-inmigracion) includes a full review of your schedule and the vaccines USCIS requires.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "sueros-vitaminados",
    order: 23,
    category: "tratamientos",
    icon: "Droplets",
    title: "Sueros Vitaminados (Terapia IV)",
    titleEn: "Vitamin IV Therapy",
    shortDescription:
      "Sueros vitaminados intravenosos para hidratación y energía, aplicados por personal médico.",
    shortDescriptionEn:
      "Intravenous vitamin drips for hydration and energy, administered by medical staff.",
    description:
      "Sueros vitaminados (terapia IV) en Pasadena, TX. Hidratación y vitaminas en español, con precios accesibles.",
    descriptionEn:
      "Vitamin IV therapy in Pasadena, TX. Hydration and vitamins in Spanish, with affordable pricing.",
    keywords: [
      "sueros vitaminados pasadena",
      "terapia iv pasadena",
      "suero de vitaminas pasadena",
      "hidratacion intravenosa pasadena",
    ],
    keywordsEn: [
      "vitamin iv therapy pasadena",
      "iv drip pasadena",
      "iv hydration pasadena",
      "vitamin drip pasadena",
    ],
    features: [
      "Hidratación intravenosa",
      "Vitaminas y minerales",
      "Aplicación por personal médico",
      "Atención en español",
    ],
    featuresEn: [
      "Intravenous hydration",
      "Vitamins and minerals",
      "Administered by medical staff",
      "Care in Spanish",
    ],
    longDescription: `Un suero vitaminado es hidratación con vitaminas y minerales que entra por vía intravenosa, aplicada y vigilada por personal médico. En la Michoacana lo hacemos en un área tranquila, con una evaluación breve antes para confirmar que es apropiado para ti.

## ¿Cuánto tarda la aplicación?

Entre 30 y 45 minutos, sentado y con el brazo libre. Antes se revisan tu presión y tus antecedentes, y durante la aplicación el personal está pendiente de cómo te sientes. Puedes venir sin cita, aunque conviene llamar antes para confirmar disponibilidad del día.

## ¿Qué lleva el suero?

La mezcla la define el personal médico según tu evaluación, así que no publicamos una fórmula fija: pregunta en la clínica qué contiene el que te corresponde y cuánto cuesta antes de empezar. Si tomas medicamentos o tienes problemas de riñón o del corazón, dilo en la evaluación.

## ¿Suero o inyección de B12?

Depende de lo que necesites. Si lo tuyo es cansancio asociado a falta de vitamina B12, la **inyección intramuscular** es más rápida y barata: menos de cinco minutos, sin vía intravenosa y todos los días sin cita. Lo sensato es medir primero: mira la [promoción de examen general de sangre más B12](/promociones) y la [guía de la vitamina B12](/blog/vitamina-b12-pasadena-beneficios-inyecciones).

## ¿Quién no debería ponerse uno?

Un suero no sustituye un diagnóstico. Si llevas días con vómito, diarrea, fiebre o te sientes muy débil, lo primero es una consulta: esos síntomas pueden tener una causa que se trata de otra manera. Aquí te atendemos el mismo día y, si hace falta, pasamos a [laboratorio](/services/examenes-sangre).

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A vitamin IV is hydration with vitamins and minerals delivered intravenously, given and monitored by medical staff. At La Michoacana we do it in a quiet area, with a short evaluation first to confirm it is appropriate for you.

## How long does it take?

Between 30 and 45 minutes, seated, with one arm free. Your blood pressure and history are checked first, and staff keep an eye on how you feel throughout. You can walk in, though it helps to call ahead to confirm availability that day.

## What is in the drip?

The mix is decided by the medical staff based on your evaluation, so we do not publish a fixed formula: ask at the clinic what yours contains and what it costs before starting. If you take medication or have kidney or heart problems, say so during the evaluation.

## IV drip or B12 injection?

It depends on what you need. If your fatigue is linked to low vitamin B12, the **intramuscular injection** is faster and cheaper: under five minutes, no IV line, available every day without an appointment. The sensible move is to measure first: see the [blood panel plus B12 promotion](/en/promociones) and the [vitamin B12 guide](/en/blog/vitamina-b12-pasadena-beneficios-inyecciones).

## Who should not get one?

A drip is not a diagnosis. If you have had days of vomiting, diarrhea, fever or feel very weak, start with a visit: those symptoms can have a cause that is treated differently. We see you the same day and move to [lab work](/en/services/examenes-sangre) if needed.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "suturas-heridas",
    order: 24,
    category: "tratamientos",
    icon: "Scissors",
    title: "Suturas de Heridas",
    titleEn: "Wound Suturing",
    shortDescription:
      "Suturas (puntos) para cerrar heridas de forma segura, sin cita previa y en español.",
    shortDescriptionEn:
      "Sutures (stitches) to close wounds safely, walk-ins welcome and in Spanish.",
    description:
      "Suturas de heridas en Pasadena, TX. Cierre de cortes y heridas en español, con precios accesibles.",
    descriptionEn:
      "Wound suturing in Pasadena, TX. Closing cuts and wounds in Spanish, with affordable pricing.",
    keywords: [
      "suturas pasadena",
      "puntos para herida pasadena",
      "cerrar herida pasadena",
      "doctor para cortadas pasadena",
    ],
    keywordsEn: [
      "wound suturing pasadena",
      "stitches pasadena",
      "laceration repair pasadena",
      "cut treatment pasadena",
    ],
    features: [
      "Cierre de heridas con suturas",
      "Limpieza y desinfección",
      "Atención sin cita previa",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Wound closure with sutures",
      "Cleaning and disinfection",
      "Walk-ins welcome",
      "After-care instructions",
    ],
    longDescription: `Una herida que no cierra bien puede infectarse o dejar cicatriz. En Clínica Hispana Nueva Salud Michoacana cerramos cortes y heridas con suturas de forma segura, sin cita y con atención en español.

## ¿Qué incluye?

- Evaluación y limpieza de la herida
- Cierre con suturas (puntos)
- Aplicación de anestesia local
- Indicaciones de cuidado y signos de alarma
- Retiro de puntos cuando corresponde

## Cuándo acudir

Cortes profundos, heridas que sangran o no cierran solas, o que tienen bordes abiertos. Atender pronto reduce el riesgo de infección y mejora la cicatrización.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A wound that doesn't close well can get infected or leave a scar. At Clínica Hispana Nueva Salud Michoacana we close cuts and wounds with sutures safely, no appointment needed and with care in Spanish.

## What's included?

- Wound evaluation and cleaning
- Closure with sutures (stitches)
- Local anesthesia
- Care instructions and warning signs
- Suture removal when appropriate

## When to come in

Deep cuts, wounds that bleed or won't close on their own, or that have open edges. Treating them promptly reduces the risk of infection and improves healing.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "curacion-heridas",
    order: 25,
    category: "tratamientos",
    icon: "Bandage",
    title: "Cura y Curación de Heridas",
    titleEn: "Wound Care",
    shortDescription:
      "Limpieza, curación y cambio de vendajes de heridas para una buena cicatrización, en español.",
    shortDescriptionEn:
      "Cleaning, wound care and dressing changes for proper healing, in Spanish.",
    description:
      "Cura y curación de heridas en Pasadena, TX. Limpieza y vendajes en español, con precios accesibles.",
    descriptionEn:
      "Wound care in Pasadena, TX. Cleaning and dressings in Spanish, with affordable pricing.",
    keywords: [
      "curacion de heridas pasadena",
      "cura de heridas pasadena",
      "cambio de vendaje pasadena",
      "limpieza de herida pasadena",
    ],
    keywordsEn: [
      "wound care pasadena",
      "wound dressing pasadena",
      "dressing change pasadena",
      "wound cleaning pasadena",
    ],
    features: [
      "Limpieza y desinfección",
      "Cambio de vendajes",
      "Seguimiento de la cicatrización",
      "Atención en español",
    ],
    featuresEn: [
      "Cleaning and disinfection",
      "Dressing changes",
      "Healing follow-up",
      "Care in Spanish",
    ],
    longDescription: `Una herida que se limpia bien y se cubre como toca cierra antes y se infecta menos. En la Michoacana hacemos curaciones sin cita, con el material adecuado y seguimiento hasta que cierra.

## ¿Qué heridas atendemos?

Heridas de trabajo y de casa, cortes ya suturados que necesitan cambio de vendaje, heridas después de una cirugía, quemaduras pequeñas, raspones profundos y llagas que llevan semanas sin cerrar, incluidas las del pie de quien vive con diabetes.

## ¿Cómo es una curación?

Se retira el vendaje anterior, se limpia la herida, se revisa si hay tejido muerto o señales de infección, se aplica el apósito que le corresponde a esa herida y se cubre. Toma pocos minutos y, según el caso, se repite cada dos o tres días.

## ¿Cuándo hay que venir de inmediato?

Cuando el enrojecimiento crece alrededor, sale pus o mal olor, aparece fiebre, la zona se hincha o el dolor aumenta en vez de bajar. También si la herida fue con metal oxidado o mordida: ahí se revisa además si te toca refuerzo de la vacuna del tétanos.

## ¿Y si soy diabético?

Las heridas en el pie merecen una revisión pronta, aunque se vean pequeñas y no duelan. La falta de sensibilidad hace que se descubran tarde. Aquí puedes combinar la curación con el [control de diabetes](/services/condiciones-cronicas) y revisar de paso tu azúcar.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `A wound that is cleaned properly and dressed the right way closes sooner and gets infected less often. At La Michoacana we do wound care walk-in, with the right supplies and follow-up until it closes.

## Which wounds do you treat?

Work and household wounds, sutured cuts that need dressing changes, wounds after surgery, small burns, deep scrapes and sores that have gone weeks without closing, including foot wounds in people living with diabetes.

## What does a wound care visit involve?

The old dressing comes off, the wound is cleaned, we check for dead tissue or signs of infection, apply the dressing that suits that wound and cover it. It takes a few minutes and, depending on the case, repeats every two or three days.

## When should I come in right away?

When redness spreads around it, there is pus or a bad smell, fever appears, the area swells or pain increases instead of easing. Also if the wound came from rusty metal or a bite: we then check whether you are due for a tetanus booster.

## What if I have diabetes?

Foot wounds deserve a prompt look, even when they seem small and do not hurt. Reduced sensation means they get noticed late. Here you can combine wound care with [diabetes care](/en/services/condiciones-cronicas) and have your blood sugar checked at the same time.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "cirugias-menores",
    order: 26,
    category: "tratamientos",
    icon: "Stethoscope",
    title: "Cirugías Menores",
    titleEn: "Minor Surgery",
    shortDescription:
      "Procedimientos de cirugía menor ambulatoria (lunares, quistes, lipomas) con anestesia local.",
    shortDescriptionEn:
      "Minor outpatient surgical procedures (moles, cysts, lipomas) with local anesthesia.",
    description:
      "Cirugías menores en Pasadena, TX: lunares, quistes y lipomas. Procedimiento ambulatorio en español, con precios accesibles.",
    descriptionEn:
      "Minor surgery in Pasadena, TX: moles, cysts and lipomas. Outpatient procedure in Spanish, with affordable pricing.",
    keywords: [
      "cirugia menor pasadena",
      "quitar lunar pasadena",
      "extraccion de quiste pasadena",
      "cirugia ambulatoria pasadena",
    ],
    keywordsEn: [
      "minor surgery pasadena",
      "mole removal pasadena",
      "cyst removal pasadena",
      "lipoma removal pasadena",
    ],
    features: [
      "Procedimientos ambulatorios",
      "Anestesia local",
      "Extracción de lunares, quistes y lipomas",
      "Cuidado posterior explicado",
    ],
    featuresEn: [
      "Outpatient procedures",
      "Local anesthesia",
      "Removal of moles, cysts and lipomas",
      "After-care explained",
    ],
    longDescription: `Muchos problemas de piel y tejidos blandos se resuelven con un procedimiento sencillo. En Clínica Hispana Nueva Salud Michoacana realizamos cirugías menores ambulatorias con anestesia local, en un mismo día.

## ¿Qué incluye?

- Evaluación del lunar, quiste o lesión
- Procedimiento ambulatorio con anestesia local
- Extracción de lunares, quistes y lipomas
- Indicaciones claras de cuidado posterior
- Retiro de puntos cuando corresponde

## Rápido y seguro

La mayoría de estos procedimientos toman poco tiempo y no requieren hospitalización. Te explicamos cada paso en español para que estés tranquilo.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `Many skin and soft-tissue problems are solved with a simple procedure. At Clínica Hispana Nueva Salud Michoacana we perform minor outpatient surgery with local anesthesia, in a single day.

## What's included?

- Evaluation of the mole, cyst or lesion
- Outpatient procedure with local anesthesia
- Removal of moles, cysts and lipomas
- Clear after-care instructions
- Suture removal when appropriate

## Fast and safe

Most of these procedures take little time and don't require hospitalization. We explain every step in Spanish so you feel at ease.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "drenaje-abscesos",
    order: 27,
    category: "tratamientos",
    icon: "Droplet",
    title: "Drenaje de Abscesos",
    titleEn: "Abscess Drainage",
    shortDescription:
      "Drenaje de abscesos e infecciones de piel para aliviar el dolor y favorecer la curación.",
    shortDescriptionEn:
      "Drainage of abscesses and skin infections to relieve pain and promote healing.",
    description:
      "Drenaje de abscesos en Pasadena, TX. Tratamiento de infecciones de piel en español, con precios accesibles.",
    descriptionEn:
      "Abscess drainage in Pasadena, TX. Treatment of skin infections in Spanish, with affordable pricing.",
    keywords: [
      "drenaje de absceso pasadena",
      "drenar absceso pasadena",
      "infeccion de piel pasadena",
      "tratamiento de absceso pasadena",
    ],
    keywordsEn: [
      "abscess drainage pasadena",
      "drain abscess pasadena",
      "skin infection pasadena",
      "boil treatment pasadena",
    ],
    features: [
      "Drenaje del absceso",
      "Limpieza y desinfección",
      "Anestesia local",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Abscess drainage",
      "Cleaning and disinfection",
      "Local anesthesia",
      "After-care instructions",
    ],
    longDescription: `Un absceso es una bolsa de pus bajo la piel que no se quita con antibiótico solo: hay que drenarla. En la Michoacana lo hacemos con anestesia local, sin cita, y el alivio se siente casi de inmediato.

## ¿Cómo sé que es un absceso?

Un bulto rojo, caliente y doloroso que crece en días, a veces con una punta blanca o amarilla y con la piel tensa. Puede venir con fiebre o con la zona endurecida alrededor. Si está en la ingle, la axila o la cara, conviene revisarlo pronto.

## ¿Qué se hace en la visita?

Se evalúa la zona, se aplica anestesia local y se hace una incisión pequeña para sacar el pus. Se limpia por dentro, a veces se deja una gasa para que siga drenando y se cubre. El procedimiento dura pocos minutos y muchas personas notan alivio al salir.

## ¿Necesito antibiótico?

No siempre. En muchos casos el drenaje resuelve el problema, y el antibiótico se reserva para cuando hay fiebre, la infección se está extendiendo o hay condiciones como diabetes. Eso se decide al revisarte, no por teléfono.

## ¿Y después?

Te damos indicaciones de limpieza y una cita de seguimiento para revisar la herida. Si la zona vuelve a llenarse, aumenta el dolor o aparece fiebre, regresa. Los abscesos que se repiten en el mismo lugar merecen estudiarse: a veces hay una causa de fondo, como azúcar alta sin diagnosticar.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `An abscess is a pocket of pus under the skin that antibiotics alone will not clear: it has to be drained. At La Michoacana we do it with local anesthesia, walk-in, and the relief is almost immediate.

## How do I know it is an abscess?

A red, warm, painful lump that grows over days, sometimes with a white or yellow point and tight skin. It can come with fever or with hardened tissue around it. If it is in the groin, armpit or face, get it looked at sooner.

## What happens during the visit?

The area is evaluated, local anesthesia is given and a small incision releases the pus. The cavity is cleaned, sometimes packed with gauze so it keeps draining, and covered. The procedure takes a few minutes and most people feel better on the way out.

## Do I need antibiotics?

Not always. Drainage alone resolves many cases, and antibiotics are kept for fever, spreading infection or conditions such as diabetes. That is decided when we examine you, not over the phone.

## What comes next?

You get cleaning instructions and a follow-up visit to check the wound. If it fills up again, the pain increases or fever appears, come back. Abscesses that keep returning in the same spot deserve a workup: sometimes there is an underlying cause, such as undiagnosed high blood sugar.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "unas-encarnadas",
    order: 28,
    category: "tratamientos",
    icon: "Footprints",
    title: "Extracción de Uñas Encarnadas",
    titleEn: "Ingrown Toenail Removal",
    shortDescription:
      "Tratamiento de uñas encarnadas para aliviar el dolor y prevenir infecciones, en español.",
    shortDescriptionEn:
      "Ingrown toenail treatment to relieve pain and prevent infection, in Spanish.",
    description:
      "Extracción de uñas encarnadas en Pasadena, TX. Procedimiento con anestesia local en español, con precios accesibles.",
    descriptionEn:
      "Ingrown toenail removal in Pasadena, TX. Procedure with local anesthesia in Spanish, with affordable pricing.",
    keywords: [
      "uña encarnada pasadena",
      "extraccion de uña encarnada pasadena",
      "tratamiento uña encarnada pasadena",
      "doctor para uña encarnada pasadena",
    ],
    keywordsEn: [
      "ingrown toenail pasadena",
      "ingrown toenail removal pasadena",
      "ingrown nail treatment pasadena",
      "toenail doctor pasadena",
    ],
    features: [
      "Tratamiento de la uña encarnada",
      "Anestesia local",
      "Alivio del dolor",
      "Indicaciones de cuidado posterior",
    ],
    featuresEn: [
      "Ingrown toenail treatment",
      "Local anesthesia",
      "Pain relief",
      "After-care instructions",
    ],
    longDescription: `Una uña encarnada puede doler mucho e infectarse si no se trata. En Clínica Hispana Nueva Salud Michoacana la atendemos con un procedimiento sencillo y anestesia local para aliviarte el mismo día.

## ¿Qué incluye?

- Evaluación de la uña y el dedo
- Procedimiento con anestesia local
- Extracción de la porción encarnada de la uña
- Tratamiento de la infección si la hay
- Indicaciones de cuidado para evitar que regrese

## Cuándo acudir

Dolor, enrojecimiento, hinchazón o pus alrededor de la uña, sobre todo del dedo gordo del pie. Atenderla pronto evita una infección mayor.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `An ingrown toenail can hurt a lot and get infected if untreated. At Clínica Hispana Nueva Salud Michoacana we treat it with a simple procedure and local anesthesia to relieve you the same day.

## What's included?

- Evaluation of the nail and toe
- Procedure with local anesthesia
- Removal of the ingrown portion of the nail
- Treatment of the infection if present
- Care instructions to prevent recurrence

## When to come in

Pain, redness, swelling or pus around the nail, especially the big toe. Treating it promptly prevents a larger infection.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
  {
    slug: "farmacia",
    order: 29,
    category: "tratamientos",
    icon: "Pill",
    title: "Farmacia",
    titleEn: "Pharmacy",
    shortDescription:
      "Recibe los medicamentos indicados en tu consulta, sin ir a otro lugar.",
    shortDescriptionEn:
      "Get the medications indicated during your visit — no second stop.",
    description:
      "Farmacia en Pasadena, TX dentro de la clínica: entrega de los medicamentos indicados en tu consulta y productos de venta libre, en español.",
    descriptionEn:
      "Pharmacy in Pasadena, TX inside the clinic: we provide the medications indicated during your visit plus over-the-counter products, in Spanish.",
    keywords: [
      "farmacia en pasadena",
      "farmacia hispana pasadena",
      "farmacia cerca de mí pasadena",
      "medicamentos en la clinica pasadena",
    ],
    keywordsEn: [
      "pharmacy pasadena",
      "hispanic pharmacy pasadena",
      "pharmacy near me pasadena",
      "clinic medications pasadena",
    ],
    features: [
      "Medicamentos indicados en tu consulta",
      "Opciones de marca y genéricas",
      "Medicamentos de venta libre (OTC)",
      "Asesoría sobre tus medicamentos en español",
    ],
    featuresEn: [
      "Medications indicated during your visit",
      "Brand-name and generic options",
      "Over-the-counter (OTC) medications",
      "Guidance about your medications in Spanish",
    ],
    longDescription: `Al terminar tu consulta en Clínica Hispana Nueva Salud Michoacana puedes llevarte los medicamentos que el equipo médico te indique, sin tener que ir a otro lugar. También tenemos productos de venta libre. Es la comodidad de resolver todo en una sola visita, con atención en español.

## ¿Qué incluye?

- Entrega de los medicamentos indicados en tu consulta
- Opciones de marca y genéricas
- Medicamentos de venta libre (OTC) para gripe, dolor, alergias y más
- Asesoría del personal sobre cómo tomar tus medicamentos

## ¿Por qué usar nuestra farmacia?

Te ahorras una segunda parada: el equipo médico te atiende y te entrega ahí mismo los medicamentos que indique tu tratamiento. Te explicamos en español la dosis, los horarios y los cuidados.

${WHY_ES}

${PAYMENT_ES}

${AREAS_ES}`,
    longDescriptionEn: `After your visit at Clínica Hispana Nueva Salud Michoacana you can take home the medications indicated by the medical team, without going anywhere else. We also carry over-the-counter products. It's the convenience of getting everything done in a single visit, with service in Spanish.

## What's included?

- Medications indicated during your visit, provided on site
- Brand-name and generic options
- Over-the-counter (OTC) medications for colds, pain, allergies and more
- Staff guidance on how to take your medications

## Why use our pharmacy?

You skip the second stop: the medical team sees you and provides the medications your treatment requires right there. We explain the dosage, schedule and precautions in Spanish.

${WHY_EN}

${PAYMENT_EN}

${AREAS_EN}`,
  },
];
