import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          WebsitePilot.nl • Maatwerk websites voor zzp en kleine bedrijven
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          Professionele website die vertrouwen wekt en klanten oplevert.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          Kies Starter of Business. Wij ontwerpen, bouwen en zetten alles live, met optie voor betaling in
          termijnen tot 12 maanden.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <Link href="/#sociale-bewijzen">
            <Button size="lg" className="text-base px-8 group transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Bekijk pakketten
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/order">
            <Button size="lg" variant="outline" className="text-base px-8 group transition-all hover:scale-105 hover:shadow-lg">
              Plan je website nu
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Professioneel design
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Geen contracten
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Starter vanaf €69 per maand
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Volledig door ons beheerd
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Business vanaf €119 per maand
          </div>
        </div>
      </div>
    </section>
  );
}
