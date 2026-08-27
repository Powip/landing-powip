import React from 'react';
import { CreditCard, Users } from 'lucide-react';

const BOXES = [
  {
    icon: CreditCard,
    title: 'Pagos & facturación',
    desc: 'Cobra y factura sin fricción:',
    items: ['Yape', 'Plin', 'Mercado Pago', 'SUNAT'],
  },
  {
    icon: Users,
    title: 'Aliados & partners',
    desc: 'Conecta tu plataforma de venta o IA:',
    items: ['yavendió!', 'Aliclik', 'WhatsApp IA', '+ API abierta'],
  },
];

export default function LandingIntegrationsGrid() {
  return (
    <section id="integraciones" className="w-full py-20 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            También se conecta con
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Tus pagos, tu facturación <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">y tus aliados</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BOXES.map((b) => (
            <div key={b.title} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-[0_4px_18px_rgba(46,33,104,0.08)]">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="w-10 h-10 rounded-xl bg-[#4F3A96] flex items-center justify-center shrink-0" aria-hidden="true">
                  <b.icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="text-[17px] font-bold text-[#1B1730] tracking-tight">{b.title}</h3>
              </div>
              <div className="text-[13.5px] text-gray-500 mb-4">{b.desc}</div>
              <div className="flex flex-wrap gap-2.5">
                {b.items.map((it) => (
                  <span key={it} className="bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 font-bold text-[13.5px] text-[#4a4664]">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
