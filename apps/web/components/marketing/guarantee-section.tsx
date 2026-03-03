import { ShieldCheck } from 'lucide-react';

export function GuaranteeSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Garantie</h2>
          <p className="text-lg text-gray-700">Niet tevreden? Geld terug binnen 48 uur — zonder vragen.</p>
        </div>
      </div>
    </section>
  );
}
