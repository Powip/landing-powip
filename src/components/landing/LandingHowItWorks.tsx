import React from 'react';

const STEPS = [
  {
    icon: '🛒',
    title: 'Todos tus pedidos en un tablero',
    text: 'WhatsApp, Instagram, TikTok y Shopify entran con el origen marcado. Nada se queda perdido en un chat.',
  },
  {
    icon: '🖨️',
    title: 'Imprime tus etiquetas de envío',
    text: 'Etiqueta con los datos del cliente, código y lista de picking, lista para imprimir y pegar. Deja de escribir direcciones con plumón.',
  },
  {
    icon: '📦',
    title: 'Guías de Shalom y Olva en 1 clic',
    text: 'Generas la guía, traemos el voucher y el tracking, y el estado se actualiza solo — hasta marcar Entregado.',
  },
  {
    icon: '💰',
    title: 'Cobranza contraentrega y ganancia real',
    text: 'Controla saldos, adelantos por Yape y tu ganancia con precio neto por pedido. Más, boletas electrónicas SUNAT.',
  },
];

/** Sección "Cómo funciona": 4 pasos del flujo de POWIP. */
export default function LandingHowItWorks() {
  return (
    <section id="como" className="w-full py-24 px-6 md:px-20 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Cómo funciona
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Todo tu negocio, <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">en una sola pantalla</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">Lo que hoy te toma todo el día, con POWIP son minutos.</p>
        </div>

        <ol className="flex flex-col gap-5 list-none p-0 m-0">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[48px_1fr] md:grid-cols-[54px_1fr] gap-5 items-start bg-white border border-gray-100 rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-[0_4px_18px_rgba(46,33,104,0.08)]"
            >
              <div
                className="w-12 h-12 md:w-[54px] md:h-[54px] rounded-2xl bg-[#E0F7FA] flex items-center justify-center text-2xl"
                aria-hidden="true"
              >
                {s.icon}
              </div>
              <div>
                <h3 className="flex flex-wrap items-center gap-2.5 text-lg md:text-xl font-bold text-[#1B1730]">
                  <span className="text-xs font-extrabold text-[#1E8C86] bg-[#E0F7FA] rounded-full px-2.5 py-0.5">{i + 1}</span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] md:text-base text-gray-500 leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
