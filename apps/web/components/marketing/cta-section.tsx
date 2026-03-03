import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Klaar om online te gaan?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
          Jouw professionele website is binnen 48 uur live. Kies nu je aanbod en voorbeelden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/order">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-base px-8 group transition-all hover:scale-105 hover:shadow-lg">
              Bestel nu voor €400
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/#sociale-bewijzen">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base px-8 group transition-all hover:scale-105 hover:shadow-lg"
            >
              Bekijk voorbeelden
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
