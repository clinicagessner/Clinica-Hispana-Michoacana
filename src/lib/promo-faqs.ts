import type { ServiceFaq } from "@/types";

// FAQs de la página de promociones (bilingüe). Alimentan también el FAQPage JSON-LD.
export const PROMO_FAQS: ServiceFaq[] = [
  {
    question: "¿Hasta cuándo son válidas las promociones?",
    answer:
      "Son por tiempo limitado y pueden cambiar. Pregúntanos por la vigencia y disponibilidad actual al llamar o al visitarnos.",
    questionEn: "How long are the promotions valid?",
    answerEn:
      "They are for a limited time and may change. Ask us about current validity and availability when you call or visit.",
  },
  {
    question: "¿Necesito cita o seguro para una promoción?",
    answer:
      "No. Atendemos sin cita previa de lunes a domingo y no necesitas seguro médico para aprovechar una promoción.",
    questionEn: "Do I need an appointment or insurance for a promotion?",
    answerEn:
      "No. We welcome walk-ins Monday to Sunday, and you don't need health insurance to take advantage of a promotion.",
  },
  {
    question: "¿Cómo aparto o uso una promoción?",
    answer:
      "Llámanos, escríbenos por el formulario o visítanos sin cita. Con gusto te explicamos los pasos y lo que incluye cada promoción.",
    questionEn: "How do I reserve or use a promotion?",
    answerEn:
      "Call us, message us through the form, or stop by without an appointment. We'll gladly walk you through the steps and what each promotion includes.",
  },
];
