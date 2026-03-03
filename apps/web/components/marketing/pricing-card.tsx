import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
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
  badge?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-3xl p-8 md:p-10 flex flex-col bg-white border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        highlighted
          ? 'border-blue-200 shadow-xl bg-gradient-to-b from-blue-50/80 to-white'
          : 'border-gray-200 text-gray-900',
      )}
    >
      {badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      ) : null}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {name}
        </h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          <span className="text-sm text-gray-500">jednorazowo</span>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 flex-shrink-0 text-blue-600" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className="block">
        <Button className={cn('w-full group', highlighted ? 'shadow-sm' : '')}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
