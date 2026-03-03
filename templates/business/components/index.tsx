const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Jouw Bedrijf';
const tagline = process.env.NEXT_PUBLIC_TAGLINE ?? 'Professionele dienstverlening voor uw succes';

export function BusinessNav() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">{businessName}</span>
        <div className="hidden md:flex items-center gap-6">
          <a href="#diensten" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Diensten</a>
          <a href="#over-mij" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Over mij</a>
          <a href="#contact" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export function BusinessHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{businessName}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{tagline}</p>
        <a
          href="#contact"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Neem contact op
        </a>
      </div>
    </section>
  );
}

export function BusinessServices() {
  const services = [
    {
      icon: '🎯',
      title: 'Strategie',
      description: 'Ik help je een duidelijke koers te bepalen voor duurzame groei.',
    },
    {
      icon: '💼',
      title: 'Advies',
      description: 'Praktisch advies op maat voor jouw specifieke uitdagingen.',
    },
    {
      icon: '🚀',
      title: 'Implementatie',
      description: 'Van plan naar praktijk. Ik begeleid het gehele proces.',
    },
  ];

  return (
    <section id="diensten" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Mijn diensten</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessAbout() {
  const description =
    process.env.NEXT_PUBLIC_DESCRIPTION ??
    'Met jarenlange ervaring help ik ondernemers en organisaties hun doelen te bereiken. Mijn aanpak is praktisch, resultaatgericht en altijd op maat.';

  return (
    <section id="over-mij" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Over mij</h2>
        <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

export function BusinessContact() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@jouwbedrijf.nl';
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 00 00 00 00';

  return (
    <section id="contact" className="py-20 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Neem contact op</h2>
        <p className="text-blue-100 text-lg mb-8">
          Benieuwd wat ik voor jou kan betekenen? Stuur een bericht of bel me op.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${email}`}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
          >
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function BusinessFooter() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Jouw Bedrijf';

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
    </footer>
  );
}
