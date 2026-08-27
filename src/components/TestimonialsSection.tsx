import React from 'react';

const TESTIMONIALS = [
  {
    quote:
      'Antes de Powip teníamos pedidos por WhatsApp, Instagram y Shopify, y todo se anotaba en Excel. Era un caos y siempre se escapaban pedidos o se duplicaban. Con Powip ahora todo entra a un solo lugar y nuestro equipo puede procesar los pedidos mucho más rápido.',
    name: 'Pablo Almeida',
    role: 'Importaciones Desiree',
    img: '/testimonial-1.jpeg',
  },
  {
    quote:
      'Nos costaba muchísimo controlar los pedidos contraentrega. No sabíamos qué pedidos se habían entregado, cuáles estaban en ruta o cuánto dinero debía regresar el courier. Con Powip ahora tenemos visibilidad total desde un solo panel.',
    name: 'Elias Peralta',
    role: 'LIVII',
    img: '/testimonial-2.jpeg',
  },
  {
    quote:
      'Cuando empezamos a crecer perdimos control de todo: pedidos, inventario, entregas. Powip nos ayudó a ordenar la operación y eso nos permitió escalar sin que el equipo colapse.',
    name: 'Paola Reynaga',
    role: 'KUNCA',
    img: '/testimonial-3.jpeg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Historias reales
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Negocios que dejaron el Excel
          </h2>
        </div>

        <div
          role="region"
          aria-label="Testimonios de clientes, desliza para ver más"
          tabIndex={0}
          className="flex md:grid md:grid-cols-3 gap-6 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:pb-0 mask-[linear-gradient(90deg,#000_92%,transparent)] md:mask-none"
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="shrink-0 w-[82%] sm:w-[70%] md:w-auto snap-center bg-white rounded-2xl p-6 md:p-7 border border-gray-100 shadow-[0_4px_18px_rgba(46,33,104,0.08)] flex flex-col justify-between gap-6 m-0"
            >
              <blockquote className="text-[#333333] text-sm leading-relaxed m-0">&quot;{t.quote}&quot;</blockquote>
              <figcaption className="flex items-center gap-3.5">
                <img
                  src={t.img}
                  alt=""
                  aria-hidden="true"
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-100 shadow-sm"
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
    </section>
  );
}
