import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
  const features = [
    "Centraliza todos tus pedidos",
    "Controla tus cobros contraentrega",
    "Facturación electrónica",
    "Integración con Couriers",
    "Integración con Shopify"
  ];

  return (
    <section className="w-full bg-[#4F3A96] py-20 px-6 md:px-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-6">
            <h2 className="text-white font-bold text-3xl md:text-[48px] leading-[1.1]">
              Todo tu ecommerce en un solo lugar. Pedidos, pagos y envíos sin caos.
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
              Deja de usar excel, chats, facturación electrónica y courier en plataformas separadas. Con Powip controlas toda tu operación desde un solo panel.
            </p>
          </div>

          <ul className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-5">
                <div className="bg-[#B2EBF2] rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-[#4F3A96] stroke-[3px]" />
                </div>
                <span className="text-white text-xl md:text-2xl font-medium tracking-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col items-center lg:items-end gap-12 w-full pt-10 lg:pt-0">
          <div className="w-full relative scale-110 lg:scale-125 lg:translate-x-16">
            <img
              src="/features-image.png"
              alt="Dashboard de Operaciones de Powip"
              className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Button positioned under the mockup */}
          <div className="w-full flex justify-center lg:justify-end lg:pr-16">
            <Link
              href="/demo#video"
              className="bg-white hover:bg-gray-50 text-[#4F3A96] transition-all hover:scale-105 active:scale-100 font-bold text-xl px-10 py-5 rounded-lg inline-block shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              Ver cómo funciona Powip
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
