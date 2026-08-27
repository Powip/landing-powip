import React from 'react';

const STEPS = [
  { ic: '💳', title: 'Creas tu cuenta', desc: 'Activación inmediata desde aquí.' },
  { ic: '🎬', title: 'Accesos + video', desc: 'Tutorial para conocer POWIP.' },
  { ic: '🤝', title: 'Onboarding 1a1', desc: 'Reunión para entender tu negocio.' },
  { ic: '💬', title: 'Grupo WhatsApp', desc: 'Soporte exclusivo contigo.' },
  { ic: '📈', title: 'Feedback día 5', desc: 'Revisamos y optimizamos juntos.' },
  { ic: '🛡️', title: 'Soporte 24/7', desc: 'Siempre disponibles para crecer.' },
];

export default function PartnersSupport() {
  return (
    <section className="w-full py-24 px-6 md:px-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full">
              No estás solo
            </span>
            <h2 className="mt-4 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
              Activas tu cuenta y el soporte es{' '}
              <span className="bg-[#C5E6E8] px-2 rounded box-decoration-clone">24/7 uno a uno</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-3">Te acompañamos en cada paso para que tengas éxito desde el primer día</p>
          </div>
          <img
            src="/mascota-telefono.svg"
            alt=""
            aria-hidden="true"
            className="w-40 md:w-60 h-auto shrink-0"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mt-11">
          {STEPS.map((s, i) => (
            <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-[0_4px_18px_rgba(46,33,104,0.08)]">
              <div className="w-8 h-8 rounded-full bg-[#4F3A96] text-white font-extrabold flex items-center justify-center mx-auto mb-2.5 text-sm" aria-hidden="true">{i + 1}</div>
              <div className="text-2xl mb-2" aria-hidden="true">{s.ic}</div>
              <h4 className="text-[13.5px] font-bold text-[#3a2389] mb-1 tracking-tight">{s.title}</h4>
              <p className="text-[11.5px] text-gray-500 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
