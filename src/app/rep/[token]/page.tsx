"use client";

import { useParams } from "next/navigation";
import { AlertCircle, Radio, Truck } from "lucide-react";
import type { RepartidorGuia } from "@/components/repartidor/types";
import OrderCard from "@/components/repartidor/OrderCard";
import { usePollingResource } from "@/lib/usePollingResource";

// Portal del repartidor (spec §3, §7.5, §8) — link público por token de
// guía, sin login, y sin montos en ninguna parte de esta página. Endpoint
// asumido: GET /rep/:token. No confirmado con backend. Ver
// docs/hito1-backend-requirements.md.
export default function RepartidorPage() {
  const params = useParams();
  const token = params.token as string;

  // Polling cada 20s: cuando el cliente paga en el link de rastreo, esta
  // tarjeta se debe habilitar sola (spec §7.5), sin que el repartidor
  // recargue la página. Se detiene solo cuando la guía se cierra.
  const {
    data,
    loading,
    error,
    refetch: fetchGuia,
  } = usePollingResource<RepartidorGuia>({
    url: token ? `${process.env.NEXT_PUBLIC_API_VENTAS}/rep/${token}` : null,
    intervalMs: 20000,
    notFoundMessage: "Este link no existe o ya venció",
    genericErrorMessage: "Error al cargar los pedidos",
    shouldStopPolling: (d) => !d.active,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Cargando tus pedidos...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 max-w-md w-full shadow-sm">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1.5">Link no disponible</h1>
          <p className="text-gray-500 text-sm">{error || "No pudimos cargar esta guía"}</p>
        </div>
      </div>
    );
  }

  if (!data.active) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 max-w-md w-full shadow-sm">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-7 w-7 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1.5">Guía cerrada</h1>
          <p className="text-gray-500 text-sm">
            Ya entregaste todos los pedidos de esta guía. Este link ya no está activo.
          </p>
        </div>
      </div>
    );
  }

  const deliveredCount = data.orders.filter((o) => o.delivered).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-900 font-bold">
            <Truck className="h-5 w-5 text-teal-600" /> Portal del repartidor
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {data.businessName} · Guía {data.guiaCodigo}
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          En vivo — los pagos de los clientes se reflejan al instante
        </div>

        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          Pedidos de la guía — {deliveredCount} de {data.orders.length} entregados
        </p>

        <div className="space-y-3">
          {data.orders.map((order) => (
            <OrderCard
              key={order.orderId}
              token={token}
              order={order}
              onValidated={() => fetchGuia()}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
