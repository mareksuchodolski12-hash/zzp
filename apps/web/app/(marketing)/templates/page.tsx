import { TemplateCard } from '@/components/marketing/template-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse our professionally designed website templates for ZZP professionals.',
};

const templates = [
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Website Templates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kies een template die past bij jouw vakgebied. Wij personaliseren hem met jouw inhoud.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div>
    </section>
  );
}
