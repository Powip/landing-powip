import React from 'react';
import { TESTIMONIALS } from '@/components/TestimonialsSection';
import LandingProofVideo from '@/components/landing/LandingProofVideo';

/**
 * Sección "Prueba real": video de testimonio + testimonios de clientes.
 * Los testimonios escritos son los reales de la landing (TestimonialsSection).
 *
 * PENDIENTE: el video usa por ahora el de YouTube que ya tenía la landing.
 * Se reemplazará por el testimonio en video de la clienta.
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
          <LandingProofVideo />

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
