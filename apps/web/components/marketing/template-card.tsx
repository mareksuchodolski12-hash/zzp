import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  previewUrl: string;
  thumbnailUrl: string;
  color: 'blue' | 'purple' | 'green';
}

const colorClasses: Record<string, { bg: string; text: string; badge: string }> = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-700',
  },
};

export function TemplateCard({
  id,
  name,
  description,
  tags,
  previewUrl,
  color,
}: TemplateCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      <div className={cn('h-48 flex items-center justify-center', colors.bg)}>
        <span className={cn('text-6xl font-bold opacity-20', colors.text)}>
          {name.charAt(0)}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn('text-xs px-2 py-1 rounded-full font-medium', colors.badge)}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <Link href={previewUrl} className="flex-1">
            <Button variant="outline" className="w-full text-sm" size="sm">
              Preview
            </Button>
          </Link>
          <Link href={`/order?template=${id}`} className="flex-1">
            <Button className="w-full text-sm" size="sm">
              Selecteren
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
