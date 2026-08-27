import React from 'react';
import { UserPlus, ShoppingBag, Truck, PackageCheck } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    title: 'Crea tu cuenta',
    desc: 'Activación inmediata. Sin tarjeta para empezar.',
  },
  {
    icon: ShoppingBag,
    title: 'Conecta tus canales',
    desc: 'WhatsApp, Shopify, marketplaces — tus pedidos entran solos.',
  },
  {
    icon: Truck,
    title: 'Enlaza tus couriers',
    desc: 'Shalom, Eva, Olva y más, listos para despachar.',
  },
  {
    icon: PackageCheck,
    title: 'Despacha y cobra',
    desc: 'Genera guías, controla la cobranza y mira tu rentabilidad.',
  },
];

export default function StepsSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-14 bg-white">
      <div className="text-center max-w-2xl">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          Empieza hoy
        </span>
        <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
          En marcha en <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">minutos</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-3">Sin instalaciones, sin migraciones eternas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl">
        {STEPS.map((step, i) => (
          <div key={step.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_18px_rgba(46,33,104,0.08)] text-left">
            <div className="w-10 h-10 rounded-xl bg-[#4F3A96] text-white font-bold flex items-center justify-center mb-4" aria-hidden="true">
              {i + 1}
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] flex items-center justify-center mb-3.5" aria-hidden="true">
              <step.icon className="w-5 h-5 text-[#4F3A96]" />
            </div>
            <h3 className="font-bold text-[17px] text-[#1B1730] mb-1.5 tracking-tight">{step.title}</h3>
            <p className="text-gray-500 text-[13.5px] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
