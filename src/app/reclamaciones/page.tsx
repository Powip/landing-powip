import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalHeader from '@/components/legal/LegalHeader';
import ReclamacionesForm from '@/components/legal/ReclamacionesForm';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description:
    'Libro de Reclamaciones virtual de POWIP Technology SAC, conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571).',
  alternates: { canonical: '/reclamaciones' },
};

export default function ReclamacionesPage() {
  return (
    <main className="min-h-screen font-inter bg-white w-full">
      <Navbar />

      <LegalHeader
        eyebrow="Atención al consumidor"
        title="Libro de Reclamaciones"
        subtitle="Formulario virtual conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571)"
        version="1.0"
        date="Vigente"
        intro={
          <>
            Este establecimiento cuenta con un Libro de Reclamaciones a disposición del consumidor. La
            formulación de un reclamo o queja no impide acudir a otras vías de resolución de controversias ni es
            un requisito previo para interponer una denuncia ante el INDECOPI.
          </>
        }
      />

      <ReclamacionesForm />

      <Footer />
    </main>
  );
}
