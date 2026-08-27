import React from 'react';

const STATS = [
  { n: '+1,200', l: 'negocios ecommerce activos' },
  { n: '1.2M+', l: 'pedidos gestionados' },
  { n: '-3 hrs', l: 'al día que dejas de copiar y pegar' },
  { n: '5 min', l: 'para conectar y empezar' },
];

export default function LandingStatsBand() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-[#161226] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
          Resultados
        </span>
        <h2 className="mt-4 text-white font-bold text-3xl md:text-5xl leading-tight">
          Menos caos. Más control. Más ventas.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {STATS.map((s) => (
            <div key={s.l} className="bg-white/[0.06] border border-white/10 rounded-2xl py-7 px-4">
              <div className="text-3xl md:text-[42px] font-black tracking-tight bg-gradient-to-r from-[#a996ff] to-[#7cf3ce] bg-clip-text text-transparent">
                {s.n}
              </div>
              <div className="text-[13px] text-[#c9c3e6] mt-2 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
