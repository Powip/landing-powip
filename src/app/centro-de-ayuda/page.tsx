import type { Metadata } from 'next';
import CentroAyudaApp from '@/components/centro-ayuda/CentroAyudaApp';

export const metadata: Metadata = {
  title: 'Centro de Ayuda',
  description:
    'Aprende a usar POWIP módulo por módulo: ventas, operaciones, productos, atención al cliente, finanzas e integraciones.',
  alternates: { canonical: '/centro-de-ayuda' },
};

export default function CentroDeAyudaPage() {
  return <CentroAyudaApp />;
}
