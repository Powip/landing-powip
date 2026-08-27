import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-20 px-6 md:px-20 bg-white/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
      <Link href="/" aria-label="POWIP — ir al inicio" className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm">
          <img src="/icon.jpeg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#4F3A96] font-bold text-[28px] tracking-tight font-heading">POWIP</span>
      </Link>

      <div className="hidden md:flex items-center gap-9">
        <Link href="/#ecosistema" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Ecosistema
        </Link>
        <Link href="/#producto" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Producto
        </Link>
        <Link href="/#precios" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Precios
        </Link>
        <Link href="/demo" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Demo
        </Link>
        <Link href="https://www.powip.tech/login" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Iniciar sesión
        </Link>
        <Link href="/crear-cuenta" className="bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-semibold text-sm px-6 py-3 rounded-md">
          Crea tu cuenta
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <Link href="/crear-cuenta" className="bg-[#4F3A96] text-white font-semibold text-sm px-4 py-2.5 rounded-md">
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}
