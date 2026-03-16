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
    <section className="w-full flex flex-col lg:flex-row items-center justify-between py-24 px-6 md:px-20 gap-16 bg-[#4F3A96]">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col gap-12 w-full max-w-xl">
        <h2 className="text-white font-bold text-3xl md:text-[44px] leading-tight whitespace-pre-line">
          {"Todo tu ecommerce en un\nsolo lugar. Pedidos, pagos y\nenvíos sin caos."}
        </h2>
        
        <ul className="flex flex-col gap-5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <CircleCheck className="w-7 h-7 text-gray-400 shrink-0" />
              <span className="text-gray-100 text-lg md:text-xl">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link href="/demo" className="bg-white hover:bg-gray-50 text-[#4F3A96] transition-colors font-semibold text-base px-6 py-4 rounded-lg inline-block">
            Ver cómo funciona Powip
          </Link>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[400px]">
        {/* Mockup wrapper */}
        <div className="w-full max-w-[800px]">
          <img 
            src="/features-laptop.png" 
            alt="Dashboard de Operaciones en Powip" 
            className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl" 
          />
        </div>
      </div>

    </section>
  );
}
