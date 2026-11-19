import React from 'react';

const ITEMS = [
  { icon: '📦', title: 'Inventario multi-almacén', text: 'Controla tu stock en cada almacén o tienda.' },
  { icon: '🏷️', title: 'Stock en vivo', text: 'Cada venta descuenta tu inventario al instante.' },
  { icon: '👥', title: 'Usuarios y roles', text: 'Permisos por persona: quién ve y hace qué.' },
  { icon: '📊', title: 'Reportes y caja', text: 'Ventas, cobranza y ganancia del negocio, claros.' },
  { icon: '🏪', title: 'Varias tiendas', text: 'Maneja todas tus marcas desde una sola cuenta.' },
  { icon: '🧾', title: 'Facturación SUNAT', text: 'Boletas y facturas electrónicas automáticas.' },
];

/** Sección "Y además": inventario y administración. */
export default function LandingMore() {
  return (
    <section id="mas" className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Y además
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Controla <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">toda tu operación</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            No solo vendes y despachas. También manejas tu almacén y tu administración.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="flex gap-4 items-start bg-white border border-gray-100 rounded-2xl px-6 py-6 shadow-[0_4px_18px_rgba(46,33,104,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div
                className="w-12 h-12 shrink-0 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[22px]"
                aria-hidden="true"
              >
                {it.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1B1730]">{it.title}</h3>
                <p className="mt-1 text-[13.5px] text-gray-500 leading-snug">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
