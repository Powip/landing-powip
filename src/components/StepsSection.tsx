'use client';
import React from 'react';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Recibe tus pedidos',
    description: 'Centraliza los pedidos de WhatsApp, Instagram, TikTok y tu web en un solo lugar. Sin copiar y pegar.',
    icon: ShoppingBag,
    color: '#4F3A96',
    bgLight: '#F3EEFF',
    borderColor: '#C9B8FF',
  },
  {
    number: '02',
    title: 'Gestiona envíos',
    description: 'Conecta con Olva, Shalom y otros couriers. Genera guías y rastrea todos tus paquetes automáticamente.',
    icon: Truck,
    color: '#006B82',
    bgLight: '#E0F7FA',
    borderColor: '#80DEEA',
  },
  {
    number: '03',
    title: 'Cobra y factura',
    description: 'Registra pagos contraentrega, genera boletas y facturas electrónicas SUNAT desde la misma plataforma.',
    icon: CreditCard,
    color: '#E67E22',
    bgLight: '#FFF8E1',
    borderColor: '#FFD54F',
  },
];

export default function StepsSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-20 bg-white overflow-hidden">

      <div className="text-center max-w-3xl">
        <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
          Empieza a usar Powip en minutos
        </h2>
        <p className="text-gray-500 text-lg mt-4">Solo 3 pasos para transformar tu operación</p>
      </div>

      {/* Steps Flow */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-0 w-full max-w-5xl">

        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Card */}
            <div
              className="relative flex flex-col items-center text-center w-full md:w-1/3 z-10 animate-fade-in-up group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Number Badge */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg mb-6 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>

              {/* Card */}
              <div
                className="w-full max-w-[280px] rounded-2xl p-6 border-2 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
                style={{
                  backgroundColor: step.bgLight,
                  borderColor: step.borderColor,
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:rotate-6"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-bold text-xl mb-3" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Arrow (between steps) */}
            {index < steps.length - 1 && (
              <>
                {/* Desktop connector */}
                <div className="hidden md:flex items-center justify-center w-16 mt-28 flex-shrink-0 animate-fade-in" style={{ animationDelay: `${(index + 1) * 200 + 100}ms` }}>
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-[3px] bg-gradient-to-r rounded-full" style={{
                      backgroundImage: `linear-gradient(to right, ${steps[index].color}, ${steps[index + 1].color})`
                    }} />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 1L10 6L2 11" stroke={steps[index + 1].color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Mobile connector */}
                <div className="flex md:hidden items-center justify-center h-12 animate-fade-in" style={{ animationDelay: `${(index + 1) * 200 + 100}ms` }}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-6 w-[3px] bg-gradient-to-b rounded-full" style={{
                      backgroundImage: `linear-gradient(to bottom, ${steps[index].color}, ${steps[index + 1].color})`
                    }} />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 2L6 10L11 2" stroke={steps[index + 1].color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        ))}

      </div>
    </section>
  );
}
