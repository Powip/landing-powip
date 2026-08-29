import React from 'react';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { DEMO_CALENDAR_LINK } from '@/lib/constants';

const INCLUDES = [
  'Demostración personalizada a tu operación',
  'Resolvemos todas tus dudas antes de empezar',
  'Duración: 20 minutos, sin compromiso',
];

export default function DemoHeroForm() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#4F3A96] to-[#2E2168] overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-white/5 blur-[90px]" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 md:px-20 py-16 lg:py-20">
        {/* Left column — pitch + CTA */}
        <div className="w-full lg:flex-1 max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 text-[#8ff0d0] font-bold uppercase text-xs tracking-wide bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
              Demo guiada · sin costo
            </span>
            <h1 className="text-white font-bold text-4xl md:text-[52px] leading-[1.1] tracking-tight">
              ¿Vendes por WhatsApp,
              <br />
              Instagram, TikTok y web?
            </h1>
            <p className="text-[#d6cff2] text-base md:text-lg leading-relaxed max-w-lg">
              Agenda una demo guiada con nuestro equipo y descubre cómo POWIP ordena tus pedidos, envíos y cobranza
              contraentrega.
            </p>
          </div>

          <div className="flex flex-col gap-5 bg-white/10 border border-white/20 rounded-2xl p-7 backdrop-blur-sm">
            <ul className="flex flex-col gap-2.5">
              {INCLUDES.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-white/90 text-[14.5px] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#8ff0d0]/20 text-[#8ff0d0] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                    ✓
                  </span>
                  {it}
                </li>
              ))}
            </ul>

            <a
              href={DEMO_CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 w-full bg-white hover:bg-gray-50 transition-colors rounded-xl text-[#4F3A96] font-bold text-base"
            >
              <CalendarClock className="w-4 h-4" aria-hidden="true" />
              Agendar demostración
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right column — image */}
        <div className="hidden lg:block lg:flex-1 w-full relative">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <img
              src="/demo-office-new.jpg"
              alt="Equipo de POWIP preparando pedidos y guías de despacho en su almacén"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2E2168]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
