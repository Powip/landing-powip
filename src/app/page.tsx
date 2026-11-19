import Navbar from "@/components/Navbar";
import ProblemsSection from "@/components/ProblemsSection";
import PricingSection from "@/components/PricingSection";
import BottomCTA from "@/components/BottomCTA";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";

import LandingHeroVideo from "@/components/landing/LandingHeroVideo";
import LandingMarquee from "@/components/landing/LandingMarquee";
import LandingChange from "@/components/landing/LandingChange";
import LandingProof from "@/components/landing/LandingProof";
import LandingStatsBand from "@/components/landing/LandingStatsBand";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingMore from "@/components/landing/LandingMore";
import LandingSegments from "@/components/landing/LandingSegments";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingDemoStickyBar from "@/components/landing/LandingDemoStickyBar";

export default function Home() {
  return (
    <div className="min-h-screen font-inter bg-white w-full overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <header>
        <Navbar />
      </header>

      <main id="main-content">
        <LandingHeroVideo />
        <LandingMarquee />

        <ScrollReveal>
          <ProblemsSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingChange />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingProof />
        </ScrollReveal>

        <ScrollReveal>
          <LandingStatsBand />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingHowItWorks />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingMore />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <LandingSegments />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <PricingSection />
        </ScrollReveal>

        <ScrollReveal>
          <LandingFAQ />
        </ScrollReveal>

        <ScrollReveal>
          <BottomCTA />
        </ScrollReveal>
      </main>

      <LandingFooter />
      <WhatsAppButton />
      <LandingDemoStickyBar />
    </div>
  );
}
