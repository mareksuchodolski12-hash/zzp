import { PricingCard } from '@/components/marketing/pricing-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cennik',
  description: 'Przejrzyste ceny i jednorazowa inwestycja dla profesjonalnej strony internetowej.',
};

const plans = [
  {
    name: 'Rozrusznik',
    price: 299,
    description: 'Idealny start dla freelancerów, którzy chcą szybko ruszyć z profesjonalną stroną.',
    features: [
      'Profesjonalny szablon strony',
      'Konfiguracja własnej domeny',
      'Certyfikat SSL',
      'Do 5 podstron',
      'Formularz kontaktowy',
      'Podstawowe SEO',
      'Hosting na 1 rok',
    ],
    cta: 'Zamówienie',
    href: '/order?plan=starter',
    highlighted: false,
  },
  {
    name: 'Profesjonalny',
    price: 499,
    description: 'Najlepszy wybór dla marek osobistych, które chcą wyróżnić się jakością i efektem premium.',
    features: [
      'Wszystko z planu Rozrusznik',
      'Do 10 podstron',
      'Sekcja blog/portfolio',
      'Integracja Google Analytics',
      'Rozszerzone SEO',
      'Linki social media',
      'Priorytetowe wsparcie',
      'Hosting na 2 lata',
    ],
    cta: 'Zamówienie',
    href: '/order?plan=professional',
    highlighted: true,
    badge: 'Najpopularniejsze',
  },
  {
    name: 'Biznes',
    price: 799,
    description: 'Kompletny pakiet dla rozwijających się biznesów, które potrzebują pełnej elastyczności.',
    features: [
      'Wszystko z planu Profesjonalny',
      'Nielimitowane podstrony',
      'Formularz rezerwacji / intake',
      'Przycisk kontaktu WhatsApp',
      'Baner zgód cookies',
      'Konfiguracja Google My Business',
      'Własny adres e-mail',
      'Dedykowany opiekun',
    ],
    cta: 'Zamówienie',
    href: '/order?plan=business',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 motion-reduce:animate-none">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Przejrzyste ceny</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jednorazowa inwestycja. Bez ukrytych kosztów. Twoja strona internetowa uruchomiona w ciągu 24 godzin.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        <div className="text-center mt-14 md:mt-16 space-y-2 text-sm text-gray-600">
          <p>Wszystkie ceny zawierają 21% VAT</p>
          <p>Jednorazowa opłata — brak miesięcznych zobowiązań</p>
          <p>Hosting i domena w cenie</p>
        </div>
      </div>
    </section>
  );
}
