export type PartnerKey = "yavendio" | "shalom" | "mercadolibre" | "generico";

export interface PartnerFlowNode {
  cap: string;
  title: string;
  desc: string;
  chips?: string[];
}

export interface PartnerVsCol {
  role: string;
  big: string;
  desc: string;
}

export interface PartnerLogo {
  name: string;
  color: string;
}

export interface PartnerData {
  key: PartnerKey;
  /** Nombre del aliado tal como se muestra en textos ("yavendió!", "Shalom"...) */
  displayName: string;
  /** Color de marca del aliado, usado en acentos puntuales */
  color: string;
  /** Franja superior */
  ribbon: string;
  /** Logos del carrusel de integraciones, este aliado primero */
  logos: PartnerLogo[];
  /** Hero */
  eyebrow: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroLead: string;
  appSub: string;
  /** Problema */
  probLead: string;
  /** Handoff (quién hace qué) */
  hoKicker: string;
  hoTitle: string;
  hoTitleHighlight: string;
  hoLead: string;
  flowNodes: [PartnerFlowNode, PartnerFlowNode, PartnerFlowNode];
  vsCols: [PartnerVsCol, PartnerVsCol];
  /** Pasos */
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  /** Precios */
  offerPartnerName: string;
  /** CTA final */
  finalBadge: string;
  finalTitle: string;
  finalTitleHighlight: string;
  finalLead: string;
  finalMini: string;
}

const BASE_LOGOS: PartnerLogo[] = [
  { name: "yavendió!", color: "#00A877" },
  { name: "SHALOM", color: "#E02D3B" },
  { name: "Mercado Libre", color: "#2D3277" },
  { name: "Shopify", color: "#333333" },
  { name: "SUNAT", color: "#006B82" },
  { name: "Mercado Pago", color: "#00B1EA" },
];

function logosFor(first: PartnerLogo): PartnerLogo[] {
  return [first, ...BASE_LOGOS.filter((l) => l.name !== first.name)];
}

