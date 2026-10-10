import type {
  Agency,
  RecompraProduct,
  TrackingData,
  UpsellOffer,
} from "@/components/rastreo/types";
import type { RepartidorGuia } from "@/components/repartidor/types";

// Datos de ejemplo SOLO para previsualizar localmente la UI de
// /rastreo/:orderNumber sin backend real. El estado a mostrar se decide
// por el sufijo del orderNumber (ej. "DEMO-pagado" -> estado "pagado").
// Ver docs/hito1-backend-requirements.md — nada de esto es el contrato real.

const DEMO_STATES = [
  "deuda",
  "recojo",
  "yape",
  "pagado",
  "camino",
  "cobrado",
  "anulado",
] as const;

type DemoState = (typeof DEMO_STATES)[number];

function parseState(orderNumber: string): DemoState {
  const suffix = orderNumber.split("-").pop()?.toLowerCase();
  return (DEMO_STATES as readonly string[]).includes(suffix ?? "")
    ? (suffix as DemoState)
    : "deuda";
}

const TIMELINE_BASE = [
  { step: "recibido", label: "Pedido recibido" },
  { step: "preparacion", label: "En preparación" },
  { step: "recogido", label: "Recogido por Shalom" },
  { step: "transito", label: "En tránsito a Arequipa" },
  { step: "entregado", label: "Entregado" },
];

const DONE_UP_TO: Record<DemoState, number> = {
  deuda: 0,
  recojo: 1,
  yape: 0,
  pagado: 1,
  camino: 3,
  cobrado: 5,
  anulado: 0,
};

function buildTimeline(state: DemoState) {
  const done = DONE_UP_TO[state];
  return TIMELINE_BASE.map((t, i) => ({
    ...t,
    completed: i < done,
    current: i === done,
  }));
}

const STATUS_BY_STATE: Record<DemoState, string> = {
  deuda: "PENDIENTE",
  recojo: "PREPARADO",
  yape: "PENDIENTE",
  pagado: "PREPARADO",
  camino: "EN_ENVIO",
  cobrado: "ENTREGADO",
  anulado: "ANULADO",
};

export function buildMockTracking(orderNumber: string): TrackingData {
  const state = parseState(orderNumber);
  const grandTotal = 151;
  const pendingAmount = state === "deuda" || state === "yape" ? 121 : 0;
  const totalPaid = grandTotal - pendingAmount;
  const isPaid = pendingAmount <= 0;
  const hasShipping = state !== "deuda" && state !== "yape";

  return {
    orderNumber,
    status: STATUS_BY_STATE[state],
    deliveryType: "AGENCIA",
    createdAt: new Date().toISOString(),
    customer: {
      fullName: "Joel García",
      district: "Cercado",
      city: "Arequipa",
      province: "Arequipa",
    },
    items: [
      {
        productName: "Pantalón Pilar",
        quantity: 1,
        unitPrice: 99,
        subtotal: 99,
        attributes: { Talla: "M" },
      },
      { productName: "Envío Shalom", quantity: 1, unitPrice: 52, subtotal: 52 },
    ],
    totals: { grandTotal, totalPaid, pendingAmount },
    timeline: buildTimeline(state),
    courier: "Shalom",
    businessName: "Jook Business",
    businessPhone: "+51 987 654 321",
    shippingInfo: hasShipping
      ? {
          shippingKey: "7284",
          shippingCode: "SHL-9834",
          shalomDestinationAgency: "Agencia Shalom Cercado · Av. Ejército 210, Arequipa",
          externalTrackingNumber: "GE-202609-01647",
          trackingUrl: "https://www.shalom.pe/rastreo/GE-202609-01647",
        }
      : null,
    paymentStatus: state === "yape" ? "yape_revision" : isPaid ? "pagado" : "pendiente",
    paymentMethod: isPaid ? "mp" : undefined,
    deliveryCode: isPaid
      ? { code: "7284", status: state === "cobrado" ? "validado" : "activo", expiresAt: null }
      : null,
    deliveryChoice: {
      mode: "agencia",
      agencyId: state === "recojo" ? null : "shl-cercado",
      confirmed: state !== "recojo",
    },
    yapeDirectoEnabled: true,
    yapeDirectNumber: "987654321",
    yapeQrImageUrl: null,
  };
}

