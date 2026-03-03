'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Managed hosting met 99,95% SLA',
  'Foto\'s geoptimaliseerd via wereldwijde CDN',
  'Copywriting met technische SEO-structuur',
  'UX/UI geoptimaliseerd voor conversie en accessibility',
  'Geen verborgen kosten: backup, monitoring en security inbegrepen',
];
const examples = [
  {
    title: 'Zangeres & Vocal Coach',
    description: 'klaar in 36 uur',
    domain: 'LenaSinger.nl',
    href: 'https://lenasinger.nl',
    tone: 'from-pink-100 via-purple-100 to-white',
    accent: 'bg-pink-500/80',
    summary:
      'Professionele branding, foto’s, teksten en een moderne uitstraling die klanten aantrekt.',
    deliverables: 'Branding, contentstructuur, SEO-basis en conversiegerichte secties opgeleverd.',
  },
  {
    title: 'Loodgieter & Installateur',
    description: 'klaar in 41 uur',
    domain: 'MSHydroPro.nl',
    href: 'https://mshydropro.nl',
    tone: 'from-sky-100 via-cyan-100 to-white',
    accent: 'bg-sky-600/80',
    summary:
      'Technische diensten helder uitgelegd, sterke call-to-actions en een betrouwbare uitstraling.',
    deliverables: 'Dienstenpagina, intake-flow, lokale SEO en duidelijke lead-opvolging ingericht.',
  },
  {
    title: 'IT-specialist & Systeembeheer',
    description: 'klaar in 44 uur',
    domain: 'SystemPilot.nl',
    href: 'https://systempilot.nl',
    tone: 'from-indigo-100 via-blue-100 to-white',
    accent: 'bg-indigo-600/80',
    summary:
      'Strakke zakelijke website met duidelijke diensten en conversiegerichte structuur.',
    deliverables: 'Servicecatalogus, trust-secties, performance-optimalisatie en analytics live gezet.',
  },
];
const PROMOTION_SPOTS_TOTAL = 50;
const MIN_PROMOTION_SPOTS_AVAILABLE = 1;
const PROMOTION_SPOT_DROP_INTERVAL_MS = 1000 * 60 * 60 * 3;
const PROMOTION_SPOT_CHECK_INTERVAL_MS = 1000 * 60 * 60;
const PROMO_PRICE = 400;
const NORMAL_PRICE = 499;
const INSTALLMENT_MONTHS = 12;
const INSTALLMENT_MONTHLY_PRICE = 45;

type PaymentMode = 'full' | 'installments';

