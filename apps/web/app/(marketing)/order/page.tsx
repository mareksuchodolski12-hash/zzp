'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { OrderForm } from '@/components/marketing/order-form';
import type { Metadata } from 'next';

function OrderContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') ?? 'starter';
  const template = searchParams.get('template') ?? '';

  return <OrderForm defaultPlan={plan} defaultTemplate={template} />;
}

export default function OrderPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bestel jouw website</h1>
          <p className="text-lg text-gray-600">
            Vul het formulier in en wij zorgen dat jouw website binnen 24 uur live staat.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Suspense fallback={<div className="text-center py-8">Laden...</div>}>
            <OrderContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
