import { TemplateCard } from '@/components/marketing/template-card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse our professionally designed website templates for ZZP professionals.',
};

const bouwTemplate = {
  id: 'business',
  previewSlug: 'budowlanka',
  name: 'Bouw & Renovatie',
  description:
    'Premium website template voor zzp bouw, aannemer, klusjesman, timmerman, schilder en monteur in renovatie en verbouwing.',
  tags: ['zzp bouw', 'aannemer', 'klusjesman', 'timmerman', 'schilder', 'monteur', 'renovatie', 'verbouwing', 'bouwbedrijf zzp'],
  previewUrl: '/preview/budowlanka',
  thumbnailUrl: '/images/template-business.jpg',
  color: 'blue' as const,
};

const templates: Array<{
  id: string;
  previewSlug: string;
  name: string;
  description: string;
  tags: string[];
  previewUrl: string;
  thumbnailUrl: string;
  color: 'blue' | 'purple' | 'green';
}> = [
  {
    id: 'freelancer',
    previewSlug: 'instalator',
    name: 'Instalator techniczny',
    description:
      'Idealny dla elektryków, hydraulików, instalatorów CV i montażystów paneli solarnych nastawionych na leady i zaufanie.',
    tags: ['Elektryk', 'Hydraulik', 'Instalator CV'],
    previewUrl: '/preview/instalator',
    thumbnailUrl: '/images/template-freelancer.jpg',
    color: 'purple',
  },
  {
    id: 'portfolio',
    previewSlug: 'ogrodnik',
    name: 'Usługi zewnętrzne i ogrodowe',
    description:
      'Stworzony dla hovenierów, ogrodników, landscaperów i serwisu zewnętrznego, by pokazać realizacje i zamieniać wejścia w zapytania.',
    tags: ['Hovenier', 'Ogrodnik', 'Landscaper'],
    previewUrl: '/preview/ogrodnik',
    thumbnailUrl: '/images/template-portfolio.jpg',
    color: 'green',
  },
];

export default function TemplatesPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Wybierz premium szablon dla swojej działalności ZZP
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Trzy najczęstsze i najbardziej dochodowe branże ZZP w Holandii, gotowe do szybkiej sprzedaży online.
          </p>
        </div>
        <article className="group mb-12 max-w-6xl mx-auto overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:items-center md:p-10">
            <div className="order-2 md:order-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">Meest gekozen ZZP-categorie in Nederland</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{bouwTemplate.name}</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">{bouwTemplate.description}</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {bouwTemplate.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={bouwTemplate.previewUrl}
                  className="inline-flex justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Voorbeeld bekijken
                </Link>
                <Link
                  href={`/order?template=${bouwTemplate.id}`}
                  className="inline-flex justify-center rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Kies dit template
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 rounded-2xl border border-gray-100 bg-gray-50 p-3 shadow-sm overflow-hidden">
              <div
                aria-label={`${bouwTemplate.name} template preview`}
                className="h-64 md:h-80 w-full rounded-xl bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url(${bouwTemplate.thumbnailUrl})` }}
              />
            </div>
          </div>
        </article>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div>
    </section>
  );
}
