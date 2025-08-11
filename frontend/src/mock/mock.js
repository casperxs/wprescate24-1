export const PRICING = [
  {
    id: "bronce",
    name: "Bronce",
    price: 99,
    description: "Diagnóstico forense + informe detallado",
    highlight: false,
    features: [
      "Diagnóstico inicial en 12h",
      "Informe de vulnerabilidades",
      "Plan de acción recomendado",
      "Estimación de tiempos y costos"
    ]
  },
  {
    id: "plata",
    name: "Plata",
    price: 249,
    description: "Recuperación + blindaje básico",
    highlight: false,
    features: [
      "Recuperación de sitio",
      "Limpieza de malware",
      "Actualizaciones críticas",
      "Hardening básico (firewall, login)"
    ]
  },
  {
    id: "oro",
    name: "Oro",
    price: 399,
    description: "Recuperación 24h + certificado y monitoreo 1 mes",
    highlight: true,
    features: [
      "Recuperación express < 24h",
      "Certificado de seguridad",
      "Monitoreo 24/7 por 30 días",
      "Lista negra: verificación y remoción"
    ]
  }
];

export const PROBLEMS = [
  { icon: "AlertTriangle", title: "Pantalla roja (malware)", desc: "Avisos de seguridad o bloqueo del navegador." },
  { icon: "Server", title: "Sitio caído 500/404", desc: "Errores del servidor o páginas no encontradas." },
  { icon: "Gauge", title: "Rendimiento lento", desc: "Carga lenta, alto TTFB, timeout en hosting." },
  { icon: "ShieldAlert", title: "Ransomware / inyección", desc: "Mensajes de rescate, enlaces spam, redirecciones." }
];

export const PROCESS = [
  { step: 1, title: "Diagnóstico forense", desc: "Identificamos vectores de ataque y afectación." },
  { step: 2, title: "Recuperación express", desc: "Restauramos disponibilidad y limpiamos malware." },
  { step: 3, title: "Blindaje", desc: "Endurecemos WP, credenciales y WAF." },
  { step: 4, title: "Prevención", desc: "Checklist + monitoreo y recomendaciones." }
];

export const STATS = [
  { label: "+200 sitios", value: "recuperados" },
  { label: "24/7", value: "soporte" },
  { label: "9h", value: "tiempo medio" },
  { label: "98%", value: "satisfacción" }
];

export const TESTIMONIALS = [
  {
    name: "Ana Gómez",
    role: "Ecommerce Owner",
    quote: "Pensé que lo perdía todo. En menos de 12 horas mi tienda volvió a operar.",
    initials: "AG"
  },
  {
    name: "Carlos Ruiz",
    role: "Agencia Creativa",
    quote: "Limpieza impecable y blindaje real. Bajó el spam y mejoró el PageSpeed.",
    initials: "CR"
  },
  {
    name: "Lucía Pérez",
    role: "Bloguera",
    quote: "Me guiaron en todo. Claridad, rapidez y cero tecnicismos innecesarios.",
    initials: "LP"
  }
];

export const FAQS = [
  {
    q: "¿Pueden recuperarlo en menos de 24h?",
    a: "El plan Oro prioriza tu caso para entregar en < 24h. Muchas recuperaciones se completan en 6–12h según la complejidad."
  },
  {
    q: "¿Necesitan acceso al hosting?",
    a: "Sí, acceso a cPanel/Panel y WordPress. Trabajamos con copias y dejamos bitácora de cambios."
  },
  {
    q: "¿Qué incluye el blindaje?",
    a: "Endurecimiento de login, permisos, firewall, revisión de plugins/temas, y monitoreo si aplica."
  },
  {
    q: "¿Ofrecen garantía?",
    a: "Sí. Si el problema persiste por la misma causa dentro de 7 días, intervenimos sin costo adicional."
  }
];

// Ilustraciones del hero (seleccionadas por el asistente de imágenes)
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1654783912259-659d94fff000",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577",
  "https://images.pexels.com/photos/11167645/pexels-photo-11167645.jpeg"
];

// Logos de confianza (texto/placeholder para mock)
export const TRUST_LOGOS = [
  { name: "Wordfence" },
  { name: "MalCare" },
  { name: "Sucuri" },
  { name: "Cloudflare" },
  { name: "UpdraftPlus" }
];