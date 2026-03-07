import { PricingCard } from '@/components/marketing/pricing-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prijzen',
  description: 'Transparante prijzen en eenmalige investering voor een professionele website.',
};

const plans = [
  {
    name: 'Starter',
    price: 690,
    description: 'Ideaal voor freelancers en zzp-professionals die snel online willen gaan.',
    features: [
      'Professioneel template design',
      'Eigen domeinnaam configuratie',
      'SSL-certificaat',
      'Tot 5 pagina\'s',
      'Contactformulier',
      'Basis-SEO optimalisatie',
      'Hosting inbegrepen',
    ],
    cta: 'Bestel nu',
    href: '/order?plan=starter',
    highlighted: false,
  },
  {
    name: 'Business',
    price: 1290,
    description: 'De beste keuze voor groeibedrijven die premium design en volledige service willen.',
    features: [
      'Alles uit Starter',
      'Tot 10 pagina\'s',
      'Portfolio/work-sectie',
      'Google Analytics integratie',
      'Geavanceerde SEO setup',
      'Social media links',
      'Prioriteaire ondersteuning',
      'Hosting inbegrepen',
    ],
    cta: 'Bestel nu',
    href: '/order?plan=professional',
    highlighted: true,
    badge: 'Meest gekozen',
  },
  {
    name: 'Enterprise',
    price: 1990,
    description: 'Compleet pakket voor professionele bedrijven met geavanceerde functies en ondersteuning.',
    features: [
      'Alles uit Business',
      'Onbeperkte pagina\'s',
      'Reserverings- en intakeformulier',
      'WhatsApp contact-knop',
      'Cookie-consentbeheer',
      'Google My Business setup',
      'Eigen bedrijfsemailadres',
      'Dedicated accountmanager',
    ],
    cta: 'Bestel nu',
    href: '/order?plan=business',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 motion-reduce:animate-none">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Transparante prijzen</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Eenmalige investering. Geen verborgen kosten. Je website live binnen 48 uur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        <div className="text-center mt-14 md:mt-16 space-y-2 text-sm text-gray-600">
          <p>Alle prijzen inclusief 21% btw</p>
          <p>Eenmalige betaling — geen maandelijkse verplichting</p>
          <p>Hosting en domein inbegrepen</p>
        </div>
      </div>
    </section>
  );
}
