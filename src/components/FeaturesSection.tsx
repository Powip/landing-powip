import React from 'react';
import { CircleCheck } from 'lucide-react';

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
    <section className="w-full flex flex-col lg:flex-row items-center justify-between py-4 px-6 md:px-20 gap-8 bg-[#4F3A96] overflow-hidden">

      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-4 w-full max-w-xl text-center lg:text-left py-4">
        <h2 className="text-white font-bold text-3xl md:text-[32px] leading-tight whitespace-pre-line">
          {"Todo tu ecommerce en un solo lugar.\n Pedidos, pagos y envíos sin caos."}
        </h2>

        <ul className="flex flex-col gap-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 justify-center lg:justify-start">
              <CircleCheck className="w-5 h-5 text-gray-400 shrink-0" />
              <span className="text-gray-100 text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link href="/demo" className="bg-white hover:bg-gray-50 text-[#4F3A96] transition-colors font-semibold text-sm px-5 py-3 rounded-lg inline-block">
            Ver cómo funciona Powip
          </Link>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        {/* Mockup wrapper with cropping to keep it compact */}
        <div className="w-full max-w-[800px] max-h-[680px] overflow-hidden flex items-center justify-center">
          <img
            src="/features-image.png"
            alt="Dashboard de Operaciones de Powip"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

    </section>
  );
}
