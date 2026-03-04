import { CheckCircle2, Palette, ImageIcon, Type, LayoutPanelTop } from 'lucide-react';

const items = [
  {
    icon: Type,
    title: 'Teksten en koppen',
    description: 'Aanpassen van titels, beschrijvingen, diensten en call-to-actions op basis van jouw aanbod.',
  },
  {
    icon: ImageIcon,
    title: 'Foto’s en visuals',
    description: 'Vervangen of optimaliseren van afbeeldingen zodat je website professioneel en betrouwbaar oogt.',
  },
  {
    icon: Palette,
    title: 'Kleuren en stijl',
    description: 'Afstemmen van kleurgebruik en uitstraling op jouw merk, doelgroep en branche.',
  },
  {
    icon: LayoutPanelTop,
    title: 'Secties en opbouw',
    description: 'Secties toevoegen, verplaatsen of verwijderen zodat de pagina perfect aansluit bij jouw bedrijf.',
  },
];

export function CustomizationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Wat kun je laten aanpassen?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alles wat belangrijk is voor jouw bedrijf. Jij geeft door wat je wilt wijzigen, wij voeren het professioneel voor je uit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-3 mb-4">
                  <Icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Geen technische tooling nodig: alle wijzigingen lopen via ons team.
        </p>
      </div>
    </section>
  );
}
