'use client';

import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Invoice } from '@/types/onboarding';

interface SubscriptionSuccessProps {
  invoices: Invoice[];
}

export function SubscriptionSuccess({ invoices }: SubscriptionSuccessProps) {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL ?? '/';
  const firstInvoice = invoices[0] ?? null;

  return (
    <div className="flex flex-col items-center text-center py-6 gap-6">
      <div className="flex gap-2 text-2xl">🎉 ✨ 🎊 ✨ 🎉</div>

      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
          ¡Suscripción activa!
        </h2>
        <p className="text-gray-500">
          Tu plan está activado. Ya podés acceder a tu panel de control.
        </p>
      </div>

      {firstInvoice && (
        <div className="w-full bg-purple-50 rounded-xl p-4 border border-purple-100 text-left text-sm">
          <p className="font-bold text-gray-700 mb-3">Resumen del pago</p>
          <div className="flex justify-between py-1.5 border-b border-purple-100">
            <span className="text-gray-500">Monto</span>
            <span className="font-bold text-gray-800">S/ {firstInvoice.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-purple-100">
            <span className="text-gray-500">Estado</span>
            <span className="font-bold text-[#008a7b] capitalize">{firstInvoice.status}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-gray-500">Fecha</span>
            <span className="font-bold text-gray-800">
              {new Date(firstInvoice.date).toLocaleDateString('es-PE')}
            </span>
          </div>
        </div>
      )}

      <Button
        type="button"
        size="lg"
        className="w-full bg-[#008a7b] hover:bg-[#007468] text-white"
        onClick={() => {
          window.location.href = frontendUrl;
        }}
      >
        <ArrowRight className="w-4 h-4" /> Entrar a Powip
      </Button>

      <p className="text-xs text-gray-400">Comprobante enviado por email</p>
    </div>
  );
}
