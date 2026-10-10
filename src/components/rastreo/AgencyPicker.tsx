"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import type { Agency } from "./types";

interface AgencyPickerProps {
  orderNumber: string;
  province?: string;
  city?: string;
  onConfirmed: () => void;
}

// Segmento 3 (Hito 1). Endpoints asumidos, no confirmados con backend:
// GET  /couriers/shalom/agencias?provincia=&distrito=
// POST /tracking/:orderNumber/entrega  { mode: "agencia", agencyId }
// Ver docs/hito1-backend-requirements.md.
export default function AgencyPicker({
  orderNumber,
  province,
  city,
  onConfirmed,
}: AgencyPickerProps) {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAgencies = async () => {
      try {
        const qs = new URLSearchParams();
        if (province) qs.set("provincia", province);
        if (city) qs.set("distrito", city);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_VENTAS}/couriers/shalom/agencias?${qs.toString()}`,
        );
        if (!res.ok) {
          if (!cancelled) setLoadError("No pudimos cargar las agencias disponibles.");
          return;
        }
        const json = await res.json();
        if (!cancelled) {
          setAgencies(Array.isArray(json) ? json : (json?.agencias ?? []));
        }
      } catch {
        if (!cancelled) setLoadError("Error de conexión al cargar agencias.");
      } finally {
        if (!cancelled) setLoadingAgencies(false);
      }
    };

    fetchAgencies();
    return () => {
      cancelled = true;
    };
  }, [province, city]);

  const handleConfirm = async () => {
    if (!selectedId) return;
    setConfirmError(null);
    setConfirming(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/entrega`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "agencia", agencyId: selectedId }),
        },
      );
      if (!res.ok) {
        setConfirmError("No pudimos confirmar la agencia. Intenta de nuevo.");
        return;
      }
      onConfirmed();
    } catch {
      setConfirmError("Error de conexión al confirmar la agencia.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 space-y-4">
      <h3 className="text-white font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5 text-purple-400" />
        Elige tu agencia Shalom
      </h3>
      <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3 text-teal-200 text-xs leading-snug">
        Shalom entrega solo en agencia (no a domicilio). Recoges con tu DNI.
        Confirma tu agencia para que tu pedido salga de despacho.
      </div>

      {loadingAgencies && (
        <p className="text-white/50 text-sm flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Cargando agencias...
        </p>
      )}

      {loadError && <p className="text-red-400 text-sm">{loadError}</p>}

      {!loadingAgencies && !loadError && (
        <div className="space-y-2">
          {agencies.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                selectedId === a.id
                  ? "border-teal-400/60 bg-teal-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <p className="text-white font-medium">{a.nombre}</p>
              <p className="text-white/50 text-xs mt-0.5">{a.direccion}</p>
              {a.horario && <p className="text-white/40 text-xs">{a.horario}</p>}
            </button>
          ))}
          {agencies.length === 0 && (
            <p className="text-white/40 text-sm">
              No encontramos agencias cercanas. Contacta al vendedor.
            </p>
          )}
        </div>
      )}

      {confirmError && <p className="text-red-400 text-sm">{confirmError}</p>}

      <button
        onClick={handleConfirm}
        disabled={!selectedId || confirming}
        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-colors"
      >
        {confirming ? "Confirmando..." : "Confirmar agencia y liberar despacho"}
      </button>
    </div>
  );
}
