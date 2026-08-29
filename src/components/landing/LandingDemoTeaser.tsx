import React from 'react';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { DEMO_CALENDAR_LINK } from '@/lib/constants';

const BENEFITS = [
  'Demostración personalizada a tu operación',
  'Resolvemos todas tus dudas antes de empezar',
  'Te dejamos listo para conectar tus canales y couriers',
];

export default function LandingDemoTeaser() {
  return (
    <section id="demo" className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
            ¿Prefieres verlo primero?
          </span>
          <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            Agenda una <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">demostración</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-lg">
            Un especialista te muestra en vivo cómo POWIP ordena tus pedidos, envíos y cobranza contraentrega —
            aplicado a tu negocio.
          </p>
          <ul className="mt-6 flex flex-col gap-3.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15.5px] font-medium text-[#3a3852]">
                <span
                  className="w-6 h-6 rounded-lg bg-[#EAF8F5] text-[#1E8C86] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[13px]"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-[28px] shadow-[0_18px_50px_rgba(46,33,104,0.1)] p-8 md:p-10 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#1E8C86] flex items-center justify-center">
            <CalendarClock className="w-8 h-8" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-[#1B1730] font-bold text-xl tracking-tight">Elige el horario que prefieras</h3>
            <p className="text-gray-500 text-[14.5px] mt-2 max-w-xs">
              Agenda directamente en nuestro calendario, sin llenar formularios. Duración: 20 minutos.
            </p>
          </div>

          <a
            href={DEMO_CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl"
          >
            Agendar demostración
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="text-gray-400 text-[12px]">Sin compromiso de permanencia</p>
        </div>
      </div>
    </section>
  );
}
