import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wallet, Package, Zap, TrendingUp, Truck } from 'lucide-react';

const SIDEBAR_ITEMS = ['Dashboard', 'Comercial', 'Operaciones', 'Finanzas', 'Couriers', 'Reportes'];

const ORDERS = [
  { id: 'ORD-3938', client: 'Richard Ccama', place: 'San Borja', zone: 'Lima Sur', zoneColor: '#7C3AED', zoneBg: '#F3ECFD', total: 'S/ 115', saldo: 'Saldo S/ 103' },
  { id: 'ORD-3919', client: 'Blanca Osorio', place: 'Lima', zone: 'Lima Centro', zoneColor: '#16A34A', zoneBg: '#E7F7EC', total: 'S/ 99', saldo: null },
  { id: 'ORD-3375', client: 'Maribel Sánchez', place: 'Trujillo', zone: 'Provincias', zoneColor: '#6B6880', zoneBg: '#F1F0F4', total: 'S/ 199', saldo: null },
  { id: 'ORD-3363', client: 'Lorena Ramos', place: 'Los Olivos', zone: 'Lima Norte', zoneColor: '#2563EB', zoneBg: '#E7F0FD', total: 'S/ 115', saldo: 'Saldo S/ 85' },
];

export default function HeroSection() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#F4F1FD] pt-10 pb-16 px-6 md:px-20">
      <div className="pointer-events-none absolute -top-28 -right-16 w-[420px] h-[420px] rounded-full bg-[#B9A7FF] opacity-40 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[360px] h-[360px] rounded-full bg-[#9EE8DC] opacity-40 blur-[80px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            La plataforma para tu ecommerce contraentrega
          </span>

          <h1 className="mt-4 text-[#4F3A96] font-bold text-4xl md:text-[58px] leading-[1.08] tracking-tight">
            Tus canales de venta y tus couriers,{' '}
            <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">en un solo lugar</span>.
          </h1>

          <p className="mt-5 text-[#4a4664] text-base md:text-lg max-w-xl leading-relaxed">
            POWIP centraliza tus pedidos de WhatsApp, Instagram, TikTok y marketplaces, y los conecta con tus
            couriers para <b>despachar en 1 clic</b>. Cobranza contraentrega, facturación y tu{' '}
            <b>rentabilidad real</b> — todo tu ecommerce a la mano, sin Excel.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/crear-cuenta"
              className="inline-flex items-center gap-2 bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_12px_28px_rgba(79,58,150,0.36)]"
            >
              Crea tu cuenta <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 text-[#4F3A96] font-bold text-base px-8 py-4 rounded-2xl hover:bg-white transition-colors"
            >
              Agenda una demostración
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 text-[#1E8C86]" aria-hidden="true" /> Rentabilidad real
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" aria-hidden="true" /> Despacho en 1 clic
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12.5px] font-bold text-[#1B1730] shadow-sm">
              <Truck className="w-3.5 h-3.5 text-[#4F3A96]" aria-hidden="true" /> Integrado con Shalom (~70% del mercado)
            </span>
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
              <b className="text-[#1B1730]">+1,200 negocios ecommerce</b> ya operan con POWIP
            </span>
          </div>
        </div>

        {/* Right column: panel de operaciones de POWIP (decorativo, sin datos reales) */}
        <div className="relative" aria-hidden="true">
          <div className="hidden lg:flex absolute -top-6 -left-6 z-10 items-center gap-2.5 bg-white rounded-2xl shadow-xl px-4 py-3 font-bold">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22B8A6] to-[#1E8C86] flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </span>
            <span>
              <small className="block text-[11px] text-[#67637E] font-medium">Por cobrar (COD) hoy</small>
              <span className="text-[15px]">S/ 12,140</span>
            </span>
          </div>
          <div className="hidden lg:flex absolute -bottom-6 -right-6 z-10 items-center gap-2.5 bg-white rounded-2xl shadow-xl px-4 py-3 font-bold">
            <span className="w-9 h-9 rounded-xl bg-[#4F3A96] flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </span>
            <span>
              <small className="block text-[11px] text-[#67637E] font-medium">Entregados hoy</small>
              <span className="text-[15px]">434 pedidos</span>
            </span>
          </div>

          <div className="rounded-3xl shadow-[0_30px_80px_rgba(78,55,168,0.28)] -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
              <div className="bg-[#f3f2f8] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 bg-white rounded-md px-3 py-1 text-[11px] text-gray-400 flex-1">powip.lat/operaciones</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
                <div className="hidden sm:block bg-[#faf9fe] border-r border-gray-100 p-2.5 text-[11px]">
                  {SIDEBAR_ITEMS.map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg font-medium ${item === 'Operaciones' ? 'bg-[#e6f4f2] text-[#1E8C86]' : 'text-[#66647d]'}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded ${item === 'Operaciones' ? 'bg-[#1E8C86]' : 'bg-[#d9d5ee]'}`} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="p-3.5 bg-[#fbfbfd]">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <div>
                      <h4 className="text-[13px] font-bold text-[#1B1730]">Pedidos de hoy · Lun 24-Ago</h4>
                      <p className="text-[9.5px] text-[#67637E]">7 listos · S/ 367 por cobrar</p>
                    </div>
                    <span className="bg-[#1E8C86] text-white text-[9.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap">📦 Generar guía</span>
                  </div>
                  <div className="flex gap-1 mb-2.5 flex-wrap">
                    <span className="text-[9.5px] px-2.5 py-1 rounded-full bg-[#efeafd] text-[#4F3A96] border border-[#cabffb] font-semibold">Todos (7)</span>
                    <span className="text-[9.5px] px-2.5 py-1 rounded-full bg-[#f2f0f8] text-[#66647d] font-semibold">Preparado (7)</span>
                    <span className="text-[9.5px] px-2.5 py-1 rounded-full bg-[#f2f0f8] text-[#66647d] font-semibold">En envío</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[9.5px]">
                      <thead>
                        <tr>
                          {['Orden', 'Cliente', 'Zona', 'Total', 'Estado'].map((h) => (
                            <th key={h} className="text-left text-[#9895ad] font-semibold py-1.5 px-1 border-b border-gray-100">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map((o) => (
                          <tr key={o.id}>
                            <td className="py-2 px-1 border-b border-gray-50 font-bold text-[#2a2740] whitespace-nowrap">{o.id}</td>
                            <td className="py-2 px-1 border-b border-gray-50 text-[#3a3852] whitespace-nowrap">{o.client}<br /><small className="text-[#9895ad] font-medium">{o.place}</small></td>
                            <td className="py-2 px-1 border-b border-gray-50">
                              <span className="inline-flex items-center gap-1 text-[8.5px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap" style={{ background: o.zoneBg, color: o.zoneColor }}>
                                <i className="w-1.5 h-1.5 rounded-sm inline-block" style={{ background: o.zoneColor }} />{o.zone}
                              </span>
                            </td>
                            <td className="py-2 px-1 border-b border-gray-50 font-bold text-[#2a2740] whitespace-nowrap">{o.total}{o.saldo && <span className="block text-[#EF4444] font-bold text-[8.5px]">{o.saldo}</span>}</td>
                            <td className="py-2 px-1 border-b border-gray-50">
                              <span className="text-[9px] font-bold text-[#4F3A96] bg-[#eae7f8] px-2 py-0.5 rounded-lg whitespace-nowrap">Preparado</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex justify-between flex-wrap gap-1 text-[9px] text-[#67637E]">
                    <span><b className="text-[#1E8C86]">7 listos</b> · S/ 367 por cobrar</span>
                    <span>Se armarán <b className="text-[#1E8C86]">3 guías</b> por courier/zona</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
