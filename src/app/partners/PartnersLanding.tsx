'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { getPartnerFromRef } from '@/data/partners';

import ScrollReveal from '@/components/ScrollReveal';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

import PartnersRibbon from '@/components/partners/PartnersRibbon';
import PartnersNavbar from '@/components/partners/PartnersNavbar';
import PartnersHero from '@/components/partners/PartnersHero';
import PartnersMarquee from '@/components/partners/PartnersMarquee';
import PartnersStats from '@/components/partners/PartnersStats';
import PartnersHandoff from '@/components/partners/PartnersHandoff';
import PartnersProblem from '@/components/partners/PartnersProblem';
import PartnersFeature from '@/components/partners/PartnersFeature';
import PartnersBento from '@/components/partners/PartnersBento';
import PartnersSteps from '@/components/partners/PartnersSteps';
import PartnersTestimonial from '@/components/partners/PartnersTestimonial';
import PartnersPricing from '@/components/partners/PartnersPricing';
import PartnersSupport from '@/components/partners/PartnersSupport';
import PartnersFinalCTA from '@/components/partners/PartnersFinalCTA';
import PartnersStickyBar from '@/components/partners/PartnersStickyBar';

export default function PartnersLanding() {
  const searchParams = useSearchParams();
  const partner = getPartnerFromRef(searchParams.get('ref'));
  const signupHref = `https://www.powip.tech/login?ref=${partner.key}`;

  return (
    <div className="min-h-screen font-inter bg-white w-full overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <header>
        <PartnersRibbon partner={partner} />
        <PartnersNavbar signupHref={signupHref} />
      </header>

      <main id="main-content">
        <PartnersHero partner={partner} signupHref={signupHref} />
        <PartnersMarquee partner={partner} />
        <PartnersStats />

        <ScrollReveal>
          <PartnersHandoff partner={partner} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersProblem partner={partner} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersFeature />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersBento />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersSteps partner={partner} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersTestimonial />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PartnersPricing partner={partner} signupHref={signupHref} />
        </ScrollReveal>

        <ScrollReveal>
          <PartnersSupport />
        </ScrollReveal>

        <ScrollReveal>
          <PartnersFinalCTA partner={partner} signupHref={signupHref} />
        </ScrollReveal>
      </main>

      <Footer />
      <WhatsAppButton />
      <PartnersStickyBar partner={partner} signupHref={signupHref} />
    </div>
  );
}
