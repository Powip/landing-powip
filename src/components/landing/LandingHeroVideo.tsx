import React from 'react';
import Link from 'next/link';
import { ArrowRight, Printer, Package, Zap } from 'lucide-react';

/**
 * Hero de la landing v2: copy del mockup ("del plumón a la etiqueta") con el
 * estilo actual de la landing. A la derecha va el video del flujo completo
 * (Ventas → guía Shalom → rastreo → voucher → etiqueta).
 */
export default function LandingHeroVideo() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#F4F1FD] pt-10 pb-16 px-6 md:px-20">
      <div className="pointer-events-none absolute -top-28 -right-16 w-[420px] h-[420px] rounded-full bg-[#B9A7FF] opacity-40 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[360px] h-[360px] rounded-full bg-[#9EE8DC] opacity-40 blur-[80px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Para negocios que venden por redes sociales
          </span>

          <h1 className="mt-4 text-[#4F3A96] font-bold text-4xl md:text-[56px] leading-[1.08] tracking-tight">
            Tus ventas y tus couriers,{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">en un solo lugar</span>.
          </h1>

          <p className="mt-5 text-[#4a4664] text-base md:text-lg max-w-xl leading-relaxed">
            ¿Vendes por WhatsApp, Instagram o TikTok? POWIP ordena tus pedidos,{' '}
            <b>imprime tus etiquetas de envío</b> y genera tus guías de <b>Shalom y Olva</b> en 1 clic. Deja el
            plumón y el Excel.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_12px_28px_rgba(79,58,150,0.36)]"
            >
              Agenda tu demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#precios"
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 text-[#4F3A96] font-bold text-base px-8 py-4 rounded-2xl hover:bg-white transition-colors"
            >
              Activa tu plan
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <div className="flex" aria-hidden="true">
              {[
                { initials: 'PA', bg: '#4F3A96' },
                { initials: 'EP', bg: '#006B82' },
                { initials: 'PR', bg: '#F5A623' },
                { initials: 'MR', bg: '#22B8A6' },
              ].map((u, i) => (
                <span
                  key={u.initials}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold ${i > 0 ? '-ml-2' : ''}`}
                  style={{ background: u.bg }}
                >
                  {u.initials}
                </span>
              ))}
            </div>
            <span className="text-[#67637E] text-sm">
              <b className="text-[#1B1730]">+1,200 negocios</b> ya operan con POWIP · 1.2M+ pedidos
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <Printer className="w-3.5 h-3.5 text-[#1E8C86]" aria-hidden="true" /> Etiquetas listas para imprimir
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <Package className="w-3.5 h-3.5 text-[#4F3A96]" aria-hidden="true" /> Integrado con Shalom y Olva
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" aria-hidden="true" /> Despacho en 1 clic
            </span>
          </div>
        </div>

        {/* Video del flujo completo dentro de un marco de navegador */}
        <div className="relative">
          <div className="rounded-3xl shadow-[0_30px_80px_rgba(78,55,168,0.28)] bg-white overflow-hidden border border-gray-100">
            <div className="bg-[#f3f2f8] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-gray-100" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 bg-white rounded-md px-3 py-1 text-[11px] text-gray-400 flex-1">powip.lat/operaciones</span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 bg-[#1B1730]/85 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#22B8A6] animate-landing-pulse" aria-hidden="true" />
                Así funciona POWIP
              </span>
              <video
                src="/landing/video/powip-flujo-completo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Video: flujo de POWIP desde la venta hasta la etiqueta impresa"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
