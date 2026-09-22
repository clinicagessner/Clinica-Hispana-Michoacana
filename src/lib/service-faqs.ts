import type { ServiceFaq } from "@/types";

/**
 * FAQs por servicio (clave = slug). Bilingüe. Se usan en la página de
 * detalle del servicio y para el JSON-LD FAQPage.
 */
export const SERVICE_FAQS: Record<string, ServiceFaq[]> = {
  "condiciones-cronicas": [
    {
      question: "¿Cada cuánto debo revisar mi A1C?",
      answer: "Cada tres meses mientras no esté en meta y dos veces al año cuando ya lo está. La presión se revisa en cada visita.",
      questionEn: "How often should I check my A1C?",
      answerEn: "Every three months while it's above target and twice a year once it's at goal. Blood pressure is checked at every visit.",
    },
    {
      question: "¿Puedo dejar el medicamento si me siento bien?",
      answer: "No por tu cuenta: sentirse bien es el efecto del tratamiento. Si algo te molesta, como mareo, tos o hinchazón, dilo y se cambia el esquema.",
      questionEn: "Can I stop my medication if I feel fine?",
      answerEn: "Not on your own: feeling fine is the treatment working. If something bothers you, such as dizziness, cough or swelling, say so and the regimen gets changed.",
    },
    {
      question: "¿Qué incluye la primera visita de control?",
      answer: "Consulta con laboratorio el mismo día, metas por escrito y un plan realista de comida, actividad y horarios de medicamento.",
      questionEn: "What does the first follow-up visit include?",
      answerEn: "A consultation with same-day lab work, written targets and a realistic plan for food, activity and medication timing.",
    },
  ],
  "tiroides": [
    {
      question: "¿Qué prueba detecta un problema de tiroides?",
      answer: "Se empieza con la TSH, que detecta la mayoría de los casos, y según el resultado se añaden T4 libre y T3. No hace falta ayuno.",
      questionEn: "Which test detects a thyroid problem?",
      answerEn: "It starts with TSH, which catches most cases, and free T4 and T3 are added depending on the result. No fasting needed.",
    },
    {
      question: "¿Cada cuánto se revisa la dosis del medicamento?",
      answer: "Cada dos o tres meses mientras se ajusta, y una o dos veces al año cuando ya está estable. El embarazo y los cambios de peso obligan a revisar antes.",
      questionEn: "How often is the medication dose reviewed?",
      answerEn: "Every two or three months while adjusting, and once or twice a year once stable. Pregnancy and weight changes call for an earlier check.",
    },
    {
      question: "¿Tomo mi pastilla de tiroides el día del análisis?",
      answer: "Tómala después de la toma de muestra, no antes, para que el resultado refleje tu nivel real.",
      questionEn: "Should I take my thyroid pill on lab day?",
      answerEn: "Take it after the blood draw, not before, so the result reflects your real level.",
    },
  ],
  "alergias": [
    {
      question: "¿Cómo distingo una alergia de una gripe?",
      answer: "La alergia da comezón, estornudos en serie y moco claro, dura semanas y empeora en ciertos lugares. La gripe trae fiebre y dolor de cuerpo y se va en una semana.",
      questionEn: "How do I tell allergies from a cold?",
      answerEn: "Allergy itches, brings sneezing fits and clear mucus, lasts weeks and worsens in certain places. A cold brings fever and body aches and clears in a week.",
    },
    {
      question: "¿Hacen pruebas de alergia específicas?",
      answer: "Evaluamos tus síntomas y desencadenantes y tratamos las alergias respiratorias y de piel. Si hace falta identificar alérgenos concretos, se orienta la referencia al alergólogo.",
      questionEn: "Do you run specific allergy tests?",
      answerEn: "We assess your symptoms and triggers and treat respiratory and skin allergies. If specific allergens need identifying, we guide a referral to an allergist.",
    },
    {
      question: "¿Por qué empeoro en Pasadena todo el año?",
      answer: "Por la humedad de la costa del Golfo: al polen de primavera le siguen el pasto del verano, la ambrosía del otoño y el moho durante todo el año.",
      questionEn: "Why do I get worse year-round in Pasadena?",
      answerEn: "Because of Gulf Coast humidity: spring pollen gives way to summer grasses, fall ragweed and year-round mold.",
    },
  ],
  "enfermedades-respiratorias": [
    {
      question: "¿Hacen prueba de flu y de COVID el mismo día?",
      answer: "Sí, hacemos pruebas rápidas de influenza y COVID y te damos el resultado y el tratamiento el mismo día.",
      questionEn: "Do you test for flu and COVID the same day?",
      answerEn: "Yes, we run rapid flu and COVID tests and give you the result and treatment the same day.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "examen-fisico-escolar": [
    {
      question: "¿Llenan el formulario de la escuela el mismo día?",
      answer: "Sí. Trae el formulario de tu escuela o el de deportes escolares de Texas y sale firmado en la misma visita.",
      questionEn: "Do you complete the school form the same day?",
      answerEn: "Yes. Bring your school form or the Texas school sports form and it is signed during the same visit.",
    },
    {
      question: "¿Qué debe traer el estudiante?",
      answer: "Identificación del padre o tutor, la cartilla de vacunas, lentes si los usa, el inhalador si tiene asma y el nombre de sus medicamentos.",
      questionEn: "What should the student bring?",
      answerEn: "Parent or guardian ID, the vaccination record, glasses if they wear them, their inhaler if they have asthma, and the names of their medications.",
    },
    {
      question: "¿Cuándo conviene hacer el examen deportivo?",
      answer: "Antes de que empiece la temporada, no el día de la primera práctica. En julio y agosto hay más demanda; el resto del año se resuelve en una visita.",
      questionEn: "When should we do the sports physical?",
      answerEn: "Before the season starts, not the day of the first practice. July and August are busiest; the rest of the year it takes one visit.",
    },
  ],
  "ginecologia": [
    {
      question: "¿Necesito cita para el papanicolaou?",
      answer: "No es obligatorio, atendemos sin cita; pero puedes llamarnos para reservar un horario cómodo.",
      questionEn: "Do I need an appointment for a Pap smear?",
      answerEn: "It's not required, we welcome walk-ins; but you can call us to reserve a convenient time.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "prueba-embarazo": [
    {
      question: "¿Qué tan confiable es la prueba de embarazo?",
      answer: "Nuestras pruebas son confiables y las confirma personal médico; también podemos orientarte sobre los siguientes pasos.",
      questionEn: "How reliable is the pregnancy test?",
      answerEn: "Our tests are reliable and confirmed by medical staff; we can also guide you on next steps.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "anticonceptivos": [
    {
      question: "¿Qué métodos anticonceptivos ofrecen?",
      answer: "Ofrecemos orientación, pastillas anticonceptivas e inyección, y te ayudamos a elegir el método adecuado para ti.",
      questionEn: "What contraceptive methods do you offer?",
      answerEn: "We offer guidance, birth control pills and the injection, and help you choose the right method for you.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "extraccion-implantes": [
    {
      question: "¿Duele retirar el implante?",
      answer: "Se aplica anestesia local: sientes el piquete y después presión, no dolor. El retiro toma pocos minutos y sales caminando.",
      questionEn: "Does implant removal hurt?",
      answerEn: "Local anesthesia is used: you feel the pinch, then pressure, not pain. Removal takes a few minutes and you walk out.",
    },
    {
      question: "¿Qué cuidados debo tener después?",
      answer: "Mantén el vendaje seco 24 horas y evita cargar peso con ese brazo dos o tres días. El moretón es normal; el enrojecimiento que crece, el pus o la fiebre no.",
      questionEn: "What aftercare do I need?",
      answerEn: "Keep the bandage dry for 24 hours and avoid lifting weight with that arm for two or three days. Bruising is normal; spreading redness, pus or fever is not.",
    },
    {
      question: "¿Puedo cambiar de método el mismo día?",
      answer: "Sí. Te explicamos las opciones disponibles aquí, como pastillas o inyección, y si tu caso necesita un procedimiento que no hacemos, se orienta la referencia.",
      questionEn: "Can I switch methods the same day?",
      answerEn: "Yes. We go over the options available here, such as pills or the injection, and if your case needs a procedure we don't perform, we guide the referral.",
    },
  ],
  "salud-hombre": [
    {
      question: "¿Desde qué edad conviene medir el PSA?",
      answer: "La conversación empieza normalmente a los 50 años, y hacia los 40 o 45 si hay padre o hermano con cáncer de próstata. Antes de eso se revisan presión, azúcar y colesterol.",
      questionEn: "At what age should I check my PSA?",
      answerEn: "The conversation usually starts at 50, and around 40 to 45 if your father or brother had prostate cancer. Before that, we check blood pressure, sugar and cholesterol.",
    },
    {
      question: "¿Un PSA alto significa cáncer?",
      answer: "No. El valor también sube por inflamación de la próstata, infección urinaria, andar en bicicleta o después de eyacular. Se interpreta junto con tus síntomas.",
      questionEn: "Does a high PSA mean cancer?",
      answerEn: "No. The value also rises with prostate inflammation, a urinary infection, cycling or recent ejaculation. It is read alongside your symptoms.",
    },
    {
      question: "Me siento cansado todo el tiempo, ¿qué me revisan?",
      answer: "En la misma muestra se revisan azúcar, tiroides, vitamina B12 y hormonas. Medir primero evita tomar suplementos a ciegas.",
      questionEn: "I'm tired all the time, what gets checked?",
      answerEn: "The same sample covers blood sugar, thyroid, vitamin B12 and hormones. Measuring first keeps you from taking supplements blindly.",
    },
  ],
  "examenes-sangre": [
    {
      question: "¿Necesito ayuno para mis análisis?",
      answer: "Para glucosa en ayunas y perfil de lípidos, entre 8 y 12 horas. El A1C, la biometría y el perfil tiroideo no lo requieren. El agua sí se puede tomar.",
      questionEn: "Do I need to fast for my labs?",
      answerEn: "For fasting glucose and the lipid panel, 8 to 12 hours. A1C, the blood count and the thyroid panel don't require it. Water is fine.",
    },
    {
      question: "¿Cuándo entregan los resultados?",
      answer: "En la mayoría de los casos el mismo día, y te los explicamos al entregarlos: qué valor está fuera de rango y cuál es el siguiente paso.",
      questionEn: "When are results ready?",
      answerEn: "In most cases the same day, and we go through them with you: which value is out of range and what the next step is.",
    },
    {
      question: "¿Puedo suspender mi medicamento antes del análisis?",
      answer: "Pregunta primero. En la mayoría de los casos se toma normal; suspenderlo por cuenta propia puede alterar el resultado y tu tratamiento.",
      questionEn: "Should I skip my medication before the test?",
      answerEn: "Ask first. In most cases you take it as usual; skipping it on your own can alter both the result and your treatment.",
    },
  ],
  "infecciones-urinarias": [
    {
      question: "¿Cuánto tardo en recibir tratamiento?",
      answer: "Hacemos el examen de orina en la clínica y, si hay infección, el equipo médico indica el tratamiento durante la misma visita.",
      questionEn: "How long does it take to get treatment?",
      answerEn: "We run the urine test at the clinic and, if there's an infection, the medical team indicates treatment during the same visit.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "examen-heces": [
    {
      question: "¿Cómo debo recoger la muestra?",
      answer: "Te damos el frasco y las indicaciones. La muestra no debe mezclarse con orina ni con agua del inodoro y se entrega lo antes posible.",
      questionEn: "How should I collect the sample?",
      answerEn: "We give you the container and instructions. The sample must not mix with urine or toilet water and should be dropped off as soon as possible.",
    },
    {
      question: "¿Por qué a veces piden tres muestras?",
      answer: "Porque los parásitos no siempre aparecen en la primera muestra. Tomarlas en días distintos aumenta mucho la probabilidad de encontrarlos.",
      questionEn: "Why are three samples sometimes requested?",
      answerEn: "Because parasites don't always show up in the first sample. Collecting on different days greatly increases the chance of finding them.",
    },
    {
      question: "¿Qué pasa si el examen sale normal pero sigo mal?",
      answer: "El siguiente paso suele ser análisis de sangre o una referencia para estudio del colon. No te quedas sin plan.",
      questionEn: "What if the test is normal but I still feel bad?",
      answerEn: "The next step is usually blood work or a referral for a colon study. You don't leave without a plan.",
    },
  ],
  "prueba-strep": [
    {
      question: "¿Cuánto tarda el resultado del strep test?",
      answer: "La prueba rápida de estreptococo da resultado en pocos minutos durante tu visita.",
      questionEn: "How long does the strep test take?",
      answerEn: "The rapid strep test gives a result in just a few minutes during your visit.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "prueba-tuberculosis": [
    {
      question: "¿Tengo que regresar para leer la prueba de TB?",
      answer: "Sí, la prueba cutánea (PPD) se lee entre 48 y 72 horas después de aplicarla; te damos la cita de lectura.",
      questionEn: "Do I have to come back to read the TB test?",
      answerEn: "Yes, the skin test (PPD) is read 48 to 72 hours after it's placed; we schedule your reading appointment.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "enfermedades-transmision-sexual": [
    {
      question: "¿Las pruebas son confidenciales?",
      answer: "Sí, todas las pruebas de STD son completamente confidenciales y se realizan con respeto y sin juicios.",
      questionEn: "Is the testing confidential?",
      answerEn: "Yes, all STD testing is completely confidential and done with respect and without judgment.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "examen-alcohol-drogas": [
    {
      question: "¿Entregan documentación para el trabajo?",
      answer: "Sí, te entregamos la documentación del resultado para tu empleador o trámite.",
      questionEn: "Do you provide documentation for work?",
      answerEn: "Yes, we give you documentation of the result for your employer or paperwork.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "electrocardiograma": [
    {
      question: "¿El electrocardiograma duele?",
      answer: "No, es un estudio rápido y sin dolor; solo se colocan electrodos en la piel por unos minutos.",
      questionEn: "Does the EKG hurt?",
      answerEn: "No, it's a fast, painless test; electrodes are simply placed on the skin for a few minutes.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "ultrasonido": [
    {
      question: "¿El ultrasonido tiene radiación?",
      answer: "No, el ultrasonido no usa radiación, por lo que es seguro incluso durante el embarazo.",
      questionEn: "Does ultrasound use radiation?",
      answerEn: "No, ultrasound uses no radiation, so it's safe even during pregnancy.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "examen-dot": [
    {
      question: "¿Qué papeles debo traer al examen DOT?",
      answer: "Identificación con foto, tu CDL o permiso, lentes o aparatos auditivos, la lista de medicamentos y, si aplican, el formulario de insulina o el reporte del CPAP de 90 días.",
      questionEn: "What paperwork should I bring to the DOT exam?",
      answerEn: "Photo ID, your CDL or permit, glasses or hearing aids, your medication list and, if they apply, the insulin form or your 90-day CPAP report.",
    },
    {
      question: "¿Por qué a veces el certificado sale por menos de dos años?",
      answer: "Porque el plazo se acorta cuando la presión está alta o hay una condición crónica en seguimiento. Es para revisarte antes, no un castigo.",
      questionEn: "Why is the certificate sometimes shorter than two years?",
      answerEn: "Because the term shortens when blood pressure is high or a chronic condition is being followed. It means an earlier recheck, not a penalty.",
    },
    {
      question: "¿Puedo hacer algo para que mi presión no salga alta?",
      answer: "Evita café, energéticos y cigarro antes de la cita, ven descansado y toma tu medicamento como siempre. Llegar después de un turno largo suele dar lecturas peores.",
      questionEn: "Can I do anything so my blood pressure isn't high?",
      answerEn: "Skip coffee, energy drinks and cigarettes before the visit, come rested and take your medication as usual. Arriving after a long shift usually gives worse readings.",
    },
  ],
  "examenes-inmigracion": [
    {
      question: "¿El médico está autorizado por USCIS?",
      answer: "Sí, el examen lo realiza un médico autorizado (civil surgeon) y te entregamos el Formulario I-693 sellado.",
      questionEn: "Is the doctor authorized by USCIS?",
      answerEn: "Yes, the exam is performed by an authorized civil surgeon and we give you the sealed Form I-693.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "vacunas": [
    {
      question: "¿Qué vacunas aplican?",
      answer: "Aplicamos la vacuna contra la influenza (flu) y el toxoide tetánico; pregúntanos cuál te conviene.",
      questionEn: "Which vaccines do you give?",
      answerEn: "We administer the influenza (flu) vaccine and tetanus toxoid; ask us which one you need.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "sueros-vitaminados": [
    {
      question: "¿Cuánto dura la aplicación del suero?",
      answer: "Entre 30 y 45 minutos, sentado. Antes se revisa tu presión y tus antecedentes, y el personal médico está pendiente durante toda la aplicación.",
      questionEn: "How long does the IV take?",
      answerEn: "Between 30 and 45 minutes, seated. Your blood pressure and history are checked first, and medical staff monitor you throughout.",
    },
    {
      question: "¿Puedo llegar sin cita?",
      answer: "Sí, aunque conviene llamar antes al (832) 617-7439 para confirmar la disponibilidad del día, porque el suero requiere tiempo de silla.",
      questionEn: "Can I walk in?",
      answerEn: "Yes, though it helps to call (832) 617-7439 first to confirm availability that day, since the IV needs chair time.",
    },
    {
      question: "¿Es mejor el suero o la inyección de vitamina B12?",
      answer: "Si tu cansancio se debe a falta de B12, la inyección intramuscular es más rápida y económica. Lo sensato es medir tu nivel primero con un análisis de sangre.",
      questionEn: "IV drip or vitamin B12 injection?",
      answerEn: "If your fatigue comes from low B12, the intramuscular injection is faster and cheaper. The sensible move is to measure your level first with blood work.",
    },
  ],
  "suturas-heridas": [
    {
      question: "¿Atienden heridas sin cita?",
      answer: "Sí, atendemos cortes y heridas sin cita previa; entre más pronto, menor el riesgo de infección.",
      questionEn: "Do you treat wounds without an appointment?",
      answerEn: "Yes, we treat cuts and wounds on a walk-in basis; the sooner, the lower the risk of infection.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "curacion-heridas": [
    {
      question: "¿Cada cuánto hay que cambiar el vendaje?",
      answer: "Según la herida, normalmente cada dos o tres días. En la visita te decimos el intervalo y qué vigilar en casa entre curaciones.",
      questionEn: "How often does the dressing need changing?",
      answerEn: "Depending on the wound, usually every two or three days. At the visit we tell you the interval and what to watch for at home.",
    },
    {
      question: "¿Cómo sé si mi herida se infectó?",
      answer: "Enrojecimiento que crece, pus, mal olor, hinchazón, fiebre o dolor que aumenta en vez de bajar. Con cualquiera de esos signos, ven el mismo día.",
      questionEn: "How do I know my wound is infected?",
      answerEn: "Spreading redness, pus, bad smell, swelling, fever or pain that increases instead of easing. With any of those, come in the same day.",
    },
    {
      question: "Tengo diabetes y una herida en el pie, ¿espero?",
      answer: "No. Aunque se vea pequeña y no duela, conviene revisarla pronto: la falta de sensibilidad hace que se descubran tarde.",
      questionEn: "I have diabetes and a foot wound, should I wait?",
      answerEn: "No. Even if it looks small and doesn't hurt, get it checked soon: reduced sensation means these are found late.",
    },
  ],
  "cirugias-menores": [
    {
      question: "¿Qué cirugías menores realizan?",
      answer: "Realizamos extracción de lunares, quistes y lipomas, entre otros procedimientos ambulatorios con anestesia local.",
      questionEn: "What minor surgeries do you perform?",
      answerEn: "We perform removal of moles, cysts and lipomas, among other outpatient procedures with local anesthesia.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "drenaje-abscesos": [
    {
      question: "¿El antibiótico solo puede curar un absceso?",
      answer: "No. Un absceso formado necesita drenarse; el antibiótico se reserva para cuando hay fiebre, la infección se extiende o existen condiciones como diabetes.",
      questionEn: "Can antibiotics alone cure an abscess?",
      answerEn: "No. A formed abscess needs to be drained; antibiotics are kept for fever, spreading infection or conditions such as diabetes.",
    },
    {
      question: "¿Duele el drenaje?",
      answer: "Se aplica anestesia local antes de la incisión. La mayoría de las personas siente alivio al salir, porque desaparece la presión del pus.",
      questionEn: "Does drainage hurt?",
      answerEn: "Local anesthesia is given before the incision. Most people feel relief on the way out, because the pressure from the pus is gone.",
    },
    {
      question: "¿Cuándo debo regresar?",
      answer: "Si la zona vuelve a llenarse, el dolor aumenta, sale pus o aparece fiebre. Los abscesos que se repiten en el mismo lugar merecen estudiarse.",
      questionEn: "When should I come back?",
      answerEn: "If the area fills up again, pain increases, pus appears or you develop a fever. Abscesses that keep returning in the same spot deserve a workup.",
    },
  ],
  "unas-encarnadas": [
    {
      question: "¿Cómo tratan la uña encarnada?",
      answer: "Con un procedimiento sencillo y anestesia local retiramos la porción encarnada para aliviar el dolor el mismo día.",
      questionEn: "How do you treat an ingrown toenail?",
      answerEn: "With a simple procedure and local anesthesia we remove the ingrown portion to relieve pain the same day.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
  "farmacia": [
    {
      question: "¿Puedo recibir mis medicamentos en la clínica?",
      answer: "Sí. Al terminar tu consulta te entregamos los medicamentos que el equipo médico te haya indicado, sin tener que ir a otro lugar. También tenemos productos de venta libre.",
      questionEn: "Can I get my medications at the clinic?",
      answerEn: "Yes. After your visit we provide the medications indicated by the medical team, with no need to go elsewhere. We also carry over-the-counter products.",
    },
    {
      question: "¿Necesito cita previa?",
      answer: "No. Atendemos sin cita de lunes a sábado de 9 AM a 9 PM y domingo de 9 AM a 7 PM. También puedes llamarnos para reservar un horario.",
      questionEn: "Do I need an appointment?",
      answerEn: "No. We welcome walk-ins Monday to Saturday from 9 AM to 9 PM and Sunday from 9 AM to 7 PM. You can also call us to reserve a time.",
    },
    {
      question: "¿Atienden a pacientes sin seguro?",
      answer: "Sí. No necesitas seguro médico; manejamos precios accesibles y transparentes. Pregúntanos por el costo antes de tu visita.",
      questionEn: "Do you accept patients without insurance?",
      answerEn: "Yes. You don't need insurance; we offer affordable, transparent pricing. Ask us about the cost before your visit.",
    },
  ],
};

/** FAQs de un servicio por slug (vacío si no tiene). */
export function getServiceFaqs(slug: string): ServiceFaq[] {
  return SERVICE_FAQS[slug] ?? [];
}
