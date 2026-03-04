import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          WebsitePilot.nl • Full-service website oplevering
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          Professionele website in 48 uur — volledig door ons geregeld.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Jij levert je input aan, wij bouwen en publiceren. Geen contracten, geen verborgen kosten, één vaste prijs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <Link href="/order">
            <Button size="lg" className="text-base px-8 group transition-all hover:scale-105 hover:shadow-lg">
              Bestel nu voor €400
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/#sociale-bewijzen">
            <Button size="lg" variant="outline" className="text-base px-8 group transition-all hover:scale-105 hover:shadow-lg">
              Bekijk voorbeelden
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Professioneel design
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Geen contracten
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Eén vaste all-in prijs
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Volledig door ons beheerd
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Oplevering binnen 48 uur
          </div>
        </div>
      </div>
    </section>
  );
}
