import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Video, ShoppingBag } from 'lucide-react';

/**
 * Sección "Para quién es": un camino por canal de venta.
 * Enlaces heredados de la landing actual: no hay páginas /whatsapp ni /tiktok,
 * así que esos van a /demo; Shopify usa su página propia /shopify.
 */
const SEGMENTS = [
  {
    icon: MessageCircle,
    color: '#25D366',
    title: 'Vendes por chat',
    channel: 'WhatsApp · Instagram',
    text: 'Los pedidos se te acumulan en el chat y se pierden. POWIP los registra, los ordena y los despacha sin que se te escape ni una venta.',
    cta: 'Ver demo para WhatsApp',
    href: '/demo',
  },
  {
    icon: Video,
    color: '#1B1730',
    title: 'Vendes en vivo',
    channel: 'TikTok Live',
    text: 'En pleno live los pedidos llueven y no tienes dónde anotarlos. POWIP captura cada uno con los datos del cliente y despacha después.',
    cta: 'Ver demo para TikTok',
    href: '/demo',
  },
  {
    icon: ShoppingBag,
    color: '#5E8E3E',
    title: 'Tienes tu tienda',
    channel: 'Shopify',
    text: 'Tus pedidos Shopify y COD viven aparte de tu operación. POWIP los importa, los despacha con courier y te cuadra la cobranza.',
    cta: 'Ver POWIP para Shopify',
    href: '/shopify',
  },
];

export default function LandingSegments() {
  return (
    <section id="para-quien" className="w-full py-24 px-6 md:px-20 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Para quién es
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Hecho para cómo <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">tú</span> vendes
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            Elige tu canal y mira cómo funciona POWIP en un negocio como el tuyo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEGMENTS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex flex-col bg-white border-[1.5px] border-gray-100 rounded-3xl px-7 py-8 shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1.5 hover:shadow-[0_26px_54px_rgba(46,33,104,0.14)] hover:border-[#C5E6E8] transition-all"
            >
              <span className="absolute top-5 right-5 text-[11.5px] font-bold text-[#4F3A96] bg-[#F1ECFB] px-3 py-1.5 rounded-full">
                ▶ Demo
              </span>
              <span
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: s.color }}
                aria-hidden="true"
              >
                <s.icon className="w-7 h-7 text-white" />
              </span>
              <h3 className="text-[21px] font-bold text-[#1B1730]">{s.title}</h3>
              <div className="text-[13px] font-bold text-[#1E8C86] uppercase tracking-wide mt-1">{s.channel}</div>
              <p className="flex-1 text-[15px] text-[#4a4664] leading-relaxed mt-3.5 mb-6">{s.text}</p>
              <span className="inline-flex items-center gap-2 group-hover:gap-3 transition-all font-bold text-[15px] text-[#4F3A96]">
                {s.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
