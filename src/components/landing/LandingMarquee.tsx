import React from 'react';

type LogoItem = { name: string; img?: string; color?: string };

const LOGOS: LogoItem[] = [
  { name: 'WhatsApp', color: '#25D366' },
  { name: 'Instagram', img: '/instagram-icon.png' },
  { name: 'TikTok', color: '#000000' },
  { name: 'Shopify', img: '/shopify.png' },
  { name: 'Mercado Libre', color: '#2D3277' },
  { name: 'Shalom', color: '#E02D3B' },
  { name: 'Olva Courier', img: '/olva-logo.png' },
  { name: 'Mercado Pago', img: '/mercadopago-logo.png' },
  { name: 'SUNAT', img: '/sunat-logo.png' },
  { name: 'Facebook', img: '/facebook-icon.png' },
];

// Se repite el set de logos varias veces para que, en pantallas anchas,
// siempre haya contenido de sobra cubriendo el contenedor visible en
// cualquier punto de la animación (mismo criterio que PartnersMarquee).
const REPEATS = 6;

export default function LandingMarquee() {
  const items = Array.from({ length: REPEATS }, () => LOGOS).flat();

  return (
    <div className="w-full py-8 border-b border-gray-100 bg-white">
      <p className="text-center text-[#67637E] text-sm font-semibold mb-5 px-6">
        Conecta las plataformas y couriers que ya usas · <b className="text-[#1E8C86]">integración en tiempo real</b>
      </p>
      <p className="sr-only">Integraciones disponibles: {LOGOS.map((l) => l.name).join(', ')}.</p>
      <div
        className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center whitespace-nowrap" style={{ animationDuration: '110s' }}>
          {items.map((logo, idx) =>
            logo.img ? (
              <span key={idx} className="flex items-center gap-2 flex-shrink-0 mr-14">
                <img src={logo.img} alt="" className="h-7 w-auto object-contain" />
                <span className="font-bold text-[15px] text-[#4a4664]">{logo.name}</span>
              </span>
            ) : (
              <span
                key={idx}
                className="font-extrabold text-lg tracking-tight flex-shrink-0 mr-14"
                style={{ color: logo.color }}
              >
                {logo.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
