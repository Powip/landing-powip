"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { RecompraProduct } from "./types";

interface RecompraFlowProps {
  orderNumber: string;
  defaultAddress: string;
}

// Segmento 8 (Hito 1). Endpoints asumidos, NINGUNO confirmado con backend
// ni definido explícitamente en la especificación (que solo describe el
// POST final de recompra, no de dónde sale el catálogo de ofertas):
// GET  /tracking/:orderNumber/recompra/catalogo -> RecompraProduct[]
// POST /tracking/:orderNumber/recompra { productIds, addressChoice, newAddress? }
//      -> { initPoint }  (se redirige a MP igual que el cobro normal)
// El costo de envío está hardcodeado (SHIPPING_COST) porque no hay de
// dónde leerlo todavía — debe venir del backend. Ver
// docs/hito1-backend-requirements.md.
const SHIPPING_COST = 6;

type Step = 1 | 2 | 3;

export default function RecompraFlow({ orderNumber, defaultAddress }: RecompraFlowProps) {
  const [step, setStep] = useState<Step>(1);
  const [products, setProducts] = useState<RecompraProduct[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [addressChoice, setAddressChoice] = useState<"same" | "new">("same");
  const [newAddress, setNewAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCatalog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/recompra/catalogo`,
        );
        if (!res.ok) {
          if (!cancelled) setCatalogError("No pudimos cargar las ofertas.");
          return;
        }
        const json = await res.json();
        if (!cancelled) {
          setProducts(Array.isArray(json) ? json : (json?.productos ?? []));
        }
      } catch {
        if (!cancelled) setCatalogError("Error de conexión al cargar ofertas.");
      } finally {
        if (!cancelled) setLoadingCatalog(false);
      }
    };

    fetchCatalog();
    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  const selectedProducts = useMemo(
    () => products.filter((p) => selected[p.id]),
    [products, selected],
  );
  const subtotal = selectedProducts.reduce((s, p) => s + p.price, 0);
  const total = subtotal + SHIPPING_COST;

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const handlePay = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_VENTAS}/tracking/${orderNumber}/recompra`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productIds: selectedProducts.map((p) => p.id),
            addressChoice,
            newAddress: addressChoice === "new" ? newAddress : undefined,
          }),
        },
      );
      if (!res.ok) {
        setSubmitError("No pudimos crear tu nuevo pedido. Intenta de nuevo.");
        return;
      }
      const json = await res.json();
      if (!json?.initPoint) {
        setSubmitError("No pudimos iniciar el pago del nuevo pedido.");
        return;
      }
      window.location.href = json.initPoint;
    } catch {
      setSubmitError("Error de conexión al crear el pedido.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCatalog) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-white/50 text-sm">
        Cargando ofertas para tu recompra...
      </div>
    );
  }

  if (catalogError) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-red-400 text-sm">
        {catalogError}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-teal-600/10 backdrop-blur-lg rounded-3xl p-6 border border-purple-500/20 space-y-4">
      <div className="flex items-center gap-2 text-white font-semibold">
        <ShoppingBag className="h-5 w-5 text-purple-300" />
        Volver a comprar
      </div>

      <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wide">
        {(["Productos", "Dirección", "Pago"] as const).map((label, i) => (
          <div
            key={label}
            className={`flex-1 text-center py-1.5 rounded-lg ${
              step === i + 1 ? "bg-purple-500/30 text-purple-200" : "bg-white/5 text-white/40"
            }`}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`w-full flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                selected[p.id]
                  ? "border-purple-400/60 bg-purple-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{p.name}</p>
                {p.description && (
                  <p className="text-white/50 text-xs">{p.description}</p>
                )}
              </div>
              <p className="text-green-400 font-bold text-sm">S/ {p.price.toFixed(2)}</p>
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  selected[p.id] ? "bg-purple-500 text-white" : "bg-white/10 text-white/50"
                }`}
              >
                {selected[p.id] ? "✓" : "+"}
              </span>
            </button>
          ))}
          {products.length === 0 && (
            <p className="text-white/40 text-sm">
              No hay ofertas de recompra disponibles ahora.
            </p>
          )}
          <button
            onClick={() => setStep(2)}
            disabled={selectedProducts.length === 0}
            className="w-full bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-2xl"
          >
            Continuar ({selectedProducts.length} producto{selectedProducts.length === 1 ? "" : "s"})
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <button
            onClick={() => setAddressChoice("same")}
            className={`w-full text-left rounded-2xl border p-4 ${
              addressChoice === "same"
                ? "border-purple-400/60 bg-purple-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <p className="text-white text-sm font-medium">Misma dirección</p>
            <p className="text-white/50 text-xs mt-0.5">{defaultAddress}</p>
          </button>
          <button
            onClick={() => setAddressChoice("new")}
            className={`w-full text-left rounded-2xl border p-4 ${
              addressChoice === "new"
                ? "border-purple-400/60 bg-purple-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <p className="text-white text-sm font-medium">Nueva dirección</p>
            <p className="text-white/50 text-xs mt-0.5">Ingresar otra</p>
          </button>
          {addressChoice === "new" && (
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Escribe la nueva dirección de entrega"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm placeholder:text-white/30"
              rows={2}
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-white/10 text-white/70 font-medium py-3 rounded-2xl"
            >
              Volver
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={addressChoice === "new" && !newAddress.trim()}
              className="flex-1 bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-2xl"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <div className="bg-white/5 rounded-2xl p-4 space-y-1.5 text-sm">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex justify-between text-white/80">
                <span>{p.name}</span>
                <span>S/ {p.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-white/60 text-xs pt-1 border-t border-white/10">
              <span>Envío</span>
              <span>S/ {SHIPPING_COST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>

          {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

          <button
            onClick={handlePay}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl"
          >
            {submitting ? "Redirigiendo a Mercado Pago..." : `Pagar S/ ${total.toFixed(2)} con mercadopago`}
          </button>
          <button
            onClick={() => setStep(2)}
            className="w-full border border-white/10 text-white/70 font-medium py-3 rounded-2xl"
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
}
