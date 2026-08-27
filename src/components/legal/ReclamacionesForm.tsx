'use client';
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import LegalNote from '@/components/legal/LegalNote';
import { supabase } from '@/lib/supabase';

type DocType = 'DNI' | 'Carné de Extranjería' | 'Pasaporte';
type ClaimType = 'reclamo' | 'queja';

const inputClass =
  'w-full text-[14.5px] border border-gray-200 rounded-xl px-3.5 py-2.5 bg-[#fbfbfe] focus:outline-none focus:border-[#4F3A96] focus:bg-white transition-colors';
const labelClass = 'block text-[12.5px] font-bold text-[#4F3A96] mb-1.5';

function generateClaimNumber() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RC-${y}${m}${d}-${rand}`;
}

export default function ReclamacionesForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [claimNumber, setClaimNumber] = useState<string | null>(null);

  const [isMinor, setIsMinor] = useState(false);
  const [claimType, setClaimType] = useState<ClaimType>('reclamo');
  const [form, setForm] = useState({
    nombreCompleto: '',
    tipoDocumento: 'DNI' as DocType,
    numeroDocumento: '',
    domicilio: '',
    telefono: '',
    email: '',
    apoderadoNombre: '',
    apoderadoDocumento: '',
    fechaConsumo: '',
    descripcionBien: '',
    montoReclamado: '',
    detalle: '',
    pedido: '',
  });
  const [declaracion, setDeclaracion] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!declaracion) {
      setError('Debes declarar que la información consignada es verdadera para enviar tu reclamo.');
      return;
    }

    if (!supabase) {
      setError('Error de configuración: no se pudo conectar con el formulario. Escríbenos a hola@powip.lat o por WhatsApp.');
      return;
    }

    const numero = generateClaimNumber();
    setLoading(true);

    const { error: submitError } = await supabase.from('reclamos').insert([
      {
        numero_reclamo: numero,
        tipo: claimType,
        nombre_completo: form.nombreCompleto,
        tipo_documento: form.tipoDocumento,
        numero_documento: form.numeroDocumento,
        domicilio: form.domicilio,
        telefono: form.telefono,
        email: form.email,
        es_menor_edad: isMinor,
        apoderado_nombre: isMinor ? form.apoderadoNombre : null,
        apoderado_documento: isMinor ? form.apoderadoDocumento : null,
        fecha_consumo: form.fechaConsumo || null,
        descripcion_bien: form.descripcionBien,
        monto_reclamado: form.montoReclamado ? Number(form.montoReclamado) : null,
        detalle: form.detalle,
        pedido: form.pedido,
      },
    ]);

    setLoading(false);

    if (submitError) {
      console.error('Error submitting reclamo:', submitError);
      setError('Hubo un error al enviar tu reclamo. Intenta de nuevo o escríbenos a hola@powip.lat.');
      return;
    }

    setClaimNumber(numero);
  };

  if (claimNumber) {
    return (
      <div className="px-6 md:px-20 pb-24">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#0d9c78] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </div>
          <h2 className="text-[#4F3A96] font-bold text-2xl md:text-3xl tracking-tight">
            {claimType === 'reclamo' ? 'Reclamo' : 'Queja'} registrado
          </h2>
          <p className="text-[#67637E] text-[13.5px]">Guarda este número, lo necesitarás para dar seguimiento.</p>
          <div className="bg-[#F0EEFB] border border-[#DCD5F5] rounded-2xl px-6 py-4 font-mono font-bold text-xl text-[#4F3A96] tracking-wide">
            {claimNumber}
          </div>
          <p className="text-[#4a4664] text-[14.5px] leading-relaxed">
            Conforme al Código de Protección y Defensa del Consumidor, tienes derecho a recibir respuesta en un
            plazo no mayor a treinta (30) días calendario. Te contactaremos al correo o teléfono que registraste.
          </p>
          <LegalNote>
            La formulación de este {claimType === 'reclamo' ? 'reclamo' : 'queja'} no impide acudir a otras vías
            de solución de controversias ni es un requisito previo para interponer una denuncia ante el
            INDECOPI.
          </LegalNote>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-20 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-5 mb-8 text-[13.5px] text-[#3a3852]">
          <p className="font-bold text-[#1B1730] mb-1">Identificación del establecimiento</p>
          <p>POWIP TECHNOLOGY SAC · RUC 20616141971</p>
          <p>Calle Portugal 129, Breña, Lima, Perú</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
          <fieldset>
            <legend className="text-[#4F3A96] font-bold text-lg tracking-tight mb-4">
              1. Identificación del consumidor reclamante
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label htmlFor="nombreCompleto" className={labelClass}>Nombres y apellidos *</label>
                <input id="nombreCompleto" name="nombreCompleto" type="text" required value={form.nombreCompleto} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="tipoDocumento" className={labelClass}>Tipo de documento *</label>
                <select id="tipoDocumento" name="tipoDocumento" required value={form.tipoDocumento} onChange={handleChange} className={inputClass}>
                  <option value="DNI">DNI</option>
                  <option value="Carné de Extranjería">Carné de Extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div>
                <label htmlFor="numeroDocumento" className={labelClass}>N.° de documento *</label>
                <input id="numeroDocumento" name="numeroDocumento" type="text" required value={form.numeroDocumento} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="domicilio" className={labelClass}>Domicilio *</label>
                <input id="domicilio" name="domicilio" type="text" required value={form.domicilio} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="telefono" className={labelClass}>Teléfono</label>
                <input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Correo electrónico *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <label className="mt-4 flex items-start gap-2.5 text-[13.5px] text-[#3a3852] cursor-pointer">
              <input
                type="checkbox"
                checked={isMinor}
                onChange={(e) => setIsMinor(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#4F3A96]"
              />
              El consumidor reclamante es menor de edad
            </label>

            {isMinor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5 bg-[#FAFAFA] border border-gray-100 rounded-xl p-4">
                <div>
                  <label htmlFor="apoderadoNombre" className={labelClass}>Nombre del padre, madre o apoderado *</label>
                  <input id="apoderadoNombre" name="apoderadoNombre" type="text" required={isMinor} value={form.apoderadoNombre} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="apoderadoDocumento" className={labelClass}>Documento del apoderado *</label>
                  <input id="apoderadoDocumento" name="apoderadoDocumento" type="text" required={isMinor} value={form.apoderadoDocumento} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className="text-[#4F3A96] font-bold text-lg tracking-tight mb-4">
              2. Identificación del bien contratado
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="fechaConsumo" className={labelClass}>Fecha de compra o contratación *</label>
                <input id="fechaConsumo" name="fechaConsumo" type="date" required value={form.fechaConsumo} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="montoReclamado" className={labelClass}>Monto reclamado (S/)</label>
                <input id="montoReclamado" name="montoReclamado" type="number" min="0" step="0.01" value={form.montoReclamado} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="descripcionBien" className={labelClass}>Descripción del bien o servicio contratado *</label>
                <textarea id="descripcionBien" name="descripcionBien" required rows={2} value={form.descripcionBien} onChange={handleChange} className={`${inputClass} resize-y`} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[#4F3A96] font-bold text-lg tracking-tight mb-4">
              3. Detalle de la reclamación y pedido del consumidor
            </legend>

            <div role="radiogroup" aria-label="Tipo" className="flex flex-col sm:flex-row gap-3 mb-4">
              <label className={`flex-1 flex items-start gap-2.5 border rounded-xl px-4 py-3 cursor-pointer text-[13.5px] ${claimType === 'reclamo' ? 'border-[#4F3A96] bg-[#F3EEFF]' : 'border-gray-200'}`}>
                <input type="radio" name="claimType" value="reclamo" checked={claimType === 'reclamo'} onChange={() => setClaimType('reclamo')} className="mt-0.5 accent-[#4F3A96]" />
                <span>
                  <b className="text-[#1B1730]">Reclamo</b>
                  <br />
                  Disconformidad relacionada a los productos o servicios.
                </span>
              </label>
              <label className={`flex-1 flex items-start gap-2.5 border rounded-xl px-4 py-3 cursor-pointer text-[13.5px] ${claimType === 'queja' ? 'border-[#4F3A96] bg-[#F3EEFF]' : 'border-gray-200'}`}>
                <input type="radio" name="claimType" value="queja" checked={claimType === 'queja'} onChange={() => setClaimType('queja')} className="mt-0.5 accent-[#4F3A96]" />
                <span>
                  <b className="text-[#1B1730]">Queja</b>
                  <br />
                  Disconformidad no relacionada a los productos o servicios; o malestar respecto a la atención.
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3.5">
              <div>
                <label htmlFor="detalle" className={labelClass}>Detalle *</label>
                <textarea id="detalle" name="detalle" required rows={4} value={form.detalle} onChange={handleChange} className={`${inputClass} resize-y`} />
              </div>
              <div>
                <label htmlFor="pedido" className={labelClass}>Pedido del consumidor *</label>
                <textarea id="pedido" name="pedido" required rows={3} value={form.pedido} onChange={handleChange} className={`${inputClass} resize-y`} />
              </div>
            </div>
          </fieldset>

          <div className="bg-[#FAFAFA] border border-gray-100 rounded-xl p-4">
            <p className="text-[13px] text-[#67637E] mb-1 font-bold">Observaciones y acciones adoptadas por el proveedor</p>
            <p className="text-[13px] text-[#9895ad] italic">Este campo será completado por POWIP tras recibir tu reclamo.</p>
          </div>

          <label className="flex items-start gap-2.5 text-[13.5px] text-[#3a3852] cursor-pointer">
            <input
              type="checkbox"
              checked={declaracion}
              onChange={(e) => setDeclaracion(e.target.checked)}
              required
              className="mt-0.5 w-4 h-4 accent-[#4F3A96]"
            />
            Declaro que la información consignada en el presente documento es verdadera. *
          </label>

          {error && (
            <p role="alert" className="text-[#EF4444] text-[13px] font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#4F3A96] hover:bg-[#3d2d75] disabled:opacity-60 transition-colors text-white font-bold text-base px-8 py-4 rounded-2xl"
          >
            {loading ? 'Enviando…' : `Enviar ${claimType === 'reclamo' ? 'reclamo' : 'queja'}`}
          </button>

          <p className="text-[12px] text-[#9895ad]">
            Conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571), POWIP dará respuesta a tu
            reclamo o queja en un plazo no mayor a treinta (30) días calendario.
          </p>
        </form>
      </div>
    </div>
  );
}
