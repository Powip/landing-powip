import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen font-inter bg-white w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <ScrollReveal>
        <ProblemsSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <StepsSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <PricingSection />
      </ScrollReveal>

      <ScrollReveal>
        <IntegrationsSection />
      </ScrollReveal>

      <ScrollReveal>
        <BottomCTA />
      </ScrollReveal>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
