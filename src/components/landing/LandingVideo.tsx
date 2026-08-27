import React from 'react';
import { Play } from 'lucide-react';

const VIDEO_URL = 'https://www.youtube.com/watch?v=eR3NaHgyLC0';

export default function LandingVideo() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          Míralo en acción
        </span>
        <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
          Muchos negocios ecommerce ya <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">gestionan sus pedidos con POWIP</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4">
          Mira cómo dejan el Excel y ordenan toda su operación en una sola plataforma.
        </p>

        <a
          href={VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver el video de POWIP en YouTube (se abre en una pestaña nueva)"
          className="group relative mt-10 mx-auto max-w-2xl aspect-video rounded-[28px] overflow-hidden shadow-[0_18px_50px_rgba(46,33,104,0.15)] flex items-center justify-center bg-[radial-gradient(circle_at_30%_40%,#6C4FE0,#2E2168)]"
        >
          <span className="absolute top-5 left-6 text-white font-bold text-[14.5px] max-w-[70%] text-left">
            POWIP · Centraliza tus ventas ecommerce, cobros y entregas
          </span>
          <span className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_14px_44px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 text-[#4F3A96] fill-[#4F3A96] ml-1" aria-hidden="true" />
          </span>
          <span className="absolute bottom-5 right-6 text-white text-[13px] font-semibold bg-black/40 px-3.5 py-1.5 rounded-full">
            Ver en YouTube
          </span>
        </a>
      </div>
    </section>
  );
}
