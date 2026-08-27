import React from 'react';

const FAQS = [
  {
    q: '¿Cuánto demora en estar listo?',
    a: 'Minutos. Creas tu cuenta, conectas tus canales y couriers, y empiezas a despachar el mismo día. Sin instalaciones ni migraciones eternas — y con soporte 1 a 1 desde el primer día.',
  },
  {
    q: '¿Tengo que cambiar mi courier o mi plataforma de venta?',
    a: 'No. POWIP se integra con lo que ya usas (Shalom, Eva, Olva, Shopify, WhatsApp, marketplaces y más). No reemplaza tus herramientas, las conecta y ordena en un solo lugar.',
  },
  {
    q: '¿Hay permanencia o contratos?',
    a: 'Ninguna. Sin permanencia, sin contratos. Cambias o cancelas tu plan cuando tu negocio lo necesite.',
  },
  {
    q: '¿Sirve si vendo por WhatsApp y contraentrega (COD)?',
    a: 'Es exactamente para eso. POWIP está hecho para ecommerce COD en Perú: confirmación, despacho, cobranza contraentrega, rendición de motorizados y liquidaciones incluidas.',
  },
  {
    q: '¿Qué pasa con mis pedidos actuales?',
    a: 'Los importas fácil y siguen fluyendo. Nuestro equipo te acompaña en el onboarding para que no pierdas ni un pedido en la transición.',
  },
  {
    q: '¿POWIP factura a SUNAT?',
    a: 'Sí. Emites boletas y facturas electrónicas y las envías a tu cliente automáticamente, desde la misma plataforma.',
  },
];

export default function LandingFAQ() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
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
      </div>
    </section>
  );
}
