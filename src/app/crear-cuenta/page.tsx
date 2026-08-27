import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CrearCuentaForm from '@/components/crear-cuenta/CrearCuentaForm';

export const metadata: Metadata = {
  title: 'Crea tu cuenta',
  description: 'Activa tu cuenta de POWIP en minutos — te contactamos por WhatsApp para completar tu alta.',
  alternates: { canonical: '/crear-cuenta' },
};

export default function CrearCuentaPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <header className="w-full bg-gradient-to-b from-white to-[#F4F1FD] pt-14 pb-10 px-6 md:px-20 text-center">
        <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
          Activación de cuenta
        </span>
        <h1 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-[44px] leading-tight tracking-tight">
          Crea tu cuenta
        </h1>
        <p className="mt-3 text-[#4a4664] text-base md:text-lg max-w-xl mx-auto">
          Todavía activamos las cuentas nuevas de forma manual mientras terminamos el onboarding automático.
          Cuéntanos de tu negocio y te escribimos por WhatsApp para dejarte listo.
        </p>
      </header>

      <div className="px-6 md:px-20 pb-24">
        <Suspense fallback={null}>
          <CrearCuentaForm />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
