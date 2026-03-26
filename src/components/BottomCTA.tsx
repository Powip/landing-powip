import Link from 'next/link';

export default function BottomCTA() {
  return (
    <section className="w-full bg-[#4F3A96] py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="w-full max-w-[700px]">
        <h2 className="text-white font-bold text-3xl md:text-[40px] leading-tight text-center md:text-left">
          Empieza a ordenar tu ecommerce hoy. <span className="text-[#C5E6E8]">Deja excel, chats y procesos manuales</span>
        </h2>
      </div>
      <div className="flex-shrink-0 flex flex-col gap-4 text-center md:text-left items-center md:items-start">
        <Link href="/demo" className="bg-white hover:bg-gray-100 transition-colors text-[#4F3A96] font-bold text-lg px-8 py-4 rounded-lg shadow-lg inline-block">
          Agenda tu demo AHORA
        </Link>
        <p className="text-white text-sm max-w-[300px] leading-snug">
          Demostración personalizada para negocios ecommerce en crecimiento. <br />
          Duración 20 minutos
        </p>
      </div>
    </section>
  );
}
