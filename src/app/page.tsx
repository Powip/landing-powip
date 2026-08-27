import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";

import LandingRibbon from "@/components/landing/LandingRibbon";
import LandingMarquee from "@/components/landing/LandingMarquee";
import LandingPersonas from "@/components/landing/LandingPersonas";
import LandingEcosystem from "@/components/landing/LandingEcosystem";
import LandingFeatureRows from "@/components/landing/LandingFeatureRows";
import LandingStatsBand from "@/components/landing/LandingStatsBand";
import LandingBento from "@/components/landing/LandingBento";
import LandingIntegrationsGrid from "@/components/landing/LandingIntegrationsGrid";
import LandingVideo from "@/components/landing/LandingVideo";
import LandingCompare from "@/components/landing/LandingCompare";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingDemoTeaser from "@/components/landing/LandingDemoTeaser";
import LandingDemoStickyBar from "@/components/landing/LandingDemoStickyBar";

export default function Home() {
  return (
    <div className="min-h-screen font-inter bg-white w-full overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <header>
        <LandingRibbon />
        <Navbar />
      </header>

      <main id="main-content">
        <HeroSection />
        <LandingMarquee />

        <ScrollReveal>
          <ProblemsSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingPersonas />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingEcosystem />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingFeatureRows />
        </ScrollReveal>

        <ScrollReveal>
          <LandingStatsBand />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingBento />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingIntegrationsGrid />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <StepsSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <TestimonialsSection />
        </ScrollReveal>

        <ScrollReveal>
          <LandingVideo />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PricingSection />
        </ScrollReveal>

        <ScrollReveal>
          <LandingCompare />
        </ScrollReveal>

        <ScrollReveal>
          <LandingFAQ />
        </ScrollReveal>

        <ScrollReveal>
          <LandingDemoTeaser />
        </ScrollReveal>

        <ScrollReveal>
          <BottomCTA />
        </ScrollReveal>
      </main>

      <Footer />
      <WhatsAppButton />
      <LandingDemoStickyBar />
    </div>
  );
}
