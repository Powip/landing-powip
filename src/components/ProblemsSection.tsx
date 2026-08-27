import React from 'react';
import { CircleCheck } from 'lucide-react';

const CARDS = [
  {
    img: '/problems-card1.png',
    alt: 'Vendedora revisando pedidos y pagos en su laptop con POWIP',
    title: '¿Tus pedidos se pierden entre los chats?',
    lead: 'Vendes por WhatsApp, Instagram o Facebook, pero cuando llegan muchos mensajes:',
    items: ['Se pierden pedidos entre tantas conversaciones', 'No sabes quién ya pagó y quién no', 'Te vuelven a escribir preguntando por su pedido'],
    close: 'Tu negocio crece… pero tu operación es un caos.',
    stat: '-30%',
    statLabel: 'de pedidos que se caen por desorden',
  },
  {
    img: '/problems-card2.png',
    alt: 'Hoja de cálculo desordenada usada para registrar pedidos y pagos',
    title: '¿Sigues gestionando tus pedidos en Excel?',
    lead: 'Cada venta contraentrega termina en una hoja de cálculo:',
    items: ['Alguien borra una celda y se pierde todo', 'Se duplican pedidos y no cuadras stock', 'No sabes qué pedidos ya se entregaron', 'El courier te pide la guía urgente'],
    close: 'Un error en Excel = dinero o clientes perdidos.',
    stat: '5-8',
    statLabel: 'apps distintas que no se hablan entre sí',
  },
  {
    img: '/problems-card3.png',
    alt: 'Pedidos empacados y listos para envío tras una venta en vivo',
    title: '¿Vendes por TikTok Live y los pedidos se vuelven un caos?',
    lead: 'Mientras haces el live:',
    items: ['Los clientes escriben por WhatsApp', 'Faltan direcciones', 'No sabes qué pedidos confirmar', 'Pierdes ventas por el desorden'],
    close: 'Vendiste mucho… pero ahora no sabes cómo procesarlo.',
    stat: 'S/ ?',
    statLabel: 'tu ganancia real, hoy, es un misterio',
  },
];

export default function ProblemsSection() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            El problema
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Vendes cada vez más…{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">pero pierdes plata en el camino</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            Entre WhatsApp, Excel, el courier y la calculadora, se te escapan pedidos, cobros y —lo peor— no sabes
            cuánto ganas de verdad.
          </p>
        </div>

        <div
          role="region"
          aria-label="Problemas comunes de operación ecommerce, desliza para ver más"
          tabIndex={0}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:pb-0 mask-[linear-gradient(90deg,#000_92%,transparent)] md:mask-none"
        >
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="shrink-0 w-[82%] sm:w-[70%] md:w-auto snap-center bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col gap-5"
            >
              <div className="w-full h-[200px] rounded-xl overflow-hidden border border-gray-100">
                <img src={c.img} alt={c.alt} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 flex flex-col gap-3.5 flex-1">
                <h3 className="text-[#1B1730] font-bold text-lg tracking-tight">{c.title}</h3>
                <p className="text-[13.5px] text-gray-500">{c.lead}</p>
                <ul className="flex flex-col gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-[#3a3852]">
                      <CircleCheck className="w-4 h-4 text-[#EF4444] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[13px] text-[#1E8C86] font-bold italic">{c.close}</p>
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="text-2xl font-black text-[#EF4444] tracking-tight">{c.stat}</div>
                  <div className="text-[12px] text-gray-500">{c.statLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
