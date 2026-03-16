'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "51923101193";
  const message = "Hola, estoy interesado/a en una demo gratuita de Powip";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 bg-white text-[#333] py-2 px-4 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
        ¿Te ayudamos?
      </span>
    </a>
  );
}
