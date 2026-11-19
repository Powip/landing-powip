'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { VIDEO_ID } from '@/components/landing/LandingVideo';

/**
 * Video de la sección "Prueba real", en formato vertical como el mockup.
 * Por ahora usa el mismo video de YouTube que ya tenía la landing
 * (LandingVideo). Se cambiará por el testimonio de la clienta.
 */
export default function LandingProofVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[420px] h-full bg-black shadow-[0_30px_70px_rgba(45,25,90,0.3)]">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="POWIP · Centraliza tus ventas ecommerce, cobros y entregas"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label="Reproducir el video de POWIP"
          className="group absolute inset-0 w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_40%,#6C4FE0,#2E2168)]"
        >
          <span className="absolute top-5 left-6 text-white font-bold text-[14.5px] max-w-[80%] text-left">
            POWIP · Centraliza tus ventas ecommerce, cobros y entregas
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
