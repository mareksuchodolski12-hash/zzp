import { Layout, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Layout,
    number: 1,
    title: 'Bestellen en intake',
    description: 'Je kiest je pakket, doet je aanvraag en deelt je bedrijfsgegevens, voorkeuren en voorbeelden.',
  },
  {
    icon: FileText,
    number: 2,
    title: 'Wij bouwen alles voor je',
    description: 'Ons team schrijft, ontwerpt en verwerkt content. Jij hoeft niets zelf te editen of beheren.',
  },
  {
    icon: CheckCircle,
    number: 3,
    title: 'Livegang binnen 48 uur',
    description: 'Na jouw akkoord zetten wij de website live, inclusief technische check, snelheid en basis SEO.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hoe werkt het?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Een strak proces zonder gedoe: jij levert input, wij doen de volledige uitvoering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${step.number * 75}ms` }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="inline-block text-sm font-bold text-gray-400 mb-3">Stap {step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line (desktop only) */}
                {step.number < 3 && (
                  <div className="hidden md:block absolute top-8 -right-8 w-16 h-1 bg-gradient-to-r from-blue-200 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
