import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-20 pb-16 px-6 md:px-20 gap-16 bg-white overflow-hidden">
      {/* Text Content */}
      <div className="flex flex-col items-center text-center max-w-6xl mx-auto gap-4">

        {/* Responsive heading layout */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <h1 className="text-[#4F3A96] font-bold text-4xl md:text-[54px] leading-tight">
            Deja de usar
          </h1>
          <div className="bg-[#C5E6E8] px-4 py-1 rounded">
            <h1 className="text-[#4F3A96] font-bold text-4xl md:text-[60px] leading-tight">
              excel y whatsapp
            </h1>
          </div>

        </div>

        <div className="flex items-center justify-center">
          <h1 className="text-[#4F3A96] font-bold text-4xl md:text-[54px] leading-tight">
            para gestionar tu negocio ecommerce
          </h1>
        </div>

      </div>

      {/* Main Mockup Image */}
      <div className="w-full max-w-[1000px] h-auto relative">
        <img src="/hero-image.jpeg" alt="Powip platform on desktop and mobile" className="w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </section>
  );
}
