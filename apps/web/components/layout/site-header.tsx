import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">ZZP</span>
          <span className="text-xl font-semibold text-gray-700">Website</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/templates" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Templates
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Prijzen
          </Link>
          <Link href="/order">
            <Button size="sm">Bestel nu</Button>
          </Link>
        </nav>

        <button className="md:hidden p-2 text-gray-600" aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
