import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AvailabilitySection() {
  return (
    <section className="py-14 bg-amber-50 border-y border-amber-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Beschikbaarheid</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          We nemen maximaal 5 projecten per dag aan om kwaliteit te garanderen.
        </p>
        <Link href="/order">
          <Button size="lg" className="group">
            Controleer beschikbaarheid
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
