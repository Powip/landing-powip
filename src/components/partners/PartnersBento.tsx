import React from 'react';
import { Truck, ShoppingBag, LineChart, Wallet, FileText, Boxes, BarChart3, Zap } from 'lucide-react';

export default function PartnersBento() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Todo incluido
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Una plataforma que hace{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">todo tu trabajo operativo</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            De la venta a la entrega — y también tus finanzas. Sin apps sueltas.
          </p>
        </div>

        <div
          role="region"
          aria-label="Capacidades de la plataforma, desliza para ver más"
          tabIndex={0}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:grid-flow-dense overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-2 md:mx-0 md:px-0 md:pb-0 mask-[linear-gradient(90deg,#000_92%,transparent)] md:mask-none"
        >
          {/* big */}
          <div className="shrink-0 w-[80%] sm:w-[62%] md:w-auto snap-center lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-white to-[#F1EEFC] border border-[#e3ddf7] rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E8C86] bg-[#EAF8F5] border border-[#CFF3EC] px-2.5 py-1 rounded-full mb-4">
              <i className="w-2 h-2 rounded-full bg-[#22D3A6] inline-block animate-pulse" />
              Sincronización en tiempo real
            </span>
            <div className="w-14 h-14 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-3.5">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1730] mb-2 tracking-tight">+5 couriers integrados en tiempo real</h3>
            <p className="text-sm text-gray-500">
              Genera la guía, agrupa por zona y despacha sin salir de POWIP. El estado del envío y la cobranza contraentrega se actualizan solos.
            </p>
            <div className="flex flex-wrap gap-2 my-4">
              {['Shalom', 'Eva Courier', 'Olva', 'Pedidos Ya', 'Urbano'].map((c) => (
                <span key={c} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-semibold shadow-sm">{c}</span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 bg-[#4F3A96] text-white font-bold text-sm px-5 py-3 rounded-xl shadow">
              <Zap className="w-4 h-4" /> Despacha en 1 clic
            </span>
          </div>

          {/* wide */}
          <div className="shrink-0 w-[80%] sm:w-[62%] md:w-auto snap-center lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-3.5">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1B1730] mb-2 tracking-tight">Conecta todos tus canales de venta</h3>
            <p className="text-sm text-gray-500 mb-3">
              Shopify, Mercado Libre y otros marketplaces, más WhatsApp, Instagram, TikTok y tu web. Todos tus pedidos entran solos a un mismo lugar.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Shopify', 'Mercado Libre', 'WhatsApp', 'Instagram', 'TikTok', 'Tu web'].map((c) => (
                <span key={c} className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-semibold">{c}</span>
              ))}
            </div>
          </div>

          <BentoCard icon={<LineChart className="w-6 h-6 text-white" />} title="Módulo administrativo" desc="Ve tus finanzas, ingresos, gastos y la rentabilidad real de cada venta. Deja de adivinar cuánto ganaste." />
          <BentoCard icon={<Wallet className="w-6 h-6 text-white" />} title="Cobranza contraentrega" desc="Controla el COD, liquidaciones y la rendición de tus motorizados al día." />
          <BentoCard icon={<FileText className="w-6 h-6 text-white" />} title="Facturación SUNAT" desc="Emite boletas y facturas electrónicas y envíalas a tu cliente automáticamente." />
          <BentoCard icon={<Boxes className="w-6 h-6 text-white" />} title="Inventario y CRM" desc="Stock en tiempo real y atención al cliente 360° en la misma plataforma." />

          <div className="shrink-0 w-[80%] sm:w-[62%] md:w-auto snap-center lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-3.5">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#1B1730] mb-2 tracking-tight">Reportes en tiempo real… y mucho más</h3>
            <p className="text-sm text-gray-500">
              Métricas de ventas, entregas y cobranza al instante — y POWIP suma módulos nuevos cada mes para que crezcas sin límites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="shrink-0 w-[80%] sm:w-[62%] md:w-auto snap-center bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-3.5">{icon}</div>
      <h3 className="text-lg font-bold text-[#1B1730] mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}
