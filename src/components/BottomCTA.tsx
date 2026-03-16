import Link from 'next/link';

export default function BottomCTA() {
  return (
    <section className="w-full bg-[#4F3A96] py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="w-full max-w-[700px]">
        <h2 className="text-white font-bold text-3xl md:text-[40px] leading-tight text-center md:text-left">
          Empieza a ordenar tu ecommerce hoy. Deja excel, chats y procesos manuales
        </h2>
      </div>
      <div className="flex-shrink-0">
        <Link href="/demo" className="bg-white hover:bg-gray-100 transition-colors text-[#4F3A96] font-bold text-lg px-8 py-4 rounded-lg shadow-lg inline-block">
          SOLICITAR DEMO VIRTUAL
        </Link>
      </div>
    </section>
  );
}