export const MOCK_AGENCIES: Agency[] = [
  { id: "shl-cercado", nombre: "Agencia Cercado", direccion: "Av. Ejército 210", horario: "Lun-Sáb 9am-7pm", distanciaKm: 1.2 },
  { id: "shl-cayma", nombre: "Agencia Cayma", direccion: "Av. Cayma 455", horario: "Lun-Sáb 9am-6pm", distanciaKm: 3.4 },
  { id: "shl-jlbyr", nombre: "Agencia JLByR", direccion: "Av. Dolores 120", horario: "Lun-Sáb 9am-7pm", distanciaKm: 5.1 },
];

export const MOCK_UPSELL_OFFERS: UpsellOffer[] = [
  {
    id: "centella",
    name: "Crema Hidratante Centella",
    description: "Centella asiática · 50 ml",
    badge: "-15%",
    originalPrice: 84.5,
    upsellPrice: 71.8,
    showWhen: "ambos",
  },
  {
    id: "aclari",
    name: "Crema Despigmentante ACLARI",
    description: "Aclara manchas · uso nocturno",
    badge: "Envío gratis",
    originalPrice: 85,
    upsellPrice: 72.25,
    showWhen: "ambos",
  },
];

export const MOCK_RECOMPRA_PRODUCTS: RecompraProduct[] = [
  { id: "pilar", name: "Pantalón Pilar", description: "Talla M", price: 99 },
  { id: "centella", name: "Crema Hidratante Centella", description: "50 ml", price: 71.8, badge: "-15%" },
  { id: "aclari", name: "Crema Despigmentante ACLARI", description: "Uso nocturno", price: 72.25, badge: "Envío gratis" },
];

// Portal del repartidor — 3 pedidos con los 3 casos relevantes: pagado sin
// entregar, ya entregado, y con saldo pendiente (tarjeta bloqueada). El
// token no se usa para variar los datos (a diferencia de /tracking, donde
// el sufijo del orderNumber sí decide el estado) — alcanza con un solo
// escenario fijo para ver la pantalla completa.
export function buildMockRepartidorGuia(): RepartidorGuia {
  return {
    guiaCodigo: "GE-202609-01647",
    businessName: "Jook Business",
    active: true,
    orders: [
      {
        orderId: "ord-1",
        orderNumber: "ORD-012247",
        itemsSummary: "Pantalón Pilar Talla M x1",
        customerName: "Joel García",
        dniMasked: "••••3916",
        phone: "987567890",
        address: "Av. Salaverry 432, Arequipa",
        note: "Bolsa de regalo por favor",
        mapsUrl: "https://maps.google.com/?q=Av.+Salaverry+432,+Arequipa",
        paid: true,
        delivered: false,
      },
      {
        orderId: "ord-2",
        orderNumber: "ORD-012244",
        itemsSummary: "Crema Centella x1",
        customerName: "María Quispe",
        dniMasked: "••••8901",
        phone: "956789012",
        address: "Jr. Lima 234, Arequipa",
        note: null,
        mapsUrl: "https://maps.google.com/?q=Jr.+Lima+234,+Arequipa",
        paid: true,
        delivered: true,
      },
      {
        orderId: "ord-3",
        orderNumber: "ORD-012241",
        itemsSummary: "ACLARI x2",
        customerName: "Carlos Ramos",
        dniMasked: "••••2345",
        phone: "934567890",
        address: "Calle Mercaderes 567",
        note: "Entregar al portero si no hay nadie",
        mapsUrl: "https://maps.google.com/?q=Calle+Mercaderes+567",
        paid: false,
        delivered: false,
      },
    ],
  };
}

// Sufijo de estado fuera (ej. "DEMO-deuda" -> "DEMO"), para simular a qué
// nueva URL "redirige" Mercado Pago tras un pago en el mock.
export function stripStateSuffix(orderNumber: string): string {
  const parts = orderNumber.split("-");
  if (parts.length > 1 && (DEMO_STATES as readonly string[]).includes(parts[parts.length - 1].toLowerCase())) {
    parts.pop();
  }
  return parts.join("-") || "DEMO";
}
