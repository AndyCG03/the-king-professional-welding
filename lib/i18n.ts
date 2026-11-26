export const languages = ['en', 'es'] as const;
export type Lang = (typeof languages)[number];
export const isLang = (value: string): value is Lang => (languages as readonly string[]).includes(value);
export const pathFor = (lang: Lang) => (lang === 'en' ? '/' : '/es');

/** Display heading: lines joined with <br>, `em` highlighted at the end of the last line. */
export type Heading = {lines: string[]; em: string};

type Photo = {file: string; caption: string};
type Item = {title: string; text: string};

export type Dictionary = {
  meta: {title: string; description: string; ogAlt: string; locale: string};
  nav: {services: string; trailers: string; work: string; reviews: string; contact: string; skip: string; menuOpen: string; menuClose: string; switchTo: string; switchLabel: string; talk: string};
  topbar: string;
  hero: {kicker: string; title: Heading; intro: string; cta: string; note: string; imageAlt: string; caption: string; corner: [string, string]};
  materials: string[];
  trailers: {eyebrow: string; title: Heading; text: string; cta: string; photos: Photo[]; note: string};
  services: {eyebrow: string; title: Heading; text: string; items: Item[]; cta: string};
  projects: {eyebrow: string; title: Heading; text: string; photos: Photo[]};
  craft: {eyebrow: string; title: Heading; text: string; cta: string; imageAlt: string; caption: string};
  process: {eyebrow: string; title: Heading; steps: Item[]};
  reviews: {eyebrow: string; title: Heading; text: string; basedOn: (n: number) => string; readAll: string; write: string; fromGoogle: string; fallback: string; more: string; less: string; rateTitle: string; rateText: string};
  faq: {eyebrow: string; title: Heading; items: {q: string; a: string}[]};
  contact: {eyebrow: string; title: Heading; findUs: string; hours: string; hoursNote: string; directions: string; form: {title: string; name: string; service: string; details: string; placeholder: string; submit: string; note: string; error: string; fallback: string; greeting: (name: string, service: string) => string}};
  social: {eyebrow: string; title: Heading};
  footer: {tagline: string; cta: string; rights: string};
  mobile: {call: string; whatsapp: string; quote: string; whatsappText: string};
  viewer: {close: string; prev: string; next: string; open: string};
};

const servicesEn: Item[] = [
  {title: 'MIG & TIG welding', text: 'Welding for metal fabrication and repairs. Tell us about your material and the connection you need.'},
  {title: 'Aluminum', text: 'Aluminum welding for your fabrication or repair project, with attention to each connection.'},
  {title: 'Stainless steel', text: 'Stainless steel work where the finish matters just as much as the weld.'},
  {title: 'Fences', text: 'Metal fence fabrication and repairs. Talk to us about your space and the style you have in mind.'},
  {title: 'Gates', text: 'Metal gates for your entrance. Share your dimensions, reference photos and project needs.'},
  {title: 'Trailer repairs', text: 'Welding repairs for trailers. Send photos of the damaged area so we can discuss the next step.'},
];
const servicesEs: Item[] = [
  {title: 'Soldadura MIG y TIG', text: 'Soldadura para fabricación y reparaciones en metal. Cuéntanos qué material tienes y qué unión necesitas.'},
  {title: 'Aluminio', text: 'Soldadura en aluminio para tu proyecto de fabricación o reparación, con atención en cada unión.'},
  {title: 'Acero inoxidable', text: 'Trabajos en acero inoxidable donde el acabado importa tanto como la soldadura.'},
  {title: 'Cercas', text: 'Fabricación y reparación de cercas de metal. Hablemos de tu espacio y del estilo que tienes en mente.'},
  {title: 'Portones', text: 'Portones de metal para tu entrada. Comparte medidas, fotos de referencia y lo que necesitas.'},
  {title: 'Reparación de tráileres', text: 'Reparaciones de soldadura para tráileres. Envía fotos del área dañada para conversar sobre el siguiente paso.'},
];

