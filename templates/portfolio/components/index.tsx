const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Fotograaf';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@portfolio.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 00 00 00 00';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Ik ben een professionele fotograaf en visueel storyteller. Met een oog voor detail en een passie voor mensen vertel ik jouw verhaal in beeld.';

export function PortfolioNav() {
  return (
    <nav className="bg-white border-b border-gray-50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-gray-900 tracking-tight">{businessName}</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#portfolio" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Portfolio</a>
          <a href="#over-mij" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Over mij</a>
          <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export function PortfolioHero() {
  return (
    <section className="py-24 md:py-40 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-green-600 text-sm font-medium tracking-widest uppercase mb-4">Portfolio</p>
        <h1 className="text-6xl md:text-8xl font-light text-gray-900 tracking-tight mb-6">
          {businessName}
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">{description}</p>
      </div>
    </section>
  );
}

export function PortfolioGallery() {
  const items = [
    { title: 'Portret', size: 'tall', bg: 'bg-gray-200' },
    { title: 'Landschap', size: 'wide', bg: 'bg-gray-300' },
    { title: 'Architectuur', size: 'square', bg: 'bg-gray-400' },
    { title: 'Editorial', size: 'square', bg: 'bg-gray-200' },
    { title: 'Events', size: 'tall', bg: 'bg-gray-300' },
    { title: 'Product', size: 'wide', bg: 'bg-gray-400' },
  ];

  return (
    <section id="portfolio" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Selectie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
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
  );
}

export function PortfolioAbout() {
  return (
    <section id="over-mij" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:flex gap-16 items-center">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="w-48 h-48 md:w-full md:h-64 bg-gray-100 rounded-2xl" />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Over mij</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
}

export function PortfolioContact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-light mb-4">Samenwerken?</h2>
        <p className="text-gray-400 mb-8">Neem gerust contact op voor een vrijblijvend gesprek.</p>
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
  );
}

export function PortfolioFooter() {
  return (
    <footer className="bg-gray-950 text-gray-600 py-6 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
    </footer>
  );
}
