import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DemoHeroForm from '@/components/demo/DemoHeroForm';
import DemoVideoSection from '@/components/demo/DemoVideoSection';

export const metadata: Metadata = {
  title: 'Agenda una demo',
  description:
    'Agenda una demo guiada de POWIP y descubre cómo centralizar tus pedidos de WhatsApp, Instagram, TikTok y web, y organizar tu despacho y cobranza contraentrega.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full flex flex-col">
      <Navbar />
      <DemoHeroForm />
      <DemoVideoSection />
      <Footer />
    </main>
  );
}
