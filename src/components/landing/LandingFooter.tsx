import React from 'react';
import Link from 'next/link';
import { DEMO_CALENDAR_LINK } from '@/lib/constants';

/**
 * Footer oscuro de la landing v2 (diseño del mockup) con los enlaces reales
 * del footer actual: redes, contacto, legales y datos de la empresa.
 */
const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Cómo funciona', href: '/#como' },
      { label: 'Para quién es', href: '/#para-quien' },
      { label: 'Precios', href: '/#precios' },
      { label: 'POWIP para Shopify', href: '/shopify' },
      { label: 'Agenda una demo', href: '/demo' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
      { label: 'POWIP Partners', href: '/partners' },
      { label: 'Centro de ayuda', href: '/centro-de-ayuda' },
      { label: 'Libro de reclamaciones', href: '/reclamaciones' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'WhatsApp', href: 'https://wa.me/51923101193', external: true },
      { label: 'hola@powip.lat', href: 'mailto:hola@powip.lat' },
      { label: 'Instagram', href: 'https://www.instagram.com/powip.pe?igsi=czcwNmYyeHI4eTQ0&utm_source=qr', external: true },
      { label: 'TikTok', href: 'https://www.tiktok.com/@powip.lat?_r=1&_t=ZS-99DZQxauAaL', external: true },
      { label: 'Facebook', href: 'https://www.facebook.com/POwip.pe', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/powip/', external: true },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="w-full bg-[#12101c] text-[#aeb4c2] pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-[#26242f]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="POWIP — ir al inicio">
              <span className="flex items-center justify-center w-10 h-10 rounded-md overflow-hidden bg-white">
                <img src="/icon.jpeg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
              </span>
              <span className="text-white font-bold text-2xl tracking-tight font-heading">POWIP</span>
            </Link>
            <p className="text-[14.5px] text-[#c4c9d3] mt-4 mb-5 max-w-[300px] leading-relaxed">
              La plataforma para negocios que venden por redes sociales. Ordena tus pedidos, imprime tus etiquetas y
              despacha con Shalom y Olva.
            </p>
            <a
              href={DEMO_CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-md"
            >
              Agenda tu demo
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-bold mb-4">{col.title}</h4>
              <ul className="list-none p-0 m-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external || l.href.startsWith('mailto:') ? (
                      <a
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className="block text-sm text-[#9aa1ad] py-1.5 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="block text-sm text-[#9aa1ad] py-1.5 hover:text-white transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:justify-between gap-3 text-[13px] text-[#6b7280]">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} POWIP. Todos los derechos reservados.</span>
            <span>POWIP TECHNOLOGY SAC · RUC 20616141971 · Av. Venezuela 625, Oficina 918, Breña, Lima, Perú</span>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/reclamaciones" className="hover:text-white transition-colors">
              Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
