"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  Clock,
  AlertCircle,
  ShoppingBag,
  Send,
  Lock,
  Download,
  ShieldCheck,
} from "lucide-react";
import type { TrackingData, UpsellOffer } from "@/components/rastreo/types";
import { resolveClientState } from "@/components/rastreo/clientState";
import AgencyPicker from "@/components/rastreo/AgencyPicker";
import YapePanel from "@/components/rastreo/YapePanel";
import UpsellList from "@/components/rastreo/UpsellList";
import RecompraFlow from "@/components/rastreo/RecompraFlow";
import { usePollingResource } from "@/lib/usePollingResource";

/* -----------------------------------------
   Status Color/Icon Helpers
----------------------------------------- */

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDIENTE":
      return "text-amber-500";
    case "PREPARADO":
      return "text-blue-500";
    case "EN_ENVIO":
      return "text-purple-500";
    case "ENTREGADO":
      return "text-green-500";
    case "ANULADO":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "PENDIENTE":
      return "Pedido Recibido";
    case "PREPARADO":
      return "En Preparación";
    case "LLAMADO":
      return "Contactándote";
    case "EN_ENVIO":
      return "En Camino";
    case "ENTREGADO":
      return "Entregado";
    case "ANULADO":
      return "Anulado";
    default:
      return status;
  }
};

/* -----------------------------------------
   Page Component
----------------------------------------- */

