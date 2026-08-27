import React from 'react';
import { Boxes, Users } from 'lucide-react';

function BentoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-[#4F3A96] flex items-center justify-center mb-3.5" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1B1730] mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export default function LandingBento() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Y también incluye
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Más allá de ventas y <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">despachos</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-4">
            Inventario y atención al cliente, en la misma plataforma que ya usas para vender y despachar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <BentoCard
            icon={<Boxes className="w-6 h-6 text-white" />}
            title="Inventario multi-almacén"
            desc="Stock en tiempo real por sede, con control estricto, sincronizado con cada venta y despacho."
          />
          <BentoCard
            icon={<Users className="w-6 h-6 text-white" />}
            title="CRM, roles y reportes"
            desc="Atención al cliente 360°, permisos por rol y métricas en vivo. POWIP suma módulos nuevos cada mes."
          />
        </div>
      </div>
    </section>
  );
}
