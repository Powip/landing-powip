// Portal del repartidor (Hito 1, spec §7.5). El repartidor NUNCA debe ver
// montos — por diseño, ningún campo de este tipo lleva precios/totales.
// `dniMasked` asume que backend ya lo manda enmascarado (ej. "••••3916");
// el frontend no hace ningún enmascarado del lado del cliente porque para
// entonces el DNI completo ya habría viajado por la red — eso anularía el
// propósito de enmascarar. Ver docs/hito1-backend-requirements.md.

export interface RepartidorOrder {
  orderId: string;
  orderNumber: string;
  itemsSummary: string;
  customerName: string;
  dniMasked: string;
  phone: string;
  address: string;
  note?: string | null;
  mapsUrl?: string | null;
  paid: boolean;
  delivered: boolean;
}

export interface RepartidorGuia {
  guiaCodigo: string;
  businessName: string;
  active: boolean;
  orders: RepartidorOrder[];
}