export default function RastreoPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  // Deja de pollear en estados terminales (entregado/anulado) — ya no hay
  // nada que el backend vaya a cambiar solo ahí.
  const {
    data,
    loading,
    error,
    refetch: refetchTracking,
  } = usePollingResource<TrackingData>({
    url: orderNumber
      ? `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}`
      : null,
    intervalMs: 30000,
    notFoundMessage: "Pedido no encontrado",
    genericErrorMessage: "Error al cargar el pedido",
    shouldStopPolling: (d) => {
      const s = resolveClientState(d);
      return s === "cobrado" || s === "anulado";
    },
  });
  const fetchTracking = useCallback(() => refetchTracking(), [refetchTracking]);

  // Ofertas de upsell — fetch independiente del polling de tracking (no
  // cambian tan seguido). Si falla, no rompe la página: el upsell es un
  // extra, no el flujo principal.
  const [upsellOffers, setUpsellOffers] = useState<UpsellOffer[]>([]);
  useEffect(() => {
    if (!orderNumber) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/upsell`,
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) {
          setUpsellOffers(Array.isArray(json) ? json : (json?.ofertas ?? []));
        }
      } catch {
        // silencioso a propósito, ver comentario arriba
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  const handleUpsellAdded = (offerId: string) => {
    setUpsellOffers((prev) => prev.filter((o) => o.id !== offerId));
    fetchTracking();
  };

  const [payingMp, setPayingMp] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showYapePanel, setShowYapePanel] = useState(false);

  // Endpoint asumido siguiendo la convención existente (`/tracking/:orderNumber`).
  // No está confirmado con backend todavía. Ver docs/hito1-backend-requirements.md.
  const handlePayWithMp = async () => {
    setPaymentError(null);
    setPayingMp(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/mp/preferencia`,
        { method: "POST" },
      );

      if (!res.ok) {
        setPaymentError("No pudimos iniciar el pago. Intenta de nuevo.");
        return;
      }

      const json = await res.json();
      if (!json?.initPoint) {
        setPaymentError("No pudimos iniciar el pago. Intenta de nuevo.");
        return;
      }

      window.location.href = json.initPoint;
    } catch {
      setPaymentError("Error de conexión al iniciar el pago.");
    } finally {
      setPayingMp(false);
    }
  };

  const [confirmingReceipt, setConfirmingReceipt] = useState(false);
  const [receiptError, setReceiptError] = useState<string | null>(null);

  const handleConfirmReceipt = async () => {
    setReceiptError(null);
    setConfirmingReceipt(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/confirmar-recepcion`,
        { method: "POST" },
      );
      if (!res.ok) {
        setReceiptError("No pudimos confirmar la recepción. Intenta de nuevo.");
        return;
      }
      await fetchTracking();
    } catch {
      setReceiptError("Error de conexión al confirmar.");
    } finally {
      setConfirmingReceipt(false);
    }
  };

  /* Loading State */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white/70">Cargando tu pedido...</p>
        </div>
      </div>
    );
  }

  /* Error State */
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-white/20">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Pedido no encontrado
          </h1>
          <p className="text-white/60">
            No pudimos encontrar el pedido{" "}
            <span className="font-mono text-purple-300">{orderNumber}</span>
          </p>
          <p className="text-white/40 text-sm mt-4">
            Verifica que el número de pedido sea correcto
          </p>
        </div>
      </div>
    );
  }

  const clientState = resolveClientState(data);
  const isDelivered = clientState === "cobrado";
  const isCancelled = clientState === "anulado";
  const deliveryCode = data.deliveryCode?.code || data.shippingInfo?.shippingKey || null;
  const upsellAntes = upsellOffers.filter((o) => o.showWhen === "antes" || o.showWhen === "ambos");
  const upsellDespues = upsellOffers.filter((o) => o.showWhen === "despues" || o.showWhen === "ambos");
  const customerAddress = [data.customer.district, data.customer.city, data.customer.province]
    .filter(Boolean)
    .join(", ") || "Tu dirección registrada";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-purple-400" />
            <span className="font-semibold text-white">
              Seguimiento de Pedido
            </span>
          </div>
          <span className="text-sm font-mono text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
            {data.orderNumber}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <div
          className={`rounded-3xl p-6 ${isCancelled
              ? "bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30"
              : isDelivered
                ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30"
                : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
            }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isCancelled
                  ? "bg-red-500/30"
                  : isDelivered
                    ? "bg-green-500/30"
                    : "bg-purple-500/30"
                }`}
            >
              {isCancelled ? (
                <AlertCircle className="h-8 w-8 text-red-400" />
              ) : isDelivered ? (
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              ) : (
                <Truck className="h-8 w-8 text-purple-400 animate-pulse" />
              )}
            </div>
            <div>
              <p className="text-white/60 text-sm">Estado actual</p>
              <h2
                className={`text-2xl font-bold ${getStatusColor(data.status)}`}
              >
                {getStatusLabel(data.status)}
              </h2>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              Progreso del pedido
            </h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-white/10"></div>
              <div
                className="absolute left-[18px] top-2 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transition-all duration-500"
                style={{
                  height: `${(data.timeline.filter((t) => t.completed || t.current)
                      .length /
                      data.timeline.length) *
                    100
                    }%`,
                }}
              ></div>

              {/* Timeline Items */}
              <div className="space-y-6">
                {data.timeline.map((item, index) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-4 relative"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all ${item.completed
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : item.current
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-purple-500/30 animate-pulse"
                            : "bg-white/10 border border-white/20"
                        }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-sm font-medium text-white/60">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${item.completed || item.current
                            ? "text-white"
                            : "text-white/40"
                          }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Info */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-400" />
            Información de entrega
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-white/50 text-sm">Cliente</p>
              <p className="text-white font-medium">{data.customer.fullName}</p>
            </div>
            {(data.customer.district ||
              data.customer.city ||
              data.customer.province) && (
                <div>
                  <p className="text-white/50 text-sm">Ubicación</p>
                  <p className="text-white">
                    {[
                      data.customer.district,
                      data.customer.city,
                      data.customer.province,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              )}
            <div>
              <p className="text-white/50 text-sm">Tipo de entrega</p>
              <p className="text-white capitalize">
                {data.deliveryType.replace("_", " ").toLowerCase()}
              </p>
            </div>
            {/* Courier asignado */}
            {data.courier && (
              <div>
                <p className="text-white/50 text-sm">Courier asignado</p>
                <p className="text-white font-medium">{data.courier}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Envío con Shalom */}
        {data.shippingInfo && (
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/30">
            <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-400" />
              Tu pedido fue despachado
            </h3>
            <p className="text-white/50 text-xs mb-5">
              {data.courier || "Courier"} ya tiene tu paquete en camino
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nro guía con link */}
              {data.shippingInfo.externalTrackingNumber && (
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/50 text-xs mb-1">Número de guía</p>
                  {data.shippingInfo.trackingUrl ? (
                    <a
                      href={data.shippingInfo.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 font-mono font-bold text-lg hover:text-blue-200 underline underline-offset-2"
                    >
                      {data.shippingInfo.externalTrackingNumber}
                    </a>
                  ) : (
                    <p className="text-white font-mono font-bold text-lg">
                      {data.shippingInfo.externalTrackingNumber}
                    </p>
                  )}
                  {data.shippingInfo.trackingUrl && (
                    <p className="text-white/30 text-[10px] mt-1">Toca para rastrear en línea</p>
                  )}
                </div>
              )}

              {/* Código */}
              {data.shippingInfo.shippingCode && (
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/50 text-xs mb-1">Código de envío</p>
                  <p className="text-white font-mono font-bold text-lg">
                    {data.shippingInfo.shippingCode}
                  </p>
                </div>
              )}

              {/* Agencia destino */}
              {data.shippingInfo.shalomDestinationAgency && (
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/50 text-xs mb-1">Agencia de retiro</p>
                  <p className="text-white font-semibold">
                    {data.shippingInfo.shalomDestinationAgency}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Elegir agencia Shalom (gate pre-despacho) */}
        {clientState === "recojo" && (
          <AgencyPicker
            orderNumber={orderNumber}
            province={data.customer.province}
            city={data.customer.city}
            onConfirmed={() => fetchTracking()}
          />
        )}

        {/* Products */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-purple-400" />
            Tu pedido ({data.items.length}{" "}
            {data.items.length === 1 ? "producto" : "productos"})
          </h3>
          <div className="space-y-3">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start py-3 border-b border-white/10 last:border-0"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{item.productName}</p>
                  {item.attributes &&
                    Object.keys(item.attributes).length > 0 && (
                      <p className="text-white/50 text-sm">
                        {Object.entries(item.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(" | ")}
                      </p>
                    )}
                  <p className="text-white/50 text-sm">
                    Cantidad: {item.quantity} × S/ {item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <p className="text-white font-medium">
                  S/ {item.subtotal.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-white">
              <span className="text-white/70">Total del pedido</span>
              <span className="font-bold text-lg">
                S/ {data.totals.grandTotal.toFixed(2)}
              </span>
            </div>
            {data.totals.totalPaid > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Pagado</span>
                <span>- S/ {data.totals.totalPaid.toFixed(2)}</span>
              </div>
            )}
            {data.totals.pendingAmount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Pendiente de pago</span>
                <span className="font-semibold">
                  S/ {data.totals.pendingAmount.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cobro con Mercado Pago / Yape — solo en los estados donde
            corresponde. Atados a clientState (no a pendingAmount>0 solo)
            para que nunca se muestren en "camino"/"cobrado", donde ya se
            despachó o entregó aunque quedara un saldo residual. */}
        {clientState === "yape" && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 text-center space-y-1">
            <p className="text-amber-200 font-bold">
              Tu comprobante de Yape está en revisión
            </p>
            <p className="text-white/60 text-sm">
              El vendedor lo confirma en un máximo de 30 minutos y tu código se activa solo.
            </p>
          </div>
        )}

        {clientState === "deuda" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 space-y-4">
            <div>
              <p className="text-white/60 text-sm">Saldo pendiente</p>
              <p className="text-amber-400 font-bold text-3xl">
                S/ {data.totals.pendingAmount.toFixed(2)}
              </p>
            </div>
            <p className="text-white/70 text-sm">
              Paga tu saldo para <span className="font-semibold text-white">habilitar tu código de entrega</span> y
              recibir tu pedido. Sin pago no sale de despacho.
            </p>

            <button
              onClick={handlePayWithMp}
              disabled={payingMp}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-colors"
            >
              {payingMp ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Redirigiendo a Mercado Pago...
                </>
              ) : (
                <>
                  Pagar S/ {data.totals.pendingAmount.toFixed(2)} con
                  <span className="bg-white text-sky-600 font-extrabold text-xs px-2 py-1 rounded-md">
                    mercadopago
                  </span>
                </>
              )}
            </button>

            {paymentError && (
              <p className="text-red-400 text-sm text-center">{paymentError}</p>
            )}

            <p className="text-white/40 text-xs text-center">
              Tarjeta, Yape y transferencia · procesado por Mercado Pago
            </p>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-start gap-2">
              <Lock className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
              <p className="text-purple-200 text-xs leading-snug">
                Pagas en línea con tarjeta o Yape (dentro de Mercado Pago). El
                repartidor no cobra efectivo y tu código se activa al instante.
              </p>
            </div>

            {/* Yape directo — opcional, requiere flag + número del negocio */}
            {data.yapeDirectoEnabled && data.yapeDirectNumber && (
              <>
                <button
                  onClick={() => setShowYapePanel((v) => !v)}
                  className="w-full text-center text-white/60 text-xs underline underline-offset-2"
                >
                  {showYapePanel ? "Ocultar pago por Yape" : "¿Prefieres pagar por Yape?"}
                </button>
                {showYapePanel && (
                  <YapePanel
                    orderNumber={orderNumber}
                    amount={data.totals.pendingAmount}
                    yapeNumber={data.yapeDirectNumber}
                    businessName={data.businessName}
                    qrImageUrl={data.yapeQrImageUrl}
                    onSubmitted={() => fetchTracking()}
                  />
                )}
              </>
            )}

            <p className="text-white/30 text-[10px] text-center leading-snug">
              Si el saldo no se paga y el pedido no se retira dentro del plazo del
              courier, puede pasar a destrucción/abandono según sus políticas de
              transporte. {data.businessName || "La empresa"} no se hace responsable
              por pérdidas ni reembolsos en ese caso.
            </p>
          </div>
        )}

        {/* Upsell antes del pago */}
        {clientState === "deuda" && (
          <UpsellList orderNumber={orderNumber} offers={upsellAntes} onAdded={handleUpsellAdded} />
        )}

        {/* Código de entrega + descargas — una vez pagado */}
        {(clientState === "pagado" || clientState === "camino" || clientState === "cobrado") &&
          deliveryCode && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 space-y-4">
              <h3 className="text-green-300 font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Código de entrega activo
              </h3>
              <div className="bg-black/20 border border-dashed border-green-500/30 rounded-2xl p-5 text-center">
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  Muéstralo al recibir tu pedido
                </p>
                <p className="text-green-300 font-mono font-extrabold text-4xl tracking-[0.5em] mt-1">
                  {deliveryCode}
                </p>
                {data.shippingInfo?.shalomDestinationAgency && (
                  <p className="text-white/50 text-xs mt-2">
                    {data.shippingInfo.shalomDestinationAgency}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/constancia.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-xs font-semibold py-3 rounded-xl hover:bg-white/10"
                >
                  <Download className="h-4 w-4" /> Constancia de pago
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/guia.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-xs font-semibold py-3 rounded-xl hover:bg-white/10"
                >
                  <Download className="h-4 w-4" /> Guía de envío
                </a>
              </div>
            </div>
          )}

        {/* Upsell después del pago, antes del despacho */}
        {clientState === "pagado" && (
          <UpsellList orderNumber={orderNumber} offers={upsellDespues} onAdded={handleUpsellAdded} />
        )}

        {/* Confirmar recepción */}
        {clientState === "camino" && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-center space-y-3">
            <p className="text-white font-semibold">¿Ya recibiste tu pedido?</p>
            <p className="text-white/50 text-xs">Confírmalo para cerrar tu orden.</p>
            <button
              onClick={handleConfirmReceipt}
              disabled={confirmingReceipt}
              className="w-full border border-green-500/40 text-green-300 font-bold py-3 rounded-2xl disabled:opacity-50"
            >
              {confirmingReceipt ? "Confirmando..." : "✓ Confirmar que recibí mi pedido"}
            </button>
            {receiptError && <p className="text-red-400 text-sm">{receiptError}</p>}
          </div>
        )}

        {/* Recompra */}
        {clientState === "cobrado" && (
          <RecompraFlow orderNumber={orderNumber} defaultAddress={customerAddress} />
        )}

        {/* Footer */}
        <div className="text-center text-white/40 text-sm py-4">
          <p>¿Tienes alguna pregunta sobre tu pedido?</p>
          <p>
            Contáctanos con tu número de orden:{" "}
            <span className="font-mono text-purple-300">
              {data.orderNumber}
            </span>
          </p>
          <div className="mt-8 pt-8 border-t border-white/5 opacity-50">
            <p className="tracking-widest uppercase text-[10px] font-bold text-purple-300">
              By Powip
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
