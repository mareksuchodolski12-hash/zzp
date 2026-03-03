import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Lees hoe wij omgaan met persoonsgegevens en privacy.',
};

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacybeleid</h1>
        <p className="text-gray-700 leading-relaxed">
          Wij verwerken persoonsgegevens uitsluitend voor het uitvoeren van je bestelling en communicatie over je
          websiteproject.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Gegevens worden niet verkocht aan derden en alleen gedeeld met verwerkers die nodig zijn voor hosting,
          betalingen en support.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Voor vragen over privacy of verzoeken tot inzage en verwijdering kun je contact opnemen via
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
