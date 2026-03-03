import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CtaSection } from '@/components/marketing/cta-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZZP Website Platform | Ready-Made Websites for Self-Employed Professionals',
  description:
    'Launch your professional website in 24 hours. Beautiful templates for ZZP professionals. No coding needed.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
