import type { TrackingData } from "./types";

export function hasConfirmedFullPayment(data: TrackingData): boolean {
  const pendingAmount = data.totals?.pendingAmount;
  return typeof pendingAmount === "number" &&
    Number.isFinite(pendingAmount) && pendingAmount === 0;
}

export function shouldStopTrackingPolling(data: TrackingData): boolean {
  return data.status === "ANULADO" ||
    (data.status === "ENTREGADO" && hasConfirmedFullPayment(data));
}

/**
 * Shipping progress does not authorize revealing a pickup/delivery secret.
 * Only the backend's valid balance can establish that the order is paid.
 */
export function getVisibleDeliveryCode(data: TrackingData): string | null {
  // The API clamps a settled balance to zero. A negative/missing/invalid
  // balance is not authoritative proof of payment and must fail closed.
  if (data.status === "ANULADO" || !hasConfirmedFullPayment(data)) {
    return null;
  }

  const deliveryCode = data.deliveryCode?.code;
  if (typeof deliveryCode === "string" && deliveryCode.trim().length > 0) {
    return deliveryCode;
  }

  const shippingKey = data.shippingInfo?.shippingKey;
  return typeof shippingKey === "string" && shippingKey.trim().length > 0
    ? shippingKey
    : null;
}
