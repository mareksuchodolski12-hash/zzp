import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  number: number;
  isActive: boolean;
  isCompleted: boolean;
  className?: string;
}

export function StepIndicator({ number, isActive, isCompleted, className }: StepIndicatorProps) {
  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200',
        isCompleted
          ? 'bg-gray-900 text-white'
          : isActive
            ? 'bg-gray-900 text-white'
            : 'bg-gray-200 text-gray-600',
        className
      )}
      aria-current={isActive ? 'step' : undefined}
      role="img"
      aria-label={
        isCompleted
          ? `Step ${number} completed`
          : isActive
            ? `Step ${number}, current step`
            : `Step ${number}`
      }
    >
      {isCompleted ? <Check className="w-5 h-5" /> : number}
    </div>
  );
}
