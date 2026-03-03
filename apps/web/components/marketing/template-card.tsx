import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  previewSlug?: string;
  name: string;
  description: string;
  tags: string[];
  previewLabel?: string;
  selectLabel?: string;
  previewUrl: string;
  thumbnailUrl: string;
  color: 'blue' | 'purple' | 'green';
}

const colorClasses: Record<string, { badge: string }> = {
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  purple: {
    badge: 'bg-purple-50 text-purple-700 border-purple-100',
  },
  green: {
    badge: 'bg-green-50 text-green-700 border-green-100',
  },
};

export function TemplateCard({
  id,
  previewSlug,
  name,
  description,
  tags,
  previewLabel,
  selectLabel,
  previewUrl,
  thumbnailUrl,
  color,
}: TemplateCardProps) {
  const colors = colorClasses[color];
  const resolvedPreviewSlug = previewSlug ?? id;

  return (
    <div className="group flex flex-col h-full rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-t-2xl border-b border-gray-100 bg-gray-50 p-3 shadow-sm overflow-hidden">
        <div
          aria-label={`${name} template preview`}
          className="h-56 w-full rounded-lg bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
      </div>

      <div className="p-6 pb-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
        <p className="text-sm text-gray-600 mb-5 leading-relaxed flex-grow">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn('text-xs px-3 py-1.5 rounded-full border font-medium', colors.badge)}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <Link href={`/preview/${resolvedPreviewSlug}`} className="flex-1">
            <Button className="w-full text-sm group/preview transition-all hover:scale-105 hover:shadow-lg" size="sm">
              {previewLabel ?? 'Zapowiedź'}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/preview:translate-x-1" />
            </Button>
          </Link>
          <Link href={`/order?template=${id}`} className="flex-1">
            <Button variant="outline" className="w-full text-sm transition-all hover:scale-105 hover:shadow-lg" size="sm">
              {selectLabel ?? 'Wybierz szablon'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
