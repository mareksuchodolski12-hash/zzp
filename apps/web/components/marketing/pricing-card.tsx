import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 flex flex-col',
        highlighted
          ? 'bg-blue-600 text-white shadow-2xl scale-105'
          : 'bg-white border border-gray-200 text-gray-900',
      )}
    >
      <div className="mb-6">
        <h3 className={cn('text-lg font-semibold mb-1', highlighted ? 'text-blue-100' : 'text-gray-500')}>
          {name}
        </h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-5xl font-bold">€{price}</span>
          <span className={cn('text-sm', highlighted ? 'text-blue-200' : 'text-gray-400')}>
            eenmalig
          </span>
        </div>
        <p className={cn('text-sm', highlighted ? 'text-blue-100' : 'text-gray-600')}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <svg
              className={cn('w-4 h-4 flex-shrink-0', highlighted ? 'text-blue-200' : 'text-green-500')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className="block">
        <Button
          className={cn(
            'w-full',
            highlighted
              ? 'bg-white text-blue-600 hover:bg-blue-50'
              : '',
          )}
          variant={highlighted ? 'secondary' : 'default'}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
