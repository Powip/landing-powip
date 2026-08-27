import React from 'react';
import { CircleCheck } from 'lucide-react';
import type { PartnerData } from '@/data/partners';

const CARDS = [
  {
    emoji: '💬',
    title: '¿Tus pedidos se pierden entre los chats?',
    items: ['Se pierden pedidos entre tantas conversaciones', 'No sabes quién ya pagó y quién no', 'Te vuelven a escribir preguntando por su pedido'],
    close: 'Tu negocio crece… pero tu operación es un caos.',
  },
  {
    emoji: '📋',
    title: '¿Sigues anotando pedidos en Excel?',
    items: ['Alguien borra una celda y se pierde todo', 'Se duplican pedidos y no cuadras stock', 'No sabes qué pedidos ya se entregaron', 'El courier te pide la guía urgente'],
    close: 'Un error en Excel = dinero o clientes perdidos.',
  },
  {
    emoji: '💸',
    title: '¿Tu cobranza contraentrega es un misterio?',
    items: ['No sabes cuánto ya cobraste vs cuánto está en la calle', 'Los repartidores no rinden a tiempo', 'Pedidos rechazados sin registro', 'Cierras el mes sin saber cuánto ganaste'],
    close: 'Vendiste mucho… pero, ¿cuánto te quedó de verdad?',
  },
];

export default function PartnersProblem({ partner }: { partner: PartnerData }) {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            El problema
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            El 80% de los negocios ecommerce{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">pierden dinero por pedidos mal gestionados</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-5">{partner.probLead}</p>
        </div>

        <div
          role="region"
          aria-label="Problemas comunes de operación ecommerce, desliza para ver más"
          tabIndex={0}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:pb-0 mask-[linear-gradient(90deg,#000_92%,transparent)] md:mask-none"
        >
          {CARDS.map((c) => (
            <div key={c.title} className="shrink-0 w-[82%] sm:w-[70%] md:w-auto snap-center bg-white rounded-2xl p-7 border border-gray-100 shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-2xl mb-3" aria-hidden="true">{c.emoji}</div>
              <h3 className="text-[#4F3A96] font-bold text-xl mb-3.5 tracking-tight">{c.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-[#4a4860]">
                    <CircleCheck className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4.5 mt-[18px] text-[13.5px] text-[#1E8C86] font-bold italic">{c.close}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
