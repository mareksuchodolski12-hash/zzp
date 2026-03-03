import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          Website live binnen 24 uur
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
          Jouw professionele
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            ZZP website
          </span>
          <br />
          in één dag
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Kies een template, vul je gegevens in en wij zorgen dat je website binnen 24 uur live
          staat. Geen technische kennis vereist. Eerlijke eenmalige prijs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/templates">
            <Button size="lg" className="text-base px-8">
              Bekijk templates
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="text-base px-8">
              Bekijk prijzen
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Gratis SSL certificaat
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Eigen domeinnaam
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Geen maandelijkse kosten
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mobiel geoptimaliseerd
          </div>
        </div>
      </div>
    </section>
  );
}
