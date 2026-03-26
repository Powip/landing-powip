import React from 'react';
import Link from 'next/link';

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
            <h1 className="text-[#4F3A96] font-bold text-4xl md:text-[60px] leading-tight" style={{ lineHeight: '1' }}>
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
        
        {/* Floating CTA Button */}
        <Link 
          href="/demo#video"
          className="absolute bottom-3 right-6 md:bottom-4 md:right-10 bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-xl shadow-[0_10px_30px_rgba(79,58,150,0.4)] transition-all duration-300 z-20 flex items-center gap-2 group whitespace-nowrap text-sm md:text-lg"
        >
          Ver como funciona POWIP
          <svg 
            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
