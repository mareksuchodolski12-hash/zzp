'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Eigen domeinnaam',
  'Gratis SSL certificaat',
  'Hosting inbegrepen',
  'Website live binnen 24 uur',
  'Mobiel geoptimaliseerd',
];

export function SimplePricingSection() {
  const [availableSpots, setAvailableSpots] = useState(50);

  useEffect(() => {
    const updateAvailableSpots = () => {
      setAvailableSpots(Math.max(1, 50 - (Math.floor(Date.now() / (1000 * 60 * 60 * 3)) % 50)));
    };

    updateAvailableSpots();
    const interval = setInterval(updateAvailableSpots, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Eerlijke eenmalige prijs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Geen abonnement. Geen verborgen kosten. Alles wat je nodig hebt voor één vaste prijs.
          </p>
        </div>

        <div className="max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">€499</div>
              <div className="text-lg text-gray-600">eenmalig</div>
              <div className="text-sm text-gray-500 mt-2">incl. BTW</div>
            </div>

            {/* Features List */}
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

            {/* CTA Button */}
            <Link href="/order" className="block">
              <Button size="lg" className="w-full text-base group transition-all hover:scale-105 hover:shadow-lg">
                Controleer beschikbaarheid
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold block">Garantie</span>
                Niet tevreden? 100% geld terug binnen 48 uur — zonder vragen.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold block">Beschikbaarheid</span>
                We nemen maximaal 5 projecten per dag aan om kwaliteit te garanderen.
                <br />
                Tijdelijk aanbod: €400 promotieprijs — normaal €499.
                <br />
                Alleen voor de eerste 50 klanten.
              </p>
              <p className="text-sm font-medium text-blue-700">
                Nog maar {availableSpots} van de 50 promotieplekken beschikbaar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