export function SimplePricingSection() {
  const [availableSpots, setAvailableSpots] = useState(PROMOTION_SPOTS_TOTAL);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('full');
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateAvailableSpots = () => {
      const countdownStartTimestamp = Date.UTC(2026, 2, 1);
      const intervalsPassed = Math.max(0, Math.floor((Date.now() - countdownStartTimestamp) / PROMOTION_SPOT_DROP_INTERVAL_MS));
      setAvailableSpots(Math.max(MIN_PROMOTION_SPOTS_AVAILABLE, PROMOTION_SPOTS_TOTAL - intervalsPassed));
    };

    updateAvailableSpots();
    const interval = setInterval(updateAvailableSpots, PROMOTION_SPOT_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const element = showcaseRef.current;
      if (!element) return;

      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      if (maxScrollLeft <= 0) return;

      const scrollStep = Math.max(280, Math.floor(element.clientWidth * 0.8));
      const nextLeft = element.scrollLeft + scrollStep;

      element.scrollTo({
        left: nextLeft >= maxScrollLeft - 8 ? 0 : nextLeft,
        behavior: 'smooth',
      });
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">€{PROMO_PRICE} promotieprijs — alleen voor de eerste 50 klanten.</h2>
          <p className="text-xl text-blue-700 font-semibold max-w-3xl mx-auto">
            Normale prijs: €{NORMAL_PRICE}. Bespaar €{NORMAL_PRICE - PROMO_PRICE} zolang het aanbod loopt.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          <div className="max-w-lg xl:max-w-none w-full mx-auto xl:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-1 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setPaymentMode('full')}
                aria-pressed={paymentMode === 'full'}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  paymentMode === 'full' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Normaal
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('installments')}
                aria-pressed={paymentMode === 'installments'}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  paymentMode === 'installments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Termijnen
              </button>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {paymentMode === 'full' ? `€${PROMO_PRICE} promotieprijs` : `€${INSTALLMENT_MONTHLY_PRICE} / maand`}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {paymentMode === 'full'
                  ? `Normale prijs: €${NORMAL_PRICE}.`
                  : `${INSTALLMENT_MONTHS} termijnen (totaal €${INSTALLMENT_MONTHLY_PRICE * INSTALLMENT_MONTHS}).`}
              </div>
            </div>

            <p className="text-center text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg py-2 px-3 mb-8">
              Nog maar {availableSpots} plekken beschikbaar van de 50.
            </p>

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
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  aria-label={`Nog maar ${availableSpots} van de ${PROMOTION_SPOTS_TOTAL} promotieplekken beschikbaar.`}
                  className="text-sm font-medium text-blue-700"
                >
                  Nog maar {availableSpots} van de {PROMOTION_SPOTS_TOTAL} promotieplekken beschikbaar.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:120ms]">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 h-full flex flex-col">
              <div id="sociale-bewijzen" className="text-center xl:text-left mb-8 scroll-mt-24">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Sociale bewijzen</h3>
              <p className="text-gray-600 text-lg max-w-2xl xl:max-w-none mx-auto xl:mx-0">
                Voorbeelden van websites die binnen 48 uur zijn opgeleverd.
              </p>
              <p className="text-sm text-blue-700 font-medium mt-3">
                Alle websites zijn modulair opgebouwd en direct klaar voor MVP-doorontwikkeling.
              </p>
              </div>

              <div ref={showcaseRef} className="overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth snap-x snap-mandatory">
                <div className="flex gap-5 min-w-max items-stretch">
              {examples.map((example, index) => (
                <article
                  key={example.title}
                  className="group w-[340px] sm:w-[360px] bg-white rounded-2xl border border-blue-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 h-full min-h-[372px] flex flex-col snap-start"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <a
                    href={example.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Open voorbeeldsite ${example.domain}`}
                  >
                    <div className={`aspect-video rounded-xl bg-gradient-to-br ${example.tone} border border-blue-200 p-2 mb-4 group-hover:border-blue-400 transition-colors`}>
                      <div className="h-full w-full rounded-lg bg-white border border-slate-200 overflow-hidden shadow-sm">
                        <div className="h-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-2">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                          </div>
                          <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wide">Live preview</span>
                        </div>
                        <div className="p-2.5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-1.5 w-14 bg-slate-300 rounded" />
                            <div className={`h-1.5 w-8 rounded ${example.accent}`} />
                          </div>
                          <div className="h-6 rounded bg-slate-200 mb-2" />
                          <div className="h-1.5 w-4/5 bg-slate-200 rounded mb-1.5" />
                          <div className="h-1.5 w-3/5 bg-slate-200 rounded mb-2.5" />
                          <div className="grid grid-cols-3 gap-1.5">
                            <div className="h-5 rounded bg-slate-200" />
                            <div className="h-5 rounded bg-slate-200" />
                            <div className="h-5 rounded bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="flex items-start justify-between gap-2 mb-1 min-h-[2.75rem]">
                    <p className="text-gray-800 font-semibold leading-snug">{example.title}</p>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                      {example.description}
                    </span>
                  </div>
                  <a
                    href={example.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm text-blue-700 mt-1 mb-3 font-semibold hover:underline"
                  >
                    {example.domain}
                  </a>
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[3.25rem]">&ldquo;{example.summary}&rdquo;</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-auto border-t border-blue-100 pt-3">
                    {example.deliverables}
                  </p>
                </article>
              ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
                <div className="text-4xl font-bold text-blue-600 mb-1">500+</div>
                <p className="text-sm text-gray-600">gelanceerde websites</p>
              </div>
              <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-sm text-gray-600">4.9/5 gemiddelde beoordeling</p>
              </div>
              <div className="text-center bg-blue-50/60 rounded-xl border border-blue-100 py-5">
                <div className="text-4xl font-bold text-blue-600 mb-1">48 uur</div>
                <p className="text-sm text-gray-600">gemiddelde oplevering</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
