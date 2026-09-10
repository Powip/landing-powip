"use client";

import { useState } from "react";
import { Lock, MapPin, MessageCircle } from "lucide-react";
import type { RepartidorOrder } from "./types";

interface OrderCardProps {
  token: string;
  order: RepartidorOrder;
  onValidated: () => void;
}

// Endpoint asumido: POST /rep/:token/validar { orderId, codigo }. No
// confirmado con backend. Ver docs/hito1-backend-requirements.md.
export default function OrderCard({ token, order, onValidated }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const waUrl = `https://wa.me/${order.phone.replace(/\D/g, "")}`;

  const handleValidate = async () => {
    if (code.length !== 4) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/rep/${token}/validar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.orderId, codigo: code }),
        },
      );
      if (!res.ok) {
        setError("Código incorrecto o vencido.");
        return;
      }
      setCode("");
      setExpanded(false);
      onValidated();
    } catch {
      setError("Error de conexión al validar el código.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-gray-900">{order.orderNumber}</p>
          <p className="text-gray-500 text-sm">{order.itemsSummary}</p>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
            order.paid ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {order.paid ? "✓ Prepago" : "⏳ Saldo pendiente"}
        </span>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-gray-400">Cliente</dt>
        <dd className="font-medium text-gray-900">{order.customerName}</dd>
        <dt className="text-gray-400">DNI</dt>
        <dd className="text-gray-900">{order.dniMasked}</dd>
        <dt className="text-gray-400">Teléfono</dt>
        <dd className="text-gray-900">{order.phone}</dd>
        <dt className="text-gray-400">Dirección</dt>
        <dd className="text-gray-900">{order.address}</dd>
        {order.note && (
          <>
            <dt className="text-gray-400">Nota</dt>
            <dd className="text-amber-700">{order.note}</dd>
          </>
        )}
      </dl>

      {order.mapsUrl && (
        <a
          href={order.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 text-xs font-bold"
        >
          <MapPin className="h-3.5 w-3.5" /> Ver en Google Maps
        </a>
      )}

      {order.delivered ? (
        <div className="text-center text-sm font-semibold text-green-700 bg-green-50 rounded-xl py-2.5">
          ✓ Entregado
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            disabled={!order.paid}
            className="flex-1 bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
          >
            Confirmar entrega
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 flex items-center justify-center border border-gray-200 rounded-xl text-green-600"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      )}

      {!order.paid && !order.delivered && (
        <p className="flex items-start gap-1.5 text-xs text-amber-700">
          <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          El cliente aún no paga su saldo. No cobres efectivo — cuando pague, esta
          tarjeta se habilita sola.
        </p>
      )}

      {expanded && order.paid && !order.delivered && (
        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
          <p className="text-xs text-gray-500">Código de entrega del cliente (4 dígitos)</p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            maxLength={4}
            className="w-full text-center tracking-[0.5em] font-bold text-lg border border-gray-200 rounded-lg py-2"
            placeholder="····"
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            onClick={handleValidate}
            disabled={code.length !== 4 || submitting}
            className="w-full bg-gray-900 disabled:opacity-40 text-white font-bold text-sm py-2.5 rounded-xl"
          >
            {submitting ? "Validando..." : "Validar código"}
          </button>
        </div>
      )}
    </div>
  );
}
