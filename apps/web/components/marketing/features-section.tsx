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
    title: 'SEO-klaar vanaf dag één',
    description:
      'Technische SEO-basis is standaard ingericht, zodat zoekmachines je website direct correct kunnen indexeren.',
  },
  {
    icon: Shield,
    title: 'Veilig, snel en stabiel',
    description:
      'SSL, performance-optimalisatie en betrouwbare managed hosting zijn standaard onderdeel van de oplevering.',
  },
  {
    icon: Edit,
    title: 'Volledige service zonder beheerlast',
    description:
      'Je hoeft niets zelf te beheren: teksten, foto’s en secties passen wij voor je aan op aanvraag.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Waarom kiezen voor WebsitePilot?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wij leveren een professionele website met complete uitvoering, zodat jij je volledig op klanten en werk kunt richten.
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
