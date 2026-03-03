import { CheckCircle } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="py-12 bg-blue-50/50 border-y border-blue-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-sm text-gray-600">500+ gelanceerde websites</p>
          </div>
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="flex items-center justify-center gap-1 mb-2">
              {'⭐'.repeat(5)}
            </div>
            <p className="text-sm text-gray-600">4.9/5 gemiddelde beoordeling</p>
          </div>
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">48 uur</div>
            <p className="text-sm text-gray-600">48 uur gemiddelde oplevering</p>
          </div>
        </div>
      </div>
    </section>
  );
}
