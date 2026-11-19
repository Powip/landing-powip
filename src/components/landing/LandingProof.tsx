import React from 'react';
import { TESTIMONIALS } from '@/components/TestimonialsSection';

/**
 * Sección "Prueba real": video de testimonio + testimonios de clientes.
 * Los testimonios escritos son los reales de la landing (TestimonialsSection).
 *
 * PENDIENTE: el bloque de video es un marcador. Se reemplazará por el video
 * de YouTube de la clienta (iframe) con su nombre y negocio reales.
 */
export default function LandingProof() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Prueba real
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Negocios reales que ya operan con POWIP
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            No te lo decimos nosotros. Escúchalo de quien ya dejó el Excel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 items-stretch">
          {/* Marcador del video de testimonio (YouTube pendiente) */}
          <div
            className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[420px] flex items-end bg-gradient-to-br from-[#2b2142] to-[#4F3A96] shadow-[0_30px_70px_rgba(45,25,90,0.3)]"
            aria-label="Testimonio en video (próximamente)"
            role="img"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(500px_300px_at_70%_20%,rgba(124,58,237,0.5),transparent),repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_12px,transparent_12px_24px)]"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[86px] h-[86px] rounded-full bg-white/95 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
              aria-hidden="true"
            >
              <span className="ml-1.5 border-l-[26px] border-l-[#4F3A96] border-y-[16px] border-y-transparent" />
            </div>
            <div className="relative z-10 w-full px-7 py-7 text-white bg-gradient-to-t from-[#140f23]/80 to-transparent">
              <div className="text-[13px] font-bold text-[#c9b8f5] uppercase tracking-wider">▶ Testimonio en video</div>
              <b className="block text-[22px] font-extrabold mt-1.5">[Nombre de tu clienta]</b>
              <span className="text-[14.5px] text-[#d9d2ea]">[Su negocio] · usa POWIP todos los días</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-[0_4px_18px_rgba(46,33,104,0.08)] m-0"
              >
                <div className="text-[#F5B301] text-[15px] tracking-[2px]" aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote className="text-[#333333] text-sm leading-relaxed my-3">&quot;{t.quote}&quot;</blockquote>
                <figcaption className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100 shadow-sm"
                  />
                  <div>
                    <span className="block text-[#1B1730] font-bold text-sm">{t.name}</span>
                    <span className="block text-gray-500 text-[13px]">{t.role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
