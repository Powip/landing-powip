'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarClock } from 'lucide-react';

/**
 * Botón flotante "Agenda una demo" que aparece apenas el usuario empieza a
 * hacer scroll. Esquina inferior izquierda a propósito: el botón de
 * WhatsApp ya vive abajo-derecha, así ambos flotantes conviven sin taparse
 * (mismo criterio que se usó en PartnersStickyBar).
 */
export default function LandingDemoStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link
      href="#demo"
      title="Agenda una demostración de POWIP"
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold text-sm md:text-[15px] pl-5 pr-4 py-3.5 rounded-full shadow-[0_10px_30px_rgba(46,33,104,0.4)] transition-all duration-300 hover:scale-105 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <CalendarClock className="w-4 h-4" aria-hidden="true" />
      Agenda una demo
    </Link>
  );
}
