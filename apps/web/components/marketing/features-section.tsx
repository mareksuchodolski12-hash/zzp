import {
  Zap,
  Palette,
  Smartphone,
  Search,
  Shield,
  Edit,
} from 'lucide-react';

const gradients = {
  0: { gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-50 to-orange-50' },
  1: { gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-50 to-indigo-50' },
  2: { gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-50 to-blue-50' },
  3: { gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-50 to-teal-50' },
  4: { gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-50 to-violet-50' },
  5: { gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-50 to-rose-50' },
};

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
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = gradients[index as keyof typeof gradients];
            return (
              <div
                key={feature.title}
                className={`p-6 rounded-xl border border-gray-200 bg-gradient-to-br ${colors.bgGradient} hover:shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 bg-gradient-to-br ${colors.gradient}`}>
                  <IconComponent size={24} strokeWidth={2} />
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
