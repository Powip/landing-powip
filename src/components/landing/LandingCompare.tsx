import React from 'react';
import { X, CircleCheck } from 'lucide-react';

const BAD = [
  'Excel, WhatsApp, notas y courier por separado',
  'Sin trazabilidad del pedido de la venta a la entrega',
  'Cobros y entregas coordinados a mano',
  'Reportes armados manualmente, casi siempre tarde',
  'No sabes tu rentabilidad real',
  'Más errores, más reclamos, menos control',
];

const GOOD = [
  'Un solo panel para todo tu negocio',
  'Trazabilidad completa: de la venta a la entrega',
  'Cobranza y logística automatizadas',
  'Reportes y métricas en tiempo real',
  'Rentabilidad real por pedido, canal y producto',
  'Menos errores, más eficiencia y clientes felices',
];

export default function LandingCompare() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Antes vs con POWIP
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Deja de operar con <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">5 apps que no se hablan</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl p-7 bg-[#FFF1F1] border border-[#ffd9d9]">
            <h3 className="text-lg font-bold text-[#1B1730] mb-4 flex items-center gap-2">
              <span aria-hidden="true">📵</span> Sin POWIP
            </h3>
            <ul className="flex flex-col gap-2.5">
              {BAD.map((it) => (
                <li key={it} className="flex gap-2.5 text-[14.5px] text-[#4a4664]">
                  <X className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-7 bg-[#EAF8F5] border border-[#CFF3EC]">
            <h3 className="text-lg font-bold text-[#1B1730] mb-4 flex items-center gap-2">
              <span aria-hidden="true">✅</span> Con POWIP
            </h3>
            <ul className="flex flex-col gap-2.5">
              {GOOD.map((it) => (
                <li key={it} className="flex gap-2.5 text-[14.5px] text-[#4a4664]">
                  <CircleCheck className="w-4 h-4 text-[#0d9c78] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