export const PARTNERS: Record<PartnerKey, PartnerData> = {
  yavendio: {
    key: "yavendio",
    displayName: "yavendió!",
    color: "#00A877",
    ribbon: "Vienes de yavendió! — activa POWIP y suma la operación a tu venta por WhatsApp",
    logos: logosFor({ name: "yavendió!", color: "#00A877" }),
    eyebrow: "Ya cierras ventas con yavendió!",
    heroTitle: "Ahora",
    heroTitleHighlight: "entrega cada pedido sin caos",
    heroLead:
      "yavendió! cierra la venta. POWIP hace que se cumpla: centraliza tus pedidos, controla tu cobranza contraentrega y despacha con courier — todo desde un solo panel, sin Excel.",
    appSub: "Pedidos de yavendió! sincronizados automáticamente",
    probLead:
      "Vendes cada vez más por WhatsApp con yavendió!… pero todo lo que pasa después de la venta sigue en Excel, notas y chats. Ahí se escapan la plata y los clientes.",
    hoKicker: "yavendió! + POWIP",
    hoTitle: "El combo completo: vende",
    hoTitleHighlight: "y entrega",
    hoLead:
      "yavendió! automatiza tu conversación y cierra la venta. Justo ahí entra POWIP y toma el control de toda la operación — hasta que el pedido llega a la puerta de tu cliente.",
    flowNodes: [
      {
        cap: "Con yavendió!",
        title: "Cierra la venta",
        desc: "IA que responde por WhatsApp, cotiza y confirma el pedido.",
      },
      {
        cap: "Con POWIP",
        title: "Opera el pedido",
        desc: "",
        chips: ["Pedido", "Inventario", "Picking", "Guía", "Courier", "Tracking", "Contraentrega", "Liquidación"],
      },
      {
        cap: "Resultado",
        title: "Cliente recibe",
        desc: "Entrega a tiempo, cobranza cuadrada y cliente feliz.",
      },
    ],
    vsCols: [
      {
        role: "yavendió! =",
        big: "Conversaciones",
        desc: "Termina su trabajo cuando la venta está concretada por WhatsApp.",
      },
      {
        role: "POWIP =",
        big: "Operaciones",
        desc: "Empieza cuando la venta ya está hecha. No reemplaza a yavendió!, lo potencia.",
      },
    ],
    step1Title: "Conecta tu cuenta de yavendió!",
    step1Desc: "Tus pedidos de WhatsApp entran solos a POWIP. Sin copiar y pegar.",
    step2Title: "Gestiona y despacha sin errores",
    step2Desc: "Conecta con Shalom, Olva y otros couriers. Genera guías y rastrea todo automáticamente.",
    offerPartnerName: "yavendió!",
    finalBadge: "50% en tu 2da mensualidad por venir de yavendió!",
    finalTitle: "Ya vendes con yavendió!",
    finalTitleHighlight: "Ahora ordena tu operación con POWIP",
    finalLead: "Crea tu cuenta hoy, conecta yavendió! en minutos y despacha tu próximo pedido sin Excel ni caos.",
    finalMini: "Sin permanencia · Integración oficial con yavendió! · Soporte 1 a 1 desde el día 1",
  },
  shalom: {
    key: "shalom",
    displayName: "Shalom",
    color: "#E02D3B",
    ribbon: "Vienes de Shalom — activa POWIP y ten tus pedidos listos para despachar",
    logos: logosFor({ name: "SHALOM", color: "#E02D3B" }),
    eyebrow: "Ya entregas con Shalom",
    heroTitle: "Ahora ten cada pedido",
    heroTitleHighlight: "listo para despachar",
    heroLead:
      "Con Shalom entregas. POWIP hace que cada pedido llegue listo: guía de Shalom generada automáticamente, cobranza contraentrega cuadrada y tracking en tiempo real — todo desde un solo panel, sin Excel.",
    appSub: "Guías de Shalom generadas automáticamente desde POWIP",
    probLead:
      "Despachas cada vez más con Shalom… pero todo lo que pasa antes del despacho —el pedido, el stock, la guía, la cobranza— sigue en Excel, notas y chats. Ahí se escapan la plata y los clientes.",
    hoKicker: "Shalom + POWIP",
    hoTitle: "El combo completo: prepara",
    hoTitleHighlight: "y entrega",
    hoLead:
      "POWIP ordena todo lo que pasa antes del despacho —pedido, inventario, picking, guía— y se lo entrega a Shalom listo. Shalom lo lleva a la puerta de tu cliente y POWIP cuadra la cobranza contraentrega.",
    flowNodes: [
      {
        cap: "Con POWIP",
        title: "Prepara el pedido",
        desc: "",
        chips: ["Pedido", "Inventario", "Picking", "Packing", "Guía Shalom", "Contraentrega"],
      },
      {
        cap: "Con Shalom",
        title: "Entrega última milla",
        desc: "Recoge, transporta y entrega tus paquetes a nivel nacional.",
      },
      {
        cap: "Resultado",
        title: "Cliente recibe",
        desc: "Entrega a tiempo, cobranza COD cuadrada y cliente feliz.",
      },
    ],
    vsCols: [
      {
        role: "POWIP =",
        big: "Preparación y control",
        desc: "Arma el pedido, genera la guía de Shalom y cuadra la cobranza — antes y después del despacho.",
      },
      {
        role: "Shalom =",
        big: "Última milla",
        desc: "Lleva el paquete a destino. POWIP hace que le llegue trabajo ordenado — no lo reemplaza, lo potencia.",
      },
    ],
    step1Title: "Conecta tu cuenta de Shalom",
    step1Desc: "Genera las guías de Shalom y rastrea tus envíos automáticamente desde POWIP.",
    step2Title: "Centraliza tus pedidos",
    step2Desc: "Une WhatsApp, Instagram, TikTok y tu web en un solo lugar, listos para despachar.",
    offerPartnerName: "Shalom",
    finalBadge: "50% en tu 2da mensualidad por venir de Shalom",
    finalTitle: "Ya entregas con Shalom",
    finalTitleHighlight: "Ahora ordena tu operación con POWIP",
    finalLead:
      "Crea tu cuenta hoy, conecta Shalom en minutos y ten tu próximo pedido listo para despachar — sin Excel ni caos.",
    finalMini: "Sin permanencia · Integración oficial con Shalom · Soporte 1 a 1 desde el día 1",
  },
  mercadolibre: {
    key: "mercadolibre",
    displayName: "Mercado Libre",
    color: "#2D3277",
    ribbon: "Vienes de Mercado Libre — activa POWIP y despacha tus ventas sin caos",
    logos: logosFor({ name: "Mercado Libre", color: "#2D3277" }),
    eyebrow: "Ya vendes en Mercado Libre",
    heroTitle: "Ahora",
    heroTitleHighlight: "centraliza y despacha tus pedidos",
    heroLead:
      "Vendes en Mercado Libre. POWIP centraliza esos pedidos junto con tus otros canales (WhatsApp, Instagram, tu web) y los despacha — guías, cobranza y seguimiento en un solo panel, sin Excel.",
    appSub: "Pedidos de Mercado Libre sincronizados automáticamente",
    probLead:
      "Vendes cada vez más en Mercado Libre… pero cada canal va por su lado y el despacho sigue en Excel, notas y chats. Ahí se escapan la plata y los clientes.",
    hoKicker: "Mercado Libre + POWIP",
    hoTitle: "El combo completo: vende",
    hoTitleHighlight: "y entrega",
    hoLead:
      "Mercado Libre es tu vitrina y cierra ventas. POWIP toma cada pedido —junto con los de tus otros canales— y opera todo hasta la entrega, con guía y cobranza cuadrada.",
    flowNodes: [
      {
        cap: "Con Mercado Libre",
        title: "Vende en la vitrina",
        desc: "Tu producto frente a millones de compradores del marketplace.",
      },
      {
        cap: "Con POWIP",
        title: "Opera el pedido",
        desc: "",
        chips: ["Pedido", "Inventario", "Picking", "Guía", "Courier", "Tracking", "Contraentrega", "Liquidación"],
      },
      {
        cap: "Resultado",
        title: "Cliente recibe",
        desc: "Entrega a tiempo, stock cuadrado y cliente feliz.",
      },
    ],
    vsCols: [
      {
        role: "Mercado Libre =",
        big: "Vitrina y ventas",
        desc: "Te trae compradores y cierra la venta dentro del marketplace.",
      },
      {
        role: "POWIP =",
        big: "Operaciones",
        desc: "Centraliza ese pedido con todos tus canales y lo opera hasta la entrega. No reemplaza a Mercado Libre, lo potencia.",
      },
    ],
    step1Title: "Conecta tu cuenta de Mercado Libre",
    step1Desc: "Tus pedidos de Mercado Libre entran solos a POWIP. Sin copiar y pegar.",
    step2Title: "Suma tus otros canales",
    step2Desc: "WhatsApp, Instagram, TikTok y tu web en el mismo lugar, listos para despachar.",
    offerPartnerName: "Mercado Libre",
    finalBadge: "50% en tu 2da mensualidad por venir de Mercado Libre",
    finalTitle: "Ya vendes en Mercado Libre",
    finalTitleHighlight: "Ahora ordena tu operación con POWIP",
    finalLead: "Crea tu cuenta hoy, conecta Mercado Libre en minutos y despacha tus pedidos sin Excel ni caos.",
    finalMini: "Sin permanencia · Integración oficial con Mercado Libre · Soporte 1 a 1 desde el día 1",
  },
  generico: {
    key: "generico",
    displayName: "nuestros aliados",
    color: "#4F3A96",
    ribbon: "Activa POWIP y ordena tu operación ecommerce — de la venta a la entrega",
    logos: BASE_LOGOS,
    eyebrow: "Para negocios ecommerce que venden y entregan",
    heroTitle: "Ordena tu ecommerce,",
    heroTitleHighlight: "de la venta a la entrega",
    heroLead:
      "POWIP centraliza tus pedidos de todos tus canales, controla tu cobranza contraentrega y despacha con courier — todo desde un solo panel, sin Excel.",
    appSub: "Todos tus pedidos, de todos tus canales, en un solo lugar",
    probLead:
      "Vendes cada vez más… pero todo lo que pasa entre la venta y la entrega sigue en Excel, notas y chats. Ahí se escapan la plata y los clientes.",
    hoKicker: "Todo en un solo lugar",
    hoTitle: "El combo completo: vende",
    hoTitleHighlight: "y entrega",
    hoLead:
      "Tus canales cierran la venta. POWIP toma cada pedido y opera todo hasta que llega a la puerta de tu cliente — guía, courier y cobranza cuadrada.",
    flowNodes: [
      {
        cap: "Tus canales",
        title: "Cierran la venta",
        desc: "WhatsApp, Instagram, TikTok, tu web y marketplaces.",
      },
      {
        cap: "Con POWIP",
        title: "Opera el pedido",
        desc: "",
        chips: ["Pedido", "Inventario", "Picking", "Guía", "Courier", "Tracking", "Contraentrega", "Liquidación"],
      },
      {
        cap: "Resultado",
        title: "Cliente recibe",
        desc: "Entrega a tiempo, cobranza cuadrada y cliente feliz.",
      },
    ],
    vsCols: [
      {
        role: "Tus canales =",
        big: "Ventas",
        desc: "Cierran la venta en cada canal donde vendes.",
      },
      {
        role: "POWIP =",
        big: "Operaciones",
        desc: "Centraliza y opera cada pedido hasta la entrega, desde un solo panel.",
      },
    ],
    step1Title: "Conecta tus canales de venta",
    step1Desc: "WhatsApp, Instagram, TikTok, tu web y marketplaces entran solos a POWIP.",
    step2Title: "Gestiona y despacha sin errores",
    step2Desc: "Conecta con Shalom, Olva y otros couriers. Genera guías y rastrea todo automáticamente.",
    offerPartnerName: "nuestros aliados",
    finalBadge: "Activa POWIP y ordena tu operación hoy",
    finalTitle: "Ordena tu ecommerce con POWIP",
    finalTitleHighlight: "de la venta a la entrega",
    finalLead: "Crea tu cuenta hoy, conecta tus canales en minutos y despacha tu próximo pedido sin Excel ni caos.",
    finalMini: "Sin permanencia · +1,200 negocios ecommerce · Soporte 1 a 1 desde el día 1",
  },
};

/** ref de URL (?ref=) → partner. Referencias no registradas caen al genérico. */
export const REF_MAP: Record<string, PartnerKey> = {
  yavendio: "yavendio",
  aliclik: "yavendio",
  shopify: "yavendio",
  shalom: "shalom",
  eva: "shalom",
  evacourier: "shalom",
  olva: "shalom",
  mercadolibre: "mercadolibre",
  meli: "mercadolibre",
  mercadopago: "mercadolibre",
  falabella: "mercadolibre",
  ripley: "mercadolibre",
};

export function getPartnerFromRef(ref: string | null | undefined): PartnerData {
  const clean = (ref || "").toLowerCase().replace(/[^a-z]/g, "");
  const key = REF_MAP[clean] || "generico";
  return PARTNERS[key];
}
