import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPartnerFromRef } from '@/data/partners';
import PartnersLanding from './PartnersLanding';

type SearchParams = { ref?: string | string[] };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { ref } = await searchParams;
  const refValue = Array.isArray(ref) ? ref[0] : ref;
  const partner = getPartnerFromRef(refValue);

  const title =
    partner.key === 'generico'
      ? 'POWIP × Partners — Ordena tu operación ecommerce'
      : `POWIP × ${partner.displayName} — Ordena tu operación ecommerce`;

  const description = partner.heroLead;

  return {
    title: { absolute: title },
    description,
    keywords: [
      'POWIP',
      partner.displayName,
      'ecommerce',
      'gestión de pedidos',
      'cobranza contraentrega',
      'courier',
      'WhatsApp',
      'ERP',
    ],
    alternates: {
      // Todas las variantes ?ref= apuntan a la misma URL canónica para no
      // diluir el SEO entre decenas de links de referidos distintos.
      canonical: '/partners',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: '/partners',
      siteName: 'POWIP',
      locale: 'es_PE',
      images: [
        {
          url: '/hero-image.jpeg',
          width: 1250,
          height: 770,
          alt: 'Panel de operaciones de POWIP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero-image.jpeg'],
    },
  };
}

export default function PartnersPage() {
  return (
    <Suspense fallback={null}>
      <PartnersLanding />
    </Suspense>
  );
}
