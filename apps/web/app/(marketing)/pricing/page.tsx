import { PricingCard } from '@/components/marketing/pricing-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for every ZZP professional. Choose the plan that fits your needs.',
};

const plans = [
  {
    name: 'Starter',
    price: 299,
    description: 'Perfect for ZZP starters who need a clean online presence.',
    features: [
      'Professional website template',
      'Custom domain setup',
      'SSL certificate',
      '5 pages',
      'Contact form',
      'Basic SEO setup',
      '1 year hosting included',
    ],
    cta: 'Bestellen',
    href: '/order?plan=starter',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 499,
    description: 'For established professionals who want to stand out.',
    features: [
      'Everything in Starter',
      'Up to 10 pages',
      'Blog / portfolio section',
      'Google Analytics integration',
      'Advanced SEO setup',
      'Social media links',
      'Priority support',
      '2 years hosting included',
    ],
    cta: 'Meest populair',
    href: '/order?plan=professional',
    highlighted: true,
  },
  {
    name: 'Business',
    price: 799,
    description: 'Full-featured solution for growing freelance businesses.',
    features: [
      'Everything in Professional',
      'Unlimited pages',
      'Online booking / intake form',
      'WhatsApp chat button',
      'Cookie consent banner',
      'Google My Business setup',
      'Custom email address',
      'Dedicated account manager',
    ],
    cta: 'Bestellen',
    href: '/order?plan=business',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparante Prijzen</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Eenmalige investering. Geen verborgen kosten. Jouw website live binnen 24 uur.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        <p className="text-center text-gray-500 mt-12 text-sm">
          Alle prijzen zijn exclusief 21% BTW. Eenmalige kosten, geen maandelijkse verplichtingen.
        </p>
      </div>
    </section>
  );
}