export const dictionaries: Record<Lang, Dictionary> = {
  en: {
    meta: {
      title: 'The King of Professional Welding | Welding & Trailer Repair in Katy, Texas',
      description: 'The King of Professional Welding is a welder in Katy, Texas: trailer repairs, MIG & TIG welding, aluminum, stainless steel, metal fences and gates. Call 832-732-7616.',
      ogAlt: 'The King of Professional Welding — trailer repairs, MIG & TIG welding in Katy, Texas. Call 832-732-7616.',
      locale: 'en_US',
    },
    nav: {services: 'Services', trailers: 'Trailers', work: 'Our work', reviews: 'Reviews', contact: 'Contact', skip: 'Skip to content', menuOpen: 'Open navigation', menuClose: 'Close navigation', switchTo: 'ES', switchLabel: 'Ver en español', talk: 'LET’S TALK'},
    topbar: 'LET’S BUILD SOMETHING THAT LASTS.',
    hero: {
      kicker: 'The King of Professional Welding · Katy, Texas',
      title: {lines: ['TRAILER REPAIRS.', ''], em: 'REAL CRAFT.'},
      intro: 'Trailer welding and repairs in Katy, Texas. From welded supports to custom steel components, see the work up close. MIG/TIG, aluminum, stainless steel and metal fabrication.',
      cta: 'SEE OUR TRAILER WORK',
      note: 'ALUMINUM. STEEL. SOLID CRAFTSMANSHIP.',
      imageAlt: 'Welded steel supports on a trailer undercarriage, photographed during a repair in Katy, Texas',
      caption: 'Trailer project photograph · Work in progress',
      corner: ['THE KING OF', 'TRAILER REPAIRS & METALWORK'],
    },
    materials: ['MIG & TIG', 'ALUMINUM', 'STAINLESS STEEL', 'FENCES & GATES', 'TRAILER REPAIRS'],
    trailers: {
      eyebrow: 'TRAILER PROJECTS · KATY, TEXAS',
      title: {lines: ['TRAILER WELDING', ''], em: '& REPAIRS.'},
      text: 'Steel supports, fabricated brackets and trailer repair work. Explore photographs from our projects, including work in progress and close-up details.',
      cta: 'DISCUSS YOUR TRAILER REPAIR',
      photos: [
        {file: 'trailer-welded-supports', caption: 'Welded supports on a trailer undercarriage'},
        {file: 'trailer-steel-mounts', caption: 'Steel mounting components on a trailer'},
        {file: 'trailer-support-detail', caption: 'Detail of trailer steel supports'},
        {file: 'fabricated-steel-brackets', caption: 'Fabricated and painted steel brackets'},
        {file: 'trailer-undercarriage', caption: 'Trailer undercarriage during repair work'},
        {file: 'trailer-work-overview', caption: 'Overview of a trailer repair project'},
      ],
      note: 'Project photographs supplied by the business. Images include work in progress.',
    },
    services: {eyebrow: 'WHAT WE DO', title: {lines: ['YOUR PROJECT.', 'OUR '], em: 'CRAFT.'}, text: 'The right connection starts with understanding what you need. Explore our welding and metalwork services.', items: servicesEn, cta: 'DISCUSS THIS SERVICE'},
    projects: {
      eyebrow: 'MORE OF OUR WORK',
      title: {lines: ['FROM STEEL', 'TO '], em: 'STRUCTURE.'},
      text: 'Stair components, beams and steel framing shown during fabrication and installation. Select any photograph to view the details.',
      photos: [
        {file: 'steel-frame-overview', caption: 'Steel framing and stair structure'},
        {file: 'steel-stairs', caption: 'Steel stair fabrication in progress'},
        {file: 'steel-beam-installation', caption: 'Steel beam work in progress'},
        {file: 'steel-frame-detail', caption: 'Another view of the steel structure'},
      ],
    },
    craft: {eyebrow: 'MADE OF METAL. BUILT WITH CARE.', title: {lines: ['THE DETAILS', 'MAKE THE '], em: 'DIFFERENCE.'}, text: 'A clean connection. A considered finish. A project that fits your needs. That’s the approach behind The King of Professional Welding.', cta: 'LET’S DISCUSS YOUR PROJECT', imageAlt: 'Metal stair components during fabrication at a project site', caption: 'Steel stair fabrication · Project in progress'},
    process: {
      eyebrow: 'FROM IDEA TO METAL',
      title: {lines: ['LET’S GET '], em: 'STARTED.'},
      steps: [
        {title: 'Tell us what you need', text: 'Call, email or message us with the service you need, measurements and reference photos.'},
        {title: 'Talk through the details', text: 'We’ll discuss the materials, scope, estimate and availability before any work begins.'},
        {title: 'Bring your project to life', text: 'Once the plan is agreed, we can coordinate the next steps for your welding project.'},
      ],
    },
    reviews: {
      eyebrow: 'GOOGLE REVIEWS',
      title: {lines: ['WHAT CUSTOMERS', 'ARE '], em: 'SAYING.'},
      text: 'Real reviews from our Google Business Profile.',
      basedOn: n => `Based on ${n} Google review${n === 1 ? '' : 's'}`,
      readAll: 'READ ALL REVIEWS ON GOOGLE',
      write: 'LEAVE A REVIEW',
      fromGoogle: 'Review from Google',
      fallback: 'Worked with us? Your review helps neighbors in Katy find a welder they can trust. See our profile and reviews on Google.',
      more: 'Read more',
      less: 'Show less',
      rateTitle: 'Rate our service',
      rateText: 'Tell us how we did. Post your review on Google to help other customers in Katy, or send it privately to us by WhatsApp.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: {lines: ['QUESTIONS, ', ''], em: 'ANSWERED.'},
      items: [
        {q: 'Do you repair trailers?', a: 'Yes. Trailer welding and repairs are a core part of our work. Send photos of the damaged area by WhatsApp or call us so we can discuss the next step.'},
        {q: 'What metals do you weld?', a: 'We weld steel, aluminum and stainless steel using MIG and TIG processes, for both fabrication and repairs.'},
        {q: 'Do you build fences and gates?', a: 'Yes. We fabricate and repair metal fences and gates. Share your dimensions and reference photos to get started.'},
        {q: 'How do I get an estimate?', a: 'Call 832-732-7616 or use the form to send the service you need, the material, measurements, location and photos. We discuss materials, scope, estimate and availability before any work begins.'},
        {q: 'Where are you located and when can I call?', a: 'We are at 21126 Terrace View Dr, Katy, Texas 77449. Calls are answered from 7 AM to 7 PM; contact us to confirm availability.'},
      ],
    },
    contact: {
      eyebrow: 'LET’S MAKE IT HAPPEN',
      title: {lines: ['GOT A PROJECT?', ''], em: 'LET’S TALK.'},
      findUs: 'FIND US', hours: 'HOURS', hoursNote: 'Contact us to confirm availability.', directions: 'GET DIRECTIONS',
      form: {
        title: 'Tell us what you’re working on.', name: 'Your name', service: 'What do you need?', details: 'Project details',
        placeholder: 'Materials, dimensions, repair details…', submit: 'CONTINUE IN WHATSAPP',
        note: 'Opens WhatsApp with your message ready. Review it and press Send. Prefer email? Use the email link on this page.',
        error: 'Enter your name and project details.', fallback: 'Open WhatsApp if it did not open automatically.',
        greeting: (name, service) => `Hello, my name is ${name}. I’m interested in: ${service}.`,
      },
    },
    social: {eyebrow: 'STAY CONNECTED', title: {lines: ['FOLLOW '], em: 'THE KING.'}},
    footer: {tagline: 'Katy, Texas · MIG & TIG', cta: 'LET’S BUILD SOMETHING SOLID.', rights: 'All rights reserved.'},
    mobile: {call: 'Call', whatsapp: 'WhatsApp', quote: 'Quote', whatsappText: 'Hello! I would like a quote for a welding project.'},
    viewer: {close: 'Close photo', prev: 'Previous photo', next: 'Next photo', open: 'Open photo'},
  },
  es: {
    meta: {
      title: 'The King of Professional Welding | Soldador en Katy, Texas',
      description: 'The King of Professional Welding, soldador en Katy, Texas: reparación de tráileres, soldadura MIG y TIG, aluminio, acero inoxidable, cercas y portones. Llama al 832-732-7616.',
      ogAlt: 'The King of Professional Welding — reparación de tráileres y soldadura MIG y TIG en Katy, Texas. Llama al 832-732-7616.',
      locale: 'es_US',
    },
    nav: {services: 'Servicios', trailers: 'Tráileres', work: 'Trabajos', reviews: 'Reseñas', contact: 'Contacto', skip: 'Ir al contenido', menuOpen: 'Abrir navegación', menuClose: 'Cerrar navegación', switchTo: 'EN', switchLabel: 'View in English', talk: 'HABLEMOS'},
    topbar: 'HAGAMOS ALGO QUE PERDURE.',
    hero: {
      kicker: 'The King of Professional Welding · Katy, Texas',
      title: {lines: ['REPARACIÓN DE', ''], em: 'TRÁILERES.'},
      intro: 'Soldadura y reparación de tráileres en Katy, Texas. Desde soportes soldados hasta piezas de acero, conoce nuestro trabajo de cerca. MIG/TIG, aluminio, acero inoxidable y fabricación en metal.',
      cta: 'VER TRABAJOS EN TRÁILERES',
      note: 'ALUMINIO. ACERO. TRABAJO BIEN HECHO.',
      imageAlt: 'Soportes de acero soldados en la parte inferior de un tráiler, fotografiados durante una reparación en Katy, Texas',
      caption: 'Fotografía de trabajo en tráiler · Proyecto en proceso',
      corner: ['THE KING OF', 'TRAILER REPAIRS & METALWORK'],
    },
    materials: ['MIG Y TIG', 'ALUMINIO', 'ACERO INOXIDABLE', 'CERCAS Y PORTONES', 'REPARACIÓN DE TRÁILERES'],
    trailers: {
      eyebrow: 'TRABAJOS EN TRÁILERES · KATY, TEXAS',
      title: {lines: ['SOLDADURA Y', ''], em: 'REPARACIÓN DE TRÁILERES.'},
      text: 'Soportes de acero, piezas fabricadas y trabajos de reparación en tráileres. Conoce fotografías de nuestros proyectos, con detalles y trabajos en proceso.',
      cta: 'COTIZA LA REPARACIÓN DE TU TRÁILER',
      photos: [
        {file: 'trailer-welded-supports', caption: 'Soportes soldados en la parte inferior de un tráiler'},
        {file: 'trailer-steel-mounts', caption: 'Componentes de montaje de acero en un tráiler'},
        {file: 'trailer-support-detail', caption: 'Detalle de los soportes de acero de un tráiler'},
        {file: 'fabricated-steel-brackets', caption: 'Soportes de acero fabricados y pintados'},
        {file: 'trailer-undercarriage', caption: 'Parte inferior de un tráiler durante la reparación'},
        {file: 'trailer-work-overview', caption: 'Vista general de un proyecto de reparación de tráiler'},
      ],
      note: 'Fotografías de trabajos proporcionadas por el negocio. Incluyen trabajos en proceso.',
    },
    services: {eyebrow: 'LO QUE HACEMOS', title: {lines: ['TU PROYECTO.', 'NUESTRO '], em: 'OFICIO.'}, text: 'Una buena unión comienza por entender lo que necesitas. Conoce nuestros servicios de soldadura y trabajo en metal.', items: servicesEs, cta: 'COTIZAR ESTE SERVICIO'},
    projects: {
      eyebrow: 'MÁS DE NUESTROS TRABAJOS',
      title: {lines: ['DEL ACERO', 'A LA '], em: 'ESTRUCTURA.'},
      text: 'Componentes de escaleras, vigas y estructuras de acero durante su fabricación e instalación. Abre cualquier fotografía para ver sus detalles.',
      photos: [
        {file: 'steel-frame-overview', caption: 'Estructura de acero y escalera'},
        {file: 'steel-stairs', caption: 'Fabricación de escalera de metal en proceso'},
        {file: 'steel-beam-installation', caption: 'Trabajo de vigas de acero en proceso'},
        {file: 'steel-frame-detail', caption: 'Otra vista de la estructura de acero'},
      ],
    },
    craft: {eyebrow: 'HECHO EN METAL. HECHO CON CUIDADO.', title: {lines: ['LOS DETALLES', 'HACEN LA '], em: 'DIFERENCIA.'}, text: 'Una unión limpia. Un acabado cuidado. Un proyecto que se adapte a lo que necesitas. Ese es el enfoque de The King of Professional Welding.', cta: 'HABLEMOS DE TU PROYECTO', imageAlt: 'Componentes de una escalera de metal durante su fabricación', caption: 'Fabricación de escalera de acero · Proyecto en proceso'},
    process: {
      eyebrow: 'DE LA IDEA AL METAL',
      title: {lines: ['VAMOS A '], em: 'EMPEZAR.'},
      steps: [
        {title: 'Cuéntanos qué necesitas', text: 'Llama, escribe un correo o envía un mensaje con el servicio, las medidas y fotos de referencia.'},
        {title: 'Revisamos los detalles', text: 'Conversaremos sobre los materiales, alcance, cotización y disponibilidad antes de comenzar.'},
        {title: 'Damos forma a tu proyecto', text: 'Una vez acordado el plan, coordinaremos los siguientes pasos de tu proyecto de soldadura.'},
      ],
    },
    reviews: {
      eyebrow: 'RESEÑAS DE GOOGLE',
      title: {lines: ['LO QUE DICEN', 'NUESTROS '], em: 'CLIENTES.'},
      text: 'Reseñas reales de nuestro Perfil de Empresa en Google.',
      basedOn: n => `Según ${n} reseña${n === 1 ? '' : 's'} en Google`,
      readAll: 'VER TODAS LAS RESEÑAS EN GOOGLE',
      write: 'DEJAR UNA RESEÑA',
      fromGoogle: 'Reseña de Google',
      fallback: '¿Trabajaste con nosotros? Tu reseña ayuda a tus vecinos de Katy a encontrar un soldador de confianza. Mira nuestro perfil y reseñas en Google.',
      more: 'Leer más',
      less: 'Ver menos',
      rateTitle: 'Califica nuestro servicio',
      rateText: 'Cuéntanos cómo lo hicimos. Publica tu reseña en Google para ayudar a otros clientes de Katy, o envíanosla en privado por WhatsApp.',
    },
    faq: {
      eyebrow: 'PREGUNTAS FRECUENTES',
      title: {lines: ['TUS DUDAS, ', ''], em: 'RESUELTAS.'},
      items: [
        {q: '¿Reparan tráileres?', a: 'Sí. La soldadura y reparación de tráileres es una parte principal de nuestro trabajo. Envía fotos del área dañada por WhatsApp o llámanos para conversar sobre el siguiente paso.'},
        {q: '¿Qué metales sueldan?', a: 'Soldamos acero, aluminio y acero inoxidable con procesos MIG y TIG, tanto para fabricación como para reparaciones.'},
        {q: '¿Fabrican cercas y portones?', a: 'Sí. Fabricamos y reparamos cercas y portones de metal. Comparte medidas y fotos de referencia para empezar.'},
        {q: '¿Cómo pido una cotización?', a: 'Llama al 832-732-7616 o usa el formulario para enviar el servicio, el material, las medidas, la ubicación y fotos. Revisamos materiales, alcance, cotización y disponibilidad antes de comenzar.'},
        {q: '¿Dónde están y en qué horario puedo llamar?', a: 'Estamos en 21126 Terrace View Dr, Katy, Texas 77449. Atendemos llamadas de 7 AM a 7 PM; consulta la disponibilidad con nosotros.'},
      ],
    },
    contact: {
      eyebrow: 'HAGÁMOSLO REALIDAD',
      title: {lines: ['¿TIENES UN PROYECTO?', ''], em: 'HABLEMOS.'},
      findUs: 'UBICACIÓN', hours: 'HORARIO', hoursNote: 'Consulta disponibilidad con nosotros.', directions: 'CÓMO LLEGAR',
      form: {
        title: 'Cuéntanos en qué estás trabajando.', name: 'Tu nombre', service: '¿Qué necesitas?', details: 'Detalles del proyecto',
        placeholder: 'Materiales, medidas, detalles de la reparación…', submit: 'CONTINUAR EN WHATSAPP',
        note: 'Abre WhatsApp con tu mensaje preparado. Revísalo y pulsa Enviar. Si prefieres correo, usa el enlace de esta página.',
        error: 'Escribe tu nombre y los detalles del proyecto.', fallback: 'Abrir WhatsApp si no se abrió automáticamente.',
        greeting: (name, service) => `Hola, soy ${name}. Me interesa: ${service}.`,
      },
    },
    social: {eyebrow: 'SIGAMOS EN CONTACTO', title: {lines: ['SIGUE A '], em: 'THE KING.'}},
    footer: {tagline: 'Katy, Texas · MIG y TIG', cta: 'CONSTRUYAMOS ALGO SÓLIDO.', rights: 'Todos los derechos reservados.'},
    mobile: {call: 'Llamar', whatsapp: 'WhatsApp', quote: 'Cotizar', whatsappText: '¡Hola! Quisiera una cotización para un trabajo de soldadura.'},
    viewer: {close: 'Cerrar foto', prev: 'Foto anterior', next: 'Siguiente foto', open: 'Abrir foto'},
  },
};
