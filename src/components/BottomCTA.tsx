import React from 'react';
import Link from 'next/link';

export default function BottomCTA() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white">
      <div className="max-w-4xl mx-auto text-center rounded-[36px] bg-[#4F3A96] text-white px-6 py-14 md:px-16 md:py-20 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full bg-[#22B8A6]/30 blur-[70px]" />

        <img
          src="/mascota-saludando.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute -bottom-8 -right-8 w-52 lg:w-64 h-auto opacity-95 drop-shadow-2xl"
        />

        <div className="relative">
          <span className="inline-block text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
            Empieza hoy
          </span>
          <h2 className="mt-4 text-white font-bold text-3xl md:text-5xl leading-tight">
            Ordena tu ecommerce hoy.
            <br />
            <span className="bg-white/20 px-2 rounded box-decoration-clone">Deja el Excel, los chats y el caos.</span>
          </h2>
          <p className="mt-[18px] mb-7 text-[#e2ddf6] max-w-xl mx-auto text-[17px]">
            Crea tu cuenta, conecta tus canales y couriers en minutos, y despacha tu próximo pedido sin caos — con tu
            rentabilidad real a la vista.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/crear-cuenta"
              className="inline-flex items-center gap-2 bg-white text-[#4F3A96] font-bold text-lg px-9 py-[18px] rounded-2xl shadow-[0_4px_18px_rgba(46,33,104,0.08)]"
            >
              Crea tu cuenta →
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors border border-white/40 text-white font-bold text-lg px-9 py-[18px] rounded-2xl"
            >
              Agenda una demostración
            </Link>
          </div>
          <div className="mt-4 text-[13.5px] text-[#c3b9e6]">
            Sin permanencia · +1,200 negocios ecommerce · Soporte 1 a 1 desde el día 1
          </div>
        </div>
      </div>
    </section>
  );
}
