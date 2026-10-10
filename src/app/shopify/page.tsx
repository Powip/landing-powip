import type { Metadata } from 'next';
import Link from 'next/link';
import { PhoneCall, Truck, RefreshCw, Wallet, Boxes, ShieldCheck, Mail } from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { absolute: 'POWIP para Shopify' },
  description:
    'POWIP importa cada pedido de tu tienda, te ayuda a confirmarlo, lo asigna a Shalom, Olva o tu motorizado y devuelve el número de seguimiento a Shopify.',
  alternates: { canonical: '/shopify' },
  robots: { index: false },
};

const STEPS = [
  'Instala POWIP desde Shopify.',
  'Tus pedidos llegan solos a POWIP.',
  'Confirmas, despachas y el seguimiento vuelve a Shopify.',
];

const FEATURES = [
  { icon: PhoneCall, label: 'Confirmación de pedidos contra entrega' },
  { icon: Truck, label: 'Despacho a Shalom, Olva y moto propia' },
  { icon: RefreshCw, label: 'Seguimiento automático en Shopify' },
  { icon: Wallet, label: 'Liquidación de cobranzas por courier' },
  { icon: Boxes, label: 'Inventario sincronizado' },
];

const EYEBROW =
  'inline-block text-[#006B82] font-bold uppercase text-xs tracking-wide bg-[#E0F7FA] border border-[#80DEEA] px-3.5 py-1.5 rounded-full';
const CARD = 'bg-white border border-gray-100 rounded-2xl shadow-[0_4px_18px_rgba(46,33,104,0.08)]';
const LINK = 'text-[#4F3A96] font-semibold hover:underline';

export default function ShopifyPage() {
  return (
    <main className="min-h-screen bg-white w-full">
      <header className="w-full h-20 px-6 md:px-20 bg-white/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center sticky top-0 z-50 border-b border-gray-100">
        <Link href="/" aria-label="POWIP — ir al inicio" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm">
            <img src="/icon.jpeg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          </div>
          <span className="text-[#4F3A96] font-bold text-[28px] tracking-tight font-heading">POWIP</span>
        </Link>
      </header>

      <section className="w-full bg-gradient-to-b from-white to-[#F4F1FD] px-6 md:px-20 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className={EYEBROW}>POWIP para Shopify</span>
          <h1 className="mt-5 text-[#4F3A96] font-bold text-3xl md:text-5xl leading-tight tracking-tight">
            Tus pedidos contra entrega de Shopify, despachados sin Excel
          </h1>
          <p className="mt-5 text-[#4a4664] text-base md:text-lg leading-relaxed max-w-2xl">
            POWIP importa cada pedido de tu tienda, te ayuda a confirmarlo, lo asigna a Shalom, Olva o tu motorizado
            y devuelve el número de seguimiento a Shopify.
          </p>
          <button
            type="button"
            disabled
            aria-describedby="shopify-install-status"
            className="mt-8 inline-flex items-center gap-2 bg-[#4F3A96] text-white font-bold text-lg px-9 py-[18px] rounded-2xl opacity-60 cursor-not-allowed"
          >
            Instalar en Shopify
          </button>
          <p id="shopify-install-status" className="mt-3 text-[13.5px] text-[#67637E]">
            La instalación estará disponible cuando la app POWIP esté publicada en la Shopify App Store.
          </p>
        </div>
      </section>

      <section aria-labelledby="como-funciona" className="w-full px-6 md:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 id="como-funciona" className="text-center text-[#4F3A96] font-bold text-3xl md:text-4xl tracking-tight">
            Cómo funciona
          </h2>
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <li key={step} className={`${CARD} p-6`}>
                <span
                  className="w-10 h-10 rounded-xl bg-[#4F3A96] text-white font-bold flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="font-semibold text-[16px] text-[#1B1730] leading-snug">
                  <span className="sr-only">{i + 1}. </span>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="funciones" className="w-full px-6 md:px-20 py-20 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto">
          <h2 id="funciones" className="text-center text-[#4F3A96] font-bold text-3xl md:text-4xl tracking-tight">
            Funciones
          </h2>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <li key={feature.label} className={`${CARD} p-5 flex items-center gap-4`}>
                <span className="w-11 h-11 shrink-0 rounded-xl bg-[#F3EEFF] flex items-center justify-center" aria-hidden="true">
                  <feature.icon className="w-5 h-5 text-[#4F3A96]" />
                </span>
                <span className="font-semibold text-[15px] text-[#1B1730] leading-snug">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="precios" className="w-full px-6 md:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="precios" className="text-[#4F3A96] font-bold text-3xl md:text-4xl tracking-tight">
            Precios
          </h2>
          <div className="mt-8 rounded-[28px] bg-[#4F3A96] text-white px-6 py-10 md:px-12 shadow-[0_30px_80px_rgba(78,55,168,0.25)]">
            <p className="text-lg md:text-xl font-semibold leading-relaxed">
              Basic USD 29 · Standard USD 52 · Full USD 75 al mes. 14 días de prueba gratis. Se cobra en tu factura de
              Shopify.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <section className={`${CARD} p-7`} aria-labelledby="privacidad">
            <div className="w-11 h-11 rounded-xl bg-[#E0F7FA] flex items-center justify-center mb-4" aria-hidden="true">
              <ShieldCheck className="w-5 h-5 text-[#006B82]" />
            </div>
            <h2 id="privacidad" className="text-[#4F3A96] font-bold text-2xl tracking-tight">
              Privacidad
            </h2>
            <p className="mt-3 text-[#4a4664] text-[15px] leading-relaxed">
              Tus datos y los de tus compradores están protegidos. POWIP solo los usa para gestionar tus pedidos. Ver{' '}
              <Link href="/privacidad" className={LINK}>
                Política de privacidad
              </Link>
              .
            </p>
          </section>
          <section className={`${CARD} p-7`} aria-labelledby="soporte">
            <div className="w-11 h-11 rounded-xl bg-[#E0F7FA] flex items-center justify-center mb-4" aria-hidden="true">
              <Mail className="w-5 h-5 text-[#006B82]" />
            </div>
            <h2 id="soporte" className="text-[#4F3A96] font-bold text-2xl tracking-tight">
              Soporte
            </h2>
            <p className="mt-3 text-[#4a4664] text-[15px] leading-relaxed">
              <a href="mailto:hola@powip.lat" className={LINK}>
                hola@powip.lat
              </a>
              {' · '}
              <Link href="/preguntas-frecuentes" className={LINK}>
                Preguntas frecuentes
              </Link>
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
