import React from 'react';
import type { PartnerData } from '@/data/partners';

// Se repite el set de logos varias veces (no solo 2x) para garantizar que,
// en pantallas anchas, siempre haya contenido de sobra cubriendo el contenedor
// visible en cualquier punto de la animación — así nunca se ve un espacio vacío
// antes de que el loop "cierre" con el primer item.
const REPEATS = 8;

export default function PartnersMarquee({ partner }: { partner: PartnerData }) {
  const items = Array.from({ length: REPEATS }, () => partner.logos).flat();

  return (
    <div className="w-full py-8 border-b border-gray-100">
      <p className="text-center text-[#67637E] text-sm font-semibold mb-5">
        Integración oficial con las plataformas que ya usas · <b style={{ color: partner.color }}>{partner.displayName}</b>
      </p>
      <p className="sr-only">Integraciones disponibles: {partner.logos.map((l) => l.name).join(', ')}.</p>
      <div className="w-full overflow-hidden mask-[linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
        <div className="animate-marquee flex items-center whitespace-nowrap" style={{ animationDuration: '160s' }}>
          {items.map((logo, idx) =>
            logo.img ? (
              <span key={idx} className="flex items-center gap-2 flex-shrink-0 mr-16">
                <img src={logo.img} alt="" className="h-7 w-auto object-contain" />
                <span className="font-bold text-lg tracking-tight text-[#4a4664]">{logo.name}</span>
              </span>
            ) : (
              <span key={idx} className="font-extrabold text-lg tracking-tight flex-shrink-0 mr-16" style={{ color: logo.color }}>
                {logo.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
