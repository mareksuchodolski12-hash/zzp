const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'GroenMeester Hovenier';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@groenmeester.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 00 00 00 00';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Hovenier zzp en tuinman zzp voor strak tuinonderhoud, slimme tuinrenovatie en complete buitenservice in Nederland.';

export function PortfolioTemplate() {
  return (
    <>
      <nav className="bg-white border-b border-gray-50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900 tracking-tight">{businessName}</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Realisaties</a>
            <a href="#over-mij" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pakketten</a>
            <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Servicegebied</a>
          </div>
        </div>
      </nav>

      <section className="py-24 md:py-44 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-green-600 text-sm font-semibold tracking-[0.18em] uppercase mb-5">Seizoensplanning voorjaar 2026</p>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 tracking-tight mb-6 leading-tight">
            {businessName}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{description}</p>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 text-center">Galerie van recente tuinprojecten</h2>
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12">Praktische voorbeelden van landscaping zzp: van moderne stadstuinen tot complete tuinrenovatie en onderhoud van bedrijfstuinen.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Voorjaar: gazonherstel & snoeiwerk', size: 'tall', bg: 'bg-gray-200' },
              { title: 'Tuinrenovatie met keramische tegels', size: 'wide', bg: 'bg-gray-300' },
              { title: 'Buitenservice voor VvE binnentuin', size: 'square', bg: 'bg-gray-400' },
              { title: 'Onderhoudsvrij bordersysteem', size: 'square', bg: 'bg-gray-200' },
              { title: 'Landscaping zzp voor nieuwbouw', size: 'tall', bg: 'bg-gray-300' },
              { title: 'Seizoensonderhoud voor zakelijke tuin', size: 'wide', bg: 'bg-gray-400' },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} rounded-lg overflow-hidden ${
                  item.size === 'tall' ? 'row-span-2 h-80' : 'h-40'
                } flex items-end p-4 group hover:opacity-90 transition-opacity cursor-pointer`}
              >
                <span className="text-gray-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="over-mij" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:flex gap-16 items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="w-48 h-48 md:w-full md:h-64 bg-gray-100 rounded-2xl" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Pakketten voor tuinonderhoud en renovatie</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Kies een pakket dat past bij je tuin en planning. Elk pakket is ontwikkeld voor hovenier zzp opdrachten in Nederland met duidelijke vaste afspraken.</p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Basis Onderhoud</strong> — periodiek tuinonderhoud, snoeiwerk en onkruidbeheer.</li>
              <li><strong>Renovatie Plus</strong> — complete tuinrenovatie met beplantingsplan en materiaaladvies.</li>
              <li><strong>Buitenservice Pro</strong> — doorlopende buitenservice voor particulieren en zakelijke locaties.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light mb-4">Servicegebied: Noord- en Zuid-Holland + Utrecht</h2>
          <p className="text-gray-400 mb-8">Actief als tuinman zzp in Randstad voor snelle intake, seizoenswerk en vaste onderhoudsroutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${email}`}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:text-white transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-600 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
}
