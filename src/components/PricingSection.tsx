'use client';
import React, { useEffect, useState } from 'react';
import type { BackendAddOn, BackendPlan } from '@/types/onboarding';

interface PlanDisplayConfig {
  features: string[];
  orders: string;
  highlighted: boolean;
  oldMonthly: number;
  annualFactor: number;
}

const PLAN_DISPLAY_CONFIG: Record<string, PlanDisplayConfig> = {
  basico: {
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify'],
    orders: 'Hasta 999',
    highlighted: false,
    oldMonthly: 149,
    annualFactor: 8.07,
  },
  standard: {
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify'],
    orders: 'Hasta 1999',
    highlighted: true,
    oldMonthly: 239,
    annualFactor: 7.41,
  },
  full: {
    features: ['Accesos a todos los módulos', 'Usuarios ilimitados', 'Integración Shopify', 'Integración SUNAT'],
    orders: 'Hasta 5999',
    highlighted: false,
    oldMonthly: 299,
    annualFactor: 7.43,
  },
  enterprise: {
    features: ['Dominio Propio', 'Desarrollo custom'],
    orders: 'PERSONALIZADO',
    highlighted: false,
    oldMonthly: 0,
    annualFactor: 10,
  },
};

const DEFAULT_PLAN_CONFIG: PlanDisplayConfig = {
  features: ['Accesos a todos los módulos', 'Usuarios ilimitados'],
  orders: 'Personalizado',
  highlighted: false,
  oldMonthly: 0,
  annualFactor: 8,
};

interface AddonDisplayInfo {
  title: string;
  subtitle: string;
  desc: string;
}

const ADDON_DISPLAY: Record<string, AddonDisplayInfo> = {
  courier: {
    title: 'Integración con Couriers:  S/29.90/ mes',
    subtitle: 'Conecta Shalom y Olva Courier',
    desc: 'Genera guías, rastrea envíos y registra pagos contraentrega sin salir de la plataforma.',
  },
  sunat: {
    title: 'Integración con SUNAT S/29.90/ mes',
    subtitle: 'Emite boletas, facturas y más',
    desc: 'Genera guías, boletas, facturas y envía a tu cliente.',
  },
  marketplace: {
    title: 'Integración Marketplace S/29.90/ mes',
    subtitle: 'Conecta Falabella, Ripley y Mercado Libre',
    desc: 'Gestiona pedidos de todos los marketplaces en un solo panel.',
  },
};

