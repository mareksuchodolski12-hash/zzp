import { TemplateCard } from '@/components/marketing/template-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse our professionally designed website templates for ZZP professionals.',
};

const templates: Array<{
  id: string;
  name: string;
  description: string;
  tags: string[];
  previewUrl: string;
  thumbnailUrl: string;
  color: 'blue' | 'purple' | 'green';
}> = [
  {
    id: 'business',
    name: 'Business',
    description:
      'Clean and professional template for consultants, coaches and business service providers.',
    tags: ['Consultant', 'Coach', 'Zakelijk'],
    previewUrl: '/templates/business',
    thumbnailUrl: '/images/template-business.jpg',
    color: 'blue',
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description:
      'Modern portfolio-style template for designers, developers and creative professionals.',
    tags: ['Designer', 'Developer', 'Creatief'],
    previewUrl: '/templates/freelancer',
    thumbnailUrl: '/images/template-freelancer.jpg',
    color: 'purple',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Elegant template to showcase your work and attract new clients.',
    tags: ['Fotograaf', 'Schrijver', 'Portfolio'],
    previewUrl: '/templates/portfolio',
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
            Kies een professioneel template voor jouw ZZP website
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Moderne, snelle en volledig aanpasbare templates. Perfect voor elke branche.
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
