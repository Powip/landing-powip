import React from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: '¿Funciona con mi WhatsApp e Instagram?',
    a: 'Sí. Conectas tus canales de venta y todos los pedidos caen en un solo tablero, con el origen marcado. También TikTok Live, Shopify y marketplaces.',
  },
  {
    q: '¿Se integra con Shalom y Olva? ¿Imprimo las etiquetas?',
    a: 'Sí, con Shalom y Olva por API. Generas la guía desde POWIP, traemos el voucher y el tracking, y el estado se actualiza solo hasta marcar Entregado. Las etiquetas de envío salen listas para imprimir — nunca más escribir direcciones a mano.',
  },
  {
    q: '¿Puedo importar mis pedidos actuales?',
    a: 'Sí. Importas desde Excel o conectas tus canales y empiezas a operar sobre lo que ya tienes, sin partir de cero.',
  },
  {
    q: '¿Cuánto tardo en empezar?',
    a: 'Minutos. Creas tu cuenta, conectas canales y couriers, y despachas el mismo día. Si quieres, te acompañamos en una demo para dejarlo listo contigo.',
  },
  {
    q: '¿Tengo permanencia?',
    a: 'No. Es mensual, sin contratos atados. Cambias de plan o cancelas cuando quieras.',
  },
];

export default function LandingFAQ() {
  return (
    <section id="faq" className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA] scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Preguntas frecuentes
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">Todo lo que quieres saber</h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group bg-white border border-gray-100 rounded-2xl shadow-[0_4px_18px_rgba(46,33,104,0.08)] overflow-hidden"
            >
              <summary className="cursor-pointer list-none px-6 py-[18px] font-bold text-base text-[#1B1730] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-[#4F3A96] text-2xl font-normal shrink-0 group-open:hidden" aria-hidden="true">
                  +
                </span>
                <span className="text-[#4F3A96] text-2xl font-normal shrink-0 hidden group-open:inline" aria-hidden="true">
                  −
                </span>
              </summary>
              <div className="px-6 pb-5 text-[14.5px] text-gray-500 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/preguntas-frecuentes"
            className="inline-flex items-center gap-1.5 text-[#4F3A96] font-bold text-[15px] hover:underline"
          >
            Ver todas las preguntas frecuentes →
          </Link>
        </div>
      </div>
    </section>
  );
}
