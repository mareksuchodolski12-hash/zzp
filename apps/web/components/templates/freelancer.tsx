import { ArrowRight, CheckCircle2, Code2, Palette, Rocket } from 'lucide-react';

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Noah Studio';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@noahstudio.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 98 76 54 32';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Freelance designer-developer voor premium websites die er sterk uitzien en klanten opleveren.';

const showcaseImages = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=80',
];

export function FreelancerTemplate() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b12]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg tracking-tight">{businessName}</span>
          <div className="hidden md:flex items-center gap-7">
            <a href="#werk" className="text-gray-300 hover:text-white text-sm transition-colors">Cases</a>
            <a href="#services" className="text-gray-300 hover:text-white text-sm transition-colors">Services</a>
            <a href="#process" className="text-gray-300 hover:text-white text-sm transition-colors">Proces</a>
            <a href="#contact" className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Start project</a>
          </div>
        </div>
        <div className="md:hidden border-t border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            <a href="#werk" className="text-gray-300 hover:text-white transition-colors">Cases</a>
            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#process" className="text-gray-300 hover:text-white transition-colors">Proces</a>
            <a href="#contact" className="text-purple-300 font-semibold hover:text-purple-200 transition-colors">Start</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen bg-[#0b0b12] text-white flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-32 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-sm text-purple-300 mb-6">
              Premium freelancer website template
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">{businessName}</h1>
            <p className="text-xl text-gray-300 max-w-xl mb-4">{description}</p>
            <p className="text-gray-400 max-w-xl mb-10">Van strategie en branding tot livegang: alles gericht op meer kwalitatieve leads en een sterke eerste indruk.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Plan gratis call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#werk"
                className="inline-flex items-center justify-center border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors"
              >
                Bekijk cases
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
            <div
              className="h-72 md:h-[460px] bg-cover bg-center"
              style={{ backgroundImage: `url(${showcaseImages[0]})` }}
            />
          </div>
        </div>
      </section>

      <section id="werk" className="py-20 bg-[#0f1020] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Uitgelichte projecten</h2>
          <p className="text-gray-300 max-w-2xl mb-10">Voorbeelden van websites en digitale experiences die merken professioneler positioneren en conversie verhogen.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'SaaS Landing', category: 'Design + Development', image: showcaseImages[0] },
              { title: 'Consultancy Brand Site', category: 'Branding + UI', image: showcaseImages[1] },
              { title: 'E-commerce Refresh', category: 'UX + CRO', image: showcaseImages[2] },
              { title: 'Creator Portfolio', category: 'Visual Direction', image: showcaseImages[3] },
            ].map((project) => (
              <article key={project.title} className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 hover:border-purple-500/50 transition-colors">
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="p-5">
                  <p className="text-purple-300 text-sm mb-2">{project.category}</p>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#0b0b12] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Services met impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Palette,
                title: 'Brand & UI Design',
                description: 'Sterke visuele identiteit en strak UI-systeem dat vertrouwen opbouwt.',
              },
              {
                icon: Code2,
                title: 'Next.js Development',
                description: 'Snelle, schaalbare websites met nette codebase en SEO-basis.',
              },
              {
                icon: Rocket,
                title: 'Launch & Optimalisatie',
                description: 'Livegang, analytics en iteraties op basis van echte gebruikersdata.',
              },
            ].map((service) => (
              <article key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <service.icon className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 bg-[#0f1020] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Proces in 3 stappen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Intake', text: 'Doelen, doelgroep en positionering scherpstellen.' },
              { step: '02', title: 'Build', text: 'Design en development met wekelijkse feedbackrondes.' },
              { step: '03', title: 'Launch', text: 'Publicatie, meetpunten en doorontwikkeling.' },
            ].map((item) => (
              <article key={item.step} className="rounded-2xl border border-white/10 p-6">
                <p className="text-purple-300 font-semibold mb-3">{item.step}</p>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Klaar voor een website die verkoopt?</h2>
          <p className="text-gray-400 mb-8 text-lg">Je krijgt binnen 24 uur reactie met een concreet voorstel en planning.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${email}`}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              {phone}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            {['Snelle oplevering', 'Duidelijke communicatie', 'Resultaatgericht'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-900 py-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
}
