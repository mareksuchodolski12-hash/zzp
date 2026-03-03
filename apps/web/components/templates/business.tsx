import { ArrowRight, CheckCircle2, Hammer, Home, ShieldCheck } from 'lucide-react';

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Bouwbedrijf Van Dijk';
const tagline = process.env.NEXT_PUBLIC_TAGLINE ?? 'Renovatie, afbouw en onderhoud voor woningen en bedrijfspanden';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Wij helpen particulieren en ondernemers met complete verbouwingen, strakke afwerking en duidelijke planning zonder verrassingen.';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'offerte@vandijkbouw.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 12 34 56 78';

const projectImages = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
];

export function BusinessTemplate() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 tracking-tight">{businessName}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#diensten" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Diensten</a>
            <a href="#projecten" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Projecten</a>
            <a href="#prijzen" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pakketten</a>
            <a href="#contact" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Vraag offerte aan</a>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-5">
              <ShieldCheck className="h-4 w-4" />
              4.9/5 beoordeling • 120+ opleveringen
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">{businessName}</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">{tagline}</p>
            <p className="text-base text-gray-600 mb-8 max-w-xl">{description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors"
              >
                Gratis intake plannen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projecten"
                className="inline-flex items-center justify-center border border-gray-300 text-gray-800 px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Bekijk recente projecten
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm bg-white">
            <div
              className="h-72 md:h-[420px] bg-cover bg-center"
              style={{ backgroundImage: `url(${projectImages[0]})` }}
            />
          </div>
        </div>
      </section>

      <section id="diensten" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Wat we voor je regelen</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Van eerste opname tot oplevering: één aanspreekpunt, vaste planning en afwerking die direct vertrouwen geeft aan jouw klanten of huurders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Hammer,
                title: 'Renovatie & verbouwing',
                description: 'Badkamer, keuken, zolder en complete woningrenovatie met heldere fasering.',
              },
              {
                icon: Home,
                title: 'Afbouw & afwerking',
                description: 'Stucwerk, schilderwerk, vloeren en montage voor een strakke oplevering.',
              },
              {
                icon: CheckCircle2,
                title: 'Onderhoud op contract',
                description: 'Periodiek onderhoud voor verhuurders, VvE en kleine zakelijke panden.',
              },
            ].map((service) => (
              <article key={service.title} className="rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
                <service.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projecten" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Recente opleveringen</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Echte situaties waarin verouderde ruimtes zijn omgezet naar moderne, verkoopklare en onderhoudsvriendelijke panden.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Complete woningrenovatie', city: 'Rotterdam', image: projectImages[0] },
              { title: 'Keuken + woonkamer update', city: 'Den Haag', image: projectImages[1] },
              { title: 'Badkamer en leidingwerk', city: 'Utrecht', image: projectImages[2] },
            ].map((project) => (
              <article key={project.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="p-5">
                  <p className="text-sm text-blue-700 font-semibold mb-2">{project.city}</p>
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="prijzen" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Duidelijke pakketten</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Kies de aanpak die past bij je pand, planning en budget.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basis',
                price: 'vanaf €1.950',
                features: ['Opname op locatie', 'Werkplanning in 3 fases', 'Afbouw van 1 ruimte'],
              },
              {
                name: 'Meest gekozen',
                price: 'vanaf €4.900',
                features: ['Complete verdieping', 'Materialen + montage', 'Projectbegeleiding en oplevercheck'],
              },
              {
                name: 'Totaalrenovatie',
                price: 'offerte op maat',
                features: ['Volledige verbouwing', 'Installatie- en afbouwcoördinatie', 'Vaste voortgangsupdates'],
              },
            ].map((plan) => (
              <article key={plan.name} className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-blue-700 mb-5">{plan.price}</p>
                <ul className="space-y-3 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Klaar om te starten met jouw project?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Binnen 24 uur reactie met heldere vervolgstappen en een realistische planning.
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

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
}
