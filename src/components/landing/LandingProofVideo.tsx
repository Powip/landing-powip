'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

/** Testimonio en video (YouTube Short, vertical) de Valeria, CleoJoyas. */
const VIDEO_ID = 'EKNc-CjCeuA';
const CLIENT_NAME = 'Valeria';
const CLIENT_BUSINESS = 'CleoJoyas';

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
          className="group absolute inset-0 w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_40%,#6C4FE0,#2E2168)]"
        >
          <span className="absolute top-5 left-6 right-6 text-white text-left">
            <b className="block font-bold text-lg">{CLIENT_NAME}</b>
            <span className="block text-[13.5px] text-[#d9d2ea] font-medium">{CLIENT_BUSINESS} · usa POWIP</span>
          </span>
          <span className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_14px_44px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110">
            <Play className="w-7 h-7 text-[#4F3A96] fill-[#4F3A96] ml-1" aria-hidden="true" />
          </span>
          <span className="absolute bottom-5 right-6 text-white text-[13px] font-semibold bg-black/40 px-3.5 py-1.5 rounded-full">
            Reproducir video
          </span>
        </button>
      )}
    </div>
  );
}
