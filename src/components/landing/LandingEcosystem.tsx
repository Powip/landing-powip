import React from 'react';
import PowipMark from '@/components/partners/PowipMark';

const SELL_CHANNELS = ['WhatsApp', 'Instagram', 'TikTok', 'Shopify', 'Mercado Libre'];
const COURIERS = [
  { name: 'Shalom', tag: '70% del mercado', star: true },
  { name: 'Eva Courier' },
  { name: 'Olva' },
  { name: 'Pedidos Ya' },
  { name: 'Urbano' },
];
const ORBIT = ['Cobranza COD', 'Facturación SUNAT', 'Rentabilidad real', 'Inventario', 'Aliados'];

export default function LandingEcosystem() {
  return (
    <section id="ecosistema" className="w-full py-24 px-6 md:px-20 bg-[#161226] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
            El ecosistema POWIP
          </span>
          <h2 className="mt-4 text-white font-bold text-3xl md:text-5xl leading-tight">
            No es una herramienta más.
            <br />
            Es donde tu ecommerce tiene <span className="bg-white/15 px-2 rounded box-decoration-clone">todo conectado</span>.
          </h2>
          <p className="mt-4 text-[#c9c3e6] text-base md:text-lg">
            POWIP se sienta en el centro de tu operación: conecta <b className="text-white">de dónde vendes</b> con{' '}
            <b className="text-white">por dónde envías</b> — y todo lo del medio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_1fr] gap-4 items-center">
          <div className="flex flex-col gap-2.5">
            <div className="text-xs font-bold uppercase tracking-wide text-[#8ff0d0] mb-0.5">Vendes por</div>
            {SELL_CHANNELS.map((c) => (
              <div key={c} className="bg-white/[0.08] border border-white/15 rounded-xl px-4 py-2.5 font-semibold text-[14.5px]">
                {c}
              </div>
            ))}
          </div>

          <div className="hidden md:flex justify-center text-[#a99ce8] text-2xl font-bold" aria-hidden="true">→</div>
          <div className="flex md:hidden justify-center text-[#a99ce8] text-2xl font-bold rotate-90" aria-hidden="true">→</div>

          <div className="flex justify-center py-2">
            <div className="w-40 h-40 rounded-[34px] bg-gradient-to-br from-[#6C4FE0] via-[#4E37A8] to-[#3A2A80] flex flex-col items-center justify-center text-center shadow-[0_30px_80px_rgba(78,55,168,0.4)]">
              <span className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-2">
                <PowipMark className="w-6 h-6 text-white" />
              </span>
              <b className="text-lg tracking-tight">POWIP</b>
              <small className="text-[10.5px] opacity-90 font-medium mt-0.5">Centro de operaciones</small>
            </div>
          </div>

          <div className="hidden md:flex justify-center text-[#a99ce8] text-2xl font-bold" aria-hidden="true">→</div>
          <div className="flex md:hidden justify-center text-[#a99ce8] text-2xl font-bold rotate-90" aria-hidden="true">→</div>

          <div className="flex flex-col gap-2.5">
            <div className="text-xs font-bold uppercase tracking-wide text-[#8ff0d0] mb-0.5">Envías con</div>
            {COURIERS.map((c) => (
              <div
                key={c.name}
                className={`rounded-xl px-4 py-2.5 font-semibold text-[14.5px] flex items-center gap-2 ${
                  c.star ? 'bg-[#22B8A6]/20 border border-[#22B8A6]/55 shadow-[0_6px_20px_rgba(34,184,166,0.2)]' : 'bg-white/[0.08] border border-white/15'
                }`}
              >
                {c.name}
                {c.tag && (
                  <span className="ml-auto text-[10px] font-bold text-[#04352a] bg-[#8ff0d0] rounded-full px-2 py-0.5 whitespace-nowrap">
                    {c.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mt-9">
          {ORBIT.map((o) => (
            <span
              key={o}
              className="bg-[#22B8A6]/15 border border-[#22B8A6]/35 text-[#9ff5d6] rounded-full px-4 py-2 text-[12.5px] font-bold"
            >
              {o}
            </span>
          ))}
        </div>

        <p className="text-center mt-8 text-[16.5px] text-[#d6cff2] max-w-xl mx-auto">
          Y cada mes sumamos nuevos canales, couriers y aliados.{' '}
          <b className="text-white">No compras un software: entras a un ecosistema que crece contigo.</b>
        </p>
      </div>
    </section>
  );
}
