'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Hoe werkt levering binnen 48 uur?',
    answer:
      'Na je bestelling starten we direct met intake, opbouw en afwerking. Binnen 48 uur leveren we je website live op, inclusief technische controle.',
  },
  {
    question: 'Moet ik zelf iets beheren of aanpassen?',
    answer:
      'Nee. Je hoeft geen technische tools te gebruiken. Je geeft wijzigingen door en wij voeren die voor je uit.',
  },
  {
    question: 'Zijn er contracten of verborgen kosten?',
    answer:
      'Nee. Je betaalt één vaste prijs voor oplevering. Geen verplichte langlopende contracten en geen verborgen kosten.',
  },
  {
    question: 'Kan ik na livegang nog teksten en foto’s laten aanpassen?',
    answer:
      'Ja. Stuur je gewenste wijzigingen door en ons team verwerkt die professioneel en snel voor je.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Veelgestelde vragen</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Heldere antwoorden over oplevering, prijs en service.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
