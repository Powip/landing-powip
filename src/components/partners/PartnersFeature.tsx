import React from 'react';
import { Check } from 'lucide-react';

const FEATURES = [
  'Centraliza todos tus pedidos',
  'Controla tus cobros contraentrega',
  'Facturación electrónica SUNAT',
  'Integración con couriers y tracking',
  'Reportes y rentabilidad real',
];

export default function PartnersFeature() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto rounded-[36px] bg-[#1B1730] text-white overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl relative">
        <div className="pointer-events-none absolute -top-24 left-[28%] w-[360px] h-[360px] rounded-full bg-[#6C4FE0]/40 blur-[60px]" />

        <div className="relative p-8 md:p-14 flex flex-col justify-center">
          <span className="inline-block w-fit text-[#7cf3ce] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
            Un solo panel
          </span>
          <h2 className="mt-4 text-white font-bold text-3xl md:text-[42px] leading-tight tracking-tight">
            Todo tu ecommerce en un solo lugar.
          </h2>
          <p className="mt-4 text-[#c9c4e4] text-base leading-relaxed">
            Deja de operar con Excel, chats, facturación y courier en plataformas separadas. Con POWIP controlas toda tu operación —de la venta a la entrega— desde un solo panel.
          </p>
          <ul className="mt-6 flex flex-col gap-3.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 font-semibold text-[16.5px]">
                <span className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-[#22B8A6] to-[#1E8C86] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative p-8 md:p-10 md:pb-0 flex items-end" aria-hidden="true">
          <div className="w-full rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-[#f3f2f8] px-3.5 py-2.5 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 bg-white rounded-md px-3 py-1 text-[11px] text-gray-400 flex-1">powip.lat/dashboard</span>
            </div>
            <div className="bg-white p-4">
              <div className="flex gap-2.5 mb-3">
                <div className="flex-1 bg-[#FAFAFA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-500">Ventas del mes</div>
                  <div className="text-xl font-black text-[#4F3A96]">S/ 84,320</div>
                </div>
                <div className="flex-1 bg-[#E0F7FA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-500">Por cobrar (COD)</div>
                  <div className="text-xl font-black text-[#006B82]">S/ 12,140</div>
                </div>
              </div>
              <div className="bg-[#FAFAFA] rounded-xl p-3.5">
                <div className="text-[11px] text-gray-500 mb-2">Pedidos por estado</div>
                <div className="flex gap-1.5 h-16 items-end">
                  {[80, 55, 70, 40, 30, 65].map((h, i) => (
                    <div key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: ['#22D3A6', '#4F3A96', '#22B8A6', '#6C4FE0', '#F5A623', '#22D3A6'][i] }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
