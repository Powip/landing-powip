'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

/** Testimonio en video (YouTube Short, vertical) de Valeria, CleoJoyas. */
const VIDEO_ID = '5BtyZQmRcX0';
const CLIENT_NAME = 'Valeria';
const CLIENT_BUSINESS = 'CleoJoyas';
const COVER_SRC = '/landing/testimonios/cleojoyas-portada.webp';

/**
 * Video de la sección "Prueba real", en formato vertical 9:16 como el Short.
 * El iframe de YouTube solo se carga al hacer clic.
 */
export default function LandingProofVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-[380px] lg:w-[380px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-[0_30px_70px_rgba(45,25,90,0.3)]">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title={`Testimonio de ${CLIENT_NAME}, ${CLIENT_BUSINESS}, sobre POWIP`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Reproducir el testimonio de ${CLIENT_NAME}, ${CLIENT_BUSINESS}`}
          className="group absolute inset-0 w-full h-full flex items-center justify-center bg-[#2E2168]"
        >
          {/* Portada del Short: ya incluye el nombre de la clienta y del negocio */}
          <img
            src={COVER_SRC}
            alt={`${CLIENT_NAME}, de ${CLIENT_BUSINESS}, cuenta por qué POWIP es su aliado para crecer`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-[0_14px_44px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110">
            <Play className="w-6 h-6 text-[#4F3A96] fill-[#4F3A96] ml-1" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
