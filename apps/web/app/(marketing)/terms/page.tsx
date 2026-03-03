import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: 'Belangrijke voorwaarden voor het afnemen van onze websitepakketten.',
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Algemene voorwaarden</h1>
        <p className="text-gray-700 leading-relaxed">
          Door een bestelling te plaatsen ga je akkoord met een eenmalige levering van een website op basis van het
          gekozen pakket en template.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Oplevering vindt plaats nadat alle benodigde inhoud is ontvangen en de betaling succesvol is bevestigd.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Voor vragen over voorwaarden, wijzigingen of ondersteuning kun je contact opnemen via
          {' '}
          <a
            className="text-blue-700 hover:underline"
            href="mailto:info@zzp-website.nl"
            aria-label="Neem contact op via info@zzp-website.nl"
          >
            info@zzp-website.nl
          </a>
          .
        </p>
      </div>
    </section>
  );
}
