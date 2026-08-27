import React from 'react';

const STATS = [
  { n: '+1,200', l: 'negocios ecommerce activos' },
  { n: '1.2M+', l: 'pedidos gestionados' },
  { n: '-3 hrs', l: 'al día que dejas de copiar y pegar' },
  { n: '5 min', l: 'para conectar y empezar' },
];

export default function PartnersStats() {
  return (
    <section className="w-full py-14 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.l} className="bg-[#FAFAFA] border border-gray-100 rounded-2xl py-7 px-5 text-center">
            <div className="text-3xl md:text-[40px] font-black tracking-tight text-[#4F3A96]">{s.n}</div>
            <div className="text-[13.5px] text-[#666666] mt-2 font-medium">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
