'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'BASIC',
    monthly: 99,
    annual: 799,
    oldMonthly: null,
    oldAnnual: 1188,
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify'],
    orders: 'Hasta 999',
    highlighted: false,
  },
  {
    name: 'STANDARD',
    monthly: 189,
    annual: 1399,
    oldMonthly: null,
    oldAnnual: 2268,
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify'],
    orders: 'Hasta 1999',
    highlighted: true,
  },
  {
    name: 'PREMIUM',
    monthly: 269,
    annual: 1999,
    oldMonthly: null,
    oldAnnual: 3228,
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify', 'Integración SUNAT'],
    orders: 'Hasta 5999',
    highlighted: false,
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (

    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-16 bg-white" id="precios">
      <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
        Planes que crecen contigo
      </h2>
      {/* Toggle */}
      <div className="flex items-center rounded-full overflow-hidden bg-[#E0F2F4] p-1 shadow-inner">
        <button
          onClick={() => setIsAnnual(false)}
          className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${!isAnnual ? 'bg-[#006B82] text-white shadow-md' : 'bg-transparent text-[#006B82]'
            }`}
        >
          MENSUAL
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${isAnnual ? 'bg-[#006B82] text-white shadow-md' : 'bg-transparent text-[#006B82]'
            }`}
        >
          ANUAL 30%
        </button>
      </div>

      {/* Plans Row */}
      <div className="flex flex-wrap items-stretch justify-center gap-6 w-full max-w-7xl">

        {plans.map((plan) => {
          const price = isAnnual ? plan.annual : plan.monthly;
          const oldPrice = isAnnual ? plan.oldAnnual : plan.oldMonthly;
          const isHighlighted = plan.highlighted;

          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col justify-between gap-8 w-full flex-1 min-w-[250px] transition-all duration-500 ease-out border-2 ${isHighlighted
                ? 'bg-[#4F3A96] max-w-[290px] shadow-[0_12px_40px_rgba(79,58,150,0.3)] md:scale-105 z-10 border-[#6B52C4]'
                : 'bg-white max-w-[260px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-[#E0E7E8] hover:shadow-[0_8px_30px_rgba(0,107,130,0.12)] hover:border-[#006B82]/40'
                }`}
            >
              <div className="flex flex-col gap-6 w-full items-center text-center">
                <h3 className={`font-bold text-2xl ${isHighlighted ? 'text-white' : 'text-[#006B82]'}`}>
                  {plan.name}
                </h3>

                <div className="flex flex-col items-center gap-1">
                  {/* Old Price (strikethrough) */}
                  <div className="h-6 flex items-center">
                    {oldPrice && (
                      <span
                        className={`font-bold text-lg line-through transition-all duration-500 ${isHighlighted ? 'text-gray-300 decoration-gray-300' : 'text-[#006B82] decoration-[#006B82]'
                          } decoration-2`}
                      >
                        S/ {oldPrice}.00
                      </span>
                    )}
                  </div>

                  {/* Current Price */}
                  <div className="flex items-end gap-1 transition-all duration-500">
                    <span className={`font-bold mb-1 ${isHighlighted ? 'text-white text-4xl' : 'text-[#006B82] text-3xl'}`}>
                      S/.
                    </span>
                    <span
                      key={`${plan.name}-${price}`}
                      className={`font-bold leading-none animate-price-pop ${isHighlighted ? 'text-white text-6xl' : 'text-[#006B82] text-5xl'
                        }`}
                    >
                      {price}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 w-full text-center">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className={`text-xs ${isHighlighted ? 'text-gray-200' : 'text-[#006B82]'
                        } ${feat.includes('SUNAT') ? 'font-semibold' : ''}`}
                    >
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-center mt-2">
                  <span className={`text-base ${isHighlighted ? 'text-white text-lg' : 'text-[#006B82]'}`}>
                    {plan.orders}
                  </span>
                  <span className={`text-base ${isHighlighted ? 'text-white text-lg' : 'text-[#006B82]'}`}>
                    Pedidos / mes
                  </span>
                </div>
              </div>

              <Link
                href="https://www.powip.tech/login"
                className={`w-full font-bold py-3 rounded-lg text-center inline-block transition-all duration-300 ${isHighlighted
                  ? 'bg-white hover:bg-gray-100 text-[#4F3A96] text-lg py-4 mt-2'
                  : 'bg-[#006B82] hover:bg-[#005a6e] text-white text-base'
                  }`}
              >
                Comprar ahora
              </Link>
            </div>
          );
        })}

        {/* ENTERPRISE */}
        <div className="bg-white rounded-2xl p-8 flex flex-col justify-between gap-8 w-full max-w-[260px] flex-1 min-w-[250px] border-2 border-[#E0E7E8] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,107,130,0.12)] hover:border-[#006B82]/40 transition-all duration-500">
          <div className="flex flex-col gap-8 w-full items-center text-center">
            <h3 className="text-[#006B82] font-bold text-2xl">ENTERPRISE</h3>
            <div className="flex flex-col items-center pt-4">
              <span className="text-[#006B82] font-bold text-lg">PERSONALIZADO</span>
            </div>
            <ul className="flex flex-col gap-2 w-full text-center mt-2">
              <li className="text-[#006B82] text-xs">Dominio Propio</li>
              <li className="text-[#006B82] text-xs">Desarrollo custom</li>
            </ul>
          </div>
          <Link href="https://www.powip.tech/login" className="w-full bg-[#006B82] hover:bg-[#005a6e] transition-colors text-white font-bold text-base py-3 rounded-lg mt-auto text-center inline-block">
            Solicitar ahora
          </Link>
        </div>

      </div>
      {/* ADD-ONS SECTION */}
      <div className="w-full max-w-7xl flex flex-col gap-8 mt-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-[#4F3A96] font-bold text-2xl md:text-3xl">&quot;Add-ons disponibles&quot;</h3>
          <div className="w-full h-px bg-gray-200" />
        </div>

        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">

          {/* Card 1: Couriers */}
          <div className="bg-[#E0F2F4] rounded-2xl p-6 md:p-8 flex flex-col gap-4 w-full md:max-w-[500px] relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-[#006B82] font-bold text-xl md:text-2xl leading-tight">
                  Integración con Couriers:  S/29.90/ mes
                </h4>
                <p className="text-[#4F3A96] font-bold text-base md:text-lg">
                  Conecta Shalom y Olva Courier
                </p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-2 max-w-[80%] md:max-w-[70%]">
                  Genera guías, rastrea envíos y registra pagos contraentrega sin salir de la plataforma. Disponible para todos los planes.
                </p>
              </div>
              <Link
                href="https://www.powip.tech/login"
                className="bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm md:text-base absolute bottom-6 right-6 md:bottom-8 md:right-8"
              >
                Activar
              </Link>
            </div>
          </div>

          {/* Card 2: SUNAT */}
          <div className="bg-[#E0F2F4] rounded-2xl p-6 md:p-8 flex flex-col gap-4 w-full md:max-w-[500px] relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-[#006B82] font-bold text-xl md:text-2xl leading-tight">
                  Integración con SUNAT S/29.90/ mes
                </h4>
                <p className="text-[#4F3A96] font-bold text-base md:text-lg">
                  Emite boletas, facturas y más
                </p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-2 max-w-[80%] md:max-w-[70%]">
                  Genera guías, boletas, facturas y envía a tu cliente. Disponible para todos los planes
                </p>
              </div>
              <Link
                href="https://www.powip.tech/login"
                className="bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm md:text-base absolute bottom-6 right-6 md:bottom-8 md:right-8"
              >
                Activar
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
