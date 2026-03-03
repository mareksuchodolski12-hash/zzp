import { ArrowRight, CheckCircle2, Flower2, Leaf, MapPin } from 'lucide-react';

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'GroenMeester Hovenier';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@groenmeester.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 00 00 00 00';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Hovenier zzp voor hoogwaardige tuinrenovatie, onderhoud en buitenservice met strakke planning en zichtbaar resultaat.';

const gallery = [
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
];

export function PortfolioTemplate() {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900 tracking-tight">{businessName}</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Realisaties</a>
            <a href="#pakketten" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pakketten</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <section className="py-20 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 mb-5">
              <Leaf className="h-4 w-4" />
              Seizoensplanning voorjaar/zomer 2026
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">{businessName}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-4">{description}</p>
            <p className="text-gray-600 mb-8 max-w-xl">Voor particuliere en zakelijke tuinen: van slim ontwerp tot onderhoudsroutes die jouw buitenruimte het hele jaar representatief houden.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Vraag een tuincheck aan
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center border border-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Bekijk realisaties
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <div
              className="h-72 md:h-[420px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gallery[0]})` }}
            />
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Recent tuinwerk</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">Een professionele impressie van onderhoud, renovatie en complete buitenprojecten voor woningen, VvE en kantoorlocaties.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Modern stadsterras', subtitle: 'Utrecht', image: gallery[0] },
              { title: 'Volledige tuinrenovatie', subtitle: 'Den Haag', image: gallery[1] },
              { title: 'Seizoensonderhoud VvE', subtitle: 'Rotterdam', image: gallery[2] },
              { title: 'Groene kantoorentree', subtitle: 'Amsterdam', image: gallery[3] },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="h-60 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="p-5">
                  <p className="text-green-700 text-sm font-semibold mb-2">{item.subtitle}</p>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pakketten" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Pakketten voor ieder type tuin</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">Duidelijke afspraken, vaste momenten en werk dat zichtbaar resultaat oplevert.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Onderhoud Basis',
                price: 'vanaf €145 / maand',
                list: ['Snoei- en onderhoudsrondes', 'Onkruidbeheer', 'Seizoensadvies'],
              },
              {
                name: 'Renovatie Plus',
                price: 'vanaf €2.750',
                list: ['Herinrichting borders', 'Nieuwe beplanting', 'Materiaal- en uitvoeringsplan'],
              },
              {
                name: 'Buitenservice Pro',
                price: 'offerte op maat',
                list: ['Zakelijke locaties', 'Vaste onderhoudskalender', 'Spoedservice bij uitval'],
              },
            ].map((plan) => (
              <article key={plan.name} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-green-700 mb-5">{plan.price}</p>
                <ul className="space-y-3 text-gray-600">
                  {plan.list.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beschikbaar in Randstad + Utrecht</h2>
          <p className="text-gray-300 mb-8">Snelle intake voor particuliere en zakelijke aanvragen. Je ontvangt binnen 24 uur een voorstel.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={`mailto:${email}`}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors"
            >
              {phone}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-300">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-green-400" /> Amsterdam</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-green-400" /> Rotterdam</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-green-400" /> Utrecht</span>
            <span className="inline-flex items-center gap-2"><Flower2 className="h-4 w-4 text-green-400" /> Seizoensservice</span>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-600 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
}
