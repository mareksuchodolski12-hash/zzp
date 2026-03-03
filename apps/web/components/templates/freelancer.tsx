const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Freelancer';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@freelancer.nl';
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+31 6 00 00 00 00';
const description =
  process.env.NEXT_PUBLIC_DESCRIPTION ??
  'Ik ben een creatieve freelancer gespecialiseerd in design en development. Ik help jou met het realiseren van jouw digitale projecten.';

export function FreelancerTemplate() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">{businessName}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#werk" className="text-gray-300 hover:text-white text-sm transition-colors">Werk</a>
            <a href="#skills" className="text-gray-300 hover:text-white text-sm transition-colors">Skills</a>
            <a href="#contact" className="border border-white text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors">Samenwerken?</a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen bg-black text-white flex items-center">
        <div className="max-w-5xl mx-auto px-4 py-32">
          <p className="text-purple-400 font-mono text-sm mb-4">Hoi, ik ben</p>
          <h1 className="text-6xl md:text-8xl font-black mb-6">{businessName}</h1>
          <p className="text-xl text-gray-400 max-w-lg mb-10">{description}</p>
          <div className="flex gap-4">
            <a
              href="#werk"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Bekijk mijn werk
            </a>
            <a
              href="#contact"
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="werk" className="py-20 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Selectie van werk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Project Alpha', category: 'Web Design', color: 'bg-purple-900' },
              { title: 'Project Beta', category: 'Branding', color: 'bg-indigo-900' },
              { title: 'Project Gamma', category: 'Development', color: 'bg-blue-900' },
              { title: 'Project Delta', category: 'UI/UX', color: 'bg-violet-900' },
            ].map((project) => (
              <div
                key={project.title}
                className={`${project.color} rounded-2xl p-8 h-48 flex flex-col justify-end hover:scale-105 transition-transform cursor-pointer`}
              >
                <p className="text-gray-400 text-sm mb-1">{project.category}</p>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Wat ik doe</h2>
          <div className="flex flex-wrap gap-3">
            {['React', 'Next.js', 'TypeScript', 'Figma', 'UI Design', 'Branding', 'CSS/Tailwind', 'Node.js'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-gray-700 rounded-full text-gray-300 text-sm hover:border-purple-500 hover:text-purple-400 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Zullen we samenwerken?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Heb je een project in gedachten? Stuur me een berichtje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${email}`}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors inline-block"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-900 py-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} {businessName}. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
}
