import { TemplateCard } from '@/components/marketing/template-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse our professionally designed website templates for ZZP professionals.',
};

const templates: Array<{
  id: string;
  previewSlug: string;
  name: string;
  description: string;
  tags: string[];
  previewLabel?: string;
  selectLabel?: string;
  previewUrl: string;
  thumbnailUrl: string;
  color: 'blue' | 'purple' | 'green';
}> = [
  {
    id: 'business',
    previewSlug: 'budowlanka',
    name: 'Fachowiec budowlany i remontowy',
    description:
      'Dla klusjesmanów, aannemerów, timmermanów, stolarzy, malarzy i monterów, którzy chcą szybko zdobywać nowe zlecenia online.',
    tags: ['Klusjesman', 'Aannemer', 'Timmerman'],
    previewUrl: '/preview/budowlanka',
    thumbnailUrl: '/images/template-business.jpg',
    color: 'blue',
  },
  {
    id: 'freelancer',
    previewSlug: 'instalator',
    name: 'Technische Installateur',
    description:
      'Perfect voor elektricien zzp, loodgieter zzp, cv-monteur, zonnepanelen installateur en warmtepomp installateur; gemaakt voor elk installatiebedrijf zzp in Nederland dat meer aanvragen wil.',
    tags: ['Elektricien', 'Loodgieter', 'CV-monteur', 'Zonnepanelen'],
    previewLabel: 'Voorbeeld bekijken',
    selectLabel: 'Kies dit template',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div>
    </section>
  );
}
