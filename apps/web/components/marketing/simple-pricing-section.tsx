import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Professioneel design op maat van jouw branche',
  'Technische setup, hosting en beveiliging inbegrepen',
  'Copy en structuur gericht op aanvragen en conversie',
  'Mobiel geoptimaliseerd en SEO-klaar op oplevering',
  'Nazorg en aanpassingen door ons team op verzoek',
];
const examples = [
  {
    title: 'Zangeres & Vocal Coach',
    description: 'klaar in 36 uur',
    domain: 'LenaSinger.nl',
    href: 'https://lenasinger.nl',
    screenshot: '/examples/lenasinger.jpg',
    summary:
      'Sterke uitstraling, duidelijke positionering en een website die vertrouwen uitstraalt.',
    deliverables: 'Branding, contentstructuur, SEO-basis en conversiegerichte secties opgeleverd.',
  },
  {
    title: 'Loodgieter & Installateur',
    description: 'klaar in 41 uur',
    domain: 'MSHydroPro.nl',
    href: 'https://mshydropro.nl',
    screenshot: '/examples/mshydropro.jpg',
    summary:
      'Diensten helder gepresenteerd met duidelijke call-to-actions voor nieuwe aanvragen.',
    deliverables: 'Dienstenpagina, intake-flow, lokale SEO en duidelijke lead-opvolging ingericht.',
  },
  {
    title: 'IT-specialist & Systeembeheer',
    description: 'klaar in 44 uur',
    domain: 'SystemPilot.nl',
    href: 'https://systempilot.nl',
    screenshot: '/examples/systempilot.jpg',
    summary:
      'Zakelijke opzet met duidelijke propositie en een strakke, professionele layout.',
    deliverables: 'Servicecatalogus, trust-secties, performance-optimalisatie en analytics live gezet.',
  },
];
const FIXED_PRICE = 400;

export function SimplePricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Één vaste prijs: €{FIXED_PRICE}</h2>
          <p className="text-xl text-blue-700 font-semibold max-w-3xl mx-auto">
            Geen contracten, geen verborgen kosten en geen onverwachte toeslagen.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          <div className="max-w-lg xl:max-w-none w-full mx-auto xl:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                €{FIXED_PRICE}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Volledige oplevering binnen 48 uur, inclusief support na livegang.
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                  style={{ animationDelay: `${(index + 1) * 75}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/order" className="block">
              <Button size="lg" className="w-full text-base group transition-all hover:scale-105 hover:shadow-lg">
                Plan jouw website nu
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

              <div className="text-center mt-6 space-y-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold block">Garantie</span>
                  Niet tevreden in de eerste 48 uur na oplevering? Dan krijg je je geld terug.
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold block">Wat je van ons krijgt</span>
                  Volledige uitvoering door ons team. Jij hoeft geen technische tools of beheer te doen.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:120ms]">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 h-full flex flex-col">
              <div id="sociale-bewijzen" className="text-center xl:text-left mb-8 scroll-mt-24">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Sociale bewijzen</h3>
              <p className="text-gray-600 text-lg max-w-2xl xl:max-w-none mx-auto xl:mx-0">
                Voorbeelden van websites die binnen 48 uur zijn opgeleverd.
              </p>
              <p className="text-sm text-blue-700 font-medium mt-3">
                Alle websites zijn modulair opgebouwd en direct klaar voor MVP-doorontwikkeling.
              </p>
              </div>

              <div className="overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth snap-x snap-mandatory">
                <div className="flex gap-5 min-w-max items-stretch">
              {examples.map((example, index) => (
                <article
                  key={example.title}
                  className="group w-[86vw] max-w-[360px] sm:w-[360px] bg-white rounded-2xl border border-blue-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 h-full min-h-[372px] flex flex-col snap-start"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <a
                    href={example.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Open voorbeeldsite ${example.domain}`}
                  >
                    <div className="aspect-video rounded-xl border border-blue-200 overflow-hidden mb-4 group-hover:border-blue-400 transition-colors bg-white">
                      <Image
                        src={example.screenshot}
                        alt={`Screenshot van ${example.domain}`}
                        width={1200}
                        height={675}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="flex items-start justify-between gap-2 mb-1 min-h-[2.75rem]">
                    <p className="text-gray-800 font-semibold leading-snug">{example.title}</p>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                      {example.description}
                    </span>
                  </div>
                  <a
                    href={example.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm text-blue-700 mt-1 mb-3 font-semibold hover:underline"
                  >
                    {example.domain}
                  </a>
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[3.25rem]">&ldquo;{example.summary}&rdquo;</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-auto border-t border-blue-100 pt-3">
                    {example.deliverables}
                  </p>
                </article>
              ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
          </div>
        </div>
      </div>
    </section>
  );
}
