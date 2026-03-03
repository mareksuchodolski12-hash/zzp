'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

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

        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-white animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/templates"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Prijzen
            </Link>
            <Link href="/order" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">
                Bestel nu
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
