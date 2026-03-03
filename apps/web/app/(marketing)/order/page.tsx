'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { OrderForm } from '@/components/marketing/order-form';

function OrderContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') ?? 'professional';
  const planLocked = searchParams.has('plan');

  return <OrderForm defaultPlan={plan} planLocked={planLocked} />;
}

export default function OrderPage() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Start je websitebriefing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Vul alles één keer in. Je briefing gaat direct via WhatsApp naar ons development-team.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          <Suspense fallback={<div className="text-center py-8">Laden...</div>}>
            <OrderContent />
          </Suspense>
        </div>
        <div className="mt-8 text-center space-y-3 text-sm text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <p className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Direct contact via WhatsApp
          </p>
          <p className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Complete technische intake in één flow
          </p>
          <p className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Klaar voor handmatige bouw en MVP-uitbreiding
          </p>
        </div>
      </div>
    </section>
  );
}
