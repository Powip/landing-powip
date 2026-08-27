'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { PartnerData } from '@/data/partners';

const plans = [
  {
    name: 'BASIC',
    monthly: 99,
    annual: 799,
    oldMonthly: 149,
    oldAnnual: 1188,
    features: ['Gestión de pedidos', 'Inventario básico', 'Integración con courier', 'Soporte por chat'],
    orders: 'Hasta 999',
    highlighted: false,
  },
  {
    name: 'STANDARD',
    monthly: 189,
    annual: 1399,
    oldMonthly: 239,
    oldAnnual: 2268,
    features: ['Todo lo de BASIC', 'Inventario avanzado', 'Reportes y métricas', 'Automatizaciones', 'Soporte prioritario'],
    orders: 'Hasta 1999',
    highlighted: true,
  },
  {
    name: 'FULL',
    monthly: 269,
    annual: 1999,
    oldMonthly: 299,
    oldAnnual: 3228,
    features: ['Todo lo de STANDARD', 'Múltiples almacenes', 'Liquidaciones COD', 'Usuarios y permisos', 'Soporte premium'],
    orders: 'Hasta 5999',
    highlighted: false,
  },
];

export default function PartnersPricing({ partner, signupHref }: { partner: PartnerData; signupHref: string }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const standardCardRef = useRef<HTMLDivElement>(null);

  // En el carrusel mobile, el plan que se muestra por defecto es el destacado (STANDARD).
  // Se mueve el scrollLeft del carrusel directamente (no scrollIntoView) para no
  // arrastrar también el scroll vertical de la página al cargar.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const card = standardCardRef.current;
    if (!scroller || !card) return;
    scroller.scrollLeft = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
  }, []);

  return (
    <section id="precios" className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <div className="text-center">
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            Precios
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">Elige tu plan y empieza hoy</h2>
          <p className="text-gray-500 text-base md:text-lg mt-3">Sin permanencias. Escala cuando quieras.</p>
        </div>

        <div className="w-full max-w-4xl bg-gradient-to-r from-[#22D3A6] to-[#12b98c] text-[#04352a] rounded-2xl px-5 py-4 md:px-8 text-center font-semibold text-[13.5px] md:text-base leading-relaxed shadow-[0_10px_30px_rgba(34,211,166,0.25)]">
          🎁 Por venir de <b>{partner.offerPartnerName}</b>: pagas tu 1er mes normal y tu <b>2da mensualidad al 50%</b>. Se aplica solo al crear tu cuenta desde aquí.
        </div>

        <div role="group" aria-label="Ciclo de facturación" className="inline-flex bg-[#eef0f8] rounded-full p-1 gap-1">
          <button
            onClick={() => setIsAnnual(false)}
            aria-pressed={!isAnnual}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${!isAnnual ? 'bg-[#4F3A96] text-white' : 'text-[#3a2389]'}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            aria-pressed={isAnnual}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${isAnnual ? 'bg-[#4F3A96] text-white' : 'text-[#3a2389]'}`}
          >
            Anual −30%
          </button>
        </div>

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Planes disponibles, desliza para ver más"
          tabIndex={0}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-stretch overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 pt-6 pb-8 sm:mx-0 sm:px-0 sm:pt-0 sm:pb-0 mask-[linear-gradient(90deg,#000_92%,transparent)] sm:mask-none"
        >
          {plans.map((plan) => {
            const price = isAnnual ? plan.annual : plan.monthly;
            const oldPrice = isAnnual ? plan.oldAnnual : plan.oldMonthly;
            return (
              <div
                key={plan.name}
                ref={plan.highlighted ? standardCardRef : undefined}
                className={`shrink-0 w-[78%] sm:w-auto snap-center rounded-2xl p-7 flex flex-col text-center border transition-transform hover:-translate-y-1 relative ${
                  plan.highlighted
                    ? 'bg-[#4F3A96] text-white border-transparent shadow-[0_30px_80px_rgba(78,55,168,0.35)]'
                    : 'bg-white border-gray-100 shadow-[0_4px_18px_rgba(46,33,104,0.08)]'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-[#22D3A6] text-[#04352a] font-extrabold text-xs px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ Más popular
                  </span>
                )}
                <div className={`font-extrabold text-[19px] tracking-wide ${plan.highlighted ? 'text-white' : 'text-[#3a2389]'}`}>{plan.name}</div>
                <div className={`mt-3.5 text-[15px] line-through opacity-60 ${plan.highlighted ? 'text-white' : 'text-gray-400'}`}>S/ {oldPrice}</div>
                <div className={`text-[42px] font-black leading-none tracking-tight ${plan.highlighted ? 'text-white' : 'text-[#1B1730]'}`}>
                  S/{price}
                  <small className="text-[15px] font-semibold opacity-75"> {isAnnual ? '/año' : '/mes'}</small>
                </div>
                <ul className="mt-4.5 mt-[18px] mb-4.5 mb-[18px] text-[13.5px] flex flex-col gap-2 text-left">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex gap-2 ${plan.highlighted ? 'text-white/90' : 'text-[#4a4860]'}`}>
                      <span className={plan.highlighted ? 'text-[#8ff0d0]' : 'text-[#1E8C86]'} aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={`font-extrabold text-lg ${plan.highlighted ? 'text-white' : 'text-[#3a2389]'}`}>
                  {plan.orders}
                  <small className={`block font-medium text-[12.5px] opacity-70`}>pedidos / mes</small>
                </div>
                <Link
                  href={signupHref}
                  aria-label={`Crear cuenta con el plan ${plan.name}`}
                  className={`mt-auto pt-5 w-full font-bold py-3 rounded-xl text-center ${
                    plan.highlighted ? 'bg-white text-[#4F3A96]' : 'bg-[#4F3A96] text-white'
                  }`}
                >
                  Crear cuenta
                </Link>
              </div>
            );
          })}

          <div className="shrink-0 w-[78%] sm:w-auto snap-center rounded-2xl p-7 flex flex-col text-center bg-white border border-gray-100 shadow-[0_4px_18px_rgba(46,33,104,0.08)] transition-transform hover:-translate-y-1">
            <div className="font-extrabold text-[19px] tracking-wide text-[#3a2389]">ENTERPRISE</div>
            <div className="mt-3.5 text-[26px] font-black text-[#1B1730]">Personalizado</div>
            <ul className="mt-4.5 mt-[18px] mb-4.5 mb-[18px] text-[13.5px] flex flex-col gap-2 text-left text-[#4a4860]">
              {['Dominio propio', 'Desarrollo custom', 'Infraestructura dedicada', 'SLA y soporte 24/7'].map((f) => (
                <li key={f} className="flex gap-2"><span className="text-[#1E8C86]" aria-hidden="true">✓</span>{f}</li>
              ))}
            </ul>
            <Link href={signupHref} aria-label="Solicitar el plan Enterprise" className="mt-auto w-full font-bold py-3 rounded-xl text-center bg-[#4F3A96] text-white">
              Solicitar
            </Link>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold mb-4 tracking-tight text-[#1B1730]">
            Add-ons disponibles <span className="text-[13px] text-gray-500 font-medium">— para todos los planes</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_18px_rgba(46,33,104,0.08)]">
              <div className="flex justify-between items-start gap-3">
                <h4 className="text-lg font-bold text-[#1E8C86]">Integración con Couriers</h4>
                <span className="bg-[#4F3A96] text-white font-bold text-[13px] px-3 py-1.5 rounded-xl whitespace-nowrap">S/29 /mes</span>
              </div>
              <div className="font-bold text-[#3a2389] text-[15px] mt-1">Conecta con Shalom y Eva Courier</div>
              <p className="text-sm text-[#4a4860] mt-1.5">Genera guías, rastrea envíos y registra pagos contraentrega sin salir de la plataforma.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_18px_rgba(46,33,104,0.08)]">
              <div className="flex justify-between items-start gap-3">
                <h4 className="text-lg font-bold text-[#1E8C86]">Integración con SUNAT</h4>
                <span className="bg-[#4F3A96] text-white font-bold text-[13px] px-3 py-1.5 rounded-xl whitespace-nowrap">S/29 /mes</span>
              </div>
              <div className="font-bold text-[#3a2389] text-[15px] mt-1">Emite boletas, facturas y más</div>
              <p className="text-sm text-[#4a4860] mt-1.5">Genera y envía comprobantes electrónicos a tu cliente de forma automática.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
