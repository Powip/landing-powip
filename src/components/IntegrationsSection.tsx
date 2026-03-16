import React from 'react';

export default function IntegrationsSection() {
  const integrations = [
    {
      name: 'SUNAT',
      logo: '/sunat-logo.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/sunat-logo.png" alt="SUNAT Logo" className="h-8 w-auto object-contain" />
        <span className="text-[#006B82] font-black text-2xl whitespace-nowrap">SUNAT</span>
      </div>
    },
    {
      name: 'Shopify',
      logo: '/shopify.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/shopify.png" alt="Shopify Icon" className="h-8 w-auto object-contain" />
        <div className="flex items-end gap-1">
          <span className="text-[#333333] font-bold text-2xl leading-none">shopify</span>
          <span className="text-[#666666] font-normal text-lg leading-none mb-0.5">partners</span>
        </div>
      </div>
    },
    {
      name: 'Olva',
      logo: '/olva-logo.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/olva-logo.png" alt="Olva Logo" className="h-8 w-auto object-contain" />
        <div className="flex items-center gap-1">
          <span className="text-[#ECA329] font-black text-2xl">OLVA</span>
          <span className="text-[#666666] font-black text-2xl">COURIER</span>
        </div>
      </div>
    },
    {
      name: 'Shalom',
      content: <div className="flex items-center px-8">
        <span className="text-[#E02D3B] font-black text-2xl md:text-3xl whitespace-nowrap">SHALOM</span>
      </div>
    },
    {
      name: 'Google',
      content: <div className="flex items-center px-8 tracking-tight">
        <span className="text-[#4285F4] font-bold text-2xl">G</span>
        <span className="text-[#EA4335] font-bold text-2xl">o</span>
        <span className="text-[#FBBC05] font-bold text-2xl">o</span>
        <span className="text-[#4285F4] font-bold text-2xl">g</span>
        <span className="text-[#34A853] font-bold text-2xl">l</span>
        <span className="text-[#EA4335] font-bold text-2xl">e</span>
      </div>
    },
    {
      name: 'AWS',
      logo: '/aws.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/aws.png" alt="AWS Icon" className="h-10 w-auto object-contain" />
      </div>
    },
    {
      name: 'MercadoPago',
      logo: '/mercadopago-logo.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/mercadopago-logo.png" alt="MercadoPago Logo" className="h-8 w-auto object-contain" />
        <span className="text-[#001B6B] font-bold text-lg whitespace-nowrap uppercase">mercado pago</span>
      </div>
    },
    {
      name: 'Meta',
      logo: '/meta.png',
      content: <div className="flex items-center gap-2 px-8">
        <img src="/meta.png" alt="Meta Icon" className="h-8 w-auto object-contain" />
        <span className="text-[#333333] font-bold text-2xl">Meta</span>
      </div>
    }
  ];

  // Double the items for seamless loop
  const duplicatedIntegrations = [...integrations, ...integrations];

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="flex flex-col items-center gap-12">
        <h2 className="text-[#006B82] font-bold text-center text-lg md:text-xl px-6">
          +1200 negocios ecommerce ya usan Powip
        </h2>

        <div className="relative w-full flex overflow-hidden">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {duplicatedIntegrations.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center justify-center h-16">
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
