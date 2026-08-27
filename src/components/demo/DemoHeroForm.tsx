'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const inputClass =
  'h-12 rounded-xl bg-white text-[#1B1730] px-4 border border-transparent focus:outline-none focus:border-white transition-colors placeholder:text-gray-400';
const labelClass = 'text-white font-semibold text-[13px]';

export default function DemoHeroForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (!showSuccessModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSuccessModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showSuccessModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!supabase) {
      setError('Error de configuración: no se pudo conectar con el formulario. Escríbenos por WhatsApp.');
      return;
    }

    setLoading(true);
    const { error: submitError } = await supabase.from('landing_leads').insert([
      {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      },
    ]);
    setLoading(false);

    if (submitError) {
      console.error('Error submitting lead:', submitError);
      setError('Hubo un error al enviar tus datos. Intenta de nuevo o contáctanos por WhatsApp.');
      return;
    }

    setShowSuccessModal(true);
    setFormData({ firstName: '', lastName: '', phone: '', company: '', email: '', message: '' });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#4F3A96] to-[#2E2168] overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-white/5 blur-[90px]" />

      {showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-success-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white rounded-[28px] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="w-16 h-16 bg-[#EAF8F5] rounded-full flex items-center justify-center text-[#0d9c78]">
              <CheckCircle2 size={36} aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 id="demo-success-title" className="text-[#4F3A96] font-bold text-2xl tracking-tight">¡Gracias!</h3>
              <p className="text-gray-500 text-[14.5px] leading-relaxed">
                Hemos recibido tu solicitud. Nos pondremos en contacto pronto para coordinar tu demo.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#4F3A96] hover:bg-[#3d2d75] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 md:px-20 py-16 lg:py-20">
        {/* Left column — form */}
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

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="firstName" className={labelClass}>Nombre</label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jane" required className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="lastName" className={labelClass}>Apellido</label>
                <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Smith" required className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="phone" className={labelClass}>Celular</label>
                <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9XX XXX XXX" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="company" className={labelClass}>Nombre de negocio</label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Tu marca" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="email" className={labelClass}>Correo electrónico</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hola@tunegocio.com" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="message" className={labelClass}>Tu mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos brevemente tu negocio"
                rows={3}
                className="rounded-xl bg-white text-[#1B1730] px-4 py-3 resize-none border border-transparent focus:outline-none focus:border-white transition-colors placeholder:text-gray-400"
              />
            </div>

            {error && (
              <p role="alert" className="text-[#ffb4b4] text-[13px] font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 py-3.5 w-full bg-white hover:bg-gray-50 disabled:opacity-60 transition-colors rounded-xl text-[#4F3A96] font-bold text-base mt-1"
            >
              {loading ? 'Enviando…' : 'Agendar demostración'}
              {!loading && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
            </button>

            <div className="flex flex-col gap-2 mt-1">
              <p className="text-white/90 text-xs leading-relaxed">
                Demostración personalizada para negocios ecommerce en crecimiento · Duración: 20 minutos
              </p>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Al enviar este formulario aceptas nuestra{' '}
                <a href="/privacidad" className="underline hover:text-white">
                  Política de Privacidad
                </a>
                .
              </p>
            </div>
          </form>
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
