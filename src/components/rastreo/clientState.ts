import type { TrackingData } from "./types";

export type ClientState =
  | "deuda"
  | "recojo"
  | "yape"
  | "pagado"
  | "camino"
  | "cobrado"
  | "anulado";

// Traduce la respuesta del backend a uno de los 7 estados del mockup
// Hito 1. El orden de los checks importa: un pedido puede estar
// "EN_ENVIO" y a la vez tener saldo pendiente, así que el status del
// courier manda sobre el estado de pago una vez que ya se despachó.
export function resolveClientState(data: TrackingData): ClientState {
  if (data.status === "ANULADO") return "anulado";
  if (data.status === "ENTREGADO") return "cobrado";
  if (data.status === "EN_ENVIO") return "camino";

  const isPaid = data.totals.pendingAmount <= 0;

  if (
    isPaid &&
    data.deliveryChoice?.mode === "agencia" &&
    !data.deliveryChoice?.confirmed
  ) {
    return "recojo";
  }

  if (data.paymentStatus === "yape_revision") return "yape";
  if (!isPaid) return "deuda";
  return "pagado";
}
