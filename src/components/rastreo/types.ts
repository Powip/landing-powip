export interface TrackingItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  attributes?: Record<string, unknown>;
}

export interface TrackingTimeline {
  step: string;
  label: string;
  completed: boolean;
  current: boolean;
}

export interface TrackingData {
  orderNumber: string;
  status: string;
  deliveryType: string;
  createdAt: string;
  customer: {
    fullName: string;
    district?: string;
    city?: string;
    province?: string;
  };
  items: TrackingItem[];
  totals: {
    grandTotal: number;
    totalPaid: number;
    pendingAmount: number;
  };
  timeline: TrackingTimeline[];
  shipping?: {
    courierName?: string | null;
    trackingNumber?: string | null;
    pickupKey?: string | null;
  };
  courier?: string | null;
  businessName?: string;
  businessPhone?: string | null;
  shippingInfo?: {
    shippingKey?: string | null;
    shippingCode?: string | null;
    shalomDestinationAgency?: string | null;
    externalTrackingNumber?: string | null;
    trackingUrl?: string | null;
  } | null;
  // Campos del Hito 1 que el backend todavía no expone — opcionales para
  // no romper nada mientras se confirma el contrato real. Ver
  // docs/hito1-backend-requirements.md.
  paymentStatus?:
    | "pendiente"
    | "parcial"
    | "yape_revision"
    | "pagado"
    | "devuelto"
    | "en_disputa";
  paymentMethod?: "mp" | "yape_mp" | "yape_directo" | "transferencia";
  deliveryCode?: {
    code: string;
    status: "activo" | "validado" | "expirado";
    expiresAt?: string | null;
  } | null;
  deliveryChoice?: {
    mode: "agencia" | "domicilio";
    agencyId?: string | null;
    confirmed: boolean;
  } | null;
  yapeDirectoEnabled?: boolean;
  yapeDirectNumber?: string | null;
  yapeQrImageUrl?: string | null;
}

export interface Agency {
  id: string;
  nombre: string;
  direccion: string;
  horario?: string;
  distanciaKm?: number;
}

export interface UpsellOffer {
  id: string;
  name: string;
  description?: string;
  badge?: string;
  originalPrice: number;
  upsellPrice: number;
  showWhen: "antes" | "despues" | "ambos";
}

export interface RecompraProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  badge?: string;
}
