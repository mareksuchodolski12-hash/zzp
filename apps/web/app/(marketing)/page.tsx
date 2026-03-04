import { HeroSection } from '@/components/marketing/hero-section';
import { ProcessSection } from '@/components/marketing/process-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { CustomizationSection } from '@/components/marketing/customization-section';
import { SimplePricingSection } from '@/components/marketing/simple-pricing-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CtaSection } from '@/components/marketing/cta-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WebsitePilot.nl | Professionele website in 48 uur, volledig geregeld',
  description:
    'Website laten maken in 48 uur met volledige service. Geen contracten, geen verborgen kosten, één vaste prijs en professionele oplevering.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <FeaturesSection />
      <CustomizationSection />
      <SimplePricingSection />
      <FaqSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
