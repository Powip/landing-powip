"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#funcionalidades", label: "Funcionalidades" },
    { href: "#casos-exito", label: "Casos de éxito" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/landing/logo-powip.svg"
              alt="POWIP"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--powip-gray)] hover:text-[var(--powip-purple)] font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="https://powip.tech/login"
              className="inline-flex items-center px-6 py-2.5 bg-[var(--powip-purple)] text-white font-semibold rounded-lg hover:bg-[var(--powip-purple-dark)] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Empieza ahora
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-[var(--powip-gray)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--powip-gray)] hover:text-[var(--powip-purple)] font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://powip.tech/login"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--powip-purple)] text-white font-semibold rounded-lg hover:bg-[var(--powip-purple-dark)] transition-colors duration-200 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Empieza ahora
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
