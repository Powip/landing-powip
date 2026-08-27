import React from 'react';
import Link from 'next/link';
import { Smartphone, Video, Store, TrendingUp, ArrowRight } from 'lucide-react';

const PERSONAS = [
  {
    icon: Smartphone,
    title: 'El vendedor social',
    role: 'WhatsApp · Instagram · Facebook',
    quote: 'Se me pierden pedidos entre tantos chats y ya no sé quién pagó y quién no.',
    give: 'todos tus chats-pedidos en un tablero, confirmación y despacho sin caos.',
  },
  {
    icon: Video,
    title: 'El live seller',
    role: 'TikTok Live · IG Live',
    quote: 'En pleno live los pedidos se acumulan y no tengo dónde registrarlos.',
    give: 'registro de tus pedidos en un solo tablero con los datos de tus clientes, y despachas después sin perder ni una venta.',
  },
  {
    icon: Store,
    title: 'El vendedor de marketplace',
    role: 'Mercado Libre · Falabella · Ripley',
    quote: 'Vendo en varios marketplaces y mi web, pero cada canal va por su lado y el despacho es un lío.',
    give: 'todos tus marketplaces y canales en un solo tablero, listos para despachar.',
  },
  {
    icon: TrendingUp,
    title: 'El negocio que escaló',
    role: 'Equipo · motorizados · almacén',
    quote: 'Vendo bastante, pero la cobranza COD es un desorden y no sé mi rentabilidad real.',
    give: 'operaciones, roles, liquidaciones de motorizados y rentabilidad real.',
  },
];

export default function LandingPersonas() {
  return (
    <section id="para-quien" className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            ¿Para quién es POWIP?
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Hecho para <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">cómo tú vendes</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            Si vendes online y entregas contraentrega, POWIP entiende tu realidad exacta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-4" aria-hidden="true">
                <p.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1B1730] font-bold text-lg tracking-tight">{p.title}</h3>
              <div className="text-[#1E8C86] font-bold text-[11px] uppercase tracking-wide mt-1 mb-3.5">{p.role}</div>
              <blockquote className="text-[13.5px] text-[#4a4664] italic border-l-2 border-[#CFF3EC] pl-3 mb-3.5 leading-relaxed">
                &quot;{p.quote}&quot;
              </blockquote>
              <p className="text-[13.5px] font-semibold text-[#3a3852]">
                <b className="text-[#4F3A96]">POWIP te da:</b> {p.give}
              </p>
              <Link
                href="/demo"
                className="mt-4 inline-flex items-center gap-1.5 text-[#4F3A96] font-bold text-[13.5px] hover:underline"
              >
                Ver cómo funciona <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
