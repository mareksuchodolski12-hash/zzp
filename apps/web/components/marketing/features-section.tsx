import {
  Zap,
  Palette,
  Smartphone,
  Search,
  Shield,
  Edit,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Live binnen 48 uur',
    description:
      'Jouw website staat binnen 48 uur live via een strak deploymentproces en een gecontroleerde go-live.',
  },
  {
    icon: Palette,
    title: 'Professioneel ontwerp',
    description:
      'Een premium ontwerp, afgestemd op jouw vakgebied, met een heldere structuur en sterke conversiefocus.',
  },
  {
    icon: Smartphone,
    title: 'Mobiel geoptimaliseerd',
    description:
      'Volledig responsive op smartphone, tablet en desktop, met consistente prestaties op elk schermformaat.',
  },
  {
    icon: Search,
    title: 'SEO-vriendelijk',
    description:
      'Technische SEO-basis is standaard ingericht, zodat zoekmachines je website direct correct kunnen indexeren.',
  },
  {
    icon: Shield,
    title: 'Veilig & snel',
    description:
      'SSL, performance-optimalisatie en betrouwbare managed hosting zijn standaard onderdeel van de oplevering.',
  },
  {
    icon: Edit,
    title: 'Doorlopend beheerd',
    description:
      'Updates aan teksten en afbeeldingen worden uitgevoerd door ons technisch team, zonder dat jij een CMS nodig hebt.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Alles wat je nodig hebt</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wij nemen de volledige technische uitvoering uit handen, zodat jij je kunt focussen op groei en klanten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="text-blue-600 mb-4">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
