import React from 'react';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProblemsSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 px-6 md:px-20 gap-16 bg-[#FAFAFA]">

      {/* Title */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
          El 80% de los negocios
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            ecommerce
          </h2>
          <div className="bg-[#C5E6E8] px-4 py-1 rounded">
            <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
              pierden dinero por
            </h2>
          </div>
        </div>
        <div className="bg-[#C5E6E8] px-4 py-1 rounded">
          <h2 className="text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight">
            pedidos mal gestionados
          </h2>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {/* Card 1 */}
        <div className="bg-[#F0F7F7] p-4 rounded-2xl w-full max-w-[340px] flex flex-col gap-6">
          <div className="w-full h-[260px] bg-white rounded-lg overflow-hidden border border-gray-100">
            <img src="/problems-card1.png" alt="Vendedora usando Powip en su laptop" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[#4F3A96] font-bold text-lg text-center">
              ¿Tus pedidos se pierden entre los chats?
            </h3>
            <p className="text-[#316560] font-medium text-[13px] leading-snug text-center px-2">
              Vendes por WhatsApp, Instagram o Facebook, pero cuando llegan muchos mensajes:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Se pierden pedidos</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">No sabes quien ya pagó</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Te escriben otra vez preguntando por su pedido</span>
              </li>
            </ul>
            <p className="text-[#4B9A94] font-semibold text-[10px] whitespace-pre-line">
              {"Tu negocio crece...\npero tu operación es un caos."}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F0F7F7] p-4 rounded-2xl w-full max-w-[340px] flex flex-col gap-6">
          <div className="w-full h-[260px] bg-white rounded-lg overflow-hidden border border-gray-100">
            <img src="/problems-card2.png" alt="Dashboard de ventas pendientes en Powip" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[#4F3A96] font-bold text-lg text-center">
              ¿Sigues gestionando tus pedidos en Excel?
            </h3>
            <p className="text-[#316560] font-medium text-[13px] leading-snug text-center px-2">
              Cada venta COD termina en una hoja de cálculo:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Alguien borra una celda</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Se duplican pedidos</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">No sabes qué pedidos ya se entregaron</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">El courier te pide la guía urgente</span>
              </li>
            </ul>
            <p className="text-[#4B9A94] font-semibold text-[10px] whitespace-pre-line">
              {"Un error en excel.\ny perdemos dinero o clientes."}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F0F7F7] p-4 rounded-2xl w-full max-w-[340px] flex flex-col gap-6">
          <div className="w-full h-[260px] bg-white rounded-lg overflow-hidden border border-gray-100">
            <img src="/problems-card3.png" alt="Preparando pedidos de TikTok Live" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[#4F3A96] font-bold text-lg text-center">
              ¿Vendes por TikTok Live y los pedidos se vuelven un caos?
            </h3>
            <p className="text-[#316560] font-medium text-[13px] leading-snug text-center px-2">
              Mientras haces el live :
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Los clientes escriben por WhatsApp</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Faltan direcciones</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">No sabes que pedidos confirmar</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-[#4B9A94]" />
                <span className="text-[#333333] text-xs">Pierdes ventas por el desorden</span>
              </li>
            </ul>
            <p className="text-[#4B9A94] font-semibold text-[10px] whitespace-pre-line">
              {"Vendiste mucho...\npero ahora no sabes cómo procesarlo."}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center pt-8">
        <Link href="https://www.powip.tech/login" className="bg-[#4F3A96] hover:bg-[#3d2d75] transition-colors text-white font-semibold text-lg px-12 py-4 rounded-lg">
          Empieza a usar Powip
        </Link>
      </div>

    </section>
  );
}
