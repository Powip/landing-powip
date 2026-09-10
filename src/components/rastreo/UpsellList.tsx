"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import type { UpsellOffer } from "./types";

interface UpsellListProps {
  orderNumber: string;
  offers: UpsellOffer[];
  onAdded: (offerId: string) => void;
}

// Segmento 7 (Hito 1). Endpoints asumidos:
// GET  /tracking/:orderNumber/upsell         -> UpsellOffer[]
// POST /tracking/:orderNumber/upsell { offerId }
// No confirmados con backend. Ver docs/hito1-backend-requirements.md.
export default function UpsellList({ orderNumber, offers, onAdded }: UpsellListProps) {
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!offers.length) return null;

  const handleAdd = async (offerId: string) => {
    setError(null);
    setAddingId(offerId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/upsell`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ offerId }),
        },
      );
      if (!res.ok) {
        setError("No pudimos agregar el producto. Intenta de nuevo.");
        return;
      }
      onAdded(offerId);
    } catch {
      setError("Error de conexión al agregar el producto.");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 space-y-4">
      <h3 className="text-amber-400 font-semibold flex items-center gap-2">
        <Zap className="h-5 w-5" />
        Agrega a tu pedido
      </h3>
      <div className="space-y-3">
        {offers.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{o.name}</p>
              {o.description && (
                <p className="text-white/50 text-xs mt-0.5">{o.description}</p>
              )}
              {o.badge && (
                <span className="inline-block mt-1 text-[10px] font-bold bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                  {o.badge}
                </span>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/40 text-xs line-through">
                S/ {o.originalPrice.toFixed(2)}
              </p>
              <p className="text-green-400 font-bold text-sm">
                S/ {o.upsellPrice.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleAdd(o.id)}
              disabled={addingId === o.id}
              className="shrink-0 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              {addingId === o.id ? "..." : "Agregar"}
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
