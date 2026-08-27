'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PartnerData } from '@/data/partners';

/**
 * Botón flotante de "Crear cuenta" que aparece al hacer scroll.
 * Va en la esquina inferior izquierda (no bottom-right) a propósito:
 * el botón de WhatsApp ya vive ahí, y un cartel/banner de ancho completo
 * lo tapaba. Con dos botones flotantes en esquinas opuestas no hay choque.
 */
export default function PartnersStickyBar({ partner, signupHref }: { partner: PartnerData; signupHref: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link
      href={signupHref}
      title={`Vienes de ${partner.offerPartnerName} — 50% en tu 2da mensualidad`}
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold text-sm md:text-[15px] pl-5 pr-4 py-3.5 rounded-full shadow-[0_10px_30px_rgba(46,33,104,0.4)] transition-all duration-300 hover:scale-105 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Crea tu cuenta
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
