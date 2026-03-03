const features = [
  {
    icon: '⚡',
    title: 'Live binnen 24 uur',
    description:
      'Wij zorgen dat jouw website binnen één werkdag live staat. Jij hoeft niets te doen.',
  },
  {
    icon: '🎨',
    title: 'Professioneel ontwerp',
    description:
      'Moderne templates die zijn ontworpen voor jouw vakgebied. Altijd up-to-date met de nieuwste trends.',
  },
  {
    icon: '📱',
    title: 'Mobiel geoptimaliseerd',
    description:
      'Jouw website ziet er op elk apparaat perfect uit. Smartphone, tablet of desktop.',
  },
  {
    icon: '🔍',
    title: 'SEO-vriendelijk',
    description:
      'Basisoptimalisaties voor zoekmachines inbegrepen. Zodat klanten jou kunnen vinden.',
  },
  {
    icon: '🔒',
    title: 'Veilig & snel',
    description:
      'SSL certificaat, snelle laadtijden en betrouwbare hosting zijn standaard inbegrepen.',
  },
  {
    icon: '✏️',
    title: 'Eenvoudig aanpasbaar',
    description:
      'Teksten en afbeeldingen kun je zelf aanpassen via een gebruiksvriendelijk CMS.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Alles wat je nodig hebt</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wij nemen alle technische zorgen van je over, zodat jij je kunt focussen op je werk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
