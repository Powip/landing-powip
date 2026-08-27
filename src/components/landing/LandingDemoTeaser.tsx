'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const BENEFITS = [
  'Demostración personalizada a tu operación',
  'Resolvemos todas tus dudas antes de empezar',
  'Te dejamos listo para conectar tus canales y couriers',
];

export default function LandingDemoTeaser() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        full_name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: form.message,
      },
    ]);
    setLoading(false);

    if (submitError) {
      console.error('Error submitting lead:', submitError);
      setError('Hubo un error al enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp.');
      return;
    }

    setSubmitted(true);
  };

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

        <div className="bg-white border border-gray-100 rounded-[28px] shadow-[0_18px_50px_rgba(46,33,104,0.1)] p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#0d9c78] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-[#1B1730] font-bold text-xl tracking-tight">¡Gracias!</h3>
              <p className="text-gray-500 text-[14.5px] max-w-xs">
                Hemos recibido tu solicitud. Te contactamos el mismo día hábil para coordinar tu demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-[#1B1730] font-bold text-xl tracking-tight text-center">Cuéntanos de tu negocio</h3>
              <p className="text-gray-500 text-[14.5px] mt-2 mb-6 text-center">
                Completa el formulario y te contactamos el mismo día hábil.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label htmlFor="demo-firstName" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                    Nombre
                  </label>
                  <input
                    id="demo-firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="demo-lastName" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                    Apellido
                  </label>
                  <input
                    id="demo-lastName"
                    name="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label htmlFor="demo-phone" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                    Celular / WhatsApp
                  </label>
                  <input
                    id="demo-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="demo-company" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                    Nombre de negocio
                  </label>
                  <input
                    id="demo-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="mb-3.5">
                <label htmlFor="demo-email" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="demo-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="demo-message" className="block text-[12.5px] font-bold text-[#4F3A96] mb-1.5">
                  ¿Qué vendes y por qué canales?
                </label>
                <textarea
                  id="demo-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-y text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors"
                />
              </div>

              {error && (
                <p role="alert" className="text-[#EF4444] text-[13px] font-medium mb-3.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#4F3A96] hover:bg-[#3d2d75] disabled:opacity-60 transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl"
              >
                {loading ? 'Enviando…' : 'Agendar demostración'}
                {!loading && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
              </button>
              <p className="text-gray-400 text-[12px] mt-4 text-center">Sin compromiso de permanencia</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
