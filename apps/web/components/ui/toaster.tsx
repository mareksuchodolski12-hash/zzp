'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const ToastContext = React.createContext<{
  toast: (props: ToastProps) => void;
}>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'rounded-lg border p-4 shadow-md transition-all',
              t.variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground border-destructive'
                : 'bg-background text-foreground border-border',
            )}
          >
            {t.title && <p className="font-semibold">{t.title}</p>}
            {t.description && <p className="text-sm mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}

export function Toaster() {
  return null;
}
