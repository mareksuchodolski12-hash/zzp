const examples = [
  {
    title: 'Zangeres & Vocal Coach',
    description: 'klaar in 36 uur',
    domain: 'LenaSinger.nl',
    href: 'https://lenasinger.nl',
    tone: 'from-pink-100 via-purple-100 to-white',
    accent: 'bg-pink-500/80',
    summary:
      'Professionele branding, foto’s, teksten en een moderne uitstraling die klanten aantrekt.',
  },
  {
    title: 'Loodgieter & Installateur',
    description: 'klaar in 41 uur',
    domain: 'MSHydroPro.nl',
    href: 'https://mshydropro.nl',
    tone: 'from-sky-100 via-cyan-100 to-white',
    accent: 'bg-sky-600/80',
    summary:
      'Technische diensten helder uitgelegd, sterke call-to-actions en een betrouwbare uitstraling.',
  },
  {
    title: 'IT-specialist & Systeembeheer',
    description: 'klaar in 44 uur',
    domain: 'SystemPilot.nl',
    href: 'https://systempilot.nl',
    tone: 'from-indigo-100 via-blue-100 to-white',
    accent: 'bg-indigo-600/80',
    summary:
      'Strakke zakelijke website met duidelijke diensten en conversiegerichte structuur.',
  },
];

export function SocialProofSection() {
  return (
    <section className="py-20 bg-white border-y border-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Sociale bewijzen</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Voorbeelden van websites die binnen 48 uur zijn opgeleverd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {examples.map((example, index) => (
            <article
              key={example.title}
              className="group bg-white rounded-2xl border border-blue-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <a
                href={example.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={`Open voorbeeldsite ${example.domain}`}
              >
                <div className={`aspect-video rounded-xl bg-gradient-to-br ${example.tone} border border-blue-200 p-2 mb-4 group-hover:border-blue-400 transition-colors`}>
                  <div className="h-full w-full rounded-lg bg-white border border-slate-200 overflow-hidden shadow-sm">
                    <div className="h-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-2">
                      <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                      </div>
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wide">Live preview</span>
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-1.5 w-14 bg-slate-300 rounded" />
                        <div className={`h-1.5 w-8 rounded ${example.accent}`} />
                      </div>
                      <div className="h-6 rounded bg-slate-200 mb-2" />
                      <div className="h-1.5 w-4/5 bg-slate-200 rounded mb-1.5" />
                      <div className="h-1.5 w-3/5 bg-slate-200 rounded mb-2.5" />
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="h-5 rounded bg-slate-200" />
                        <div className="h-5 rounded bg-slate-200" />
                        <div className="h-5 rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-gray-800 font-semibold leading-snug">{example.title}</p>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                  {example.description}
                </span>
              </div>
              <a
                href={example.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm text-blue-700 mt-1 font-semibold hover:underline"
              >
                {example.domain}
              </a>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">&ldquo;{example.summary}&rdquo;</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-14">
          <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
            <div className="text-4xl font-bold text-blue-600 mb-1">500+</div>
            <p className="text-sm text-gray-600">gelanceerde websites</p>
          </div>
          <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
            <div className="flex items-center justify-center gap-1 mb-2">
              {'⭐'.repeat(5)}
            </div>
            <p className="text-sm text-gray-600">4.9/5 gemiddelde beoordeling</p>
          </div>
          <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
            <div className="text-4xl font-bold text-blue-600 mb-1">48 uur</div>
            <p className="text-sm text-gray-600">gemiddelde oplevering</p>
          </div>
        </div>
      </div>
    </section>
  );
}
