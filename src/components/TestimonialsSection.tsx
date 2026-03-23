import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-12 bg-white">
      <div className="w-full max-w-[1084px] flex flex-col gap-8">

        {/* Title */}
        <h2 className="text-[#4F3A96] font-bold text-3xl md:text-4xl text-center md:text-left">
          Lo que dicen los negocios que ya usan POWIP.....
        </h2>

        {/* Testimonials Grid */}
        <div className="flex flex-wrap justify-between gap-6 w-full">

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col justify-between gap-6 w-full md:max-w-[340px] flex-1 min-w-[300px]">
            <p className="text-gray-900 text-sm leading-relaxed">
              &quot;Antes de Powip teníamos pedidos por WhatsApp, Instagram y Shopify, y todo se anotaba en Excel. Era un caos y siempre se escapaban pedidos o se duplicaban. Con Powip ahora todo entra a un solo lugar y nuestro equipo puede procesar los pedidos mucho más rápido. Literalmente nos devolvió el control de la operación.&quot;
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                <img src="/testimonial-1.jpeg" alt="Pablo Almeida" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-sm">Pablo Almeida</span>
                <span className="text-gray-500 text-sm">Importaciones Desiree</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col justify-between gap-6 w-full md:max-w-[340px] flex-1 min-w-[300px]">
            <p className="text-gray-900 text-sm leading-relaxed">
              &quot;Nos costaba muchísimo controlar los pedidos contraentrega. No sabíamos qué pedidos se habían entregado, cuáles estaban en ruta o cuánto dinero debía regresar el courier. Con Powip ahora tenemos visibilidad total y podemos controlar todo desde un solo panel.&quot;
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                <img src="/testimonial-2.jpeg" alt="Elias Peralta" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-sm">Elias Peralta</span>
                <span className="text-gray-500 text-sm">LIVII</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col justify-between gap-6 w-full md:max-w-[340px] flex-1 min-w-[300px]">
            <p className="text-gray-900 text-sm leading-relaxed">
              &quot;Cuando empezamos a crecer perdimos control de todo: pedidos, inventario, entregas. Powip nos ayudó a ordenar la operación. Hoy sabemos exactamente qué pedidos están pendientes, enviados o entregados, y eso nos permitió escalar sin que el equipo colapse.&quot;
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                <img src="/testimonial-3.jpeg" alt="Paola Reynaga" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-sm">Paola Reynaga</span>
                <span className="text-gray-500 text-sm">KUNCA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
