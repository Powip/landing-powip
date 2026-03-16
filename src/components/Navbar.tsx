import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-20 px-6 md:px-20 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.1)] flex items-center justify-between sticky top-0 z-50">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        {/* Replace text logo with icon.jpeg */}
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm">
          <img src="/icon.jpeg" alt="Powip Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#4F3A96] font-bold text-[28px] tracking-tight">POWIP</span>
      </Link>

      {/* Navigation Links & CTA */}
      <div className="hidden md:flex items-center gap-10">
        <Link href="/#precios" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Precios
        </Link>
        <Link href="/#blog" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Blog
        </Link>
        <Link href="https://www.powip.tech/login" className="text-[#333333] font-semibold text-base hover:text-[#4F3A96] transition-colors">
          Iniciar sesión
        </Link>
        <Link href="/demo" className="bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-semibold text-sm px-6 py-3 rounded-md">
          Demo en vivo
        </Link>
      </div>

      {/* Mobile Menu Button - Optional visual only */}
      <div className="md:hidden flex items-center">
        <button className="text-[#333333]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
