'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const WHATSAPP_NUMBER = '51923101193';
const KNOWN_PLANS = ['BASIC', 'STANDARD', 'FULL', 'ENTERPRISE'];
const PLAN_OPTIONS = ['BASIC', 'STANDARD', 'FULL', 'ENTERPRISE', 'Aún no estoy seguro'];

const inputClass =
  'w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors';
const labelClass = 'block text-[12.5px] font-bold text-[#4F3A96] mb-1.5';

function buildWhatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Registro best-effort en Supabase como respaldo del envío por WhatsApp — se
// dispara sin esperarlo (fire-and-forget) para no retrasar ni depender de la
// apertura de WhatsApp, que ya sucedió de forma síncrona.
async function logAccountLead(payload: {
  full_name: string;
  phone: string;
  company: string;
  email: string;
  message: string;
}) {
  if (!supabase) return;
  const { error: submitError } = await supabase.from('landing_leads').insert([payload]);
  if (submitError) console.error('Error registrando lead de creación de cuenta:', submitError);
}

export default function CrearCuentaForm() {
  const searchParams = useSearchParams();
  const planFromUrl = (searchParams.get('plan') || '').toUpperCase();
  const presetPlan = KNOWN_PLANS.includes(planFromUrl) ? planFromUrl : null;

  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [planElegido, setPlanElegido] = useState(PLAN_OPTIONS[PLAN_OPTIONS.length - 1]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const plan = presetPlan || planElegido;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !empresa.trim() || !telefono.trim()) {
      setError('Completa tu nombre, tu empresa y tu celular para continuar.');
      return;
    }

    const message = [
      'Hola POWIP 👋 Quiero crear mi cuenta.',
      '',
      `Nombre: ${nombre.trim()}`,
      `Empresa: ${empresa.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Plan de interés: ${plan}`,
    ].join('\n');

    const url = buildWhatsappUrl(message);

    // Se abre de inmediato, en el mismo tick del click, para no perder el
    // gesto del usuario (algunos navegadores bloquean window.open si hay
    // una llamada async — como el insert de Supabase — antes de invocarlo).
    window.open(url, '_blank', 'noopener,noreferrer');
    setWaUrl(url);
    setSuccess(true);

    void logAccountLead({
      full_name: nombre.trim(),
      phone: telefono.trim(),
      company: empresa.trim(),
      email: '',
      message: `Quiere crear cuenta (activación manual) — Plan de interés: ${plan}`,
    });
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-4 px-6">
        <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#0d9c78] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h2 className="text-[#4F3A96] font-bold text-2xl md:text-3xl tracking-tight">¡Listo, {nombre.split(' ')[0]}!</h2>
        <p className="text-[#4a4664] text-[15px] leading-relaxed">
          Abrimos WhatsApp con tus datos y el plan <b>{plan}</b>. En breve nos estaremos comunicando contigo para
          activar tu cuenta de POWIP.
        </p>
        <p className="text-[#67637E] text-[13px]">
          ¿No se abrió WhatsApp automáticamente?{' '}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[#4F3A96] font-semibold hover:underline">
            Ábrelo aquí
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {presetPlan && (
        <div className="mb-6 flex items-center justify-between gap-3 bg-[#F0EEFB] border border-[#DCD5F5] rounded-2xl px-5 py-3.5">
          <span className="text-[13.5px] text-[#3a2389]">
            Plan seleccionado: <b className="text-[#4F3A96]">{presetPlan}</b>
          </span>
          <Link href="/#precios" className="text-[12.5px] font-semibold text-[#4F3A96] hover:underline whitespace-nowrap">
            Cambiar plan
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="bg-white border border-gray-100 rounded-[28px] shadow-[0_18px_50px_rgba(46,33,104,0.1)] p-7 md:p-9 flex flex-col gap-4">
        <div>
          <label htmlFor="cc-nombre" className={labelClass}>Nombre completo *</label>
          <input id="cc-nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" className={inputClass} />
        </div>

        <div>
          <label htmlFor="cc-empresa" className={labelClass}>Nombre de tu empresa *</label>
          <input id="cc-empresa" type="text" required value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Tu marca o negocio" className={inputClass} />
        </div>

        <div>
          <label htmlFor="cc-telefono" className={labelClass}>Celular / WhatsApp *</label>
          <input id="cc-telefono" type="tel" required value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="9XX XXX XXX" className={inputClass} />
        </div>

        {!presetPlan && (
          <div>
            <label htmlFor="cc-plan" className={labelClass}>Plan de tu interés</label>
            <select id="cc-plan" value={planElegido} onChange={(e) => setPlanElegido(e.target.value)} className={inputClass}>
              {PLAN_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <p role="alert" className="text-[#EF4444] text-[13px] font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fb958] transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl mt-2"
        >
          <MessageCircle className="w-4.5 h-4.5" aria-hidden="true" />
          Continuar por WhatsApp
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
        <p className="text-gray-400 text-[12px] text-center">
          Vas a abrir WhatsApp con tus datos ya escritos, listo para enviar.
        </p>
      </form>
    </div>
  );
}
