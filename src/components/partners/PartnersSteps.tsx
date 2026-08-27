import React from 'react';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';
import type { PartnerData } from '@/data/partners';

export default function PartnersSteps({ partner }: { partner: PartnerData }) {
  const steps = [
    {
      number: '1',
      icon: ShoppingBag,
      title: partner.step1Title,
      desc: partner.step1Desc,
      tag: 'Integración oficial',
      color: '#4F3A96',
      bgLight: '#F3EEFF',
      borderColor: '#C9B8FF',
    },
    {
      number: '2',
      icon: Truck,
      title: partner.step2Title,
      desc: partner.step2Desc,
      color: '#006B82',
      bgLight: '#E0F7FA',
      borderColor: '#80DEEA',
    },
    {
      number: '3',
      icon: CreditCard,
      title: 'Cobra, factura y haz seguimiento',
      desc: 'Registra pagos contraentrega, emite boletas y facturas SUNAT desde la misma plataforma.',
      color: '#4F3A96',
      bgLight: '#F3EEFF',
      borderColor: '#C9B8FF',
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          Cómo empiezas
        </span>
        <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">Empieza a usar POWIP en minutos</h2>
        <p className="text-gray-500 text-base md:text-lg mt-3">Solo 3 pasos para ordenar tu operación</p>

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-0 w-full max-w-5xl mt-16">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="relative flex flex-col items-center text-center w-full md:w-1/3 z-10 group">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <div
                  className="w-full max-w-[280px] rounded-2xl p-6 border-2 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
                  style={{ backgroundColor: step.bgLight, borderColor: step.borderColor }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:rotate-6"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3" style={{ color: step.color }}>{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  {step.tag && (
                    <span className="inline-block mt-3 bg-[#e5fbf3] text-[#0d9c78] font-bold text-xs px-3 py-1 rounded-full">{step.tag}</span>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center justify-center w-16 mt-28 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-8 h-[3px] rounded-full"
                        style={{ backgroundImage: `linear-gradient(to right, ${steps[index].color}, ${steps[index + 1].color})` }}
                      />
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 1L10 6L2 11" stroke={steps[index + 1].color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex md:hidden items-center justify-center h-12">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="h-6 w-[3px] rounded-full"
                        style={{ backgroundImage: `linear-gradient(to bottom, ${steps[index].color}, ${steps[index + 1].color})` }}
                      />
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 2L6 10L11 2" stroke={steps[index + 1].color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
