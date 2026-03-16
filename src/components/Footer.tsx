import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white py-20 px-6 md:px-20 flex flex-col md:flex-row flex-wrap justify-between gap-12 border-t border-gray-100">

      {/* Column 1: Logo and Socials */}
      <div className="flex flex-col gap-8 w-full md:w-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm">
            <img src="/icon.jpeg" alt="Powip Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[#4F3A96] font-bold text-2xl tracking-tight">POWIP</span>
        </Link>

        <div className="flex flex-col gap-3">
          <Link href="https://facebook.com" target="_blank" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
            Facebook
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
            Instagram
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>

      {/* Column 2: Policies */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <h4 className="text-[#333333] font-bold text-base mb-2">Políticas y condiciones</h4>
        <Link href="/privacidad" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Política de privacidad
        </Link>
        <Link href="/terminos" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Términos y condiciones
        </Link>
        <Link href="/legal" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Legal
        </Link>
      </div>

      {/* Column 3: Resources */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <h4 className="text-[#333333] font-bold text-base mb-2">Recursos adicionales</h4>
        <Link href="/soporte" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Soporte técnico
        </Link>
        <Link href="/reclamaciones" className="text-[#4F3A96] text-sm font-medium hover:underline">
          Libro de reclamaciones
        </Link>
        <Link href="/partners" className="text-[#4F3A96] text-sm font-medium hover:underline">
          Powip Partners
        </Link>
      </div>

      {/* Column 4: Contact */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <h4 className="text-[#333333] font-bold text-base mb-2">Contacto</h4>
        <a href="mailto:hola@powip.lat" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          hola@powip.lat
        </a>
        <a href="https://wa.me/51923101193" target="_blank" rel="noreferrer" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Whatsapp +51 923 101 193
        </a>
        <Link href="/blog" className="text-[#666666] text-sm hover:text-[#4F3A96] transition-colors">
          Blog
        </Link>
      </div>

    </footer>
  );
}
