import React from 'react';

const CHANGES = [
  { icon: '🖨️', before: 'Dirección a plumón, a mano', after: 'Etiqueta impresa en 1 clic' },
  { icon: '📦', before: 'Guías copiadas en Excel', after: 'Shalom y Olva en 1 clic' },
  { icon: '🗂️', before: 'Pedidos perdidos en el chat', after: 'Todo en un solo tablero' },
];

/** Sección "El cambio": antes y después del despacho con POWIP. */
export default function LandingChange() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            El cambio
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Del <span className="line-through decoration-[#E8A0A0] decoration-4 text-[#9a96b0]">plumón</span> a la{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">etiqueta impresa</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            Menos pasos, cero plumón. Así cambia tu despacho desde el día uno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHANGES.map((c, i) => (
            <div
              key={c.after}
              className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl px-7 pt-10 pb-9 text-center shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(260px_130px_at_50%_-20%,#E0F7FA,transparent)]"
                aria-hidden="true"
              />
              <span
                className="absolute top-3 right-4 w-2.5 h-2.5 rounded-full bg-[#22B8A6] animate-landing-pulse"
                style={{ animationDelay: `${i * 0.6}s` }}
                aria-hidden="true"
              />
              <div
                className="relative w-[78px] h-[78px] mx-auto mb-5 rounded-[22px] bg-[#E0F7FA] flex items-center justify-center text-4xl animate-landing-float"
                style={{ animationDelay: `${i * 0.5}s` }}
                aria-hidden="true"
              >
                {c.icon}
              </div>
              <p className="relative text-[14.5px] text-[#9a96b0] font-medium">
                <s className="decoration-[#E8A0A0]">{c.before}</s>
              </p>
              <p className="relative mt-2 text-xl font-bold text-[#1B1730] leading-tight">{c.after}</p>
              <span className="relative block w-9 h-[3px] rounded bg-[#1E8C86] mx-auto mt-4" aria-hidden="true" />
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-lg md:text-xl text-[#4a4664] font-semibold">
          De escribir bolsas a mano{' '}
          <span className="text-[#1E8C86] font-extrabold animate-landing-slide-x" aria-hidden="true">
            →
          </span>{' '}
          a <b className="text-[#1B1730]">despachar en minutos.</b>
        </p>
      </div>
    </section>
  );
}
