import React from 'react';
import Link from 'next/link';

export default function DemoVideoSection() {
  return (
    <section id="video" className="w-full bg-[#161226] flex flex-col items-center py-20 px-6 md:px-20 gap-10">
      <div className="text-center max-w-3xl flex flex-col items-center gap-4">
        <span className="inline-flex items-center gap-2 text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
          Míralo en acción
        </span>
        <h2 className="text-white font-bold text-3xl md:text-5xl leading-tight tracking-tight">
          Muchos negocios ecommerce gestionan sus pedidos con POWIP
        </h2>
      </div>

      <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/10">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/eR3NaHgyLC0"
          title="Demostración de POWIP"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <Link
        href="/#precios"
        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors rounded-xl text-[#4F3A96] font-bold text-[15px] px-8 py-3.5"
      >
        Ver planes y precios
      </Link>
    </section>
  );
}
