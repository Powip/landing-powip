import React from 'react';
import { Check, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

function FeatureRow({
  kicker,
  title,
  desc,
  items,
  visual,
  reverse,
}: {
  kicker: string;
  title: React.ReactNode;
  desc: string;
  items: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          {kicker}
        </span>
        <h3 className="mt-4 text-[#1B1730] font-bold text-2xl md:text-[34px] leading-tight tracking-tight">{title}</h3>
        <p className="mt-3.5 text-gray-500 text-[15.5px] md:text-base leading-relaxed">{desc}</p>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[15px] font-medium text-[#3a3852]">
              <span className="w-6 h-6 rounded-lg bg-[#EAF8F5] text-[#1E8C86] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </span>
              {it}
            </li>
          ))}
        </ul>
      </div>
      <div>{visual}</div>
    </div>
  );
}

function DemoCard({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-[0_18px_50px_rgba(46,33,104,0.1)] ${
        dark ? 'bg-[#161226] text-white border-transparent' : 'bg-white border-gray-100'
      }`}
    >
      {children}
    </div>
  );
}

export default function LandingFeatureRows() {
  return (
    <section id="producto" className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          La solución
        </span>
        <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
          Tu ecommerce entero, <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">en una sola pantalla</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto">
          POWIP conecta tus canales de venta, tu logística de última milla y tu cobranza contraentrega — para que
          tomes decisiones con data real, no con intuición.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-20 md:gap-24">
        <ScrollReveal>
          <FeatureRow
            kicker="Pedidos multicanal"
            title="De todos tus canales, a un solo lugar."
            desc="WhatsApp, Instagram, TikTok, tu web y marketplaces. Los pedidos entran solos a POWIP, sin copiar y pegar, listos para procesar."
            items={[
              'Sincronización automática desde cada canal',
              'Un solo tablero para confirmar, preparar y despachar',
              'Adiós al Excel y a los pedidos duplicados',
            ]}
            visual={
              <DemoCard>
                <div className="font-bold mb-3.5 text-[15px] text-[#1B1730]">Entran de todos lados →</div>
                <div className="flex flex-wrap gap-2">
                  {['WhatsApp', 'Instagram', 'TikTok', 'Shopify', 'Mercado Libre', 'Tu web'].map((c) => (
                    <span key={c} className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="text-center my-4 text-[#1E8C86] font-bold text-xl" aria-hidden="true">↓</div>
                <div className="bg-[#4F3A96] text-white rounded-xl py-4 text-center font-bold">
                  POWIP · 1 tablero de pedidos
                </div>
              </DemoCard>
            }
          />
        </ScrollReveal>

        <ScrollReveal>
          <FeatureRow
            reverse
            kicker="Despacho en 1 clic"
            title="Un clic. Y el pedido sale."
            desc="POWIP agrupa tus pedidos por zona y courier, genera la guía y el rótulo, y sincroniza el estado del envío — en segundos, sin entrar a la web del courier."
            items={[
              '5 couriers integrados en tiempo real',
              'Guía y rótulo generados automáticamente',
              'Tracking y estado sincronizados solos',
            ]}
            visual={
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_18px_50px_rgba(46,33,104,0.1)]">
                <img
                  src="/features-image.png"
                  alt="Panel de operaciones de POWIP con la lista de pedidos entregados, cada uno con su guía de courier y su estado de cobro"
                  className="w-full h-auto bg-[#fbfbfd]"
                />
                <div className="flex flex-wrap gap-2 p-4 bg-white">
                  {['Shalom', 'Eva Courier', 'Olva', 'Pedidos Ya', 'Urbano'].map((c) => (
                    <span key={c} className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 text-[13px] font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        </ScrollReveal>

        <ScrollReveal>
          <FeatureRow
            kicker="Cobranza contraentrega"
            title="Varios Yape. Una sola bandeja."
            desc="Controla cuánto cobraste y cuánto está en la calle. Adelantos, pago final, rendición de motorizados y liquidaciones — todo cuadrado, al día."
            items={[
              'Consolida Yape, Plin, transferencia y efectivo',
              'Rendición y liquidación por motorizado',
              'Tasa de cobro en vivo, sin sorpresas',
            ]}
            visual={
              <DemoCard>
                <div className="font-bold mb-3.5 text-[15px] text-[#1B1730]">Cobros del día</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { who: 'Diego Núñez', sub: 'Motorizado · Lima Sur', amt: 'S/ 540', bg: '#742284', tag: 'Yape' },
                    { who: 'César Quispe', sub: 'Motorizado · Lima Norte', amt: 'S/ 380', bg: '#00bcd4', tag: 'Plin' },
                    { who: 'Caja oficina', sub: 'Recojo en tienda', amt: 'S/ 350', bg: '#16a34a', tag: 'Ef.' },
                  ].map((c) => (
                    <div key={c.who} className="flex items-center gap-3 bg-[#FAFAFA] rounded-xl px-3.5 py-3">
                      <span
                        className="w-9 h-9 rounded-lg text-white font-extrabold text-[11px] flex items-center justify-center shrink-0"
                        style={{ background: c.bg }}
                        aria-hidden="true"
                      >
                        {c.tag}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-[14px] text-[#1B1730] truncate">{c.who}</span>
                        <small className="text-[11px] text-gray-500">{c.sub}</small>
                      </span>
                      <span className="font-extrabold text-[#0d9c78]">{c.amt}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3.5 bg-[#EAF8F5] rounded-xl px-4 py-3.5 font-extrabold">
                  <span>Total cobrado hoy</span>
                  <span className="text-[#1E8C86] text-xl">S/ 1,270</span>
                </div>
              </DemoCard>
            }
          />
        </ScrollReveal>

        <ScrollReveal>
          <FeatureRow
            reverse
            kicker="Tu diferencial"
            title={
              <>
                Por fin sabes <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">cuánto ganas de verdad</span>.
              </>
            }
            desc="POWIP calcula tu rentabilidad real con el precio neto —no el PVP—: descuenta producto, envío, publicidad, comisiones y rechazos. El módulo administrativo te muestra la utilidad de cada venta, canal y producto."
            items={[
              'Utilidad real por pedido, canal y producto',
              'Costo real por venta (no el del ads manager)',
              'Finanzas, gastos y márgenes en un solo lugar',
            ]}
            visual={
              <DemoCard dark>
                <div className="font-bold mb-4 text-[15px]">Rentabilidad · Venta ORD-3938</div>
                <div className="flex flex-col">
                  {[
                    { l: 'Venta (precio neto)', v: '+ S/ 115.00', pos: true },
                    { l: 'Costo de producto', v: '− S/ 42.00' },
                    { l: 'Envío / courier', v: '− S/ 12.00' },
                    { l: 'Publicidad (CPA real)', v: '− S/ 28.00' },
                  ].map((r) => (
                    <div key={r.l} className="flex justify-between py-2.5 border-b border-dashed border-white/15 text-[14px]">
                      <span>{r.l}</span>
                      <span className={r.pos ? 'text-[#8ff0d0] font-bold' : 'text-[#ff9a9a] font-bold'}>{r.v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3.5 font-extrabold text-[17px]">
                    <span>Utilidad real</span>
                    <span className="text-[#8ff0d0]">S/ 33.00 · 29%</span>
                  </div>
                </div>
              </DemoCard>
            }
          />
        </ScrollReveal>

        <ScrollReveal>
          <FeatureRow
            kicker="Reportes & SUNAT"
            title="Dónde funciona. Dónde no."
            desc="Tasa de entrega por departamento, comparativa contraentrega vs agencia, y tus mejores productos. Además, emite boletas y facturas electrónicas SUNAT sin salir de la plataforma."
            items={[
              'Analytics por zona, courier, vendedor y producto',
              'Facturación electrónica SUNAT automática',
              'Reportes exportables cuando quieras',
            ]}
            visual={
              <DemoCard>
                <div className="font-bold mb-4 text-[15px] text-[#1B1730]">Tasa de entrega por zona</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { l: 'Lima', p: 88 },
                    { l: 'Arequipa', p: 72 },
                    { l: 'Cusco', p: 66 },
                    { l: 'Trujillo', p: 64 },
                    { l: 'Chiclayo', p: 48 },
                  ].map((b) => (
                    <div key={b.l} className="flex items-center gap-2.5 text-[13px] font-semibold">
                      <span className="w-[70px] text-gray-500 shrink-0">{b.l}</span>
                      <span
                        className="flex-1 h-2.5 rounded-md bg-[#F6F5FC] overflow-hidden"
                        role="img"
                        aria-label={`${b.l}: ${b.p}% de entregas exitosas`}
                      >
                        <span
                          className="block h-full rounded-md bg-gradient-to-r from-[#22B8A6] to-[#1E8C86]"
                          style={{ width: `${b.p}%` }}
                        />
                      </span>
                      <span className="w-9 text-right text-[#1B1730]">{b.p}%</span>
                    </div>
                  ))}
                </div>
              </DemoCard>
            }
          />
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto mt-14 flex justify-center">
        <span className="inline-flex items-center gap-2 bg-[#4F3A96] text-white font-bold text-[15px] px-6 py-3.5 rounded-2xl shadow-[0_8px_22px_rgba(78,55,168,0.3)]">
          <Zap className="w-4 h-4" aria-hidden="true" /> Despacha en 1 clic
        </span>
      </div>
    </section>
  );
}