function PlanCardSkeleton({ highlighted }: { highlighted?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col justify-between gap-8 w-full flex-1 min-w-[250px] border-2 ${
        highlighted
          ? 'bg-[#4F3A96] max-w-[290px] md:scale-105 z-10 border-[#6B52C4]'
          : 'bg-[#006B82] max-w-[260px] border-[#006B82]'
      }`}
    >
      <div className="flex flex-col gap-6 w-full items-center text-center">
        <div className="h-8 w-24 bg-white/20 animate-pulse rounded-lg" />
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="h-5 w-20 bg-white/20 animate-pulse rounded" />
          <div className="h-14 w-28 bg-white/20 animate-pulse rounded-xl" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-3 w-full bg-white/20 animate-pulse rounded" />
          <div className="h-3 w-5/6 bg-white/20 animate-pulse rounded mx-auto" />
          <div className="h-3 w-4/6 bg-white/20 animate-pulse rounded mx-auto" />
        </div>
        <div className="h-6 w-24 bg-white/20 animate-pulse rounded" />
      </div>
      <div className="h-12 w-full bg-white/20 animate-pulse rounded-lg" />
    </div>
  );
}

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<BackendPlan[]>([]);
  const [addOns, setAddOns] = useState<BackendAddOn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const goToOnboarding = (planId: string, planName: string, price: number) => {
    const base = process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'https://www.powip.tech';
    const params = new URLSearchParams({
      planId,
      planName,
      price: String(price),
      isAnnual: String(isAnnual),
    });
    window.location.href = `${base}/onboarding?${params.toString()}`;
  };

  useEffect(() => {
    Promise.all([
      fetch('/api/plans').then((r) => r.json()),
      fetch('/api/add-ons').then((r) => r.json()),
    ])
      .then(([plansData, addOnsData]: [unknown, unknown]) => {
        setPlans(Array.isArray(plansData) ? (plansData as BackendPlan[]) : []);
        setAddOns(Array.isArray(addOnsData) ? (addOnsData as BackendAddOn[]) : []);
      })
      .catch(() => {
        // silencioso — fallback visual no necesario
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const activeAddOns = addOns.filter((a) => a.status === 'ACTIVE');

  return (
    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-16 bg-white" id="precios">
      <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
        Planes que crecen contigo
      </h2>

      {/* Toggle */}
      <div className="flex items-center rounded-full overflow-hidden bg-[#E0F2F4] p-1 shadow-inner">
        <button
          onClick={() => setIsAnnual(false)}
          className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
            !isAnnual ? 'bg-[#006B82] text-white shadow-md' : 'bg-transparent text-[#006B82]'
          }`}
        >
          MENSUAL
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
            isAnnual ? 'bg-[#006B82] text-white shadow-md' : 'bg-transparent text-[#006B82]'
          }`}
        >
          ANUAL 30%
        </button>
      </div>

      {/* Plans Row */}
      <div className="flex flex-wrap items-stretch justify-center gap-6 w-full max-w-7xl">
        {isLoading ? (
          <>
            <PlanCardSkeleton />
            <PlanCardSkeleton highlighted />
            <PlanCardSkeleton />
            <PlanCardSkeleton />
          </>
        ) : (
          plans.map((plan) => {
            const config = PLAN_DISPLAY_CONFIG[plan.name.toLowerCase()] ?? DEFAULT_PLAN_CONFIG;
            const isHighlighted = config.highlighted;
            const price = isAnnual ? Math.round(plan.amount * config.annualFactor) : plan.amount;
            const oldPrice = isAnnual ? 0 : config.oldMonthly;
            const isEnterprise = plan.name.toLowerCase() === 'enterprise';

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 flex flex-col justify-between gap-8 w-full flex-1 min-w-[250px] transition-all duration-300 ease-out border-2 relative cursor-pointer ${
                  isHighlighted
                    ? 'bg-[#4F3A96] max-w-[290px] shadow-[0_12px_40px_rgba(79,58,150,0.3)] md:scale-105 z-10 border-[#6B52C4] hover:scale-110 hover:shadow-[0_20px_50px_rgba(79,58,150,0.4)]'
                    : 'bg-[#006B82] max-w-[260px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-[#006B82] hover:scale-105 hover:z-10 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,107,130,0.25)]'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D1B2] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap z-20">
                    Más popular
                  </div>
                )}

                <div className="flex flex-col gap-6 w-full items-center text-center">
                  <h3 className="font-bold text-2xl text-white">
                    {plan.name.toUpperCase()}
                  </h3>

                  <div className="flex flex-col items-center gap-1">
                    {/* Old Price (strikethrough) — only monthly mode and non-enterprise */}
                    <div className="h-6 flex items-center">
                      {!isAnnual && oldPrice > 0 && (
                        <span className="font-bold text-lg line-through transition-all duration-500 text-white/70 decoration-white/70 decoration-2">
                          S/ {oldPrice}.00
                        </span>
                      )}
                      {isEnterprise && (
                        <span className="text-white/80 font-bold text-sm">Desde S./499.00</span>
                      )}
                    </div>

                    {/* Current Price */}
                    {config.orders === 'PERSONALIZADO' ? (
                      <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-lg">PERSONALIZADO</span>
                      </div>
                    ) : (
                      <div className="flex items-end gap-1 transition-all duration-500">
                        <span className={`font-bold mb-1 text-white ${isHighlighted ? 'text-4xl' : 'text-3xl'}`}>
                          S/.
                        </span>
                        <span
                          key={`${plan.id}-${price}`}
                          className={`font-bold leading-none animate-price-pop text-white ${
                            isHighlighted ? 'text-6xl' : 'text-5xl'
                          }`}
                        >
                          {price}
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2 w-full text-center">
                    {config.features.map((feat, i) => (
                      <li
                        key={i}
                        className={`text-xs text-white/90 ${feat.includes('SUNAT') ? 'font-semibold' : ''}`}
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col items-center mt-2">
                    <span className={`text-white font-medium ${isHighlighted ? 'text-xl' : 'text-lg'}`}>
                      {config.orders}
                    </span>
                    {config.orders !== 'PERSONALIZADO' && (
                      <span className={`text-white/80 ${isHighlighted ? 'text-lg' : 'text-base'}`}>
                        Pedidos / mes
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => goToOnboarding(plan.id, plan.name, price)}
                  className={`w-full font-bold py-3 rounded-lg text-center inline-block transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-white hover:bg-gray-100 text-[#4F3A96] text-lg py-4 mt-2'
                      : 'bg-white hover:bg-gray-50 text-[#006B82] text-base'
                  }`}
                >
                  {isEnterprise ? 'Solicitar ahora' : 'Comprar ahora'}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ADD-ONS SECTION */}
      <div className="w-full max-w-7xl flex flex-col gap-8 mt-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-[#4F3A96] font-bold text-2xl md:text-3xl">&quot;Add-ons disponibles&quot;</h3>
          <div className="w-full h-px bg-gray-200" />
        </div>

        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          {isLoading ? (
            <>
              <div className="bg-[#E0F2F4] rounded-2xl p-6 md:p-8 w-full md:max-w-[500px] h-40 animate-pulse" />
              <div className="bg-[#E0F2F4] rounded-2xl p-6 md:p-8 w-full md:max-w-[500px] h-40 animate-pulse" />
            </>
          ) : (
            activeAddOns.map((addon) => {
              const display = ADDON_DISPLAY[addon.name.toLowerCase()];
              if (!display) return null;

              return (
                <div
                  key={addon.id}
                  className="bg-[#E0F2F4] rounded-2xl p-6 md:p-8 flex flex-col gap-4 w-full md:max-w-[500px] relative shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[#006B82] font-bold text-xl md:text-2xl leading-tight">
                        {display.title}
                      </h4>
                      <p className="text-[#4F3A96] font-bold text-base md:text-lg">
                        {display.subtitle}
                      </p>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-2 max-w-[80%] md:max-w-[70%]">
                        {display.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const firstPlan = plans[0];
                        if (!firstPlan) return;
                        const cfg = PLAN_DISPLAY_CONFIG[firstPlan.name.toLowerCase()];
                        const p = isAnnual ? Math.round(firstPlan.amount * (cfg?.annualFactor ?? 8)) : firstPlan.amount;
                        goToOnboarding(firstPlan.id, firstPlan.name, p);
                      }}
                      className="bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm md:text-base absolute bottom-6 right-6 md:bottom-8 md:right-8"
                    >
                      Activar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </section>
  );
}
