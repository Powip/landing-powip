import React from 'react';

export default function IntegrationsSection() {
  return (
    <section className="w-full flex flex-col items-center py-20 px-6 md:px-20 gap-12 bg-white overflow-hidden">

      <div className="flex flex-col items-center text-center w-full">
        <h2 className="text-[#006B82] font-bold text-center text-lg md:text-xl mb-12">
          +1200 negocios ecommerce ya usan Powip
        </h2>

        <div className="flex flex-col gap-12 md:gap-16 w-full items-center">

          {/* Row 1 */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 w-full">
            {/* SUNAT */}
            <div className="flex items-center">
              <span className="text-[#006B82] font-black text-2xl md:text-[28px]">SUNAT</span>
            </div>

            {/* Shopify Partners */}
            <div className="flex items-center gap-2">
              <img src="/shopify.png" alt="Shopify Icon" className="w-8 h-8 object-contain" />
              <div className="flex items-end gap-1">
                <span className="text-[#333333] font-bold text-2xl md:text-[28px] leading-none">shopify</span>
                <span className="text-[#666666] font-normal text-lg md:text-[22px] leading-none mb-0.5">partners</span>
              </div>
            </div>

            {/* OLVA */}
            <div className="flex items-center gap-1">
              <span className="text-[#ECA329] font-black text-2xl md:text-[26px]">OLVA</span>
              <span className="text-[#666666] font-black text-2xl md:text-[26px]">COURIER</span>
            </div>

            {/* SHALOM */}
            <div className="flex items-center">
              <span className="text-[#E02D3B] font-black text-[28px] md:text-[32px]">SHALOM</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 w-full">
            {/* Google */}
            <div className="flex items-center tracking-tight">
              <span className="text-[#4285F4] font-bold text-2xl md:text-[28px]">G</span>
              <span className="text-[#EA4335] font-bold text-2xl md:text-[28px]">o</span>
              <span className="text-[#FBBC05] font-bold text-2xl md:text-[28px]">o</span>
              <span className="text-[#4285F4] font-bold text-2xl md:text-[28px]">g</span>
              <span className="text-[#34A853] font-bold text-2xl md:text-[28px]">l</span>
              <span className="text-[#EA4335] font-bold text-2xl md:text-[28px]">e</span>
            </div>

            {/* AWS */}
            <div className="flex items-center gap-2">
              <img src="/aws.png" alt="AWS Icon" className="w-16 h-16 object-contain" />
              <span className="text-[#333333] font-bold text-[28px] md:text-[32px] leading-none mt-1"></span>
            </div>

            {/* MercadoPago */}
            <div className="flex flex-col">
              <span className="text-[#001B6B] font-bold text-base md:text-[18px] leading-none">mercado</span>
              <span className="text-[#001B6B] font-bold text-base md:text-[18px] leading-none">pago</span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2">
              <img src="/meta.png" alt="Meta Icon" className="w-10 h-10 object-contain" />
              <span className="text-[#333333] font-bold text-2xl md:text-[28px]">Meta</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
