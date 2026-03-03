import { BusinessTemplate } from '@/components/templates/business';
import { FreelancerTemplate } from '@/components/templates/freelancer';
import { PortfolioTemplate } from '@/components/templates/portfolio';
import { notFound } from 'next/navigation';

const templateMap: Record<string, React.ComponentType> = {
  biznes: BusinessTemplate,
  freelancer: FreelancerTemplate,
  portfolio: PortfolioTemplate,
};

export async function generateStaticParams() {
  return Object.keys(templateMap).map((slug) => ({
    slug,
  }));
}

interface PreviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PreviewPage({
  params,
}: PreviewPageProps) {
  const { slug } = await params;

  const Template = templateMap[slug];

  if (!Template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Template />
    </div>
  );
}
