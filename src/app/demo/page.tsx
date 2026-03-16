'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, X } from 'lucide-react';

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      setLoading(false);
      alert('Error de configuración: Las credenciales de Supabase no están configuradas correctamente.');
      return;
    }

    const { error } = await supabase
      .from('landing_leads')
      .insert([
        {
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message
        }
      ]);

    setLoading(false);

    if (error) {
      console.error('Error submitting lead:', error);
      alert('Hubo un error al enviar tus datos. Por favor, intenta de nuevo o contáctanos por WhatsApp.');
    } else {
      setShowSuccessModal(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        company: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <main className="min-h-screen font-inter bg-white w-full flex flex-col relative">
      <Navbar />
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-6 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={48} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[#3E308F] font-bold text-2xl">¡Gracias!</h3>
              <p className="text-gray-600 leading-relaxed">
                Hemos recibido tu solicitud. Nos pondremos en contacto pronto para coordinar tu demo.
              </p>
            </div>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#3E308F] hover:bg-[#322675] text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Form */}
      <section className="flex-1 w-full bg-[#3E308F] flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Column - Form Area */}
        <div className="flex-1 w-full max-w-2xl px-6 md:px-20 py-16 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-bold text-4xl md:text-[56px] leading-[1.1]">
              ¿Vendes por instagram,<br/>whatsapp, tiktok y web?
            </h1>
            <p className="text-[#D1C4E9] font-normal text-lg leading-relaxed">
              Agenda una demo guiada de Powip y descubre cómo organizar pedidos, envíos y pagos contraentrega.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-transparent">
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white font-semibold text-[13px]">Nombre</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane" 
                  required
                  className="h-11 rounded bg-white text-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white font-semibold text-[13px]">Apellido</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Smitherton" 
                  required
                  className="h-11 rounded bg-white text-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white font-semibold text-[13px]">Celular</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone" 
                  className="h-11 rounded bg-white text-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white font-semibold text-[13px]">Nombre de negocio</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="XXXXXXXXX" 
                  className="h-11 rounded bg-white text-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-white font-semibold text-[13px]">Dirección de correo electrónico</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@janesfakedomain.net" 
                required
                className="h-11 rounded bg-white text-gray-900 px-4 focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-white font-semibold text-[13px]">Tu mensaje</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Introduce tu pregunta o mensaje" 
                className="h-[100px] rounded bg-white text-gray-900 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#B2EBF2]" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="h-12 w-full bg-[#B2EBF2] hover:bg-[#9ddfe7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded text-[#473995] font-semibold text-[15px] mt-2"
            >
              {loading ? 'Enviando...' : 'Agendar demostración'}
            </button>

            <div className="flex flex-col gap-4 mt-2">
              <p className="text-white text-xs opacity-90 leading-relaxed">
                Demostración personalizada para negocios ecommerce en crecimiento. Duración: 20 minutos
              </p>
              <p className="text-white text-[11px] opacity-70 leading-relaxed">
                Al ingresar estás aceptando nuestras políticas de privacidad.
              </p>
            </div>

          </form>
        </div>

        {/* Right Column - Image */}
        <div className="hidden lg:flex flex-1 w-full h-full relative p-8 md:p-12 lg:p-16">
          <img 
            src="/demo-office-new.jpg" 
            alt="Operaciones de Powip en oficina" 
            className="w-full h-full object-cover rounded-[15%] shadow-2xl" 
          />
          <div className="absolute inset-0 bg-[#3E308F]/10 pointer-events-none rounded-[15%] m-8 md:m-12 lg:m-16" />
        </div>

      </section>

      <Footer />
    </main>
  );
}
