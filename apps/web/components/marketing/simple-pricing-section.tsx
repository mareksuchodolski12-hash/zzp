import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PricingPlan = {
  name: string;
  badge?: string;
  price: string;
  monthly: string;
  support: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    badge: 'Voor snelle online aanwezigheid',
    price: '€690',
    monthly: 'Vanaf €69 / maand',
    support: 'Betaling in termijnen tot 12 maanden mogelijk',
    features: [
      'Maatwerk ontwerp voor jouw branche',
      'One-page of compacte bedrijfswebsite',
      'Supersnelle, schone code',
      'Mobiel geoptimaliseerd',
      'Basis technische SEO',
      'Contactformulier en duidelijke CTA\'s',
      'Hosting, SSL en livegang inbegrepen',
      '1 correctieronde',
      'Oplevering in 48-72 uur',
    ],
    cta: 'Start met Starter',
    href: '/order?plan=starter',
  },
  {
    name: 'Business',
    badge: 'Meest gekozen',
    price: '€1290',
    monthly: 'Vanaf €119 / maand',
    support: 'Betaling in termijnen tot 12 maanden mogelijk',
    features: [
      'Alles uit Starter',
      'Sterkere verkoopstructuur en conversiegerichte opbouw',
      'Meerdere secties of aparte serviceblokken',
      'Snellere performance en betere Core Web Vitals',
      'Uitgebreidere technische SEO basis',
      'Reviews, FAQ en trust-secties',
      'Analytics / tracking integratie',
      '2 tot 3 correctierondes',
      'Prioritaire oplevering',
      '14 dagen ondersteuning na livegang',
    ],
    cta: 'Kies Business',
    href: '/order?plan=business',
    highlighted: true,
  },
];

const trustHighlights = [
  'Geen WordPress-rommel',
  'Volledig door ons gebouwd',
  'Snel live',
  'Betalen in termijnen mogelijk',
];

const paymentOptions = [
  {
    plan: 'Starter',
    options: ['Eenmalig: €690', '3 termijnen van €239', '6 termijnen van €119', '12 termijnen van €69'],
  },
  {
    plan: 'Business',
    options: ['Eenmalig: €1290', '3 termijnen van €439', '6 termijnen van €224', '12 termijnen van €119'],
  },
];

const faqs = [
  {
    question: 'Wat is inbegrepen in de prijs?',
    answer:
      'Alles wat nodig is om professioneel live te gaan: ontwerp, ontwikkeling, hosting, SSL, technische basis en ondersteuning bij oplevering.',
  },
  {
    question: 'Hoe werkt betaling in termijnen?',
    answer:
      'Je kunt kiezen voor gespreide betaling tot 12 maanden. De maandprijs hangt af van het gekozen pakket.',
  },
  {
    question: 'Hoe snel kan mijn website live?',
    answer:
      'Starter meestal binnen 48-72 uur. Business afhankelijk van de inhoud en feedback, maar altijd snel ingepland.',
  },
];

export function SimplePricingSection() {
  return (
    <section id="sociale-bewijzen" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kies het pakket dat past bij jouw bedrijf</h2>
          <p className="text-lg md:text-xl text-gray-700">
            Snelle, technisch sterke websites - volledig door ons gebouwd, geoptimaliseerd en live gezet. Ook betalen
            in termijnen mogelijk tot 12 maanden.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={[
                'relative rounded-2xl bg-white border p-7 md:p-9 shadow-md flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500',
                plan.highlighted
                  ? 'border-blue-300 shadow-xl ring-1 ring-blue-200 lg:-translate-y-1'
                  : 'border-blue-100',
              ].join(' ')}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {plan.badge ? (
                <span
                  className={[
                    'mb-5 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold border',
                    plan.highlighted
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-blue-50 text-blue-700 border-blue-200',
                  ].join(' ')}
                >
                  {plan.badge}
                </span>
              ) : null}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                <p className="text-5xl font-bold text-gray-900 leading-none">{plan.price}</p>
                <p className="text-lg font-semibold text-blue-700 mt-3">{plan.monthly}</p>
                <p className="text-sm text-gray-600 mt-2">{plan.support}</p>
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  size="lg"
                  className={['w-full text-base group', plan.highlighted ? 'shadow-lg hover:shadow-xl' : ''].join(
                    ' ',
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <p className="text-xs text-gray-500 mt-3">Geen verborgen kosten. Duidelijke oplevering en nazorg.</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white/90 p-4 md:p-5">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {trustHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-sm md:text-base text-gray-700 mt-5">
          Geen verborgen kosten. Geen technische rompslomp. Gewoon een snelle, professionele website die werkt.
        </p>

        <div className="mt-14 grid grid-cols-1 xl:grid-cols-5 gap-6 xl:gap-8 items-stretch">
          <article className="xl:col-span-3 rounded-2xl bg-white border border-blue-100 p-7 md:p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Betaalbaar starten, zonder in te leveren op kwaliteit</h3>
            <p className="text-gray-700 leading-relaxed">
              Je kunt jouw website ook gespreid betalen. Zo kun je snel online gaan zonder direct het volledige bedrag
              vooraf te betalen. Termijnen tot 12 maanden zijn mogelijk, afhankelijk van het pakket.
            </p>
          </article>

          <article className="xl:col-span-2 rounded-2xl bg-white border border-blue-100 p-7 md:p-8 shadow-md">
            <h3 className="text-lg font-semibold tracking-wide text-gray-900 uppercase mb-4">Betaalopties</h3>
            <div className="space-y-5">
              {paymentOptions.map((plan) => (
                <div key={plan.plan}>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{plan.plan}</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {plan.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-gray-500">Eenmalige betaling is het voordeligst.</p>
          </article>
        </div>

        <div className="mt-14">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Veelgestelde vragen over pakketten en betaling</h3>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
