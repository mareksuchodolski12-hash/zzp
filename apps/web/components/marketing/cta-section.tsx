import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Klaar om online te gaan?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
          Jouw professionele website is binnen 24 uur live. Kies nu je template en plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/order">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-base px-8">
              Begin nu
            </Button>
          </Link>
          <Link href="/templates">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base px-8"
            >
              Bekijk templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
