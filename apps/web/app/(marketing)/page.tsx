import { HeroSection } from '@/components/marketing/hero-section';
import { ProcessSection } from '@/components/marketing/process-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { SimplePricingSection } from '@/components/marketing/simple-pricing-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CtaSection } from '@/components/marketing/cta-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZZP Website Platform | Professionele ZZP-websites zonder gedoe',
  description:
    'Professionele ZZP-website binnen 48 uur. Eén prijs, geen contracten en geen verborgen kosten.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SimplePricingSection />
      <ProcessSection />
      <FeaturesSection />
      <FaqSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
